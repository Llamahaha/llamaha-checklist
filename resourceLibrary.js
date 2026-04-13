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
      },
      {
        id: "m365-mfa-methods-check",
        title: "MFA method review for a user",
        purpose: "List the registered authentication methods for a user to support MFA troubleshooting or pre-reset review.",
        whenToUse: "Use before resetting MFA to document what was registered, or when a user reports push failures and you need to see all their methods.",
        prerequisites: ["Microsoft Graph PowerShell or Entra admin center access"],
        command: "Get-MgUserAuthenticationMethod -UserId user@domain.com | Select Id, AdditionalProperties",
        expectedResult: "You can see the registered MFA methods including app, phone, and FIDO2 entries for the target user.",
        caution: "Do not remove methods without confirming identity and approval. For privileged accounts, follow the approved out-of-band verification process.",
        relatedGuides: []
      },
      {
        id: "entra-signin-log-check",
        title: "Recent sign-in log review",
        purpose: "Pull recent sign-in events for a user to support compromise review, Conditional Access troubleshooting, or location verification.",
        whenToUse: "Use during compromise triage, CA block investigation, or when a user reports unexpected access prompts.",
        prerequisites: ["Entra admin center access or Microsoft Graph PowerShell with appropriate scope"],
        command: "Get-MgAuditLogSignIn -Filter \"userPrincipalName eq 'user@domain.com'\" -Top 20 | Select CreatedDateTime, AppDisplayName, IpAddress, Location, Status",
        expectedResult: "You can review recent sign-in events with app, IP, location, and success or failure status.",
        caution: "Log retention in Entra is 30 days for P1/P2 and 7 days for basic tenants. Export evidence promptly during a compromise investigation.",
        relatedGuides: []
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
      },
      {
        id: "ad-stale-computer-check",
        title: "Find stale computer accounts",
        purpose: "Identify computer accounts that have not logged in recently for cleanup or audit purposes.",
        whenToUse: "Use during environment audits, device lifecycle reviews, or before decommissioning old hardware.",
        prerequisites: ["AD PowerShell access"],
        command: "$cutoff = (Get-Date).AddDays(-90); Get-ADComputer -Filter {LastLogonDate -lt $cutoff} -Properties LastLogonDate | Select Name, LastLogonDate, DistinguishedName | Sort LastLogonDate",
        expectedResult: "A list of computer accounts that have not authenticated in the past 90 days.",
        caution: "Do not disable or delete accounts without verifying the device is truly decommissioned. Laptops that are off-network will show as stale without being inactive.",
        relatedGuides: []
      },
      {
        id: "ad-user-last-logon",
        title: "Check user last logon date",
        purpose: "Confirm the last recorded domain logon for a user account during audits, offboarding, or stale-account reviews.",
        whenToUse: "Use when a manager or audit needs to confirm whether a user account has been active recently.",
        prerequisites: ["AD PowerShell access"],
        command: "Get-ADUser jdoe -Properties LastLogonDate | Select Name, SamAccountName, Enabled, LastLogonDate",
        expectedResult: "The user's last recorded logon date and current enabled state are returned.",
        caution: "LastLogonDate is replicated and may be up to 14 days behind in multi-DC environments. Use LastLogon if you need the most current timestamp from a specific DC.",
        relatedGuides: []
      }
    ]
  },
  {
    category: "Intune / Endpoint Management",
    snippets: [
      {
        id: "intune-sync-trigger",
        title: "Trigger Intune policy sync from workstation",
        purpose: "Force an immediate Intune policy and app sync on the local device without waiting for the default check-in interval.",
        whenToUse: "Use after a policy change, app assignment, or compliance update that should apply to the device faster than the normal sync cycle.",
        prerequisites: ["PowerShell access", "Device enrolled in Intune"],
        command: "Get-ScheduledTask | Where-Object { $_.TaskPath -like '*Microsoft*EnterpriseMgmt*' } | Start-ScheduledTask",
        expectedResult: "Intune enrollment tasks run and the device begins syncing updated policy, app, and compliance state.",
        caution: "This triggers the scheduled enrollment task and is safe to run. It does not push changes — it asks Intune to pull the latest policy.",
        relatedGuides: []
      },
      {
        id: "intune-device-join-status",
        title: "Check device join and enrollment status",
        purpose: "Review the device's current Entra join state, MDM enrollment, and primary user context.",
        whenToUse: "Use when a device is not receiving Intune policies, is missing from the portal, or shows compliance failures after enrollment.",
        prerequisites: ["Elevated PowerShell on the target device"],
        command: "dsregcmd /status",
        expectedResult: "You can see AzureAdJoined, DomainJoined, MDMEnrolled, and the associated user and tenant.",
        caution: "A device showing AzureAdJoined:YES and MDMEnrolled:YES is enrolled. If compliance is failing, the issue is usually with the policy assignment rather than the enrollment itself.",
        relatedGuides: []
      },
      {
        id: "intune-compliance-event-log",
        title: "Read Intune compliance event log",
        purpose: "Review local Intune compliance and MDM event logs for enrollment errors, policy failures, or CSP issues.",
        whenToUse: "Use when a device shows as non-compliant in Intune but no clear cause is visible in the portal.",
        prerequisites: ["PowerShell access"],
        command: "Get-WinEvent -LogName 'Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin' -MaxEvents 30 | Select TimeCreated, Id, LevelDisplayName, Message",
        expectedResult: "Recent MDM and enrollment events are returned for review including error codes and policy names.",
        caution: "These logs are verbose. Filter by error level or event ID when reviewing for specific compliance failures.",
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
        command: "Test-NetConnection fileserver.contoso.local -Port 445\nTest-Path \\\\fileserver.contoso.local\\Shared",
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
      },
      {
        id: "pending-reboot-check",
        title: "Pending reboot state check",
        purpose: "Confirm whether the machine has a pending reboot before running installs or policy pushes that can fail silently in a reboot-pending state.",
        whenToUse: "Use before rerunning failed installers, applying patches, or troubleshooting persistent update loops.",
        prerequisites: ["PowerShell access"],
        command: "$rebootKeys = @('HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Component Based Servicing\\RebootPending','HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WindowsUpdate\\Auto Update\\RebootRequired','HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager'); $rebootKeys | ForEach-Object { if (Test-Path $_) { Write-Host \"Pending reboot key found: $_\" } }",
        expectedResult: "Any pending reboot registry keys present on the machine are reported.",
        caution: "If any reboot key is found, restart the device before proceeding with install or update tasks.",
        relatedGuides: []
      },
      {
        id: "windows-credential-manager-clear",
        title: "Clear stale Windows Credential Manager entries",
        purpose: "Remove saved credentials that are causing repeated authentication prompts, wrong-account access, or stale session conflicts.",
        whenToUse: "Use when a user keeps getting prompted for credentials on a share, portal, or app they previously accessed without issues.",
        prerequisites: ["Elevated command prompt or PowerShell"],
        command: "cmdkey /list\ncmdkey /delete:[target]",
        expectedResult: "Stale saved credentials are removed and the user will be prompted for fresh authentication on the next access attempt.",
        caution: "Review the list before deleting. Removing credentials for a service account or a shared resource can affect other users or automated tasks on that machine.",
        relatedGuides: [{ label: "OneDrive", url: "guides/microsoft/onedrive.html" }, { label: "Outlook", url: "guides/microsoft/outlook.html" }]
      },
      {
        id: "gpo-resultant-set-check",
        title: "Group Policy resultant set check",
        purpose: "Review which GPOs are actually applying to the machine and user context to diagnose policy-related behavior.",
        whenToUse: "Use when a user is missing expected software, mapped drives, printer policies, or security configurations that should come from GPO.",
        prerequisites: ["Elevated command prompt or PowerShell", "Domain-joined workstation"],
        command: "gpresult /r\ngpresult /h C:\\Temp\\gpresult.html",
        expectedResult: "The applied GPOs for the machine and user context are listed, including any filter or WMI exclusions.",
        caution: "Run gpupdate /force first if recent policy changes should already be applied. Compare gpresult output against a working peer machine to spot differences.",
        relatedGuides: []
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
      },
      {
        id: "bitlocker-status-check",
        title: "BitLocker encryption status check",
        purpose: "Confirm BitLocker status and recovery key presence on the local drive.",
        whenToUse: "Use during endpoint audits, new-device validation, or before any disk-level maintenance on an endpoint.",
        prerequisites: ["Elevated PowerShell"],
        command: "manage-bde -status C:\nGet-BitLockerVolume -MountPoint C: | Select MountPoint, EncryptionMethod, ProtectionStatus, EncryptionPercentage",
        expectedResult: "You can see the current encryption method, protection status, and completion percentage for the system drive.",
        caution: "If the drive is encrypted but protection is off, the key is suspended — this is expected during Windows updates but should be re-enabled afterward.",
        relatedGuides: []
      },
      {
        id: "local-admin-account-check",
        title: "Local administrator account review",
        purpose: "List local administrator accounts on the workstation to support security audits or onboarding validation.",
        whenToUse: "Use when confirming whether unauthorized local accounts exist, or to validate LAPS deployment during endpoint reviews.",
        prerequisites: ["Elevated PowerShell"],
        command: "Get-LocalGroupMember -Group 'Administrators' | Select Name, PrincipalSource, ObjectClass",
        expectedResult: "A list of all current local administrator group members with their source (local, domain, or cloud).",
        caution: "Do not remove accounts without confirming whether they are required for management tools, LAPS, or approved break-glass access.",
        relatedGuides: []
      },
      {
        id: "open-ports-listening-services",
        title: "Open ports and listening services check",
        purpose: "Review which ports and processes are currently listening on the workstation for security audits or service troubleshooting.",
        whenToUse: "Use when investigating whether a service is running, a port conflict exists, or an unexpected listener is present on an endpoint.",
        prerequisites: ["Elevated PowerShell or command prompt"],
        command: "netstat -ano | findstr LISTENING\nGet-NetTCPConnection -State Listen | Select LocalAddress, LocalPort, OwningProcess | Sort LocalPort",
        expectedResult: "A list of active listening ports and their associated process IDs for review.",
        caution: "Pair process IDs with Get-Process to see which application is behind each listener. Unexpected listeners on non-standard ports should be investigated before dismissal.",
        relatedGuides: []
      }
    ]
  }
];

