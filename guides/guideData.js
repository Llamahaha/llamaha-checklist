import { vendorGuidesExtra, vendorOrderExtra } from "./guideDataExtra.js";

const baseVendorOrder = [
  "microsoft",
  "browsers",
  "fortinet",
  "citrix",
  "oracle",
  "autodesk",
  "bentley",
  "esri",
  "ptc",
  "trimble",
  "adobe",
  "bluebeam",
  "foxit",
  "quickbooks",
  "egnyte"
];

const baseVendorGuides = {
  microsoft: {
    title: "Microsoft 365",
    summary: "Use this for tenant-backed desktop app support, licensing, sign-in, sync, Teams collaboration, and SharePoint or OneDrive workflow issues.",
    overview:
      "Microsoft tickets are often identity, licensing, tenant, or local profile problems wearing an application mask. Validate the account, license scope, and service health before rebuilding apps.",
    products: ["Outlook", "Teams", "OneDrive", "SharePoint", "Outlook Mobile", "Teams Mobile", "Microsoft Authenticator"],
    sharedNotes: [
      "Confirm the exact tenant, UPN, and Microsoft 365 license bundle before changing local apps.",
      "Separate browser-good versus desktop-bad behavior early. That usually tells you whether you are in tenant access, profile, or app-state territory.",
      "Document whether the issue follows the user, the mailbox, the site, or the workstation before escalating."
    ],
    adminSurfaces: [
      "Microsoft 365 admin center for licenses and service plans",
      "Entra admin center for sign-in, MFA, device, and Conditional Access review",
      "Exchange admin center for mailbox permissions, shared mailboxes, and mail flow",
      "SharePoint admin center for site access, sync, sharing, and IRM-related checks"
    ],
    escalationNotes: [
      "Escalate when multiple users in the same tenant, site, or mailbox workflow break at the same time, especially if service health or policy changes line up.",
      "Collect exact error wording, tenant, affected apps, web-versus-desktop behavior, and recent password, MFA, or device changes before Tier 2 takes over.",
      "Do not reset OneDrive or recreate Outlook profiles until permissions, licensing, and tenant selection are confirmed."
    ],
    supportLinks: [
      { label: "Microsoft 365 Admin Center", url: "https://admin.microsoft.com/" },
      { label: "Microsoft 365 Service Health", url: "https://status.office365.com/" },
      { label: "Microsoft Support", url: "https://support.microsoft.com/" }
    ]
  },
  browsers: {
    title: "Browsers",
    summary: "Use this for everyday browser support across Chrome, Edge, Firefox, and Safari when work sites, downloads, sign-in pages, or default-app handoffs are not behaving normally.",
    overview:
      "Browser issues usually show up as sign-in loops, blocked pop-ups, failed downloads, wrong file-open behavior, or one site working in one browser but not another. Start by confirming the browser version, whether the same site works elsewhere, and whether extensions or saved site data are involved.",
    products: ["Google Chrome", "Microsoft Edge", "Mozilla Firefox", "Safari"],
    sharedNotes: [
      "Check whether the same website works in another supported browser before clearing settings.",
      "Saved passwords, pop-up settings, cached site data, and download or default-app settings are common causes of browser problems.",
      "If the issue only affects one site, capture the site URL and the exact browser version before contacting support."
    ],
    adminSurfaces: [
      "Browser settings for passwords, downloads, pop-ups, site permissions, and default browser behavior",
      "Extension or add-on management for work-required browser helpers",
      "Vendor help pages for Chrome, Edge, Firefox, and Safari"
    ],
    escalationNotes: [
      "Escalate after confirming the affected browser version, extension list, and whether the same site works in another browser.",
      "Collect the exact site URL, the browser version, screenshots of the error, and whether the issue affects one user or multiple people."
    ],
    supportLinks: [
      { label: "Chrome Help", url: "https://support.google.com/chrome/" },
      { label: "Microsoft Edge Help", url: "https://support.microsoft.com/microsoft-edge" },
      { label: "Firefox Help", url: "https://support.mozilla.org/products/firefox" },
      { label: "Safari User Guide", url: "https://support.apple.com/guide/safari/welcome/mac" }
    ]
  },
  fortinet: {
    title: "Fortinet",
    summary: "Use this for FortiClient VPN access, company VPN profiles, sign-in prompts, and everyday remote-access questions.",
    overview:
      "FortiClient VPN is commonly used to reach internal company resources, shared file paths, and private work websites when you are away from the office. Start by confirming the right VPN profile, internet access, and sign-in method before assuming the app itself is broken.",
    products: ["FortiClient VPN"],
    sharedNotes: [
      "FortiClient access usually depends on the exact VPN profile or tunnel your company gave you.",
      "If the VPN uses MFA, a browser sign-in, or a certificate prompt, finish that step completely before retrying the connection.",
      "If the VPN connects but a specific app still fails, compare whether the problem affects every internal resource or only one app."
    ],
    adminSurfaces: [
      "FortiClient VPN profiles or company-provided connection instructions",
      "Fortinet documentation for SSL VPN and IPsec VPN connections",
      "Company remote-access instructions for required tunnel names, MFA, or browser prompts"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "FortiClient VPN documentation", url: "https://docs.fortinet.com/document/forticlient/7.2.10/administration-guide/6364/connecting-to-ssl-or-ipsec-vpn" },
      { label: "Connecting from FortiClient VPN client", url: "https://docs.fortinet.com/document/fortigate/7.6.1/administration-guide/215051/connecting-from-forticlient-vpn-client" }
    ]
  },
  citrix: {
    title: "Citrix",
    summary: "Use this for Citrix Workspace App sign-in, workspace detection, .ica launches, and everyday remote app or virtual desktop questions.",
    overview:
      "Citrix Workspace App is commonly used to open company-published apps and virtual desktops from a Citrix workspace. Start by confirming the correct workspace URL, the correct work account, and whether the launch problem is happening in the browser, in the Citrix app, or after the app or desktop starts.",
    products: ["Citrix Workspace App"],
    sharedNotes: [
      "Use the exact workspace URL or company-provided Citrix sign-in path your organization gave you.",
      "If the browser downloads an .ica file, make sure it opens with Citrix Workspace App instead of staying in Downloads.",
      "If a published app or desktop launches and then disconnects, compare whether the same problem affects every Citrix app or only one specific published resource."
    ],
    adminSurfaces: [
      "Company Citrix workspace URL or launch portal",
      "Citrix Workspace App install and getting-started guidance",
      "Client detection and .ica launch guidance for browser-based launches"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Citrix Workspace App for Windows", url: "https://docs.citrix.com/en-us/citrix-workspace-app-for-windows.html" },
      { label: "Getting started with Citrix Workspace", url: "https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/getting-started.html" },
      { label: "Client detection", url: "https://docs.citrix.com/en-us/citrix-workspace/user-experience/client-detection.html" }
    ]
  },
  oracle: {
    title: "Oracle",
    summary: "Use this for Oracle Primavera P6 access, database selection, sign-in questions, and project-opening basics.",
    overview:
      "Primavera P6 access often depends on the correct company login, the correct database connection, and sometimes a cloud-connected or cached workspace. Start by confirming the exact P6 environment your team expects before changing local setup.",
    products: ["Oracle Primavera P6"],
    sharedNotes: [
      "Primavera P6 login names and passwords are case-sensitive, and the correct database selection matters.",
      "If your company uses Cloud Connect or a local cache, do not reinitialize the cache unless support asks you to.",
      "If you can sign in but projects are missing, capture the project name and the database or environment you selected."
    ],
    adminSurfaces: [
      "Primavera P6 login dialog and database selection",
      "Company-provided P6 environment or connection instructions",
      "Oracle Primavera P6 help and installation documentation"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Primavera P6 login dialog help", url: "https://docs.oracle.com/cd/F37128_01/client_help/en_US/login_to_primavera_dialog_box.htm" },
      { label: "Primavera P6 user guide", url: "https://docs.oracle.com/cd/G48902_01/English/User_Guides/p6_pro_user/p6_pro_user.pdf" }
    ]
  },
  autodesk: {
    title: "Autodesk",
    summary: "Use this for Autodesk named-user licensing, Autodesk Access deployment, and app-specific guidance for drafting, BIM, and support tooling.",
    overview:
      "Autodesk support work succeeds or fails on version control, named-user entitlement, and client-specific support content. A technically complete install is still a bad handoff if the profile, templates, or add-ins are wrong.",
    products: ["AutoCAD", "Civil 3D", "Revit", "Autodesk Desktop App", "ReCap Pro", "InfraWorks"],
    sharedNotes: [
      "Match the release year, update level, and language pack to the client standard before installing or repairing.",
      "Support paths, plot styles, fonts, templates, and add-ins often matter more than the base installer.",
      "Document cloud collaboration, shared content paths, and custom profile imports on every workstation build."
    ],
    adminSurfaces: [
      "Autodesk Account for seat assignment and named-user entitlements",
      "Autodesk Access or deployment packages for install standardization",
      "Client file shares for CTB or STB files, support paths, families, templates, and add-ins"
    ],
    escalationNotes: [
      "Escalate after confirming the exact Autodesk identity, product assignment, release year, and client-standard support content are all correct.",
      "Collect screenshots of the license prompt, About screen, build year, and missing content path symptoms before handing off.",
      "If multiple users fail after an Autodesk update, freeze version changes and compare against the last known-good client build."
    ],
    supportLinks: [
      { label: "Autodesk Support", url: "https://www.autodesk.com/support" },
      { label: "Autodesk Account", url: "https://manage.autodesk.com/" },
      { label: "Download and Install Help", url: "https://www.autodesk.com/support/download-install" }
    ]
  },
  bentley: {
    title: "Bentley",
    summary: "Use this for Bentley entitlement work, CONNECTION Client dependencies, and product-specific notes across desktop design and ProjectWise workflows.",
    overview:
      "Bentley environments depend heavily on CONNECT identity, shared workspaces, and datasource access. Before reinstalling anything, confirm the workstation can still reach the same standards, project, and entitlement path as a working peer.",
    products: ["MicroStation", "ProjectWise", "CONNECTION Client", "OpenRoads Designer", "OpenBridge", "OpenFlows", "STAAD / RAM"],
    sharedNotes: [
      "CONNECTION Client health and Bentley identity state affect far more than sign-in alone.",
      "Workspace, standards, and datasource paths usually decide whether a build is actually usable.",
      "Always document whether the user has checked-out files, local work areas, or discipline-specific add-ins before cleanup."
    ],
    adminSurfaces: [
      "Bentley IMS / CONNECT sign-in surfaces",
      "ProjectWise datasource and admin tooling",
      "Client standards shares for workspaces, worksets, and discipline-specific content"
    ],
    escalationNotes: [
      "Escalate after testing CONNECTION Client sign-in, datasource access, and workspace resolution from the affected machine.",
      "Collect datasource name, CONNECT email, workstation build, product version, and whether the issue is limited to one datasource or project.",
      "Do not clear ProjectWise caches or local work areas until checked-out file ownership is confirmed."
    ],
    supportLinks: [
      { label: "Bentley Support", url: "https://bentleysystems.service-now.com/community" },
      { label: "Bentley IMS", url: "https://ims.bentley.com/" }
    ]
  },
  esri: {
    title: "Esri",
    summary: "Use this for ArcGIS licensing, portal access, extension assignment, and desktop-versus-portal troubleshooting.",
    overview:
      "Esri support hinges on the right portal, the right user type, and the right extension assignments. Confirm the license source and content ownership before rebuilding ArcGIS Pro or moving roles around.",
    products: ["ArcGIS Pro", "ArcGIS Online", "Esri extensions and portal roles"],
    sharedNotes: [
      "Named User licensing and portal choice are separate checks. The user can be signed in and still pointed at the wrong org.",
      "Group membership and content ownership are often the real problem behind 'missing maps' tickets.",
      "Capture offline-license use before replacing or reclaiming a workstation."
    ],
    adminSurfaces: [
      "ArcGIS Online organization settings and role assignment",
      "ArcGIS Pro licensing portal configuration",
      "Group and content ownership views for offboarding or missing-layer work"
    ],
    escalationNotes: [
      "Escalate after confirming portal URL, user type, extension assignments, and group visibility are correct.",
      "Collect the ArcGIS Pro version, active portal, licensing portal, extension list, and screenshots of the missing content or license error.",
      "Transfer content ownership before removing admin or publisher access from a departing user."
    ],
    supportLinks: [
      { label: "Esri Support", url: "https://support.esri.com/" },
      { label: "ArcGIS Pro Help", url: "https://pro.arcgis.com/" }
    ]
  },
  ptc: {
    title: "PTC",
    summary: "Use this for Mathcad Prime entitlement, install, uninstall, and workstation license-source guidance.",
    overview:
      "PTC tickets usually fail on license-source settings, environment configuration, or shared engineering content rather than raw installer success. Document the exact license path before making changes.",
    products: ["Mathcad Prime"],
    sharedNotes: [
      "Identify whether the client uses named-user, floating, or file-based licensing before you troubleshoot the app itself.",
      "Capture license-server or config-file references in the ticket. They are often tribal knowledge.",
      "Protect local worksheets, templates, and engineering content before cleanup or rebuild."
    ],
    adminSurfaces: [
      "PTC license management or FlexNet license server tooling",
      "Client engineering shares for worksheets and templates"
    ],
    escalationNotes: [
      "Escalate after checking the configured license source, DNS reachability to the license server, and the exact Prime version in use.",
      "Collect the license model, error text, config file path, and whether the issue affects one workstation or the whole engineering group."
    ],
    supportLinks: [{ label: "PTC Support", url: "https://support.ptc.com/" }]
  },
  trimble: {
    title: "Trimble",
    summary: "Use this for Trimble-managed app access, especially SketchUp administration overlap and Trimble Business Center deployment guidance.",
    overview:
      "Trimble product support depends on the exact product family. Start by confirming whether the ticket belongs to SketchUp, TBC, or another Trimble-managed workflow before you assume a shared install pattern.",
    products: ["SketchUp", "Trimble Business Center"],
    sharedNotes: [
      "Use the same Trimble identity path the client already standardized on.",
      "Extensions, templates, coordinate libraries, and reports often decide whether the build is complete.",
      "Document product edition, modules, and cloud-project dependencies before offboarding."
    ],
    adminSurfaces: [
      "Trimble identity and subscription admin surfaces",
      "SketchUp / Extension Warehouse access",
      "Trimble Business Center edition and module assignment records"
    ],
    escalationNotes: [
      "Escalate after confirming the correct Trimble ID, product edition, and required extensions or modules.",
      "Collect screenshots of the sign-in prompt, entitlement or module message, and the exact installed version."
    ],
    supportLinks: [{ label: "Trimble Help", url: "https://help.trimble.com/" }]
  },
  adobe: {
    title: "Adobe",
    summary: "Use this for Adobe Admin Console licensing and product-level help for Creative Cloud and Acrobat workflows.",
    overview:
      "Adobe support issues usually collapse into identity type, product profile assignment, or local app-state corruption. Make sure the user is choosing the enterprise profile and not a personal Adobe ID before you repair anything.",
    products: ["Creative Cloud Desktop", "Acrobat Pro", "Photoshop", "Illustrator"],
    sharedNotes: [
      "Admin Console assignment and local install health are separate checks.",
      "Default PDF handling, browser helpers, and Office plug-ins should be verified as part of the rollout.",
      "Preserve signatures, stamps, and templates when rebuilding Acrobat users."
    ],
    adminSurfaces: [
      "Adobe Admin Console product profiles",
      "Creative Cloud Desktop for install and update brokering",
      "Workstation defaults for PDF handlers and browser integrations"
    ],
    escalationNotes: [
      "Escalate after verifying the user's product profile, enterprise identity selection, and local install state.",
      "Collect screenshots of the profile picker, sign-in loop, entitlement prompt, and affected integration points."
    ],
    supportLinks: [
      { label: "Adobe HelpX", url: "https://helpx.adobe.com/" },
      { label: "Adobe Admin Console", url: "https://adminconsole.adobe.com/" }
    ]
  },
  bluebeam: {
    title: "Bluebeam",
    summary: "Use this for Bluebeam subscription assignment, Revu 21 support, and Studio workflow troubleshooting.",
    overview:
      "Bluebeam cases usually live at the intersection of BBID sign-in, Studio access, and shared profile content. Confirm the subscription tier and BBID state before you chase local installer problems.",
    products: ["Bluebeam Revu 21"],
    sharedNotes: [
      "Revu 21 is subscription and BBID-driven; older serial-and-key instincts can send the ticket sideways.",
      "Shared tool chests, profiles, and stamps are part of the build, not optional extras.",
      "Version alignment matters when project teams share Studio Sessions or PDFs with advanced markups."
    ],
    adminSurfaces: [
      "Bluebeam subscription management",
      "Bluebeam ID validation path",
      "Studio Sessions and Projects access checks"
    ],
    escalationNotes: [
      "Escalate after confirming BBID validation, subscription tier, Studio reachability, and shared profile/tool set availability.",
      "Collect BBID email, Revu build, Studio error text, and whether the issue is limited to one machine."
    ],
    supportLinks: [{ label: "Bluebeam Support", url: "https://support.bluebeam.com/" }]
  },
  foxit: {
    title: "Foxit",
    summary: "Use this for Foxit PDF Editor and Reader deployment, activation, plugin handling, and clean seat recovery.",
    overview:
      "Foxit environments vary by subscription, perpetual, and admin-console control. Confirm the license model and intended edition before treating any symptom as a generic install problem.",
    products: ["Foxit PDF Editor", "Foxit PDF Reader"],
    sharedNotes: [
      "Activation method matters: sign-in, serial, and admin-console flows do not troubleshoot the same way.",
      "Default PDF handlers and Office plug-ins need to be validated after install and uninstall.",
      "Capture edition and plug-in expectations so support does not have to guess what 'working' means."
    ],
    adminSurfaces: [
      "Foxit Admin Console or device activation records",
      "Local plug-in management and default-app settings"
    ],
    escalationNotes: [
      "Escalate after confirming the exact edition, activation path, and whether the issue is really default-app or plug-in related.",
      "Collect build number, activation method, and screenshots of locked features or missing integrations."
    ],
    supportLinks: [
      { label: "Foxit Knowledge Base", url: "https://kb.foxit.com/" },
      { label: "Foxit Downloads", url: "https://www.foxit.com/downloads/" }
    ]
  },
  quickbooks: {
    title: "QuickBooks",
    summary: "Use this for QuickBooks Desktop and Online access, install, and finance handoff workflows.",
    overview:
      "QuickBooks support is as much about company-file ownership, hosting mode, and print or PDF dependencies as it is about the program itself. Confirm the finance workflow and hosting model before you rebuild anything.",
    products: ["QuickBooks Enterprise Desktop", "QuickBooks Online"],
    sharedNotes: [
      "Separate hosted Desktop, local Desktop, and QBO immediately. They have different support paths and risks.",
      "Company-file path, backups, print drivers, and hosting mode should be captured in every serious ticket.",
      "Finance workflows deserve explicit approval evidence before access changes or cleanup."
    ],
    adminSurfaces: [
      "Intuit account or company admin role assignment",
      "QuickBooks Tool Hub for common repair work",
      "Company-file host and share permissions"
    ],
    escalationNotes: [
      "Escalate after checking Tool Hub repairs, company-file path health, hosting mode, and user-role assignment.",
      "Collect the QuickBooks year, release level, hosting path, company-file location, and exact error code before handoff."
    ],
    supportLinks: [
      { label: "QuickBooks Learn & Support", url: "https://quickbooks.intuit.com/learn-support/" },
      { label: "QuickBooks Desktop Downloads", url: "https://downloads.quickbooks.com/app/qbdt/products" }
    ]
  },
  egnyte: {
    title: "Egnyte",
    summary: "Use this for Egnyte user provisioning, folder-permission handoff, Desktop App rollout, and sync or deprovision cleanup.",
    overview:
      "Egnyte work is usually role, folder, and local-cache management more than generic file-sync troubleshooting. Validate whether the user should be a Power User and whether the workflow belongs in web, desktop, or both.",
    products: ["Egnyte Web UI / Admin", "Egnyte Desktop App"],
    sharedNotes: [
      "User type affects desktop access and daily behavior, so do not skip the role check.",
      "Offline folders and drive mappings should be documented before workstation swaps or wipe-and-load work.",
      "Private content ownership and shared links are common offboarding blind spots."
    ],
    adminSurfaces: [
      "Egnyte admin console for user type and folder access",
      "Desktop App deployment tooling and MSI parameters",
      "Folder ownership and shared-link review views"
    ],
    escalationNotes: [
      "Escalate after validating the user type, SSO path, folder permissions, and Desktop App deployment parameters.",
      "Collect the domain, Desktop App build, drive-letter behavior, and whether the issue affects web access too."
    ],
    supportLinks: [
      { label: "Egnyte Help Center", url: "https://helpdesk.egnyte.com/hc/en-us" },
      { label: "Desktop App Mass Deployment", url: "https://helpdesk.egnyte.com/hc/en-us/articles/216688268-Egnyte-Desktop-App-for-Windows-Mass-Deployment" }
    ]
  }
};

function mergeGuide(baseGuide = {}, extraGuide = {}) {
  const merged = { ...baseGuide, ...extraGuide };
  ["products", "sharedNotes", "adminSurfaces", "escalationNotes", "supportLinks"].forEach(key => {
    const baseValue = baseGuide[key] ?? [];
    const extraValue = extraGuide[key] ?? [];
    if (baseValue.length || extraValue.length) {
      merged[key] = [...baseValue, ...extraValue];
    }
  });
  return merged;
}

export const vendorOrder = [...new Set([...baseVendorOrder, ...vendorOrderExtra])];

export const vendorGuides = Object.fromEntries(
  [...new Set([...Object.keys(baseVendorGuides), ...Object.keys(vendorGuidesExtra)])].map(key => [
    key,
    mergeGuide(baseVendorGuides[key], vendorGuidesExtra[key])
  ])
);

export function getVendorGuide(vendorSlug) {
  return vendorGuides[vendorSlug] ?? null;
}

export function getGuideHubUrl() {
  return "../vendor-guides.html";
}

export function getVendorGuideUrl(vendorSlug) {
  return `guides/${vendorSlug}.html`;
}
