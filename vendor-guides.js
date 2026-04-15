import { publicAppHelpSections } from "./publicPageData.js";
import { createLinks, createPageCard, slugifyText } from "./resourceCommon.js";

const appHelpSections = document.getElementById("appHelpSections");
const pageToc = document.getElementById("pageToc");
const renderedSections = [];

function buildEntrySearchText(sectionTitle, group, entry) {
  return [
    sectionTitle,
    group.title,
    group.description,
    entry.vendorTitle,
    entry.name,
    entry.summary,
    entry.keywords ?? ""
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
    let visibleGroups = 0;

    section.groups.forEach(group => {
      let visibleEntries = 0;

      group.entries.forEach(entry => {
        const matches = !needle || entry.dataset.searchText.includes(needle);
        entry.hidden = !matches;
        if (matches) {
          visibleEntries += 1;
        }
      });

      const groupMatches = !needle
        || group.element.dataset.searchText.includes(needle)
        || visibleEntries > 0;

      group.element.hidden = !groupMatches;
      if (groupMatches) {
        visibleGroups += 1;
      }
    });

    const sectionMatches = !needle
      || section.element.dataset.searchText.includes(needle)
      || visibleGroups > 0;

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
    Object.assign(document.createElement("h2"), { textContent: "Open the app section you need" }),
    Object.assign(document.createElement("p"), {
      textContent: "Use these quick links or search this page to jump to the app family you need, then open the exact product guide."
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
  searchInput.placeholder = "Search App Help on this page";
  searchInput.setAttribute("aria-label", "Search App Help on this page");
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
  nav.setAttribute("aria-label", "App Help sections");

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

function renderEntry(entry) {
  const link = document.createElement("a");
  link.className = "compact-link-item";
  link.href = entry.url;
  link.dataset.searchText = `${entry.vendorTitle} ${entry.name} ${entry.summary} ${entry.keywords ?? ""}`.toLowerCase();

  const title = document.createElement("strong");
  title.textContent = entry.name;

  const text = document.createElement("span");
  text.textContent = entry.summary;

  link.append(title, text);
  return link;
}

function renderGroup(sectionTitle, group, isDirectory = false) {
  const wrapper = createPageCard(isDirectory ? "compact-group compact-group-directory" : "compact-group");
  wrapper.dataset.searchText = `${group.title} ${group.description ?? ""}`.toLowerCase();
  const kickerText = isDirectory ? "Vendor" : "App Group";

  wrapper.append(
    Object.assign(document.createElement("p"), {
      className: "section-kicker",
      textContent: kickerText
    }),
    Object.assign(document.createElement("h3"), { textContent: group.title }),
    Object.assign(document.createElement("p"), { textContent: group.description })
  );

  const entryList = document.createElement("div");
  entryList.className = "compact-link-list";

  const entryElements = group.entries.map(entry => {
    const element = renderEntry(entry);
    element.dataset.searchText = buildEntrySearchText(sectionTitle, group, entry);
    entryList.appendChild(element);
    return element;
  });

  wrapper.appendChild(entryList);

  if (group.links?.length) {
    wrapper.appendChild(createLinks(
      group.links.map(link => ({
        ...link,
        external: link.external ?? /^https?:/i.test(link.url)
      }))
    ));
  }

  return { element: wrapper, entries: entryElements };
}

function renderSection(section) {
  const wrapper = document.createElement("details");
  wrapper.className = "results-card accordion-section";
  wrapper.id = slugifyText(section.title);
  wrapper.dataset.searchText = `${section.title} ${section.description}`.toLowerCase();

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const summaryCopy = document.createElement("div");
  summaryCopy.className = "accordion-summary-copy";
  summaryCopy.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "App Help" }),
    Object.assign(document.createElement("h2"), { textContent: section.title }),
    Object.assign(document.createElement("p"), { textContent: section.description })
  );

  const groupCount = section.groups.length;
  const entryCount = section.groups.reduce((total, group) => total + group.entries.length, 0);

  const meta = document.createElement("span");
  meta.className = "accordion-summary-meta";
  meta.textContent = `${entryCount} guides`;
  summary.append(summaryCopy, meta);

  const content = document.createElement("div");
  content.className = "accordion-content";

  const groupShell = document.createElement("div");
  groupShell.className = section.title === "Full Application Directory"
    ? "compact-section-list compact-section-list-directory"
    : "compact-section-list";

  const groupRefs = section.groups.map(group => {
    const rendered = renderGroup(section.title, group, section.title === "Full Application Directory");
    groupShell.appendChild(rendered.element);
    return rendered;
  });

  const helper = document.createElement("p");
  helper.className = "hub-section-copy";
  helper.textContent = section.title === "Full Application Directory"
    ? "Use the vendor overview link when you need the broader product family page, or open the exact application guide when you already know the product."
    : groupCount > 1
      ? "Pick the app group that matches your product, then open the guide with the exact app name."
      : "Open the guide that matches the app you already know.";

  content.append(helper, groupShell);
  wrapper.append(summary, content);
  renderedSections.push({ element: wrapper, groups: groupRefs });
  return wrapper;
}

function renderSections() {
  if (!appHelpSections) {
    return;
  }

  appHelpSections.innerHTML = "";
  renderedSections.length = 0;

  const tocItems = publicAppHelpSections.map(section => ({
    id: slugifyText(section.title),
    label: section.title
  }));

  publicAppHelpSections.forEach(section => {
    appHelpSections.appendChild(renderSection(section));
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
