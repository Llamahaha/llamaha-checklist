// Llamaha — Supported App News data
// ----------------------------------------------------------------------------
// Each entry describes a recent outage, security advisory, service impact,
// product change, deprecation, or vendor announcement that affects an app
// commonly supported by the Llamaha team.
//
// Schema (per item):
//   id                  — stable string ID (kebab/iso style is fine)
//   appName             — product name shown in the badge ("Exchange Online")
//   vendor              — vendor name shown in the badge ("Microsoft")
//   category            — one of: "Outage" | "Security" | "Service Impact"
//                          | "Product Change" | "Deprecation" | "Advisory"
//   severity            — one of: "Critical" | "High" | "Medium" | "Low" | "Info"
//   title               — short headline (avoid trailing punctuation)
//   summary             — 1–2 sentence plain-English summary
//   affectedUsers       — who is affected, in plain English
//   recommendedMspAction — what an MSP/IT admin should do, in plain English
//   sourceUrls          — array of source links (vendor advisory, status page,
//                          NVD entry, etc.). Always include at least one.
//   publishedDate       — ISO date the story was first noted ("2026-05-09")
//   lastUpdatedDate     — ISO date this record was last edited
//   suggestedPlacement  — "home" | "news-page" | "both"
//                          home   = featured on the public index.html section
//                          both   = appears on home + on /app-news
//                          news-page = appears only on /app-news
//   audience            — "public" | "internal"
//                          internal items are hidden from the public site and
//                          only render inside /internal/.
//   isPublished         — boolean. If false, the item is treated as a draft and
//                          never renders anywhere. Future automation jobs MUST
//                          create new items with isPublished: false so a human
//                          can review before publishing.
//   isPlaceholder       — boolean. true marks demo/sample content so review can
//                          easily strip it before going live.
//   tags                — free-form string array for filters / search.
//
// Adding new items:
//   - Append to the `appNewsItems` array.
//   - Keep newest-first ordering by publishedDate (the renderer also sorts).
//   - Run `npm test` if a test harness exists; otherwise eyeball the home
//     page and /app-news to verify rendering.
//
// Future automation contract:
//   A scheduled job may read vendor RSS / status / advisory feeds and append
//   discovered items to `appNewsItems` with `isPublished: false`. A human
//   reviewer flips isPublished: true after editing summary, severity, and
//   audience. Do not auto-publish.
// ----------------------------------------------------------------------------

export const APP_NEWS_CATEGORIES = [
  "Outage",
  "Security",
  "Service Impact",
  "Product Change",
  "Deprecation",
  "Advisory"
];

export const APP_NEWS_SEVERITIES = [
  "Critical",
  "High",
  "Medium",
  "Low",
  "Info"
];

export const APP_NEWS_AUDIENCES = ["public", "internal"];

