import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { vendorGuides, vendorOrder } from "../guides/guideData.js";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const guidesDir = join(rootDir, "guides");

function pageTemplate({ title, summary, targetUrl, directoryUrl = "../index.html" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="${targetUrl}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" href="../../assets/llamaha-icon-purple-navy.png">
  <link rel="stylesheet" href="../guide.css">
</head>
<body>
  <div class="guide-shell">
    <header class="guide-header">
      <nav class="guide-breadcrumbs" aria-label="Breadcrumb">
        <a class="guide-breadcrumb-link" href="../../index.html">Home</a>
        <span class="guide-breadcrumb-sep">&gt;</span>
        <a class="guide-breadcrumb-link" href="${directoryUrl}">Guide Directory</a>
        <span class="guide-breadcrumb-sep">&gt;</span>
        <strong class="guide-breadcrumb-current">${title}</strong>
      </nav>
      <div class="guide-brand">
        <img class="brand-icon" src="../../assets/llamaha-icon-purple-navy.png" alt="Llamaha icon">
        <div>
          <p class="section-kicker">App Help</p>
          <h1 id="guideTitle">${title}</h1>
          <p id="guideSummary">${summary}</p>
          <div class="guide-link-list">
            <a class="guide-primary-link" href="${targetUrl}">Open the guide page</a>
            <a class="guide-chip-link" href="${directoryUrl}">All guides</a>
          </div>
        </div>
      </div>
    </header>
  </div>
</body>
</html>
`;
}

function writeIndex(dirName, options) {
  const targetDir = join(guidesDir, dirName);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, "index.html"), pageTemplate(options), "utf8");
}

const vendorSlugs = new Set(vendorOrder.filter(slug => vendorGuides[slug]));

for (const entry of readdirSync(guidesDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  if (vendorSlugs.has(entry.name) && existsSync(join(guidesDir, `${entry.name}.html`))) {
    const guide = vendorGuides[entry.name];
    writeIndex(entry.name, {
      title: `${guide.title} App Help`,
      summary: `Opening the ${guide.title} vendor page. Use it to find the exact application guide for this product family.`,
      targetUrl: `../${entry.name}.html`
    });
    continue;
  }

  if (entry.name === "apps") {
    writeIndex(entry.name, {
      title: "Application Guide Directory",
      summary: "Opening the public application guide directory.",
      targetUrl: "../index.html"
    });
  }
}

console.log("Guide directory index pages generated.");
