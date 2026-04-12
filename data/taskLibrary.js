export const categoryMeta = {
  identity: {
    label: "Identity & Directory",
    description: "User lifecycle in Microsoft 365, Entra ID, and Active Directory.",
    order: 1
  },
  security: {
    label: "Security & Access Control",
    description: "MFA, remote access, local admin, and privileged review.",
    order: 2
  },
  licensing: {
    label: "Licensing & Seat Recovery",
    description: "Assign, reclaim, and document vendor entitlements.",
    order: 3
  },
  endpoint: {
    label: "Endpoints & Windows",
    description: "Workstation build, device recovery, and redeployment readiness.",
    order: 4
  },
  collaboration: {
    label: "Collaboration & Data Handoff",
    description: "Mailbox, Teams, OneDrive, and shared resource ownership.",
    order: 5
  },
  monitoring: {
    label: "Monitoring & Security Stack",
    description: "Datto RMM, RocketCyber, Bitdefender, and telemetry coverage.",
    order: 6
  },
  applications: {
    label: "Business & Specialty Apps",
    description: "CAD, PDF tooling, and line-of-business application access.",
    order: 7
  },
  continuity: {
    label: "Retention & Continuity",
    description: "Backup, retained data, and project-file handoff safeguards.",
    order: 8
  },
  documentation: {
    label: "Documentation & Internal Records",
    description: "IT Glue, contacts, asset notes, and audit-friendly records.",
    order: 9
  },
  process: {
    label: "Process Completion",
    description: "Autotask tasking, verification, approvals, and closure.",
    order: 10
  }
};

export const systemMeta = {
  m365: { label: "Microsoft 365 & Entra" },
  ad: { label: "Active Directory" },
  windows: { label: "Windows Workstation" },
  datto: { label: "Datto RMM" },
  autotask: { label: "Autotask" },
  itglue: { label: "IT Glue" },
  rocketcyber: { label: "RocketCyber" },
  bitdefender: { label: "Bitdefender" },
  forticlient: { label: "FortiClient VPN" },
  egnyte: { label: "Egnyte" },
  backup: { label: "Backup Platform" },
  autodesk: { label: "Autodesk" },
  bentley: { label: "Bentley" },
  esri: { label: "Esri" },
  trimble: { label: "Trimble" },
  sketchup: { label: "SketchUp" },
  ptc: { label: "PTC" },
  bluebeam: { label: "Bluebeam" },
  adobe: { label: "Adobe" },
  foxit: { label: "Foxit PDF" },
  quickbooks: { label: "QuickBooks" }
};

export const licenseGuidance = [
  {
    id: "license_microsoft",
    systems: ["m365", "windows"],
    title: "Microsoft licensing",
    products: [
      "Microsoft 365 bundle and Microsoft add-ons",
      "Windows edition and Office activation alignment"
    ],
    onboarding: [
      "Assign the correct Microsoft 365 plan and any required add-ons such as Teams Phone, Project, or Visio.",
      "Confirm Windows / Office activation and role-specific entitlements before handoff."
    ],
    offboarding: [
      "Capture the existing bundle before changes are made.",
      "Reclaim or reassign the seat only after mailbox, OneDrive, and retention decisions are complete."
    ]
  },
  {
    id: "license_security_stack",
    systems: ["bitdefender", "rocketcyber", "forticlient"],
    title: "Security stack licensing",
    products: [
      "Bitdefender endpoint seat",
      "RocketCyber monitored asset / user coverage",
      "FortiClient EMS or VPN entitlement"
    ],
    onboarding: [
      "Verify the user or workstation is covered by the intended Bitdefender, RocketCyber, and remote access policies.",
      "Capture which security products were assigned so later offboarding is predictable."
    ],
    offboarding: [
      "Remove stale user references, contacts, and tokens from the security stack.",
      "Confirm security seats and VPN entitlements are returned to the available pool."
    ]
  },
  {
    id: "license_cad",
    systems: ["autodesk", "bentley", "esri"],
    title: "CAD / GIS licensing",
    products: [
      "Autodesk named-user or seat entitlement",
      "Bentley entitlement / connection client access",
      "Esri named user, role, or extension licensing"
    ],
    onboarding: [
      "Assign the correct engineering license and role before installing large application sets.",
      "Verify plug-ins, cloud entitlements, and SSO bindings that may not be obvious in the base installer."
    ],
    offboarding: [
      "Reclaim named-user or subscription seats instead of only uninstalling the software.",
      "Transfer ownership of local project libraries, add-ins, and cloud-connected content where needed."
    ]
  },
  {
    id: "license_design_apps",
    systems: ["trimble", "sketchup", "ptc"],
    title: "Design application licensing",
    products: [
      "Trimble subscription or admin-console seat",
      "SketchUp named-user subscription",
      "PTC entitlement, license file, or named-user access"
    ],
    onboarding: [
      "Assign the product entitlement before the workstation handoff so first-run activation succeeds.",
      "Confirm whether the client uses named-user, device, or floating-license behavior before install."
    ],
    offboarding: [
      "Remove the user or device assignment from the vendor admin portal or license service.",
      "Confirm the seat is reusable and note any license-server or entitlement cleanup that remains."
    ]
  },
  {
    id: "license_pdf",
    systems: ["bluebeam", "adobe", "foxit"],
    title: "PDF application licensing",
    products: [
      "Bluebeam seat or subscription",
      "Adobe Acrobat entitlement",
      "Foxit subscription / serial assignment"
    ],
    onboarding: [
      "Install the approved PDF platform and complete sign-in or activation before user testing.",
      "Set the expected default PDF handler and confirm plugins used by the client workflow."
    ],
    offboarding: [
      "Remove the user from the vendor portal or license assignment list.",
      "Validate the seat is recoverable for reuse and note any serials or admin console actions taken."
    ]
  },
  {
    id: "license_finance",
    systems: ["quickbooks"],
    title: "Finance application licensing",
    products: [
      "QuickBooks user seat, company-file access, or subscription assignment"
    ],
    onboarding: [
      "Confirm whether the client uses QuickBooks Online access, QuickBooks Desktop licensing, or a hosted environment.",
      "Assign the required role and verify the user can reach the expected company file or tenant."
    ],
    offboarding: [
      "Remove the user from QuickBooks access and preserve any handoff or audit requirements.",
      "Document whether the seat, named user, or workstation install was reclaimed."
    ]
  },
  {
    id: "license_egnyte",
    systems: ["egnyte"],
    title: "Egnyte access and storage governance",
    products: [
      "Egnyte user type and folder permissions",
      "Egnyte Desktop App access",
      "Shared links, offline files, and ownership handoff"
    ],
    onboarding: [
      "Assign the correct Egnyte user type, groups, and folder permissions before testing access.",
      "Confirm whether the user also needs Desktop App deployment, offline folders, or SSO-specific setup."
    ],
    offboarding: [
      "Review shared links, private folders, and offline content before disabling or deleting the user.",
      "Document who now owns the content path and whether the Desktop App or local cache was removed."
    ]
  },
  {
    id: "license_datto",
    systems: ["datto"],
    title: "Datto RMM device coverage",
    products: [
      "Monitored endpoint slot",
      "Automation and policy assignment"
    ],
    onboarding: [
      "Confirm the workstation is enrolled and consuming the expected monitoring coverage.",
      "Apply the right policy set for the device type before handoff."
    ],
    offboarding: [
      "Reassign or retire the device record so stale RMM agents do not affect reporting.",
      "Remove policy exceptions that were only present for the departing user."
    ]
  }
];

