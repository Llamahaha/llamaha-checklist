export const decisionTrees = [
  {
    id: "teams",
    title: "Teams Sign-In and Call Issues",
    summary: "Use this when Teams launches but sign-in, meetings, audio, or channel access are failing.",
    start: "teams_start",
    nodes: {
      teams_start: {
        type: "question",
        prompt: "Can the user sign in to Teams on the web with the expected work account?",
        answers: [
          { label: "Yes", next: "teams_desktop" },
          { label: "No", next: "teams_identity" }
        ]
      },
      teams_identity: {
        type: "resolution",
        title: "Identity or license issue",
        body: [
          "Check whether the user is in the correct tenant and has an active Teams-enabled Microsoft license.",
          "Verify MFA, Conditional Access, and account lockout status before resetting the desktop app."
        ]
      },
      teams_desktop: {
        type: "question",
        prompt: "Does the problem happen only in the desktop app while web access still works?",
        answers: [
          { label: "Yes", next: "teams_cache" },
          { label: "No", next: "teams_meeting" }
        ]
      },
      teams_cache: {
        type: "resolution",
        title: "Local client problem",
        body: [
          "Sign out and back in after recent membership or licensing changes.",
          "Check the device clock, app version, and local client state before considering a reinstall."
        ]
      },
      teams_meeting: {
        type: "question",
        prompt: "Is the issue mainly with meetings, calls, or devices?",
        answers: [
          { label: "Yes", next: "teams_devices" },
          { label: "No", next: "teams_membership" }
        ]
      },
      teams_devices: {
        type: "resolution",
        title: "Meeting or device path",
        body: [
          "Check the selected microphone, speaker, camera, and browser or desktop permissions first.",
          "Confirm headset and dock behavior on another call app before blaming Teams alone."
        ]
      },
      teams_membership: {
        type: "resolution",
        title: "Channel or policy path",
        body: [
          "Verify team membership, channel permissions, and whether the user is in the correct org.",
          "Treat missing channels and tabs as membership or policy refresh issues before reinstalling."
        ]
      }
    }
  },
  {
    id: "onedrive",
    title: "OneDrive Sync Problems",
    summary: "Use this for stuck sync, missing files, naming conflicts, or libraries that are not updating.",
    start: "onedrive_start",
    nodes: {
      onedrive_start: {
        type: "question",
        prompt: "Can the user see the expected files in the browser?",
        answers: [
          { label: "Yes", next: "onedrive_local" },
          { label: "No", next: "onedrive_access" }
        ]
      },
      onedrive_access: {
        type: "resolution",
        title: "Service or access path",
        body: [
          "Check whether the user is in the correct tenant, has access to the right library, and is not using the wrong Microsoft identity.",
          "Confirm the problem is not actually SharePoint permissions or a shared-link mismatch."
        ]
      },
      onedrive_local: {
        type: "question",
        prompt: "Are only certain files or folders failing to sync?",
        answers: [
          { label: "Yes", next: "onedrive_names" },
          { label: "No", next: "onedrive_engine" }
        ]
      },
      onedrive_names: {
        type: "resolution",
        title: "Path, naming, or lock issue",
        body: [
          "Check path length, invalid characters, and whether another app is locking the file.",
          "Review whether the same folder is synced twice or collides with an older local sync path."
        ]
      },
      onedrive_engine: {
        type: "question",
        prompt: "Is the device low on disk space or pinning large folders offline?",
        answers: [
          { label: "Yes", next: "onedrive_space" },
          { label: "No", next: "onedrive_reset" }
        ]
      },
      onedrive_space: {
        type: "resolution",
        title: "Storage pressure path",
        body: [
          "Check free disk space, Files On-Demand behavior, and offline-pinned folders before unlinking the client.",
          "Reduce local content pressure first if the endpoint is close to full."
        ]
      },
      onedrive_reset: {
        type: "resolution",
        title: "Client refresh path",
        body: [
          "Pause and resume sync, then relink the account if browser access is still healthy.",
          "Use reset or relink steps only after access, naming, and disk-space issues are ruled out."
        ]
      }
    }
  },
  {
    id: "printer",
    title: "Printer and Queue Problems",
    summary: "Use this for print queues, missing printers, wrong defaults, or shared-printer confusion.",
    start: "printer_start",
    nodes: {
      printer_start: {
        type: "question",
        prompt: "Is the printer reachable and online from another workstation?",
        answers: [
          { label: "Yes", next: "printer_user" },
          { label: "No", next: "printer_device" }
        ]
      },
      printer_device: {
        type: "resolution",
        title: "Printer or network path",
        body: [
          "Check printer power, network reachability, print server, and IP assignment first.",
          "Treat this as a shared device or network issue before reinstalling drivers on one PC."
        ]
      },
      printer_user: {
        type: "question",
        prompt: "Is the problem isolated to one workstation or user?",
        answers: [
          { label: "Yes", next: "printer_spooler" },
          { label: "No", next: "printer_mapping" }
        ]
      },
      printer_spooler: {
        type: "resolution",
        title: "Local workstation path",
        body: [
          "Clear stuck jobs, restart the print spooler, and confirm the default printer is correct.",
          "Reinstall with the approved driver only after verifying the queue path and printer target."
        ]
      },
      printer_mapping: {
        type: "resolution",
        title: "Shared queue path",
        body: [
          "Check whether the shared printer is published correctly and still points to the right server or host.",
          "Review whether an old queue or redirected printer is competing with the intended one."
        ]
      }
    }
  },
  {
    id: "vpn",
    title: "VPN and Remote Access Failures",
    summary: "Use this when users can or cannot connect remotely, or when the tunnel comes up but resources still fail.",
    start: "vpn_start",
    nodes: {
      vpn_start: {
        type: "question",
        prompt: "Does the user have working internet before opening the VPN client?",
        answers: [
          { label: "Yes", next: "vpn_connect" },
          { label: "No", next: "vpn_local" }
        ]
      },
      vpn_local: {
        type: "resolution",
        title: "Local connectivity path",
        body: [
          "Treat this as a local network issue first: Wi-Fi, ISP, captive portal, or endpoint networking.",
          "Do not troubleshoot the VPN profile before the device has normal internet access."
        ]
      },
      vpn_connect: {
        type: "question",
        prompt: "Does the VPN actually connect?",
        answers: [
          { label: "Yes", next: "vpn_resource" },
          { label: "No", next: "vpn_auth" }
        ]
      },
      vpn_auth: {
        type: "resolution",
        title: "Authentication or profile path",
        body: [
          "Check MFA, certificates, saved profiles, and whether the user still has VPN entitlement.",
          "Compare the saved portal and profile against a known-good user before changing global settings."
        ]
      },
      vpn_resource: {
        type: "question",
        prompt: "After connecting, can the user reach internal resources by name?",
        answers: [
          { label: "Yes", next: "vpn_app" },
          { label: "No", next: "vpn_dns" }
        ]
      },
      vpn_dns: {
        type: "resolution",
        title: "DNS or routing path",
        body: [
          "Check internal DNS resolution, split-tunnel expectations, and whether the resource is supposed to traverse VPN.",
          "If IP reachability works but names fail, stay focused on DNS rather than the app."
        ]
      },
      vpn_app: {
        type: "resolution",
        title: "Application-specific path",
        body: [
          "If name resolution and internal reachability are good, move into the application workflow itself.",
          "At that point the VPN is likely healthy and the failure belongs to the resource, app, or permissions."
        ]
      }
    }
  },
  {
    id: "office_activation",
    title: "Office Activation and Sign-In",
    summary: "Use this when Office says unlicensed, activation failed, or the wrong account is tied to desktop apps.",
    start: "office_start",
    nodes: {
      office_start: {
        type: "question",
        prompt: "Is the user signed into Office with the correct work account?",
        answers: [
          { label: "Yes", next: "office_license" },
          { label: "No", next: "office_identity" }
        ]
      },
      office_identity: {
        type: "resolution",
        title: "Wrong identity path",
        body: [
          "Remove stale personal or old-tenant identities from Office before deeper repair work.",
          "Confirm the intended work identity matches the license assignment in Microsoft 365."
        ]
      },
      office_license: {
        type: "question",
        prompt: "Does the assigned license include desktop apps and the required service plans?",
        answers: [
          { label: "Yes", next: "office_install" },
          { label: "No", next: "office_assignment" }
        ]
      },
      office_assignment: {
        type: "resolution",
        title: "License assignment path",
        body: [
          "Fix the Microsoft 365 bundle or service-plan assignment before repairing the desktop client.",
          "Recheck usage location and provisioning delays if the license was just changed."
        ]
      },
      office_install: {
        type: "resolution",
        title: "Local Office client path",
        body: [
          "If the right identity and license are confirmed, move into Office repair and version cleanup.",
          "Multiple Office builds or broken installs can cause activation to fail even when licensing is correct."
        ]
      }
    }
  }
];

