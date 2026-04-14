function issue(title, symptom, likelyFix, collect, escalateWhen) {
  return { title, symptom, likelyFix, collect, escalateWhen };
}

function hecInternalGuide(name, dataLabel, processName, url) {
  return {
    highlights: [
      `Fastest likely fix: capture the exact ${name} version, compare the failing ${dataLabel} with a known-good one, and validate the file or data path before reinstalling.`,
      `${name} problems are often study- or data-specific, not workstation-wide.`
    ],
    askFirst: [
      `What exact ${name} version does the team standardize on?`,
      `Is the failure launch, opening a ${dataLabel}, running a ${processName}, or exporting results?`,
      "Is the affected data local, on a network share, or bundled with GIS or terrain dependencies?"
    ],
    supportCheckpoints: [
      "Test a second known-good study or data set before rebuilding the app.",
      "Capture the exact file path, version, and whether another approved computer opens the same data.",
      "Preserve project folders and exported results before repair or uninstall work."
    ],
    commonIssues: [
      issue(
        `One ${dataLabel} fails while the app still opens`,
        `${name} launches, but one study or data set will not open or behaves differently than expected.`,
        "Compare the same data on another approved computer and verify the file path before changing the installation.",
        "Collect the exact study or data file name, path, version, and the screenshot or error text.",
        "Escalate after a known-good comparison shows the issue follows the same data on multiple machines."
      )
    ],
    usefulInfo: {
      paths: ["Project folder path", "Shared GIS or terrain path if used", "Export or results path"],
      logs: [`${name} version screenshot`, "Study file name and path", "One known-good comparison result"],
      services: [],
      processes: []
    },
    relatedLinks: [{ label: name, url }]
  };
}

