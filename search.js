import { buildSearchIndex } from "./searchIndex.js";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");
const resultsLabel = document.getElementById("resultsLabel");
const resultCount = document.getElementById("resultCount");
const searchResults = document.getElementById("searchResults");

const index = buildSearchIndex();

function scoreResult(item, query) {
  const haystack = `${item.title} ${item.text} ${item.keywords}`.toLowerCase();
  const title = item.title.toLowerCase();
  let score = 0;

  if (title.includes(query)) score += 6;
  if (haystack.includes(query)) score += 3;

  query.split(/\s+/).filter(Boolean).forEach(term => {
    if (title.includes(term)) score += 3;
    if (haystack.includes(term)) score += 1;
  });

  return score;
}

function renderResults(query = "", category = "all") {
  searchResults.innerHTML = "";
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    resultsLabel.textContent = "Start with a search term";
    resultCount.textContent = "Try a product name, vendor, or help topic.";
    return;
  }

  const matches = index
    .filter(item => category === "all" || item.category === category)
    .map(item => ({ ...item, score: scoreResult(item, normalizedQuery) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  resultsLabel.textContent = `Results for \"${query}\"`;
  resultCount.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"} found`;

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No matching guide or help page was found. Try a broader app name, vendor, or help topic.";
    searchResults.appendChild(empty);
    return;
  }

  matches.slice(0, 40).forEach(item => {
    const card = document.createElement("article");
    card.className = "issue-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const meta = document.createElement("p");
    meta.className = "result-meta";
    meta.textContent = item.typeLabel;

    const text = document.createElement("p");
    text.textContent = item.text;

    const link = document.createElement("a");
    link.className = "hub-link";
    link.href = item.url;
    link.textContent = "Open result";
    if (item.url.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    card.append(title, meta, text, link);
    searchResults.appendChild(card);
  });
}

function syncFromQueryString() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  searchInput.value = query;
  searchCategory.value = category;
  renderResults(query, category);
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  const query = searchInput.value.trim();
  const category = searchCategory.value;
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category !== "all") params.set("category", category);
  window.history.replaceState({}, "", `${window.location.pathname}${params.toString() ? `?${params}` : ""}`);
  renderResults(query, category);
});

syncFromQueryString();
