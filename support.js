import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { publicAppHelpSections, publicPcHelpSections, publicTipsSections } from "./publicPageData.js";
import { createLinks, createList, createPageCard, slugifyText } from "./resourceCommon.js";

const issueSupportSections = document.getElementById("issueSupportSections");
const appSupportSections = document.getElementById("appSupportSections");
const tipsSupportSections = document.getElementById("tipsSupportSections");
const licensingVendorGrid = document.getElementById("licensingVendorGrid");
const supportSearch = document.getElementById("supportSearch");
const supportSearchCount = document.getElementById("supportSearchCount");
const supportToc = document.getElementById("supportToc");
const supportScopePills = document.getElementById("supportScopePills");
const supportChipRow = document.getElementById("supportChipRow");

// Shortcut chip sets per scope. Clicking a chip drops the query into the search
// input, which triggers the standard filter pipeline. Chips are rebuilt every
// time the scope changes so each view shows the right quick-search options.
// Each query is intentionally a short, tokenized set of common words. The
// search engine matches each token independently (AND logic), so a 1–2 word
// query reliably matches more cards than a long keyword-stuffed string.
const scopeChipSets = {
  all: [
    { label: "License / sign-in", query: "license" },
    { label: "Project files / sync", query: "project file" },
    { label: "Plot / PDF / print", query: "plot" },
    { label: "Crash / slow app", query: "crash" },
    { label: "Remote access", query: "remote" },
    { label: "New device / MFA", query: "mfa" }
  ],
  issues: [
    { label: "Project files / sync", query: "project file" },
    { label: "Plot / PDF / print", query: "plot" },
    { label: "Scanner / MFP", query: "scan" },
    { label: "Remote access", query: "remote" },
    { label: "New device / MFA", query: "mfa" },
    { label: "Shared mailbox", query: "shared mailbox" }
  ],
  apps: [
    { label: "Autodesk", query: "autodesk" },
    { label: "Bentley", query: "bentley" },
    { label: "Bluebeam", query: "bluebeam" },
    { label: "Esri / ArcGIS", query: "arcgis" },
    { label: "Microsoft 365", query: "microsoft" },
    { label: "Adobe", query: "adobe" }
  ],
  licensing: [
    { label: "Activation error", query: "activation" },
    { label: "Wrong account / profile", query: "account" },
    { label: "Expired subscription", query: "subscription" },
    { label: "Named user / seat", query: "seat" },
    { label: "Module or extension", query: "module" },
    { label: "Vendor licensing", query: "vendor" }
  ],
  tips: [
    { label: "Outlook habits", query: "outlook" },
    { label: "Excel shortcuts", query: "excel" },
    { label: "Word habits", query: "word" },
    { label: "Teams meetings", query: "teams" },
    { label: "Browser cleanup", query: "browser" },
    { label: "Phone setup", query: "phone" }
  ]
};

// Filter groups track every searchable element on the page along with its scope so
// search and scope pills can hide/show independently and we can keep accurate counts.
const filterGroups = [];
// TOC structure: { scope: "issues|apps|tips|licensing", sectionId, label, subsections: [{id, label, count}] }
const tocSections = [];

function normalizeLinks(links = []) {
  return links.map(link => ({
    ...link,
    external: link.external ?? /^https?:/i.test(link.url)
  }));
}

function searchableText(values) {
  return values
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function textFromElement(element) {
  return (element.textContent || "").toLowerCase();
}

function registerGroup(element, leaves, options = {}) {
  filterGroups.push({
    element,
    leaves,
    text: options.text || textFromElement(element),
    scope: options.scope || element.closest("[data-scope]")?.dataset.scope || "all"
  });
}

function openDetailsAround(element) {
  let parent = element.parentElement;
  while (parent) {
    if (parent instanceof HTMLDetailsElement) {
      parent.open = true;
    }
    parent = parent.parentElement;
  }
}

function createSupportAccordion({ id, kicker, title, description, meta, open = true }) {
  const wrapper = document.createElement("details");
  wrapper.className = "results-card accordion-section support-accordion";
  wrapper.id = id;
  // Open everything by default — visitors should see what's inside without clicking.
  wrapper.open = open;

  const summary = document.createElement("summary");
  summary.className = "accordion-summary";

  const summaryCopy = document.createElement("div");
  summaryCopy.className = "accordion-summary-copy";
  summaryCopy.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: kicker }),
    Object.assign(document.createElement("h3"), { textContent: title }),
    Object.assign(document.createElement("p"), { textContent: description })
  );

  const metaEl = document.createElement("span");
  metaEl.className = "accordion-summary-meta";
  metaEl.textContent = meta;
  summary.append(summaryCopy, metaEl);

  const content = document.createElement("div");
  content.className = "accordion-content";
  wrapper.append(summary, content);

  return { wrapper, content };
}

