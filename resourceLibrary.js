export const snippetLibrary = [
  {
    category: "Microsoft 365 / Entra / Exchange",
    snippets: [
      {
        id: "m365-force-sign-out",
        title: "Force sign-out of all Microsoft 365 sessions",
        purpose: "Invalidate active web and modern-auth sessions after compromise review, offboarding, or wrong-tenant drift.",
        whenToUse: "Use after approval when the account must reauthenticate cleanly across M365 workloads.",
        prerequisites: ["Exchange Online or Graph-connected admin access", "Confirm user impact and current tenant"],
        command: "Revoke-MgUserSignInSession -UserId user@domain.com",
        expectedResult: "All refresh tokens are revoked and the user must sign back in to Outlook, Teams, OneDrive, and browser sessions.",
        caution: "Expect temporary user disruption. Pair this with password and MFA review when compromise is suspected.",
        relatedGuides: [{ label: "Outlook", url: "guides/microsoft/outlook.html" }, { label: "Teams", url: "guides/microsoft/teams.html" }]
      },
      {
        id: "exchange-mailbox-type-check",
        title: "Mailbox type check or convert to shared",
        purpose: "Verify whether a mailbox is user, shared, room, or equipment and convert when the approved workflow requires it.",
        whenToUse: "Use during offboarding, role mailbox cleanup, or when Outlook behavior does not match the expected mailbox type.",
        prerequisites: ["Exchange Online PowerShell session", "Approved target mailbox type"],
        command: "Get-ExoMailbox user@domain.com | Select DisplayName,RecipientTypeDetails; Set-Mailbox user@domain.com -Type Shared",
        expectedResult: "You can confirm the current mailbox type and convert the mailbox to Shared when appropriate.",
        caution: "Shared mailbox conversions can affect licensing, mobile access, and sign-in expectations. Confirm retention and ownership first.",
        relatedGuides: [{ label: "Outlook", url: "guides/microsoft/outlook.html" }]
      },
      {
        id: "exchange-mailbox-permission-check",
        title: "Mailbox permission checks and changes",
        purpose: "Review or apply Full Access, Send As, or Send on Behalf permissions for shared mailbox and delegate tickets.",
        whenToUse: "Use when a user cannot see or send from a shared mailbox, or when access needs to be granted or removed cleanly.",
        prerequisites: ["Exchange Online PowerShell session", "Approved access request"],
        command: "Get-MailboxPermission shared@domain.com; Add-MailboxPermission -Identity shared@domain.com -User user@domain.com -AccessRights FullAccess -AutoMapping:$true; Add-RecipientPermission shared@domain.com -Trustee user@domain.com -AccessRights SendAs",
        expectedResult: "You can confirm current mailbox permissions and add or remove delegate access using the approved command set.",
        caution: "Auto-mapping changes may not appear immediately. Document what was granted and when.",
        relatedGuides: [{ label: "Outlook", url: "guides/microsoft/outlook.html" }]
      },
      {
        id: "license-assignment-quick-check",
        title: "License assignment quick check",
        purpose: "Confirm whether the expected SKU and service plans are assigned before app-side troubleshooting.",
        whenToUse: "Use for Outlook, Teams, OneDrive, or SharePoint access tickets before local repair work.",
        prerequisites: ["Graph or admin-center access"],
        command: "Get-MgUserLicenseDetail -UserId user@domain.com | Select SkuPartNumber, ServicePlans",
        expectedResult: "You can see assigned SKUs and service-plan state for the target user.",
        caution: "Provisioning delays after new assignment can look like product failure. Capture when the change was made.",
        relatedGuides: [{ label: "Teams", url: "guides/microsoft/teams.html" }, { label: "SharePoint", url: "guides/microsoft/sharepoint.html" }]
      },
      {
        id: "onedrive-reset-guidance",
        title: "OneDrive reset guidance",
        purpose: "Reset the local sync engine only after browser truth and permissions are confirmed healthy.",
        whenToUse: "Use for stuck sync, duplicate roots, or a local client that never recovers after pause or resume.",
        prerequisites: ["Confirm files are correct in the browser", "Note pending uploads and offline folders first"],
        command: "%localappdata%\\Microsoft\\OneDrive\\OneDrive.exe /reset",
        expectedResult: "OneDrive restarts and rebuilds local sync state for the signed-in account.",
        caution: "Do not use this as the first move. Validate browser access, naming conflicts, and disk pressure first.",
        relatedGuides: [{ label: "OneDrive", url: "guides/microsoft/onedrive.html" }, { label: "SharePoint", url: "guides/microsoft/sharepoint.html" }]
      }
    ]
  },
  {
    category: "Active Directory",
    snippets: [
      {
        id: "ad-disable-and-move",
        title: "Disable user and move to disabled OU",
        purpose: "Perform a controlled AD disable and move during approved offboarding.",
        whenToUse: "Use for on-prem or hybrid offboarding where the client has a standard disabled OU.",
        prerequisites: ["AD PowerShell access", "Approved disabled OU path"],
        command: "Disable-ADAccount -Identity jdoe; Move-ADObject -Identity (Get-ADUser jdoe).DistinguishedName -TargetPath 'OU=Disabled Users,DC=contoso,DC=com'",
        expectedResult: "The account is disabled and moved into the correct disabled OU for downstream sync and reporting.",
        caution: "Confirm downstream sync timing, mailbox retention, and group cleanup expectations before use.",
        relatedGuides: []
      },
      {
        id: "ad-export-group-memberships",
        title: "Export group memberships",
        purpose: "Capture existing AD group memberships before offboarding, privilege cleanup, or role changes.",
        whenToUse: "Use when you need an audit-friendly baseline before removing access.",
        prerequisites: ["AD PowerShell access"],
        command: "Get-ADPrincipalGroupMembership jdoe | Select Name, DistinguishedName | Export-Csv C:\\Temp\\jdoe-groups.csv -NoTypeInformation",
        expectedResult: "A CSV list of current group memberships is created for the target user.",
        caution: "Store the export in the ticket or approved documentation location if it contains privileged groups.",
        relatedGuides: []
      },
      {
        id: "ad-remove-nondefault-groups",
        title: "Remove user from all non-default groups",
        purpose: "Strip group memberships while leaving Domain Users or other approved defaults intact.",
        whenToUse: "Use for offboarding or compromised-account cleanup when group access must be removed quickly.",
        prerequisites: ["AD PowerShell access", "Client-approved default groups list"],
        command: "$keep = 'Domain Users'; Get-ADPrincipalGroupMembership jdoe | Where-Object { $_.Name -ne $keep } | ForEach-Object { Remove-ADGroupMember -Identity $_ -Members jdoe -Confirm:$false }",
        expectedResult: "All non-default group memberships are removed from the user account.",
        caution: "Review privileged and synced groups carefully in hybrid environments before bulk removal.",
        relatedGuides: []
      },
      {
        id: "ad-unlock-account",
        title: "Unlock AD account",
        purpose: "Unlock a locked-out domain account after verifying the user and the lockout source.",
        whenToUse: "Use for normal lockout recovery after password resets, stale credentials, or VPN retries.",
        prerequisites: ["AD PowerShell access", "Identity verification complete"],
        command: "Unlock-ADAccount -Identity jdoe",
        expectedResult: "The account is unlocked and can authenticate again if the correct password is used.",
        caution: "Check for stale mobile, VPN, mapped-drive, or service credentials if the lockout keeps returning.",
        relatedGuides: []
      },
      {
        id: "ad-password-reset-next-logon",
        title: "Password reset with change at next logon",
        purpose: "Reset a user password while forcing a clean password change at the next sign-in.",
        whenToUse: "Use for routine password resets that do not involve compromise containment workflows.",
        prerequisites: ["AD PowerShell access", "Approved temporary password"],
        command: "$pw = ConvertTo-SecureString 'TempP@ssw0rd!' -AsPlainText -Force; Set-ADAccountPassword -Identity jdoe -Reset -NewPassword $pw; Set-ADUser jdoe -ChangePasswordAtLogon $true",
        expectedResult: "The password is reset and the user must choose a new password at the next domain logon.",
        caution: "Do not use this as the only response for a compromise event. Pair with session revocation where needed.",
        relatedGuides: []
      }
    ]
  },
  {
    category: "Networking / DNS / VPN",
    snippets: [
      {
        id: "dns-flush-register",
        title: "DNS flush and register sequence",
        purpose: "Refresh local DNS cache and client registration after network or naming changes.",
        whenToUse: "Use when name resolution looks stale or the machine just changed networks or VPN state.",
        prerequisites: ["Elevated command prompt or PowerShell"],
        command: "ipconfig /flushdns\nipconfig /registerdns",
        expectedResult: "The local DNS cache is cleared and the client attempts to refresh its DNS registration.",
        caution: "Helpful for workstation naming issues, but it will not fix broken DNS server records by itself.",
        relatedGuides: []
      },
      {
        id: "dns-resolution-check",
        title: "DNS resolution checks",
        purpose: "Confirm whether a hostname resolves internally or externally and what record is returned.",
        whenToUse: "Use when users can reach by IP but not by name, or when VPN resources fail by hostname only.",
        prerequisites: ["Target hostname or FQDN"],
        command: "Resolve-DnsName fileserver.contoso.local\nnslookup fileserver.contoso.local",
        expectedResult: "You can compare the returned record, server, and response path for the target hostname.",
        caution: "Run this on and off VPN when split-tunnel behavior is part of the ticket.",
        relatedGuides: [{ label: "ProjectWise", url: "guides/bentley/projectwise.html" }, { label: "OneDrive", url: "guides/microsoft/onedrive.html" }]
      },
      {
        id: "smb-path-reachability-test",
        title: "SMB path reachability test",
        purpose: "Validate name resolution, port 445 reachability, and direct UNC access to a file share.",
        whenToUse: "Use when mapped drives, shared project paths, or company files fail for one user or one workstation.",
        prerequisites: ["Target share name or UNC path"],
        command: "Test-NetConnection fileserver.contoso.local -Port 445\nTest-Path \\fileserver.contoso.local\\Shared",
        expectedResult: "You can prove whether the path resolves, the SMB port answers, and the share is reachable with the current user context.",
        caution: "A passing port check does not prove permissions. Test the real UNC path too.",
        relatedGuides: [{ label: "Civil 3D", url: "guides/autodesk/civil-3d.html" }, { label: "QuickBooks Enterprise Desktop", url: "guides/quickbooks/quickbooks-enterprise-desktop.html" }]
      },
      {
        id: "port-connectivity-test",
        title: "Port connectivity test",
        purpose: "Quickly check whether a service port is reachable from the affected machine.",
        whenToUse: "Use for license servers, QuickBooks hosts, VPN portals, or vendor services that may be filtered.",
        prerequisites: ["Target hostname and port"],
        command: "Test-NetConnection licensehost.contoso.local -Port 7788",
        expectedResult: "You can see whether TCP handshake succeeds to the target service.",
        caution: "A successful TCP check does not guarantee application-layer success, but a failure is strong evidence for network path review.",
        relatedGuides: [{ label: "Mathcad Prime", url: "guides/ptc/mathcad-prime.html" }, { label: "CONNECTION Client", url: "guides/bentley/connection-client.html" }]
      },
      {
        id: "vpn-drive-remap-checklist",
        title: "VPN drive remap or reset checklist",
        purpose: "Walk through the common drive, DNS suffix, and credential cleanup steps after VPN reconnect issues.",
        whenToUse: "Use when shares work on-site but not over VPN, or mapped drives keep reconnecting with stale credentials.",
        prerequisites: ["VPN connected", "Known-good UNC path"],
        command: "cmd /c \"net use * /delete /y\"\ncmdkey /list",
        expectedResult: "Existing drive mappings are cleared so the share can be rebuilt cleanly after DNS and credential review.",
        caution: "Do not remove mappings until you document any special finance, CAD, or departmental drives the user needs restored.",
        relatedGuides: [{ label: "ProjectWise", url: "guides/bentley/projectwise.html" }, { label: "Civil 3D", url: "guides/autodesk/civil-3d.html" }]
      }
    ]
  },
  {
    category: "Windows Repair / Profile / Printing",
    snippets: [
      {
        id: "sfc-dism-repair-sequence",
        title: "SFC and DISM repair sequence",
        purpose: "Validate and repair Windows component health before assuming app-specific corruption.",
        whenToUse: "Use for broad workstation instability, broken Office installs, or after failed updates.",
        prerequisites: ["Elevated command prompt or PowerShell"],
        command: "DISM /Online /Cleanup-Image /RestoreHealth\nsfc /scannow",
        expectedResult: "Windows image health is repaired where possible and protected system files are validated.",
        caution: "This is not a substitute for app-specific triage. Capture error details before and after the run.",
        relatedGuides: [{ label: "AutoCAD", url: "guides/autodesk/autocad.html" }, { label: "Acrobat Pro", url: "guides/adobe/acrobat-pro.html" }]
      },
      {
        id: "office-repair-guidance",
        title: "Office Quick Repair and Online Repair guidance",
        purpose: "Standardize when to use Quick Repair versus Online Repair for Outlook, Teams add-ins, or Office desktop problems.",
        whenToUse: "Use after mailbox, license, and add-in scoping suggests the local Office install is unhealthy.",
        prerequisites: ["Apps & Features access", "User aware Office apps will close"],
        command: "appwiz.cpl",
        expectedResult: "You can launch the Office repair workflow from Apps & Features and choose Quick Repair or Online Repair based on severity.",
        caution: "Online Repair is more disruptive and may reset some local Office state. Preserve profile notes first.",
        relatedGuides: [{ label: "Outlook", url: "guides/microsoft/outlook.html" }, { label: "SharePoint", url: "guides/microsoft/sharepoint.html" }]
      },
      {
        id: "printer-spooler-reset",
        title: "Printer spooler reset",
        purpose: "Clear stuck print jobs and reset the local spooler path for workstation-specific print issues.",
        whenToUse: "Use when jobs queue forever, one PC cannot print, or stale jobs block the queue.",
        prerequisites: ["Elevated PowerShell"],
        command: "Stop-Service Spooler\nRemove-Item C:\\Windows\\System32\\spool\\PRINTERS\\* -Force\nStart-Service Spooler",
        expectedResult: "The print spooler restarts with an empty queue.",
        caution: "This removes queued jobs on that workstation. Confirm no active print run is in progress.",
        relatedGuides: []
      },
      {
        id: "event-log-quick-collection",
        title: "Event log quick collection commands",
        purpose: "Grab recent Application and System errors for fast ticket evidence.",
        whenToUse: "Use before escalation when the issue may be tied to crashes, services, or Windows components.",
        prerequisites: ["PowerShell access"],
        command: "Get-WinEvent -LogName Application -MaxEvents 50 | Select TimeCreated, ProviderName, Id, LevelDisplayName, Message\nGet-WinEvent -LogName System -MaxEvents 50 | Select TimeCreated, ProviderName, Id, LevelDisplayName, Message",
        expectedResult: "Recent Application and System events are available for review or export into the ticket.",
        caution: "Filter aggressively before sharing so the ticket stays readable.",
        relatedGuides: [{ label: "Revit", url: "guides/autodesk/revit.html" }, { label: "Bluebeam Revu 21", url: "guides/bluebeam/revu-21.html" }]
      },
      {
        id: "edge-homepage-policy-check",
        title: "Edge homepage and startup policy checks",
        purpose: "Confirm whether browser homepages or startup pages are controlled by policy.",
        whenToUse: "Use when browser behavior changed after onboarding, profile rebuild, or GPO updates.",
        prerequisites: ["Local browser access"],
        command: "edge://policy",
        expectedResult: "You can confirm which Edge policies are applied and whether startup behavior is managed.",
        caution: "If the policy is managed centrally, do not hand-edit local settings and expect them to persist.",
        relatedGuides: [{ label: "SharePoint", url: "guides/microsoft/sharepoint.html" }]
      }
    ]
  },
  {
    category: "Software Install / Uninstall / Cleanup",
    snippets: [
      {
        id: "msi-uninstall-lookup",
        title: "MSI uninstall lookup",
        purpose: "Find installed software and its uninstall string quickly from registry-backed sources.",
        whenToUse: "Use when a client needs a clean uninstall path or when the product name is ambiguous in Apps & Features.",
        prerequisites: ["PowerShell access"],
        command: "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*, HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Where-Object { $_.DisplayName -like '*Bluebeam*' } | Select DisplayName, DisplayVersion, UninstallString",
        expectedResult: "You can see the uninstall string, version, and registry-backed display name for the product.",
        caution: "Do not run unknown uninstall strings blindly on shared or production workstations without confirming scope.",
        relatedGuides: [{ label: "Autodesk Desktop App", url: "guides/autodesk/autodesk-desktop-app.html" }, { label: "Bluebeam Revu 21", url: "guides/bluebeam/revu-21.html" }]
      },
      {
        id: "cleanup-file-paths",
        title: "Common cleanup file paths",
        purpose: "Reference common temp, cache, and installer residue paths when a reinstall needs a true cleanup pass.",
        whenToUse: "Use after supported uninstall steps have completed but local app state still needs review.",
        prerequisites: ["Confirm local-only data is not required before deletion"],
        command: "%temp%\nC:\\Windows\\Temp\n%localappdata%\n%programdata%",
        expectedResult: "You have a repeatable shortlist of paths to review for leftover local installer or cache state.",
        caution: "Never bulk-delete profile or program-data folders without confirming application-specific ownership first.",
        relatedGuides: [{ label: "Acrobat Pro", url: "guides/adobe/acrobat-pro.html" }, { label: "Egnyte Desktop App", url: "guides/egnyte/egnyte-desktop-app.html" }]
      },
      {
        id: "run-as-admin-prereq-notes",
        title: "Run as admin and prerequisite notes",
        purpose: "Standard reminder block for installers that silently fail from standard sessions or half-finished reboot states.",
        whenToUse: "Use before rerunning installs that keep rolling back or failing near prerequisite checks.",
        prerequisites: ["Local admin rights or approved elevation path"],
        command: "whoami /groups\nGet-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WindowsUpdate\\Auto Update\\RebootRequired' -ErrorAction SilentlyContinue",
        expectedResult: "You can confirm admin context and whether a pending reboot state exists before another install attempt.",
        caution: "Do not keep rerunning the same installer if the box is waiting on a reboot or missing a required runtime.",
        relatedGuides: [{ label: "AutoCAD", url: "guides/autodesk/autocad.html" }, { label: "CONNECTION Client", url: "guides/bentley/connection-client.html" }]
      }
    ]
  },
  {
    category: "Security / Endpoint Checks",
    snippets: [
      {
        id: "bitdefender-service-check",
        title: "Bitdefender service and status checks",
        purpose: "Confirm Bitdefender processes and services exist before escalating a protection-gap ticket.",
        whenToUse: "Use when onboarding validation or security alerting suggests the agent is unhealthy.",
        prerequisites: ["PowerShell access"],
        command: "Get-Service *bd* | Select Name, Status\nGet-Process *bd* -ErrorAction SilentlyContinue | Select ProcessName, Id",
        expectedResult: "You can confirm whether common Bitdefender services and processes are present and running.",
        caution: "Service names vary by product generation. Compare with a known-good endpoint if needed.",
        relatedGuides: []
      },
      {
        id: "rocketcyber-agent-check",
        title: "RocketCyber agent presence check",
        purpose: "Verify whether the RocketCyber endpoint components exist on the workstation.",
        whenToUse: "Use when security monitoring or SOC ticketing suggests the endpoint fell out of telemetry.",
        prerequisites: ["PowerShell access"],
        command: "Get-Service *rocket* -ErrorAction SilentlyContinue\nGet-Process *rocket* -ErrorAction SilentlyContinue",
        expectedResult: "You can quickly confirm whether RocketCyber services or processes are present.",
        caution: "Exact service names vary by deployment. Pair this with the RMM or portal view when available.",
        relatedGuides: []
      },
      {
        id: "qualys-agent-check",
        title: "Qualys agent verification",
        purpose: "Check whether the Qualys Cloud Agent service is installed and reporting locally.",
        whenToUse: "Use for vulnerability-management gaps or new-device validation.",
        prerequisites: ["PowerShell access"],
        command: "Get-Service QualysAgent -ErrorAction SilentlyContinue\nGet-Item 'C:\\Program Files\\Qualys\\QualysAgent\\QualysAgent.exe' -ErrorAction SilentlyContinue",
        expectedResult: "You can confirm service presence and the agent binary path on the endpoint.",
        caution: "A running service does not guarantee recent cloud check-in. Compare with portal status if the ticket is urgent.",
        relatedGuides: []
      },
      {
        id: "defender-status-check",
        title: "Microsoft Defender status check",
        purpose: "Review quick Defender health and RTP state from PowerShell.",
        whenToUse: "Use when AV state, tamper protection, or real-time protection needs a fast local check.",
        prerequisites: ["PowerShell access"],
        command: "Get-MpComputerStatus | Select AMServiceEnabled, AntivirusEnabled, RealTimeProtectionEnabled, IsTamperProtected",
        expectedResult: "You can see whether core Defender services and real-time protection are enabled.",
        caution: "Co-managed AV products can change what these values mean. Compare with the client's standard security stack.",
        relatedGuides: []
      }
    ]
  }
];

