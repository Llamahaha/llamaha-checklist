const publicLinks = [
  { id: "home", label: "Home", href: "index.html" },
  { id: "search", label: "Search", href: "search.html" },
  { id: "pc-help", label: "PC Help", href: "computer-issues.html" },
  { id: "app-help", label: "App Help", href: "vendor-guides.html" },
  { id: "licensing-help", label: "Licensing Help", href: "app-licensing.html" },
  { id: "tips-tricks", label: "Tips & Tricks", href: "tips-and-tricks.html" },
  { id: "contact", label: "Contact", href: "contact.html" }
];

const internalLinks = [
  { id: "internal-home", label: "Internal Home", href: "internal/index.html" },
  { id: "reference-guides", label: "Reference Guides", href: "internal/reference-guides.html" },
  { id: "triage", label: "Guided Triage", href: "internal/decision-trees.html" },
  { id: "tips-tricks", label: "Tips & Tricks", href: "internal/tips-and-tricks.html" },
  { id: "snippets", label: "Snippets", href: "internal/snippets.html" },
  { id: "templates", label: "Templates", href: "internal/templates.html" },
  { id: "playbooks", label: "Playbooks", href: "internal/playbooks.html" },
  { id: "checklists", label: "Checklists", href: "internal/checklist.html" },
  { id: "licensing", label: "Licensing", href: "internal/licensing.html" }
];

function buildHref(rootPath, fileName) {
  return rootPath === "." ? fileName : `${rootPath}/${fileName}`;
}

function getArea(body) {
  if (body.dataset.siteArea) {
    return body.dataset.siteArea;
  }

  return window.location.pathname.includes("/internal/") ? "internal" : "public";
}

function getPublicSection(currentFile, body, pathname) {
  if (currentFile === "index.html") return "home";
  if (currentFile === "search.html") return "search";
  if (currentFile === "computer-issues.html") return "pc-help";
  if (currentFile === "applications.html") return "app-help";
  if (currentFile === "app-licensing.html") return "licensing-help";
  if (currentFile === "tips-and-tricks.html") return "tips-tricks";
  if (currentFile === "contact.html") return "contact";
  if (body.dataset.pageType || currentFile === "vendor-guides.html" || currentFile === "applications.html" || pathname.includes("/guides/")) return "app-help";
  return "home";
}

function getInternalSection(currentFile) {
  if (currentFile === "index.html") return "internal-home";
  if (currentFile === "reference-guides.html") return "reference-guides";
  if (currentFile === "decision-trees.html") return "triage";
  if (currentFile === "tips-and-tricks.html") return "tips-tricks";
  if (currentFile === "snippets.html") return "snippets";
  if (currentFile === "templates.html") return "templates";
  if (currentFile === "playbooks.html") return "playbooks";
  if (currentFile === "checklist.html") return "checklists";
  if (currentFile === "licensing.html") return "licensing";
  return "internal-home";
}

function initSiteChrome() {
  const shell = document.querySelector(".guide-shell, .page-shell");
  if (!shell || shell.querySelector(".site-chrome")) {
    return;
  }

  const body = document.body;
  const rootPath = body.dataset.rootPath ?? ".";
  const currentFile = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  const area = getArea(body);
  const navLinks = area === "internal" ? internalLinks : publicLinks;
  const activeSection = area === "internal"
    ? getInternalSection(currentFile)
    : getPublicSection(currentFile, body, window.location.pathname);

  const chrome = document.createElement("header");
  chrome.className = "site-chrome";
  chrome.dataset.area = area;

  const brand = document.createElement("a");
  brand.className = "site-brand";
  brand.href = area === "internal"
    ? buildHref(rootPath, "internal/index.html")
    : buildHref(rootPath, "index.html");

  const brandIcon = document.createElement("img");
  brandIcon.className = "site-brand-icon";
  brandIcon.src = buildHref(rootPath, "assets/llamaha-icon.jpg");
  brandIcon.alt = "Llamaha icon";

  const brandCopy = document.createElement("div");
  brandCopy.className = "site-brand-copy";

  const brandTitle = document.createElement("strong");
  brandTitle.textContent = area === "internal" ? "Llamaha Internal Library" : "Llamaha Help Center";

  const brandMeta = document.createElement("span");
  brandMeta.textContent = area === "internal"
    ? "Tech references, snippets, playbooks, checklists, and licensing notes for day-to-day support"
    : "Tech made easier";

  if (area === "internal") {
    const brandTag = document.createElement("span");
    brandTag.className = "site-brand-tag";
    brandTag.textContent = "Internal";
    brandCopy.appendChild(brandTag);
  }

  brandCopy.append(brandTitle, brandMeta);
  brand.append(brandIcon, brandCopy);

  const nav = document.createElement("nav");
  nav.className = "site-links";
  nav.setAttribute("aria-label", area === "internal" ? "Internal sections" : "Site sections");

  navLinks.forEach(item => {
    const link = document.createElement("a");
    link.className = "site-link";
    if (item.id === activeSection) {
      link.classList.add("is-active");
    }
    link.href = buildHref(rootPath, item.href);
    link.textContent = item.label;
    nav.appendChild(link);
  });

  chrome.append(brand, nav);
  shell.prepend(chrome);
}

initSiteChrome();
