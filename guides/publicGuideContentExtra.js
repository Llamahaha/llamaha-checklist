function makeIssue(title, symptom, likelyFix, collect) {
  return { title, symptom, likelyFix, collect };
}

function makeHecGuide(name, description, dataTerms, links) {
  return {
    summary: `Use this guide when ${name} will not open the study data you expect, acts differently after a version change, or fails when you try to run or review a model.`,
    overview: [
      `${name} is used for ${description}.`,
      `Most ${name} issues come from version differences, missing project data paths, or one study or data file behaving differently than the rest.`
    ],
    askFirst: [
      `Did the problem start after moving to a new computer, changing versions, or opening a different ${name} project?`,
      `Does the issue affect one ${dataTerms} file or every ${name} workflow on the computer?`,
      "Are the project files stored locally, on a network path, or in a shared engineering folder?",
      "Can another approved workstation open the same study or data set?"
    ],
    licensing: [
      `${name} is generally used without a separate paid end-user seat, so support usually depends on the approved version and the project data you are opening.`,
      "If the app opens but the study does not, note the exact project or data file name before changing the installation.",
      "If your team standardizes on a specific version, include that version when you contact support."
    ],
    install: [
      `Use the approved ${name} version for your team and restart the computer after install or update if Windows asks you to.`,
      `Open ${name} first, then test one smaller known-good study or data file before you open the project that is failing.`,
      "If the workflow depends on shared GIS, terrain, or DSS content, confirm those paths are still available after setup."
    ],
    supportCheckpoints: [
      "Compare the failing study or data file to a second known-good one before reinstalling the app.",
      "Keep the exact version and one affected project name ready before contacting support.",
      "If files are on a network path, confirm the path is still reachable from the computer first."
    ],
    commonIssues: [
      makeIssue(
        "One study or project opens incorrectly",
        `The app launches, but one ${dataTerms} file, study, or project will not open or does not behave the way you expect.`,
        "Test a second known-good file and compare the file path first so you can separate a data problem from an app problem.",
        "Send the exact study or data file name, where it is stored, and the message or screenshot you see."
      ),
      makeIssue(
        "The app feels wrong after a version or computer change",
        `The same ${name} workflow used to work, but now looks different or fails after a reinstall, update, or workstation move.`,
        "Confirm the approved version and compare the same project on another working computer before changing project data.",
        "Send the current version, the previous version if you know it, and whether another approved computer still works."
      )
    ],
    supportArtifacts: [
      `A screenshot of the exact ${name} message or screen where the problem happens.`,
      "The exact project, study, or data file name involved in the problem.",
      `The ${name} version shown in the app.`,
      "A note about whether another approved computer can open the same data."
    ],
    relatedLinks: links
  };
}

function makeBentleyGuide(name, description, projectTerms = "project, datasource, workspace, or model") {
  return {
    summary: `Use this guide when ${name} will not sign in, cannot open the ${projectTerms} you expect, or behaves differently after a workstation, version, or workspace change.`,
    overview: [
      `${name} is part of the Bentley application family used for design, review, modeling, or project work.`,
      `Most ${name} issues come from Bentley sign-in, CONNECTION Client state, product-version mismatch, missing workspace standards, or project data that is not reachable from the computer.`
    ],
    askFirst: [
      "Can you sign in with the Bentley account your company expects?",
      `Is the problem opening ${name}, opening one ${projectTerms}, or seeing the correct tools and standards?`,
      "Did the issue start after a new computer, update, password change, or project move?",
      "Can another approved computer open the same project or datasource?"
    ],
    licensing: [
      `${name} usually depends on the correct Bentley account, product entitlement, and any project or datasource permissions your company assigns.`,
      "If the app opens but says trial, unlicensed, or shows missing products, capture the account shown and the exact message before reinstalling.",
      "If the project or datasource is missing after sign-in, the access path or workspace may matter more than the local install."
    ],
    install: [
      `Use the company-approved ${name} version for your project team.`,
      "Restart the computer after install or update if Windows or the installer asks you to.",
      "Open CONNECTION Client or the Bentley sign-in prompt and confirm the expected work account is active.",
      "Test one known-good project, datasource, or file before opening the exact item that failed earlier."
    ],
    supportCheckpoints: [
      "Compare the affected project or file with a second known-good one before reinstalling the app.",
      "Keep the exact Bentley account, app version, project name, datasource, and workspace name ready for support.",
      "If workspaces, standards, fonts, or templates are missing, compare with another approved computer before clearing local data."
    ],
    commonIssues: [
      makeIssue(
        "Bentley sign-in or entitlement does not look right",
        `${name} opens, but the expected account, entitlement, or product access is missing.`,
        "Sign out and back in with the correct Bentley account, then compare the product entitlement and message before reinstalling.",
        "Send the Bentley account shown, the exact message, and whether other Bentley apps sign in correctly."
      ),
      makeIssue(
        "Project, datasource, or workspace content is missing",
        `${name} launches, but the expected ${projectTerms} is missing or does not load correctly.`,
        "Confirm the project path, datasource, and workspace standard against another approved computer before changing local files.",
        `Send the ${projectTerms} name, the path or datasource shown, and a screenshot of what is missing.`
      )
    ],
    supportArtifacts: [
      `A screenshot of the exact ${name} message or missing screen.`,
      "The Bentley account shown in the app or CONNECTION Client.",
      `The ${name} version shown in the app.`,
      `The affected ${projectTerms} name and where it should be available.`,
      "Whether another approved computer can open the same item."
    ]
  };
}

function makeAdobeCreativeGuide(name, workType, assetTerms) {
  return {
    summary: `Use this guide when ${name} will not activate, opens under the wrong Adobe profile, or cannot find the ${assetTerms} you need for ${workType}.`,
    overview: [
      `${name} is an Adobe Creative Cloud app used for ${workType}.`,
      `Most ${name} issues come from the wrong Adobe profile, missing fonts or assets, plug-ins or presets that were not restored, or a file that depends on shared content.`
    ],
    askFirst: [
      "Are you signed in with the correct work Adobe account and company profile?",
      `Is the problem activation, opening a file, missing ${assetTerms}, exporting, or a tool behaving differently?`,
      "Did the issue begin after a new computer, Adobe update, profile change, or moving a project folder?",
      "Does the same file work on another approved computer?"
    ],
    licensing: [
      `${name} access usually depends on the correct Adobe work account and the right company profile or product assignment.`,
      "If the app opens as Trial or asks you to buy a subscription, sign out and back in with the work Adobe account before reinstalling.",
      `If one file fails but ${name} opens normally, keep the file path and any missing ${assetTerms} names ready.`
    ],
    install: [
      "Open Creative Cloud Desktop and confirm the correct work profile is active.",
      `Install or update ${name} through the company-approved Adobe path, then restart if prompted.`,
      `Open one simple file first, then test a file that uses the ${assetTerms} your workflow depends on.`
    ],
    supportCheckpoints: [
      `If ${assetTerms} are missing, compare the same file on another approved computer before reinstalling.`,
      "If export or open fails, confirm the destination path still exists and you can write to it.",
      "Capture the Adobe account and profile before contacting support about activation."
    ],
    commonIssues: [
      makeIssue(
        `Fonts, plug-ins, presets, or ${assetTerms} are missing`,
        `The app opens, but expected ${assetTerms}, fonts, plug-ins, presets, or shared content are unavailable.`,
        "Compare the same workflow on another approved computer and confirm the shared content path before changing the app install.",
        `Send the file name, missing ${assetTerms} names, and a screenshot of the warning or missing tool.`
      ),
      makeIssue(
        `${name} opens as Trial or cannot activate`,
        "The app launches, but Adobe sign-in or activation does not match the work entitlement you expected.",
        "Sign out and back in with the correct work Adobe account and company profile before reinstalling.",
        "Send the Adobe account shown, the company profile selected, and the exact activation message."
      )
    ],
    supportArtifacts: [
      `A screenshot of the exact ${name} message or warning.`,
      "The Adobe account and company profile shown in Creative Cloud Desktop.",
      `The ${name} version shown in the app.`,
      `The file name and any missing ${assetTerms}, font, plug-in, or preset names.`
    ]
  };
}

function makeFoxitGuide(name, purpose, featureTerms) {
  return {
    summary: `Use this guide when ${name} will not open PDFs, shows the wrong license state, or does not handle ${featureTerms} the way you expect.`,
    overview: [
      `${name} is used for ${purpose}.`,
      `Most ${name} issues come from default PDF settings, account or activation state, browser handoff behavior, or one PDF file behaving differently than the rest.`
    ],
    askFirst: [
      "Is the problem opening PDFs, editing PDFs, signing in, printing, or browser handoff?",
      "Does the same PDF open in another approved PDF app or browser?",
      "Did the issue begin after a Windows update, new computer, license change, or default-app change?"
    ],
    licensing: [
      `${name} access depends on the product your company assigned and the activation method your environment uses.`,
      "If the app opens but editing features are unavailable, capture whether it says Reader, Trial, Sign In, or Activation.",
      "If only one PDF fails, the file itself or its location may matter more than the product license."
    ],
    install: [
      `Install or update the company-approved ${name} build.`,
      "Open one simple PDF first, then test the PDF or browser workflow that was failing.",
      "Confirm Windows default PDF settings if files keep opening in a different app."
    ],
    supportCheckpoints: [
      "Test a second PDF before changing the app installation.",
      "Check the Windows default PDF app if double-clicking opens the wrong product.",
      "Keep the file type, browser, and exact message ready if the issue starts from a website download."
    ],
    commonIssues: [
      makeIssue(
        "PDFs open in the wrong app",
        "Double-clicking a PDF or opening one from a browser launches a different PDF program than expected.",
        "Change the Windows default app for PDF files or note if your company manages defaults by policy.",
        "Send the PDF file type, current default app, expected default app, and whether the setting changes back."
      ),
      makeIssue(
        "Editing, signing, or plugin features are missing",
        `${name} opens the file, but expected ${featureTerms} are missing or disabled.`,
        "Confirm the product edition and sign-in or activation state before reinstalling.",
        "Send the Foxit product name, version, activation message, and screenshot of the missing feature."
      )
    ],
    supportArtifacts: [
      `A screenshot of the exact ${name} message or missing feature.`,
      `The ${name} version shown in the app.`,
      "The PDF file name and where it is stored.",
      "Whether a second PDF or another browser behaves the same way."
    ]
  };
}

function makeQuickBooksGuide(name, workflowType) {
  return {
    summary: `Use this guide when ${name} will not sign in, cannot reach the expected company file or company, or has printing, PDF, browser, or role-access problems.`,
    overview: [
      `${name} is used for ${workflowType}.`,
      `Most ${name} issues come from the wrong company, role, company-file path, hosting state, browser profile, or finance approval rather than the app alone.`
    ],
    askFirst: [
      "Which company or company file are you trying to open?",
      "Is the problem sign-in, company selection, multi-user access, printing, PDFs, banking, or a missing role?",
      "Did the issue begin after a password change, new computer, update, role change, or company-file move?",
      "Can another approved user open the same company or company file?"
    ],
    licensing: [
      `${name} access depends on the product, company membership, and role your finance or admin owner assigned.`,
      "If the app opens but the company or features are missing, capture the company name and role expectation before changing the install.",
      "For desktop company files, the file path, hosting state, and network access can be just as important as licensing."
    ],
    install: [
      `Use the company-approved ${name} access path or installer.`,
      "Confirm the correct company or company-file path before opening live finance data.",
      "Test sign-in, one company open, one report or list view, and one print or PDF task if those are part of the issue."
    ],
    supportCheckpoints: [
      "Keep the company name, company-file path, user role, and exact year or version ready.",
      "If printing or PDF export fails, test a simple report before rebuilding the app.",
      "If browser access works but the desktop app does not, include that comparison for support."
    ],
    commonIssues: [
      makeIssue(
        "The expected company or company file is missing",
        `${name} opens, but the company, file, or role you expected is not available.`,
        "Confirm the exact company name, file path, hosting model, and user role before changing the app installation.",
        "Send the company name, file path if desktop, user role expected, and whether another user can open it."
      ),
      makeIssue(
        "Printing, PDF, or export fails",
        `${name} opens, but printing, saving as PDF, or exporting a report does not work correctly.`,
        "Test one simple report and confirm the printer or PDF default before treating the whole app as broken.",
        "Send the report name, printer or PDF behavior, exact message, and whether other apps can print."
      )
    ],
    supportArtifacts: [
      `A screenshot of the exact ${name} message or missing company view.`,
      "The company or company-file name involved.",
      `The ${name} version or year if shown.`,
      "The user role or access level expected.",
      "Whether another approved user can open the same company."
    ]
  };
}

