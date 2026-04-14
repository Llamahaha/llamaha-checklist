export const publicGuideContent = {
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
  }
};

export function getPublicGuideContent(vendorSlug, appSlug) {
  return publicGuideContent[vendorSlug]?.[appSlug] ?? {};
}
