import { applicationCatalogExtra } from "./applicationCatalogExtra.js";

const baseApplicationCatalog = {
  microsoft: [
    {
      name: "Outlook",
      slug: "outlook",
      focus: "Exchange-backed desktop mail and calendar workflow where profile state, Modern Auth, and add-ins drive most support work.",
      licensing: "Requires the expected Exchange Online mailbox and approved Office or Microsoft 365 Apps entitlement for desktop Outlook use.",
      install: "Match the client-standard Office channel, sign in to Office first, and validate OWA plus desktop access before closing the build.",
      uninstall: "Preserve signatures, PST or archive references, shared mailbox notes, and profile expectations before workstation cleanup."
    },
    {
      name: "Teams",
      slug: "teams",
      focus: "Microsoft collaboration, meetings, and calling workflow where tenant context, policy refresh, and local client state matter more than a simple reinstall.",
      licensing: "Requires a Teams-enabled service plan and, for voice workflows, the correct Teams Phone or related policy assignments.",
      install: "Use the approved new Teams deployment path, confirm the right tenant, and validate chat, channel, meeting, and device behavior.",
      uninstall: "Sign out cleanly, document tenant context and voice dependencies, and remove stale local client state only after web Teams works."
    },
    {
      name: "OneDrive",
      slug: "onedrive",
      focus: "Sync client for personal and SharePoint-backed files where tenant selection, path conflicts, and local cache pressure create most incidents.",
      licensing: "Requires a OneDrive-enabled Microsoft 365 license and access to the intended tenant or SharePoint libraries.",
      install: "Validate sign-in, Files On-Demand expectations, approved sync roots, and one real upload and download test before handoff.",
      uninstall: "Confirm pending changes are uploaded, document offline folders, then unlink and clean up old sync roots carefully."
    },
    {
      name: "SharePoint",
      slug: "sharepoint",
      focus: "Browser and Office-integrated site and library workflow where permissions, IRM, and open-in-app behavior matter more than local installation alone.",
      licensing: "Depends on SharePoint-enabled licensing, correct site membership, and any IRM, sensitivity, or DLP policy scope in the tenant.",
      install: "There is no standalone app, but validate browser access, Office sign-in, open-in-app, and sync behavior for the target site or library.",
      uninstall: "Offboarding means removing site access, preserving synced content as needed, and documenting any protected-library workflows that remain in scope."
    },
    {
      name: "Outlook Mobile",
      slug: "outlook-mobile",
      focus: "Mobile work email and calendar access on iPhone or Android, where account choice, device registration, and app permissions matter most.",
      licensing: "Requires an active Microsoft 365 mailbox for the signed-in work account, plus any company mobile access policies that apply to the device.",
      install: "Install Outlook from the iPhone App Store or Google Play, sign in with the expected work account, and allow mail, calendar, contacts, and notification permissions when prompted.",
      uninstall: "Remove the work account from Outlook Mobile, confirm any company data you need is available elsewhere, then remove the app if you no longer need it."
    },
    {
      name: "Teams Mobile",
      slug: "teams-mobile",
      focus: "Mobile Teams access for chat, meetings, calls, and files on iPhone or Android devices.",
      licensing: "Requires a Microsoft 365 account with Teams access, and company policies may also require device registration or approved mobile app protection settings.",
      install: "Install Teams from the iPhone App Store or Google Play, sign in with the expected work account, and confirm notifications, camera, microphone, and file access permissions as needed.",
      uninstall: "Sign out of Teams Mobile, remove the work account if the device is shared, and uninstall the app only after confirming you no longer need mobile meeting or chat access."
    },
    {
      name: "Microsoft Authenticator",
      slug: "microsoft-authenticator",
      focus: "Mobile multi-factor authentication app used for Microsoft sign-ins, number matching, approval prompts, and work account setup.",
      licensing: "Access depends on the same work account used for Microsoft 365 or company sign-in, plus any company multi-factor requirements already assigned to the account.",
      install: "Install Microsoft Authenticator from the iPhone App Store or Google Play, follow the company or Microsoft setup prompt, and allow notifications plus camera access for QR code setup if needed.",
      uninstall: "Do not remove Microsoft Authenticator until you confirm you have another approved sign-in method or the new phone is already set up."
    }
  ],
  browsers: [
    {
      name: "Google Chrome",
      slug: "google-chrome",
      focus: "General browser support for work websites, downloads, passwords, extensions, and default-browser behavior in Chrome.",
      licensing: "Chrome itself does not require a paid user license for normal work browsing, but access to work sites still depends on your company account and any browser sign-in or sync settings your organization uses.",
      install: "Install the current supported Chrome version, confirm the browser opens normally, and verify downloads, pop-ups, and default-browser behavior for work sites if needed.",
      uninstall: "If Chrome is your default browser, note any saved passwords, bookmarks, or work extensions you still need before removing it."
    },
    {
      name: "Microsoft Edge",
      slug: "microsoft-edge",
      focus: "General browser support for Microsoft Edge when work sites, downloads, file handoffs, or Microsoft 365 sign-in pages are not behaving normally.",
      licensing: "Edge itself does not require a paid user license for normal browsing, but access to work sites still depends on the Microsoft or company account used in the browser and any organization policies applied to it.",
      install: "Use the current supported Edge version, confirm browser sign-in if your company uses it, and test downloads, file opening, and site access with one known-good work site.",
      uninstall: "If Edge is your default browser, note any saved passwords, favorites, or work profiles you still need before removing or resetting it."
    },
    {
      name: "Mozilla Firefox",
      slug: "mozilla-firefox",
      focus: "General browser support for Firefox when web apps, downloads, saved sign-ins, or extensions are behaving differently than expected.",
      licensing: "Firefox itself does not require a paid user license for normal browsing, but access to work sites still depends on your company accounts, saved site data, and any required extensions.",
      install: "Install the current supported Firefox version, confirm basic browsing works, and test the work site, download, or sign-in flow you use most often.",
      uninstall: "Before removing Firefox, note any saved bookmarks, passwords, or work extensions you still need."
    },
    {
      name: "Safari",
      slug: "apple-safari",
      focus: "General browser support for Safari on Apple devices when work sites, downloads, Apple file handoffs, or saved sign-ins are not behaving normally.",
      licensing: "Safari itself does not require a paid user license for normal browsing, but access to work sites still depends on your company account and any Apple device or browser settings involved.",
      install: "Use the current supported Safari version through normal Apple updates and confirm the work site or sign-in flow opens correctly.",
      uninstall: "Safari is built into Apple devices, so support usually focuses on settings, updates, saved site data, or defaults rather than removing the browser."
    }
  ],
  fortinet: [
    {
      name: "FortiClient VPN",
      slug: "forticlient-vpn",
      focus: "Remote-access VPN app used to reach internal company resources, file shares, and private web tools when you are away from the office.",
      licensing: "This environment uses the free FortiClient VPN client, so access usually depends on the company VPN profile your company provided and the sign-in method required for that connection.",
      install: "Use the company-approved FortiClient build and VPN profile, sign in with the exact account or username format your company expects, and test one internal site or file path after you connect.",
      uninstall: "Before removing FortiClient, confirm you no longer need the company VPN profile and note any connection names or remote-access instructions you still need."
    }
  ],
  citrix: [
    {
      name: "Citrix Workspace App",
      slug: "workspace-app",
      focus: "Remote app and virtual desktop client used to open published applications and desktops from a company Citrix workspace.",
      licensing: "Citrix Workspace App itself is generally just the client. Access depends on the company workspace URL, the work account you use to sign in, and whether your company has published the app or desktop to you.",
      install: "Use the company-approved Citrix Workspace App build or workspace sign-in link, restart after install if prompted, and test one published app or desktop from the company workspace.",
      uninstall: "Before removing Citrix Workspace App, confirm you no longer need that company workspace on the computer and make note of the workspace URL or any company launch instructions you still need."
    }
  ],
  oracle: [
    {
      name: "Oracle Primavera P6",
      slug: "primavera-p6",
      focus: "Project scheduling and planning app used to open, review, and manage Primavera P6 projects and schedules.",
      licensing: "Access usually depends on the Primavera P6 login your company assigned, the correct database connection, and any cloud-connected or cached environment your team uses.",
      install: "Use the company-approved Primavera P6 install or launcher, confirm the correct database appears in the login dialog, and test sign-in with the expected work login before opening live projects.",
      uninstall: "Before removing P6, confirm you no longer need that local install and avoid deleting cached project data unless support confirms it is safe."
    }
  ],
  autodesk: [    {
      name: "AutoCAD",
      focus: "Base drafting platform used by many Autodesk products and add-ins.",
      licensing: "Usually covered by a named-user Autodesk entitlement or broader collection assignment.",
      install: "Match the exact release year, language pack, and required Autodesk Access or deployment package used by the client.",
      uninstall: "Remove the local app only after confirming the Autodesk assignment and any shared profiles or plot styles are documented.",
      supportChecks: [
        "Validate the exact release year, profile import, plotter setup, and any Autodesk vertical dependencies before day-one handoff.",
        "Confirm DWG file associations, Autodesk sign-in, and network paths for templates, CTB or STB files, tool palettes, and fonts.",
        "Capture custom workspace, ribbon, or support-path changes in the ticket so rebuilds do not start from scratch."
      ],
      commonIssues: [
        {
          issue: "AutoCAD opens but the expected plot styles, title blocks, or tool palettes are missing",
          fix: "Restore the client's support paths, profile import, and shared standards folders before reaching for a reinstall."
        },
        {
          issue: "The user can sign in but still sees the wrong Autodesk product mix",
          fix: "Compare the Autodesk assignment against the exact collection or standalone app the role needs, then clear stale sign-in state and relaunch."
        }
      ],
      faq: [
        {
          q: "What should we verify beyond a successful launch?",
          a: "Plotting, support paths, profile import, fonts, and templates should all be treated as part of a complete AutoCAD handoff."
        }
      ]
    },
    {
      name: "Civil 3D",
      focus: "AEC civil design workflow with project templates, styles, and object enablers that often vary by client.",
      licensing: "Typically included through an AEC Collection or specific named-user assignment in Autodesk Account.",
      install: "Deploy the approved year build plus country kits, content packs, and client-specific templates before handoff.",
      uninstall: "Preserve custom templates, pipe networks, shortcuts, and workspace data before removing the local install.",
      supportChecks: [
        "Verify the exact release year, object enablers, country kit, and any add-ins used by the civil team before closing the ticket.",
        "Confirm data shortcuts, shared template paths, and profile or style libraries resolve from the workstation.",
        "Capture any client-specific standards folders and support-path changes because they are usually the real differentiator between a good and bad Civil 3D build."
      ],
      commonIssues: [
        {
          issue: "Civil 3D launches but data shortcuts or references are broken",
          fix: "Check mapped paths, project workspace standards, and support folders before reinstalling the application itself."
        },
        {
          issue: "The user can open the app but needed styles or object enablers are missing",
          fix: "Compare the workstation against the approved client build, including country kits, content packs, and companion installers."
        }
      ]
    },
    {
      name: "Revit",
      focus: "BIM authoring platform that depends heavily on add-ins, families, and templates beyond the base install.",
      licensing: "Usually assigned as a named-user Autodesk entitlement or through a collection seat.",
      install: "Deploy the exact version used by the project team and restore approved add-ins, families, and templates.",
      uninstall: "Capture local family libraries, custom add-ins, and project cache locations before workstation cleanup.",
      supportChecks: [
        "Match the exact Revit version used by the project team, not just the same product family.",
        "Restore approved add-ins, families, templates, and collaboration tools before calling the build complete.",
        "Document local cache, cloud model, and library paths so rebuilds and offboarding do not orphan useful content."
      ],
      commonIssues: [
        {
          issue: "Revit opens but required add-ins or families are unavailable",
          fix: "Compare the workstation against the team's approved Revit stack, including add-ins, family libraries, and templates."
        },
        {
          issue: "The user is on the wrong Revit version for the project",
          fix: "Confirm the project team standard first, because a technically working install can still be unusable if the year or update level is wrong."
        }
      ],
      faq: [
        {
          q: "Why do version mismatches matter so much in Revit?",
          a: "Because Revit projects, add-ins, and families are often tightly tied to the release and update level the project team standardized on."
        }
      ]
    },
    {
      name: "Autodesk Desktop App",
      slug: "autodesk-desktop-app",
      focus: "Update and entitlement helper component that often influences whether the broader Autodesk stack patches and refreshes correctly.",
      licensing: "Uses the same Autodesk identity and entitlement path as the assigned products, but should still match the client's supported updater path.",
      install: "Install the approved Autodesk updater component and verify sign-in, update visibility, and its relationship to Autodesk Access in that environment.",
      uninstall: "Do not remove it casually if the client still relies on it for updates or entitlement refresh. Document whether Autodesk Access replaces it first."
    },
    {
      name: "ReCap Pro",
      focus: "Reality capture tooling often paired with Autodesk collections and large local data sets.",
      licensing: "Normally tied to the same Autodesk named-user sign-in used for collection products.",
      install: "Install the approved release and verify the workstation has the storage and GPU profile expected for scan processing.",
      uninstall: "Move any retained point-cloud data or processing outputs before removing the application."
    },
    {
      name: "InfraWorks",
      focus: "Conceptual infrastructure modeling platform often used alongside Civil 3D and other AEC tools.",
      licensing: "Usually covered by the user's Autodesk collection or named-user entitlement.",
      install: "Install the client-approved version and test sign-in, model open, and any cloud-linked project requirements.",
      uninstall: "Confirm no local models, styles, or connectors need to be handed off before removal."
    }
  ],
  bentley: [
    {
      name: "MicroStation",
      focus: "Core Bentley desktop platform used as the base for many discipline-specific workflows.",
      licensing: "Usually relies on Bentley entitlement validation through CONNECTION Client and assigned product access.",
      install: "Deploy the approved release, workspace, and standards path together so the user sees the correct environment on first launch.",
      uninstall: "Preserve workspace customizations and confirm entitlement cleanup before removing the local client."
    },
    {
      name: "ProjectWise",
      focus: "Document and project collaboration platform with datasource, cache, and client integration dependencies.",
      licensing: "Access is tied to Bentley identity, datasource permissions, and any client-managed project roles.",
      install: "Install Explorer or required clients, configure datasources, and test check-in and check-out workflows before handoff.",
      uninstall: "Clear cached work areas only after confirming all checked-out or local files were reconciled.",
      supportChecks: [
        "Validate datasource access, Bentley sign-in, and any integration modules the user's discipline relies on.",
        "Confirm local cache and work area paths follow the client standard and that the user can open, check out, and check in a real test file.",
        "Document any checked-out content or local-only project files before offboarding or workstation replacement."
      ],
      commonIssues: [
        {
          issue: "ProjectWise opens but the expected datasource or project tree is missing",
          fix: "Recheck datasource configuration, permissions, and cached connection settings before changing the Bentley install itself."
        },
        {
          issue: "The user loses work because local work areas were cleaned too early",
          fix: "Verify all checked-out and cached files are reconciled before clearing local work areas during repair or offboarding."
        }
      ]
    },
    {
      name: "OpenRoads Designer",
      focus: "Civil roadway design platform with standards, workspaces, and civil content dependencies.",
      licensing: "Usually provisioned through the Bentley entitlement model used for civil products.",
      install: "Deploy the approved civil workspace, templates, and standards files in addition to the core installer.",
      uninstall: "Preserve custom standards and project work areas before removal or rebuild."
    },
    {
      name: "SYNCHRO",
      focus: "Construction planning and 4D sequencing tools that may have separate project data and service dependencies.",
      licensing: "Confirm the exact SYNCHRO entitlement or subscription path the client uses before assignment.",
      install: "Install the approved version and verify the user can access the intended project environment and saved configurations.",
      uninstall: "Capture local project files, exports, and custom templates before cleanup."
    },
    {
      name: "Bentley View",
      focus: "Viewer-only workflow often used where a full authoring product is not required.",
      licensing: "Lower-friction than full authoring products, but still validate whether the client expects Bentley sign-in or managed deployment.",
      install: "Install the approved viewer build and verify file associations with the file types the team opens most often.",
      uninstall: "Reset defaults if the workstation is moving back to another CAD viewer or editor."
    },
    {
      name: "STAAD",
      focus: "Structural analysis tooling that often depends on project libraries and discipline plug-ins.",
      licensing: "Usually assigned through Bentley structural entitlements tied to the user's CONNECT identity.",
      install: "Deploy the approved release and confirm standards files, templates, and analysis modules are present.",
      uninstall: "Preserve custom templates, design files, and local analysis outputs before removal."
    },
    {
      name: "OpenFlows Storm",
      focus: "Stormwater modeling tool with model libraries and hydraulic settings that may be project-specific.",
      licensing: "Confirm the OpenFlows entitlement and whether the client uses named-user, subscription, or pooled access behavior.",
      install: "Install the approved version and verify the model libraries and project folders expected by engineering are reachable.",
      uninstall: "Capture model files and shared libraries before wiping the workstation."
    },
    {
      name: "OpenFlows Sewer",
      focus: "Sewer and wastewater modeling workflow that often travels with shared standards and model files.",
      licensing: "Provision through the Bentley access model used for the client and confirm the right product is actually assigned.",
      install: "Deploy the approved client plus any shared libraries, sample projects, and environment settings the team relies on.",
      uninstall: "Preserve project models and any shared data sources before cleanup."
    },
    {
      name: "CONNECTION Client",
      focus: "Sign-in and entitlement component required by many Bentley CONNECT Edition applications.",
      licensing: "This is the sign-in and license-refresh path rather than the product seat itself, but it is still critical to access.",
      install: "Install or update CONNECTION Client first when the broader Bentley stack depends on it, then validate sign-in.",
      uninstall: "Avoid removing it before other Bentley products are retired if the workstation still needs entitlement refresh."
    },
    {
      name: "Civil Applications",
      focus: "General Bentley civil portfolio workflows where the exact app mix varies by client and project type.",
      licensing: "Document the actual civil products assigned so the entitlement path is clear at renewal or offboarding time.",
      install: "Deploy only the civil modules the user actually needs and restore standards paths with the install.",
      uninstall: "Retain workspaces and local project content before reclaiming the build."
    },
    {
      name: "OpenBridge Designer",
      focus: "Bridge design workflow that usually layers on civil standards and project libraries.",
      licensing: "Confirm OpenBridge entitlement coverage and any related civil dependencies in the user's Bentley access.",
      install: "Install the approved version alongside required civil workspaces, templates, and shared standards.",
      uninstall: "Preserve bridge project workspaces and local model data before removing the application."
    },
    {
      name: "OpenBridge Modeler",
      focus: "Bridge modeling workflow often used alongside OpenBridge Designer and civil standards content.",
      licensing: "Typically tied to the same Bentley identity and entitlement model used for other bridge products.",
      install: "Deploy the correct release and confirm the user can load required templates, standards, and reference content.",
      uninstall: "Capture model caches and custom workspaces before cleanup."
    },
    {
      name: "OpenRoads SignCAD",
      focus: "Specialized sign-design tool that can be easy to miss in a broader civil rollout.",
      licensing: "Verify that the entitlement includes SignCAD specifically instead of assuming the broader civil stack covers it.",
      install: "Install the approved release and restore any standards libraries or sign templates used by the client.",
      uninstall: "Preserve sign libraries, templates, and exports before removing the software."
    },
    {
      name: "RAM Elements",
      focus: "Structural engineering tool where templates and analysis libraries may matter as much as the core install.",
      licensing: "Confirm RAM Elements is part of the user's assigned Bentley access before day-one testing.",
      install: "Deploy the supported version and validate that the workstation can open the expected model types without entitlement errors.",
      uninstall: "Retain analysis files, templates, and shared libraries prior to cleanup."
    },
    {
      name: "OpenFlows Hydraulic Toolset",
      focus: "Hydraulic modeling bundle that may include multiple related OpenFlows capabilities.",
      licensing: "Document whether the client licenses the full toolset or selected hydraulic modules only.",
      install: "Install the approved toolset and verify project libraries and hydraulic settings are in place.",
      uninstall: "Preserve project models and shared settings before uninstalling the bundle."
    },
    {
      name: "OpenFlows Water",
      focus: "Water-distribution modeling workflow with shared models and standards that should survive user turnover.",
      licensing: "Confirm the user's Bentley entitlement includes the water product actually used by the engineering team.",
      install: "Deploy the correct release and verify model access, libraries, and project paths before handoff.",
      uninstall: "Move model files and any custom libraries out of the local profile before cleanup."
    },
    {
      name: "GEOPAK",
      focus: "Legacy civil workflow that may still exist in long-lived client environments.",
      licensing: "Legacy environments should be documented carefully because GEOPAK assumptions often differ from current Bentley standards.",
      install: "Match the exact legacy build and supporting workspace used by the client rather than normalizing to a newer product by accident.",
      uninstall: "Preserve legacy standards, macros, and project folders before removing or replacing the build."
    }
  ],
  esri: [
    {
      name: "ArcGIS Online",
      focus: "Portal, group, and content ownership workflow that often matters more than the local desktop app.",
      licensing: "Assign the correct user type, role, add-on licenses, and group access in the correct ArcGIS Online organization.",
      install: "No local install is required for the portal itself, but validate sign-in, group membership, and access to hosted content on day one.",
      uninstall: "Offboarding means transferring content ownership, removing group access, and cleaning up role assignments rather than removing software."
    },
    {
      name: "ArcGIS Pro",
      focus: "Desktop GIS authoring platform tied closely to Named User licensing and extension assignment.",
      licensing: "Validate the ArcGIS Pro license level and required extensions in the user's portal profile before launch.",
      install: "Install the approved ArcGIS Pro version, sign in to the right licensing portal, and test project and layer access.",
      uninstall: "Return offline licenses if used, then remove the local client only after confirming content and extension handoff.",
      supportChecks: [
        "Verify the ArcGIS Pro license level, portal URL, and extension assignments before opening the desktop client.",
        "Test sign-in to the intended licensing portal and confirm the user can reach expected layers, projects, and shared content.",
        "Document any offline licensing, custom toolboxes, or project-folder mappings used by the team."
      ],
      commonIssues: [
        {
          issue: "ArcGIS Pro installs correctly but shows the wrong license level or missing extensions",
          fix: "Review the user's portal licensing assignments and confirm the sign-in is hitting the correct ArcGIS organization."
        },
        {
          issue: "The user can sign in but cannot see the right projects or layers",
          fix: "Check group membership, portal selection, and extension access before rebuilding the workstation."
        }
      ]
    }
  ],
  ptc: [
    {
      name: "Mathcad Prime",
      focus: "Engineering calculation environment that can depend on local templates and license-source configuration.",
      licensing: "Confirm whether Mathcad Prime uses named-user, floating, or local license behavior in that client environment.",
      install: "Deploy the approved Prime version, point the workstation at the correct license source, and test worksheet open and save behavior.",
      uninstall: "Preserve worksheets, templates, and any custom configuration before removing the client or reclaiming the entitlement.",
      supportChecks: [
        "Verify the exact Prime version and license-source path expected by the client before handing the workstation over.",
        "Test worksheet open, save, and any template library or integration path the engineers use most often.",
        "Capture environment variables, license-server references, and template locations in the ticket for future troubleshooting."
      ],
      commonIssues: [
        {
          issue: "Mathcad Prime launches but cannot acquire a license",
          fix: "Recheck the configured license source, server reachability, and any environment-variable or config-file settings before reinstalling."
        },
        {
          issue: "The user can open Prime but shared templates or worksheets are missing",
          fix: "Restore the approved template paths and shared content libraries from the client standard rather than treating it like a pure install failure."
        }
      ]
    }
  ],
  sketchup: [
    {
      name: "SketchUp",
      focus: "Trimble-managed subscription product with strong dependence on the right Trimble identity and extensions.",
      licensing: "Assign the SketchUp seat in Trimble admin first and verify the user's identity will authenticate against the correct account.",
      install: "Install the approved version plus required extensions, templates, and companion tools used by the client.",
      uninstall: "Deauthorize or remove the seat assignment and preserve local templates, extensions, and components before cleanup."
    }
  ],
  trimble: [
    {
      name: "SketchUp",
      focus: "Included here because many MSPs manage SketchUp from the broader Trimble identity and subscription stack.",
      licensing: "Validate the SketchUp subscription and user identity in the Trimble admin surface before deployment.",
      install: "Use the approved SketchUp installer and verify sign-in, templates, and extension access.",
      uninstall: "Recover the seat and remove local extensions or templates only after documenting anything custom.",
      supportChecks: [
        "Confirm the correct Trimble identity, supported version, and extension set before day-one handoff.",
        "Test sign-in, 3D Warehouse or Extension Warehouse access, and any template or component-library paths the team uses.",
        "Document custom extensions and default templates so rebuilds do not quietly lose functionality."
      ],
      commonIssues: [
        {
          issue: "SketchUp launches but expected extensions or templates are missing",
          fix: "Restore the approved extension bundle and templates from the client standard instead of assuming the base install is enough."
        },
        {
          issue: "The user is licensed in Trimble but SketchUp still acts unassigned",
          fix: "Clear stale sign-in state, confirm the correct Trimble identity, and verify the seat is attached to that exact account."
        }
      ]
    },
    {
      name: "Trimble Business Center",
      focus: "Survey and construction office workflow that often depends on local project data and hardware-related integrations.",
      licensing: "Confirm the exact TBC edition, feature modules, and entitlement model before assigning or reinstalling the product.",
      install: "Deploy the approved TBC version and validate sign-in, project access, and any required controller or survey-data integrations.",
      uninstall: "Preserve project files, custom reports, and configuration data before reclaiming the workstation or entitlement.",
      supportChecks: [
        "Validate the licensed edition, enabled modules, and any hardware or controller integration expected by the role.",
        "Confirm the workstation can open the team's project data and that any shared templates, coordinate systems, or reports are present.",
        "Document local project paths, reports, and integration settings before rebuilds or offboarding."
      ],
      commonIssues: [
        {
          issue: "Trimble Business Center opens but key survey or project modules are unavailable",
          fix: "Compare the assigned edition and licensed modules against the exact feature set the client expects."
        },
        {
          issue: "The user can sign in but cannot work with the expected project data",
          fix: "Check data paths, project-folder access, and companion integration settings before troubleshooting licensing alone."
        }
      ]
    }
  ],
  adobe: [
    {
      name: "Creative Cloud Desktop",
      focus: "Adobe app broker and sign-in layer used to install, update, and activate other Adobe applications.",
      licensing: "Seat assignment lives in Adobe Admin Console product profiles, not in the local installer itself.",
      install: "Deploy the approved Creative Cloud package, confirm enterprise sign-in, and verify the user lands in the correct org profile.",
      uninstall: "Remove product assignments first, then clean up the desktop app if the workstation no longer needs Adobe tooling."
    },
    {
      name: "Photoshop",
      focus: "Creative app that often needs fonts, plug-ins, presets, and cloud-file sign-in to be fully usable.",
      licensing: "Covered by the assigned Adobe product profile or broader Creative Cloud entitlement.",
      install: "Install from the client-standard package or Creative Cloud app, then validate sign-in and any required plug-ins or fonts.",
      uninstall: "Capture presets, fonts, and templates the team expects to reuse before removing the local app."
    },
    {
      name: "Illustrator",
      focus: "Vector-design workflow where fonts, templates, and shared assets often matter beyond the base install.",
      licensing: "Usually enabled through the same Adobe product profile as other Creative Cloud apps.",
      install: "Deploy the approved version, confirm enterprise activation, and restore shared templates or fonts if the role needs them.",
      uninstall: "Preserve shared templates, fonts, and exported assets before reclaiming the workstation."
    },
    {
      name: "Acrobat Pro",
      focus: "Managed PDF editing, signing, and integration workflow used widely across office and project teams.",
      licensing: "Assign the Acrobat Pro entitlement in Admin Console and make sure the user signs in with the correct managed identity.",
      install: "Deploy the approved Acrobat package, confirm activation, and test browser or Office plug-ins if the client relies on them.",
      uninstall: "Recover the seat in Admin Console and reset default PDF handling if another PDF app is taking over.",
      supportChecks: [
        "Verify Admin Console assignment, managed-identity sign-in, and whether the role needs browser or Office integrations enabled.",
        "Test PDF opening, editing, signing, and the default-app workflow expected on that workstation.",
        "Document whether the user relies on templates, signatures, stamps, or plug-ins that need to survive rebuilds."
      ],
      commonIssues: [
        {
          issue: "Acrobat Pro installs but still behaves like Reader or asks for sign-in repeatedly",
          fix: "Recheck the Admin Console assignment and confirm the user is selecting the managed enterprise identity, not a personal Adobe ID."
        },
        {
          issue: "PDFs open but browser or Office actions are missing",
          fix: "Validate the approved add-ins, extensions, and default PDF handler because those pieces are often skipped in managed rollouts."
        }
      ]
    }
  ],
  bluebeam: [
    {
      name: "Revu 21",
      focus: "Current subscription-based Bluebeam desktop app with Studio access tied to Bluebeam account sign-in.",
      licensing: "Assign the appropriate Revu 21 subscription tier and verify the user can sign in with their Bluebeam ID.",
      install: "Install the approved Revu 21 build, confirm activation, and test Studio access plus any shared tool sets or profiles.",
      uninstall: "Remove the user assignment first, then preserve tool chests, profiles, and stamps before uninstalling locally.",
      supportChecks: [
        "Validate the correct Bluebeam subscription tier and that the user's BBID is active before handoff.",
        "Test Studio sign-in, profile loading, and any shared tool chest, stamp, or markup profile used by the team.",
        "Capture custom profiles and tool sets so they can be restored during rebuild or user turnover."
      ],
      commonIssues: [
        {
          issue: "Revu 21 installs but Studio or cloud sign-in fails",
          fix: "Verify BBID validation, supported version, and network access to Bluebeam services before assuming the workstation build is bad."
        },
        {
          issue: "The user can open Revu but shared profiles or tool sets are missing",
          fix: "Restore the team-standard profiles, tool chests, and stamps because those are often stored outside the base install."
        }
      ]
    }
  ],
  foxit: [
    {
      name: "PDF Editor",
      focus: "Primary licensed Foxit editing workflow with plug-ins, activation, and default-app considerations.",
      licensing: "Confirm whether the environment uses Foxit account activation, Admin Console control, or a perpetual-key workflow.",
      install: "Deploy the approved build, activate with the correct method, and test Office integrations and default PDF behavior.",
      uninstall: "Deactivate or recover the seat first, then remove the desktop app and reset defaults if another PDF platform replaces it."
    },
    {
      name: "PDF Reader",
      focus: "Lower-footprint Foxit viewing workflow often used where full editing is not required.",
      licensing: "Reader-only deployment is simpler but should still match the client's approved product and extension set.",
      install: "Install the approved Reader build and confirm file associations, browser behavior, and any plug-in expectations.",
      uninstall: "Remove the app cleanly and validate that PDFs now open in the intended replacement application."
    }
  ],
  quickbooks: [
    {
      name: "QuickBooks Enterprise Desktop",
      focus: "Rich Windows client with company-file, multi-user, network, and printing dependencies.",
      licensing: "Confirm the exact Enterprise year, hosting model, user role, and entitlement path before setup or recovery.",
      install: "Install the approved desktop build, update to the supported release, and validate company-file, printer, and export workflows.",
      uninstall: "Use Intuit's supported cleanup path, preserve company-file locations and backups, and remove access before reclaiming the seat.",
      supportChecks: [
        "Verify the exact QuickBooks year, company-file path, hosting model, and user-role expectations before handoff.",
        "Test sign-in, multi-user access, printing, PDF workflows, and any mapped drives or UNC paths tied to the company file.",
        "Document backups, file locations, and Tool Hub usage notes so support does not have to rediscover them under pressure."
      ],
      commonIssues: [
        {
          issue: "QuickBooks opens but cannot reach the company file or multi-user environment",
          fix: "Check hosting settings, share access, mapped or UNC paths, and server connectivity before reinstalling the desktop client."
        },
        {
          issue: "Printing or PDF tasks fail even though the program launches",
          fix: "Treat printer mappings, PDF drivers, and Tool Hub repair steps as part of the QuickBooks workflow, not a separate side issue."
        }
      ],
      faq: [
        {
          q: "What should be documented before offboarding a QuickBooks Desktop user?",
          a: "Company-file access, hosting path, backups, report ownership, and any finance approvals should be captured before the user is removed."
        }
      ]
    },
    {
      name: "QuickBooks Online",
      focus: "Browser-based accounting workflow where role assignment and ownership handoff matter more than a local installer.",
      licensing: "Assign the correct QBO role, access level, and company membership with finance approval where required.",
      install: "There is no required desktop client for the core service, but validate browser access, MFA, and any supported companion tools.",
      uninstall: "Offboarding means removing the online role, reassigning finance ownership, and preserving audit-sensitive settings."
    }
  ],
  egnyte: [
    {
      name: "Egnyte Web UI / Admin",
      focus: "Primary admin and browser-based content-management surface where user type, groups, and folder permissions are controlled.",
      licensing: "Choose the right user type, usually Power User for employees and Standard User for external collaborators, before granting access.",
      install: "No desktop install is required, but validate SSO, folder permissions, shared links, and admin visibility in the web UI.",
      uninstall: "Offboarding should normally deactivate first, review private content and shared links, then delete only when retention decisions are complete."
    },
    {
      name: "Egnyte Desktop App",
      focus: "Mapped-drive style access with offline sync, file locking, and mass-deployment options for managed Windows environments.",
      licensing: "Egnyte states Desktop App access is for Admin and Power Users, so the user type must support the app before rollout.",
      install: "Use the approved desktop installer or mass-deployment method, preconfigure drives if needed, and test offline sync or drive mapping behavior.",
      uninstall: "Remove offline folders and cached data carefully, then uninstall using the supported MSI or managed-deployment path.",
      supportChecks: [
        "Confirm the user's Egnyte role supports Desktop App use and that the correct tenant, drive-letter, or label settings are being deployed.",
        "Test sign-in, mapped-drive behavior, offline access, and visibility to the expected folders before the ticket is closed.",
        "Document offline folders, special drive mappings, and any mass-deployment parameters used for that client."
      ],
      commonIssues: [
        {
          issue: "The Desktop App installs but mounts the wrong tenant or drive configuration",
          fix: "Review the deployment parameters and preconfigured domain, label, SSO, or drive-letter settings before blaming the installer."
        },
        {
          issue: "The user can sign in but the mapped drive or offline files do not behave as expected",
          fix: "Check the user's Egnyte role, folder permissions, and offline-folder choices before rebuilding the workstation."
        }
      ]
    }
  ]
};

