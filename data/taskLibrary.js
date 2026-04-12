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
  backup: { label: "Backup Platform" },
  autodesk: { label: "Autodesk" },
  bentley: { label: "Bentley" },
  esri: { label: "Esri" },
  bluebeam: { label: "Bluebeam" },
  adobe: { label: "Adobe Acrobat" },
  foxit: { label: "Foxit PDF" },
  lob: { label: "Line-of-Business Apps" }
};

export const presetLibrary = {
  core: {
    label: "Core MSP",
    environment: "hybrid",
    accessProfile: "standard",
    workstationProfile: "standard",
    systems: ["m365", "ad", "windows", "datto", "autotask", "itglue", "rocketcyber", "bitdefender", "forticlient", "backup", "lob"]
  },
  remote: {
    label: "Remote Secure User",
    environment: "cloud",
    accessProfile: "standard",
    workstationProfile: "standard",
    systems: ["m365", "windows", "datto", "autotask", "itglue", "rocketcyber", "bitdefender", "forticlient", "backup", "adobe"]
  },
  cad: {
    label: "CAD / Engineering",
    environment: "hybrid",
    accessProfile: "standard",
    workstationProfile: "cad",
    systems: ["m365", "ad", "windows", "datto", "autotask", "itglue", "rocketcyber", "bitdefender", "forticlient", "backup", "autodesk", "bentley", "esri", "bluebeam", "adobe", "foxit"]
  },
  admin: {
    label: "Privileged Admin",
    environment: "hybrid",
    accessProfile: "privileged",
    workstationProfile: "standard",
    systems: ["m365", "ad", "windows", "datto", "autotask", "itglue", "rocketcyber", "bitdefender", "forticlient", "backup", "lob"]
  }
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
    summary: "Create the core cloud identity first so licensing, MFA, and mailbox work have a stable anchor.",
    type: "onboarding",
    systems: ["m365"],
    category: "identity",
    priority: 15,
    impact: "critical",
    tags: ["security-critical"],
    steps: [
      "Create the user in the authoritative source and confirm the UPN, aliases, and naming standard.",
      "Set the initial sign-in policy and verify the account is not inheriting unwanted exclusions.",
      "Record the account creation timestamp and any delivery instructions for first access."
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
      "Assign the Microsoft 365 plan that matches the role and client standard.",
      "Add required extras such as Teams Phone, Visio, Project, or device-related entitlements.",
      "Document the assigned bundle so later offboarding can recover it cleanly."
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
      "Assign the mailbox configuration, aliases, groups, shared mailboxes, and distribution lists required for the role.",
      "Add the user to the right Teams and collaborative workspaces.",
      "Verify shared calendar, room, and mailbox access with the requester or manager."
    ]
  },
  {
    id: "onboard_ad_identity",
    title: "Provision the Active Directory account and group access",
    summary: "For hybrid and on-prem clients, the AD object still controls a lot of real access even when Microsoft 365 exists.",
    type: "onboarding",
    systems: ["ad"],
    category: "identity",
    priority: 30,
    impact: "high",
    tags: ["security-critical"],
    conditions: {
      environment: ["hybrid", "onprem"]
    },
    steps: [
      "Create the AD user in the correct OU with the expected naming, expiry, and logon restrictions.",
      "Add standard security groups and any file-share or print groups required.",
      "Confirm directory sync behavior if the user is part of a hybrid environment."
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
      "Join the device to the correct identity boundary and apply the client build standard.",
      "Run updates, verify time zone and locale, and confirm the naming convention matches documentation.",
      "Install standard productivity software and confirm the user profile initializes cleanly."
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
      "Verify BitLocker, Windows Defender posture, and local admin group membership align with policy.",
      "Confirm the user does not inherit unnecessary elevation or old profile artifacts on a redeployed machine.",
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
      "Install the Datto RMM agent and verify the endpoint appears in the correct client site.",
      "Apply monitoring, patching, and automation policies appropriate for the workstation type.",
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
      "Install or confirm the Bitdefender agent and ensure the endpoint reports to the correct company.",
      "Validate policy assignment, scan status, and any required exclusions for client software.",
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
      "Verify the endpoint and user context are visible where RocketCyber expects them.",
      "Check alert ownership, escalation routing, and any user-specific contacts or watchlists.",
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
      "Create or assign the VPN entitlement, profile, and any certificate or token prerequisites.",
      "Install and configure FortiClient with the correct portal and connection profile.",
      "Complete a successful test connection and record any MFA enrollment used for VPN sign-in."
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
      "Confirm the user or device falls under the intended backup policy.",
      "Check for workstation folders, profile paths, or SaaS data that require explicit inclusion.",
      "Note any exclusions so they do not become surprises later."
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
    id: "onboard_lob_access",
    title: "Provision line-of-business applications and SSO access",
    summary: "LoB tools are where real operational work happens, so account setup and SSO alignment need deliberate testing.",
    type: "onboarding",
    systems: ["lob"],
    category: "applications",
    priority: 90,
    impact: "high",
    tags: ["verification"],
    steps: [
      "Create the user in required business platforms and assign the right role-based permissions.",
      "Validate SSO bindings, MFA expectations, or direct vendor authentication as applicable.",
      "Confirm access with the requester or team lead instead of assuming the base role is sufficient."
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
      "Block sign-in and confirm the disable action took effect on the intended identity.",
      "Record the disable timestamp and operator in the ticket.",
      "Check for sign-in risk from alternate aliases or linked identities if the client has exceptions."
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
      "Revoke active sessions and refresh tokens.",
      "Review MFA methods, app passwords, and remembered sign-in artifacts tied to the user.",
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
      "Handle mailbox conversion, delegation, forwarding, or auto-reply based on client approval.",
      "Review OneDrive ownership and Teams or SharePoint ownership that may need reassignment.",
      "Capture who approved retained access and for how long."
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
      "Record the user's Microsoft bundle and any add-on licenses before making changes.",
      "Confirm that mailbox or OneDrive retention decisions do not depend on the current licensing state.",
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
      "Disable the AD account and record the action taken.",
      "Remove the user from security groups that grant file, VPN, print, or privileged access.",
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
      "Preserve or confirm BitLocker recovery information before any wipe or redeployment action.",
      "Check whether scheduled tasks, mapped drives, or scripts were running under the user's context."
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
      "Confirm device return status, serial number, and physical condition.",
      "Follow the approved wipe, redeploy, or storage process for the client environment.",
      "Update asset notes so the next technician knows whether the device is ready for reissue."
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
      "Confirm whether workstation, mailbox, or cloud data must be retained beyond normal expiration.",
      "Document who approved the retention period and who owns the recovered data going forward.",
      "Check for backup scopes that rely on the departing user's active license or identity."
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
    id: "offboard_lob_access",
    title: "Remove line-of-business access and ownership",
    summary: "The long-tail business apps are often where stale access lingers because nobody remembers they exist until much later.",
    type: "offboarding",
    systems: ["lob"],
    category: "applications",
    priority: 90,
    impact: "high",
    tags: ["verification"],
    steps: [
      "Disable access in required business systems and remove role assignments.",
      "Transfer dashboards, reports, approvals, or owned records as needed.",
      "Capture any app-specific retention or legal hold requirements before deletion."
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
      "Review whether the user knew shared admin credentials, vault entries, or emergency access accounts.",
      "Check for scheduled tasks, scripts, services, or vendor portals still tied to the user's identity.",
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
    systems: ["autodesk", "bentley", "esri", "windows"],
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
      "Confirm internal records, alerting systems, and assigned assets no longer point to the departed user.",
      "Verify requested handoff items were completed and documented.",
      "Close the workflow only after unresolved issues are tracked to a new owner."
    ],
    completion: [
      "Final verification confirms no obvious stale ownership remains."
    ]
  }
];
