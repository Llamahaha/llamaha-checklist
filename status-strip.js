const statusDashboards = [
  {
    name: "Autodesk",
    url: "https://health.autodesk.com/",
    note: "ACC, BIM 360, Revit Cloud Worksharing, licensing, Autodesk account, and Innovyze water apps"
  },
  {
    name: "Bentley",
    url: "https://status.bentley.com/",
    note: "CONNECTION Client, ProjectWise cloud services, IMS login, and Bentley licensing"
  },
  {
    name: "Bluebeam",
    url: "https://status.bluebeam.com/",
    note: "Studio Projects, Studio Sessions, Bluebeam ID, licensing, and web services"
  },
  {
    name: "Esri",
    url: "https://status.arcgis.com/",
    note: "ArcGIS Online, identity, hosted services, content, and sharing"
  },
  {
    name: "Trimble Connect",
    url: "https://status.connect.trimble.com/",
    note: "Trimble Connect projects, sync, sign-in, and shared model access"
  },
  {
    name: "Microsoft 365",
    url: "https://status.cloud.microsoft/",
    note: "Teams, Exchange Online, SharePoint, OneDrive, sign-in, and Office services"
  },
  {
    name: "Adobe",
    url: "https://status.adobe.com/",
    note: "Creative Cloud, Acrobat sign-in, Acrobat Sign, and Adobe entitlements"
  },
  {
    name: "Citrix Cloud",
    url: "https://status.cloud.com/",
    note: "Citrix Workspace sign-in, Cloud Connectors, gateway, and DaaS services"
  },
  {
    name: "DocuSign",
    url: "https://status.docusign.com/",
    note: "DocuSign envelopes, signing, sending, and account sign-in"
  },
  {
    name: "Zoom",
    url: "https://status.zoom.us/",
    note: "Zoom meetings, webinars, phone, chat, and sign-in"
  },
  {
    name: "Cisco Webex",
    url: "https://status.webex.com/",
    note: "Webex meetings, calling, messaging, and sign-in"
  },
  {
    name: "Box",
    url: "https://status.box.com/",
    note: "Box Drive, web app, sync, sharing, and sign-in"
  },
  {
    name: "Dropbox",
    url: "https://status.dropbox.com/",
    note: "Dropbox desktop sync, web app, sharing, and sign-in"
  },
  {
    name: "Egnyte",
    url: "https://status.egnyte.com/",
    note: "Egnyte Desktop App, Web UI, sync, and sign-in"
  },
  {
    name: "Duo Security",
    url: "https://status.duo.com/",
    note: "Duo Push, MFA prompts, Duo SSO, and admin console"
  },
  {
    name: "Okta",
    url: "https://status.okta.com/",
    note: "Okta sign-in, Okta Verify, SSO, and MFA flows"
  },
  {
    name: "Deltek",
    url: "https://trust.deltek.com/",
    note: "Vantagepoint, Vision, project ERP cloud services, and Deltek sign-in"
  },
  {
    name: "Intuit (QuickBooks)",
    url: "https://status.quickbooks.intuit.com/",
    note: "QuickBooks Online, QuickBooks Time, payroll sync, and Intuit account sign-in"
  },
  {
    name: "TIBCO Spotfire",
    url: "https://status.cloud.tibco.com/",
    note: "Spotfire web client, library, identity, and TIBCO Cloud services"
  }
];

const strip = document.querySelector("[data-status-strip]");
const panel = document.getElementById("vendorStatusPanel");
const list = document.getElementById("vendorStatusList");
const button = document.getElementById("statusCheckBtn");
const title = document.getElementById("vendorStatusTitle");
const summary = document.getElementById("vendorStatusSummary");
const timestamp = document.getElementById("vendorStatusTimestamp");

let hasRendered = false;

function renderDashboards() {
  if (!list || hasRendered) return;

  const fragment = document.createDocumentFragment();

  for (const dashboard of statusDashboards) {
    const link = document.createElement("a");
    link.className = "status-card";
    link.href = dashboard.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open ${dashboard.name} official status dashboard`);

    const name = document.createElement("strong");
    name.textContent = dashboard.name;

    const note = document.createElement("span");
    note.textContent = dashboard.note;

    const action = document.createElement("small");
    action.textContent = "Open live dashboard";

    link.append(name, note, action);
    fragment.appendChild(link);
  }

  list.appendChild(fragment);
  hasRendered = true;
}

function formatCheckTime() {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date());
}

function showStatusPanel() {
  if (!strip || !panel || !button || !title || !summary || !timestamp) return;

  renderDashboards();
  panel.hidden = false;
  strip.dataset.statusState = "open";
  title.textContent = "Official Status Dashboards";
  summary.textContent = "Open a vendor card to see the current service health reported by that vendor.";
  timestamp.textContent = `Prepared ${formatCheckTime()}`;
  button.textContent = "Hide Status";
  button.setAttribute("aria-expanded", "true");
}

function hideStatusPanel() {
  if (!strip || !panel || !button || !title || !summary) return;

  panel.hidden = true;
  strip.dataset.statusState = "unchecked";
  title.textContent = "Check Vendor Status";
  summary.textContent = "Open the live vendor dashboards for the apps we support to see if a current issue is on the vendor side.";
  button.textContent = "Check Status";
  button.setAttribute("aria-expanded", "false");
}

button?.addEventListener("click", () => {
  if (panel?.hidden) {
    showStatusPanel();
  } else {
    hideStatusPanel();
  }
});

for (const link of document.querySelectorAll('a[href="#vendor-status"]')) {
  link.addEventListener("click", () => {
    window.requestAnimationFrame(showStatusPanel);
  });
}
