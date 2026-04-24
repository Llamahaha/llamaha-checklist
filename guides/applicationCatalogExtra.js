export const applicationCatalogExtra = {
  adobe: [
    {
      name: "InDesign",
      slug: "indesign",
      focus: "Adobe layout and publishing app used for page design, document packaging, fonts, linked assets, and print-ready output.",
      licensing: "Usually covered by the user's assigned Adobe product profile or Creative Cloud entitlement and the correct work Adobe profile at sign-in.",
      install: "Install the company-approved InDesign version, confirm enterprise Adobe sign-in, and test fonts, linked assets, and one real document before handoff.",
      uninstall: "Preserve templates, packaged jobs, fonts, and linked-asset expectations before removing the local app."
    },
    {
      name: "Acrobat Sign",
      slug: "acrobat-sign",
      focus: "Adobe electronic signature workflow used to send agreements, route templates, and collect legally binding signatures in place of paper documents.",
      licensing: "Access is assigned through an Acrobat Sign product profile in Adobe Admin Console and usually requires the user to sign in with the correct enterprise Adobe work account.",
      install: "There is no required desktop install for the core service, but validate the sender's Adobe work profile, sending permissions, and one end-to-end test agreement before go-live.",
      uninstall: "Offboarding means deactivating the user in Adobe Admin Console, reassigning any in-flight agreements, and preserving audit history before removing access."
    }
  ],
  autodesk: [
    {
      name: "InfoWorks ICM",
      slug: "infoworks-icm",
      focus: "Hydraulic and hydrologic modeling platform used for drainage, flood, network, and scenario modeling with project databases and model dependencies.",
      licensing: "Typically depends on the Autodesk account assigned to the user plus the exact InfoWorks ICM product access and version approved by the organization.",
      install: "Use the approved Autodesk delivery path, match the expected year or version, and test sign-in plus one known-good model or database connection after setup.",
      uninstall: "Preserve model databases, simulation outputs, templates, and custom libraries before removing the application or changing the workstation."
    },
    {
      name: "Autodesk Construction Cloud",
      slug: "construction-cloud",
      focus: "Cloud project-hub for construction and AEC teams covering Autodesk Docs, Build, Takeoff, and what used to be the BIM 360 family, with project access, roles, and document workflows.",
      licensing: "Access depends on an Autodesk account, membership in the specific ACC or BIM 360 project, and the product access a project admin assigns per-project.",
      install: "There is no required desktop install for the web experience, but Desktop Connector and Revit Cloud collaboration components may be needed. Validate sign-in at acc.autodesk.com or docs.b360.autodesk.com, confirm the user sees the expected projects, and test opening one known-good file.",
      uninstall: "Offboarding means removing the user from the project hub, reassigning ownership of any project content they authored, and uninstalling Desktop Connector only after confirming synced files are reconciled."
    },
    {
      name: "Vault",
      slug: "vault",
      focus: "Autodesk product data management platform with a Vault Server, a desktop Vault client, and add-ins for AutoCAD, Inventor, and Revit; supports check-in/check-out and file history.",
      licensing: "Requires the appropriate Vault product (Basic, Workgroup, or Professional) plus a user account on the Vault Server and permission to the right vault.",
      install: "Install the Vault client that matches the Vault Server version, configure the server URL and vault name, confirm sign-in, and test a check-out and check-in with a small known file.",
      uninstall: "Document any files the user has checked out, have those reconciled or undo-checked-out by a Vault admin, then remove client access and uninstall the desktop app."
    }
  ],
  google: [
    {
      name: "Google Earth Pro",
      slug: "google-earth-pro",
      focus: "Desktop mapping and visualization tool used to view imagery, import KML or KMZ content, inspect locations, and present project context.",
      licensing: "Google Earth Pro is generally available without a separate paid end-user seat, so access usually depends on the installed app version and any KML, KMZ, or imported data you need to open.",
      install: "Install the current supported Google Earth Pro build, confirm the app launches cleanly, and test one saved place or KML or KMZ file if your workflow depends on it.",
      uninstall: "Export any saved places or locally stored KML or KMZ content you still need before removing the app."
    }
  ],
  hec: [
    {
      name: "HEC-HMS",
      slug: "hec-hms",
      focus: "Hydrologic modeling software used to build basin models, meteorologic models, control specs, and runoff simulations.",
      licensing: "HEC-HMS is generally used without a paid commercial end-user seat, so support usually depends on the approved version, project files, and the data paths the model relies on.",
      install: "Use the approved HEC-HMS version for the team, confirm the project opens cleanly, and verify one known model run before handoff.",
      uninstall: "Preserve project folders, basin models, meteorologic models, and exported results before removing the local app."
    },
    {
      name: "HEC-RAS",
      slug: "hec-ras",
      focus: "Hydraulic modeling software used for river analysis, floodplain workflows, terrain-backed geometry, and simulation results.",
      licensing: "HEC-RAS is generally used without a paid commercial end-user seat, so support usually depends on the correct version, project data, terrain paths, and related GIS content.",
      install: "Install the approved HEC-RAS version, confirm geometry and plan files open, and test one known project or sample run after setup.",
      uninstall: "Preserve project folders, terrain references, RAS Mapper content, and exported results before uninstalling."
    },
    {
      name: "HEC-DSSVue",
      slug: "hec-dssvue",
      focus: "Viewer and utility tool for HEC-DSS time-series data, plotting, importing, and checking DSS file contents.",
      licensing: "HEC-DSSVue is generally used without a separate paid end-user seat, so access usually depends on the correct version and the DSS data files you need to open.",
      install: "Use the team-approved DSSVue version and confirm one known DSS file opens, plots, and saves as expected.",
      uninstall: "Preserve DSS files and any local plotting or import settings that still matter before cleanup."
    },
    {
      name: "HEC-DSS",
      slug: "hec-dss",
      focus: "Hydrologic Engineering Center data-storage format and tooling used by several HEC workflows to store time-series and paired data.",
      licensing: "HEC-DSS workflows generally do not depend on a paid end-user seat, but they do depend on the correct DSS files, compatible tooling, and project data paths.",
      install: "Confirm the approved HEC toolset version and test one known DSS file with the intended workflow after setup.",
      uninstall: "Preserve DSS data files and any linked project references before removing related local tooling."
    },
    {
      name: "HEC-SSP",
      slug: "hec-ssp",
      focus: "Statistical software used for flood-frequency and related hydrologic statistical workflows tied to project datasets and exports.",
      licensing: "HEC-SSP is generally used without a paid end-user seat, so support depends more on the approved version and the project data files than on account licensing.",
      install: "Install the approved HEC-SSP version and test opening one known study or data set after setup.",
      uninstall: "Preserve studies, imported datasets, and exported outputs before uninstalling."
    },
    {
      name: "HEC-GeoRAS",
      slug: "hec-georas",
      focus: "GIS extension workflow used to prepare river geometry and related GIS data for HEC-RAS projects.",
      licensing: "HEC-GeoRAS itself is generally not a separate paid end-user seat, but it depends on the correct GIS host environment and compatible HEC-RAS workflow.",
      install: "Match the approved GIS host environment, confirm HEC-GeoRAS tools load, and test one known preprocessing workflow before handoff.",
      uninstall: "Preserve GIS project data, extensions, and HEC-RAS-linked content before cleanup."
    }
  ],
  mctrans: [
    {
      name: "HCS",
      slug: "hcs",
      focus: "Highway Capacity Software used for transportation-capacity analysis and scenario review with methods tied to the supported release in use.",
      licensing: "Access usually depends on the exact HCS version or edition your organization purchased or standardized on and the workstation or user it was assigned to.",
      install: "Use the approved HCS version, confirm the license or delivery method expected by the organization, and test one known analysis file after setup.",
      uninstall: "Preserve project files, custom settings, and version notes before removing the app."
    },
    {
      name: "HSS",
      slug: "hss",
      focus: "Highway Safety Software used for roadway-safety analysis and related transportation study workflows.",
      licensing: "Access usually depends on the exact HSS version or edition your organization purchased or standardized on and the workstation or user it was assigned to.",
      install: "Use the approved HSS version, confirm the expected delivery or licensing path, and test one known study file after setup.",
      uninstall: "Preserve project files, templates, and version notes before removing the app."
    }
  ],
  axiom: [
    {
      name: "Axiom",
      slug: "axiom",
      focus: "Axiom add-ins and productivity tools used alongside Bentley and Autodesk products to speed up modeling, drafting, and standards-driven workflows.",
      licensing: "Axiom access usually depends on the modules your organization purchased plus compatibility with the host product and year in use.",
      install: "Match the approved host application year, install the required Axiom modules, and test one real tool or ribbon action inside the host app after setup.",
      uninstall: "Preserve any custom Axiom settings, module notes, and host-app compatibility details before removing the add-in."
    }
  ],
  microsoft: [
    {
      name: "Microsoft Project",
      slug: "project",
      focus: "Project scheduling workflow covering Project desktop (MPP files), Project for the web, and Planner-based project plans.",
      licensing: "Requires a Project plan such as Project Plan 1, Project Plan 3, or Project Plan 5 assigned to the work account. Desktop Project is included only with Plan 3 or Plan 5.",
      install: "For the desktop app, deploy the Project client that matches the user's Project Plan and Office channel, confirm sign-in with the work account, and test opening one MPP. For Project for the web, validate browser access at project.microsoft.com with the correct work account.",
      uninstall: "Preserve any MPP files and published project plans before removing the desktop app, and reassign ownership in Project for the web before deactivating the user."
    }
  ],
  trimble: [
    {
      name: "Trimble Connect",
      slug: "trimble-connect",
      focus: "Cloud-based construction and AEC collaboration platform with web, desktop, and mobile clients for project folders, IFC model review, and field-to-office sharing.",
      licensing: "Trimble Connect access is tied to a Trimble Identity (TID) and includes a free Personal tier; Business and Business Premium are paid tiers with added admin, audit, and ToDo capabilities.",
      install: "Validate sign-in to Trimble Connect Web with the correct Trimble ID, confirm the user has been invited to the expected project, and install the Trimble Connect Desktop or Sync client only if the workflow requires local synced folders.",
      uninstall: "Remove the user from the project in Trimble Connect Web, reassign ownership of uploaded content, and uninstall the desktop client after confirming synced folders are reconciled."
    }
  ],
  deltek: [
    {
      name: "Deltek Vantagepoint",
      slug: "vantagepoint",
      focus: "Project-based ERP, time entry, expense, and billing workflow for AEC firms, with browser, desktop browser-wrapper, and mobile clients.",
      licensing: "Access depends on Deltek Cloud tenant membership, a user account in Vantagepoint, and the role or security profile the firm assigned.",
      install: "There is usually no local client for the core experience. Validate sign-in to the firm's Vantagepoint URL with the correct account, test opening one project and one time sheet, and install the Vantagepoint Mobile app from the App Store or Google Play if the user records time on a phone.",
      uninstall: "Offboarding means deactivating the user in Vantagepoint, reassigning any in-progress time or expense reports, and preserving historical data before any account removal."
    }
  ],
  docusign: [
    {
      name: "DocuSign Web",
      slug: "docusign-web",
      focus: "Browser-based e-signature workflow used to send envelopes, use templates, track routing, and have recipients sign.",
      licensing: "Sending access requires a DocuSign account with a sending plan assigned; recipients can sign for free without an account, but their signing link is tied to the exact email the sender used.",
      install: "No desktop install is required for the core web experience. Validate sign-in at docusign.net with the correct work account, test sending one envelope to a test recipient, and install DocuSign for Outlook or Word only if the firm's workflow relies on those add-ins.",
      uninstall: "Offboarding means transferring envelopes, templates, and shared folders to another user, then removing the user from the DocuSign account before revoking sign-in."
    }
  ],
  zoom: [
    {
      name: "Zoom Meetings",
      slug: "zoom-meetings",
      focus: "Zoom meeting client and web experience for video meetings, webinars, chat, and phone where the firm has licensed those features.",
      licensing: "Hosts need a Zoom account with the expected plan (Basic, Pro, Business, Enterprise) and any add-ons such as Webinar or Phone; guests can join without an account.",
      install: "Install the approved Zoom desktop client, sign in with the correct account or SSO, and test audio, video, screen share, and joining one test meeting. Web Zoom is a useful fallback when the desktop client is misbehaving.",
      uninstall: "Remove account membership first in the Zoom web portal, reassign any scheduled meetings or recordings, then uninstall the desktop client."
    }
  ],
  cisco: [
    {
      name: "Webex",
      slug: "webex",
      focus: "Cisco Webex Meetings desktop app, browser client, and Outlook integration for video meetings, calling, and messaging where the firm has licensed those features.",
      licensing: "Requires a Webex account on the firm's Webex site with the expected Meetings, Calling, or Messaging entitlements.",
      install: "Install the approved Webex app, sign in with the correct account on the firm's Webex site, and test joining one meeting with audio, video, and screen share. Web Webex can be used as a diagnostic when the desktop app hangs.",
      uninstall: "Remove the user in Control Hub or the Webex site admin page, reassign any scheduled meetings or recordings, then uninstall the desktop client."
    }
  ],
  box: [
    {
      name: "Box Drive",
      slug: "box-drive",
      focus: "Box desktop sync client that exposes Box folders as a drive letter on Windows or a Finder location on macOS without downloading every file.",
      licensing: "Requires a Box account on the firm's Box tenant with access to the expected folders; Box Drive itself does not require a separate seat beyond the user's Box license.",
      install: "Install the approved Box Drive client, sign in at the firm's Box URL with SSO or the work account, and confirm the expected folders appear before handing off.",
      uninstall: "Mark any offline or pending files as uploaded, sign out of Box Drive, and uninstall through the standard uninstaller before reclaiming the workstation."
    }
  ],
  dropbox: [
    {
      name: "Dropbox Desktop",
      slug: "dropbox-desktop",
      focus: "Dropbox Business desktop app with smart sync, selective sync, team and personal account switching, and a drive-letter-style experience on supported platforms.",
      licensing: "Requires membership in the firm's Dropbox Business team with the assigned license and folder permissions; the desktop client itself does not require an extra seat beyond the user's team membership.",
      install: "Install the approved Dropbox client, sign in with the team account (plus any personal account if dual-account is allowed), verify team folder visibility, and confirm sync starts cleanly.",
      uninstall: "Verify all pending uploads finish, sign out of the desktop app, remove the user from the team in the admin console, and uninstall the client afterward."
    }
  ],
  duo: [
    {
      name: "Duo Mobile",
      slug: "duo-mobile",
      focus: "Mobile multi-factor authentication app used for Duo-protected sign-ins, push approvals, and time-based passcodes.",
      licensing: "Access depends on the user being enrolled in Duo by the firm; the app itself is free and does not require a separate user purchase.",
      install: "Install Duo Mobile from the App Store or Google Play, complete the enrollment link or QR code from the Duo admin panel or self-service portal, allow notifications, and test one push approval before closing the ticket.",
      uninstall: "Before removing Duo Mobile, confirm another approved sign-in method exists, and have the admin clear the stale device from Duo if the phone is being replaced."
    }
  ],
  okta: [
    {
      name: "Okta Verify",
      slug: "okta-verify",
      focus: "Mobile multi-factor authentication app used for Okta-protected sign-ins including push notifications, number matching, and verified push.",
      licensing: "Access depends on the user being provisioned in Okta; the app itself is free and does not require a separate user purchase.",
      install: "Install Okta Verify from the App Store or Google Play, enroll through the Okta end-user dashboard or a QR code, allow notifications, and test one push approval before closing the ticket.",
      uninstall: "Before removing Okta Verify, confirm another approved factor exists, and have support reset the factor in Okta if the phone is being replaced."
    }
  ]
};
