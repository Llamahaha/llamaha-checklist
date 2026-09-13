// Renders the dedicated /app-news page: full reverse-chronological list with
// vendor / category / severity / audience / date filters.
//
// The page reads the same shared data file as the home section, so a future
// daily monitoring job can write findings into appNewsData.js (with
// isPublished: false) and have them surface here once a human reviews them.

import {
  appNewsItems,
  getVisibleItems,
  formatNewsDate,
  severityClass,
  categoryClass,
  audienceClass,
  hasPlaceholders,
  APP_NEWS_CATEGORIES,
  APP_NEWS_SEVERITIES,
  sortByPublishedDesc
} from "./appNewsData.js";
import { NEWS_STATUSES, appFilterValue, newsStatus, isArchivedNews, matchesNewsFilters, customerAction, formatCheckedAt } from "./newsLifecycle.js";

// Detect area from <body data-site-area="...">; default to public.
const AREA = document.body?.dataset?.siteArea === "internal" ? "internal" : "public";

const els = {
  list: document.getElementById("appNewsPageList"),
  count: document.getElementById("appNewsCount"),
  filters: document.getElementById("appNewsFilters"),
  vendor: document.getElementById("filterVendor"),
  category: document.getElementById("filterCategory"),
  severity: document.getElementById("filterSeverity"),
  audience: document.getElementById("filterAudience"),
  dateFrom: document.getElementById("filterDateFrom"),
  dateTo: document.getElementById("filterDateTo")
};
els.status = document.getElementById("filterStatus");
els.view = document.getElementById("filterView");

function unique(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function populateOptions(select, values) {
  if (!select) return;
  for (const value of values) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = value;
    select.appendChild(opt);
  }
}

function populateFilters(items) {
  // Vendor list pulls every distinct vendor and "vendor · app" combo so users
  // can filter by either granularity. Storing the raw vendor in the value
  // keeps matching logic simple.
  const vendors = unique(items.map(item => item.vendor));
  for (const vendor of vendors) {
    const group = document.createElement("optgroup");
    group.label = vendor;
    group.append(new Option(`All ${vendor}`, `vendor:${vendor}`));
    for (const appName of unique(items.filter(item => item.vendor === vendor).map(item => item.appName))) {
      group.append(new Option(appName, appFilterValue({ vendor, appName })));
    }
    els.vendor.append(group);
  }

  populateOptions(els.category, APP_NEWS_CATEGORIES);
  populateOptions(els.severity, APP_NEWS_SEVERITIES);
  for (const [value, label] of Object.entries(NEWS_STATUSES)) els.status.append(new Option(label, value));

  // On the public site we hide the audience filter — only one option matters.
  if (AREA === "public" && els.audience) {
    const wrap = els.audience.closest(".appnews-filter");
    if (wrap) wrap.hidden = true;
  }
}

function readFilters() {
  return {
    vendor: els.vendor?.value || "",
    category: els.category?.value || "",
    severity: els.severity?.value || "",
    audience: els.audience?.value || "",
    dateFrom: els.dateFrom?.value || "",
    dateTo: els.dateTo?.value || "",
    status: els.status?.value || "",
    view: els.view?.value || "recent"
  };
}