export const handoffTemplateGroups = [
  {
    category: "Onboarding and Access Requests",
    templates: [
      {
        id: "new-user-onboarding-request",
        title: "New user onboarding request",
        audience: "Customer-facing",
        useCase: "Use when a manager or client contact needs to request a new starter with enough detail for account, workstation, and app setup.",
        placeholders: ["[New Hire Name]", "[Start Date]", "[Department / Role]", "[Manager]", "[Primary Apps]", "[Shipping or Site]"],
        template: `Hi [Name],

Please use the details below to request onboarding for a new user.

New hire: [New Hire Name]
Start date: [Start Date]
Department / role: [Department / Role]
Manager: [Manager]
Work location / shipping site: [Shipping or Site]

Please confirm:
- Required email address format or display name preference
- Required Microsoft 365 access
- Required line-of-business applications
- Whether a new workstation is needed or an existing device will be reassigned
- Any shared mailbox, distribution list, VPN, or admin access needs

If there are licensing or approval constraints, include them in the same reply so we can scope the build correctly the first time.

Thanks,
[Tech Name]`,
        relatedGuides: []
      },
      {
        id: "portal-access-request",
        title: "Portal access request",
        audience: "Customer-facing",
        useCase: "Use when the MSP needs admin access to a client portal, tenant, or vendor console before deeper troubleshooting can continue.",
        placeholders: ["[Portal Name]", "[Requested Role]", "[Reason]", "[Requested User]"],
        template: `Hi [Name],

To continue working this request, we need access to the following portal:

Portal: [Portal Name]
Requested role or permission level: [Requested Role]
Reason needed: [Reason]
Requested admin account: [Requested User]

If you would prefer to grant temporary access instead of standing access, that works as well. Once access is granted, please reply here so we can validate sign-in and continue troubleshooting.

Thanks,
[Tech Name]`,
        relatedGuides: []
      },
      {
        id: "software-install-approval-request",
        title: "Software install approval request",
        audience: "Customer-facing",
        useCase: "Use when a requested install needs manager, licensing, or client-admin approval before the MSP proceeds.",
        placeholders: ["[Software Name]", "[Version]", "[Device or User]", "[Business Need]", "[Licensing Impact]"],
        template: `Hi [Name],

We received a request to install the following software:

Software: [Software Name]
Version requested: [Version]
Target device or user: [Device or User]
Business reason: [Business Need]
Licensing or subscription impact: [Licensing Impact]

Before we proceed, please confirm approval for the install. If there is a preferred version, deployment package, or vendor standard we should follow, include that in your reply so we can avoid a rebuild or version mismatch later.

Thanks,
[Tech Name]`,
        relatedGuides: [
          { label: "AutoCAD", url: "guides/autodesk/autocad.html" },
          { label: "Bluebeam Revu 21", url: "guides/bluebeam/revu-21.html" }
        ]
      }
    ]
  },
  {
    category: "Offboarding and Access Changes",
    templates: [
      {
        id: "termination-offboarding-confirmation",
        title: "Termination and offboarding confirmation",
        audience: "Customer-facing",
        useCase: "Use when confirming the approval and timing for a user offboarding or immediate access removal request.",
        placeholders: ["[User Name]", "[Effective Time]", "[Mailbox Handling]", "[Device Return Plan]", "[Manager]"],
        template: `Hi [Name],

We are preparing to complete offboarding for [User Name].

Please confirm the following before we proceed:
- Effective disable time: [Effective Time]
- Mailbox handling or forwarding expectation: [Mailbox Handling]
- Device return or recovery plan: [Device Return Plan]
- Approval owner / manager: [Manager]

Once confirmed, we will complete the access-removal steps in scope and document any remaining follow-up items such as device recovery, mailbox delegation, or license cleanup.

Thanks,
[Tech Name]`,
        relatedGuides: [
          { label: "Outlook", url: "guides/microsoft/outlook.html" }
        ]
      },
      {
        id: "shared-mailbox-access-confirmation",
        title: "Shared mailbox access confirmation",
        audience: "Customer-facing",
        useCase: "Use when you need a manager or client admin to confirm who should keep or receive access to a shared mailbox.",
        placeholders: ["[Shared Mailbox]", "[Users to Add]", "[Users to Remove]", "[Send As Needed]"],
        template: `Hi [Name],

Before we change access to the shared mailbox below, please confirm the approved membership:

Shared mailbox: [Shared Mailbox]
Users to add: [Users to Add]
Users to remove: [Users to Remove]
Send As required: [Send As Needed]

Once confirmed, we will update the mailbox access and note the change in the ticket so the final membership is documented.

Thanks,
[Tech Name]`,
        relatedGuides: [
          { label: "Outlook", url: "guides/microsoft/outlook.html" }
        ]
      }
    ]
  },
  {
    category: "Workstation Changes and Maintenance",
    templates: [
      {
        id: "workstation-replacement-scheduling",
        title: "Workstation replacement scheduling",
        audience: "Customer-facing",
        useCase: "Use when coordinating a device swap, rebuild, or replacement with an end user or manager.",
        placeholders: ["[User Name]", "[Preferred Date]", "[Office or Shipping Location]", "[Apps to Validate]"],
        template: `Hi [Name],

We are ready to schedule the workstation replacement for [User Name].

Please reply with:
- Preferred date or time window: [Preferred Date]
- Office or shipping location: [Office or Shipping Location]
- Any role-critical applications or files we should validate during handoff: [Apps to Validate]

During the replacement we will verify sign-in, email, Microsoft apps, printing, and the approved role-specific software in scope for this user.

Thanks,
[Tech Name]`,
        relatedGuides: [
          { label: "OneDrive", url: "guides/microsoft/onedrive.html" },
          { label: "AutoCAD", url: "guides/autodesk/autocad.html" }
        ]
      },
      {
        id: "maintenance-restart-notice",
        title: "Maintenance or restart notice",
        audience: "Customer-facing",
        useCase: "Use when a reboot, repair, or after-hours maintenance action needs a clear heads-up before it happens.",
        placeholders: ["[System or User]", "[Maintenance Window]", "[Expected Impact]", "[Action Needed]"],
        template: `Hi [Name],

We are planning maintenance for [System or User] during the following window:

Maintenance window: [Maintenance Window]
Expected impact: [Expected Impact]
Action needed from the user: [Action Needed]

If the timing conflicts with a business-critical workflow, let us know before the window begins. Otherwise we will proceed as scheduled and update the ticket once the maintenance is complete.

Thanks,
[Tech Name]`,
        relatedGuides: []
      }
    ]
  },
  {
    category: "User Communication and Closure",
    templates: [
      {
        id: "mfa-reset-explanation",
        title: "MFA reset explanation",
        audience: "Customer-facing",
        useCase: "Use after identity verification when explaining what an MFA reset means and what the user should expect next.",
        placeholders: ["[User Name]", "[Recovery Method]", "[Apps to Retest]"],
        template: `Hi [User Name],

We reset your MFA registration so you can complete a clean sign-in and set up your authentication methods again.

What happens next:
- Sign in with your work account
- Complete MFA setup using [Recovery Method]
- Retest the apps that were failing: [Apps to Retest]

If you see prompts for an old phone number, wrong account, or a method you no longer have, stop there and reply to this ticket so we can adjust the recovery path instead of stacking more failed attempts.

Thanks,
[Tech Name]`,
        relatedGuides: [
          { label: "Outlook", url: "guides/microsoft/outlook.html" },
          { label: "Teams", url: "guides/microsoft/teams.html" }
        ]
      },
      {
        id: "ticket-closure-validation-request",
        title: "Ticket closure with validation request",
        audience: "Customer-facing",
        useCase: "Use when the issue appears resolved but you want one last user confirmation before final closure.",
        placeholders: ["[Issue Summary]", "[What Was Changed]", "[What To Test]"],
        template: `Hi [Name],

The issue appears resolved from our side.

Issue summary: [Issue Summary]
What was changed: [What Was Changed]
Please test: [What To Test]

If everything is working as expected, reply here and we will close the ticket. If the issue is still present, include the exact error, what application or file you were using, and whether the behavior changed at all after the update.

Thanks,
[Tech Name]`,
        relatedGuides: []
      },
      {
        id: "outage-acknowledgement-update-resolution",
        title: "Outage acknowledgement, update, and resolution chain",
        audience: "Customer-facing",
        useCase: "Use as a copy-ready framework for incident acknowledgement, progress updates, and final resolution notes.",
        placeholders: ["[Service]", "[Impact]", "[Scope]", "[Current Status]", "[Resolution Summary]"],
        template: `Acknowledgement
Hi [Name],

We are aware of an issue affecting [Service].
Current impact: [Impact]
Current scope: [Scope]

We are actively investigating and will send another update as soon as we have confirmed cause, workaround, or next steps.

Update
Hi [Name],

We are still working the issue affecting [Service].
Current status: [Current Status]
Next update target: [Time]

Resolution
Hi [Name],

The issue affecting [Service] is now resolved or stabilized.
Resolution summary: [Resolution Summary]

If anyone is still impacted, please reply with the exact behavior, time observed, and whether it affects one user or multiple users.`,
        relatedGuides: []
      }
    ]
  },
  {
    category: "Internal Handoffs and Escalations",
    templates: [
      {
        id: "tier1-tier2-escalation",
        title: "Tier 1 to Tier 2 escalation handoff",
        audience: "Internal-only",
        useCase: "Use when the ticket is leaving first-touch support and needs a clean, evidence-based handoff instead of a vague summary.",
        placeholders: ["[User / Site]", "[Business Impact]", "[What Failed]", "[What Was Tested]", "[Evidence Collected]", "[Suggested Next Step]"],
        template: `Escalating from Tier 1 to Tier 2

User / site: [User / Site]
Business impact: [Business Impact]
What failed: [What Failed]

What was tested:
- [What Was Tested]

Evidence collected:
- [Error text / screenshots]
- [Version / build]
- [Relevant logs, paths, or timestamps]

What changed before failure:
- [Recent password change / workstation swap / update / permission change]

Suggested next step:
- [Suggested Next Step]

Customer expectation already set:
- [Yes / No and what was communicated]`,
        relatedGuides: [
          { label: "ProjectWise", url: "guides/bentley/projectwise.html" },
          { label: "SharePoint", url: "guides/microsoft/sharepoint.html" }
        ]
      },
      {
        id: "after-hours-handoff-template",
        title: "After-hours handoff template",
        audience: "Internal-only",
        useCase: "Use when work needs to pass between shifts without losing the current state, risk, or customer expectation.",
        placeholders: ["[Issue]", "[Current State]", "[Business Risk]", "[Next Safe Action]", "[Customer Status]"],
        template: `After-hours handoff

Issue: [Issue]
Current state: [Current State]
Business risk: [Business Risk]

Completed so far:
- [Action 1]
- [Action 2]

Do not repeat:
- [Already tried / avoid repeating]

Next safe action:
- [Next Safe Action]

Customer status:
- [Customer Status]

Waiting on:
- [Approval / vendor / client contact / user validation]`,
        relatedGuides: [
          { label: "ProjectWise", url: "guides/bentley/projectwise.html" }
        ]
      },
      {
        id: "network-investigation-handoff",
        title: "Network issue investigation handoff",
        audience: "Internal-only",
        useCase: "Use when the issue looks network-related and needs to move to the next engineer with route, DNS, and reachability facts already collected.",
        placeholders: ["[Source Device]", "[Destination]", "[By Name Result]", "[By IP Result]", "[VPN State]", "[Port Test Result]"],
        template: `Network investigation handoff

Source device: [Source Device]
Destination or service: [Destination]
Result by name: [By Name Result]
Result by IP: [By IP Result]
VPN state: [VPN State]
Port or reachability test result: [Port Test Result]

Collected:
- ipconfig /all
- DNS test results
- Route or gateway observations
- Whether the issue is isolated or shared

Question for next touch:
- Is this DNS, route, firewall, tunnel, or service-specific?`,
        relatedGuides: []
      }
    ]
  },
  {
    category: "Vendor and Incident Coordination",
    templates: [
      {
        id: "vendor-escalation-request",
        title: "Vendor escalation request",
        audience: "Internal-only",
        useCase: "Use when the MSP is escalating to Autodesk, Bentley, Adobe, Intuit, Microsoft, or another vendor after standard checks are complete.",
        placeholders: ["[Vendor]", "[Product]", "[Version]", "[Environment]", "[Failure]", "[What Was Tested]", "[Artifacts Attached]"],
        template: `Vendor escalation request

Vendor: [Vendor]
Product: [Product]
Version / build: [Version]
Environment: [Environment]

Failure summary:
- [Failure]

What we already tested:
- [What Was Tested]

Artifacts attached:
- [Screenshots]
- [Logs]
- [Licensing or entitlement proof]
- [User impact statement]

Reason for vendor review:
- Behavior persists after normal MSP-side checks and appears to require vendor-supported guidance or defect confirmation.`,
        relatedGuides: [
          { label: "AutoCAD", url: "guides/autodesk/autocad.html" },
          { label: "ProjectWise", url: "guides/bentley/projectwise.html" }
        ]
      },
      {
        id: "post-incident-notes-template",
        title: "Post-incident notes template",
        audience: "Internal-only",
        useCase: "Use when documenting the final record after an outage, compromise review, or other significant support event.",
        placeholders: ["[Incident]", "[Timeline]", "[Root Cause or Current Theory]", "[Containment]", "[Follow-Up Actions]"],
        template: `Post-incident notes

Incident: [Incident]
Timeline:
- [Timeline]

Root cause or current theory:
- [Root Cause or Current Theory]

Containment or recovery actions:
- [Containment]

Customer communication summary:
- [What was sent and when]

Follow-up actions:
- [Follow-Up Actions]

Documentation gaps noted:
- [Missing runbook / access / contact / logging gap]`,
        relatedGuides: []
      },
      {
        id: "monitoring-alert-triage-template",
        title: "Monitoring alert triage template",
        audience: "Internal-only",
        useCase: "Use for the first structured note when a monitoring alert comes in and needs quick triage without losing the initial facts.",
        placeholders: ["[Alert Name]", "[Affected Device or Service]", "[Severity]", "[What Is Confirmed]", "[Immediate Action]"],
        template: `Monitoring alert triage

Alert name: [Alert Name]
Affected device or service: [Affected Device or Service]
Severity: [Severity]

What is confirmed:
- [What Is Confirmed]

Immediate action taken:
- [Immediate Action]

Still unknown:
- [Unknown 1]
- [Unknown 2]

Escalate if:
- User impact is active
- Security exposure is suspected
- The alert is repeated without a clear benign cause`,
        relatedGuides: []
      }
    ]
  }
];

export const handoffTemplates = handoffTemplateGroups.flatMap(group =>
  group.templates.map(template => ({
    ...template,
    category: group.category
  }))
);
