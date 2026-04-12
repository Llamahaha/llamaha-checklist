import { snippetLibrary } from "./operationsData.js";
import { copyTextToClipboard, createPageCard, renderPageToc, slugifyText } from "./resourceCommon.js";

const snippetSections = document.getElementById("snippetSections");
const pageToc = document.getElementById("pageToc");
const tocItems = [];

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
  grid.className = "issue-grid";

  group.snippets.forEach(snippet => {
    const card = createPageCard();

    const heading = document.createElement("h3");
    heading.textContent = snippet.title;

    const shell = document.createElement("p");
    shell.className = "result-meta";
    shell.textContent = `Shell: ${snippet.shell}`;

    const notes = document.createElement("p");
    notes.textContent = snippet.notes;

    const command = document.createElement("pre");
    command.className = "snippet-command";
    command.textContent = snippet.command;

    const caution = document.createElement("p");
    caution.textContent = `Caution: ${snippet.caution}`;

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "secondary-btn compact-btn";
    copy.textContent = "Copy Command";
    copy.addEventListener("click", async () => {
      await copyTextToClipboard(snippet.command);
      copy.textContent = "Copied";
      window.setTimeout(() => {
        copy.textContent = "Copy Command";
      }, 1500);
    });

    card.append(heading, shell, notes, command, caution, copy);
    grid.appendChild(card);
  });

  section.append(header, grid);
  snippetSections.appendChild(section);
});

renderPageToc(pageToc, tocItems, {
  title: "Jump to a section",
  description: "Use these quick links to move between the snippet categories on this page."
});
