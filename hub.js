import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides } from "./guides/guideData.js";
import { handoffTemplates, snippetLibrary } from "./resourceLibrary.js";

const mostUsedGrid = document.getElementById("mostUsedGrid");
const recentGrid = document.getElementById("recentGrid");

const mostUsed = [
  { title: "Vendor Guides", text: "Start with shared vendor notes and drill into dedicated app guides.", url: "vendor-guides.html" },
  { title: "QuickBooks Enterprise Desktop", text: "Company file, hosting, print, and Tool Hub guidance.", url: "guides/quickbooks/quickbooks-enterprise-desktop.html" },
  { title: "Outlook", text: "Mailbox, profile, shared mailbox, and add-in troubleshooting.", url: "guides/microsoft/outlook.html" },
  { title: "ProjectWise", text: "Datasource, work area, and checked-out file support notes.", url: "guides/bentley/projectwise.html" },
  { title: "Template Library", text: "Copy-ready customer and internal communication templates for handoffs, approvals, outages, and closure.", url: "templates.html" }
];

const recent = [
  { title: "Microsoft 365 guide set", text: vendorGuides.microsoft.summary, url: "guides/microsoft.html" },
  { title: "Snippet Library", text: `${snippetLibrary.length} grouped categories with MSP-ready commands and cautions.`, url: "snippets.html" },
  { title: "Template Library", text: `${handoffTemplates.length} copy-ready templates grouped by use case and audience.`, url: "templates.html" },
  { title: "Emergency Playbooks", text: "First-response procedures for compromise, ransomware, lost devices, MFA lockouts, and more.", url: "emergency-playbooks.html" },
  { title: "Autodesk guide set", text: getVendorApplications("autodesk").slice(0, 4).map(item => item.name).join(", "), url: "guides/autodesk.html" }
];

function renderCards(target, items) {
  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "hub-card";
    const kicker = document.createElement("p");
    kicker.className = "section-kicker";
    kicker.textContent = "Hub Highlight";
    const title = document.createElement("h2");
    title.textContent = item.title;
    const text = document.createElement("p");
    text.textContent = item.text;
    const link = document.createElement("a");
    link.className = "hub-link";
    link.href = item.url;
    link.textContent = "Open";
    card.append(kicker, title, text, link);
    target.appendChild(card);
  });
}

renderCards(mostUsedGrid, mostUsed);
renderCards(recentGrid, recent);
