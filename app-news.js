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
  populateOptions(els.vendor, vendors);

  populateOptions(els.category, APP_NEWS_CATEGORIES);
  populateOptions(els.severity, APP_NEWS_SEVERITIES);

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
    dateTo: els.dateTo?.value || ""
  };
}

function matchesFilters(item, f) {
  if (f.vendor && item.vendor !== f.vendor) return false;
  if (f.category && item.category !== f.category) return false;
  if (f.severity && item.severity !== f.severity) return false;
  if (f.audience && item.audience !== f.audience) return false;
  const date = item.publishedDate || "";
  if (f.dateFrom && date && date < f.dateFrom) return false;
  if (f.dateTo && date && date > f.dateTo) return false;
  return true;
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
    makeBadge(`appnews-badge appnews-audience ${audienceClass(item.audience)}`,
      item.audience === "internal" ? "Internal" : "Public")
  );
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

  if (item.recommendedMspAction) {
    const dt = document.createElement("dt");
    dt.textContent = "Recommended action";
    const dd = document.createElement("dd");
    dd.textContent = item.recommendedMspAction;
    detailGrid.append(dt, dd);
  }

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
  if (detailGrid.children.length) body.appendChild(detailGrid);
  body.appendChild(meta);

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
  const matched = baseItems.filter(item => matchesFilters(item, filters)).sort(sortByPublishedDesc);

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

  // Anchor scroll if URL has #id
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function init() {
  if (!els.list) return;

  const items = getVisibleItems({ area: AREA });
  populateFilters(items);
  renderPlaceholderBanner();

  els.filters?.addEventListener("change", update);
  els.filters?.addEventListener("reset", () => requestAnimationFrame(update));

  update();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