// Sample / placeholder items. Every title is prefixed with [SAMPLE] and every
// item has isPlaceholder: true. Replace these with real, sourced content
// before going live — do not invent vendor advisories.
export const appNewsItems = [
  {
    id: "sample-2026-05-09-m365-exchange-online",
    appName: "Exchange Online",
    vendor: "Microsoft",
    category: "Outage",
    severity: "High",
    title: "[SAMPLE] Outlook desktop dropping connection to Exchange Online",
    summary:
      "Some Outlook for Windows users see repeated 'Need password' prompts and intermittent disconnects from Exchange Online. OWA is unaffected.",
    affectedUsers:
      "Users on the Outlook for Windows desktop client connecting to Exchange Online; Outlook on the web (OWA) and mobile clients are not affected.",
    recommendedMspAction:
      "Direct affected users to Outlook on the web as a workaround. Track the Microsoft 365 admin center incident page until restored, then advise a one-time Outlook restart on each affected machine.",
    sourceUrls: ["https://status.cloud.microsoft/"],
    publishedDate: "2026-05-09",
    lastUpdatedDate: "2026-05-10",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: true,
    tags: ["microsoft-365", "outlook", "exchange-online", "outage"]
  },
  {
    id: "sample-2026-05-08-fortinet-ssl-vpn-cve",
    appName: "FortiGate SSL VPN",
    vendor: "Fortinet",
    category: "Security",
    severity: "Critical",
    title: "[SAMPLE] Critical FortiGate SSL VPN advisory — patch this week",
    summary:
      "A placeholder critical advisory in FortiGate SSL VPN. Fortinet has released firmware updates and recommends patching all internet-facing FortiGate devices immediately.",
    affectedUsers:
      "Any client running FortiGate appliances with SSL VPN exposed to the internet on affected firmware trains.",
    recommendedMspAction:
      "Identify all affected FortiGate devices, schedule emergency maintenance windows, apply the vendor-recommended firmware, and rotate any credentials that may have been used during the exposure window. Confirm logging is intact.",
    sourceUrls: [
      "https://www.fortiguard.com/psirt",
      "https://docs.fortinet.com/"
    ],
    publishedDate: "2026-05-08",
    lastUpdatedDate: "2026-05-10",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: true,
    tags: ["fortinet", "fortigate", "vpn", "security", "patch"]
  },
  {
    id: "sample-2026-05-07-autodesk-acc-degraded",
    appName: "Autodesk Construction Cloud",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Medium",
    title: "[SAMPLE] ACC document sync slow in EU region",
    summary:
      "Autodesk Construction Cloud document sync is reporting elevated latency for EU-region tenants. Uploads and downloads still complete but take noticeably longer than usual.",
    affectedUsers:
      "Project teams using ACC Docs and BIM 360 in the EU region; users in the US region are not affected.",
    recommendedMspAction:
      "Set expectations with affected project teams that uploads will be slow today. No client action required; monitor Autodesk Health and clear status when restored.",
    sourceUrls: ["https://health.autodesk.com/"],
    publishedDate: "2026-05-07",
    lastUpdatedDate: "2026-05-09",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: true,
    tags: ["autodesk", "acc", "bim-360", "service-impact"]
  },
  {
    id: "sample-2026-05-05-bluebeam-studio-maintenance",
    appName: "Bluebeam Studio",
    vendor: "Bluebeam",
    category: "Service Impact",
    severity: "Low",
    title: "[SAMPLE] Bluebeam Studio scheduled maintenance window — Saturday",
    summary:
      "Bluebeam has announced a Studio maintenance window for Saturday from 22:00–02:00 PT. Studio Sessions and Projects will be read-only or unavailable during the window.",
    affectedUsers:
      "Any user actively working in Studio Sessions or syncing Studio Projects during the maintenance window.",
    recommendedMspAction:
      "Email a heads-up to design leads who run weekend coordination sessions. No technical action required; Studio resumes automatically after the window.",
    sourceUrls: ["https://status.bluebeam.com/"],
    publishedDate: "2026-05-05",
    lastUpdatedDate: "2026-05-05",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: true,
    tags: ["bluebeam", "studio", "maintenance", "scheduled"]
  },
  {
    id: "sample-2026-05-04-windows-11-feature-update",
    appName: "Windows 11",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Info",
    title: "[SAMPLE] Windows 11 next feature update preview ring announced",
    summary:
      "Microsoft has previewed the next Windows 11 feature update for the Release Preview ring. Expect general availability in the following months; review compatibility with line-of-business apps before broad rollout.",
    affectedUsers:
      "Eventually affects all managed Windows 11 endpoints once general availability is reached. Currently only impacts machines opted into the Release Preview ring.",
    recommendedMspAction:
      "Pin the current Windows feature update in your patch tooling. Pilot the new build on 1–2 lab machines and validate AutoCAD, Revit, ArcGIS Pro, Bluebeam Revu, and remote-access clients before broad deployment.",
    sourceUrls: ["https://blogs.windows.com/windows-insider/"],
    publishedDate: "2026-05-04",
    lastUpdatedDate: "2026-05-04",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: true,
    tags: ["microsoft", "windows-11", "feature-update", "product-change"]
  },
  {
    id: "sample-2026-05-02-bentley-ims-deprecation",
    appName: "Bentley IMS legacy auth",
    vendor: "Bentley",
    category: "Deprecation",
    severity: "Medium",
    title: "[SAMPLE] Legacy Bentley IMS sign-in flow scheduled for retirement",
    summary:
      "Bentley has placeholder-announced a deprecation of legacy IMS sign-in for the CONNECTION Client and ProjectWise Explorer. New sign-in flow becomes mandatory later this year.",
    affectedUsers:
      "Users on older CONNECTION Client or ProjectWise Explorer builds that have not yet migrated to the new sign-in flow.",
    recommendedMspAction:
      "Inventory installed CONNECTION Client and ProjectWise Explorer versions across the fleet. Schedule upgrades for any clients still on the legacy auth flow before the deprecation date.",
    sourceUrls: ["https://docs.bentley.com/"],
    publishedDate: "2026-05-02",
    lastUpdatedDate: "2026-05-06",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: true,
    tags: ["bentley", "ims", "projectwise", "connection-client", "deprecation"]
  },
  {
    id: "sample-2026-04-29-adobe-acrobat-advisory",
    appName: "Adobe Acrobat",
    vendor: "Adobe",
    category: "Advisory",
    severity: "High",
    title: "[SAMPLE] Adobe Acrobat security update — install on managed endpoints",
    summary:
      "Adobe has placeholder-released a security update for Acrobat Reader and Acrobat Pro addressing several memory-corruption issues. Update is available through Creative Cloud Desktop or admin packaging.",
    affectedUsers:
      "Any endpoint with Acrobat Reader or Acrobat Pro installed at a version below the patched build.",
    recommendedMspAction:
      "Push the update through your standard patch tooling. Confirm the patched build number on a sample of endpoints, and notify users to relaunch Acrobat once the update is staged.",
    sourceUrls: ["https://helpx.adobe.com/security.html"],
    publishedDate: "2026-04-29",
    lastUpdatedDate: "2026-05-01",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: true,
    tags: ["adobe", "acrobat", "security", "patch", "advisory"]
  },
  {
    id: "sample-2026-04-28-internal-rmm-tip",
    appName: "Internal RMM",
    vendor: "Internal",
    category: "Advisory",
    severity: "Info",
    title: "[SAMPLE — INTERNAL] Reminder: tag tickets with vendor when forwarding to escalation",
    summary:
      "Internal-only note demonstrating audience filtering. This item is hidden from the public home page and the public /app-news page. It only renders inside /internal/.",
    affectedUsers:
      "Llamaha technicians escalating vendor outages to senior engineers.",
    recommendedMspAction:
      "Use the vendor field on the ticket form so internal dashboards roll up impact correctly. Coordinate with senior engineers in the on-call channel before contacting the vendor directly.",
    sourceUrls: ["internal/playbooks.html"],
    publishedDate: "2026-04-28",
    lastUpdatedDate: "2026-04-28",
    suggestedPlacement: "news-page",
    audience: "internal",
    isPublished: true,
    isPlaceholder: true,
    tags: ["internal", "process", "escalation"]
  }
];

