import { buildAppGuideUrl, getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

const featuredGrid = document.getElementById("featuredApplications");
const jumpLinks = document.getElementById("applicationJumpLinks");
const directory = document.getElementById("applicationDirectory");
const hiddenPublicApplicationVendors = new Set(["quickbooks"]);

const featuredApps = [
  ["microsoft", "outlook"],
  ["microsoft", "teams"],
  ["microsoft", "onedrive"],
  ["autodesk", "autocad"],
  ["autodesk", "revit"],
  ["bentley", "projectwise"],
  ["esri", "arcgis-pro"],
  ["adobe", "acrobat-pro"],
  ["bluebeam", "revu-21"]
];

const allApplications = vendorOrder.filter(vendorSlug => !hiddenPublicApplicationVendors.has(vendorSlug)).flatMap(vendorSlug => {
  const vendor = vendorGuides[vendorSlug];
  return getVendorApplications(vendorSlug).map(app => ({
    vendor,
    vendorSlug,
    ...app
  }));
}).sort((left, right) => left.name.localeCompare(right.name));

function getSummary(app) {
  const extra = getAppGuideContent(app.vendorSlug, app.slug);
  return extra.summary ?? app.summary ?? app.focus;
}

function createActionLink(label, href, className = "hub-link") {
  const link = document.createElement("a");
  link.className = className;
  link.href = href;
  link.textContent = label;
  return link;
}

featuredApps.forEach(([vendorSlug, appSlug]) => {
  const app = allApplications.find(item => item.vendorSlug === vendorSlug && item.slug === appSlug);
  if (!app) {
    return;
  }

  const card = document.createElement("article");
  card.className = "hub-card";

  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = app.vendor.title;

  const title = document.createElement("h2");
  title.textContent = app.name;

  const description = document.createElement("p");
  description.textContent = getSummary(app);

  card.append(kicker, title, description, createActionLink("Open application guide", buildAppGuideUrl(vendorSlug, appSlug)));
  featuredGrid?.appendChild(card);

  if (jumpLinks) {
    const jump = document.createElement("a");
    jump.href = `#app-${vendorSlug}-${appSlug}`;
    jump.textContent = app.name;
    jumpLinks.appendChild(jump);
  }
});

allApplications.forEach(app => {
  const card = document.createElement("article");
  card.className = "vendor-card";
  card.id = `app-${app.vendorSlug}-${app.slug}`;

  const meta = document.createElement("span");
  meta.className = "result-meta";
  meta.textContent = app.vendor.title;

  const title = document.createElement("h3");
  title.textContent = app.name;

  const description = document.createElement("p");
  description.textContent = getSummary(app);

  const links = document.createElement("div");
  links.className = "vendor-links";

  const guideLink = document.createElement("a");
  guideLink.href = buildAppGuideUrl(app.vendorSlug, app.slug);
  guideLink.textContent = "Open app guide";
  links.appendChild(guideLink);

  const vendorLink = document.createElement("a");
  vendorLink.href = `guides/${app.vendorSlug}.html`;
  vendorLink.textContent = `${app.vendor.title} guide`;
  links.appendChild(vendorLink);

  if (featuredApps.some(([vendorSlug, appSlug]) => vendorSlug === app.vendorSlug && appSlug === app.slug)) {
    const licensingLink = document.createElement("a");
    licensingLink.href = "app-licensing.html";
    licensingLink.textContent = "Licensing help";
    links.appendChild(licensingLink);
  }

  card.append(meta, title, description, links);
  directory.appendChild(card);
});
