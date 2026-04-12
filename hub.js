import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { applicationCatalog } from "./guides/applicationCatalog.js";

const vendorDirectory = document.getElementById("vendorDirectory");
const m365LaneGrid = document.getElementById("m365LaneGrid");
const microsoftIssuesGrid = document.getElementById("microsoftIssuesGrid");
const computerIssuesGrid = document.getElementById("computerIssuesGrid");

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

const microsoftIssues = [
  {
    title: "Word / Excel",
    text: "Most Office desktop issues end up being one of a few patterns: account sign-in drift, bad add-ins, broken templates, or files opening from untrusted locations.",
    fixes: [
      "Confirm Office is activated under the correct work account and not a stale personal Microsoft identity.",
      "Test the app in safe mode or disable COM add-ins when Word or Excel crashes on launch.",
      "Check Protected View, default save locations, and whether the file came from email, Teams, or a blocked network path.",
      "Repair Microsoft 365 Apps if multiple Office apps are failing the same way."
    ]
  },
  {
    title: "Teams",
    text: "Teams issues are often a mix of identity, cache, device selection, and missing group or channel membership rather than a pure app failure.",
    fixes: [
      "Check whether the user is signing into the correct tenant and has the right Teams and channel membership.",
      "Clear the Teams cache or restart the app after recent license or membership changes.",
      "Verify headset, mic, camera, and default communications device selection before troubleshooting calls deeper.",
      "Confirm the user's Microsoft license and Teams service plans are actually enabled."
    ]
  },
  {
    title: "OneDrive",
    text: "Sync issues usually come from account mismatches, path or filename conflicts, low local disk space, or known-folder-move confusion.",
    fixes: [
      "Confirm the user is signed into the correct work account and the expected OneDrive tenant.",
      "Check for path-length, invalid-character, or filename-conflict issues on the files that refuse to sync.",
      "Review available disk space and whether Files On-Demand or offline pinning is behaving the way the client expects.",
      "Pause and resume sync or reconnect the account if the sync engine is stuck after password or MFA changes."
    ]
  },
  {
    title: "SharePoint",
    text: "SharePoint tickets usually come down to missing site permissions, stale group membership, broken sync libraries, or link targeting confusion.",
    fixes: [
      "Verify the user has access to the correct site, library, and M365 group instead of assuming parent-site access is enough.",
      "Test the file or library in the browser first before blaming the OneDrive sync client.",
      "Check whether the shared link points to the right tenant, site, or guest-access flow.",
      "Resync the library only after permissions and path issues have been ruled out."
    ]
  },
  {
    title: "MFA / Authenticator",
    text: "Most MFA support tickets happen during phone replacement, app reset, number matching confusion, or a user getting stuck between old and new methods.",
    fixes: [
      "Check whether the user still has access to their registered Authenticator app, phone number, or backup method before resetting anything.",
      "Reset or re-register MFA only after confirming the issue is not a simple time drift, notification block, or wrong account in Authenticator.",
      "Review number matching or approval prompts carefully so users are not approving the wrong sign-in.",
      "Document the recovery path used so future phone cutovers are easier."
    ]
  }
];

const computerIssues = [
  {
    title: "Shared Drives",
    text: "Mapped-drive issues are often permission, DNS, VPN, or stale credential problems rather than a true file-server outage.",
    fixes: [
      "Check whether the user can reach the file server by name and by the expected network path.",
      "Verify the user still belongs to the right AD group or file-share permission set.",
      "Remove stale mapped drives or cached credentials if the path keeps reconnecting with the wrong identity.",
      "Confirm the user is on VPN or the expected internal network before deeper share troubleshooting."
    ]
  },
  {
    title: "Printers",
    text: "Printer problems are commonly driver mismatch, spooler issues, changed IPs, or a printer still bound to an old print server mapping.",
    fixes: [
      "Confirm the printer is online, reachable, and still using the expected IP, queue, or print server.",
      "Restart the print spooler and clear stuck jobs if every print remains queued.",
      "Reinstall or update the printer with the approved driver when only one workstation is failing.",
      "Check default-printer selection and whether the user is printing to an old redirected or offline device."
    ]
  },
  {
    title: "VPN / Network",
    text: "VPN tickets often turn out to be profile, DNS, MFA, or local network conflicts rather than the tunnel software itself.",
    fixes: [
      "Validate internet access first, then test whether the user can resolve the VPN portal or internal resources after connecting.",
      "Check saved VPN profiles, MFA prompts, certificates, and whether the user's VPN entitlement is still active.",
      "Review DNS resolution and split-tunnel expectations if the VPN connects but shared drives or apps still fail.",
      "Compare the failing workstation against a known-good user or device before changing the global VPN setup."
    ]
  },
  {
    title: "Disk Space",
    text: "Low-space problems usually hide in user profiles, offline cloud files, temp data, or oversized downloads rather than Windows itself.",
    fixes: [
      "Check the biggest local folders first, especially Downloads, Desktop, local profile caches, and cloud-sync offline content.",
      "Look for OneDrive, Egnyte, Outlook, or application caches pinning too much local data.",
      "Run the approved cleanup path before deleting anything that might still be needed for retention or sync recovery.",
      "Verify the application that is failing actually needs local free space for updates, temp files, or file conversion."
    ]
  },
  {
    title: "Windows Login / Profile",
    text: "Login failures are often profile corruption, expired credentials, time drift, cached credentials, or domain/tenant trust issues.",
    fixes: [
      "Confirm the user is entering the right account context and is not stuck between local, domain, and Microsoft sign-in options.",
      "Check system time, password expiry, account lockout, and network reachability to the identity source.",
      "Test with another user profile or a fresh profile path if the workstation signs in for others but not the affected user.",
      "Review event logs and profile status before wiping the machine just because the first login failed."
    ]
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

function renderIssueCards(container, items) {
  if (!container) {
    return;
  }

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "issue-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    const list = document.createElement("ul");
    item.fixes.forEach(fix => {
      const li = document.createElement("li");
      li.textContent = fix;
      list.appendChild(li);
    });

    card.append(title, text, list);
    container.appendChild(card);
  });
}

renderVendorDirectory();
renderM365Lanes();
renderIssueCards(microsoftIssuesGrid, microsoftIssues);
renderIssueCards(computerIssuesGrid, computerIssues);
