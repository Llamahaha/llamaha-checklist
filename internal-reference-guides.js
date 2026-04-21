import { buildAppGuideUrl, getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { getPublicGuideContent } from "./guides/publicGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { internalLicensingReference, internalOnlyGuideGroups } from "./internalContent.js";
import { createLinks, createPageCard, renderPageToc } from "./resourceCommon.js";
import { activatePageTabs, activateSectionSearch } from "./sectionTabs.js";

const pageToc = document.getElementById("pageToc");
const featuredGuideGrid = document.getElementById("featuredGuideGrid");
const referenceSections = document.getElementById("referenceSections");

const referenceOrder = [
  "internal-stack",
  "microsoft",
  "citrix",
  "fortinet",
  "autodesk",
  "bentley",
  "esri",
  "adobe",
  "bluebeam",
  "oracle",
  "hec",
  "mctrans",
  "axiom",
  "google",
  "egnyte",
  "trimble",
  "ptc",
  "foxit",
  "browsers"
];

const hiddenInternalReferenceVendors = new Set(["quickbooks"]);

const featuredGuides = [
  ["internal-stack", "datto-rmm"],
  ["internal-stack", "autotask-psa"],
  ["internal-stack", "veeam-backup-replication"],
  ["microsoft", "outlook"],
  ["microsoft", "teams"],
  ["microsoft", "onedrive"],
  ["microsoft", "sharepoint"],
  ["citrix", "workspace-app"],
  ["fortinet", "forticlient-vpn"],
  ["autodesk", "autocad"],
  ["autodesk", "revit"],
  ["autodesk", "infoworks-icm"],
  ["bentley", "projectwise"],
  ["esri", "arcgis-pro"],
  ["adobe", "acrobat-pro"],
  ["oracle", "primavera-p6"]
];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function appendListBlock(parent, title, items = []) {
  const cleanItems = items.filter(Boolean);
  if (!cleanItems.length) return;

  const block = el("div", "card-block");
  block.appendChild(el("h4", "", title));

  const list = el("ul", "guide-list");
  cleanItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  block.appendChild(list);
  parent.appendChild(block);
}

function summarizeIssue(issue) {
  if (!issue) return null;
  const title = issue.title ?? issue.issue;
  const fix = issue.likelyFix ?? issue.fix;
  return fix ? `${title}: ${fix}` : title;
}

function getPublicGuideUrl(vendorSlug, appSlug) {
  return `../${buildAppGuideUrl(vendorSlug, appSlug)}`;
}

function getVendorUrl(vendorSlug) {
  return `../guides/${vendorSlug}.html`;
}

function buildPublicAppModel(vendorSlug, app) {
  const vendor = vendorGuides[vendorSlug];
  const extra = getAppGuideContent(vendorSlug, app.slug);
  const publicContent = getPublicGuideContent(vendorSlug, app.slug);
  const summary = extra.summary ?? publicContent.summary ?? app.summary ?? app.focus;
  const highlightSource = extra.highlights?.length
    ? extra.highlights
    : [app.focus, app.install].filter(Boolean);
  const askFirst = (extra.askFirst?.length ? extra.askFirst : publicContent.askFirst ?? []).slice(0, 4);
  const mobileSetup = (publicContent.mobileSetup?.length ? publicContent.mobileSetup : publicContent.phoneSetup ?? []).slice(0, 4);
  const checkpoints = (extra.supportCheckpoints?.length ? extra.supportCheckpoints : publicContent.supportCheckpoints ?? []).slice(0, 4);
  const commonIssues = (extra.commonIssues?.length ? extra.commonIssues : publicContent.commonIssues ?? [])
    .map(summarizeIssue)
    .filter(Boolean)
    .slice(0, 3);
  const usefulInfo = extra.usefulInfo ?? { paths: [], logs: [], services: [], processes: [] };
  const vendorLinks = [
    { label: "Public guide", url: getPublicGuideUrl(vendorSlug, app.slug) },
    { label: `${vendor.title} vendor page`, url: getVendorUrl(vendorSlug) }
  ];
  const relatedLinks = [...(extra.relatedLinks ?? []), ...(publicContent.relatedLinks ?? []), ...(vendor.supportLinks ?? [])]
    .filter(item => item?.label && item?.url)
    .slice(0, 4);

  return {
    id: `guide-${vendorSlug}-${app.slug}`,
    vendorTitle: vendor.title,
    name: app.name,
    summary,
    highlights: highlightSource.slice(0, 3),
    askFirst,
    mobileSetup,
    checkpoints,
    commonIssues,
    usefulInfo,
    links: [...vendorLinks, ...relatedLinks]
  };
}

function buildGroupMap() {
  const groups = new Map();

  internalOnlyGuideGroups.forEach(group => {
    groups.set(group.slug, {
      slug: group.slug,
      title: group.title,
      summary: group.summary,
      apps: group.apps.map(app => ({
        id: `guide-${group.slug}-${app.slug}`,
        vendorTitle: group.title,
        name: app.name,
        summary: app.summary,
        highlights: app.highlights ?? [],
        askFirst: app.askFirst ?? [],
        checkpoints: app.supportCheckpoints ?? [],
        commonIssues: (app.commonIssues ?? []).map(summarizeIssue).filter(Boolean),
        usefulInfo: app.usefulInfo ?? { paths: [], logs: [], services: [], processes: [] },
        links: app.relatedLinks ?? []
      }))
    });
  });

  vendorOrder.forEach(vendorSlug => {
    if (hiddenInternalReferenceVendors.has(vendorSlug)) {
      return;
    }

    const vendor = vendorGuides[vendorSlug];
    const apps = getVendorApplications(vendorSlug).map(app => buildPublicAppModel(vendorSlug, app));
    groups.set(vendorSlug, {
      slug: vendorSlug,
      title: vendor.title,
      summary: vendor.summary,
      apps
    });
  });

  return groups;
}

function renderFeaturedCard(container, app) {
  const card = createPageCard("hub-card");
  card.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: app.vendorTitle }),
    Object.assign(document.createElement("h2"), { textContent: app.name }),
    Object.assign(document.createElement("p"), { textContent: app.summary })
  );

  card.appendChild(createLinks([
    { label: "Jump to internal notes", url: `#${app.id}` },
    ...(app.links[0] ? [app.links[0]] : [])
  ]));

  container.appendChild(card);
}

