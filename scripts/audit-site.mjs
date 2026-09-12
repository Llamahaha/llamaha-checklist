import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { applicationCatalog, getAllApplications } from "../guides/applicationCatalog.js";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const errors = [];

const METADATA_MIN_DESCRIPTION_LENGTH = 80;
const METADATA_MAX_DESCRIPTION_LENGTH = 180;

const ignoredDirectories = new Set([".git", "node_modules"]);
const scannedTextExtensions = new Set([".html", ".js", ".mjs"]);

const sanitizerFiles = new Set([
  "guides/guide.js",
  "resourceCommon.js",
  "scripts/generate-friendly-url-aliases.mjs",
  "scripts/generate-static-guides.mjs"
]);

const stalePhraseRules = [
  { label: "Web Webex", pattern: /\bWeb Webex\b/i },
  { label: "company company sign-in", pattern: /\bcompany company sign-in\b/i, allowedPaths: sanitizerFiles },
  { label: "local-saved local data", pattern: /\blocal-saved local data\b/i },
  { label: "saved local data pressure", pattern: /\bsaved local data pressure\b/i },
  { label: "local saved local data", pattern: /\blocal saved local data\b/i },
  { label: "support team-console", pattern: /\bsupport team-console\b/i },
  { label: "user setup your firm has set up", pattern: /\buser setup your firm has set up\b/i },
  { label: "Adobe account setup", pattern: /\bAdobe account setup\b/i },
  { label: "H20Net", pattern: /\bH20Net\b/ }
];

const ignoredTopLevelGuidePages = new Set([
  "guides/index.html",
  "guides/sketchup.html"
]);

function walk(dir) {
  const items = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) {
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

function displayPath(filePath) {
  return toPosixPath(relative(rootDir, filePath));
}

function addError(message) {
  errors.push(message);
}

function lineAndColumn(text, index) {
  const before = text.slice(0, index);
  const lines = before.split(/\r?\n/);
  return {
    line: lines.length,
    column: lines.at(-1).length + 1
  };
}

function parseAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([:\w-]+)=(['"])(.*?)\2/g)) {
    attrs[match[1].toLowerCase()] = match[3].trim();
  }
  return attrs;
}

function parseHtmlMetadata(html) {
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => parseAttributes(match[0]));
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => parseAttributes(match[0]));

  return {
    title: html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? "",
    description: metaTags.find(attrs => attrs.name === "description")?.content ?? "",
    canonical: linkTags.find(attrs => attrs.rel === "canonical")?.href ?? "",
    noindex: (metaTags.find(attrs => attrs.name === "robots")?.content ?? "").toLowerCase().includes("noindex")
  };
}

function isIndexableHtml(relativePath, metadata) {
  return relativePath.endsWith(".html") && !relativePath.startsWith("internal/") && !relativePath.startsWith("dist/") && !metadata.noindex;
}

function checkStalePhrases(files) {
  const textFiles = files.filter(file => scannedTextExtensions.has(extname(file).toLowerCase()));
  let scannedCount = 0;

  for (const file of textFiles) {
    const relativePath = displayPath(file);
    if (relativePath === "scripts/audit-site.mjs") {
      continue;
    }

    scannedCount += 1;
    const text = readFileSync(file, "utf8");

    for (const rule of stalePhraseRules) {
      if (rule.allowedPaths?.has(relativePath)) {
        continue;
      }

      const match = rule.pattern.exec(text);
      if (!match) {
        continue;
      }

      const location = lineAndColumn(text, match.index);
      addError(`Stale phrase "${rule.label}" found in ${relativePath}:${location.line}:${location.column}`);
    }
  }

  return { scannedCount };
}

function checkCatalogCoverage(files) {
  const allApplications = getAllApplications();
  const expectedAppGuidePaths = new Set(
    allApplications.map(app => `guides/${app.vendorSlug}/${app.slug}.html`)
  );
  const vendorSlugs = new Set(Object.keys(applicationCatalog));
  const htmlPaths = new Set(files.map(displayPath));

  for (const appPath of expectedAppGuidePaths) {
    if (!htmlPaths.has(appPath)) {
      addError(`Catalog app is missing a generated guide page: ${appPath}`);
    }
  }

  for (const vendorSlug of vendorSlugs) {
    const vendorPath = `guides/${vendorSlug}.html`;
    if (!htmlPaths.has(vendorPath)) {
      addError(`Catalog vendor is missing a vendor guide page: ${vendorPath}`);
    }
  }

  for (const file of files) {
    const relativePath = displayPath(file);
    const metadata = extname(file).toLowerCase() === ".html"
      ? parseHtmlMetadata(readFileSync(file, "utf8"))
      : { noindex: false };

    if (metadata.noindex) {
      continue;
    }

    const guideAppMatch = relativePath.match(/^guides\/([^/]+)\/([^/]+)\.html$/);
    if (guideAppMatch && guideAppMatch[2] !== "index" && !expectedAppGuidePaths.has(relativePath)) {
      addError(`Generated guide page is not present in the application catalog: ${relativePath}`);
    }

    const topLevelGuideMatch = relativePath.match(/^guides\/([^/]+)\.html$/);
    if (topLevelGuideMatch && !ignoredTopLevelGuidePages.has(relativePath) && !vendorSlugs.has(topLevelGuideMatch[1])) {
      addError(`Top-level guide page does not match a catalog vendor: ${relativePath}`);
    }
  }

  return {
    vendors: vendorSlugs.size,
    apps: allApplications.length
  };
}

function checkMetadata(files) {
  const htmlFiles = files.filter(file => extname(file).toLowerCase() === ".html");
  let indexableCount = 0;

  for (const file of htmlFiles) {
    const relativePath = displayPath(file);
    const html = readFileSync(file, "utf8");
    const metadata = parseHtmlMetadata(html);

    if (!isIndexableHtml(relativePath, metadata)) {
      continue;
    }

    indexableCount += 1;

    if (!metadata.title) {
      addError(`Indexable page is missing a title: ${relativePath}`);
    }

    if (!metadata.description) {
      addError(`Indexable page is missing a meta description: ${relativePath}`);
    } else if (metadata.description.length < METADATA_MIN_DESCRIPTION_LENGTH) {
      addError(`Meta description is too short (${metadata.description.length} chars): ${relativePath}`);
    } else if (metadata.description.length > METADATA_MAX_DESCRIPTION_LENGTH) {
      addError(`Meta description is too long (${metadata.description.length} chars): ${relativePath}`);
    }

    if (!metadata.canonical) {
      addError(`Indexable page is missing a canonical URL: ${relativePath}`);
    }
  }

  return {
    htmlFiles: htmlFiles.length,
    indexableCount
  };
}

function verifyWorkspaceRoot() {
  const packagePath = resolve(rootDir, "package.json");
  if (!existsSync(packagePath) || !statSync(packagePath).isFile()) {
    addError(`Could not find package.json at ${packagePath}`);
  }
}

verifyWorkspaceRoot();

const files = walk(rootDir);
const stalePhraseSummary = checkStalePhrases(files);
const catalogSummary = checkCatalogCoverage(files);
const metadataSummary = checkMetadata(files);

if (errors.length > 0) {
  console.error("Site audit failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log("Site audit passed.");
  console.log(`Scanned ${stalePhraseSummary.scannedCount} text files for stale phrases.`);
  console.log(`Catalog coverage: ${catalogSummary.vendors} vendors, ${catalogSummary.apps} apps.`);
  console.log(`Metadata coverage: ${metadataSummary.htmlFiles} HTML files, ${metadataSummary.indexableCount} indexable pages.`);
}
