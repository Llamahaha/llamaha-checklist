import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { matrixResource } from "./supportData.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";
import { renderSingleTopicPage } from "./single-topic-page.js";
import { activatePageTabs } from "./sectionTabs.js";

const licensingGrid = document.getElementById("licensingGrid");
const matrixCard = document.getElementById("matrixCard");
const vendorSection = document.getElementById("vendorCoverageSection");
const searchInput = document.getElementById("licensingSearch");

const mainSections = [
  "howLicensingWorksSection",
  "whatAccessDependsOnSection",
  "m365MatrixSection",
  "vendorCoverageSection"
].map(id => document.getElementById(id)).filter(Boolean);

const vendorCards = [];
const vendorNavEntries = [];
const hiddenPublicLicensingVendors = new Set(["quickbooks"]);
let mainTabsApi = null;
let vendorTabsApi = null;

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
      "Single Use licenses tie ArcGIS Pro to a specific computer through an authorization file. Esri no longer offers new conversions between Named User and Single Use in My Esri, so existing Single Use installs stay as they are until your team changes them.",
      "Concurrent Use with ArcGIS License Manager is deprecated. Existing Concurrent Use licenses are valid for ArcGIS Pro 3.6 only and are not valid for any newer release.",
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

function buildVendorSearchText(guide, reference, apps) {
  return [
    guide.title,
    reference?.summary ?? guide.summary,
    ...(reference?.howItWorks ?? []),
    ...(reference?.whatYouNeed ?? []),
    ...apps.map(app => app.name)
  ].join(" ").toLowerCase();
}

function buildSectionSearchText(section) {
  return (section.textContent ?? "").toLowerCase();
}

if (licensingGrid && vendorSection) {
  const filteredVendors = vendorOrder.filter(key => customerLicensingReference[key] && !hiddenPublicLicensingVendors.has(key));

  // Build the vendor sub-TOC before the card grid so each vendor acts as
  // a sub-tab. Only the picked vendor card shows at a time.
  const subNavWrap = document.createElement("div");
  subNavWrap.className = "vendor-subnav-shell";

  const subKicker = document.createElement("p");
  subKicker.className = "section-kicker";
  subKicker.textContent = "Pick a vendor";

  const subCopy = document.createElement("p");
  subCopy.className = "hub-section-copy";
  subCopy.textContent = "Open one vendor at a time. Only the vendor you pick is shown below.";

  const subNav = document.createElement("nav");
  subNav.className = "toc-links vendor-subnav";
  subNav.setAttribute("aria-label", "Vendor licensing");

  filteredVendors.forEach(key => {
    const guide = vendorGuides[key];
    const link = document.createElement("a");
    link.href = `#${key}-licensing`;
    link.textContent = guide.title;
    subNav.appendChild(link);
    vendorNavEntries.push({ key, link });
  });

  subNavWrap.append(subKicker, subCopy, subNav);
  vendorSection.insertBefore(subNavWrap, licensingGrid);

  filteredVendors.forEach(key => {
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
    card.dataset.searchText = buildVendorSearchText(guide, reference, apps);
    licensingGrid.appendChild(card);
    vendorCards.push({ key, card });
  });
}

// Cache search text on every main section so the input can filter the
// static "How Licensing Works" / "What Access Depends On" content too.
mainSections.forEach(section => {
  section.dataset.searchText = buildSectionSearchText(section);
});

