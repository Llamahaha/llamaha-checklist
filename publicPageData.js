import { buildAppGuideUrl, getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { getPublicGuideContent } from "./guides/publicGuideContent.js";
import { computerIssueSections, tipsAndTricksSections } from "./supportData.js";

const hiddenAppHelpVendors = new Set(["browsers"]);
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
        title: "Unable to scan from a scanner or multifunction printer",
        text: "Scanning problems are often caused by the device connection, the Windows Scan app, or the scanner source settings rather than a full printer reinstall.",
        fixes: [
          "Make sure the scanner or multifunction device is powered on and reachable from the computer first.",
          "Use the Windows Scan app or the normal company scanning method instead of guessing which app should receive the scan.",
          "If the scanner has both flatbed and feeder options, confirm the correct source is selected before retrying.",
          "If printing still works but scanning does not, tell support that difference because it narrows the issue quickly."
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

  return [extended[0], createBrowserSupportSection(), ...extended.slice(1)];
}

function createPublicTipsSections() {
  const extraSections = [
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
            { label: "How to add your accounts to Microsoft Authenticator", url: "https://support.microsoft.com/en-us/authenticator/how-to-add-your-accounts-to-microsoft-authenticator" },
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
          ["egnyte", "egnyte-desktop-app"],
          ["quickbooks", "quickbooks-online"]
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
        description: "Scheduling, worksheets, and finance tools that still need product-specific support steps.",
        entries: groupEntries([
          ["oracle", "primavera-p6"],
          ["ptc", "mathcad-prime"],
          ["quickbooks", "quickbooks-enterprise-desktop"],
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

