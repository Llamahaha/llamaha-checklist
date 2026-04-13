const publicLinks = [
  { id: "search", label: "Search", href: "search.html" },
  { id: "guides", label: "Guides", href: "vendor-guides.html" },
  { id: "applications", label: "Applications", href: "applications.html" },
  { id: "contact", label: "Contact / Get Help", href: "contact.html" },
  { id: "internal", label: "Internal Sign In", href: "internal/index.html", tone: "secondary" }
];

const internalLinks = [
  { id: "internal-home", label: "Internal Home", href: "internal/index.html" },
  { id: "snippets", label: "Snippets", href: "internal/snippets.html" },
  { id: "templates", label: "Templates", href: "internal/templates.html" },
  { id: "playbooks", label: "Playbooks", href: "internal/playbooks.html" },
  { id: "checklists", label: "Checklists", href: "internal/checklist.html" },
  { id: "licensing", label: "Licensing", href: "internal/licensing.html" },
  { id: "references", label: "Internal References", href: "internal/references.html" }
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
  if (currentFile === "search.html") return "search";
  if (currentFile === "applications.html") return "applications";
  if (currentFile === "contact.html") return "contact";
  if (body.dataset.pageType || currentFile === "vendor-guides.html" || pathname.includes("/guides/")) return "guides";
  return "";
}

function getInternalSection(currentFile) {
  if (currentFile === "snippets.html") return "snippets";
  if (currentFile === "templates.html") return "templates";
  if (currentFile === "playbooks.html" || currentFile === "emergency-playbooks.html") return "playbooks";
  if (currentFile === "checklist.html") return "checklists";
  if (currentFile === "licensing.html" || currentFile === "app-licensing.html") return "licensing";
  if (["references.html", "application-issues.html", "microsoft-issues.html", "computer-issues.html", "install-uninstall.html"].includes(currentFile)) {
    return "references";
  }
  return "internal-home";
}

function getActiveSection(currentFile, body, area) {
  if (area === "internal") {
    return getInternalSection(currentFile);
  }

  return getPublicSection(currentFile, body, window.location.pathname);
}

function getBrandConfig(rootPath, area) {
  if (area === "internal") {
    return {
      href: buildHref(rootPath, "internal/index.html"),
      title: "Llamaha Internal Library",
      meta: "Protected references, scripts, templates, playbooks, and technician tools",
      tag: "Internal"
    };
  }

  return {
    href: buildHref(rootPath, "index.html"),
    title: "Llamaha Help Center",
    meta: "Client-friendly help articles, app guides, and clear ways to get support",
    tag: "Help Center"
  };
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
  const activeSection = getActiveSection(currentFile, body, area);
  const navLinks = area === "internal" ? internalLinks : publicLinks;
  const brandConfig = getBrandConfig(rootPath, area);

  const chrome = document.createElement("header");
  chrome.className = "site-chrome";
  chrome.dataset.area = area;

  const brand = document.createElement("a");
  brand.className = "site-brand";
  brand.href = brandConfig.href;

  const brandIcon = document.createElement("img");
  brandIcon.className = "site-brand-icon";
  brandIcon.src = buildHref(rootPath, "assets/llamaha-icon.jpg");
  brandIcon.alt = "Llamaha icon";

  const brandCopy = document.createElement("div");
  brandCopy.className = "site-brand-copy";

  const brandTag = document.createElement("span");
  brandTag.className = "site-brand-tag";
  brandTag.textContent = brandConfig.tag;

  const brandTitle = document.createElement("strong");
  brandTitle.textContent = brandConfig.title;

  const brandMeta = document.createElement("span");
  brandMeta.textContent = brandConfig.meta;

  brandCopy.append(brandTag, brandTitle, brandMeta);
  brand.append(brandIcon, brandCopy);

  const nav = document.createElement("nav");
  nav.className = "site-links";
  nav.setAttribute("aria-label", area === "internal" ? "Internal sections" : "Site sections");

  navLinks.forEach(item => {
    const link = document.createElement("a");
    link.className = "site-link";
    if (item.tone === "secondary") {
      link.classList.add("is-secondary");
    }
    if (item.id === activeSection) {
      link.classList.add("is-active");
    }
    link.href = buildHref(rootPath, item.href);
    link.textContent = item.label;
    nav.appendChild(link);
  });

  if (area === "internal") {
    const publicLink = document.createElement("a");
    publicLink.className = "site-utility-link";
    publicLink.href = buildHref(rootPath, "index.html");
    publicLink.textContent = "View Public Help Center";
    chrome.append(brand, nav, publicLink);
  } else {
    chrome.append(brand, nav);
  }

  shell.prepend(chrome);
}

initSiteChrome();