function makeBadge(className, text) {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function renderRow(item) {
  const article = document.createElement("article");
  article.className = `appnews-row appnews-row-detail ${severityClass(item.severity)}`;
  article.id = item.id;
  article.dataset.severity = item.severity;
  article.dataset.category = item.category;
  article.dataset.vendor = item.vendor;
  article.dataset.audience = item.audience;

  const rail = document.createElement("span");
  rail.className = "appnews-rail";
  rail.setAttribute("aria-hidden", "true");

  const body = document.createElement("div");
  body.className = "appnews-body";

  const top = document.createElement("div");
  top.className = "appnews-top";

  const badges = document.createElement("span");
  badges.className = "appnews-badges";
  badges.append(
    makeBadge(`appnews-badge appnews-sev ${severityClass(item.severity)}`, item.severity),
    makeBadge(`appnews-badge appnews-cat ${categoryClass(item.category)}`, item.category),
    makeBadge("appnews-badge appnews-vendor", item.appName ? `${item.vendor} · ${item.appName}` : item.vendor),
    makeBadge(`appnews-badge appnews-state is-${newsStatus(item)}`, NEWS_STATUSES[newsStatus(item)])
  );
  if (AREA === "internal") badges.append(makeBadge("appnews-badge", item.audience === "internal" ? "Internal" : "Public"));
  if (item.isPlaceholder) {
    badges.appendChild(makeBadge("appnews-placeholder-tag", "Sample"));
  }
  top.appendChild(badges);

  const title = document.createElement("h3");
  title.className = "appnews-title appnews-title-detail";
  title.textContent = item.title;

  const summary = document.createElement("p");
  summary.className = "appnews-summary";
  summary.textContent = item.summary;

  const detailGrid = document.createElement("dl");
  detailGrid.className = "appnews-detail-grid";

  if (item.affectedUsers) {
    const dt = document.createElement("dt");
    dt.textContent = "Who's affected";
    const dd = document.createElement("dd");
    dd.textContent = item.affectedUsers;
    detailGrid.append(dt, dd);
  }

  {
    const dt = document.createElement("dt");
    dt.textContent = "What you should do";
    const dd = document.createElement("dd");
    dd.textContent = customerAction(item);
    detailGrid.append(dt, dd);
  }

  const technician = document.createElement("details");
  technician.className = "appnews-technician";
  const technicianTitle = document.createElement("summary");
  technicianTitle.textContent = "For your IT team";
  const technicianCopy = document.createElement("p");
  technicianCopy.textContent = item.recommendedMspAction || "Check the linked vendor guidance for technical details.";
  technician.append(technicianTitle, technicianCopy);

  const meta = document.createElement("div");
  meta.className = "appnews-meta";

  const dates = document.createElement("span");
  dates.className = "appnews-date";
  const published = formatNewsDate(item.publishedDate);
  const updated = formatNewsDate(item.lastUpdatedDate);
  if (published && updated && published !== updated) {
    dates.textContent = `Published ${published} · Updated ${updated}`;
  } else {
    dates.textContent = `Published ${published || updated}`;
  }
  meta.appendChild(dates);
  const checked = document.createElement("span");
  checked.className = "appnews-checked";
  checked.textContent = formatCheckedAt(item.lastCheckedAt);
  meta.append(checked);

  if (Array.isArray(item.sourceUrls) && item.sourceUrls.length) {
    const linksWrap = document.createElement("span");
    linksWrap.className = "appnews-sources";
    linksWrap.append(document.createTextNode("Sources: "));
    item.sourceUrls.forEach((url, idx) => {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      try {
        a.textContent = new URL(url, window.location.href).hostname.replace(/^www\./, "");
      } catch {
        a.textContent = url;
      }
      linksWrap.appendChild(a);
      if (idx < item.sourceUrls.length - 1) {
        linksWrap.appendChild(document.createTextNode(", "));
      }
    });
    meta.appendChild(linksWrap);
  }

  if (Array.isArray(item.tags) && item.tags.length) {
    const tagsWrap = document.createElement("span");
    tagsWrap.className = "appnews-tags";
    item.tags.forEach(tag => {
      const t = document.createElement("span");
      t.className = "appnews-tag";
      t.textContent = `#${tag}`;
      tagsWrap.appendChild(t);
    });
    meta.appendChild(tagsWrap);
  }

  body.append(top, title, summary);
  if (isArchivedNews(item)) {
    const archived = document.createElement("p");
    archived.className = "appnews-history-note";
    archived.textContent = "Archived report. This does not establish current service status or confirm that your devices are patched.";
    body.append(archived);
  }
  if (detailGrid.children.length) body.appendChild(detailGrid);
  body.append(technician, meta);

  article.append(rail, body);
  return article;
}

function renderEmpty(container) {
  const empty = document.createElement("div");
  empty.className = "appnews-empty";
  empty.textContent =
    container.dataset.emptyState ||
    "No major supported-app outages, service impacts, or security advisories posted right now.";
  container.replaceChildren(empty);
}

function renderPlaceholderBanner() {
  if (!hasPlaceholders(appNewsItems)) return;
  const card = document.querySelector(".appnews-page-card");
  if (!card || card.querySelector(".appnews-placeholder-banner")) return;
  const banner = document.createElement("p");
  banner.className = "appnews-placeholder-banner";
  banner.textContent =
    "Sample data — these items are placeholders for layout review. Replace with real, sourced advisories before publishing.";
  card.prepend(banner);
}

function update() {
  if (!els.list) return;
  const baseItems = getVisibleItems({ area: AREA });
  const filters = readFilters();
  if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
    els.count.textContent = "The start date must be on or before the end date.";
    els.list.replaceChildren();
    return;
  }
  const matched = baseItems.filter(item => matchesNewsFilters(item, filters)).sort(sortByPublishedDesc);

  if (els.count) {
    if (matched.length === baseItems.length) {
      els.count.textContent = `${matched.length} ${matched.length === 1 ? "item" : "items"}`;
    } else {
      els.count.textContent = `${matched.length} of ${baseItems.length} ${baseItems.length === 1 ? "item" : "items"} match your filters`;
    }
  }

  if (!matched.length) {
    renderEmpty(els.list);
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of matched) {
    fragment.appendChild(renderRow(item));
  }
  els.list.replaceChildren(fragment);

}

const filterNames = ["vendor", "category", "severity", "audience", "dateFrom", "dateTo", "status", "view"];

function saveFilters() {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(readFilters())) {
    if (value && !(key === "view" && value === "recent")) params.set(key, value);
  }
  window.history.replaceState({}, "", `${location.pathname}${params.size ? `?${params}` : ""}${location.hash}`);
  update();
}

function loadFilters() {
  const params = new URLSearchParams(location.search);
  for (const name of filterNames) {
    const input = els[name];
    const fallback = name === "view" ? "recent" : "";
    const requested = params.get(name) ?? fallback;
    input.value = input.tagName === "SELECT" && ![...input.options].some(option => option.value === requested) ? fallback : requested;
  }
  if (AREA === "public") els.audience.value = "";
  update();
}

function revealHash() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (!id) return;
  if (!getVisibleItems({ area: AREA }).some(item => item.id === id)) return;
  if (!document.getElementById(id)) {
    for (const name of filterNames) els[name].value = name === "view" ? "all" : "";
    saveFilters();
  }
  document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
}

function init() {
  if (!els.list) return;

  const items = getVisibleItems({ area: AREA });
  populateFilters(items);
  renderPlaceholderBanner();

  els.filters?.addEventListener("submit", event => event.preventDefault());
  els.filters?.addEventListener("change", saveFilters);
  els.filters?.addEventListener("reset", () => requestAnimationFrame(() => { history.replaceState({}, "", location.pathname); update(); }));
  window.addEventListener("popstate", () => { loadFilters(); revealHash(); });
  window.addEventListener("hashchange", revealHash);
  loadFilters();
  revealHash();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
