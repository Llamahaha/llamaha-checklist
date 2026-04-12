export const categoryMeta = {
  identity: {
    label: "Identity & Access",
    description: "Account creation, authentication, and permissions."
  },
  endpoint: {
    label: "Endpoints & Assets",
    description: "Device prep, management, shipping, and recovery."
  },
  security: {
    label: "Security Controls",
    description: "Conditional access, MFA, alerts, and privileged review."
  },
  messaging: {
    label: "Messaging & Collaboration",
    description: "Mailbox, Teams, forwarding, and shared resource handling."
  },
  business: {
    label: "Business Apps",
    description: "Line-of-business systems, licensing, and application access."
  },
  continuity: {
    label: "Backup & Continuity",
    description: "Retention, backup coverage, and handoff safeguards."
  },
  training: {
    label: "Awareness & Training",
    description: "Security awareness platforms and campaign enrollment."
  }
};

export const taskLibrary = [
  {
    id: "offboard_m365_disable",
    title: "Disable Microsoft 365 account access",
    type: "offboarding",
    systems: ["m365"],
    category: "identity",
    priority: 10,
    steps: [
      "Block sign-in in Microsoft Entra ID",
      "Revoke all active refresh tokens and sessions",
      "Document the disable time in the ticket"
    ]
  },
  {
    id: "offboard_m365_license_review",
    title: "Review Microsoft 365 licenses and service dependencies",
    type: "offboarding",
    systems: ["m365"],
    category: "business",
    priority: 20,
    steps: [
      "Capture assigned licenses before changes are made",
      "Identify any apps or workflows tied to the account",
      "Remove or reassign licenses after retention requirements are met"
    ]
  },
  {
    id: "offboard_mailbox_handoff",
    title: "Secure mailbox and collaboration handoff",
    type: "offboarding",
    systems: ["m365"],
    category: "messaging",
    priority: 30,
    conditions: {
      includeManagerTasks: true
    },
    steps: [
      "Convert mailbox or delegate access based on client policy",
      "Set automatic replies if requested by the client",
      "Review OneDrive and Teams ownership for handoff"
    ]
  },
  {
    id: "offboard_ad_disable",
    title: "Disable Active Directory account",
    type: "offboarding",
    systems: ["ad"],
    category: "identity",
    priority: 40,
    conditions: {
      environment: ["hybrid", "onprem"]
    },
    steps: [
      "Disable the AD user account",
      "Remove the user from privileged and access-granting groups",
      "Force or confirm directory replication where appropriate"
    ]
  },
  {
    id: "offboard_vpn_remove",
    title: "Remove remote access connectivity",
    type: "offboarding",
    systems: ["vpn"],
    category: "security",
    priority: 50,
    steps: [
      "Disable or delete VPN profile access",
      "Invalidate stored client certificates or tokens",
      "Confirm the user can no longer establish remote sessions"
    ]
  },
  {
    id: "offboard_security_stack",
    title: "Revoke security platform assignments",
    type: "offboarding",
    systems: ["security"],
    category: "security",
    priority: 60,
    steps: [
      "Remove the user from MFA exception groups and admin roles",
      "Update alert routing or named contacts in security tools",
      "Confirm no standing approvals or emergency accounts remain linked"
    ]
  },
  {
    id: "offboard_privileged_review",
    title: "Perform privileged access review",
    type: "offboarding",
    systems: ["m365", "ad", "security"],
    category: "security",
    priority: 70,
    conditions: {
      accessProfile: ["privileged"]
    },
    steps: [
      "Enumerate administrative roles across identity and security platforms",
      "Rotate shared admin credentials if the user had knowledge of them",
      "Validate break-glass and service accounts were not tied to the departing user"
    ]
  },
  {
    id: "offboard_rmm_cleanup",
    title: "Remove endpoint management and monitoring records",
    type: "offboarding",
    systems: ["datto"],
    category: "endpoint",
    priority: 80,
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Locate assigned endpoint records in Datto RMM",
      "Remove or reassign monitoring and automation policies",
      "Confirm stale alerting or patch approvals are cleared"
    ]
  },
  {
    id: "offboard_backup_review",
    title: "Review backup retention and ownership",
    type: "offboarding",
    systems: ["backup"],
    category: "continuity",
    priority: 90,
    conditions: {
      includeManagerTasks: true
    },
    steps: [
      "Confirm whether workstation or mailbox backups require retention",
      "Transfer backup ownership records if tied to the user",
      "Document retention decisions in the offboarding ticket"
    ]
  },
  {
    id: "offboard_knowbe4",
    title: "Remove user from awareness training campaigns",
    type: "offboarding",
    systems: ["knowbe4"],
    category: "training",
    priority: 100,
    steps: [
      "Remove the user from active training assignments",
      "Disable phishing simulation enrollment",
      "Archive the profile according to client reporting needs"
    ]
  },
  {
    id: "offboard_lob_access",
    title: "Remove line-of-business application access",
    type: "offboarding",
    systems: ["lob"],
    category: "business",
    priority: 110,
    steps: [
      "Disable access to finance, PSA, or documentation platforms",
      "Transfer ownership of user-created records or dashboards",
      "Capture any application-specific retention or audit requirements"
    ]
  },
  {
    id: "onboard_m365_account",
    title: "Create Microsoft 365 user account",
    type: "onboarding",
    systems: ["m365"],
    category: "identity",
    priority: 10,
    steps: [
      "Create the user in Microsoft Entra ID or sync source",
      "Assign baseline licenses based on role",
      "Confirm sign-in works and initial password delivery is documented"
    ]
  },
  {
    id: "onboard_m365_groups",
    title: "Assign collaboration and distribution access",
    type: "onboarding",
    systems: ["m365"],
    category: "messaging",
    priority: 20,
    conditions: {
      includeManagerTasks: true
    },
    steps: [
      "Add the user to required Microsoft 365 groups and Teams",
      "Assign shared mailbox and calendar permissions",
      "Verify mailing lists and address book visibility"
    ]
  },
  {
    id: "onboard_ad_account",
    title: "Provision Active Directory account",
    type: "onboarding",
    systems: ["ad"],
    category: "identity",
    priority: 30,
    conditions: {
      environment: ["hybrid", "onprem"]
    },
    steps: [
      "Create the AD user in the correct OU",
      "Apply naming, expiration, and logon policies",
      "Add the user to standard access groups"
    ]
  },
  {
    id: "onboard_security_baseline",
    title: "Apply baseline security controls",
    type: "onboarding",
    systems: ["security", "m365"],
    category: "security",
    priority: 40,
    steps: [
      "Enroll the user in MFA and conditional access requirements",
      "Verify password reset and authentication methods",
      "Record any policy exceptions approved by the client"
    ]
  },
  {
    id: "onboard_privileged_controls",
    title: "Provision privileged access with extra controls",
    type: "onboarding",
    systems: ["m365", "ad", "security"],
    category: "security",
    priority: 50,
    conditions: {
      accessProfile: ["privileged"]
    },
    steps: [
      "Use separate admin-capable identities where policy requires it",
      "Place the account in approved admin role groups only",
      "Validate MFA strength and privileged access workflow approvals"
    ]
  },
  {
    id: "onboard_vpn_setup",
    title: "Provision secure remote access",
    type: "onboarding",
    systems: ["vpn"],
    category: "security",
    priority: 60,
    steps: [
      "Create the VPN account or assign remote access policy",
      "Issue required client configuration or certificates",
      "Confirm successful test connection and logging"
    ]
  },
  {
    id: "onboard_datto",
    title: "Enroll endpoint in RMM and automation policies",
    type: "onboarding",
    systems: ["datto"],
    category: "endpoint",
    priority: 70,
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Install the Datto RMM agent on the assigned workstation",
      "Apply patching, monitoring, and endpoint standards",
      "Confirm device naming and ownership metadata are correct"
    ]
  },
  {
    id: "onboard_backup",
    title: "Confirm backup coverage for user assets",
    type: "onboarding",
    systems: ["backup"],
    category: "continuity",
    priority: 80,
    conditions: {
      includeAssetTasks: true
    },
    steps: [
      "Ensure workstation, profile, or mailbox backups are in scope",
      "Verify backup policy assignment and first successful run",
      "Document any excluded data locations"
    ]
  },
  {
    id: "onboard_knowbe4",
    title: "Enroll user in awareness training",
    type: "onboarding",
    systems: ["knowbe4"],
    category: "training",
    priority: 90,
    steps: [
      "Create or sync the user in KnowBe4",
      "Assign baseline phishing and security training campaigns",
      "Confirm reporting groups and manager visibility"
    ]
  },
  {
    id: "onboard_lob_access",
    title: "Provision line-of-business application access",
    type: "onboarding",
    systems: ["lob"],
    category: "business",
    priority: 100,
    steps: [
      "Create the user in required client business applications",
      "Assign role-based permissions and licenses",
      "Verify access with the requester or department lead"
    ]
  }
];
