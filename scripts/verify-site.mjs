import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { buildInternalSearchIndex } from "../internalSearchIndex.js";
import { publicAppHelpSections } from "../publicPageData.js";
import { slugifyText } from "../resourceCommon.js";
import { buildSearchIndex } from "../searchIndex.js";
import { getSitemapEntries, SITEMAP_BASE_URL } from "./generate-sitemap.mjs";
import { buildAppGuideUrl, getVendorApplications } from "../guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "../guides/guideData.js";
import { getPublicGuideContent } from "../guides/publicGuideContent.js";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const linksOnly = process.argv.includes("--links-only");
const errors = [];

const publicRoutes = [
  "index.html",
  "search.html",
  "support.html",
  "computer-issues.html",
  "vendor-guides.html",
  "applications.html",
  "app-licensing.html",
  "tips-and-tricks.html",
  "contact.html"
];

const internalRoutes = [
  "internal/index.html",
  "internal/search.html",
  "internal/support.html",
  "internal/reference-guides.html",
  "internal/tips-and-tricks.html",
  "internal/tools.html",
  "internal/snippets.html",
  "internal/playbooks.html",
  "internal/checklist.html",
  "internal/reference/mailbox-decommission.html",
  "internal/reference/warranty-lookup.html"
];

const populatedPublicGuides = [
  ["microsoft", "outlook"],
  ["microsoft", "teams"],
  ["microsoft", "onedrive"],
  ["microsoft", "sharepoint"],
  ["microsoft", "outlook-mobile"],
  ["microsoft", "teams-mobile"],
  ["microsoft", "microsoft-authenticator"],
  ["adobe", "acrobat-pro"],
  ["adobe", "indesign"],
  ["bluebeam", "revu-21"],
  ["autodesk", "autocad"],
  ["autodesk", "revit"],
  ["autodesk", "civil-3d"],
  ["autodesk", "infoworks-icm"],
  ["esri", "arcgis-pro"],
  ["esri", "arcgis-online"],
  ["bentley", "projectwise"],
  ["bentley", "microstation"],
  ["bentley", "connection-client"],
  ["bentley", "openroads-designer"],
  ["browsers", "google-chrome"],
  ["browsers", "microsoft-edge"],
  ["browsers", "mozilla-firefox"],
  ["browsers", "apple-safari"],
  ["fortinet", "forticlient-vpn"],
  ["citrix", "workspace-app"],
  ["oracle", "primavera-p6"],
  ["ptc", "mathcad-prime"],
  ["trimble", "trimble-business-center"],
  ["adobe", "creative-cloud-desktop"],
  ["adobe", "photoshop"],
  ["adobe", "illustrator"],
  ["foxit", "pdf-editor"],
  ["foxit", "pdf-reader"],
  ["google", "google-earth-pro"],
  ["hec", "hec-hms"],
  ["hec", "hec-ras"],
  ["hec", "hec-dssvue"],
  ["hec", "hec-dss"],
  ["hec", "hec-ssp"],
  ["hec", "hec-georas"],
  ["mctrans", "hcs"],
  ["mctrans", "hss"],
  ["axiom", "axiom"],
  ["adobe", "acrobat-sign"],
  ["autodesk", "construction-cloud"],
  ["autodesk", "vault"],
  ["microsoft", "project"],
  ["trimble", "trimble-connect"],
  ["deltek", "vantagepoint"],
  ["docusign", "docusign-web"],
  ["zoom", "zoom-meetings"],
  ["cisco", "webex"],
  ["box", "box-drive"],
  ["dropbox", "dropbox-desktop"],
  ["duo", "duo-mobile"],
  ["okta", "okta-verify"]
];

