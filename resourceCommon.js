export function publicizeText(value = "") {
  return String(value)
    .replace(/\bOWA\b/g, "Outlook on the web")
    .replace(/\bUPN\b/g, "work account email")
    .replace(/\bclient-standard\b/gi, "company-approved")
    .replace(/\bdesktop client\b/gi, "desktop app")
    .replace(/\bweb client\b/gi, "web app")
    .replace(/\bclient app\b/gi, "app")
    .replace(/\bclient apps\b/gi, "apps")
    .replace(/\btenant\b/gi, "organization")
    .replace(/\bknown-good peer\b/gi, "another user whose app is working")
    .replace(/\bknown-good user\b/gi, "another user whose app is working")
    .replace(/\bknown-good workstation\b/gi, "another computer that works correctly")
    .replace(/\bworkstations\b/gi, "computers")
    .replace(/\bworkstation\b/gi, "computer")
    .replace(/\bhandoff\b/gi, "setup")
    .replace(/\bAdmin Console\b/g, "account setup page")
    .replace(/\badmin console\b/gi, "account setup page")
    .replace(/\bAdmin Center\b/g, "Account Center")
    .replace(/\badmin center\b/gi, "account center")
    .replace(/\bproject admin\b/gi, "project owner")
    .replace(/\bIT admin\b/gi, "IT")
    .replace(/\badmins\b/gi, "support team")
    .replace(/\badmin\b/gi, "support team")
    .replace(/\bSSO\b/g, "company sign-in")
    .replace(/\bMFA\b/g, "multi-factor sign-in")
    .replace(/\bMDM\b/g, "company device management")
    .replace(/\bTOTP\b/g, "one-time passcode")
    .replace(/\bvCPU\b/g, "processor")
    .replace(/\bIRM\b/g, "protected-library policy")
    .replace(/\bDLP\b/g, "data-protection policy")
    .replace(/\bConditional Access\b/g, "company sign-in policy")
    .replace(/\bEntra\b/g, "Microsoft work sign-in")
    .replace(/\bAzure AD\b/g, "Microsoft work sign-in")
    .replace(/\bAAD\b/g, "Microsoft work sign-in")
    .replace(/\bMSI\b/g, "installer")
    .replace(/\bidentity provider\b/gi, "company sign-in page")
    .replace(/\bdeployments\b/gi, "setup options")
    .replace(/\bdeployed\b/gi, "installed")
    .replace(/\bdeploying\b/gi, "setting up")
    .replace(/\bdeployment\b/gi, "setup")
    .replace(/\bdeploy\b/gi, "install")
    .replace(/\bprovisioned\b/gi, "set up")
    .replace(/\bprovisioning\b/gi, "setup")
    .replace(/\bdatasources\b/gi, "data sources")
    .replace(/\bdatasource\b/gi, "data source")
    .replace(/\bstale\b/gi, "out of date")
    .replace(/\bcaches\b/gi, "saved local data")
    .replace(/\bcache\b/gi, "saved local data")
    .replace(/\bregistry edits\b/gi, "advanced system changes")
    .replace(/\bregistry\b/gi, "system settings")
    .replace(/\bUNC paths\b/gi, "shared network paths")
    .replace(/\bUNC path\b/gi, "shared network path")
    .replace(/\ban multi-factor sign-in\b/gi, "a multi-factor sign-in")
    .replace(/\bcompany sign-in sign-in\b/gi, "company sign-in")
    .replace(/\bmulti-factor sign-in sign-in\b/gi, "multi-factor sign-in");
}

export function createList(items, ordered = false, className = "") {
  const list = document.createElement(ordered ? "ol" : "ul");

  if (className) {
    list.className = className;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = publicizeText(item);
    list.appendChild(li);
  });

  return list;
}

export function createLinks(links, className = "vendor-links") {
  const nav = document.createElement("nav");
  nav.className = className;

  links.forEach(item => {
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = publicizeText(item.label);

    if (item.external) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    nav.appendChild(link);
  });

  return nav;
}

export function appendBlock(parent, title, body) {
  const block = document.createElement("div");
  block.className = "card-block";

  const heading = document.createElement("h4");
  heading.textContent = publicizeText(title);
  block.appendChild(heading);

  if (Array.isArray(body)) {
    block.appendChild(createList(body));
  } else if (body instanceof HTMLElement) {
    block.appendChild(body);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = publicizeText(body);
    block.appendChild(paragraph);
  }

  parent.appendChild(block);
}

export function createPageCard(className = "issue-card") {
  const card = document.createElement("article");
  card.className = className;
  return card;
}

export function slugifyText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function renderPageToc(container, items, options = {}) {
  if (!container || !items.length) {
    return;
  }

  const {
    kicker = "On This Page",
    title = "Jump to a section",
    description = "Use these quick links to move around the page faster.",
    searchPlaceholder = "Search sections"
  } = options;

  const useSplitToc = container.classList.contains("help-toc");

  container.innerHTML = "";
  if (!useSplitToc) {
    container.classList.add("hub-section", "toc-shell");
  }

  const kickerEl = document.createElement("p");
  kickerEl.className = "section-kicker";
  kickerEl.textContent = publicizeText(kicker);

  const titleEl = document.createElement("h2");
  titleEl.textContent = publicizeText(title);

  const descriptionEl = document.createElement("p");
  descriptionEl.className = "hub-section-copy";
  descriptionEl.textContent = publicizeText(description);

  const nav = document.createElement("nav");
  nav.className = useSplitToc ? "help-toc-nav" : "toc-links";
  nav.setAttribute("aria-label", title);

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = publicizeText(item.label);
    nav.appendChild(link);
  });

  if (useSplitToc) {
    const header = document.createElement("div");
    header.className = "help-toc-header";
    header.append(kickerEl, titleEl, descriptionEl);

    const searchWrap = document.createElement("div");
    searchWrap.className = "help-toc-search";

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "search-input page-search-input";
    searchInput.placeholder = searchPlaceholder;
    searchInput.setAttribute("aria-label", searchPlaceholder);
    searchWrap.appendChild(searchInput);

    container.append(header, searchWrap, nav);
    return;
  }

  container.append(kickerEl, titleEl, descriptionEl, nav);
}

export async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "absolute";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}
