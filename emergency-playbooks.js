import { decisionTrees, emergencyPlaybooks, servicePlaybooks } from "./operationsData.js";
import { appendBlock, createPageCard } from "./resourceCommon.js";
import { activatePageTabs, activateSectionSearch } from "./sectionTabs.js";

const playbookGrid = document.getElementById("playbookGrid");
const guidedTriageGrid = document.getElementById("guidedTriageGrid");
const servicePlaybookGrid = document.getElementById("servicePlaybookGrid");

function renderEmergencyPlaybook(playbook, container) {
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
  container.appendChild(card);
}

function renderGuidedTriage(tree, container) {
  const card = createPageCard("vendor-card");
  card.id = `triage-${tree.id}`;

  const title = document.createElement("h3");
  title.textContent = tree.title;

  const summary = document.createElement("p");
  summary.textContent = tree.summary;

  const stack = document.createElement("div");
  stack.className = "card-stack";

  const startNode = tree.nodes[tree.start];
  const questionNodes = Object.values(tree.nodes).filter(node => node.type === "question");
  const resolutionNodes = Object.values(tree.nodes).filter(node => node.type === "resolution");

  if (startNode?.prompt) {
    appendBlock(stack, "Start With", [
      startNode.prompt,
      ...(startNode.answers ?? []).map(answer => `If ${answer.label.toLowerCase()}: follow the ${answer.next.replace(/_/g, " ")} path.`)
    ]);
  }

  appendBlock(stack, "Ask Next", questionNodes
    .filter(node => node !== startNode)
    .map(node => node.prompt)
    .slice(0, 4));

  appendBlock(stack, "Likely Outcomes", resolutionNodes
    .map(node => `${node.title}: ${node.body[0]}`)
    .slice(0, 5));

  card.append(title, summary, stack);
  container.appendChild(card);
}

function renderServicePlaybook(playbook, container) {
  const card = createPageCard("vendor-card");
  card.id = playbook.id;

  const title = document.createElement("h3");
  title.textContent = playbook.title;

  const summary = document.createElement("p");
  summary.textContent = playbook.summary;

  const stack = document.createElement("div");
  stack.className = "card-stack";
  appendBlock(stack, "When To Use It", playbook.whenToUse);
  appendBlock(stack, "Assess First", playbook.assess);
  appendBlock(stack, "Do This", playbook.steps);
  appendBlock(stack, "Collect", playbook.collect);
  appendBlock(stack, "Verify Before Close", playbook.verify);

  card.append(title, summary, stack);

  if (playbook.relatedLinks?.length) {
    const links = document.createElement("div");
    links.className = "vendor-links";
    playbook.relatedLinks.forEach(item => {
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.label;
      if (/^https?:/i.test(item.url)) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      links.appendChild(link);
    });
    card.appendChild(links);
  }

  container.appendChild(card);
}

emergencyPlaybooks.forEach(playbook => {
  if (playbookGrid) {
    renderEmergencyPlaybook(playbook, playbookGrid);
  }
});

servicePlaybooks.forEach(playbook => {
  if (servicePlaybookGrid) {
    renderServicePlaybook(playbook, servicePlaybookGrid);
  }
});

decisionTrees.forEach(tree => {
  if (guidedTriageGrid) {
    renderGuidedTriage(tree, guidedTriageGrid);
  }
});

const tabs = activatePageTabs();
activateSectionSearch(tabs);
