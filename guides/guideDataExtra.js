export const vendorOrderExtra = [
  "google",
  "spotfire",
  "innovyze",
  "qgis",
  "rock",
  "hec",
  "h20net",
  "mctrans",
  "transoft",
  "axiom",
  "deltek",
  "docusign",
  "zoom",
  "cisco",
  "box",
  "dropbox",
  "duo",
  "okta"
];

export const vendorGuidesExtra = {
  adobe: {
    products: ["InDesign"],
    sharedNotes: [
      "InDesign workflows are sensitive to fonts, linked assets, packaged jobs, and the Adobe profile the user selects at sign-in."
    ]
  },
  innovyze: {
    title: "Innovyze",
    summary: "Use this for Innovyze water-infrastructure modeling apps (InfoWorks ICM, InfoWater Pro, InfoSewer Pro, XPSWMM, XPSTORM) now delivered through Autodesk Water Infrastructure.",
    overview:
      "Innovyze is now part of Autodesk and the apps are delivered through the Autodesk account, but the modeling workflows, project databases, ArcGIS dependencies, and team-standard versions still drive most support work. Confirm which app, which Autodesk account, and which project model is involved before changing anything.",
    products: ["InfoWorks ICM", "InfoWater Pro", "InfoSewer Pro", "XPSWMM", "XPSTORM"],
    sharedNotes: [
      "Innovyze apps are now delivered under Autodesk Water Infrastructure, so sign-in problems usually trace back to the assigned Autodesk account, not a separate Innovyze portal.",
      "InfoWater Pro and InfoSewer Pro are ArcGIS Pro extensions, so the matching ArcGIS Pro release and the GIS data sources matter as much as the extension itself.",
      "Test a second known-good model or scenario before reinstalling, and capture exact app version, model name, and storage path before contacting support."
    ],
    adminSurfaces: [
      "Autodesk Account assignments for Innovyze water apps",
      "ArcGIS Pro install for InfoWater Pro and InfoSewer Pro extensions",
      "Project model, database, and scenario storage paths"
    ],
    escalationNotes: [
      "Escalate after confirming the Autodesk account, exact app version, and a second-model comparison rule out app-only problems."
    ],
    supportLinks: [
      { label: "Autodesk Water Infrastructure", url: "https://www.autodesk.com/industry/water" },
      { label: "Innovyze (Autodesk) support", url: "https://www.autodesk.com/support" }
    ]
  },
  qgis: {
    title: "QGIS",
    summary: "Use this for QGIS Desktop installs, project files, plugins, and everyday open-source GIS workflows.",
    overview:
      "QGIS is the open-source desktop GIS most commonly used alongside or instead of ArcGIS. Most issues come down to which version is installed, project file health, missing plugins, or shared data paths the project relies on.",
    products: ["QGIS"],
    sharedNotes: [
      "Confirm whether the team is on the LTR (long-term) release or the latest stable release before troubleshooting plugin or project compatibility.",
      "If only one project fails, test a second .qgz or .qgs file before assuming the install is broken.",
      "Plugin behavior is profile- and version-specific; capture the QGIS version and active plugins when a tool stops working."
    ],
    adminSurfaces: [
      "QGIS Desktop install (LTR or current release)",
      "QGIS plugin repository and any internal plugin distribution",
      "Project files and shared GIS data paths the team relies on"
    ],
    escalationNotes: [
      "Escalate after a known-good project comparison and a fresh QGIS profile or version check rules out local profile corruption."
    ],
    supportLinks: [
      { label: "QGIS Documentation", url: "https://docs.qgis.org/" },
      { label: "QGIS Downloads", url: "https://qgis.org/en/site/forusers/download.html" }
    ]
  },
  rock: {
    title: "ROCK Robotic",
    summary: "Use this for ROCK Desktop installs, ROCK Robotic Cloud sign-in, LiDAR dataset processing, and survey deliverable workflows.",
    overview:
      "ROCK Desktop is the processing companion to the ROCK Robotic LiDAR ecosystem. Most issues come down to ROCK Robotic Cloud sign-in, dataset download or upload health, processing job failures, or local disk and GPU resources during heavy point-cloud work.",
    products: ["ROCK Desktop"],
    sharedNotes: [
      "ROCK Desktop is paired with ROCK Robotic Cloud; sign-in problems are the most common starting symptom.",
      "Heavy datasets need adequate disk space and a supported GPU; capture system specs and dataset size when processing jobs fail.",
      "Preserve datasets, processed outputs, and any in-flight project work before reinstalling or moving workstations."
    ],
    adminSurfaces: [
      "ROCK Robotic Cloud account and organization membership",
      "ROCK Desktop install and version on the workstation",
      "Local dataset and processing output storage"
    ],
    escalationNotes: [
      "Escalate after sign-in is confirmed, system specs are captured, and a second dataset has been tested."
    ],
    supportLinks: [
      { label: "ROCK Robotic Support", url: "https://rockrobotic.com/support/" }
    ]
  },
  quickbooks: {
    products: ["QuickBooks Enterprise Desktop", "QuickBooks Online", "QuickBooks Web Connector", "QuickBooks Time"],
    sharedNotes: [
      "QuickBooks Web Connector configurations are tied to a specific company file and user; document the .qwc source app, the company file path, and the QuickBooks user before changing anything.",
      "QuickBooks Time is cloud-managed in the QuickBooks Time admin console; user lifecycle (invite, archive, payroll sync) belongs there, not in QuickBooks Desktop."
    ]
  },
  google: {
    title: "Google",
    summary: "Use this for Google Earth Pro installs, KML or KMZ file help, map viewing, and everyday location or imagery workflows.",
    overview:
      "Google Earth Pro support is usually about the desktop app opening correctly, imports and saved places behaving as expected, and whether KML or KMZ content or imagery layers load the way the user expects.",
    products: ["Google Earth Pro"],
    sharedNotes: [
      "If the issue is limited to one KML or KMZ file, test a second known-good file before reinstalling the app.",
      "Saved places and imported project files should be preserved before workstation cleanup.",
      "If imagery or map layers look wrong, capture whether the issue is local to one device or tied to the same data set everywhere."
    ],
    adminSurfaces: [
      "Google Earth Pro desktop app",
      "Google Earth Help and support pages",
      "Project KML or KMZ storage locations and shared data paths"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Google Earth Help", url: "https://support.google.com/earth/" }
    ]
  },
  hec: {
    title: "HEC",
    summary: "Use this for HEC hydrologic, hydraulic, statistical, and DSS-file workflows across the HEC engineering toolset.",
    overview:
      "HEC support issues are usually version alignment, project data paths, GIS or terrain dependencies, and whether the right study or DSS files are opening on the affected computer.",
    products: ["HEC-HMS", "HEC-RAS", "HEC-DSSVue", "HEC-DSS", "HEC-SSP", "HEC-GeoRAS"],
    sharedNotes: [
      "Capture the exact HEC product and version first because study files and project behavior can vary by release.",
      "If the problem is tied to one model or one DSS file, test a second known-good project before assuming the whole app is broken.",
      "Preserve project folders, GIS paths, and exported results before repair or uninstall work."
    ],
    adminSurfaces: [
      "HEC software download and documentation pages",
      "Project folders, terrain data, DSS files, and GIS data paths used by the team"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "HEC Software overview", url: "https://www.hec.usace.army.mil/software/" },
      { label: "HEC software fact sheet", url: "https://www.hec.usace.army.mil/factsheets/Software/HEC_FactSheet_Software.pdf" }
    ]
  },
  h20net: {
    title: "H20Net",
    summary: "Use this for FHWA hydraulic design utilities collected under the H20Net app family, especially Hydraulic Toolbox and HY-8.",
    overview:
      "These tools are lightweight hydraulic-design utilities where support usually depends on the exact FHWA version, Windows compatibility, calculation files, and whether the same project behaves correctly on another approved computer.",
    products: ["Hydraulic Toolbox", "HY-8"],
    sharedNotes: [
      "Capture the exact app version and project file before changing the installation.",
      "If a calculation looks wrong, test a small known-good example first and cross-check the result with engineering judgment or another approved method.",
      "Preserve .hyd and .hy8 project files, exported reports, and calculation assumptions during repair or workstation replacement."
    ],
    adminSurfaces: [
      "Official FHWA Hydraulics software download pages",
      "Company-approved install package or software center entry",
      "Project folders containing .hyd, .hy8, reports, and calculation notes"
    ],
    escalationNotes: [
      "Escalate after confirming the approved version, 64-bit Windows compatibility, install permissions, and whether the issue follows one project file.",
      "Collect the app version, project file name, error screenshot, and a known-good comparison before handing off."
    ],
    supportLinks: [
      { label: "FHWA Hydraulic Toolbox", url: "https://www.fhwa.dot.gov/engineering/hydraulics/software/toolbox404.cfm" },
      { label: "FHWA HY-8", url: "https://www.fhwa.dot.gov/engineering/hydraulics/software/hy8/" }
    ]
  },
  mctrans: {
    title: "MCTRANS",
    summary: "Use this for MCTRANS transportation-analysis tools, especially Highway Capacity Software and Highway Safety Software.",
    overview:
      "MCTRANS problems usually come down to version alignment, licensing or delivery details, and whether the same study file behaves correctly on another approved installation.",
    products: ["HCS", "HSS"],
    sharedNotes: [
      "Capture the exact HCS or HSS version and study file before changing the installation.",
      "If the issue is file-specific, compare it with another known-good study file first.",
      "Keep version notes because transportation study workflows often depend on the approved release."
    ],
    adminSurfaces: [
      "MCTRANS account or delivery records",
      "Version-specific manuals and reference guides"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "MCTRANS HCS reference guide", url: "https://mctrans.ce.ufl.edu/highway-capacity-software-hcs/referenceguide/" },
      { label: "MCTRANS Center", url: "https://mctrans.ce.ufl.edu/" }
    ]
  },
  transoft: {
    title: "Transoft Solutions",
    summary: "Use this for AutoTURN swept-path and vehicle turning simulation support in CAD, civil, site, and transportation design workflows.",
    overview:
      "Transoft Solutions publishes AutoTURN for vehicle swept-path analysis, turning simulation, and design review. Support usually starts with the host CAD platform, the exact AutoTURN edition or delivery method, the signed-in/licensed user, and whether the issue follows one drawing or all drawings.",
    products: ["AutoTURN"],
    sharedNotes: [
      "AutoTURN is used to test whether vehicles can safely move through roads, intersections, loading areas, parking lots, driveways, and site layouts.",
      "Separate a CAD-host problem from an AutoTURN problem early by checking whether the host app opens normally and whether AutoTURN loads in a simple known-good drawing.",
      "Avoid changing production drawings until you know whether the issue is licensing, add-in loading, vehicle library selection, drawing units, or a specific file."
    ],
    adminSurfaces: [
      "Transoft account or license portal used by the organization",
      "Host CAD platform such as AutoCAD, Civil 3D, BricsCAD, MicroStation, or another supported environment",
      "Project drawings, templates, and vehicle library or standards expectations"
    ],
    escalationNotes: [
      "Escalate after capturing the host CAD version, AutoTURN version or product tier, licensing message, affected drawing, and one known-good drawing comparison."
    ],
    supportLinks: [
      { label: "AutoTURN product page", url: "https://www.transoftsolutions.com/uk/civil-and-transportation/software/swept-path-analysis/autoturn/" },
      { label: "Transoft support", url: "https://www.transoftsolutions.com/support/" }
    ]
  },
  axiom: {
    title: "Axiom",
    summary: "Use this for Axiom add-ins and productivity tools used alongside Bentley and Autodesk applications.",
    overview:
      "Axiom issues usually live at the host-application layer: module compatibility, add-in loading, the host product year, and whether the same tool is working on another approved workstation.",
    products: ["Axiom"],
    sharedNotes: [
      "Always capture the host application and exact year first because Axiom behavior depends on that compatibility pair.",
      "If only one Axiom tool is failing, compare it with another tool in the same suite before reinstalling the add-in.",
      "Document which Axiom modules are actually in scope for the user's workflow."
    ],
    adminSurfaces: [
      "Axiom product delivery and support resources",
      "Host-application version and add-in management"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Axiom official site", url: "https://www.axiomint.com/" }
    ]
  },
  deltek: {
    title: "Deltek",
    summary: "Use this for Deltek Vantagepoint sign-in, browser access, time entry, mobile time, and project-accounting support questions.",
    overview:
      "Deltek Vantagepoint issues usually come down to the correct tenant or firm URL, the right sign-in method, browser compatibility, and whether the user is seeing the expected firm, project list, or time sheet.",
    products: ["Vantagepoint"],
    sharedNotes: [
      "Confirm the exact Vantagepoint URL and sign-in method your firm uses before changing local settings.",
      "If time sheets or reports are missing, separate browser-good versus desktop-client-bad behavior early.",
      "Preserve timesheet entries by saving them before investigating deeper issues with the client or browser."
    ],
    adminSurfaces: [
      "Deltek Cloud tenant URL your firm uses to sign in to Vantagepoint",
      "Company sign-in or SSO configuration used by your firm",
      "Vantagepoint browser requirements and supported release notes"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Deltek Vantagepoint product page", url: "https://www.deltek.com/en/erp/vantagepoint" },
      { label: "Deltek Support Center", url: "https://deltek.custhelp.com/" }
    ]
  },
  docusign: {
    title: "DocuSign",
    summary: "Use this for DocuSign sign-in, envelope routing, template sending, and recipient help when a DocuSign email or signing link is not working.",
    overview:
      "DocuSign issues usually come down to the sender picking the wrong recipient email, the recipient not finding the DocuSign notification, account-versus-personal-address mismatch, or a template that is routing to the wrong reviewer.",
    products: ["DocuSign Web"],
    sharedNotes: [
      "Confirm which email address the envelope was sent to before investigating deeper sign-in issues.",
      "If a recipient cannot find the DocuSign email, have them check spam or other folders and confirm the sender before resending.",
      "Keep the envelope ID ready when you contact support so the exact routing can be reviewed."
    ],
    adminSurfaces: [
      "DocuSign account settings, templates, and users for the admin",
      "DocuSign support pages for recipients with signing or email delivery problems"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "DocuSign Support", url: "https://support.docusign.com/" },
      { label: "DocuSign Help Center", url: "https://support.docusign.com/s/?language=en_US" }
    ]
  },
  zoom: {
    title: "Zoom",
    summary: "Use this for Zoom meeting join, audio and video setup, screen sharing, SSO sign-in, and everyday Zoom meeting support questions.",
    overview:
      "Zoom issues are commonly device-routing problems, wrong-account sign-in, missing meeting permissions, or the desktop client needing an update. Web Zoom is a useful fallback when the desktop app misbehaves.",
    products: ["Zoom Meetings"],
    sharedNotes: [
      "If audio, video, or screen share misbehaves, check the selected device in Zoom and in Windows or macOS sound settings.",
      "If sign-in is broken, confirm whether the user joined through company SSO, a personal Zoom account, or as a guest.",
      "If the desktop app hangs or refuses to join, try joining in the browser with the same meeting link as a diagnostic step."
    ],
    adminSurfaces: [
      "Zoom web portal for account, users, licenses, and meeting settings",
      "Zoom desktop client settings for audio, video, virtual background, and updates",
      "Company SSO configuration if the firm uses single sign-on with Zoom"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Zoom Support", url: "https://support.zoom.com/hc/en" },
      { label: "Zoom System Requirements", url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060748" }
    ]
  },
  cisco: {
    title: "Cisco",
    summary: "Use this for Cisco Webex Meetings sign-in, join issues, audio and video setup, and everyday Webex support questions.",
    overview:
      "Webex issues usually come down to the correct Webex site URL, sign-in method, device routing in the client, or Outlook integration. Web Webex is a helpful fallback when the desktop app is stuck.",
    products: ["Webex"],
    sharedNotes: [
      "Confirm the exact Webex site URL your company uses before troubleshooting a sign-in problem.",
      "If meetings fail audio or video, verify the microphone, speaker, and camera in Webex and in Windows or macOS sound settings.",
      "Web Webex is a useful fallback when the desktop app refuses to sign in or hangs on startup."
    ],
    adminSurfaces: [
      "Webex Control Hub for admins",
      "Webex desktop client settings for audio, video, and integrations",
      "Company SSO configuration if the firm uses single sign-on with Webex"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Webex Help Center", url: "https://help.webex.com/" }
    ]
  },
  box: {
    title: "Box",
    summary: "Use this for Box sign-in, Box Drive access, shared file links, external collaboration, and file conflict help.",
    overview:
      "Box issues are usually about the wrong account being signed in, Box Drive sync state on the desktop, shared-link permission levels, and whether an external collaborator was invited to the right folder.",
    products: ["Box Drive"],
    sharedNotes: [
      "If shared links fail, confirm the expected access level (preview, download, edit) and whether the recipient is inside or outside the company.",
      "If Box Drive is out of sync, check the Box Drive status in the system tray before restarting the client.",
      "If files are locked, confirm whether another user has the file open before forcing an unlock."
    ],
    adminSurfaces: [
      "Box admin console for users, groups, folder permissions, and sharing settings",
      "Box Drive desktop client for sync state, offline folders, and sign-in",
      "Company SSO configuration if used with Box"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Box Support", url: "https://support.box.com/hc/en-us" },
      { label: "Box Drive Help", url: "https://support.box.com/hc/en-us/sections/21356707082387-Box-Drive" }
    ]
  },
  dropbox: {
    title: "Dropbox",
    summary: "Use this for Dropbox Business sign-in, desktop sync, shared folders, external collaboration, and file conflict help.",
    overview:
      "Dropbox issues usually come down to the wrong account or team being active, desktop sync state, shared-folder membership, or a file conflict where two people edited the same file at once.",
    products: ["Dropbox Desktop"],
    sharedNotes: [
      "If the user is in multiple Dropbox teams, confirm the active team before troubleshooting missing folders.",
      "If the desktop app is out of sync, check the Dropbox status icon in the system tray before uninstalling.",
      "Conflicted copies are normal when two people edit the same file; keep both copies until the edits are merged."
    ],
    adminSurfaces: [
      "Dropbox admin console for team members, groups, sharing, and security",
      "Dropbox desktop client for sync, smart sync, and account switching",
      "Company SSO configuration if used with Dropbox Business"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Dropbox Help Center", url: "https://help.dropbox.com/" }
    ]
  },
  duo: {
    title: "Duo",
    summary: "Use this for Duo Mobile push notifications, new-phone reactivation, MFA help, and Duo push or passcode issues.",
    overview:
      "Duo issues are usually push notifications not arriving on the phone, a user who switched phones without reactivating Duo, or a sign-in prompt not offering the expected Duo method.",
    products: ["Duo Mobile"],
    sharedNotes: [
      "If push is not arriving, confirm the phone has internet, notifications are enabled for Duo Mobile, and time is set automatically.",
      "If the user replaced their phone, Duo needs to be reactivated on the new phone through the company process or the Duo Self-Service portal.",
      "Backup passcodes are a useful fallback when push is not working; keep the user's environment in scope before blaming the app."
    ],
    adminSurfaces: [
      "Duo Admin Panel for users, phones, policies, and bypass codes",
      "Duo Self-Service portal if enabled by the company",
      "Company identity provider that sends users to Duo for MFA"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Duo Guide to Two-Factor Authentication", url: "https://guide.duo.com/" },
      { label: "Duo Support", url: "https://help.duo.com/" }
    ]
  },
  okta: {
    title: "Okta",
    summary: "Use this for Okta Verify push notifications, new-phone reactivation, verified push, number matching, and Okta sign-in prompts.",
    overview:
      "Okta Verify issues are usually push notifications not arriving, a replaced phone that was not reactivated in Okta, or number-matching and verified-push steps that the user did not expect.",
    products: ["Okta Verify"],
    sharedNotes: [
      "If Okta Verify push is not arriving, confirm notifications are enabled for Okta Verify and the phone has internet.",
      "If the phone was replaced, Okta Verify has to be reactivated from the Okta end-user dashboard or by the help desk.",
      "Number matching and verified push steps are normal; make sure the user knows to tap the matching number or approve with biometrics."
    ],
    adminSurfaces: [
      "Okta Admin Console for users, factors, and sign-on policies",
      "Okta end-user dashboard for enrolling and resetting MFA factors",
      "Company identity provider that federates to Okta if applicable"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Okta Help Center", url: "https://help.okta.com/" },
      { label: "Okta Verify overview", url: "https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-okta-verify.htm" }
    ]
  },
  spotfire: {
    title: "Spotfire",
    summary: "Use this for Spotfire desktop and web sign-in, library access, and everyday analytics dashboard or visualization questions.",
    overview:
      "Spotfire is the analytics and dashboard platform from Cloud Software Group, with a desktop client (Spotfire Analyst) and a web client used to open shared analyses, dashboards, and data libraries.",
    products: ["Spotfire Analyst", "Spotfire Web"],
    sharedNotes: [
      "Confirm the Spotfire server URL and the work account your team uses before changing local settings.",
      "If a dashboard or library item is missing, separate web-good versus desktop-bad behavior early.",
      "Capture the analysis or library file name when only one item is failing instead of treating Spotfire itself as broken."
    ],
    adminSurfaces: [
      "Spotfire server URL or company-provided sign-in path",
      "Spotfire library and folder permissions for shared analyses",
      "Spotfire documentation and release notes"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Spotfire product documentation", url: "https://docs.tibco.com/products/tibco-spotfire" },
      { label: "Spotfire support", url: "https://support.tibco.com/" }
    ]
  }
};
