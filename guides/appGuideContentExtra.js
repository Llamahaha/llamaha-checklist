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
    },
    "acrobat-sign": {
      highlights: [
        "Fastest likely fix: confirm the signer email, sender account, and whether the routing order actually reached the current signer before touching the template.",
        "Most 'I did not get the email' tickets are spam or alias delivery problems, not Acrobat Sign bugs."
      ],
      askFirst: [
        "Is the user the sender, a signer, or an admin for the agreement?",
        "What is the exact agreement name and current routing status in Acrobat Sign?",
        "Which email address is Acrobat Sign delivering to, and is that address actually monitored?",
        "Did the issue begin after an Adobe profile change, email alias change, or template edit?"
      ],
      supportCheckpoints: [
        "Pull the agreement activity log from the Manage page before you resend or recreate it.",
        "Confirm the Acrobat Sign product profile and company profile on the sender's Adobe work account.",
        "Check the signer's junk, quarantine, and alias mail before blaming Acrobat Sign delivery."
      ],
      commonIssues: [
        issue(
          "Signer says they never received the email",
          "The sender confirms the agreement was sent, but the signer reports no Acrobat Sign email arrived.",
          "Confirm the signer address on the agreement, check the mail flow or quarantine, then resend or share the signing link instead of recreating the agreement.",
          "Collect the agreement name, routing status, signer email, and sender screenshot of the activity log.",
          "Escalate when mail flow or quarantine confirms delivery but the signer still cannot sign from any device."
        ),
        issue(
          "Template or form sends the wrong fields or signer order",
          "The agreement sends, but the fields, signer order, or recipient roles do not match what the sender configured.",
          "Open the template or library document, confirm recipient order and field assignment, then send a fresh test before touching existing in-flight agreements.",
          "Collect the template name, the agreement name, and screenshots of both the template and the sent form.",
          "Escalate to the template owner if more than one sender reports the same wrong field or order."
        ),
        issue(
          "Acrobat Sign opens as Acrobat Reader only",
          "The sender clicks Send for Signature but Acrobat opens without the Acrobat Sign tools or web workflow.",
          "Confirm the work Adobe account, company profile, and Acrobat Sign product profile assignment before reinstalling Acrobat.",
          "Collect the Adobe account shown, company profile, Acrobat version, and screenshot of the missing Sign tools.",
          "Escalate to the Adobe admin when the product profile is assigned in Admin Console but the tool still does not appear."
        )
      ],
      usefulInfo: {
        paths: ["Template library", "Workflow definitions", "Reports and activity export path"],
        logs: ["Agreement activity log", "Mail flow trace for signer address", "Adobe Admin Console product-profile screenshot"],
        services: [],
        processes: ["Acrobat.exe"]
      },
      relatedLinks: [
        { label: "Adobe Acrobat Sign Help", url: "https://helpx.adobe.com/sign/user-guide.html" },
        { label: "Acrobat Sign admin guide", url: "https://helpx.adobe.com/sign/using/admin-guide.html" }
      ]
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
    },
    "construction-cloud": {
      highlights: [
        "Fastest likely fix: confirm which project-hub product (Docs, Build, Takeoff, BIM 360) and which account or hub the user was actually invited into before rebuilding anything.",
        "\"I can't see this project\" is almost always an invitation, hub, or account-mismatch problem, not a client install issue."
      ],
      askFirst: [
        "Which Construction Cloud product is in scope — Autodesk Docs, Autodesk Build, Takeoff, or legacy BIM 360?",
        "Which Autodesk account email is the user actually signed in with, and was the project invite sent to that exact address?",
        "Does the user see the hub at all, or do they see the hub but not the project?",
        "Is the failure in the browser, the Desktop Connector, the Revit or Civil 3D add-in, or the mobile app?"
      ],
      supportCheckpoints: [
        "Have the user check ACC at https://acc.autodesk.com while signed in with the exact invited email before troubleshooting the client.",
        "Confirm the project admin actually added the user to the project (not just the account or hub).",
        "Capture the Desktop Connector sign-in account separately if the user reports it instead of the browser."
      ],
      commonIssues: [
        issue(
          "I can't see this project",
          "User is signed into Construction Cloud but the expected project does not appear.",
          "Verify the signed-in Autodesk account matches the invited email and that the project admin added them as a project member (not just account member) before touching the client.",
          "Collect the Autodesk account email, hub name, project name, and screenshot of the ACC hub view.",
          "Escalate to the project admin when the invite was confirmed sent but membership still does not appear."
        ),
        issue(
          "Desktop Connector will not sync",
          "Files are visible in the browser but Desktop Connector shows stale data, sync errors, or missing projects.",
          "Sign out of Desktop Connector, confirm the same Autodesk account the browser uses, restart the connector service, then resume sync on one folder.",
          "Collect the connector version, Autodesk account, sync error screenshot, and the project and folder path involved.",
          "Escalate when reinstalling the connector and clearing cache on two workstations still reproduces the sync issue."
        ),
        issue(
          "Revit or Civil 3D cannot open the cloud model",
          "The host app opens, but the model from Construction Cloud fails to open, check out, or save.",
          "Confirm the host-app version is supported with the current ACC release, the user is a project member, and the model is not already checked out by someone else.",
          "Collect the host app name and version, the model name and path, the Autodesk account, and the exact error.",
          "Escalate when the same model opens for other approved users from an approved host-app version."
        )
      ],
      usefulInfo: {
        paths: ["%LOCALAPPDATA%\\Autodesk\\Desktop Connector", "ACC hub URL", "Project folder path"],
        logs: ["Desktop Connector log", "ACC activity log", "Host app sign-in screenshot"],
        services: ["Autodesk Desktop Connector"],
        processes: ["DesktopConnector.exe"]
      },
      relatedLinks: [
        { label: "Autodesk Construction Cloud help", url: "https://help.autodesk.com/view/BUILD/ENU/" },
        { label: "Autodesk Desktop Connector", url: "https://help.autodesk.com/view/CONNECT/ENU/" }
      ]
    },
    vault: {
      highlights: [
        "Fastest likely fix: identify whether the lock, check-out, or sync issue is Vault server-side or client-side before reinstalling anything on the workstation.",
        "\"File is locked by another user\" tickets are almost always a real check-out that was not released, not a Vault bug."
      ],
      askFirst: [
        "Which Vault edition (Basic, Workgroup, Professional) and which Vault server is in scope?",
        "Is the failure sign-in, check-out, check-in, browsing, or the host-app add-in (Inventor, AutoCAD, Revit)?",
        "Does the user know who actually has the file checked out and whether that person is still active?",
        "What Vault client version is on the workstation compared to the server?"
      ],
      supportCheckpoints: [
        "Check the Vault history and check-out status in the web client or Vault Explorer before touching the workstation.",
        "Confirm the Vault client version matches the server major release within Autodesk's supported compatibility window.",
        "If a file is stuck checked out by an inactive user, use Vault admin to undo the check-out rather than fighting the client."
      ],
      commonIssues: [
        issue(
          "File is locked by another user",
          "User tries to check out or edit a file but Vault shows it is checked out to someone else.",
          "Confirm who has it checked out in Vault Explorer, ask that person to check it in, or have a Vault admin undo the check-out if the user is inactive or on leave.",
          "Collect the file name and path, the user shown as having it checked out, and whether that user is still active.",
          "Escalate to the Vault admin when the listed owner is inactive, offboarded, or cannot be reached."
        ),
        issue(
          "Vault client cannot connect to the server",
          "User gets sign-in errors, server-unreachable messages, or SSO prompts that never complete.",
          "Confirm the server name, the Vault client version matches the server, and network or VPN access to the Vault server is in place before reinstalling.",
          "Collect the server name, client version, exact error, and whether other Vault users on the same subnet are working.",
          "Escalate when the server is reachable and the user is the only one unable to sign in."
        ),
        issue(
          "Host-app add-in does not show Vault tools",
          "Inventor, AutoCAD, or Revit opens but the Vault ribbon or commands are missing.",
          "Confirm the Vault client release matches the host-app year and the add-in was enabled during install before reinstalling.",
          "Collect the host app and year, Vault client version, and a screenshot of the missing ribbon.",
          "Escalate when a matching client version and host-app year still do not load the add-in on multiple approved workstations."
        )
      ],
      usefulInfo: {
        paths: ["Vault working folder", "Vault server URL", "Host app add-ins path"],
        logs: ["Vault client log", "Vault Explorer history for the file", "Host app version screenshot"],
        services: ["Autodesk Data Management Server"],
        processes: ["Connectivity.VaultPro.exe", "Inventor.exe", "acad.exe"]
      },
      relatedLinks: [
        { label: "Autodesk Vault help", url: "https://help.autodesk.com/view/VAULT/2026/ENU/" },
        { label: "Vault client-server compatibility", url: "https://knowledge.autodesk.com/support/vault-products/learn-explore/caas/sfdcarticles/sfdcarticles/Autodesk-Vault-and-AutoCAD-Compatibility.html" }
      ]
    }
  },
  bentley: {
    projectwise: {
      highlights: [
        "Fastest likely fix: confirm which datasource the user is signed into and whether the file check-out status is server-side before touching the workstation.",
        "\"File is locked by another user\" tickets are almost always a real ProjectWise check-out that was not released."
      ],
      askFirst: [
        "Which ProjectWise datasource is in scope and is it on-prem or ProjectWise 365?",
        "Is the failure sign-in, opening the datasource, check-out, check-in, or the host-app integration?",
        "Who does ProjectWise show as having the file checked out, and is that person still active?",
        "What ProjectWise Explorer version is installed compared to the server major release?"
      ],
      supportCheckpoints: [
        "Check the file status and audit trail in ProjectWise Explorer or the web before reinstalling anything.",
        "Confirm CONNECTION Client is signed in with the correct Bentley account before troubleshooting ProjectWise itself.",
        "If the file is stuck checked out by an inactive user, use ProjectWise admin to release the check-out rather than fighting the client."
      ],
      commonIssues: [
        issue(
          "File is locked by another user",
          "User tries to check out a ProjectWise document but it is already checked out to someone else.",
          "Confirm in ProjectWise Explorer who has it, ask them to check it back in, or have the ProjectWise admin release the check-out if that user is inactive.",
          "Collect the document path, document name, user shown as holding the lock, and whether that user is still active.",
          "Escalate to the ProjectWise admin when the lock holder is offboarded or unreachable."
        ),
        issue(
          "ProjectWise Explorer cannot reach the datasource",
          "User signs into CONNECTION Client but ProjectWise Explorer cannot open the expected datasource.",
          "Confirm the datasource server name, that VPN or network access is in place, and that the client version is compatible with the server before reinstalling.",
          "Collect the datasource name, server, client version, exact error, and whether other users on the same network are connecting.",
          "Escalate when the datasource is reachable and only one user cannot open it."
        ),
        issue(
          "Host-app integration does not open the file in ProjectWise",
          "MicroStation, AutoCAD, or Office opens the file locally instead of through ProjectWise, or the integration is missing.",
          "Confirm the ProjectWise integration for that host app was installed and the host-app year matches the client release.",
          "Collect the host app and version, ProjectWise client version, and screenshot of the missing integration.",
          "Escalate when a matching client and host-app year still do not restore the integration."
        )
      ],
      usefulInfo: {
        paths: ["ProjectWise working directory", "Datasource server name", "Host-app add-ins path"],
        logs: ["ProjectWise Explorer log", "File audit trail", "CONNECTION Client account screenshot"],
        services: ["Bentley ProjectWise services"],
        processes: ["pwexplorer.exe"]
      },
      relatedLinks: [
        { label: "Bentley ProjectWise documentation", url: "https://docs.bentley.com/LiveContent/web/ProjectWise%20Explorer%20Help-v16/en/GUID-AAE5D7AC-B83B-4A4F-88B3-4EFA0B72BB76.html" },
        { label: "Bentley support", url: "https://www.bentley.com/support/" }
      ]
    },
    "openroads-designer": {
      highlights: [
        "Fastest likely fix: confirm Bentley sign-in, the configured workspace and workset, and whether the project's civil standards path is actually reachable before reinstalling.",
        "OpenRoads issues usually trace to workspace or workset configuration, not the OpenRoads install itself."
      ],
      askFirst: [
        "Which OpenRoads Designer version is approved for this project team?",
        "Is the failure CONNECTION Client sign-in, opening a DGN, loading a workspace or workset, or a specific civil tool?",
        "Does the project use a custom workspace or workset, and is that path reachable from this computer?",
        "Can another approved computer open the same DGN and load the same workspace?"
      ],
      supportCheckpoints: [
        "Confirm the Bentley account in CONNECTION Client matches what the project expects before troubleshooting OpenRoads.",
        "Check the configured workspace, workset, and civil standards paths in OpenRoads Designer before changing the install.",
        "Compare a simple vanilla DGN with the failing project DGN to isolate workspace issues from app issues."
      ],
      commonIssues: [
        issue(
          "Workspace or workset content missing",
          "OpenRoads opens, but the expected workspace, workset, standards, or custom tools are not loaded.",
          "Check the configured workspace and workset in the OpenRoads startup view and confirm the civil standards path is reachable before reinstalling.",
          "Collect the workspace and workset names, the standards path, and the exact error or missing-tool screenshot.",
          "Escalate to the CAD manager when the standards path is reachable but content still does not load for one user."
        ),
        issue(
          "Civil tool or ribbon is missing",
          "The app opens and workspace loads, but a specific civil tool or ribbon is missing or grayed.",
          "Confirm the correct WorkFlow is selected in the ribbon dropdown and the license or entitlement for OpenRoads Designer is active in CONNECTION Client.",
          "Collect the WorkFlow selected, Bentley account, product version, and screenshot of the missing tool.",
          "Escalate when the same WorkFlow and account work for other users but not this one."
        ),
        issue(
          "DGN file will not open or behaves oddly",
          "A civil project DGN fails to open, opens slowly, or displays incorrectly.",
          "Compare with a known-good project DGN first, then confirm the DGN's required references and workspace are available.",
          "Collect the DGN name, path, references list if accessible, and version of OpenRoads in use.",
          "Escalate when the same DGN fails on multiple approved workstations with the correct workspace loaded."
        )
      ],
      usefulInfo: {
        paths: ["Workspace path", "Workset path", "Civil standards library path", "DGN project folder"],
        logs: ["CONNECTION Client account screenshot", "Workspace startup screenshot", "DGN error text"],
        services: [],
        processes: ["OpenRoadsDesigner.exe"]
      },
      relatedLinks: [
        { label: "OpenRoads Designer help", url: "https://docs.bentley.com/LiveContent/web/OpenRoads%20Designer%20SS10-v14/en/GUID-42E3ACE3-3DE5-4B5F-9B07-D40EAA8AAF47.html" },
        { label: "Bentley Communities", url: "https://communities.bentley.com/" }
      ]
    }
  },
  microsoft: {
    project: {
      highlights: [
        "Fastest likely fix: figure out whether the user is on desktop Project Professional, Project for the web, or Project Online before anything else — they behave completely differently.",
        "Most Project tickets are licensing assignment or 'wrong Project' confusion, not a broken install."
      ],
      askFirst: [
        "Which Project is this — Project Professional desktop, Project for the web (https://project.microsoft.com), or Project Online (PWA)?",
        "Is the user trying to open a .mpp file, a Project for the web plan, or connect to a PWA site?",
        "What Project license is assigned to the user in Microsoft 365 Admin Center (Project Plan 1, 3, or 5)?",
        "Did the issue begin after a license change, role change, or new computer?"
      ],
      supportCheckpoints: [
        "Confirm the exact Project license in Microsoft 365 Admin Center before reinstalling anything on the workstation.",
        "For .mpp files, check whether Project Professional is actually installed (it is not part of standard Microsoft 365 Apps).",
        "For Project for the web, test sign-in at https://project.microsoft.com in a fresh browser profile before troubleshooting."
      ],
      commonIssues: [
        issue(
          "Cannot open .mpp file",
          "User double-clicks an .mpp file but nothing opens or Windows prompts to choose an app.",
          "Confirm Project Professional is installed (not just Project Online or Project for the web) and the user has a Project Plan 3 or 5 license assigned.",
          "Collect the Project license shown in Admin Center, whether Project Professional appears in Start, and the exact .mpp file path.",
          "Escalate to the license admin when Plan 3 or 5 is confirmed assigned but Project Professional will not install from the Office 365 portal."
        ),
        issue(
          "Project for the web is missing or empty",
          "User signs into https://project.microsoft.com but cannot create plans or sees no projects.",
          "Confirm a Project Plan license is assigned and the user has navigated to the correct tenant before troubleshooting the browser.",
          "Collect the signed-in account, license assignment screenshot, and whether a fresh browser profile behaves the same.",
          "Escalate when the license is confirmed assigned and the portal still does not show plan creation options."
        ),
        issue(
          "Project Online (PWA) site will not load",
          "User cannot reach the Project Online PWA site or gets access-denied errors.",
          "Confirm the PWA URL, that the user is a member of the PWA site, and that Project Plan 3 or 5 is assigned before troubleshooting browser state.",
          "Collect the PWA URL, account, license, and exact error message.",
          "Escalate to the Project admin when PWA access was recently changed and the user's membership cannot be confirmed."
        )
      ],
      usefulInfo: {
        paths: ["%ProgramFiles%\\Microsoft Office\\root\\Office16\\WINPROJ.EXE", "Project for the web URL", "PWA site URL"],
        logs: ["Microsoft 365 license assignment screenshot", "Account shown in Project", "Browser sign-in profile"],
        services: [],
        processes: ["WINPROJ.EXE"]
      },
      relatedLinks: [
        { label: "Microsoft Project help", url: "https://support.microsoft.com/en-us/project" },
        { label: "Project plans and pricing", url: "https://www.microsoft.com/en-us/microsoft-365/project/project-management-software" }
      ]
    }
  },
  trimble: {
    "trimble-connect": {
      highlights: [
        "Fastest likely fix: confirm the Trimble ID in use and that the user was invited to the project by that exact email before touching the client.",
        "Connect is project-invite-driven; missing projects are almost always identity or invite issues, not client problems."
      ],
      askFirst: [
        "Which Trimble ID (email) is the user signed in with on the web at https://web.connect.trimble.com?",
        "Which project and which region or server (US, EU, APAC) was the invite sent for?",
        "Is the failure in the web client, the Windows desktop client, the SketchUp extension, or the Tekla integration?",
        "Did the issue begin after a Trimble ID email change, role change, or new computer?"
      ],
      supportCheckpoints: [
        "Have the user verify at https://web.connect.trimble.com first before blaming the desktop client.",
        "Confirm the project invite went to the same email the user is signing in with — Trimble IDs are email-exact.",
        "Check which region the project lives in (some users sign into the wrong region's Connect URL)."
      ],
      commonIssues: [
        issue(
          "Invited project does not appear",
          "User signs into Connect but the expected project is missing.",
          "Confirm the Trimble ID email matches the invited email exactly, and ask the project admin to resend the invite if needed.",
          "Collect the Trimble ID, the project name, the admin's invitation email confirmation, and a screenshot of the project list.",
          "Escalate to the project admin when the invite is confirmed sent to the correct address but the project still does not appear."
        ),
        issue(
          "SketchUp or Tekla integration cannot see the project",
          "The integration in SketchUp or Tekla will not sign in, or the project does not appear even though it appears in the web.",
          "Confirm the extension is current, the Trimble ID used in the extension matches the web sign-in, and the extension has permission to access the project.",
          "Collect the host app name and version, extension version, Trimble ID, and project name.",
          "Escalate when the web client sees the project but the extension on multiple approved workstations does not."
        ),
        issue(
          "File uploads fail or stall",
          "User tries to upload a model or file to Connect but the upload fails or stalls.",
          "Confirm network access to the Connect region endpoint, test a small file first, and confirm the user has the Edit or Admin role on the folder.",
          "Collect the file size, the project name, the folder, the user's role on the folder, and a screenshot of the upload error.",
          "Escalate when small files upload but large files consistently fail from multiple approved networks."
        )
      ],
      usefulInfo: {
        paths: ["Connect sync folder", "Project folder in Connect", "Extension install path for host app"],
        logs: ["Trimble ID account screenshot", "Connect project list screenshot", "Upload error text"],
        services: [],
        processes: ["TrimbleConnect.exe"]
      },
      relatedLinks: [
        { label: "Trimble Connect help", url: "https://help.trimble.com/en/trimble-connect/trimble-connect" },
        { label: "Trimble Identity", url: "https://id.trimble.com/" }
      ]
    }
  },
  deltek: {
    vantagepoint: {
      highlights: [
        "Fastest likely fix: identify whether the user is on Deltek Vantagepoint cloud, on-prem web, or the Deltek iAccess or mobile app, and confirm their role assignment before touching anything.",
        "Most Vantagepoint tickets are role, approval-workflow, or time-entry configuration issues, not product bugs."
      ],
      askFirst: [
        "Is the user on Vantagepoint cloud (https://cloud.deltek.com), on-prem web, or the mobile time app?",
        "Is the issue sign-in, missing projects or charge codes, approval routing, time or expense entry, reports, or billing?",
        "What Vantagepoint role is assigned to the user, and what role do they need?",
        "Did the issue begin after a role change, period close, workflow change, or period reset?"
      ],
      supportCheckpoints: [
        "Confirm the exact Vantagepoint URL and that SSO or local sign-in is reaching the expected tenant.",
        "Check the user's security role in Vantagepoint before treating it as a client issue — most 'missing' issues are role-based.",
        "Confirm the period is actually open for the action the user is trying to perform (time, expense, billing)."
      ],
      commonIssues: [
        issue(
          "Charge codes or projects missing in time entry",
          "User opens time entry but the expected project or charge code is not available.",
          "Confirm the user is assigned to the project team in Vantagepoint and that the charge code is active for the current period before touching the client.",
          "Collect the user's Vantagepoint role, the project number, the period, and a screenshot of the time entry grid.",
          "Escalate to the Deltek admin or project manager when team assignment is confirmed but the project still does not appear."
        ),
        issue(
          "Approval did not reach the approver",
          "User submits time, expense, or AP but the approval never arrives for the approver.",
          "Check the approval workflow configuration and confirm the current approver, current step, and whether any approvers are inactive or on leave.",
          "Collect the transaction number, submitter, current approval step, approver name, and submission timestamp.",
          "Escalate to the Deltek admin when the workflow is confirmed correct but transactions are still stalling."
        ),
        issue(
          "Cannot sign into Vantagepoint",
          "User cannot sign into cloud or on-prem Vantagepoint.",
          "Confirm the URL, SSO state, whether the account is active in Vantagepoint security, and whether MFA is completing before reinstalling browser or app.",
          "Collect the exact URL, sign-in error, account, MFA state, and whether other Vantagepoint users can sign in.",
          "Escalate to the Deltek admin when the account is active but SSO still fails for this user."
        )
      ],
      usefulInfo: {
        paths: ["Vantagepoint URL", "Vantagepoint Mobile Time app", "iAccess URL"],
        logs: ["Security role screenshot", "Approval workflow screenshot", "Exact error text"],
        services: [],
        processes: []
      },
      relatedLinks: [
        { label: "Deltek Customer Care", url: "https://deltek.custhelp.com/" },
        { label: "Deltek Vantagepoint overview", url: "https://www.deltek.com/en/erp/vantagepoint" }
      ]
    }
  },
  docusign: {
    "docusign-web": {
      highlights: [
        "Fastest likely fix: confirm the signer email, sender account, and whether delivery was actually attempted before blaming DocuSign — most 'didn't get the email' tickets are mail flow or alias issues.",
        "DocuSign routes agreements strictly by email address; Outlook aliases, distribution lists, and shared mailboxes often break delivery."
      ],
      askFirst: [
        "Is the user the sender, a signer, an admin, or a template owner?",
        "What is the exact envelope name and current routing status in DocuSign?",
        "Which email address is DocuSign delivering to, and is that address actually monitored as a primary mailbox?",
        "Did the issue begin after an SSO change, email alias change, or template update?"
      ],
      supportCheckpoints: [
        "Pull the envelope history and recipient status from Manage before you resend or recreate the envelope.",
        "Confirm the sender's DocuSign account, permission profile, and whether SSO is sending them into the expected tenant.",
        "Check the signer's junk, quarantine, and alias mail flow before assuming DocuSign did not send."
      ],
      commonIssues: [
        issue(
          "Signer says they never received the email",
          "Sender confirms the envelope was sent but the signer reports no DocuSign email arrived.",
          "Check the envelope recipient status, confirm the signer address, check mail flow or quarantine, then share the signing URL directly instead of recreating the envelope.",
          "Collect the envelope ID, recipient status screenshot, signer email, and mail flow trace.",
          "Escalate when mail flow confirms delivery but the signer still cannot sign from any device."
        ),
        issue(
          "Template sends wrong fields or wrong signer order",
          "The envelope sends but fields or recipient routing does not match what the template should do.",
          "Open the template, confirm signer order and field assignment, and send a fresh test before modifying any in-flight envelopes.",
          "Collect the template name, envelope ID, and screenshots of both the template and the sent envelope.",
          "Escalate to the template owner when multiple senders reproduce the same wrong field or order."
        ),
        issue(
          "Sender cannot sign in or is in the wrong account",
          "Sender opens DocuSign but lands in a personal account, the wrong tenant, or cannot sign in at all.",
          "Confirm SSO from the work portal, confirm the account name shown in DocuSign matches the work tenant, and sign out of personal sessions before re-signing in.",
          "Collect the DocuSign account shown, the expected tenant, the SSO method, and the sign-in error if any.",
          "Escalate to the DocuSign admin when SSO puts the user in the wrong tenant repeatedly."
        )
      ],
      usefulInfo: {
        paths: ["DocuSign admin URL", "Template library", "Reports and envelope export path"],
        logs: ["Envelope history", "Recipient status", "Mail flow trace"],
        services: [],
        processes: []
      },
      relatedLinks: [
        { label: "DocuSign support", url: "https://support.docusign.com/" },
        { label: "DocuSign Admin overview", url: "https://www.docusign.com/products/admin" }
      ]
    }
  },
  zoom: {
    "zoom-meetings": {
      highlights: [
        "Fastest likely fix: confirm which Zoom account the user signed into (work SSO vs personal) and whether the device's mic, camera, and speaker are actually permitted at the OS level before troubleshooting the client.",
        "Audio and video issues are usually Windows or macOS permission state, not Zoom itself."
      ],
      askFirst: [
        "Did the user sign into Zoom with SSO from the work portal, or with an email and password?",
        "Is the issue audio, camera, screen share, connectivity, recording, or sign-in?",
        "Is this Zoom desktop client, browser client, Zoom Rooms, or the Outlook add-in?",
        "Did the issue begin after a Zoom update, Windows or macOS update, new computer, or peripheral change?"
      ],
      supportCheckpoints: [
        "Check Windows or macOS microphone and camera privacy settings before touching the Zoom client.",
        "Confirm the user is signed into the company Zoom tenant via SSO, not a personal Zoom account.",
        "Test a Zoom Test Meeting (https://zoom.us/test) to isolate device issues from meeting-specific issues."
      ],
      commonIssues: [
        issue(
          "Microphone or camera does not work",
          "User joins but no audio or video, or Zoom reports no device found.",
          "Check Windows or macOS privacy settings (Microphone, Camera), confirm the correct device is selected in Zoom settings, and test in https://zoom.us/test before reinstalling.",
          "Collect the OS and version, Zoom client version, device name selected, and screenshot of the OS privacy panel.",
          "Escalate when OS permissions and device selection are confirmed correct but Zoom still cannot use the device."
        ),
        issue(
          "Signed into wrong Zoom account",
          "User joins meetings from a personal Zoom instead of the work tenant, or cannot access company features.",
          "Sign out of Zoom, use Sign In with SSO, enter the company vanity URL, and complete SSO before reopening the work meeting.",
          "Collect the account email shown, the company vanity URL, and whether SSO completes.",
          "Escalate to the Zoom admin when SSO completes but the user still lands in a personal account."
        ),
        issue(
          "Cannot screen share or share is blocked",
          "User presses Share but nothing happens or the option is missing.",
          "Check macOS screen-recording permission for Zoom, confirm the meeting host allows participant sharing, and confirm the user's Zoom role permits sharing.",
          "Collect the OS, Zoom version, meeting host, user's role, and screenshot of the Share dialog.",
          "Escalate when permissions and meeting settings are confirmed correct but share still fails."
        )
      ],
      usefulInfo: {
        paths: ["%APPDATA%\\Zoom", "~/Library/Application Support/zoom.us (macOS)", "Zoom web portal URL"],
        logs: ["Zoom client log (Help > Report Problem)", "OS privacy panel screenshot", "Zoom Test Meeting result"],
        services: [],
        processes: ["Zoom.exe", "zoom.us (macOS)"]
      },
      relatedLinks: [
        { label: "Zoom Support", url: "https://support.zoom.us/" },
        { label: "Zoom Test Meeting", url: "https://zoom.us/test" }
      ]
    }
  },
  cisco: {
    webex: {
      highlights: [
        "Fastest likely fix: confirm whether the user is on Webex Meetings, Webex App (Teams messaging), or a Webex Room device and verify OS device permissions before troubleshooting the client.",
        "Audio and video issues are almost always OS permission state, not Webex."
      ],
      askFirst: [
        "Is this Webex App (the unified client), classic Webex Meetings, or a Webex Room or Board device?",
        "Is the issue sign-in, audio, camera, screen share, messaging, or calling?",
        "Did the user sign in via SSO from the work portal, or with an email directly?",
        "Did the issue begin after a Webex update, OS update, new computer, or peripheral change?"
      ],
      supportCheckpoints: [
        "Check Windows or macOS microphone, camera, and screen-recording permissions before reinstalling Webex.",
        "Confirm the Webex site URL (https://<company>.webex.com) matches what the company expects.",
        "For Webex App, confirm the cluster and organization shown in Help > About."
      ],
      commonIssues: [
        issue(
          "Microphone or camera not working in Webex",
          "User joins but no audio or video, or Webex reports no device found.",
          "Check OS privacy settings for Webex, confirm the correct device is selected in Audio and Video settings, and test a call before reinstalling.",
          "Collect the OS and version, Webex App version, device selected, and screenshot of OS privacy panel.",
          "Escalate when OS permissions and device selection are correct but Webex still cannot use the device."
        ),
        issue(
          "Cannot sign into Webex App",
          "User cannot complete Webex App sign-in or lands in the wrong organization.",
          "Use the exact company email to trigger SSO discovery, complete SSO in the browser, and confirm the organization shown in Webex App.",
          "Collect the email used, the organization shown, SSO error if any, and the cluster in Help > About.",
          "Escalate to the Webex admin when SSO completes but the user lands in the wrong organization."
        ),
        issue(
          "Outlook integration or scheduling not working",
          "The Webex Outlook add-in does not appear or scheduling fails.",
          "Confirm the Webex Productivity Tools or the modern Webex Scheduler add-in is installed and enabled in Outlook, and that Outlook is signed in with the same account.",
          "Collect the Outlook version, Webex add-in version, add-in enable state, and screenshot of the Outlook ribbon.",
          "Escalate when the add-in is enabled but scheduling still fails for multiple users."
        )
      ],
      usefulInfo: {
        paths: ["%APPDATA%\\Cisco Spark", "~/Library/Application Support/Cisco Webex (macOS)", "Webex site URL"],
        logs: ["Webex App log (Help > Send Log)", "OS privacy panel screenshot", "Help > About organization info"],
        services: [],
        processes: ["CiscoWebexStart.exe", "Cisco Webex (macOS)"]
      },
      relatedLinks: [
        { label: "Webex Help Center", url: "https://help.webex.com/" },
        { label: "Webex Status", url: "https://status.webex.com/" }
      ]
    }
  },
  box: {
    "box-drive": {
      highlights: [
        "Fastest likely fix: confirm the user is signed into the work Box tenant and that Box Drive has completed its initial sync before touching the install.",
        "Most Box Drive tickets are account-mismatch, permission, or network-block issues, not client bugs."
      ],
      askFirst: [
        "Is the user signed into Box Drive with the work Box account, not a personal Box account?",
        "Is the failure sign-in, missing folders, file open, sync error, or external share?",
        "Did the issue begin after a Box tenant SSO change, role change, new computer, or Windows or macOS update?",
        "Does the same folder appear correctly at https://app.box.com in the browser?"
      ],
      supportCheckpoints: [
        "Confirm the Box account shown in Box Drive matches what https://app.box.com shows for the user.",
        "Check that Box Drive's drive letter or mount is present before assuming files are missing.",
        "If network is blocking Box, confirm https://*.box.com and https://*.boxcdn.net are reachable from the workstation."
      ],
      commonIssues: [
        issue(
          "Folder is missing in Box Drive but present in browser",
          "User can see the folder at app.box.com but it does not appear in Box Drive.",
          "Wait for Box Drive to finish sync, confirm the same account is signed into both, and pin the folder in Box Drive if it needs offline access.",
          "Collect the folder name, browser-confirmed presence, Box Drive account, and sync status.",
          "Escalate when both accounts match and sync is idle but the folder still does not appear on multiple workstations."
        ),
        issue(
          "External share link will not open",
          "User sent or received a Box shared link that will not open.",
          "Confirm the link permissions (people in your company vs people with the link), confirm expiration, and confirm the recipient account matches the link restriction.",
          "Collect the share link URL, link permission setting, expiration date, and recipient account.",
          "Escalate when link permissions are confirmed correct but the recipient still cannot open the link."
        ),
        issue(
          "Box Drive signed into the wrong account",
          "Box Drive shows a personal account or the wrong tenant's Box.",
          "Sign out of Box Drive, quit fully, sign in again with the work Box account (typically via SSO), and confirm the account in Box Drive matches the browser.",
          "Collect the account email shown, the expected tenant, and whether SSO is offered at sign-in.",
          "Escalate to the Box admin when SSO completes but the user lands in the wrong account."
        )
      ],
      usefulInfo: {
        paths: ["%USERPROFILE%\\Box", "~/Library/CloudStorage/Box-Box (macOS)", "Box web URL"],
        logs: ["Box Drive sync status", "Account screenshot", "Network trace to *.box.com"],
        services: ["Box Drive"],
        processes: ["Box.exe"]
      },
      relatedLinks: [
        { label: "Box Drive help", url: "https://support.box.com/hc/en-us/sections/21356707082387-Box-Drive" },
        { label: "Box support", url: "https://support.box.com/" }
      ]
    }
  },
  dropbox: {
    "dropbox-desktop": {
      highlights: [
        "Fastest likely fix: confirm which Dropbox account is signed in (work team vs personal) and whether smart sync or selective sync settings match what the user expects.",
        "Most 'missing files' tickets are selective sync or team-folder membership, not client bugs."
      ],
      askFirst: [
        "Is this Dropbox Business (a work team) or a personal Dropbox?",
        "Is the issue sign-in, missing team folder, sync error, smart sync, or external share?",
        "Did the issue begin after a team role change, team-folder rename, new computer, or Windows or macOS update?",
        "Does the same folder appear correctly at https://www.dropbox.com in the browser?"
      ],
      supportCheckpoints: [
        "Confirm the Dropbox account shown in the desktop app matches the web view.",
        "Check selective sync settings and team-folder membership before assuming the file was deleted.",
        "For Dropbox Business, confirm the user is signed into the correct team instance, not their personal one."
      ],
      commonIssues: [
        issue(
          "Team folder missing on the desktop",
          "User expects a team folder but it does not appear in the Dropbox folder on disk.",
          "Check selective sync settings, confirm team-folder membership in the admin console, and open the folder in the browser to validate access before resyncing.",
          "Collect the folder name, team-folder membership, selective sync setting, and account signed in.",
          "Escalate to the Dropbox admin when membership and sync settings look correct but the folder still does not appear."
        ),
        issue(
          "Sync icon stuck or showing errors",
          "Dropbox icon shows a sync error or stays pending for a long time.",
          "Check the file name for unsupported characters or path length, confirm disk space, and pause and resume sync before reinstalling.",
          "Collect the file name, path length, disk space, and the exact sync error.",
          "Escalate when a specific file keeps blocking sync across multiple workstations."
        ),
        issue(
          "Signed into personal Dropbox instead of team",
          "Dropbox desktop shows a personal account even though the user should be on the work team.",
          "Sign out of Dropbox, sign in again with the work account via SSO if the team uses SSO, and confirm the team name appears in preferences.",
          "Collect the account signed in, the team name shown, and whether SSO is required.",
          "Escalate to the Dropbox admin when the user completes SSO but still lands on personal Dropbox."
        )
      ],
      usefulInfo: {
        paths: ["%USERPROFILE%\\Dropbox", "~/Dropbox (macOS)", "Dropbox web URL"],
        logs: ["Sync status", "Account and team screenshot", "Selective sync settings"],
        services: [],
        processes: ["Dropbox.exe"]
      },
      relatedLinks: [
        { label: "Dropbox Business help", url: "https://help.dropbox.com/teams-admins" },
        { label: "Dropbox help center", url: "https://help.dropbox.com/" }
      ]
    }
  },
  duo: {
    "duo-mobile": {
      highlights: [
        "Fastest likely fix: identify whether the user is enrolling a new device, replacing a lost device, or reactivating on the same device — the path is different for each.",
        "Most Duo tickets are 'I got a new phone' — the fix is Duo admin reset + fresh enrollment link, not reinstalling the app."
      ],
      askFirst: [
        "Is this a new enrollment, a phone replacement, or a reactivation on the same phone after reinstall?",
        "Does the user still have the old phone, and does it still receive Duo pushes?",
        "Does the organization use Duo self-service portal, and does the user have a bypass code already?",
        "Which applications protected by Duo is the user trying to sign into?"
      ],
      supportCheckpoints: [
        "Verify the user's identity independently (HR system, manager confirmation) before resetting Duo — MFA reset is a common phishing target.",
        "Check if the user has a registered backup method (SMS, voice call, hardware token) before wiping Duo enrollment.",
        "Generate a bypass code rather than deleting enrollment when the user still holds the old phone."
      ],
      commonIssues: [
        issue(
          "Got a new phone and cannot approve pushes",
          "User has a new phone and Duo Mobile on it does not approve pushes for protected apps.",
          "Verify identity, then either have the user use the self-service portal or have an admin reset the device and send a new enrollment link.",
          "Collect the user's verified identity, the phone model, and the applications they cannot reach.",
          "Escalate when identity verification is complete but the Duo admin reset does not produce a working push."
        ),
        issue(
          "Pushes not arriving on the phone",
          "Duo Mobile is installed and enrolled, but no approval push arrives.",
          "Check notification permissions for Duo Mobile in iOS or Android settings, confirm internet connectivity, and use the Duo Mobile app to refresh accounts.",
          "Collect the phone OS and version, Duo Mobile version, notification permission state, and internet test result.",
          "Escalate when notification permissions and connectivity are confirmed correct but pushes still do not arrive."
        ),
        issue(
          "Reactivating Duo Mobile on same phone after reinstall",
          "User reinstalled Duo Mobile on the same phone and the accounts are gone.",
          "If Duo Restore or a self-service reactivation link is available, use that; otherwise admin must send an activation link or enrollment reset.",
          "Collect the user verification, the phone, and whether Duo Restore was previously enabled.",
          "Escalate when Duo Restore is enabled but reactivation still fails."
        )
      ],
      usefulInfo: {
        paths: ["Duo Admin Panel URL", "Self-service portal URL", "Bypass code generation record"],
        logs: ["Duo Admin user log", "Phone OS notification settings", "Enrollment email delivery confirmation"],
        services: [],
        processes: []
      },
      relatedLinks: [
        { label: "Duo Mobile guide", url: "https://guide.duo.com/" },
        { label: "Duo Admin help", url: "https://help.duo.com/" }
      ]
    }
  },
  okta: {
    "okta-verify": {
      highlights: [
        "Fastest likely fix: identify whether the user is enrolling a new device, replacing a lost device, or reactivating — each has a different Okta self-service path.",
        "Most Okta Verify tickets are 'I got a new phone' — the admin fix is factor reset + new setup link, not reinstalling the app."
      ],
      askFirst: [
        "Is this a new enrollment, phone replacement, reactivation after reinstall, or a failed push?",
        "Does the organization use FastPass (device-trust-enabled Okta Verify) or just push or TOTP?",
        "Does the user still have the old phone, and does it still receive Okta pushes?",
        "Which applications protected by Okta is the user trying to sign into?"
      ],
      supportCheckpoints: [
        "Verify identity independently (HR, manager) before resetting Okta factors.",
        "Prefer factor reset over user reset — a user reset breaks other Okta apps unnecessarily.",
        "If FastPass is used, confirm whether device registration also needs re-enrollment, not just the factor."
      ],
      commonIssues: [
        issue(
          "Got a new phone and Okta Verify is not working",
          "User has a new phone and cannot complete Okta prompts with the Verify app.",
          "Verify identity, then use self-service factor reset (if enabled) or have an Okta admin reset Okta Verify and send a new setup link.",
          "Collect the identity verification, the phone model, and the applications blocked.",
          "Escalate when identity is verified but the Okta admin factor reset does not produce a working push."
        ),
        issue(
          "Okta pushes do not arrive",
          "Okta Verify is enrolled but pushes do not come through to the phone.",
          "Check notification permissions for Okta Verify, confirm internet connectivity, and use the app's refresh option before re-enrolling.",
          "Collect the phone OS, Verify version, notification permission state, and connectivity check.",
          "Escalate when notification permissions and connectivity look correct but pushes still do not arrive."
        ),
        issue(
          "FastPass device enrollment is failing",
          "FastPass is configured but the device will not complete enrollment or is not trusted.",
          "Confirm the Okta Verify app is current, the user has completed any MDM or device-registration steps the org requires, and the device meets the policy assurance level.",
          "Collect the OS, Verify version, MDM state, Okta device policy, and the FastPass error.",
          "Escalate when MDM and policy are confirmed and device enrollment still fails."
        )
      ],
      usefulInfo: {
        paths: ["Okta Admin URL", "End-user dashboard URL", "Okta Verify app store page"],
        logs: ["Okta System Log for the user", "Notification permission settings", "Setup email delivery confirmation"],
        services: [],
        processes: []
      },
      relatedLinks: [
        { label: "Okta Verify documentation", url: "https://help.okta.com/en-us/Content/Topics/Mobile/okta-verify-overview.htm" },
        { label: "Okta Help Center", url: "https://support.okta.com/" }
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
        "Axiom problems are usually host-app compatibility or missing-module issues."
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
