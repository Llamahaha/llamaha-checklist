import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { matrixResource } from "./supportData.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";
import { activatePageTabs } from "./sectionTabs.js";

const licensingGrid = document.getElementById("licensingGrid");
const matrixCard = document.getElementById("matrixCard");

const customerLicensingReference = {
  microsoft: {
    summary: "Microsoft 365 access is usually tied to your work email account, the Microsoft 365 plan assigned to it, and any company requirements around mobile access, desktop apps, or multi-factor sign-in.",
    howItWorks: [
      "Most Microsoft apps use the same work account across Outlook, Teams, OneDrive, SharePoint, and Microsoft Authenticator.",
      "The exact plan or bundle assigned to your account determines whether you have desktop apps, mailbox access, OneDrive storage, Teams features, and other Microsoft services.",
      "Some companies also require mobile app protection, device registration, or Microsoft Authenticator setup before access is complete."
    ],
    whatYouNeed: [
      "Your exact work email account",
      "The Microsoft app you need, such as Outlook, Teams, OneDrive, SharePoint, or Authenticator",
      "If relevant, whether you need desktop apps, mobile setup, mailbox access, or a specific Microsoft 365 feature"
    ]
  },
  oracle: {
    summary: "Oracle Primavera P6 access usually depends on the correct P6 login, the correct database connection, and the environment your team uses for that P6 workspace.",
    howItWorks: [
      "Primavera P6 can depend on a database connection as well as the login name and password you enter when the app opens.",
      "The database or environment selection matters, especially when teams use more than one P6 environment or a cloud-connected setup.",
      "If your company uses a local cache or offline mode with P6, that environment detail can also matter."
    ],
    whatYouNeed: [
      "The exact Primavera P6 login name your company assigned",
      "The database or environment name you should select in the P6 login dialog",
      "If relevant, whether your team uses a cloud-connected, cached, or offline-capable P6 setup"
    ]
  },
  mctrans: {
    summary: "MCTRANS access usually depends on the exact HCS or HSS version or edition your organization purchased or standardized on, plus the workstation or user it was assigned to.",
    howItWorks: [
      "HCS and HSS workflows are often version-sensitive, so the approved release matters as much as the product name.",
      "Your organization may track access by the specific product delivery, workstation, or user who received it.",
      "If a study behaves differently across computers, the version in use is one of the first things to compare."
    ],
    whatYouNeed: [
      "The exact MCTRANS product name, such as HCS or HSS",
      "The version or release your team expects to use",
      "If known, the delivery, purchase, or support details your organization used"
    ]
  },
  axiom: {
    summary: "Axiom access usually depends on the modules your organization purchased and the host application version or year those modules are expected to work with.",
    howItWorks: [
      "Axiom is commonly used as an add-in alongside host apps such as Autodesk or Bentley products.",
      "The module in use and the host application version both matter for expected access and behavior.",
      "If only one Axiom tool is missing, that can be a module or compatibility issue instead of a whole-app licensing problem."
    ],
    whatYouNeed: [
      "The exact Axiom module or tool name",
      "The host application name and version or year",
      "If known, the Axiom license or support details your organization expects"
    ]
  },
  autodesk: {
    summary: "Autodesk access is usually tied to the Autodesk account email assigned to you and the exact product plus release year your team uses.",
    howItWorks: [
      "Most Autodesk products now use Named User subscriptions. Your Autodesk account is assigned to you, and you sign in to the software to activate it on up to three computers, running one at a time.",
      "The specific product and release year matter. AutoCAD, Revit, Civil 3D, and other Autodesk apps may all be assigned differently.",
      "Autodesk requires an internet connection at least every 30 days to verify the subscription, even after the initial activation.",
      "Some older environments may still use a network license with a license server. Autodesk has not sold new multi-user subscriptions since 2020, so new assignments are almost always Named User.",
      "Your company may also standardize on a specific year, language, or deployment package that should match what you install."
    ],
    whatYouNeed: [
      "The Autodesk account email your company assigned",
      "The exact Autodesk product you need",
      "The specific product year or version your team expects to use",
      "Whether your team uses Named User sign-in (most common) or a legacy network license server"
    ]
  },
  bentley: {
    summary: "Bentley access is usually tied to your Bentley account and, for ProjectWise or other project-driven tools, the datasource, project, or Bentley service your team uses.",
    howItWorks: [
      "Bentley products often depend on CONNECT or Bentley sign-in plus the product your company assigned you to use.",
      "ProjectWise and similar tools may also depend on the correct datasource, project tree, or project-specific access path.",
      "Your company may use more than one Bentley product, so the exact application name matters."
    ],
    whatYouNeed: [
      "The Bentley account email you are expected to use",
      "The exact Bentley product name",
      "If relevant, the datasource, project, or Bentley service name tied to your work"
    ]
  },
  esri: {
    summary: "Esri access usually depends on the ArcGIS organization you belong to, the role or user type assigned to you, any extensions tied to that account, and for some teams a company license server or authorization file.",
    howItWorks: [
      "Most ArcGIS Pro users sign in with a Named User account from ArcGIS Online or ArcGIS Enterprise. That account determines your user type, role, and extensions.",
      "Single Use licenses tie ArcGIS Pro to a specific computer through an authorization file. As of December 1, 2025, new conversions between Named User and Single Use are not available in My Esri, so existing Single Use installs stay as they are until your team changes them.",
      "Concurrent Use with ArcGIS License Manager was deprecated on July 1, 2025. Concurrent Use licenses are valid for ArcGIS Pro 3.6 but are not valid for versions released after that.",
      "If you need a specific ArcGIS extension or license level, that detail matters regardless of the license type."
    ],
    whatYouNeed: [
      "The ArcGIS organization or portal you should use",
      "The ArcGIS product you need, such as ArcGIS Pro or ArcGIS Online",
      "Which license type your team uses (Named User, Single Use, or legacy Concurrent Use on Pro 3.6)",
      "If relevant, the license level, role, or extension your work requires"
    ]
  },
  ptc: {
    summary: "Mathcad and related PTC products may use a subscription, a named-user account, or a company-managed license source depending on how your organization is set up.",
    howItWorks: [
      "Some PTC environments are based on a sign-in account, while others rely on a company-managed licensing method.",
      "The exact Mathcad version may matter if your team standardizes on a specific release.",
      "Engineering templates and shared worksheet libraries may also be part of the expected setup."
    ],
    whatYouNeed: [
      "The exact PTC or Mathcad product name",
      "The version your team expects to use",
      "If your company provided one, the license source or company setup instructions"
    ]
  },
  trimble: {
    summary: "Trimble-managed products usually depend on the correct Trimble account, the subscription or edition assigned to it, and the exact product your team uses.",
    howItWorks: [
      "Trimble and SketchUp products often depend on the Trimble-managed account your company assigned to you.",
      "The exact product edition or module matters for tools like SketchUp and Trimble Business Center.",
      "Extensions, templates, or company-specific content may also be part of the expected setup."
    ],
    whatYouNeed: [
      "The Trimble-managed work account you should use",
      "The exact Trimble product and edition",
      "If relevant, any required extensions, modules, or templates"
    ]
  },
  adobe: {
    summary: "Adobe access usually depends on the correct work Adobe account and, for many organizations, the correct company or enterprise profile selected after sign-in.",
    howItWorks: [
      "Adobe products such as Acrobat Pro and Creative Cloud often depend on the Adobe account your company assigned to you.",
      "Some users see more than one Adobe profile and need to choose the work or company profile instead of a personal one.",
      "The product itself matters too. Acrobat Reader and Acrobat Pro are not the same license or feature level."
    ],
    whatYouNeed: [
      "The Adobe account email your company assigned",
      "Whether you should use a work or company Adobe profile",
      "The exact Adobe product you need, such as Acrobat Pro or Creative Cloud"
    ]
  },
  bluebeam: {
    summary: "Bluebeam access is usually tied to the Bluebeam ID used for sign-in and the subscription level assigned to that account.",
    howItWorks: [
      "Bluebeam Revu access usually depends on the Bluebeam ID your company expects you to use.",
      "The subscription or plan assigned to that Bluebeam ID determines what the app can do.",
      "If your team uses Studio, that same identity often matters there too."
    ],
    whatYouNeed: [
      "The Bluebeam ID email you should use",
      "The Bluebeam product name, usually Revu",
      "If relevant, whether you also need Studio Sessions or Projects access"
    ]
  },
  foxit: {
    summary: "Foxit access depends on the exact Foxit product edition and the activation or sign-in method your company uses for that edition.",
    howItWorks: [
      "Foxit Reader and Foxit PDF Editor are different products with different feature levels.",
      "Some environments use sign-in-based activation while others use a product-specific activation path managed by the company.",
      "The product edition and version matter when comparing access or expected features."
    ],
    whatYouNeed: [
      "The exact Foxit product name and edition",
      "The work account or activation method your company expects",
      "The version or build if your team standardizes on one"
    ]
  },
  quickbooks: {
    summary: "QuickBooks access depends on whether you use Desktop or Online, the exact product year or company file for Desktop, and the company membership or role for Online.",
    howItWorks: [
      "QuickBooks Desktop access often depends on the correct year, edition, and company file path.",
      "QuickBooks Online access depends on the Intuit account and company or role assigned to it.",
      "If your team uses a hosted or shared company-file setup, that hosting model matters."
    ],
    whatYouNeed: [
      "Whether you use QuickBooks Desktop or QuickBooks Online",
      "If Desktop, the exact year and edition plus the company file location",
      "If Online, the company name and the role you should have"
    ]
  },
  egnyte: {
    summary: "Egnyte access usually depends on the correct company domain, the work account assigned to you, and the folders or user type your organization expects you to use.",
    howItWorks: [
      "Egnyte access is usually tied to the company domain and the work account assigned to you.",
      "Desktop and web access may both depend on the same account, but the folder permissions and user type still matter.",
      "If your company uses a mapped-drive or desktop-app workflow, that specific setup may matter too."
    ],
    whatYouNeed: [
      "The Egnyte company domain",
      "The work account you should use",
      "If relevant, the folder path or shared area you are expected to access"
    ]
  }
};

