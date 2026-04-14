import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getVendorApplications } from "./guides/applicationCatalog.js";
import { appendBlock, createLinks } from "./resourceCommon.js";

const grid = document.getElementById("vendorGuideGrid");

const vendorStartHere = {
  microsoft: [
    "Email, Teams, file-sync, or Microsoft sign-in problems",
    "Browser access that works while the desktop app does not",
    "Questions about plan access, missing features, or Microsoft 365 setup"
  ],
  autodesk: [
    "Autodesk sign-in, product access, or update questions",
    "Version or release-year mismatches between project teams",
    "Problems opening the CAD or BIM product your team already uses"
  ],
  bentley: [
    "CONNECTION Client, ProjectWise, or Bentley sign-in problems",
    "Datasource, workspace, or project access issues",
    "Questions about which Bentley app to open for a given workflow"
  ],
  esri: [
    "ArcGIS sign-in, portal access, or missing extensions",
    "Questions about whether you need ArcGIS Online or ArcGIS Pro",
    "Missing layers, projects, or maps after sign-in"
  ],
  ptc: [
    "Mathcad licensing, activation, or first-time setup questions",
    "Worksheet access and shared template concerns",
    "Version or license-source questions before reinstalling"
  ],
  trimble: [
    "SketchUp or Trimble Business Center access questions",
    "Missing extensions, templates, or project modules",
    "Sign-in and subscription issues with Trimble-managed products"
  ],
  adobe: [
    "Adobe sign-in, profile selection, or missing product access",
    "Acrobat or Creative Cloud app activation questions",
    "Setup help for PDF workflows or Adobe desktop apps"
  ],
  bluebeam: [
    "Bluebeam sign-in, subscription, or Studio access problems",
    "Missing profiles, tool sets, or shared markup resources",
    "Questions about Revu 21 setup and activation"
  ],
  foxit: [
    "Foxit activation or edition questions",
    "PDF editing, defaults, or plugin-related issues",
    "Setup help for Reader versus Editor deployments"
  ],
  quickbooks: [
    "QuickBooks Desktop or Online access questions",
    "Company-file, updates, printing, or finance workflow issues",
    "Questions about which QuickBooks product or year is in use"
  ],
  egnyte: [
    "Egnyte sign-in, desktop app, or folder access issues",
    "Questions about shared folders, sync behavior, or drive mapping",
    "Setup help for the web app versus the desktop app"
  ]
};

function summarizeCoverage(vendor, apps) {
  const names = apps.slice(0, 4).map(app => app.name);
  if (!names.length) {
    return vendor.summary;
  }

  return `${vendor.title} help articles for ${names.join(", ")}${apps.length > 4 ? ", and more" : ""}.`;
}

vendorOrder.forEach((vendorSlug, index) => {
  const vendor = vendorGuides[vendorSlug];
  const apps = getVendorApplications(vendorSlug);
  const card = document.createElement("details");
  card.className = "results-card accordion-section";
  card.id = vendorSlug;
  card.open = index === 0;

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const summaryCopy = document.createElement("div");
  summaryCopy.className = "accordion-summary-copy";

  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Vendor Guide";

  const title = document.createElement("h3");
  title.textContent = vendor.title;

  const description = document.createElement("p");
  description.textContent = summarizeCoverage(vendor, apps);

  summaryCopy.append(kicker, title, description);

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${apps.length} apps`;

  summary.append(summaryCopy, meta);

  const content = document.createElement("div");
  content.className = "accordion-content";

  const overview = document.createElement("p");
  overview.className = "hub-section-copy";
  overview.textContent = vendor.overview;

  const stack = document.createElement("div");
  stack.className = "card-stack";
  appendBlock(stack, "Start Here For", vendorStartHere[vendorSlug] ?? [
    `${vendor.title} sign-in and access questions`,
    `${vendor.title} setup, update, or activation issues`,
    `Choosing the right ${vendor.title} product guide`
  ]);
  appendBlock(stack, "Main Applications", apps.slice(0, 6).map(app => app.name));

  const links = createLinks([
    { label: "Open vendor guide", url: `guides/${vendorSlug}.html` },
    { label: "Licensing help", url: `app-licensing.html#${vendorSlug}-licensing` },
    ...apps.slice(0, 3).map(app => ({ label: app.name, url: `guides/${vendorSlug}/${app.slug}.html` })),
    ...(vendor.supportLinks?.[0]
      ? [{ label: vendor.supportLinks[0].label, url: vendor.supportLinks[0].url, external: true }]
      : [])
  ]);

  content.append(overview, stack, links);

  card.append(summary, content);
  grid.appendChild(card);
});
