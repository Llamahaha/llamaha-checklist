import { buildAppGuideUrl, getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getPublicGuideContent } from "./guides/publicGuideContent.js";
import { computerIssueSections, tipsAndTricksSections } from "./supportData.js";

const hiddenAppHelpVendors = new Set(["browsers", "quickbooks"]);
const hiddenAppHelpApps = new Set(["outlook-mobile", "teams-mobile"]);

function getApp(vendorSlug, appSlug) {
  return getVendorApplications(vendorSlug).find(app => app.slug === appSlug) ?? null;
}

function getSummary(vendorSlug, appSlug, fallback = "") {
  const publicGuide = getPublicGuideContent(vendorSlug, appSlug);
  const app = getApp(vendorSlug, appSlug);
  return publicGuide.summary ?? app?.summary ?? app?.focus ?? fallback;
}

function buildAppEntry(vendorSlug, appSlug, overrides = {}) {
  const app = getApp(vendorSlug, appSlug);
  const vendor = vendorGuides[vendorSlug];
  if (!app || !vendor) {
    return null;
  }

  return {
    vendorSlug,
    vendorTitle: vendor.title,
    appSlug,
    name: app.name,
    url: buildAppGuideUrl(vendorSlug, appSlug),
    summary: overrides.summary ?? getSummary(
      vendorSlug,
      appSlug,
      `Open this guide when ${app.name} will not sign in, open what you expect, or behave normally for everyday work.`
    ),
    keywords: overrides.keywords ?? `${vendor.title} ${app.name} ${app.focus ?? ""}`
  };
}

