export const internalOnlyGuideGroups = [
  {
    slug: "internal-stack",
    title: "Internal MSP Stack",
    summary: "Internal-only tooling for ticketing, remote management, and backup operations that should stay out of the public help center.",
    apps: [
      {
        name: "Datto RMM",
        slug: "datto-rmm",
        summary: "Remote monitoring and management platform used for endpoint health, software deployment, jobs, components, patching, and remote sessions.",
        highlights: [
          "Start with the device record, policy inheritance, last audit time, and recent activity before you rerun jobs.",
          "When a software or policy action fails, compare the same component or job against a known-good device in the same site and policy group."
        ],
        askFirst: [
          "Is the issue agent health, remote control, a failed component, software deployment, patching, or monitoring noise?",
          "Is the endpoint online and checking in recently, or are you troubleshooting stale data?",
          "Did the problem begin after a site move, policy change, device rename, or reinstall?"
        ],
        supportCheckpoints: [
          "Confirm the device is in the correct client site, group, and policy set before changing automation.",
          "Review the last successful audit, last user, monitoring state, and recent activity log entries before rerunning tasks.",
          "Use device filters carefully when pushing installs or uninstalls so you do not fan the change out wider than intended."
        ],
        commonIssues: [
          {
            title: "Component or job fails on one endpoint",
            symptom: "A Datto RMM component, quick job, or software task keeps failing on a single device.",
            likelyFix: "Compare the device policy, permissions, pending reboot state, and agent health against another working device before editing the component.",
            collect: "Capture the component name, job output, device UID or hostname, and whether the same action works on another endpoint."
          },
          {
            title: "Agent is installed but the device looks stale",
            symptom: "The device exists in Datto RMM, but audits, monitor data, or recent activity are no longer current.",
            likelyFix: "Check service health on the endpoint, verify network reachability to the RMM platform, and review whether the device record belongs to an old or reimaged agent.",
            collect: "Capture the last audit time, agent version, device site, and whether remote tools still connect."
          }
        ],
        usefulInfo: {
          paths: ["Datto RMM local agent logs and audit output on the endpoint", "Software package or component revision history in the web console"],
          logs: ["Recent Activity log", "Job output", "Component output", "Audit timestamp"],
          services: ["Datto RMM Agent service"],
          processes: ["AEMAgent.exe", "Remote takeover or Web Remote helper processes if in use"]
        },
        relatedLinks: [
          { label: "Datto RMM remote install / uninstall playbook", url: "playbooks.html#datto-rmm-software-remote-install-uninstall" },
          { label: "Datto RMM snippet", url: "snippets.html#datto-rmm-remote-software-checks" }
        ]
      },
      {
        name: "Autotask PSA",
        slug: "autotask-psa",
        summary: "Internal PSA platform used for ticket handling, workflow notes, contract context, time entry, approvals, and handoff records.",
        highlights: [
          "Treat ticket hygiene as operational data, not paperwork. Good queue routing, notes, and contract context reduce repeat work later.",
          "When a workflow looks wrong, compare the ticket category, queue, workflow rule, and contract context before assuming the PSA itself is failing."
        ],
        askFirst: [
          "Is the issue ticket routing, time entry, workflow state, contract visibility, or missing related data?",
          "Did the behavior change after a queue move, ticket merge, workflow rule update, or contact change?",
          "Is this affecting one ticket, one board, or multiple technicians?"
        ],
        supportCheckpoints: [
          "Confirm the ticket is in the right queue, category, and workflow state before escalating a PSA issue.",
          "Review recent ticket edits, note history, and workflow triggers if statuses or notifications look wrong.",
          "Document exactly which ticket fields or automation steps failed instead of summarizing it as 'Autotask issue.'"
        ],
        commonIssues: [
          {
            title: "Workflow or notifications do not fire as expected",
            symptom: "Ticket updates are saved, but downstream workflow actions or notifications never happen.",
            likelyFix: "Compare the ticket queue, workflow rule scope, and required trigger fields against a known-good ticket before changing the workflow.",
            collect: "Capture the ticket number, expected workflow action, actual status, and any recent rule or field changes."
          },
          {
            title: "Ticket data is incomplete or mismatched",
            symptom: "The ticket exists, but account, contact, contract, or queue context is wrong or missing.",
            likelyFix: "Correct the source fields first and avoid working the ticket forward until the account and contract context are clean.",
            collect: "Capture the ticket number, affected fields, and whether the issue started from intake, merge, or manual editing."
          }
        ],
        usefulInfo: {
          paths: ["Ticket history, workflow rule names, and account or contract links inside Autotask"],
          logs: ["Ticket note history", "Workflow rule history if visible", "Time entry and notification timestamps"],
          services: [],
          processes: []
        },
        relatedLinks: [
          { label: "After-hours handoff template", url: "templates.html#after-hours-handoff-template" },
          { label: "Monitoring alert triage template", url: "templates.html#monitoring-alert-triage-template" }
        ]
      },
      {
        name: "Veeam Backup & Replication",
        slug: "veeam-backup-replication",
        summary: "Internal backup and restore platform used to confirm protection, locate restore points, and coordinate file, VM, or mailbox recovery requests.",
        highlights: [
          "Always confirm the workload, restore target, and retention window before you promise that a restore point exists.",
          "Document whether the request is file restore, application restore, whole-system recovery, or proof-of-protection review."
        ],
        askFirst: [
          "Is the request a restore, backup verification, retention question, or job-failure follow-up?",
          "What exact workload is in scope: server, VM, workstation, file share, mailbox, or cloud data?",
          "What restore point date or time range matters to the requester?"
        ],
        supportCheckpoints: [
          "Confirm the protected object name exactly as it appears in Veeam before you search for restore points.",
          "Check the most recent successful backup, restore-point age, and retention expectations before starting recovery steps.",
          "When restoring user data, confirm the approved restore destination and whether overwrite risk has been reviewed."
        ],
        commonIssues: [
          {
            title: "A restore point cannot be found",
            symptom: "The requester expects data to be recoverable, but the restore-point list does not match what they expect.",
            likelyFix: "Verify the protected object name, the backup job or policy, and the requested date range before assuming the backup is missing.",
            collect: "Capture the exact object name, requested date, backup job name, and whether the issue is scope or retention related."
          },
          {
            title: "Restore request is unclear or risky",
            symptom: "A restore is requested, but the target location, overwrite impact, or owner approval is not clear.",
            likelyFix: "Pause and confirm destination, overwrite expectations, and approval before you restore data into production paths.",
            collect: "Capture the source object, requested restore point, destination path, and approval owner."
          }
        ],
        usefulInfo: {
          paths: ["Protected object name", "Backup job name", "Restore point date and target location"],
          logs: ["Last successful job result", "Restore session history", "Retention or policy notes"],
          services: ["Veeam Backup Service on the backup server"],
          processes: []
        },
        relatedLinks: [
          { label: "Restoring deleted files playbook", url: "playbooks.html#restoring-deleted-files" }
        ]
      }
    ]
  }
];

