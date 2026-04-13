const sectionLinks = [
  { id: "home", label: "Home", href: "index.html" },
  { id: "guides", label: "Guides", href: "vendor-guides.html" },
  { id: "search", label: "Search", href: "search.html" },
  { id: "snippets", label: "Snippets", href: "snippets.html" },
  { id: "templates", label: "Templates", href: "templates.html" },
  { id: "references", label: "References", href: "application-issues.html" },
  { id: "playbooks", label: "Playbooks", href: "emergency-playbooks.html" },
  { id: "checklist", label: "Checklist", href: "checklist.html" }
];

function buildHref(rootPath, fileName) {
  return rootPath === "." ? fileName : `${rootPath}/${fileName}`;
}

function getActiveSection(currentFile, body) {
  if (body.dataset.pageType || currentFile === "vendor-guides.html" || window.location.pathname.includes("/guides/")) {
    return "guides";
  }

  if (currentFile === "search.html") return "search";
  if (currentFile === "snippets.html") return "snippets";
  if (currentFile === "templates.html") return "templates";
  if (currentFile === "emergency-playbooks.html") return "playbooks";
  if (currentFile === "checklist.html") return "checklist";
  if (["application-issues.html", "install-uninstall.html", "computer-issues.html", "microsoft-issues.html", "app-licensing.html"].includes(currentFile)) {
    return "references";
  }

  return "home";
}

function initSiteChrome() {
  const shell = document.querySelector(".guide-shell, .page-shell");
  if (!shell || shell.querySelector(".site-chrome")) {
    return;
  }

  const rootPath = document.body.dataset.rootPath ?? ".";
  const currentFile = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  const activeSection = getActiveSection(currentFile, document.body);

  const chrome = document.createElement("header");
  chrome.className = "site-chrome";

  const brand = document.createElement("a");
  brand.className = "site-brand";
  brand.href = buildHref(rootPath, "index.html");

  const brandIcon = document.createElement("img");
  brandIcon.className = "site-brand-icon";
  brandIcon.src = buildHref(rootPath, "assets/llamaha-icon.jpg");
  brandIcon.alt = "Llamaha icon";

  const brandCopy = document.createElement("div");
  brandCopy.className = "site-brand-copy";
  const brandTitle = document.createElement("strong");
  brandTitle.textContent = "Llamaha MSP Hub";
  const brandMeta = document.createElement("span");
  brandMeta.textContent = "Guides, snippets, templates, issue libraries, and playbooks";
  brandCopy.append(brandTitle, brandMeta);
  brand.append(brandIcon, brandCopy);

  const nav = document.createElement("nav");
  nav.className = "site-links";
  nav.setAttribute("aria-label", "Site sections");

  sectionLinks.forEach(item => {
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