export const taskLibrary = [
  {
    id: "onboard_autotask_intake",
    title: "Validate the onboarding request in Autotask",
    summary: "Start with a complete request so the rest of the onboarding work does not guess at dates, approvals, or required access.",
    type: "onboarding",
    systems: ["autotask"],
    category: "process",
    priority: 5,
    impact: "high",
    tags: ["internal", "verification"],
    conditions: {
      includeDocumentationTasks: true
    },
    steps: [
      "Confirm start date, manager, department, and approval are attached to the Autotask ticket.",
      "Break the request into child tasks for identity, endpoint, licensing, and validation work.",
      "Record any time-sensitive dependencies such as remote access, after-hours start, or rush shipping."
    ],
    completion: [
      "Autotask ticket has an approved request and clear subtask ownership."
    ]
  },
  {
    id: "onboard_itglue_contact",
    title: "Create the user record and assigned-assets trail in IT Glue",
    summary: "A clean contact and documentation record saves future techs from reconstructing who had which device or license.",
    type: "onboarding",
    systems: ["itglue"],
    category: "documentation",
    priority: 10,
    impact: "normal",
    tags: ["internal", "documentation"],
    conditions: {
      includeDocumentationTasks: true
    },
    steps: [
      "Create or update the contact entry with role, location, manager, and notification details.",
      "Prepare space for assigned workstation, licensing, and application notes.",
      "Link related configurations or flexible assets that the user will own or touch."
    ]
  },
  {
    id: "onboard_m365_identity",
    title: "Provision the Microsoft 365 / Entra identity",
    summary: "Provision the cloud identity after or alongside the source account so licensing, MFA, and mailbox work have a stable anchor.",
    type: "onboarding",
    systems: ["m365"],
    category: "identity",
    priority: 18,
    impact: "critical",
    tags: ["security-critical"],
    steps: [
      "Create the user in the authoritative source and confirm the UPN, aliases, display name, and naming standard.",
      "Verify usage location, department, manager, and any directory attributes that downstream licensing or automation depends on.",
      "Set the initial sign-in policy, temporary password path, and verify the account is not inheriting unwanted exclusions.",
      "Confirm the account appears in the expected Entra administrative view and is ready for licensing, MFA, and mailbox work.",
      "Record the creation timestamp, operator, and any delivery instructions for first access."
    ],
    completion: [
      "User can be located in Entra ID with the expected UPN and baseline properties."
    ]
  },
  {
    id: "onboard_m365_license_bundle",
    title: "Assign Microsoft licensing and service add-ons",
    summary: "Make licensing explicit so Microsoft services, Office apps, and downstream integrations activate cleanly.",
    type: "onboarding",
    systems: ["m365", "windows"],
    category: "licensing",
    priority: 20,
    impact: "high",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Confirm the user's role, mailbox needs, device strategy, and security requirements before picking the Microsoft bundle.",
      "Assign the Microsoft 365 base plan that matches the client standard and the user's business function.",
      "Add required extras such as Teams Phone, Visio, Project, Power BI, or device-related entitlements where approved.",
      "Verify the service plans inside the bundle are enabled or disabled correctly for that client workflow.",
      "Document the assigned bundle so later offboarding can recover it cleanly without guessing."
    ],
    completion: [
      "Assigned Microsoft licenses are documented in the ticket or client record."
    ]
  },
  {
    id: "onboard_m365_collaboration",
    title: "Configure mailbox, Teams, groups, and shared resources",
    summary: "New users often fail not on login, but on the access around email, calendars, Teams, and delegated resources.",
    type: "onboarding",
    systems: ["m365"],
    category: "collaboration",
    priority: 25,
    impact: "normal",
    tags: ["handoff"],
    conditions: {
      includeManagerTasks: true
    },
    steps: [
      "Assign the mailbox configuration, aliases, shared mailboxes, distribution lists, and delegation required for the role.",
      "Add the user to the right Microsoft 365 groups, Teams teams, channels, and SharePoint-connected workspaces.",
      "Review room, calendar, and shared-resource access with the requester or manager instead of assuming defaults are enough.",
      "Document any temporary forwarding, shared mailbox rights, or special approvals tied to the role."
    ]
  },
  {
    id: "onboard_ad_identity",
    title: "Provision the Active Directory account and group access",
    summary: "For hybrid and on-prem clients, the AD object still controls a lot of real access even when Microsoft 365 exists.",
    type: "onboarding",
    systems: ["ad"],
    category: "identity",
    priority: 12,
    impact: "high",
    tags: ["security-critical"],
    conditions: {
      environment: ["hybrid", "onprem"]
    },
    steps: [
      "Create the AD user in the correct OU with the expected naming, expiry, logon restrictions, and baseline attributes.",
      "Set password, account options, and workstation or hours restrictions according to the client standard.",
      "Add standard security groups plus any file-share, print, VPN, or LoB access groups required for the role.",
      "Verify the user is not inheriting legacy groups or template-account access that should not carry forward.",
      "Confirm directory sync behavior if the user is part of a hybrid environment and note the expected sync timing."
    ]
  },
  {
    id: "onboard_windows_build",
    title: "Prepare the Windows workstation for the user",
    summary: "A reliable workstation build prevents a flood of first-day tickets around setup, activation, and missing tooling.",
    type: "onboarding",
    systems: ["windows"],
    category: "endpoint",
    priority: 35,
    impact: "high",
    tags: ["asset"],
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Join the device to the correct identity boundary and confirm it lands in the expected tenant, domain, or management scope.",
      "Apply the client build standard, naming convention, and baseline configuration for the user's location and department.",
      "Run Windows, driver, and firmware updates and clear any pending reboot or enrollment blockers.",
      "Install standard productivity software, browser defaults, and printers or mapped resources required on day one.",
      "Test a first sign-in or profile initialization path so the device is not handed over with silent setup failures."
    ],
    completion: [
      "The workstation is ready for user sign-in without pending build blockers."
    ]
  },
  {
    id: "onboard_windows_security_baseline",
    title: "Apply endpoint security baseline and local admin controls",
    summary: "This step catches the common gap where the user receives a working PC but not a defensible one.",
    type: "onboarding",
    systems: ["windows", "m365"],
    category: "security",
    priority: 40,
    impact: "critical",
    tags: ["security-critical", "asset"],
    conditions: {
      includeAssetTasks: true,
      includeSecurityReview: true
    },
    steps: [
      "Verify BitLocker, Windows Defender posture, local firewall, and local admin group membership align with policy.",
      "Confirm the device is enrolled in the right security and compliance baselines and is not still carrying a staging posture.",
      "Check that the user does not inherit unnecessary elevation, cached credentials, or old profile artifacts on a redeployed machine.",
      "Capture recovery-key location and any approved exceptions before handoff."
    ],
    completion: [
      "Local admin status and recovery-key location are documented."
    ]
  },
  {
    id: "onboard_datto_enrollment",
    title: "Enroll the workstation in Datto RMM",
    summary: "Datto RMM should be in place before the device disappears into production and becomes harder to recover.",
    type: "onboarding",
    systems: ["datto"],
    category: "monitoring",
    priority: 45,
    impact: "high",
    tags: ["asset", "license"],
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Install the Datto RMM agent and verify the endpoint appears in the correct client site and workstation group.",
      "Apply monitoring, patching, automation, and software-management policies appropriate for the workstation type.",
      "Confirm alert ownership, maintenance windows, and patch policy inheritance look correct after the device checks in.",
      "Remove staging or temporary exemptions created during imaging."
    ]
  },
  {
    id: "onboard_bitdefender_policy",
    title: "Install Bitdefender and verify policy inheritance",
    summary: "A missing or mis-scoped Bitdefender policy is one of the easiest security misses on a fresh workstation.",
    type: "onboarding",
    systems: ["bitdefender"],
    category: "security",
    priority: 50,
    impact: "critical",
    tags: ["security-critical", "license"],
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Install or confirm the Bitdefender agent and ensure the endpoint reports to the correct company or policy tree.",
      "Validate policy assignment, update status, and last-contact time before handoff.",
      "Confirm any required exclusions for client software are approved, documented, and scoped correctly.",
      "Record approved exceptions instead of leaving them implicit."
    ],
    completion: [
      "Bitdefender reports healthy and is assigned to the expected policy."
    ]
  },
  {
    id: "onboard_rocketcyber_visibility",
    title: "Confirm RocketCyber visibility and alert ownership",
    summary: "Detection coverage is not complete until the right contact, workstation, and alerting context all line up.",
    type: "onboarding",
    systems: ["rocketcyber"],
    category: "monitoring",
    priority: 55,
    impact: "high",
    tags: ["security", "verification"],
    conditions: {
      includeSecurityReview: true
    },
    steps: [
      "Verify the endpoint, user context, and tenant association are visible where RocketCyber expects them.",
      "Check alert ownership, escalation routing, suppression rules, and any user-specific contacts or watchlists.",
      "Confirm the new user or endpoint does not inherit stale ownership from a previous device assignment.",
      "Document any monitoring gaps that need a follow-up outside the onboarding window."
    ]
  },
  {
    id: "onboard_forticlient_vpn",
    title: "Provision FortiClient VPN access",
    summary: "Remote access should be tested during onboarding, not discovered as broken the first time the user works offsite.",
    type: "onboarding",
    systems: ["forticlient"],
    category: "security",
    priority: 60,
    impact: "high",
    tags: ["security-critical"],
    steps: [
      "Create or assign the VPN entitlement, FortiClient EMS profile, and any certificate or token prerequisites.",
      "Install and configure FortiClient with the correct portal, tunnel type, and saved connection profile.",
      "Validate split tunnel or full tunnel behavior if the client standard depends on a specific routing model.",
      "Complete a successful test connection and record any MFA enrollment or user guidance used for VPN sign-in."
    ],
    completion: [
      "FortiClient connection is tested and the expected authentication method is confirmed."
    ]
  },
  {
    id: "onboard_backup_assignment",
    title: "Verify backup and retention coverage",
    summary: "Whether the client protects workstations, profiles, or cloud data, the coverage should be obvious on day one.",
    type: "onboarding",
    systems: ["backup"],
    category: "continuity",
    priority: 65,
    impact: "normal",
    tags: ["asset", "verification"],
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Confirm the user or device falls under the intended backup policy and the correct client retention set.",
      "Check for workstation folders, profile paths, roaming data, or SaaS content that require explicit inclusion.",
      "Verify the backup platform sees the endpoint, workload, or data path within the expected onboarding window.",
      "Note any exclusions so they do not become surprises later."
    ]
  },
  {
    id: "onboard_egnyte_access",
    title: "Provision Egnyte access, folder permissions, and Desktop App setup",
    summary: "Egnyte onboarding should cover user type, folder permissions, and desktop or offline behavior together so the user does not get a broken partial rollout.",
    type: "onboarding",
    systems: ["egnyte"],
    category: "collaboration",
    priority: 27,
    impact: "high",
    tags: ["verification", "license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Create the Egnyte user with the correct role and user type for the employee's internal or external access pattern.",
      "Assign groups, folder permissions, and any shared-link expectations before the user signs in.",
      "Deploy the Egnyte Desktop App if the user needs mapped-drive or offline access and confirm SSO behavior if used.",
      "Validate the user can reach the expected folders and note any offline folders or special configuration in the ticket."
    ],
    completion: [
      "Egnyte access, user type, and required desktop behavior are validated."
    ]
  },
  {
    id: "onboard_adobe_access",
    title: "Install and activate Adobe Acrobat",
    summary: "Adobe often requires both installation and portal-side entitlement, so treat it as a full license task rather than a quick app install.",
    type: "onboarding",
    systems: ["adobe"],
    category: "applications",
    priority: 70,
    impact: "normal",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign the Adobe entitlement or named-user access in the vendor console.",
      "Install Acrobat and complete first sign-in or activation.",
      "Verify required plugins or document workflows used by the client."
    ]
  },
  {
    id: "onboard_bluebeam_access",
    title: "Install and activate Bluebeam",
    summary: "Bluebeam is often critical for construction and engineering clients, so seat assignment should be explicit and tested.",
    type: "onboarding",
    systems: ["bluebeam"],
    category: "applications",
    priority: 72,
    impact: "normal",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign the correct Bluebeam seat or subscription for the user.",
      "Install the approved Bluebeam version and complete sign-in or serial activation.",
      "Confirm default PDF workflow behavior if Bluebeam is meant to be the primary editor."
    ]
  },
  {
    id: "onboard_foxit_access",
    title: "Install and activate Foxit PDF tools",
    summary: "Foxit is easy to install but still needs license tracking and default-app verification to avoid a messy mixed PDF estate.",
    type: "onboarding",
    systems: ["foxit"],
    category: "applications",
    priority: 74,
    impact: "normal",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign the Foxit subscription or serial tied to the client.",
      "Install the client-standard package and confirm activation.",
      "Set the expected default PDF association if Foxit is the standard for that client."
    ]
  },
  {
    id: "onboard_autodesk_access",
    title: "Assign Autodesk licensing and application access",
    summary: "Autodesk onboarding needs both the desktop install and the vendor-portal side of the named-user relationship.",
    type: "onboarding",
    systems: ["autodesk"],
    category: "applications",
    priority: 80,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign the Autodesk named-user entitlement and any required product collections.",
      "Install the approved Autodesk applications and verify sign-in.",
      "Confirm add-ins, templates, or shared content locations needed by the engineering team."
    ]
  },
  {
    id: "onboard_bentley_access",
    title: "Assign Bentley licensing and engineering tooling",
    summary: "Bentley environments often depend on connection clients, entitlement sync, and shared workspace data beyond the base installer.",
    type: "onboarding",
    systems: ["bentley"],
    category: "applications",
    priority: 82,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign Bentley entitlements or access to the required applications.",
      "Install supporting connection components and verify the user can authenticate successfully.",
      "Validate project workspaces, standards folders, or plugins expected by the client."
    ]
  },
  {
    id: "onboard_esri_access",
    title: "Assign Esri licensing and role access",
    summary: "Esri licensing is often tied to named users, roles, and extensions, so the entitlement itself needs explicit verification.",
    type: "onboarding",
    systems: ["esri"],
    category: "applications",
    priority: 84,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign the correct Esri named user, role, and extension access.",
      "Install ArcGIS or related tools required for the role.",
      "Verify portal sign-in and confirm required map, layer, or project access."
    ]
  },
  {
    id: "onboard_trimble_access",
    title: "Assign Trimble licensing and deploy the required application",
    summary: "Trimble deployments vary by product, so the safest path is to confirm subscription access and the exact product installer before handoff.",
    type: "onboarding",
    systems: ["trimble"],
    category: "applications",
    priority: 86,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign the user's Trimble subscription, admin-console role, or product access first.",
      "Install the approved Trimble application or launcher for that client workflow.",
      "Validate sign-in, project access, and any cloud-linked data locations before handoff."
    ]
  },
  {
    id: "onboard_sketchup_access",
    title: "Assign SketchUp licensing and verify installation",
    summary: "SketchUp is usually subscription and account driven, so seat assignment and Trimble account access need to line up before first launch.",
    type: "onboarding",
    systems: ["sketchup"],
    category: "applications",
    priority: 88,
    impact: "normal",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Assign the SketchUp seat in the Trimble admin console.",
      "Install the approved SketchUp package and any companion tools the client standard requires.",
      "Verify the user can authenticate with the expected Trimble identity and open the product successfully."
    ]
  },
  {
    id: "onboard_ptc_access",
    title: "Assign PTC licensing and engineering application access",
    summary: "PTC products often depend on the right entitlement model and client-side configuration, so install and licensing should be treated together.",
    type: "onboarding",
    systems: ["ptc"],
    category: "applications",
    priority: 90,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Confirm whether the client uses named-user, floating, or license-file based PTC access.",
      "Assign the entitlement or point the workstation at the correct license service.",
      "Install the approved PTC application and verify the user can launch it without licensing errors."
    ]
  },
  {
    id: "onboard_quickbooks_access",
    title: "Provision QuickBooks access and validate the company file or tenant",
    summary: "QuickBooks onboarding can break quietly if the user account, role, and company-file access are not all verified together.",
    type: "onboarding",
    systems: ["quickbooks"],
    category: "applications",
    priority: 92,
    impact: "high",
    tags: ["license", "verification"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Confirm whether the client uses QuickBooks Online, Enterprise Desktop, hosted, or remote-published access.",
      "Assign the correct QuickBooks role and obtain any finance approval needed before access is granted.",
      "Install the approved desktop or hosted-access client if a workstation component is required.",
      "Verify the user can reach the expected company file or online tenant without permission errors and can complete required print or export workflows."
    ]
  },
  {
    id: "onboard_privileged_controls",
    title: "Provision privileged access with a separate security review",
    summary: "Admin access should be provisioned as an exception workflow, not silently bundled with normal onboarding.",
    type: "onboarding",
    systems: ["m365", "ad", "windows", "itglue"],
    category: "security",
    priority: 95,
    impact: "critical",
    tags: ["security-critical", "privileged"],
    conditions: {
      accessProfile: ["privileged"],
      includeSecurityReview: true
    },
    steps: [
      "Use separate admin-capable identities if the client standard requires them.",
      "Limit membership to approved admin groups, vaults, and documentation access only.",
      "Confirm MFA strength, logging expectations, and privileged sign-off before release."
    ],
    completion: [
      "Privileged access has explicit approval and documented scope."
    ]
  },
  {
    id: "onboard_documentation_finish",
    title: "Update IT Glue with final assignments and client-specific notes",
    summary: "The documentation step is what keeps the onboarding from becoming tribal knowledge the second it closes.",
    type: "onboarding",
    systems: ["itglue"],
    category: "documentation",
    priority: 100,
    impact: "normal",
    tags: ["internal", "documentation"],
    conditions: {
      includeDocumentationTasks: true
    },
    steps: [
      "Record assigned devices, license-dependent apps, and any approved exceptions.",
      "Link the user to the relevant configurations, locations, and shared resources.",
      "Capture notes that the next technician would need during support or offboarding."
    ]
  },
  {
    id: "onboard_validation_closeout",
    title: "Complete validation, client handoff, and Autotask closure notes",
    summary: "The onboarding is not done until login, app access, and the operational record all agree that it is done.",
    type: "onboarding",
    systems: ["autotask", "m365", "windows"],
    category: "process",
    priority: 110,
    impact: "high",
    tags: ["internal", "verification"],
    conditions: {
      includeDocumentationTasks: true
    },
    steps: [
      "Validate user sign-in, email, remote access, and role-critical apps with the requester or manager.",
      "Record what was tested, what remains deferred, and any exceptions in Autotask.",
      "Close or transition the ticket only after documentation and approvals are complete."
    ],
    completion: [
      "Ticket notes show tested services, unresolved items, and handoff status."
    ]
  },
  {
    id: "offboard_autotask_intake",
    title: "Confirm the offboarding request, timing, and approvals in Autotask",
    summary: "A precise offboarding request prevents the two worst failure modes: cutting access too early or too late.",
    type: "offboarding",
    systems: ["autotask"],
    category: "process",
    priority: 5,
    impact: "high",
    tags: ["internal", "verification"],
    conditions: {
      includeDocumentationTasks: true
    },
    steps: [
      "Confirm the effective date, exact cutoff time, and whether the departure is routine or sensitive.",
      "Capture approval for mail and data handoff, forwarding, retention, and device recovery.",
      "Break the work into identity, asset, licensing, and documentation subtasks."
    ],
    completion: [
      "Autotask ticket includes timing, approval, and handoff expectations."
    ]
  },
  {
    id: "offboard_m365_disable",
    title: "Disable the Microsoft 365 / Entra account",
    summary: "This is the primary cloud-access kill switch and should be executed cleanly and documented immediately.",
    type: "offboarding",
    systems: ["m365"],
    category: "identity",
    priority: 10,
    impact: "critical",
    tags: ["security-critical"],
    steps: [
      "Block sign-in and confirm the disable action took effect on the intended identity and not a similarly named account.",
      "Check whether conditional access, exceptions, or break-glass assumptions require a second validation path.",
      "Record the disable timestamp, operator, and any customer-facing communication tied to the action.",
      "Check for sign-in risk from alternate aliases, guest identities, or linked accounts if the client has exceptions."
    ],
    completion: [
      "The account is blocked from sign-in and the disable time is documented."
    ]
  },
  {
    id: "offboard_m365_token_cleanup",
    title: "Revoke Microsoft sessions, MFA methods, and remembered access",
    summary: "Disabling the account is not always enough if sessions, remembered browsers, or authentication methods stay active.",
    type: "offboarding",
    systems: ["m365"],
    category: "security",
    priority: 15,
    impact: "critical",
    tags: ["security-critical"],
    conditions: {
      includeSecurityReview: true
    },
    steps: [
      "Revoke active sessions and refresh tokens across the Microsoft 365 identity.",
      "Review MFA methods, app passwords, remembered browsers, and temporary access artifacts tied to the user.",
      "Check whether mobile devices, Outlook profiles, or shared kiosks require extra follow-up after token revocation.",
      "Document any device-specific exceptions that still need follow-up."
    ],
    completion: [
      "Session revocation and MFA review are noted in the ticket."
    ]
  },
  {
    id: "offboard_m365_handoff",
    title: "Secure mailbox, OneDrive, and Teams ownership handoff",
    summary: "The security part of offboarding is only half the job; the data and collaboration handoff is what keeps the business moving.",
    type: "offboarding",
    systems: ["m365"],
    category: "collaboration",
    priority: 20,
    impact: "high",
    tags: ["handoff"],
    conditions: {
      includeManagerTasks: true
    },
    steps: [
      "Handle mailbox conversion, delegation, forwarding, auto-reply, or retention based on client approval.",
      "Review OneDrive ownership and identify who now owns retained files, shortcuts, and restore requests.",
      "Reassign Teams, M365 group, and SharePoint ownership where the departed user was the only owner or maintainer.",
      "Capture who approved retained access, forwarding, or delegation and for how long."
    ]
  },
  {
    id: "offboard_m365_license_reclaim",
    title: "Capture and reclaim Microsoft licensing",
    summary: "Microsoft seats should be recovered deliberately so retention and shared-resource dependencies are not broken by accident.",
    type: "offboarding",
    systems: ["m365", "windows"],
    category: "licensing",
    priority: 25,
    impact: "high",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Record the user's Microsoft bundle, add-on licenses, and any premium compliance or voice features before making changes.",
      "Confirm that mailbox, OneDrive, archive, or legal-hold decisions do not depend on the current licensing state.",
      "Coordinate with any M365 plan-change request so the user is not removed from a bundle before data retention is safe.",
      "Reclaim or reassign the seat once the retention window and business handoff are satisfied."
    ]
  },
  {
    id: "offboard_ad_disable",
    title: "Disable the Active Directory account and remove key memberships",
    summary: "In hybrid and on-prem environments, stale AD access can survive long after the cloud account appears closed.",
    type: "offboarding",
    systems: ["ad"],
    category: "identity",
    priority: 30,
    impact: "critical",
    tags: ["security-critical"],
    conditions: {
      environment: ["hybrid", "onprem"]
    },
    steps: [
      "Disable the AD account and record the exact action taken, location, and operator.",
      "Remove the user from security groups that grant file, VPN, print, application, or privileged access.",
      "Check whether service accounts, scheduled tasks, or local rights depend on the account before removing every membership blindly.",
      "Confirm replication or sync status so the change is not silently delayed."
    ],
    completion: [
      "AD account status and group cleanup are verified."
    ]
  },
  {
    id: "offboard_windows_access_recovery",
    title: "Review Windows local access, cached credentials, and elevation",
    summary: "User departure can leave more than one login path behind, especially on redeployed or shared machines.",
    type: "offboarding",
    systems: ["windows"],
    category: "security",
    priority: 35,
    impact: "critical",
    tags: ["security-critical", "asset"],
    conditions: {
      includeAssetTasks: true,
      includeSecurityReview: true
    },
    steps: [
      "Review local admin group membership, cached profiles, and saved credential remnants on assigned devices.",
      "Check browser profiles, credential manager entries, remote desktop history, and VPN remnants if those are common in the client standard.",
      "Preserve or confirm BitLocker recovery information before any wipe or redeployment action.",
      "Check whether scheduled tasks, mapped drives, scripts, or local services were running under the user's context."
    ],
    completion: [
      "Windows access review is captured before device reuse."
    ]
  },
  {
    id: "offboard_windows_redeploy",
    title: "Recover, wipe, or prepare the Windows workstation for reassignment",
    summary: "Asset handling is where security and operational cleanliness intersect, so it should be treated as part of the offboarding itself.",
    type: "offboarding",
    systems: ["windows"],
    category: "endpoint",
    priority: 40,
    impact: "high",
    tags: ["asset"],
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Confirm device return status, serial number, accessories, and physical condition.",
      "Check whether there is an approved delay for wipe because of legal hold, manager review, or engineering data recovery.",
      "Follow the approved wipe, redeploy, or storage process for the client environment.",
      "Update asset notes so the next technician knows whether the device is ready for reissue, still retained, or blocked on data handoff."
    ],
    completion: [
      "Device state is documented as returned, wiped, or awaiting action."
    ]
  },
  {
    id: "offboard_datto_cleanup",
    title: "Clean up Datto RMM records and policy exceptions",
    summary: "Datto should reflect the new ownership state or it will continue to confuse patching, alerts, and asset counts.",
    type: "offboarding",
    systems: ["datto"],
    category: "monitoring",
    priority: 45,
    impact: "high",
    tags: ["asset", "license"],
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Locate the endpoint record and confirm whether it will be reassigned or retired.",
      "Remove user-specific policy overrides, maintenance exceptions, or alert contacts.",
      "Confirm the device no longer shows the departed user as the owner."
    ]
  },
  {
    id: "offboard_bitdefender_cleanup",
    title: "Remove Bitdefender exceptions and user-linked coverage assumptions",
    summary: "Security tooling often keeps hidden assumptions around the user or device, especially if exclusions were added under pressure.",
    type: "offboarding",
    systems: ["bitdefender"],
    category: "security",
    priority: 50,
    impact: "high",
    tags: ["security", "license"],
    conditions: {
      includeSecurityReview: true
    },
    steps: [
      "Confirm the endpoint remains protected if it is being reassigned, or decommission coverage if it is leaving service.",
      "Remove temporary exclusions, named contacts, or user-based references that should not persist.",
      "Record any security exceptions that still need engineering review."
    ]
  },
  {
    id: "offboard_rocketcyber_cleanup",
    title: "Review RocketCyber alerts, contacts, and monitored context",
    summary: "If a departed user is still tied to detections or escalation contacts, your security process will become noisy and misleading later.",
    type: "offboarding",
    systems: ["rocketcyber"],
    category: "monitoring",
    priority: 55,
    impact: "high",
    tags: ["security", "verification"],
    conditions: {
      includeSecurityReview: true
    },
    steps: [
      "Remove or replace any user-linked alert contacts, watchlists, or escalation references.",
      "Verify monitored assets no longer imply the old user as a primary owner.",
      "Note any detections or investigations that must remain tied to case history."
    ]
  },
  {
    id: "offboard_forticlient_revoke",
    title: "Revoke FortiClient VPN access, saved profiles, and tokens",
    summary: "Remote access frequently survives longer than intended through saved profiles, certificates, or MFA-linked VPN workflows.",
    type: "offboarding",
    systems: ["forticlient"],
    category: "security",
    priority: 60,
    impact: "critical",
    tags: ["security-critical", "license"],
    steps: [
      "Disable or remove the user's VPN entitlement and associated profile access.",
      "Invalidate certificates, saved profile trust, or other remote-access credentials if applicable.",
      "Record the time access was revoked and any pending device cleanup still required."
    ],
    completion: [
      "VPN entitlement is revoked and the offboarding record shows when it happened."
    ]
  },
  {
    id: "offboard_backup_retention",
    title: "Review backup retention and recoverable user data",
    summary: "The user may be gone, but their data may still need a clearly assigned owner and retention decision.",
    type: "offboarding",
    systems: ["backup"],
    category: "continuity",
    priority: 65,
    impact: "normal",
    tags: ["handoff", "verification"],
    conditions: {
      includeManagerTasks: true
    },
    steps: [
      "Confirm whether workstation, mailbox, cloud-data, or SaaS backup copies must be retained beyond normal expiration.",
      "Identify who approved the retention period and who now owns the recovered data going forward.",
      "Check for backup scopes that rely on the departing user's active license or identity and note any migration needed.",
      "Document any restore requests, legal holds, or future review dates tied to the retained data."
    ]
  },
  {
    id: "offboard_egnyte_handoff",
    title: "Disable Egnyte access and hand off folders, links, and offline content",
    summary: "Egnyte offboarding is usually about permissions and content ownership as much as it is about disabling the user account.",
    type: "offboarding",
    systems: ["egnyte"],
    category: "collaboration",
    priority: 22,
    impact: "high",
    tags: ["handoff", "verification", "license"],
    steps: [
      "Review the user's Egnyte role, groups, shared links, and private-folder ownership before changing the account.",
      "Transfer or document ownership for any content paths the team still needs after departure.",
      "Disable or downgrade the user according to the client's Egnyte standard and remove Desktop App or offline access where required.",
      "Document who now owns the content path and whether any retained local cache or offline files still need cleanup."
    ],
    completion: [
      "Egnyte access is removed and content ownership is documented."
    ]
  },
  {
    id: "offboard_adobe_reclaim",
    title: "Reclaim Adobe Acrobat licensing",
    summary: "Removing Acrobat locally does not guarantee the seat is actually available for reuse in the Adobe admin portal.",
    type: "offboarding",
    systems: ["adobe"],
    category: "licensing",
    priority: 70,
    impact: "normal",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Capture the current Adobe assignment and any product-specific entitlements.",
      "Remove the user from the Adobe licensing assignment or admin console.",
      "Confirm the seat is available for reuse and note the change."
    ]
  },
  {
    id: "offboard_bluebeam_reclaim",
    title: "Reclaim Bluebeam licensing",
    summary: "Bluebeam usage is often business-critical, so recovering that seat quickly helps the next engineer avoid delays.",
    type: "offboarding",
    systems: ["bluebeam"],
    category: "licensing",
    priority: 72,
    impact: "normal",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Review the current Bluebeam assignment and login model.",
      "Remove or transfer the Bluebeam seat in the vendor portal as required.",
      "Document the reuse status so the next onboarding can consume it cleanly."
    ]
  },
  {
    id: "offboard_foxit_reclaim",
    title: "Reclaim Foxit licensing",
    summary: "Foxit should be tracked with the same discipline as Adobe or Bluebeam even if it feels like a simpler install.",
    type: "offboarding",
    systems: ["foxit"],
    category: "licensing",
    priority: 74,
    impact: "normal",
    tags: ["license"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Identify the assigned Foxit subscription or serial for the user.",
      "Remove or deactivate the entitlement according to the client standard.",
      "Capture any admin-console or serial changes in the ticket."
    ]
  },
  {
    id: "offboard_autodesk_reclaim",
    title: "Reclaim Autodesk named-user access",
    summary: "Autodesk licensing frequently remains assigned unless someone removes the named user explicitly.",
    type: "offboarding",
    systems: ["autodesk"],
    category: "licensing",
    priority: 80,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Capture the Autodesk products and collections assigned to the user.",
      "Remove the named-user entitlement in Autodesk Admin as appropriate.",
      "Confirm the seat can be reused and note any cloud-content ownership concerns."
    ]
  },
  {
    id: "offboard_bentley_reclaim",
    title: "Reclaim Bentley entitlement access",
    summary: "Bentley licensing often spans application access plus environment-specific workspace components, so reclaiming it should be explicit.",
    type: "offboarding",
    systems: ["bentley"],
    category: "licensing",
    priority: 82,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Review the Bentley applications and entitlements the user consumed.",
      "Remove the user's entitlement or access in the appropriate Bentley administration workflow.",
      "Document any shared workspace or connection client ownership that changed."
    ]
  },
  {
    id: "offboard_esri_reclaim",
    title: "Reclaim Esri roles, named-user access, and extensions",
    summary: "Esri environments can leave paid extensions or role access behind unless the offboarding looks beyond the base account.",
    type: "offboarding",
    systems: ["esri"],
    category: "licensing",
    priority: 84,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Capture the user's Esri role, assigned extensions, and relevant portal access.",
      "Remove or transfer the named user according to the client's GIS administration process.",
      "Confirm map, layer, or app ownership handoff where required."
    ]
  },
  {
    id: "offboard_trimble_reclaim",
    title: "Reclaim Trimble access and product entitlements",
    summary: "Trimble products vary by subscription and cloud service, so offboarding should remove both the user access and any workstation-specific assumptions.",
    type: "offboarding",
    systems: ["trimble"],
    category: "licensing",
    priority: 86,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Capture which Trimble products and cloud services the user was assigned.",
      "Remove the user from the Trimble admin console or applicable product access list.",
      "Document any remaining project ownership or data-transfer work before the seat is reused."
    ]
  },
  {
    id: "offboard_sketchup_reclaim",
    title: "Reclaim SketchUp seat assignment",
    summary: "SketchUp is usually simple to uninstall, but the real recovery step is removing the assigned seat in the Trimble admin console.",
    type: "offboarding",
    systems: ["sketchup"],
    category: "licensing",
    priority: 88,
    impact: "normal",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Review the SketchUp subscription assignment for the departing user.",
      "Remove or transfer the SketchUp seat in the Trimble admin console.",
      "Note whether any local content, extensions, or templates need to be preserved before workstation cleanup."
    ]
  },
  {
    id: "offboard_ptc_reclaim",
    title: "Reclaim PTC entitlement and license configuration",
    summary: "PTC environments can leave behind entitlement records or workstation license pointers if offboarding stops at uninstall only.",
    type: "offboarding",
    systems: ["ptc"],
    category: "licensing",
    priority: 90,
    impact: "high",
    tags: ["license", "specialty"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Capture which PTC product and license method the user relied on.",
      "Remove or reassign the entitlement and update any named-user or license-server references.",
      "Document any model, workspace, or vault ownership that must be transferred."
    ]
  },
  {
    id: "offboard_quickbooks_access",
    title: "Remove QuickBooks access and preserve finance ownership",
    summary: "QuickBooks offboarding should protect auditability by removing access without losing track of who now owns the finance workflow.",
    type: "offboarding",
    systems: ["quickbooks"],
    category: "applications",
    priority: 92,
    impact: "high",
    tags: ["license", "verification"],
    conditions: {
      includeLicenseTasks: true
    },
    steps: [
      "Disable the QuickBooks user or remove the role assignment in the correct QuickBooks environment.",
      "Confirm the user no longer has access to the company file, hosted session, or online tenant.",
      "Capture who now owns bank feeds, reports, approvals, or other finance-specific responsibilities."
    ]
  },
  {
    id: "offboard_itglue_cleanup",
    title: "Update IT Glue contacts, assets, and reference links",
    summary: "If the documentation still points to a departed user, the next incident will start with bad assumptions.",
    type: "offboarding",
    systems: ["itglue"],
    category: "documentation",
    priority: 95,
    impact: "normal",
    tags: ["internal", "documentation"],
    conditions: {
      includeDocumentationTasks: true
    },
    steps: [
      "Mark the contact inactive or annotate departure details according to client standards.",
      "Update assigned assets, related configurations, and known ownership references.",
      "Preserve only the details that remain operationally useful after the user has left."
    ]
  },
  {
    id: "offboard_shared_secret_review",
    title: "Review shared credentials, service ties, and privileged dependencies",
    summary: "This is the category people skip when the ticket looks done, and it is often where the real future risk lives.",
    type: "offboarding",
    systems: ["m365", "ad", "windows", "rocketcyber", "bitdefender"],
    category: "security",
    priority: 100,
    impact: "critical",
    tags: ["security-critical", "privileged"],
    conditions: {
      includeSecurityReview: true
    },
    steps: [
      "Review whether the user knew shared admin credentials, vault entries, emergency access accounts, or break-glass procedures.",
      "Check for scheduled tasks, scripts, services, vendor portals, or automation tools still tied to the user's identity.",
      "Confirm whether documentation, password vaults, and RMM scripts still reference the departed user as a trusted owner.",
      "Rotate or remediate anything that would leave invisible future access behind."
    ],
    completion: [
      "Shared-secret review is either completed or explicitly handed off for follow-up."
    ]
  },
  {
    id: "offboard_cad_data_handoff",
    title: "Capture CAD-related local data, templates, and project ownership",
    summary: "Engineering departures often hurt later because templates, add-ins, and local project paths were left behind on the workstation.",
    type: "offboarding",
    systems: ["autodesk", "bentley", "esri", "trimble", "sketchup", "ptc", "windows"],
    category: "continuity",
    priority: 102,
    impact: "high",
    tags: ["handoff", "specialty"],
    conditions: {
      includeManagerTasks: true,
      includeAssetTasks: true
    },
    steps: [
      "Identify local project folders, custom templates, plugins, or GIS content that require transfer before wiping the device.",
      "Confirm project ownership moves to the right person or shared location.",
      "Record what was retained, moved, or intentionally discarded."
    ]
  },
  {
    id: "offboard_autotask_closeout",
    title: "Complete Autotask closeout notes and unresolved-item tracking",
    summary: "A strong closeout note is what turns the offboarding into an auditable process instead of a memory-based one.",
    type: "offboarding",
    systems: ["autotask"],
    category: "process",
    priority: 110,
    impact: "high",
    tags: ["internal", "documentation"],
    conditions: {
      includeDocumentationTasks: true
    },
    steps: [
      "Record what was disabled, reclaimed, retained, or deferred.",
      "Attach approval evidence for mailbox retention, forwarding, or delayed license removal.",
      "Create follow-up tasks for anything that could not be completed during the primary offboarding window."
    ],
    completion: [
      "Autotask contains a usable closeout note with explicit follow-ups."
    ]
  },
  {
    id: "offboard_final_verification",
    title: "Perform final verification across documentation, tools, and ownership",
    summary: "This final pass is where you catch the stale contact, lingering alert recipient, or forgotten license before it becomes next month's mystery.",
    type: "offboarding",
    systems: ["autotask", "itglue", "datto", "rocketcyber", "bitdefender", "m365"],
    category: "process",
    priority: 115,
    impact: "high",
    tags: ["verification", "internal"],
    steps: [
      "Confirm internal records, alerting systems, assigned assets, and application owners no longer point to the departed user.",
      "Verify requested handoff items, retention decisions, and seat recovery actions were completed and documented.",
      "Check that unresolved issues have a new owner, a due date, and a visible follow-up path instead of a note buried in closeout.",
      "Close the workflow only after the ticket history is clear enough for another technician to audit what happened."
    ],
    completion: [
      "Final verification confirms no obvious stale ownership remains."
    ]
  }
];
