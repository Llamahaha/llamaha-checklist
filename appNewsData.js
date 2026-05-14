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
  // -- LATEST REVIEWED FINDINGS ------------------------------------------------
  // Reviewed from current vendor/status/security sources on 2026-05-14.
  // Future automation discoveries still start with isPublished: false.
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
    title: "Microsoft May 2026 Patch Tuesday addresses about 120 CVEs, 17 Critical, no zero-days",
    summary:
      "Microsoft's May 2026 cumulative update fixes around 120 vulnerabilities across Windows, Office, Azure, and developer tools, with 17 rated Critical and many of those remote code execution. Notable issues include several Word RCEs that can trigger via the Preview Pane, a Windows Netlogon RCE (CVE-2026-41089) on domain controllers, and a DNS Client RCE. No zero-days were disclosed.",
    affectedUsers:
      "Any managed Windows endpoint or server, Microsoft 365 Apps install, and Windows Server domain controller running affected May 2026 builds.",
    recommendedMspAction:
      "Schedule the May 2026 cumulative update through normal patch tooling, prioritizing internet-exposed servers and domain controllers. Validate Office line-of-business apps after the Word fixes land. This is also the last comfortable patch window before the Secure Boot certificate refresh deadline on June 26, 2026 \u2014 confirm Secure Boot readiness on managed fleets as part of the same cycle.",
    sourceUrls: [
      "https://msrc.microsoft.com/update-guide/releaseNote/2026-May",
      "https://www.bleepingcomputer.com/news/microsoft/microsoft-may-2026-patch-tuesday-fixes-120-flaws-no-zero-days/",
      "https://www.tenable.com/blog/microsofts-may-2026-patch-tuesday-addresses-118-cves-cve-2026-41103",
      "https://blog.talosintelligence.com/microsoft-patch-tuesday-may-2026/"
    ],
    publishedDate: "2026-05-12",
    lastUpdatedDate: "2026-05-12",
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
    id: "2026-05-11-zoom-web-portal-release",
    appName: "Zoom Web Portal",
    vendor: "Zoom",
    category: "Product Change",
    severity: "Informational",
    title: "Zoom web portal May releases add admin controls and a phased web redesign",
    summary:
      "Zoom's web release notes list May 11 bug fixes and a May 18 upcoming release with a phased new Zoom Web experience, dashboard sorting, report privacy masking, and Customer Managed Key proxy/certificate options.",
    affectedUsers:
      "Zoom account owners, admins, helpdesk teams, and users whose sign-in sessions, dashboards, reporting, privacy settings, or web portal navigation are managed through Zoom Web.",
    recommendedMspAction:
      "Review tenant settings for dashboard/reporting privacy, Customer Managed Key environments, and admin navigation changes. Update helpdesk notes for the phased web interface so technicians can support both old and new layouts during rollout.",
    sourceUrls: [
      "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060437"
    ],
    publishedDate: "2026-05-11",
    lastUpdatedDate: "2026-05-12",
    suggestedPlacement: "both",
    audience: "public",
    isPublished: true,
    isPlaceholder: false,
    tags: ["zoom", "web-portal", "release-notes", "admin", "ai-companion"]
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