export const emergencyPlaybooks = [
  {
    id: "terminated-user",
    title: "Immediate Termination / Immediate Access Removal",
    severity: "High",
    triggers: [
      "User termination with immediate cutoff requirement",
      "User departure flagged as high risk or sensitive"
    ],
    first15: [
      "Disable the primary identity in the source of authority and confirm downstream sign-in is blocked.",
      "Invalidate MFA, VPN, tokens, and privileged sessions where applicable.",
      "Alert the internal owner so device recovery, mailbox decisions, and handoff start immediately."
    ],
    containment: [
      "Check shared credentials, vault access, RMM tools, and service accounts tied to the user.",
      "Review alerting contacts and admin roles that still point to the departing user."
    ],
    communication: [
      "Record the exact time access was removed and who approved the action.",
      "Use a neutral completion note that confirms cutoff without disclosing unnecessary HR detail."
    ],
    verify: [
      "Test that sign-in is blocked in the expected places: M365, AD, VPN, and key business apps.",
      "Confirm ownership handoff tasks were created if they cannot be completed immediately."
    ]
  },
  {
    id: "compromise",
    title: "Suspected Account Compromise",
    severity: "Critical",
    triggers: [
      "Unexpected MFA prompts or malicious sign-in evidence",
      "Mailbox-rule tampering, impossible travel, or risky sign-in alerts"
    ],
    first15: [
      "Contain the identity first by resetting credentials, revoking sessions, and validating MFA methods.",
      "Check whether forwarding rules, inbox rules, or suspicious app consent are present.",
      "Confirm whether the issue is isolated to one identity or part of a wider tenant event."
    ],
    containment: [
      "Review recent sign-ins, privileged roles, shared mailboxes, and any app registrations tied to the user.",
      "Look for lateral risk such as VPN access, RMM trust, and shared admin credentials."
    ],
    communication: [
      "Provide a concise incident update covering what was observed, what was contained, and what still needs review.",
      "Do not promise clean bill of health until sign-ins, mailbox rules, and admin exposure are reviewed."
    ],
    verify: [
      "Confirm the user can sign back in cleanly with the intended identity and MFA path.",
      "Capture the final remediation steps and any follow-up monitoring window."
    ]
  },
  {
    id: "lost-device",
    title: "Lost or Stolen Device",
    severity: "High",
    triggers: [
      "Laptop or phone reported lost",
      "Unattended device believed compromised or unrecoverable"
    ],
    first15: [
      "Confirm device identity, last known user, and whether the device had cached access or VPN trust.",
      "Lock, isolate, or retire the device through the available management platform if supported.",
      "Review whether account sign-in, MFA, or session revocation is also needed."
    ],
    containment: [
      "Check BitLocker or encryption status, local admin exposure, and what data was likely cached offline.",
      "Treat shared folders, offline sync, and desktop-app caches as part of the risk review."
    ],
    communication: [
      "Log asset details, reported time, and the current containment state.",
      "Use calm customer-facing wording that explains what was cut off and what remains under review."
    ],
    verify: [
      "Confirm the device no longer has trusted access where management controls were expected to remove it.",
      "Create replacement and handoff tasks if the user still needs to work."
    ]
  },
  {
    id: "mfa-lockout",
    title: "MFA Lockout / User Cannot Sign In",
    severity: "Medium",
    triggers: [
      "Phone replacement or Authenticator failure",
      "User locked out with no approved second factor"
    ],
    first15: [
      "Confirm identity, approved recovery path, and whether any backup method still exists before resetting MFA.",
      "Check whether the problem is notification delivery, wrong account tile, or full method loss.",
      "Use controlled re-registration rather than repeated trial-and-error resets."
    ],
    containment: [
      "If the user is high risk or privileged, verify there was no recent suspicious sign-in before restoring access.",
      "Document the exact method removed and the exact method added."
    ],
    communication: [
      "Tell the user what recovery method is being used and what they should expect next.",
      "Log the reason for reset so later lockouts are easier to diagnose."
    ],
    verify: [
      "Have the user complete a successful sign-in and one follow-up MFA challenge before closing.",
      "Confirm any dependent apps like Outlook, Teams, or VPN are also healthy."
    ]
  },
  {
    id: "phishing-mailbox",
    title: "Mailbox Phishing / Suspicious Email Event",
    severity: "High",
    triggers: [
      "User clicked a suspicious link or opened a malicious attachment",
      "Multiple users report the same suspicious message"
    ],
    first15: [
      "Contain the account if credentials may have been entered or tokens may have been stolen.",
      "Identify the message scope and remove or purge it if tenant tooling supports it.",
      "Check inbox rules, forwarding, and sign-in behavior on the affected account."
    ],
    containment: [
      "Review whether the event reached shared mailboxes, distribution lists, or executives.",
      "Treat the message as both a mail event and a credential-risk event if links were clicked."
    ],
    communication: [
      "Send a concise internal note with the sender, subject, impact scope, and current containment action.",
      "Keep customer updates focused on what was observed and what users should avoid doing next."
    ],
    verify: [
      "Confirm the message is no longer broadly accessible where removal was attempted.",
      "Verify any affected user accounts are stable after remediation."
    ]
  },
  {
    id: "ransomware",
    title: "Possible Ransomware or Widespread Encryption",
    severity: "Critical",
    triggers: [
      "Multiple files renamed or encrypted",
      "Multiple endpoints alerting at once with unusual file activity"
    ],
    first15: [
      "Isolate the affected workstation or server from the network immediately if safe to do so.",
      "Preserve evidence and avoid unnecessary rebooting or cleanup before containment is understood.",
      "Notify the internal escalation path and identify whether the issue is spreading."
    ],
    containment: [
      "Check mapped drives, file servers, sync tools, and other devices touched by the affected identity.",
      "Review backup posture and whether recent restore points exist before promising recovery."
    ],
    communication: [
      "Escalate fast with timeline, affected systems, observed behavior, and current containment steps.",
      "Customer communication should be controlled and factual, not speculative."
    ],
    verify: [
      "Confirm spread has stopped before moving into rebuild or restore work.",
      "Document what was isolated, what was preserved, and what is pending forensic or vendor review."
    ]
  }
];

