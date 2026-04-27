import "../siteChrome.js";
import { copyTextToClipboard } from "../resourceCommon.js";
import { vendorGuides } from "./guideData.js";
import {
  buildAppGuideUrl,
  getApplicationGuide,
  getVendorApplications
} from "./applicationCatalog.js";
import { getAppGuideContent } from "./appGuideContent.js";
import { getPublicGuideContent } from "./publicGuideContent.js";
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
const licensedVendors = new Set(["microsoft", "oracle", "autodesk", "bentley", "esri", "ptc", "trimble", "adobe", "bluebeam", "foxit", "quickbooks", "egnyte", "mctrans", "axiom"]);
const defaultReviewLabel = "Reviewed April 2026";

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

function getVendorAppSearchText(item) {
  const extra = getAppGuideContent(vendorSlug, item.slug);
  const publicContent = getPublicGuideContent(vendorSlug, item.slug);
  return [
    item.name,
    item.summary,
    item.focus,
    item.licensing,
    item.install,
    item.uninstall,
    extra.summary,
    ...(extra.highlights ?? []),
    ...(extra.askFirst ?? []),
    publicContent.summary,
    ...(publicContent.overview ?? []),
    ...(publicContent.highlights ?? [])
  ].filter(Boolean).join(" ").toLowerCase();
}

function hasPriorityGuideContent(item) {
  const extra = getAppGuideContent(vendorSlug, item.slug);
  const publicContent = getPublicGuideContent(vendorSlug, item.slug);
  return Boolean(
    extra.summary
    || extra.highlights?.length
    || publicContent.summary
    || publicContent.highlights?.length
    || publicContent.commonIssues?.length
  );
}

function formatReviewLabel(label = defaultReviewLabel) {
  if (/^(reviewed|updated)\b/i.test(label)) {
    return label;
  }
  return `Reviewed ${label}`;
}

function renderReviewLabel(label = defaultReviewLabel) {
  if (!elements.summary?.parentElement) {
    return;
  }

  let review = document.getElementById("guideReviewLabel");
  if (!review) {
    review = el("p", "guide-review-label");
    review.id = "guideReviewLabel";
    elements.summary.insertAdjacentElement("afterend", review);
  }

  review.textContent = formatReviewLabel(label);
}

function publicizeText(value = "") {
  return value
    .replace(/\bOWA\b/g, "Outlook on the web")
    .replace(/\bUPN\b/g, "work account email")
    .replace(/\bclient-standard\b/gi, "company-approved")
    .replace(/\btenant\b/gi, "organization")
    .replace(/\bworkstation\b/gi, "computer")
    .replace(/\bworkstations\b/gi, "computers")
    .replace(/\bknown-good peer\b/gi, "another user whose app is working")
    .replace(/\bknown-good user\b/gi, "another user whose app is working")
    .replace(/\bknown-good workstation\b/gi, "another computer that works correctly")
    .replace(/\bhandoff\b/gi, "setup")
    .replace(/\bAdmin Console\b/g, "Adobe account setup")
    .replace(/\bBBID\b/g, "Bluebeam ID");
}

function publicizeItems(items = []) {
  return unique(items.map(item => publicizeText(item)).filter(Boolean));
}

function defaultOverview() {
  return [
    publicizeText(app.summary ?? app.focus ?? `Use this page for help with ${app.name}.`),
    `Use the checks below to confirm the right account, app version, and file or project path before contacting support.`
  ];
}

function defaultAskFirst() {
  return [
    `What exact ${app.name} task is failing: sign-in, opening files, syncing, printing, or startup?`,
    "Did the issue begin after an update, restart, password change, or new computer?",
    "Does the same task work in the browser or on another computer if that option is available?",
    "Is the problem limited to one file, project, library, or mailbox, or does it affect the whole app?"
  ];
}

function defaultLicensing() {
  return [
    `Make sure you are signed in with the work account your company expects for ${app.name}.`,
    `If ${app.name} says Trial, Unlicensed, or Subscription Required, capture the exact message before closing it.`,
    "If a browser version works but the desktop app does not, note that for support."
  ];
}

function defaultInstall() {
  return [
    `Close ${app.name}, install pending updates, and restart the computer.`,
    "Sign back in with the correct work account after the restart if the app asks you to.",
    `Test one simple task in ${app.name} before reopening the exact file, project, or mailbox that failed earlier.`
  ];
}

