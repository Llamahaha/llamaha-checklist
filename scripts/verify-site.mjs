import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { buildSearchIndex } from "../searchIndex.js";
import { buildAppGuideUrl, getVendorApplications } from "../guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "../guides/guideData.js";
import { getPublicGuideContent } from "../guides/publicGuideContent.js";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const linksOnly = process.argv.includes("--links-only");
const errors = [];

const publicRoutes = [
  "index.html",
  "search.html",
  "computer-issues.html",
  "vendor-guides.html",
  "applications.html",
  "app-licensing.html",
  "tips-and-tricks.html",
  "contact.html"
];

const populatedPublicGuides = [
  ["microsoft", "outlook"],
  ["microsoft", "teams"],
  ["microsoft", "onedrive"],
  ["microsoft", "outlook-mobile"],
  ["microsoft", "teams-mobile"],
  ["microsoft", "microsoft-authenticator"],
  ["adobe", "acrobat-pro"],
  ["bluebeam", "revu-21"],
  ["autodesk", "autocad"],
  ["autodesk", "revit"],
  ["autodesk", "civil-3d"],
  ["esri", "arcgis-pro"],
  ["bentley", "projectwise"],
  ["browsers", "google-chrome"],
  ["browsers", "microsoft-edge"],
  ["browsers", "mozilla-firefox"],
  ["browsers", "apple-safari"],
  ["fortinet", "forticlient-vpn"],
  ["citrix", "workspace-app"],
  ["oracle", "primavera-p6"]
];

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

      if (!targetPart) {
        if (anchor && !ids.has(anchor)) {
          addError(`Missing anchor "#${anchor}" in ${htmlFile}`);
        }
        continue;
      }

      const targetFile = resolveRelative(htmlFile, targetPart);
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
        if (!targetIds.has(anchor)) {
          addError(`Missing anchor "${ref}" referenced by ${htmlFile}`);
        }
      }
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

if (!linksOnly) {
  verifyPublicRoutes();
  verifyGuideFiles();
  verifySearchIndex();
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
