import { handoffTemplates } from "./operationsData.js";
import { copyTextToClipboard, createPageCard } from "./resourceCommon.js";

const templateGrid = document.getElementById("templateGrid");

handoffTemplates.forEach(template => {
  const card = createPageCard("vendor-card");
  card.id = template.id;

  const title = document.createElement("h3");
  title.textContent = template.title;

  const summary = document.createElement("p");
  summary.textContent = `${template.audience} | ${template.useCase}`;

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

  card.append(title, summary, block, copy);
  templateGrid.appendChild(card);
});
