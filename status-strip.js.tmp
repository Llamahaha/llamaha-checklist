const statusDashboards = [
  {
    name: "Autodesk",
    url: "https://health.autodesk.com/",
    note: "ACC, BIM 360, Revit Cloud Worksharing, licensing, and Autodesk account"
  },
  {
    name: "Bentley",
    url: "https://status.bentley.com/",
    note: "CONNECTION Client, cloud services, IMS login, and Bentley licensing"
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
    name: "Microsoft 365",
    url: "https://status.cloud.microsoft/",
    note: "Teams, Exchange Online, SharePoint, OneDrive, sign-in, and Office services"
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
  summary.textContent = "Use the live vendor dashboards for Autodesk, Bentley, Bluebeam, Esri, and Microsoft 365.";
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
