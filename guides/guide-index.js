import "../siteChrome.js";
import { getVendorApplications } from "./applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guideData.js";
import { getAppGuideContent } from "./appGuideContent.js";
import { getPublicGuideContent } from "./publicGuideContent.js";

const finder = document.getElementById("guideDirectoryFinder");
const content = document.getElementById("guideDirectoryContent");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function vendorUrl(vendorSlug) {
  return `./${vendorSlug}.html`;
}

function appUrl(vendorSlug, appSlug) {
  return `./${vendorSlug}/${appSlug}.html`;
}

function appSearchText(vendorSlug, vendor, app) {
  const extra = getAppGuideContent(vendorSlug, app.slug);
  const publicContent = getPublicGuideContent(vendorSlug, app.slug);
  return [
    vendor.title,
    vendor.summary,
    app.name,
    app.summary,
    app.focus,
    app.licensing,
    app.install,
    extra.summary,
    ...(extra.highlights ?? []),
    ...(extra.askFirst ?? []),
    publicContent.summary,
    ...(publicContent.overview ?? [])
  ].filter(Boolean).join(" ").toLowerCase();
}

const vendors = vendorOrder
  .map(vendorSlug => ({
    slug: vendorSlug,
    guide: vendorGuides[vendorSlug],
    apps: getVendorApplications(vendorSlug)
  }))
  .filter(item => item.guide && item.apps.length);

function renderFinder(appCards, vendorSections) {
  if (!finder) return;

  const shell = el("section", "guide-vendor-finder");
  const header = el("div", "guide-vendor-finder-header");
  const copy = el("div");
  copy.append(
    el("p", "section-kicker", "Guide Directory"),
    el("h2", "guide-section-title", "Find a vendor or app"),
    el("p", "guide-section-copy", "Search across all public guide pages, then open the exact vendor or application.")
  );

  const appTotal = appCards.length;
  const count = el("span", "guide-app-count", `${vendors.length} vendors / ${appTotal} apps`);
  header.append(copy, count);

  const search = document.createElement("input");
  search.type = "search";
  search.className = "guide-app-search";
  search.placeholder = "Search vendors and apps";
  search.setAttribute("aria-label", "Search vendors and application guides");

  const vendorNav = el("nav", "guide-app-chip-grid guide-directory-vendors");
  vendorNav.setAttribute("aria-label", "Vendor guide pages");
  vendors.forEach(item => {
    const link = el("a", "guide-app-chip");
    link.href = `#vendor-${item.slug}`;
    link.dataset.searchText = `${item.guide.title} ${item.guide.summary} ${item.guide.products.join(" ")}`.toLowerCase();
    link.append(
      el("strong", "", item.guide.title),
      el("span", "guide-app-chip-copy", `${item.apps.length} app guides`)
    );
    vendorNav.appendChild(link);
  });

  const empty = el("p", "guide-empty-message", "No guide pages matched that search.");
  empty.hidden = true;

  function applyFilter() {
    const tokens = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let visibleApps = 0;
    let visibleVendors = 0;

    appCards.forEach(card => {
      const matches = tokens.every(token => card.dataset.searchText.includes(token));
      card.hidden = !matches;
      card.setAttribute("aria-hidden", String(!matches));
      if (matches) visibleApps += 1;
    });

    vendorSections.forEach(section => {
      const vendorMatch = tokens.every(token => section.dataset.searchText.includes(token));
      const visibleCards = Array.from(section.querySelectorAll(".guide-app-card-link:not([hidden])")).length;
      const show = !tokens.length || vendorMatch || visibleCards > 0;
      section.hidden = !show;
      section.setAttribute("aria-hidden", String(!show));
      if (show) visibleVendors += 1;
    });

    count.textContent = `${visibleVendors} vendors / ${visibleApps} apps`;
    empty.hidden = visibleApps !== 0 || visibleVendors !== 0;
  }

  search.addEventListener("input", applyFilter);
  shell.append(header, search, vendorNav, empty);
  finder.appendChild(shell);
}

function renderDirectory() {
  if (!content) return;

  const appCards = [];
  const vendorSections = [];

  vendors.forEach(item => {
    const section = el("section", "guide-section guide-directory-section");
    section.id = `vendor-${item.slug}`;
    section.dataset.searchText = `${item.guide.title} ${item.guide.summary} ${item.guide.products.join(" ")}`.toLowerCase();
    section.append(
      el("p", "section-kicker", "Vendor"),
      el("h2", "guide-section-title", item.guide.title),
      el("p", "guide-section-copy", item.guide.summary)
    );

    const links = el("div", "guide-link-list guide-directory-actions");
    const vendorLink = el("a", "guide-chip-link", `Open ${item.guide.title} page`);
    vendorLink.href = vendorUrl(item.slug);
    links.appendChild(vendorLink);
    section.appendChild(links);

    const grid = el("div", "guide-card-grid guide-app-grid");
    item.apps.forEach(app => {
      const appCard = el("a", "guide-card guide-app-card guide-app-card-link");
      appCard.href = appUrl(item.slug, app.slug);
      appCard.dataset.searchText = appSearchText(item.slug, item.guide, app);
      appCard.append(
        el("p", "guide-app-kicker", item.guide.title),
        el("h3", "guide-card-title", app.name),
        el("p", "guide-card-copy", app.summary ?? app.focus ?? "Open the product guide."),
        el("span", "guide-primary-link", "Open app guide")
      );
      grid.appendChild(appCard);
      appCards.push(appCard);
    });

    section.appendChild(grid);
    content.appendChild(section);
    vendorSections.push(section);
  });

  renderFinder(appCards, vendorSections);
}

renderDirectory();
