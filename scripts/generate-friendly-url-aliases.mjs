// scripts/generate-friendly-url-aliases.mjs
//
// Build root-level redirect folders so users can navigate to llamaha.com/bluebeam,
// /adobe, /acrobat, /vpn, /cloud-pc, etc. Each alias folder contains an
// index.html that redirects to the canonical guide page.
//
// Run with:  node scripts/generate-friendly-url-aliases.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { vendorGuides, vendorOrder } from "../guides/guideData.js";
import {
  getVendorApplications,
  buildAppGuideUrl
} from "../guides/applicationCatalog.js";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));

function publicizeText(value = "") {
  return String(value)
    .replace(/\bOWA\b/g, "Outlook on the web")
    .replace(/\bUPN\b/g, "work account email")
    .replace(/\bclient-standard\b/gi, "company-approved")
    .replace(/\bdesktop client\b/gi, "desktop app")
    .replace(/\bweb client\b/gi, "web app")
    .replace(/\bclient app\b/gi, "app")
    .replace(/\bclient apps\b/gi, "apps")
    .replace(/\btenant\b/gi, "organization")
    .replace(/\bworkstations\b/gi, "computers")
    .replace(/\bworkstation\b/gi, "computer")
    .replace(/\bhandoff\b/gi, "setup")
    .replace(/\bproject admin\b/gi, "project owner")
    .replace(/\bIT admin\b/gi, "IT")
    .replace(/\badmins\b/gi, "support team")
    .replace(/\badmin\b/gi, "support team")
    .replace(/\bSSO\b/g, "company sign-in")
    .replace(/\bMFA\b/g, "multi-factor sign-in")
    .replace(/\bMDM\b/g, "company device management")
    .replace(/\bTOTP\b/g, "one-time passcode")
    .replace(/\bvCPU\b/g, "processor")
    .replace(/\bIRM\b/g, "protected-library policy")
    .replace(/\bDLP\b/g, "data-protection policy")
    .replace(/\bConditional Access\b/g, "company sign-in policy")
    .replace(/\bEntra\b/g, "Microsoft work sign-in")
    .replace(/\bAzure AD\b/g, "Microsoft work sign-in")
    .replace(/\bAAD\b/g, "Microsoft work sign-in")
    .replace(/\bMSI\b/g, "installer")
    .replace(/\bidentity provider\b/gi, "company sign-in page")
    .replace(/\bdeployments\b/gi, "setup options")
    .replace(/\bdeployed\b/gi, "installed")
    .replace(/\bdeploying\b/gi, "setting up")
    .replace(/\bdeployment\b/gi, "setup")
    .replace(/\bdeploy\b/gi, "install")
    .replace(/\bprovisioned\b/gi, "set up")
    .replace(/\bprovisioning\b/gi, "setup")
    .replace(/\bdeprovision cleanup\b/gi, "account cleanup")
    .replace(/\bdatasources\b/gi, "data sources")
    .replace(/\bdatasource\b/gi, "data source")
    .replace(/\bstale\b/gi, "out of date")
    .replace(/\bcaches\b/gi, "saved local data")
    .replace(/\bcache\b/gi, "saved local data")
    .replace(/\bregistry edits\b/gi, "advanced system changes")
    .replace(/\bregistry\b/gi, "system settings")
    .replace(/\ban multi-factor sign-in\b/gi, "a multi-factor sign-in")
    .replace(/\bcompany sign-in sign-in\b/gi, "company sign-in")
    .replace(/\bmulti-factor sign-in sign-in\b/gi, "multi-factor sign-in");
}

