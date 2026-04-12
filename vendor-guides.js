import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getVendorApplications } from "./guides/applicationCatalog.js";

const grid = document.getElementById("vendorGuideGrid");

vendorOrder.forEach(vendorSlug => {
  const vendor = vendorGuides[vendorSlug];
  const apps = getVendorApplications(vendorSlug);
  const card = document.createElement("article");
  card.className = "vendor-card";

  const title = document.createElement("h3");
  title.textContent = vendor.title;

  const summary = document.createElement("p");
  summary.textContent = vendor.summary;

  const list = document.createElement("ul");
  list.className = "vendor-coverage";
  apps.slice(0, 5).forEach(app => {
    const item = document.createElement("li");
    item.textContent = app.name;
    list.appendChild(item);
  });

  const links = document.createElement("div");
  links.className = "vendor-links";

  const guideLink = document.createElement("a");
  guideLink.href = `guides/${vendorSlug}.html`;
  guideLink.textContent = "Open vendor guide";
  links.appendChild(guideLink);

  apps.slice(0, 3).forEach(app => {
    const appLink = document.createElement("a");
    appLink.href = `guides/${vendorSlug}/${app.slug}.html`;
    appLink.textContent = app.name;
    links.appendChild(appLink);
  });

  card.append(title, summary, list, links);
  grid.appendChild(card);
});
