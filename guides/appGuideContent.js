export const appGuideContent = {
  microsoft: {
    outlook: {
      highlights: [
        "Fastest likely fix: prove OWA works, confirm the right Office identity is signed in, then repair or recreate the local profile only if the tenant side is healthy.",
        "Shared mailbox issues are usually permission refresh, Autodiscover, or stale profile state rather than a full Office reinstall problem."
      ],
      askFirst: [
        "Does the mailbox work in OWA with the same user account?",
        "Is this classic Outlook or new Outlook, and did the issue start after MFA, password, device, or profile changes?",
        "Are shared mailboxes, delegated calendars, PSTs, or the Teams add-in part of the user's workflow?",
        "Is the issue startup, credential prompts, search, shared mailbox visibility, or send/receive behavior?"
      ],
      licensing: [
        "Check Exchange mailbox status and whether the user still has desktop Office rights if the client uses Microsoft 365 Apps.",
        "If delegated mailbox access broke, verify Full Access, Send As, and auto-mapping before touching the local profile."
      ],
      install: [
        "Match the client-standard Office channel and bitness. Mixed Office builds or incomplete removals create endless Outlook drift.",
        "After setup, test OWA, desktop launch, one shared mailbox if applicable, and Teams meeting add-in visibility."
      ],
      uninstall: [
        "Preserve signatures, autocomplete expectations, PST ownership, and shared mailbox notes before rebuilding or replacing the machine.",
        "Remove mail profiles only after confirming nothing local still needs export or handoff."
      ],
      supportCheckpoints: [
        "Compare OWA versus desktop. If OWA is good, stay local; if OWA is bad too, move into mailbox, license, or service-health checks.",
        "Review add-ins, OST size, cached mode, and whether the user recently switched from classic to new Outlook.",
        "Check Teams add-in, Adobe PDF, CRM, or antivirus mail plug-ins before deeper rebuild work."
      ],
      commonIssues: [
        {
          title: "Credential prompts or sign-in loops",
          symptom: "User keeps seeing account or password prompts even though the credentials are correct.",
          likelyFix: "Verify OWA, remove wrong Office identities, review MFA or Conditional Access changes, then clear only the stale local token or profile state.",
          collect: "Capture the UPN in use, screenshot of the prompt, OWA result, and whether other Office apps are healthy.",
          escalateWhen: "Escalate when multiple users are affected or when service health, hybrid auth, or Conditional Access changes line up."
        },
        {
          title: "Stuck on loading profile or crashing at launch",
          symptom: "Outlook hangs before the mailbox opens or crashes soon after startup.",
          likelyFix: "Test safe mode, compare with a clean profile, and disable suspect add-ins before running a full Office repair.",
          collect: "Capture safe-mode result, add-in list, Outlook version, and when the crash started.",
          escalateWhen: "Escalate after safe mode, Office repair, and clean-profile testing still fail on a known-good mailbox."
        },
        {
          title: "Shared mailbox missing or not updating",
          symptom: "Primary mailbox opens, but shared mailboxes, calendars, or delegated send rights are wrong or absent.",
          likelyFix: "Verify Exchange permissions and auto-mapping first, then restart Outlook and recreate the profile only if permissions are already correct.",
          collect: "Collect the shared mailbox name, permission type expected, and whether OWA reflects the same problem.",
          escalateWhen: "Escalate when Exchange permissions are correct but desktop Outlook never honors them."
        }
      ],
      usefulInfo: {
        paths: [
          "%localappdata%\\Microsoft\\Outlook",
          "%appdata%\\Microsoft\\Signatures",
          "Control Panel > Mail > Show Profiles"
        ],
        logs: [
          "Event Viewer > Windows Logs > Application for Outlook or Office crashes",
          "Microsoft Support and Recovery Assistant output if used",
          "Screenshots of Test E-mail AutoConfiguration or connection state"
        ],
        services: ["ClickToRunSvc", "Windows Search"],
        processes: ["outlook.exe"]
      },
      escalationNotes: [
        "Collect mailbox UPN, OWA result, Outlook version, add-ins in scope, and whether the same symptom follows the user to another machine.",
        "Avoid deleting OST or profiles blindly if the user has large shared mailboxes, PST dependencies, or unstable connectivity."
      ],
      relatedSnippets: ["m365-force-sign-out", "exchange-mailbox-type-check", "exchange-mailbox-permission-check", "office-repair-guidance", "event-log-quick-collection"],
      relatedTemplates: ["mfa-reset-explanation", "tier1-tier2-escalation", "ticket-closure-validation-request"]
    },
    teams: {
      highlights: [
        "Fastest likely fix: compare web Teams to desktop, confirm the user is in the right tenant and licensed, then refresh the local client before reinstalling.",
        "If the complaint is meetings only, stay focused on device routing, docks, privacy settings, and new Teams client health."
      ],
      askFirst: [
        "Does the issue happen in web Teams, desktop Teams, mobile, or all of them?",
        "Is the problem sign-in, missing channels, meetings, calling, file tabs, or device audio?",
        "Did anything change recently: tenant membership, headset, dock, license, update, or workstation?"
      ],
      supportCheckpoints: [
        "Check service health, license state, and tenant context before cache resets.",
        "If meetings are affected, validate selected microphone, speaker, camera, dock firmware, and Windows privacy permissions.",
        "If channels are missing, capture when membership changed and whether web Teams shows the same gap."
      ],
      commonIssues: [
        {
          title: "Desktop Teams fails while web Teams works",
          symptom: "The user can sign in on the web but the desktop client loops, stalls, or never refreshes correctly.",
          likelyFix: "Refresh the local client state, verify WebView2 and Office sign-in health, and confirm the user is not stuck in the wrong tenant context.",
          collect: "Capture web-versus-desktop results, tenant shown, client version, and whether the problem started after an update.",
          escalateWhen: "Escalate when multiple users on the same build are affected or when policy sync never catches up across both clients."
        },
        {
          title: "Meeting audio or video fails",
          symptom: "Calls connect, but devices, camera, or audio routing behave unpredictably.",
          likelyFix: "Validate default devices in Windows and Teams, test without the dock, and compare with another meeting app before reinstalling Teams.",
          collect: "Collect headset or dock model, device screenshots, and whether the problem affects every meeting.",
          escalateWhen: "Escalate after confirming the issue reproduces across meetings with updated drivers and a clean device path."
        }
      ],
      usefulInfo: {
        paths: ["%localappdata%\\Packages\\MSTeams_8wekyb3d8bbwe", "%localappdata%\\Microsoft\\Teams"],
        logs: ["Settings > About > Version screenshot", "Web-versus-desktop comparison notes"],
        processes: ["ms-teams.exe", "teams.exe"]
      },
      escalationNotes: [
        "Collect tenant context, license details, version, web result, and exact workload affected before escalation.",
        "Escalate immediately when many users lose the same channels, voice workflows, or meeting features at once."
      ],
      relatedSnippets: ["m365-force-sign-out", "license-assignment-quick-check", "office-repair-guidance", "event-log-quick-collection"],
      relatedTemplates: ["mfa-reset-explanation", "tier1-tier2-escalation", "ticket-closure-validation-request"]
    },
    onedrive: {
      highlights: [
        "Fastest likely fix: confirm the files are correct in the browser, pause and resume sync, then reset or relink only after tenant, access, and naming issues are ruled out.",
        "Low disk space and too many pinned offline folders cause more sync incidents than most teams expect."
      ],
      askFirst: [
        "Can the user see the correct files in the browser?",
        "Is the problem personal OneDrive, a SharePoint library, or both?",
        "Did the issue start after a rename, path move, tenant change, laptop swap, or OneDrive reset?",
        "Are only a few files failing, or is the whole sync engine unhealthy?"
      ],
      supportCheckpoints: [
        "Verify browser truth first: expected files, correct tenant, and correct library visibility.",
        "Check path length, invalid characters, duplicate sync roots, and file locks before resetting the client.",
        "Measure free disk space and offline-pinned content if the machine is slow or constantly reprocessing."
      ],
      commonIssues: [
        {
          title: "Sync is stuck or processing forever",
          symptom: "The client spins endlessly or never catches up with expected changes.",
          likelyFix: "Compare browser truth to the local root, clear naming conflicts, check space pressure, then pause or resume or reset in a controlled way.",
          collect: "Capture sync status, free disk space, number of offline files, and whether SharePoint libraries are also involved.",
          escalateWhen: "Escalate when multiple devices on the same tenant show the same delay or service health points to a backend event."
        },
        {
          title: "A library or folder will not sync",
          symptom: "OneDrive works generally, but a library or specific folder refuses to sync or opens in the wrong place.",
          likelyFix: "Validate browser permissions, library URL, and whether an old local root already owns that name before unlinking the account.",
          collect: "Collect the library URL, browser access result, error text, and current local sync root names.",
          escalateWhen: "Escalate when permissions are correct but multiple users cannot sync the same library."
        }
      ],
      usefulInfo: {
        paths: [
          "%localappdata%\\Microsoft\\OneDrive",
          "%userprofile%\\OneDrive - [Tenant Name]",
          "%localappdata%\\Microsoft\\OneDrive\\logs"
        ],
        logs: ["Tray sync-health screenshots", "OneDrive diagnostics if collected"],
        processes: ["OneDrive.exe"]
      },
      escalationNotes: [
        "Collect whether browser access is healthy, affected library URLs, OneDrive version, and screenshots of the sync state.",
        "Do not wipe sync roots before confirming pending uploads are complete and the browser copy is authoritative."
      ],
      relatedSnippets: ["onedrive-reset-guidance", "m365-force-sign-out", "dns-resolution-check", "event-log-quick-collection"],
      relatedTemplates: ["ticket-closure-validation-request", "tier1-tier2-escalation"]
    },
    sharepoint: {
      highlights: [
        "Fastest likely fix: prove the user can reach the exact site and library in the browser, then test open-in-app from Edge with the same signed-in Office identity.",
        "IRM and sensitivity policy can break open-in-app or sync in ways that look like local Office corruption."
      ],
      askFirst: [
        "Can the user access the exact site and library in the browser with the expected account?",
        "Is the issue permission-related, sync-related, open-in-app, coauthoring, or only certain protected files?",
        "Is this a normal site, a Teams-backed library, or a protected or IRM-controlled library?"
      ],
      supportCheckpoints: [
        "Validate site URL, library URL, browser access, and tenant context before touching local settings.",
        "If open-in-app fails, compare Edge versus another browser, confirm Office sign-in, and note whether IRM or sensitivity labels apply.",
        "If sync is involved, move into OneDrive-specific checks after permissions and browser access are proven healthy."
      ],
      commonIssues: [
        {
          title: "Open in app does nothing or opens the wrong Office context",
          symptom: "Clicking Open in App fails silently, opens the wrong tenant, or launches Office without the expected file.",
          likelyFix: "Verify browser access, supported browser behavior, Office sign-in identity, and default file associations before resetting Office or OneDrive.",
          collect: "Capture the site URL, browser used, Office account shown, and whether the same file opens from another browser or workstation.",
          escalateWhen: "Escalate when policy, tenant trust, or IRM settings appear to block only desktop-open behavior."
        },
        {
          title: "IRM or protected library blocks expected behavior",
          symptom: "Users can see files but cannot sync, print, download, or open protected content in the expected path.",
          likelyFix: "Review IRM, label, and DLP settings with the site owner or admin before treating this as a damaged workstation.",
          collect: "Collect the site name, label or IRM context, exact blocked action, and screenshots of the browser message.",
          escalateWhen: "Escalate when policy settings changed recently or when a business exception is needed."
        }
      ],
      usefulInfo: {
        paths: ["Exact site URL and library URL", "%localappdata%\\Microsoft\\Office\\16.0\\OfficeFileCache"],
        logs: ["Screenshots of open-in-app prompts, IRM messages, or blocked actions"],
        processes: ["msedge.exe", "winword.exe", "excel.exe", "powerpnt.exe", "OneDrive.exe"]
      },
      escalationNotes: [
        "Collect site URL, library URL, file type, browser used, Office identity, and whether the issue reproduces in another browser or clean workstation.",
        "Avoid clearing sync or Office cache before you prove the user has the correct permissions and the browser path is healthy."
      ],
      relatedSnippets: ["onedrive-reset-guidance", "m365-force-sign-out", "office-repair-guidance", "dns-resolution-check"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request"]
    }
  },
  autodesk: {
    autocad: {
      highlights: [
        "Fastest likely fix: compare the workstation's release year, profile import, support paths, and shared standards folders against a known-good peer before touching the installer.",
        "Missing CTB or STB files, fonts, or plotters often look like app corruption when they are really missing shared resources."
      ],
      askFirst: [
        "What exact AutoCAD year and flavor does the user need?",
        "Is the user blocked on launch, sign-in, plotting, templates, fonts, xrefs, or a missing add-in?",
        "Are network templates, CTB or STB files, or tool palettes stored on shared drives or VPN paths?",
        "Can another working user on the same client open and plot the same drawing correctly?"
      ],
      supportCheckpoints: [
        "Validate product year, build, and Autodesk sign-in state from About or account screens.",
        "Compare support paths, fonts, CTB or STB folders, tool palettes, and xref paths against a known-good user.",
        "Check whether printers, plotters, and PDF handlers match the client standard if plotting is the pain point."
      ],
      usefulInfo: {
        paths: ["%appdata%\\Autodesk\\AutoCAD [version]", "%programdata%\\Autodesk", "Options > Files support path list"],
        logs: ["About screen with version and update level", "Options > Files screenshots", "Autodesk sign-in screenshots"],
        processes: ["acad.exe", "AdskAccessCore.exe"]
      },
      escalationNotes: [
        "Collect product year, Autodesk email, exact missing function, and support-path screenshots before escalation.",
        "Avoid uninstalling until you compare profiles and content paths with a known-good workstation."
      ],
      relatedSnippets: ["sfc-dism-repair-sequence", "msi-uninstall-lookup", "event-log-quick-collection"],
      relatedTemplates: ["software-install-approval-request", "tier1-tier2-escalation", "vendor-escalation-request"]
    },
    "civil-3d": {
      highlights: [
        "Fastest likely fix: compare the full standards payload, country kit, and data-shortcut configuration to a known-good engineer before reinstalling.",
        "Broken references usually point to mapped paths, permissions, or shortcut configuration rather than corrupted drawings."
      ],
      askFirst: [
        "What exact Civil 3D year and update level does the project team use?",
        "Is the failure launch, missing styles, broken data shortcuts, reference objects, or a file-specific crash?",
        "Are project templates, country kits, or object enablers stored on a shared path or bundled with deployment?"
      ],
      supportCheckpoints: [
        "Check the release year, country kit, object enablers, and content packs against the team standard.",
        "Confirm data-shortcut paths, project folders, mapped drives, and permissions resolve from the workstation.",
        "If styles or labels are missing, compare the template and standards payload before touching the installer."
      ],
      usefulInfo: {
        paths: ["%appdata%\\Autodesk\\C3D [version]", "Shared project folders for data shortcuts", "Client-standard template and style libraries"],
        logs: ["Autodesk version screenshots", "Data Shortcut manager screenshots", "Failing project path notes"],
        processes: ["acad.exe"]
      },
      escalationNotes: [
        "Collect Civil 3D year, project path, country kit, object enabler list, and one known-good workstation comparison before escalating.",
        "Do not strip and rebuild the app until data-shortcut and standards path differences are ruled out."
      ],
      relatedSnippets: ["smb-path-reachability-test", "vpn-drive-remap-checklist", "event-log-quick-collection"],
      relatedTemplates: ["software-install-approval-request", "tier1-tier2-escalation", "vendor-escalation-request"]
    },
    revit: {
      highlights: [
        "Fastest likely fix: confirm the exact project-approved Revit year and point release, then compare add-ins, families, and collaboration cache paths with a known-good teammate.",
        "Many 'broken Revit' tickets are really missing add-ins or a workstation that opened the wrong project year."
      ],
      askFirst: [
        "What Revit year and update level does the active project require?",
        "Is the issue launch, add-ins, cloud model access, family libraries, or a specific project file?",
        "Are Autodesk Docs, BIM 360, or local central files in scope?"
      ],
      supportCheckpoints: [
        "Check release year and point release first. Version mismatch is a fast way to waste hours.",
        "Compare add-ins, family library paths, templates, and cloud collaboration state against a working peer.",
        "Capture whether the issue is isolated to one project, one model, one add-in, or all Revit usage on the workstation."
      ],
      usefulInfo: {
        paths: ["%appdata%\\Autodesk\\Revit", "%programdata%\\Autodesk\\Revit\\Addins", "%appdata%\\Autodesk\\Revit\\Addins"],
        logs: ["Revit journal files", "About screen with version and point release", "Add-ins folder listing"],
        processes: ["Revit.exe", "AutodeskDesktopApp.exe"]
      },
      escalationNotes: [
        "Collect exact Revit year, point release, project name, add-ins in scope, and whether another teammate can open the same model.",
        "Do not reinstall until you verify the build actually matches the team's add-ins and content libraries."
      ],
      relatedSnippets: ["sfc-dism-repair-sequence", "event-log-quick-collection"],
      relatedTemplates: ["software-install-approval-request", "tier1-tier2-escalation", "vendor-escalation-request"]
    },
    "autodesk-desktop-app": {
      highlights: [
        "Fastest likely fix: verify Autodesk sign-in, compare installed updater version, and clear stale updater state before reinstalling every downstream Autodesk product.",
        "If multiple Autodesk products suddenly stop seeing updates or entitlements, inspect this component first."
      ],
      askFirst: [
        "Is the user's problem actually update visibility, entitlement refresh, or product install availability?",
        "Did the problem begin after a Windows update, Autodesk patch, or permission change?",
        "Is Autodesk Access or the older Autodesk Desktop App the client standard today?"
      ],
      supportCheckpoints: [
        "Confirm whether the client uses Desktop App or Access as the supported updater path.",
        "Verify Autodesk sign-in and whether update catalogs or product entitlements load normally.",
        "Compare the updater version and startup behavior to a working Autodesk workstation."
      ],
      usefulInfo: {
        paths: ["%programfiles(x86)%\\Autodesk\\Autodesk Desktop App", "%localappdata%\\Autodesk"],
        logs: ["Updater version screenshot", "Autodesk sign-in screenshot"],
        processes: ["AutodeskDesktopApp.exe", "AdskAccessCore.exe"]
      },
      escalationNotes: [
        "Collect whether the client standard is Autodesk Desktop App or Autodesk Access, the version in use, and the exact downstream Autodesk symptoms.",
        "Escalate when the updater problem appears tenant-wide or after a coordinated Autodesk release."
      ],
      relatedSnippets: ["msi-uninstall-lookup", "event-log-quick-collection"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request"]
    }
  },
  bentley: {
    microstation: {
      highlights: [
        "Fastest likely fix: compare workspace, standards, and reference path resolution against a known-good engineer before reinstalling MicroStation.",
        "Many launch or content complaints are really workspace path or CONNECT identity issues."
      ],
      askFirst: [
        "What exact MicroStation release and discipline workspace does the user need?",
        "Is the issue launch, sign-in, workspace load, references, plotting, or file associations?",
        "Are the standards or workspace paths local, mapped, VPN-based, or ProjectWise-backed?"
      ],
      supportCheckpoints: [
        "Confirm CONNECT sign-in and entitlement state if the product prompts unexpectedly.",
        "Compare workspace, standards, and configuration variables with a known-good workstation.",
        "Capture whether the issue follows one design file, one workspace, or all MicroStation usage."
      ],
      usefulInfo: {
        paths: ["Workspace and standards share paths", "%localappdata%\\Bentley", "%programdata%\\Bentley"],
        logs: ["CONNECT sign-in screenshots", "Workspace configuration notes"],
        processes: ["microstation.exe", "Bentley.lictransmit.exe"]
      },
      escalationNotes: [
        "Collect MicroStation version, workspace path, CONNECT identity, and one known-good workstation comparison before escalating.",
        "Do not rebuild until workspace and standards drift are ruled out."
      ],
      relatedSnippets: ["smb-path-reachability-test", "dns-resolution-check", "event-log-quick-collection"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request"]
    },
    projectwise: {
      highlights: [
        "Fastest likely fix: confirm datasource access, Bentley sign-in, and work area paths before clearing caches or reinstalling the client.",
        "Checked-out files and local work areas are the biggest accidental data-loss risk during ProjectWise repair."
      ],
      askFirst: [
        "Which datasource and project tree should the user see?",
        "Can the user sign in and reach the datasource, or is the failure after sign-in during check-in or check-out?",
        "Are there checked-out files, local work areas, or cached deliverables on this workstation?"
      ],
      supportCheckpoints: [
        "Validate datasource access, Bentley sign-in, and any integration modules the user's discipline relies on.",
        "Confirm local cache and work area paths follow the client standard and that the user can open, check out, and check in a real test file.",
        "Document any checked-out content before offboarding, repair, or workstation replacement."
      ],
      usefulInfo: {
        paths: ["Local ProjectWise work area", "%localappdata%\\Bentley\\ProjectWise", "Datasource configuration paths"],
        logs: ["Datasource error screenshots", "Checked-out file list", "CONNECT sign-in screenshots"],
        processes: ["pwexplorer.exe"]
      },
      escalationNotes: [
        "Collect datasource name, CONNECT email, local work area path, and whether check-in or check-out still works before escalating.",
        "Do not clear ProjectWise caches or work areas until checked-out ownership is confirmed."
      ],
      relatedSnippets: ["smb-path-reachability-test", "vpn-drive-remap-checklist", "event-log-quick-collection"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request", "after-hours-handoff-template"]
    },
    "connection-client": {
      highlights: [
        "Fastest likely fix: verify CONNECTION Client version, sign-in, and prerequisites before troubleshooting downstream Bentley product access.",
        "If multiple Bentley apps start prompting or drop entitlement together, treat CONNECTION Client as the first checkpoint."
      ],
      askFirst: [
        "Can the user sign in to CONNECTION Client with the expected Bentley identity?",
        "Did the issue begin after a password change, Windows update, or Bentley client patch?",
        "Are multiple Bentley products on the same machine failing together?"
      ],
      supportCheckpoints: [
        "Confirm current CONNECTION Client version and that the workstation clock is correct.",
        "Test sign-in, token refresh, and whether the client can reach Bentley services.",
        "Compare the behavior to a working Bentley workstation on the same network path."
      ],
      usefulInfo: {
        paths: ["%localappdata%\\Bentley", "%programfiles%\\Bentley\\CONNECT Edition"],
        logs: ["CONNECT sign-in screenshots", "Version screenshot"],
        processes: ["Bentley.Licensing.Service.exe", "Bentley.CONNECTION.Client.exe"]
      },
      escalationNotes: [
        "Collect version, sign-in result, Bentley email, clock state, and which downstream apps are affected.",
        "Escalate when a widespread Bentley sign-in or entitlement event is suspected."
      ],
      relatedSnippets: ["dns-resolution-check", "port-connectivity-test", "event-log-quick-collection"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request"]
    }
  },
  esri: {
    "arcgis-pro": {
      highlights: [
        "Fastest likely fix: verify the licensing portal, user type, extension assignments, and active portal before rebuilding ArcGIS Pro.",
        "Missing projects or layers are usually portal, group, or extension scope problems rather than raw install failure."
      ],
      askFirst: [
        "What ArcGIS Pro version, license level, and extensions does the user need?",
        "Can the user sign in to the correct ArcGIS organization in the browser?",
        "Is the issue licensing, missing content, offline use, or one specific project?"
      ],
      supportCheckpoints: [
        "Verify the ArcGIS Pro license level, portal URL, and extension assignments before opening the desktop client.",
        "Test sign-in to the intended licensing portal and confirm the user can reach expected layers, projects, and shared content.",
        "Document any offline licensing, custom toolboxes, or project-folder mappings used by the team."
      ],
      usefulInfo: {
        paths: ["%appdata%\\Esri\\ArcGISPro", "%localappdata%\\ESRI\\ArcGISPro"],
        logs: ["Portal screenshot", "Extension assignment screenshot", "Offline license notes if used"],
        processes: ["ArcGISPro.exe"]
      },
      escalationNotes: [
        "Collect portal URL, licensing portal, extension list, version, and whether another user can open the same content.",
        "Escalate when multiple users lose the same layers or license tier at once."
      ],
      relatedSnippets: ["license-assignment-quick-check", "dns-resolution-check", "event-log-quick-collection"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request"]
    }
  },
  ptc: {
    "mathcad-prime": {
      highlights: [
        "Fastest likely fix: confirm the exact Prime version and configured license source before reinstalling.",
        "Mathcad failures are frequently license-path or environment-setting issues, not broken installers."
      ],
      askFirst: [
        "Does the client use named-user, floating, or file-based Mathcad licensing?",
        "Is the failure launch, license checkout, worksheet open, or missing shared templates?",
        "Did the problem begin after a network change, workstation swap, or license-server change?"
      ],
      supportCheckpoints: [
        "Verify the exact Prime version and license-source path expected by the client before handoff.",
        "Test worksheet open and save and any template library or integration path the engineers use most.",
        "Capture environment variables, license-server references, and template locations in the ticket."
      ],
      usefulInfo: {
        paths: ["Mathcad Prime config location", "Shared worksheet and template paths"],
        logs: ["License error screenshot", "License-server or config path notes"],
        processes: ["MathcadPrime.exe"]
      },
      escalationNotes: [
        "Collect Prime version, license model, license source, and exact error text before escalation.",
        "Escalate after server reachability and local config have both been verified."
      ],
      relatedSnippets: ["port-connectivity-test", "dns-resolution-check", "event-log-quick-collection"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request"]
    }
  },
  adobe: {
    "acrobat-pro": {
      highlights: [
        "Fastest likely fix: verify Admin Console assignment and enterprise identity selection before treating Acrobat like a local-only PDF app problem.",
        "Browser helpers, Office integrations, and default PDF handling are part of the deliverable, not afterthoughts."
      ],
      askFirst: [
        "Is the problem activation, editing tools missing, browser integration, signing, or default PDF handling?",
        "Is the user choosing the enterprise profile or a personal Adobe ID at sign-in?",
        "Does the workflow depend on Outlook, Office, or browser PDF integrations?"
      ],
      supportCheckpoints: [
        "Verify Admin Console assignment, managed-identity sign-in, and whether the role needs browser or Office integrations enabled.",
        "Test PDF opening, editing, signing, and the default-app workflow expected on that workstation.",
        "Document whether the user relies on templates, signatures, stamps, or plug-ins that need to survive rebuilds."
      ],
      usefulInfo: {
        paths: ["%appdata%\\Adobe\\Acrobat", "%localappdata%\\Adobe\\Acrobat"],
        logs: ["Adobe profile picker screenshot", "Default app screenshots", "Plugin or extension list"],
        processes: ["Acrobat.exe", "AcroCEF.exe"]
      },
      escalationNotes: [
        "Collect Adobe email, product profile, enterprise-vs-personal choice, and exact integration points affected.",
        "Escalate when the same entitlement or activation problem affects multiple users in one product profile."
      ],
      relatedSnippets: ["office-repair-guidance", "msi-uninstall-lookup", "event-log-quick-collection"],
      relatedTemplates: ["software-install-approval-request", "tier1-tier2-escalation", "vendor-escalation-request"]
    }
  },
  bluebeam: {
    "revu-21": {
      highlights: [
        "Fastest likely fix: verify BBID validation, subscription tier, and shared profile or tool chest availability before reinstalling Revu.",
        "Studio access and shared tool sets matter as much as the base application launch."
      ],
      askFirst: [
        "Is the issue launch, BBID sign-in, Studio access, shared tool sets, or PDF markup behavior?",
        "Can the user sign in with the same BBID in a browser or another machine?",
        "Did the issue begin after a subscription change, workstation swap, or version update?"
      ],
      supportCheckpoints: [
        "Validate the correct Bluebeam subscription tier and that the user's BBID is active before handoff.",
        "Test Studio sign-in, profile loading, and any shared tool chest, stamp, or markup profile used by the team.",
        "Capture custom profiles and tool sets so they can be restored during rebuild or user turnover."
      ],
      usefulInfo: {
        paths: ["%appdata%\\Bluebeam Software\\Revu", "%programdata%\\Bluebeam Software"],
        logs: ["BBID sign-in screenshot", "Profile or tool chest export notes"],
        processes: ["Revu.exe"]
      },
      escalationNotes: [
        "Collect BBID email, subscription tier, Revu build, and whether Studio or local-only workflows are affected.",
        "Escalate when many users lose Studio access or the same profile set fails after a coordinated update."
      ],
      relatedSnippets: ["msi-uninstall-lookup", "event-log-quick-collection"],
      relatedTemplates: ["software-install-approval-request", "tier1-tier2-escalation", "vendor-escalation-request"]
    }
  },
  quickbooks: {
    "quickbooks-enterprise-desktop": {
      highlights: [
        "Fastest likely fix: confirm the exact year, company-file path, hosting mode, and printer or PDF workflow before reinstalling the client.",
        "Tool Hub should usually be in the first repair pass before manual cleanup."
      ],
      askFirst: [
        "What exact QuickBooks year, release, and company file path does the user need?",
        "Is the workflow local Desktop, hosted Desktop, or a remote-published session?",
        "Is the failure launch, company file access, multi-user mode, printing, PDF creation, or update related?",
        "Are backups and a known-good company-file host confirmed before repair work starts?"
      ],
      supportCheckpoints: [
        "Verify the exact QuickBooks year, company-file path, hosting model, and user-role expectations before handoff.",
        "Test sign-in, multi-user access, printing, PDF workflows, and any mapped drives or UNC paths tied to the company file.",
        "Document backups, file locations, and Tool Hub usage notes so support does not have to rediscover them under pressure."
      ],
      usefulInfo: {
        paths: ["Company file .QBW path", "%programdata%\\Intuit", "%public%\\Documents\\Intuit\\QuickBooks"],
        logs: ["QuickBooks Tool Hub results", "Error code screenshot", "Hosting or company file path notes"],
        services: ["QBCFMonitorService", "QuickBooksDBXX"],
        processes: ["QBW32.exe"]
      },
      escalationNotes: [
        "Collect year, release, company-file path, hosting mode, Tool Hub actions, and exact error code before escalation.",
        "Do not clean-install until backups and the actual company-file host are confirmed."
      ],
      relatedSnippets: ["smb-path-reachability-test", "port-connectivity-test", "msi-uninstall-lookup", "event-log-quick-collection"],
      relatedTemplates: ["tier1-tier2-escalation", "vendor-escalation-request", "after-hours-handoff-template"]
    }
  },
  egnyte: {
    "egnyte-desktop-app": {
      highlights: [
        "Fastest likely fix: confirm the user type, tenant, SSO path, and deployment parameters before rebuilding the mapped-drive client.",
        "Wrong role or wrong deployment flags create more Desktop App tickets than bad installs do."
      ],
      askFirst: [
        "Is the problem sign-in, mapped drive mount, offline files, tenant selection, or missing folder visibility?",
        "What Egnyte user type does the account have, and should this user even have Desktop App access?",
        "Did the issue begin after SSO changes, device replacement, or a managed deployment update?"
      ],
      supportCheckpoints: [
        "Confirm the user's Egnyte role supports Desktop App use and that the correct tenant, drive-letter, or label settings are being deployed.",
        "Test sign-in, mapped-drive behavior, offline access, and visibility to the expected folders before the ticket is closed.",
        "Document offline folders, special drive mappings, and any mass-deployment parameters used for that client."
      ],
      usefulInfo: {
        paths: ["%localappdata%\\Egnyte", "%programfiles%\\Egnyte\\Egnyte Desktop App"],
        logs: ["Tenant or mount screenshot", "Deployment parameter notes", "Offline folder list"],
        processes: ["EgnyteDesktopApp.exe"]
      },
      escalationNotes: [
        "Collect Egnyte domain, user type, SSO status, drive-letter behavior, and whether web access is also affected.",
        "Avoid clearing offline folders before confirming browser truth and ownership of local-only content."
      ],
      relatedSnippets: ["smb-path-reachability-test", "dns-resolution-check", "event-log-quick-collection"],
      relatedTemplates: ["software-install-approval-request", "tier1-tier2-escalation", "vendor-escalation-request"]
    }
  }
};

export function getAppGuideContent(vendorSlug, appSlug) {
  return appGuideContent[vendorSlug]?.[appSlug] ?? {};
}