export const handoffTemplates = [
  {
    id: "completed-onboarding",
    title: "Onboarding Completed",
    audience: "Customer / Manager",
    useCase: "Use when a new user or workstation is ready for handoff.",
    template: `Hi [Name],

The onboarding for [User / Role] has been completed.

Completed:
- Identity and core access provisioning
- Device setup and baseline validation
- Required application access in scope for this request

Please have the user test:
- Sign-in
- Email / Teams access
- Any role-specific applications approved for day one

If anything looks off, reply to this ticket with the exact issue and what they were trying to access.

Thanks,
[Tech Name]`
  },
  {
    id: "completed-offboarding",
    title: "Offboarding Completed",
    audience: "Customer / Manager",
    useCase: "Use when access removal and core recovery work are complete.",
    template: `Hi [Name],

The offboarding for [User] has been completed based on the approved request.

Completed:
- Primary access removed
- Core applications reviewed in scope
- Documentation and assigned follow-up items updated

Still pending, if applicable:
- Device return or physical asset recovery
- Data retention or ownership handoff decisions

If you need confirmation on any specific application or ownership item, reply here and we can add that to the ticket record.

Thanks,
[Tech Name]`
  },
  {
    id: "pending-customer",
    title: "Pending Customer Action",
    audience: "Customer / End User",
    useCase: "Use when support is blocked on a user, manager, or customer decision.",
    template: `Hi [Name],

We are currently waiting on the following before we can complete this request:

- [Action / approval / test needed]

Once that is available, we can continue with:
- [Next step]

If helpful, reply with a preferred time window and we can coordinate the next step directly.

Thanks,
[Tech Name]`
  },
  {
    id: "vendor-escalation",
    title: "Vendor Escalation Update",
    audience: "Customer / Internal",
    useCase: "Use when the issue is narrowed to vendor behavior and needs escalation.",
    template: `Hi [Name],

We have completed the standard troubleshooting path and the issue currently appears to require vendor review.

What we verified:
- [Verification 1]
- [Verification 2]
- [Verification 3]

Why we are escalating:
- [Short reason]

Next step:
- We will continue tracking the vendor response and update you as soon as we have a supported fix or workaround.

Thanks,
[Tech Name]`
  },
  {
    id: "follow-up-monitoring",
    title: "Monitoring / Follow-Up Notice",
    audience: "Customer / Internal",
    useCase: "Use when the immediate issue is stabilized but needs a follow-up window.",
    template: `Hi [Name],

The immediate issue appears stable at this time, but we recommend a short follow-up monitoring window.

What was done:
- [Action 1]
- [Action 2]

What we are watching:
- [Risk or symptom]

If the issue returns, please note the time and exact behavior so we can compare it against the recent changes.

Thanks,
[Tech Name]`
  }
];

