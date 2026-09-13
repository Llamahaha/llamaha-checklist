import { getRecentReviews, getReviewLabel } from "./contentReviews.js";

const list = document.getElementById("recentGuidesList");
if (list) {
  const fragment = document.createDocumentFragment();
  for (const record of getRecentReviews()) {
    const row = document.createElement("a");
    row.className = "recent-row";
    row.href = `${record.route}.html`;
    const tag = document.createElement("span");
    tag.className = "recent-tag is-app";
    tag.textContent = record.route.startsWith("guides/") ? "Guide" : "Article";
    const copy = document.createElement("div");
    const title = document.createElement("div");
    title.className = "recent-title";
    title.textContent = record.title;
    const date = document.createElement("span");
    date.className = "recent-meta";
    date.textContent = getReviewLabel(record);
    copy.append(title, date);
    row.append(tag, copy);
    fragment.append(row);
  }
  list.replaceChildren(fragment);
}