function buildArticleSearchText(section, item) {
  return searchableText([
    section.title,
    section.description,
    item.title,
    item.text,
    item.fixes,
    item.links?.map(link => `${link.label} ${link.url}`)
  ]);
}

function renderArticleCollection(container, sections, options) {
  if (!container) return;

  const scope = options.scope;
  const tocChildren = [];

  sections.forEach((section, index) => {
    const accordionId = slugifyText(section.title);
    const { wrapper, content } = createSupportAccordion({
      id: accordionId,
      kicker: options.kicker,
      title: section.title,
      description: section.description,
      meta: `${section.items.length} topics`,
      open: true
    });

    const grid = document.createElement("div");
    grid.className = "issue-grid support-topic-grid";

    const cards = section.items.map(item => {
      const card = createPageCard("issue-card support-topic-card");
      card.id = slugifyText(item.title);
      card.dataset.supportSearch = buildArticleSearchText(section, item);
      card.dataset.scope = scope;

      card.append(
        Object.assign(document.createElement("p"), { className: "section-kicker", textContent: options.itemKicker }),
        Object.assign(document.createElement("h3"), { textContent: item.title }),
        Object.assign(document.createElement("p"), { textContent: item.text })
      );

      if (item.fixes?.length) {
        card.appendChild(createList(item.fixes));
      }

      if (item.links?.length) {
        card.appendChild(createLinks(normalizeLinks(item.links)));
      }

      grid.appendChild(card);
      return card;
    });

    content.appendChild(grid);
    container.appendChild(wrapper);
    registerGroup(wrapper, cards, {
      text: searchableText([section.title, section.description]),
      scope
    });

    tocChildren.push({
      id: accordionId,
      label: section.title,
      count: section.items.length
    });
  });

  return tocChildren;
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

function renderAppEntry(section, group, entry) {
  const link = document.createElement("a");
  link.className = "compact-link-item support-app-link";
  link.href = entry.url;
  link.dataset.supportSearch = buildAppEntrySearchText(section, group, entry);
  link.dataset.scope = "apps";

  link.append(
    Object.assign(document.createElement("strong"), { textContent: entry.name }),
    Object.assign(document.createElement("span"), { textContent: entry.summary })
  );

  return link;
}

function renderAppGroup(section, group, isDirectory) {
  const card = createPageCard(isDirectory ? "compact-group compact-group-directory support-app-group" : "compact-group support-app-group");
  card.id = group.id ?? slugifyText(group.title);
  card.dataset.supportSearch = searchableText([section.title, group.title, group.description]);
  card.dataset.scope = "apps";

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
    const element = renderAppEntry(section, group, entry);
    entryList.appendChild(element);
    return element;
  });

  card.appendChild(entryList);

  if (group.links?.length) {
    card.appendChild(createLinks(normalizeLinks(group.links)));
  }

  return { card, entries };
}

function renderAppSupportSections() {
  if (!appSupportSections) return [];

  const tocChildren = [];

  publicAppHelpSections.forEach((section, index) => {
    const isDirectorySection = section.title === "Full Application Directory";
    const entryCount = section.groups.reduce((total, group) => total + group.entries.length, 0);
    const accordionId = slugifyText(section.title);
    const { wrapper, content } = createSupportAccordion({
      id: accordionId,
      kicker: "App Guides",
      title: section.title,
      description: section.description,
      meta: `${entryCount} guides`,
      open: true
    });

    const groupShell = document.createElement("div");
    groupShell.className = isDirectorySection
      ? "compact-section-list compact-section-list-directory support-app-directory"
      : "compact-section-list support-app-directory";

    const groupCards = [];
    section.groups.forEach(group => {
      const rendered = renderAppGroup(section, group, isDirectorySection);
      groupShell.appendChild(rendered.card);
      groupCards.push(rendered.card, ...rendered.entries);
    });

    content.appendChild(groupShell);
    appSupportSections.appendChild(wrapper);
    registerGroup(wrapper, groupCards, {
      text: searchableText([section.title, section.description]),
      scope: "apps"
    });

    tocChildren.push({
      id: accordionId,
      label: section.title,
      count: entryCount
    });
  });

  return tocChildren;
}

