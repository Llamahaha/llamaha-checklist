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
    title: "Cloud PCs and Remote Windows Access",
    description: "Use this section when you connect to a Windows 365 Cloud PC or another remote Windows workspace for daily work.",
    items: [
      {
        title: "Your Cloud PC is missing or will not connect",
        text: "Windows 365 access problems are usually caused by signing in with the wrong work account, using the wrong connection app, or a Cloud PC session that needs to be restarted.",
        fixes: [
          "Use the same work account your company assigned for Windows 365. If no Cloud PCs appear, compare the signed-in account to the one your company expected you to use.",
          "Use a supported connection method such as Windows App or the Windows 365 web client instead of older Remote Desktop shortcuts for daily access.",
          "If the Cloud PC card appears but will not connect, restart the local computer first, then retry the Cloud PC from the same client.",
          "If Windows asks you which app should open a Cloud PC session file, choose Azure Virtual Desktop (HostApp) when that option appears."
        ],
        links: [
          {
            label: "Access a Cloud PC",
            url: "https://learn.microsoft.com/en-us/windows-365/end-user-access-cloud-pc"
          },
          {
            label: "Troubleshoot Windows 365 app issues",
            url: "https://learn.microsoft.com/en-us/troubleshoot/windows-365/troubleshoot-windows-365-app"
          }
        ]
      },
      {
        title: "The Cloud PC opens, but feels frozen, slow, or off",
        text: "Cloud PC performance problems often come from the local internet connection, a temporary session issue, or a Cloud PC that needs to be restarted cleanly.",
        fixes: [
          "Confirm your local computer still has stable internet access before assuming the Cloud PC itself is down.",
          "Disconnect and reconnect once if the session looks frozen or never finishes loading the desktop.",
          "If the Cloud PC opens but is unusually slow, close heavy local apps and compare whether the issue affects only one Cloud PC session or every remote session you open.",
          "Restart the Cloud PC from the supported Windows 365 or Windows App controls if the session clearly is not recovering."
        ],
        links: [
          {
            label: "Troubleshoot connection errors",
            url: "https://learn.microsoft.com/en-us/windows-365/enterprise/connection-errors"
          },
          {
            label: "Cloud PC actions in Windows App",
            url: "https://learn.microsoft.com/en-us/windows-app/device-actions"
          }
        ]
      },
      {
        title: "Your Cloud PC session looks out of date or missing recent work",
        text: "Cloud PC issues that look like missing apps or stale content are often tied to the wrong account, the wrong Cloud PC, or a session that did not reconnect where you expected.",
        fixes: [
          "Confirm you opened the correct Cloud PC if your company provides more than one remote desktop option.",
          "If recent work or app updates are missing, restart the Cloud PC session and sign back in with the expected work account.",
          "If a file should be on the Cloud PC but is not, confirm whether it lives in OneDrive, SharePoint, or another synced location before moving or recreating it.",
          "If the problem affects only one business app inside the Cloud PC, open that app's guide before treating the whole Cloud PC as broken."
        ],
        links: [
          {
            label: "Access a Cloud PC",
            url: "https://learn.microsoft.com/en-us/windows-365/end-user-access-cloud-pc"
          },
          {
            label: "Open App Help",
            url: "vendor-guides.html",
            external: false
          }
        ]
      },
      {
        title: "Citrix Workspace App will not open your remote app or desktop",
        text: "Citrix Workspace issues are usually caused by the wrong workspace URL, the wrong work account, a browser launch handing off .ica files incorrectly, or a published app or desktop failing after it starts.",
        fixes: [
          "Use the exact workspace URL or company launch page your organization provided instead of a saved shortcut you are no longer sure about.",
          "Make sure Citrix Workspace App is installed if the browser downloads an .ica file and asks what should open it.",
          "Restart the local computer and then retry one published app or desktop before assuming the whole workspace is unavailable.",
          "If one Citrix app works but another fails, keep the exact published app or desktop name ready for support."
        ],
        links: [
          {
            label: "Open Citrix Workspace App guide",
            url: "guides/citrix/workspace-app.html",
            external: false
          },
          {
            label: "Getting started with Citrix Workspace",
            url: "https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/getting-started.html"
          },
          {
            label: "Client detection",
            url: "https://docs.citrix.com/en-us/citrix-workspace/user-experience/client-detection.html"
          }
        ]
      }
    ]
  },
  {
    title: "Network, VPN, and Shared Access",
    description: "Use this section when the computer can get online, but work resources such as shared drives, FortiClient VPN, or internal apps still are not reachable.",
    items: [
      {
        title: "Wi-Fi, internet, or general network access is unstable",
        text: "Most everyday network issues are caused by local Wi-Fi, an unstable internet connection, or DNS problems rather than the work app itself.",
        fixes: [
          "Confirm normal internet browsing works before you retry a work app, VPN, or mapped drive.",
          "Restart the local Wi-Fi connection or the computer if the issue began after sleep, docking, or changing locations.",
          "If only one website or one internal tool fails, compare it with a second site or app before assuming the whole computer is offline.",
          "If the internet is unstable everywhere on the device, fix that first before troubleshooting business apps."
        ],
        links: [
          {
            label: "Fix network connection issues in Windows",
            url: "https://support.microsoft.com/en-us/windows/fix-network-connection-issues-in-windows-10-166a28c4-14c1-bdb1-473c-09c1571455d8"
          }
        ]
      },
      {
        title: "FortiClient VPN will not connect or keeps dropping",
        text: "Most FortiClient problems come from the wrong VPN profile, internet issues, MFA or browser sign-in problems, or a FortiClient build that needs to be updated.",
        fixes: [
          "Confirm the computer has normal internet access before you retry the VPN tunnel.",
          "Open the exact FortiClient tunnel your company expects and make sure you are signing in with the same work account or username format your company provided.",
          "If the VPN uses a browser or MFA step, complete that prompt fully and return to FortiClient before you retry the connection.",
          "If the VPN connects but internal file shares or sites still fail, compare whether the issue affects every internal resource or only one app."
        ],
        links: [
          {
            label: "Open FortiClient VPN guide",
            url: "guides/fortinet/forticlient-vpn.html",
            external: false
          },
          {
            label: "Connect from FortiClient VPN client",
            url: "https://docs.fortinet.com/document/fortigate/7.6.1/administration-guide/215051/connecting-from-forticlient-vpn-client"
          },
          {
            label: "Connect to SSL or IPsec VPN",
            url: "https://docs.fortinet.com/document/forticlient/7.2.10/administration-guide/6364/connecting-to-ssl-or-ipsec-vpn"
          }
        ]
      },
      {
        title: "Shared drives or mapped paths keep disappearing",
        text: "Drive mapping failures are usually permissions, cached credentials, VPN path problems, or opening the wrong server path rather than a full file-server outage.",
        fixes: [
          "Confirm you are on the right network or VPN before troubleshooting the shared path itself.",
          "Test the same server path by name and compare it with another shared folder if one is available.",
          "If Windows keeps reconnecting with the wrong account, clear old saved credentials only after you have the correct username and password ready.",
          "If the path works by direct server path but not as a mapped drive letter, remove the old broken mapping and recreate it cleanly."
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
      }
    ]
  },
  {
    title: "Performance, Storage, and Updates",
    description: "Use this section when the computer starts slowly, feels sluggish, runs out of space, or refuses to install routine Windows updates.",
    items: [
      {
        title: "Low disk space or cleanup trouble",
        text: "Storage issues usually come from Downloads, desktop clutter, offline cloud folders, and temporary files rather than Windows alone.",
        fixes: [
          "Check the size of Downloads, Desktop, OneDrive, Outlook, and other large user folders before deleting random Windows folders.",
          "Use Windows Storage or Cleanup Recommendations first so you can see what is safe to remove.",
          "If a cloud sync folder is pinning too much data offline, unpin older content before uninstalling or moving the app.",
          "Leave app-specific caches alone unless the guide for that app tells you they are safe to remove."
        ],
        links: [
          {
            label: "Free up drive space in Windows",
            url: "https://support.microsoft.com/en-us/windows/free-up-drive-space-in-windows-85529ccb-c365-490d-b548-831022bc9b32"
          }
        ]
      },
      {
        title: "The PC starts slowly or feels unusually sluggish",
        text: "Performance complaints are often caused by startup apps, low free space, pending updates, or background sync jobs rather than a hardware failure alone.",
        fixes: [
          "Restart the computer fully before deeper cleanup if it has not been restarted recently.",
          "Check startup apps, free disk space, and whether large sync or update jobs are still running in the background.",
          "Install pending Windows updates and reopen only the apps you need for one test.",
          "If only one app is slow, use that app's guide before assuming the whole computer is unhealthy."
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
        title: "Windows Update fails or gets stuck",
        text: "Update failures usually come from low disk space, a pending restart, interrupted internet access, or a device that needs to retry the update cleanly.",
        fixes: [
          "Restart the computer first, then check whether Windows Update shows a clearer error after the restart.",
          "Make sure there is enough free disk space before retrying a feature update or cumulative update.",
          "Keep the exact update error code or wording instead of retrying the same failed update over and over without capturing it.",
          "If the update began failing only after another app install or security prompt, note that timing when you contact support."
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
    title: "Printing, Audio, and Sign-in",
    description: "Use this section for the everyday PC issues that interrupt work quickly: printers, sound, headsets, docks, and Windows sign-in.",
    items: [
      {
        title: "Printer mapping, queue, or shared printer problems",
        text: "Print issues are usually caused by the printer path, the queue, or a stalled print job rather than the document app itself.",
        fixes: [
          "Check whether the printer is online and reachable, and whether you are sending the job to the correct printer or shared queue.",
          "If jobs are stuck in the queue, clear the pending jobs and retry one small print job.",
          "If the printer is shared by another computer or print server, confirm that path still exists before reinstalling anything.",
          "If only one app cannot print, test the printer from another app before assuming the printer is broken."
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
        title: "Bluetooth, headset, audio, or docking issues",
        text: "Audio and headset problems are often caused by the wrong playback or recording device, a dock change, Bluetooth pairing, or app permissions.",
        fixes: [
          "Check the active speaker and microphone in Windows first, especially after docking, undocking, or joining a Teams meeting.",
          "Reconnect the headset or dock once if Windows is still pointing to an old device.",
          "If Bluetooth is involved, confirm the headset is still paired and has enough battery before deeper troubleshooting.",
          "If only one app has no sound, test system audio or another app before changing the whole computer."
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
        title: "Windows sign-in or password issues",
        text: "Windows sign-in problems usually come from the wrong sign-in method, cached credentials, a recent password change, or the computer not reaching the sign-in service it needs.",
        fixes: [
          "Confirm you are using the correct work account, local account, PIN, or password option for that computer.",
          "Restart the computer once if the sign-in screen looks frozen or repeatedly rejects a new password right after a reset.",
          "If the same work account signs in fine to Microsoft 365 in the browser but not to Windows, mention that difference when you contact support.",
          "If the issue began after a password change, try one more careful sign-in after reconnecting the device to Wi-Fi or Ethernet."
        ],
        links: [
          {
            label: "Change or reset your Windows password",
            url: "https://support.microsoft.com/en-us/windows/change-or-reset-your-password-in-windows-532dc8d3-9b9e-7f8c-4d36-32d73cf28dc4"
          }
        ]
      }
    ]
  }
];

export const tipsAndTricksSections = [
  {
    title: "Keyboard Shortcuts and Faster Navigation",
    description: "Use these Windows tips when you want to move faster without digging through menus. The shortcuts below come from Microsoft's current Windows keyboard shortcut guidance.",
    items: [
      {
        title: "Everyday Windows shortcuts that save time",
        text: "These are the shortcuts most people can use right away for day-to-day navigation and support work.",
        fixes: [
          "Press Windows + E to open File Explorer.",
          "Press Windows + I to open Settings.",
          "Press Alt + Tab to switch between open apps.",
          "Press Windows + Left arrow or Windows + Right arrow to snap the current window to one side of the screen.",
          "Press Windows + D to show or hide the desktop.",
          "Press Windows + L to lock the computer when you step away."
        ],
        links: [
          {
            label: "Keyboard shortcuts in Windows",
            url: "https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec"
          }
        ]
      },
      {
        title: "Screenshots, clipboard history, and quick recovery shortcuts",
        text: "These are especially useful when you need to capture an error, grab part of the screen, or quickly get to a troubleshooting tool.",
        fixes: [
          "Press Windows + Shift + S to capture part of the screen with Snipping Tool.",
          "Press Alt + PrtScn to copy a screenshot of the active window.",
          "Press Windows + V to open clipboard history if it is enabled.",
          "Press Ctrl + Shift + Esc to open Task Manager.",
          "Press F5 or Ctrl + R in many apps to refresh the current window or page."
        ],
        links: [
          {
            label: "Keyboard shortcuts in Windows",
            url: "https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec"
          }
        ]
      }
    ]
  },
  {
    title: "Browser Cache and Cookie Cleanup",
    description: "Use these browser-specific steps when a site looks stale, loops on sign-in, or behaves differently than expected. Clearing cookies usually signs you out, so save your work first.",
    items: [
      {
        title: "Clear cache and cookies in Google Chrome",
        text: "Chrome keeps cached files and cookies to speed up websites, but stale site data can also cause sign-in loops or old pages to keep loading.",
        fixes: [
          "Open Chrome, then select More > Delete browsing data.",
          "Choose a time range that matches the problem, such as Last hour or All time.",
          "Select Cookies and other site data and Cached images and files.",
          "Select Delete data, then reopen the affected site and sign back in if needed."
        ],
        links: [
          {
            label: "Delete, allow and manage cookies in Chrome",
            url: "https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en"
          }
        ]
      },
      {
        title: "Clear browsing data in Microsoft Edge",
        text: "Edge stores history, cookies, and cached files per browser profile, so make sure you are working in the correct profile before you clear anything.",
        fixes: [
          "Open Edge, then select Settings and more > Settings > Privacy, search, and services.",
          "Under Clear browsing data, select Choose what to clear.",
          "Pick the time range you need, then select cookies or cached files based on the issue you are troubleshooting.",
          "Select Clear now, then reopen the work site and sign back in if the site asks for it."
        ],
        links: [
          {
            label: "Clear browsing history from your device in Microsoft Edge",
            url: "https://support.microsoft.com/en-us/windows/browsing-history-on-the-privacy-dashboard-550e772a-04c9-3e9a-3ec0-762519df5e11"
          }
        ]
      },
      {
        title: "Clear cookies and cache in Mozilla Firefox",
        text: "Firefox lets you clear cookies and cache separately, which is useful when you want to keep one type of data but remove the other.",
        fixes: [
          "Open Firefox and go to Settings > Privacy & Security.",
          "In Cookies and Site Data, select Clear Data.",
          "To clear cache only, leave only Temporary cached files and pages selected.",
          "To clear cookies too, include Cookies and site data, then confirm and reopen the affected site."
        ],
        links: [
          {
            label: "How to clear the Firefox cache",
            url: "https://support.mozilla.org/en-US/kb/how-clear-firefox-cache"
          },
          {
            label: "Clear cookies and site data in Firefox",
            url: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
          }
        ]
      },
      {
        title: "Clear Safari site data on Mac or iPhone",
        text: "Safari cleanup steps are a little different on Mac versus iPhone or iPad, so use the steps that match your device.",
        fixes: [
          "On a Mac, open Safari > Settings > Privacy > Manage Website Data, then remove one site or remove all website data.",
          "On iPhone or iPad, go to Settings > Safari > Clear History and Website Data to clear history, cookies, and cache together.",
          "If you want to keep Safari history on iPhone or iPad, go to Settings > Safari > Advanced > Website Data and remove the website data instead.",
          "After cleanup, reopen the site and sign back in if Safari prompts you."
        ],
        links: [
          {
            label: "Clear your cache and cookies in Safari on Mac",
            url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
          },
          {
            label: "Delete your Safari history, cache, and cookies on iPhone",
            url: "https://support.apple.com/en-us/105082"
          }
        ]
      }
    ]
  },
  {
    title: "Common App Tips That Help Across Many Products",
    description: "Use these habits across Outlook, Teams, OneDrive, SharePoint, Citrix Workspace, PDF apps, engineering tools, and other work software before you jump to bigger repairs.",
    items: [
      {
        title: "Keep the app name, version, and one affected item ready",
        text: "Support goes much faster when you can name the exact app, version or year, and the file, project, mailbox, site, or library involved.",
        fixes: [
          "Write down the exact app name and version or year shown in the app if you can open it.",
          "Keep the file name, project name, mailbox, site URL, or library name involved in the problem.",
          "If the issue began after an update, password change, restart, or new computer, mention that timing when you contact support."
        ],
        links: [
          {
            label: "Open App Help",
            url: "vendor-guides.html",
            external: false
          }
        ]
      },
      {
        title: "Compare the problem to a second path before bigger changes",
        text: "A quick comparison often shows whether the issue belongs to one file, one account, one computer, or the whole app.",
        fixes: [
          "If a browser version exists, compare the browser version to the desktop app before reinstalling or clearing local data.",
          "If one file or project fails, test a second known-good one before assuming the whole app is broken.",
          "If the same work can be tested on another approved computer, keep that comparison ready for support."
        ],
        links: [
          {
            label: "Search the help center",
            url: "search.html",
            external: false
          }
        ]
      },
      {
        title: "Do not clear local data until you know the source of truth",
        text: "Apps that sync files, use shared projects, or keep local caches can lose important context if you clear data too early.",
        fixes: [
          "For OneDrive and SharePoint, use the browser as the source of truth before you reset the sync app.",
          "For engineering or project apps, note the project folder and version before moving or deleting local files.",
          "If the app uses shared mailboxes, shared libraries, or shared project data, mention that before you try a reinstall."
        ],
        links: [
          {
            label: "Licensing Help",
            url: "app-licensing.html",
            external: false
          }
        ]
      }
    ]
  },
  {
    title: "Quick Habits by App Family",
    description: "Use these customer-safe reminders when you already know the app family you are working in and want the best first step without making bigger changes too early.",
    items: [
      {
        title: "Microsoft apps: Outlook, Teams, OneDrive, SharePoint, and Authenticator",
        text: "Microsoft problems are often easier to narrow down when you compare the browser version, the desktop or mobile app, and the exact work account in use.",
        fixes: [
          "If Outlook, Teams, OneDrive, or SharePoint behave differently in the browser than in the desktop app, mention that difference before you reset anything.",
          "Keep the work account email, the exact mailbox, team, site, or library name, and whether the issue began after a password or phone change.",
          "For Outlook Mobile, Teams Mobile, and Microsoft Authenticator, make sure the phone has network access, notifications, and the correct work account before you remove the app."
        ],
        links: [
          {
            label: "Open App Help",
            url: "vendor-guides.html",
            external: false
          }
        ]
      },
      {
        title: "PDF and publishing apps: Acrobat, Bluebeam, and InDesign",
        text: "PDF and publishing problems often come from one file, one font set, one linked asset, or one sign-in profile rather than the entire app being broken.",
        fixes: [
          "If Acrobat, Bluebeam, or InDesign opens but one file fails, test a second file first so support can tell whether the issue follows the file or the app.",
          "For InDesign, keep the document name, missing font name, or linked-image warning ready if you see one.",
          "If the app opens as Reader, Trial, or a lower feature level than expected, note the exact message before signing out or updating."
        ],
        links: [
          {
            label: "Open Adobe guides",
            url: "guides/adobe.html",
            external: false
          },
          {
            label: "Open Bluebeam guide",
            url: "guides/bluebeam/revu-21.html",
            external: false
          }
        ]
      },
      {
        title: "Engineering and project apps: AutoCAD, Revit, Civil 3D, ArcGIS Pro, ProjectWise, InfoWorks ICM, Primavera P6, Google Earth Pro, HEC, MCTRANS, and Axiom",
        text: "Engineering tools are often sensitive to version or release year, one specific project or study, and the exact folder, database, or datasource behind the work.",
        fixes: [
          "Keep the exact app version or release year, the project or study name, and where the data is stored before you contact support.",
          "If another approved computer can open the same project, study, or drawing, mention that comparison because it helps separate an app problem from a file or path problem.",
          "If the issue began after a new computer, update, or moving project data, say that up front instead of only describing the final error."
        ],
        links: [
          {
            label: "Open App Help",
            url: "vendor-guides.html#application-directory",
            external: false
          },
          {
            label: "Open licensing help",
            url: "app-licensing.html",
            external: false
          }
        ]
      },
      {
        title: "Remote access apps: Citrix Workspace and FortiClient VPN",
        text: "Remote-access issues are usually about the connection path, the company sign-in, or one published app or internal resource, not the whole computer at once.",
        fixes: [
          "If Citrix or FortiClient starts but one published app, desktop, or internal resource still fails, keep that exact resource name ready for support.",
          "If the remote-access app uses a browser step, complete that step fully and note whether the browser itself showed an error.",
          "If the issue started after a password reset or MFA change, mention that before you remove the client or the VPN profile."
        ],
        links: [
          {
            label: "Open PC Help",
            url: "computer-issues.html",
            external: false
          },
          {
            label: "Open App Help",
            url: "vendor-guides.html",
            external: false
          }
        ]
      }
    ]
  },
  {
    title: "Safe Cleanup and Disk Space",
    description: "Use these cleanup tips when Windows is low on space or a browser or app seems stuck on old temporary data. The safest first choice is still Windows Storage and Cleanup Recommendations.",
    items: [
      {
        title: "Clear temporary files safely",
        text: "If you need a quick manual cleanup, start with temporary files rather than deleting random folders.",
        fixes: [
          "Close the apps you are using first so fewer temporary files stay locked.",
          "Press Windows + R, enter %temp%, and remove only the files Windows allows you to delete.",
          "Skip anything Windows says is still in use instead of forcing it.",
          "If you want the safest first pass, use Settings > System > Storage and start with Cleanup Recommendations or Storage Sense before deleting folders by hand."
        ],
        links: [
          {
            label: "Manage drive space with Storage Sense",
            url: "https://support.microsoft.com/en-au/windows/manage-drive-space-with-storage-sense-654f6ada-7bfc-45e5-966b-e24aded96ad5"
          }
        ]
      },
      {
        title: "Be careful with AppData and Local AppData",
        text: "AppData stores app settings, cached data, and offline content. Deleting the whole AppData or AppData\\Local folder can remove saved state and break app behavior.",
        fixes: [
          "Do not delete the entire AppData or AppData\\Local folder.",
          "Only clear an app-specific cache when that app's own guide or support instructions say it is safe.",
          "If your goal is reclaiming space, check Downloads, Recycle Bin, browser data, temporary files, and cloud sync settings first.",
          "If you are unsure what a folder belongs to, stop there and use the app guide or contact page before removing it."
        ],
        links: [
          {
            label: "Free up drive space in Windows",
            url: "https://support.microsoft.com/en-us/windows/free-up-drive-space-in-windows-85529ccb-c365-490d-b548-831022bc9b32"
          }
        ]
      },
      {
        title: "Use Windows tools first when disk space is low",
        text: "Windows already has built-in storage tools that are safer than deleting folders manually.",
        fixes: [
          "Open Settings > System > Storage to see what is using the most space.",
          "Review Cleanup Recommendations and remove large items you no longer need, such as temporary files or old Recycle Bin content.",
          "Turn on Storage Sense if you want Windows to clean up temporary files automatically when space gets low.",
          "Check OneDrive or other cloud folders too, because locally available files can use a lot of space even when they are synced to the cloud."
        ],
        links: [
          {
            label: "Free up drive space in Windows",
            url: "https://support.microsoft.com/en-us/windows/free-up-drive-space-in-windows-85529ccb-c365-490d-b548-831022bc9b32"
          },
          {
            label: "Manage drive space with Storage Sense",
            url: "https://support.microsoft.com/en-au/windows/manage-drive-space-with-storage-sense-654f6ada-7bfc-45e5-966b-e24aded96ad5"
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
