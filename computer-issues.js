import { publicPcHelpSections } from "./publicPageData.js";
import { createLinks, createList, createPageCard, slugifyText } from "./resourceCommon.js";
import { renderSingleTopicPage } from "./single-topic-page.js";

const issueSections = document.getElementById("issueSections");
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

function renderIssueContent(item) {
  const stack = document.createElement("div");
  stack.className = "single-topic-stack";

  const fixes = item.fixes ?? [];
  if (fixes.length) {
    const fixCard = createPageCard("issue-card single-topic-card");
    fixCard.append(
      Object.assign(document.createElement("h3"), { textContent: "Try This First" }),
      createList(fixes)
    );
    stack.appendChild(fixCard);
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

const topics = publicPcHelpSections.flatMap(section =>
  section.items.map(item => ({
    id: slugifyText(item.title),
    title: item.title,
    meta: section.title,
    kicker: "PC Help",
    summary: item.text,
    searchText: buildSearchText(section, item),
    renderContent: () => renderIssueContent(item)
  }))
);

renderSingleTopicPage({
  tocContainer: pageToc,
  contentContainer: issueSections,
  title: "PC Help topics",
  description: "Search or choose one workstation, Cloud PC, network, printer, scanner, storage, browser, MFA, or setup topic. The page shows one help article at a time.",
  searchPlaceholder: "Search PC Help topics",
  searchLabel: "Search PC Help topics on this page",
  emptyText: "No PC Help topics matched that search.",
  topics
});