function aliasTemplate({ title, summary, targetUrl }) {
  const publicTitle = publicizeText(title);
  const publicSummary = publicizeText(summary);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PMCQW995ZM"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-PMCQW995ZM');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${publicTitle}</title>
  <meta name="description" content="${publicSummary}">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0; url=${targetUrl.replace(/^\//, "../")}">
  <link rel="canonical" href="${targetUrl.replace(/^\//, "../")}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" href="../assets/llamaha-icon-purple-navy.png">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <main style="font-family:'Plus Jakarta Sans',sans-serif;max-width:560px;margin:48px auto;padding:0 20px;color:#e6ebf5;">
    <h1 style="font-size:1.4rem;margin:0 0 8px;">${publicTitle}</h1>
    <p style="margin:0 0 16px;color:rgba(230,235,245,0.7);">${publicSummary}</p>
    <p><a href="${targetUrl.replace(/^\//, "../")}" style="color:#9a4ea3;">Open the page now</a></p>
  </main>
</body>
</html>
`;
}

function writeAlias(slug, opts) {
  const dir = join(rootDir, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), aliasTemplate(opts), "utf8");
}

let count = 0;

// Top-level page aliases
const topLevelAliases = [
  { slug: "guides", title: "App Help", summary: "Open the Llamaha App Help directory.", targetUrl: "/vendor-guides.html" },
  { slug: "app-help", title: "App Help", summary: "Open the Llamaha App Help directory.", targetUrl: "/vendor-guides.html" },
  { slug: "vendor-guides", title: "Vendor and App Guides", summary: "Open the vendor and app guide directory.", targetUrl: "/vendor-guides.html" },
  { slug: "applications", title: "Application Guides", summary: "Open the application guide directory.", targetUrl: "/applications.html" },
  { slug: "apps", title: "Application Guides", summary: "Open the application guide directory.", targetUrl: "/applications.html" },
  { slug: "support", title: "Support pages", summary: "Open the Llamaha support pages.", targetUrl: "/support.html" },
  { slug: "support-pages", title: "Support pages", summary: "Open the Llamaha support pages.", targetUrl: "/support.html" },
  { slug: "contact", title: "Contact IT", summary: "Open the contact page.", targetUrl: "/contact.html" },
  { slug: "licensing", title: "App Licensing Help", summary: "Open the licensing help page.", targetUrl: "/app-licensing.html" },
  { slug: "app-licensing", title: "App Licensing Help", summary: "Open the licensing help page.", targetUrl: "/app-licensing.html" },
  { slug: "search", title: "Search", summary: "Open site search.", targetUrl: "/search.html" }
];

for (const alias of topLevelAliases) {
  writeAlias(alias.slug, alias);
  count++;
}

// Vendor aliases — /<vendor-slug>/ → /guides/<vendor-slug>.html
for (const vendorSlug of vendorOrder) {
  const vendor = vendorGuides[vendorSlug];
  if (!vendor) continue;
  writeAlias(vendorSlug, {
    title: `${vendor.title} App Help`,
    summary: vendor.summary,
    targetUrl: `/guides/${vendorSlug}.html`
  });
  count++;
}

// App aliases — /<app-slug>/ → /guides/<vendor-slug>/<app-slug>.html
// Skip slugs that conflict with a vendor, a top-level page, or another app.
const reservedSlugs = new Set([
  ...topLevelAliases.map(a => a.slug),
  ...vendorOrder,
  // existing top-level files / folders we should not shadow
  "index.html", "robots.txt", "sitemap.xml", "styles.css", "package.json",
  "guides", "articles", "internal", "data", "assets", "scripts",
  "search", "support", "contact"
]);

const appSlugSeen = new Map(); // slug -> { vendor, app } first taker
const appAliasConflicts = [];

for (const vendorSlug of vendorOrder) {
  const apps = getVendorApplications(vendorSlug);
  for (const app of apps) {
    const slug = app.slug;
    if (reservedSlugs.has(slug)) {
      // Vendor or top-level page already owns this slug — skip
      continue;
    }
    if (appSlugSeen.has(slug)) {
      // Two vendors define the same app slug. Track for review and skip.
      appAliasConflicts.push({ slug, first: appSlugSeen.get(slug), second: { vendorSlug, appSlug: slug } });
      continue;
    }
    appSlugSeen.set(slug, { vendorSlug, appSlug: slug });
    writeAlias(slug, {
      title: `${app.name} | ${vendorGuides[vendorSlug].title} App Help`,
      summary: app.summary ?? app.focus ?? `Open the ${app.name} guide.`,
      targetUrl: `/${buildAppGuideUrl(vendorSlug, slug)}`
    });
    count++;
  }
}

// Friendly aliases — short or familiar names that map to a longer slug
// Only added if the target exists and the alias slug is not already taken.
const friendlyAliases = {
  // Adobe
  "acrobat": "/guides/adobe/acrobat-pro.html",
  "creative-cloud": "/guides/adobe/creative-cloud-desktop.html",
  // Autodesk
  "autocad-2026": "/guides/autodesk/autocad.html",
  "civil3d": "/guides/autodesk/civil-3d.html",
  "acc": "/guides/autodesk/construction-cloud.html",
  "bim360": "/guides/autodesk/construction-cloud.html",
  "bim-360": "/guides/autodesk/construction-cloud.html",
  // Bentley
  "openroads": "/guides/bentley/openroads-designer.html",
  "openbridge": "/guides/bentley/openbridge-designer.html",
  // Bluebeam
  "revu": "/guides/bluebeam/revu-21.html",
  "bluebeam-revu": "/guides/bluebeam/revu-21.html",
  // Esri
  "arcgis": "/guides/esri/arcgis-pro.html",
  "arcgispro": "/guides/esri/arcgis-pro.html",
  "arcgis-online-portal": "/guides/esri/arcgis-online.html",
  // Microsoft
  "m365": "/guides/microsoft.html",
  "office": "/guides/microsoft.html",
  "office365": "/guides/microsoft.html",
  "microsoft-365": "/guides/microsoft.html",
  "authenticator": "/guides/microsoft/microsoft-authenticator.html",
  "ms-authenticator": "/guides/microsoft/microsoft-authenticator.html",
  "windows-365": "/guides/microsoft/windows-365-cloud-pc.html",
  "cloud-pc": "/guides/microsoft/windows-365-cloud-pc.html",
  // Remote access
  "vpn": "/guides/fortinet/forticlient-vpn.html",
  "forticlient": "/guides/fortinet/forticlient-vpn.html",
  "citrix-workspace": "/guides/citrix/workspace-app.html",
  // QuickBooks
  "quickbooks-desktop": "/guides/quickbooks/quickbooks-enterprise-desktop.html",
  "qbo": "/guides/quickbooks/quickbooks-online.html",
  // Foxit
  "foxit-pdf": "/guides/foxit/pdf-editor.html",
  "foxit-reader": "/guides/foxit/pdf-reader.html",
  // Egnyte
  "egnyte-desktop": "/guides/egnyte/egnyte-desktop-app.html",
  "egnyte-web": "/guides/egnyte/egnyte-web-admin.html",
  // Trimble
  "tbc": "/guides/trimble/trimble-business-center.html",
  "trimble-bc": "/guides/trimble/trimble-business-center.html",
  // Bentley CONNECTION Client
  "connection": "/guides/bentley/connection-client.html",
  // Articles
  "screenshots": "/articles/taking-screenshots-for-it.html",
  "phishing": "/articles/recognizing-phishing.html",
  "new-computer": "/articles/moving-to-new-computer.html",
  "new-phone": "/articles/getting-new-phone-without-losing-mfa.html",
  "new-hire": "/articles/new-hire-day-one.html"
};

for (const [slug, targetUrl] of Object.entries(friendlyAliases)) {
  if (reservedSlugs.has(slug) || appSlugSeen.has(slug)) {
    continue;
  }
  writeAlias(slug, {
    title: `Opening: ${slug}`,
    summary: "Loading the page now.",
    targetUrl
  });
  count++;
}

if (appAliasConflicts.length) {
  console.log("Skipped app slug collisions (would need disambiguation):");
  for (const c of appAliasConflicts) {
    console.log(`  ${c.slug}: ${c.first.vendorSlug} vs ${c.second.vendorSlug}`);
  }
}

console.log(`Generated ${count} root-level alias folders.`);