if (matrixCard) {
  const matrix = createPageCard("hub-note-card");
  matrix.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Microsoft 365 Plans" }),
    Object.assign(document.createElement("h3"), { textContent: matrixResource.title }),
    Object.assign(document.createElement("p"), { textContent: "Use this comparison when you need to confirm whether a Microsoft 365 plan includes desktop apps, mailbox access, identity features, or other Microsoft services." }),
    createLinks([{ label: "Open M365 Maps Matrix", url: matrixResource.url, external: true }])
  );
  matrixCard.appendChild(matrix);
}

if (licensingGrid) {
  vendorOrder.filter(key => customerLicensingReference[key]).forEach(key => {
    const guide = vendorGuides[key];
    const apps = getVendorApplications(key);
    const reference = customerLicensingReference[key];
    const card = createPageCard("vendor-card");
    card.id = `${key}-licensing`;

    const title = document.createElement("h3");
    title.textContent = guide.title;

    const summary = document.createElement("p");
    summary.textContent = reference?.summary ?? guide.summary;

    const stack = document.createElement("div");
    stack.className = "card-stack";
    appendBlock(stack, "How Access Usually Works", reference?.howItWorks ?? [
      "Access usually depends on the account, product, and company setup your organization assigned to you."
    ]);
    appendBlock(stack, "What You May Need", reference?.whatYouNeed ?? [
      "The exact work account",
      "The product name",
      "The version, plan, or edition if your team uses a specific one"
    ]);
    appendBlock(stack, "Common Products", apps.slice(0, 6).map(item => item.name));

    const links = createLinks([
      { label: "Open vendor guide", url: `guides/${key}.html` },
      ...apps.slice(0, 3).map(app => ({ label: app.name, url: `guides/${key}/${app.slug}.html` })),
      ...(guide.supportLinks?.[0]
        ? [{ label: guide.supportLinks[0].label, url: guide.supportLinks[0].url, external: true }]
        : []),
      { label: "Open contact page", url: "contact.html" }
    ]);

    card.append(title, summary, stack, links);
    licensingGrid.appendChild(card);
  });
}

activatePageTabs();
