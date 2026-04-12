export const matrixResource = {
  title: "Microsoft 365 Feature Matrix",
  text: "Use the live M365 Maps matrix when you need current plan-to-feature comparisons for desktop apps, mailbox, identity, security, and compliance.",
  url: "https://m365maps.com/matrix.htm"
};

export const microsoftIssueSections = [
  {
    title: "Office Apps and Activation",
    description: "These are the Microsoft 365 desktop patterns that usually show up first in tickets: activation drift, sign-in mismatch, add-ins, and Outlook profile trouble.",
    items: [
      {
        title: "Office activation, sign-in, or wrong account",
        text: "Office may look installed correctly while still running unlicensed, signed into the wrong identity, or missing a required app license or service plan.",
        fixes: [
          "Check whether the user signed in with the intended work account instead of a personal Microsoft account or stale tenant profile.",
          "Verify the Microsoft 365 subscription is active and that the expected desktop-app or mailbox-related service plans are enabled.",
          "Run the built-in activation troubleshooting flow before reinstalling Microsoft 365 Apps.",
          "If multiple Office builds are installed, remove the extra version and then run an Office repair."
        ],
        links: [
          {
            label: "Office activation troubleshooting",
            url: "https://support.microsoft.com/en-gb/office/unlicensed-product-and-activation-errors-in-office-0d23d3c0-c19c-4b2f-9845-5344fedc4380"
          },
          {
            label: "Repair an Office application",
            url: "https://support.microsoft.com/en-us/office/repair-an-office-application-7821d4b6-7c1d-4205-aa0e-a6b40c5bb88b"
          }
        ]
      },
      {
        title: "Word or Excel will not open, crashes, or feels unstable",
        text: "The most common causes are damaged add-ins, broken templates, protected-view edge cases, or a Microsoft 365 install that needs repair.",
        fixes: [
          "Test whether the issue affects only one file or the app itself before changing the whole Office install.",
          "Open the app in safe mode or temporarily disable add-ins when launch crashes or hangs begin after updates or plugin changes.",
          "Check default save locations, protected-view prompts, and whether the file is opening from email, Teams, or a blocked network path.",
          "If multiple Office apps are failing, use Quick Repair first and move to Online Repair if the issue persists."
        ],
        links: [
          {
            label: "Repair an Office application",
            url: "https://support.microsoft.com/en-us/office/repair-an-office-application-7821d4b6-7c1d-4205-aa0e-a6b40c5bb88b"
          }
        ]
      },
      {
        title: "Outlook profile, add-in, or startup issues",
        text: "Outlook issues often come from add-ins, a damaged profile, cached credentials, or recent update interactions rather than the mailbox itself.",
        fixes: [
          "Try Outlook in safe mode first to separate add-in problems from mailbox or profile problems.",
          "Check whether password prompts or sign-in loops started after MFA changes, device replacement, or a new Outlook rollout.",
          "Compare web access and desktop access before recreating the profile so you know whether the problem is client-side or tenant-side.",
          "If new Outlook is in use, compare the problem against Microsoft's current known-issues list before forcing a migration or rollback."
        ],
        links: [
          {
            label: "Open Outlook in safe mode",
            url: "https://support.microsoft.com/en-us/office/open-outlook-in-safe-mode-f394c2ee-b2af-e97a-64ee-35cd24414811"
          },
          {
            label: "New Outlook known issues",
            url: "https://support.microsoft.com/en-us/office/fixes-or-workarounds-for-recent-issues-in-new-outlook-for-windows-3b3dbdaa-b20b-4c79-a352-49bee8dc8bb5"
          }
        ]
      }
    ]
  },
  {
    title: "Teams, OneDrive, and SharePoint",
    description: "These tickets usually come down to identity, permissions, sync state, or device settings rather than a single broken app install.",
    items: [
      {
        title: "Teams sign-in, meeting, or device problems",
        text: "Teams issues are frequently caused by tenant mismatch, stale local state, permissions, or bad device selection for calls and meetings.",
        fixes: [
          "Check whether the user is in the correct tenant and still has the required Teams license and channel or group membership.",
          "If the problem is isolated to meetings or calls, verify the selected camera, microphone, speaker, and browser or desktop permissions first.",
          "Sign out and back in after recent licensing or membership changes so the client refreshes policy and channel access.",
          "If Teams on the web works but desktop does not, treat that as a local client or device problem rather than an account problem."
        ],
        links: [
          {
            label: "Troubleshoot in Microsoft Teams",
            url: "https://support.microsoft.com/en-us/office/troubleshoot-in-microsoft-teams-6fa7c08a-6fd4-47a0-b275-90a5f60f1df9"
          },
          {
            label: "Troubleshoot Teams device features",
            url: "https://support.microsoft.com/en-us/office/troubleshoot-device-features-in-microsoft-teams-on-the-web-567ba59d-fa4d-4c41-87a6-baaa6ec70e33"
          }
        ]
      },
      {
        title: "OneDrive sync, lock, or file-name issues",
        text: "Most OneDrive tickets come from account mismatch, low disk space, path or naming conflicts, or a sync engine that needs to be reset or relinked.",
        fixes: [
          "Confirm the user is signed into the expected work tenant and not a second OneDrive profile.",
          "Review file names, path length, invalid characters, and whether files are locked by another application.",
          "Check free disk space, Files On-Demand behavior, and whether large offline folders are pinning too much data locally.",
          "If sync remains stuck, pause and resume, then move to unlinking or relinking the client if browser access is still healthy."
        ],
        links: [
          {
            label: "Fix OneDrive sync problems",
            url: "https://support.microsoft.com/en-us/office/fix-onedrive-sync-problems-52a86836-1e7f-46fd-85c7-1e7a5e9b4273"
          },
          {
            label: "OneDrive file can't be synced",
            url: "https://support.microsoft.com/en-us/office/onedrive-shows-this-file-can-t-be-synced-54f6e0d2-41d3-496a-826e-964e59333d7e"
          },
          {
            label: "Choose which OneDrive folders sync",
            url: "https://support.microsoft.com/en-us/office/choose-which-onedrive-folders-to-sync-to-your-computer-98b8b011-8b94-419b-aa95-a14ff2415e85"
          }
        ]
      },
      {
        title: "SharePoint library access or sync problems",
        text: "SharePoint issues are usually permissions, site-membership, or library sync problems and should be validated in the browser before blaming the sync client.",
        fixes: [
          "Confirm the user can reach the correct site, library, and document set in the browser first.",
          "Check group membership, site permissions, and whether the shared link or shortcut points to the intended tenant and library.",
          "Make sure the library path is still valid and not colliding with an old or duplicate local sync location.",
          "Only resync the library after permissions and browser access are confirmed healthy."
        ],
        links: [
          {
            label: "Fix SharePoint Online sync problems",
            url: "https://support.microsoft.com/en-au/office/fix-sharepoint-online-sync-problems-aaa2d172-8d45-4e94-9c04-5364d04ca2f4"
          },
          {
            label: "Fix OneDrive sync problems",
            url: "https://support.microsoft.com/en-us/office/fix-onedrive-sync-problems-52a86836-1e7f-46fd-85c7-1e7a5e9b4273"
          }
        ]
      }
    ]
  },
  {
    title: "Identity, MFA, and Authenticator",
    description: "Phone changes, notification failures, and stale methods are still some of the most disruptive blockers in Microsoft 365 access work.",
    items: [
      {
        title: "Authenticator or MFA approval problems",
        text: "Most MFA issues happen during phone replacement, notification failures, time drift, or confusion between old and new sign-in methods.",
        fixes: [
          "Check whether the user still has the right device, notification permissions, date and time, and network access before resetting anything.",
          "If push approvals are failing, verify battery optimization, Do Not Disturb, and whether codes still arrive even when pushes do not.",
          "Use a controlled re-registration only after confirming the issue is not tied to the wrong account tile or stale device registration.",
          "Document the recovery path used so future device cutovers or emergency resets are faster."
        ],
        links: [
          {
            label: "Troubleshoot Microsoft Authenticator",
            url: "https://support.microsoft.com/en-us/authenticator/troubleshoot-problems-with-microsoft-authenticator"
          }
        ]
      }
    ]
  }
];

