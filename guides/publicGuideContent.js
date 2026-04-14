import { publicGuideContentExtra } from "./publicGuideContentExtra.js";

const basePublicGuideContent = {
  microsoft: {
    outlook: {
      summary: "Use this guide when Outlook will not open your mailbox, keeps asking you to sign in, stops syncing, or shared mailboxes and calendars are missing.",
      overview: [
        "Outlook is Microsoft's desktop email and calendar app for your work mailbox, meetings, contacts, and shared mailboxes.",
        "Most Outlook problems come down to the wrong account being signed in, the local Outlook profile falling out of sync, or an add-in blocking normal startup."
      ],
      askFirst: [
        "Are you signed in with the correct work email account?",
        "Can you open the same mailbox in Outlook on the web?",
        "Did the issue begin after a password change, restart, update, or new computer?",
        "Is the problem sign-in, mail flow, search, calendar, or a shared mailbox?"
      ],
      licensing: [
        "Make sure the mailbox is still active and tied to the work account you are using in Office.",
        "If Outlook says it is unlicensed, open another Microsoft 365 app and confirm the same work account is signed in there too.",
        "If only a shared mailbox is missing, note the mailbox name and whether it still appears in Outlook on the web."
      ],
      install: [
        "Close Outlook fully, install any pending Office updates, and restart the computer.",
        "Open Word or another Microsoft 365 app first and confirm the correct work account is signed in.",
        "When Outlook reopens, test send and receive, calendar, and one shared mailbox if you normally use one."
      ],
      supportCheckpoints: [
        "Compare Outlook on the web to the desktop app. If the web version works, the problem is usually local to the app or profile.",
        "Remove old or incorrect work or personal accounts from Office if more than one account appears.",
        "Try opening Outlook with add-ins disabled if it hangs on Loading Profile or crashes right away.",
        "If search is slow or results are missing, leave Outlook open for a few minutes after sign-in so it can finish syncing."
      ],
      commonIssues: [
        {
          title: "Sign-in prompts keep coming back",
          symptom: "Outlook repeatedly asks for a password or opens the wrong account even though your password is correct.",
          likelyFix: "Confirm Outlook on the web works first, then sign out of any wrong Office account and sign back in with the correct work account.",
          collect: "Send a screenshot of the prompt, the work email account you expected to use, and whether Outlook on the web works."
        },
        {
          title: "Outlook hangs on Loading Profile or crashes",
          symptom: "Outlook opens slowly, never finishes loading, or closes shortly after launch.",
          likelyFix: "Restart the computer, try opening Outlook without add-ins, and install pending Office updates before recreating anything.",
          collect: "Send the exact Outlook version, when the issue started, and a screenshot if there is a crash message."
        },
        {
          title: "A shared mailbox or calendar is missing",
          symptom: "Your primary mailbox opens, but a shared mailbox, shared calendar, or delegated send option is gone or out of date.",
          likelyFix: "Check whether the same shared mailbox appears in Outlook on the web, then restart Outlook and let it refresh before changing profiles.",
          collect: "Send the shared mailbox or calendar name, what should be visible, and whether the same problem shows in Outlook on the web."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Outlook message or screen where the problem happens.",
        "The work email account you used to sign in and whether Outlook on the web works with that same account.",
        "Your Outlook version from File > Office Account or File > About Outlook.",
        "If shared mailboxes or calendars are involved, the name of the mailbox or calendar that should appear."
      ]
    },
    teams: {
      summary: "Use this guide when Teams will not sign in, meetings fail, channels are missing, or chat and file access do not update correctly.",
      overview: [
        "Teams is Microsoft's chat, meetings, calling, and collaboration app for your work account.",
        "Teams issues are usually caused by the wrong account or organization being active, a local app problem, or device settings affecting meetings."
      ],
      askFirst: [
        "Does the problem happen in desktop Teams, Teams on the web, or both?",
        "Is the issue sign-in, meetings, chat, channels, calling, or files?",
        "Did the problem begin after a password change, update, new headset, dock change, or new computer?",
        "Are other people in your organization seeing the same thing?"
      ],
      licensing: [
        "Make sure you are signed in with the same work account you use for the rest of Microsoft 365.",
        "If Teams says a feature is unavailable, note whether the problem is only in meetings, calling, or another specific part of the app.",
        "If you belong to more than one organization, confirm Teams is open in the correct one."
      ],
      install: [
        "Close Teams completely, install pending Windows and Teams updates, and restart the computer.",
        "Open Teams on the web first and confirm the correct work account and organization are shown.",
        "After signing back into the desktop app, test chat, one channel, and one meeting if meetings are part of the issue."
      ],
      supportCheckpoints: [
        "If the web version works but the desktop app does not, sign out of Teams desktop and sign back in before reinstalling.",
        "If meetings are the problem, check the selected microphone, speaker, and camera in both Windows and Teams.",
        "Disconnect from a dock or USB audio device for one test if sound or camera routing seems wrong.",
        "If channels or chats are missing, give Teams a few minutes to refresh after sign-in and compare with the web version."
      ],
      commonIssues: [
        {
          title: "Teams desktop does not work but Teams on the web does",
          symptom: "The web version signs in and loads normally, but the desktop app loops, stalls, or shows the wrong organization.",
          likelyFix: "Sign out of the desktop app, close it fully, and sign back in with the same work account that works in the browser.",
          collect: "Send screenshots of the web and desktop results, the organization shown, and the Teams version from Settings > About."
        },
        {
          title: "Meetings have no sound or camera",
          symptom: "Meetings connect, but your headset, speakers, microphone, or camera do not behave normally.",
          likelyFix: "Check device selection in Windows and Teams, then test again without the dock or with a different headset if one is available.",
          collect: "Send the device name, whether the issue affects every meeting, and a screenshot of the Teams device settings page."
        },
        {
          title: "Channels or chats are missing",
          symptom: "You sign in successfully, but expected teams, channels, chats, or files do not appear.",
          likelyFix: "Confirm you are in the correct organization and compare the desktop app to Teams on the web before reinstalling.",
          collect: "Send the team or channel name, whether the web version shows it, and whether the problem started after an account or membership change."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Teams error or the part of the app that is missing.",
        "Whether Teams on the web works with the same work account.",
        "Your Teams version from Settings > About.",
        "If meetings are affected, the headset, camera, or dock model you are using."
      ]
    },
    onedrive: {
      summary: "Use this guide when OneDrive is not syncing, files are missing, shared libraries stop updating, or folders appear in the wrong place.",
      overview: [
        "OneDrive keeps your work files synced between your computer, the web, and Microsoft 365 apps.",
        "Most OneDrive problems are caused by account mix-ups, sync conflicts, very low disk space, or a library that no longer matches what is in the browser."
      ],
      askFirst: [
        "Can you see the correct files in OneDrive on the web?",
        "Is the issue with your own OneDrive files, a shared library, or both?",
        "Did the problem start after a rename, file move, laptop replacement, or OneDrive reset?",
        "Are a few files affected, or is the whole sync app unhealthy?"
      ],
      licensing: [
        "Make sure you are signed in with the correct work account and not a personal Microsoft account.",
        "If a shared library is missing, note whether you can still open it in the browser.",
        "If OneDrive says your account cannot sync, capture the exact message and whether other Microsoft 365 apps work with the same account."
      ],
      install: [
        "Install pending OneDrive and Windows updates, then restart the computer.",
        "Open OneDrive on the web first and confirm the correct files and folders are there.",
        "After reopening the desktop app, let it finish signing in before you test one upload and one download."
      ],
      supportCheckpoints: [
        "Use the browser as the source of truth first. If the files are wrong there too, do not reset the local app yet.",
        "Pause and resume sync once before you unlink or reset anything.",
        "Check that you have enough free disk space and that the affected files do not use very long names or unsupported characters.",
        "If only one library is failing, compare the library name and URL to what the browser shows."
      ],
      commonIssues: [
        {
          title: "Sync is stuck or processing forever",
          symptom: "OneDrive keeps spinning, never finishes syncing, or keeps reprocessing the same files.",
          likelyFix: "Pause and resume sync, check free disk space, and compare the affected files to what you see in the browser before resetting the app.",
          collect: "Send a screenshot of the OneDrive status icon, free disk space, and whether the same files look correct in the browser."
        },
        {
          title: "A folder or library will not sync",
          symptom: "Most of OneDrive works, but one shared library or one folder refuses to appear or update.",
          likelyFix: "Check that you can open the same library in the browser and confirm the folder name matches what your desktop app expects.",
          collect: "Send the library URL if you have it, the folder name, and whether the browser version works."
        },
        {
          title: "Files are missing or appear in the wrong location",
          symptom: "The desktop app opens a different folder, or expected files do not appear where they used to.",
          likelyFix: "Confirm you are signed into the correct work account and compare the sync root names before unlinking or moving files locally.",
          collect: "Send the path that looks wrong, the correct location you expected, and a screenshot of the OneDrive account shown in Settings."
        }
      ],
      supportArtifacts: [
        "A screenshot of the OneDrive tray icon or sync error message.",
        "Whether the same files or libraries look correct in OneDrive on the web.",
        "The account shown in OneDrive settings and the name of the affected folder or library.",
        "Your available disk space if the sync app is stuck or very slow."
      ]
    },
    "outlook-mobile": {
      summary: "Use this guide when you need help setting up Outlook on your phone or when work email, calendar, and notifications are not appearing correctly in Outlook Mobile.",
      overview: [
        "Outlook Mobile gives you work email and calendar access on an iPhone or Android phone.",
        "Most setup problems happen when the wrong account is added, the phone blocks notifications or background refresh, or company sign-in steps were not completed during setup."
      ],
      askFirst: [
        "Are you setting up Outlook Mobile for the first time, or did it stop working after a phone change, password change, or app update?",
        "Is the problem mail setup, calendar access, notifications, or shared mailbox visibility?",
        "Can you sign in to the same mailbox in Outlook on the web or on your computer?"
      ],
      licensing: [
        "Make sure you are adding the work email account your company expects you to use.",
        "If your company uses mobile app protection or device approval, finish those prompts before assuming setup failed.",
        "If the mailbox works in Outlook on the web but not on your phone, include that when you contact support."
      ],
      install: [
        "Install Outlook from the App Store or Google Play, then open it and choose Add Account.",
        "Use your work email address and complete any Microsoft sign-in, approval, or device-registration prompts that appear.",
        "Allow notifications, calendar access, and contacts only if your company expects you to use those features on your phone."
      ],
      supportCheckpoints: [
        "Confirm the phone has a working internet connection before you retry setup.",
        "Check that Outlook Mobile is signed in with the same work account you use on your computer.",
        "If notifications are missing, check both the phone notification settings and the Outlook in-app notification settings.",
        "If only one shared mailbox is missing, compare that mailbox to Outlook on the web before removing the mobile app."
      ],
      commonIssues: [
        {
          title: "The work account will not finish signing in",
          symptom: "Outlook Mobile keeps looping on sign-in, returns to the account picker, or never reaches the inbox.",
          likelyFix: "Restart the app, confirm the same account works in the browser, and retry setup with the exact work account email.",
          collect: "Send a screenshot of the last sign-in screen, the work email account used, and whether browser access works."
        },
        {
          title: "Mail or calendar is missing on the phone",
          symptom: "The app opens, but mail folders, calendar items, or a shared mailbox do not match what you see elsewhere.",
          likelyFix: "Check whether the same content appears in Outlook on the web and let the phone stay open for a few minutes to finish syncing.",
          collect: "Send the mailbox or calendar name, what should be visible, and a screenshot of the missing content."
        },
        {
          title: "Notifications are not showing",
          symptom: "Outlook Mobile receives mail, but you do not see new-message or calendar alerts on the phone.",
          likelyFix: "Check phone notification settings, Outlook Mobile notification settings, and whether battery saver or focus modes are blocking alerts.",
          collect: "Send the phone type, Outlook app version, and a screenshot of the phone notification settings if possible."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Outlook Mobile setup or sign-in screen.",
        "The work email account you are trying to add.",
        "The phone type and whether it is iPhone or Android.",
        "A note about whether the same mailbox works in Outlook on the web or on your computer."
      ]
    },
    "teams-mobile": {
      summary: "Use this guide when you need help setting up Teams on your phone or when meetings, chat, notifications, or file access are not behaving correctly in Teams Mobile.",
      overview: [
        "Teams Mobile gives you work chat, meetings, calls, files, and notifications on an iPhone or Android phone.",
        "Most mobile Teams problems come from the wrong work account being active, notifications being blocked, or the phone camera and microphone not being allowed during setup."
      ],
      askFirst: [
        "Are you setting up Teams Mobile for the first time, or did it stop working after a phone change, password change, or app update?",
        "Is the issue sign-in, meetings, chat, calls, notifications, or files?",
        "Can you sign in to Teams on the web or on your computer with the same work account?"
      ],
      licensing: [
        "Use the same work account you use for desktop Teams and other Microsoft 365 apps.",
        "If your company uses mobile app protection or approval prompts, complete those during setup.",
        "If meetings work on your computer but not your phone, include that when you contact support."
      ],
      install: [
        "Install Teams from the App Store or Google Play and sign in with your work email account.",
        "Allow camera, microphone, notifications, and file access only if you plan to use those features on your phone.",
        "Open one chat, one team or channel, and one meeting invite after setup so you can confirm the app is ready."
      ],
      supportCheckpoints: [
        "Check whether the phone is connected to Wi-Fi or mobile data before retrying sign-in or a meeting.",
        "If notifications are missing, compare phone notification settings with the Teams in-app settings.",
        "If meeting audio or video fails, confirm the phone camera and microphone permissions are allowed.",
        "If a team or channel is missing, compare Teams Mobile with Teams on the web before removing the app."
      ],
      commonIssues: [
        {
          title: "Teams Mobile will not sign in",
          symptom: "The app opens, but sign-in loops, shows the wrong organization, or never reaches your chats.",
          likelyFix: "Confirm the same work account works in Teams on the web, then sign in again with that exact account on the phone.",
          collect: "Send the organization shown, the work account used, and a screenshot of the sign-in screen or message."
        },
        {
          title: "Meetings have no microphone, speaker, or camera access",
          symptom: "Teams Mobile joins the meeting, but audio or video does not work as expected.",
          likelyFix: "Check the phone permissions for microphone and camera, then rejoin the meeting after confirming those permissions are enabled.",
          collect: "Send the phone type, the meeting symptom, and a screenshot of the app permissions if possible."
        },
        {
          title: "Chats, channels, or notifications are missing",
          symptom: "The app signs in, but expected chats, teams, notifications, or files do not appear.",
          likelyFix: "Compare the phone app to Teams on the web and make sure the correct work account and organization are selected.",
          collect: "Send the missing chat, team, or channel name, and whether it appears correctly in the web or desktop app."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Teams Mobile message or missing screen.",
        "The work account you used to sign in.",
        "The phone type and whether it is iPhone or Android.",
        "A note about whether the same Teams account works on the web or on your computer."
      ]
    },
    "microsoft-authenticator": {
      summary: "Use this guide when you need help setting up Microsoft Authenticator on a phone for work sign-in approvals, number matching, and multi-factor prompts.",
      overview: [
        "Microsoft Authenticator is the mobile app many organizations use for multi-factor sign-in approvals and number matching.",
        "Most setup problems come from setting up the wrong account, not finishing the QR-code or code-based enrollment, or moving to a new phone without adding the work account again."
      ],
      askFirst: [
        "Are you setting up Authenticator for the first time, replacing an old phone, or trying to approve a sign-in that is not reaching the app?",
        "Is the issue adding the account, getting approval prompts, or approving the correct sign-in request?",
        "Do you still have the old phone, or is the new phone the only device you can use?"
      ],
      licensing: [
        "Use the exact work account your company expects for Microsoft 365 or company sign-in.",
        "Authenticator itself is a sign-in method, so the key detail is which work account is being added and whether your organization already expects that account to use Authenticator.",
        "If you use more than one Microsoft account, confirm you are adding the work account and not a personal account."
      ],
      install: [
        "Install Microsoft Authenticator from the App Store or Google Play.",
        "Choose Add account, then follow the company or Microsoft setup steps to scan a QR code or enter a setup code.",
        "Allow notifications so approval prompts can appear on the phone during sign-in."
      ],
      supportCheckpoints: [
        "If you are replacing a phone, do not remove the old Authenticator setup until the new phone is working if the old phone is still available.",
        "Check that the phone has notifications enabled for Microsoft Authenticator.",
        "If no approval prompt arrives, confirm you are signing into the correct work account and that the phone has internet access.",
        "If a number-matching screen appears, compare the number on the phone to the one shown on the sign-in page."
      ],
      commonIssues: [
        {
          title: "The work account will not add to Authenticator",
          symptom: "Authenticator opens, but the setup code or QR code does not finish adding the account.",
          likelyFix: "Start the setup again from the company or Microsoft prompt and confirm you are adding the correct work account.",
          collect: "Send a screenshot of the setup step that fails and the work account you are trying to add."
        },
        {
          title: "Approval prompts are not arriving on the phone",
          symptom: "You try to sign in, but the phone never shows the approval request.",
          likelyFix: "Check Authenticator notifications, make sure the phone is online, and open the app to see whether the request is waiting inside the app.",
          collect: "Send the phone type, whether notifications are enabled, and a screenshot of the Authenticator account screen."
        },
        {
          title: "You changed phones and sign-in no longer works",
          symptom: "The old phone had Authenticator working, but the new phone does not approve sign-ins yet.",
          likelyFix: "Add the work account to the new phone and confirm it can receive prompts before removing the old phone from your normal sign-in process.",
          collect: "Send the phone type, whether you still have the old phone, and a screenshot of the account list in Authenticator."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Authenticator setup or approval screen.",
        "The work account you are adding or approving.",
        "The phone type and whether it is iPhone or Android.",
        "A note about whether you are setting up a first phone or replacing an old phone."
      ]
    }
  },
  adobe: {
    "acrobat-pro": {
      summary: "Use this guide when Acrobat will not activate, opens as Reader, cannot edit or sign PDFs, or browser and Office PDF actions stop working.",
      overview: [
        "Adobe Acrobat Pro is used to open, edit, combine, sign, and share PDF files.",
        "Most Acrobat problems come from the wrong Adobe profile being selected, Acrobat Reader opening instead of Pro, or a browser or Office integration that needs to refresh."
      ],
      askFirst: [
        "Is the issue activation, editing tools missing, PDF opening, signing, or browser and Office integration?",
        "Did the app open with a personal Adobe profile instead of your work profile?",
        "Does the same PDF problem happen with every file or only one file?",
        "Did the issue start after an Adobe update, sign-in change, or new computer?"
      ],
      licensing: [
        "If Acrobat opens as Reader or Trial, sign out and back in with the work Adobe account that should have Acrobat Pro.",
        "If Adobe asks you to choose a profile, use the work or company profile rather than a personal one.",
        "If only one feature is missing, note the exact tool name, such as Edit PDF, Combine Files, or Request Signatures."
      ],
      install: [
        "Close Acrobat and all web browsers, install pending Adobe updates, and restart the computer.",
        "Open Acrobat again and confirm the account icon shows the correct work Adobe account.",
        "Test one local PDF, one PDF from email or a browser download, and one action you normally use such as edit, sign, or combine."
      ],
      supportCheckpoints: [
        "Check whether the same PDF opens normally in Acrobat after you save it locally instead of opening it directly from the browser.",
        "Set Acrobat as the default PDF app again if PDFs suddenly open in the wrong program.",
        "If the browser is the only place failing, test the same PDF outside the browser before reinstalling Acrobat.",
        "If Acrobat says Reader or Trial, sign out and back in before doing deeper repair steps."
      ],
      commonIssues: [
        {
          title: "Acrobat opens but behaves like Reader",
          symptom: "The app launches, but editing or signing tools are missing and Acrobat says Reader, Trial, or Sign In.",
          likelyFix: "Sign out of Acrobat and sign back in with the work Adobe account or work profile that should have Acrobat Pro.",
          collect: "Send a screenshot of the account icon, the profile choice if one appears, and the message shown in Acrobat."
        },
        {
          title: "PDFs open in the wrong app or only in the browser",
          symptom: "PDFs no longer open in Acrobat, or browser downloads never hand off to the desktop app.",
          likelyFix: "Set Acrobat as the default PDF app again and test the same file after saving it locally.",
          collect: "Send the file source, the app that opens instead, and whether the issue happens with every PDF."
        },
        {
          title: "Signing, editing, or combine tools fail",
          symptom: "Acrobat opens, but a specific tool fails, is missing, or closes unexpectedly.",
          likelyFix: "Install pending Acrobat updates, reopen the app, and test a second PDF to confirm whether the problem is file-specific.",
          collect: "Send the exact tool name, a screenshot of the error, and whether the same tool fails on more than one PDF."
        }
      ],
      supportArtifacts: [
        "A screenshot of the Acrobat message or account/profile picker.",
        "The Adobe account email you used and whether the work profile was selected.",
        "Your Acrobat version from Help > About Adobe Acrobat.",
        "A note about whether the problem happens in the desktop app, in the browser, or both."
      ]
    }
  },
  bluebeam: {
    "revu-21": {
      summary: "Use this guide when Bluebeam Revu will not sign in, Studio is unavailable, PDF markups are missing, or shared profiles and tool sets do not load.",
      overview: [
        "Bluebeam Revu is used to open, mark up, organize, and share PDF files, often with Studio Projects or Sessions.",
        "Most Revu issues are tied to the Bluebeam ID used to sign in, the subscription attached to that account, or shared profiles and tool sets not loading on the computer."
      ],
      askFirst: [
        "Is the issue sign-in, activation, Studio access, missing tools, or opening and marking up PDFs?",
        "Can you sign in with the same Bluebeam ID on another computer or in the browser if your company uses Studio?",
        "Did the problem begin after a subscription change, update, or new computer?",
        "Are local PDFs affected, Studio files affected, or both?"
      ],
      licensing: [
        "Make sure you are signing in with the Bluebeam ID that should have the Revu subscription.",
        "If Revu says Trial or Subscription Required, capture the message before signing out or reinstalling.",
        "If Studio is the only failing part, note whether Revu itself still opens local PDFs normally."
      ],
      install: [
        "Close Revu, install pending Revu updates, and restart the computer.",
        "Sign back in with the correct Bluebeam ID and confirm the subscription message is gone.",
        "Open one local PDF and one Studio item or shared profile if your team relies on them."
      ],
      supportCheckpoints: [
        "Sign out and back in with the correct Bluebeam ID before reinstalling.",
        "If local PDFs open but Studio does not, compare that result to another network connection if one is available.",
        "If shared profiles or tool sets are missing, switch to the default profile once to see whether only the shared content is affected.",
        "If the issue started right after an update, note the exact version before changing anything else."
      ],
      commonIssues: [
        {
          title: "Revu says subscription required or will not sign in",
          symptom: "Bluebeam opens, but prompts for sign-in, stays in trial mode, or never finishes connecting to your subscription.",
          likelyFix: "Sign out and back in with the correct Bluebeam ID and confirm the same account is the one your company expects you to use.",
          collect: "Send the Bluebeam ID email, the exact subscription message, and a screenshot of the sign-in window."
        },
        {
          title: "Studio Sessions or Projects will not open",
          symptom: "Local PDFs work, but Studio access fails or shared cloud content is unavailable.",
          likelyFix: "Test a local PDF first, then sign back into Studio and confirm whether the issue affects one Session or all Studio access.",
          collect: "Send the Studio project or session name, the message shown, and whether other people can open it."
        },
        {
          title: "Profiles, tool sets, or stamps are missing",
          symptom: "Revu opens, but the tools your team normally uses are gone or do not match another computer.",
          likelyFix: "Switch to the default profile once, then reload the shared profile or tool set if your team provides one.",
          collect: "Send the profile or tool set name that is missing and a screenshot of the current profile list."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Bluebeam sign-in or subscription message.",
        "The Bluebeam ID email account you used.",
        "Your Revu build number from Help > About.",
        "If Studio is affected, the Session or Project name and whether local PDFs still work."
      ]
    }
  },
  autodesk: {
    autocad: {
      summary: "Use this guide when AutoCAD will not open drawings, asks for sign-in, has missing fonts or references, or cannot plot the way you expect.",
      overview: [
        "AutoCAD is Autodesk's desktop drawing app for opening, editing, and plotting DWG files.",
        "Most AutoCAD problems come from the wrong product year, sign-in problems, missing shared resources such as fonts or plot styles, or a file path that is no longer available."
      ],
      askFirst: [
        "What AutoCAD year and edition are you expected to use?",
        "Is the problem sign-in, opening drawings, plotting, missing fonts, or references not loading?",
        "Does the same drawing work on another computer or for another user?",
        "Is the drawing stored locally, on a network drive, in a cloud location, or over VPN?"
      ],
      licensing: [
        "Sign in with the Autodesk account your company uses for AutoCAD access.",
        "If AutoCAD says Trial or Sign In, capture the exact message and the product year before closing it.",
        "If the wrong Autodesk product appears after sign-in, note the product name and year that should be available."
      ],
      install: [
        "Make sure the AutoCAD year installed on your computer matches the year your team expects to use.",
        "Install pending AutoCAD updates for that same year and restart the computer.",
        "Open AutoCAD, sign in, test a blank drawing first, and then test one real project drawing."
      ],
      supportCheckpoints: [
        "Confirm the product year first. A drawing may not behave correctly if the wrong release is installed.",
        "If only one drawing fails, test a second drawing before reinstalling AutoCAD.",
        "If fonts, plot styles, or references are missing, compare with another user before assuming the app is broken.",
        "If the file lives on a network path or VPN path, make sure that path is available before launching the drawing."
      ],
      commonIssues: [
        {
          title: "AutoCAD opens but a drawing will not load correctly",
          symptom: "The app launches, but a drawing will not open, opens very slowly, or shows missing references.",
          likelyFix: "Test a second drawing and confirm the file path is available before reinstalling AutoCAD.",
          collect: "Send the product year, the drawing path, and a screenshot of the exact message or missing reference notice."
        },
        {
          title: "Fonts, plot styles, or plotting are wrong",
          symptom: "The drawing opens, but text, plot styles, or printer output do not match what your team expects.",
          likelyFix: "Compare the same drawing with another working computer and confirm the same fonts, plotters, and plot styles are available.",
          collect: "Send a screenshot of the plot or preview problem and note whether another user can plot the same file correctly."
        },
        {
          title: "AutoCAD says trial, sign in, or subscription required",
          symptom: "The app opens but does not recognize your Autodesk access.",
          likelyFix: "Sign out and back in with the correct Autodesk account and confirm the installed product year is the one your company uses.",
          collect: "Send the Autodesk account email, the exact message, and a screenshot of the About screen showing the product year."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact AutoCAD message or missing reference warning.",
        "The AutoCAD year and edition from the About screen.",
        "The Autodesk account email you used to sign in.",
        "The path or location of the drawing that fails, plus whether another drawing works."
      ]
    },
    revit: {
      summary: "Use this guide when Revit will not open a model, says you need a different version, has missing add-ins or families, or fails to sign in.",
      overview: [
        "Revit is Autodesk's building design and modeling app for project models, families, sheets, and collaboration.",
        "Most Revit problems are caused by the wrong Revit year, a model that depends on add-ins or shared content, or a sign-in problem tied to Autodesk access or cloud models."
      ],
      askFirst: [
        "What Revit year and update level does your project require?",
        "Is the issue opening the app, opening a model, signing in, or loading add-ins and families?",
        "Is the model local, on a file share, or in Autodesk Docs or BIM 360?",
        "Does the same model open for another user on the same project?"
      ],
      licensing: [
        "Use the Autodesk account your company assigned for Revit access.",
        "If Revit says Trial or Sign In, capture the exact message before closing it.",
        "If the issue is cloud access only, note whether your Autodesk sign-in works elsewhere first."
      ],
      install: [
        "Confirm the Revit year on your computer matches the year your project team uses.",
        "Install pending updates for that same Revit year and restart the computer.",
        "Open Revit, sign in, test a blank project, and then test the project model again."
      ],
      supportCheckpoints: [
        "Do not open a project in the wrong Revit year just to test it.",
        "If one model fails but another opens, the issue may be model-specific rather than a full app failure.",
        "If add-ins are missing, compare with another user before reinstalling the base app.",
        "If cloud models are involved, confirm sign-in and whether the same model appears in the browser or companion Autodesk tools."
      ],
      commonIssues: [
        {
          title: "Revit says the model is from a different version",
          symptom: "The app opens, but the project model requires a different Revit year or update level.",
          likelyFix: "Install or open the exact Revit year your project team uses instead of trying to work around the version mismatch.",
          collect: "Send the Revit year installed on your computer, the year the model requires, and a screenshot of the message."
        },
        {
          title: "Add-ins, families, or templates are missing",
          symptom: "Revit launches, but tools or content your team expects are missing.",
          likelyFix: "Compare with another working Revit computer before reinstalling, especially if the problem is only missing add-ins or content.",
          collect: "Send the add-in, family, or template name that is missing and whether another user can see it."
        },
        {
          title: "A cloud or project model will not open",
          symptom: "Revit opens, but one project model stalls, errors, or never loads fully.",
          likelyFix: "Test a second model and confirm the same Autodesk account is signed in before making bigger changes.",
          collect: "Send the project name, whether it is local or cloud-based, and a screenshot of the error."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Revit message or failed model-open screen.",
        "The Revit year and build from the About screen.",
        "The project or model name and whether it is local, on a file share, or cloud-based.",
        "Any add-in, family, or template name that seems missing."
      ]
    },
    "civil-3d": {
      summary: "Use this guide when Civil 3D will not open project drawings correctly, data shortcuts are broken, styles are missing, or the app says you need a different version.",
      overview: [
        "Civil 3D is Autodesk's civil engineering drawing app for surfaces, alignments, profiles, pipe networks, and project references.",
        "Most Civil 3D problems come from version mismatches, missing project standards, broken data shortcuts, or shared project paths that are not available."
      ],
      askFirst: [
        "What Civil 3D year and update level does the project require?",
        "Is the issue opening the app, opening a project drawing, missing styles, or broken data shortcuts?",
        "Is the project stored locally, on a file share, or through VPN?",
        "Does the same project work for another user on the same team?"
      ],
      licensing: [
        "Sign in with the Autodesk account your company uses for Civil 3D access.",
        "If Civil 3D says Trial or Sign In, capture the exact message and the installed year.",
        "If the app opens but a civil feature is missing, note the exact tool or object type that is unavailable."
      ],
      install: [
        "Make sure the installed Civil 3D year matches the one your project team uses.",
        "Install pending updates for that same year and restart the computer.",
        "Open a blank drawing first, then test the affected project drawing and one data shortcut or reference path."
      ],
      supportCheckpoints: [
        "If a project drawing fails, test a second drawing before reinstalling Civil 3D.",
        "If only references or shortcuts are broken, check project paths and VPN or network access first.",
        "If styles are missing, compare with another working computer on the same project.",
        "Do not upgrade project files just to test them if the project year is still unclear."
      ],
      commonIssues: [
        {
          title: "Data shortcuts or references are broken",
          symptom: "The drawing opens, but references, shortcuts, or related project objects are missing.",
          likelyFix: "Confirm the project paths are available and compare the same drawing with another working user before reinstalling.",
          collect: "Send the project path, the name of the missing shortcut or reference, and a screenshot of the error."
        },
        {
          title: "Styles or object content are missing",
          symptom: "Civil 3D opens, but labels, styles, or expected objects do not match another team member's view.",
          likelyFix: "Compare the same drawing and template with another working computer before changing the app install.",
          collect: "Send the style or object type that is missing and whether another user sees it correctly."
        },
        {
          title: "Civil 3D opens but the project behaves as if the wrong version is installed",
          symptom: "The app launches, but project files or companion tools do not behave normally.",
          likelyFix: "Confirm the exact Civil 3D year and update level the project requires before reinstalling or opening files in another version.",
          collect: "Send the installed year, the expected project year, and a screenshot from the About screen."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Civil 3D message or missing reference warning.",
        "The installed Civil 3D year and build from the About screen.",
        "The affected project drawing path and whether another drawing works.",
        "The name of any missing style, shortcut, or reference object."
      ]
    }
  },
  esri: {
    "arcgis-pro": {
      summary: "Use this guide when ArcGIS Pro will not sign in, shows the wrong license level, hides projects or layers, or crashes while opening maps.",
      overview: [
        "ArcGIS Pro is Esri's desktop mapping and GIS app for projects, layers, layouts, and analysis tools.",
        "Most ArcGIS Pro problems come from signing into the wrong ArcGIS organization, missing extensions, or a project that depends on content you cannot currently reach."
      ],
      askFirst: [
        "Can you sign in to the correct ArcGIS organization in the browser?",
        "Is the issue licensing, missing layers, missing projects, offline use, or crashing?",
        "Do you know which ArcGIS Pro version, license level, or extension your work requires?",
        "Is the problem with one project only, or with ArcGIS Pro in general?"
      ],
      licensing: [
        "Make sure ArcGIS Pro is signed into the same ArcGIS organization your team expects.",
        "If the app opens with the wrong license level, note the exact level shown, such as Basic, Standard, or Advanced.",
        "If a tool is missing, note the extension name you expected to use."
      ],
      install: [
        "Install pending ArcGIS Pro updates if your organization allows them, then restart the computer.",
        "Sign into the correct ArcGIS organization in the browser first, then reopen ArcGIS Pro.",
        "Test a blank project or a simple project before reopening the larger project that failed."
      ],
      supportCheckpoints: [
        "Compare browser sign-in to desktop sign-in. If the browser account is wrong, fix that first.",
        "If one project is the problem, try opening a different project before reinstalling ArcGIS Pro.",
        "If layers are missing, confirm they still exist in the browser or portal view you normally use.",
        "If the app crashes at startup, restart the computer and note whether the crash began right after an update."
      ],
      commonIssues: [
        {
          title: "ArcGIS Pro shows the wrong license level or missing extensions",
          symptom: "The app opens, but a required level or extension is unavailable.",
          likelyFix: "Sign in again with the correct ArcGIS organization account and confirm the license level shown in the app.",
          collect: "Send the license level shown, the extension name that is missing, and a screenshot of the licensing screen."
        },
        {
          title: "Projects or layers are missing",
          symptom: "You can sign in, but expected maps, layers, or projects do not appear.",
          likelyFix: "Check whether the same content is visible in the browser or portal view before changing the desktop install.",
          collect: "Send the project or layer name, the portal or organization URL, and whether the browser version shows the same content."
        },
        {
          title: "ArcGIS Pro crashes while opening or loading a project",
          symptom: "The app starts, then closes or freezes when opening the app or a project.",
          likelyFix: "Restart the computer, test a simple project, and note whether the issue is limited to one project before reinstalling.",
          collect: "Send the ArcGIS Pro version, the project name, and a screenshot or wording of the crash message if one appears."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact ArcGIS Pro message or licensing screen.",
        "The ArcGIS organization or portal URL you are signing into.",
        "The ArcGIS Pro version plus the license level shown in the app.",
        "The project, layer, or extension name involved in the problem."
      ]
    }
  },
  bentley: {
    projectwise: {
      summary: "Use this guide when ProjectWise will not connect to the right datasource, project files are missing, or check-in and check-out actions stop working.",
      overview: [
        "ProjectWise is Bentley's document and project file app for opening, checking out, and checking in shared project content.",
        "Most ProjectWise problems come from datasource access, Bentley sign-in, or local work areas that no longer match the project you expect to see."
      ],
      askFirst: [
        "Which datasource and project should you be able to open?",
        "Can you sign into Bentley and reach the datasource list at all?",
        "Is the issue opening files, checking files out, checking them back in, or seeing the project tree?",
        "Do you currently have files checked out or local copies you still need?"
      ],
      licensing: [
        "Make sure you are signed into Bentley with the work account your company uses for ProjectWise.",
        "If ProjectWise opens but shows no datasource or no projects, capture the datasource name you expected to see.",
        "Do not delete local ProjectWise folders if you may still have files checked out or unsaved local work."
      ],
      install: [
        "Restart the computer, sign back into Bentley if prompted, and reopen ProjectWise.",
        "Confirm the expected datasource appears before testing a real project file.",
        "Open one smaller test file first, then test check-out and check-in if your normal work depends on them."
      ],
      supportCheckpoints: [
        "If the datasource list is missing, confirm your Bentley sign-in before clearing anything locally.",
        "If only one project is affected, check another project or folder before assuming the whole app is broken.",
        "If files are checked out, make note of them before any repair attempt.",
        "If a local work area looks out of date, do not delete it until support confirms your checked-out work is safe."
      ],
      commonIssues: [
        {
          title: "The datasource or project tree is missing",
          symptom: "ProjectWise opens, but you cannot see the datasource or project you normally use.",
          likelyFix: "Confirm the datasource name and Bentley sign-in first, then compare with another user if possible.",
          collect: "Send the datasource name you expected, a screenshot of what you do see, and the Bentley account email you used."
        },
        {
          title: "Check-out or check-in fails",
          symptom: "You can open ProjectWise, but cannot check files out or return them after editing.",
          likelyFix: "Test one smaller file and note whether the issue affects every file or only one project before clearing anything locally.",
          collect: "Send the project and file name, the exact message shown, and whether the file is already marked as checked out."
        },
        {
          title: "Local work area seems wrong or out of date",
          symptom: "ProjectWise opens old local content or your local copy no longer matches the project tree you expect.",
          likelyFix: "Do not delete the local work area yet. First confirm whether you have checked-out files or local changes that still need to be kept.",
          collect: "Send the project name, whether files are checked out, and screenshots of the local-versus-datasource view."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact ProjectWise message or missing datasource view.",
        "The datasource and project name you expected to see.",
        "The Bentley account email you used to sign in.",
        "A note about whether you currently have files checked out or local work you still need."
      ]
    }
  },
  fortinet: {
    "forticlient-vpn": {
      summary: "Use this guide when FortiClient VPN will not connect, keeps prompting for sign-in, drops the tunnel, or connects but you still cannot reach company resources.",
      overview: [
        "FortiClient VPN is used to connect your computer to your company's private network when you are away from the office.",
        "Most FortiClient issues come from the wrong VPN profile, a local internet problem, an MFA or browser sign-in step that did not finish, or a tunnel that connects but does not reach the resource you expect."
      ],
      askFirst: [
        "Does your normal internet connection work before you open FortiClient?",
        "Are you using the exact VPN tunnel or profile your company gave you?",
        "Is the issue connecting to the VPN, finishing MFA, or reaching an internal site, shared drive, or app after the VPN connects?",
        "Did the problem start after a password change, phone change, update, or a new computer setup?"
      ],
      licensing: [],
      install: [
        "Use the company-approved FortiClient build and VPN profile instead of creating a new tunnel from scratch.",
        "Restart the computer after installing or updating FortiClient, then open the correct VPN profile again.",
        "After the VPN connects, test one internal website or one company file path so you know whether the tunnel itself is working."
      ],
      supportCheckpoints: [
        "Confirm regular internet access works before retrying the VPN tunnel.",
        "If FortiClient opens a browser or MFA step, complete it and wait for the VPN window to finish updating.",
        "If the VPN says Connected but one app still fails, compare that app with a second internal website or file path before assuming the tunnel is down.",
        "Keep the exact tunnel name and the wording of any FortiClient message before contacting support."
      ],
      commonIssues: [
        {
          title: "FortiClient will not connect at all",
          symptom: "The VPN tunnel never finishes connecting, or FortiClient returns an immediate connection or sign-in error.",
          likelyFix: "Confirm the computer has normal internet access, reopen the correct company VPN profile, and retry the same tunnel after restarting the computer once.",
          collect: "Send the tunnel name, the exact FortiClient message, and whether normal internet browsing works at the same time."
        },
        {
          title: "The VPN uses a browser or MFA step that never completes",
          symptom: "FortiClient opens a browser, MFA prompt, or sign-in page, but the VPN session never finishes connecting afterward.",
          likelyFix: "Complete the sign-in or approval flow in the browser, return to FortiClient, and note whether the issue started after a phone or password change.",
          collect: "Send a screenshot of the sign-in or MFA page, the work account or username you used, and whether the same MFA method works elsewhere."
        },
        {
          title: "FortiClient says connected, but company resources still do not open",
          symptom: "The tunnel shows as connected, but file shares, internal websites, or remote tools still do not work.",
          likelyFix: "Test a second internal site or path so you can tell whether the whole VPN path is failing or only one app is affected.",
          collect: "Send the resource that fails, whether any other internal site or path works, and a screenshot showing the tunnel connected."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact FortiClient VPN message or connected screen.",
        "The FortiClient tunnel or profile name you selected.",
        "The work account or username format used for the VPN sign-in.",
        "A note about whether the same problem affects every internal resource or only one site, file share, or app."
      ],
      relatedLinks: [
        {
          label: "FortiClient VPN documentation",
          url: "https://docs.fortinet.com/document/forticlient/7.2.10/administration-guide/6364/connecting-to-ssl-or-ipsec-vpn"
        },
        {
          label: "Connecting from FortiClient VPN client",
          url: "https://docs.fortinet.com/document/fortigate/7.6.1/administration-guide/215051/connecting-from-forticlient-vpn-client"
        }
      ]
    }
  },
  citrix: {
    "workspace-app": {
      summary: "Use this guide when Citrix Workspace App will not sign in, the workspace is missing, an .ica file will not launch, or a published app or desktop disconnects or opens incorrectly.",
      overview: [
        "Citrix Workspace App is the client used to open company-published apps and virtual desktops from a Citrix workspace.",
        "Most Citrix Workspace problems come from the wrong workspace URL, sign-in to the wrong account, the browser not handing .ica files to Citrix Workspace App, or a published app or desktop failing after launch."
      ],
      askFirst: [
        "Do you know the exact Citrix workspace URL or company launch page you are supposed to use?",
        "Is the problem signing in, opening the workspace, launching an app or desktop, or staying connected after it opens?",
        "Does the issue happen in the browser launch flow, in Citrix Workspace App, or both?",
        "Did the problem start after a password change, app update, browser change, or new computer setup?"
      ],
      licensing: [],
      install: [
        "Use the company-approved Citrix Workspace App installer or launch link instead of a random download source.",
        "Restart the computer after installation or update if Windows asks you to.",
        "Open the correct company workspace, sign in with the expected work account, and test one published app or desktop before assuming the whole workspace is broken."
      ],
      supportCheckpoints: [
        "Confirm the computer has normal internet access before you retry the Citrix workspace.",
        "Use the exact workspace URL your company provided and make sure the expected work account is being used.",
        "If the browser downloads an .ica file, open it with Citrix Workspace App instead of leaving it in Downloads.",
        "If one published app fails but another Citrix app or desktop works, note that difference before contacting support."
      ],
      commonIssues: [
        {
          title: "The workspace will not sign in or does not show the right apps",
          symptom: "Citrix Workspace App opens, but sign-in loops, the workspace does not load correctly, or the apps and desktops you expect are missing.",
          likelyFix: "Confirm the exact workspace URL and the work account being used, then retry the same workspace after restarting the app or browser once.",
          collect: "Send the workspace URL, the sign-in message or screenshot, and whether the same workspace behaves differently in the browser."
        },
        {
          title: "An .ica file downloads but nothing launches",
          symptom: "You click Launch, but the browser only downloads an .ica file and the Citrix app or desktop never opens.",
          likelyFix: "Open the .ica file with Citrix Workspace App and make sure Citrix Workspace App is installed before retrying the same launch.",
          collect: "Send a screenshot of the downloaded file, the browser you used, and whether Citrix Workspace App is installed on the computer."
        },
        {
          title: "A published app or desktop opens and then disconnects or freezes",
          symptom: "The Citrix session starts, but the published app or desktop disconnects, freezes, or feels unstable after launch.",
          likelyFix: "Restart the local computer and retry the same published resource once, then compare it with a second Citrix app or desktop if one is available.",
          collect: "Send the published app or desktop name, the exact message if one appears, and whether other Citrix resources launch normally."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Citrix Workspace App screen, sign-in message, or launch error.",
        "The Citrix workspace URL or launch page you used.",
        "The published app or virtual desktop name involved in the problem.",
        "The Citrix Workspace App version if you can open Advanced Preferences > About."
      ],
      relatedLinks: [
        {
          label: "Citrix Workspace App for Windows",
          url: "https://docs.citrix.com/en-us/citrix-workspace-app-for-windows.html"
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
  },
  oracle: {
    "primavera-p6": {
      summary: "Use this guide when Oracle Primavera P6 will not sign in, shows the wrong database, opens without the projects you expect, or feels out of sync with your normal work environment.",
      overview: [
        "Oracle Primavera P6 is a project scheduling and planning app used to open and work with schedules, projects, and related planning data.",
        "Most Primavera P6 issues come from the wrong login, the wrong database or environment being selected, or a cached or cloud-connected workspace that is not matching what you expect."
      ],
      askFirst: [
        "Can you confirm the exact Primavera P6 environment or database your team expects you to use?",
        "Are you signing in with the exact P6 login name your company assigned?",
        "Is the problem signing in, opening a project, seeing a project list, or working with local cached content?",
        "Did the issue begin after a reinstall, update, password change, or moving to a new computer?"
      ],
      licensing: [
        "Primavera P6 access depends on the P6 login your company assigned and the database or environment selected in the login dialog.",
        "Oracle's P6 login help notes that login names and passwords are case-sensitive, so type them carefully.",
        "If your company uses a Cloud Connect or cached environment, do not reinitialize the local cache unless support specifically asks you to."
      ],
      install: [
        "Use the company-approved Primavera P6 install or launcher instead of mixing installers from different sources.",
        "Open the login dialog and confirm the correct database or environment appears before you sign in.",
        "After sign-in works, test one smaller project first so you know whether the issue affects the whole app or one project only."
      ],
      supportCheckpoints: [
        "Keep the selected database or environment name handy before you contact support.",
        "If P6 offers more than one database, make sure you are choosing the same one your team normally uses.",
        "If you can sign in but projects are missing, compare one expected project name before changing local data or reinstalling.",
        "If you work remotely and P6 depends on network access, confirm your VPN or remote connection first."
      ],
      commonIssues: [
        {
          title: "The P6 login fails or opens the wrong environment",
          symptom: "Primavera P6 opens the login dialog, but sign-in fails or the database list does not match what you expected.",
          likelyFix: "Recheck the exact login name, password, and selected database or environment before changing the app installation.",
          collect: "Send the database or environment name shown, the exact login message, and a screenshot of the login dialog if possible."
        },
        {
          title: "Projects or schedules are missing after sign-in",
          symptom: "You can open P6, but the expected project list, schedule, or workspace content is missing.",
          likelyFix: "Confirm you signed into the correct database and compare one known project name before resetting anything locally.",
          collect: "Send the project or schedule name you expected, the database or environment selected, and a screenshot of the project list."
        },
        {
          title: "P6 opens slowly or local data looks out of date",
          symptom: "The app opens, but feels unusually slow or seems to show stale local content.",
          likelyFix: "Restart the computer and reopen P6 once before changing cache settings, especially if your team uses Cloud Connect or cached access.",
          collect: "Send the P6 version, whether your team uses a cloud-connected or cached setup, and a screenshot if the app shows any sync or cache wording."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Primavera P6 login dialog or error.",
        "The database or environment name selected in P6.",
        "The project or schedule name involved in the problem.",
        "The Primavera P6 version from Help > About Primavera P6 Professional if you can open it."
      ],
      relatedLinks: [
        {
          label: "Primavera P6 login dialog help",
          url: "https://docs.oracle.com/cd/F37128_01/client_help/en_US/login_to_primavera_dialog_box.htm"
        },
        {
          label: "Primavera P6 user guide",
          url: "https://docs.oracle.com/cd/G48902_01/English/User_Guides/p6_pro_user/p6_pro_user.pdf"
        }
      ]
    }
  },
  browsers: {
    "google-chrome": {
      summary: "Use this guide when a work site, download, sign-in page, or file-opening action is not behaving correctly in Google Chrome.",
      overview: [
        "Chrome is a common browser for work websites, downloads, cloud apps, and single sign-on pages.",
        "Most Chrome problems come from saved site data, blocked pop-ups, extensions, download settings, or the site behaving differently in one browser than another."
      ],
      askFirst: [
        "Is the problem with one work website, all sites, downloads, sign-ins, or opening files from the browser?",
        "Does the same site work in another browser on the same computer?",
        "Did the issue begin after a Chrome update, a browser extension change, or a password or account change?"
      ],
      licensing: [
        "Chrome itself does not normally use a paid product license for work browsing.",
        "Access still depends on the work account you sign in with on the site and any company-required browser profile or sync settings.",
        "If a website works in Edge or another browser but not Chrome, note that before contacting support."
      ],
      install: [
        "Update Chrome to the latest supported version, then close and reopen the browser.",
        "Test the affected work site in a new tab after the restart.",
        "If downloads or file opening are involved, test one simple file after confirming Chrome is updated."
      ],
      supportCheckpoints: [
        "Check whether the same site works in another browser before clearing anything in Chrome.",
        "If pop-ups or sign-in pages are blocked, look for blocked pop-up or site-permission notices near the address bar.",
        "If downloads fail, check Chrome's download prompt and file location settings.",
        "If only one site is failing, note the exact URL before removing extensions or clearing site data."
      ],
      commonIssues: [
        {
          title: "A work site will not sign in correctly",
          symptom: "The site opens, but sign-in loops, closes, or never finishes loading your work session.",
          likelyFix: "Try the same site in another browser and, if Chrome is the only one affected, close and reopen Chrome before retrying.",
          collect: "Send the site URL, the exact sign-in behavior, and whether another browser works."
        },
        {
          title: "Downloads or file-opening actions fail",
          symptom: "The site opens, but downloads do not start or files do not hand off to the expected desktop app.",
          likelyFix: "Check Chrome's download prompt and save-location behavior, then test one simple file again.",
          collect: "Send the file type, the site URL, and a screenshot of the browser message if one appears."
        },
        {
          title: "One site works in another browser but not Chrome",
          symptom: "The same work site behaves normally in another browser, but not in Chrome.",
          likelyFix: "Restart Chrome and note whether the problem is tied to one site only before changing extensions or browser settings.",
          collect: "Send the site URL, the Chrome version, and the name of the other browser that works."
        }
      ],
      supportArtifacts: [
        "A screenshot of the browser message or the failing page.",
        "The exact site URL involved.",
        "The Chrome version from the browser settings.",
        "A note about whether the same site works in another browser."
      ]
    },
    "microsoft-edge": {
      summary: "Use this guide when a work site, download, Microsoft 365 page, or file-opening action is not behaving correctly in Microsoft Edge.",
      overview: [
        "Microsoft Edge is a common browser for Microsoft 365, company web apps, downloads, and file handoffs.",
        "Most Edge problems come from saved site data, blocked pop-ups, wrong browser profiles, download settings, or browser updates that need a restart."
      ],
      askFirst: [
        "Is the issue with sign-in, downloads, opening files, or one specific work site?",
        "Are you using the correct Edge browser profile for work browsing?",
        "Does the same site work in another browser on the same computer?"
      ],
      licensing: [
        "Edge itself does not normally use a paid product license for browsing.",
        "Access to Microsoft 365 and other work sites still depends on the work account or browser profile being used.",
        "If only one Edge profile has the problem, include that when you contact support."
      ],
      install: [
        "Update Edge to the latest supported version and restart the browser fully.",
        "Make sure the correct work browser profile is open before retrying the site.",
        "If downloads or file opening are involved, test one simple file after the browser restart."
      ],
      supportCheckpoints: [
        "Confirm you are using the correct Edge profile before changing settings.",
        "If a work site behaves differently in Chrome or another browser, note that comparison first.",
        "If file handoff is the issue, test whether the file downloads normally before opening it.",
        "If the issue is limited to one site, keep the exact URL handy before contacting support."
      ],
      commonIssues: [
        {
          title: "Edge opens the wrong profile or account",
          symptom: "The site opens, but the wrong work or personal account appears.",
          likelyFix: "Switch to the correct Edge profile and reopen the site before signing in again.",
          collect: "Send the profile name shown, the account you expected to use, and the site URL."
        },
        {
          title: "Microsoft 365 or another work site will not finish loading",
          symptom: "The site partially loads, refreshes repeatedly, or never reaches the expected page.",
          likelyFix: "Restart Edge and compare the same site in another browser before changing anything else.",
          collect: "Send the exact site URL, a screenshot of the page, and whether another browser works."
        },
        {
          title: "Downloads or open-in-app actions fail",
          symptom: "The site opens, but the download or file-open step does not complete the way it should.",
          likelyFix: "Test whether the file downloads normally first, then compare that behavior with another browser if needed.",
          collect: "Send the file type, the site URL, and a screenshot of the browser message if one appears."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Edge message or failing page.",
        "The site URL and the browser profile you are using.",
        "The Edge version from the browser settings.",
        "A note about whether the same site works in another browser."
      ]
    },
    "mozilla-firefox": {
      summary: "Use this guide when a work site, download, sign-in page, or extension-dependent workflow is not behaving correctly in Firefox.",
      overview: [
        "Firefox is a browser some teams use for work sites, downloads, and extension-based workflows.",
        "Most Firefox problems come from saved site data, add-ons, sign-in sessions, downloads, or a site simply behaving differently in Firefox than it does in another browser."
      ],
      askFirst: [
        "Is the issue tied to one work site, downloads, sign-in, or an add-on you rely on?",
        "Does the same site work in another browser on the same computer?",
        "Did the issue begin after a Firefox update or an add-on change?"
      ],
      licensing: [
        "Firefox itself does not normally use a paid product license for browsing.",
        "Access still depends on the work accounts and websites you use in the browser.",
        "If a site works in another browser but not Firefox, include that comparison when you contact support."
      ],
      install: [
        "Update Firefox to the latest supported version, then close and reopen the browser.",
        "Retry the same site or download after the restart.",
        "If an add-on is involved, note the add-on name before contacting support."
      ],
      supportCheckpoints: [
        "Compare the same site in another browser before you assume the site itself is down.",
        "If downloads fail, test one simple file and note where Firefox is trying to save it.",
        "If an add-on is part of the workflow, capture its name and whether the issue began right after it changed.",
        "Keep the exact site URL before clearing settings or contacting support."
      ],
      commonIssues: [
        {
          title: "A work site behaves differently only in Firefox",
          symptom: "The same site works elsewhere, but Firefox shows sign-in loops, display problems, or missing actions.",
          likelyFix: "Restart Firefox and compare the site with another browser before changing add-ons or browser settings.",
          collect: "Send the site URL, the Firefox version, and whether another browser works."
        },
        {
          title: "Downloads do not start or finish normally",
          symptom: "Firefox opens the site, but downloads fail or do not go to the expected location.",
          likelyFix: "Check where Firefox is set to save downloads and retry one simple file.",
          collect: "Send the file type, the download behavior, and the site URL."
        },
        {
          title: "An add-on workflow stopped working",
          symptom: "A work site or process depends on an add-on, but it no longer behaves normally in Firefox.",
          likelyFix: "Capture the add-on name and compare whether the site itself still works without assuming the entire browser is broken.",
          collect: "Send the add-on name, the site URL, and when the issue began."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Firefox message or failing page.",
        "The site URL and the Firefox version.",
        "The add-on name if one is involved.",
        "A note about whether the same site works in another browser."
      ]
    },
    "apple-safari": {
      summary: "Use this guide when a work site, sign-in page, download, or file-opening action is not behaving correctly in Safari on a Mac, iPhone, or iPad.",
      overview: [
        "Safari is Apple's built-in browser for Macs, iPhones, and iPads.",
        "Most Safari problems come from site permissions, pop-up blocking, saved site data, download behavior, or a work site behaving differently in Safari than in another browser."
      ],
      askFirst: [
        "Are you using Safari on a Mac, iPhone, or iPad?",
        "Is the issue tied to sign-in, downloads, file opening, or one specific work site?",
        "Does the same site work in another browser or on another device?"
      ],
      licensing: [
        "Safari itself does not normally use a paid product license for browsing.",
        "Access to work sites still depends on the company account you use on the site and the Apple device you are using.",
        "If the same site works in Chrome or Edge but not Safari, include that comparison when you contact support."
      ],
      install: [
        "Use the latest supported Safari version through normal Apple updates, then restart Safari.",
        "Retry the same sign-in, site, or download after the restart.",
        "If the issue involves file opening, test one simple file after confirming Safari is updated."
      ],
      supportCheckpoints: [
        "If the issue affects one site only, keep the exact site URL handy.",
        "If pop-ups are blocked, note whether Safari shows a pop-up warning for the site.",
        "If downloads fail, test one simple file and note whether the file saves locally or not at all.",
        "If the site works in another browser or on another device, note that before contacting support."
      ],
      commonIssues: [
        {
          title: "A work sign-in page or site does not finish loading in Safari",
          symptom: "The site opens, but sign-in loops, buttons do nothing, or the page does not finish loading correctly.",
          likelyFix: "Restart Safari and compare the same site with another browser or device before changing anything else.",
          collect: "Send the site URL, the Apple device type, and a screenshot of the page or message."
        },
        {
          title: "Downloads or file opening do not behave correctly",
          symptom: "Safari opens the site, but downloads fail or files do not open the way you expect.",
          likelyFix: "Test one simple file and note whether Safari saves it locally before you try to open it.",
          collect: "Send the file type, the site URL, and the exact browser behavior you see."
        },
        {
          title: "The site works in another browser but not Safari",
          symptom: "The same work site works in Chrome, Edge, or Firefox but not in Safari.",
          likelyFix: "Keep that comparison and the exact site URL ready, because that helps support narrow the issue quickly.",
          collect: "Send the site URL, the Safari version, and the other browser that works."
        }
      ],
      supportArtifacts: [
        "A screenshot of the exact Safari message or failing page.",
        "The site URL involved.",
        "Whether you are using Safari on a Mac, iPhone, or iPad.",
        "A note about whether the same site works in another browser or on another device."
      ]
    }
  }
};

export const publicGuideContent = Object.fromEntries(
  [...new Set([...Object.keys(basePublicGuideContent), ...Object.keys(publicGuideContentExtra)])].map(vendorSlug => [
    vendorSlug,
    {
      ...(basePublicGuideContent[vendorSlug] ?? {}),
      ...(publicGuideContentExtra[vendorSlug] ?? {})
    }
  ])
);

export function getPublicGuideContent(vendorSlug, appSlug) {
  return publicGuideContent[vendorSlug]?.[appSlug] ?? {};
}
