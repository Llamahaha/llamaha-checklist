import { publicPcHelpSections } from "./publicPageData.js";
import { createLinks, createList, createPageCard, slugifyText } from "./resourceCommon.js";
import { activatePageTabs } from "./sectionTabs.js";

const issueSections = document.getElementById("issueSections");
const pageToc = document.getElementById("pageToc");
const renderedSections = [];
let tabsApi = null;

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

function filterSections(query) {
  const needle = query.trim().toLowerCase();

  // When a search is active, bypass the single-tab rule so every matching
  // section can appear. Clearing the search returns to the active tab.
  if (tabsApi) {
    tabsApi.setSearchOverride(!!needle);
  }

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

    if (needle) {
      section.element.hidden = !sectionMatches;
      if (sectionMatches && section.element instanceof HTMLDetailsElement) {
        section.element.open = true;
      }
    }
  });
}

function renderToc(items) {
  if (!pageToc || !items.length) {
    return;
  }

  pageToc.innerHTML = "";

  const header = document.createElement("div");
  header.className = "help-toc-header";
  header.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "On This Page" }),
    Object.assign(document.createElement("h2"), { textContent: "PC Help sections" }),
    Object.assign(document.createElement("p"), {
      textContent: `Open a section below. Only the one you pick is shown on the page. You can also search everything.`
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

  tabsApi = activatePageTabs();
}

renderSections();
