import { matrixResource, microsoftIssueSections } from "./supportData.js";
import { createLinks, createList, createPageCard, renderPageToc, slugifyText } from "./resourceCommon.js";

const issueSections = document.getElementById("issueSections");
const matrixAction = document.getElementById("matrixAction");
const pageToc = document.getElementById("pageToc");

function renderMatrixAction() {
  if (!matrixAction) {
    return;
  }

  const links = createLinks([
    {
      label: "Open M365 Maps Matrix",
      url: matrixResource.url,
      external: true
    }
  ]);

  matrixAction.appendChild(links);
}

function renderSections() {
  if (!issueSections) {
    return;
  }

  const tocItems = [];

  microsoftIssueSections.forEach(section => {
    const wrapper = document.createElement("section");
    wrapper.className = "results-card hub-section";
    wrapper.id = slugifyText(section.title);
    tocItems.push({ id: wrapper.id, label: section.title });

    const heading = document.createElement("div");
    heading.className = "results-header";

    const headingInner = document.createElement("div");
    const kicker = document.createElement("p");
    kicker.className = "section-kicker";
    kicker.textContent = "Microsoft Issues";

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

      const fixes = createList(item.fixes);
      const links = createLinks(
        item.links.map(link => ({
          ...link,
          external: true
        }))
      );

      card.append(itemTitle, text, fixes, links);
      grid.appendChild(card);
    });

    wrapper.append(heading, copy, grid);
    issueSections.appendChild(wrapper);
  });

  renderPageToc(pageToc, tocItems, {
    title: "Jump to a section",
    description: "Use these quick links to move between the Microsoft issue groups on this page."
  });
}

renderMatrixAction();
renderSections();
