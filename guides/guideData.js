export const vendorOrder = [
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

export const vendorGuides = {
  autodesk: {
    title: "Autodesk",
    summary: "Use this for Autodesk named-user licensing, Autodesk Access deployment, and app-specific guidance for AutoCAD, Civil 3D, Revit, ReCap Pro, and InfraWorks.",
    products: ["AutoCAD", "Civil 3D", "Revit", "ReCap Pro", "InfraWorks"],
    licenseSteps: [
      "Confirm the exact Autodesk collection or standalone product the user needs before assigning anything.",
      "Assign the user in the Autodesk admin portal and verify the expected Autodesk identity is being used.",
      "Record which products, add-ins, and cloud-connected services were granted so offboarding can reclaim them cleanly."
    ],
    installSteps: [
      "Install from the client-standard deployment package or Autodesk Access, depending on how the client manages versions.",
      "Add only the products, libraries, and plug-ins the role actually needs.",
      "Launch the application once, sign in, and confirm the entitlement resolves without download or activation errors."
    ],
    uninstallSteps: [
      "Remove or transfer the Autodesk user assignment before treating the seat as available.",
      "Uninstall the desktop application set if the workstation is being redeployed or the product is no longer approved.",
      "Preserve templates, profiles, or local libraries before cleanup if engineering staff shared them informally."
    ],
    watchFor: [
      "Named-user access is the real seat control; uninstalling locally is not enough.",
      "Add-ins, content libraries, and templates often matter as much as the main installer.",
      "Mixed-version Autodesk estates can break plug-ins if you deploy the wrong release."
    ],
    supportLinks: [
      { label: "Autodesk Support", url: "https://www.autodesk.com/support" },
      { label: "Download and Install Help", url: "https://www.autodesk.com/support/download-install" }
    ]
  },
  bentley: {
    title: "Bentley",
    summary: "Use this for Bentley entitlement work, CONNECTION Client dependencies, and product-specific notes across the civil, structural, bridge, water, and ProjectWise stack.",
    products: ["MicroStation", "ProjectWise", "OpenRoads", "OpenBridge", "OpenFlows", "STAAD / RAM"],
    licenseSteps: [
      "Confirm the exact Bentley products and entitlement model the client uses before granting access.",
      "Add the user to the correct Bentley administration surface and verify the required role or entitlement is present.",
      "Document which Bentley applications and project environments were assigned so future cleanup is not guesswork."
    ],
    installSteps: [
      "Install the Bentley application set and any supporting connection or sign-in components required by the product line.",
      "Apply the client-standard workspace, standards path, or project configuration.",
      "Test sign-in and confirm the user can open the expected workspace without entitlement or dependency errors."
    ],
    uninstallSteps: [
      "Remove or reduce the user's Bentley access before treating the seat as recovered.",
      "Uninstall local Bentley applications when the workstation is leaving the role or being reissued.",
      "Preserve shared standards, workspaces, or project data that should not disappear with the user profile."
    ],
    watchFor: [
      "Bentley setups frequently depend on shared standards folders or workspace paths outside the base install.",
      "Product behavior can vary by entitlement model, so document what the client actually uses.",
      "Connection-related components may be required even when the desktop install itself looks complete."
    ],
    supportLinks: [
      { label: "Bentley Community & Support", url: "https://bentleysystems.service-now.com/community" }
    ]
  },
  esri: {
    title: "Esri",
    summary: "Use this for ArcGIS Online role management, ArcGIS Pro licensing, extension control, and ownership handoff.",
    products: ["ArcGIS Online", "ArcGIS Pro", "Extensions and role-based access"],
    licenseSteps: [
      "Assign the named user, role, and any required ArcGIS Pro or extension licenses in the correct organization.",
      "Confirm the user has the right portal membership before trying to validate the desktop application.",
      "Record which extensions, groups, and owned content came with the assignment."
    ],
    installSteps: [
      "Install the approved ArcGIS desktop application set and any extensions or plug-ins the role requires.",
      "Sign in with the intended organizational identity and verify the license level resolves correctly.",
      "Test access to the maps, layers, projects, or services the user actually needs."
    ],
    uninstallSteps: [
      "Transfer owned content or administrative ownership before removing the user's access.",
      "Remove the Esri role and license assignments after confirming the handoff is complete.",
      "Uninstall local applications from reassigned devices when the role no longer requires them."
    ],
    watchFor: [
      "Content ownership transfer is often more important than the seat itself.",
      "Offline licenses or cached sign-ins can survive longer than expected on shared devices.",
      "Extensions are easy to forget during both onboarding and reclaim."
    ],
    supportLinks: [
      { label: "Esri Support", url: "https://support.esri.com/" },
      { label: "ArcGIS Pro Install and Sign-In", url: "https://pro.arcgis.com/en/pro-app/latest/get-started/install-and-sign-in-to-arcgis-pro.htm" }
    ]
  },
  ptc: {
    title: "PTC",
    summary: "Use this for Mathcad Prime entitlement, install, uninstall, and workstation license-source guidance.",
    products: ["Mathcad Prime", "PTC entitlements", "License server or license-file settings"],
    licenseSteps: [
      "Identify whether the product uses named-user access, a floating license server, or a file-based entitlement.",
      "Assign or document the correct entitlement path before the user touches the workstation.",
      "Record the exact product, version, and license source so support does not have to rediscover it later."
    ],
    installSteps: [
      "Install the approved PTC client build and apply any client-standard configuration files or environment settings.",
      "Point the workstation at the correct entitlement source or license server.",
      "Launch the application and confirm it opens without a licensing prompt or missing-module error."
    ],
    uninstallSteps: [
      "Remove or reassign the user entitlement and clean up any workstation-specific license configuration.",
      "Uninstall the local PTC application if the device is being repurposed.",
      "Preserve models, local workspaces, or vault-linked files before wiping or reimaging the workstation."
    ],
    watchFor: [
      "PTC products can fail because of configuration, not just missing installs.",
      "License-server references should be documented if more than one exists.",
      "Local engineering workspaces may hold data that is not yet checked in elsewhere."
    ],
    supportLinks: [
      { label: "PTC Support", url: "https://support.ptc.com/" }
    ]
  },
  sketchup: {
    title: "SketchUp",
    summary: "Use this when SketchUp seats are assigned through Trimble and the workstation needs the right version, sign-in path, and extensions.",
    products: ["SketchUp subscription", "Trimble identity", "SketchUp desktop install"],
    licenseSteps: [
      "Assign the SketchUp seat in the Trimble admin console before installation day.",
      "Verify the user will sign in with the correct Trimble identity instead of a personal account.",
      "Record which subscription tier or product bundle the seat came from."
    ],
    installSteps: [
      "Install the client-approved SketchUp release and any companion tools the workflow requires.",
      "Have the user sign in with the assigned Trimble identity and verify the license resolves successfully.",
      "Restore or deploy the required templates, extensions, and default settings for that client."
    ],
    uninstallSteps: [
      "Remove or transfer the SketchUp seat in the Trimble admin console first.",
      "Uninstall the local SketchUp application if the workstation is being repurposed or standardized.",
      "Preserve local templates, extension data, or shared components before cleanup."
    ],
    watchFor: [
      "Extension sets often matter as much as the base app.",
      "Mixed SketchUp versions can break plugins or client expectations.",
      "A valid install can still fail if the wrong Trimble identity is used."
    ],
    supportLinks: [
      { label: "SketchUp Help", url: "https://help.sketchup.com/" },
      { label: "SketchUp Downloads", url: "https://www.sketchup.com/download/all" }
    ]
  },
  trimble: {
    title: "Trimble",
    summary: "Use this for Trimble-managed app access, especially SketchUp administration overlap and Trimble Business Center deployment guidance.",
    products: ["SketchUp admin overlap", "Trimble Business Center", "Trimble identity / admin access"],
    licenseSteps: [
      "Identify the exact Trimble product first because the entitlement and installer path can vary by product family.",
      "Assign the user, subscription, or role in the appropriate Trimble administration surface.",
      "Document the product name, version target, and any linked cloud projects or data repositories."
    ],
    installSteps: [
      "Use the product-approved Trimble installer or installation manager for the exact application in scope.",
      "Apply any required workstation configuration, plug-ins, or project path settings.",
      "Confirm the user can sign in and reach the data or project set they are supposed to use."
    ],
    uninstallSteps: [
      "Remove or reduce the user's Trimble access before counting the entitlement as available.",
      "Uninstall the local application according to the product's guidance if the workstation is being reassigned.",
      "Preserve project data, connector settings, or local caches that still matter to the team."
    ],
    watchFor: [
      "Trimble product families do not all use the same admin flow.",
      "Cloud-linked data and local sync folders should be reviewed before cleanup.",
      "Treat the exact product name as part of the ticket, not optional context."
    ],
    supportLinks: [
      { label: "Trimble Help", url: "https://help.trimble.com/" }
    ]
  },
  adobe: {
    title: "Adobe",
    summary: "Use this for Adobe Admin Console licensing and product-level help for Creative Cloud, Photoshop, Illustrator, and Acrobat Pro.",
    products: ["Creative Cloud Desktop", "Photoshop", "Illustrator", "Acrobat Pro"],
    licenseSteps: [
      "Assign the user to the right Adobe product profile or seat in the Admin Console.",
      "Verify the user will sign in with the organization-managed identity expected by the client.",
      "Document whether the seat is Acrobat-only or part of a larger Adobe bundle."
    ],
    installSteps: [
      "Deploy Acrobat or the required Adobe app using the client-standard package, Creative Cloud workflow, or managed deployment.",
      "Complete sign-in and verify the application activates cleanly.",
      "Check browser extensions, Outlook plugins, and default PDF handling if the workflow depends on them."
    ],
    uninstallSteps: [
      "Remove the user's Admin Console assignment before treating the seat as recovered.",
      "Uninstall the desktop app if the workstation is being repurposed or the approved PDF stack is changing.",
      "Preserve signatures, templates, and organization-shared settings that should move with the role."
    ],
    watchFor: [
      "Personal Adobe IDs vs managed enterprise IDs are a common source of confusion.",
      "Admin Console removal and local uninstall are separate steps.",
      "PDF, browser, and Office add-ins often survive longer than expected."
    ],
    supportLinks: [
      { label: "Adobe HelpX", url: "https://helpx.adobe.com/" },
      { label: "Download and Install Help", url: "https://helpx.adobe.com/download-install.html" }
    ]
  },
  bluebeam: {
    title: "Bluebeam",
    summary: "Use this for Bluebeam Revu 21 subscription assignment, Studio access, and current install or reclaim guidance.",
    products: ["Bluebeam subscriptions", "Revu 21", "Bluebeam sign-in / Studio access"],
    licenseSteps: [
      "Assign the user in the Bluebeam organization or subscription admin flow before installation day.",
      "Confirm the correct user identity and subscription tier are in scope.",
      "Record whether the client still has legacy licensing assumptions that need cleanup."
    ],
    installSteps: [
      "Install the approved Revu version for the client environment.",
      "Have the user sign in and confirm the subscription or seat resolves correctly.",
      "Verify Studio access, tool sets, and any PDF workflow settings used by the team."
    ],
    uninstallSteps: [
      "Remove or transfer the Bluebeam assignment first so the seat is actually reclaimed.",
      "Uninstall the local client when the workstation is leaving the role or being standardized.",
      "Preserve tool chest data, stamps, and shared profile settings if they matter to the next user."
    ],
    watchFor: [
      "Legacy serial-and-key habits can linger even when the client moved to subscriptions.",
      "Studio access and local tool sets often matter as much as the seat itself.",
      "Version mismatches can affect project collaboration."
    ],
    supportLinks: [
      { label: "Bluebeam Support", url: "https://support.bluebeam.com/" }
    ]
  },
  foxit: {
    title: "Foxit",
    summary: "Use this for Foxit PDF Editor and Reader deployment, activation, plugin handling, and clean seat recovery.",
    products: ["Foxit PDF Editor", "Foxit PDF Reader", "Foxit licensing / subscription"],
    licenseSteps: [
      "Confirm the client's Foxit licensing model before assigning a user or serial.",
      "Assign or document the correct subscription, serial, or admin-console seat for the user.",
      "Record which edition and add-ons are expected so support can tell a licensing issue from a packaging issue."
    ],
    installSteps: [
      "Install the client-approved Foxit build and required extensions or Office integrations.",
      "Activate or sign in using the method tied to that client's license model.",
      "Verify default PDF handling and the plug-ins the workflow depends on."
    ],
    uninstallSteps: [
      "Remove or deactivate the Foxit assignment first so the seat is not stranded.",
      "Uninstall the Foxit application and optional components if the workstation is changing roles.",
      "Validate that the recovered seat or serial is documented and reusable."
    ],
    watchFor: [
      "Foxit environments vary widely between serial-based and account-based licensing.",
      "Office and browser integrations can linger after the base app is removed.",
      "Treat default PDF behavior as part of the deliverable, not an afterthought."
    ],
    supportLinks: [
      { label: "Foxit Knowledge Base", url: "https://kb.foxit.com/" },
      { label: "Foxit Downloads", url: "https://www.foxit.com/downloads/" }
    ]
  },
  quickbooks: {
    title: "QuickBooks",
    summary: "Use this for QuickBooks Enterprise Desktop and QuickBooks Online access, install, and finance handoff workflows.",
    products: ["QuickBooks Enterprise Desktop", "QuickBooks Online", "Company file or hosted session access"],
    licenseSteps: [
      "Confirm whether the client uses QuickBooks Online, QuickBooks Desktop, or a hosted / remote-published setup.",
      "Assign the correct role or seat and document which company file or tenant the user should access.",
      "Capture any finance approvals needed before changing high-trust roles."
    ],
    installSteps: [
      "Install the approved QuickBooks desktop build if the workflow requires a local client, or verify the hosted access path.",
      "Update the client to the supported release and test sign-in or company-file access.",
      "Confirm printer, export, and PDF workflows used by the accounting staff if they are part of day-one work."
    ],
    uninstallSteps: [
      "Remove the user's access to the correct QuickBooks environment before calling the offboarding complete.",
      "Uninstall the local client if the workstation no longer requires it or is being reassigned.",
      "Preserve company-file paths, backups, and finance handoff notes before cleanup."
    ],
    watchFor: [
      "Hosted, local, and online QuickBooks paths have different offboarding risks.",
      "Company-file ownership and report access should be handed off explicitly.",
      "Finance workflows deserve stronger approval evidence than ordinary application access."
    ],
    supportLinks: [
      { label: "QuickBooks Learn & Support", url: "https://quickbooks.intuit.com/learn-support/" },
      { label: "QuickBooks Desktop Downloads", url: "https://downloads.quickbooks.com/app/qbdt/products" }
    ]
  },
  egnyte: {
    title: "Egnyte",
    summary: "Use this for Egnyte user provisioning, folder-permission handoff, Desktop App rollout, and sync or deprovision cleanup.",
    products: ["Egnyte Web UI / Admin", "Egnyte Desktop App", "User types, permissions, and content handoff"],
    licenseSteps: [
      "Choose the correct Egnyte user type before creating the account because Admin, Power User, and Standard User roles behave differently.",
      "Assign the user to the right groups, folder permissions, and SSO path before testing the desktop or browser workflow.",
      "Record whether the user needs desktop-app access, offline content, and any externally shared folders or links."
    ],
    installSteps: [
      "Deploy the Egnyte Desktop App with the client's approved installer or managed deployment method if the user needs workstation access.",
      "Validate sign-in, mapped-drive or offline behavior, and confirm the user can reach the expected folders without overpermissioning.",
      "Document any offline-sync folders or special drive-letter configuration so support can reproduce the setup later."
    ],
    uninstallSteps: [
      "Suspend or deactivate the user only after confirming who now owns private content, shared links, and folder permissions.",
      "Remove offline files and uninstall the Desktop App with the supported managed or MSI workflow if the device no longer needs Egnyte.",
      "Capture the ownership handoff in documentation so future restores or audits do not rely on guesswork."
    ],
    watchFor: [
      "Egnyte user type affects what the user can do and whether desktop access fits the role.",
      "Offline files and local cache should be reviewed before a device is wiped or reassigned.",
      "Shared links and private-folder ownership are common offboarding blind spots."
    ],
    supportLinks: [
      { label: "Egnyte Help Center", url: "https://helpdesk.egnyte.com/hc/en-us" },
      { label: "Create a New User", url: "https://helpdesk.egnyte.com/hc/en-us/articles/360021277112-Create-a-New-User" },
      { label: "Desktop App for Windows Mass Deployment", url: "https://helpdesk.egnyte.com/hc/en-us/articles/216688268-Egnyte-Desktop-App-for-Windows-Mass-Deployment" },
      { label: "Intune Deployment for Desktop App Windows", url: "https://helpdesk.egnyte.com/hc/en-us/articles/28536918953357-Intune-Deployment-for-Desktop-App-Windows" }
    ]
  }
};