export const appGuideContentExtra = {
  adobe: {
    indesign: {
      highlights: [
        "Fastest likely fix: confirm the Adobe enterprise profile, then compare fonts and linked assets before reinstalling InDesign.",
        "A 'broken' document is often a missing font or missing linked file problem."
      ],
      askFirst: [
        "Is the failure activation, font loading, linked assets, export, packaging, or one document only?",
        "Did this start after a font change, Adobe sign-in change, or moving the working folder?",
        "Can another approved computer open the same document cleanly?"
      ],
      supportCheckpoints: [
        "Capture the Adobe profile in use and whether the app is landing in the enterprise profile or a personal one.",
        "Check fonts, link paths, and package destinations before touching the install.",
        "If one document fails, compare it with a simpler known-good file first."
      ],
      commonIssues: [
        issue(
          "Fonts or linked assets are missing",
          "The document opens, but fonts or linked images are unresolved.",
          "Validate the font set and linked-file paths before reinstalling InDesign or repackaging the document.",
          "Collect the document name, missing font or link names, and a screenshot of the warning.",
          "Escalate when the same packaged job is broken on multiple approved workstations."
        )
      ],
      usefulInfo: {
        paths: ["Document folder", "Linked asset paths", "Packaged job output path"],
        logs: ["Adobe profile screenshot", "Missing links panel screenshot", "Font warning screenshot"],
        services: [],
        processes: ["InDesign.exe"]
      },
      relatedLinks: [{ label: "Adobe InDesign Help", url: "https://helpx.adobe.com/indesign/user-guide.html" }]
    }
  },
  autodesk: {
    "infoworks-icm": {
      highlights: [
        "Fastest likely fix: confirm the approved version, Autodesk account, and exact model or database path before any rebuild.",
        "InfoWorks ICM problems are commonly environment or model-path issues, not raw installer failures."
      ],
      askFirst: [
        "What version and database or model source should the user be using?",
        "Is the failure sign-in, model open, simulation run, export, or one database only?",
        "Can another approved workstation open the same model or database?"
      ],
      supportCheckpoints: [
        "Capture the exact version, Autodesk account, model name, and database path first.",
        "Compare the failing model to a known-good one if available before changing the workstation.",
        "If simulation performance is the complaint, confirm whether the slowdown is model-specific."
      ],
      commonIssues: [
        issue(
          "Model or database will not open",
          "InfoWorks ICM launches, but the expected model or database cannot be opened.",
          "Validate the database path, access method, and version match before reinstalling the app.",
          "Collect the model or database name, path, version, and exact error message.",
          "Escalate after another approved workstation reproduces the same access or model-open failure."
        )
      ],
      usefulInfo: {
        paths: ["Model folder or database path", "Simulation output location", "Shared library or template path"],
        logs: ["Version screenshot", "Model or database name", "Error screenshot"],
        services: [],
        processes: ["InfoWorksICM.exe"]
      },
      relatedLinks: [
        { label: "InfoWorks ICM product page", url: "https://www.autodesk.com/products/infoworks-icm/overview" },
        { label: "Autodesk Support", url: "https://www.autodesk.com/support" }
      ]
    }
  },
  google: {
    "google-earth-pro": {
      highlights: [
        "Fastest likely fix: compare the same KML or KMZ file on another approved workstation before reinstalling Google Earth Pro.",
        "Missing saved places often trace back to local-only profile data, not a license or sign-in problem."
      ],
      askFirst: [
        "Is the issue app launch, one KML or KMZ file, saved places, imagery, or export?",
        "Did the issue begin after a reinstall, app update, or workstation replacement?",
        "Can another approved workstation open the same KML or KMZ file?"
      ],
      supportCheckpoints: [
        "Capture the exact file or saved-place scope before resetting anything.",
        "Compare one known-good KML or KMZ file first.",
        "Preserve local saved places before uninstalling or rebuilding."
      ],
      commonIssues: [
        issue(
          "Saved places or KML content missing after a workstation change",
          "Google Earth Pro opens, but local saved places or imported content are gone.",
          "Confirm whether the content lived only on the old device before reinstalling or clearing local state.",
          "Collect the file names, screenshot of the Places panel, and whether another machine still has the content.",
          "Escalate when shared KML or KMZ content breaks across multiple approved machines."
        )
      ],
      usefulInfo: {
        paths: ["KML or KMZ storage path", "Export location for saved places"],
        logs: ["Version screenshot", "Places panel screenshot"],
        services: [],
        processes: ["googleearth.exe"]
      },
      relatedLinks: [{ label: "Google Earth Help", url: "https://support.google.com/earth/" }]
    }
  },
  hec: {
    "hec-hms": hecInternalGuide("HEC-HMS", "study or project", "model run", "https://www.hec.usace.army.mil/software/hec-hms/"),
    "hec-ras": hecInternalGuide("HEC-RAS", "project or model", "simulation", "https://www.hec.usace.army.mil/software/hec-ras/"),
    "hec-dssvue": hecInternalGuide("HEC-DSSVue", "DSS or project", "plot or import", "https://www.hec.usace.army.mil/software/hec-dssvue/"),
    "hec-dss": hecInternalGuide("HEC-DSS", "DSS or project", "data workflow", "https://www.hec.usace.army.mil/software/hec-dss/"),
    "hec-ssp": hecInternalGuide("HEC-SSP", "study or data", "statistical analysis", "https://www.hec.usace.army.mil/software/hec-ssp/"),
    "hec-georas": hecInternalGuide("HEC-GeoRAS", "GIS project", "preprocessing workflow", "https://www.hec.usace.army.mil/software/hec-georas/")
  },
  mctrans: {
    hcs: {
      highlights: [
        "Fastest likely fix: confirm the exact HCS version and compare the study file on another approved workstation before reinstalling.",
        "HCS issues are often release-specific or study-specific."
      ],
      askFirst: [
        "What exact HCS version is approved for this client or team?",
        "Is the failure launch, open study, calculation, print, or export?",
        "Does the same study open on another approved machine?"
      ],
      supportCheckpoints: [
        "Capture the version, study file, and whether the issue is isolated to one study.",
        "Keep the approved release year in scope before you change the install.",
        "Preserve study files and version notes during rebuild work."
      ],
      commonIssues: [
        issue(
          "Study opens differently by version",
          "The same HCS study behaves differently after a version change or on a second workstation.",
          "Confirm the approved team version first and test the same study on another approved install before editing the file.",
          "Collect the HCS version, study file name, and the exact behavior change.",
          "Escalate when the approved version still reproduces the issue on multiple workstations."
        )
      ],
      usefulInfo: {
        paths: ["Study file path", "Export path", "Version record or install media path"],
        logs: ["Version screenshot", "Study file name", "Comparison with another workstation"],
        services: [],
        processes: ["HCS.exe"]
      },
      relatedLinks: [
        { label: "MCTRANS HCS reference guide", url: "https://mctrans.ce.ufl.edu/highway-capacity-software-hcs/referenceguide/" },
        { label: "MCTRANS Center", url: "https://mctrans.ce.ufl.edu/" }
      ]
    },
    hss: {
      highlights: [
        "Fastest likely fix: confirm the exact HSS version and compare the same study on another approved workstation before rebuilding.",
        "HSS issues are commonly release-specific or tied to one study file."
      ],
      askFirst: [
        "What exact HSS version is approved for this client or team?",
        "Is the failure launch, open study, run analysis, or export?",
        "Does the same study work on another approved workstation?"
      ],
      supportCheckpoints: [
        "Capture the version, study file, and whether the issue is isolated to one study.",
        "Check the approved release first before changing the install.",
        "Preserve study files and version notes during rebuild work."
      ],
      commonIssues: [
        issue(
          "Study opens or runs differently by version",
          "The same HSS study behaves differently after a version change or on a different workstation.",
          "Confirm the approved team version first and compare the same study on another approved installation.",
          "Collect the HSS version, study file name, and exact behavior change.",
          "Escalate when the approved version still reproduces the issue on multiple workstations."
        )
      ],
      usefulInfo: {
        paths: ["Study file path", "Export path", "Version record or install media path"],
        logs: ["Version screenshot", "Study file name", "Comparison with another workstation"],
        services: [],
        processes: ["HSS.exe"]
      },
      relatedLinks: [{ label: "MCTRANS Center", url: "https://mctrans.ce.ufl.edu/" }]
    }
  },
  axiom: {
    axiom: {
      highlights: [
        "Fastest likely fix: identify the host app and year first, then compare the failing Axiom module against another approved workstation.",
        "Axiom tickets are usually host-app compatibility or missing-module issues."
      ],
      askFirst: [
        "Which host application and version or year is in scope?",
        "Which Axiom module or command is failing?",
        "Did the issue start after a host-app patch or workstation change?"
      ],
      supportCheckpoints: [
        "Capture the host application, year, and Axiom module name before changing the install.",
        "If only one tool is missing, compare it with another Axiom tool inside the same host app.",
        "Keep host-app compatibility in scope before you touch user data or templates."
      ],
      commonIssues: [
        issue(
          "Axiom ribbon or module does not load",
          "The host app opens, but the expected Axiom tool or ribbon is missing.",
          "Validate the host-app year and the required Axiom module before reinstalling the add-in.",
          "Collect the host app version, Axiom module name, and screenshot of the missing tool location.",
          "Escalate when the same module fails on multiple approved workstations with the same host-app year."
        )
      ],
      usefulInfo: {
        paths: ["Host-app add-ins path", "Axiom install path", "Client standard module list"],
        logs: ["Host app version screenshot", "Missing ribbon screenshot", "Module list in use"],
        services: [],
        processes: []
      },
      relatedLinks: [{ label: "Axiom official site", url: "https://www.axiomint.com/" }]
    }
  }
};