function renderAppCard(app) {
  const card = createPageCard("vendor-card");
  card.id = app.id;

  const title = el("h3", "", app.name);
  const summary = el("p", "", app.summary);
  const stack = el("div", "card-stack");

  appendListBlock(stack, "Quick Notes", app.highlights);
  appendListBlock(stack, "Ask First", app.askFirst);
  appendListBlock(stack, "Phone / Tablet Setup", app.mobileSetup);
  appendListBlock(stack, "Support Checkpoints", app.checkpoints);
  appendListBlock(stack, "Common Problems", app.commonIssues);
  appendListBlock(stack, "Useful Paths", app.usefulInfo.paths ?? []);
  appendListBlock(stack, "Useful Logs", app.usefulInfo.logs ?? []);
  appendListBlock(stack, "Services / Processes", [...(app.usefulInfo.services ?? []), ...(app.usefulInfo.processes ?? [])]);

  card.append(title, summary, stack);

  if (app.links?.length) {
    card.appendChild(createLinks(
      app.links.map(item => ({
        ...item,
        external: item.external ?? /^https?:/i.test(item.url)
      }))
    ));
  }

  return card;
}

function renderVendorSection(group) {
  const section = document.createElement("details");
  section.className = "results-card accordion-section";
  section.id = `vendor-${group.slug}`;
  section.open = false;

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const body = el("div", "accordion-summary-copy");
  body.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: group.title }),
    Object.assign(document.createElement("h2"), { textContent: group.title }),
    Object.assign(document.createElement("p"), { textContent: group.summary })
  );

  const meta = el("span", "accordion-summary-meta", `${group.apps.length} guides`);
  summary.append(body, meta);

  const content = el("div", "accordion-content");
  const grid = el("div", "vendor-directory");
  group.apps.forEach(app => {
    grid.appendChild(renderAppCard(app));
  });
  content.appendChild(grid);

  section.append(summary, content);
  return section;
}

