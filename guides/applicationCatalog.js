export const applicationCatalog = {
  autodesk: [
    {
      name: "AutoCAD",
      focus: "Base drafting platform used by many Autodesk products and add-ins.",
      licensing: "Usually covered by a named-user Autodesk entitlement or broader collection assignment.",
      install: "Match the exact release year, language pack, and required Autodesk Access or deployment package used by the client.",
      uninstall: "Remove the local app only after confirming the Autodesk assignment and any shared profiles or plot styles are documented."
    },
    {
      name: "Civil 3D",
      focus: "AEC civil design workflow with project templates, styles, and object enablers that often vary by client.",
      licensing: "Typically included through an AEC Collection or specific named-user assignment in Autodesk Account.",
      install: "Deploy the approved year build plus country kits, content packs, and client-specific templates before handoff.",
      uninstall: "Preserve custom templates, pipe networks, shortcuts, and workspace data before removing the local install."
    },
    {
      name: "Revit",
      focus: "BIM authoring platform that depends heavily on add-ins, families, and templates beyond the base install.",
      licensing: "Usually assigned as a named-user Autodesk entitlement or through a collection seat.",
      install: "Deploy the exact version used by the project team and restore approved add-ins, families, and templates.",
      uninstall: "Capture local family libraries, custom add-ins, and project cache locations before workstation cleanup."
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
      uninstall: "Clear cached work areas only after confirming all checked-out or local files were reconciled."
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
      uninstall: "Return offline licenses if used, then remove the local client only after confirming content and extension handoff."
    }
  ],
  ptc: [
    {
      name: "Mathcad Prime",
      focus: "Engineering calculation environment that can depend on local templates and license-source configuration.",
      licensing: "Confirm whether Mathcad Prime uses named-user, floating, or local license behavior in that client environment.",
      install: "Deploy the approved Prime version, point the workstation at the correct license source, and test worksheet open and save behavior.",
      uninstall: "Preserve worksheets, templates, and any custom configuration before removing the client or reclaiming the entitlement."
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
      uninstall: "Recover the seat and remove local extensions or templates only after documenting anything custom."
    },
    {
      name: "Trimble Business Center",
      focus: "Survey and construction office workflow that often depends on local project data and hardware-related integrations.",
      licensing: "Confirm the exact TBC edition, feature modules, and entitlement model before assigning or reinstalling the product.",
      install: "Deploy the approved TBC version and validate sign-in, project access, and any required controller or survey-data integrations.",
      uninstall: "Preserve project files, custom reports, and configuration data before reclaiming the workstation or entitlement."
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
      uninstall: "Recover the seat in Admin Console and reset default PDF handling if another PDF app is taking over."
    }
  ],
  bluebeam: [
    {
      name: "Revu 21",
      focus: "Current subscription-based Bluebeam desktop app with Studio access tied to Bluebeam account sign-in.",
      licensing: "Assign the appropriate Revu 21 subscription tier and verify the user can sign in with their Bluebeam ID.",
      install: "Install the approved Revu 21 build, confirm activation, and test Studio access plus any shared tool sets or profiles.",
      uninstall: "Remove the user assignment first, then preserve tool chests, profiles, and stamps before uninstalling locally."
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
      uninstall: "Use Intuit's supported cleanup path, preserve company-file locations and backups, and remove access before reclaiming the seat."
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
      uninstall: "Remove offline folders and cached data carefully, then uninstall using the supported MSI or managed-deployment path."
    }
  ]
};