function extraPcItems() {
  return {
    "Cloud PCs and Remote Windows Access": [
      {
        title: "Local devices, clipboard, or printers do not show in your Cloud PC",
        text: "If you can reach the Cloud PC but local devices are missing, the session path or the local computer usually needs to refresh before you change the business app inside the Cloud PC.",
        fixes: [
          "Disconnect from the Cloud PC once and reconnect from the same Windows App or browser session.",
          "Check whether the issue is only with one local device, such as the printer or clipboard, or whether every redirected device is missing.",
          "If only one business app inside the Cloud PC cannot see the printer or clipboard, open that app's guide before assuming the whole Cloud PC is broken.",
          "Keep the local device name and the Cloud PC name ready if you contact support."
        ],
        links: [
          {
            label: "Windows App device actions",
            url: "https://learn.microsoft.com/en-us/windows-app/device-actions"
          },
          {
            label: "Access a Cloud PC",
            url: "https://learn.microsoft.com/en-us/windows-365/end-user-access-cloud-pc"
          }
        ]
      }
    ],
    "Network, VPN, and Shared Access": [
      {
        title: "A work website opens, but shared access still fails",
        text: "If normal websites work but a shared drive, internal site, or company-only tool does not, the network path or VPN connection usually matters more than the browser itself.",
        fixes: [
          "Check whether the same resource works on VPN, off VPN, or from the Cloud PC before you change your local computer.",
          "If one mapped path fails, compare it with a second company path if one is available.",
          "If the problem began after a password change, sign back into the VPN or shared resource with the current work password.",
          "If Citrix Workspace or another remote desktop path still works, note that because it helps support narrow the network scope quickly."
        ],
        links: [
          {
            label: "Fix network connection issues in Windows",
            url: "https://support.microsoft.com/en-us/windows/fix-network-connection-issues-in-windows-10-166a28c4-14c1-bdb1-473c-09c1571455d8"
          },
          {
            label: "Open Citrix Workspace guide",
            url: "guides/citrix/workspace-app.html",
            external: false
          }
        ]
      }
    ],
    "Performance, Storage, and Updates": [
      {
        title: "A recent Windows update changed app or device behavior",
        text: "If the problem started right after Windows updated, it helps to confirm whether the issue affects one app only or several parts of the computer before making larger changes.",
        fixes: [
          "Restart the computer one extra time after the update so Windows can finish any pending setup work.",
          "Compare whether the issue affects only one app or also printing, sign-in, audio, or network behavior.",
          "If the issue is only inside one app, open that app guide before assuming the whole computer needs repair.",
          "Keep the date of the update and the first symptom you noticed when you contact support."
        ],
        links: [
          {
            label: "Fix Windows Update issues",
            url: "https://support.microsoft.com/en-us/windows/windows-update-troubleshooter-19bc41ca-ad72-ae67-af3c-89ce169755dd"
          }
        ]
      }
    ],
    "Printing, Audio, and Sign-in": [
      {
        title: "Install a shared or network printer in Windows 11",
        text: "If the printer is managed by another computer or print server, Windows 11 can connect to it once you know the share path and have permission to use it.",
        fixes: [
          "Open Settings, select Bluetooth and devices, then select Printers and scanners.",
          "Select Add device. If Windows does not find the printer, select Add manually, then select the option to select a shared printer by name.",
          "Enter the UNC path provided by your company, such as \\\\servername\\printername or \\\\ipaddress\\printername.",
          "If Windows prompts for a driver, allow it to download from the print host. Keep the share path and any error wording ready if it fails."
        ],
        links: [
          {
            label: "Add or install a printer in Windows",
            url: "https://support.microsoft.com/en-us/windows/add-or-install-a-printer-in-windows-cc0724cf-793e-3542-d1ff-727e4978638b"
          },
          {
            label: "Fix shared printer connection problems in Windows",
            url: "https://support.microsoft.com/en-us/windows/fix-shared-printer-connection-problems-in-windows-27f7b136-02e6-406a-9a25-fc87838062b8"
          }
        ]
      },
      {
        title: "Audio or microphone defaults change after docking or undocking",
        text: "When you connect or disconnect a dock, Windows often chooses a different default speaker or microphone than the one you want to use for meetings.",
        fixes: [
          "Click the volume icon in the taskbar, then select the arrow next to the volume slider to change the active output device.",
          "For the microphone, open Settings, select System, then Sound, and pick the correct input device under Input.",
          "If Teams still uses the wrong device, open Teams settings and select the device you want under Audio devices so Teams stops following the Windows default.",
          "If only one meeting app is wrong, keep that app name ready for support instead of reinstalling drivers or the whole dock."
        ],
        links: [
          {
            label: "Fix sound or audio problems in Windows",
            url: "https://support.microsoft.com/en-us/help/4026994/windows-10-fix-sound-problems"
          },
          {
            label: "Manage sound settings",
            url: "https://support.microsoft.com/en-us/windows/how-to-manage-sound-settings-7ea6ebdd-7c4d-4354-a60b-e54c1fc10bc9"
          }
        ]
      },
      {
        title: "Dual-monitor layout or window positions reset after docking",
        text: "When you dock, undock, or change displays, Windows may move your windows, change which screen is primary, or rearrange the monitor order.",
        fixes: [
          "Open Settings, select System, then Display. Drag the numbered display boxes so their order matches how the monitors are physically arranged.",
          "Select the display you want as the primary monitor, then select Make this my main display under Multiple displays.",
          "If windows keep moving back to one screen, turn on Remember window locations based on monitor connection in Display > Multiple displays on Windows 11.",
          "If only one app loses its position, close and reopen that app after the monitors are arranged correctly instead of changing display drivers."
        ],
        links: [
          {
            label: "How to use multiple monitors in Windows",
            url: "https://support.microsoft.com/en-us/windows/how-to-use-multiple-monitors-in-windows-329c6962-5a4d-b481-7baa-bec9671f728a"
          }
        ]
      },
      {
        title: "Move Microsoft Authenticator to a new or replacement phone",
        text: "Moving Authenticator is easier when the old phone is still working and you can complete the backup and restore steps in order. If the old phone is lost, your company may need to help reset multi-factor setup.",
        fixes: [
          "On the old phone, open Authenticator, select your account, select the menu, and turn on Cloud Backup (Android) or iCloud Backup (iOS). You can only restore to the same platform, so iOS backups cannot move to Android and the reverse.",
          "On the new phone, install Microsoft Authenticator, then select Restore from backup and sign in with the personal Microsoft account that holds the backup.",
          "Some work accounts require a re-approval step on the new phone. Complete any prompts your company shows before assuming the move failed.",
          "Keep the old phone working and signed in until the new phone approves a real sign-in, then your admin or support can remove the old device registration cleanly."
        ],
        links: [
          {
            label: "Back up your accounts in Microsoft Authenticator",
            url: "https://support.microsoft.com/en-us/authenticator/back-up-your-accounts-in-microsoft-authenticator"
          },
          {
            label: "Restore account credentials from Microsoft Authenticator",
            url: "https://support.microsoft.com/en-us/account-billing/restore-account-credentials-from-microsoft-authenticator-ce53096e-1e1c-4840-9e32-1618bc33cd43"
          }
        ]
      },
      {
        title: "Unable to scan from a scanner or multifunction printer",
        text: "Scanning problems are often caused by the device connection, the Windows Scan app, or the scanner source settings rather than a full printer reinstall.",
        fixes: [
          "Make sure the scanner or multifunction device is powered on and reachable from the computer first.",
          "Confirm whether the scan target is email, a network folder, a desktop scan app, or a cloud workflow.",
          "Use the Windows Scan app or the normal company scanning method instead of guessing which app should receive the scan.",
          "If the scanner has both flatbed and feeder options, confirm the correct source is selected before retrying.",
          "Try one simple scan to the most basic destination before retrying the full workflow.",
          "If printing still works but scanning does not, tell support that difference because it narrows the issue quickly.",
          "Keep the scanner model, destination type, and any panel or desktop error ready."
        ],
        links: [
          {
            label: "Install and use a scanner in Windows",
            url: "https://support.microsoft.com/en-us/windows/install-and-use-a-scanner-in-windows-4fd9f33a-25b6-159a-3cde-3f009b02a81a"
          },
          {
            label: "Fix printer connection and printing problems in Windows",
            url: "https://support.microsoft.com/en-us/windows/fix-printer-connection-and-printing-problems-in-windows-fb830bff-7702-6349-33cd-9443fe987f73"
          }
        ]
      },
      {
        title: "Bluetooth audio, camera, or microphone is wrong in meetings",
        text: "If calls or meetings connect but the wrong speaker, headset, microphone, or camera is used, the local device selection often matters more than the app itself.",
        fixes: [
          "Reconnect the headset or dock once and confirm the device appears correctly in Windows before rejoining the meeting.",
          "If the issue affects Teams only, compare the Windows default device with the device selected inside Teams.",
          "If a Bluetooth device shows connected but silent, test one wired or built-in device to separate the meeting app from the device path.",
          "If only the microphone is failing, check whether Windows still allows microphone access for desktop apps."
        ],
        links: [
          {
            label: "Fix Bluetooth connected but no sound issue on Windows",
            url: "https://support.microsoft.com/en-us/windows/fix-bluetooth-connected-but-no-sound-issue-on-windows-90cf598f-ffdb-426f-b253-bc5cc98a30ea"
          },
          {
            label: "Fix sound or audio problems in Windows",
            url: "https://support.microsoft.com/en-us/help/4026994/windows-10-fix-sound-problems"
          },
          {
            label: "Fix microphone problems in Windows",
            url: "https://support.microsoft.com/en-us/windows/fix-microphone-problems-5f230348-106d-bfa4-1db5-336f35576011"
          }
        ]
      }
    ]
  };
}

