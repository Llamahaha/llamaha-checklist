// Renders the compact "App Outages, Advisories & Updates" feed on the public
// home page. Reads the shared news data, filters to public + home placement,
// and writes into the placeholder element with id="appNewsHomeList".
//
// Markup contract on index.html:
//   <section class="hub-section appnews-home" aria-labelledby="appNewsHomeTitle">
//     <div class="section-head"> ... </div>
//     <div class="appnews-home-card">
//       <div id="appNewsHomeList" class="appnews-list" data-empty-state="..."></div>
//     </div>
//   </section>

import {
  getHomeItems,
  formatNewsDate,
  severityClass,
  categoryClass,
  audienceClass,
  hasPlaceholders,
  appNewsItems
} from "./appNewsData.js";

const HOME_LIMIT = 5;

function renderEmpty(container) {
  const empty = document.createElement("div");
  empty.className = "appnews-empty";
  empty.textContent =
    container.dataset.emptyState ||
    "No major supported-app outages, service impacts, or security advisories posted right now.";
  container.replaceChildren(empty);
}

function renderRow(item) {
  const row = document.createElement("a");
  row.className = `appnews-row ${severityClass(item.severity)}`;
  row.href = `app-news.html#${encodeURIComponent(item.id)}`;
  row.setAttribute("aria-label", `${item.severity} ${item.category}: ${item.title}`);

  // Severity rail (left accent column for visual scan)
  const rail = document.createElement("span");
  rail.className = "appnews-rail";
  rail.setAttribute("aria-hidden", "true");

  // Body column
  const body = document.createElement("div");
  body.className = "appnews-body";

  const top = document.createElement("div");
  top.className = "appnews-top";

  const badges = document.createElement("span");
  badges.className = "appnews-badges";

  const sev = document.createElement("span");
  sev.className = `appnews-badge appnews-sev ${severityClass(item.severity)}`;
  sev.textContent = item.severity;
  badges.appendChild(sev);

  const cat = document.createElement("span");
  cat.className = `appnews-badge appnews-cat ${categoryClass(item.category)}`;
  cat.textContent = item.category;
  badges.appendChild(cat);

  const vendorBadge = document.createElement("span");
  vendorBadge.className = "appnews-badge appnews-vendor";
  vendorBadge.textContent = item.appName ? `${item.vendor} · ${item.appName}` : item.vendor;
  badges.appendChild(vendorBadge);

  top.appendChild(badges);

  const title = document.createElement("div");
  title.className = "appnews-title";
  title.textContent = item.title;

  const summary = document.createElement("p");
  summary.className = "appnews-summary";
  summary.textContent = item.summary;

  const meta = document.createElement("div");
  meta.className = "appnews-meta";

  const date = document.createElement("span");
  date.className = "appnews-date";
  date.textContent = `Updated ${formatNewsDate(item.lastUpdatedDate || item.publishedDate)}`;
  meta.appendChild(date);

  if (item.audience === "internal") {
    const audBadge = document.createElement("span");
    audBadge.className = `appnews-badge appnews-audience ${audienceClass(item.audience)}`;
    audBadge.textContent = "Internal only";
    meta.appendChild(audBadge);
  }

  if (item.isPlaceholder) {
    const tag = document.createElement("span");
    tag.className = "appnews-placeholder-tag";
    tag.textContent = "Sample";
    meta.appendChild(tag);
  }

  body.append(top, title, summary, meta);

  const arrow = document.createElement("span");
  arrow.className = "appnews-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";

  row.append(rail, body, arrow);
  return row;
}

function renderPlaceholderBanner(card) {
  if (!hasPlaceholders(appNewsItems)) return;
  if (card.querySelector(".appnews-placeholder-banner")) return;

  const banner = document.createElement("p");
  banner.className = "appnews-placeholder-banner";
  banner.textContent =
    "Sample data — the items below are placeholders for layout review. Replace before going live.";
  card.prepend(banner);
}

function init() {
  const list = document.getElementById("appNewsHomeList");
  if (!list) return;

  const items = getHomeItems({ area: "public", limit: HOME_LIMIT });
  if (!items.length) {
    renderEmpty(list);
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of items) {
    fragment.appendChild(renderRow(item));
  }
  list.replaceChildren(fragment);

  const card = list.closest(".appnews-home-card");
  if (card) renderPlaceholderBanner(card);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
