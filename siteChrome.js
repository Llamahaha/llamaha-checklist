const publicLinks = [
  { id: "home", label: "Home", href: "index.html" },
  { id: "search", label: "Search", href: "search.html" },
  { id: "support", label: "Support Pages", href: "support.html" },
  { id: "contact", label: "Contact", href: "contact.html" }
];

const internalLinks = [
  { id: "internal-home", label: "Internal Home", href: "internal/index.html" },
  { id: "internal-search", label: "Search", href: "internal/search.html" },
  { id: "internal-support", label: "Support Pages", href: "internal/support.html" },
  { id: "public-home", label: "Public Home", href: "index.html" }
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
  if (currentFile === "support.html") return "support";
  if (currentFile === "computer-issues.html") return "support";
  if (currentFile === "applications.html") return "support";
  if (currentFile === "app-licensing.html") return "support";
  if (currentFile === "tips-and-tricks.html") return "support";
  if (currentFile === "contact.html") return "contact";
  if (body.dataset.pageType || currentFile === "vendor-guides.html" || pathname.includes("/guides/")) return "support";
  return "home";
}

function getInternalSection(currentFile, pathname) {
  if (currentFile === "index.html") return "internal-home";
  if (currentFile === "search.html") return "internal-search";
  if (currentFile === "support.html") return "internal-support";
  if (currentFile === "reference-guides.html") return "internal-support";
  if (currentFile === "tips-and-tricks.html") return "internal-support";
  if (currentFile === "tools.html") return "internal-support";
  if (currentFile === "snippets.html") return "internal-support";
  if (currentFile === "playbooks.html") return "internal-support";
  if (currentFile === "decision-trees.html") return "internal-support";
  if (currentFile === "checklist.html") return "internal-support";
  if (currentFile === "templates.html") return "internal-support";
  if (currentFile === "licensing.html") return "internal-support";
  if (pathname.includes("/internal/reference/")) return "internal-support";
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
    ? getInternalSection(currentFile, window.location.pathname)
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
  brandIcon.src = buildHref(rootPath, "assets/llamaha-icon-purple-navy.png");
  brandIcon.alt = "Llamaha icon";

  const brandCopy = document.createElement("div");
  brandCopy.className = "site-brand-copy";

  const brandTitle = document.createElement("strong");
  brandTitle.textContent = area === "internal" ? "Llamaha Plan Room — Internal" : "Llamaha Plan Room";

  const brandMeta = document.createElement("span");
  brandMeta.textContent = area === "internal"
    ? "Technician references, playbooks, and procedures for AEC/CAD support"
    : "AEC / CAD Support";

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
  nav.id = `${area}-site-links`;
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSiteChrome, { once: true });
} else {
  initSiteChrome();
}