function createDefaultsAndEmailSection() {
  return {
    title: "Default Apps, Email, and Handoffs",
    description: "Use this section when the wrong app opens a PDF, link, or email, when you need to switch between new Outlook and classic Outlook, or when you need to open a shared or extra mailbox.",
    items: [
      {
        title: "Set the default PDF app in Windows 11",
        text: "If Windows keeps opening PDFs in the wrong app, the default for the .pdf file type usually needs to be updated in Windows settings.",
        fixes: [
          "Open Settings, select Apps, then select Default apps.",
          "Search for the app you want, such as Adobe Acrobat or Bluebeam Revu, and select it.",
          "Find .pdf in the file-type list, select the current default, then choose the app you want to use and select Set default.",
          "If the setting keeps reverting after a Windows update, note the timing for support because feature updates can reset defaults."
        ],
        links: [
          {
            label: "Change default apps in Windows",
            url: "https://support.microsoft.com/en-us/windows/change-default-apps-in-windows-e5d82cad-17d1-c53b-3505-f10a32e1894d"
          },
          { label: "Acrobat guide", url: buildAppGuideUrl("adobe", "acrobat-pro"), external: false },
          { label: "Bluebeam guide", url: buildAppGuideUrl("bluebeam", "revu-21"), external: false }
        ]
      },
      {
        title: "Set the default browser or default email handler",
        text: "Links that open in the wrong browser, or mailto links that open the wrong email app, are usually controlled by Windows default-app settings rather than the browser or Outlook itself.",
        fixes: [
          "Open Settings, select Apps, then select Default apps.",
          "To change the browser, search for the browser you want and use Set default at the top of that app's defaults page.",
          "To change which app opens email links, search for Outlook or your preferred mail app, find mailto in the file-type list, and change the default.",
          "If your company manages defaults through policy, contact support before trying to change them so the policy and the user choice do not fight."
        ],
        links: [
          {
            label: "Change default apps in Windows",
            url: "https://support.microsoft.com/en-us/windows/change-default-apps-in-windows-e5d82cad-17d1-c53b-3505-f10a32e1894d"
          },
          { label: "Outlook guide", url: buildAppGuideUrl("microsoft", "outlook"), external: false }
        ]
      },
      {
        title: "Switch between new Outlook and classic Outlook",
        text: "Windows computers may have both new Outlook and classic Outlook installed. The toggle in the top right of Outlook lets you switch between them, and you can also run both side by side on the same computer.",
        fixes: [
          "In new Outlook, locate the New Outlook toggle in the top-right corner of the window and turn it off to return to classic Outlook.",
          "In classic Outlook, if the Try the new Outlook toggle appears in the top-right, selecting it will install and launch new Outlook.",
          "Complete any feedback prompt or skip it, and let Outlook restart fully before you judge whether the switch worked.",
          "If one version is missing features you expect, keep the exact feature name ready for support because new Outlook and classic Outlook still differ on some workflows."
        ],
        links: [
          {
            label: "Toggle out of the new Outlook for Windows",
            url: "https://support.microsoft.com/en-us/office/toggle-out-of-the-new-outlook-for-windows-ec102b39-5727-418e-ae1f-a1805434640c"
          },
          {
            label: "Switch to new Outlook for Windows",
            url: "https://support.microsoft.com/en-us/office/switch-to-new-outlook-for-windows-f5fb9e26-af7c-4976-9274-61c6428344e7"
          },
          {
            label: "Run new Outlook and classic Outlook side-by-side",
            url: "https://support.microsoft.com/en-us/office/run-new-outlook-and-classic-outlook-side-by-side-a624c36d-c50f-43bc-9c8b-dd17b5690ffb"
          }
        ]
      },
      {
        title: "Shared mailbox access in Outlook",
        text: "Shared mailboxes usually appear automatically after your admin adds you as a member, but you can also add one by name if it does not appear right away.",
        fixes: [
          "Close and reopen Outlook after your admin has added you to the shared mailbox. Most shared mailboxes appear under your account within a few minutes.",
          "Check Outlook on the web to see whether the mailbox appears there before rebuilding the desktop app.",
          "In new Outlook, right-click your account name in the folder list and select Add shared folder or mailbox. Enter the shared mailbox address your company provided.",
          "In classic Outlook, select File > Account Settings > Account Settings, then open your account on the Email tab and use More Settings > Advanced > Add to add the mailbox.",
          "If the mailbox still does not appear, keep its address ready and contact support so they can confirm whether you need read access, Send As, Send on Behalf, calendar access, or all of those."
        ],
        links: [
          {
            label: "Open and use a shared mailbox in Outlook",
            url: "https://support.microsoft.com/en-us/office/open-and-use-a-shared-mailbox-in-outlook-d94a8e9e-21f1-4240-808b-de9c9c088afd"
          },
          {
            label: "Manage shared mailbox settings in new Outlook",
            url: "https://support.microsoft.com/en-us/office/manage-shared-mailbox-settings-in-new-outlook-f6929a97-4fc6-4a52-b77d-5e596c6322b4"
          },
          { label: "Outlook guide", url: buildAppGuideUrl("microsoft", "outlook"), external: false }
        ]
      },
      {
        title: "Add a secondary account or an archive mailbox in Outlook",
        text: "If you need a second work account, a personal account, or an online archive showing in Outlook, the steps depend on which Outlook version you are using and which account type your company allows.",
        fixes: [
          "In new Outlook, select Settings, then Accounts, and use Add account to add another mailbox your company permits.",
          "In classic Outlook, select File > Add Account and sign in with the account you need. Online Archive mailboxes usually appear automatically when assigned and may take time to populate.",
          "If an online archive is expected but not appearing, confirm with support that your account has the archive feature enabled before changing any Outlook settings.",
          "If your company restricts which accounts can be added, contact support instead of repeatedly retrying a sign-in that will be blocked by policy."
        ],
        links: [
          {
            label: "Add an email account to Outlook",
            url: "https://support.microsoft.com/en-us/office/add-an-email-account-to-outlook-6e27792a-9267-4aa4-8bb6-c84ef146101b"
          },
          {
            label: "Getting started with the new Outlook for Windows",
            url: "https://support.microsoft.com/en-us/office/getting-started-with-the-new-outlook-for-windows-656bb8d9-5a60-49b2-a98b-ba7822bc7627"
          },
          { label: "Outlook guide", url: buildAppGuideUrl("microsoft", "outlook"), external: false }
        ]
      }
    ]
  };
}

