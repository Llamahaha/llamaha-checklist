export const vendorOrderExtra = [
  "google",
  "hec",
  "mctrans",
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
  autodesk: {
    products: ["InfoWorks ICM"],
    sharedNotes: [
      "InfoWorks ICM workflows depend on the approved Autodesk-delivered version plus the correct model, database, and project paths."
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
      { label: "Deltek Vantagepoint product page", url: "https://www.deltek.com/en/products/project-erp/vantagepoint" },
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
      { label: "Box Drive Help", url: "https://support.box.com/hc/en-us/categories/360002720034-Box-Drive" }
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
      { label: "Okta Verify overview", url: "https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/about-okta-verify.htm" }
    ]
  }
};
