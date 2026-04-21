import { decisionTrees } from "./operationsData.js";
import { createList } from "./resourceCommon.js";

const treeList = document.getElementById("treeList");
const decisionStage = document.getElementById("decisionStage");

let activeTree = decisionTrees[0] ?? null;
let currentNodeId = activeTree?.start ?? "";
let path = [];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function setActiveTree(tree) {
  activeTree = tree;
  currentNodeId = tree.start;
  path = [];
  renderTreeList();
  renderCurrentNode();
}

function renderTreeList() {
  if (!treeList) {
    return;
  }

  treeList.innerHTML = "";
  decisionTrees.forEach(tree => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary-btn tree-select";
    if (tree.id === activeTree?.id) {
      button.classList.add("is-active");
    }
    button.textContent = tree.title;
    button.addEventListener("click", () => setActiveTree(tree));
    treeList.appendChild(button);
  });
}

function renderPath() {
  if (!path.length) {
    return el("p", "tree-path", "Start");
  }

  return el("p", "tree-path", `Path: ${path.join(" > ")}`);
}

function renderResolution(node) {
  const content = el("div", "decision-content");
  content.append(
    el("p", "section-kicker", "Resolution Path"),
    el("h3", "", node.title),
    createList(node.body ?? [])
  );

  const actions = el("div", "inline-actions");
  const restart = document.createElement("button");
  restart.type = "button";
  restart.className = "secondary-btn";
  restart.textContent = "Restart this tree";
  restart.addEventListener("click", () => {
    currentNodeId = activeTree.start;
    path = [];
    renderCurrentNode();
  });
  actions.appendChild(restart);
  content.appendChild(actions);
  return content;
}

function renderQuestion(node) {
  const content = el("div", "decision-content");
  content.append(
    el("p", "section-kicker", "Question"),
    el("h3", "", node.prompt)
  );

  const options = el("div", "decision-options");
  node.answers.forEach(answer => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "primary-btn";
    button.textContent = answer.label;
    button.addEventListener("click", () => {
      path.push(answer.label);
      currentNodeId = answer.next;
      renderCurrentNode();
    });
    options.appendChild(button);
  });

  content.appendChild(options);
  return content;
}

function renderCurrentNode() {
  if (!decisionStage) {
    return;
  }

  decisionStage.innerHTML = "";

  if (!activeTree) {
    decisionStage.appendChild(el("p", "empty-state", "No decision trees are available."));
    return;
  }

  const node = activeTree.nodes[currentNodeId];
  const header = el("div", "decision-content");
  header.append(
    el("p", "section-kicker", "Guided Triage"),
    el("h2", "", activeTree.title),
    el("p", "hub-section-copy", activeTree.summary)
  );

  decisionStage.append(header, renderPath());

  if (!node) {
    decisionStage.appendChild(el("p", "empty-state", "This decision-tree step could not be found."));
    return;
  }

  decisionStage.appendChild(node.type === "question" ? renderQuestion(node) : renderResolution(node));
}

renderTreeList();
renderCurrentNode();
