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
  // -- LATEST PUBLISHED FINDINGS (2026-06-18 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-06-18.
  {
    id: "2026-06-18-sharepoint-restricted-search-retirement",
    appName: "SharePoint Online / Microsoft 365 Copilot",
    vendor: "Microsoft",
    category: "Deprecation",
    severity: "Medium",
    title: "Microsoft is retiring Restricted SharePoint Search in SharePoint Online",
    summary:
      "Microsoft 365 Message Center item MC1395311 says Restricted SharePoint Search is being retired in SharePoint Online. The feature was used as a temporary governance control to limit how SharePoint content appears in Microsoft Search and Microsoft 365 Copilot while admins review permissions and oversharing risk.",
    affectedUsers:
      "Microsoft 365 tenants that enabled Restricted SharePoint Search as part of Copilot rollout, SharePoint permissions cleanup, search governance, or data exposure mitigation.",
    recommendedMspAction:
      "Identify tenants using Restricted SharePoint Search and update Copilot readiness plans. Treat the retirement as a cue to finish SharePoint permissions reviews, sensitivity labeling, external sharing cleanup, and Purview governance work instead of relying on Restricted SharePoint Search as a long-term control.",
    sourceUrls: [
      "https://mc.merill.net/message/MC1395311",
      "https://learn.microsoft.com/en-us/sharepoint/restricted-sharepoint-search",
      "https://mwpro.co.uk/blog/2026/06/18/microsoft-sharepoint-online-retirement-of-restricted-sharepoint-search-mc1395311/"
    ],
    publishedDate: "2026-06-18",
    lastUpdatedDate: "2026-06-18",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "sharepoint-online", "restricted-sharepoint-search", "copilot", "search", "governance", "deprecation", "message-center", "mc1395311"]
  },
  {
    id: "2026-06-17-fortibleed-fortinet-credential-compromise",
    appName: "FortiGate / Fortinet VPN / FortiSandbox",
    vendor: "Fortinet",
    category: "Other",
    severity: "Critical",
    title: "FortiBleed reports point to large-scale Fortinet firewall and VPN credential compromise",
    summary:
      "Multiple security firms reported a mid-June campaign dubbed FortiBleed affecting internet-facing Fortinet firewalls and VPN gateways. Reports agree the risk centers on verified Fortinet administrator/VPN credentials at large scale; some reporting frames it as a credential-compromise campaign rather than a single new Fortinet zero-day, while other advisories note attackers are also weaponizing recently patched Fortinet vulnerabilities such as FortiSandbox issues. Either way, exposed Fortinet perimeter devices should be treated as high-risk until credentials, firmware, MFA, and logs are reviewed.",
    affectedUsers:
      "Organizations with internet-facing FortiGate, Fortinet SSL VPN, Fortinet administrative portals, FortiSandbox, or related Fortinet perimeter/security appliances, especially where credentials may have been reused or MFA is missing.",
    recommendedMspAction:
      "Rotate Fortinet admin, VPN, and service credentials immediately for exposed devices; enforce MFA; remove management interfaces from the public internet; patch FortiGate, FortiSandbox, FortiClient EMS, and other Fortinet products to current fixed releases; and review VPN/admin logs for unexpected geolocations, successful logins, configuration exports, new accounts, or policy changes. If a client appears in an exposure dataset or shows suspicious access, treat the firewall/VPN as potentially compromised and start incident response.",
    sourceUrls: [
      "https://arcticwolf.com/resources/blog/active-fortibleed-campaign-impacting-fortinet-devices-across-194-countries/",
      "https://kudelskisecurity.com/research/fortinet-fortibleed-global-compromise-active-exploitation-of-fortinet-vulnerabilities",
      "https://www.darkreading.com/cyberattacks-data-breaches/sweeping-credential-harvesting-heist-compromises-30k-fortinet-devices",
      "https://fortiguard.fortinet.com/psirt"
    ],
    publishedDate: "2026-06-17",
    lastUpdatedDate: "2026-06-18",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["fortinet", "fortigate", "ssl-vpn", "fortibleed", "credential-compromise", "credential-stuffing", "mfa", "perimeter-security", "incident-response", "fortisandbox"]
  },
  {
    id: "2026-06-17-microsoft-teams-presence-emergency-calling-incidents",
    appName: "Microsoft Teams",
    vendor: "Microsoft",
    category: "Service Impact",
    severity: "Medium",
    title: "Microsoft resolves Teams presence incident and emergency-calling address search issue",
    summary:
      "Microsoft Teams incident TM1394359 was restored on June 17 after some users saw incorrect presence information, primarily in EMEA, due to a configuration issue in the region. The same Microsoft 365 incident feed also shows a resolved Teams issue where users attempting to search for emergency-calling locations may have been unable to find or add addresses; Microsoft reverted the responsible change and marked that impact resolved on June 17.",
    affectedUsers:
      "Teams users who relied on presence/status accuracy during the June 17 EMEA incident, and Teams Phone / emergency-calling users or admins searching for emergency locations during the June 8-17 address-search impact window.",
    recommendedMspAction:
      "Tie matching Teams presence/status tickets to TM1394359 and close as vendor-side if symptoms ended after Microsoft's restoration. For Teams Phone clients, verify emergency location/address search now works, document any E911-related user reports separately, and capture tenant, user, location, client type, and timestamps if the issue persists.",
    sourceUrls: [
      "https://x.com/MSFT365Status/status/2067182248114237852",
      "https://x.com/MSFT365Status/status/2067199650797441490",
      "https://mailservices.isc.upenn.edu/computing/email/penno365/alerts/ms-incidents.html",
      "https://status.cloud.microsoft/"
    ],
    publishedDate: "2026-06-17",
    lastUpdatedDate: "2026-06-18",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "teams", "presence", "tm1394359", "service-impact", "emea", "teams-phone", "emergency-calling", "e911", "resolved"]
  },
  {
    id: "2026-06-16-cisa-kev-joomla-cisco-litespeed",
    appName: "Joomla JCE / Cisco Catalyst SD-WAN Manager / LiteSpeed cPanel Plugin",
    vendor: "Multiple (CISA KEV)",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "CISA adds exploited Joomla JCE RCE plus Cisco SD-WAN and LiteSpeed cPanel flaws to KEV",
    summary:
      "CISA added three more actively exploited items to KEV since the prior scan: CVE-2026-48907 in Widget Factory Joomla Content Editor (JCE), CVE-2026-20262 in Cisco Catalyst SD-WAN Manager, and CVE-2026-54420 in the LiteSpeed cPanel Plugin. JCE's flaw can let unauthenticated attackers create editor profiles and upload/execute PHP; Cisco's SD-WAN Manager flaw lets a low-privileged authenticated attacker create or overwrite files that can later support root escalation; and the LiteSpeed cPanel Plugin symlink issue can let a user with FTP or web shell access escalate to root on shared CloudLinux/CageFS hosting.",
    affectedUsers:
      "Joomla sites using JCE before 2.9.99.5, Cisco Catalyst SD-WAN Manager/vManage deployments on affected releases, and shared-hosting servers using LiteSpeed WHM/cPanel Plugin versions before the fixed cPanel user-end plugin 2.4.8 / WHM plugin 5.3.2.x releases.",
    recommendedMspAction:
      "Patch JCE to 2.9.99.6 or later, then hunt for rogue JCE editor profiles and unexpected PHP files in images, media, or tmp folders because patching does not clean an already compromised Joomla site. Upgrade Cisco Catalyst SD-WAN Manager to a fixed release and review API/upload/admin logs for suspicious low-privileged activity. Upgrade LiteSpeed WHM/cPanel Plugin or uninstall the cPanel user-end plugin if you cannot update, then check cPanel logs for the vendor-provided exploit patterns.",
    sourceUrls: [
      "https://www.cisa.gov/news-events/alerts/2026/06/16/cisa-adds-one-known-exploited-vulnerability-catalog",
      "https://www.cisa.gov/news-events/alerts/2026/06/15/cisa-adds-two-known-exploited-vulnerabilities-catalog",
      "https://www.joomlacontenteditor.net/news/jce-security-update-and-a-free-patch-for-older-sites",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-48907",
      "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-arbfw-c2rZvQ",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-20262",
      "https://blog.litespeedtech.com/2026/06/01/security-update-for-litespeed-cpanel-plugin-2/",
      "https://support.cpanel.net/hc/en-us/articles/40868195661207-Security-LiteSpeed-cPanel-Plugin-May-31-2026",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-54420"
    ],
    publishedDate: "2026-06-16",
    lastUpdatedDate: "2026-06-18",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["cisa", "kev", "joomla", "jce", "cve-2026-48907", "cisco", "sd-wan", "cve-2026-20262", "litespeed", "cpanel", "cve-2026-54420", "rce", "privilege-escalation", "actively-exploited"]
  },
  // -- LATEST PUBLISHED FINDINGS (2026-06-16 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-06-16.
  {
    id: "2026-06-16-bluebeam-revu-20-end-of-support-end-of-life",
    appName: "Bluebeam Revu 20 (and below)",
    vendor: "Bluebeam",
    category: "Deprecation",
    severity: "High",
    title: "Bluebeam Revu 20 reaches End of Support July 31, 2026 and End of Life December 31, 2026",
    summary:
      "Per Bluebeam's official EOL notice, Revu 20 reaches End of Support on July 31, 2026 and End of Life on December 31, 2026. After July 31, 2026, technical support and self-service license management for Revu 20 end, including the ability to release/reassign seats to different machines or workstations. After December 31, 2026, Revu 20 loses access to Bluebeam Studio Sessions and Projects (including joining and collaborating in Studio through an integration). This applies to all Revu 20 license types: perpetual, open, site, enterprise, academic, and not-for-resale (NFR). Bluebeam already stopped selling Revu 20 licenses after September 30, 2023. Separately, for Revu 2019 and below, Studio functionality is no longer supported.",
    affectedUsers:
      "Any client still running Bluebeam Revu 20 or earlier, especially perpetual-license holders who rely on Studio Sessions/Projects for collaboration and any workflow that depends on releasing or moving Revu 20 seats between machines.",
    recommendedMspAction:
      "Inventory clients on Revu 20 and below now. Complete any pending Revu 20 seat releases or machine reassignments before the July 31, 2026 End of Support date, because self-service license management ends then. Plan migration to a current Bluebeam subscription (Revu 21+) before December 31, 2026 for any user who needs Studio Sessions/Projects, since cloud Studio access for Revu 20 is removed at End of Life. Note the Terms of Use do not allow converted customers to run Revu 21 and Revu 20 together.",
    sourceUrls: [
      "https://support.bluebeam.com/revu/resources/revu-20-eol.html",
      "https://www.bluebeam.com/revu-20-eol/",
      "https://support.bluebeam.com/revu/licensing/licensing.html",
      "https://support.bluebeam.com/legacy/resources/bluebeam-eol-support.html"
    ],
    publishedDate: "2026-06-16",
    lastUpdatedDate: "2026-06-16",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["bluebeam", "revu", "revu-20", "end-of-support", "end-of-life", "deprecation", "studio", "licensing", "subscription", "migration"]
  },
  {
    id: "2026-06-16-egnyte-no-outage-operational",
    appName: "Egnyte Platform",
    vendor: "Egnyte",
    category: "Service Impact",
    severity: "Informational",
    title: "Egnyte reports All Systems Operational on the morning of June 16, 2026 (no outage)",
    summary:
      "As of the morning of June 16, 2026, Egnyte's official platform status page shows All Systems Operational across all components (Collaboration, Web UI, Sync, Desktop App, Mobile, Login, Public APIs, Security & Govern, and others) with no incident reported today. The most recent resolved Egnyte incident noted in recent monitoring was a June 9, 2026 login issue in the US-West region, which has since been resolved. Egnyte is not experiencing an outage this morning.",
    affectedUsers:
      "No active impact. This entry documents the verified operational status for Egnyte users and Llamaha techs fielding 'is Egnyte down?' questions on June 16.",
    recommendedMspAction:
      "Treat any single-user Egnyte access problems reported this morning as local (network, SSO/Conditional Access, Desktop App auth, or client-side) rather than a platform outage. Verify the live status at status.egnyte.com before escalating, capture the affected user, region, component (Web UI / Desktop App / Sync), and exact error, and subscribe to the Egnyte status page for real-time incident alerts.",
    sourceUrls: [
      "https://status.egnyte.com/",
      "https://helpdesk.egnyte.com/hc/en-us/articles/224161027-Egnyte-Status-Page"
    ],
    publishedDate: "2026-06-16",
    lastUpdatedDate: "2026-06-16",
    suggestedPlacement: "news-page",
    audience: "internal",
    isPublished: true,
    isPlaceholder: false,
    tags: ["egnyte", "status", "operational", "no-outage", "service-status", "verification"]
  },
  // -- LATEST PUBLISHED FINDINGS (2026-06-15 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-06-15.
  {
    id: "2026-06-13-autodesk-forma-account-fusion-incidents",
    appName: "Forma Build / Autodesk Account / Fusion / APS Data Management",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk resolves short Forma Build, Account, Fusion, and APS Data Management incidents",
    summary:
      "Autodesk Health tracking shows several minor resolved incidents since the last scan: a June 13 Forma Build ACS Forms access issue, a June 11 Autodesk Account Product Details loading issue, a June 11 Fusion issue copying files with drawings, and a June 10 APS Data Management Canada issue creating new items and versions.",
    affectedUsers:
      "AEC, manufacturing, and platform teams using Forma Build ACS Forms, Autodesk Account product/license details, Fusion drawings, or APS Data Management in the Canada region during the listed windows.",
    recommendedMspAction:
      "Tie matching tickets to the resolved Autodesk incidents and ask users to retry affected workflows. If symptoms continue after Autodesk's resolution windows, capture the Autodesk account, hub/project, file or item, service region, timestamp, and browser/app version before escalating.",
    sourceUrls: [
      "https://health.autodesk.com/",
      "https://statussight.com/status/autodesk-health-dashboard"
    ],
    publishedDate: "2026-06-13",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "forma-build", "autodesk-account", "fusion", "aps-data-management", "service-impact", "resolved"]
  },
  {
    id: "2026-06-12-cisa-kev-oracle-peoplesoft-ivanti-sentry",
    appName: "Oracle PeopleSoft / Ivanti Sentry",
    vendor: "Multiple (CISA KEV)",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "CISA adds Oracle PeopleSoft and Ivanti Sentry exploited RCE flaws to KEV",
    summary:
      "CISA added Ivanti Sentry CVE-2026-10520 on June 11 and Oracle PeopleSoft Enterprise PeopleTools CVE-2026-35273 on June 12 after evidence of active exploitation. Ivanti's flaw is a pre-auth OS command injection that can give a remote unauthenticated attacker root-level RCE on Sentry before R10.5.2, R10.6.2, and R10.7.1. Oracle's PeopleTools flaw affects versions 8.61 and 8.62, is exploitable over HTTP without authentication, and can result in full PeopleTools takeover; CISA marks known ransomware use for the Oracle entry.",
    affectedUsers:
      "Organizations running Ivanti Sentry mobile/email gateway appliances below the fixed releases, and Oracle PeopleSoft Enterprise PeopleTools 8.61 or 8.62 deployments, especially internet-reachable PeopleSoft environments.",
    recommendedMspAction:
      "Patch Ivanti Sentry to R10.5.2, R10.6.2, R10.7.1, or later and isolate exposed appliances until upgraded. Apply Oracle's June 10 PeopleSoft security alert patch, restrict HTTP exposure, review web/app logs for suspicious access, rotate PeopleSoft integration credentials if compromise is suspected, and perform forensic triage before closing remediation tickets because the KEV due dates were June 14 for Ivanti and June 15 for Oracle.",
    sourceUrls: [
      "https://www.cisa.gov/news-events/alerts/2026/06/11/cisa-adds-one-known-exploited-vulnerability-catalog",
      "https://www.cisa.gov/news-events/alerts/2026/06/12/cisa-adds-one-known-exploited-vulnerability-catalog",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://hub.ivanti.com/s/article/Security-Advisory-Ivanti-Sentry-CVE-2026-10520-CVE-2026-10523",
      "https://www.oracle.com/security-alerts/alert-cve-2026-35273.html",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-10520",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-35273"
    ],
    publishedDate: "2026-06-12",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["cisa", "kev", "oracle", "peoplesoft", "peopletools", "ivanti", "sentry", "rce", "command-injection", "ransomware", "actively-exploited", "patch"]
  },
  {
    id: "2026-06-11-microsoft-edge-two-week-release-cycle",
    appName: "Microsoft Edge",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Medium",
    title: "Microsoft Edge Stable moves to a two-week release cycle starting with Edge 152",
    summary:
      "Microsoft announced on June 11 that Edge Stable will move from a four-week major release cycle to a two-week cycle starting with Edge 152, targeted for August 27, 2026. Extended Stable remains on an eight-week rhythm and will receive every fourth release, so organizations can stay on the slower validation cadence if needed.",
    affectedUsers:
      "Admins managing Microsoft Edge for Business, browser testing rings, extension compatibility, kiosk/browser-lockdown policies, or customers that rely on Stable versus Extended Stable release timing.",
    recommendedMspAction:
      "Update Edge release-management runbooks before August 27, confirm which clients should remain on Stable versus Extended Stable, and add a small Beta or Enterprise Preview pilot group so policy, extension, SSO, and line-of-business web app regressions are caught before Stable reaches production.",
    sourceUrls: [
      "https://blogs.windows.com/msedgedev/2026/06/11/faster-updates-enterprise-friendly-schedule-the-new-microsoft-edge-release-cycle/",
      "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-release-schedule",
      "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel"
    ],
    publishedDate: "2026-06-11",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "edge", "browser", "release-cadence", "extended-stable", "enterprise-preview", "browser-management"]
  },
  {
    id: "2026-06-10-cisa-bod-26-04-risk-based-patching",
    appName: "Vulnerability Management / Patch Operations",
    vendor: "CISA",
    category: "Other",
    severity: "Medium",
    title: "CISA BOD 26-04 moves federal vulnerability remediation to risk-based deadlines",
    summary:
      "On June 10, CISA issued BOD 26-04 and implementation guidance, replacing the flat CVSS/KEV patching model for federal civilian systems with a risk decision tree based on public exposure, KEV status, exploit automation, and technical impact. The highest-risk vulnerabilities can require remediation within three calendar days plus forensic triage; other outcomes are 14 days, 60 days, or next major system upgrade.",
    affectedUsers:
      "Federal civilian customers directly, plus MSPs and regulated organizations that use CISA KEV and federal directives as a benchmark for vulnerability-management SLAs, cyber insurance evidence, or customer contract language.",
    recommendedMspAction:
      "Adjust patch-priority runbooks to capture internet exposure, KEV status, exploit automation, and technical impact for each vulnerable asset. Build an emergency three-day remediation path for public, actively exploited, automatable, high-impact flaws, and make forensic triage part of closure criteria for the highest-risk items.",
    sourceUrls: [
      "https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk",
      "https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    publishedDate: "2026-06-10",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["cisa", "bod-26-04", "kev", "vulnerability-management", "patching", "forensic-triage", "risk-based-remediation"]
  },
  {
    id: "2026-06-10-adobe-june-2026-security-updates",
    appName: "Acrobat Reader / ColdFusion / AEM / Creative Cloud apps",
    vendor: "Adobe",
    category: "Security Vulnerability",
    severity: "High",
    title: "Adobe June security batch covers Acrobat Reader, ColdFusion, AEM, and creative apps",
    summary:
      "Adobe's June security batch includes 11 advisories for Experience Manager, Experience Manager Forms, InDesign, InCopy, Substance 3D Sampler, Content Credentials SDK, Dreamweaver, Acrobat/Reader, ColdFusion, Format Plugins, and Campaign Classic. Public roundups count 123 vulnerabilities, including 47 critical issues; Adobe's Acrobat/Reader bulletin says Adobe is not aware of in-the-wild exploitation for those Acrobat issues, while ColdFusion is a Priority 1 update.",
    affectedUsers:
      "Windows and macOS endpoints running Acrobat or Acrobat Reader, creative teams with InDesign/InCopy/Dreamweaver/Substance components, and server teams running Adobe ColdFusion or Experience Manager.",
    recommendedMspAction:
      "Deploy Acrobat/Reader and Creative Cloud updates through normal endpoint rings, but treat internet-facing ColdFusion and Experience Manager servers as higher priority. Confirm fixed versions through inventory, restart affected apps/services where required, and keep the April Acrobat KEV item tracked separately because this June Acrobat batch is not currently reported by Adobe as exploited in the wild.",
    sourceUrls: [
      "https://helpx.adobe.com/security/security-bulletin.html",
      "https://helpx.adobe.com/security/products/acrobat/apsb26-63.html",
      "https://helpx.adobe.com/security/products/coldfusion/apsb26-64.html",
      "https://www.hkcert.org/security-bulletin/adobe-monthly-security-update-june-2026",
      "https://blog.qualys.com/vulnerabilities-threat-research/2026/06/09/microsoft-and-adobe-patch-tuesday-june-2026-security-update-review"
    ],
    publishedDate: "2026-06-10",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["adobe", "acrobat", "reader", "coldfusion", "experience-manager", "creative-cloud", "security", "patch", "apsb26-63", "apsb26-64"]
  },
  {
    id: "2026-06-09-google-chrome-v8-cve-2026-11645-kev",
    appName: "Chrome / Chromium / Microsoft Edge",
    vendor: "Google / Microsoft",
    category: "Security Vulnerability",
    severity: "High",
    title: "Chrome V8 zero-day CVE-2026-11645 patched, added to CISA KEV",
    summary:
      "Google's June 8 Chrome Stable update 149.0.7827.102/.103 includes 74 security fixes and calls out CVE-2026-11645, an out-of-bounds memory access issue in V8 with exploitation in the wild. NVD describes it as an out-of-bounds read/write issue before Chrome 149.0.7827.103 that can let a remote attacker execute arbitrary code inside the sandbox via crafted HTML; CISA added it to KEV on June 9 with a June 23 due date. Microsoft also released Edge Stable security updates that incorporate the Chromium fixes.",
    affectedUsers:
      "Managed Chrome desktop users on Windows, macOS, and Linux, plus users of Chromium-based browsers such as Microsoft Edge before the corresponding security update and relaunch.",
    recommendedMspAction:
      "Force Chrome and Edge update checks where possible, then verify browser versions and successful relaunch across managed devices. Prioritize browsers used for privileged admin portals, shared workstations, kiosks, developers, finance users, and users with elevated webmail or SaaS permissions.",
    sourceUrls: [
      "https://chromereleases.googleblog.com/2026/06/stable-channel-update-for-desktop_0153744567.html",
      "https://www.cisa.gov/news-events/alerts/2026/06/09/cisa-adds-three-known-exploited-vulnerabilities-catalog",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-11645",
      "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnotes-security"
    ],
    publishedDate: "2026-06-09",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["google", "chrome", "chromium", "edge", "browser", "v8", "cve-2026-11645", "kev", "actively-exploited", "patch"]
  },
  {
    id: "2026-06-09-cisa-kev-cisco-sdwan-arista-eos",
    appName: "Cisco Catalyst SD-WAN Manager / Arista EOS",
    vendor: "Cisco / Arista",
    category: "Security Vulnerability",
    severity: "High",
    title: "CISA adds exploited Cisco SD-WAN Manager and Arista EOS network-device flaws to KEV",
    summary:
      "On June 9, CISA added Cisco Catalyst SD-WAN Manager CVE-2026-20245 and Arista EOS CVE-2026-7473 to KEV. Cisco's flaw can let an authenticated local attacker on Catalyst SD-WAN Controller, Manager, or Validator execute arbitrary commands as root by supplying a crafted file. Arista's EOS issue affects switches configured as tunnel endpoints, such as VXLAN, GRE, or decap-groups, and can cause unexpected decapsulation/forwarding of non-configured tunnel traffic; Arista says exploitation has been reported and provides mitigations instead of a planned patch.",
    affectedUsers:
      "Clients running Cisco Catalyst SD-WAN management/control-plane components or Arista EOS-based data-center/campus switches that perform tunnel decapsulation, especially where management access, local admin access, or overlay/tunnel traffic paths are not tightly restricted.",
    recommendedMspAction:
      "Inventory Cisco Catalyst SD-WAN controllers/managers/validators and apply Cisco's fixed release or workaround when available. For Arista, identify EOS platforms with VXLAN, GRE, or ip decap-group configuration, apply Arista's mitigation ACLs or configuration guidance, monitor for unexpected tunneled traffic, and document exposure decisions before the June 23 KEV due date.",
    sourceUrls: [
      "https://www.cisa.gov/news-events/alerts/2026/06/09/cisa-adds-three-known-exploited-vulnerabilities-catalog",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-privesc-4uxFrdzx",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-20245",
      "https://www.arista.com/en/support/advisories-notices/security-advisory/24005-security-advisory-0137",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-7473"
    ],
    publishedDate: "2026-06-09",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["cisa", "kev", "cisco", "sd-wan", "arista", "eos", "network-infrastructure", "tunnel", "vxlan", "gre", "actively-exploited"]
  },
  {
    id: "2026-06-04-esri-portal-arcgis-security-patch-reissue",
    appName: "Portal for ArcGIS / ArcGIS Server",
    vendor: "Esri",
    category: "Security Vulnerability",
    severity: "High",
    title: "Esri reissues Portal for ArcGIS 11.5 security patch and keeps ArcGIS Server security updates active",
    summary:
      "Esri's Portal for ArcGIS Security 2026 Update 1 Patch page now notes a corrected 11.5 patch with a June 4 release date to address Windows upgrade failures to ArcGIS Enterprise 12.0 and 12.1 caused by the earlier security patch. Esri's May security bulletin also points customers to ArcGIS Server Security 2026 Update 2, which resolves Critical and Medium vulnerabilities in ArcGIS Server 12.0 and prior.",
    affectedUsers:
      "On-premises ArcGIS Enterprise environments running Portal for ArcGIS 11.5 on Windows and organizations running ArcGIS Server 12.0 or earlier that have not yet applied the 2026 security updates.",
    recommendedMspAction:
      "For Portal 11.5 on Windows, deploy the corrected Portal for ArcGIS Security 2026 Update 1 Patch before attempting upgrades to ArcGIS Enterprise 12.0 or 12.1. For ArcGIS Server, verify Patch Notification Tool output, schedule the current security patch, and keep rollback/backup steps in the change record.",
    sourceUrls: [
      "https://support.esri.com/en-us/patches-updates/2026/portal-for-arcgis-security-2026-update-1-patch",
      "https://www.esri.com/arcgis-blog/products/arcgis-enterprise/administration/may-2026-arcgis-security-bulletin",
      "https://trust.arcgis.com/en/"
    ],
    publishedDate: "2026-06-04",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["esri", "arcgis", "portal-for-arcgis", "arcgis-server", "security", "patch", "enterprise", "windows"]
  },
  // -- LATEST PUBLISHED FINDINGS (2026-06-09 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-06-09.
  {
    id: "2026-06-09-microsoft-june-2026-patch-tuesday",
    appName: "Windows / Microsoft Office / Exchange Server",
    vendor: "Microsoft",
    category: "Security Vulnerability",
    severity: "High",
    title: "Microsoft June 2026 Patch Tuesday ships 200+ fixes and finalizes Exchange OWA CVE-2026-42897 remediation",
    summary:
      "Microsoft's June 9, 2026 Patch Tuesday is one of the larger recent Microsoft security releases: Qualys counts 206 Microsoft vulnerabilities, including 33 critical and 167 important issues, while Rapid7 describes 200 vulnerabilities published that day and notes three publicly disclosed zero-days. The release also includes the permanent Exchange Server fix for CVE-2026-42897, the Outlook Web Access (OWA) cross-site-scripting/spoofing flaw that Microsoft disclosed in May as actively exploited in the wild. This release is also the last Patch Tuesday before the June 26, 2026 Secure Boot certificate deadline, when Microsoft replaces the original 2011 Secure Boot certificates that expire in late June.",
    affectedUsers:
      "All managed Windows endpoints and servers, Microsoft Office/SharePoint deployments, and on-premises Exchange Server 2016, 2019, and Subscription Edition. CVE-2026-42897 affects on-prem Exchange only; Exchange Online is not impacted. The Secure Boot certificate rollover affects Windows devices fleet-wide.",
    recommendedMspAction:
      "Deploy June 2026 security updates through your patch rings, prioritizing on-prem Exchange Server (apply the OWA fix for CVE-2026-42897 and confirm the Exchange Emergency Mitigation Service is enabled until patched). Validate the June update against critical line-of-business systems, then complete Secure Boot certificate validation and updated-certificate deployment before the June 26, 2026 deadline to avoid boot/trust issues when the 2011 certificates expire.",
    sourceUrls: [
      "https://msrc.microsoft.com/update-guide",
      "https://techcommunity.microsoft.com/blog/exchange/addressing-exchange-server-may-2026-vulnerability-cve-2026-42897/4518498",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-42897",
      "https://blog.qualys.com/vulnerabilities-threat-research/2026/06/09/microsoft-and-adobe-patch-tuesday-june-2026-security-update-review",
      "https://www.rapid7.com/blog/post/em-patch-tuesday-june-2026/",
      "https://learn.microsoft.com/en-us/windows/release-health/windows-message-center"
    ],
    publishedDate: "2026-06-09",
    lastUpdatedDate: "2026-06-15",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "patch-tuesday", "windows", "office", "exchange-server", "owa", "cve-2026-42897", "secure-boot", "security", "patch", "kev"]
  },
  {
    id: "2026-06-08-check-point-vpn-cve-2026-50751-kev",
    appName: "Check Point Remote Access VPN / Mobile Access / Spark",
    vendor: "Check Point",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Check Point VPN authentication bypass (CVE-2026-50751) exploited by ransomware affiliate, added to CISA KEV",
    summary:
      "CVE-2026-50751 is a critical (CVSS 9.3) improper-authentication flaw in Check Point Remote Access VPN, Mobile Access, and Spark products. A logic weakness in how Remote Access and Mobile Access components validate certificates during IKEv1 key exchange lets a remote unauthenticated attacker establish a VPN session without valid credentials. It is exploitable on gateways using the deprecated IKEv1 protocol that accept legacy Remote Access clients and do not require a machine certificate. Check Point published a hotfix on June 8, 2026 and observed exploitation dating back to May 7 with an early-June increase; at least one intrusion is linked with medium confidence to a Qilin ransomware affiliate. CISA added it to KEV on June 8 with a three-day federal remediation deadline.",
    affectedUsers:
      "Organizations running Check Point Remote Access VPN, Mobile Access, or Spark gateways configured for the deprecated IKEv1 key exchange that accept legacy clients without requiring a machine certificate, especially internet-facing gateways.",
    recommendedMspAction:
      "Apply Check Point's June 8 hotfix immediately for affected gateways. Until patched, disable or restrict the deprecated IKEv1 Remote Access configuration and require machine certificates for connections. Review VPN authentication and session logs for unexpected or credential-less sessions back to early May, watch for the listed attacker VPS providers (Kaupo Cloud HK, Shock Hosting, Vultr), and treat any matching access as a potential ransomware precursor given the Qilin link.",
    sourceUrls: [
      "https://blog.checkpoint.com/security/check-point-releases-important-hotfix-for-vulnerabilities-in-deprecated-ikev1-vpn-protocol/",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://www.rapid7.com/blog/post/etr-critical-check-point-vpn-zero-day-exploited-in-the-wild-cve-2026-50751/",
      "https://www.bleepingcomputer.com/news/security/cisa-orders-feds-to-patch-check-point-flaw-exploited-by-ransomware-gangs/"
    ],
    publishedDate: "2026-06-08",
    lastUpdatedDate: "2026-06-09",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["check-point", "vpn", "remote-access", "mobile-access", "ikev1", "security", "kev", "actively-exploited", "authentication-bypass", "qilin", "ransomware", "patch"]
  },
  {
    id: "2026-06-08-cisa-kev-litellm-magento-mirasvit",
    appName: "BerriAI LiteLLM / Mirasvit Full Page Cache Warmer (Magento)",
    vendor: "Multiple (CISA KEV)",
    category: "Security Vulnerability",
    severity: "High",
    title: "CISA adds exploited LiteLLM and Magento (Mirasvit) RCE flaws to KEV",
    summary:
      "On June 8, 2026 CISA added two actively exploited flaws to its Known Exploited Vulnerabilities catalog. CVE-2026-42271 (CVSS 8.7) is a command-injection issue in BerriAI LiteLLM's MCP-server preview functionality that lets an authenticated user run commands on the host; researchers chained it with the Starlette \"BadHost\" bypass CVE-2026-48710 to achieve unauthenticated remote code execution, exposing model-provider credentials and API keys (federal deadline June 22). Separately, CVE-2026-45247 (CVSS 9.8), added to KEV June 3, is an unauthenticated PHP-deserialization RCE in the Mirasvit Full Page Cache Warmer extension for Magento 2 / Adobe Commerce, exploited via a crafted CacheWarmer cookie; Mirasvit patched it in version 1.11.12 on May 25, 2026.",
    affectedUsers:
      "Teams running self-hosted BerriAI LiteLLM AI gateways (especially internet-facing or with MCP preview enabled), and any Magento 2 / Adobe Commerce storefront using the Mirasvit Full Page Cache Warmer extension below version 1.11.12.",
    recommendedMspAction:
      "Inventory any LiteLLM deployments, restrict network exposure, update to a fixed release, and rotate model-provider credentials and API keys that the proxy could reach. For Magento/Adobe Commerce sites, confirm whether the Mirasvit Full Page Cache Warmer extension is installed and upgrade to 1.11.12 or later immediately; review web logs for serialized-object payloads in the CacheWarmer cookie and check for signs of code execution on affected stores.",
    sourceUrls: [
      "https://www.cisa.gov/news-events/alerts/2026/06/08/cisa-adds-two-known-exploited-vulnerabilities-catalog",
      "https://thehackernews.com/2026/06/litellm-flaw-cve-2026-42271-exploited.html",
      "https://thehackernews.com/2026/06/cisa-adds-exploited-magento-rce-flaw.html",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    publishedDate: "2026-06-08",
    lastUpdatedDate: "2026-06-09",
    suggestedPlacement: "news-page",
    audience: "internal",
    isPublished: true,
    isPlaceholder: false,
    tags: ["cisa", "kev", "litellm", "ai-gateway", "magento", "adobe-commerce", "mirasvit", "rce", "deserialization", "command-injection", "security", "actively-exploited"]
  },
  // -- LATEST PUBLISHED FINDINGS (2026-06-05 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-06-05.
  {
    id: "2026-06-03-microsoft-teams-private-channel-remediation-july",
    appName: "Microsoft Teams",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Medium",
    title: "Microsoft extends Teams private-channel remediation deadline to end of July",
    summary:
      "Microsoft updated Message Center post MC1134737 on June 3, 2026: Teams private-channel migration is complete except for channels that need admin remediation. Ownerless private channels and channels with only guests and no in-tenant owner now need an in-tenant owner added by the end of July 2026, otherwise impacted channels will be soft deleted for 30 days and then permanently deleted. The change also moves private-channel compliance copies to the team group mailbox and raises private-channel limits once migration completes.",
    affectedUsers:
      "Microsoft Teams tenants with ownerless private channels, empty private channels, guest-only private channels, or compliance/eDiscovery/retention policies scoped to private-channel user mailboxes.",
    recommendedMspAction:
      "Run Get-TenantPrivateChannelMigrationStatus, identify ownerless or guest-only channels, add an in-tenant owner, and confirm Purview retention, legal hold, DLP, and eDiscovery policies are scoped to the parent team's group mailbox as needed. Update any June 5 runbooks: the latest archived Microsoft message shows the remediation deadline moved to the end of July 2026.",
    sourceUrls: [
      "https://mc.merill.net/message/MC1134737",
      "https://learn.microsoft.com/en-us/MicrosoftTeams/private-channels"
    ],
    publishedDate: "2026-06-03",
    lastUpdatedDate: "2026-06-05",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "teams", "private-channels", "compliance", "purview", "message-center", "admin-action"]
  },
  {
    id: "2026-06-03-autodesk-fusion-mobile-team-incidents",
    appName: "Fusion Mobile / Fusion Team",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk resolves Fusion Mobile upload and Fusion Team BOM incidents",
    summary:
      "Autodesk Health shows June 3 resolved Fusion incidents: a retroactive Fusion Mobile file-upload failure that ran from June 2 at 6:30 AM PDT until June 3 at 6:30 AM PDT, and a Fusion Team issue where customers were unable to view the BOM (Bill of Materials) and Properties tabs until Autodesk marked it resolved at 7:33 AM PDT.",
    affectedUsers:
      "Fusion Mobile users uploading files during the June 2-3 incident window, and Fusion Team users trying to view BOM or Properties tabs on June 3.",
    recommendedMspAction:
      "Tie matching June 2-3 upload, BOM, or Properties-tab tickets to the Autodesk Health incidents and ask affected users to retry now that Autodesk reports resolution. If symptoms persist, capture the hub/project, file or item, affected tab, timestamp, and Autodesk account before escalating.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-06-03",
    lastUpdatedDate: "2026-06-05",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "fusion", "fusion-mobile", "fusion-team", "bom", "properties", "service-impact"]
  },
  {
    id: "2026-06-03-google-chromeos-stable-lts-security-updates",
    appName: "ChromeOS / ChromeOS Flex",
    vendor: "Google",
    category: "Security Vulnerability",
    severity: "High",
    title: "Google rolls ChromeOS Stable and LTS security updates",
    summary:
      "On June 3, Google promoted ChromeOS Stable M-148 platform 16640.57.0 (browser 148.0.7778.250) and ChromeOS LTS-144 version 144.0.7559.254. Stable includes a high-severity Linux local privilege escalation fix (CVE-2026-43284), while LTS-144 includes selected security fixes including critical use-after-free issues in Proxy, Network, and Extensions.",
    affectedUsers:
      "Managed ChromeOS and ChromeOS Flex fleets on the Stable M-148 or LTS-144 channels, especially shared devices, kiosks, labs, loaners, and admin workstations that delay restarts.",
    recommendedMspAction:
      "Confirm ChromeOS auto-update policies are healthy, verify version reporting after rollout, and ask users to restart devices that have downloaded but not applied the update. Prioritize shared or privileged-use devices and keep a small validation ring for clients with tightly controlled browser/device policies.",
    sourceUrls: [
      "https://chromereleases.googleblog.com/2026/06/stable-channel-update-for-chromeos.html",
      "https://chromereleases.googleblog.com/2026/06/long-term-support-channel-update-for.html"
    ],
    publishedDate: "2026-06-03",
    lastUpdatedDate: "2026-06-05",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["google", "chromeos", "chromeos-flex", "lts", "security", "patch", "cve", "device-management"]
  },
  {
    id: "2026-06-02-microsoft-exchange-online-mail-flow-delays-ex1331830",
    appName: "Exchange Online",
    vendor: "Microsoft",
    category: "Outage",
    severity: "High",
    title: "Exchange Online mail-flow incident causes delays and failures across multiple regions (EX1331830)",
    summary:
      "On June 2, 2026 Microsoft acknowledged Exchange Online incident EX1331830 after customers reported delayed or failed mail flow. Public service-health text cited affected customers across North America, APAC, and Europe, with SMTP deferral errors and abrupt connection closures while Microsoft analyzed mail queue backlogs.",
    affectedUsers:
      "Exchange Online tenants sending or receiving email during the June 2 incident window, especially users seeing delayed delivery, undelivered mail, SMTP deferrals, or mail-flow connector failures.",
    recommendedMspAction:
      "Check Microsoft 365 Service Health for EX1331830, attach the incident to matching tickets, run message trace for delayed or undelivered messages, and avoid emergency routing changes unless Microsoft directs them. For any postmortem or SLA review, record tenant, sender, recipient, message ID, timestamps, and the exact SMTP error.",
    sourceUrls: [
      "https://status.cloud.microsoft/",
      "https://www.bleepingcomputer.com/news/microsoft/microsoft-exchange-online-outage-causes-email-delays-failures/"
    ],
    publishedDate: "2026-06-02",
    lastUpdatedDate: "2026-06-05",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "exchange-online", "microsoft-365", "mail-flow", "outage", "ex1331830", "smtp", "email-delays"]
  },
  {
    id: "2026-06-02-google-android-june-security-cve-2025-48595",
    appName: "Android / Google Play Protect",
    vendor: "Google",
    category: "Security Vulnerability",
    severity: "High",
    title: "Android June security update patches exploited Framework flaw CVE-2025-48595",
    summary:
      "Google's June 2026 Android Security Bulletin covers the 2026-06-01 and 2026-06-05 patch levels and notes indications that CVE-2025-48595 may be under limited, targeted exploitation. The high-severity Framework issue affects Android 14, 15, 16, and 16 QPR2, and NVD/CISA list it in KEV with a June 5 federal mitigation due date; the bulletin also includes critical Framework fixes.",
    affectedUsers:
      "Managed Android devices on Android 14, 15, 16, or 16 QPR2, plus any BYOD Android devices allowed to access business mail, files, VPN, or administrative apps.",
    recommendedMspAction:
      "Push June 2026 Android security updates through MDM, prioritize devices that can reach the 2026-06-05 patch level, and flag stale Android 14-16 devices as compliance exceptions until patched. Keep Google Play Protect enabled and remind users not to sideload apps while targeted exploitation is being investigated.",
    sourceUrls: [
      "https://source.android.com/docs/security/bulletin/2026/2026-06-01",
      "https://nvd.nist.gov/vuln/detail/CVE-2025-48595",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2025-48595"
    ],
    publishedDate: "2026-06-02",
    lastUpdatedDate: "2026-06-05",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["google", "android", "mobile", "security", "cve-2025-48595", "kev", "actively-exploited", "patch"]
  },
  {
    id: "2026-05-29-microsoft-365-archive-file-level-preview",
    appName: "SharePoint Online / Microsoft 365 Archive",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Low",
    title: "Microsoft 365 Archive file-level archiving enters public preview",
    summary:
      "Microsoft Message Center post MC1326254 says file-level archiving for Microsoft 365 Archive is available in public preview, with worldwide general availability beginning in late June 2026 and expected to complete by late July. Admins must enable Microsoft 365 Archive and file-level archiving; archived SharePoint files remain visible with metadata, permissions, and compliance coverage but cannot be opened until reactivated, are excluded from Copilot responses and default search, and use pay-as-you-go archive billing.",
    affectedUsers:
      "SharePoint Online administrators, records/content owners, and users in tenants that enable Microsoft 365 Archive file-level archiving.",
    recommendedMspAction:
      "Decide whether to enable the preview per tenant or site, document user impact before rollout, and update support notes so archived files are not misdiagnosed as missing or permission-broken. Review billing, search, Copilot, retention, and reactivation expectations with data owners before broad enablement.",
    sourceUrls: [
      "https://mc.merill.net/message/MC1326254",
      "https://www.microsoft.com/microsoft-365/roadmap?featureid=477371"
    ],
    publishedDate: "2026-05-29",
    lastUpdatedDate: "2026-06-05",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "microsoft-365", "sharepoint-online", "archive", "file-level-archiving", "copilot", "storage", "product-change"]
  },
  {
    id: "2026-05-27-esri-arcgis-server-security-2026-update-2",
    appName: "ArcGIS Server",
    vendor: "Esri",
    category: "Security Vulnerability",
    severity: "High",
    title: "Esri releases ArcGIS Server Security 2026 Update 2 patch",
    summary:
      "Esri published ArcGIS Server Security 2026 Update 2 Patch for ArcGIS Server 12.0, 11.5, 11.4, 11.3, and 11.1. The patch addresses ArcGIS Server security vulnerabilities including BUG-000184499 and BUG-000181376, stops and restarts the ArcGIS Server service during installation, and is the last patch for version 11.4 because ArcGIS Enterprise 11.4 moved to Mature Support on May 1, 2026.",
    affectedUsers:
      "Organizations running ArcGIS Enterprise / ArcGIS Server 12.0, 11.5, 11.4, 11.3, or 11.1, especially internet-facing GIS portals, map services, feature services, and high-availability deployments.",
    recommendedMspAction:
      "Schedule a maintenance window, back up the Enterprise deployment, test the patch, and apply it first to exposed or high-risk ArcGIS Server environments. Warn users about the ArcGIS Server restart, verify published services afterward, and plan an upgrade path for 11.4 sites because this is its final security patch.",
    sourceUrls: [
      "https://support.esri.com/en-us/patches-updates/2026/arcgis-server-security-2026-update-2-patch",
      "https://www.esri.com/arcgis-blog/products/arcgis-enterprise/administration/may-2026-arcgis-security-bulletin"
    ],
    publishedDate: "2026-05-27",
    lastUpdatedDate: "2026-06-05",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["esri", "arcgis-server", "arcgis-enterprise", "security", "patch", "gis", "server"]
  },
  // -- LATEST PUBLISHED FINDINGS (2026-06-02 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-06-02.
  {
    id: "2026-06-01-microsoft-365-office-teams-file-open-outage-mo1329446",
    appName: "Office for the web / Microsoft Teams / SharePoint Online",
    vendor: "Microsoft",
    category: "Outage",
    severity: "High",
    title: "Microsoft 365 outage blocked opening files in Office for the web and Teams (MO1329446)",
    summary:
      "On June 1, 2026 Microsoft tracked incident MO1329446 after users were unable to open files in Office for the web (Word, Excel, PowerPoint) and Microsoft Teams. Microsoft saw elevated error rates across Office for the web and pointed to a cross-service backend dependency. The impact lasted roughly six hours from detection to full restoration and Microsoft confirmed the impact is no longer occurring.",
    affectedUsers:
      "Microsoft 365 users opening shared Word, Excel, or PowerPoint files in Microsoft Teams or in the browser-based Office for the web apps during the June 1 incident window.",
    recommendedMspAction:
      "Treat June 1 reports of files that would not open in Teams or Office for the web (endless loading spinners or load errors) as vendor-side, matched to incident MO1329446 in the Microsoft 365 admin center. Confirm file open now works in a browser and in Teams; for any tenant still seeing errors, check Service Health and the final MO1329446 post before escalating to Microsoft Support.",
    sourceUrls: [
      "https://status.cloud.microsoft/",
      "https://www.bleepingcomputer.com/news/microsoft/microsoft-investigates-office-apps-teams-file-access-issues/",
      "https://www.neowin.net/news/microsoft-confirms-outage-affecting-office-files-and-teams/"
    ],
    publishedDate: "2026-06-01",
    lastUpdatedDate: "2026-06-02",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "microsoft-365", "office-for-the-web", "teams", "sharepoint", "outage", "file-access", "mo1329446"]
  },
  {
    id: "2026-05-29-palo-alto-pan-os-globalprotect-cve-2026-0257-kev",
    appName: "PAN-OS / GlobalProtect",
    vendor: "Palo Alto Networks",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Palo Alto PAN-OS GlobalProtect authentication-override bypass (CVE-2026-0257) actively exploited, added to CISA KEV",
    summary:
      "CVE-2026-0257 is an authentication bypass in the PAN-OS GlobalProtect portal/gateway \"authentication override\" feature that lets a remote unauthenticated attacker forge authentication-override cookies and establish unauthorized VPN connections. It is exploitable only when the certificate used to encrypt these cookies is shared with another feature such as the portal/gateway HTTPS service. Palo Alto published its advisory May 13; Rapid7 observed exploitation starting May 17, and CISA added the CVE to the Known Exploited Vulnerabilities catalog on May 29 with a federal mitigation deadline of June 1. This is a separate issue from the earlier User-ID Authentication Portal RCE CVE-2026-0300.",
    affectedUsers:
      "Organizations running PAN-OS GlobalProtect portals or gateways that use the non-default authentication-override feature with a shared certificate, especially where GlobalProtect is internet-facing.",
    recommendedMspAction:
      "Apply the fixed PAN-OS release for the deployed branch. Until patched, ensure the authentication-override cookie certificate is not shared with the portal/gateway HTTPS service, and review GlobalProtect authentication logs for unexpected VPN sessions or full IP assignments around mid-to-late May. Track the CISA KEV June 1 deadline and do not confuse this with the separate CVE-2026-0300 Captive Portal RCE.",
    sourceUrls: [
      "https://security.paloaltonetworks.com/CVE-2026-0257",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://www.bleepingcomputer.com/news/security/palo-alto-globalprotect-vpn-auth-bypass-flaw-now-exploited-in-attacks/",
      "https://www.rapid7.com/blog/post/etr-rapid7-observed-exploitation-of-pan-os-globalprotect-authentication-bypass-vulnerability-cve-2026-0257/"
    ],
    publishedDate: "2026-05-29",
    lastUpdatedDate: "2026-06-02",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["palo-alto-networks", "pan-os", "globalprotect", "vpn", "security", "kev", "actively-exploited", "authentication-bypass", "patch"]
  },
  {
    id: "2026-05-30-microsoft-365-exchange-shared-calendar-meetings",
    appName: "Exchange Online / Outlook",
    vendor: "Microsoft",
    category: "Service Impact",
    severity: "Medium",
    title: "Exchange Online issue blocks creating online meetings from shared calendar events",
    summary:
      "Starting around May 30, 2026 Microsoft reported a service degradation in Exchange Online where some users were unable to create new online meetings from shared calendar events. Microsoft traced it to a recent service update that introduced an issue in an authorization component of the calendar service. Existing shared-calendar events are unaffected, and Microsoft was developing and validating a code fix.",
    affectedUsers:
      "Outlook / Exchange Online users who schedule Teams or other online meetings directly from a shared calendar (for example delegates and assistants booking on a manager's calendar).",
    recommendedMspAction:
      "Tell affected users the documented workaround: create the online meeting from their own personal calendar and add the shared calendar's owner or attendees, rather than creating it from the shared calendar event. Match reports to the Exchange Online advisory in the Microsoft 365 admin center and watch Message Center for the code-fix deployment timeline before treating it as a client or permissions problem.",
    sourceUrls: [
      "https://status.cloud.microsoft/",
      "https://learn.microsoft.com/en-us/microsoft-365/enterprise/view-service-health?view=o365-worldwide"
    ],
    publishedDate: "2026-05-30",
    lastUpdatedDate: "2026-06-02",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "microsoft-365", "exchange-online", "outlook", "calendar", "shared-calendar", "teams-meetings", "service-impact"]
  },
  {
    id: "2026-06-02-google-chrome-149-stable",
    appName: "Google Chrome",
    vendor: "Google",
    category: "Product Change",
    severity: "Low",
    title: "Chrome 149 reaches broad desktop stable",
    summary:
      "Google's Chrome 149 stable release reached broad desktop rollout around June 2, 2026 (Chrome 149.0.7827.x for Windows and Mac), following the late-May early-stable wave. As with every milestone, the stable channel ships the latest Chromium security fixes and the update completes only after users relaunch the browser.",
    affectedUsers:
      "Managed Chrome users on Windows, macOS, Linux, and mobile as the 149 stable milestone rolls out fleet-wide.",
    recommendedMspAction:
      "Keep Chrome auto-update policies enabled and watch managed-browser version reporting as 149 lands. Prompt users to relaunch where the update is staged but not applied, and prioritize shared workstations, kiosks, and browsers used for privileged admin portals. Validate any extension or browser-policy dependencies on a small test ring if a client tightly controls browser updates.",
    sourceUrls: [
      "https://chromereleases.googleblog.com/",
      "https://chromereleases.googleblog.com/2026/05/early-stable-update-for-desktop.html"
    ],
    publishedDate: "2026-06-02",
    lastUpdatedDate: "2026-06-02",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["google", "chrome", "browser", "stable", "product-change", "patch"]
  },
  {
    id: "2026-05-27-cisa-kev-supply-chain-daemon-tools-tanstack-nx",
    appName: "DAEMON Tools Lite / TanStack npm / Nx Console",
    vendor: "Multiple (CISA KEV)",
    category: "Security Vulnerability",
    severity: "High",
    title: "CISA adds three actively exploited supply-chain compromises to KEV (Daemon Tools Lite, TanStack, Nx Console)",
    summary:
      "On May 27, 2026 CISA added three supply-chain compromises to its Known Exploited Vulnerabilities catalog with a June 10 federal remediation deadline: CVE-2026-8398, trojanized DAEMON Tools Lite installers (DTHelper.exe, DiscSoftBusServiceLite.exe, DTShellHlp.exe) distributed with valid code-signing from daemon-tools.cc between April and May 2026; CVE-2026-45321, 42 compromised @tanstack npm packages published via abused GitHub Actions trusted-publisher workflows; and CVE-2026-48027, a malicious Nx Console extension (v18.95.0) briefly published to the Visual Studio Marketplace and OpenVSX on May 19.",
    affectedUsers:
      "Endpoints that installed DAEMON Tools Lite in the April-May window, developer machines and CI pipelines that pulled affected @tanstack npm packages, and developer workstations that installed the malicious Nx Console extension on May 19.",
    recommendedMspAction:
      "Hunt for and remove the trojanized DAEMON Tools Lite binaries on any endpoint where it was installed, and reimage if compromise is confirmed. Audit npm lockfiles and CI build logs for affected @tanstack package versions and pin/rollback to known-good releases. Check developer IDEs for Nx Console v18.95.0 and remove it. Rotate any developer or CI credentials that may have been exposed to the compromised tooling.",
    sourceUrls: [
      "https://www.cisa.gov/news-events/alerts/2026/05/27/cisa-adds-three-known-exploited-vulnerabilities-catalog",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://securityaffairs.com/192776/security/u-s-cisa-adds-daemon-tools-tanstack-and-nx-console-flaws-to-its-known-exploited-vulnerabilities-catalog.html"
    ],
    publishedDate: "2026-05-27",
    lastUpdatedDate: "2026-06-02",
    suggestedPlacement: "news-page",
    audience: "internal",
    isPublished: true,
    isPlaceholder: false,
    tags: ["cisa", "kev", "supply-chain", "daemon-tools", "tanstack", "npm", "nx-console", "security", "actively-exploited", "developer-tools"]
  },
  {
    id: "2026-05-29-autodesk-forma-reports-admin-console-incidents",
    appName: "Autodesk Forma / Fusion",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk resolves Forma Reports and Admin Console incidents from May 29-30",
    summary:
      "Autodesk Health logged short, resolved incidents at the end of May: on May 29 customers were unable to generate reports for newly created Forms in Forma - Reports (a retroactive notice, identified ~3:04 AM PDT and resolved ~7:30 AM PDT), and Autodesk's most recent end-of-May incident touched the Forma Admin Console and Fusion. Services were reported operational afterward.",
    affectedUsers:
      "Autodesk Forma users generating reports for newly created Forms or using the Forma Admin Console, and Fusion users, during the May 29-30 incident windows.",
    recommendedMspAction:
      "If users reported Forma report-generation or Admin Console errors on May 29-30, ask them to retry and confirm reports now generate. Match any matching tickets to the Autodesk Health incidents and close as vendor-side once retries succeed; capture the project, object, and timestamp before escalating only if symptoms persist.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-29",
    lastUpdatedDate: "2026-06-02",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "forma", "forma-reports", "admin-console", "fusion", "service-impact"]
  },
  // -- LATEST PUBLISHED FINDINGS (2026-05-28 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-05-28.
  {
    id: "2026-05-27-autodesk-revit-cloud-worksharing-outage",
    appName: "Revit Cloud Worksharing / Cloud Models",
    vendor: "Autodesk",
    category: "Outage",
    severity: "Medium",
    title: "Autodesk Revit Cloud Worksharing outage briefly blocked access to cloud models",
    summary:
      "Autodesk reported an outage affecting Revit Cloud Worksharing / Cloud Models beginning around 4:47 AM UTC on May 27, 2026. Users were intermittently unable to access cloud workshared and cloud models from Revit. The incident lasted approximately one hour and was resolved the same day; services are confirmed operational.",
    affectedUsers:
      "Project teams using Revit Cloud Worksharing, Cloud Models, Autodesk Docs, BIM 360, or Autodesk Construction Cloud workflows that open or sync cloud-hosted Revit models during the early-morning May 27 UTC window.",
    recommendedMspAction:
      "Reconcile any May 27 tickets reporting 'unable to access cloud workshared models' or cloud worksharing communication errors as vendor-side if symptoms match the incident window and users can now sync normally. For lingering local errors, have users restart Revit and re-open the cloud model; if problems persist, check Autodesk Health before opening a support case.",
    sourceUrls: [
      "https://health.autodesk.com/",
      "https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/Unable-to-access-Cloud-Workshared-and-Cloud-Models-from-Revit-home-page.html"
    ],
    publishedDate: "2026-05-27",
    lastUpdatedDate: "2026-05-28",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "revit", "cloud-worksharing", "cloud-models", "bim-360", "construction-cloud", "outage"]
  },
  {
    id: "2026-05-25-microsoft-365-admin-center-usage-reports-issue",
    appName: "Microsoft 365 admin center",
    vendor: "Microsoft",
    category: "Service Impact",
    severity: "Low",
    title: "Some admins temporarily unable to view usage reports in Microsoft 365 admin center",
    summary:
      "Microsoft reported a service issue on May 25, 2026 in which some administrators were unable to view usage reports in the Microsoft 365 admin center. The problem was limited to reporting/analytics views and did not affect end-user access to Microsoft 365 services. Microsoft resolved the issue.",
    affectedUsers:
      "Microsoft 365 administrators attempting to open usage and activity reports in the Microsoft 365 admin center during the May 25 incident window. End users and core services were not affected.",
    recommendedMspAction:
      "Treat any May 25 reports of blank or failing M365 admin-center usage reports as vendor-side. Confirm reporting views now load; if a specific tenant still shows missing data, check the Microsoft 365 Service Health dashboard and Message Center for the related advisory before escalating to Microsoft Support.",
    sourceUrls: [
      "https://status.cloud.microsoft/",
      "https://learn.microsoft.com/en-us/microsoft-365/enterprise/view-service-health?view=o365-worldwide"
    ],
    publishedDate: "2026-05-25",
    lastUpdatedDate: "2026-05-28",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "microsoft-365", "admin-center", "usage-reports", "service-impact", "reporting"]
  },
  // -- LATEST PUBLISHED FINDINGS (2026-05-26 scan) -----------------------------
  // Reviewed from current vendor/status/security sources on 2026-05-26.
  {
    id: "2026-05-24-microsoft-365-exchange-entra-mfa-outage",
    appName: "Exchange Online / Microsoft Teams / Entra ID",
    vendor: "Microsoft",
    category: "Outage",
    severity: "High",
    title: "Microsoft 365 outage disrupts Exchange Online, Teams, and Entra MFA authentication",
    summary:
      "A Microsoft infrastructure issue starting at 11:00 PM UTC on May 24 caused intermittent failures for users accessing Exchange Online and Microsoft Teams, and blocked Multi-Factor Authentication (MFA) messages via Microsoft Entra. Microsoft attributed the outage to SQL infrastructure backing Exchange Online not performing efficiently, with downstream impact on Entra SSO. Services were confirmed operational by May 26.",
    affectedUsers:
      "Microsoft 365 users accessing Exchange Online and Teams, and users of any application relying on Entra ID SSO or MFA for sign-in during the May 24-25 UTC incident window.",
    recommendedMspAction:
      "Reconcile affected Exchange, Teams, and Entra sign-in tickets as vendor-side if symptoms match the May 24-25 UTC window and users can now authenticate successfully. For any remaining MFA failures, verify Conditional Access policies, check Entra sign-in logs for that window, and contact Microsoft Support if persistent auth issues remain. Review whether MFA fallback options or SSPR are configured for tenants that experienced extended lockouts.",
    sourceUrls: [
      "https://www.bleepingcomputer.com/news/microsoft/microsoft-365-outage-blocks-access-to-teams-exchange-online/",
      "https://www.techzine.eu/news/applications/135283/microsoft-365-outage-disrupts-teams-and-exchange-access-globally/"
    ],
    publishedDate: "2026-05-24",
    lastUpdatedDate: "2026-05-26",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "microsoft-365", "exchange-online", "teams", "entra-id", "mfa", "outage", "authentication", "sso"]
  },
  {
    id: "2026-05-30-autodesk-account-maintenance",
    appName: "Autodesk account",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk account scheduled maintenance on May 30 may cause intermittent disruptions",
    summary:
      "Autodesk has scheduled maintenance for the Autodesk account service on May 30, 2026 from 10:00 AM to 1:00 PM PDT to improve platform resiliency. Intermittent sign-in or account access issues may occur during the window.",
    affectedUsers:
      "Users and admins signing in to Autodesk account or performing account management tasks — such as license assignments, user provisioning, or subscription management — during the May 30 maintenance window.",
    recommendedMspAction:
      "Advise clients to avoid scheduling Autodesk account management tasks, license assignments, or new user provisioning during the May 30 10:00 AM – 1:00 PM PDT window. If sign-in or account access fails during that period, check Autodesk Health before opening a support ticket.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-26",
    lastUpdatedDate: "2026-05-26",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "autodesk-account", "maintenance", "scheduled-maintenance", "licensing"]
  },
  {
    id: "2026-05-24-autodesk-fusion-automated-modeling-us",
    appName: "Autodesk Fusion",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Medium",
    title: "Autodesk Fusion automated modeling job submissions failed for US region users",
    summary:
      "On May 24, Autodesk identified an issue where customers were unable to submit new automated modeling jobs and encountered errors when triggering workflows within Fusion in the US region. The issue began at approximately 07:55 AM PDT and was resolved at 12:22 PM PDT.",
    affectedUsers:
      "Autodesk Fusion users in the US region attempting to submit or trigger automated modeling jobs on May 24 between approximately 07:55 AM and 12:22 PM PDT.",
    recommendedMspAction:
      "If users reported Fusion automated modeling errors on May 24, ask them to retry and verify jobs complete successfully. For jobs that failed or were left queued during the window, check whether they need to be resubmitted and confirm results were not lost before closing related tickets.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-24",
    lastUpdatedDate: "2026-05-26",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "fusion", "automated-modeling", "service-impact", "us-region"]
  },
  {
    id: "2026-05-23-zoom-mail-calendar-mms-presence-resolved",
    appName: "Zoom Mail / Calendar / Phone / Contact Center",
    vendor: "Zoom",
    category: "Service Impact",
    severity: "Medium",
    title: "Zoom marks mail, calendar, MMS, and presence incidents resolved",
    summary:
      "Zoom status history now shows the Web Zoom Mail and Web Calendar degradation restored and resolved on May 23. Zoom also resolved separate May 22 incidents affecting North America presence interoperability and inbound/outbound MMS delivery for Zoom Phone and Zoom Contact Center in the US and Canada.",
    affectedUsers:
      "Zoom users affected by Web Zoom Mail or Web Calendar degradation from May 18-23, Zoom Phone or Contact Center users with MMS delivery issues in the US and Canada, and North America users relying on Zoom presence interoperability on May 22.",
    recommendedMspAction:
      "Reconcile matching Zoom tickets as vendor-side once users can retry successfully. For persistent issues, collect the affected Zoom service, region, user, phone number or meeting context, timestamp, and whether the symptom is mail/calendar access, MMS delivery, or presence status.",
    sourceUrls: [
      "https://status.zoom.us/"
    ],
    publishedDate: "2026-05-23",
    lastUpdatedDate: "2026-05-24",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["zoom", "zoom-mail", "zoom-calendar", "zoom-phone", "contact-center", "mms", "presence", "service-impact", "north-america"]
  },
  {
    id: "2026-05-22-google-chromeos-lts-144-security-fixes",
    appName: "ChromeOS / ChromeOS Flex",
    vendor: "Google",
    category: "Security Vulnerability",
    severity: "High",
    title: "Google rolls ChromeOS LTS-144 security update with multiple high-severity fixes",
    summary:
      "Google released ChromeOS LTS-144 version 144.0.7559.252 on May 22. The release includes selected security fixes, including high-severity use-after-free and out-of-bounds-read issues in Navigation, Viz, Blink, CSS, Media, Web Speech, and Extensions.",
    affectedUsers:
      "Managed ChromeOS and ChromeOS Flex devices pinned to the LTS-144 channel before version 144.0.7559.252.",
    recommendedMspAction:
      "Confirm ChromeOS LTS devices are allowed to update, then verify fleet version reporting after rollout. Ask users to restart devices that have downloaded the update but have not applied it, and prioritize shared kiosks, loaners, and classroom or conference-room devices that stay signed in for long periods.",
    sourceUrls: [
      "https://chromereleases.googleblog.com/"
    ],
    publishedDate: "2026-05-22",
    lastUpdatedDate: "2026-05-24",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["google", "chromeos", "chromeos-flex", "lts", "security", "patch", "browser", "managed-devices"]
  },
  {
    id: "2026-05-21-autodesk-forma-fptr-data-incidents",
    appName: "Forma Build / Forma Carbon Insights / FPTR",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk resolves Forma and FPTR data incidents from May 19-21",
    summary:
      "Autodesk Health shows resolved May 21 incidents for Forma Build sheet uploads in the US region and Forma Carbon Insights data retrieval or viewing in the US region. Autodesk also posted a retroactive FPTR notice for missing user-login and attachment-view events on May 19.",
    affectedUsers:
      "Autodesk Forma users uploading sheets or viewing Carbon Insights data in the US region, and Flow Production Tracking admins or users reviewing login and attachment-view activity from the May 19 window.",
    recommendedMspAction:
      "If users reported Forma upload or Carbon Insights errors on May 21, ask them to retry before deeper troubleshooting. For audit questions around FPTR activity on May 19, note Autodesk's retroactive incident and capture the site, user, object, and timestamp before escalation.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-24",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "forma-build", "forma-carbon-insights", "fptr", "flow-production-tracking", "service-impact", "us-region", "aec"]
  },
  {
    id: "2026-05-19-mozilla-firefox-151-esr-thunderbird-security-updates",
    appName: "Firefox / Firefox ESR / Thunderbird",
    vendor: "Mozilla",
    category: "Security Vulnerability",
    severity: "High",
    title: "Mozilla ships Firefox 151, ESR, iOS, and Thunderbird security updates",
    summary:
      "Mozilla's May 19 advisories cover Firefox 151, Firefox ESR 140.11 and 115.36, Firefox for iOS 151.0, Thunderbird 151, and Thunderbird 140.11. The Firefox 151 advisory includes high-impact issues such as an Android sandbox escape, WebCodecs boundary-condition bugs, DOM use-after-free, same-origin-policy bypass, and memory-safety fixes.",
    affectedUsers:
      "Endpoints running Firefox below 151, Firefox ESR below 140.11 or 115.36, Firefox for iOS below 151.0, or Thunderbird below the May 19 security releases.",
    recommendedMspAction:
      "Push Firefox, Firefox ESR, and Thunderbird updates through endpoint management and prompt users to relaunch. Confirm managed browser and mail-client inventory after rollout, with extra attention to portable installs and machines that keep browser sessions open for days.",
    sourceUrls: [
      "https://www.mozilla.org/en-US/security/advisories/",
      "https://www.mozilla.org/en-US/security/advisories/mfsa2026-46/",
      "https://www.mozilla.org/en-US/security/advisories/mfsa2026-48/",
      "https://www.mozilla.org/en-US/security/advisories/mfsa2026-50/"
    ],
    publishedDate: "2026-05-19",
    lastUpdatedDate: "2026-05-24",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["mozilla", "firefox", "firefox-esr", "thunderbird", "browser", "email", "security", "patch", "memory-safety"]
  },
  {
    id: "2026-05-22-box-drive-login-errors",
    appName: "Box Drive",
    vendor: "Box",
    category: "Service Impact",
    severity: "Medium",
    title: "Box Drive login errors and timeouts resolved early May 22",
    summary:
      "Box reported a medium-severity issue on May 22 where users attempting to log in to Box Drive could see errors or timeouts. Box restored service and marked the incident resolved after monitoring, with the Box Web Application available as a temporary workaround during the incident.",
    affectedUsers:
      "Users signing in to Box Drive on desktop during the May 22 incident window.",
    recommendedMspAction:
      "If users reported Box Drive sign-in errors around 1:46-2:18 AM PDT on May 22, treat matching tickets as vendor-side once retry succeeds. If errors continue, have the user test the Box Web Application and collect Box Drive logs before escalating to Box Support.",
    sourceUrls: [
      "https://status.box.com/"
    ],
    publishedDate: "2026-05-22",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["box", "box-drive", "login", "desktop", "service-impact", "timeout"]
  },
  {
    id: "2026-05-22-docusign-salesforce-integration-impact",
    appName: "Docusign eSignature / Salesforce integration",
    vendor: "Docusign",
    category: "Service Impact",
    severity: "Low",
    title: "Docusign Salesforce integration impact resolved after Salesforce outage",
    summary:
      "Docusign reported that Salesforce experienced an outage beginning May 21 at 23:12 UTC that may have impacted customers using Docusign's Salesforce integration. Docusign stated its own services were not experiencing an outage, and marked the integration impact resolved after Salesforce recovered on May 22.",
    affectedUsers:
      "Docusign customers who use the Salesforce integration for envelope, agreement, or CRM workflows.",
    recommendedMspAction:
      "For Salesforce-connected Docusign failures reported late May 21 or early May 22 UTC, note Docusign incident 4935 and ask users to retry after Salesforce recovery. If the integration still fails, collect the Salesforce org, Docusign account, envelope ID, and timestamp before escalation.",
    sourceUrls: [
      "https://status.docusign.com/"
    ],
    publishedDate: "2026-05-22",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["docusign", "salesforce", "integration", "service-impact", "esignature", "clm"]
  },
  {
    id: "2026-05-21-microsoft-edge-148-3967-83-copilot-preview",
    appName: "Microsoft Edge",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Medium",
    title: "Edge 148.0.3967.83 opens Browsing with Copilot preview signups",
    summary:
      "Microsoft Edge Stable 148.0.3967.83 was released on May 21. The release notes say Browsing with Copilot for Edge for Business is now open for limited public-preview admin signups, alongside fixes and the normal security-update pointer.",
    affectedUsers:
      "Organizations managing Microsoft Edge for Business, especially tenants evaluating Copilot-assisted browser workflows or tightly controlling enterprise AI features.",
    recommendedMspAction:
      "Review Edge 148.0.3967.83 release notes and decide whether any tenant should request or block the Browsing with Copilot preview. Confirm existing Edge policies around Copilot, browsing assistance, developer tools, and Microsoft 365 authentication popups still match client expectations.",
    sourceUrls: [
      "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "edge", "browser", "copilot", "edge-for-business", "policy", "product-change"]
  },
  {
    id: "2026-05-20-google-chrome-149-early-stable",
    appName: "Google Chrome",
    vendor: "Google",
    category: "Product Change",
    severity: "Low",
    title: "Chrome 149 early stable begins for desktop, Android, and iOS",
    summary:
      "Google began the Chrome 149 early stable rollout on May 20. Chrome 149.0.7827.22/.23 is rolling to a small percentage of Windows and Mac desktop users, Chrome 149.0.7827.22 is rolling to Android, and Chrome Stable 149.0.7827.26 is rolling to iOS.",
    affectedUsers:
      "Managed Chrome users on Windows, macOS, Android, or iOS where early stable rollout may reach a subset of devices before broad stable deployment.",
    recommendedMspAction:
      "Watch managed Chrome version reporting over the next few days, especially for browser-policy or extension regressions. Keep auto-update policies enabled, and use a small test ring if clients tightly control browser updates.",
    sourceUrls: [
      "https://chromereleases.googleblog.com/"
    ],
    publishedDate: "2026-05-20",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["google", "chrome", "browser", "early-stable", "android", "ios", "desktop", "product-change"]
  },
  {
    id: "2026-05-21-autodesk-support-chat-incident",
    appName: "Autodesk Support",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk Support chat contact issue resolved May 21",
    summary:
      "Autodesk Health shows a resolved May 21 incident where customers were unable to contact Autodesk Support via chat. Autodesk began investigating at 15:29 PDT and marked the issue resolved at 16:02 PDT.",
    affectedUsers:
      "Admins and end users trying to reach Autodesk Support via chat during the short May 21 incident window.",
    recommendedMspAction:
      "If Autodesk chat contact attempts failed during the incident window, retry now that Autodesk reports resolution. Use alternate support channels only if chat still fails, and include Autodesk account, product, and timestamp if a support escalation is needed.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "support", "chat", "service-impact"]
  },
  {
    id: "2026-05-21-autodesk-upchain-maintenance-june-6",
    appName: "Autodesk Upchain",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk Upchain maintenance on June 6 may pause GPS job processing",
    summary:
      "Autodesk scheduled Upchain maintenance for June 6, 2026 from 1:00 PM to 3:00 PM PDT to improve platform resiliency. Autodesk says Upchain GPS job processing may be unavailable during the maintenance window.",
    affectedUsers:
      "Upchain users and admins who rely on GPS job processing during the June 6 maintenance window.",
    recommendedMspAction:
      "Avoid planning Upchain GPS job-processing work during the June 6 window. If jobs fail or queue during maintenance, check Autodesk Health before troubleshooting locally and ask users to retry after the window closes.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "upchain", "maintenance", "gps", "service-impact"]
  },
  {
    id: "2026-05-20-microsoft-defender-cves-41091-45498-kev",
    appName: "Microsoft Defender",
    vendor: "Microsoft",
    category: "Security Vulnerability",
    severity: "High",
    title: "Microsoft Defender flaws added to CISA KEV with June 3 mitigation deadline",
    summary:
      "Microsoft published Defender advisories for CVE-2026-41091, a link-following privilege escalation in the Malware Protection Engine, and CVE-2026-45498, a Defender Antimalware Platform denial-of-service flaw. NVD shows both CVEs were added to CISA's Known Exploited Vulnerabilities catalog on May 20, with required mitigation by June 3; affected versions are before Malware Protection Engine 1.1.26040.8 and Defender Antimalware Platform 4.18.26040.7.",
    affectedUsers:
      "Windows endpoints and servers using Microsoft Defender or the Microsoft Malware Protection Engine below the fixed engine/platform versions.",
    recommendedMspAction:
      "Confirm Defender security intelligence, engine, and platform updates are reaching managed endpoints. Prioritize devices where Defender updates are disabled, delayed by WSUS/ConfigMgr rings, or blocked by third-party security tooling, and verify versions are at or above 1.1.26040.8 for the engine and 4.18.26040.7 for the platform.",
    sourceUrls: [
      "https://www.cyber.gc.ca/en/alerts-advisories/microsoft-security-advisory-av26-489",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-41091",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-45498",
      "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-41091",
      "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-45498"
    ],
    publishedDate: "2026-05-20",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "defender", "malware-protection-engine", "security", "kev", "actively-exploited", "cve", "endpoint-security"]
  },
  {
    id: "2026-05-21-zoom-contact-center-call-drops-north-america",
    appName: "Zoom Contact Center",
    vendor: "Zoom",
    category: "Service Impact",
    severity: "Medium",
    title: "Zoom Contact Center inbound and outbound calls briefly dropped in North America",
    summary:
      "Zoom reported that users may have experienced inbound and outbound call drops with Zoom Contact Center in the North America region between 14:59 UTC and 15:15 UTC on May 21. Zoom later marked the incident resolved and said affected services were restored.",
    affectedUsers:
      "Zoom Contact Center customers in North America handling inbound or outbound calls during the May 21 incident window.",
    recommendedMspAction:
      "If users reported dropped contact-center calls around 14:59-15:15 UTC on May 21, attach the Zoom incident to related tickets and treat matching symptoms as vendor-side. Continue watching Zoom status for the separate MMS and web mail/calendar incidents before closing broader Zoom reports.",
    sourceUrls: [
      "https://status.zoom.us/"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-21",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["zoom", "zoom-contact-center", "calling", "service-impact", "north-america", "call-drops"]
  },
  {
    id: "2026-05-19-docusign-esignature-latency-eu-na",
    appName: "Docusign eSignature / CLM",
    vendor: "Docusign",
    category: "Service Impact",
    severity: "Medium",
    title: "Docusign resolved recent sending, signing, and reporting latency incidents",
    summary:
      "Docusign status history shows recent resolved incidents affecting sending and signing latency in EU on May 19, sending and signing latency in NA1 and NA3 on May 18, and report failures/loading delays in EU11 and EU21 on May 18. Current status shows all systems operational.",
    affectedUsers:
      "Docusign users sending or signing envelopes in EU, NA1, or NA3, and admins or users loading document/reporting views in EU11 or EU21 during the May 18-19 incident windows.",
    recommendedMspAction:
      "Use Docusign incident IDs 4915, 4902, and 4896 when reconciling tickets from those windows. Ask users to retry failed sends/signatures now that Docusign reports resolution, and collect envelope IDs plus site/region if any errors persist.",
    sourceUrls: [
      "https://status.docusign.com/"
    ],
    publishedDate: "2026-05-19",
    lastUpdatedDate: "2026-05-21",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["docusign", "esignature", "clm", "service-impact", "latency", "eu", "na"]
  },
  {
    id: "2026-05-18-dropbox-availability-sharing-degradation",
    appName: "Dropbox",
    vendor: "Dropbox",
    category: "Service Impact",
    severity: "Low",
    title: "Dropbox resolved May 18 availability issue affecting sharing and team-member changes",
    summary:
      "Dropbox status history shows a resolved May 18 incident where multiple services experienced slower than expected load times between 17:01:50 and 17:42:50 UTC. Dropbox says the impact included the ability to add members to teams and share content.",
    affectedUsers:
      "Dropbox teams adding members or sharing content during the May 18 incident window.",
    recommendedMspAction:
      "If users reported Dropbox sharing, team-member, or slow-load issues during the May 18 window, close matching tickets as vendor-side once users can retry successfully. Keep the scheduled May 26 maintenance draft separate because it is a future access-impact window.",
    sourceUrls: [
      "https://status.dropbox.com/"
    ],
    publishedDate: "2026-05-18",
    lastUpdatedDate: "2026-05-21",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["dropbox", "service-impact", "sharing", "teams", "availability"]
  },
  {
    id: "2026-05-12-autodesk-identity-authorization-maintenance-june-6",
    appName: "Autodesk Identity, Licensing & Entitlement",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk identity maintenance on June 6 may briefly affect product sign-in",
    summary:
      "Autodesk has scheduled Identity Authorization Service maintenance for June 6, 2026 from 7:30 PM to 8:30 PM PDT. Autodesk says users may intermittently be unable to log in to Autodesk products and services during the window, while users already logged in before maintenance should not be affected.",
    affectedUsers:
      "Autodesk users who need to sign in during the June 6 maintenance window, especially new sessions, newly provisioned users, and users switching devices.",
    recommendedMspAction:
      "Avoid planned Autodesk sign-in, licensing, or onboarding work during the maintenance window. Tell users to stay signed in before the window where practical, and check Autodesk Health before troubleshooting authentication failures during that hour.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-21",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "identity", "licensing", "entitlement", "maintenance", "sign-in", "authentication"]
  },
  {
    id: "2026-05-21-outlook-lite-app-retirement-mc1276508",
    appName: "Outlook Lite (Android)",
    vendor: "Microsoft",
    category: "Deprecation",
    severity: "Low",
    title: "Microsoft completes Outlook Lite app retirement on May 25",
    summary:
      "Microsoft 365 message center notice MC1276508 confirms the Outlook Lite mobile app is fully retired on May 25, 2026. After that date users may still be able to open the app, but mailbox access is disabled and they must move to the standard Outlook for Android app.",
    affectedUsers:
      "Android users on the lightweight Outlook Lite app, often on lower-end or storage-constrained devices.",
    recommendedMspAction:
      "Identify any users still on Outlook Lite and help them install and sign in to the standard Outlook for Android app before May 25. Update onboarding and helpdesk notes so technicians stop recommending Outlook Lite.",
    sourceUrls: [
      "https://mc.merill.net/message/MC1276508"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "outlook-lite", "outlook-mobile", "android", "deprecation", "message-center"]
  },
  {
    id: "2026-05-21-dropbox-scheduled-maintenance-may-26",
    appName: "Dropbox",
    vendor: "Dropbox",
    category: "Service Impact",
    severity: "Informational",
    title: "Dropbox scheduled maintenance on May 26 may briefly interrupt access",
    summary:
      "Dropbox has scheduled routine maintenance starting May 26, 2026 at 5:00 PM Pacific. Dropbox says users may be unable to access the service for a short period during the window.",
    affectedUsers:
      "Dropbox users and teams who may need file access during the May 26 maintenance window.",
    recommendedMspAction:
      "Note the May 26 window and let affected users know Dropbox access may briefly drop. Advise anyone with deadline-sensitive work to sync or download needed files beforehand, and check the Dropbox status page if access problems persist after the window.",
    sourceUrls: [
      "https://status.dropbox.com/"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["dropbox", "maintenance", "service-impact", "file-sync"]
  },
  {
    id: "2026-05-21-autodesk-account-maintenance-may-30",
    appName: "Autodesk Account",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk Account scheduled maintenance on May 30 may interrupt user management",
    summary:
      "Autodesk has scheduled Autodesk Account maintenance for May 30, 2026 from 10:00 AM to 1:00 PM PDT to improve platform resiliency. Autodesk says account and user-management features may be intermittently unavailable during the window.",
    affectedUsers:
      "Admins changing Autodesk account users, assignments, licensing, or account settings during the May 30 maintenance window.",
    recommendedMspAction:
      "Avoid planned Autodesk user-management or licensing changes during the May 30 window. If users report Autodesk account admin issues at that time, check the Autodesk Health dashboard before treating it as a local problem.",
    sourceUrls: [
      "https://health.autodesk.com/"
    ],
    publishedDate: "2026-05-21",
    lastUpdatedDate: "2026-05-22",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "account", "maintenance", "licensing", "admin"]
  },
  {
    id: "2026-05-19-autodesk-account-brief-outage",
    appName: "Autodesk Account",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk Account had a brief service incident on May 19",
    summary:
      "Status monitoring shows Autodesk logged a short Autodesk Account incident on May 19 that has since been resolved. Autodesk Account covers sign-in, user management, and license assignment, so brief disruptions can intermittently affect admin tasks and product activation.",
    affectedUsers:
      "Admins and users signing in to Autodesk Account or managing Autodesk users, assignments, or licensing during the May 19 incident window.",
    recommendedMspAction:
      "If users reported Autodesk sign-in or licensing problems on May 19, check the Autodesk Health dashboard and close matching tickets as vendor-side once the incident shows resolved. If symptoms continued afterward, collect the account region, user ID, and timestamp before escalating.",
    sourceUrls: [
      "https://health.autodesk.com/",
      "https://statusgator.com/services/autodesk"
    ],
    publishedDate: "2026-05-19",
    lastUpdatedDate: "2026-05-21",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: false,
    isPlaceholder: false,
    tags: ["autodesk", "account", "sign-in", "licensing", "service-impact"]
  },
  // -- NEW DRAFTS (2026-05-19 third-pass scan) ---------------------------------
  // Auto-discovered on 2026-05-19. Review, edit, and flip isPublished: true
  // before these render on the site.
  {
    id: "2026-05-14-microsoft-exchange-server-cve-2026-42897-zero-day",
    appName: "Exchange Server (on-premises)",
    vendor: "Microsoft",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Microsoft Exchange Server zero-day (CVE-2026-42897) actively exploited via crafted email, EEMS mitigation only",
    summary:
      "CVE-2026-42897 (CVSS 8.1) is a spoofing / cross-site-scripting flaw in on-premises Exchange Server (Subscription Edition, 2019, and 2016) that lets an attacker run arbitrary JavaScript in a victim's Outlook Web Access browser context when a crafted email is opened. Microsoft disclosed it May 14 and confirmed in-the-wild exploitation; CISA added the CVE to KEV on May 15 with a federal mitigation deadline of May 29. Microsoft deployed an automatic mitigation through Exchange Emergency Mitigation Service (EEMS), and on May 20 published guidance confirming the Exchange Server SE fix ships as a public security update while Exchange Server 2016 and 2019 fixes are released only to organizations enrolled in the Period 2 Exchange Server ESU program.",
    affectedUsers:
      "Clients with on-premises Microsoft Exchange Server Subscription Edition, 2019, or 2016, especially anywhere Outlook Web Access is reachable from the internet.",
    recommendedMspAction:
      "Confirm EEMS is enabled and current on all on-prem Exchange servers so the May 14 mitigation is in place. Apply the Exchange Server SE security update once available (Exchange 2016 and 2019 fixes require Period 2 ESU enrollment), limit OWA exposure to trusted networks where possible, and review Exchange transport / OWA logs for unusual external mail from the disclosure window forward. Track CISA KEV due date of May 29.",
    sourceUrls: [
      "https://www.securityweek.com/microsoft-warns-of-exchange-server-zero-day-exploited-in-the-wild/",
      "https://thehackernews.com/2026/05/on-prem-microsoft-exchange-server-cve.html",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://securityaffairs.com/192240/hacking/u-s-cisa-adds-a-flaw-in-microsoft-exchange-server-to-its-known-exploited-vulnerabilities-catalog.html",
      "https://techcommunity.microsoft.com/blog/exchange/addressing-exchange-server-may-2026-vulnerability-cve-2026-42897/4518498"
    ],
    publishedDate: "2026-05-14",
    lastUpdatedDate: "2026-05-21",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: false,
    isPlaceholder: false,
    tags: ["microsoft", "exchange-server", "owa", "security", "zero-day", "kev", "actively-exploited", "no-patch", "eems"]
  },
  {
    id: "2026-05-18-bluebeam-us-studio-projects-login-outage",
    appName: "Bluebeam Studio Projects / Bluebeam ID / Webstore US",
    vendor: "Bluebeam",
    category: "Service Impact",
    severity: "Medium",
    title: "Bluebeam US Studio Projects, Bluebeam ID login, and Webstore US degraded on May 18",
    summary:
      "Bluebeam's status mirrors reported confirmed issues with US Services \u2014 Login (Bluebeam ID), US Services \u2014 Bluebeam Webstore US, and US Services \u2014 Studio Projects, with roughly 95 user reports in the 24-hour window around May 18. Bluebeam communicated the issue on its status page and via @Bluebeam updates.",
    affectedUsers:
      "US-region Bluebeam customers using Studio Projects, Bluebeam ID sign-in, or the Bluebeam Webstore, including AEC project teams that share session-based markup work.",
    recommendedMspAction:
      "Confirm reports against the Bluebeam status page before treating them as local issues. Capture timestamps, project, and user IDs for impacted tickets and close as vendor-side once Bluebeam confirms full recovery. Brief helpdesk on workarounds (local saves, retry once status clears).",
    sourceUrls: [
      "https://status.bluebeam.com/",
      "https://status.bluebeam.com/history?locale=en"
    ],
    publishedDate: "2026-05-18",
    lastUpdatedDate: "2026-05-19",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: false,
    isPlaceholder: false,
    tags: ["bluebeam", "studio-projects", "bluebeam-id", "webstore", "service-impact", "us-region", "aec"]
  },
  {
    id: "2026-05-14-vmware-fusion-cve-2026-41702-root-escalation",
    appName: "VMware Fusion (macOS)",
    vendor: "Broadcom / VMware",
    category: "Security Vulnerability",
    severity: "High",
    title: "Broadcom VMSA-2026-0003 fixes VMware Fusion TOCTOU root escalation (CVE-2026-41702)",
    summary:
      "Broadcom published VMSA-2026-0003 on May 14 patching CVE-2026-41702, a time-of-check / time-of-use flaw in a SETUID binary shipped with VMware Fusion on macOS that lets a local attacker escalate to root. The advisory is rated High severity.",
    affectedUsers:
      "Mac users running affected VMware Fusion builds locally, including developers and admins who run Windows VMs on macOS for testing or admin tooling.",
    recommendedMspAction:
      "Inventory managed Macs for VMware Fusion installs and push the VMSA-2026-0003 fixed build through MDM. Where Fusion is not required, consider removing it. Re-check the advisory if your fleet uses any other Broadcom/VMware desktop hypervisor products.",
    sourceUrls: [
      "https://www.cyber.gc.ca/en/alerts-advisories/broadcom-vmware-security-advisory-av26-434",
      "https://securityaffairs.com/192136/security/broadcom-releases-vmware-fusion-security-update-for-root-access-bug"
    ],
    publishedDate: "2026-05-14",
    lastUpdatedDate: "2026-05-19",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: false,
    isPlaceholder: false,
    tags: ["broadcom", "vmware", "fusion", "macos", "security", "patch", "privilege-escalation", "setuid"]
  },
  {
    id: "2026-05-01-linux-kernel-cve-2026-31431-copy-fail-kev",
    appName: "Linux kernel (Copy Fail)",
    vendor: "Linux Kernel",
    category: "Security Vulnerability",
    severity: "High",
    title: "Linux kernel \"Copy Fail\" CVE-2026-31431 actively exploited for local root, added to CISA KEV",
    summary:
      "CVE-2026-31431 (CVSS 7.8) is a Linux kernel local privilege escalation bug introduced by a 2017 in-place crypto optimization. Abusing AF_ALG sockets with splice() lets an unprivileged user perform a controlled 4-byte write into the kernel page cache of any readable file (for example /usr/bin/su), so the next execution runs as root. The exploit is deterministic and roughly 732 bytes. CISA added the CVE to KEV on May 1 after confirming in-the-wild exploitation. Fixes are in Linux kernels 6.18.22, 6.19.12, and 7.0; major distros (Ubuntu, RHEL, SUSE, Amazon Linux 2023) have shipped backports.",
    affectedUsers:
      "Internal Linux servers, jump hosts, build machines, container hosts, and developer VMs running unpatched kernels released between 2017 and the fixed builds.",
    recommendedMspAction:
      "Inventory Linux kernel versions across managed servers and CI runners. Push distro updates with kernel rollover and reboot windows \u2014 Ubuntu, RHEL/Rocky/Alma, SUSE, and Amazon Linux 2023 all have patches. Where reboot is gated, apply live-patch updates where available. Audit /var/log/auth.log and audit logs for unexpected root sessions from non-admin accounts.",
    sourceUrls: [
      "https://www.microsoft.com/en-us/security/blog/2026/05/01/cve-2026-31431-copy-fail-vulnerability-enables-linux-root-privilege-escalation/",
      "https://www.tenable.com/blog/copy-fail-cve-2026-31431-frequently-asked-questions-about-linux-kernel-privilege-escalation",
      "https://thehackernews.com/2026/05/cisa-adds-actively-exploited-linux-root.html",
      "https://cert.europa.eu/publications/security-advisories/2026-005/"
    ],
    publishedDate: "2026-05-01",
    lastUpdatedDate: "2026-05-19",
    suggestedPlacement: "news-page",
    audience: "internal",
    isPublished: false,
    isPlaceholder: false,
    tags: ["linux", "kernel", "copy-fail", "security", "kev", "actively-exploited", "privilege-escalation", "patch"]
  },
  // -- LATEST REVIEWED FINDINGS ------------------------------------------------
  // Reviewed from current vendor/status/security sources on 2026-05-18.
  // Future automation discoveries still start with isPublished: false.
  {
    id: "2026-05-18-microsoft-365-teams-connectors-infopath-cutoffs",
    appName: "Teams / SharePoint Online",
    vendor: "Microsoft",
    category: "Deprecation",
    severity: "High",
    title: "Microsoft 365 May 18 cutoff starts for Teams Office 365 Connectors and InfoPath publishing",
    summary:
      "Microsoft's final Office 365 Connectors retirement rollout for Teams starts May 18 and completes May 22, after which connector-based webhooks stop functioning and must move to Power Automate Workflows webhooks. Microsoft is also blocking new or updated InfoPath form publishing in SharePoint Online after May 18 ahead of full InfoPath Forms Services retirement on July 14, 2026.",
    affectedUsers:
      "Teams channels using legacy Office 365 Connectors or webhook.office.com URLs, and SharePoint Online sites that still publish or update InfoPath forms.",
    recommendedMspAction:
      "Audit Teams connector usage immediately and move remaining webhooks to Power Automate Workflows. For SharePoint, identify InfoPath form libraries and list forms, stop promising new InfoPath changes, and start migration plans to Power Apps, Power Automate, or Microsoft Forms before the July 14 retirement.",
    sourceUrls: [
      "https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/",
      "https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors",
      "https://mc.merill.net/message/MC1255407",
      "https://techcommunity.microsoft.com/t5/microsoft-sharepoint-blog/support-update-for-infopath-forms-services-in-microsoft-365/ba-p/3858190"
    ],
    publishedDate: "2026-05-18",
    lastUpdatedDate: "2026-05-18",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "teams", "sharepoint", "office-365-connectors", "webhooks", "infopath", "deprecation", "power-automate"]
  },
  {
    id: "2026-05-18-zoom-web-portal-admin-release",
    appName: "Zoom Web Portal",
    vendor: "Zoom",
    category: "Product Change",
    severity: "Informational",
    title: "Zoom May 18 web release adds admin dashboard, privacy masking, CMK, and new web experience controls",
    summary:
      "Zoom's May 18 web release details include Usage Data Dashboard improvements for client-version sorting, pagination, and date filtering; report/dashboard PII masking controls; Customer Managed Key proxy and certificate support; and the phased new Zoom Web experience with redesigned home, product menu, profile menu, and Admin Center navigation.",
    affectedUsers:
      "Zoom account owners, admins, helpdesk teams, and users affected by web portal navigation, reporting, privacy masking, Customer Managed Key, or admin dashboard workflows.",
    recommendedMspAction:
      "Review report privacy defaults, Customer Managed Key environments, and admin dashboard workflows. Update support notes for the new Zoom Web experience so technicians can help users who see either the legacy or redesigned web portal during phased rollout.",
    sourceUrls: [
      "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060437",
      "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0084872"
    ],
    publishedDate: "2026-05-18",
    lastUpdatedDate: "2026-05-18",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["zoom", "web-portal", "release-notes", "admin", "dashboard", "privacy", "cmk"]
  },
  {
    id: "2026-05-16-palo-alto-pan-os-cve-2026-0300-fix-timeline",
    appName: "PAN-OS / GlobalProtect Authentication Portal",
    vendor: "Palo Alto Networks",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Palo Alto updates PAN-OS CVE-2026-0300 fix timeline for actively exploited Authentication Portal RCE",
    summary:
      "Palo Alto Networks updated its CVE-2026-0300 advisory on May 16 with more PAN-OS fix-timeline detail. The CVSS 9.3 issue is an unauthenticated buffer overflow in the User-ID Authentication Portal / Captive Portal that can let a remote attacker execute code as root on PA-Series and VM-Series firewalls; Palo Alto marks exploit maturity as attacked.",
    affectedUsers:
      "Organizations running affected PAN-OS 10.2, 11.1, 11.2, or 12.1 builds on PA-Series or VM-Series firewalls, especially where the User-ID Authentication Portal / Captive Portal is reachable from untrusted networks or the public internet.",
    recommendedMspAction:
      "Apply fixed PAN-OS builds as they become available for the deployed branch. Until patched, restrict Authentication Portal access to trusted internal IP ranges or disable the portal where possible. Review firewall and portal access logs for unfamiliar source IPs, and schedule a follow-up patch window for branches whose fixed release remains in the May 28 wave.",
    sourceUrls: [
      "https://security.paloaltonetworks.com/CVE-2026-0300",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
    ],
    publishedDate: "2026-05-16",
    lastUpdatedDate: "2026-05-16",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["palo-alto-networks", "pan-os", "firewall", "globalprotect", "captive-portal", "security", "patch", "kev", "actively-exploited", "zero-day"]
  },
  {
    id: "2026-05-15-microsoft-edge-148-3967-70-security-update",
    appName: "Microsoft Edge",
    vendor: "Microsoft",
    category: "Security Vulnerability",
    severity: "High",
    title: "Microsoft Edge 148.0.3967.70 ships May 15 security fixes",
    summary:
      "Microsoft released Edge Stable 148.0.3967.70 on May 15 with the latest Chromium security updates plus three Edge-specific CVEs: CVE-2026-45495, CVE-2026-45494, and CVE-2026-45492. Microsoft says CVE links will be added as available.",
    affectedUsers:
      "Managed Windows, macOS, and Linux endpoints running Microsoft Edge Stable below 148.0.3967.70, especially devices that defer browser restarts or use Edge for admin portals and Microsoft 365 work.",
    recommendedMspAction:
      "Confirm Edge auto-update rings are delivering 148.0.3967.70 or later, and prompt users to restart Edge where the update is staged. Check any kiosk, shared, or server-adjacent browser installs that do not follow normal user auto-update behavior.",
    sourceUrls: [
      "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnotes-security",
      "https://msrc.microsoft.com/update-guide"
    ],
    publishedDate: "2026-05-15",
    lastUpdatedDate: "2026-05-16",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "edge", "browser", "security", "chromium", "patch", "cve"]
  },
  {
    id: "2026-05-14-cisco-sd-wan-controller-cve-2026-20182",
    appName: "Catalyst SD-WAN Controller / Manager",
    vendor: "Cisco",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Cisco patches actively exploited Catalyst SD-WAN auth bypass (CVE-2026-20182)",
    summary:
      "Cisco published a May 14 advisory for CVE-2026-20182, a CVSS 10.0 authentication bypass in Catalyst SD-WAN Controller and Manager peering authentication. Cisco PSIRT says it is aware of limited exploitation; successful exploitation can grant an internal high-privileged non-root account and enable SD-WAN fabric configuration manipulation.",
    affectedUsers:
      "Organizations running Cisco Catalyst SD-WAN Controller or Manager across on-prem, Cisco SD-WAN Cloud-Pro, Cisco-managed SD-WAN Cloud, or FedRAMP deployments.",
    recommendedMspAction:
      "Before upgrading, collect admin-tech output from SD-WAN control components to preserve indicators. Upgrade to the fixed release for the deployed branch as soon as possible, then review auth.log, control-connection detail, and peering events for unknown IPs or suspicious vmanage/vsmart/vbond relationships.",
    sourceUrls: [
      "https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-sdwan-rpa2-v69WY2SW.html",
      "https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-sdwan-mltvnps2-JxpWm7R.html",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-20182"
    ],
    publishedDate: "2026-05-14",
    lastUpdatedDate: "2026-05-16",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["cisco", "sd-wan", "vmanage", "vsmart", "security", "patch", "kev", "actively-exploited", "authentication-bypass"]
  },
  {
    id: "2026-05-13-microsoft-yellowkey-greenplasma-zerodays-disclosed",
    appName: "Windows (BitLocker / privilege escalation)",
    vendor: "Microsoft",
    category: "Security Vulnerability",
    severity: "High",
    title: "Researcher publicly discloses two unpatched Microsoft zero-days: \"YellowKey\" BitLocker bypass and \"GreenPlasma\" LPE",
    summary:
      "The day after Patch Tuesday, an independent researcher publicly released details on two Microsoft zero-days dubbed YellowKey (a BitLocker bypass) and GreenPlasma (a local privilege escalation). Neither was addressed in the May 2026 cumulative updates, and Microsoft has not yet issued advisories or CVEs. Treat as an evolving situation pending Microsoft's response.",
    affectedUsers:
      "Managed Windows endpoints \u2014 especially laptops that rely on BitLocker for at-rest protection, and multi-user shared workstations where local privilege escalation matters.",
    recommendedMspAction:
      "Watch MSRC for follow-up advisories and CVE assignments. In the meantime, reinforce BitLocker hardening (TPM + PIN, suspend BitLocker before firmware updates, audit recovery-key handling), confirm least-privilege on standard user accounts, and brief helpdesk so they recognize related ticket symptoms. Re-rank severity once Microsoft publishes details.",
    sourceUrls: [
      "https://www.theregister.com/security/2026/05/13/disgruntled-researcher-releases-two-more-microsoft-zero-days/5239758"
    ],
    publishedDate: "2026-05-13",
    lastUpdatedDate: "2026-05-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: false,
    isPlaceholder: false,
    tags: ["microsoft", "windows", "bitlocker", "privilege-escalation", "zero-day", "disclosure", "security"]
  },
  {
    id: "2026-05-12-apple-macos-ios-may-2026-security-updates",
    appName: "macOS / iOS / Safari",
    vendor: "Apple",
    category: "Security Vulnerability",
    severity: "High",
    title: "Apple ships May platform security updates for macOS, iOS, iPadOS, and Safari",
    summary:
      "Apple published security content for macOS Tahoe 26.5, macOS Sequoia 15.7.7, iOS/iPadOS 26.5, and Safari 26.5. The updates include kernel, WebKit, Wi-Fi, ImageIO, and sandbox-related fixes such as CVE-2026-28819 and CVE-2026-28972.",
    affectedUsers:
      "Mac fleets on supported macOS Tahoe, Sequoia, or Sonoma lines, company-managed iPhones or iPads on iOS/iPadOS 26.4 or earlier, and Safari users on macOS Sonoma or Sequoia.",
    recommendedMspAction:
      "Stage the Apple updates through MDM with a short soak ring, then push broadly. Confirm FileVault, Wi-Fi, VPN, security tools, and any kernel/system extensions still work on a sample machine before tenant-wide rollout. Remind BYOD users who access company data to update personal Apple devices.",
    sourceUrls: [
      "https://support.apple.com/en-us/127115",
      "https://support.apple.com/en-us/127116",
      "https://support.apple.com/en-us/127117",
      "https://support.apple.com/en-us/127110",
      "https://support.apple.com/en-us/127121"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-16",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["apple", "macos", "ios", "ipados", "safari", "security", "patch", "kernel", "webkit", "wifi"]
  },
  {
    id: "2026-05-12-mozilla-firefox-150-0-3-security-update",
    appName: "Firefox / Firefox ESR",
    vendor: "Mozilla",
    category: "Security Vulnerability",
    severity: "High",
    title: "Mozilla ships Firefox 150.0.3 after 150.0.2 and ESR security fixes",
    summary:
      "Mozilla published Firefox 150.0.3 on May 12 for high-impact JavaScript/JIT, WebAssembly, and Profile Backup sandbox issues, following May 7 Firefox 150.0.2 and ESR 140.10.2 / 115.35.2 fixes for CVE-2026-8090 and memory-safety bugs. Mozilla says some memory-safety bugs showed evidence of memory corruption that could be exploitable with enough effort.",
    affectedUsers:
      "Endpoints running Firefox below 150.0.3 or Firefox ESR below 140.10.2 / 115.35.2, especially managed installs that only auto-update after relaunch.",
    recommendedMspAction:
      "Push Firefox / ESR updates through your endpoint management tool and prompt relaunch on managed machines. Confirm version reporting in inventory after the rollout. If users run portable Firefox builds, alert them to update manually.",
    sourceUrls: [
      "https://www.mozilla.org/en-US/security/advisories/",
      "https://www.mozilla.org/en-US/security/advisories/mfsa2026-45/",
      "https://www.mozilla.org/en-US/security/advisories/mfsa2026-40/",
      "https://www.mozilla.org/en-US/security/advisories/mfsa2026-41/",
      "https://www.mozilla.org/en-US/security/advisories/mfsa2026-42/"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-16",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["mozilla", "firefox", "browser", "security", "patch", "memory-safety", "jit", "webassembly"]
  },
  {
    id: "2026-04-27-foxit-pdf-reader-editor-security-updates",
    appName: "Foxit PDF Reader / PDF Editor",
    vendor: "Foxit",
    category: "Security Vulnerability",
    severity: "High",
    title: "Foxit PDF Reader 2026.1.1 and PDF Editor 2026.1.1/14.0.4 fix PDF handling vulnerabilities",
    summary:
      "Foxit's latest PDF Reader and PDF Editor security bulletin covers multiple Windows fixes, including denial-of-service issues and several use-after-free or input-validation flaws that could allow arbitrary code execution or information disclosure when handling crafted PDFs, XFA files, annotations, signatures, or form structures.",
    affectedUsers:
      "Windows endpoints running Foxit PDF Reader 2026.1.0.36452 or earlier, Foxit PDF Editor 2026.1.0.36452 or earlier, older supported 2025/2024/2023 branches, or perpetual 14.x / 13.x builds in scope.",
    recommendedMspAction:
      "Update managed Foxit installs to Foxit PDF Reader 2026.1.1 and Foxit PDF Editor 2026.1.1, 14.0.4, or 13.2.4 as appropriate for the licensing branch. Prioritize users who open PDFs from email, portals, shared project folders, or unknown external senders.",
    sourceUrls: [
      "https://www.foxit.com/support/security-bulletins.html"
    ],
    publishedDate: "2026-04-27",
    lastUpdatedDate: "2026-05-18",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["foxit", "pdf-reader", "pdf-editor", "security", "patch", "pdf", "use-after-free"]
  },
  {
    id: "2026-05-13-microsoft-365-south-america-outage-mo1309330",
    appName: "Microsoft 365 / Outlook",
    vendor: "Microsoft",
    category: "Service Impact",
    severity: "Medium",
    title: "Microsoft 365 South America network issue impacted Outlook, Teams, SharePoint, and OneDrive (MO1309330)",
    summary:
      "Microsoft 365 service-health mirrors and Microsoft 365 Status updates reported MO1309330, a May 13 South America connectivity issue that caused email delays, intermittent 503 errors in Outlook and Teams, and SharePoint/OneDrive access problems. Microsoft redirected traffic and brought additional network resources online while monitoring recovery.",
    affectedUsers:
      "Microsoft 365 tenants with users hosted primarily in South America, especially anyone reporting Outlook, Teams, SharePoint, or OneDrive failures during the May 13, 2026 incident window.",
    recommendedMspAction:
      "Check Microsoft 365 admin center incident MO1309330 before treating matching reports as local endpoint or tenant issues. If South America users reported service access failures in the May 13 window, attach the incident ID to tickets and close them as vendor-side after Microsoft confirms recovery.",
    sourceUrls: [
      "https://status.cloud.microsoft/",
      "https://status.tsc.fl.edu/",
      "https://windowsreport.com/outlook-other-microsoft-365-services-are-down-right-now-in-some-regions/"
    ],
    publishedDate: "2026-05-13",
    lastUpdatedDate: "2026-05-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "microsoft-365", "outlook", "teams", "sharepoint", "onedrive", "service-impact", "south-america", "mo1309330"]
  },
  {
    id: "2026-05-13-microsoft-365-apps-install-portal-issue",
    appName: "Microsoft 365 Apps / Windows 365",
    vendor: "Microsoft",
    category: "Service Impact",
    severity: "Medium",
    title: "Microsoft 365 portal install button may not download Office apps",
    summary:
      "Microsoft Support says some users may be unable to download and install Microsoft 365 Apps from portal.office.com; selecting Install Office can make the button disappear without starting the installer. BleepingComputer also reported Windows 365 advisory WP1309017, tied to a recent service-update configuration change affecting Office downloads on Cloud PCs.",
    affectedUsers:
      "Users provisioning Microsoft 365 Apps from the Microsoft 365 portal, especially Windows 365 Cloud PC users or technicians rebuilding Office on managed endpoints.",
    recommendedMspAction:
      "Check the Microsoft Support known issue and Microsoft 365 admin center advisory WP1309017 before rebuilding devices or blaming local profile corruption. Use the Office Deployment Tool or an alternate Microsoft 365 download path until the portal install flow is fixed.",
    sourceUrls: [
      "https://support.microsoft.com/en-gb/office/office-installation-from-portal-office-com-not-starting-after-selecting-install-ec3c17ad-33e8-4336-9020-d211d6c0bfc6",
      "https://www.bleepingcomputer.com/news/microsoft/microsoft-says-some-users-cant-install-office-on-windows-365-devices/"
    ],
    publishedDate: "2026-05-13",
    lastUpdatedDate: "2026-05-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "microsoft-365-apps", "office", "windows-365", "cloud-pc", "service-impact", "wp1309017"]
  },
  {
    id: "2026-05-12-adobe-may-2026-security-bulletins",
    appName: "Connect / Commerce / Creative Cloud apps",
    vendor: "Adobe",
    category: "Security Vulnerability",
    severity: "High",
    title: "Adobe May 2026 patch day covers Connect, Commerce, and Creative Cloud apps",
    summary:
      "Adobe's May 12 security bulletins include critical fixes for Adobe Connect (APSB26-50) and Adobe Commerce/Magento Open Source (APSB26-49), plus advisories for Premiere Pro, Media Encoder, After Effects, Illustrator, Substance 3D apps, and Content Credentials SDK. Adobe says the Connect and Commerce issues are not known exploited in the wild.",
    affectedUsers:
      "Endpoints and servers running affected Adobe products, particularly Adobe Connect desktop clients, Adobe Commerce / Magento Open Source stores, and Creative Cloud workstations with Premiere Pro, After Effects, Illustrator, Media Encoder, or Substance 3D tools.",
    recommendedMspAction:
      "Inventory Creative Cloud installs, Commerce deployments, and Adobe Connect clients. Schedule updates through normal patch tooling, prioritize Commerce/Connect where exposed to untrusted users, and confirm users relaunch Adobe apps after updates land.",
    sourceUrls: [
      "https://helpx.adobe.com/security/security-bulletin.html",
      "https://helpx.adobe.com/security/products/connect/apsb26-50.html",
      "https://helpx.adobe.com/security/products/magento/apsb26-49.html",
      "https://www.hkcert.org/security-bulletin/adobe-monthly-security-update-may-2026"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["adobe", "connect", "commerce", "magento", "creative-cloud", "security", "patch"]
  },
  {
    id: "2026-05-12-fortinet-fortisandbox-fortiauthenticator-critical-rce",
    appName: "FortiSandbox / FortiAuthenticator",
    vendor: "Fortinet",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Fortinet patches critical unauthenticated FortiSandbox and FortiAuthenticator RCE paths",
    summary:
      "Fortinet published two May 12 critical advisories: CVE-2026-26083, a missing authorization flaw in FortiSandbox, FortiSandbox Cloud, and FortiSandbox PaaS Web UI, and CVE-2026-44277, improper access control in FortiAuthenticator API endpoints. Both are CVSS 9.1, unauthenticated, and marked not known exploited at publication.",
    affectedUsers:
      "Clients running affected FortiSandbox 4.4/5.0, FortiSandbox Cloud/PaaS, or FortiAuthenticator 8.0, 6.6, or 6.5 versions, especially where management, Web UI, or API interfaces are reachable from untrusted networks.",
    recommendedMspAction:
      "Upgrade FortiSandbox and FortiAuthenticator to the fixed builds named in FG-IR-26-136 and FG-IR-26-128. Until patched, restrict management interfaces to trusted networks and disable FortiAuthenticator API access on exposed interfaces where feasible. Review access logs around the disclosure window.",
    sourceUrls: [
      "https://fortiguard.fortinet.com/psirt/FG-IR-26-136",
      "https://fortiguard.fortinet.com/psirt/FG-IR-26-128",
      "https://www.bleepingcomputer.com/news/security/fortinet-warns-of-critical-rce-flaws-in-fortisandbox-and-fortiauthenticator/"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["fortinet", "fortisandbox", "fortiauthenticator", "security", "patch", "psirt", "unauthenticated", "rce"]
  },
  {
    id: "2026-05-12-cisco-ios-xe-may-2026-advisories",
    appName: "Cisco IOS / IOS XE",
    vendor: "Cisco",
    category: "Security Vulnerability",
    severity: "High",
    title: "Cisco patches roughly a dozen IOS and IOS XE flaws including secure boot bypass on Catalyst 9300",
    summary:
      "Cisco released its May 2026 IOS / IOS XE bundle, fixing about a dozen vulnerabilities that could lead to denial of service, secure boot bypass, information disclosure, and privilege escalation. Six are rated high severity, including a secure boot bypass on Catalyst 9300 Series switches. Publicly disclosed issues include CVE-2026-20110, CVE-2026-20112, CVE-2026-20113, and CVE-2026-20114.",
    affectedUsers:
      "Networking environments running affected Cisco IOS or IOS XE images, especially Catalyst 9300 Series switches and devices where local CLI access or the maintenance command is reachable to lower-privilege users.",
    recommendedMspAction:
      "Pull Cisco IOS / IOS XE versions from inventory, map them to the May 2026 advisories, and schedule firmware upgrades during a standard change window. Prioritize Catalyst 9300 fleets for the secure boot bypass and review who can run maintenance commands on managed gear.",
    sourceUrls: [
      "https://sec.cloudapps.cisco.com/security/center/publicationListing.x",
      "https://www.securityweek.com/cisco-patches-multiple-vulnerabilities-in-ios-software/"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-13",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: false,
    isPlaceholder: false,
    tags: ["cisco", "ios", "ios-xe", "catalyst-9300", "secure-boot", "security", "patch"]
  },
  {
    id: "2026-05-07-ivanti-epmm-cve-2026-6973-kev",
    appName: "Endpoint Manager Mobile (EPMM)",
    vendor: "Ivanti",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Ivanti EPMM authenticated admin RCE (CVE-2026-6973) exploited in the wild, added to CISA KEV",
    summary:
      "Ivanti's May 7 EPMM security update disclosed CVE-2026-6973, an improper input validation issue that can let a remotely authenticated admin achieve remote code execution. Ivanti says it is aware of very limited exploitation; NVD's CISA ADP record lists the issue in the Known Exploited Vulnerabilities catalog with a May 10 federal due date. Fixed builds include EPMM 12.6.1.1, 12.7.0.1, and 12.8.0.1.",
    affectedUsers:
      "Organizations running on-premises Ivanti EPMM before 12.6.1.1, 12.7.0.1, or 12.8.0.1, especially deployments with internet-exposed admin interfaces or reused admin credentials.",
    recommendedMspAction:
      "Upgrade EPMM to 12.6.1.1, 12.7.0.1, or 12.8.0.1 immediately. After patching, rotate all EPMM admin credentials, enforce MFA on admin accounts, review admin login history for unfamiliar IPs, and restrict the EPMM admin interface to trusted networks.",
    sourceUrls: [
      "https://www.ivanti.com/blog/may-2026-epmm-security-update",
      "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-6973",
      "https://www.helpnetsecurity.com/2026/05/08/ivanti-epmm-zero-day-cve-2026-6973/"
    ],
    publishedDate: "2026-05-07",
    lastUpdatedDate: "2026-05-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["ivanti", "epmm", "mdm", "security", "patch", "kev", "rce", "actively-exploited"]
  },
  {
    id: "2026-04-openssh-cve-2026-35414-principals",
    appName: "OpenSSH",
    vendor: "OpenSSH",
    category: "Security Vulnerability",
    severity: "High",
    title: "OpenSSH authorized_keys principals flaw (CVE-2026-35414) can bypass auth to root on CA-trusted hosts",
    summary:
      "CVE-2026-35414 (CVSS 8.1) is a 15-year-old bug in OpenSSH's handling of the authorized_keys principals option when combined with a Certificate Authority. A comma in an SSH certificate principal name is parsed as a list separator, which can let a user holding a valid CA-issued certificate authenticate as root on a vulnerable server without leaving normal log traces. Fixed in OpenSSH 10.3 (April 2026). OpenSSH has not reported active exploitation.",
    affectedUsers:
      "Linux and other Unix-like servers running OpenSSH before 10.3 that rely on Certificate Authority-issued SSH certificates with an authorized_keys principals list.",
    recommendedMspAction:
      "Inventory OpenSSH versions on managed servers and bump anything below 10.3. For SSH CA setups, audit issued certificates for unusual principal names containing commas and rotate the CA signing key if abuse is suspected. Treat this as a priority on any internet-reachable bastion or jump host.",
    sourceUrls: [
      "https://www.cisecurity.org/advisory/a-vulnerability-in-openssh-could-allow-for-authentication-bypass_2026-040",
      "https://www.securityweek.com/openssh-flaw-allowing-full-root-shell-access-lurked-for-15-years/",
      "https://nvd.nist.gov/vuln/detail/CVE-2026-35414"
    ],
    publishedDate: "2026-04-20",
    lastUpdatedDate: "2026-05-13",
    suggestedPlacement: "news-page",
    audience: "internal",
    isPublished: false,
    isPlaceholder: false,
    tags: ["openssh", "linux", "ssh", "security", "patch", "ca", "authentication-bypass"]
  },
  // ── PUBLISHED ───────────────────────────────────────────────────────────────
  {
    id: "2026-05-12-microsoft-may-patch-tuesday",
    appName: "Windows / Microsoft 365",
    vendor: "Microsoft",
    category: "Security Vulnerability",
    severity: "High",
    title: "Microsoft May 2026 Patch Tuesday: 120 first-party / 137 total CVEs, zero-click Outlook RCE, no zero-days",
    summary:
      "Microsoft's May 2026 cumulative update fixes about 120 first-party CVEs (around 137 when counting bundled third-party fixes) across Windows, Office, Azure, and developer tools. Highlights include a zero-click Outlook use-after-free RCE (CVE-2026-40361) that can fire on preview, four Word RCEs (two flagged \"more likely to be exploited\") including preview-pane vectors, a Windows Netlogon stack overflow RCE on domain controllers (CVE-2026-41089, CVSS 9.8), and a heap-overflow DNS Client RCE (CVE-2026-41096, CVSS 9.8). No zero-days were disclosed in the bundle itself.",
    affectedUsers:
      "Any managed Windows endpoint or server, Microsoft 365 Apps install (especially Outlook and Word), and Windows Server domain controller running affected May 2026 builds.",
    recommendedMspAction:
      "Schedule the May 2026 cumulative update through normal patch tooling, prioritizing domain controllers (Netlogon), internet-exposed servers, and any host that handles untrusted email (Outlook zero-click). Validate Office line-of-business apps after the Word fixes land. This is also the last comfortable patch window before the Secure Boot certificate refresh deadline on June 26, 2026 \u2014 confirm Secure Boot readiness on managed fleets as part of the same cycle.",
    sourceUrls: [
      "https://msrc.microsoft.com/update-guide/releaseNote/2026-May",
      "https://www.bleepingcomputer.com/news/microsoft/microsoft-may-2026-patch-tuesday-fixes-120-flaws-no-zero-days/",
      "https://www.scworld.com/news/patch-tuesday-no-zero-days-among-137-microsoft-cves-4-word-rces",
      "https://www.securityweek.com/microsoft-patches-critical-zero-click-outlook-vulnerability-threatening-enterprises/",
      "https://blog.talosintelligence.com/microsoft-patch-tuesday-may-2026/",
      "https://socradar.io/blog/may-2026-patch-tuesday-zero-day/"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-14",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "patch-tuesday", "windows", "office", "security", "netlogon", "dns", "word", "secure-boot"]
  },
  {
    id: "2026-05-04-esri-arcgis-server-security-2026-update-1",
    appName: "ArcGIS Server / Portal for ArcGIS",
    vendor: "Esri",
    category: "Security Vulnerability",
    severity: "High",
    title: "Esri releases ArcGIS Server Security 2026 Update 1 patch for versions 11.1 through 12.0",
    summary:
      "Esri published the ArcGIS Server Security 2026 Update 1 patch on May 4 for ArcGIS Server 12.0, 11.5, 11.4, 11.3, and 11.1. The companion Portal for ArcGIS Security 2026 Update 1 patch released in mid-April also resolves two critical-severity issues: an incorrect privilege assignment that lets highly privileged users create developer credentials with elevated permissions, and an incorrect authorization check on developer credentials.",
    affectedUsers:
      "On-premises ArcGIS Server and Portal for ArcGIS deployments on the affected versions. ArcGIS Online customers are not affected by the on-premises patches.",
    recommendedMspAction:
      "Inventory on-premises ArcGIS Server and Portal for ArcGIS instances, identify versions in scope, and schedule patch application during a maintenance window. Review developer credential usage in Portal for any signs of overly broad privileges after applying the Portal patch.",
    sourceUrls: [
      "https://support.esri.com/en-us/patches-updates/2026/arcgis-server-security-2026-update-1-patch",
      "https://support.esri.com/en-us/patches-updates/2026/portal-for-arcgis-security-2026-update-1-patch",
      "https://trust.arcgis.com/en/security/security-overview.htm"
    ],
    publishedDate: "2026-05-04",
    lastUpdatedDate: "2026-05-12",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["esri", "arcgis-server", "portal-for-arcgis", "security", "patch", "on-premises"]
  },
  {
    id: "2026-03-24-citrix-netscaler-cve-2026-3055",
    appName: "NetScaler ADC / NetScaler Gateway",
    vendor: "Citrix",
    category: "Security Vulnerability",
    severity: "Critical",
    title: "Citrix NetScaler critical SAML and Gateway flaws (CVE-2026-3055, CVE-2026-4368) exploited in the wild",
    summary:
      "Citrix disclosed two NetScaler flaws in late March: CVE-2026-3055 (CVSS 9.3), an out-of-bounds read in NetScaler appliances configured as a SAML Identity Provider that can leak session tokens to unauthenticated attackers, and CVE-2026-4368 (CVSSv4 7.7), a race condition affecting Gateway, SSL VPN, ICA Proxy, CVPN, RDP proxy, or AAA virtual servers. CVE-2026-3055 exploitation has been reported in the wild.",
    affectedUsers:
      "Clients running on-premises NetScaler ADC or NetScaler Gateway on 13.1, 14.1, 13.1-FIPS, or 13.1-NDcPP that are exposed to the internet and use the affected SAML IDP or Gateway/AAA configurations.",
    recommendedMspAction:
      "Patch immediately: NetScaler ADC and Gateway 13.1 to 13.1-62.23, 14.1 to 14.1-66.59, and 13.1-FIPS / 13.1-NDcPP to 13.1-37.262. After patching, terminate active sessions, rotate any SAML signing material that may have been exposed, and review authentication logs for unusual activity around the disclosure window.",
    sourceUrls: [
      "https://support.citrix.com/external/article/CTX696300/netscaler-adc-and-netscaler-gateway-secu.html",
      "https://www.bleepingcomputer.com/news/security/citrix-urges-admins-to-patch-netscaler-flaws-as-soon-as-possible/",
      "https://www.ncsc.gov.uk/news/vulnerabilities-affecting-citrix-netscaler-adc-gateway"
    ],
    publishedDate: "2026-03-24",
    lastUpdatedDate: "2026-05-12",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["citrix", "netscaler", "adc", "gateway", "security", "saml", "patch", "kev"]
  },
  {
    id: "2026-05-12-windows-autopatch-hotpatch-default",
    appName: "Windows Autopatch",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Medium",
    title: "Windows Autopatch enables hotpatch by default for eligible devices",
    summary:
      "Microsoft says Windows Autopatch will enable hotpatch security updates by default for eligible Intune-managed devices starting with the May 2026 Windows security update, with tenant-level and quality update policy controls available for opt-out or scoping.",
    affectedUsers:
      "IT admins managing eligible Windows devices through Microsoft Intune and Windows Autopatch, especially environments that tightly control restart behavior or quality update rings.",
    recommendedMspAction:
      "Review Autopatch hotpatch eligibility, decide whether any tenants need opt-out or policy scoping, and update patch-window notes so helpdesk teams understand which devices may install security fixes with fewer restarts.",
    sourceUrls: [
      "https://learn.microsoft.com/en-us/windows/release-health/windows-message-center",
      "https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/whats-new"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-12",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "intune", "autopatch", "windows", "hotpatch", "endpoint-management"]
  },
  {
    id: "2026-05-10-autodesk-revit-cloud-model-publishing",
    appName: "Revit Cloud Worksharing / Cloud Models",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk resolved Revit cloud model publishing issue in Docs",
    summary:
      "Autodesk reported and resolved an issue on May 10 where customers were unable to publish Revit cloud models in Docs. The incident moved from investigating to resolved in about 90 minutes.",
    affectedUsers:
      "Project teams using Revit Cloud Worksharing, Cloud Models, Autodesk Docs, BIM 360, or Autodesk Construction Cloud workflows that publish Revit cloud models.",
    recommendedMspAction:
      "If users reported publishing failures during the May 10 window, close related tickets as vendor-side once publishing succeeds again. If failures continue, collect the model name, project, timestamp, and Autodesk account region before escalating.",
    sourceUrls: [
      "https://health.autodesk.com/incidents/b4vfxd8bflpj"
    ],
    publishedDate: "2026-05-10",
    lastUpdatedDate: "2026-05-10",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "revit", "cloud-models", "docs", "acc", "service-impact"]
  },
  {
    id: "2026-05-07-microsoft-edge-148-stable",
    appName: "Microsoft Edge",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Medium",
    title: "Edge 148 adds Copilot, autofill, authentication, and policy changes",
    summary:
      "Microsoft Edge Stable 148.0.3967.54 includes Workspaces migration updates, Microsoft 365 Copilot Chat changes, Copilot New Tab controls, password affiliation service behavior, enhanced autofill, Microsoft 365 auth popup handling, and several new policies.",
    affectedUsers:
      "Managed Edge for Business users, admins who configure Edge policies, and organizations using Copilot, Workspaces, password manager controls, or Microsoft 365 web sign-in flows.",
    recommendedMspAction:
      "Review new Edge 148 policies before broad rollout, confirm any URL allow/block rules do not break Microsoft 365 Copilot Chat, and validate password/autofill behavior in managed work profiles.",
    sourceUrls: [
      "https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel"
    ],
    publishedDate: "2026-05-07",
    lastUpdatedDate: "2026-05-07",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "edge", "browser", "copilot", "policy", "autofill"]
  },
  {
    id: "2026-05-05-microsoft-teams-brand-impersonation-calling",
    appName: "Teams Calling",
    vendor: "Microsoft",
    category: "Product Change",
    severity: "Medium",
    title: "Teams Calling brand impersonation warnings roll out in mid-May",
    summary:
      "Microsoft's updated message center notice says Teams Calling will warn users about suspicious first-contact external callers that appear to impersonate trusted brands. The feature is enabled by default and is now scheduled for mid-May rollout.",
    affectedUsers:
      "Organizations using Microsoft Teams Calling on desktop or Mac that receive inbound VoIP calls from external first-contact callers.",
    recommendedMspAction:
      "Brief helpdesk and security-awareness teams so users understand the new call warnings. No admin action is expected, but technicians should be ready to explain accept, block, and end-call options for flagged calls.",
    sourceUrls: [
      "https://mc.merill.net/message/MC1219793"
    ],
    publishedDate: "2026-05-05",
    lastUpdatedDate: "2026-05-12",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["microsoft", "teams", "calling", "security-awareness", "vishing"]
  },
  {
    id: "2026-05-05-google-chrome-148-security-update",
    appName: "Google Chrome",
    vendor: "Google",
    category: "Security Vulnerability",
    severity: "High",
    title: "Chrome 148 stable includes 127 security fixes, including Critical Blink, Mobile, and Chromoting CVEs",
    summary:
      "Google promoted Chrome 148 to stable for Windows, macOS, Linux, and Android. The desktop release notes now list 127 security fixes, including Critical CVE-2026-7896, CVE-2026-7897, and CVE-2026-7898, plus many High-severity V8, ANGLE, WebRTC, Skia, DOM, and GPU issues.",
    affectedUsers:
      "Windows, macOS, Linux, and Android users running Chrome below the 148 stable builds, especially managed browsers that require relaunch to complete updates.",
    recommendedMspAction:
      "Keep Chrome auto-update policies healthy, monitor managed browser versions, and prompt users to relaunch where the 148 update is staged but not applied. Prioritize shared workstations, kiosks, and browsers used for privileged admin portals.",
    sourceUrls: [
      "https://chromereleases.googleblog.com/2026/05/stable-channel-update-for-desktop.html",
      "https://chromereleases.googleblog.com/2026/05/chrome-for-android-update.html"
    ],
    publishedDate: "2026-05-05",
    lastUpdatedDate: "2026-05-14",
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
    id: "2026-04-27-autodesk-account-maintenance-may-16",
    appName: "Autodesk Account",
    vendor: "Autodesk",
    category: "Service Impact",
    severity: "Low",
    title: "Autodesk account maintenance may interrupt user management on May 16",
    summary:
      "Autodesk has scheduled Autodesk account maintenance for May 16 from 9:00 AM to 11:00 AM PDT. Autodesk says account user management features may be intermittently unavailable during the window.",
    affectedUsers:
      "Admins changing Autodesk account users, assignments, licensing, or account management settings during the maintenance window.",
    recommendedMspAction:
      "Avoid planned Autodesk user-management changes during the maintenance window. If users report Autodesk account admin issues at that time, check Autodesk Health before treating it as a local licensing problem.",
    sourceUrls: [
      "https://health.autodesk.com/incidents/2py3nthtpkty"
    ],
    publishedDate: "2026-04-27",
    lastUpdatedDate: "2026-05-12",
    suggestedPlacement: "news-page",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["autodesk", "account", "maintenance", "licensing", "admin"]
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

export function hasPlaceholders(items = appNewsItems) {
  return items.some(item => item.isPlaceholder === true && isItemVisible(item));
}
