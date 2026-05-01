import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

export const SITEMAP_BASE_URL = "https://llamaha.com/";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputPath = resolve(rootDir, "sitemap.xml");
const excludedHtmlFiles = new Set([
  "checklist.html",
  "decision-trees.html",
  "emergency-playbooks.html",
  "index-redesign.html",
  "snippets.html",
  "templates.html"
]);

function walk(dir) {
  const items = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      items.push(...walk(fullPath));
    } else {
      items.push(fullPath);
    }
  }

  return items;
}

function toPosixPath(filePath) {
  return filePath.split(sep).join("/");
}

function isNoIndex(filePath) {
  try {
    const fd = readdirSync; // referenced just to keep node-fs import; not used directly
  } catch {}
  try {
    const text = readFileSync(filePath, "utf8").slice(0, 2048);
    return /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(text);
  } catch {
    return false;
  }
}

function isPublicHtml(relativePath, fullPath) {
  if (extname(relativePath).toLowerCase() !== ".html") return false;
  if (relativePath.startsWith("internal/")) return false;
  if (relativePath.startsWith("guides/") && relativePath.endsWith("/index.html") && relativePath !== "guides/index.html") return false;
  if (excludedHtmlFiles.has(relativePath)) return false;
  if (fullPath && isNoIndex(fullPath)) return false;
  return true;
}

function toUrl(relativePath) {
  if (relativePath === "index.html") {
    return SITEMAP_BASE_URL;
  }

  if (relativePath.endsWith("/index.html")) {
    return new URL(relativePath.replace(/index\.html$/, ""), SITEMAP_BASE_URL).href;
  }

  return new URL(relativePath, SITEMAP_BASE_URL).href;
}

export function getSitemapEntries() {
  return walk(rootDir)
    .map(filePath => ({ relativePath: toPosixPath(relative(rootDir, filePath)), fullPath: filePath }))
    .filter(item => isPublicHtml(item.relativePath, item.fullPath))
    .map(item => item.relativePath)
    .sort((a, b) => toUrl(a).localeCompare(toUrl(b)))
    .map(relativePath => ({
      path: relativePath,
      url: toUrl(relativePath)
    }));
}

export function buildSitemap(entries = getSitemapEntries()) {
  const urls = entries
    .map(entry => `  <url>\n    <loc>${entry.url}</loc>\n  </url>`)
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    ""
  ].join("\n");
}

function writeSitemap() {
  const sitemap = buildSitemap();
  writeFileSync(outputPath, sitemap, "utf8");
  const entryCount = getSitemapEntries().length;
  console.log(`Wrote sitemap.xml with ${entryCount} public URLs.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeSitemap();
}
