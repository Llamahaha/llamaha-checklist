import { matrixResource, microsoftIssueSections } from "./supportData.js";
import { createLinks, createList, createPageCard } from "./resourceCommon.js";

const issueSections = document.getElementById("issueSections");
const matrixAction = document.getElementById("matrixAction");

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

  microsoftIssueSections.forEach(section => {
    const wrapper = document.createElement("section");
    wrapper.className = "results-card hub-section";

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
}

renderMatrixAction();
renderSections();
