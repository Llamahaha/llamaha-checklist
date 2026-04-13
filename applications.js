import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

const directory = document.getElementById("applicationDirectory");

vendorOrder.forEach((vendorSlug, index) => {
  const vendor = vendorGuides[vendorSlug];
  const apps = getVendorApplications(vendorSlug);

  if (!vendor || !apps.length) {
    return;
  }

  const section = document.createElement("details");
  section.className = "results-card accordion-section";
  section.open = index === 0;

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const copy = document.createElement("div");
  copy.className = "accordion-summary-copy";

  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Vendor";

  const title = document.createElement("h3");
  title.textContent = vendor.title;

  const description = document.createElement("p");
  description.textContent = vendor.summary;

  copy.append(kicker, title, description);

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${apps.length} apps`;

  summary.append(copy, meta);

  const content = document.createElement("div");
  content.className = "accordion-content";

  const overview = document.createElement("p");
  overview.className = "hub-section-copy";
  overview.textContent = vendor.overview;

  const links = document.createElement("div");
  links.className = "vendor-links";

  const vendorLink = document.createElement("a");
  vendorLink.href = `guides/${vendorSlug}.html`;
  vendorLink.textContent = "Open vendor guide";
  links.appendChild(vendorLink);

  apps.forEach(app => {
    const link = document.createElement("a");
    link.href = `guides/${vendorSlug}/${app.slug}.html`;
    link.textContent = app.name;
    links.appendChild(link);
  });

  content.append(overview, links);
  section.append(summary, content);
  directory.appendChild(section);
});
