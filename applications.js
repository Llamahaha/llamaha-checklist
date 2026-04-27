import { publicAppHelpSections } from "./publicPageData.js";
import { createLinks, createPageCard, slugifyText } from "./resourceCommon.js";
import { renderSingleTopicPage } from "./single-topic-page.js";

const appSections = document.getElementById("appSections") ?? document.getElementById("appHelpSections");
const pageToc = document.getElementById("pageToc");

function normalizeLinks(links = []) {
  return links.map(link => ({
    ...link,
    external: link.external ?? /^https?:/i.test(link.url)
  }));
}

function searchableText(values) {
  return values.flat(Infinity).filter(Boolean).join(" ");
}

function topicIdFor(entry) {
  return slugifyText(`${entry.vendorSlug}-${entry.appSlug}`);
}

function addTopic(topicMap, section, group, entry) {
  const id = topicIdFor(entry);
  const existing = topicMap.get(id);
  const foundIn = [section.title, group.title].filter(Boolean).join(" / ");

  if (existing) {
    existing.searchText = searchableText([existing.searchText, section.title, group.title, group.description]);
    if (!existing.foundIn.includes(foundIn)) {
      existing.foundIn.push(foundIn);
    }
    return;
  }

  topicMap.set(id, {
    id,
    title: entry.name,
    meta: entry.vendorTitle,
    kicker: "App Guide",
    summary: entry.summary,
    foundIn: [foundIn],
    entry,
    group,
    searchText: searchableText([
      section.title,
      section.description,
      group.title,
      group.description,
      entry.vendorTitle,
      entry.name,
      entry.summary,
      entry.keywords
    ]),
    renderContent: topic => renderAppContent(topic)
  });
}

function renderAppContent(topic) {
  const { entry, foundIn } = topic;
  const stack = document.createElement("div");
  stack.className = "single-topic-stack";

  const nextStep = createPageCard("issue-card single-topic-card");
  nextStep.append(
    Object.assign(document.createElement("h3"), { textContent: "Open This Guide" }),
    Object.assign(document.createElement("p"), {
      textContent: "Use the exact product guide for setup notes, common issues, access details, and what support needs from you."
    }),
    createLinks(normalizeLinks([
      { label: `Open ${entry.name} guide`, url: entry.url },
      { label: `${entry.vendorTitle} overview`, url: `guides/${entry.vendorSlug}.html` }
    ]))
  );

  const context = createPageCard("issue-card single-topic-card");
  context.append(
    Object.assign(document.createElement("h3"), { textContent: "Where It Fits" }),
    Object.assign(document.createElement("p"), {
      textContent: foundIn.join("; ")
    })
  );

  const vendorLinks = normalizeLinks(topic.group.links ?? []);
  if (vendorLinks.length) {
    context.appendChild(createLinks(vendorLinks));
  }

  stack.append(nextStep, context);
  return stack;
}

function buildTopics() {
  const topicMap = new Map();
  publicAppHelpSections.forEach(section => {
    section.groups.forEach(group => {
      group.entries.forEach(entry => {
        addTopic(topicMap, section, group, entry);
      });
    });
  });
  return Array.from(topicMap.values());
}

renderSingleTopicPage({
  tocContainer: pageToc,
  contentContainer: appSections,
  title: "Application guide topics",
  description: "Search or choose the exact product your design team uses. The page shows one application guide topic at a time.",
  searchPlaceholder: "Search application guides",
  searchLabel: "Search application guide topics on this page",
  emptyText: "No application guides matched that search.",
  topics: buildTopics()
});