// ── Helpers ────────────────────────────────────────────────────────────────

const SEVERITY_RANK = { Critical: 5, High: 4, Medium: 3, Low: 2, Info: 1 };

export function severityRank(severity) {
  return SEVERITY_RANK[severity] ?? 0;
}

export function isItemVisible(item, { area = "public" } = {}) {
  if (!item || item.isPublished === false) return false;
  if (area === "public" && item.audience === "internal") return false;
  return true;
}

export function sortByPublishedDesc(a, b) {
  const left = (a.publishedDate ?? "").localeCompare(b.publishedDate ?? "");
  if (left !== 0) return -left;
  // Tiebreak: higher severity first
  return severityRank(b.severity) - severityRank(a.severity);
}

export function getVisibleItems({ area = "public" } = {}) {
  return appNewsItems
    .filter(item => isItemVisible(item, { area }))
    .sort(sortByPublishedDesc);
}

export function getHomeItems({ area = "public", limit = 4 } = {}) {
  return getVisibleItems({ area })
    .filter(item => item.suggestedPlacement === "home" || item.suggestedPlacement === "both")
    .slice(0, limit);
}

export function formatNewsDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(d);
}

export function severityClass(severity) {
  switch (severity) {
    case "Critical": return "is-critical";
    case "High": return "is-high";
    case "Medium": return "is-medium";
    case "Low": return "is-low";
    case "Info": return "is-info";
    default: return "is-info";
  }
}

export function categoryClass(category) {
  switch (category) {
    case "Outage": return "is-outage";
    case "Security": return "is-security";
    case "Service Impact": return "is-service-impact";
    case "Product Change": return "is-product-change";
    case "Deprecation": return "is-deprecation";
    case "Advisory": return "is-advisory";
    default: return "is-advisory";
  }
}

export function audienceClass(audience) {
  return audience === "internal" ? "is-internal" : "is-public";
}

// Truthy if any item in the active set is a placeholder. The renderer uses
// this to display the "review before going live" banner.
export function hasPlaceholders(items = appNewsItems) {
  return items.some(item => item.isPlaceholder === true);
}