export const snippetLibrary = [
  {
    category: "Windows and Identity",
    snippets: [
      {
        title: "Force Group Policy Refresh",
        shell: "PowerShell",
        command: "gpupdate /force",
        notes: "Useful after group membership, printer, drive, or workstation policy changes.",
        caution: "May prompt for logoff or restart depending on policy scope."
      },
      {
        title: "Show Current User and Host",
        shell: "PowerShell",
        command: "whoami; hostname",
        notes: "Fast sanity check when identity context is unclear on a remote session.",
        caution: "Verify whether you are in a local, domain, or elevated session."
      },
      {
        title: "Show Logged-In and Cached Profile Context",
        shell: "PowerShell",
        command: "Get-CimInstance Win32_ComputerSystem | Select-Object UserName; Get-ChildItem C:\\Users",
        notes: "Helpful during profile cleanup or device reassignment reviews.",
        caution: "Do not delete profiles until data handoff and ownership are confirmed."
      }
    ]
  },
  {
    category: "Network and Remote Access",
    snippets: [
      {
        title: "IP, Gateway, and DNS Snapshot",
        shell: "PowerShell",
        command: "ipconfig /all",
        notes: "Basic first-pass network snapshot for VPN, printer, and share troubleshooting.",
        caution: "Redact public IP details before sharing outside the ticket if needed."
      },
      {
        title: "Test Name Resolution",
        shell: "PowerShell",
        command: "Resolve-DnsName [hostname]",
        notes: "Use when the user can reach by IP but not by name, or when internal resources fail after VPN connect.",
        caution: "Replace [hostname] with the actual internal or external name being tested."
      },
      {
        title: "Quick Connectivity Check",
        shell: "PowerShell",
        command: "Test-NetConnection [hostname] -Port [port]",
        notes: "Useful for line-of-business apps, VPN portals, and shared service endpoints.",
        caution: "Choose the correct port for the service you are testing."
      }
    ]
  },
  {
    category: "Microsoft 365 and Productivity",
    snippets: [
      {
        title: "OneDrive Client Reset",
        shell: "Run dialog / CMD",
        command: "%localappdata%\\Microsoft\\OneDrive\\OneDrive.exe /reset",
        notes: "Helpful when sync is stuck after account changes or client-state corruption.",
        caution: "Use only after browser access, permissions, and path issues are ruled out."
      },
      {
        title: "Open Outlook in Safe Mode",
        shell: "Run dialog / CMD",
        command: "outlook.exe /safe",
        notes: "Fast way to separate Outlook add-in problems from mailbox or profile problems.",
        caution: "A successful safe-mode launch usually points toward an add-in or profile issue."
      },
      {
        title: "Show Office Sign-In Identities",
        shell: "PowerShell",
        command: "cmd /c \"dsregcmd /status\"",
        notes: "Useful when workstation sign-in, tenant join, or Microsoft identity state is in question.",
        caution: "Interpret together with the actual Office account shown in the apps."
      }
    ]
  },
  {
    category: "Printing and System Health",
    snippets: [
      {
        title: "Restart Print Spooler",
        shell: "PowerShell",
        command: "Restart-Service Spooler",
        notes: "Good first move when jobs are stuck in queue and printer reachability looks healthy.",
        caution: "This interrupts active print jobs on that workstation."
      },
      {
        title: "See Top Drive Consumers",
        shell: "PowerShell",
        command: "Get-ChildItem C:\\Users -Directory | ForEach-Object { $_.FullName; (Get-ChildItem $_.FullName -Recurse -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum }",
        notes: "Useful for low-disk-space cases where profile data is the likely culprit.",
        caution: "Can take time on large profiles and should be used carefully on slow endpoints."
      },
      {
        title: "Windows Update Quick Check",
        shell: "PowerShell",
        command: "Get-Service wuauserv, bits",
        notes: "Quick sanity check before deeper Windows Update troubleshooting.",
        caution: "This does not replace full update diagnostics or error-code review."
      }
    ]
  }
];