function defaultSupportCheckpoints() {
  return [
    "Restart the app and computer before bigger changes.",
    "If a browser version exists, compare it to the desktop app before reinstalling.",
    `If only one file, project, or mailbox fails, test a second one before assuming ${app.name} itself is broken.`,
    "Capture the exact message and when the problem started."
  ];
}

function defaultCommonIssues() {
  return [
    {
      title: "Sign-in or access problem",
      symptom: `${app.name} opens, but the expected account, subscription, or access is missing.`,
      likelyFix: "Sign out, sign back in with the correct work account, and compare the result to the browser version if one is available.",
      collect: "Send a screenshot of the sign-in or access message and the work account you expected to use."
    },
    {
      title: "A file, project, or workspace will not open",
      symptom: `The app launches, but the item you need will not open or does not load correctly.`,
      likelyFix: "Test a second file or project and confirm the original path or location is still available before reinstalling the app.",
      collect: "Send the file, project, library, or mailbox name involved plus the exact error shown."
    },
    {
      title: "The app is slow, frozen, or crashing",
      symptom: `${app.name} opens slowly, stops responding, or closes unexpectedly.`,
      likelyFix: "Restart the computer, install pending updates, and note whether the issue began after a recent change.",
      collect: "Send the app version, when the issue started, and a screenshot of any crash message."
    }
  ];
}

function defaultSupportArtifacts() {
  return [
    `A screenshot of the exact ${app.name} message or screen where the problem happens.`,
    "The work account you used to sign in and whether the same task works in the browser or on another computer.",
    `The ${app.name} version shown in the app.`,
    "The file, project, library, or workflow name involved in the problem."
  ];
}

function normalizeIssue(item) {
  if (!item) return null;
  if (item.title) {
    return {
      title: publicizeText(item.title),
      symptom: publicizeText(item.symptom ?? item.issue ?? item.title),
      likelyFix: publicizeText(item.likelyFix ?? item.fix ?? ""),
      collect: publicizeText(item.collect ?? "Capture the exact error, version, and what changed before the issue started.")
    };
  }
  return {
    title: publicizeText(item.issue),
    symptom: publicizeText(item.issue),
    likelyFix: publicizeText(item.fix),
    collect: "Capture the exact error, version, and what changed before the issue started."
  };
}

function buildAppModel() {
  const extra = getAppGuideContent(vendorSlug, appSlug);
  const publicContent = getPublicGuideContent(vendorSlug, appSlug);
  const hasPublicGuide = Object.keys(publicContent).length > 0;
  const overview = publicContent.overview?.length
    ? publicContent.overview
    : (extra.overview?.length ? publicizeItems(extra.overview) : defaultOverview());
  const supportCheckpoints = publicContent.supportCheckpoints?.length
    ? publicContent.supportCheckpoints
    : publicizeItems([...(extra.supportCheckpoints ?? []), ...(app.supportChecks ?? [])]);
  const commonIssuesSource = publicContent.commonIssues?.length
    ? publicContent.commonIssues
    : (extra.commonIssues?.length ? extra.commonIssues : (app.commonIssues ?? defaultCommonIssues()));
  const commonIssues = commonIssuesSource.map(normalizeIssue);

  let licensing;
  if (Array.isArray(publicContent.licensing)) {
    licensing = publicContent.licensing;
  } else {
    const licensingItems = publicizeItems([app.licensing, ...(extra.licensing ?? [])]);
    licensing = licensingItems.length ? licensingItems : defaultLicensing();
  }

  return {
    name: app.name,
    summary: publicizeText(publicContent.summary ?? extra.summary ?? app.summary ?? app.focus ?? `Use this page for help with ${app.name}.`),
    overview: overview.length ? overview : defaultOverview(),
    highlights: publicContent.highlights?.length ? publicContent.highlights : (hasPublicGuide ? [] : publicizeItems(extra.highlights ?? [])),
    askFirst: publicContent.askFirst?.length
      ? publicContent.askFirst
      : (publicizeItems(extra.askFirst ?? []).length ? publicizeItems(extra.askFirst ?? []) : defaultAskFirst()),
    licensing,
    mobileSetup: publicContent.mobileSetup?.length
      ? publicContent.mobileSetup
      : (publicContent.phoneSetup?.length ? publicContent.phoneSetup : []),
    install: publicContent.install?.length
      ? publicContent.install
      : (publicizeItems([app.install, ...(extra.install ?? [])]).length ? publicizeItems([app.install, ...(extra.install ?? [])]) : defaultInstall()),
    supportCheckpoints: supportCheckpoints.length ? supportCheckpoints : defaultSupportCheckpoints(),
    commonIssues: commonIssues.length ? commonIssues : defaultCommonIssues().map(normalizeIssue),
    supportArtifacts: publicContent.supportArtifacts?.length ? publicContent.supportArtifacts : defaultSupportArtifacts(),
    relatedApps: extra.relatedApps?.length ? extra.relatedApps : apps.filter(item => item.slug !== appSlug).slice(0, 3).map(item => ({ vendor: vendorSlug, app: item.slug })),
    relatedLinks: unique([...(app.supportLinks ?? []), ...(extra.relatedLinks ?? []), ...(publicContent.relatedLinks ?? [])]),
    lastReviewed: publicContent.lastReviewed ?? defaultReviewLabel
  };
}

