import { emergencyPlaybooks } from "./operationsData.js";
import { appendBlock, createPageCard } from "./resourceCommon.js";

const playbookGrid = document.getElementById("playbookGrid");

emergencyPlaybooks.forEach(playbook => {
  const card = createPageCard("vendor-card");
  card.id = playbook.id;

  const title = document.createElement("h3");
  title.textContent = playbook.title;

  const summary = document.createElement("p");
  summary.textContent = `Severity: ${playbook.severity}. Triggers: ${playbook.triggers.join(", ")}`;

  const stack = document.createElement("div");
  stack.className = "card-stack";
  appendBlock(stack, "First 15 Minutes", playbook.first15);
  appendBlock(stack, "Containment", playbook.containment);
  appendBlock(stack, "Communication", playbook.communication);
  appendBlock(stack, "Verify Before Close", playbook.verify);

  card.append(title, summary, stack);
  playbookGrid.appendChild(card);
});
