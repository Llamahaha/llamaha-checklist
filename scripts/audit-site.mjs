import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { applicationCatalog, getAllApplications } from "../guides/applicationCatalog.js";
import { contentReviewData, getContentReview, getReviewLabel, reviewDateBounds, reviewStatus } from "../contentReviews.js";
import { getSiteSection, normalizeRoute } from "../siteNavigation.js";
import { appNewsItems } from "../appNewsData.js";
import { NEWS_STATUSES } from "../newsLifecycle.js";
import { findContentProblems } from "./audit-rules.mjs";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const errors = [];
const reviewWarnings = [];

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
    for (const problem of findContentProblems(html)) addError(`${problem}: ${relativePath}`);
    const route = normalizeRoute(relativePath);
    const review = getContentReview(route);
    if (!review) addError(`Missing content review record: ${relativePath}`);
    else {
      if (review.reviewedOn !== null && !reviewDateBounds(review.reviewedOn)) addError(`Invalid review date: ${relativePath}`);
      const status = reviewStatus(review);
      if (status === "future") addError(`Review date is in the future: ${relativePath}`);
      if (["undated", "overdue"].includes(status)) reviewWarnings.push(`${status}: ${relativePath}`);
      if (!Number.isInteger(review.reviewIntervalDays) || review.reviewIntervalDays < 1) addError(`Invalid review interval: ${relativePath}`);
      if (!Array.isArray(review.sources) || review.sources.some(source => !source.label || !/^https:\/\//.test(source.url))) addError(`Invalid review sources: ${relativePath}`);
      const dateAttribute = html.match(/data-review-date="([^"]+)"/);
      if (dateAttribute && dateAttribute[1] !== review.reviewedOn) addError(`Rendered review date disagrees with record: ${relativePath}`);
      if (relativePath.startsWith("guides/") && html.includes('data-render-mode="static"')) {
        const renderedLabel = html.match(/id="guideReviewLabel"[^>]*>([^<]*)<\/p>/)?.[1] ?? "";
        if (renderedLabel !== getReviewLabel(review)) addError(`Generated guide review label is out of date: ${relativePath}`);
      }
    }
    const expectedSection = route === "" ? "home" : route === "search" ? "search" : route === "app-news" ? "news" : ["contact", "ticket"].includes(route) ? "contact" : "support";
    for (const variant of [relativePath, route, `${route}/`]) {
      if (getSiteSection(variant) !== expectedSection) addError(`Navigation section mismatch: ${variant}`);
    }

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

function checkReviewRecords(files) {
  const routes = new Set(files.filter(file => extname(file) === ".html").map(file => normalizeRoute(displayPath(file))));
  for (const route of Object.keys(contentReviewData)) {
    if (!routes.has(route)) addError(`Review record has no page: ${route}`);
  }
}

function checkNews() {
  const ids = new Set();
  for (const item of appNewsItems) {
    if (ids.has(item.id)) addError(`Duplicate news ID: ${item.id}`);
    ids.add(item.id);
    if (!item.isPublished || item.isPlaceholder) continue;
    if (!NEWS_STATUSES[item.status]) addError(`Unknown news status: ${item.id}`);
    if (!Object.hasOwn(item, "lastCheckedAt")) addError(`Missing news verification field: ${item.id}`);
    if (item.lastCheckedAt !== null && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(item.lastCheckedAt) || !Number.isFinite(Date.parse(item.lastCheckedAt)) || Date.parse(item.lastCheckedAt) > Date.now())) addError(`Invalid news verification timestamp: ${item.id}`);
    if (["investigating", "monitoring", "resolved"].includes(item.status) && !item.lastCheckedAt) addError(`News status needs a documented check: ${item.id}`);
    if (!item.sourceUrls?.length || item.sourceUrls.some(url => !/^https:\/\//.test(url))) addError(`Published news needs source URLs: ${item.id}`);
  }
}

verifyWorkspaceRoot();

const files = walk(rootDir);
const stalePhraseSummary = checkStalePhrases(files);
const catalogSummary = checkCatalogCoverage(files);
const metadataSummary = checkMetadata(files);
checkReviewRecords(files);
checkNews();
if (reviewWarnings.length) {
  console.warn(`Review queue: ${reviewWarnings.filter(item => item.startsWith("overdue")).length} overdue; ${reviewWarnings.filter(item => item.startsWith("undated")).length} without a recorded date. Dates were not advanced automatically.`);
  if (process.argv.includes("--reviews")) reviewWarnings.forEach(item => console.warn(`- ${item}`));
}

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