export const computerIssueSections = [
  {
    title: "Access and Connectivity",
    description: "These are the workstation access patterns that tend to create the most confusion during support calls: shared resources, remote access, and basic network health.",
    items: [
      {
        title: "Shared drives or mapped paths keep disappearing",
        text: "Drive mapping failures are usually permissions, DNS, cached credentials, or VPN path problems instead of a full file-server outage.",
        fixes: [
          "Confirm the user is on the right network or VPN before troubleshooting the share itself.",
          "Test the server path by name and confirm the user still belongs to the right AD group or file-share permission set.",
          "Remove stale mapped drives or Windows Credential Manager entries if the path keeps reconnecting with the wrong identity.",
          "If the share works by UNC path but not as a drive letter, rebuild the mapping cleanly instead of layering another shortcut over it."
        ],
        links: [
          {
            label: "Map a network drive in Windows",
            url: "https://support.microsoft.com/en-au/windows/map-a-network-drive-in-windows-29ce55d1-34e3-a7e2-4801-131475f9557d"
          },
          {
            label: "File sharing over a network in Windows",
            url: "https://support.microsoft.com/en-au/windows/file-sharing-over-a-network-in-windows-b58704b2-f53a-4b82-7bc1-80f9994725bf"
          }
        ]
      },
      {
        title: "VPN, Wi-Fi, or general network issues",
        text: "Network tickets are often local connectivity, DNS, or split-tunnel problems rather than a broken remote app.",
        fixes: [
          "Confirm the device has normal internet connectivity before digging into VPN profiles or internal resources.",
          "Test name resolution separately from reachability so you can tell a DNS issue from a routing issue.",
          "If the VPN connects but apps still fail, compare expected split-tunnel behavior against what the user can and cannot reach.",
          "Use a known-good user or device to see whether the issue is endpoint-specific before changing the shared VPN configuration."
        ],
        links: [
          {
            label: "Fix network connection issues in Windows",
            url: "https://support.microsoft.com/en-US/windows/fix-network-connection-issues-in-windows-10-166a28c4-14c1-bdb1-473c-09c1571455d8"
          }
        ]
      },
      {
        title: "Remote access path works for some resources but not others",
        text: "When email and web work but shares or line-of-business apps fail, the issue is often entitlement, DNS suffix, or a stale credential path.",
        fixes: [
          "Check whether the user can reach the sign-in portal, internal DNS names, and one known internal share or server.",
          "Compare behavior before and after VPN connection to see whether the tunnel is changing routing the way the client expects.",
          "Validate MFA, certificates, and saved profiles if the VPN prompts look unusual after password or phone changes.",
          "Document any special remote-access requirements for finance, CAD, or file-server workflows so future tickets start faster."
        ],
        links: [
          {
            label: "Fix network connection issues in Windows",
            url: "https://support.microsoft.com/en-US/windows/fix-network-connection-issues-in-windows-10-166a28c4-14c1-bdb1-473c-09c1571455d8"
          }
        ]
      }
    ]
  },
  {
    title: "Device Health and Storage",
    description: "Low space, poor performance, and update trouble often overlap. This section gives a better first-pass checklist before a rebuild or reimage.",
    items: [
      {
        title: "Low disk space or cleanup trouble",
        text: "Storage issues usually hide in Downloads, profile caches, offline cloud folders, and temporary files rather than Windows alone.",
        fixes: [
          "Check the size of Downloads, Desktop, Outlook, OneDrive, Egnyte, and application caches before deleting random folders.",
          "Use Windows Storage and Cleanup Recommendations first so the user can see what is safe to remove.",
          "Review cloud sync settings and offline folders if the device is pinning far more data locally than expected.",
          "Confirm the application actually needs local free space for updates, temp conversion, or rendering before changing its configuration."
        ],
        links: [
          {
            label: "Free up drive space in Windows",
            url: "https://support.microsoft.com/en-us/windows/free-up-drive-space-in-windows-85529ccb-c365-490d-b548-831022bc9b32"
          }
        ]
      },
      {
        title: "Slow startup or poor overall PC performance",
        text: "Performance complaints are often background apps, low storage, pending updates, or heavy sync and security workloads rather than bad hardware alone.",
        fixes: [
          "Check startup apps, storage pressure, and whether large sync or scan jobs are running in the background.",
          "Confirm Windows and key drivers are current before assuming the hardware is failing.",
          "Remove unused apps and reduce startup load before escalating to reimage or replacement.",
          "If only one user profile is slow, compare against a fresh profile before concluding the whole machine is unhealthy."
        ],
        links: [
          {
            label: "Tips to improve PC performance",
            url: "https://support.microsoft.com/en-us/windows/tips-to-improve-pc-performance-in-windows-b3b3ef5b-5953-fb6a-2528-4bbed82fba96"
          },
          {
            label: "Free up drive space in Windows",
            url: "https://support.microsoft.com/en-us/windows/free-up-drive-space-in-windows-85529ccb-c365-490d-b548-831022bc9b32"
          }
        ]
      },
      {
        title: "Windows Update failures or updates stuck",
        text: "Update failures commonly involve low disk space, services that are stuck, third-party interference, or a device that simply needs a clean restart and rerun.",
        fixes: [
          "Run the Windows Update troubleshooter first and restart before doing heavier cleanup.",
          "Check storage availability and internet health because low space and bad connectivity can both stall updates.",
          "If a device is hanging at the same percentage, retry after reboot and verify no pending reboot or service issue remains.",
          "Capture the error code before deeper remediation so the ticket has real evidence if the problem returns."
        ],
        links: [
          {
            label: "Windows Update troubleshooter",
            url: "https://support.microsoft.com/en-us/windows/windows-update-troubleshooter-19bc41ca-ad72-ae67-af3c-89ce169755dd"
          },
          {
            label: "Troubleshoot problems updating Windows",
            url: "https://support.microsoft.com/en-us/windows/troubleshoot-problems-updating-windows-188c2b0f-10a7-d72f-65b8-32d177eb136c"
          }
        ]
      }
    ]
  },
  {
    title: "Printing, Audio, and User Sessions",
    description: "These are the frustrating day-to-day endpoint tickets that often look random but usually reduce to the same few patterns.",
    items: [
      {
        title: "Printer mapping, queue, or shared printer problems",
        text: "Print issues are usually printer sharing, driver, spooler, or IP-path problems instead of a full application failure.",
        fixes: [
          "Check whether the printer is online and reachable, and whether the user is hitting the correct print server or IP queue.",
          "Clear stuck jobs and restart the print spooler when jobs are piling up but never printing.",
          "Confirm the printer is shared correctly on the host or server if this is a shared-printer workflow.",
          "Reinstall with the approved driver only after confirming the queue path and default printer are correct."
        ],
        links: [
          {
            label: "Fix printer connection and printing problems",
            url: "https://support.microsoft.com/en-gb/windows/fix-printer-connection-and-printing-problems-in-windows-fb830bff-7702-6349-33cd-9443fe987f73"
          },
          {
            label: "Fix shared printer connection problems",
            url: "https://support.microsoft.com/en-us/windows/fix-shared-printer-connection-problems-in-windows-27f7b136-02e6-406a-9a25-fc87838062b8"
          }
        ]
      },
      {
        title: "Bluetooth, headset, audio, or docking weirdness",
        text: "Peripheral issues often come from the wrong output device, stale Bluetooth pairing, enhancements, or driver problems after Windows updates.",
        fixes: [
          "Check the active output and input devices first, especially after docking, undocking, or joining a Teams meeting.",
          "Turn off audio enhancements and confirm Windows is using the intended speaker or headset.",
          "If Bluetooth is involved, recheck pairing state, battery, range, and recent driver updates before replacing hardware.",
          "If one peripheral works on another machine, focus on the Windows device configuration instead of the headset or dock."
        ],
        links: [
          {
            label: "Troubleshoot audio or video app errors",
            url: "https://support.microsoft.com/en-us/windows/troubleshoot-common-error-messages-for-audio-or-video-apps-64236c08-c610-4c56-a095-ab5a66aaa680"
          },
          {
            label: "Fix Bluetooth connected but no sound",
            url: "https://support.microsoft.com/en-us/windows/fix-bluetooth-connected-but-no-sound-issue-on-windows-90cf598f-ffdb-426f-b253-bc5cc98a30ea"
          }
        ]
      },
      {
        title: "Windows sign-in or profile problems",
        text: "Login failures are often profile corruption, time drift, cached credentials, expired passwords, or confusion between local, domain, and cloud sign-in paths.",
        fixes: [
          "Confirm the user is attempting the right identity context before assuming the password itself is wrong.",
          "Check time and date, lockout status, password expiry, and reachability to the identity source.",
          "If other users can sign in on the same machine, compare against a fresh or test profile before rebuilding Windows.",
          "Record whether the problem affects only Windows sign-in or also browser and Microsoft 365 sign-in so the ticket is scoped correctly."
        ],
        links: [
          {
            label: "Fix network connection issues in Windows",
            url: "https://support.microsoft.com/en-US/windows/fix-network-connection-issues-in-windows-10-166a28c4-14c1-bdb1-473c-09c1571455d8"
          }
        ]
      }
    ]
  }
];

