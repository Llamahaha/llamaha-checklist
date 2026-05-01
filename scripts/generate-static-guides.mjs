// scripts/generate-static-guides.mjs
//
// Generate fully-static HTML for every vendor guide and every app guide page in
// /guides/. Each page embeds the canonical content from the data modules so the
// page is crawlable in raw HTML (no JS required). The existing visual style is
// preserved by reusing the same CSS classes that guide.js renders client-side.
//
// Run with:  node scripts/generate-static-guides.mjs
//
// The generated pages do NOT load guide.js, but they still load siteChrome.js
// for the top-of-page nav. Smooth scrolling is handled in CSS and a small
// inline script.
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { vendorGuides, vendorOrder } from "../guides/guideData.js";
import {
  applicationCatalog,
  buildAppGuideUrl,
  getApplicationGuide,
  getApplicationSlug,
  getVendorApplications
} from "../guides/applicationCatalog.js";
import { getAppGuideContent } from "../guides/appGuideContent.js";
import { getPublicGuideContent } from "../guides/publicGuideContent.js";
import {
  vendorFaqs,
  vendorInstallIssues,
  vendorUsageIssues
} from "../guides/guideExtras.js";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const guidesDir = join(rootDir, "guides");
const defaultReviewLabel = "Reviewed April 2026";

