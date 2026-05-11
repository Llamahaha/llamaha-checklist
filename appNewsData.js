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
//   category            — one of: "Outage" | "Security Vulnerability"
//                          | "Service Impact" | "Product Change"
//                          | "Deprecation" | "Other"
//   severity            — one of: "Critical" | "High" | "Medium" | "Low"
//                          | "Informational"
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
  "Security Vulnerability",
  "Service Impact",
  "Product Change",
  "Deprecation",
  "Other"
];

export const APP_NEWS_SEVERITIES = [
  "Critical",
  "High",
  "Medium",
  "Low",
  "Informational"
];

export const APP_NEWS_AUDIENCES = ["public", "internal"];

// Active items appear first. The older sample records below are kept only as
// layout fixtures and are hidden by isItemVisible because isPlaceholder is true.
export const appNewsItems = [
  {
    id: "2026-05-11-zoom-web-portal-release",
    appName: "Zoom Web Portal",
    vendor: "Zoom",
    category: "Product Change",
    severity: "Informational",
    title: "Zoom web portal May release adds fixes and admin-facing changes",
    summary:
      "Zoom's May 11 web portal release lists minor bug fixes, following the May 6 release with changes to keep-me-signed-in behavior, AI Companion web access, dashboard fields, and several admin/reporting fixes.",
    affectedUsers:
      "Zoom account owners, admins, helpdesk teams, and users whose sign-in sessions, AI Companion settings, dashboards, or web portal reports are managed through the Zoom web portal.",
    recommendedMspAction:
      "Review the May release notes, spot-check tenant settings that affect sign-in persistence, AI Companion, dashboard reporting, and account administration, and update support scripts for changed web portal behavior.",
    sourceUrls: [
      "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060437"
    ],
    publishedDate: "2026-05-11",
    lastUpdatedDate: "2026-05-11",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["zoom", "web-portal", "release-notes", "admin", "ai-companion"]
  },
  {
    id: "2026-05-05-google-chrome-148-security-update",
    appName: "Google Chrome",
    vendor: "Google",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Chrome 148 fixes 127 security vulnerabilities",
    summary:
      "Google promoted Chrome 148 to stable with 127 security fixes, including critical Blink, Mobile, and Chromoting CVEs. Managed browsers should be updated and relaunched promptly.",
    affectedUsers:
      "Windows, macOS, and Linux users running Chrome below 148.0.7778.96/97 on managed or unmanaged endpoints.",
    recommendedMspAction:
      "Force Chrome updates through browser management, RMM, Intune, or patch tooling. Confirm browser relaunch completion on a sample of endpoints, especially shared workstations and kiosk devices.",
    sourceUrls: [
      "https://chromereleases.googleblog.com/2026/05/stable-channel-update-for-desktop.html",
      "https://www.securityweek.com/chrome-148-rolls-out-with-127-security-fixes/"
    ],
    publishedDate: "2026-05-05",
    lastUpdatedDate: "2026-05-11",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["google", "chrome", "browser", "security", "patch", "cve"]
  },
  {
    id: "2026-05-05-bluebeam-de-service-degradation",
    appName: "Bluebeam Studio / Bluebeam web",
    vendor: "Bluebeam",
    category: "Service Impact",
    severity: "Low",
    title: "Bluebeam DE service degradation affected Studio, web, and login",
    summary:
      "Bluebeam's status history shows a resolved DE-region degradation from May 5 into May 6 affecting Studio Projects, Studio Sessions, Bluebeam web, and Bluebeam ID login.",
    affectedUsers:
      "Users tied to Bluebeam's DE services who accessed Studio Projects, Studio Sessions, Bluebeam web, or Bluebeam ID login during the incident window.",
    recommendedMspAction:
      "If German-region Bluebeam users reported access issues during the window, treat them as vendor-side unless symptoms continued after resolution. Keep the status history link with related tickets for closure notes.",
    sourceUrls: [
      "https://status.bluebeam.com/history?locale=en"
    ],
    publishedDate: "2026-05-05",
    lastUpdatedDate: "2026-05-11",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["bluebeam", "studio", "service-impact", "login", "de-region"]
  },
  {
    id: "2026-05-04-microsoft-intune-may-updates",
    appName: "Microsoft Intune",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Medium",
    title: "Intune May updates add app inventory, Edge baseline, and Autopatch reporting",
    summary:
      "Microsoft's Week of May 4 Intune updates include enhanced app inventory data, a minimum Intune Management Extension version of 1.58.103.0, a new Autopatch update risk visibility report, and the Microsoft Edge v139 security baseline.",
    affectedUsers:
      "IT admins managing Windows 10/11 endpoints, Edge security baselines, Windows Autopatch reporting, or Win32 app/script/remediation delivery through Microsoft Intune.",
    recommendedMspAction:
      "Verify Intune Management Extension versions, review whether enhanced app inventory should be enabled for managed Windows devices, evaluate the Edge v139 baseline before deployment, and add Autopatch risk reporting to patch review routines.",
    sourceUrls: [
      "https://learn.microsoft.com/en-us/intune/whats-new/"
    ],
    publishedDate: "2026-05-04",
    lastUpdatedDate: "2026-05-11",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "intune", "autopatch", "edge", "endpoint-management"]
  },
  {
    id: "2026-04-14-adobe-acrobat-reader-security-updates",
    appName: "Acrobat Pro / Reader",
    vendor: "Adobe",
    category: "Security Vulnerability",
    severity: "High",
    title: "Adobe Acrobat and Reader April updates include exploited and critical CVEs",
    summary:
      "Adobe's April Acrobat and Reader bulletins include a Priority 1 update for actively exploited CVE-2026-34621 and a Priority 2 follow-up for additional critical and important issues that can lead to code execution or file system reads.",
    affectedUsers:
      "Windows and macOS endpoints with Acrobat DC, Acrobat Reader DC, or Acrobat 2024 at the affected April 2026 builds or earlier.",
    recommendedMspAction:
      "Prioritize Acrobat and Reader patch deployment, especially on endpoints that open PDFs from email or browsers. Confirm patched versions through inventory and have users relaunch Acrobat after updates land.",
    sourceUrls: [
      "https://helpx.adobe.com/security/products/acrobat/apsb26-43.html",
      "https://helpx.adobe.com/security/products/acrobat/apsb26-44.html",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    publishedDate: "2026-04-14",
    lastUpdatedDate: "2026-04-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["adobe", "acrobat", "reader", "security", "patch", "kev"]
  },
  {
    id: "2026-04-14-fortinet-forticlient-ems-sql-injection",
    appName: "FortiClient EMS",
    vendor: "Fortinet",
    category: "Security Vulnerability",
    severity: "High",
    title: "Fortinet patches FortiClient EMS SQL injection and database exposure issues",
    summary:
      "Fortinet's April PSIRT batch includes FortiClient EMS fixes for authenticated SQL injection (CVE-2026-39809) and a hardcoded encryption key issue (CVE-2026-39810). Fortinet lists fixed releases for affected 7.4 and 7.2 environments.",
    affectedUsers:
      "Clients running on-premises FortiClient EMS 7.4.0 through 7.4.5, 7.2.0 through 7.2.12, or older unsupported 7.0 builds.",
    recommendedMspAction:
      "Inventory FortiClient EMS servers, upgrade to 7.4.6 or 7.2.13 as appropriate, restrict EMS administration to trusted networks, and review privileged account/database activity around EMS.",
    sourceUrls: [
      "https://fortiguard.fortinet.com/psirt/FG-IR-26-102",
      "https://fortiguard.fortinet.com/psirt/FG-IR-26-107"
    ],
    publishedDate: "2026-04-14",
    lastUpdatedDate: "2026-05-11",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["fortinet", "forticlient", "ems", "security", "sql-injection", "patch"]
  },
  {
    id: "2026-03-12-microsoft-exchange-online-ews-retirement",
    appName: "Exchange Online",
    vendor: "Microsoft",
    category: "Deprecation",
    severity: "Medium",
    title: "Exchange Online EWS global disablement starts October 2026",
    summary:
      "Microsoft's current EWS deprecation guidance says Exchange Web Services starts being disabled globally for all Exchange Online organizations in October 2026 and is fully disabled in April 2027.",
    affectedUsers:
      "Microsoft 365 tenants with line-of-business apps, public-folder sync, backup, migration, CRM, copier, or reporting tools that still use Exchange Web Services.",
    recommendedMspAction:
      "Use EWS Usage Reports and vendor inventory to find dependencies now. Move internal integrations to Microsoft Graph, ask vendors for migration timelines, and document any temporary allow-list decisions before October 2026.",
    sourceUrls: [
      "https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/deprecation-of-ews-exchange-online",
      "https://techcommunity.microsoft.com/blog/exchange/exchange-online-ews-your-time-is-almost-up/4492361"
    ],
    publishedDate: "2026-03-12",
    lastUpdatedDate: "2026-03-12",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "exchange-online", "ews", "deprecation", "graph"]
  },
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

