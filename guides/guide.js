import "../siteChrome.js";
import { vendorGuides } from "./guideData.js";
import {
  buildAppGuideUrl,
  getApplicationGuide,
  getVendorApplications
} from "./applicationCatalog.js";
import { getAppGuideContent } from "./appGuideContent.js";
import { vendorFaqs, vendorInstallIssues, vendorUsageIssues } from "./guideExtras.js";

const pageType = document.body.dataset.pageType ?? "vendor";
const vendorSlug = document.body.dataset.vendor;
const appSlug = document.body.dataset.app ?? "";
const rootPath = document.body.dataset.rootPath ?? "..";
const vendor = vendorGuides[vendorSlug];
const apps = getVendorApplications(vendorSlug);
const app = appSlug ? getApplicationGuide(vendorSlug, appSlug) : null;

const elements = {
  breadcrumbs: document.getElementById("breadcrumbs"),
  backLink: document.getElementById("guideBackLink"),
  kicker: document.getElementById("guideKicker"),
  title: document.getElementById("guideTitle"),
  summary: document.getElementById("guideSummary"),
  jumpLinks: document.getElementById("guideJumpLinks"),
  content: document.getElementById("guideContent")
};

const homeUrl = `${rootPath}/index.html`;
const guideHubUrl = `${rootPath}/vendor-guides.html`;
const vendorUrl = slug => `${rootPath}/guides/${slug}.html`;
const appUrl = (slug, childSlug) => `${rootPath}/${buildAppGuideUrl(slug, childSlug)}`;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function list(items, className = "guide-list") {
  const node = el("ul", className);
  items.filter(Boolean).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    node.appendChild(li);
  });
  return node;
}

