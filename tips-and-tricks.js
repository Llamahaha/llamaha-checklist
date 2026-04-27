import { publicTipsSections } from "./publicPageData.js";
import { createLinks, createList, createPageCard, slugifyText } from "./resourceCommon.js";
import { renderSingleTopicPage } from "./single-topic-page.js";

const tipsSections = document.getElementById("tipsSections");
const pageToc = document.getElementById("pageToc");

function normalizeLinks(links = []) {
  return links.map(link => ({
    ...link,
    external: link.external ?? /^https?:/i.test(link.url)
  }));
}

function buildSearchText(section, item) {
  return [
    section.title,
    section.description,
    item.title,
    item.text,
    ...(item.fixes ?? []),
    ...((item.links ?? []).map(link => `${link.label} ${link.url}`))
  ].filter(Boolean).join(" ");
}

function renderTipContent(item) {
  const stack = document.createElement("div");
  stack.className = "single-topic-stack";

  const steps = item.fixes ?? [];
  if (steps.length) {
    const stepsCard = createPageCard("issue-card single-topic-card");
    stepsCard.append(
      Object.assign(document.createElement("h3"), { textContent: "Steps" }),
      createList(steps)
    );
    stack.appendChild(stepsCard);
  }

  const links = normalizeLinks(item.links);
  if (links.length) {
    const linkCard = createPageCard("issue-card single-topic-card");
    linkCard.append(
      Object.assign(document.createElement("h3"), { textContent: "Related Guides" }),
      createLinks(links)
    );
    stack.appendChild(linkCard);
  }

  return stack;
}

const topics = publicTipsSections.flatMap(section =>
  section.items.map(item => ({
    id: slugifyText(item.title),
    title: item.title,
    meta: section.title,
    kicker: "Tips & Tricks",
    summary: item.text,
    searchText: buildSearchText(section, item),
    renderContent: () => renderTipContent(item)
  }))
);

renderSingleTopicPage({
  tocContainer: pageToc,
  contentContainer: tipsSections,
  title: "Tips & Tricks topics",
  description: "Search or choose one shortcut, cleanup, browser, file, meeting, phone, or troubleshooting habit. The page shows one tip at a time.",
  searchPlaceholder: "Search tips",
  searchLabel: "Search Tips and Tricks topics on this page",
  emptyText: "No Tips & Tricks topics matched that search.",
  topics
});
