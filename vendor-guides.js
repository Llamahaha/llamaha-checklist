import { buildAppGuideUrl, getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getPublicGuideContent } from "./guides/publicGuideContent.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";

const topicGrid = document.getElementById("guideTopicGrid");
const popularAppGrid = document.getElementById("popularAppGrid");
const directoryVendorLinks = document.getElementById("directoryVendorLinks");
const appBrowseGrid = document.getElementById("appBrowseGrid");

function appGuide(vendorSlug, appSlug) {
  return buildAppGuideUrl(vendorSlug, appSlug);
}

function appSummary(vendorSlug, app) {
  const publicGuide = getPublicGuideContent(vendorSlug, app.slug);
  if (publicGuide.summary) {
    return publicGuide.summary;
  }

  if (app.summary) {
    return app.summary;
  }

  return `Open this guide when ${app.name} will not sign in, open the files you expect, update correctly, or behave normally for everyday work.`;
}

const featuredApps = [
  ["microsoft", "outlook"],
  ["microsoft", "teams"],
  ["microsoft", "onedrive"],
  ["adobe", "acrobat-pro"],
  ["bluebeam", "revu-21"],
  ["autodesk", "autocad"],
  ["autodesk", "revit"],
  ["autodesk", "civil-3d"],
  ["esri", "arcgis-pro"],
  ["bentley", "projectwise"]
];

