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
    geopak: makeBentleyGuide("GEOPAK", "legacy civil workflows", "legacy project, workspace, macro, or standards path")
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
  }
};