function renderLicensingSection(entries) {
  const section = document.createElement("details");
  section.className = "results-card accordion-section";
  section.id = "licensingReferenceSection";
  section.open = false;

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const body = el("div", "accordion-summary-copy");
  body.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Internal Reference" }),
    Object.assign(document.createElement("h2"), { textContent: "Licensing Notes" }),
    Object.assign(document.createElement("p"), { textContent: "Internal notes for entitlement checks, seat cleanup, and portal evidence before making license changes." })
  );

  const meta = el("span", "accordion-summary-meta", `${entries.length} notes`);
  summary.append(body, meta);

  const content = el("div", "accordion-content");
  const grid = el("div", "vendor-directory");

  entries.forEach(entry => {
    const card = createPageCard("vendor-card");
    card.id = `${entry.slug}-licensing`;
    card.append(
      Object.assign(document.createElement("h3"), { textContent: entry.title }),
      Object.assign(document.createElement("p"), { textContent: entry.summary })
    );

    const stack = el("div", "card-stack");
    appendListBlock(stack, "In Scope", entry.inScope);
    appendListBlock(stack, "Admin Surfaces", entry.adminSurfaces);
    appendListBlock(stack, "Seat Recovery Notes", entry.seatRecovery ?? entry.recoveryNotes);
    appendListBlock(stack, "Capture Before Changes", entry.captureBeforeChanges ?? entry.collect);
    card.appendChild(stack);

    const links = entry.relatedLinks ?? entry.links ?? [];
    if (links.length) {
      card.appendChild(createLinks(links.map(item => ({
        ...item,
        external: item.external ?? /^https?:/i.test(item.url)
      }))));
    }

    grid.appendChild(card);
  });

  content.appendChild(grid);
  section.append(summary, content);
  return section;
}

const groups = buildGroupMap();
const tocItems = featuredGuideGrid ? [{ id: "quickStartSection", label: "Quick Start" }] : [];

const visibleLicensingReference = internalLicensingReference.filter(entry => !hiddenInternalReferenceVendors.has(entry.slug));

if (visibleLicensingReference.length && referenceSections) {
  tocItems.push({ id: "licensingReferenceSection", label: "Licensing Notes" });
  referenceSections.appendChild(renderLicensingSection(visibleLicensingReference));
}

featuredGuides.forEach(([vendorSlug, appSlug]) => {
  if (!featuredGuideGrid) return;

  if (vendorSlug === "internal-stack") {
    const group = groups.get(vendorSlug);
    const app = group?.apps.find(item => item.id === `guide-${vendorSlug}-${appSlug}`);
    if (app) {
      renderFeaturedCard(featuredGuideGrid, app);
    }
    return;
  }

  const group = groups.get(vendorSlug);
  const app = group?.apps.find(item => item.id === `guide-${vendorSlug}-${appSlug}`);
  if (app) {
    renderFeaturedCard(featuredGuideGrid, app);
  }
});

referenceOrder.forEach(slug => {
  const group = groups.get(slug);
  if (!group || !group.apps.length || !referenceSections) return;
  tocItems.push({ id: `vendor-${group.slug}`, label: group.title });
  referenceSections.appendChild(renderVendorSection(group));
});

renderPageToc(pageToc, tocItems, {
  title: "Pick a vendor or tool family",
  description: "Only the vendor or tool family you pick is shown on the page. Switch any time.",
  searchPlaceholder: "Search reference sections"
});

const tabs = activatePageTabs({ preferredDefault: "quickStartSection" });
activateSectionSearch(tabs);