function renderLicensingVendors() {
  if (!licensingVendorGrid) return 0;

  const hiddenVendors = new Set(["quickbooks"]);
  const cards = [];

  vendorOrder
    .filter(vendorSlug => vendorGuides[vendorSlug] && !hiddenVendors.has(vendorSlug))
    .forEach(vendorSlug => {
      const vendor = vendorGuides[vendorSlug];
      const apps = getVendorApplications(vendorSlug);
      const card = createPageCard("hub-card support-license-vendor-card");
      card.id = `${vendorSlug}-licensing-support`;
      card.dataset.scope = "licensing";
      card.dataset.supportSearch = searchableText([
        vendor.title,
        vendor.summary,
        vendor.products,
        apps.map(app => [app.name, app.licensing, app.focus]),
        // Common license-error vocabulary so chip queries like "activation",
        // "subscription", "seat", "module" can surface vendor cards even when
        // those exact words don't appear in the vendor's own copy.
        "license licensing activation subscription seat assigned named user role module extension"
      ]);

      card.append(
        Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Vendor Access" }),
        Object.assign(document.createElement("h3"), { textContent: vendor.title }),
        Object.assign(document.createElement("p"), {
          textContent: `Common products: ${apps.slice(0, 5).map(app => app.name).join(", ")}`
        }),
        createLinks([
          { label: "Licensing reference", url: "app-licensing.html#vendorCoverageSection" },
          { label: "Vendor guide", url: `guides/${vendorSlug}.html` },
          ...apps.slice(0, 2).map(app => ({ label: app.name, url: `guides/${vendorSlug}/${app.slug}.html` }))
        ])
      );

      licensingVendorGrid.appendChild(card);
      cards.push(card);
    });

  registerGroup(licensingVendorGrid, cards, {
    text: "licensing vendor access activation subscription account seat role assigned license",
    scope: "licensing"
  });

  return cards.length;
}

function registerStaticSearchCards() {
  // Statically-rendered cards (the 3-step licensing path) need to participate
  // in search too. Combine the visible text with any data-support-search
  // keywords on the card so chip queries like "activation" or "subscription"
  // can find cards that don't visibly contain those words.
  document.querySelectorAll("#licensing-access .support-search-card").forEach(card => {
    card.dataset.scope = "licensing";
    const keywords = card.dataset.supportSearch || "";
    const text = `${textFromElement(card)} ${keywords}`.toLowerCase();
    registerGroup(card, [card], { text, scope: "licensing" });
  });
}

// ── Hierarchical TOC ─────────────────────────────────────────────────────────
// Build a sidebar TOC whose top-level entries are the page sections (Issues,
// Apps, Licensing, Tips) and whose nested entries are each section's
// sub-sections with item counts.
function buildToc() {
  if (!supportToc) return;

  supportToc.innerHTML = "";

  tocSections.forEach(section => {
    const group = document.createElement("div");
    group.className = "support-toc-group";
    group.dataset.scope = section.scope;

    const head = document.createElement("a");
    head.className = "support-toc-head";
    head.href = `#${section.sectionId}`;
    head.dataset.tocSection = section.sectionId;

    const headLabel = document.createElement("span");
    headLabel.className = "support-toc-label";
    headLabel.textContent = section.label;

    const headCount = document.createElement("span");
    headCount.className = "support-toc-count";
    headCount.textContent = section.totalCount;

    head.append(headLabel, headCount);
    group.appendChild(head);

    if (section.subsections.length) {
      const list = document.createElement("ul");
      list.className = "support-toc-sublist";

      section.subsections.forEach(sub => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.className = "support-toc-sublink";
        link.href = `#${sub.id}`;

        const subLabel = document.createElement("span");
        subLabel.className = "support-toc-label";
        subLabel.textContent = sub.label;

        const subCount = document.createElement("span");
        subCount.className = "support-toc-subcount";
        subCount.textContent = sub.count;

        link.append(subLabel, subCount);
        item.appendChild(link);
        list.appendChild(item);
      });

      group.appendChild(list);
    }

    supportToc.appendChild(group);
  });
}

// ── Scope filter pills ───────────────────────────────────────────────────────
let activeScope = "all";
const scopeLabels = {
  all: "all support",
  issues: "issue",
  apps: "app guide",
  licensing: "licensing",
  tips: "tip"
};