const SEVERITY_RANK = { Critical: 5, High: 4, Medium: 3, Low: 2, Informational: 1, Info: 1 };

export function severityRank(severity) {
  return SEVERITY_RANK[severity] ?? 0;
}

export function isItemVisible(item, { area = "public" } = {}) {
  if (!item || item.isPublished === false) return false;
  if (item.isPlaceholder === true) return false;
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

export function getHomeItems({ area = "public", limit = 5 } = {}) {
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
    case "Informational": return "is-info";
    case "Info": return "is-info";
    default: return "is-info";
  }
}

export function categoryClass(category) {
  switch (category) {
    case "Outage": return "is-outage";
    case "Security": return "is-security";
    case "Security Vulnerability": return "is-security";
    case "Service Impact": return "is-service-impact";
    case "Product Change": return "is-product-change";
    case "Deprecation": return "is-deprecation";
    case "Advisory": return "is-advisory";
    case "Other": return "is-advisory";
    default: return "is-advisory";
  }
}

export function audienceClass(audience) {
  return audience === "internal" ? "is-internal" : "is-public";
}

// Truthy if any item in the active set is a placeholder. The renderer uses
// this to display the "review before going live" banner.
export function hasPlaceholders(items = appNewsItems) {
  return items.some(item => item.isPlaceholder === true && isItemVisible(item));
}