function makeMathcadGuide() {
  return {
    summary: "Use this guide when Mathcad Prime will not open worksheets, cannot find the expected license, or is missing templates and shared calculation content.",
    overview: [
      "Mathcad Prime is an engineering calculation environment used for worksheets, templates, and technical calculations.",
      "Most Mathcad Prime issues come from license-source configuration, version mismatch, missing templates, or one worksheet behaving differently than the rest."
    ],
    askFirst: [
      "Is the problem launching Mathcad Prime, acquiring a license, opening one worksheet, or finding templates?",
      "Did the issue begin after a new computer, version change, VPN change, or license change?",
      "Can another approved computer open the same worksheet or template?"
    ],
    licensing: [
      "Mathcad Prime may use named-user, floating, or company-managed license behavior depending on your environment.",
      "If Mathcad cannot acquire a license, capture the exact message before reinstalling.",
      "If worksheets open but templates are missing, the shared template path may matter more than the license."
    ],
    install: [
      "Use the company-approved Mathcad Prime version.",
      "Restart after install if Windows asks you to.",
      "Open one simple worksheet first, then test the worksheet or template that failed earlier."
    ],
    supportCheckpoints: [
      "Compare one known-good worksheet before reinstalling.",
      "Keep the exact Prime version and license message ready.",
      "If your license depends on VPN or a network path, confirm that connection before changing Mathcad."
    ],
    commonIssues: [
      makeIssue(
        "Mathcad Prime cannot acquire a license",
        "The app opens or starts to open, but the license source is unavailable or the expected entitlement is missing.",
        "Confirm the license message, network or VPN state, and expected license source before reinstalling.",
        "Send the license message, current network or VPN state, and Mathcad Prime version."
      ),
      makeIssue(
        "Worksheets or templates are missing",
        "Mathcad opens, but shared templates, examples, or expected worksheet paths are missing.",
        "Confirm the shared template path and compare with another approved computer before changing the install.",
        "Send the worksheet or template name, the expected path, and whether another computer can open it."
      )
    ],
    supportArtifacts: [
      "A screenshot of the exact Mathcad Prime message.",
      "The Mathcad Prime version shown in the app.",
      "The worksheet or template name involved.",
      "Whether another approved computer can open the same worksheet."
    ]
  };
}