const guideTopics = [
  {
    id: "sign-in-access",
    title: "Sign-in and access",
    description: "Use this when an app keeps asking you to sign in, opens the wrong account, or says you do not have access.",
    bestFor: [
      "Wrong account or company profile showing up",
      "Browser access works but the desktop app does not",
      "Sign-in loops, account mismatch, or access denied messages"
    ],
    links: [
      { label: "Microsoft app help", url: "microsoft-issues.html" },
      { label: "Outlook", url: appGuide("microsoft", "outlook") },
      { label: "Teams", url: appGuide("microsoft", "teams") },
      { label: "Egnyte Desktop App", url: appGuide("egnyte", "egnyte-desktop-app") }
    ]
  },
  {
    id: "install-update",
    title: "Install and update",
    description: "Start here when an app will not install, update, repair, or reopen correctly after an update.",
    bestFor: [
      "Setup did not finish correctly",
      "An update caused the app to stop opening or changed the workflow",
      "You need the right product page for reinstall or repair steps"
    ],
    links: [
      { label: "Application issues and fixes", url: "application-issues.html" },
      { label: "Autodesk Desktop App", url: appGuide("autodesk", "autodesk-desktop-app") },
      { label: "Creative Cloud Desktop", url: appGuide("adobe", "creative-cloud-desktop") },
      { label: "CONNECTION Client", url: appGuide("bentley", "connection-client") }
    ]
  },
  {
    id: "licensing-activation",
    title: "Licensing and activation",
    description: "Choose this when an app says trial, unlicensed, subscription required, or signed in but missing paid features.",
    bestFor: [
      "Activation or subscription warnings",
      "Features missing after sign-in",
      "Unclear which account should hold the license"
    ],
    links: [
      { label: "Licensing help", url: "app-licensing.html" },
      { label: "Microsoft 365", url: "guides/microsoft.html" },
      { label: "Adobe", url: "guides/adobe.html" },
      { label: "Autodesk", url: "guides/autodesk.html" }
    ]
  },
  {
    id: "file-opening",
    title: "File opening and app defaults",
    description: "Best when files open in the wrong app, will not open at all, or stop following the workflow you expect.",
    bestFor: [
      "PDFs or drawings open in the wrong application",
      "Double-click no longer opens the right product",
      "The app opens but the file workflow is still broken"
    ],
    links: [
      { label: "Application issues and fixes", url: "application-issues.html" },
      { label: "Acrobat Pro", url: appGuide("adobe", "acrobat-pro") },
      { label: "Revu 21", url: appGuide("bluebeam", "revu-21") },
      { label: "AutoCAD", url: appGuide("autodesk", "autocad") }
    ]
  },
  {
    id: "printing-pdf",
    title: "Printing and PDF issues",
    description: "Use this when printing fails, PDF tools are missing, or a document will not print, export, sign, or save the way it should.",
    bestFor: [
      "Printer queues or printer selection problems",
      "PDF editing, signing, or print-to-PDF issues",
      "QuickBooks, Acrobat, or Bluebeam print workflows failing"
    ],
    links: [
      { label: "Computer issues", url: "computer-issues.html" },
      { label: "Acrobat Pro", url: appGuide("adobe", "acrobat-pro") },
      { label: "Revu 21", url: appGuide("bluebeam", "revu-21") },
      { label: "QuickBooks Desktop", url: appGuide("quickbooks", "quickbooks-enterprise-desktop") }
    ]
  },
  {
    id: "sync-shared-files",
    title: "Sync, storage, and shared files",
    description: "Start here when synced folders disappear, shared files stop updating, or cloud and mapped-drive views do not match.",
    bestFor: [
      "OneDrive or SharePoint sync issues",
      "Egnyte or ProjectWise shared-file access problems",
      "Missing, stuck, or out-of-date shared content"
    ],
    links: [
      { label: "OneDrive", url: appGuide("microsoft", "onedrive") },
      { label: "SharePoint", url: appGuide("microsoft", "sharepoint") },
      { label: "Egnyte Desktop App", url: appGuide("egnyte", "egnyte-desktop-app") },
      { label: "ProjectWise", url: appGuide("bentley", "projectwise") }
    ]
  },
  {
    id: "performance-crashing",
    title: "Performance and crashing",
    description: "Use this when an app is slow, freezes, crashes on launch, or stops responding during normal work.",
    bestFor: [
      "App opens slowly or keeps closing",
      "Large files or projects cause instability",
      "You want the safest first checks before contacting support"
    ],
    links: [
      { label: "Application issues and fixes", url: "application-issues.html" },
      { label: "ArcGIS Pro", url: appGuide("esri", "arcgis-pro") },
      { label: "AutoCAD", url: appGuide("autodesk", "autocad") },
      { label: "Revit", url: appGuide("autodesk", "revit") }
    ]
  },
  {
    id: "email-collaboration",
    title: "Email, calendar, and collaboration",
    description: "Go here when Outlook, Teams, calendars, meetings, or shared collaboration pages are not syncing or opening correctly.",
    bestFor: [
      "Outlook mail or calendar problems",
      "Teams meetings, chat, or calling issues",
      "Shared collaboration pages or file links not opening"
    ],
    links: [
      { label: "Microsoft app help", url: "microsoft-issues.html" },
      { label: "Outlook", url: appGuide("microsoft", "outlook") },
      { label: "Teams", url: appGuide("microsoft", "teams") },
      { label: "SharePoint", url: appGuide("microsoft", "sharepoint") }
    ]
  },
  {
    id: "getting-started",
    title: "Getting started and basics",
    description: "Start here when you are setting up a new app, opening it for the first time, or trying to find the right guide quickly.",
    bestFor: [
      "First-time setup questions",
      "Choosing the right product guide",
      "Finding the best next step if you are not sure where to begin"
    ],
    links: [
      { label: "Search the help center", url: "search.html" },
      { label: "Microsoft 365", url: "guides/microsoft.html" },
      { label: "Autodesk", url: "guides/autodesk.html" },
      { label: "Contact", url: "contact.html" }
    ]
  }
];

const vendorStartHere = {
  microsoft: "Email, Teams, file sync, and Microsoft 365 account questions.",
  autodesk: "AutoCAD, Revit, Civil 3D, and Autodesk sign-in or version questions.",
  bentley: "ProjectWise, CONNECTION Client, and Bentley design app help.",
  esri: "ArcGIS Pro access, portal sign-in, and extension questions.",
  ptc: "Mathcad Prime setup, licensing, and worksheet access help.",
  trimble: "SketchUp and Trimble Business Center help for sign-in, setup, and shared content.",
  adobe: "Acrobat, Creative Cloud sign-in, and PDF workflow help.",
  bluebeam: "Bluebeam Revu access, Studio, and PDF markup workflow help.",
  foxit: "Foxit PDF reading, editing, and default-app help.",
  quickbooks: "QuickBooks Desktop or Online access, printing, and file workflow help.",
  egnyte: "Egnyte desktop and shared-folder access help."
};