function createMobileAndMfaSection() {
  return {
    title: "Mobile, MFA, and Phone Replacement",
    description: "Use this section when work apps, Microsoft Authenticator, MFA prompts, or mobile notifications need to move to a new phone or start working again.",
    items: [
      {
        title: "Phone replacement for work apps and MFA",
        text: "Phone replacements go smoother when you keep the old phone status, work account, Authenticator setup, Outlook Mobile, Teams Mobile, and notification permissions clear from the start.",
        fixes: [
          "Keep the old phone available until the new phone completes a real work sign-in, if you still have the old phone.",
          "Install Microsoft Authenticator first if your company uses MFA prompts, number matching, or QR-code setup.",
          "Install Outlook Mobile and Teams Mobile only after the sign-in approval path is working.",
          "Use the same work account you use on your computer and in the browser.",
          "Allow notifications for Authenticator, Outlook, and Teams if you expect approval prompts, mail alerts, meeting alerts, or chat notifications.",
          "Remember that some Authenticator backups restore only to the same phone platform, so iPhone-to-Android or Android-to-iPhone moves may need admin-assisted setup.",
          "Keep the phone type, old-phone status, failing setup step, and whether browser sign-in still works ready for support."
        ],
        links: [
          { label: "Microsoft Authenticator guide", url: buildAppGuideUrl("microsoft", "microsoft-authenticator"), external: false },
          { label: "Outlook guide", url: buildAppGuideUrl("microsoft", "outlook"), external: false },
          { label: "Teams guide", url: buildAppGuideUrl("microsoft", "teams"), external: false }
        ]
      }
    ]
  };
}

function createFilesAndHandoffsSection() {
  return {
    title: "Files, Shared Access, and Device Handoffs",
    description: "Use this section when shared access, deleted files, Teams voicemail ownership, or a reassigned computer needs a clean handoff.",
    items: [
      {
        title: "Restoring deleted or overwritten files",
        text: "File recovery goes faster when you know where the file lived, when it changed, and whether you need the latest copy or a previous version.",
        fixes: [
          "Identify where the file lived: OneDrive, SharePoint, a network share, local disk, ProjectWise, Egnyte, or another app.",
          "Capture the exact file name and folder path before searching different places.",
          "Estimate when the file was deleted, overwritten, or last known good.",
          "Check the closest recycle bin or version history first if you can safely do so.",
          "Do not save new files over the same location if you are trying to recover a previous version.",
          "If project or finance data is involved, confirm who owns the restore decision before replacing anything."
        ],
        links: [
          { label: "OneDrive guide", url: buildAppGuideUrl("microsoft", "onedrive"), external: false },
          { label: "SharePoint guide", url: buildAppGuideUrl("microsoft", "sharepoint"), external: false },
          { label: "ProjectWise guide", url: buildAppGuideUrl("bentley", "projectwise"), external: false }
        ]
      },
      {
        title: "Teams shared voicemail setup or access",
        text: "Shared voicemail in Teams works best when the number, queue, mailbox target, and people who need access are agreed on before changes begin.",
        fixes: [
          "Confirm the phone number, call queue, auto attendant, or shared workflow that should receive voicemail.",
          "Identify who owns the voicemail and who should be able to listen or receive notifications.",
          "Confirm whether the voicemail should land in a shared mailbox, group mailbox, Teams Phone workflow, or another approved company path.",
          "Test one inbound call after setup and confirm the message lands in the expected place.",
          "Avoid creating a one-off workaround until ownership and access are clear.",
          "Keep the target number or queue, people who need access, mailbox destination, and one example call time ready if voicemail is not arriving."
        ],
        links: [
          { label: "Teams guide", url: buildAppGuideUrl("microsoft", "teams"), external: false },
          { label: "Microsoft app issues", url: "microsoft-issues.html#teams-onedrive-and-sharepoint", external: false }
        ]
      },
      {
        title: "Reassigning a computer to another user",
        text: "A reassigned computer should not carry old ownership, local-only data, stale app state, or missing day-one access into the next user's setup.",
        fixes: [
          "Confirm whether the computer should be wiped, rebuilt, or reassigned in place.",
          "Check for local-only files, browser data, Outlook archives, offline OneDrive files, checked-out project files, or app templates before cleanup.",
          "Confirm the old owner, new owner, computer name, and whether the device stays in the same company or location.",
          "Make sure required apps, printers, VPN, and shared resources are tested with the new user.",
          "Confirm the old user no longer appears as the active owner in the places your company tracks devices.",
          "Document any preserved data, templates, or exceptions that intentionally carried forward."
        ],
        links: [
          { label: "PC Help", url: "computer-issues.html", external: false },
          { label: "App Help", url: "vendor-guides.html", external: false }
        ]
      }
    ]
  };
}