export const crossAppIssuePatterns = [
  {
    title: "Wrong account, tenant, or identity type",
    text: "Many app failures are not true app problems. The user is often signed into the wrong org, a personal account, or an old cached tenant.",
    fixes: [
      "Confirm the exact email or SSO identity the vendor seat was assigned to before resetting anything.",
      "Check whether the client uses federated SSO, local vendor credentials, or multiple orgs for the same product family.",
      "Sign out fully and relaunch the app after license or identity changes so the client refreshes the session."
    ]
  },
  {
    title: "Seat assigned but features still unavailable",
    text: "A user can appear licensed while key modules, extensions, or profiles are still missing.",
    fixes: [
      "Verify the specific product, edition, or module was assigned instead of assuming the base seat covers everything.",
      "Check whether the app also needs a role, group, plugin, or data-source permission beyond the license itself.",
      "Compare the user's visible app tiles or modules against a known-good user in the same client."
    ]
  },
  {
    title: "Version mismatch or unsupported plugin set",
    text: "CAD, PDF, accounting, and collaboration tools often fail when the app version no longer matches the approved client workflow or extension set.",
    fixes: [
      "Match the installed version to the client's approved release year or channel before updating or downgrading again.",
      "Review plugins, templates, add-ins, and content packs as part of the issue, not as optional extras.",
      "If only one user is affected after an update, compare their plugin set and defaults against a working workstation."
    ]
  },
  {
    title: "File path, permissions, or local cache corruption",
    text: "A lot of application errors are really bad local cache, folder permission, or file locking problems.",
    fixes: [
      "Test whether the same file or workflow works in the web portal or from another workstation.",
      "Check for path length, invalid characters, stale offline files, or folders that are no longer reachable.",
      "Clear or rebuild cache only after confirming the needed local data is safe to remove."
    ]
  },
  {
    title: "Default app or integration conflict",
    text: "PDF apps, Outlook integrations, printer add-ins, browser helpers, and Teams plugins commonly fight for defaults.",
    fixes: [
      "Check Windows defaults and app-specific integration settings after installing or removing another app in the same category.",
      "Verify that browser extensions or Office add-ins are still enabled if the workflow depends on them.",
      "Treat default-app cleanup as part of rollout and offboarding instead of leaving it as a manual user fix."
    ]
  },
  {
    title: "Uninstall completed but the machine is not really clean",
    text: "Removing the base app often leaves seats assigned, profiles cached, integrations active, or local data behind.",
    fixes: [
      "Recover the vendor assignment or deactivate the device before declaring the uninstall complete.",
      "Check for leftover services, browser extensions, Office add-ins, default handlers, and local cache directories.",
      "Preserve role-critical templates, stamps, libraries, and project data before cleanup."
    ]
  }
];

