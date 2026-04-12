import { snippetLibrary } from "./resourceLibrary.js";
import { copyTextToClipboard, createPageCard, renderPageToc, slugifyText } from "./resourceCommon.js";

const snippetSections = document.getElementById("snippetSections");
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

snippetLibrary.forEach(group => {
  const section = document.createElement("section");
  section.className = "results-card hub-section";
  section.id = slugifyText(group.category);
  tocItems.push({ id: section.id, label: group.category });

  const header = document.createElement("div");
  header.className = "results-header";
  const headerBody = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Snippet Category";
  const title = document.createElement("h2");
  title.textContent = group.category;
  headerBody.append(kicker, title);
  header.appendChild(headerBody);

  const grid = document.createElement("div");
  grid.className = "vendor-directory";

  group.snippets.forEach(snippet => {
    const card = createPageCard("vendor-card");
    card.id = snippet.id;

    const heading = document.createElement("h3");
    heading.textContent = snippet.title;

    const stack = document.createElement("div");
    stack.className = "card-stack";
    stack.append(
      createMetaBlock("Purpose", snippet.purpose),
      createMetaBlock("When To Use It", snippet.whenToUse),
      createMetaBlock("Prerequisites", snippet.prerequisites.join(" | ")),
      createMetaBlock("Expected Result", snippet.expectedResult),
      createMetaBlock("Caution / Rollback Notes", snippet.caution)
    );

    const command = document.createElement("pre");
    command.className = "snippet-command";
    command.textContent = snippet.command;

    const actions = document.createElement("div");
    actions.className = "inline-actions";

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "secondary-btn compact-btn";
    copy.textContent = "Copy snippet";
    copy.addEventListener("click", async () => {
      await copyTextToClipboard(snippet.command);
      copy.textContent = "Copied";
      window.setTimeout(() => {
        copy.textContent = "Copy snippet";
      }, 1500);
    });
    actions.appendChild(copy);

    if (snippet.relatedGuides?.length) {
      const related = document.createElement("div");
      related.className = "vendor-links";
      snippet.relatedGuides.forEach(item => {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.label;
        related.appendChild(link);
      });
      stack.appendChild(createMetaBlock("Related Guides", "Open the linked guides below for deeper workflow context."));
      stack.appendChild(related);
    }

    card.append(heading, stack, command, actions);
    grid.appendChild(card);
  });

  section.append(header, grid);
  snippetSections.appendChild(section);
});

renderPageToc(pageToc, tocItems, {
  title: "Jump to a snippet category",
  description: "Use these quick links to move between the grouped MSP-ready snippets on this page."
});
