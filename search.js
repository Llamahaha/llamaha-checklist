import { buildSearchIndex } from "./searchIndex.js";
import { publicizeText } from "./resourceCommon.js";
import { findSearchResults, prepareSearchIndex } from "./searchMatching.js";

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const category = document.getElementById("searchCategory");
const label = document.getElementById("resultsLabel");
const count = document.getElementById("resultCount");
const results = document.getElementById("searchResults");
const more = document.getElementById("searchMore");
const index = prepareSearchIndex(buildSearchIndex());
const PAGE_SIZE = 40;
let matches = [];
let shown = 0;

function appendResults(focusNew = false) {
  const fragment = document.createDocumentFragment();
  let firstLink;
  for (const item of matches.slice(shown, shown + PAGE_SIZE)) {
    const card = document.createElement("article");
    card.className = "search-result";
    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = publicizeText(item.title);
    if (/^https?:/.test(item.url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    firstLink ??= link;
    title.append(link);
    const meta = document.createElement("p");
    meta.className = "result-meta";
    meta.textContent = publicizeText(item.typeLabel);
    const text = document.createElement("p");
    text.textContent = publicizeText(item.text);
    card.append(meta, title, text);
    fragment.append(card);
  }
  results.append(fragment);
  shown = Math.min(matches.length, shown + PAGE_SIZE);
  count.textContent = `Showing ${shown} of ${matches.length} result${matches.length === 1 ? "" : "s"}`;
  more.hidden = shown >= matches.length;
  if (focusNew) firstLink?.focus();
}

function render() {
  const query = input.value.trim();
  results.replaceChildren();
  shown = 0;
  more.hidden = true;
  if (!query) {
    label.textContent = "Search help";
    count.textContent = "";
    return;
  }
  matches = findSearchResults(index, query, category.value);
  label.textContent = `Results for "${query}"`;
  appendResults();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.textContent = "No matching guides. Try the app name or contact IT for help.";
    const contact = document.createElement("a");
    contact.href = "contact.html";
    contact.textContent = "Contact IT";
    results.append(empty, contact);
  }
}

function syncFromUrl() {
  const params = new URLSearchParams(window.location.search);
  input.value = params.get("q") ?? "";
  const requestedCategory = params.get("category") ?? "all";
  category.value = [...category.options].some(option => option.value === requestedCategory) ? requestedCategory : "all";
  render();
}

function search() {
  const params = new URLSearchParams();
  if (input.value.trim()) params.set("q", input.value.trim());
  if (category.value !== "all") params.set("category", category.value);
  const url = `${window.location.pathname}${params.size ? `?${params}` : ""}`;
  if (url !== `${window.location.pathname}${window.location.search}`) window.history.pushState({}, "", url);
  render();
}

form.addEventListener("submit", event => { event.preventDefault(); search(); });
category.addEventListener("change", search);
more.addEventListener("click", () => appendResults(true));
window.addEventListener("popstate", syncFromUrl);
syncFromUrl();
