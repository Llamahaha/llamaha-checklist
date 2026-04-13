import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getVendorApplications } from "./guides/applicationCatalog.js";

const applicationGroups = document.getElementById("applicationGroups");

vendorOrder.forEach((vendorSlug, index) => {
  const vendor = vendorGuides[vendorSlug];
  const apps = getVendorApplications(vendorSlug);

  const section = document.createElement("details");
  section.className = "results-card accordion-section";
  section.id = vendorSlug;
  section.open = index === 0;

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const summaryCopy = document.createElement("div");
  summaryCopy.className = "accordion-summary-copy";

  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Vendor";

  const title = document.createElement("h3");
  title.textContent = vendor.title;

  const description = document.createElement("p");
  description.textContent = `${apps.length} application guides available for ${vendor.title}.`;

  summaryCopy.append(kicker, title, description);

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${apps.length} guides`;

  summary.append(summaryCopy, meta);

  const grid = document.createElement("div");
  grid.className = "vendor-directory";

  apps.forEach(app => {
    const card = document.createElement("article");
    card.className = "vendor-card";

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = app.name;

    const copy = document.createElement("p");
    copy.textContent = `Help with setup, sign-in, common problems, and next steps for ${app.name}.`;

    const links = document.createElement("div");
    links.className = "vendor-links";

    const appLink = document.createElement("a");
    appLink.href = `guides/${vendorSlug}/${app.slug}.html`;
    appLink.textContent = "Open app guide";

    const vendorLink = document.createElement("a");
    vendorLink.href = `guides/${vendorSlug}.html`;
    vendorLink.textContent = `${vendor.title} guide`;

    links.append(appLink, vendorLink);
    card.append(cardTitle, copy, links);
    grid.appendChild(card);
  });

  const content = document.createElement("div");
  content.className = "accordion-content";
  content.appendChild(grid);

  section.append(summary, content);
  applicationGroups.appendChild(section);
});
