import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getVendorApplications } from "./guides/applicationCatalog.js";

const grid = document.getElementById("vendorGuideGrid");

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
  description.textContent = vendor.summary;

  summaryCopy.append(kicker, title, description);

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${apps.length} apps`;

  summary.append(summaryCopy, meta);

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

  const content = document.createElement("div");
  content.className = "accordion-content";
  content.append(list, links);

  card.append(summary, content);
  grid.appendChild(card);
});