export const publicGuideContentExtra = {
  microsoft: {
    outlook: {
      mobileSetup: [
        "Install Outlook from the App Store or Google Play and add the same work email account you use on your computer.",
        "Finish any company sign-in, approval, or device-registration prompts before assuming setup failed.",
        "Allow notifications and calendar access if you expect Outlook on your phone to show mail alerts or calendar events.",
        "If you recently changed phones, note whether the old phone still receives mail or prompts before you contact support."
      ]
    },
    teams: {
      mobileSetup: [
        "Install Teams from the App Store or Google Play and sign in with the same work account you use on your computer.",
        "Allow microphone, camera, and notifications if you plan to join meetings or receive chat and call alerts on your phone.",
        "If Teams on your computer works but the phone app does not, keep that comparison ready for support.",
        "If you changed phones recently, note whether the old phone still shows Teams notifications or approval prompts."
      ]
    },
    onedrive: {
      mobileSetup: [
        "Install OneDrive on the phone and sign in with the same work account you use for Microsoft 365.",
        "Let OneDrive finish signing in before you try to browse shared files or upload photos or documents from the phone.",
        "If shared libraries or shortcuts are missing on the phone, compare them with OneDrive in the browser first.",
        "If the phone app shows the wrong account or tenant, sign out before adding the correct work account again."
      ]
    },
    sharepoint: {
      summary: "Use this guide when a SharePoint site or library will not open, sync stops updating, or files will not open in the browser or desktop app the way you expect.",
      overview: [
        "SharePoint is Microsoft's document, site, and collaboration platform for shared team files and libraries.",
        "Most SharePoint issues come from the wrong site or library link, missing permissions, sync mismatch, or opening the file from the wrong browser or account."
      ],
      askFirst: [
        "Can you open the exact site or library in the browser with the work account you expected to use?",
        "Is the problem opening the site, seeing files, syncing the library, or opening files in the desktop app?",
        "Did the issue begin after a site move, folder rename, permission change, or new computer?"
      ],
      licensing: [
        "SharePoint access usually depends on the same Microsoft 365 work account used for Outlook, Teams, and OneDrive.",
        "If the site opens in the browser but not in the desktop app, note that difference before contacting support.",
        "If only one library is missing, keep the site URL and library name ready."
      ],
      install: [
        "There is no separate desktop install for SharePoint itself, but your browser, Microsoft 365 sign-in, and OneDrive sync app all matter.",
        "Start by opening the site in the browser, then test one file from the correct library.",
        "If your workflow depends on sync, confirm the correct library name appears in the OneDrive app before making changes."
      ],
      supportCheckpoints: [
        "Use the browser as the source of truth before you change local sync or Office settings.",
        "Compare one working library or file to the failing one if you can.",
        "If open-in-app is the problem, note the browser you used and whether the same file opens another way."
      ],
      commonIssues: [
        makeIssue(
          "The site opens, but the library or files are missing",
          "You can reach SharePoint, but the folder, file, or library you need is not there or does not match what you expected.",
          "Confirm the exact site and library in the browser first and compare the path to what you were expecting before you change sync settings.",
          "Send the site URL, the library name, and a screenshot of what is missing."
        ),
        makeIssue(
          "Files will not open in the desktop app",
          "The file is visible in SharePoint, but opening it in Word, Excel, PowerPoint, or another desktop app does not work correctly.",
          "Test the same file in the browser first and note the browser you used before you reset anything locally.",
          "Send the file type, the site URL, the browser used, and the exact error or behavior you see."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact SharePoint message or missing library view.",
        "The site URL and library name involved in the problem.",
        "The work account used to open the site.",
        "A note about whether the same library works in OneDrive sync or in another browser."
      ],
      mobileSetup: [
        "Open the SharePoint site or library from the same Microsoft 365 work account you use on your computer.",
        "If the library is opening through OneDrive on your phone, compare it with the browser version first.",
        "If a file opens in the browser but not in the mobile app, keep the file type and the phone type ready for support.",
        "If you are using Outlook, Teams, or OneDrive on the same phone, note whether those apps are signed in correctly too."
      ],
      relatedLinks: [
        { label: "Fix SharePoint Online sync problems", url: "https://support.microsoft.com/en-au/office/fix-sharepoint-online-sync-problems-aaa2d172-8d45-4e94-9c04-5364d04ca2f4" },
        { label: "Fix OneDrive sync problems", url: "https://support.microsoft.com/en-us/office/fix-onedrive-sync-problems-52a86836-1e7f-46fd-85c7-1e7a5e9b4273" }
      ]
    },
    "microsoft-authenticator": {
      mobileSetup: [
        "Install Microsoft Authenticator on the phone you plan to keep using and add your work or school account by scanning the QR code when your company setup page shows it.",
        "Allow camera access so the app can scan the QR code and allow notifications if your company uses push approvals.",
        "If you changed phones, keep the old-phone status clear because support may need to know whether approval prompts are still landing there.",
        "Add a backup sign-in method if your company offers one so you are not locked out if you lose the phone."
      ],
      relatedLinks: [
        { label: "How to add your accounts to Microsoft Authenticator", url: "https://support.microsoft.com/en-us/account-billing/how-to-add-your-accounts-to-microsoft-authenticator-92544b53-7706-4581-a142-30344a2a2a57" }
      ]
    },
    project: {
      summary: "Use this guide when you cannot open a Microsoft Project (.mpp) file, Project for the web is empty, or you are not sure which Project license you actually have.",
      overview: [
        "There are three different Microsoft Project products: Project Professional (desktop, opens .mpp files), Project for the web (browser at https://project.microsoft.com), and Project Online (the older PWA-based product).",
        "Most Project tickets are confusion about which product is licensed and installed — Project is not part of standard Microsoft 365 Apps and must be assigned separately."
      ],
      askFirst: [
        "Are you trying to open an .mpp file, create a plan in https://project.microsoft.com, or reach a Project Online (PWA) site?",
        "Has your IT or admin assigned you Project Plan 1, Project Plan 3, or Project Plan 5?",
        "Did the issue start after a license change, role change, or new computer?",
        "Does another Project user with the same license see the same problem?"
      ],
      licensing: [
        "Project Plan 1 unlocks Project for the web only. Plan 3 unlocks Project for the web plus Project Professional desktop and Project Online. Plan 5 adds portfolio features.",
        "If you double-click an .mpp and nothing happens, you likely do not have Project Professional installed — it does not come with Office or Microsoft 365 Apps.",
        "Project for the web access requires a Project license assigned in Microsoft 365 Admin Center, even if the rest of Microsoft 365 works."
      ],
      install: [
        "If you have Project Plan 3 or 5, install Project Professional from your Office 365 portal at https://portal.office.com under Apps & devices.",
        "For Project for the web, simply browse to https://project.microsoft.com and sign in with your work account.",
        "For Project Online (PWA), open the PWA site URL your team gave you and sign in with your work account."
      ],
      supportCheckpoints: [
        "Confirm with your IT admin which Project license is assigned to you before assuming the install is broken.",
        "Test https://project.microsoft.com in a fresh browser window to isolate Project for the web from desktop Project issues.",
        "If you only have Plan 1, you cannot open .mpp files — the file needs to be re-created in Project for the web or opened by someone with Plan 3."
      ],
      commonIssues: [
        makeIssue(
          "Cannot open an .mpp file",
          "You double-click an .mpp file but nothing happens or Windows asks which app should open it.",
          "Confirm you have Project Plan 3 or 5 assigned and that Project Professional is installed from your Office 365 portal — Project Professional is not part of Microsoft 365 Apps.",
          "Send the .mpp file path, your Project license if you know it, and whether Project Professional appears in your Start menu."
        ),
        makeIssue(
          "Project for the web is empty or won't open",
          "You open https://project.microsoft.com but cannot create plans or see your work.",
          "Confirm a Project license is assigned to your account in Microsoft 365 Admin Center, then try a fresh browser profile.",
          "Send your work account, the Project license assigned, and a screenshot of the project.microsoft.com page."
        ),
        makeIssue(
          "Project Online (PWA) site won't load",
          "You cannot reach the Project Online site for your team.",
          "Confirm the PWA URL your team uses, that you are a member of that PWA site, and that Project Plan 3 or 5 is assigned.",
          "Send the PWA URL, your account, the exact error, and your Project license."
        )
      ],
      supportArtifacts: [
        "A screenshot of the issue (the missing Project app, the empty project.microsoft.com page, or the PWA error).",
        "Your work account email.",
        "The Project license you believe is assigned (Plan 1, 3, or 5), if you know it.",
        "The exact .mpp filename and path, if applicable."
      ],
      relatedLinks: [
        { label: "Microsoft Project help", url: "https://support.microsoft.com/en-us/project" },
        { label: "Project plans comparison", url: "https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software" }
      ]
    }
  },
  adobe: {
    "creative-cloud-desktop": {
      summary: "Use this guide when Creative Cloud Desktop will not sign in, shows the wrong company profile, or cannot install or update the Adobe apps assigned to your work account.",
      overview: [
        "Creative Cloud Desktop is the Adobe sign-in, update, and app-management layer for Acrobat, Photoshop, Illustrator, InDesign, and other Adobe apps.",
        "Most Creative Cloud Desktop issues come from the wrong Adobe account, the wrong company profile, network blocks, or an app assignment that has not reached the desktop yet."
      ],
      askFirst: [
        "Are you signed in with your work Adobe account rather than a personal Adobe ID?",
        "If Adobe asks you to choose a profile, did you select the company or business profile?",
        "Is the issue sign-in, app install, app update, Trial wording, or missing app tiles?",
        "Do other Adobe apps open with the same account?"
      ],
      licensing: [
        "Adobe app access usually depends on the product profile or license assigned to your work Adobe account.",
        "If app tiles are missing or a product opens as Trial, capture the Adobe account and profile shown before reinstalling.",
        "If your company manages Adobe packages, use the company-approved install path rather than a personal Adobe download."
      ],
      install: [
        "Install or update Creative Cloud Desktop through the company-approved Adobe path.",
        "Sign in with the work Adobe account and select the company profile if prompted.",
        "Open one assigned Adobe app after sign-in so you can confirm activation reaches the desktop."
      ],
      supportCheckpoints: [
        "Sign out and back in only after you know which Adobe account and profile should be used.",
        "If only one Adobe app is missing, note that app name instead of reinstalling the whole Adobe stack.",
        "If downloads or updates fail, keep the exact install or update message ready."
      ],
      commonIssues: [
        makeIssue(
          "The wrong Adobe profile or account is active",
          "Creative Cloud Desktop opens, but app access or Trial wording does not match the work subscription you expected.",
          "Sign out and sign back in with the work Adobe account, then choose the company profile if Adobe prompts for one.",
          "Send the Adobe account shown, the profile selected, and a screenshot of the Trial or access message."
        ),
        makeIssue(
          "Assigned Adobe apps are missing or will not install",
          "Creative Cloud Desktop opens, but the app you need is missing, disabled, or fails during install.",
          "Confirm the exact app name and whether any other Adobe apps install before changing the computer.",
          "Send the app name, install message, and whether other assigned Adobe apps appear."
        )
      ],
      supportArtifacts: [
        "A screenshot of the Creative Cloud Desktop account or profile view.",
        "The Adobe app name that is missing, trialing, or failing to install.",
        "The exact install, update, or activation message.",
        "Whether other Adobe apps open correctly."
      ]
    },
    photoshop: makeAdobeCreativeGuide("Photoshop", "image editing, design cleanup, and creative production", "presets, plug-ins, fonts, actions, brushes, or linked assets"),
    illustrator: makeAdobeCreativeGuide("Illustrator", "vector artwork, logos, diagrams, and print-ready graphics", "fonts, swatches, templates, plug-ins, or linked assets"),
    indesign: {
      summary: "Use this guide when Adobe InDesign will not activate, linked assets or fonts are missing, or documents will not open, package, or export correctly.",
      overview: [
        "InDesign is Adobe's page-layout and publishing app for brochures, books, reports, and print-ready document packages.",
        "Most InDesign issues come from the wrong Adobe profile, missing fonts, broken linked assets, or a document that depends on files stored somewhere else."
      ],
      askFirst: [
        "Is the problem activation, opening a document, missing fonts or links, exporting, or packaging a job?",
        "Did the issue begin after a workstation change, font change, Adobe sign-in change, or moving a document folder?",
        "Does the same document work on another approved computer?"
      ],
      licensing: [
        "InDesign access usually depends on the correct Adobe work account and, in many organizations, the correct enterprise or company profile at sign-in.",
        "If InDesign opens as Trial or asks you to start a subscription, sign out and back in with the work Adobe account before trying bigger repairs.",
        "If one document fails but the app opens normally, keep the document path and the linked-asset path ready."
      ],
      install: [
        "Close InDesign, install pending Adobe updates, and restart the computer if Adobe or Windows asks you to.",
        "Open InDesign after the restart and confirm the correct work Adobe account is shown.",
        "Test one simple document and one document with linked assets if your workflow depends on placed graphics."
      ],
      supportCheckpoints: [
        "If fonts or links are missing, compare the same document on another approved computer before reinstalling InDesign.",
        "If packaging or export fails, confirm the destination path still exists and you can write to it.",
        "If activation is the problem, capture the account and profile being used before you contact support."
      ],
      commonIssues: [
        makeIssue(
          "Fonts or linked assets are missing",
          "The document opens, but images, fonts, or linked content are missing or show warnings.",
          "Check whether the linked files or fonts still exist in the expected location before changing the app installation.",
          "Send the document name, the missing font or link name, and a screenshot of the warning."
        ),
        makeIssue(
          "InDesign opens as Trial or cannot activate",
          "The app launches, but Adobe sign-in or activation does not match the work entitlement you expected.",
          "Sign out and back in with the correct work Adobe account or work profile before reinstalling.",
          "Send the Adobe account shown, the exact activation message, and whether other Adobe apps work."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact InDesign message or warning.",
        "The Adobe account shown in the app.",
        "The document name and where it is stored.",
        "Any missing font or linked-asset names shown by InDesign."
      ],
      relatedLinks: [
        { label: "Adobe InDesign Help", url: "https://helpx.adobe.com/indesign/user-guide.html" }
      ]
    },
    "acrobat-sign": {
      summary: "Use this guide when Adobe Acrobat Sign will not send agreements, the signer says they did not get the email, or the Send for Signature tools are missing in Acrobat.",
      overview: [
        "Acrobat Sign is the Adobe electronic-signature service used to send documents for signature, route them between signers, and store the signed copy.",
        "Most Acrobat Sign issues come from a missing product profile on your Adobe work account, the wrong signer email on the agreement, or the signer's email being filtered."
      ],
      askFirst: [
        "Are you the sender, a signer, or trying to manage a template?",
        "What is the exact agreement name and what does the Manage page say it is doing right now?",
        "Which email address is Acrobat Sign delivering to, and is that mailbox actually monitored?",
        "Did the issue start after a profile change in Adobe, an email alias change, or a template update?"
      ],
      licensing: [
        "Acrobat Sign access is assigned through an Adobe Acrobat Sign product profile in Adobe Admin Console; it is separate from Acrobat itself.",
        "If Acrobat opens but Send for Signature is missing or grayed, capture the Adobe account, the company profile shown, and a screenshot of the missing tool.",
        "Personal Adobe accounts cannot send work agreements; you must be signed in with the work Adobe account in the company profile."
      ],
      install: [
        "There is no required desktop install for the core service — Acrobat Sign runs in the browser at https://secure.adobesign.com or through the Send for Signature tool inside Acrobat.",
        "Sign into Creative Cloud Desktop with the work Adobe account and confirm you are in the company profile, not a personal one.",
        "Open Acrobat and confirm Send for Signature appears in the right-hand pane or under Tools."
      ],
      supportCheckpoints: [
        "Open the agreement on the Manage page and capture the recipient status before resending or recreating it.",
        "Confirm the signer email on the agreement matches a real, monitored mailbox before assuming Acrobat Sign failed to deliver.",
        "If Send for Signature is missing in Acrobat, capture the Adobe account and company profile shown in Creative Cloud Desktop."
      ],
      commonIssues: [
        makeIssue(
          "The signer says they didn't get the email",
          "You sent an agreement, but the signer reports no Acrobat Sign email arrived.",
          "Open the agreement on the Manage page, confirm the signer email is correct, then either resend or share the signing link directly instead of recreating the agreement.",
          "Send the agreement name, the signer email, and a screenshot of the Manage page activity log."
        ),
        makeIssue(
          "Send for Signature is missing in Acrobat",
          "Acrobat opens, but the Send for Signature tool is missing or grayed out.",
          "Confirm you are signed into Acrobat with your work Adobe account in the company profile; an Acrobat Sign product profile must be assigned in Adobe Admin Console.",
          "Send the Adobe account shown, the company profile shown, the Acrobat version, and a screenshot of the Tools pane."
        )
      ],
      supportArtifacts: [
        "A screenshot of the agreement Manage page or the missing Send for Signature tool.",
        "The Adobe account and company profile shown in Creative Cloud Desktop.",
        "The agreement name and signer email involved.",
        "The Acrobat version shown in Help > About."
      ],
      relatedLinks: [
        { label: "Adobe Acrobat Sign Help", url: "https://helpx.adobe.com/sign/user-guide.html" }
      ]
    }
  },
  autodesk: {
    "infoworks-icm": {
      summary: "Use this guide when InfoWorks ICM will not sign in, open the model or database you expect, or runs slowly or incorrectly after a version or workstation change.",
      overview: [
        "InfoWorks ICM is Autodesk's hydraulic and hydrologic modeling platform for drainage, flood, network, and scenario analysis workflows.",
        "Most InfoWorks ICM issues come from the wrong Autodesk account, version mismatch, unavailable model data, or a project database path that no longer matches what the team expects."
      ],
      askFirst: [
        "Is the problem sign-in, opening a model, opening a database, running a simulation, or exporting results?",
        "Did the issue begin after a workstation change, Autodesk update, or moving the model data?",
        "Can another approved computer open the same model or database?"
      ],
      licensing: [
        "InfoWorks ICM access usually depends on the Autodesk account your organization assigned and the approved InfoWorks ICM version for the team.",
        "If sign-in works but the model will not open, keep the model or database path ready before you contact support.",
        "If your team standardizes on a specific release, include that exact version when describing the issue."
      ],
      install: [
        "Use the approved Autodesk delivery path and the correct InfoWorks ICM version for the team.",
        "Restart the computer after install or update if Windows asks you to.",
        "After sign-in works, test one known-good model or database before opening the workflow that is failing."
      ],
      supportCheckpoints: [
        "Compare the failing model or database with a second known-good one before reinstalling the app.",
        "Keep the model path, database name, and exact version ready before contacting support.",
        "If the issue is performance-related, note whether it affects one model only or every simulation."
      ],
      commonIssues: [
        makeIssue(
          "A model or database will not open",
          "InfoWorks ICM launches, but the model, database, or project you need does not open correctly.",
          "Confirm the exact model or database path and compare it with another working model before changing the installation.",
          "Send the model or database name, where it is stored, and the exact message you see."
        ),
        makeIssue(
          "The app feels unusually slow or unstable",
          "InfoWorks ICM opens, but model actions, loading, or simulations are much slower than expected or fail partway through.",
          "Restart the computer, note whether the issue affects every model, and capture the exact version before bigger repairs.",
          "Send the version, the model name, the action you were running, and a screenshot if the app shows an error."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact InfoWorks ICM message or screen.",
        "The Autodesk account shown in the app.",
        "The model or database name involved in the problem.",
        "The InfoWorks ICM version shown in the app."
      ],
      relatedLinks: [
        { label: "InfoWorks ICM product page", url: "https://www.autodesk.com/products/infoworks-icm/overview" },
        { label: "Autodesk Support", url: "https://www.autodesk.com/support" }
      ]
    },
    "construction-cloud": {
      summary: "Use this guide when Autodesk Construction Cloud (Docs, Build, Takeoff, or BIM 360) will not sign in, the project you expect is missing, or Desktop Connector or Revit cannot reach the cloud model.",
      overview: [
        "Autodesk Construction Cloud (ACC) is the Autodesk project hub used for Docs, Build, Takeoff, and the legacy BIM 360 workflows.",
        "Most ACC issues come from being signed in with the wrong Autodesk account, not being added as a project member, or Desktop Connector running with a different account than the browser."
      ],
      askFirst: [
        "Which Autodesk account email are you signed in with at https://acc.autodesk.com?",
        "Is the project missing entirely, or do you see the hub but not the project?",
        "Did the project admin invite the exact email you use to sign in?",
        "Is the failure in the browser, Desktop Connector, the Revit or Civil 3D add-in, or the mobile app?"
      ],
      licensing: [
        "ACC access depends on the Autodesk account assigned to your work email and being added as a project member by an admin (not just an account member).",
        "If you can sign in but the project is missing, the issue is almost always project membership, not licensing.",
        "Desktop Connector, Revit, Civil 3D, and the browser must all be signed in with the same Autodesk account to see the same projects."
      ],
      install: [
        "Use the company-approved Autodesk Desktop Connector installer if you need files synced locally.",
        "Sign into Creative Cloud or the Autodesk desktop app with your work Autodesk account first.",
        "Confirm the same account at https://acc.autodesk.com in the browser before opening the model in Revit or Civil 3D."
      ],
      supportCheckpoints: [
        "Always confirm what you can see at https://acc.autodesk.com in the browser before troubleshooting Desktop Connector.",
        "If a project is missing, ask the project admin to confirm the invite went to the exact email you sign in with.",
        "If Desktop Connector is out of sync, capture the account it shows and compare it with the browser."
      ],
      commonIssues: [
        makeIssue(
          "I can't see this project",
          "You sign into ACC but the project you expected is not in the list.",
          "Confirm the email you are signed in with matches the email the project admin invited, and ask the admin to verify project membership (not just account membership).",
          "Send the Autodesk account email you used, the project name, and a screenshot of the ACC hub view."
        ),
        makeIssue(
          "Desktop Connector is not syncing",
          "Files are visible in the browser but Desktop Connector shows stale data or sync errors.",
          "Sign out of Desktop Connector, sign back in with the same account the browser uses, and let it complete a full sync before assuming files are missing.",
          "Send the Desktop Connector account, the project and folder, the sync error, and the Desktop Connector version."
        ),
        makeIssue(
          "Revit or Civil 3D cannot open the cloud model",
          "Revit or Civil 3D opens but the ACC model fails to open or check out.",
          "Confirm you are a project member, the model is not already checked out by someone else, and your host app version is supported by ACC.",
          "Send the host app and version, the model name, the Autodesk account, and the exact error."
        )
      ],
      supportArtifacts: [
        "A screenshot of the ACC hub or project list at https://acc.autodesk.com.",
        "The Autodesk account email you signed in with.",
        "The project name and the model or file involved.",
        "The host app (Revit, Civil 3D) and version, if applicable."
      ],
      relatedLinks: [
        { label: "Autodesk Construction Cloud help", url: "https://help.autodesk.com/view/BUILD/ENU/" },
        { label: "Autodesk Desktop Connector", url: "https://help.autodesk.com/view/CONNECT/ENU/" }
      ]
    },
    vault: {
      summary: "Use this guide when Autodesk Vault will not sign in, says a file is locked by another user, or the Vault tools are missing in Inventor, AutoCAD, or Revit.",
      overview: [
        "Autodesk Vault is the Autodesk product-data-management system used to check files in and out of a controlled vault server.",
        "Most Vault tickets are real check-out conflicts, host-app integration version mismatches, or the wrong Vault server selected at sign-in."
      ],
      askFirst: [
        "Which Vault server are you signing into and is it the right one for the project?",
        "Is the failure sign-in, check-out, check-in, browsing, or a host-app add-in for Inventor, AutoCAD, or Revit?",
        "If a file is locked, do you know who has it checked out and whether they are still active at the company?",
        "Did the issue start after a Vault upgrade, host-app upgrade, new computer, or password change?"
      ],
      licensing: [
        "Vault access depends on your Autodesk account being added as a Vault user by your Vault admin.",
        "Vault client and server versions must match within Autodesk's supported compatibility window — a too-old or too-new client can fail to connect.",
        "If a Vault tool is missing in Inventor, AutoCAD, or Revit, the integration was likely not installed or the host-app year does not match."
      ],
      install: [
        "Use the company-approved Vault client matching your Vault server year.",
        "After install, sign in with your work Autodesk account and confirm the correct Vault server is selected.",
        "Open Inventor, AutoCAD, or Revit and confirm the Vault ribbon appears."
      ],
      supportCheckpoints: [
        "Check the file's status in Vault Explorer or the Vault web client before assuming the lock is wrong.",
        "Confirm the Vault client version matches the server release before reinstalling.",
        "If a file is checked out by an inactive user, IT can have a Vault admin release the check-out."
      ],
      commonIssues: [
        makeIssue(
          "File is locked by another user",
          "You try to check out a file but Vault says it is already checked out.",
          "Open Vault Explorer to see who has the file, ask that person to check it back in, or contact IT to release it if that person is offboarded or unreachable.",
          "Send the file name and path, the user shown as having it checked out, and whether that user is still active."
        ),
        makeIssue(
          "Vault tools are missing in Inventor, AutoCAD, or Revit",
          "Your host app opens but the Vault ribbon or commands are not there.",
          "Confirm with IT that the matching Vault integration was installed for your host-app year and that you are signed into Vault from inside the host app.",
          "Send the host app and year, the Vault client version, and a screenshot of the missing ribbon."
        ),
        makeIssue(
          "Vault client cannot connect to the server",
          "You enter your credentials but Vault says the server is unreachable or sign-in fails.",
          "Confirm you are on the right network or VPN, the server name is correct, and your Vault client version matches the server.",
          "Send the server name, the Vault client version, the exact error, and whether other Vault users are working."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact Vault message.",
        "The Vault server name shown in the client.",
        "The file name and path involved, if a file lock or check-out is the issue.",
        "The Vault client version (Help > About) and the host app and year if relevant."
      ],
      relatedLinks: [
        { label: "Autodesk Vault help", url: "https://help.autodesk.com/view/VAULT/ENU/" }
      ]
    }
  },
  bentley: {
    microstation: makeBentleyGuide("MicroStation", "core CAD and design drafting", "design file, workspace, or standards path"),
    "openroads-designer": makeBentleyGuide("OpenRoads Designer", "civil roadway design", "civil project, design file, workspace, or standards path"),
    "connection-client": {
      summary: "Use this guide when Bentley CONNECTION Client will not sign in, will not refresh entitlement, or keeps the rest of the Bentley stack from opening correctly.",
      overview: [
        "CONNECTION Client is the Bentley sign-in and entitlement helper used by many Bentley applications.",
        "Most CONNECTION Client issues come from stale sign-in state, wrong Bentley identity, update state, or network access to Bentley services."
      ],
      askFirst: [
        "Can you sign in with the Bentley account your company expects?",
        "Are other Bentley apps saying unlicensed, trial, or sign-in required?",
        "Did the issue begin after a password change, new computer, update, or network change?"
      ],
      licensing: [
        "CONNECTION Client is not usually the product license by itself, but it often controls whether Bentley apps can confirm the entitlement you already have.",
        "If a Bentley app says trial or unlicensed, capture both the app message and the CONNECTION Client account shown.",
        "If you use more than one Bentley account, confirm which one your company expects before clearing sign-in state."
      ],
      install: [
        "Install or update CONNECTION Client using the company-approved Bentley setup path.",
        "Restart the computer if prompted, then sign in with the expected Bentley account.",
        "Open one Bentley app after sign-in so you can confirm entitlement refresh works."
      ],
      supportCheckpoints: [
        "Compare the CONNECTION Client account with the account shown in the affected Bentley app.",
        "If only one Bentley app fails, keep that app name and version ready.",
        "Avoid removing CONNECTION Client while other Bentley products still rely on it."
      ],
      commonIssues: [
        makeIssue(
          "Bentley sign-in loops or does not refresh",
          "CONNECTION Client keeps prompting for sign-in or does not appear to refresh entitlement.",
          "Sign out and back in with the correct Bentley account, then test one Bentley app before reinstalling.",
          "Send the Bentley account shown, the CONNECTION Client version if available, and the exact message."
        ),
        makeIssue(
          "Bentley apps still show trial or unlicensed",
          "A Bentley app opens, but licensing still looks wrong after CONNECTION Client sign-in.",
          "Capture the app name, version, and message so support can compare entitlement and product access.",
          "Send the affected app name, the Bentley account shown, and a screenshot of the licensing message."
        )
      ],
      supportArtifacts: [
        "A screenshot of the CONNECTION Client sign-in or status screen.",
        "The Bentley account shown.",
        "The affected Bentley app name and version.",
        "The exact trial, license, or entitlement message."
      ]
    },
    "bentley-view": makeBentleyGuide("Bentley View", "viewing Bentley and CAD files without full authoring tools", "file association, design file, or viewer workflow"),
    staad: makeBentleyGuide("STAAD", "structural analysis and design review", "model, template, or analysis file"),
    synchro: makeBentleyGuide("SYNCHRO", "construction planning and 4D sequencing", "project, schedule, or model"),
    "openflows-storm": makeBentleyGuide("OpenFlows Storm", "stormwater modeling", "model, library, or project folder"),
    "openflows-sewer": makeBentleyGuide("OpenFlows Sewer", "sewer and wastewater modeling", "model, library, or project folder"),
    "openflows-water": makeBentleyGuide("OpenFlows Water", "water-distribution modeling", "model, library, or project folder"),
    "openflows-hydraulic-toolset": makeBentleyGuide("OpenFlows Hydraulic Toolset", "hydraulic modeling", "model, module, or project folder"),
    "civil-applications": makeBentleyGuide("Bentley Civil Applications", "Bentley civil project workflows", "civil product, workspace, or standards path"),
    "openbridge-designer": makeBentleyGuide("OpenBridge Designer", "bridge design", "bridge project, model, workspace, or standards path"),
    "openbridge-modeler": makeBentleyGuide("OpenBridge Modeler", "bridge modeling", "bridge model, template, workspace, or standards path"),
    "openroads-signcad": makeBentleyGuide("OpenRoads SignCAD", "sign design", "sign library, template, or project file"),
    "ram-elements": makeBentleyGuide("RAM Elements", "structural modeling and analysis", "model, template, or analysis file"),
    geopak: makeBentleyGuide("GEOPAK", "legacy civil workflows", "legacy project, workspace, macro, or standards path"),
    projectwise: {
      summary: "Use this guide when Bentley ProjectWise will not sign in, says a file is locked by another user, or the ProjectWise integration is missing in MicroStation, AutoCAD, or Office.",
      overview: [
        "ProjectWise is the Bentley document-management system used to check files in and out of a controlled datasource.",
        "Most ProjectWise tickets are real check-out conflicts, CONNECTION Client sign-in issues, or host-app integration version mismatches."
      ],
      askFirst: [
        "Which ProjectWise datasource are you signing into?",
        "Is the failure sign-in, opening the datasource, check-out, check-in, or a host-app integration?",
        "If a file is locked, do you know who has it checked out and whether they are still active at the company?",
        "Did the issue start after a ProjectWise upgrade, host-app upgrade, new computer, or password change?"
      ],
      licensing: [
        "ProjectWise access depends on your Bentley account being added to the datasource by a ProjectWise admin.",
        "CONNECTION Client must be signed in with the correct Bentley account before ProjectWise Explorer will work properly.",
        "If a host-app integration is missing, the matching ProjectWise integration was likely not installed for that host-app year."
      ],
      install: [
        "Use the company-approved ProjectWise Explorer client matching your ProjectWise server year.",
        "Sign into CONNECTION Client first with your work Bentley account.",
        "Open ProjectWise Explorer and confirm you can connect to the expected datasource."
      ],
      supportCheckpoints: [
        "Check the file's status in ProjectWise Explorer before assuming the lock is wrong.",
        "Confirm CONNECTION Client is signed in with the correct Bentley account.",
        "If a file is checked out by an inactive user, IT can have a ProjectWise admin release the check-out."
      ],
      commonIssues: [
        makeIssue(
          "File is locked by another user",
          "You try to check out a document but ProjectWise says it is already checked out.",
          "Open ProjectWise Explorer to see who has the file, ask them to check it back in, or contact IT to release it if that user is offboarded or unreachable.",
          "Send the document path, document name, the user shown as holding the lock, and whether that user is still active."
        ),
        makeIssue(
          "ProjectWise integration is missing in MicroStation, AutoCAD, or Office",
          "Your host app opens but the ProjectWise menu or open-from-ProjectWise option is not there.",
          "Confirm with IT that the matching ProjectWise integration was installed for your host-app year.",
          "Send the host app and version, the ProjectWise client version, and a screenshot of the missing integration."
        ),
        makeIssue(
          "Cannot reach the datasource",
          "You sign into CONNECTION Client but ProjectWise Explorer cannot open the expected datasource.",
          "Confirm you are on the correct network or VPN, the datasource server name is right, and your client version is compatible with the server.",
          "Send the datasource name, the server, the client version, the exact error, and whether other users can connect."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact ProjectWise message.",
        "The Bentley account shown in CONNECTION Client.",
        "The datasource name and the document or path involved.",
        "The ProjectWise client version and the host app and year if relevant."
      ],
      relatedLinks: [
        { label: "Bentley ProjectWise documentation", url: "https://docs.bentley.com/" },
        { label: "Bentley support", url: "https://www.bentley.com/support/" }
      ]
    }
  },
  esri: {
    "arcgis-online": {
      summary: "Use this guide when ArcGIS Online will not sign in, shows the wrong organization, or does not show the maps, layers, groups, or roles you expect.",
      overview: [
        "ArcGIS Online is Esri's browser-based mapping, portal, group, and hosted-content platform.",
        "Most ArcGIS Online issues come from signing into the wrong organization, missing group membership, role or user-type limits, or content ownership."
      ],
      askFirst: [
        "Which ArcGIS organization or portal should you be using?",
        "Is the problem sign-in, missing maps, missing layers, group access, role permissions, or ownership?",
        "Can another approved user see the same map, layer, or group?",
        "Did the issue begin after a role change, offboarding handoff, group change, or password change?"
      ],
      licensing: [
        "ArcGIS Online access depends on your organization, user type, role, add-on licenses, and group membership.",
        "If a tool or layer is missing, capture the organization and role shown in your profile before changing browser settings.",
        "If content ownership changed recently, the item may need to be transferred or shared again."
      ],
      install: [
        "No local install is required for ArcGIS Online, but your browser profile and sign-in account matter.",
        "Open the expected organization URL and sign in with the work account your company assigned.",
        "Test one known map, layer, and group before assuming the whole service is unavailable."
      ],
      supportCheckpoints: [
        "Confirm the organization URL and account before clearing browser data.",
        "Compare one known map or layer with another user if possible.",
        "Keep the map, layer, group, or item URL ready for support."
      ],
      commonIssues: [
        makeIssue(
          "Maps, layers, or groups are missing",
          "You can sign in, but the content you expected is not visible.",
          "Confirm the organization, group membership, item sharing, and role before changing local browser data.",
          "Send the item name or URL, organization name, and whether another user can see it."
        ),
        makeIssue(
          "The wrong organization or role appears",
          "ArcGIS Online opens, but the organization, role, or available tools do not match what you expected.",
          "Sign out and sign in from the correct organization URL, then capture the profile role shown.",
          "Send the organization URL, account used, role shown, and feature or tool missing."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact ArcGIS Online message or missing content view.",
        "The organization URL and account used.",
        "The map, layer, group, or item name involved.",
        "The role or user type shown in your profile if you can see it."
      ]
    }
  },
  ptc: {
    "mathcad-prime": makeMathcadGuide()
  },
  trimble: {
    "trimble-business-center": {
      summary: "Use this guide when Trimble Business Center will not sign in, does not show the expected modules, or cannot open the survey or construction project data you need.",
      overview: [
        "Trimble Business Center is a survey and construction office workflow tool used with project files, modules, reports, coordinate systems, and hardware-related data.",
        "Most Trimble Business Center issues come from the wrong edition or module, missing project data paths, version mismatch, or local configuration that did not move with a new computer."
      ],
      askFirst: [
        "Is the problem sign-in, licensing, missing modules, opening project data, reports, or controller data?",
        "Did the issue begin after a new computer, version change, license change, or project move?",
        "Can another approved computer open the same project data?",
        "Which edition or modules do you expect to use?"
      ],
      licensing: [
        "Trimble Business Center access depends on the edition, enabled modules, and entitlement method your organization uses.",
        "If a command or module is missing, capture the module name and current license view before reinstalling.",
        "If project data is missing but the app opens, the file path or project folder may matter more than the license."
      ],
      install: [
        "Use the company-approved Trimble Business Center version.",
        "Restart the computer after install or update if prompted.",
        "Open one known-good project first, then test the project or import workflow that failed earlier."
      ],
      supportCheckpoints: [
        "Keep the exact version, edition, and module name ready.",
        "Compare the affected project on another approved computer before changing local files.",
        "Confirm any shared coordinate systems, reports, or templates are available after setup."
      ],
      commonIssues: [
        makeIssue(
          "A module or command is missing",
          "The app opens, but a survey, construction, report, or project command you expect is unavailable.",
          "Compare the licensed modules and edition against what your role requires before reinstalling.",
          "Send the missing module or command name, version, and license or entitlement message."
        ),
        makeIssue(
          "Project data will not open",
          "Trimble Business Center launches, but one project, import, or data path does not open correctly.",
          "Test a second known-good project and confirm the file path before changing the app install.",
          "Send the project name, data path, import type, and exact message."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact Trimble Business Center message.",
        "The version and edition or module you expect.",
        "The project or data file involved.",
        "Whether another approved computer can open the same data."
      ]
    },
    "trimble-connect": {
      summary: "Use this guide when Trimble Connect will not show the project you were invited to, the SketchUp or Tekla integration cannot reach the project, or file uploads fail.",
      overview: [
        "Trimble Connect is a cloud collaboration platform for sharing project models, drawings, and documents between office and field teams.",
        "Most Connect tickets are missing project invitations, signing in with the wrong Trimble ID, or being on the wrong region's Connect URL."
      ],
      askFirst: [
        "Which Trimble ID (email) are you signing in with at https://web.connect.trimble.com?",
        "Which project name and which region (US, EU, APAC) was the invitation for?",
        "Is the failure in the web client, the Windows desktop client, the SketchUp extension, or the Tekla integration?",
        "Did the issue start after a Trimble ID email change, role change, or new computer?"
      ],
      licensing: [
        "Connect access is invitation-based — your Trimble ID email must match exactly the email the project admin invited.",
        "If your project lives in a specific region (US, EU, APAC), you may need to use that region's Connect URL.",
        "There is no separate paid seat for basic Connect access in most projects — the project admin controls who joins."
      ],
      install: [
        "There is no required install — Connect runs in the browser at https://web.connect.trimble.com.",
        "If you need a desktop folder of project files, install Trimble Connect Desktop (Sync) from the Trimble download page.",
        "For SketchUp or Tekla, the integration extension is installed from inside the host app or the Extension Warehouse."
      ],
      supportCheckpoints: [
        "Confirm what you can see at https://web.connect.trimble.com in the browser before troubleshooting any client.",
        "Make sure your Trimble ID email exactly matches the email the project admin used in the invitation.",
        "If you switched phones or laptops, you may need to re-approve sign-in or MFA on the new device."
      ],
      commonIssues: [
        makeIssue(
          "I was invited but the project is not in my list",
          "You sign into Trimble Connect but the expected project is missing.",
          "Confirm the email you sign in with exactly matches the email the project admin invited, and ask the admin to resend the invitation if needed.",
          "Send your Trimble ID email, the project name, and a screenshot of your Connect project list."
        ),
        makeIssue(
          "SketchUp or Tekla integration cannot see the project",
          "The integration in SketchUp or Tekla will not sign in or the project does not appear there.",
          "Confirm the extension is up to date, the Trimble ID in the extension is the same one that works in the browser, and you have permission on that project.",
          "Send the host app and version, the extension version, your Trimble ID, and the project name."
        ),
        makeIssue(
          "Uploads fail or stall",
          "You try to upload a file or model but the upload does not finish.",
          "Try a small test file first, confirm you have Edit or Admin role on the destination folder, and try a different network if your office network is restrictive.",
          "Send the file size, the project, the folder, and a screenshot of the upload error."
        )
      ],
      supportArtifacts: [
        "A screenshot of your Trimble Connect project list at https://web.connect.trimble.com.",
        "Your Trimble ID email.",
        "The project name and folder involved.",
        "The host app and version if you are using a SketchUp or Tekla integration."
      ],
      relatedLinks: [
        { label: "Trimble Connect help", url: "https://help.connect.trimble.com/" }
      ]
    }
  },
  foxit: {
    "pdf-editor": makeFoxitGuide("Foxit PDF Editor", "PDF editing, signing, commenting, document review, and Office or browser PDF handoff", "editing, signing, commenting, OCR, or Office integration"),
    "pdf-reader": makeFoxitGuide("Foxit PDF Reader", "reading, printing, and basic PDF review", "viewing, printing, browser handoff, or basic commenting")
  },
  quickbooks: {
    "quickbooks-enterprise-desktop": makeQuickBooksGuide("QuickBooks Enterprise Desktop", "Windows desktop accounting with company files, multi-user access, reports, printing, and PDF workflows"),
    "quickbooks-online": makeQuickBooksGuide("QuickBooks Online", "browser-based accounting, company access, roles, approvals, and finance workflows")
  },
  google: {
    "google-earth-pro": {
      summary: "Use this guide when Google Earth Pro will not open, saved places are missing, or KML and KMZ files or layers do not behave the way you expect.",
      overview: [
        "Google Earth Pro is a desktop mapping and visualization tool used for imagery, location review, and KML or KMZ-based project context.",
        "Most Google Earth Pro issues come from one KML or KMZ file, local saved places, or an app update or reinstall that changed the expected local state."
      ],
      askFirst: [
        "Is the problem opening Google Earth Pro, opening one KML or KMZ file, or finding saved places and layers?",
        "Did the issue begin after an update, reinstall, or new computer?",
        "Does the same KML or KMZ file open on another approved computer?"
      ],
      licensing: [
        "Google Earth Pro is generally available without a separate paid end-user seat.",
        "Support usually depends on the current app version and the local or shared KML or KMZ content you need to open.",
        "If saved places are missing, note whether they were stored locally on the old computer."
      ],
      install: [
        "Install or update Google Earth Pro, then restart the app and the computer if needed.",
        "Open the app first, then test one known-good saved place or KML or KMZ file.",
        "If your workflow depends on imported content, confirm the file path still exists before assuming the app itself is broken."
      ],
      supportCheckpoints: [
        "If only one KML or KMZ file is failing, compare it with a second file first.",
        "Keep the exact file name and path ready before you contact support.",
        "If the issue is missing saved places, note whether the content existed only on the previous computer."
      ],
      commonIssues: [
        makeIssue(
          "One KML or KMZ file will not open correctly",
          "Google Earth Pro launches, but one imported file does not open or display the way you expect.",
          "Test a second known-good KML or KMZ file first so you can tell whether the issue is the file or the app.",
          "Send the file name, where it is stored, and the exact message or screenshot you see."
        ),
        makeIssue(
          "Saved places or local content are missing",
          "The app opens, but your saved places, layers, or local content are no longer there.",
          "Confirm whether the content was stored only on the old computer before reinstalling or resetting the app.",
          "Send a screenshot of the Places panel and note whether this started after a new computer or reinstall."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact Google Earth Pro message or panel.",
        "The KML or KMZ file name or saved place involved in the problem.",
        "The Google Earth Pro version shown in the app.",
        "A note about whether another computer opens the same content."
      ],
      relatedLinks: [
        { label: "Google Earth Help", url: "https://support.google.com/earth/" }
      ]
    }
  },
  hec: {
    "hec-hms": makeHecGuide("HEC-HMS", "hydrologic modeling with basin models, meteorologic models, control specifications, and runoff studies", "study or project", [
      { label: "HEC-HMS", url: "https://www.hec.usace.army.mil/software/hec-hms/" }
    ]),
    "hec-ras": makeHecGuide("HEC-RAS", "hydraulic modeling, geometry review, terrain-backed workflows, and floodplain analysis", "project or model", [
      { label: "HEC-RAS", url: "https://www.hec.usace.army.mil/software/hec-ras/" }
    ]),
    "hec-dssvue": makeHecGuide("HEC-DSSVue", "reviewing, plotting, and working with HEC-DSS time-series data files", "DSS or project", [
      { label: "HEC-DSSVue", url: "https://www.hec.usace.army.mil/software/hec-dssvue/" }
    ]),
    "hec-dss": makeHecGuide("HEC-DSS", "HEC data-storage workflows and DSS-backed project content used by related HEC tools", "DSS or project", [
      { label: "HEC-DSS", url: "https://www.hec.usace.army.mil/software/hec-dss/" }
    ]),
    "hec-ssp": makeHecGuide("HEC-SSP", "statistical analysis studies and related hydrologic data review", "study or data", [
      { label: "HEC-SSP", url: "https://www.hec.usace.army.mil/software/hec-ssp/" }
    ]),
    "hec-georas": makeHecGuide("HEC-GeoRAS", "GIS preprocessing and geometry preparation for HEC-RAS workflows", "GIS project or preprocessing", [
      { label: "HEC-GeoRAS", url: "https://www.hec.usace.army.mil/software/hec-georas/" }
    ])
  },
  mctrans: {
    hcs: {
      summary: "Use this guide when HCS will not open the study you expect, behaves differently after a version change, or needs help around setup, access, or file handling.",
      overview: [
        "HCS is MCTRANS Highway Capacity Software used for transportation-capacity analysis workflows.",
        "Most HCS issues come from version differences, one study file behaving differently than expected, or a workstation that does not match the approved team version."
      ],
      askFirst: [
        "What HCS version is your team expecting to use?",
        "Is the problem opening the app, opening one study file, running a calculation, or printing or exporting output?",
        "Can another approved computer open the same HCS study?"
      ],
      licensing: [
        "HCS access usually depends on the exact version or edition your organization purchased or standardized on.",
        "If HCS opens but the study does not, keep the study file name and version ready before contacting support.",
        "If the team uses a specific release year, include that when describing the issue."
      ],
      install: [
        "Use the approved HCS version for the team and restart the computer after install or update if needed.",
        "Open HCS first, then test one smaller known-good study before opening the file that is failing.",
        "If the issue began after an update or workstation swap, note the previous version if you know it."
      ],
      supportCheckpoints: [
        "Compare the failing study with a second known-good study file before reinstalling the app.",
        "Keep the exact version and one affected study file name ready before contacting support.",
        "If export or print is the problem, test one smaller output path first."
      ],
      commonIssues: [
        makeIssue(
          "One study file will not open or calculate correctly",
          "HCS launches, but one study file behaves differently than expected.",
          "Compare the same file on another approved computer and test a second study file before changing the app installation.",
          "Send the study file name, the version in use, and the exact message or screenshot you see."
        ),
        makeIssue(
          "The app behaves differently after a version change",
          "HCS used to work, but now a new install or update changed the expected behavior.",
          "Confirm the approved version for the team and compare it with another working installation before moving the study files.",
          "Send the current version, the previous version if known, and whether another approved computer still works."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact HCS message or screen.",
        "The HCS version shown in the app.",
        "The study file name involved in the problem.",
        "A note about whether another approved computer opens the same study."
      ],
      relatedLinks: [
        { label: "MCTRANS HCS reference guide", url: "https://mctrans.ce.ufl.edu/highway-capacity-software-hcs/referenceguide/" },
        { label: "MCTRANS Center", url: "https://mctrans.ce.ufl.edu/" }
      ]
    },
    hss: {
      summary: "Use this guide when HSS will not open the study you expect, acts differently after a workstation or version change, or needs help with setup and study access.",
      overview: [
        "HSS is MCTRANS Highway Safety Software used for roadway-safety analysis workflows.",
        "Most HSS issues come from version alignment, one study file behaving differently than expected, or a workstation that does not match the team's approved setup."
      ],
      askFirst: [
        "What HSS version is your team expecting to use?",
        "Is the problem opening the app, opening a study, running analysis, or exporting results?",
        "Can another approved computer open the same HSS study?"
      ],
      licensing: [
        "HSS access usually depends on the exact version or edition your organization purchased or standardized on.",
        "If HSS opens but the study does not, keep the study file name and version ready before contacting support.",
        "If the team uses a specific release year, include that when describing the issue."
      ],
      install: [
        "Use the approved HSS version for the team and restart the computer after install or update if needed.",
        "Open HSS first, then test one known-good study before opening the workflow that is failing.",
        "If the issue began after an update or workstation change, note the version change if you know it."
      ],
      supportCheckpoints: [
        "Compare the failing study with a second known-good file before reinstalling the app.",
        "Keep the exact HSS version and one affected study file name ready before contacting support.",
        "If the issue is isolated to one export or output path, test another path first."
      ],
      commonIssues: [
        makeIssue(
          "One study file will not open or run correctly",
          "HSS launches, but one study or analysis file does not behave as expected.",
          "Test a second known-good study and compare the file on another approved computer before changing the install.",
          "Send the study file name, the version in use, and the exact message or screenshot you see."
        ),
        makeIssue(
          "The app behaves differently after a version change",
          "HSS used to work, but now a reinstall or version change altered the workflow.",
          "Confirm the approved version and compare it with another working installation before moving or editing study files.",
          "Send the current version, the previous version if known, and whether another approved computer still works."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact HSS message or screen.",
        "The HSS version shown in the app.",
        "The study file name involved in the problem.",
        "A note about whether another approved computer opens the same study."
      ],
      relatedLinks: [
        { label: "MCTRANS Center", url: "https://mctrans.ce.ufl.edu/" }
      ]
    }
  },
  axiom: {
    axiom: {
      summary: "Use this guide when an Axiom add-in tool is missing, the ribbon or menu will not load, or the add-in does not behave correctly inside its host application.",
      overview: [
        "Axiom is a set of productivity tools and add-ins used alongside Bentley and Autodesk applications.",
        "Most Axiom issues come from host-application compatibility, one missing module, or the wrong application year or version being paired with the add-in."
      ],
      askFirst: [
        "Which host application is involved, such as AutoCAD, Revit, or a Bentley tool?",
        "What exact Axiom module or tool is failing?",
        "Did the issue begin after a host-app update, workstation change, or new add-in install?"
      ],
      licensing: [
        "Axiom access usually depends on the modules your organization purchased and the host application year they are meant to work with.",
        "If the add-in loads in one host app version but not another, keep both version details ready before contacting support.",
        "If only one Axiom module is missing, note the module name before reinstalling the whole add-in suite."
      ],
      install: [
        "Match the host application year or version your team expects before installing Axiom modules.",
        "Restart the host app after install or update so the add-in can load cleanly.",
        "Test one specific Axiom tool or ribbon command after setup instead of assuming the whole add-in suite is healthy."
      ],
      supportCheckpoints: [
        "Confirm the host app version and year before you troubleshoot the Axiom add-in itself.",
        "If one Axiom tool fails, compare it with another tool in the same suite first.",
        "Keep the exact module name and host app name ready before contacting support."
      ],
      commonIssues: [
        makeIssue(
          "The Axiom ribbon or tool is missing",
          "The host application opens, but the Axiom menu, ribbon, or specific tool is missing or disabled.",
          "Check the host application version and the exact Axiom module expected before reinstalling the add-in.",
          "Send the host app name and year, the missing tool name, and a screenshot of the app where the tool should appear."
        ),
        makeIssue(
          "The add-in worked before but not after an update",
          "Axiom used to work, but a host-app or workstation change appears to have broken the workflow.",
          "Compare the host application year and the Axiom module set against another approved computer before changing project data or templates.",
          "Send the host app version, the Axiom module name, and when the issue started."
        )
      ],
      supportArtifacts: [
        "A screenshot of the host app and the missing or failing Axiom tool.",
        "The host application name and version or year.",
        "The Axiom module or tool name involved in the problem.",
        "A note about whether another approved computer still loads the same tool."
      ],
      relatedLinks: [
        { label: "Axiom official site", url: "https://www.axiomint.com/" }
      ]
    }
  },
  deltek: {
    vantagepoint: {
      summary: "Use this guide when Deltek Vantagepoint will not let you sign in, your projects or charge codes are missing in time entry, or an approval did not reach the next person.",
      overview: [
        "Vantagepoint is the Deltek ERP used at AEC firms for project management, time and expense entry, billing, and approvals.",
        "Most Vantagepoint tickets are role and security setup, project team membership, or approval-workflow questions, not the app itself."
      ],
      askFirst: [
        "Are you on Vantagepoint cloud, your firm's on-prem web Vantagepoint, or the Vantagepoint Mobile Time app?",
        "Is the issue sign-in, missing projects or charge codes, an approval that didn't route, an expense report, or reports?",
        "What is your Vantagepoint role, and what role does this task need?",
        "Did the issue start after a role change, period close, or workflow change?"
      ],
      licensing: [
        "Vantagepoint access depends on a Vantagepoint user record assigned a security role by your firm's Deltek admin.",
        "Most missing-data issues are role-based: even with a working sign-in, you may not see a project unless you are on its team.",
        "If period close has happened, certain entries (time, expense, billing) may be locked until the period reopens."
      ],
      install: [
        "Vantagepoint cloud and on-prem web run in your browser — bookmark the URL your firm provides.",
        "For mobile time entry, install the Vantagepoint Mobile Time app from the App Store or Google Play and sign in with your work Vantagepoint account.",
        "For SSO, sign in through your firm's Vantagepoint URL rather than a direct Deltek URL."
      ],
      supportCheckpoints: [
        "Confirm the Vantagepoint URL you are using matches what your firm provides.",
        "If a project or charge code is missing, ask your project manager or Deltek admin to confirm you are on the project team.",
        "If an approval is stuck, check the workflow status before asking IT — the next approver may simply not have acted yet."
      ],
      commonIssues: [
        makeIssue(
          "My project or charge code is missing in time entry",
          "You open Vantagepoint time entry but the project or charge code you expect is not in the list.",
          "Ask your project manager or Deltek admin to confirm you are added to the project team and that the charge code is active for the current period.",
          "Send your Vantagepoint user, the project number, the period, and a screenshot of your time entry grid."
        ),
        makeIssue(
          "Approval didn't reach the approver",
          "You submitted a timesheet, expense, or AP item but the approver did not get it.",
          "Confirm in Vantagepoint who the current approver is, whether they are out of office, and whether the workflow assigned the right person.",
          "Send the transaction number, the submitter, the current approver, and the time you submitted."
        ),
        makeIssue(
          "Cannot sign into Vantagepoint",
          "You cannot complete sign-in on cloud or on-prem Vantagepoint.",
          "Confirm the Vantagepoint URL, that your account is still active, and that any MFA or SSO step is completing.",
          "Send the URL you are using, the exact error message, and whether other Vantagepoint users can sign in."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact Vantagepoint message or missing screen.",
        "Your Vantagepoint user name.",
        "The project number, charge code, or transaction number involved.",
        "The exact URL you are using to reach Vantagepoint."
      ],
      relatedLinks: [
        { label: "Deltek Customer Care", url: "https://deltek.custhelp.com/" },
        { label: "Deltek Vantagepoint overview", url: "https://www.deltek.com/en/products/project-erp/vantagepoint" }
      ]
    }
  },
  docusign: {
    "docusign-web": {
      summary: "Use this guide when DocuSign will not deliver an envelope, the signer says they did not get the email, or your sender account is in the wrong tenant.",
      overview: [
        "DocuSign is the electronic-signature service used to send agreements for signature, route them between signers, and store the signed copy.",
        "Most DocuSign tickets are wrong signer email addresses, mail-flow filtering, or being signed into a personal DocuSign account instead of the company tenant."
      ],
      askFirst: [
        "Are you the sender, a signer, or an admin or template owner?",
        "What is the exact envelope name and what does the Manage page say about its status?",
        "Which email address is DocuSign delivering to, and is that mailbox actually monitored?",
        "Did the issue start after an SSO change, an email alias change, or a template update?"
      ],
      licensing: [
        "DocuSign sender access depends on being added to your company's DocuSign account by an admin.",
        "Personal DocuSign accounts cannot send work envelopes — you must be signed into the company tenant via your firm's SSO link or vanity URL.",
        "Distribution lists, shared mailboxes, and Outlook aliases often break delivery — the signer email should be a real, monitored mailbox."
      ],
      install: [
        "DocuSign runs in the browser; there is no required desktop install.",
        "Sign in via your firm's DocuSign SSO link rather than a generic DocuSign URL so you land in the right account.",
        "If you also use the DocuSign for Outlook add-in, install it from your Office 365 portal or the Microsoft AppSource."
      ],
      supportCheckpoints: [
        "Always check the envelope status on the Manage page before resending or recreating an envelope.",
        "Confirm the signer's email address is a real mailbox the signer actually monitors.",
        "If you are sending from the wrong account, sign out completely before signing back in via your firm's SSO link."
      ],
      commonIssues: [
        makeIssue(
          "The signer says they didn't get the email",
          "You sent an envelope but the signer reports nothing arrived.",
          "Open the envelope on the Manage page, confirm the signer email is correct, then either resend or share the signing URL directly instead of recreating the envelope.",
          "Send the envelope ID, the signer email, and a screenshot of the recipient status on the Manage page."
        ),
        makeIssue(
          "The template is sending wrong fields or wrong signer order",
          "Envelopes go out, but the fields or routing do not match what the template should do.",
          "Open the template, confirm signer order and field assignments, and send a fresh test before changing in-flight envelopes.",
          "Send the template name, the envelope ID, and screenshots of both the template and the sent envelope."
        ),
        makeIssue(
          "I'm signed into the wrong DocuSign account",
          "DocuSign opens but lands in a personal account or the wrong company tenant.",
          "Sign out completely, then sign in again using your firm's DocuSign SSO link or vanity URL.",
          "Send the account email shown, the company DocuSign URL you should use, and the SSO method."
        )
      ],
      supportArtifacts: [
        "A screenshot of the envelope Manage page or recipient status.",
        "The DocuSign account email shown when you are signed in.",
        "The envelope ID and the signer email involved.",
        "Your firm's DocuSign SSO link or vanity URL, if you have it."
      ],
      relatedLinks: [
        { label: "DocuSign support", url: "https://support.docusign.com/" }
      ]
    }
  },
  zoom: {
    "zoom-meetings": {
      summary: "Use this guide when Zoom audio or video will not work, you cannot share your screen, or you cannot sign in to your work Zoom account.",
      overview: [
        "Zoom Meetings is the video meeting client used for one-to-one and team meetings, with optional features for screen sharing, recording, and chat.",
        "Most Zoom tickets are Windows or macOS microphone and camera permissions, not the Zoom client itself."
      ],
      askFirst: [
        "Did you sign into Zoom with your work SSO from your firm's portal, or with an email and password?",
        "Is the problem audio, camera, screen share, joining, sign-in, or recording?",
        "Are you on the Zoom desktop client, browser client, or a Zoom Rooms device?",
        "Did the issue start after a Zoom update, Windows or macOS update, new computer, or peripheral change?"
      ],
      licensing: [
        "Most Zoom features require signing into your work Zoom account, not a personal Zoom account.",
        "Use Sign In with SSO and your firm's Zoom vanity URL to land in the right Zoom tenant.",
        "If your role does not allow recording, large meetings, or webinars, those features may be hidden until the admin enables them."
      ],
      install: [
        "Install Zoom from the official Zoom download page (https://zoom.us/download) or your firm's deployment.",
        "Sign in using SSO with your firm's Zoom vanity URL so you land in the work Zoom tenant.",
        "Approve any prompts for microphone, camera, and (on macOS) screen recording the first time you join a meeting."
      ],
      supportCheckpoints: [
        "Test https://zoom.us/test before assuming a meeting is broken — it isolates device problems from meeting problems.",
        "Check Windows or macOS privacy settings for microphone, camera, and screen recording before reinstalling Zoom.",
        "Confirm the Zoom account shown in the client matches your work Zoom email."
      ],
      commonIssues: [
        makeIssue(
          "My microphone or camera doesn't work",
          "You join a meeting but no one can hear or see you, or Zoom says no device is found.",
          "Check Windows or macOS privacy settings for microphone and camera, confirm the right device is selected in Zoom settings, and run a Zoom Test Meeting at https://zoom.us/test.",
          "Send your OS and version, your Zoom version, the device you expect to use, and a screenshot of the OS privacy settings panel."
        ),
        makeIssue(
          "I'm signed into the wrong Zoom account",
          "You join from a personal Zoom and cannot reach your work meetings or features.",
          "Sign out, then choose Sign In with SSO and enter your firm's Zoom vanity URL to sign in to the work Zoom tenant.",
          "Send the account email shown in Zoom and the firm Zoom vanity URL if you have it."
        ),
        makeIssue(
          "Cannot share my screen",
          "You press Share but nothing happens or Share is missing.",
          "On macOS, check System Settings > Privacy > Screen Recording for Zoom; check whether the meeting host is allowing participant sharing.",
          "Send your OS, your Zoom version, the meeting host, and a screenshot of the Share dialog or missing button."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact Zoom message, or the missing Share or device dialog.",
        "The Zoom version (Help > About Zoom).",
        "Your OS and version.",
        "The result of a Zoom Test Meeting at https://zoom.us/test."
      ],
      relatedLinks: [
        { label: "Zoom Support", url: "https://support.zoom.us/" },
        { label: "Zoom Test Meeting", url: "https://zoom.us/test" }
      ]
    }
  },
  cisco: {
    webex: {
      summary: "Use this guide when Cisco Webex will not let you join with audio or video, you cannot sign into the Webex App, or the Outlook scheduling integration is missing.",
      overview: [
        "Webex is Cisco's meetings, messaging, and calling platform — Webex App is the unified client and Webex Meetings is the classic meetings client.",
        "Most Webex tickets are Windows or macOS device permissions, signing into the wrong organization, or the Outlook add-in not being enabled."
      ],
      askFirst: [
        "Are you on the Webex App (the unified client), classic Webex Meetings, or a Webex Room device?",
        "Is the problem joining a meeting, audio, video, sign-in, messaging, or calling?",
        "Did you sign in via SSO from your firm's Webex site (https://<company>.webex.com) or an email directly?",
        "Did the issue start after a Webex update, OS update, new computer, or peripheral change?"
      ],
      licensing: [
        "Webex access depends on your firm's Webex site and the user provisioning your firm has set up.",
        "If your firm uses Webex Calling, calling features only appear once the calling license is assigned.",
        "Sign-in usually goes through your firm's Webex site URL — using a generic Webex URL may land you in a personal account."
      ],
      install: [
        "Install Webex App from your firm's deployment or https://www.webex.com/downloads.html.",
        "Sign in with your work email; Webex will discover SSO and send you through your firm's identity provider.",
        "Approve microphone, camera, and (on macOS) screen-recording prompts the first time you join a meeting."
      ],
      supportCheckpoints: [
        "Check Windows or macOS privacy settings for microphone and camera before assuming Webex is broken.",
        "Confirm the organization shown in Webex App under Help > About is your firm's organization.",
        "If the Outlook add-in is missing, confirm with IT whether the modern Webex Scheduler add-in is enabled."
      ],
      commonIssues: [
        makeIssue(
          "Microphone or camera not working in Webex",
          "You join a meeting but no audio or video.",
          "Check Windows or macOS privacy settings for Webex App, confirm the right device is selected in Audio and Video settings.",
          "Send your OS and version, your Webex App version, the device you expect to use, and a screenshot of OS privacy settings."
        ),
        makeIssue(
          "Cannot sign into Webex App",
          "You cannot complete sign-in or you land in the wrong organization.",
          "Sign out, then sign in with your work email so SSO discovery sends you to your firm's identity provider, and confirm the organization in Help > About.",
          "Send your email, the organization shown, and the SSO error if any."
        ),
        makeIssue(
          "Outlook integration or scheduling isn't working",
          "The Webex add-in is missing in Outlook or scheduling fails.",
          "Confirm the Webex add-in is enabled in Outlook (File > Options > Add-ins) and that you are signed into Outlook with the same account.",
          "Send your Outlook version, whether the Webex add-in is enabled or disabled, and a screenshot of the Outlook ribbon."
        )
      ],
      supportArtifacts: [
        "A screenshot of the exact Webex message or missing dialog.",
        "Your Webex App version (Help > About).",
        "Your OS and version.",
        "The organization shown in Webex App."
      ],
      relatedLinks: [
        { label: "Webex Help Center", url: "https://help.webex.com/" }
      ]
    }
  },
  box: {
    "box-drive": {
      summary: "Use this guide when Box Drive will not show a folder you can see in the browser, will not sign in to the work Box account, or an external share link will not open.",
      overview: [
        "Box Drive is the desktop app that mounts Box content as a drive on Windows or macOS so you can open Box files like normal files.",
        "Most Box Drive tickets are signing into the wrong Box account, sync still in progress, or external link permissions."
      ],
      askFirst: [
        "Are you signed into Box Drive with the work Box account or a personal Box?",
        "Is the failure sign-in, a missing folder, an external share link, or a file that won't open?",
        "Does the same folder appear correctly at https://app.box.com in the browser?",
        "Did the issue start after a tenant SSO change, role change, or new computer?"
      ],
      licensing: [
        "Box Drive access depends on your work Box account being provisioned by IT — personal Box accounts will not see company content.",
        "External share links can be set so only people in your company can open them, or only specific people, or anyone with the link.",
        "If a folder is shared but you cannot see it, you may not have been added to the folder by the owner."
      ],
      install: [
        "Install Box Drive from the company-approved Box deployment or https://www.box.com/resources/downloads.",
        "Sign in with your work Box account, typically via SSO from your firm's identity provider.",
        "Wait for the initial sync to finish before assuming files are missing."
      ],
      supportCheckpoints: [
        "Compare what you see in Box Drive with what you see in the browser at https://app.box.com.",
        "Confirm the Box account shown in Box Drive matches the browser.",
        "For external share issues, check the link's permission setting before assuming the link is broken."
      ],
      commonIssues: [
        makeIssue(
          "A folder is missing in Box Drive",
          "You can see a folder at app.box.com in the browser, but it does not appear in Box Drive.",
          "Wait for Box Drive's sync to finish, confirm the same account is signed into both, and pin the folder in Box Drive if you need it offline.",
          "Send the folder name, the Box account in Box Drive, and a screenshot of the same folder in the browser."
        ),
        makeIssue(
          "An external share link won't open",
          "You sent or received a Box shared link that will not open for the recipient.",
          "Check the link's permission setting (people in your company, people with the link, specific people) and any expiration date.",
          "Send the share link URL, the link permission, the expiration date, and the recipient's account."
        ),
        makeIssue(
          "Box Drive is signed into the wrong account",
          "Box Drive shows a personal Box or the wrong company.",
          "Sign out of Box Drive, quit it fully, and sign back in with your work Box account through SSO.",
          "Send the account email shown and the SSO method your firm uses."
        )
      ],
      supportArtifacts: [
        "A screenshot of Box Drive showing the missing folder or sign-in screen.",
        "The Box account email shown in Box Drive.",
        "The folder name and where it should appear.",
        "For external share issues, the share link URL and its permission setting."
      ],
      relatedLinks: [
        { label: "Box Drive help", url: "https://support.box.com/hc/en-us/categories/360002812714-Box-Drive" }
      ]
    }
  },
  dropbox: {
    "dropbox-desktop": {
      summary: "Use this guide when Dropbox desktop will not show a team folder, sync gets stuck, or you are signed into a personal Dropbox instead of the work team.",
      overview: [
        "Dropbox Desktop is the app that syncs Dropbox content to a folder on your Windows or macOS computer.",
        "Most Dropbox tickets are selective-sync settings, team-folder membership, or signing into a personal Dropbox by mistake."
      ],
      askFirst: [
        "Is this Dropbox Business (a work team) or a personal Dropbox?",
        "Is the issue sign-in, a missing team folder, sync stalled, or an external share link?",
        "Does the same folder appear correctly at https://www.dropbox.com in the browser?",
        "Did the issue start after a team role change, team-folder rename, or new computer?"
      ],
      licensing: [
        "Dropbox Business access depends on your firm adding you to the team and to the team folders you need.",
        "Selective sync lets you choose which folders sync to your computer — a folder you 'unselected' will not appear locally.",
        "If your team uses SSO, signing in with email and password may put you in a personal Dropbox by mistake."
      ],
      install: [
        "Install Dropbox from your firm's deployment or https://www.dropbox.com/install.",
        "Sign in with your work Dropbox account via SSO if your team uses SSO.",
        "Confirm the team name appears in Dropbox preferences under Account."
      ],
      supportCheckpoints: [
        "Compare what you see on disk with what you see in the browser at https://www.dropbox.com.",
        "Check Selective Sync settings under Preferences before assuming a folder was deleted.",
        "Confirm the team name in Dropbox preferences matches your work team."
      ],
      commonIssues: [
        makeIssue(
          "A team folder is missing on my computer",
          "You expect a team folder but it does not appear in the Dropbox folder on disk.",
          "Check Selective Sync settings, confirm with the folder owner that you have access, and open the folder in the browser to validate access.",
          "Send the folder name, the team name, your account email, and your Selective Sync setting for that folder."
        ),
        makeIssue(
          "Sync is stuck or showing errors",
          "The Dropbox icon shows a sync error or stays pending.",
          "Check the affected file name for unsupported characters or very long paths, confirm you have free disk space, and pause and resume sync.",
          "Send the file name, your free disk space, and the exact sync error."
        ),
        makeIssue(
          "I'm in personal Dropbox instead of the work team",
          "Dropbox shows a personal account instead of the work team.",
          "Sign out, then sign in again using your work email and SSO if your team uses SSO.",
          "Send the account email shown, the team name expected, and whether SSO is required at your firm."
        )
      ],
      supportArtifacts: [
        "A screenshot of the Dropbox preferences Account tab showing the signed-in account and team.",
        "A screenshot of Selective Sync settings, if the issue is a missing folder.",
        "The folder name and the team name expected.",
        "The exact sync error if sync is stuck."
      ],
      relatedLinks: [
        { label: "Dropbox Business help", url: "https://help.dropbox.com/teams-admins" },
        { label: "Dropbox help center", url: "https://help.dropbox.com/" }
      ]
    }
  },
  duo: {
    "duo-mobile": {
      summary: "Use this guide when Duo Mobile is not approving sign-ins after a new phone, you are not getting Duo pushes, or you need to reactivate Duo Mobile after reinstalling it.",
      overview: [
        "Duo Mobile is the second-factor app many companies use to approve sign-ins, with push approvals, passcodes, and (in some setups) hardware-style codes.",
        "Most Duo tickets are 'I got a new phone' and the fix is a Duo admin reset plus a fresh enrollment link, not reinstalling the app."
      ],
      askFirst: [
        "Is this a new enrollment, a phone replacement, or a reactivation on the same phone after reinstalling?",
        "Do you still have your old phone, and does it still receive Duo pushes?",
        "Does your company use a self-service Duo portal where you can re-enroll yourself?",
        "Which work apps are you trying to sign into when Duo blocks you?"
      ],
      licensing: [
        "Duo Mobile is free to install — your access depends on your company's Duo subscription and your enrollment.",
        "If you are switching phones, IT must verify your identity before resetting Duo to prevent account takeover.",
        "A bypass code from IT can let you sign in once while you finish setting up the new phone."
      ],
      install: [
        "Install Duo Mobile from the App Store or Google Play.",
        "When IT sends you a Duo enrollment link, open it on the new phone, then scan the QR code Duo shows or follow the on-screen prompts.",
        "Allow notifications so push approvals can reach you."
      ],
      supportCheckpoints: [
        "If you still have the old phone, keep it nearby — IT may be able to use it to verify you.",
        "Check that notifications are enabled for Duo Mobile in your phone settings — pushes will not arrive otherwise.",
        "If your company has a self-service Duo portal, try that before contacting IT."
      ],
      commonIssues: [
        makeIssue(
          "I got a new phone and Duo isn't working",
          "You have a new phone and pushes from Duo Mobile do not let you sign in.",
          "Contact IT to verify your identity and either send you a fresh Duo enrollment link or have you use the self-service Duo portal if your firm has one.",
          "Send your name, your new phone model, and the apps you are blocked from signing into."
        ),
        makeIssue(
          "I'm not getting Duo pushes",
          "Duo Mobile is installed and enrolled, but no approval push arrives.",
          "Check notification permissions for Duo Mobile in your phone settings, confirm internet connectivity, and use the refresh option in Duo Mobile.",
          "Send the phone OS and version, the Duo Mobile version, and whether notifications are enabled for Duo Mobile."
        ),
        makeIssue(
          "Reinstalled Duo Mobile and lost my accounts",
          "You reinstalled Duo Mobile on the same phone and your accounts are gone.",
          "If your firm enabled Duo Restore before, restore from Duo backup; otherwise IT can send a new enrollment link.",
          "Send your phone model and whether you had Duo Restore enabled."
        )
      ],
      supportArtifacts: [
        "A note about whether you still have the old phone.",
        "Your phone model and OS version.",
        "Whether notifications for Duo Mobile are enabled in phone settings.",
        "A screenshot of the work app's Duo prompt, if you can take one."
      ],
      relatedLinks: [
        { label: "Duo Mobile guide", url: "https://guide.duo.com/" }
      ]
    }
  },
  okta: {
    "okta-verify": {
      summary: "Use this guide when Okta Verify is not approving sign-ins after a new phone, you are not getting Okta pushes, or your FastPass device is not trusted.",
      overview: [
        "Okta Verify is the second-factor app many companies pair with Okta for push approvals, TOTP codes, and (with FastPass) device-based sign-in.",
        "Most Okta Verify tickets are 'I got a new phone' and the fix is an Okta admin factor reset plus a fresh setup link."
      ],
      askFirst: [
        "Is this a new enrollment, a phone replacement, a reactivation after reinstalling, or a failing push?",
        "Does your company use Okta FastPass, or just push and TOTP?",
        "Do you still have your old phone, and does it still receive Okta pushes?",
        "Which apps are you trying to reach when Okta blocks you?"
      ],
      licensing: [
        "Okta Verify is free to install — your access depends on your company's Okta tenant and your enrollment.",
        "If you are switching phones, IT must verify your identity before resetting Okta factors.",
        "FastPass requires the Okta Verify app plus any device registration steps your firm requires (sometimes through MDM)."
      ],
      install: [
        "Install Okta Verify from the App Store or Google Play.",
        "When IT sends you an Okta setup link, open it on the new phone and follow the prompts to add your work account.",
        "Allow notifications so push approvals can reach you."
      ],
      supportCheckpoints: [
        "If you still have the old phone, keep it nearby — IT may be able to verify you with a push to it.",
        "Check that notifications are enabled for Okta Verify in your phone settings.",
        "If your firm offers a self-service Okta dashboard, try the factor reset there before contacting IT."
      ],
      commonIssues: [
        makeIssue(
          "Got a new phone and Okta Verify isn't working",
          "You have a new phone and Okta will not let you sign in.",
          "Contact IT to verify your identity, then either use your firm's self-service factor reset or have IT factor-reset Okta Verify and send a fresh setup link.",
          "Send your name, the new phone model, and the apps you are blocked from."
        ),
        makeIssue(
          "Okta pushes are not arriving",
          "Okta Verify is enrolled but no push arrives.",
          "Check notification permissions for Okta Verify in phone settings, confirm internet connectivity, and refresh the app.",
          "Send your phone OS, the Okta Verify version, and whether notifications are enabled."
        ),
        makeIssue(
          "FastPass enrollment is failing",
          "Your firm uses FastPass but enrollment will not complete or your device is not trusted.",
          "Confirm Okta Verify is current and that any MDM or device-registration step your firm requires is completed.",
          "Send your phone OS, Okta Verify version, and whether your phone is enrolled in your firm's MDM."
        )
      ],
      supportArtifacts: [
        "A note about whether you still have the old phone.",
        "Your phone model and OS version.",
        "Whether notifications for Okta Verify are enabled in phone settings.",
        "A screenshot of the Okta prompt or error, if you can take one."
      ],
      relatedLinks: [
        { label: "Okta Verify documentation", url: "https://help.okta.com/en-us/Content/Topics/end-user/ov-overview.htm" },
        { label: "Okta Help Center", url: "https://support.okta.com/" }
      ]
    }
  }
};
