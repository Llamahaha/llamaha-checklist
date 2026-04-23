#!/usr/bin/env node
// Crawl every text file in the repo, collect each unique https:// URL, and
// report broken or redirected links. Intended to be run locally (not inside
// a sandbox proxy) so outbound HTTPS actually works.
//
// Usage:
//   node scripts/check-external-links.mjs          # check every URL
//   node scripts/check-external-links.mjs --limit 20  # only check the first 20 URLs (smoke test)
//   node scripts/check-external-links.mjs --concurrency 12
//   node scripts/check-external-links.mjs --json    # machine-readable output
//
// Exit code: 1 if any URLs returned 400+, 0 otherwise.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));

const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (arg.startsWith("--")) {
    const key = arg.slice(2);
    const next = process.argv[i + 1];
    if (next && !next.startsWith("--")) {
      args.set(key, next);
      i += 1;
    } else {
      args.set(key, true);
    }
  }
}

const LIMIT = args.has("limit") ? Number(args.get("limit")) : Infinity;
const CONCURRENCY = Math.max(1, Number(args.get("concurrency") ?? 8));
const TIMEOUT_MS = Math.max(2000, Number(args.get("timeout") ?? 10000));
const AS_JSON = args.has("json");

// File extensions we bother to scan. Everything else (images, binaries) is
// ignored.
const SCAN_EXTENSIONS = new Set([
  ".html",
  ".js",
  ".mjs",
  ".cjs",
  ".css",
  ".md",
  ".txt",
  ".json"
]);

// Paths we skip entirely.
const SKIP_SEGMENTS = new Set([".git", "node_modules", "dist", "build"]);

// Regex stops at whitespace, quotes, brackets, braces, backticks, and the
// characters that delimit markdown links. Trailing punctuation is trimmed
// afterwards. Template expressions like `${var}` are filtered before fetch.
const URL_PATTERN = /https?:\/\/[^\s"'<>`\\()\[\]{}]+/gi;

// Trim punctuation that commonly trails a URL in prose or JSON.
function cleanUrl(url) {
  let trimmed = url;
  while (trimmed.length && /[.,;:!?)\]}'"]/.test(trimmed.at(-1))) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
}

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_SEGMENTS.has(entry.name)) {
      continue;
    }
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...walk(full));
    } else if (entry.isFile() && SCAN_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      found.push(full);
    }
  }
  return found;
}

function collectUrls() {
  const urlToFiles = new Map();
  for (const filePath of walk(rootDir)) {
    let contents;
    try {
      contents = readFileSync(filePath, "utf8");
    } catch {
      continue;
    }
    const matches = contents.match(URL_PATTERN);
    if (!matches) continue;
    for (const raw of matches) {
      const url = cleanUrl(raw);
      if (!/^https?:\/\//i.test(url)) continue;
      // Skip anything that still contains a template interpolation or a
      // URL with no hostname after the protocol.
      if (/\$\{|\s/.test(url)) continue;
      try {
        // eslint-disable-next-line no-new
        new URL(url);
      } catch {
        continue;
      }
      if (!urlToFiles.has(url)) {
        urlToFiles.set(url, new Set());
      }
      urlToFiles.get(url).add(relative(rootDir, filePath));
    }
  }
  return urlToFiles;
}

async function checkUrl(url) {
  // Try HEAD first (cheapest); fall back to GET if HEAD is blocked or 405.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const tryFetch = async method => {
    return fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "llamaha-link-checker/1.0 (+internal; run manually; report issues to site owner)"
      }
    });
  };
  try {
    let response;
    try {
      response = await tryFetch("HEAD");
      if (response.status === 405 || response.status === 501) {
        response = await tryFetch("GET");
      }
    } catch {
      response = await tryFetch("GET");
    }
    const finalUrl = response.url || url;
    const redirected = finalUrl !== url;
    return {
      url,
      status: response.status,
      ok: response.ok,
      redirected,
      finalUrl
    };
  } catch (err) {
    return {
      url,
      status: 0,
      ok: false,
      redirected: false,
      finalUrl: url,
      error: err.name === "AbortError" ? "timeout" : err.message
    };
  } finally {
    clearTimeout(timer);
  }
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let cursor = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

function classify(result) {
  if (result.status === 0) return "error";
  if (result.status >= 500) return "server-error";
  if (result.status >= 400) return "client-error";
  if (result.redirected) return "redirect";
  return "ok";
}

function render(results, urlToFiles) {
  const buckets = {
    "error": [],
    "server-error": [],
    "client-error": [],
    "redirect": [],
    "ok": []
  };
  for (const result of results) {
    buckets[classify(result)].push(result);
  }

  if (AS_JSON) {
    const payload = {
      total: results.length,
      ok: buckets.ok.length,
      redirect: buckets.redirect.length,
      client_error: buckets["client-error"].length,
      server_error: buckets["server-error"].length,
      error: buckets.error.length,
      issues: [
        ...buckets.error,
        ...buckets["server-error"],
        ...buckets["client-error"],
        ...buckets.redirect
      ].map(result => ({
        ...result,
        files: Array.from(urlToFiles.get(result.url) ?? [])
      }))
    };
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const section = (label, entries) => {
    if (!entries.length) return;
    console.log(`\n${label} (${entries.length})`);
    for (const result of entries) {
      const tag = result.status ? `${result.status}` : result.error ?? "error";
      const files = Array.from(urlToFiles.get(result.url) ?? []).slice(0, 3).join(", ") || "(unknown)";
      const to = result.redirected ? `  -> ${result.finalUrl}` : "";
      console.log(`  [${tag}] ${result.url}${to}`);
      console.log(`        in: ${files}`);
    }
  };

  console.log(
    `Checked ${results.length} URL${results.length === 1 ? "" : "s"}. ` +
      `OK: ${buckets.ok.length}, ` +
      `Redirect: ${buckets.redirect.length}, ` +
      `4xx: ${buckets["client-error"].length}, ` +
      `5xx: ${buckets["server-error"].length}, ` +
      `Errors: ${buckets.error.length}.`
  );

  section("Network errors", buckets.error);
  section("Server errors (5xx)", buckets["server-error"]);
  section("Broken (4xx)", buckets["client-error"]);
  section("Redirects", buckets.redirect);
}

async function main() {
  const urlToFiles = collectUrls();
  const urls = Array.from(urlToFiles.keys()).sort();
  if (!urls.length) {
    console.log("No external URLs found.");
    return;
  }

  const sample = Number.isFinite(LIMIT) ? urls.slice(0, LIMIT) : urls;
  if (!AS_JSON) {
    console.log(
      `Found ${urls.length} unique external URL${urls.length === 1 ? "" : "s"}. ` +
        `Checking ${sample.length} with concurrency ${CONCURRENCY}...`
    );
  }

  const results = await runPool(sample, checkUrl, CONCURRENCY);
  render(results, urlToFiles);

  const hasFailures = results.some(result =>
    result.status === 0 || result.status >= 400
  );
  process.exit(hasFailures ? 1 : 0);
}

main().catch(err => {
  console.error("check-external-links failed:", err);
  process.exit(2);
});