export const internalTipsAndTricksSections = [
  {
    title: "First-Pass App Triage That Saves Time",
    description: "Use these habits across Outlook, Teams, OneDrive, SharePoint, Citrix, CAD, GIS, PDF, and line-of-business tickets before you touch profiles or reinstall anything.",
    items: [
      {
        title: "Start every ticket with account, version, and scope",
        text: "Most app issues stop being mysterious once you pin down the exact account, exact product version or year, and whether the problem affects one item or the whole workflow.",
        fixes: [
          "Capture the exact user identity, tenant or org, product name, and version or release year first.",
          "Ask whether the problem affects one file, one project, one mailbox, one site, or every workflow in the app.",
          "Note what changed immediately before the issue started: password reset, workstation swap, Windows update, vendor patch, or new plug-in."
        ],
        links: [
          { label: "Internal reference guides", url: "reference-guides.html" }
        ]
      },
      {
        title: "Use a second path before bigger repairs",
        text: "A clean comparison keeps you from turning a permission problem into an unnecessary rebuild.",
        fixes: [
          "If a browser path exists, compare browser versus desktop before reinstalling or clearing caches.",
          "If the app is file-based, test a second known-good file or project before blaming the program itself.",
          "If the issue is machine-specific, compare the same workflow from another working device when possible."
        ],
        links: [
          { label: "Public app guides", url: "../vendor-guides.html" }
        ]
      }
    ]
  },
  {
    title: "Safe Cache, Profile, and Cleanup Habits",
    description: "These are the cleanup habits that keep support work safe instead of destructive.",
    items: [
      {
        title: "Do not clear data before you know the source of truth",
        text: "For sync tools, project apps, and mailbox clients, deleting local state before you confirm the authoritative copy can turn a repair into a recovery job.",
        fixes: [
          "Use browser truth for OneDrive, SharePoint, Outlook, and vendor portals before clearing local state.",
          "Check for checked-out files, local work areas, local-only templates, or offline folders before deleting caches.",
          "Document what local data could be lost before you reset or remove the profile."
        ],
        links: [
          { label: "ProjectWise reference", url: "reference-guides.html#guide-bentley-projectwise" },
          { label: "OneDrive reference", url: "reference-guides.html#guide-microsoft-onedrive" }
        ]
      },
      {
        title: "Use Windows cleanup tools first, app-specific cleanup second",
        text: "Storage and temporary-file cleanup are safer when Windows does the broad cleanup and you reserve app cache cleanup for targeted cases.",
        fixes: [
          "Use Storage Sense, Cleanup Recommendations, Downloads review, and Recycle Bin first.",
          "Use %temp% cleanup only for unlocked temp content, not as a substitute for app-specific repair.",
          "Touch Local AppData only when the app family is understood and the reset path is documented."
        ],
        links: [
          { label: "Internal tips and tricks", url: "tips-and-tricks.html" },
          { label: "Public tips and tricks", url: "../tips-and-tricks.html" }
        ]
      }
    ]
  },
  {
    title: "Evidence Capture Before Rebuilds",
    description: "Good evidence lets the next technician avoid redoing your first hour of work.",
    items: [
      {
        title: "Capture the evidence that changes the next decision",
        text: "Version screenshots, error text, file paths, and exact account context are usually more valuable than generic 'reinstalled app' notes.",
        fixes: [
          "Grab About screens, build numbers, and release years for CAD, GIS, PDF, and scheduling tools.",
          "Capture the full error text, not just a summary of what the user said.",
          "Record the exact file path, library URL, datasource, project name, or company file involved."
        ],
        links: [
          { label: "Reference guides", url: "reference-guides.html" },
          { label: "Templates", url: "templates.html" }
        ]
      },
      {
        title: "Use RMM and event evidence together",
        text: "Datto RMM tells you device state and automation history, but app-side logs and Windows events often explain the failure itself.",
        fixes: [
          "Compare Datto last audit, policy set, and recent jobs to the time the issue started.",
          "Pull application or Windows Application log entries when the issue is a crash or launch failure.",
          "Attach both the endpoint evidence and the app evidence to the ticket so the next touch is faster."
        ],
        links: [
          { label: "Datto RMM reference", url: "reference-guides.html#guide-internal-stack-datto-rmm" },
          { label: "Snippets", url: "snippets.html#event-log-quick-collection" }
        ]
      }
    ]
  },
  {
    title: "Common Support Patterns Across App Families",
    description: "These recurring patterns show up in Microsoft, engineering, PDF, mapping, and scheduling tools over and over again.",
    items: [
      {
        title: "Wrong account, wrong org, or wrong product year",
        text: "A surprising number of tickets come down to identity drift or using the wrong release year for the team standard.",
        fixes: [
          "Verify the exact account or org first for Microsoft, Adobe, Bluebeam, Bentley, Autodesk, ArcGIS, and Citrix-backed workflows.",
          "For Autodesk, Bentley, HEC, ArcGIS, MCTRANS, and Primavera, capture the exact product year or version before you compare behavior.",
          "For add-in heavy workflows, compare the host app year and plug-in set together."
        ],
        links: [
          { label: "Licensing", url: "licensing.html" },
          { label: "Reference guides", url: "reference-guides.html" }
        ]
      },
      {
        title: "File path and integration issues are often the real problem",
        text: "Apps may launch correctly while the actual failure is in a network path, local cache, file association, printer mapping, or plug-in handoff.",
        fixes: [
          "Test whether the same file opens locally versus over VPN, Citrix, or a mapped drive if policy allows.",
          "Check default PDF handlers, Outlook add-ins, browser handoff, and Office open-in-app flows before reinstalling the app.",
          "For project apps, compare templates, standards, add-ins, and support paths against a working peer."
        ],
        links: [
          { label: "ProjectWise reference", url: "reference-guides.html#guide-bentley-projectwise" },
          { label: "Acrobat reference", url: "reference-guides.html#guide-adobe-acrobat-pro" }
        ]
      }
    ]
  },
  {
    title: "Specialty App Habits Worth Repeating",
    description: "Use these reminders when the ticket is clearly tied to one app family and you want the shortest safe internal path to the next decision.",
    items: [
      {
        title: "Microsoft collaboration stack: Outlook, Teams, OneDrive, SharePoint, and Authenticator",
        text: "Most Microsoft app tickets split quickly once you prove browser behavior, the exact identity, and whether the issue is scoped to one mailbox, team, site, or library.",
        fixes: [
          "Capture the exact account, client type, and browser-versus-desktop comparison before you rebuild the profile or clear tokens.",
          "Treat Teams membership, SharePoint library path, OneDrive tenant context, and Outlook shared-mailbox state as separate checkpoints instead of one generic M365 issue.",
          "If the issue started after MFA or phone changes, document whether the failure is desktop sign-in, mobile setup, or the approval path itself."
        ],
        links: [
          { label: "Microsoft references", url: "reference-guides.html#vendor-microsoft" },
          { label: "Microsoft licensing", url: "licensing.html#microsoft-licensing" }
        ]
      },
      {
        title: "Engineering and project apps: Autodesk, Bentley, Esri, HEC, MCTRANS, Google Earth Pro, Primavera P6, and Axiom",
        text: "These tickets are usually version, datasource, or project-path issues long before they become reinstall problems.",
        fixes: [
          "Capture the exact product year or version, one affected project or study name, and the backing path, datasource, or database before you change the build.",
          "For AutoCAD, Revit, Civil 3D, InfoWorks ICM, ArcGIS Pro, ProjectWise, HEC tools, HCS, HSS, P6, Google Earth Pro, and Axiom, compare the same workflow on another approved workstation when possible.",
          "Keep add-ins, object enablers, workspaces, templates, and host-app compatibility in scope as first-class dependencies, not footnotes."
        ],
        links: [
          { label: "Engineering references", url: "reference-guides.html#vendor-autodesk" },
          { label: "HEC references", url: "reference-guides.html#vendor-hec" },
          { label: "MCTRANS references", url: "reference-guides.html#vendor-mctrans" }
        ]
      },
      {
        title: "PDF and publishing apps: Acrobat, Bluebeam, and InDesign",
        text: "PDF and layout tickets usually separate into one bad file, one missing dependency, or one licensing or profile mismatch very quickly.",
        fixes: [
          "Capture the exact file, stamp, tool chest, font, or linked asset involved before you reinstall or reset defaults.",
          "For Acrobat and Bluebeam, keep default-PDF handling and browser or Office integrations in view.",
          "For InDesign, compare the same package or document on another approved machine before you blame the Adobe install."
        ],
        links: [
          { label: "Adobe references", url: "reference-guides.html#vendor-adobe" },
          { label: "Bluebeam references", url: "reference-guides.html#vendor-bluebeam" }
        ]
      },
      {
        title: "Internal stack tools: Datto RMM, Autotask PSA, and Veeam",
        text: "Internal-platform tickets move faster when the device, ticket, or backup object is named exactly before you touch automation or role assignments.",
        fixes: [
          "For Datto RMM, capture the site, group, last audit, and job or component name first.",
          "For Autotask, capture the ticket number, queue, workflow state, and the exact field or notification that failed.",
          "For Veeam, capture the protected object, requested restore point, and destination expectations before you promise recovery."
        ],
        links: [
          { label: "Internal MSP stack references", url: "reference-guides.html#vendor-internal-stack" },
          { label: "Service playbooks", url: "playbooks.html#serviceSection" }
        ]
      }
    ]
  }
];

