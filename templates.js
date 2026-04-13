import { handoffTemplateGroups } from "./resourceLibrary.js";
import { copyTextToClipboard, createPageCard, renderPageToc, slugifyText } from "./resourceCommon.js";

const templateSections = document.getElementById("templateSections");
const pageToc = document.getElementById("pageToc");
const tocItems = [];

function createMetaBlock(title, text) {
  const block = document.createElement("div");
  block.className = "card-block";
  const heading = document.createElement("h4");
  heading.textContent = title;
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  block.append(heading, paragraph);
  return block;
}

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

    const badges = document.createElement("div");
    badges.className = "resource-badges";

    const audience = document.createElement("span");
    audience.className = "resource-badge is-accent";
    audience.textContent = template.audience;

    const category = document.createElement("span");
    category.className = "resource-badge";
    category.textContent = group.category;

    badges.append(audience, category);

    const stack = document.createElement("div");
    stack.className = "card-stack";
    stack.append(
      createMetaBlock("When To Use It", template.useCase),
      createMetaBlock("Fill-In Placeholders", template.placeholders.join(" | "))
    );

    if (template.relatedGuides?.length) {
      const related = document.createElement("div");
      related.className = "vendor-links";
      template.relatedGuides.forEach(item => {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.label;
        related.appendChild(link);
      });
      stack.appendChild(createMetaBlock("Related Guides", "Open the linked guide if you need the operational context behind this message."));
      stack.appendChild(related);
    }

    const templateBody = document.createElement("pre");
    templateBody.className = "template-text";
    templateBody.textContent = template.template;

    const actions = document.createElement("div");
    actions.className = "inline-actions";

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "secondary-btn compact-btn";
    copy.textContent = "Copy template";
    copy.addEventListener("click", async () => {
      await copyTextToClipboard(template.template);
      copy.textContent = "Copied";
      window.setTimeout(() => {
        copy.textContent = "Copy template";
      }, 1500);
    });
    actions.appendChild(copy);

    card.append(heading, badges, stack, templateBody, actions);
    grid.appendChild(card);
  });

  section.append(header, grid);
  templateSections.appendChild(section);
});

renderPageToc(pageToc, tocItems, {
  title: "Jump to a template category",
  description: "Use these quick links to move between grouped customer-facing and internal MSP templates."
});