function filterLicensing(query) {
  const needle = (query || "").trim().toLowerCase();
  const hasQuery = !!needle;

  if (mainTabsApi) {
    mainTabsApi.setSearchOverride(hasQuery);
  }
  if (vendorTabsApi) {
    vendorTabsApi.setSearchOverride(hasQuery);
  }

  if (!hasQuery) {
    // Clear any filter-driven hidden state; the tab helpers restore
    // normal single-section visibility via setSearchOverride(false).
    vendorCards.forEach(entry => {
      entry.card.hidden = false;
    });
    vendorNavEntries.forEach(entry => {
      entry.link.hidden = false;
    });
    mainSections.forEach(section => {
      section.hidden = false;
    });
    return;
  }

  // Filter vendor cards and mirror the matching state on the sub-nav pills.
  const matchedVendorKeys = new Set();
  vendorCards.forEach(entry => {
    const matches = entry.card.dataset.searchText.includes(needle);
    entry.card.hidden = !matches;
    if (matches) {
      matchedVendorKeys.add(entry.key);
    }
  });
  vendorNavEntries.forEach(entry => {
    entry.link.hidden = !matchedVendorKeys.has(entry.key);
  });

  // Filter main sections. The vendor coverage section stays visible as long
  // as at least one vendor card matches.
  mainSections.forEach(section => {
    if (section.id === "vendorCoverageSection") {
      section.hidden = matchedVendorKeys.size === 0;
      return;
    }
    const text = section.dataset.searchText || "";
    section.hidden = !text.includes(needle);
  });
}

mainTabsApi = activatePageTabs();
vendorTabsApi = activatePageTabs({ navSelector: ".vendor-subnav" });

if (searchInput) {
  searchInput.addEventListener("input", event => {
    filterLicensing(event.target.value);
  });
}

const licensingTopics = document.getElementById("licensingTopics");
const pageToc = document.getElementById("pageToc");

function createTopicStack() {
  const stack = document.createElement("div");
  stack.className = "single-topic-stack";
  return stack;
}

function createInfoCard(title, body) {
  const card = createPageCard("issue-card single-topic-card");
  appendBlock(card, title, body);
  return card;
}

function createLinkCard(title, body, links) {
  const card = createPageCard("issue-card single-topic-card");
  appendBlock(card, title, body);
  if (links.length) {
    card.appendChild(createLinks(links));
  }
  return card;
}

function vendorLinksFor(key, apps, guide) {
  return [
    { label: "Open vendor guide", url: `guides/${key}.html` },
    ...apps.slice(0, 3).map(app => ({ label: app.name, url: `guides/${key}/${app.slug}.html` })),
    ...(guide.supportLinks?.[0]
      ? [{ label: guide.supportLinks[0].label, url: guide.supportLinks[0].url, external: true }]
      : []),
    { label: "Open contact page", url: "contact.html" }
  ];
}

function renderVendorLicensingTopic(key) {
  const guide = vendorGuides[key];
  const apps = getVendorApplications(key);
  const reference = customerLicensingReference[key];
  const stack = createTopicStack();

  stack.append(
    createInfoCard("How Access Usually Works", reference?.howItWorks ?? [
      "Access usually depends on the account, product, and company setup your organization assigned to you."
    ]),
    createInfoCard("What You May Need", reference?.whatYouNeed ?? [
      "The exact work account",
      "The product name",
      "The version, plan, or edition if your team uses a specific one"
    ]),
    createLinkCard("Common Products", apps.slice(0, 6).map(item => item.name), vendorLinksFor(key, apps, guide))
  );

  return stack;
}