function buildSupportChecklist(model) {
  return [
    `${model.name} support details checklist`,
    "",
    "Fill in what you can before sending support:",
    "- Work account used:",
    `- ${model.name} version:`,
    "- Screenshot or exact error wording:",
    "- Does the browser version work, if one exists?",
    "- Does the same task work on another computer, phone, Cloud PC, VPN path, or Citrix session?",
    "- Exact file, project, site URL, mailbox, printer, datasource, company file, or path involved:",
    "",
    "Guide-specific details to include:",
    ...model.supportArtifacts.map(item => `- ${item}`)
  ].join("\n");
}

function createCopySupportAction(model) {
  const wrapper = el("div", "inline-actions guide-copy-actions");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary-btn";
  button.textContent = "Copy support details checklist";

  const status = el("span", "guide-copy-status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  button.addEventListener("click", async () => {
    try {
      await copyTextToClipboard(buildSupportChecklist(model));
      status.textContent = "Copied.";
    } catch {
      status.textContent = "Copy failed. Select the list above and copy it manually.";
    }
  });

  wrapper.append(button, status);
  return wrapper;
}

function appSections(model) {
  const sections = [
    ["overview", "Overview"],
    ["before-you-start", "Before You Start"],
    ["install-update-basics", "Install / Update Basics"],
    ["common-problems", "Common Problems"],
    ["try-fixes-first", "Try These Fixes First"],
    ["what-to-send-support", "What to Send Support"],
    ["related-help", "Related Help"]
  ];

  if (model.licensing?.length) {
    sections.splice(2, 0, ["licensing-access", "Licensing / Access"]);
  }

  if (model.mobileSetup?.length) {
    sections.splice(model.licensing?.length ? 3 : 2, 0, ["phone-tablet-setup", "Phone / Tablet Setup"]);
  }

  return sections;
}

