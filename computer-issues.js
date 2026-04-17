import { publicPcHelpSections } from "./publicPageData.js";
import { createLinks, createList, createPageCard, slugifyText } from "./resourceCommon.js";

const issueSections = document.getElementById("issueSections");
const pageToc = document.getElementById("pageToc");
const renderedSections = [];

function buildSearchText(section, item) {
  return [
    section.title,
    section.description,
    item.title,
    item.text,
    ...(item.fixes ?? []),
    ...((item.links ?? []).map(link => `${link.label} ${link.url}`))
  ].join(" ").toLowerCase();
}

function revealSection(id) {
  const wrapper = document.getElementById(id);
  if (!wrapper) {
    return;
  }

  if (wrapper instanceof HTMLDetailsElement) {
    wrapper.open = true;
  }

  window.requestAnimationFrame(() => {
    wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  setActiveTocLink(id);
}

let tocLinkMap = new Map();

function setActiveTocLink(id) {
  tocLinkMap.forEach((link, linkId) => {
    link.classList.toggle("is-active", linkId === id);
  });
}

function filterSections(query) {
  const needle = query.trim().toLowerCase();

  renderedSections.forEach(section => {
    let visibleCards = 0;

    section.cards.forEach(card => {
      const matches = !needle || card.dataset.searchText.includes(needle);
      card.hidden = !matches;
      if (matches) {
        visibleCards += 1;
      }
    });

    const sectionMatches = !needle
      || section.element.dataset.searchText.includes(needle)
      || visibleCards > 0;

    section.element.hidden = !sectionMatches;
    if (needle && sectionMatches) {
      section.element.open = true;
    }
  });
}

function renderToc(items) {
  if (!pageToc || !items.length) {
    return;
  }

  pageToc.innerHTML = "";
  tocLinkMap = new Map();

  const header = document.createElement("div");
  header.className = "help-toc-header";
  header.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "On This Page" }),
    Object.assign(document.createElement("h2"), { textContent: "PC Help sections" }),
    Object.assign(document.createElement("p"), {
      textContent: `Jump to any of the ${items.length} sections below, or search within this page.`
    })
  );

  const searchRow = document.createElement("div");
  searchRow.className = "help-toc-search";

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "search-input page-search-input";
  searchInput.placeholder = "Search PC Help";
  searchInput.setAttribute("aria-label", "Search PC Help on this page");
  searchInput.addEventListener("input", event => {
    filterSections(event.target.value);
  });

  searchRow.append(searchInput);

  const nav = document.createElement("nav");
  nav.className = "help-toc-nav";
  nav.setAttribute("aria-label", "PC Help sections");

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.label;
    link.addEventListener("click", event => {
      event.preventDefault();
      revealSection(item.id);
      window.history.replaceState({}, "", `#${item.id}`);
    });
    tocLinkMap.set(item.id, link);
    nav.appendChild(link);
  });

  pageToc.append(header, searchRow, nav);
}

function createSection(section) {
  const wrapper = document.createElement("details");
  wrapper.className = "results-card accordion-section";
  wrapper.id = slugifyText(section.title);
  wrapper.dataset.searchText = `${section.title} ${section.description}`.toLowerCase();

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const summaryCopy = document.createElement("div");
  summaryCopy.className = "accordion-summary-copy";
  summaryCopy.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "PC Help" }),
    Object.assign(document.createElement("h2"), { textContent: section.title }),
    Object.assign(document.createElement("p"), { textContent: section.description })
  );

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${section.items.length} articles`;
  summary.append(summaryCopy, meta);

  const content = document.createElement("div");
  content.className = "accordion-content";

  const grid = document.createElement("div");
  grid.className = "issue-grid";

  const cards = section.items.map(item => {
    const card = createPageCard();
    card.dataset.searchText = buildSearchText(section, item);

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    const fixes = createList(item.fixes);
    const links = createLinks(
      item.links.map(link => ({
        ...link,
        external: link.external ?? /^https?:/i.test(link.url)
      }))
    );

    card.append(itemTitle, text, fixes, links);
    grid.appendChild(card);
    return card;
  });

  content.appendChild(grid);
  wrapper.append(summary, content);
  renderedSections.push({ element: wrapper, cards });
  return wrapper;
}

function renderSections() {
  if (!issueSections) {
    return;
  }

  issueSections.innerHTML = "";
  renderedSections.length = 0;

  const tocItems = publicPcHelpSections.map(section => ({
    id: slugifyText(section.title),
    label: section.title
  }));

  publicPcHelpSections.forEach(section => {
    issueSections.appendChild(createSection(section));
  });

  renderToc(tocItems);

  // Open first section by default so the content pane isn't empty.
  const firstSection = renderedSections[0];
  if (firstSection && firstSection.element instanceof HTMLDetailsElement) {
    firstSection.element.open = true;
    if (tocItems[0]) {
      setActiveTocLink(tocItems[0].id);
    }
  }
}

window.addEventListener("hashchange", () => {
  if (window.location.hash) {
    revealSection(window.location.hash.slice(1));
  }
});

renderSections();

if (window.location.hash) {
  revealSection(window.location.hash.slice(1));
}
