import { buildAppGuideUrl, getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";

const topicGrid = document.getElementById("guideTopicGrid");
const grid = document.getElementById("vendorGuideGrid");

function appGuide(vendorSlug, appSlug) {
  return buildAppGuideUrl(vendorSlug, appSlug);
}

const guideTopics = [
  {
    title: "Sign-in and access",
    description: "Start here when an app keeps asking you to sign in, opens the wrong account, or says you do not have access.",
    bestFor: [
      "Wrong account or tenant showing up",
      "Browser works but the desktop app does not",
      "Sign-in loops or access denied messages"
    ],
    links: [
      { label: "Microsoft app help", url: "microsoft-issues.html" },
      { label: "Outlook", url: appGuide("microsoft", "outlook") },
      { label: "Teams", url: appGuide("microsoft", "teams") },
      { label: "Egnyte Desktop App", url: appGuide("egnyte", "egnyte-desktop-app") }
    ]
  },
  {
    title: "Install and update",
    description: "Use this when an app will not install, update, repair, or reopen correctly after an update.",
    bestFor: [
      "Setup did not finish correctly",
      "An update caused the app to stop working",
      "You need the approved installer or updater path"
    ],
    links: [
      { label: "Application issues and fixes", url: "application-issues.html" },
      { label: "Autodesk Desktop App", url: appGuide("autodesk", "autodesk-desktop-app") },
      { label: "Creative Cloud Desktop", url: appGuide("adobe", "creative-cloud-desktop") },
      { label: "CONNECTION Client", url: appGuide("bentley", "connection-client") }
    ]
  },
  {
    title: "Opening files and file associations",
    description: "Best when files open in the wrong app, will not open at all, or lose the expected workflow after an install or update.",
    bestFor: [
      "PDFs or drawings open in the wrong app",
      "Double-click no longer opens the file you expect",
      "The app opens but the file workflow is broken"
    ],
    links: [
      { label: "Application issues and fixes", url: "application-issues.html" },
      { label: "Acrobat Pro", url: appGuide("adobe", "acrobat-pro") },
      { label: "Revu 21", url: appGuide("bluebeam", "revu-21") },
      { label: "AutoCAD", url: appGuide("autodesk", "autocad") }
    ]
  },
  {
    title: "Printing and PDF issues",
    description: "Use this when printing fails, PDF tools are missing, or documents stop opening, editing, or signing the way you expect.",
    bestFor: [
      "Printer queues or drivers acting up",
      "PDF editing or signing not available",
      "Print to PDF or export workflows failing"
    ],
    links: [
      { label: "Computer issues", url: "computer-issues.html" },
      { label: "Acrobat Pro", url: appGuide("adobe", "acrobat-pro") },
      { label: "Revu 21", url: appGuide("bluebeam", "revu-21") },
      { label: "QuickBooks Desktop", url: appGuide("quickbooks", "quickbooks-enterprise-desktop") }
    ]
  },
  {
    title: "Licensing and activation",
    description: "Start here when an app says trial, unlicensed, subscription required, or features are missing after sign-in.",
    bestFor: [
      "Activation or subscription warnings",
      "Missing paid features after sign-in",
      "Unsure which account should hold the license"
    ],
    links: [
      { label: "Licensing help", url: "app-licensing.html" },
      { label: "Microsoft 365", url: "guides/microsoft.html" },
      { label: "Adobe", url: "guides/adobe.html" },
      { label: "Autodesk", url: "guides/autodesk.html" }
    ]
  },
  {
    title: "Sync, storage, and shared files",
    description: "Use this when files stop syncing, shared folders disappear, or cloud and mapped-drive workflows stop matching what you expect.",
    bestFor: [
      "OneDrive or SharePoint sync issues",
      "Egnyte or ProjectWise file access problems",
      "Shared files missing, stuck, or out of date"
    ],
    links: [
      { label: "OneDrive", url: appGuide("microsoft", "onedrive") },
      { label: "SharePoint", url: appGuide("microsoft", "sharepoint") },
      { label: "Egnyte Desktop App", url: appGuide("egnyte", "egnyte-desktop-app") },
      { label: "ProjectWise", url: appGuide("bentley", "projectwise") }
    ]
  },
  {
    title: "Performance and crashing",
    description: "Start here when the app is slow, freezes, crashes on launch, or stops responding during normal work.",
    bestFor: [
      "App opens slowly or keeps closing",
      "Large files or projects cause instability",
      "You need the quickest first checks before contacting support"
    ],
    links: [
      { label: "Application issues and fixes", url: "application-issues.html" },
      { label: "ArcGIS Pro", url: appGuide("esri", "arcgis-pro") },
      { label: "AutoCAD", url: appGuide("autodesk", "autocad") },
      { label: "QuickBooks Desktop", url: appGuide("quickbooks", "quickbooks-enterprise-desktop") }
    ]
  },
  {
    title: "Email, calendar, and collaboration",
    description: "Use this when mail, calendars, Teams, or shared collaboration tools are not syncing or opening the way they should.",
    bestFor: [
      "Outlook mail or calendar problems",
      "Teams meetings, chat, or devices not working",
      "Shared collaboration pages or file links failing"
    ],
    links: [
      { label: "Microsoft app help", url: "microsoft-issues.html" },
      { label: "Outlook", url: appGuide("microsoft", "outlook") },
      { label: "Teams", url: appGuide("microsoft", "teams") },
      { label: "SharePoint", url: appGuide("microsoft", "sharepoint") }
    ]
  },
  {
    title: "Getting started and setup",
    description: "Best when you are setting up a new app, learning where to begin, or trying to choose the right product page for the first time.",
    bestFor: [
      "First-time setup questions",
      "Choosing the right app guide",
      "Finding the right vendor page for your product"
    ],
    links: [
      { label: "Applications", url: "applications.html" },
      { label: "Microsoft 365", url: "guides/microsoft.html" },
      { label: "Autodesk", url: "guides/autodesk.html" },
      { label: "Contact", url: "contact.html" }
    ]
  }
];

const vendorStartHere = {
  microsoft: [
    "Email, Teams, file-sync, or Microsoft account questions",
    "Microsoft 365 setup or feature access",
    "Choosing between Outlook, Teams, OneDrive, or SharePoint help"
  ],
  autodesk: [
    "Autodesk sign-in, product access, or update questions",
    "Version or release-year mismatches",
    "Choosing the right CAD or BIM product guide"
  ],
  bentley: [
    "ProjectWise or Bentley sign-in questions",
    "Datasource, workspace, or project access",
    "Choosing the right Bentley product guide"
  ],
  esri: [
    "ArcGIS sign-in or portal questions",
    "Missing extensions or maps",
    "Choosing between ArcGIS Online and ArcGIS Pro"
  ],
  ptc: [
    "Mathcad licensing or setup questions",
    "Worksheet or shared file access",
    "Version questions before reinstalling"
  ],
  trimble: [
    "SketchUp or TBC access questions",
    "Missing extensions, shared files, or modules",
    "Choosing the right Trimble product guide"
  ],
  adobe: [
    "Adobe sign-in or profile selection",
    "Acrobat or Creative Cloud activation",
    "PDF workflow setup"
  ],
  bluebeam: [
    "Bluebeam sign-in or subscription questions",
    "Studio access or profile issues",
    "Revu 21 setup and activation"
  ],
  foxit: [
    "Foxit activation or edition questions",
    "PDF editing and default-app issues",
    "Reader versus Editor setup"
  ],
  quickbooks: [
    "QuickBooks Desktop or Online access",
    "Company-file, update, or print issues",
    "Choosing the right QuickBooks product guide"
  ],
  egnyte: [
    "Egnyte sign-in or shared-folder access",
    "Desktop app and drive-mapping issues",
    "Choosing between web and desktop help"
  ]
};

function summarizeCoverage(vendor, apps) {
  const names = apps.slice(0, 4).map(app => app.name);
  if (!names.length) {
    return vendor.summary;
  }

  return `${vendor.title} help pages for ${names.join(", ")}${apps.length > 4 ? ", and more" : ""}.`;
}

if (topicGrid) {
  guideTopics.forEach(topic => {
    const card = createPageCard("hub-card");
    card.append(
      Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Help Topic" }),
      Object.assign(document.createElement("h2"), { textContent: topic.title }),
      Object.assign(document.createElement("p"), { textContent: topic.description })
    );

    const stack = document.createElement("div");
    stack.className = "card-stack";
    appendBlock(stack, "Best For", topic.bestFor);
    card.append(stack, createLinks(topic.links));
    topicGrid.appendChild(card);
  });
}

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
  kicker.textContent = "Vendor Help";

  const title = document.createElement("h3");
  title.textContent = vendor.title;

  const description = document.createElement("p");
  description.textContent = summarizeCoverage(vendor, apps);

  summaryCopy.append(kicker, title, description);

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${apps.length} apps`;

  summary.append(summaryCopy, meta);

  const content = document.createElement("div");
  content.className = "accordion-content";

  const overview = document.createElement("p");
  overview.className = "hub-section-copy";
  overview.textContent = vendor.overview;

  const stack = document.createElement("div");
  stack.className = "card-stack";
  appendBlock(stack, "Good Starting Points", vendorStartHere[vendorSlug] ?? [
    `${vendor.title} sign-in and access questions`,
    `${vendor.title} setup and activation issues`,
    `Choosing the right ${vendor.title} product guide`
  ]);
  appendBlock(stack, "Main Applications", apps.slice(0, 6).map(app => app.name));

  const links = createLinks([
    { label: "Open vendor page", url: `guides/${vendorSlug}.html` },
    { label: "Licensing help", url: `app-licensing.html#${vendorSlug}-licensing` },
    ...apps.slice(0, 3).map(app => ({ label: app.name, url: appGuide(vendorSlug, app.slug) })),
    ...(vendor.supportLinks?.[0]
      ? [{ label: vendor.supportLinks[0].label, url: vendor.supportLinks[0].url, external: true }]
      : [])
  ]);

  content.append(overview, stack, links);
  card.append(summary, content);
  grid.appendChild(card);
});