export const internalLicensingReference = [
  {
    slug: "microsoft",
    title: "Microsoft 365",
    summary: "Named-user licensing, mailbox/service-plan scope, shared mailbox edge cases, and mobile/app protection dependencies all live here.",
    inScope: ["Outlook", "Teams", "OneDrive", "SharePoint", "Outlook Mobile", "Teams Mobile", "Microsoft Authenticator"],
    adminSurfaces: ["Microsoft 365 admin center", "Entra admin center", "Exchange admin center", "SharePoint admin center"],
    recoveryNotes: [
      "Capture the existing SKU and service plans before changes.",
      "Tie seat changes to mailbox, OneDrive, and shared-resource decisions so you do not break access mid-handoff."
    ],
    collect: ["UPN", "current SKU", "service plans", "shared mailbox or site dependencies"],
    links: [{ label: "Open internal Microsoft references", url: "reference-guides.html#vendor-microsoft" }]
  },
  {
    slug: "autodesk",
    title: "Autodesk",
    summary: "Named-user Autodesk access plus release-year alignment and deployment-package control for AutoCAD, Revit, Civil 3D, and InfoWorks ICM.",
    inScope: ["AutoCAD", "Revit", "Civil 3D", "Autodesk Desktop App", "InfoWorks ICM"],
    adminSurfaces: ["Autodesk Account", "Autodesk Access", "client deployment packages"],
    recoveryNotes: [
      "Reclaim the seat in Autodesk Account, not just the local install.",
      "Document year, language, add-ins, and deployment source before workstation swaps."
    ],
    collect: ["Autodesk account email", "exact product year", "collection or standalone assignment", "deployment package used"],
    links: [{ label: "Open internal Autodesk references", url: "reference-guides.html#vendor-autodesk" }]
  },
  {
    slug: "bentley",
    title: "Bentley",
    summary: "CONNECT identity, datasource access, and Bentley entitlement handling for MicroStation, ProjectWise, and related engineering products.",
    inScope: ["MicroStation", "ProjectWise", "CONNECTION Client"],
    adminSurfaces: ["Bentley IMS / CONNECT", "ProjectWise datasource admin tools", "workspace standards shares"],
    recoveryNotes: [
      "Checked-out content and work areas are the big data-loss risk during seat recovery or rebuild work.",
      "Capture datasource and workspace details before you touch caches or entitlement state."
    ],
    collect: ["Bentley email", "datasource name", "work area path", "product version"],
    links: [{ label: "Open internal Bentley references", url: "reference-guides.html#vendor-bentley" }]
  },
  {
    slug: "esri",
    title: "Esri",
    summary: "Portal, role, user-type, and extension management for ArcGIS Pro and related ArcGIS access.",
    inScope: ["ArcGIS Pro", "ArcGIS Online"],
    adminSurfaces: ["ArcGIS Online organization", "ArcGIS Pro licensing portal", "group and content ownership views"],
    recoveryNotes: [
      "Remove roles and extensions intentionally so you do not strand paid extensions on old users.",
      "Transfer content ownership before removing the user from critical groups."
    ],
    collect: ["portal URL", "user type", "role", "extensions", "content ownership notes"],
    links: [{ label: "Open internal Esri references", url: "reference-guides.html#vendor-esri" }]
  },
  {
    slug: "adobe",
    title: "Adobe",
    summary: "Adobe Admin Console, enterprise-profile selection, and seat recovery for Acrobat, InDesign, and Creative Cloud workflows.",
    inScope: ["Acrobat Pro", "InDesign", "Creative Cloud Desktop"],
    adminSurfaces: ["Adobe Admin Console", "Creative Cloud Desktop", "enterprise profile selection"],
    recoveryNotes: [
      "Check whether the user is landing in the enterprise profile or a personal Adobe ID.",
      "Recover the seat in Admin Console and document any fonts, templates, or shared libraries that matter."
    ],
    collect: ["Adobe email", "product profile", "enterprise vs personal profile", "app version"],
    links: [{ label: "Open internal Adobe references", url: "reference-guides.html#vendor-adobe" }]
  },
  {
    slug: "bluebeam",
    title: "Bluebeam",
    summary: "Subscription, BBID, and Studio-aware licensing handling for Revu workflows.",
    inScope: ["Bluebeam Revu 21"],
    adminSurfaces: ["Bluebeam subscription management", "BBID validation", "Studio"],
    recoveryNotes: [
      "Capture the BBID and tier before recovery.",
      "Preserve shared tool chests and profiles during workstation changes."
    ],
    collect: ["BBID email", "subscription tier", "Revu build", "Studio usage"],
    links: [{ label: "Open internal Bluebeam references", url: "reference-guides.html#vendor-bluebeam" }]
  },
  {
    slug: "quickbooks",
    title: "QuickBooks",
    summary: "Desktop versus Online entitlement plus company-file ownership and finance-role coordination.",
    inScope: ["QuickBooks Enterprise Desktop", "QuickBooks Online"],
    adminSurfaces: ["Intuit admin or company admin", "QuickBooks Tool Hub", "company-file host"],
    recoveryNotes: [
      "Capture company-file path and hosting model before access changes.",
      "Tie seat recovery to finance approval and report ownership."
    ],
    collect: ["product year", "edition", "company-file path or QBO company", "user role"],
    links: [{ label: "Open internal QuickBooks references", url: "reference-guides.html#vendor-quickbooks" }]
  },
  {
    slug: "oracle",
    title: "Oracle Primavera P6",
    summary: "Database-aware access, environment selection, and role-driven licensing details for Primavera P6 scheduling workflows.",
    inScope: ["Oracle Primavera P6"],
    adminSurfaces: ["Primavera P6 administration or cloud portal", "P6 database or environment selection", "user access and role assignment records"],
    recoveryNotes: [
      "Capture the exact P6 environment, database, and role before you change the user's access or rebuild the workstation.",
      "Treat version alignment and environment selection as part of licensing validation because they are often the real blockers."
    ],
    collect: ["P6 username", "database or environment name", "P6 version", "project or role scope"],
    links: [{ label: "Open internal Oracle references", url: "reference-guides.html#vendor-oracle" }]
  },
  {
    slug: "mctrans",
    title: "MCTRANS",
    summary: "Version- and edition-aware licensing for Highway Capacity Software and Highway Safety Software.",
    inScope: ["HCS", "HSS"],
    adminSurfaces: ["MCTRANS account or delivery records", "version and manual references"],
    recoveryNotes: [
      "Capture the exact edition and year before reinstall or seat recovery work.",
      "Document the workstation or user the license was delivered to if the environment tracks it that way."
    ],
    collect: ["product name", "version", "license or delivery contact", "client standard year"],
    links: [{ label: "Open internal MCTRANS references", url: "reference-guides.html#vendor-mctrans" }]
  },
  {
    slug: "axiom",
    title: "Axiom",
    summary: "Module-aware licensing and host-app compatibility for Axiom productivity tools used with Bentley or Autodesk stacks.",
    inScope: ["Axiom"],
    adminSurfaces: ["Axiom support and delivery details", "host application version matrix"],
    recoveryNotes: [
      "Capture which Axiom modules are in use and which host applications they attach to.",
      "Check host-app year compatibility before you assume the entitlement itself is the problem."
    ],
    collect: ["Axiom module name", "host app and year", "license or support record", "affected workstation"],
    links: [{ label: "Open internal Axiom references", url: "reference-guides.html#vendor-axiom" }]
  },
  {
    slug: "internal-stack",
    title: "Internal MSP Stack",
    summary: "Coverage and entitlement handling for Datto RMM, Autotask PSA, and backup-platform access used internally by the team.",
    inScope: ["Datto RMM", "Autotask PSA", "Veeam Backup & Replication"],
    adminSurfaces: ["RMM site and policy assignment", "Autotask role permissions", "backup platform roles and restore permissions"],
    recoveryNotes: [
      "Treat role cleanup and client-site scope as part of offboarding so old access does not linger.",
      "Document what internal roles changed and which client sites or backup scopes were affected."
    ],
    collect: ["platform role", "client site scope", "security role", "restore or deployment permissions"],
    links: [{ label: "Open internal MSP stack references", url: "reference-guides.html#vendor-internal-stack" }]
  }
];