function linkList(items = [], className = "guide-link-list") {
  const node = el("div", className);
  items.forEach(item => {
    const link = el("a", "guide-chip-link", item.label);
    link.href = item.url;
    if (/^https?:/i.test(item.url)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    node.appendChild(link);
  });
  return node;
}

function section(id, kicker, title, intro) {
  const wrapper = el("section", "guide-section");
  wrapper.id = id;
  wrapper.append(el("p", "section-kicker", kicker), el("h2", "guide-section-title", title));
  if (intro) wrapper.appendChild(el("p", "guide-section-copy", intro));
  return wrapper;
}

function card(title, body) {
  const node = el("article", "guide-card");
  node.appendChild(el("h3", "guide-card-title", title));
  if (Array.isArray(body)) {
    node.appendChild(list(body));
  } else if (body instanceof HTMLElement) {
    node.appendChild(body);
  } else if (body) {
    node.appendChild(el("p", "guide-card-copy", body));
  }
  return node;
}

function paragraphs(items = []) {
  const shell = el("div", "guide-copy-stack");
  items.filter(Boolean).forEach(item => shell.appendChild(el("p", "guide-card-copy", item)));
  return shell;
}

function unique(items = []) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeIssue(item) {
  if (!item) return null;
  if (item.title) return item;
  return {
    title: item.issue,
    symptom: item.issue,
    likelyFix: item.fix,
    collect: "Capture the exact error, version, and what changed before the issue started."
  };
}

function buildAppModel() {
  const extra = getAppGuideContent(vendorSlug, appSlug);
  const overview = extra.overview?.length ? extra.overview : [app.summary ?? app.focus];
  const supportCheckpoints = unique([...(app.supportChecks ?? []), ...(extra.supportCheckpoints ?? [])]);
  const commonIssues = (extra.commonIssues?.length ? extra.commonIssues : app.commonIssues ?? []).map(normalizeIssue);

  return {
    name: app.name,
    summary: extra.summary ?? app.summary ?? app.focus,
    overview,
    highlights: extra.highlights ?? [],
    askFirst: extra.askFirst?.length
      ? extra.askFirst
      : [
          `What exact ${app.name} workflow is failing: launch, sign-in, access, files, updates, or output?`,
          "Did the issue begin after a workstation swap, password change, app update, or permission change?",
          "Can a known-good peer perform the same task successfully?"
        ],
    licensing: unique([app.licensing, ...(extra.licensing ?? [])]),
    install: unique([app.install, ...(extra.install ?? [])]),
    uninstall: unique([app.uninstall, ...(extra.uninstall ?? [])]),
    supportCheckpoints: supportCheckpoints.length ? supportCheckpoints : [`Confirm the approved ${app.name} version, identity, and dependency stack before the next handoff.`],
    commonIssues: commonIssues.length
      ? commonIssues
      : [normalizeIssue({ issue: `${app.name} issue requires version, access, and local-state review`, fix: "Compare the workstation to a known-good build before reinstalling." })],
    usefulInfo: extra.usefulInfo ?? { paths: [], logs: [], services: [], processes: [] },
    relatedApps: extra.relatedApps?.length ? extra.relatedApps : apps.filter(item => item.slug !== appSlug).slice(0, 3).map(item => ({ vendor: vendorSlug, app: item.slug })),
    relatedLinks: unique([...(app.supportLinks ?? []), ...(extra.relatedLinks ?? [])])
  };
}

function appSections() {
  return [
    ["overview", "Overview"],
    ["ask-first", "Ask First"],
    ["licensing", "Licensing / Access"],
    ["install-setup", "Install / Setup"],
    ["uninstall-reclaim", "Uninstall / Reclaim"],
    ["support-checkpoints", "Support Checkpoints"],
    ["common-issues", "Common Issues"],
    ["paths-logs", "Paths / Logs / Services"],
    ["related-resources", "Related Resources"]
  ];
}

function renderBreadcrumbs() {
  const parts = [
    { label: "Home", url: homeUrl },
    { label: "Vendor Guides", url: guideHubUrl },
    { label: vendor.title, url: vendorUrl(vendorSlug) }
  ];
  if (pageType === "app" && app) {
    parts.push({ label: app.name, url: appUrl(vendorSlug, app.slug) });
  }
  elements.breadcrumbs.innerHTML = "";
  parts.forEach((item, index) => {
    if (index) elements.breadcrumbs.appendChild(el("span", "guide-breadcrumb-sep", ">"));
    if (index === parts.length - 1) {
      elements.breadcrumbs.appendChild(el("strong", "guide-breadcrumb-current", item.label));
      return;
    }
    const link = el("a", "guide-breadcrumb-link", item.label);
    link.href = item.url;
    elements.breadcrumbs.appendChild(link);
  });
}

function renderJumpLinks() {
  if (!elements.jumpLinks) return;
  elements.jumpLinks.innerHTML = "";

  if (pageType !== "app") {
    elements.jumpLinks.hidden = true;
    return;
  }

  const nav = el("nav", "guide-jump-links");
  nav.setAttribute("aria-label", "Jump to a section");
  appSections().forEach(([id, label]) => {
    const link = el("a", "guide-jump-link", label);
    link.href = `#${id}`;
    nav.appendChild(link);
  });

  elements.jumpLinks.hidden = false;
  elements.jumpLinks.appendChild(nav);
}

function renderVendorPage() {
  const overview = section("overview", "Vendor Guide", vendor.title, vendor.summary);
  overview.appendChild(card("Overview", paragraphs([vendor.overview])));
  overview.appendChild(card("In Scope", list(vendor.products)));

  const notes = section("shared-notes", "Shared Notes", "What We Check First", "Use these vendor-wide checks before you dive into a single application.");
  notes.appendChild(card("Shared Notes", vendor.sharedNotes));
  const faqItems = (vendorFaqs[vendorSlug] ?? []).map(item => `${item.q}: ${item.a}`);
  notes.appendChild(card("FAQ", faqItems.length ? faqItems : ["No vendor-specific FAQ is captured yet. Use the shared notes and application guides as the first-pass reference."]));

  const admin = section("admin-surfaces", "Admin Surfaces", "Where To Validate Access", "These are the admin or support surfaces most often needed during support work.");
  admin.appendChild(card("Admin Surfaces", vendor.adminSurfaces));
  const installItems = (vendorInstallIssues[vendorSlug] ?? []).map(item => `${item.issue}: ${item.fix}`);
  admin.appendChild(card("Install / Cleanup Patterns", installItems.length ? installItems : vendor.sharedNotes));

  const directory = section("app-directory", "Applications", "Application Directory", "Each application has its own dedicated guide page with practical checkpoints and related resources.");
  const grid = el("div", "guide-card-grid guide-app-grid");
  apps.forEach(item => {
    const appCard = el("article", "guide-card guide-app-card");
    appCard.append(el("p", "guide-app-kicker", getAppGuideContent(vendorSlug, item.slug).highlights ? "Priority Guide" : "Application"));
    appCard.append(el("h3", "guide-card-title", item.name));
    appCard.append(el("p", "guide-card-copy", item.summary ?? item.focus));
    const link = el("a", "guide-primary-link", "Open app guide");
    link.href = appUrl(vendorSlug, item.slug);
    appCard.appendChild(link);
    grid.appendChild(appCard);
  });
  directory.appendChild(grid);

  const patterns = section("common-patterns", "Common Patterns", "Recurring Vendor Problems", "Keep these vendor-wide failure modes in mind as you narrow down the issue.");
  const usageItems = (vendorUsageIssues[vendorSlug] ?? []).map(item => `${item.issue}: ${item.fix}`);
  patterns.appendChild(card("Usage Issues", usageItems.length ? usageItems : vendor.sharedNotes));

  const links = section("official-links", "Links", "Official Links", "Use these vendor resources when you need the official source of record.");
  links.appendChild(card("Vendor Links", linkList(vendor.supportLinks.map(item => ({ label: item.label, url: item.url })) )));

  elements.content.append(overview, notes, admin, directory, patterns, links);
}

function renderAppPage() {
  const model = buildAppModel();

  const overview = section("overview", "Application Guide", model.name, model.summary);
  overview.appendChild(card("Overview", paragraphs(model.overview)));
  if (model.highlights.length) {
    overview.appendChild(card("Fastest Likely Fix / Watchouts", model.highlights));
  }

  const ask = section("ask-first", "Triage", "What To Ask The User First", "Use these questions to narrow the issue before repair work starts.");
  ask.appendChild(card("Ask First", model.askFirst));

  const licensing = section("licensing", "Access", "Licensing / Access", "Confirm entitlement and sign-in assumptions before changing the local app.");
  licensing.appendChild(card("Licensing / Access", model.licensing));

  const install = section("install-setup", "Lifecycle", "Install / Setup", "Use the approved build, then validate the workflow the user actually needs.");
  install.appendChild(card("Install / Setup", model.install));

  const uninstall = section("uninstall-reclaim", "Lifecycle", "Uninstall / Reclaim", "Protect local data and reclaim access intentionally.");
  uninstall.appendChild(card("Uninstall / Reclaim", model.uninstall));

  const support = section("support-checkpoints", "Support", "Support Checkpoints", "These are the checkpoints worth capturing before deeper troubleshooting or handoff.");
  support.appendChild(card("Support Checkpoints", model.supportCheckpoints));

  const issues = section("common-issues", "Troubleshooting", "Common Issues", "Focus on the repeated failure patterns first.");
  const issueGrid = el("div", "guide-card-grid");
  model.commonIssues.forEach(item => {
    const issueCard = el("article", "guide-card issue-card");
    issueCard.append(el("h3", "guide-card-title", item.title));
    issueCard.append(el("p", "guide-card-copy", item.symptom));
    issueCard.appendChild(card("Likely Fix", item.likelyFix));
    issueCard.appendChild(card("What To Collect", item.collect));
    issueGrid.appendChild(issueCard);
  });
  issues.appendChild(issueGrid);

  const paths = section("paths-logs", "Reference", "Useful Paths / Logs / Services", "Collect the local context that will make the next touch faster.");
  const infoGrid = el("div", "guide-card-grid");
  infoGrid.append(
    card("Paths", model.usefulInfo.paths),
    card("Logs / Screenshots", model.usefulInfo.logs),
    card("Services", model.usefulInfo.services.length ? model.usefulInfo.services : ["No vendor-specific service list captured yet. Confirm any updater, licensing, or sync services during troubleshooting."]),
    card("Processes", model.usefulInfo.processes.length ? model.usefulInfo.processes : [`Capture the active ${model.name} process list during the failure.`])
  );
  paths.appendChild(infoGrid);

  const related = section("related-resources", "Related", "Related Links / Apps", "Use these links to keep moving without losing context.");
  const relatedGrid = el("div", "guide-card-grid");
  relatedGrid.appendChild(card("Back to Vendor", linkList([{ label: `Back to ${vendor.title}`, url: vendorUrl(vendorSlug) }])));
  relatedGrid.appendChild(card("Related Apps", linkList(model.relatedApps.map(item => ({ label: getApplicationGuide(item.vendor, item.app)?.name ?? item.app, url: appUrl(item.vendor, item.app) })) )));
  relatedGrid.appendChild(card("Need More Help?", linkList([{ label: "Open contact page", url: `${rootPath}/contact.html` }])));
  if (model.relatedLinks.length) {
    relatedGrid.appendChild(card("Official / Vendor Links", linkList(model.relatedLinks.map(item => ({ label: item.label, url: item.url })) )));
  }
  related.appendChild(relatedGrid);

  elements.content.append(overview, ask, licensing, install, uninstall, support, issues, paths, related);
}

function scrollToHash(hash, replaceHistory = false) {
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;
  if (replaceHistory) {
    window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}${hash}`);
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

elements.jumpLinks?.addEventListener("click", event => {
  const link = event.target instanceof Element ? event.target.closest("a[href^='#']") : null;
  if (!link) return;
  event.preventDefault();
  scrollToHash(link.getAttribute("href"), true);
});

window.addEventListener("hashchange", () => {
  scrollToHash(window.location.hash);
});

if (!vendor || (pageType === "app" && !app)) {
  elements.kicker.textContent = "Guide";
  elements.title.textContent = "Guide not found";
  elements.summary.textContent = "The requested guide could not be located.";
} else {
  renderBreadcrumbs();
  renderJumpLinks();
  elements.kicker.textContent = pageType === "app" ? `${vendor.title} Application` : "Vendor Guide";
  elements.title.textContent = pageType === "app" ? app.name : vendor.title;
  elements.summary.textContent = pageType === "app" ? (app.summary ?? app.focus) : vendor.summary;
  elements.backLink.href = pageType === "app" ? vendorUrl(vendorSlug) : guideHubUrl;
  elements.backLink.textContent = pageType === "app" ? `Back to ${vendor.title}` : "Back to Vendor Guides";
  document.title = pageType === "app" ? `${app.name} | ${vendor.title}` : `${vendor.title} Guide`;
  if (pageType === "app") {
    renderAppPage();
  } else {
    renderVendorPage();
  }
}

if (window.location.hash) {
  scrollToHash(window.location.hash);
}