function scopeAllows(scope) {
  return activeScope === "all" || scope === activeScope || scope === "contact";
}

function applyScopeVisibility(visibleScopes = null, hasQuery = false) {
  document.querySelectorAll(".help-content > [data-scope]").forEach(section => {
    const sectionScope = section.dataset.scope;
    const allowed = scopeAllows(sectionScope);
    const hasMatch = !hasQuery || sectionScope === "contact" || visibleScopes?.has(sectionScope);
    section.hidden = !allowed || !hasMatch;
    section.setAttribute("aria-hidden", String(section.hidden));
  });

  const popularSection = document.querySelector(".support-popular");
  if (popularSection) {
    let visiblePopularCards = 0;
    popularSection.querySelectorAll(".popular-card[data-scope]").forEach(card => {
      const show = activeScope === "all" || card.dataset.scope === activeScope;
      card.hidden = !show;
      card.setAttribute("aria-hidden", String(!show));
      if (show) {
        visiblePopularCards += 1;
      }
    });
    popularSection.hidden = activeScope !== "all" && visiblePopularCards === 0;
  }

  const vendorStrip = document.querySelector(".support-vendor-strip");
  if (vendorStrip) {
    const showVendorStrip = activeScope === "all" || activeScope === "apps";
    vendorStrip.hidden = !showVendorStrip;
    vendorStrip.setAttribute("aria-hidden", String(!showVendorStrip));
  }

  if (supportToc) {
    supportToc.querySelectorAll(".support-toc-group").forEach(group => {
      const groupScope = group.dataset.scope;
      const allowed = scopeAllows(groupScope);
      const hasMatch = !hasQuery || visibleScopes?.has(groupScope);
      group.hidden = !allowed || !hasMatch;
    });
  }
}

function renderChipsForScope(scope) {
  if (!supportChipRow) return;
  const chips = scopeChipSets[scope] || scopeChipSets.all;
  supportChipRow.innerHTML = "";
  chips.forEach(({ label, query }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.supportQuery = query;
    button.textContent = label;
    supportChipRow.appendChild(button);
  });
}

