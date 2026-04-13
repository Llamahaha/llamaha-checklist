import "../siteChrome.js";
import { vendorGuides } from "./guideData.js";
import {
  buildAppGuideUrl,
  getApplicationGuide,
  getVendorApplications
} from "./applicationCatalog.js";
import { getAppGuideContent } from "./appGuideContent.js";

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
const applicationsUrl = `${rootPath}/applications.html`;
const contactUrl = `${rootPath}/contact.html`;
const vendorUrl = slug => `${rootPath}/guides/${slug}.html`;
const appUrl = (slug, childSlug) => `${rootPath}/${buildAppGuideUrl(slug, childSlug)}`;

const publicVendorIntro = {
  microsoft: [
    "Use these guides for common Microsoft 365 issues like sign-in, email access, Teams meetings, sync problems, and opening files from SharePoint or OneDrive.",
    "If you are not sure which Microsoft app is involved yet, start with the app that matches the screen or message you are seeing most often."
  ],
  autodesk: [
    "Use these guides for common Autodesk setup, sign-in, update, file-access, and missing-content problems.",
    "If your team uses templates, add-ins, plot styles, or shared content, check those items first before you reinstall anything."
  ],
  bentley: [
    "Use these guides for Bentley sign-in, application access, ProjectWise, shared workspace, and common startup issues.",
    "If the problem depends on a datasource, project tree, or shared standards, note that early so support can follow the right path."
  ],
  esri: [
    "Use these guides for ArcGIS sign-in, project access, missing layers, and extension or portal issues.",
    "If the problem depends on a specific ArcGIS organization, project, or layer, include that detail when you ask for help."
  ],
  ptc: [
    "Use these guides for Mathcad setup, sign-in, license access, and worksheet issues.",
    "If your team relies on shared templates or a license server, note that before making larger changes."
  ],
  adobe: [
    "Use these guides for Acrobat and Adobe app sign-in, activation, setup, and common document workflow problems.",
    "If the issue only affects PDFs, default app behavior, or one Adobe app, open that app guide first."
  ],
  bluebeam: [
    "Use these guides for Bluebeam Revu sign-in, Studio access, profile content, and everyday PDF workflow issues.",
    "If the problem involves Studio Sessions, shared tool sets, or BBID sign-in, include that when you contact support."
  ],
  quickbooks: [
    "Use these guides for QuickBooks access, company files, setup questions, hosting, and common desktop issues.",
    "If your issue involves one specific company file or hosted environment, keep that detail handy while you work through the guide."
  ],
  egnyte: [
    "Use these guides for Egnyte desktop access, mapped-drive style workflows, sign-in, and common file-sync questions.",
    "If the issue affects both the desktop app and the web portal, mention that early because it helps narrow down the cause."
  ]
};