const licensedVendors = new Set([
  "microsoft", "oracle", "autodesk", "bentley", "esri", "ptc",
  "trimble", "adobe", "bluebeam", "foxit", "quickbooks", "egnyte",
  "mctrans", "axiom"
]);

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------
function escapeHtml(text) {
  if (text == null) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(text) {
  return escapeHtml(text);
}

function renderList(items, className = "guide-list") {
  const filtered = (items || []).filter(Boolean);
  if (!filtered.length) return "";
  const lis = filtered.map(t => `<li>${escapeHtml(t)}</li>`).join("");
  return `<ul class="${className}">${lis}</ul>`;
}

function renderParagraphs(items) {
  const filtered = (items || []).filter(Boolean);
  if (!filtered.length) return "";
  return `<div class="guide-copy-stack">${filtered
    .map(t => `<p class="guide-card-copy">${escapeHtml(t)}</p>`)
    .join("")}</div>`;
}

function renderLinkList(items, className = "guide-link-list") {
  const filtered = (items || []).filter(Boolean);
  if (!filtered.length) return "";
  return `<div class="${className}">${filtered
    .map(item => {
      const target = /^https?:/i.test(item.url)
        ? ' target="_blank" rel="noreferrer"'
        : "";
      return `<a class="guide-chip-link" href="${escapeAttr(item.url)}"${target}>${escapeHtml(item.label)}</a>`;
    })
    .join("")}</div>`;
}

function renderCard(title, body) {
  if (!body) return "";
  return `<article class="guide-card"><h3 class="guide-card-title">${escapeHtml(title)}</h3>${body}</article>`;
}

function renderCardList(title, items, listClass = "guide-list") {
  const list = renderList(items, listClass);
  if (!list) return "";
  return renderCard(title, list);
}

function renderSection({ id, kicker, title, intro, body }) {
  const introHtml = intro ? `<p class="guide-section-copy">${escapeHtml(intro)}</p>` : "";
  return `<section id="${escapeAttr(id)}" class="guide-section">
  <p class="section-kicker">${escapeHtml(kicker)}</p>
  <h2 class="guide-section-title">${escapeHtml(title)}</h2>
  ${introHtml}
  ${body || ""}
</section>`;
}

// ---------------------------------------------------------------------------
// Text helpers (mirror guide.js publicizeText)
// ---------------------------------------------------------------------------
function publicizeText(value = "") {
  return String(value)
    .replace(/https:\/\/&lt;company&gt;\.webex\.com/gi, "your company's Webex site")
    .replace(/https:\/\/<company>\.webex\.com/gi, "your company's Webex site")
    .replace(/https:\/\/\*\.box\.com(?:\s+and\s+https:\/\/\*\.boxcdn\.net)?/gi, "your company's Box service")
    .replace(/https:\/\/cloud\.deltek\.com/gi, "your company's Deltek Vantagepoint address")
    .replace(/\bOWA\b/g, "Outlook on the web")
    .replace(/\bUPN\b/g, "work account email")
    .replace(/\bclient-standard\b/gi, "company-approved")
    .replace(/\bdesktop client\b/gi, "desktop app")
    .replace(/\bweb client\b/gi, "web app")
    .replace(/\bclient app\b/gi, "app")
    .replace(/\bclient apps\b/gi, "apps")
    .replace(/\btenant\b/gi, "organization")
    .replace(/\bknown-good peer\b/gi, "another user whose app is working")
    .replace(/\bknown-good user\b/gi, "another user whose app is working")
    .replace(/\bknown-good workstation\b/gi, "another computer that works correctly")
    .replace(/\bworkstations\b/gi, "computers")
    .replace(/\bworkstation\b/gi, "computer")
    .replace(/\bhandoff\b/gi, "setup")
    .replace(/\bAdmin Console\b/g, "Adobe account setup")
    .replace(/\badmin console\b/gi, "account setup page")
    .replace(/\badmin center\b/gi, "account center")
    .replace(/\bAdmin Center\b/g, "Account Center")
    .replace(/\bproject admin\b/gi, "project owner")
    .replace(/\bIT admin\b/gi, "IT")
    .replace(/\badmins\b/gi, "support team")
    .replace(/\badmin\b/gi, "support team")
    .replace(/\bBBID\b/g, "Bluebeam ID")
    .replace(/\bSSO\b/g, "company sign-in")
    .replace(/\bMFA\b/g, "multi-factor sign-in")
    .replace(/\bMDM\b/g, "company device management")
    .replace(/\bTOTP\b/g, "one-time passcode")
    .replace(/\bvCPU\b/g, "processor")
    .replace(/\bIRM\b/g, "protected-library policy")
    .replace(/\bDLP\b/g, "data-protection policy")
    .replace(/\bConditional Access\b/g, "company sign-in policy")
    .replace(/\bEntra\b/g, "Microsoft work sign-in")
    .replace(/\bAzure AD\b/g, "Microsoft work sign-in")
    .replace(/\bAAD\b/g, "Microsoft work sign-in")
    .replace(/\bMSI\b/g, "installer")
    .replace(/\bidentity provider\b/gi, "company sign-in page")
    .replace(/\bdeployments\b/gi, "setup options")
    .replace(/\bdeployed\b/gi, "installed")
    .replace(/\bdeploying\b/gi, "setting up")
    .replace(/\bdeployment\b/gi, "setup")
    .replace(/\bdeploy\b/gi, "install")
    .replace(/\bprovisioned\b/gi, "set up")
    .replace(/\bprovisioning\b/gi, "setup")
    .replace(/\bdatasources\b/gi, "data sources")
    .replace(/\bdatasource\b/gi, "data source")
    .replace(/\bstale\b/gi, "out of date")
    .replace(/\bcaches\b/gi, "saved local data")
    .replace(/\bcache\b/gi, "saved local data")
    .replace(/\bregistry edits\b/gi, "advanced system changes")
    .replace(/\bregistry\b/gi, "system settings")
    .replace(/\bOST\b/g, "local Outlook data file")
    .replace(/\bPSTs\b/g, "PST files")
    .replace(/\bUNC paths\b/gi, "shared network paths")
    .replace(/\bUNC path\b/gi, "shared network path")
    .replace(/\ban multi-factor sign-in\b/gi, "a multi-factor sign-in")
    .replace(/\bcompany sign-in sign-in\b/gi, "company sign-in")
    .replace(/\bmulti-factor sign-in sign-in\b/gi, "multi-factor sign-in");
}

function publicizeItems(items = []) {
  return [...new Set((items || []).map(i => publicizeText(i)).filter(Boolean))];
}

function unique(items = []) {
  return [...new Set((items || []).filter(Boolean))];
}

function uniqueLinks(items = []) {
  const seen = new Set();
  return (items || [])
    .filter(Boolean)
    .map(item => ({
      ...item,
      label: publicizeText(item.label ?? ""),
      url: item.url
    }))
    .filter(item => {
      if (!item.label || !item.url) return false;
      const key = `${item.label}\u0000${item.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function truncate(text, max = 160) {
  if (!text) return "";
  const flat = String(text).replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max - 3).replace(/\s+\S*$/, "") + "...";
}

// ---------------------------------------------------------------------------
// Default content (mirrors guide.js defaults)
// ---------------------------------------------------------------------------
function defaultOverview(app) {
  return [
    publicizeText(app.summary ?? app.focus ?? `Use this page for help with ${app.name}.`),
    `Use the checks below to confirm the right account, app version, and file or project path before contacting support.`
  ];
}

function defaultAskFirst(app) {
  return [
    `What exact ${app.name} task is failing: sign-in, opening files, syncing, printing, or startup?`,
    "Did the issue begin after an update, restart, password change, or new computer?",
    "Does the same task work in the browser or on another computer if that option is available?",
    "Is the problem limited to one file, project, library, or mailbox, or does it affect the whole app?"
  ];
}

function defaultLicensing(app) {
  return [
    `Make sure you are signed in with the work account your company expects for ${app.name}.`,
    `If ${app.name} says Trial, Unlicensed, or Subscription Required, capture the exact message before closing it.`,
    "If a browser version works but the desktop app does not, note that for support."
  ];
}

function defaultInstall(app) {
  return [
    `Close ${app.name}, install pending updates, and restart the computer.`,
    "Sign back in with the correct work account after the restart if the app asks you to.",
    `Test one simple task in ${app.name} before reopening the exact file, project, or mailbox that failed earlier.`
  ];
}

function defaultSupportCheckpoints(app) {
  return [
    "Restart the app and computer before bigger changes.",
    "If a browser version exists, compare it to the desktop app before reinstalling.",
    `If only one file, project, or mailbox fails, test a second one before assuming ${app.name} itself is broken.`,
    "Capture the exact message and when the problem started."
  ];
}

function defaultCommonIssues(app) {
  return [
    {
      title: "Sign-in or access problem",
      symptom: `${app.name} opens, but the expected account, subscription, or access is missing.`,
      likelyFix: "Sign out, sign back in with the correct work account, and compare the result to the browser version if one is available.",
      collect: "Send a screenshot of the sign-in or access message and the work account you expected to use."
    },
    {
      title: "A file, project, or workspace will not open",
      symptom: "The app launches, but the item you need will not open or does not load correctly.",
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

function defaultSupportArtifacts(app) {
  return [
    `A screenshot of the exact ${app.name} message or screen where the problem happens.`,
    "The work account you used to sign in and whether the same task works in the browser or on another computer.",
    `The ${app.name} version shown in the app.`,
    "The file, project, library, or workflow name involved in the problem."
  ];
}

function defaultDoNotYet(app) {
  return [
    `Do not uninstall or reset ${app.name} before you have tested a second file, project, or mailbox.`,
    "Do not delete local sync folders, profiles, or project caches until the browser or web version of the same content is known to be correct.",
    "Do not change passwords, MFA settings, or default apps in the middle of troubleshooting unless support asks you to.",
    "Do not run repair tools, clean-installs, or registry edits without confirming a backup or known-good copy of any work in progress."
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

// ---------------------------------------------------------------------------
// Build the model the same way guide.js does, plus a "doNotYet" field
// ---------------------------------------------------------------------------
function buildAppModel(vendorSlug, app, vendor, apps) {
  const appSlug = app.slug;
  const extra = getAppGuideContent(vendorSlug, appSlug);
  const publicContent = getPublicGuideContent(vendorSlug, appSlug);
  const hasPublicGuide = Object.keys(publicContent).length > 0;

  const overview = publicContent.overview?.length
    ? publicizeItems(publicContent.overview)
    : (extra.overview?.length ? publicizeItems(extra.overview) : defaultOverview(app));

  const supportCheckpoints = publicContent.supportCheckpoints?.length
    ? publicizeItems(publicContent.supportCheckpoints)
    : publicizeItems([
        ...(extra.supportCheckpoints ?? []),
        ...(app.supportChecks ?? [])
      ]);

  const commonIssuesSource = publicContent.commonIssues?.length
    ? publicContent.commonIssues
    : (extra.commonIssues?.length
        ? extra.commonIssues
        : (app.commonIssues ?? defaultCommonIssues(app)));
  const commonIssues = commonIssuesSource.map(normalizeIssue).filter(Boolean);

  let licensing;
  if (Array.isArray(publicContent.licensing)) {
    licensing = publicizeItems(publicContent.licensing);
  } else {
    const licensingItems = publicizeItems([app.licensing, ...(extra.licensing ?? [])]);
    licensing = licensingItems.length ? licensingItems : defaultLicensing(app);
  }

  const askFirst = publicContent.askFirst?.length
    ? publicizeItems(publicContent.askFirst)
    : (publicizeItems(extra.askFirst ?? []).length
        ? publicizeItems(extra.askFirst ?? [])
        : defaultAskFirst(app));

  const install = publicContent.install?.length
    ? publicizeItems(publicContent.install)
    : (publicizeItems([app.install, ...(extra.install ?? [])]).length
        ? publicizeItems([app.install, ...(extra.install ?? [])])
        : defaultInstall(app));

  const mobileSetup = publicContent.mobileSetup?.length
    ? publicizeItems(publicContent.mobileSetup)
    : (publicContent.phoneSetup?.length ? publicizeItems(publicContent.phoneSetup) : []);

// "Do not do this yet / warnings" - derived from escalationNotes, app.uninstall,
  // and a minimum default set of safe-guards. Filter to items that read like a
  // warning ("do not", "avoid", "before") so the section feels actionable.
  const escalationSource = publicizeItems([
    ...(extra.escalationNotes ?? []),
    ...(vendor.escalationNotes ?? []),
    publicizeText(app.uninstall ?? "")
  ]);
  const warningCandidates = escalationSource.filter(t =>
    /do not|don't|avoid|before|preserve|do\s+not/i.test(t)
  );
  const doNotYet = warningCandidates.length
    ? unique(warningCandidates)
    : publicizeItems(defaultDoNotYet(app));

  const adminNotes = publicizeItems([
    ...(extra.supportCheckpoints ?? []),
    ...(extra.escalationNotes ?? []),
    ...(app.supportChecks ?? [])
  ]);

  const summary = publicizeText(
    publicContent.summary
      ?? extra.summary
      ?? app.summary
      ?? app.focus
      ?? `Use this page for help with ${app.name}.`
  );

  const usuallyUsedFor = publicizeText(app.focus ?? app.summary ?? "");

  return {
    name: app.name,
    slug: appSlug,
    summary,
    usuallyUsedFor,
    overview: overview.length ? overview : defaultOverview(app),
    highlights: publicContent.highlights?.length
      ? publicizeItems(publicContent.highlights)
      : (hasPublicGuide ? [] : publicizeItems(extra.highlights ?? [])),
    askFirst,
    licensing,
    mobileSetup,
    install,
    supportCheckpoints: supportCheckpoints.length
      ? supportCheckpoints
      : defaultSupportCheckpoints(app),
    commonIssues: commonIssues.length
      ? commonIssues
      : defaultCommonIssues(app).map(normalizeIssue),
    supportArtifacts: publicContent.supportArtifacts?.length
      ? publicizeItems(publicContent.supportArtifacts)
      : defaultSupportArtifacts(app),
    relatedApps: extra.relatedApps?.length
      ? extra.relatedApps
      : apps.filter(a => a.slug !== appSlug).slice(0, 3).map(a => ({ vendor: vendorSlug, app: a.slug })),
    relatedLinks: uniqueLinks([
      ...(app.supportLinks ?? []),
      ...(extra.relatedLinks ?? []),
      ...(publicContent.relatedLinks ?? [])
    ]),
    doNotYet,
    adminNotes,
    lastReviewed: publicContent.lastReviewed ?? defaultReviewLabel
  };
}

// ---------------------------------------------------------------------------
// HTML page templates
// ---------------------------------------------------------------------------
function pageHead({ title, description, canonicalPath, cssPath, iconPath }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <link rel="canonical" href="https://llamaha.com/${escapeAttr(canonicalPath)}">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:type" content="article">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" href="${escapeAttr(iconPath)}">
  <link rel="stylesheet" href="${escapeAttr(cssPath)}">
  <style>html{scroll-behavior:smooth}</style>
</head>`;
}

function renderBreadcrumbs(parts) {
  const lis = parts.map((p, i) => {
    if (i === parts.length - 1) {
      return `<strong class="guide-breadcrumb-current">${escapeHtml(p.label)}</strong>`;
    }
    return `<a class="guide-breadcrumb-link" href="${escapeAttr(p.url)}">${escapeHtml(p.label)}</a>`;
  }).join('<span class="guide-breadcrumb-sep">&gt;</span>');
  return `<nav id="breadcrumbs" class="guide-breadcrumbs" aria-label="Breadcrumb">${lis}</nav>`;
}

function renderJumpLinks(sections) {
  const links = sections.map(([id, label]) =>
    `<a class="guide-jump-link" href="#${escapeAttr(id)}">${escapeHtml(label)}</a>`
  ).join("");
  return `<div id="guideJumpLinks" class="guide-jump-shell">
  <nav class="guide-jump-links" aria-label="Jump to a section">${links}</nav>
</div>`;
}

// ---------------------------------------------------------------------------
// App page generation
// ---------------------------------------------------------------------------
function buildAppHtml(vendorSlug, vendor, app, apps) {
  const model = buildAppModel(vendorSlug, app, vendor, apps);
  const rootPath = "../..";
  const cssPath = "../guide.css";
  const iconPath = "../../assets/llamaha-icon-purple-navy.png";

  const pageTitle = `${app.name} | ${vendor.title} App Help | Llamaha`;
  const description = truncate(model.summary, 158);
  const canonicalPath = `guides/${vendorSlug}/${app.slug}.html`;

  // Section list (matches user-requested structure, plus visual sections we keep)
  const sections = [
    ["overview", "Overview"],
    ["used-for", "What this app is usually used for"],
    ["common-problems", "Common problems"],
    ["first-things-to-try", "First things to try"],
    ["do-not-yet", "Do not do this yet / warnings"],
    ["what-support-needs", "What details support needs"],
    ["licensing-access", "Licensing / access notes"],
    ["more-setup-checks", "More setup checks"]
  ];
  if (model.mobileSetup.length) {
    sections.splice(7, 0, ["phone-setup", "Phone / tablet setup"]);
  }
  sections.push(["related-guides", "Related guides"]);

  // Common issues block
  const issuesHtml = model.commonIssues.map(issue => {
    return `<article class="guide-card issue-card">
  <h3 class="guide-card-title">${escapeHtml(issue.title)}</h3>
  <p class="guide-card-copy">${escapeHtml(issue.symptom)}</p>
  ${renderCard("Likely fix", `<p class=\"guide-card-copy\">${escapeHtml(issue.likelyFix)}</p>`)}
  ${renderCard("What to collect", `<p class=\"guide-card-copy\">${escapeHtml(issue.collect)}</p>`)}
</article>`;
  }).join("");

  // Related links / related apps
  const relatedAppsLinks = model.relatedApps
    .map(item => {
      const target = getApplicationGuide(item.vendor, item.app);
      if (!target) return null;
      return {
        label: target.name,
        url: `${rootPath}/${buildAppGuideUrl(item.vendor, item.app)}`
      };
    })
    .filter(Boolean);

  const supportLinks = [{ label: "Open contact page", url: `${rootPath}/contact.html` }];
  if (licensedVendors.has(vendorSlug)) {
    supportLinks.push({ label: "Licensing help", url: `${rootPath}/app-licensing.html` });
  }
  supportLinks.push({ label: "Support pages", url: `${rootPath}/support.html` });

// Related support articles - always include the eight support articles so
  // every app has a fast path into the AEC/MSP support flow content.
  const articleLinks = [
    { label: "App crashed or will not open", url: `${rootPath}/articles/app-will-not-open.html` },
    { label: "License or sign-in error", url: `${rootPath}/articles/license-or-signin-error.html` },
    { label: "Project files will not sync", url: `${rootPath}/articles/project-files-will-not-sync.html` },
    { label: "Plotting, PDF, or printer issue", url: `${rootPath}/articles/plotting-pdf-printer-issue.html` },
    { label: "Slow or freezing on a model", url: `${rootPath}/articles/slow-or-freezing-on-a-model.html` },
    { label: "Remote access issue", url: `${rootPath}/articles/remote-access-issue.html` },
    { label: "New computer, new user, or new phone setup", url: `${rootPath}/articles/new-computer-new-user-new-phone-setup.html` },
    { label: "Before contacting IT: what to collect", url: `${rootPath}/articles/before-contacting-it-what-to-collect.html` }
  ];

  // ----- BODY -----
  const breadcrumbs = renderBreadcrumbs([
    { label: "Home", url: `${rootPath}/index.html` },
    { label: "App Help", url: `${rootPath}/vendor-guides.html` },
    { label: vendor.title, url: `${rootPath}/guides/${vendorSlug}.html` },
    { label: app.name, url: `${rootPath}/${buildAppGuideUrl(vendorSlug, app.slug)}` }
  ]);

  const overviewBody = [
    renderCard("Overview", renderParagraphs(model.overview)),
    model.highlights.length ? renderCard("Quick notes", renderList(model.highlights)) : ""
  ].filter(Boolean).join("");

  const usedForBody = renderCard(
    "What this app is usually used for",
    renderParagraphs([
      model.usuallyUsedFor || `${app.name} is part of the ${vendor.title} family.`,
      `It is part of the ${vendor.title} family covered in our app help.`
    ])
  );

  const sectionsHtml = [
    renderSection({
      id: "overview",
      kicker: "Application Guide",
      title: "Overview",
      intro: model.summary,
      body: overviewBody
    }),
    renderSection({
      id: "used-for",
      kicker: "Plain English",
      title: "What this app is usually used for",
      intro: "A short, jargon-light description so users know they are on the right page.",
      body: usedForBody
    }),
    renderSection({
      id: "common-problems",
      kicker: "Common problems",
      title: "Common problems",
      intro: "These are the problems people run into most often with this app.",
      body: `<div class="guide-card-grid">${issuesHtml}</div>`
    }),
    renderSection({
      id: "first-things-to-try",
      kicker: "First things to try",
      title: "First things to try",
      intro: "Try these stable, low-risk steps before changing the app or computer.",
      body: [
        renderCardList("Quick checks before you change anything", model.askFirst),
        renderCardList("Try these fixes first", model.supportCheckpoints)
      ].filter(Boolean).join("")
    }),
    renderSection({
      id: "do-not-yet",
      kicker: "Slow down",
      title: "Do not do this yet / warnings",
      intro: "Skip these steps until you have collected the information below or until support asks you to. They can lose data or hide the real problem.",
      body: renderCardList("Avoid these until support says it is safe", model.doNotYet)
    }),
    renderSection({
      id: "what-support-needs",
      kicker: "What support needs",
      title: "What details support needs",
      intro: "Collect these details before you contact support. The more you send up front, the less back-and-forth you will need.",
      body: renderCardList("Send these details", model.supportArtifacts)
    }),
    renderSection({
      id: "licensing-access",
      kicker: "Licensing & access",
      title: "Licensing / access notes",
      intro: "Use these checks when the app says Trial, Unlicensed, Subscription Required, or opens with the wrong account.",
      body: renderCardList("Licensing / access checks", model.licensing)
    }),
    model.mobileSetup.length
      ? renderSection({
          id: "phone-setup",
          kicker: "Phone / Tablet",
          title: "Phone / tablet setup",
          intro: "Use these checks when you are setting up the app on an iPhone or Android device, moving to a new phone, or fixing missing mobile prompts.",
          body: renderCardList("Phone / tablet setup", model.mobileSetup)
        })
      : "",
    renderSection({
      id: "more-setup-checks",
      kicker: "More checks",
      title: "More setup checks",
      intro: "These are install, update, and follow-up checks that are usually safe after the first checks above.",
      body: [
        renderCardList("Install / update basics", model.install),
        model.adminNotes.length ? renderCardList("More things to check", model.adminNotes) : ""
      ].filter(Boolean).join("")
    }),
    renderSection({
      id: "related-guides",
      kicker: "Related guides",
      title: "Related guides",
      intro: "Use these links to keep moving without losing context.",
      body: `<div class="guide-card-grid">
  ${renderCard("Back to vendor", renderLinkList([{ label: `Back to ${vendor.title}`, url: `${rootPath}/guides/${vendorSlug}.html` }]))}
  ${relatedAppsLinks.length ? renderCard("Related apps", renderLinkList(relatedAppsLinks)) : ""}
  ${renderCard("Need more help?", renderLinkList(supportLinks))}
  ${renderCard("Support articles", renderLinkList(articleLinks))}
  ${model.relatedLinks.length ? renderCard("Official / vendor links", renderLinkList(model.relatedLinks.map(item => ({ label: item.label, url: item.url })))) : ""}
</div>`
    })
  ].filter(Boolean).join("\n");

  const html = `${pageHead({ title: pageTitle, description, canonicalPath, cssPath, iconPath })}
<body data-page-type="app" data-vendor="${escapeAttr(vendorSlug)}" data-app="${escapeAttr(app.slug)}" data-root-path="${escapeAttr(rootPath)}" data-render-mode="static">
  <div class="guide-shell">
    <header class="guide-header">
      ${breadcrumbs}
      <a id="guideBackLink" class="back-link" href="../${escapeAttr(vendorSlug)}.html">Back to ${escapeHtml(vendor.title)}</a>
      <div class="guide-brand">
        <img class="brand-icon" src="${escapeAttr(iconPath)}" alt="Llamaha icon">
        <div>
          <p id="guideKicker" class="section-kicker">${escapeHtml(vendor.title)} Application</p>
          <h1 id="guideTitle">${escapeHtml(app.name)}</h1>
          <p id="guideSummary">${escapeHtml(model.summary)}</p>
          <p class="guide-review-label" id="guideReviewLabel">${escapeHtml(model.lastReviewed.startsWith("Reviewed") || model.lastReviewed.startsWith("Updated") ? model.lastReviewed : "Reviewed " + model.lastReviewed)}</p>
        </div>
      </div>
    </header>

    <main class="guide-layout">
      <div class="guide-main">
        ${renderJumpLinks(sections)}
        <div class="guide-main-scroll">
          <div id="guideContent" class="guide-content">
            ${sectionsHtml}
          </div>
        </div>
      </div>
    </main>
  </div>

  <script type="module" src="${escapeAttr(rootPath)}/siteChrome.js"></script>
</body>
</html>
`;
  return html;
}

// ---------------------------------------------------------------------------
// Vendor page generation
// ---------------------------------------------------------------------------
function buildVendorHtml(vendorSlug, vendor, apps) {
  const rootPath = "..";
  const cssPath = "./guide.css";
  const iconPath = "../assets/llamaha-icon-purple-navy.png";
  const vendorSummary = publicizeText(vendor.summary);
  const vendorOverview = publicizeText(vendor.overview);
  const vendorSharedNotes = publicizeItems(vendor.sharedNotes);
  const vendorAdminSurfaces = publicizeItems(vendor.adminSurfaces);

  const pageTitle = `${vendor.title} App Help | Llamaha`;
  const description = truncate(vendorSummary, 158);
  const canonicalPath = `guides/${vendorSlug}.html`;

  const breadcrumbs = renderBreadcrumbs([
    { label: "Home", url: `${rootPath}/index.html` },
    { label: "App Help", url: `${rootPath}/vendor-guides.html` },
    { label: vendor.title, url: `${rootPath}/guides/${vendorSlug}.html` }
  ]);

  // App directory cards
  const appCards = apps.map(item => {
    const url = `${rootPath}/${buildAppGuideUrl(vendorSlug, item.slug)}`;
    const appSummary = publicizeText(item.summary ?? item.focus ?? "Open the product guide.");
    return `<a class="guide-card guide-app-card guide-app-card-link" href="${escapeAttr(url)}">
  <p class="guide-app-kicker">Application</p>
  <h3 class="guide-card-title">${escapeHtml(item.name)}</h3>
  <p class="guide-card-copy">${escapeHtml(appSummary)}</p>
  <span class="guide-primary-link">Open app guide</span>
</a>`;
  }).join("");

  const directoryBody = `<div class="guide-card-grid guide-app-grid">${appCards}</div>`;

  // FAQ items
  const faqItems = (vendorFaqs[vendorSlug] ?? []).map(item => publicizeText(`${item.q} - ${item.a}`));
  const installItems = (vendorInstallIssues[vendorSlug] ?? []).map(item => publicizeText(`${item.issue}: ${item.fix}`));
  const usageItems = (vendorUsageIssues[vendorSlug] ?? []).map(item => publicizeText(`${item.issue}: ${item.fix}`));

  const supportLinks = [{ label: "Open contact page", url: `${rootPath}/contact.html` }];
  if (licensedVendors.has(vendorSlug)) {
    supportLinks.push({ label: "Licensing help", url: `${rootPath}/app-licensing.html` });
  }
  supportLinks.push({ label: "Support pages", url: `${rootPath}/support.html` });

  const sections = [
    ["app-directory", "Application directory"],
    ["overview", "Overview"],
    ["shared-notes", "Helpful starting points"],
    ["common-patterns", "Common problems"],
    ["account-setup", "Account and setup pages"],
    ["official-links", "Official links"]
  ];

  const sectionsHtml = [
    renderSection({
      id: "app-directory",
      kicker: "Applications",
      title: "Application directory",
      intro: "Open the exact app guide first when you already know which product is involved.",
      body: directoryBody
    }),
    renderSection({
      id: "overview",
      kicker: "Vendor help",
      title: vendor.title,
      intro: vendorSummary,
      body: [
        renderCard("Overview", renderParagraphs([vendorOverview])),
        renderCardList("In scope", vendor.products)
      ].filter(Boolean).join("")
    }),
    renderSection({
      id: "shared-notes",
      kicker: "Start here",
      title: "Helpful starting points",
      intro: "Use these vendor-wide tips before you dive into a single application.",
      body: [
        renderCardList("Shared notes", vendorSharedNotes),
        renderCardList("FAQ", faqItems.length ? faqItems : ["No vendor-specific FAQ is captured yet. Use the shared notes and application guides as the first-pass reference."])
      ].filter(Boolean).join("")
    }),
    renderSection({
      id: "common-patterns",
      kicker: "Common problems",
      title: "Recurring vendor-wide problems",
      intro: "Keep these vendor-wide patterns in mind as you narrow down the issue.",
      body: [
        renderCardList("Usage issues", usageItems.length ? usageItems : vendorSharedNotes),
        renderCardList("Setup / update tips", installItems.length ? installItems : vendorSharedNotes)
      ].filter(Boolean).join("")
    }),
    renderSection({
      id: "account-setup",
      kicker: "Access",
      title: "Accounts, setup, and official tools",
      intro: "Use these official vendor pages when you need account access, downloads, or setup details from the source.",
      body: renderCardList("Account and setup pages", vendorAdminSurfaces)
    }),
    renderSection({
      id: "official-links",
      kicker: "Links",
      title: "Official links",
      intro: "Use these vendor resources when you need the official website.",
      body: `<div class="guide-card-grid">
  ${renderCard("Vendor links", renderLinkList(uniqueLinks(vendor.supportLinks ?? [])))}
  ${renderCard("Need more help?", renderLinkList(supportLinks))}
</div>`
    })
  ].filter(Boolean).join("\n");

  const html = `${pageHead({ title: pageTitle, description, canonicalPath, cssPath, iconPath })}
<body data-page-type="vendor" data-vendor="${escapeAttr(vendorSlug)}" data-root-path="${escapeAttr(rootPath)}" data-render-mode="static">
  <div class="guide-shell">
    <header class="guide-header">
      ${breadcrumbs}
      <a id="guideBackLink" class="back-link" href="../vendor-guides.html">Back to App Help</a>
      <div class="guide-brand">
        <img class="brand-icon" src="${escapeAttr(iconPath)}" alt="Llamaha icon">
        <div>
          <p id="guideKicker" class="section-kicker">App Help</p>
          <h1 id="guideTitle">${escapeHtml(vendor.title)}</h1>
          <p id="guideSummary">${escapeHtml(vendorSummary)}</p>
          <p class="guide-review-label" id="guideReviewLabel">${escapeHtml(defaultReviewLabel)}</p>
        </div>
      </div>
    </header>

    <main class="guide-layout">
      <div class="guide-main">
        ${renderJumpLinks(sections)}
        <div class="guide-main-scroll">
          <div id="guideContent" class="guide-content">
            ${sectionsHtml}
          </div>
        </div>
      </div>
    </main>
  </div>

  <script type="module" src="${escapeAttr(rootPath)}/siteChrome.js"></script>
</body>
</html>
`;
  return html;
}

// ---------------------------------------------------------------------------
// Driver
// ---------------------------------------------------------------------------
function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

let vendorCount = 0;
let appCount = 0;

for (const vendorSlug of vendorOrder) {
  const vendor = vendorGuides[vendorSlug];
  if (!vendor) continue;
  const apps = getVendorApplications(vendorSlug);

  // Vendor page
  const vendorHtml = buildVendorHtml(vendorSlug, vendor, apps);
  const vendorPath = join(guidesDir, `${vendorSlug}.html`);
  writeFileSync(vendorPath, vendorHtml, "utf8");
  vendorCount += 1;

  // App pages
  for (const app of apps) {
    const appHtml = buildAppHtml(vendorSlug, vendor, app, apps);
    const appPath = join(guidesDir, vendorSlug, `${app.slug}.html`);
    ensureDir(dirname(appPath));
    writeFileSync(appPath, appHtml, "utf8");
    appCount += 1;
  }
}

console.log(`Generated ${vendorCount} vendor pages and ${appCount} app guide pages.`);
