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
  pageToc.classList.add("toc-shell", "hub-section", "is-collapsible-toc");

  const details = document.createElement("details");
  details.className = "accordion-section toc-panel";

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const summaryCopy = document.createElement("div");
  summaryCopy.className = "accordion-summary-copy";
  summaryCopy.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "On This Page" }),
    Object.assign(document.createElement("h2"), { textContent: "Open the PC Help section you need" }),
    Object.assign(document.createElement("p"), {
      textContent: "Use these quick links or search this page to jump into Cloud PC, browser, VPN, Windows, printing, and device-help sections."
    })
  );

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${items.length} sections`;
  summary.append(summaryCopy, meta);

  const content = document.createElement("div");
  content.className = "accordion-content";

  const searchRow = document.createElement("div");
  searchRow.className = "page-filter-row";

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "search-input page-search-input";
  searchInput.placeholder = "Search PC Help on this page";
  searchInput.setAttribute("aria-label", "Search PC Help on this page");
  searchInput.addEventListener("input", event => {
    filterSections(event.target.value);
  });

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "secondary-btn compact-btn";
  clearButton.textContent = "Clear";
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterSections("");
  });

  searchRow.append(searchInput, clearButton);

  const nav = document.createElement("nav");
  nav.className = "toc-links";
  nav.setAttribute("aria-label", "PC Help sections");

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.label;
    link.addEventListener("click", event => {
      event.preventDefault();
      details.open = true;
      revealSection(item.id);
      window.history.replaceState({}, "", `#${item.id}`);
    });
    nav.appendChild(link);
  });

  content.append(searchRow, nav);
  details.append(summary, content);
  pageToc.appendChild(details);
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