function setActiveScope(scope) {
  activeScope = scope;

  // Toggle pill aria/active state
  if (supportScopePills) {
    supportScopePills.querySelectorAll(".support-scope-pill").forEach(pill => {
      const isActive = pill.dataset.scope === scope;
      pill.classList.toggle("is-active", isActive);
      pill.setAttribute("aria-selected", String(isActive));
      pill.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  // Swap the chip row to show shortcuts relevant to the active scope
  renderChipsForScope(scope);
  filterSupportPage(supportSearch?.value ?? "");
}

// ── Search ───────────────────────────────────────────────────────────────────
// Counts visible (matching) leaves per scope, used to update both the search
// summary and the scope-pill badges.
function updateScopeCounts() {
  const counts = { all: 0, issues: 0, apps: 0, licensing: 0, tips: 0 };

  filterGroups.forEach(group => {
    group.leaves.forEach(leaf => {
      if (leaf.dataset.searchMatched !== "false") {
        counts.all += 1;
        if (group.scope && counts[group.scope] !== undefined) {
          counts[group.scope] += 1;
        }
      }
    });
  });

  if (supportScopePills) {
    supportScopePills.querySelectorAll(".scope-count").forEach(el => {
      const scope = el.dataset.countFor;
      el.textContent = counts[scope] ?? 0;
    });
  }

  return counts;
}

// Split the query into whitespace-separated tokens. A leaf matches when every
// token appears somewhere in its searchable text (AND logic) — much more
// forgiving than literal substring matching, which used to require the entire
// multi-word query to appear contiguously in a single card.
function tokenize(query) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function matchesTokens(haystack, tokens) {
  if (!tokens.length) return true;
  return tokens.every(token => haystack.includes(token));
}

function filterSupportPage(query) {
  const tokens = tokenize(query);
  const hasQuery = tokens.length > 0;
  let visibleLeaves = 0;
  let totalLeaves = 0;
  const visibleScopes = new Set();

  filterGroups.forEach(group => {
    const allowedByScope = scopeAllows(group.scope);
    const groupTextMatches = !hasQuery || matchesTokens(group.text, tokens);
    let groupVisible = allowedByScope && groupTextMatches;
    group.leaves.forEach(leaf => {
      totalLeaves += 1;
      const leafText = leaf.dataset.supportSearch || textFromElement(leaf);
      const textMatches = groupTextMatches || !hasQuery || matchesTokens(leafText, tokens);
      const matches = allowedByScope && textMatches;
      leaf.dataset.searchMatched = String(textMatches);
      leaf.hidden = !matches;
      if (matches) {
        visibleLeaves += 1;
        groupVisible = true;
        visibleScopes.add(group.scope);
      }
    });

    group.element.hidden = !groupVisible;
    group.element.setAttribute("aria-hidden", String(!groupVisible));
    if (hasQuery && groupVisible) {
      openDetailsAround(group.element);
      if (group.element instanceof HTMLDetailsElement) {
        group.element.open = true;
      }
    }
  });

  if (supportSearchCount) {
    const scopeLabel = scopeLabels[activeScope] ?? "support";
    supportSearchCount.textContent = hasQuery
      ? activeScope === "all"
        ? `${visibleLeaves} of ${totalLeaves} topics match`
        : `${visibleLeaves} matching ${scopeLabel} topics`
      : activeScope === "all"
        ? "Showing all support topics"
        : `Showing ${scopeLabel} topics`;
  }

  applyScopeVisibility(visibleScopes, hasQuery);
  updateScopeCounts();
}

function setSearchValue(value) {
  if (!supportSearch) return;
  supportSearch.value = value;
  supportSearch.dispatchEvent(new Event("input", { bubbles: true }));
  supportSearch.focus();
}

function scrollToCurrentHash() {
  if (!window.location.hash) return;
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;
  const targetScope = target.closest("[data-scope]")?.dataset.scope;
  if (targetScope && targetScope !== "contact" && targetScope !== activeScope) {
    setActiveScope(targetScope);
  }
  openDetailsAround(target);
  target.scrollIntoView({ block: "start", behavior: "smooth" });
}

// ── Render everything, then build TOC + counts ───────────────────────────────

const issueChildren = renderArticleCollection(issueSupportSections, publicPcHelpSections, {
  kicker: "Issue Help",
  itemKicker: "Support Topic",
  scope: "issues"
}) ?? [];

const appChildren = renderAppSupportSections();

const licensingVendorCount = renderLicensingVendors();

const tipsChildren = renderArticleCollection(tipsSupportSections, publicTipsSections, {
  kicker: "Tips & Tricks",
  itemKicker: "Tip",
  scope: "tips"
}) ?? [];

registerStaticSearchCards();

// Build TOC structure metadata
tocSections.push({
  scope: "issues",
  sectionId: "cad-aec-issues",
  label: "Issues",
  totalCount: issueChildren.reduce((n, s) => n + s.count, 0),
  subsections: issueChildren
});
tocSections.push({
  scope: "apps",
  sectionId: "app-guides",
  label: "App Guides",
  totalCount: appChildren.reduce((n, s) => n + s.count, 0),
  subsections: appChildren
});
tocSections.push({
  scope: "licensing",
  sectionId: "licensing-access",
  label: "Licensing",
  totalCount: 3 + licensingVendorCount,
  subsections: [
    { id: "license-or-sign-in-error", label: "3-step licensing path", count: 3 },
    { id: "licensingVendorGrid", label: "Vendor licensing notes", count: licensingVendorCount }
  ]
});
tocSections.push({
  scope: "tips",
  sectionId: "tips-tricks",
  label: "Tips & Tricks",
  totalCount: tipsChildren.reduce((n, s) => n + s.count, 0),
  subsections: tipsChildren
});

buildToc();
updateScopeCounts();
renderChipsForScope("all");

// ── Wire up controls ─────────────────────────────────────────────────────────

if (supportSearch) {
  supportSearch.addEventListener("input", event => {
    filterSupportPage(event.target.value);
  });
}

// Event delegation — chips are re-rendered when the scope changes, so we can't
// rely on per-element click handlers attached at boot.
if (supportChipRow) {
  supportChipRow.addEventListener("click", event => {
    const button = event.target.closest("button[data-support-query]");
    if (!button) return;
    setSearchValue(button.dataset.supportQuery || "");
  });
}

if (supportScopePills) {
  supportScopePills.addEventListener("click", event => {
    const pill = event.target.closest(".support-scope-pill");
    if (!pill) return;
    setActiveScope(pill.dataset.scope || "all");
  });
}

window.addEventListener("hashchange", scrollToCurrentHash);
requestAnimationFrame(scrollToCurrentHash);