const publicAppIntro = {
  "microsoft/outlook": [
    "Outlook is used for email, calendars, shared mailboxes, and meeting scheduling.",
    "Use this guide for startup problems, password prompts, missing shared mailboxes, send or receive issues, and common profile problems."
  ],
  "microsoft/teams": [
    "Teams is used for chat, meetings, calling, file sharing, and collaboration.",
    "Use this guide for sign-in issues, missing channels, meeting audio or video problems, and desktop app problems that do not happen in the browser."
  ],
  "microsoft/onedrive": [
    "OneDrive keeps work files in sync between your computer and Microsoft 365.",
    "Use this guide for stuck sync, missing folders, duplicate sync roots, and questions about Files On-Demand or shared libraries."
  ],
  "microsoft/sharepoint": [
    "SharePoint is used for team sites, shared document libraries, and opening or syncing files with Microsoft 365 apps.",
    "Use this guide for site access, open-in-app problems, sync issues, and common permission-related questions."
  ],
  "autodesk/autocad": [
    "AutoCAD is commonly used for drafting, drawing review, plotting, and opening shared design files.",
    "Use this guide for startup problems, sign-in questions, missing templates or plot styles, and common file or printer-related issues."
  ],
  "autodesk/civil-3d": [
    "Civil 3D is used for civil design work, shared references, templates, and project-based drawings.",
    "Use this guide for launch problems, missing styles, broken references, and setup questions after a new install or computer change."
  ],
  "autodesk/revit": [
    "Revit is used for BIM modeling, project collaboration, add-ins, and shared family or template content.",
    "Use this guide for startup problems, missing add-ins or families, version mismatches, and project access issues."
  ],
  "autodesk/autodesk-desktop-app": [
    "Autodesk Desktop App helps manage Autodesk updates and app access on the computer.",
    "Use this guide when Autodesk apps stop seeing updates, sign-in feels wrong, or product access looks different than expected."
  ],
  "bentley/projectwise": [
    "ProjectWise is used for project documents, datasource access, check-in and check-out workflows, and shared engineering files.",
    "Use this guide for missing project trees, sign-in issues, datasource problems, and questions about local work areas."
  ],
  "bentley/connection-client": [
    "Bentley CONNECTION Client helps Bentley apps sign in and refresh access.",
    "Use this guide when Bentley apps stop recognizing your account or several Bentley apps on the same computer start failing together."
  ],
  "bentley/microstation": [
    "MicroStation is used for design files, references, plotting, and shared workspace content.",
    "Use this guide for launch issues, workspace or standards problems, sign-in questions, and missing shared content."
  ],
  "esri/arcgis-pro": [
    "ArcGIS Pro is used for GIS projects, layers, maps, and portal-based content.",
    "Use this guide for sign-in problems, missing projects or layers, extension issues, and setup questions on a new computer."
  ],
  "ptc/mathcad-prime": [
    "Mathcad Prime is used for engineering worksheets, calculations, and shared template-based work.",
    "Use this guide for sign-in or license issues, missing templates, worksheet access problems, and common setup questions."
  ],
  "bluebeam/revu-21": [
    "Bluebeam Revu is used for viewing, marking up, and sharing PDF documents, often with Studio Sessions or shared tool sets.",
    "Use this guide for sign-in issues, Studio access problems, missing profiles or tool chests, and common PDF workflow problems."
  ],
  "adobe/acrobat-pro": [
    "Adobe Acrobat Pro is used for opening, editing, signing, combining, and sharing PDF documents.",
    "Use this guide for sign-in issues, missing features, startup problems, PDF defaults, and common print or plugin questions."
  ],
  "quickbooks/quickbooks-enterprise-desktop": [
    "QuickBooks Enterprise Desktop is used for accounting workflows, company files, hosted access, and printing or PDF tasks.",
    "Use this guide for company file access issues, setup questions, hosting mode problems, and common desktop errors."
  ],
  "egnyte/egnyte-desktop-app": [
    "Egnyte Desktop App gives Windows access to work files while keeping cloud storage and local access in sync.",
    "Use this guide for sign-in issues, missing folders, drive-letter questions, offline files, and common sync problems."
  ]
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function unique(items = []) {
  return [...new Set(items.filter(Boolean))];
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
  items.filter(Boolean).forEach(item => {
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
  if (intro) {
    wrapper.appendChild(el("p", "guide-section-copy", intro));
  }
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

function normalizeIssue(item) {
  if (!item) return null;
  if (item.title) {
    return item;
  }

  return {
    title: item.issue,
    symptom: item.issue,
    likelyFix: item.fix,
    collect: "Include the exact message, a screenshot if possible, and what changed right before the issue started."
  };
}

function appSections() {
  return [
    ["overview", "Overview"],
    ["before-you-start", "Before You Start"],
    ["what-youll-need", "What You'll Need"],
    ["common-problems", "Common Problems"],
    ["try-this-first", "Try These Fixes First"],
    ["more-help", "More Help"],
    ["still-need-help", "Still Need Help?"],
    ["related-articles", "Related Articles"]
  ];
}

function getPublicIssueLinks(currentVendorSlug) {
  const shared = [{ label: "Common computer issues", url: `${rootPath}/computer-issues.html` }];

  if (currentVendorSlug === "microsoft") {
    return [
      { label: "Microsoft help topics", url: `${rootPath}/microsoft-issues.html` },
      ...shared
    ];
  }

  return [
    { label: "Common software issues", url: `${rootPath}/application-issues.html` },
    ...shared
  ];
}

function buildAppModel() {
  const extra = getAppGuideContent(vendorSlug, appSlug);
  const overview = publicAppIntro[`${vendorSlug}/${appSlug}`]
    ?? (extra.overview?.length ? extra.overview : [app.summary ?? app.focus]);
  const commonIssues = (extra.commonIssues?.length ? extra.commonIssues : app.commonIssues ?? []).map(normalizeIssue);
  const whatYouNeed = unique([app.licensing, app.install, ...(extra.licensing ?? []), ...(extra.install ?? [])]).slice(0, 5);
  const tryFirst = unique([
    ...(extra.highlights ?? []),
    ...commonIssues.map(item => item.likelyFix)
  ]).slice(0, 6);
  const helpfulDetails = unique([
    ...(extra.usefulInfo?.logs ?? []),
    "A screenshot of the message or problem screen",
    `The ${app.name} version if you can find it`,
    "What changed right before the issue started"
  ]).slice(0, 6);
  const relatedApps = extra.relatedApps?.length
    ? extra.relatedApps
    : apps.filter(item => item.slug !== appSlug).slice(0, 3).map(item => ({ vendor: vendorSlug, app: item.slug }));

  return {
    name: app.name,
    overview,
    beforeYouStart: extra.askFirst?.length
      ? extra.askFirst
      : [
          `Note whether the problem is with sign-in, setup, files, updates, or a specific task in ${app.name}.`,
          "Check whether the same task works in a browser or another device if that option is available.",
          "Write down anything that changed recently, such as a password update, app update, or computer replacement."
        ],
    whatYouNeed: whatYouNeed.length
      ? whatYouNeed
      : ["Your normal work account, access to the right files or project, and the version your team expects to use."],
    commonIssues: commonIssues.length
      ? commonIssues
      : [normalizeIssue({ issue: `${app.name} is not working as expected`, fix: "Restart the app, confirm you are signed in with the correct account, and compare the result with a browser or another device if available." })],
    tryFirst: tryFirst.length
      ? tryFirst
      : ["Restart the app, confirm you are signed in with the right account, and try the same task from a browser or another device if possible."],
    helpfulDetails,
    relatedApps,
    relatedLinks: unique([...(app.supportLinks ?? []), ...(extra.relatedLinks ?? []), ...(vendor.supportLinks ?? [])])
  };
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
    if (index) {
      elements.breadcrumbs.appendChild(el("span", "guide-breadcrumb-sep", ">"));
    }

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
  const overview = section(
    "overview",
    "Vendor Guide",
    `${vendor.title} help`,
    `Browse the most common ${vendor.title} applications and help topics below.`
  );
  overview.appendChild(card("About this vendor", paragraphs(publicVendorIntro[vendorSlug] ?? [
    `Use these guides for common ${vendor.title} setup, sign-in, file access, and everyday app issues.`,
    "Open the application guide that matches the product you use most often."
  ])));
  overview.appendChild(card("Applications covered", vendor.products));

  const appDirectory = section(
    "applications",
    "Applications",
    `Popular ${vendor.title} applications`,
    "Open the app guide that matches the product you need help with."
  );
  const grid = el("div", "guide-card-grid guide-app-grid");
  apps.forEach(item => {
    const appCard = el("article", "guide-card guide-app-card");
    appCard.append(el("p", "guide-app-kicker", "Application Help"));
    appCard.append(el("h3", "guide-card-title", item.name));
    appCard.append(el("p", "guide-card-copy", `Setup help, access guidance, common problems, and next steps for ${item.name}.`));
    const link = el("a", "guide-primary-link", "Open help guide");
    link.href = appUrl(vendorSlug, item.slug);
    appCard.appendChild(link);
    grid.appendChild(appCard);
  });
  appDirectory.appendChild(grid);

  const helpTopics = section(
    "common-help",
    "Common Help",
    "What these guides usually help with",
    "Most vendor help requests fall into a few familiar categories."
  );
  helpTopics.appendChild(card("Common help categories", [
    "Signing in with the correct work account",
    "Confirming access to the right files, projects, or libraries",
    "App setup, updates, and first-launch questions",
    "Missing features, content, or shared resources",
    "Comparing what works in the app versus a browser or another device"
  ]));
  helpTopics.appendChild(card("Best next step", "If you already know which product is affected, open the app guide above for more focused steps and related help articles."));

  const moreHelp = section(
    "still-need-help",
    "Need More Help?",
    "Still need help?",
    "If the steps above do not solve the issue, use the contact options below or open the official help resources."
  );
  const helpGrid = el("div", "guide-card-grid");
  helpGrid.appendChild(card("Get help from us", linkList([
    { label: "Contact support", url: contactUrl },
    { label: "Browse all applications", url: applicationsUrl },
    { label: "Back to vendor guides", url: guideHubUrl }
  ])));
  helpGrid.appendChild(card("Official help", linkList(vendor.supportLinks.map(item => ({ label: item.label, url: item.url })) )));
  moreHelp.appendChild(helpGrid);

  elements.content.append(overview, appDirectory, helpTopics, moreHelp);
}

function renderAppPage() {
  const model = buildAppModel();

  const overview = section(
    "overview",
    "Application Guide",
    model.name,
    `Use this guide for ${model.name} setup, sign-in, common problems, and next steps.`
  );
  overview.appendChild(card("Overview", paragraphs(model.overview)));

  const beforeYouStart = section(
    "before-you-start",
    "Start Here",
    "Before you start",
    "A few quick checks can save time before you reinstall or reset anything."
  );
  beforeYouStart.appendChild(card("Start with these details", model.beforeYouStart));

  const whatYouNeed = section(
    "what-youll-need",
    "Access",
    "What you'll need",
    "These are the usual access, account, or setup details that matter for this app."
  );
  whatYouNeed.appendChild(card("Helpful prerequisites", model.whatYouNeed));

  const commonProblems = section(
    "common-problems",
    "Common Problems",
    "Common problems",
    "Start with the pattern that looks closest to what you are seeing."
  );
  const issueGrid = el("div", "guide-card-grid");
  model.commonIssues.forEach(item => {
    const issueCard = el("article", "guide-card issue-card");
    issueCard.append(el("h3", "guide-card-title", item.title));
    issueCard.append(el("p", "guide-card-copy", item.symptom));
    issueCard.appendChild(card("Try this first", item.likelyFix));
    issueCard.appendChild(card("Helpful details to have ready", item.collect));
    issueGrid.appendChild(issueCard);
  });
  commonProblems.appendChild(issueGrid);

  const tryFirst = section(
    "try-this-first",
    "Quick Fixes",
    "Try these fixes first",
    "These steps solve the most common issues without making larger changes right away."
  );
  tryFirst.appendChild(card("Suggested next steps", model.tryFirst));

  const moreHelp = section(
    "more-help",
    "More Help",
    "More help for this app",
    "Use these links if you need broader troubleshooting or official vendor documentation."
  );
  const moreHelpGrid = el("div", "guide-card-grid");
  moreHelpGrid.appendChild(card("More help topics", linkList(getPublicIssueLinks(vendorSlug))));
  if (model.relatedLinks.length) {
    moreHelpGrid.appendChild(card("Official resources", linkList(model.relatedLinks.map(item => ({ label: item.label, url: item.url })) )));
  }
  moreHelp.appendChild(moreHelpGrid);

  const stillNeedHelp = section(
    "still-need-help",
    "Contact Support",
    "Still need help?",
    "If you are still stuck, sharing the right details will help support move faster."
  );
  const supportGrid = el("div", "guide-card-grid");
  supportGrid.appendChild(card("What to include", model.helpfulDetails));
  supportGrid.appendChild(card("Next steps", linkList([
    { label: "Contact support", url: contactUrl },
    { label: `Back to ${vendor.title}`, url: vendorUrl(vendorSlug) },
    { label: "Browse all applications", url: applicationsUrl }
  ])));
  stillNeedHelp.appendChild(supportGrid);

  const related = section(
    "related-articles",
    "Related Articles",
    "Related articles",
    "If this is close but not exact, these are the next best places to check."
  );
  const relatedGrid = el("div", "guide-card-grid");
  relatedGrid.appendChild(card("Related apps", linkList(model.relatedApps.map(item => ({
    label: getApplicationGuide(item.vendor, item.app)?.name ?? item.app,
    url: appUrl(item.vendor, item.app)
  })) )));
  relatedGrid.appendChild(card("More from this vendor", linkList([
    { label: `${vendor.title} vendor guide`, url: vendorUrl(vendorSlug) },
    { label: "Vendor guides home", url: guideHubUrl },
    { label: "Applications directory", url: applicationsUrl }
  ])));
  related.appendChild(relatedGrid);

  elements.content.append(overview, beforeYouStart, whatYouNeed, commonProblems, tryFirst, moreHelp, stillNeedHelp, related);
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
  elements.summary.textContent = pageType === "app"
    ? `Help with ${app.name} setup, sign-in, common fixes, and next steps.`
    : `Browse ${vendor.title} help topics, application guides, and official support links.`;
  elements.backLink.href = pageType === "app" ? vendorUrl(vendorSlug) : guideHubUrl;
  elements.backLink.textContent = pageType === "app" ? `Back to ${vendor.title}` : "Back to Vendor Guides";
  document.title = pageType === "app" ? `${app.name} | ${vendor.title} Help` : `${vendor.title} Help`;

  if (pageType === "app") {
    renderAppPage();
  } else {
    renderVendorPage();
  }
}

if (window.location.hash) {
  scrollToHash(window.location.hash);
}
