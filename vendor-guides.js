import { buildAppGuideUrl, getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getPublicGuideContent } from "./guides/publicGuideContent.js";
import { appendBlock, createPageCard } from "./resourceCommon.js";

const popularAppGrid = document.getElementById("popularAppGrid");
const mobileHelpGrid = document.getElementById("mobileHelpGrid");
const browserHelpGrid = document.getElementById("browserHelpGrid");
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

function createActionLinks(items) {
  const links = document.createElement("div");
  links.className = "vendor-links";

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.label;
    if (item.external) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    links.appendChild(link);
  });

  return links;
}

function renderFeatureCard(container, config) {
  if (!container) {
    return;
  }

  const card = createPageCard("hub-card");
  if (config.id) {
    card.id = config.id;
  }

  card.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: config.kicker }),
    Object.assign(document.createElement("h2"), { textContent: config.title }),
    Object.assign(document.createElement("p"), { textContent: config.description }),
    createActionLinks(config.links)
  );

  container.appendChild(card);
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

const mobileHelpApps = [
  ["microsoft", "outlook-mobile"],
  ["microsoft", "teams-mobile"],
  ["microsoft", "microsoft-authenticator"]
];

const browserHelpApps = [
  ["browsers", "google-chrome"],
  ["browsers", "microsoft-edge"],
  ["browsers", "mozilla-firefox"],
  ["browsers", "apple-safari"]
];

const vendorStartHere = {
  microsoft: "Email, Teams, OneDrive, mobile setup, and Microsoft 365 account questions.",
  browsers: "Chrome, Edge, Firefox, and Safari support for sign-in pages, downloads, and everyday web use.",
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

featuredApps.forEach(([vendorSlug, appSlug]) => {
  const app = getVendorApplications(vendorSlug).find(item => item.slug === appSlug);
  const vendor = vendorGuides[vendorSlug];

  if (!app || !vendor) {
    return;
  }

  renderFeatureCard(popularAppGrid, {
    id: `popular-app-${vendorSlug}-${appSlug}`,
    kicker: vendor.title,
    title: app.name,
    description: appSummary(vendorSlug, app),
    links: [
      { label: "Open guide", url: appGuide(vendorSlug, appSlug) },
      { label: `${vendor.title} overview`, url: `guides/${vendorSlug}.html` },
      { label: "Licensing help", url: "app-licensing.html" }
    ]
  });
});

mobileHelpApps.forEach(([vendorSlug, appSlug]) => {
  const app = getVendorApplications(vendorSlug).find(item => item.slug === appSlug);
  if (!app) {
    return;
  }

  renderFeatureCard(mobileHelpGrid, {
    id: `mobile-${vendorSlug}-${appSlug}`,
    kicker: "Mobile Setup",
    title: app.name,
    description: appSummary(vendorSlug, app),
    links: [
      { label: "Open guide", url: appGuide(vendorSlug, appSlug) },
      { label: "Microsoft 365 overview", url: "guides/microsoft.html" },
      { label: "Contact support", url: "contact.html" }
    ]
  });
});

browserHelpApps.forEach(([vendorSlug, appSlug]) => {
  const app = getVendorApplications(vendorSlug).find(item => item.slug === appSlug);
  if (!app) {
    return;
  }

  renderFeatureCard(browserHelpGrid, {
    id: `browser-${vendorSlug}-${appSlug}`,
    kicker: "Browser Support",
    title: app.name,
    description: appSummary(vendorSlug, app),
    links: [
      { label: "Open guide", url: appGuide(vendorSlug, appSlug) },
      { label: "Browser overview", url: "guides/browsers.html" },
      { label: "Search the help center", url: "search.html" }
    ]
  });
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
    appendBlock(stack, "Good Starting Guides", apps.slice(0, 5).map(item => item.name));
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
