import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { applicationCatalog } from "./guides/applicationCatalog.js";

const vendorDirectory = document.getElementById("vendorDirectory");
const m365LaneGrid = document.getElementById("m365LaneGrid");

const m365Lanes = [
  {
    title: "Mail, Files, and Storage",
    text: "Use the live matrix to compare the rows that change mailbox size, archive rights, and file-storage expectations between plans.",
    rows: ["Exchange Online", "Exchange Online Archiving", "OneDrive for Business", "SharePoint Online"]
  },
  {
    title: "Desktop Apps and Productivity",
    text: "This is the fastest way to confirm whether a user gets locally installed Office apps or only web and mobile access.",
    rows: ["Microsoft 365 Apps", "Office for the Web", "Microsoft Lists", "Forms", "Planner", "Visio for the Web"]
  },
  {
    title: "Identity and Access",
    text: "These rows matter when you are deciding whether a plan supports conditional access, identity protection, or more advanced Entra workflows.",
    rows: ["Entra ID Plan 1", "Entra ID Plan 2", "Conditional Access", "Access Reviews", "Privileged Identity Management"]
  },
  {
    title: "Security and Compliance",
    text: "Use these rows when clients ask what they gain by moving from Business to enterprise security or from E3 to E5 style bundles.",
    rows: ["Audit (standard)", "Audit (premium)", "Data Loss Prevention", "eDiscovery (standard)", "eDiscovery (premium)", "Defender for Office 365 Plan 1/2", "Defender for Identity"]
  },
  {
    title: "Voice and Collaboration",
    text: "Helpful when you need to confirm which plans support deeper Teams meeting, calling, or event capabilities.",
    rows: ["Teams Phone", "Audio Conferencing", "Teams Town Halls", "Teams Webinars", "Teams Data Loss Prevention"]
  }
];

function makeLink(label, href) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  return link;
}

function renderVendorDirectory() {
  if (!vendorDirectory) {
    return;
  }

  vendorOrder.forEach(key => {
    const guide = vendorGuides[key];
    const apps = applicationCatalog[key] ?? [];
    const card = document.createElement("article");
    card.className = "vendor-card";

    const header = document.createElement("div");
    header.className = "vendor-card-header";

    const titleBlock = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = guide.title;

    const summary = document.createElement("p");
    summary.textContent = guide.summary;

    titleBlock.append(title, summary);

    const count = document.createElement("span");
    count.className = "vendor-count";
    count.textContent = `${apps.length || guide.products.length} focus areas`;

    header.append(titleBlock, count);

    const chipRow = document.createElement("div");
    chipRow.className = "vendor-chip-row";

    const sampleApps = (apps.length ? apps.map(item => item.name) : guide.products).slice(0, 6);
    sampleApps.forEach(name => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = name;
      chipRow.appendChild(chip);
    });

    if ((apps.length ? apps.length : guide.products.length) > sampleApps.length) {
      const moreChip = document.createElement("span");
      moreChip.className = "chip";
      moreChip.textContent = `+${(apps.length ? apps.length : guide.products.length) - sampleApps.length} more`;
      chipRow.appendChild(moreChip);
    }

    const links = document.createElement("nav");
    links.className = "vendor-links";

    [
      { label: "Guide", href: `guides/${key}.html` },
      { label: "Applications", href: `guides/${key}.html#application-catalog` },
      { label: "Licensing", href: `guides/${key}.html#licensing` },
      { label: "Install", href: `guides/${key}.html#installation` },
      { label: "Uninstall", href: `guides/${key}.html#uninstallation` },
      { label: "FAQ / Fixes", href: `guides/${key}.html#faq` },
      { label: "Common Errors", href: `guides/${key}.html#common-fixes` }
    ].forEach(item => links.appendChild(makeLink(item.label, item.href)));

    card.append(header, chipRow, links);
    vendorDirectory.appendChild(card);
  });
}

function renderM365Lanes() {
  if (!m365LaneGrid) {
    return;
  }

  m365Lanes.forEach(lane => {
    const card = document.createElement("article");
    card.className = "m365-card";

    const title = document.createElement("h3");
    title.textContent = lane.title;

    const text = document.createElement("p");
    text.textContent = lane.text;

    const rowList = document.createElement("div");
    rowList.className = "vendor-chip-row";

    lane.rows.forEach(row => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = row;
      rowList.appendChild(chip);
    });

    card.append(title, text, rowList);
    m365LaneGrid.appendChild(card);
  });
}

renderVendorDirectory();
renderM365Lanes();