function createBrowserSupportSection() {
  return {
    title: "Browser Support",
    description: "Use this section when a work site behaves differently in one browser, downloads do not start, or a sign-in page keeps looping in Chrome, Edge, Firefox, or Safari.",
    items: [
      {
        title: "A work site works in one browser but not another",
        text: "A quick browser comparison is one of the safest ways to tell whether the issue belongs to the site, your sign-in session, or the browser you are using.",
        fixes: [
          "Retry the same URL in a second supported browser before clearing settings in the first one.",
          "If only one browser fails, restart that browser and note the exact profile or account being used there.",
          "If the site depends on a download or open-in-app action, keep the exact file type and site URL ready for support.",
          "If the same site also fails inside a Cloud PC or Citrix session, mention that so support can separate local-browser issues from broader access problems."
        ],
        links: [
          { label: "Chrome guide", url: buildAppGuideUrl("browsers", "google-chrome"), external: false },
          { label: "Edge guide", url: buildAppGuideUrl("browsers", "microsoft-edge"), external: false },
          { label: "Firefox guide", url: buildAppGuideUrl("browsers", "mozilla-firefox"), external: false },
          { label: "Safari guide", url: buildAppGuideUrl("browsers", "apple-safari"), external: false }
        ]
      },
      {
        title: "A sign-in page loops or never finishes",
        text: "Sign-in loops usually come from saved site data, the wrong browser profile, or the site opening with the wrong account context.",
        fixes: [
          "Confirm you are using the browser profile or account your company expects for work browsing.",
          "Restart the browser, then retry the sign-in page before clearing cookies or cached files.",
          "If the same sign-in works in another browser, keep that comparison because it helps support narrow the issue quickly.",
          "If the site uses Microsoft 365, Adobe, or another work sign-in, note which account or profile appeared."
        ],
        links: [
          {
            label: "Open Tips & Tricks browser cleanup",
            url: "tips-and-tricks.html#browser-cache-and-cookie-cleanup",
            external: false
          },
          { label: "Chrome cookie and site data help", url: "https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en" },
          { label: "Firefox clear cache", url: "https://support.mozilla.org/en-US/kb/how-clear-firefox-cache" },
          { label: "Safari website data", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" }
        ]
      },
      {
        title: "Downloads or open-in-app actions do not work",
        text: "When a browser opens the site correctly but downloads or open-in-app actions fail, it usually helps to confirm whether the file downloads at all before changing the desktop app.",
        fixes: [
          "Test one simple download first and note whether the browser saves the file or blocks it completely.",
          "If the problem is tied to SharePoint or OneDrive open-in-app behavior, compare the browser open versus the desktop app handoff.",
          "If an .ica file, PDF, or Office file downloads but does not open, keep the file type and browser name ready.",
          "If the same download works in another browser, mention that before you change local app settings."
        ],
        links: [
          { label: "SharePoint guide", url: buildAppGuideUrl("microsoft", "sharepoint"), external: false },
          { label: "Citrix Workspace guide", url: buildAppGuideUrl("citrix", "workspace-app"), external: false },
          { label: "Acrobat guide", url: buildAppGuideUrl("adobe", "acrobat-pro"), external: false }
        ]
      }
    ]
  };
}

function createPublicPcHelpSections() {
  const extras = extraPcItems();
  const extended = computerIssueSections.map(section => ({
    ...section,
    items: [...section.items, ...(extras[section.title] ?? [])]
  }));

  return [
    extended[0],
    createBrowserSupportSection(),
    createDefaultsAndEmailSection(),
    createMobileAndMfaSection(),
    createFilesAndHandoffsSection(),
    ...extended.slice(1)
  ];
}

function createPublicTipsSections() {
  const extraSections = [
    {
      title: "Microsoft 365 Shortcuts: Outlook, Excel, Word, and Teams",
      description: "Use these Microsoft 365 habits and shortcuts when you want to move faster in the apps you use every day. The shortcuts below come from Microsoft's current keyboard shortcut and help guidance.",
      items: [
        {
          title: "Outlook shortcuts that save time on email",
          text: "These shortcuts work in both classic Outlook and new Outlook for Windows for everyday mail handling.",
          fixes: [
            "Press Ctrl + N to start a new email while you are in the Mail view.",
            "Press Ctrl + R to reply and Ctrl + Shift + R to reply all.",
            "Press Ctrl + Enter to send the message you are writing.",
            "Press Ctrl + 1 to switch to Mail, Ctrl + 2 for Calendar, and Ctrl + 3 for People.",
            "Press Ctrl + E or F3 to jump into the search box to find a message quickly."
          ],
          links: [
            {
              label: "Keyboard shortcuts for Outlook",
              url: "https://support.microsoft.com/en-us/office/keyboard-shortcuts-for-outlook-3cdeb221-7ae5-4c1d-8c1d-9e63216c1efd"
            },
            { label: "Outlook guide", url: "guides/microsoft/outlook.html", external: false }
          ]
        },
        {
          title: "Outlook habits that reduce mailbox noise",
          text: "A few small habits cut down on overflowing inboxes and lost messages without needing rules or add-ins.",
          fixes: [
            "Use Focused Inbox so Outlook separates everyday mail from newsletters and notifications.",
            "Right-click a newsletter and use Block or Unsubscribe instead of deleting it over and over.",
            "Use the @ mention feature in the body of an email to make sure someone sees they are needed.",
            "Add a scheduled reminder to an email by flagging it, then setting a follow-up date.",
            "If you use both classic and new Outlook, pick one as your daily driver and keep signatures in sync."
          ],
          links: [
            {
              label: "Use Focused Inbox for Outlook",
              url: "https://support.microsoft.com/en-us/office/focused-inbox-for-outlook-f445ad7f-02f4-4294-a82e-71d8964e3978"
            },
            {
              label: "Use @mentions to get someone's attention",
              url: "https://support.microsoft.com/en-us/office/use-mentions-to-get-someone-s-attention-in-outlook-90701709-5dc1-41c7-aa48-b01d4a46e8c7"
            }
          ]
        },
        {
          title: "Excel shortcuts that speed up everyday work",
          text: "These Excel shortcuts come up often in CAD and engineering spreadsheets for quick editing and review.",
          fixes: [
            "Press Ctrl + Arrow key to jump to the edge of a data region quickly.",
            "Press Ctrl + Shift + Arrow key to select from the current cell to the edge of the data.",
            "Press Ctrl + T to turn a range into an Excel table that grows with your data.",
            "Press Alt + = to insert an AutoSum for the selected range.",
            "Press F4 to repeat the last action, or to toggle between absolute and relative cell references when editing a formula."
          ],
          links: [
            {
              label: "Keyboard shortcuts in Excel",
              url: "https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f"
            }
          ]
        },
        {
          title: "Excel habits that reduce rework",
          text: "These habits pay off on large sheets and when other people review or reopen the same workbook.",
          fixes: [
            "Use Freeze Panes under View when you scroll through big spreadsheets so header rows stay visible.",
            "Use Tables (Ctrl + T) so formulas, formatting, and named references extend automatically when new rows are added.",
            "Use Flash Fill (Ctrl + E) to reformat names, phone numbers, or other patterned data without writing formulas.",
            "Turn on AutoSave when the file is stored in OneDrive or SharePoint so versions are kept without manual saves.",
            "Use Find and Replace (Ctrl + H) carefully, and test one replacement before using Replace All."
          ],
          links: [
            {
              label: "Freeze panes to lock rows and columns",
              url: "https://support.microsoft.com/en-us/office/freeze-panes-to-lock-rows-and-columns-dab2ffc9-020d-4026-8121-67dd25f2508f"
            },
            {
              label: "Use Flash Fill in Excel",
              url: "https://support.microsoft.com/en-us/office/using-flash-fill-in-excel-3f9bcf1e-db93-4890-94a0-1578341f73f7"
            }
          ]
        },
        {
          title: "Word shortcuts for faster editing",
          text: "These Word shortcuts are useful when you are writing proposals, specs, or reports and want to stay on the keyboard.",
          fixes: [
            "Press Ctrl + Shift + C to copy formatting and Ctrl + Shift + V to paste formatting onto other text.",
            "Press Ctrl + K to insert a hyperlink on the selected text.",
            "Press Shift + F3 to toggle selected text between lowercase, uppercase, and title case.",
            "Press Ctrl + Enter to insert a page break without typing extra blank lines.",
            "Press Ctrl + Z to undo and Ctrl + Y to redo when an auto-correction changes something unexpectedly."
          ],
          links: [
            {
              label: "Keyboard shortcuts in Word",
              url: "https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-word-95ef89dd-7142-4b50-afb2-f762f663ceb2"
            }
          ]
        },
        {
          title: "Word habits that keep documents consistent",
          text: "A few habits keep long documents readable and easier for other reviewers to work in.",
          fixes: [
            "Use Styles (Heading 1, Heading 2, Body) instead of changing fonts manually so the document structure stays consistent.",
            "Turn on Show/Hide (¶) when a section will not line up so you can see hidden tabs, spaces, or page breaks.",
            "Use Insert > Table of Contents when Heading styles are in place so the TOC updates automatically.",
            "If you need to collaborate, use Track Changes and let Word record edits instead of retyping sections.",
            "When a document is stored in OneDrive or SharePoint, use AutoSave so you do not lose work after a crash."
          ],
          links: [
            {
              label: "Customize or create new styles in Word",
              url: "https://support.microsoft.com/en-us/office/customize-or-create-new-styles-d38d6e47-f6fc-48eb-a607-1eb120dec563"
            },
            {
              label: "Track changes in Word",
              url: "https://support.microsoft.com/en-us/office/track-changes-in-word-197ba630-0f5f-4a8e-9a77-3712475e806a"
            }
          ]
        },
        {
          title: "Teams shortcuts for meetings and chat",
          text: "Keep these shortcuts handy when Teams is open all day on a busy workstation.",
          fixes: [
            "Press Ctrl + E to jump to the Teams search or command bar at the top of the app.",
            "Press Ctrl + Shift + M to toggle mute on or off during a Teams call.",
            "Press Ctrl + Shift + O to toggle your camera on or off during a Teams call.",
            "Press Ctrl + N to start a new chat from anywhere in the app.",
            "Press Ctrl + . (period) to open the Teams keyboard shortcuts list from inside the app."
          ],
          links: [
            {
              label: "Keyboard shortcuts for Microsoft Teams",
              url: "https://support.microsoft.com/en-us/office/keyboard-shortcuts-for-microsoft-teams-2e8e2a70-e8d8-4a19-949b-4c36dd5292d2"
            }
          ]
        },
        {
          title: "Teams meeting habits that prevent common issues",
          text: "Most Teams meeting problems come from the wrong audio device, wrong account, or a second Teams window competing for the call.",
          fixes: [
            "Before joining, check which microphone, speaker, and camera Teams is set to use under Settings > Devices.",
            "Use Background effects or blur before the camera turns on if you are joining from home or a shared space.",
            "Use raise hand, reactions, or chat to interrupt without talking over other people in large meetings.",
            "If audio breaks up, switch to Windows default audio for one meeting and compare before reinstalling anything.",
            "Keep only one Teams window active. Multiple Teams installs or tenants open at the same time can cause audio to follow the wrong client."
          ],
          links: [
            {
              label: "Join a Teams meeting",
              url: "https://support.microsoft.com/en-us/office/join-a-meeting-in-microsoft-teams-1613bb53-f3fa-431e-85a9-d6a91e3468c9"
            },
            {
              label: "Manage audio settings in Teams",
              url: "https://support.microsoft.com/en-us/office/manage-audio-settings-in-a-microsoft-teams-meeting-6ea36f9a-827b-47d6-b22e-ec94d5f0f5e4"
            }
          ]
        }
      ]
    },
    {
      title: "Web Apps and Browser Handoffs",
      description: "Use these habits when a site, sign-in page, downloaded file, or open-in-app workflow behaves differently in one browser or only on one computer.",
      items: [
        {
          title: "Compare one browser before you clear anything",
          text: "If a work site opens in one browser but not another, that comparison usually tells support more than a browser reinstall would.",
          fixes: [
            "Try the same URL in a second supported browser before you clear cookies or remove extensions.",
            "Keep the exact URL, browser name, and whether the issue is sign-in, download, or open-in-app behavior.",
            "If the site also fails inside a Cloud PC or Citrix session, mention that because it changes the support path."
          ],
          links: [
            { label: "Open PC Help browser support", url: "computer-issues.html#browser-support", external: false }
          ]
        },
        {
          title: "If a file downloads but will not open, keep the file type ready",
          text: "Downloaded files often fail because the browser handoff changed, the default app changed, or the file type now opens in the wrong product.",
          fixes: [
            "Note whether the file downloads correctly before you try to open it.",
            "Keep the file type ready, such as PDF, DWG, XLSX, or an .ica launch file.",
            "If a site wants to open the file in an app, compare that with downloading the file first and opening it manually."
          ],
          links: [
            { label: "App Help", url: "vendor-guides.html", external: false },
            { label: "Licensing Help", url: "app-licensing.html", external: false }
          ]
        }
      ]
    },
    {
      title: "Phone and Tablet Setup Habits",
      description: "Use these reminders when work email, Teams, OneDrive, or Authenticator is being set up on a phone or moved to a replacement device.",
      items: [
        {
          title: "Keep the work account and the old-device status clear",
          text: "Phone setup goes faster when you know the exact work account and whether the problem is a first-time setup, a replacement phone, or a password change.",
          fixes: [
            "Use the same work account you already use in the browser or on your computer.",
            "If you changed phones recently, tell support whether the old phone still receives prompts or mail notifications.",
            "Complete company prompts such as approval, device registration, or QR-code steps before you assume the app is broken."
          ],
          links: [
            { label: "Outlook guide", url: buildAppGuideUrl("microsoft", "outlook"), external: false },
            { label: "Teams guide", url: buildAppGuideUrl("microsoft", "teams"), external: false },
            { label: "Microsoft Authenticator guide", url: buildAppGuideUrl("microsoft", "microsoft-authenticator"), external: false }
          ]
        },
        {
          title: "Check phone permissions before reinstalling the app",
          text: "Missing notifications, missing camera access, or broken sign-in prompts are often caused by the phone settings rather than the app install itself.",
          fixes: [
            "Check the phone notification settings and the app's own in-app notification settings.",
            "If meetings or approvals fail, confirm the phone still allows camera, microphone, or QR-code scanning when those steps are needed.",
            "If the app works on Wi-Fi but not on mobile data, mention that before removing the app."
          ],
          links: [
            { label: "Outlook for iOS and Android Help", url: "https://support.microsoft.com/en-us/office/outlook-for-ios-and-android-help-cd84214e-a5ac-4e95-9ea3-e07f78d0cde6" },
            { label: "How to add your accounts to Microsoft Authenticator", url: "https://support.microsoft.com/en-us/account-billing/how-to-add-your-accounts-to-microsoft-authenticator-92544b53-7706-4581-a142-30344a2a2a57" },
            { label: "Sign in and get started with Teams", url: "https://support.microsoft.com/en-us/office/sign-in-and-get-started-with-teams-6723dc43-dbc0-46e6-af49-8a2d1c5cb937" }
          ]
        }
      ]
    }
  ];

  return [...tipsAndTricksSections, ...extraSections];
}

function groupEntries(entries) {
  return entries.map(([vendorSlug, appSlug, summary]) => buildAppEntry(vendorSlug, appSlug, summary ? { summary } : {})).filter(Boolean);
}

function createDirectoryGroups() {
  return vendorOrder
    .filter(vendorSlug => !hiddenAppHelpVendors.has(vendorSlug))
    .map(vendorSlug => {
      const vendor = vendorGuides[vendorSlug];
      const entries = getVendorApplications(vendorSlug)
        .filter(app => !hiddenAppHelpApps.has(app.slug))
        .map(app => buildAppEntry(vendorSlug, app.slug))
        .filter(Boolean);

      return {
        title: vendor.title,
        description: vendor.summary,
        links: [
          {
            label: "Vendor overview",
            url: `guides/${vendorSlug}.html`
          }
        ],
        entries
      };
    })
    .filter(group => group.entries.length);
}

export const publicPcHelpSections = createPublicPcHelpSections();
export const publicTipsSections = createPublicTipsSections();

export const publicAppHelpSections = [
  {
    title: "Popular Applications",
    description: "Start here when you already know the product name and want the fastest path to the guide people open most often.",
    groups: [
      {
        title: "Most-used guides",
        description: "These are the everyday app guides people usually need first.",
        entries: groupEntries([
          ["microsoft", "outlook"],
          ["microsoft", "teams"],
          ["microsoft", "onedrive"],
          ["microsoft", "sharepoint"],
          ["microsoft", "microsoft-authenticator"],
          ["citrix", "workspace-app"],
          ["fortinet", "forticlient-vpn"],
          ["adobe", "acrobat-pro"],
          ["bluebeam", "revu-21"],
          ["autodesk", "autocad"],
          ["autodesk", "revit"],
          ["autodesk", "civil-3d"],
          ["esri", "arcgis-pro"],
          ["bentley", "projectwise"],
          ["oracle", "primavera-p6"]
        ])
      }
    ]
  },
  {
    title: "Collaboration, File Access, and Remote Work",
    description: "Use these guides for email, chat, shared files, remote desktops, VPN access, and the apps that support everyday company access.",
    groups: [
      {
        title: "Microsoft 365 and shared files",
        description: "Email, meetings, shared libraries, personal sync, and sign-in approvals.",
        entries: groupEntries([
          ["microsoft", "outlook", "Use this when Outlook, Outlook on your phone, or shared mailboxes are not behaving the way you expect."],
          ["microsoft", "teams", "Use this for Teams desktop, Teams meetings, Teams on your phone, and Microsoft 365 collaboration."],
          ["microsoft", "onedrive", "Use this for synced files, shared folders, and OneDrive account issues on your computer or phone."],
          ["microsoft", "sharepoint", "Use this for SharePoint sites, libraries, shared files, and open-in-app problems."],
          ["microsoft", "microsoft-authenticator", "Use this for multi-factor prompts, QR-code setup, and phone changes."]
        ])
      },
      {
        title: "Remote access and shared workspaces",
        description: "Use these guides when you reach work apps through a remote desktop, VPN, or published workspace.",
        entries: groupEntries([
          ["citrix", "workspace-app"],
          ["fortinet", "forticlient-vpn"],
          ["egnyte", "egnyte-desktop-app"]
        ])
      }
    ]
  },
  {
    title: "Documents, PDF, and Creative Work",
    description: "Use these guides for PDF editing, markup, review, publishing, and Adobe sign-in or profile issues.",
    groups: [
      {
        title: "PDF and document tools",
        description: "Editing, markup, review, and file-opening workflows.",
        entries: groupEntries([
          ["adobe", "acrobat-pro"],
          ["bluebeam", "revu-21"],
          ["foxit", "pdf-editor"],
          ["foxit", "pdf-reader"]
        ])
      },
      {
        title: "Creative and publishing tools",
        description: "Adobe layout, graphics, and Creative Cloud workflows.",
        entries: groupEntries([
          ["adobe", "creative-cloud-desktop"],
          ["adobe", "photoshop"],
          ["adobe", "illustrator"],
          ["adobe", "indesign"]
        ])
      }
    ]
  },
  {
    title: "Design, Engineering, Mapping, and Projects",
    description: "Use these guides when you work in CAD, GIS, civil, hydraulic, mapping, or project scheduling software and you already know the product name.",
    groups: [
      {
        title: "Autodesk and Bentley apps",
        description: "Core drafting, modeling, project, and infrastructure tools.",
        entries: groupEntries([
          ["autodesk", "autocad"],
          ["autodesk", "revit"],
          ["autodesk", "civil-3d"],
          ["autodesk", "infoworks-icm"],
          ["bentley", "projectwise"],
          ["bentley", "microstation"],
          ["bentley", "connection-client"],
          ["bentley", "openroads-designer"]
        ])
      },
      {
        title: "GIS, water, and transportation tools",
        description: "GIS, hydrology, hydraulics, modeling, and transportation-analysis products.",
        entries: groupEntries([
          ["esri", "arcgis-pro"],
          ["google", "google-earth-pro"],
          ["hec", "hec-hms"],
          ["hec", "hec-ras"],
          ["hec", "hec-dssvue"],
          ["mctrans", "hcs"],
          ["mctrans", "hss"],
          ["axiom", "axiom"]
        ])
      },
      {
        title: "Planning, math, and business applications",
        description: "Scheduling, worksheets, and field tools that still need product-specific support steps.",
        entries: groupEntries([
          ["oracle", "primavera-p6"],
          ["ptc", "mathcad-prime"],
          ["trimble", "sketchup"],
          ["trimble", "trimble-business-center"]
        ])
      }
    ]
  },
  {
    title: "Full Application Directory",
    description: "Use the full directory when you want to browse every supported public application by vendor.",
    groups: createDirectoryGroups()
  }
];
