(function () {
  var body = document.body;
  if (!body || body.getAttribute("data-page-type") !== "app") {
    return;
  }

  var vendorSlug = body.getAttribute("data-vendor") || "";
  var appSlug = body.getAttribute("data-app") || "";
  var rootPath = body.getAttribute("data-root-path") || "..";

  var vendorTitles = {
    microsoft: "Microsoft 365",
    autodesk: "Autodesk",
    bentley: "Bentley",
    esri: "Esri",
    ptc: "PTC",
    trimble: "Trimble",
    adobe: "Adobe",
    bluebeam: "Bluebeam",
    foxit: "Foxit",
    quickbooks: "QuickBooks",
    egnyte: "Egnyte"
  };

  var appTitleOverrides = {
    "microsoft/outlook": "Outlook",
    "microsoft/teams": "Teams",
    "microsoft/onedrive": "OneDrive",
    "microsoft/sharepoint": "SharePoint",
    "adobe/acrobat-pro": "Adobe Acrobat",
    "adobe/creative-cloud-desktop": "Creative Cloud Desktop",
    "bluebeam/revu-21": "Bluebeam Revu",
    "autodesk/autocad": "AutoCAD",
    "autodesk/revit": "Revit",
    "autodesk/civil-3d": "Civil 3D",
    "autodesk/autodesk-desktop-app": "Autodesk Desktop App",
    "autodesk/recap-pro": "ReCap Pro",
    "esri/arcgis-pro": "ArcGIS Pro",
    "esri/arcgis-online": "ArcGIS Online",
    "bentley/projectwise": "ProjectWise",
    "bentley/connection-client": "CONNECTION Client",
    "bentley/microstation": "MicroStation",
    "quickbooks/quickbooks-enterprise-desktop": "QuickBooks Enterprise Desktop",
    "quickbooks/quickbooks-online": "QuickBooks Online",
    "egnyte/egnyte-desktop-app": "Egnyte Desktop App",
    "egnyte/egnyte-web-admin": "Egnyte Web UI / Admin",
    "ptc/mathcad-prime": "Mathcad Prime",
    "trimble/sketchup": "SketchUp",
    "trimble/trimble-business-center": "Trimble Business Center",
    "foxit/pdf-editor": "Foxit PDF Editor",
    "foxit/pdf-reader": "Foxit PDF Reader"
  };

  var summaryOverrides = {
    "microsoft/outlook": "Use this guide when Outlook will not open your mailbox, keeps asking you to sign in, stops syncing, or shared mailboxes and calendars are missing.",
    "microsoft/teams": "Use this guide when Teams will not sign in, meetings fail, channels are missing, or chat and file access do not update correctly.",
    "microsoft/onedrive": "Use this guide when OneDrive is not syncing, files are missing, shared libraries stop updating, or folders appear in the wrong place.",
    "adobe/acrobat-pro": "Use this guide when Acrobat will not activate, opens as Reader, cannot edit or sign PDFs, or browser and Office PDF actions stop working.",
    "bluebeam/revu-21": "Use this guide when Bluebeam Revu will not sign in, Studio is unavailable, PDF markups are missing, or shared profiles and tool sets do not load.",
    "autodesk/autocad": "Use this guide when AutoCAD will not open drawings, asks for sign-in, has missing fonts or references, or cannot plot the way you expect.",
    "autodesk/revit": "Use this guide when Revit will not open a model, says you need a different version, has missing add-ins or families, or fails to sign in.",
    "autodesk/civil-3d": "Use this guide when Civil 3D will not open project drawings correctly, data shortcuts are broken, styles are missing, or the app says you need a different version.",
    "esri/arcgis-pro": "Use this guide when ArcGIS Pro will not sign in, shows the wrong license level, hides projects or layers, or crashes while opening maps.",
    "bentley/projectwise": "Use this guide when ProjectWise will not connect to the right datasource, project files are missing, or check-in and check-out actions stop working."
  };

  function capitalizeWord(word) {
    var special = {
      autocad: "AutoCAD",
      arcgis: "ArcGIS",
      onedrive: "OneDrive",
      sharepoint: "SharePoint",
      projectwise: "ProjectWise",
      quickbooks: "QuickBooks",
      sketchup: "SketchUp",
      microstation: "MicroStation",
      revit: "Revit",
      teams: "Teams",
      outlook: "Outlook",
      egnyte: "Egnyte",
      mathcad: "Mathcad",
      recap: "ReCap",
      infraworks: "InfraWorks",
      revu: "Revu",
      signcad: "SignCAD",
      connection: "CONNECTION",
      pdf: "PDF",
      ui: "UI",
      admin: "Admin"
    };
    var lower = String(word || "").toLowerCase();
    if (special[lower]) {
      return special[lower];
    }
    return lower ? lower.charAt(0).toUpperCase() + lower.slice(1) : "";
  }

  function getAppName(vendor, slug) {
    var key = vendor + "/" + slug;
    if (appTitleOverrides[key]) {
      return appTitleOverrides[key];
    }
    return String(slug || "")
      .split("-")
      .map(capitalizeWord)
      .join(" ");
  }

  function createEl(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text) {
      node.textContent = text;
    }
    return node;
  }

  function createList(items) {
    var list = createEl("ul", "guide-list");
    for (var i = 0; i < items.length; i += 1) {
      var li = document.createElement("li");
      li.textContent = items[i];
      list.appendChild(li);
    }
    return list;
  }

  function createParagraphs(items) {
    var shell = createEl("div", "guide-copy-stack");
    for (var i = 0; i < items.length; i += 1) {
      shell.appendChild(createEl("p", "guide-card-copy", items[i]));
    }
    return shell;
  }

  function createCard(title, bodyNode) {
    var card = createEl("article", "guide-card");
    card.appendChild(createEl("h3", "guide-card-title", title));
    card.appendChild(bodyNode);
    return card;
  }

  function createSection(id, kicker, title, intro) {
    var section = createEl("section", "guide-section");
    section.id = id;
    section.appendChild(createEl("p", "section-kicker", kicker));
    section.appendChild(createEl("h2", "guide-section-title", title));
    section.appendChild(createEl("p", "guide-section-copy", intro));
    return section;
  }

  function createLinks(items) {
    var shell = createEl("div", "guide-link-list");
    for (var i = 0; i < items.length; i += 1) {
      var link = createEl("a", "guide-chip-link", items[i].label);
      link.href = items[i].url;
      shell.appendChild(link);
    }
    return shell;
  }

  function fillHeader(appName, summary, vendorTitle) {
    var breadcrumbs = document.getElementById("breadcrumbs");
    var kicker = document.getElementById("guideKicker");
    var title = document.getElementById("guideTitle");
    var summaryNode = document.getElementById("guideSummary");
    var backLink = document.getElementById("guideBackLink");

    if (breadcrumbs && !breadcrumbs.children.length) {
      var parts = [
        { label: "Home", url: rootPath + "/index.html" },
        { label: "Guides", url: rootPath + "/vendor-guides.html" },
        { label: vendorTitle, url: rootPath + "/guides/" + vendorSlug + ".html" }
      ];
      for (var i = 0; i < parts.length; i += 1) {
        if (i) {
          breadcrumbs.appendChild(createEl("span", "guide-breadcrumb-sep", ">"));
        }
        var link = createEl("a", "guide-breadcrumb-link", parts[i].label);
        link.href = parts[i].url;
        breadcrumbs.appendChild(link);
      }
      breadcrumbs.appendChild(createEl("span", "guide-breadcrumb-sep", ">"));
      breadcrumbs.appendChild(createEl("strong", "guide-breadcrumb-current", appName));
    }

    if (kicker && !kicker.textContent.trim()) {
      kicker.textContent = vendorTitle + " Application";
    }
    if (title && !title.textContent.trim()) {
      title.textContent = appName;
    }
    if (summaryNode && !summaryNode.textContent.trim()) {
      summaryNode.textContent = summary;
    }
    if (backLink) {
      backLink.href = rootPath + "/guides/" + vendorSlug + ".html";
      backLink.textContent = "Back to " + vendorTitle;
    }

    document.title = appName + " | " + vendorTitle;
  }

  function fillJumpLinks() {
    var jumpShell = document.getElementById("guideJumpLinks");
    if (!jumpShell || jumpShell.children.length) {
      return;
    }

    var items = [
      ["overview", "Overview"],
      ["before-you-start", "Before You Start"],
      ["licensing-access", "Licensing / Access"],
      ["install-update-basics", "Install / Update Basics"],
      ["common-problems", "Common Problems"],
      ["try-fixes-first", "Try These Fixes First"],
      ["what-to-send-support", "What to Send Support"],
      ["related-help", "Related Help"]
    ];

    var nav = createEl("nav", "guide-jump-links");
    nav.setAttribute("aria-label", "Jump to a section");
    for (var i = 0; i < items.length; i += 1) {
      var link = createEl("a", "guide-jump-link", items[i][1]);
      link.href = "#" + items[i][0];
      nav.appendChild(link);
    }
    jumpShell.hidden = false;
    jumpShell.appendChild(nav);
  }

  function buildModel() {
    var vendorTitle = vendorTitles[vendorSlug] || capitalizeWord(vendorSlug);
    var appName = getAppName(vendorSlug, appSlug);
    var key = vendorSlug + "/" + appSlug;
    var summary = summaryOverrides[key] || ("Use this guide when " + appName + " will not open, sign in, update, or work with the files and features you expect.");

    return {
      appName: appName,
      vendorTitle: vendorTitle,
      summary: summary,
      overview: [
        appName + " is part of " + vendorTitle + ".",
        "Use the sections below for safe, customer-friendly first checks before contacting support."
      ],
      beforeYouStart: [
        "Confirm the exact task that is failing, such as sign-in, opening files, syncing, printing, or startup.",
        "Note whether the problem started after an update, password change, restart, or new computer.",
        "Check whether the same task fails for every file or project or only one specific item.",
        "If a browser version exists, compare it to the desktop app before making bigger changes."
      ],
      licensing: [
        "Make sure you are signed in with the work account your company expects for " + appName + ".",
        "If the app says Trial, Unlicensed, or Subscription Required, capture the exact message before closing it.",
        "If browser access works but the desktop app does not, include that when you contact support."
      ],
      install: [
        "Close the app, install pending updates, and restart the computer.",
        "Sign back in with the correct work account after the restart if the app asks you to.",
        "Test one simple task before reopening the exact file, project, or workspace that failed earlier."
      ],
      commonProblems: [
        {
          title: "Sign-in or access problem",
          symptom: appName + " opens, but the expected account, subscription, or access is missing.",
          likelyFix: "Sign out, sign back in with the correct work account, and compare the result to the browser version if one is available.",
          collect: "Send a screenshot of the sign-in or access message and the work account you expected to use."
        },
        {
          title: "A file, project, or workspace will not open",
          symptom: "The app launches, but the item you need will not open or does not load correctly.",
          likelyFix: "Test a second file or project and confirm the original path or location is still available before reinstalling the app.",
          collect: "Send the file, project, library, or workspace name involved plus the exact error shown."
        },
        {
          title: "The app is slow, frozen, or crashing",
          symptom: appName + " opens slowly, stops responding, or closes unexpectedly.",
          likelyFix: "Restart the computer, install pending updates, and note whether the issue began after a recent change.",
          collect: "Send the app version, when the issue started, and a screenshot of any crash message."
        }
      ],
      fixes: [
        "Restart the app and computer before bigger changes.",
        "If a browser version exists, compare it to the desktop app before reinstalling.",
        "If only one file, project, or workspace fails, test a second one before assuming the whole app is broken.",
        "Capture the exact message and when the problem started."
      ],
      support: [
        "A screenshot of the exact app message or screen where the problem happens.",
        "The work account you used to sign in and whether the same task works in the browser or on another computer.",
        "The app version or product year shown in the app.",
        "The file, project, library, or workflow name involved in the problem."
      ]
    };
  }

  function renderFallback() {
    var content = document.getElementById("guideContent");
    if (!content || content.children.length) {
      return;
    }

    var model = buildModel();
    fillHeader(model.appName, model.summary, model.vendorTitle);
    fillJumpLinks();

    var overview = createSection("overview", "Application Guide", "Overview", model.summary);
    overview.appendChild(createCard("Overview", createParagraphs(model.overview)));

    var before = createSection("before-you-start", "Before You Start", "Before You Start", "Use these quick checks to narrow the problem before you change the app or computer.");
    before.appendChild(createCard("Check these first", createList(model.beforeYouStart)));

    var licensing = createSection("licensing-access", "Licensing / Access", "Licensing / Access", "Use these checks when the app says Trial, Unlicensed, Subscription Required, or opens with the wrong account.");
    licensing.appendChild(createCard("Licensing / Access", createList(model.licensing)));

    var install = createSection("install-update-basics", "Install / Update Basics", "Install / Update Basics", "These safe steps help with fresh installs, recent updates, and apps that stopped working after a change.");
    install.appendChild(createCard("Install / Update Basics", createList(model.install)));

    var problems = createSection("common-problems", "Common Problems", "Common Problems", "These are the problems people run into most often with this app.");
    var grid = createEl("div", "guide-card-grid");
    for (var i = 0; i < model.commonProblems.length; i += 1) {
      var problem = model.commonProblems[i];
      var issueCard = createEl("article", "guide-card issue-card");
      issueCard.appendChild(createEl("h3", "guide-card-title", problem.title));
      issueCard.appendChild(createEl("p", "guide-card-copy", problem.symptom));
      issueCard.appendChild(createCard("Likely Fix", createParagraphs([problem.likelyFix])));
      issueCard.appendChild(createCard("What To Collect", createParagraphs([problem.collect])));
      grid.appendChild(issueCard);
    }
    problems.appendChild(grid);

    var fixes = createSection("try-fixes-first", "Try These Fixes First", "Try These Fixes First", "Try these stable, low-risk steps before contacting support.");
    fixes.appendChild(createCard("Try These Fixes First", createList(model.fixes)));

    var support = createSection("what-to-send-support", "What to Send Support", "What to Send Support", "If the problem continues, send these details so support can help faster.");
    support.appendChild(createCard("Send these details", createList(model.support)));

    var related = createSection("related-help", "Related Help", "Related Help", "Use these links to keep moving without losing context.");
    var relatedGrid = createEl("div", "guide-card-grid");
    relatedGrid.appendChild(createCard("Back to Vendor", createLinks([
      { label: "Back to " + model.vendorTitle, url: rootPath + "/guides/" + vendorSlug + ".html" }
    ])));
    relatedGrid.appendChild(createCard("Need More Help?", createLinks([
      { label: "Open Guides", url: rootPath + "/vendor-guides.html" },
      { label: "Licensing help", url: rootPath + "/app-licensing.html" },
      { label: "Open contact page", url: rootPath + "/contact.html" }
    ])));
    related.appendChild(relatedGrid);

    content.appendChild(overview);
    content.appendChild(before);
    content.appendChild(licensing);
    content.appendChild(install);
    content.appendChild(problems);
    content.appendChild(fixes);
    content.appendChild(support);
    content.appendChild(related);
  }

  function scheduleFallback() {
    window.setTimeout(renderFallback, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleFallback);
  } else {
    scheduleFallback();
  }
})();