export const installUninstallPatterns = [
  {
    title: "Pending reboot, old build, or stale prerequisite state",
    text: "A surprising number of install failures come from half-finished updates, previous versions, or missing runtimes instead of the current installer itself.",
    fixes: [
      "Check for pending restarts, previous broken installs, and major prerequisite failures before rerunning the same setup.",
      "Use the client's approved installer path instead of mixing direct downloads, package managers, and vendor launchers.",
      "If the install keeps rolling back, capture the log path before cleanup."
    ]
  },
  {
    title: "Security tooling or network controls interrupt setup",
    text: "Web installers, entitlement checks, and update components are often blocked by security tools, proxies, or SSL inspection.",
    fixes: [
      "Confirm the installer can reach required vendor endpoints and download services.",
      "Compare behavior on and off VPN if remote users are deploying over slower or filtered connections.",
      "If security tooling is suspected, document the exact block symptom before creating exclusions."
    ]
  },
  {
    title: "Install succeeded, but sign-in or entitlement still fails",
    text: "Local install success does not prove the user has the right seat, module, or SSO path.",
    fixes: [
      "Validate the assigned identity, seat, role, and tenant before rebuilding the workstation.",
      "Test browser access or admin-portal visibility alongside the desktop app.",
      "Document which subscription tier or bundle was actually assigned."
    ]
  },
  {
    title: "Uninstall removed the app but not the risk",
    text: "Seats, caches, shared links, templates, and local project data often survive the uninstall unless the process is intentionally closed out.",
    fixes: [
      "Recover the vendor license or assignment before or during the uninstall workflow.",
      "Reset Windows defaults and related integrations if another app is taking over the workflow afterward.",
      "Preserve and hand off any local content that still belongs to the team, not just the departing user."
    ]
  }
];