function renderBreadcrumbs() {
  const parts = [
    { label: "Home", url: homeUrl },
    { label: "App Help", url: guideHubUrl },
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

function renderJumpLinks(model = null) {
  if (!elements.jumpLinks) return;
  elements.jumpLinks.innerHTML = "";

  if (pageType !== "app") {
    renderVendorAppFinder();
    return;
  }

  const nav = el("nav", "guide-jump-links");
  nav.setAttribute("aria-label", "Jump to a section");
  appSections(model).forEach(([id, label]) => {
    const link = el("a", "guide-jump-link", label);
    link.href = `#${id}`;
    nav.appendChild(link);
  });

  elements.jumpLinks.hidden = false;
  elements.jumpLinks.appendChild(nav);
}

function renderVendorAppFinder() {
  if (!elements.jumpLinks || !apps.length) {
    return;
  }

  const shell = el("section", "guide-vendor-finder");
  shell.setAttribute("aria-label", `${vendor.title} app guide finder`);

  const header = el("div", "guide-vendor-finder-header");
  const copy = el("div");
  copy.append(
    el("p", "section-kicker", "Application Guides"),
    el("h2", "guide-section-title", "Find the app your team uses"),
    el("p", "guide-section-copy", "Search or open the exact product guide before working through vendor-wide notes.")
  );

  const count = el("span", "guide-app-count", `${apps.length} app guides`);
  header.append(copy, count);

  const search = document.createElement("input");
  search.type = "search";
  search.className = "guide-app-search";
  search.placeholder = `Search ${vendor.title} apps`;
  search.setAttribute("aria-label", `Search ${vendor.title} app guides`);

  const nav = el("nav", "guide-app-chip-grid");
  nav.setAttribute("aria-label", `${vendor.title} app guides`);

  const empty = el("p", "guide-empty-message", "No app guides matched that search.");
  empty.hidden = true;

  const links = apps.map(item => {
    const link = el("a", "guide-app-chip");
    link.href = appUrl(vendorSlug, item.slug);
    link.dataset.searchText = getVendorAppSearchText(item);
    link.append(
      el("strong", "", item.name),
      el("span", "guide-app-chip-copy", item.summary ?? item.focus ?? "Open the product guide.")
    );
    nav.appendChild(link);
    return link;
  });

  function applyFilter() {
    const tokens = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    links.forEach(link => {
      const matches = tokens.every(token => link.dataset.searchText.includes(token));
      link.hidden = !matches;
      link.setAttribute("aria-hidden", String(!matches));
      if (matches) {
        visible += 1;
      }
    });
    count.textContent = `${visible} of ${apps.length} app guides`;
    empty.hidden = visible !== 0;
  }

  search.addEventListener("input", applyFilter);

  shell.append(header, search, nav, empty);
  elements.jumpLinks.hidden = false;
  elements.jumpLinks.appendChild(shell);
}

function renderVendorPage() {
  const overview = section("overview", "Vendor Help", vendor.title, vendor.summary);
  overview.appendChild(card("Overview", paragraphs([vendor.overview])));
  overview.appendChild(card("In Scope", list(vendor.products)));

  const notes = section("shared-notes", "Start Here", "Helpful starting points", "Use these vendor-wide tips before you dive into a single application.");
  notes.appendChild(card("Shared Notes", vendor.sharedNotes));
  const faqItems = (vendorFaqs[vendorSlug] ?? []).map(item => `${item.q}: ${item.a}`);
  notes.appendChild(card("FAQ", faqItems.length ? faqItems : ["No vendor-specific FAQ is captured yet. Use the shared notes and application guides as the first-pass reference."]));

  const admin = section("admin-surfaces", "Access", "Accounts, setup, and official tools", "Use these official vendor pages when you need account access, downloads, or setup details from the source.");
  admin.appendChild(card("Admin Surfaces", vendor.adminSurfaces));
  const installItems = (vendorInstallIssues[vendorSlug] ?? []).map(item => `${item.issue}: ${item.fix}`);
  admin.appendChild(card("Setup / Update Tips", installItems.length ? installItems : vendor.sharedNotes));

  const directory = section("app-directory", "Applications", "Application Directory", "Open the exact app guide first when you already know which product is involved.");
  const grid = el("div", "guide-card-grid guide-app-grid");
  apps.forEach(item => {
    const appCard = el("a", "guide-card guide-app-card guide-app-card-link");
    appCard.href = appUrl(vendorSlug, item.slug);
    appCard.dataset.searchText = getVendorAppSearchText(item);
    appCard.append(el("p", "guide-app-kicker", hasPriorityGuideContent(item) ? "Priority Guide" : "Application"));
    appCard.append(el("h3", "guide-card-title", item.name));
    appCard.append(el("p", "guide-card-copy", item.summary ?? item.focus));
    appCard.appendChild(el("span", "guide-primary-link", "Open app guide"));
    grid.appendChild(appCard);
  });
  directory.appendChild(grid);

  const patterns = section("common-patterns", "Common Problems", "Recurring vendor-wide issues", "Keep these vendor-wide patterns in mind as you narrow down the issue.");
  const usageItems = (vendorUsageIssues[vendorSlug] ?? []).map(item => `${item.issue}: ${item.fix}`);
  patterns.appendChild(card("Usage Issues", usageItems.length ? usageItems : vendor.sharedNotes));

  const links = section("official-links", "Links", "Official Links", "Use these vendor resources when you need the official source of record.");
  links.appendChild(card("Vendor Links", linkList(vendor.supportLinks.map(item => ({ label: item.label, url: item.url })) )));

  elements.content.append(directory, overview, notes, patterns, admin, links);
}

function renderAppPage(model) {
  const overview = section("overview", "Application Guide", model.name, model.summary);
  overview.appendChild(card("Overview", paragraphs(model.overview)));
  if (model.highlights.length) {
    overview.appendChild(card("Quick Notes", model.highlights));
  }

  const ask = section("before-you-start", "Before You Start", "Before You Start", "Use these quick checks to narrow the problem before you change the app or computer.");
  ask.appendChild(card("Check these first", model.askFirst));

  const install = section("install-update-basics", "Install / Update Basics", "Install / Update Basics", "These safe steps help with fresh installs, recent updates, and apps that stopped working after a change.");
  install.appendChild(card("Install / Update Basics", model.install));

  let phoneSetup = null;
  if (model.mobileSetup.length) {
    phoneSetup = section("phone-tablet-setup", "Phone / Tablet", "Phone / Tablet Setup", "Use these checks when you are setting up the app on an iPhone or Android device, moving to a new phone, or fixing missing mobile prompts.");
    phoneSetup.appendChild(card("Phone / Tablet Setup", model.mobileSetup));
  }

  const issues = section("common-problems", "Common Problems", "Common Problems", "These are the problems people run into most often with this app.");
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

  const support = section("try-fixes-first", "Try These Fixes First", "Try These Fixes First", "Try these stable, low-risk steps before contacting support.");
  support.appendChild(card("Try These Fixes First", model.supportCheckpoints));

  const sendSupport = section("what-to-send-support", "What to Send Support", "What to Send Support", "If the problem continues, send these details so support can help faster.");
  sendSupport.appendChild(card("Send these details", model.supportArtifacts));
  sendSupport.appendChild(createCopySupportAction(model));

  const related = section("related-help", "Related Help", "Related Help", "Use these links to keep moving without losing context.");
  const relatedGrid = el("div", "guide-card-grid");
  relatedGrid.appendChild(card("Back to Vendor", linkList([{ label: `Back to ${vendor.title}`, url: vendorUrl(vendorSlug) }])));
  relatedGrid.appendChild(card("Related Apps", linkList(model.relatedApps.map(item => ({ label: getApplicationGuide(item.vendor, item.app)?.name ?? item.app, url: appUrl(item.vendor, item.app) })) )));
  const supportLinks = [{ label: "Open contact page", url: `${rootPath}/contact.html` }];
  if (licensedVendors.has(vendorSlug)) {
    supportLinks.push({ label: "Licensing help", url: `${rootPath}/app-licensing.html` });
  }
  relatedGrid.appendChild(card("Need More Help?", linkList(supportLinks)));
  if (model.relatedLinks.length) {
    relatedGrid.appendChild(card("Official / Vendor Links", linkList(model.relatedLinks.map(item => ({ label: item.label, url: item.url })) )));
  }
  related.appendChild(relatedGrid);

  elements.summary.textContent = model.summary;
  renderReviewLabel(model.lastReviewed);
  const sections = [overview, ask];
  if (model.licensing.length) {
    const licensing = section("licensing-access", "Licensing / Access", "Licensing / Access", "Use these checks when the app says Trial, Unlicensed, Subscription Required, or opens with the wrong account.");
    licensing.appendChild(card("Licensing / Access", model.licensing));
    sections.push(licensing);
  }
  if (phoneSetup) {
    sections.push(phoneSetup);
  }
  sections.push(install, issues, support, sendSupport, related);
  elements.content.append(...sections);
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
  elements.content.innerHTML = "";
  elements.kicker.textContent = pageType === "app" ? `${vendor.title} Application` : "App Help";
  elements.title.textContent = pageType === "app" ? app.name : vendor.title;
  elements.summary.textContent = pageType === "app" ? publicizeText(app.summary ?? app.focus) : vendor.summary;
  elements.backLink.href = pageType === "app" ? vendorUrl(vendorSlug) : guideHubUrl;
  elements.backLink.textContent = pageType === "app" ? `Back to ${vendor.title}` : "Back to App Help";
  document.title = pageType === "app" ? `${app.name} | ${vendor.title}` : `${vendor.title} App Help`;
  if (pageType === "app") {
    const model = buildAppModel();
    renderJumpLinks(model);
    renderAppPage(model);
  } else {
    renderReviewLabel(defaultReviewLabel);
    renderJumpLinks();
    renderVendorPage();
  }
}

if (window.location.hash) {
  scrollToHash(window.location.hash);
}
