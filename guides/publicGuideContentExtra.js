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

export const publicGuideContentExtra = {
  microsoft: {
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
      relatedLinks: [
        { label: "Fix SharePoint Online sync problems", url: "https://support.microsoft.com/en-au/office/fix-sharepoint-online-sync-problems-aaa2d172-8d45-4e94-9c04-5364d04ca2f4" },
        { label: "Fix OneDrive sync problems", url: "https://support.microsoft.com/en-us/office/fix-onedrive-sync-problems-52a86836-1e7f-46fd-85c7-1e7a5e9b4273" }
      ]
    }
  },
  adobe: {
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