export const handoffTemplateGroups = [
  {
    category: "Onboarding",
    templates: [
      {
        id: "new-user-onboarding-request",
        title: "New user onboarding request",
        audience: "Customer-facing",
        useCase: "Collect the minimum details needed to start a clean onboarding build.",
        template: "Hi [Client Contact],\n\nTo start onboarding for [User Name], please reply with the following:\n- Full name and preferred display name\n- Title / department / manager\n- Start date and time zone\n- Workstation need: [new / reassign / remote-only]\n- Microsoft 365 license or app set needed\n- Shared mailbox, group, file-share, VPN, or line-of-business access needed\n- MFA or phone setup notes\n\nIf this user needs elevated access, please include the approval in the ticket.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "portal-access-request",
        title: "Portal access request",
        audience: "Customer-facing",
        useCase: "Request admin approval for vendor portal, M365, or line-of-business admin access.",
        template: "Hi [Client Contact],\n\nWe are ready to complete access for [User / Tech], but we still need approval or sponsor confirmation for the following portal access:\n- [Portal / tenant / environment]\n- Requested role: [Role]\n- Business reason: [Reason]\n\nPlease confirm approval and any required vendor contacts or MFA expectations.\n\nThanks,\n[Tech Name]"
      }
    ]
  },
  {
    category: "Offboarding",
    templates: [
      {
        id: "termination-offboarding-confirmation",
        title: "Termination or offboarding confirmation",
        audience: "Customer-facing",
        useCase: "Confirm the scope and timing of a standard or urgent offboarding request.",
        template: "Hi [Client Contact],\n\nWe have the offboarding request for [User Name]. Please confirm the following so we can proceed correctly:\n- Effective disable time: [Date / Time / Time Zone]\n- Mailbox handling: [forward / shared conversion / delegate / hold]\n- Device handling: [pickup / ship / wipe / onsite]\n- Any urgent apps, file ownership, or vendor portals that need special handling\n\nOnce confirmed, we will complete the access removal and document any follow-up items.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "shared-mailbox-access-confirmation",
        title: "Shared mailbox access confirmation",
        audience: "Customer-facing",
        useCase: "Confirm who should retain or gain shared mailbox access after staffing changes.",
        template: "Hi [Client Contact],\n\nBefore we finalize this mailbox change, please confirm the intended access for [shared@domain.com]:\n- Keep current members: [Yes / No]\n- Add these users: [Names]\n- Remove these users: [Names]\n- Send As required: [Yes / No]\n\nWe will apply the mailbox changes once the access list is confirmed.\n\nThanks,\n[Tech Name]"
      }
    ]
  },
  {
    category: "Workstation Replacement",
    templates: [
      {
        id: "workstation-replacement-scheduling",
        title: "Workstation replacement scheduling",
        audience: "Customer-facing",
        useCase: "Schedule replacement, swap, or rebuild time with the end user.",
        template: "Hi [User Name],\n\nWe are ready to schedule your workstation replacement for [Device Name]. Please reply with a preferred time window from the options below:\n- [Option 1]\n- [Option 2]\n- [Option 3]\n\nBefore the swap, please confirm any locally stored files, browser bookmarks, signatures, or specialty applications we should preserve.\n\nThanks,\n[Tech Name]"
      }
    ]
  },
  {
    category: "Software Install Requests",
    templates: [
      {
        id: "software-install-approval-request",
        title: "Software install approval request",
        audience: "Customer-facing",
        useCase: "Request approval and deployment details for a software install.",
        template: "Hi [Client Contact],\n\nWe can proceed with the install request for [Application Name], but we need approval for the following before scheduling:\n- User or workstation: [User / Device]\n- Required version: [Version]\n- License or seat source: [Portal / seat / serial]\n- Business reason: [Reason]\n- Preferred install window: [Window]\n\nOnce approved, we will complete the install and validate the approved workflow with the user.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "mfa-reset-explanation",
        title: "MFA reset explanation",
        audience: "Customer-facing",
        useCase: "Explain the next-step user impact after an MFA reset or method clear.",
        template: "Hi [User Name],\n\nWe cleared your existing MFA registration so you can set it up again cleanly. The next time you sign in, you will be prompted to register your method again.\n\nPlease be ready with:\n- Your mobile device\n- Microsoft Authenticator if your organization uses it\n- A browser sign-in to your work account\n\nIf you see any prompts that do not match your work account, stop there and reply to this ticket with a screenshot.\n\nThanks,\n[Tech Name]"
      }
    ]
  },
  {
    category: "Escalation / Handoff",
    templates: [
      {
        id: "tier1-tier2-escalation",
        title: "Tier 1 to Tier 2 escalation handoff",
        audience: "Internal-only",
        useCase: "Package evidence cleanly before the ticket moves up.",
        template: "Summary:\n- User / device / location: [Details]\n- App or workflow affected: [App]\n- Impact: [Single user / multi-user / outage]\n\nWhat was confirmed:\n- [Access / license / version / browser result]\n- [Known-good comparison]\n- [Last known good time]\n\nWhat was tried:\n- [Step 1]\n- [Step 2]\n- [Step 3]\n\nNeed from Tier 2:\n- [Exact ask]\n\nArtifacts attached:\n- [Screenshots / logs / event IDs / file paths]"
      },
      {
        id: "vendor-escalation-request",
        title: "Tier 2 to vendor escalation handoff",
        audience: "Internal-only",
        useCase: "Prepare a support-ready summary for vendor case creation.",
        template: "Vendor escalation summary:\n- Product and version: [Version]\n- Tenant / datasource / environment: [Environment]\n- Affected users count: [Count]\n- Business impact: [Impact]\n\nVerified already:\n- [Entitlement / access]\n- [Known-good comparison]\n- [Repair path completed]\n\nEvidence collected:\n- [Logs]\n- [Screenshots]\n- [Exact error text]\n\nVendor question or ask:\n- [Specific ask]\n\nCallback / owner:\n- [Owner]"
      },
      {
        id: "after-hours-handoff-template",
        title: "After-hours handoff template",
        audience: "Internal-only",
        useCase: "Hand off unstable or in-progress work between after-hours and business-hours coverage.",
        template: "Current state:\n- Ticket / incident: [ID]\n- Service or app: [Service]\n- Impact: [Impact]\n- Current status: [Stable / unstable / monitoring]\n\nCompleted tonight:\n- [Action 1]\n- [Action 2]\n\nStill pending:\n- [Pending item]\n- [Customer action / vendor response]\n\nWatch for next shift:\n- [Risk]\n- [Rollback concern]\n\nNext owner:\n- [Name / team]"
      }
    ]
  },
  {
    category: "Outage / Maintenance / Closure",
    templates: [
      {
        id: "outage-acknowledgement",
        title: "Outage acknowledgement",
        audience: "Customer-facing",
        useCase: "Acknowledge a live outage and set expectations early.",
        template: "Hi [Client Contact],\n\nWe are actively investigating the issue affecting [service or app]. Current impact appears to be [impact scope].\n\nWhat we know so far:\n- Start time observed: [Time]\n- Affected area: [Scope]\n- Current action: [Action]\n\nWe will continue to update this ticket as we confirm scope and next steps.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "outage-update",
        title: "Outage update",
        audience: "Customer-facing",
        useCase: "Provide mid-incident status without overpromising.",
        template: "Hi [Client Contact],\n\nUpdate on [service or app]:\n- Current status: [Status]\n- Confirmed scope: [Scope]\n- Actions completed: [Actions]\n- Next checkpoint: [Next step / ETA if appropriate]\n\nWe will post another update once we confirm additional progress or full restoration.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "outage-resolution",
        title: "Outage resolution notice",
        audience: "Customer-facing",
        useCase: "Close the loop after service is restored.",
        template: "Hi [Client Contact],\n\nService for [service or app] has been restored as of [time].\n\nSummary:\n- Impacted scope: [Scope]\n- Resolution applied: [Action]\n- Remaining watch items: [If any]\n\nIf users continue seeing issues, please reply here with the exact time and behavior so we can compare it against the restoration work.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "maintenance-restart-notice",
        title: "Maintenance or restart notice",
        audience: "Customer-facing",
        useCase: "Notify users of a planned restart or minor maintenance event.",
        template: "Hi [Name],\n\nWe will be performing maintenance on [system] during [window]. During that time, users may see [brief impact].\n\nRecommended user action:\n- Save work before [time]\n- Sign out of [app] if requested\n\nIf anything unexpected continues after the window ends, reply to this ticket with the exact issue.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "ticket-closure-validation-request",
        title: "Ticket closure with validation request",
        audience: "Customer-facing",
        useCase: "Confirm the user can validate the fix before closure.",
        template: "Hi [Name],\n\nThe requested work for [issue] has been completed. When you have a moment, please test the following and let us know if anything is still off:\n- [Validation step 1]\n- [Validation step 2]\n\nIf everything looks good, we will close the ticket. If not, reply here with the exact behavior and time it happened.\n\nThanks,\n[Tech Name]"
      }
    ]
  },
  {
    category: "Client Admin Coordination",
    templates: [
      {
        id: "license-true-up-request",
        title: "License true-up request",
        audience: "Customer-facing",
        useCase: "Request approval to purchase or reallocate seats when support work uncovered a license shortfall.",
        template: "Hi [Client Contact],\n\nDuring this request, we confirmed that the current license pool for [product] does not cover the required user or feature set.\n\nNeeded:\n- Product: [Product]\n- Seat or feature shortfall: [Shortfall]\n- Affected users: [Users]\n\nPlease confirm whether you want us to proceed with true-up, reallocation, or temporary deferral.\n\nThanks,\n[Tech Name]"
      },
      {
        id: "domain-dns-change-approval",
        title: "Domain or DNS change approval request",
        audience: "Customer-facing",
        useCase: "Collect approval and rollback expectations before DNS or domain changes.",
        template: "Hi [Client Contact],\n\nBefore we proceed with the requested DNS or domain change for [domain], please confirm approval for the following:\n- Record or change requested: [Change]\n- Requested change window: [Window]\n- Rollback contact: [Contact]\n- Risk or service impact understood: [Yes / No]\n\nOnce approved, we will document the final change set in the ticket.\n\nThanks,\n[Tech Name]"
      }
    ]
  }
];

export const handoffTemplates = handoffTemplateGroups.flatMap(group =>
  group.templates.map(template => ({
    category: group.category,
    ...template
  }))
);