export const applicationCatalog = Object.fromEntries(
  [...new Set([...Object.keys(baseApplicationCatalog), ...Object.keys(applicationCatalogExtra)])].map(key => [
    key,
    [...(baseApplicationCatalog[key] ?? []), ...(applicationCatalogExtra[key] ?? [])]
  ])
);



const slugOverrides = {
  microsoft: {
    Outlook: "outlook",
    Teams: "teams",
    OneDrive: "onedrive",
    SharePoint: "sharepoint"
  },
  autodesk: {
    "Civil 3D": "civil-3d",
    "Autodesk Desktop App": "autodesk-desktop-app",
    "ReCap Pro": "recap-pro"
  },
  bentley: {
    "CONNECTION Client": "connection-client",
    "OpenRoads Designer": "openroads-designer",
    "OpenBridge Designer": "openbridge-designer",
    "OpenBridge Modeler": "openbridge-modeler",
    "OpenRoads SignCAD": "openroads-signcad",
    "OpenFlows Storm": "openflows-storm",
    "OpenFlows Sewer": "openflows-sewer",
    "OpenFlows Hydraulic Toolset": "openflows-hydraulic-toolset",
    "OpenFlows Water": "openflows-water",
    "RAM Elements": "ram-elements",
    "Bentley View": "bentley-view",
    "Civil Applications": "civil-applications"
  },
  esri: {
    "ArcGIS Online": "arcgis-online",
    "ArcGIS Pro": "arcgis-pro"
  },
  ptc: {
    "Mathcad Prime": "mathcad-prime"
  },
  trimble: {
    "Trimble Business Center": "trimble-business-center"
  },
  adobe: {
    "Creative Cloud Desktop": "creative-cloud-desktop",
    "Acrobat Pro": "acrobat-pro"
  },
  bluebeam: {
    "Revu 21": "revu-21"
  },
  foxit: {
    "PDF Editor": "pdf-editor",
    "PDF Reader": "pdf-reader"
  },
  quickbooks: {
    "QuickBooks Enterprise Desktop": "quickbooks-enterprise-desktop",
    "QuickBooks Online": "quickbooks-online"
  },
  egnyte: {
    "Egnyte Web UI / Admin": "egnyte-web-admin",
    "Egnyte Desktop App": "egnyte-desktop-app"
  },
  fortinet: {
    "FortiClient VPN": "forticlient-vpn"
  },
  citrix: {
    "Citrix Workspace App": "workspace-app"
  },
  oracle: {
    "Oracle Primavera P6": "primavera-p6"
  }
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getApplicationSlug(vendorSlug, app) {
  if (app.slug) {
    return app.slug;
  }

  return slugOverrides[vendorSlug]?.[app.name] ?? slugify(app.name);
}

export function getVendorApplications(vendorSlug) {
  return (applicationCatalog[vendorSlug] ?? []).map(app => ({
    ...app,
    slug: getApplicationSlug(vendorSlug, app)
  }));
}

export function getApplicationGuide(vendorSlug, appSlug) {
  return getVendorApplications(vendorSlug).find(app => app.slug === appSlug) ?? null;
}

export function getAllApplications() {
  return Object.keys(applicationCatalog).flatMap(vendorSlug =>
    getVendorApplications(vendorSlug).map(app => ({
      vendorSlug,
      ...app
    }))
  );
}

export function buildAppGuideUrl(vendorSlug, appSlug) {
  return `guides/${vendorSlug}/${appSlug}.html`;
}