function summarizeCoverage(vendor, apps) {
  const names = apps.slice(0, 4).map(app => app.name);
  if (!names.length) {
    return `${vendor.title} help pages.`;
  }

  return `${vendor.title} guides for ${names.join(", ")}${apps.length > 4 ? ", and more" : ""}.`;
}

if (topicGrid) {
  guideTopics.forEach(topic => {
    const card = createPageCard("help-topic-group");
    card.id = `topic-${topic.id}`;
    card.append(
      Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Topic" }),
      Object.assign(document.createElement("h3"), { textContent: topic.title }),
      Object.assign(document.createElement("p"), { textContent: topic.description })
    );

    const stack = document.createElement("div");
    stack.className = "card-stack";
    appendBlock(stack, "Start Here When", topic.bestFor);
    appendBlock(stack, "Helpful Guides", createLinks(topic.links));
    card.appendChild(stack);
    topicGrid.appendChild(card);
  });
}

featuredApps.forEach(([vendorSlug, appSlug]) => {
  const app = getVendorApplications(vendorSlug).find(item => item.slug === appSlug);
  const vendor = vendorGuides[vendorSlug];

  if (!app || !popularAppGrid || !vendor) {
    return;
  }

  const card = createPageCard("hub-card");
  card.id = `popular-app-${vendorSlug}-${appSlug}`;
  card.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: vendor.title }),
    Object.assign(document.createElement("h2"), { textContent: app.name }),
    Object.assign(document.createElement("p"), { textContent: appSummary(vendorSlug, app) })
  );

  const links = document.createElement("div");
  links.className = "vendor-links";

  const openGuide = document.createElement("a");
  openGuide.href = appGuide(vendorSlug, appSlug);
  openGuide.textContent = "Open guide";
  links.appendChild(openGuide);

  const vendorLink = document.createElement("a");
  vendorLink.href = `guides/${vendorSlug}.html`;
  vendorLink.textContent = `${vendor.title} overview`;
  links.appendChild(vendorLink);

  if (["outlook", "teams", "onedrive", "acrobat-pro", "revu-21", "autocad", "revit", "civil-3d", "arcgis-pro", "projectwise"].includes(appSlug)) {
    const licensingLink = document.createElement("a");
    licensingLink.href = "app-licensing.html";
    licensingLink.textContent = "Licensing help";
    links.appendChild(licensingLink);
  }

  card.appendChild(links);
  popularAppGrid.appendChild(card);
});

if (appBrowseGrid) {
  vendorOrder.forEach(vendorSlug => {
    const vendor = vendorGuides[vendorSlug];
    const apps = getVendorApplications(vendorSlug);

    if (!vendor || !apps.length) {
      return;
    }

    if (directoryVendorLinks) {
      const jump = document.createElement("a");
      jump.href = `#vendor-${vendorSlug}`;
      jump.textContent = vendor.title;
      directoryVendorLinks.appendChild(jump);
    }

    const group = createPageCard("help-app-group");
    group.id = `vendor-${vendorSlug}`;
    group.append(
      Object.assign(document.createElement("p"), { className: "section-kicker", textContent: vendor.title }),
      Object.assign(document.createElement("h3"), { textContent: summarizeCoverage(vendor, apps) }),
      Object.assign(document.createElement("p"), {
        textContent: vendorStartHere[vendorSlug] ?? vendor.summary
      })
    );

    const stack = document.createElement("div");
    stack.className = "card-stack";
    appendBlock(stack, "Good Starting Guides", apps.slice(0, 4).map(item => item.name));
    group.appendChild(stack);

    const links = document.createElement("nav");
    links.className = "vendor-links";

    const vendorLink = document.createElement("a");
    vendorLink.href = `guides/${vendorSlug}.html`;
    vendorLink.textContent = "Vendor overview";
    links.appendChild(vendorLink);

    apps.forEach(app => {
      const appLink = document.createElement("a");
      appLink.href = appGuide(vendorSlug, app.slug);
      appLink.id = `app-${vendorSlug}-${app.slug}`;
      appLink.textContent = app.name;
      links.appendChild(appLink);
    });

    group.appendChild(links);
    appBrowseGrid.appendChild(group);
  });
}
