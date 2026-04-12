import { handoffTemplateGroups } from "./resourceLibrary.js";
import { copyTextToClipboard, createPageCard, renderPageToc, slugifyText } from "./resourceCommon.js";

const templateSections = document.getElementById("templateSections");
const pageToc = document.getElementById("pageToc");
const tocItems = [];

handoffTemplateGroups.forEach(group => {
  const section = document.createElement("section");
  section.className = "results-card hub-section";
  section.id = slugifyText(group.category);
  tocItems.push({ id: section.id, label: group.category });

  const header = document.createElement("div");
  header.className = "results-header";
  const headerBody = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Template Category";
  const title = document.createElement("h2");
  title.textContent = group.category;
  headerBody.append(kicker, title);
  header.appendChild(headerBody);

  const grid = document.createElement("div");
  grid.className = "vendor-directory";

  group.templates.forEach(template => {
    const card = createPageCard("vendor-card");
    card.id = template.id;

    const heading = document.createElement("h3");
    heading.textContent = template.title;

    const meta = document.createElement("p");
    meta.className = "result-meta";
    meta.textContent = `${template.audience} | ${template.useCase}`;

    const block = document.createElement("pre");
    block.className = "template-text";
    block.textContent = template.template;

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "secondary-btn compact-btn";
    copy.textContent = "Copy template";
    copy.addEventListener("click", async () => {
      await copyTextToClipboard(template.template);
      copy.textContent = "Copied";
      window.setTimeout(() => {
        copy.textContent = "Copy template";
      }, 1600);
    });

    card.append(heading, meta, block, copy);
    grid.appendChild(card);
  });

  section.append(header, grid);
  templateSections.appendChild(section);
});

renderPageToc(pageToc, tocItems, {
  title: "Jump to a template category",
  description: "Use these quick links to move between the customer-facing and internal templates by use case."
});