const dynamicAnchorFiles = new Set([
  resolve(rootDir, "support.html"),
  resolve(rootDir, "computer-issues.html"),
  resolve(rootDir, "vendor-guides.html"),
  resolve(rootDir, "tips-and-tricks.html"),
  resolve(rootDir, "microsoft-issues.html"),
  resolve(rootDir, "internal/tips-and-tricks.html"),
  resolve(rootDir, "internal/playbooks.html"),
  resolve(rootDir, "internal/snippets.html"),
  resolve(rootDir, "internal/reference-guides.html")
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

function fileExists(relativePath) {
  try {
    return statSync(resolve(rootDir, relativePath)).isFile();
  } catch {
    return false;
  }
}

function read(relativePath) {
  return readFileSync(resolve(rootDir, relativePath), "utf8");
}

function addError(message) {
  errors.push(message);
}

function displayPath(filePath) {
  return relative(rootDir, filePath).replaceAll("\\", "/");
}

function parseIds(html) {
  const ids = new Set();
  const pattern = /\sid=(["'])([^"']+)\1/gi;
  let match;
  while ((match = pattern.exec(html))) {
    ids.add(match[2]);
  }
  return ids;
}

function parseAttribute(html, attributeName) {
  const values = [];
  const pattern = new RegExp(`\\s${attributeName}=(["'])([^"']+)\\1`, "gi");
  let match;
  while ((match = pattern.exec(html))) {
    values.push(match[2]);
  }
  return values;
}

function shouldIgnoreLocalRef(ref) {
  return !ref || ref.startsWith("http://") || ref.startsWith("https://") || ref.startsWith("mailto:") || ref.startsWith("tel:");
}

function resolveRelative(fromFile, target) {
  return resolve(fromFile, "..", target);
}

function verifyHtmlLinks() {
  const htmlFiles = walk(rootDir).filter(file => extname(file).toLowerCase() === ".html");

  for (const htmlFile of htmlFiles) {
    const html = readFileSync(htmlFile, "utf8");
    const ids = parseIds(html);
    const refs = [
      ...parseAttribute(html, "href"),
      ...parseAttribute(html, "src")
    ];

    for (const ref of refs) {
      if (shouldIgnoreLocalRef(ref)) {
        continue;
      }

      const [targetPart, anchor] = ref.split("#");
      const targetPath = targetPart.split("?")[0];

      if (!targetPath) {
        if (anchor && !ids.has(anchor) && !dynamicAnchorFiles.has(htmlFile)) {
          addError(`Missing anchor "#${anchor}" in ${htmlFile}`);
        }
        continue;
      }

      const targetFile = resolveRelative(htmlFile, targetPath);
      let targetHtml;

      try {
        if (!statSync(targetFile).isFile()) {
          addError(`Missing file "${ref}" referenced by ${htmlFile}`);
          continue;
        }
      } catch {
        addError(`Missing file "${ref}" referenced by ${htmlFile}`);
        continue;
      }

      if (anchor) {
        targetHtml = readFileSync(targetFile, "utf8");
        const targetIds = parseIds(targetHtml);
        if (!targetIds.has(anchor) && !dynamicAnchorFiles.has(targetFile)) {
          addError(`Missing anchor "${ref}" referenced by ${htmlFile}`);
        }
      }
    }
  }
}

function getAppHelpAnchorIds() {
  const ids = new Set();

  for (const section of publicAppHelpSections) {
    const sectionId = slugifyText(section.title);
    ids.add(sectionId);

    if (sectionId === "full-application-directory") {
      for (const group of section.groups) {
        ids.add(group.id ?? slugifyText(group.title));
      }
    }
  }

  return ids;
}

function verifyDynamicAppHelpAnchors() {
  const validAnchors = getAppHelpAnchorIds();
  const htmlFiles = walk(rootDir).filter(file => extname(file).toLowerCase() === ".html");
  const appHelpRefs = [];

  for (const htmlFile of htmlFiles) {
    const html = readFileSync(htmlFile, "utf8");
    appHelpRefs.push(
      ...parseAttribute(html, "href")
        .filter(ref => ref.startsWith("vendor-guides.html#"))
        .map(ref => ({ ref, source: htmlFile }))
    );
  }

  for (const entry of buildSearchIndex()) {
    if (entry.url.startsWith("vendor-guides.html#")) {
      appHelpRefs.push({ ref: entry.url, source: "search index" });
    }
  }

  for (const { ref, source } of appHelpRefs) {
    const anchor = decodeURIComponent(ref.split("#")[1] ?? "");
    if (!validAnchors.has(anchor)) {
      addError(`Missing dynamic App Help anchor "${ref}" referenced by ${source}`);
    }
  }
}

function verifyPublicRoutes() {
  for (const route of publicRoutes) {
    if (!fileExists(route)) {
      addError(`Missing required public route: ${route}`);
    }
  }
}

function verifyInternalRoutes() {
  for (const route of internalRoutes) {
    if (!fileExists(route)) {
      addError(`Missing required internal route: ${route}`);
    }
  }
}

function verifyGuideFiles() {
  for (const vendorSlug of vendorOrder) {
    if (!vendorGuides[vendorSlug]) {
      addError(`Vendor "${vendorSlug}" is in vendorOrder but missing from vendorGuides`);
      continue;
    }

    const vendorFile = `guides/${vendorSlug}.html`;
    if (!fileExists(vendorFile)) {
      addError(`Missing vendor guide file: ${vendorFile}`);
    }

    for (const app of getVendorApplications(vendorSlug)) {
      const guidePath = buildAppGuideUrl(vendorSlug, app.slug);
      if (!fileExists(guidePath)) {
        addError(`Missing app guide file: ${guidePath}`);
      }
    }
  }
}

function verifySearchIndex() {
  for (const entry of buildSearchIndex()) {
    if (shouldIgnoreLocalRef(entry.url)) {
      continue;
    }

    const [targetPart] = entry.url.split("#");
    if (!targetPart) {
      continue;
    }

    if (!fileExists(targetPart)) {
      addError(`Search index entry "${entry.title}" points to missing file: ${entry.url}`);
    }

    // Public search must never surface internal/tech-only pages.
    if (/(^|\/)internal\//.test(entry.url)) {
      addError(`Search index entry "${entry.title}" leaks an internal URL: ${entry.url}`);
    }
    const internalCategories = new Set([
      "internalGuide",
      "internalTip",
      "internalSnippet",
      "internalTemplate",
      "internalPlaybook",
      "internalReference"
    ]);
    if (entry.category && internalCategories.has(entry.category)) {
      addError(
        `Search index entry "${entry.title}" has internal category "${entry.category}" in the customer index`
      );
    }
  }
}

function verifyInternalSearchIndex() {
  const internalSearchBase = resolve(rootDir, "internal/search.html");

  for (const entry of buildInternalSearchIndex()) {
    if (shouldIgnoreLocalRef(entry.url)) {
      continue;
    }

    const [targetPart] = entry.url.split("#");
    if (!targetPart) {
      continue;
    }

    const targetFile = resolveRelative(internalSearchBase, targetPart);
    try {
      if (!statSync(targetFile).isFile()) {
        addError(`Internal search entry "${entry.title}" points to missing file: ${entry.url}`);
      }
    } catch {
      addError(`Internal search entry "${entry.title}" points to missing file: ${entry.url}`);
    }
  }
}

function parseSitemapUrls(xml) {
  const urls = [];
  const pattern = /<loc>([^<]+)<\/loc>/gi;
  let match;

  while ((match = pattern.exec(xml))) {
    urls.push(match[1]);
  }

  return urls;
}

function verifySitemap() {
  if (!fileExists("sitemap.xml")) {
    addError("Missing sitemap.xml");
    return;
  }

  if (!fileExists("robots.txt")) {
    addError("Missing robots.txt");
  } else {
    const robots = read("robots.txt");
    if (!robots.includes(`Sitemap: ${SITEMAP_BASE_URL}sitemap.xml`)) {
      addError("robots.txt does not reference sitemap.xml");
    }
  }

  const actualUrls = parseSitemapUrls(read("sitemap.xml"));
  const expectedUrls = getSitemapEntries().map(entry => entry.url);
  const actualSet = new Set(actualUrls);
  const expectedSet = new Set(expectedUrls);

  for (const url of actualUrls) {
    if (!url.startsWith(SITEMAP_BASE_URL)) {
      addError(`Sitemap URL is outside ${SITEMAP_BASE_URL}: ${url}`);
    }

    if (url.includes("/internal/")) {
      addError(`Sitemap URL exposes internal content: ${url}`);
    }

    if (!expectedSet.has(url)) {
      addError(`Sitemap contains unexpected URL: ${url}`);
    }
  }

  for (const url of expectedUrls) {
    if (!actualSet.has(url)) {
      addError(`Sitemap is missing public URL: ${url}`);
    }
  }
}

function verifyBrandingAssets() {
  const htmlFiles = walk(rootDir).filter(file => extname(file).toLowerCase() === ".html");
  const sharedFaviconPattern =
    /<link\b(?=[^>]*\brel=(["'])icon\1)(?=[^>]*\bhref=(["'])[^"']*llamaha-icon-purple-navy\.png\2)[^>]*>/i;
  const retiredIconPattern = /llamaha-icon(?:\.jpg|-blue-[^"']*\.png)/i;

  for (const htmlFile of htmlFiles) {
    const html = readFileSync(htmlFile, "utf8");
    const relativePath = displayPath(htmlFile);

    if (retiredIconPattern.test(html)) {
      addError(`HTML page "${relativePath}" references a retired Llamaha icon asset`);
    }

    if (!sharedFaviconPattern.test(html)) {
      addError(`HTML page "${relativePath}" is missing the shared purple favicon`);
    }
  }
}

// Customer-facing pages must not link directly to /internal content. The redirect
// pages below intentionally bounce to internal counterparts; everything else is a leak.
const internalRedirectExceptions = new Set([
  resolve(rootDir, "checklist.html"),
  resolve(rootDir, "snippets.html"),
  resolve(rootDir, "templates.html"),
  resolve(rootDir, "emergency-playbooks.html"),
  resolve(rootDir, "decision-trees.html")
]);

function verifyNoInternalLeaksInPublicPages() {
  for (const filePath of walk(rootDir)) {
    if (extname(filePath) !== ".html") continue;
    // Skip anything actually inside /internal and the known redirect shims.
    if (filePath.includes(`${resolve(rootDir, "internal")}/`) || filePath.endsWith("/internal")) continue;
    if (internalRedirectExceptions.has(filePath)) continue;

    const contents = readFileSync(filePath, "utf8");
    // Catch href/src targets that point at internal content.
    const matches = contents.match(/(?:href|src)\s*=\s*["'](?:\.\/)?internal\/[^"'#]+["']/gi);
    if (matches && matches.length) {
      const relative = filePath.replace(`${rootDir}/`, "");
      addError(
        `Public page "${relative}" links to internal content: ${matches.slice(0, 3).join(", ")}`
      );
    }
  }
}

function verifyPublicGuideContent() {
  const requiredSections = [
    "summary",
    "overview",
    "askFirst",
    "licensing",
    "install",
    "supportCheckpoints",
    "commonIssues",
    "supportArtifacts"
  ];
  const optionalSectionsByGuide = {
    "fortinet/forticlient-vpn": new Set(["licensing"]),
    "citrix/workspace-app": new Set(["licensing"])
  };

  for (const [vendorSlug, appSlug] of populatedPublicGuides) {
    const content = getPublicGuideContent(vendorSlug, appSlug);
    if (!content || !Object.keys(content).length) {
      addError(`Public guide content is missing for ${vendorSlug}/${appSlug}`);
      continue;
    }

    const optionalSections = optionalSectionsByGuide[`${vendorSlug}/${appSlug}`] ?? new Set();

    for (const section of requiredSections) {
      if (optionalSections.has(section)) {
        continue;
      }

      const value = content[section];
      const hasContent = Array.isArray(value) ? value.length > 0 : Boolean(value);
      if (!hasContent) {
        addError(`Public guide content section "${section}" is empty for ${vendorSlug}/${appSlug}`);
      }
    }
  }
}

verifyHtmlLinks();
verifyDynamicAppHelpAnchors();

if (!linksOnly) {
  verifyPublicRoutes();
  verifyInternalRoutes();
  verifyGuideFiles();
  verifySearchIndex();
  verifyInternalSearchIndex();
  verifySitemap();
  verifyBrandingAssets();
  verifyNoInternalLeaksInPublicPages();
  verifyPublicGuideContent();
}

if (errors.length) {
  console.error("Verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(linksOnly ? "Link verification passed." : "Site verification passed.");
