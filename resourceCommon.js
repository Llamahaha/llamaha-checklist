export function createList(items, ordered = false, className = "") {
  const list = document.createElement(ordered ? "ol" : "ul");

  if (className) {
    list.className = className;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
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
    link.textContent = item.label;

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
  heading.textContent = title;
  block.appendChild(heading);

  if (Array.isArray(body)) {
    block.appendChild(createList(body));
  } else if (body instanceof HTMLElement) {
    block.appendChild(body);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = body;
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
    description = "Use these quick links to move around the page faster."
  } = options;

  container.innerHTML = "";
  container.classList.add("hub-section", "toc-shell");

  const kickerEl = document.createElement("p");
  kickerEl.className = "section-kicker";
  kickerEl.textContent = kicker;

  const titleEl = document.createElement("h2");
  titleEl.textContent = title;

  const descriptionEl = document.createElement("p");
  descriptionEl.className = "hub-section-copy";
  descriptionEl.textContent = description;

  const nav = document.createElement("nav");
  nav.className = "toc-links";
  nav.setAttribute("aria-label", title);

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.label;
    nav.appendChild(link);
  });

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
