import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

const vendorGrid = document.getElementById("vendorGrid");
const popularAppGrid = document.getElementById("popularAppGrid");
const helpTopicGrid = document.getElementById("helpTopicGrid");

const popularApps = [
  { vendor: "microsoft", app: "outlook", text: "Mailbox access, profile issues, shared mailboxes, and send or receive problems." },
  { vendor: "microsoft", app: "teams", text: "Sign-in, meetings, devices, missing channels, and common desktop app issues." },
  { vendor: "microsoft", app: "onedrive", text: "Sync, missing folders, duplicate roots, and Files On-Demand questions." },
  { vendor: "autodesk", app: "autocad", text: "Setup, sign-in, missing support content, plotting, and common startup issues." },
  { vendor: "bentley", app: "projectwise", text: "Datasource access, missing project trees, check-in or check-out issues, and work area questions." },
  { vendor: "quickbooks", app: "quickbooks-enterprise-desktop", text: "Company file access, hosting mode, print issues, and desktop troubleshooting." }
];

const helpTopics = [
  { title: "Microsoft help topics", text: "Common problems with Outlook, Teams, OneDrive, SharePoint, MFA, and Office activation.", url: "microsoft-issues.html" },
  { title: "Software issues", text: "Shared troubleshooting patterns across common business, CAD, PDF, and file-management apps.", url: "application-issues.html" },
  { title: "Computer issues", text: "Printer problems, mapped drives, VPN issues, performance, low disk space, and sign-in problems.", url: "computer-issues.html" },
  { title: "Vendor guides", text: "Browse help by vendor when you know the product family but not the exact app article yet.", url: "vendor-guides.html" },
  { title: "Applications directory", text: "See every supported application in one place and jump directly into the right help article.", url: "applications.html" },
  { title: "Contact support", text: "Get the right contact path if the self-service steps do not solve the problem.", url: "contact.html" }
];

function renderCard(target, title, text, url, kicker = "Help Center") {
  const card = document.createElement("article");
  card.className = "hub-card";

  const cardKicker = document.createElement("p");
  cardKicker.className = "section-kicker";
  cardKicker.textContent = kicker;

  const heading = document.createElement("h2");
  heading.textContent = title;

  const copy = document.createElement("p");
  copy.textContent = text;

  const link = document.createElement("a");
  link.className = "hub-link";
  link.href = url;
  link.textContent = "Open";

  card.append(cardKicker, heading, copy, link);
  target.appendChild(card);
}

vendorOrder.slice(0, 6).forEach(vendorSlug => {
  const vendor = vendorGuides[vendorSlug];
  renderCard(
    vendorGrid,
    vendor.title,
    `Browse ${vendor.title} app help for setup, sign-in, access, updates, and common problems.`,
    `guides/${vendorSlug}.html`,
    "Vendor Guide"
  );
});

popularApps.forEach(item => {
  const app = getVendorApplications(item.vendor).find(entry => entry.slug === item.app);
  if (!app) return;
  renderCard(
    popularAppGrid,
    app.name,
    item.text,
    `guides/${item.vendor}/${item.app}.html`,
    vendorGuides[item.vendor]?.title ?? "Application"
  );
});

helpTopics.forEach(item => {
  renderCard(helpTopicGrid, item.title, item.text, item.url, "Help Topic");
});
