import { internalTipsAndTricksSections } from "./internalContent.js";
import { internalTipsAndTricksExtraSections } from "./internalContentExtra.js";
import { createLinks, createList, createPageCard, renderPageToc, slugifyText } from "./resourceCommon.js";
import { activatePageTabs, activateSectionSearch } from "./sectionTabs.js";

const tipsSections = document.getElementById("tipsSections");
const pageToc = document.getElementById("pageToc");

function renderSections() {
  if (!tipsSections) {
    return;
  }

  const tocItems = [];

  [...internalTipsAndTricksSections, ...internalTipsAndTricksExtraSections].forEach(section => {
    const wrapper = document.createElement("section");
    wrapper.className = "results-card hub-section";
    wrapper.id = slugifyText(section.title);
    tocItems.push({ id: wrapper.id, label: section.title });

    const heading = document.createElement("div");
    heading.className = "results-header";

    const headingInner = document.createElement("div");
    const kicker = document.createElement("p");
    kicker.className = "section-kicker";
    kicker.textContent = "Internal Tips";

    const title = document.createElement("h2");
    title.textContent = section.title;

    headingInner.append(kicker, title);
    heading.appendChild(headingInner);

    const copy = document.createElement("p");
    copy.className = "hub-section-copy";
    copy.textContent = section.description;

    const grid = document.createElement("div");
    grid.className = "issue-grid";

    section.items.forEach(item => {
      const card = createPageCard();
      const itemTitle = document.createElement("h3");
      itemTitle.textContent = item.title;

      const text = document.createElement("p");
      text.textContent = item.text;

      const steps = createList(item.fixes);
      const links = createLinks(
        item.links.map(link => ({
          ...link,
          external: link.external ?? /^https?:/i.test(link.url)
        }))
      );

      card.append(itemTitle, text, steps, links);
      grid.appendChild(card);
    });

    wrapper.append(heading, copy, grid);
    tipsSections.appendChild(wrapper);
  });

  renderPageToc(pageToc, tocItems, {
    title: "Pick an internal tips section",
    description: "Only the section you pick is shown on the page. Switch any time.",
    searchPlaceholder: "Search tips sections"
  });
}

renderSections();
const tabs = activatePageTabs();
activateSectionSearch(tabs);
