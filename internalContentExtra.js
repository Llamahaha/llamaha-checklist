export const internalTipsAndTricksExtraSections = [
  {
    title: "Mobile Cutovers and MFA Changes",
    description: "Use these reminders when a phone swap, app re-registration, or MFA reset is part of the ticket and you want the cleanest internal path without creating another lockout.",
    items: [
      {
        title: "Separate first-time setup from a device replacement",
        text: "The ticket goes faster when you establish whether the user is doing a true first-time mobile setup or replacing a phone that may still hold working prompts and cached approval paths.",
        fixes: [
          "Capture whether the old phone still exists, still receives prompts, or was already wiped or traded in.",
          "Tie Outlook, Teams, OneDrive, and Authenticator together in your notes when the user changed devices, because multiple Microsoft mobile symptoms often share one account-state change.",
          "If the user already proved browser sign-in works, stay focused on the mobile registration path instead of widening into desktop rebuild work."
        ],
        links: [
          { label: "Public Microsoft Authenticator guide", url: "../guides/microsoft/microsoft-authenticator.html" },
          { label: "Public Outlook guide", url: "../guides/microsoft/outlook.html" }
        ]
      },
      {
        title: "Keep the recovery path documented before clearing methods",
        text: "Do not clear or re-register sign-in methods until you know how the user will complete the next approval step if the reset works only halfway.",
        fixes: [
          "Capture whether text message, alternate email, temporary access, or admin-assisted verification is available before you remove working methods.",
          "When the ticket involves phone replacement, record exactly which app was re-added and which QR or approval step succeeded or failed.",
          "Use the password-reset playbook and clear closure notes so the next technician or after-hours touch does not have to rediscover the recovery state."
        ],
        links: [
          { label: "Microsoft references", url: "reference-guides.html#vendor-microsoft" },
          { label: "Password reset playbook", url: "playbooks.html#password-reset" }
        ]
      }
    ]
  },
  {
    title: "Browser, Remote Access, and Local Comparison Testing",
    description: "These habits shorten tickets where the user says the app is broken but the real split is browser path, VPN path, Cloud PC path, or Citrix path.",
    items: [
      {
        title: "Record which path works before you clear anything",
        text: "A browser-versus-desktop or local-versus-Cloud-PC comparison is often the decision point that saves you from unnecessary reinstall work.",
        fixes: [
          "Capture whether the workflow works in the browser, on the local machine, in the Cloud PC, or in Citrix before changing the local app.",
          "If one path works and another does not, note the exact browser, remote session, and account context instead of summarizing it as a generic app failure.",
          "Treat VPN-only problems, Citrix-only problems, and Cloud-PC-only problems as different branches even when the user names the same app."
        ],
        links: [
          { label: "Citrix Workspace reference", url: "reference-guides.html#guide-citrix-workspace-app" },
          { label: "FortiClient reference", url: "reference-guides.html#guide-fortinet-forticlient-vpn" },
          { label: "Datto RMM snippet", url: "snippets.html#datto-rmm-remote-software-checks" }
        ]
      },
      {
        title: "Use browser cleanup as evidence, not as the whole fix",
        text: "Clearing browser data can help, but the evidence around profile, site URL, download behavior, and handoff path usually matters more than the cleanup itself.",
        fixes: [
          "Capture the exact site URL, browser profile, and file type involved before you clear cookies or cached files.",
          "If open-in-app or file handoff fails, record whether the browser downloaded the file, blocked it, or handed it to the wrong desktop app.",
          "If one browser works and another does not, keep that comparison in the ticket even if cleanup resolves the issue."
        ],
        links: [
          { label: "Internal tips and tricks", url: "tips-and-tricks.html" },
          { label: "Public PC Help", url: "../computer-issues.html" }
        ]
      }
    ]
  },
  {
    title: "Specialty App Version and Data-Path Discipline",
    description: "Use these habits for Autodesk, Bentley, Esri, HEC, MCTRANS, Google Earth Pro, Primavera, Axiom, and other specialist tools where version and data path matter as much as the install itself.",
    items: [
      {
        title: "Capture one affected project path before you rebuild",
        text: "When the ticket is tied to one project, study, model, datasource, or company file, that path is often the difference between a fast fix and a destructive repair.",
        fixes: [
          "Record the exact project, model, study, datasource, or company-file path in the ticket before you touch caches or local folders.",
          "If the issue is only one project or one model, compare it with a second known-good one before blaming the app build.",
          "Treat checked-out files, local work areas, and synced project content as protected state until you prove the authoritative source."
        ],
        links: [
          { label: "ProjectWise reference", url: "reference-guides.html#guide-bentley-projectwise" },
          { label: "InfoWorks ICM reference", url: "reference-guides.html#guide-autodesk-infoworks-icm" },
          { label: "Primavera P6 reference", url: "reference-guides.html#guide-oracle-primavera-p6" }
        ]
      },
      {
        title: "Version-year mismatches are a first-pass check, not an afterthought",
        text: "Engineering and project apps fail in quiet ways when the year, point release, add-ins, or object enablers drift from the client standard.",
        fixes: [
          "Capture the exact year, version, and point release before you compare behavior across computers.",
          "Compare add-ins, content packs, templates, and object enablers alongside the host app version instead of treating them as optional extras.",
          "If the issue began after a new machine or reinstall, compare the new build directly to a known-good workstation before you change user data."
        ],
        links: [
          { label: "Autodesk references", url: "reference-guides.html#vendor-autodesk" },
          { label: "Bentley references", url: "reference-guides.html#vendor-bentley" },
          { label: "HEC references", url: "reference-guides.html#vendor-hec" }
        ]
      }
    ]
  }
];