function buildLicensingTopics() {
  const vendorKeys = vendorOrder.filter(key =>
    customerLicensingReference[key] && !hiddenPublicLicensingVendors.has(key)
  );

  const vendorTopicLinks = vendorKeys.map(key => ({
    label: vendorGuides[key].title,
    url: `#${key}-licensing`
  }));

  return [
    {
      id: "howLicensingWorksSection",
      title: "How product access usually works",
      meta: "Licensing Basics",
      kicker: "Licensing Basics",
      summary: "Start here when the app says trial, unlicensed, expired, missing subscription, or the wrong features appear after sign-in.",
      searchText: "work account subscription seat assignment product year edition plan company profile organization license server authorization file",
      renderContent: () => {
        const stack = createTopicStack();
        stack.append(
          createInfoCard("Common Licensing Models", [
            "Work account access tied to the email address you use for the product.",
            "Subscription, seat, role, extension, or add-on assignment.",
            "Product year, edition, release, or plan differences.",
            "Company profile, ArcGIS organization, Bentley datasource, or workspace selection.",
            "Company license server, authorization file, or other managed license source."
          ])
        );
        return stack;
      }
    },
    {
      id: "whatAccessDependsOnSection",
      title: "Details that usually determine access",
      meta: "What You May Need",
      kicker: "What You May Need",
      summary: "Use these details to narrow down whether the problem is account, product, plan, profile, or environment related.",
      searchText: "work email account app name version year plan role add-on organization company profile portal datasource workspace",
      renderContent: () => {
        const stack = createTopicStack();
        stack.append(
          createInfoCard("Gather These Details", [
            "The exact work email account used to sign in.",
            "The app name and version or product year.",
            "The plan, role, extension, or add-on you expected.",
            "The company profile, portal, datasource, workspace, or project environment selected in the app."
          ])
        );
        return stack;
      }
    },
    {
      id: "m365MatrixSection",
      title: "Microsoft 365 plan reference",
      meta: "Microsoft Licensing",
      kicker: "Microsoft Licensing",
      summary: "Use this when you need to confirm whether a Microsoft 365 plan includes desktop apps, mailbox access, identity features, or other Microsoft services.",
      searchText: `${matrixResource.title} microsoft 365 plans desktop apps mailbox exchange teams onedrive sharepoint identity`,
      renderContent: () => {
        const stack = createTopicStack();
        stack.append(createLinkCard("Open Plan Matrix", [
          "Compare Microsoft 365 plans when the issue looks tied to mailbox access, desktop apps, Teams, OneDrive, SharePoint, or identity features."
        ], [
          { label: "Open M365 Maps Matrix", url: matrixResource.url, external: true }
        ]));
        return stack;
      }
    },
    {
      id: "vendorCoverageSection",
      title: "Vendor licensing directory",
      meta: "Vendor Licensing",
      kicker: "Vendor Licensing",
      summary: "Choose the vendor-specific licensing note that matches the product in front of you.",
      searchText: vendorKeys.map(key => `${vendorGuides[key].title} ${customerLicensingReference[key].summary}`).join(" "),
      renderContent: () => {
        const stack = createTopicStack();
        stack.append(createLinkCard("Pick a Vendor", [
          "Each vendor topic explains how access usually works, what details matter, and where to go next."
        ], vendorTopicLinks));
        return stack;
      }
    },
    ...vendorKeys.map(key => {
      const guide = vendorGuides[key];
      const apps = getVendorApplications(key);
      const reference = customerLicensingReference[key];
      return {
        id: `${key}-licensing`,
        title: `${guide.title} licensing`,
        meta: "Vendor Licensing",
        kicker: "Vendor Licensing",
        summary: reference?.summary ?? guide.summary,
        searchText: buildVendorSearchText(guide, reference, apps),
        renderContent: () => renderVendorLicensingTopic(key)
      };
    }),
    {
      id: "walkthroughsSection",
      title: "Reading license and activation errors",
      meta: "Walkthrough",
      kicker: "Walkthrough",
      summary: "Use this when the wording is vague and you need to tell whether the issue is trial, unlicensed, sign-in, activation, subscription, or vendor-assignment related.",
      searchText: "license activation errors trial unlicensed sign-in activation subscription assigned seat vendor profile",
      renderContent: () => {
        const stack = createTopicStack();
        stack.append(createLinkCard("Open Article", [
          "This short article explains common license error patterns and what to capture before contacting IT."
        ], [
          { label: "Open article", url: "articles/reading-license-activation-errors.html" }
        ]));
        return stack;
      }
    }
  ];
}

renderSingleTopicPage({
  tocContainer: pageToc,
  contentContainer: licensingTopics,
  title: "Licensing Help topics",
  description: "Search or choose one licensing reference. The page shows one licensing topic or vendor note at a time.",
  searchPlaceholder: "Search Licensing Help",
  searchLabel: "Search Licensing Help topics on this page",
  emptyText: "No Licensing Help topics matched that search.",
  topics: buildLicensingTopics()
});
