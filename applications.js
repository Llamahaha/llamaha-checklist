import { publicAppHelpSections } from "./publicPageData.js";
import { createLinks, createPageCard, slugifyText } from "./resourceCommon.js";
import { activatePageTabs } from "./sectionTabs.js";

const appSections = document.getElementById("appSections");
const pageToc = document.getElementById("pageToc");
const renderedSections = [];
let tabsApi = null;

function searchableText(values) {
  return values.flat(Infinity).filter(Boolean).join(" ").toLowerCase();
}

function buildAppEntrySearchText(section, group, entry) {
  return searchableText([
    section.title,
    section.description,
    group.title,
    group.description,
    entry.vendorTitle,
    entry.name,
    entry.summary,
    entry.keywords
  ]);
}

function normalizeLinks(links = []) {
  return links.map(link => ({
    ...link,
    external: link.external ?? /^https?:/i.test(link.url)
  }));
}

function filterSections(query) {
  const needle = query.trim().toLowerCase();
  if (tabsApi) {
    tabsApi.setSearchOverride(!!needle);
  }

  renderedSections.forEach(section => {
    let visibleLeaves = 0;
    section.leaves.forEach(leaf => {
      const matches = !needle || (leaf.dataset.searchText || "").includes(needle);
      leaf.hidden = !matches;
      if (matches) visibleLeaves += 1;
    });
    const sectionMatches = !needle
      || section.element.dataset.searchText.includes(needle)
      || visibleLeaves > 0;
    if (needle) {
      section.element.hidden = !sectionMatches;
      if (sectionMatches && section.element instanceof HTMLDetailsElement) {
        section.element.open = true;
      }
    }
  });
}

function renderToc(items) {
  if (!pageToc || !items.length) return;
  pageToc.innerHTML = "";

  const header = document.createElement("div");
  header.className = "help-toc-header";
  header.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "On This Page" }),
    Object.assign(document.createElement("h2"), { textContent: "App Help sections" }),
    Object.assign(document.createElement("p"), {
      textContent: "Open a section below. Only the one you pick is shown on the page. You can also search every guide."
    })
  );

  const searchRow = document.createElement("div");
  searchRow.className = "help-toc-search";
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "search-input page-search-input";
  searchInput.placeholder = "Search App Help";
  searchInput.setAttribute("aria-label", "Search App Help on this page");
  searchInput.addEventListener("input", event => {
    filterSections(event.target.value);
  });
  searchRow.append(searchInput);

  const nav = document.createElement("nav");
  nav.className = "help-toc-nav";
  nav.setAttribute("aria-label", "App Help sections");
  items.forEach(item => {
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.label;
    nav.appendChild(link);
  });

  pageToc.append(header, searchRow, nav);
}

function renderAppEntry(section, group, entry) {
  const link = document.createElement("a");
  link.className = "compact-link-item";
  link.href = entry.url;
  link.dataset.searchText = buildAppEntrySearchText(section, group, entry);
  link.append(
    Object.assign(document.createElement("strong"), { textContent: entry.name }),
    Object.assign(document.createElement("span"), { textContent: entry.summary })
  );
  return link;
}

function renderAppGroup(section, group, isDirectory) {
  const card = createPageCard(isDirectory ? "compact-group compact-group-directory" : "compact-group");
  card.id = group.id ?? slugifyText(group.title);
  card.dataset.searchText = searchableText([section.title, group.title, group.description]);

  card.append(
    Object.assign(document.createElement("p"), {
      className: "section-kicker",
      textContent: isDirectory ? "Vendor" : "App Group"
    }),
    Object.assign(document.createElement("h3"), { textContent: group.title }),
    Object.assign(document.createElement("p"), { textContent: group.description })
  );

  const entryList = document.createElement("div");
  entryList.className = "compact-link-list";
  const entries = group.entries.map(entry => {
    const el = renderAppEntry(section, group, entry);
    entryList.appendChild(el);
    return el;
  });
  card.appendChild(entryList);

  if (group.links?.length) {
    card.appendChild(createLinks(normalizeLinks(group.links)));
  }

  return { card, entries };
}

function createSection(section, index) {
  const isDirectorySection = section.title === "Full Application Directory";
  const wrapper = document.createElement("details");
  wrapper.className = "results-card accordion-section";
  wrapper.id = slugifyText(section.title);
  wrapper.dataset.searchText = `${section.title} ${section.description}`.toLowerCase();
  // Open the most-popular section by default so the page is useful at a glance.
  wrapper.open = index === 0;

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const summaryCopy = document.createElement("div");
  summaryCopy.className = "accordion-summary-copy";
  const entryCount = section.groups.reduce((total, group) => total + group.entries.length, 0);
  summaryCopy.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "App Help" }),
    Object.assign(document.createElement("h2"), { textContent: section.title }),
    Object.assign(document.createElement("p"), { textContent: section.description })
  );

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${entryCount} guides`;
  summary.append(summaryCopy, meta);

  const content = document.createElement("div");
  content.className = "accordion-content";

  const groupShell = document.createElement("div");
  groupShell.className = isDirectorySection
    ? "compact-section-list compact-section-list-directory"
    : "compact-section-list";

  const leaves = [];
  section.groups.forEach(group => {
    const rendered = renderAppGroup(section, group, isDirectorySection);
    groupShell.appendChild(rendered.card);
    leaves.push(rendered.card, ...rendered.entries);
  });

  content.appendChild(groupShell);
  wrapper.append(summary, content);
  renderedSections.push({ element: wrapper, leaves });
  return wrapper;
}

function renderSections() {
  if (!appSections) return;

  appSections.innerHTML = "";
  renderedSections.length = 0;

  const tocItems = publicAppHelpSections.map(section => ({
    id: slugifyText(section.title),
    label: section.title
  }));

  publicAppHelpSections.forEach((section, index) => {
    appSections.appendChild(createSection(section, index));
  });

  renderToc(tocItems);

  tabsApi = activatePageTabs();
}

renderSections();
