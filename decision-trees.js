import { decisionTrees } from "./operationsData.js";

const treeList = document.getElementById("treeList");
const treeHeader = document.getElementById("treeHeader");
const treePath = document.getElementById("treePath");
const treeContent = document.getElementById("treeContent");

const treeById = new Map(decisionTrees.map(tree => [tree.id, tree]));

let activeTree = decisionTrees[0];
let activeNodeId = activeTree.start;
let pathHistory = [];

function renderTreeList() {
  treeList.innerHTML = "";

  decisionTrees.forEach(tree => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `secondary-btn tree-select${tree.id === activeTree.id ? " is-active" : ""}`;
    button.textContent = tree.title;
    button.addEventListener("click", () => {
      activeTree = tree;
      activeNodeId = tree.start;
      pathHistory = [];
      renderActiveTree();
    });
    treeList.appendChild(button);
  });
}

function renderActiveTree() {
  const node = activeTree.nodes[activeNodeId];
  treeHeader.innerHTML = "";
  treeContent.innerHTML = "";
  treePath.innerHTML = "";

  const headingWrap = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Decision Tree";
  const title = document.createElement("h2");
  title.textContent = activeTree.title;
  const summary = document.createElement("p");
  summary.className = "hub-section-copy";
  summary.textContent = activeTree.summary;
  headingWrap.append(kicker, title, summary);
  treeHeader.appendChild(headingWrap);

  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "secondary-btn compact-btn";
  reset.textContent = "Restart tree";
  reset.addEventListener("click", () => {
    activeNodeId = activeTree.start;
    pathHistory = [];
    renderActiveTree();
  });
  treeHeader.appendChild(reset);
  window.history.replaceState({}, "", `#${activeTree.id}`);
  renderTreeList();

  if (pathHistory.length) {
    treePath.textContent = `Path: ${pathHistory.join(" > ")}`;
  }

  if (node.type === "question") {
    const prompt = document.createElement("h3");
    prompt.textContent = node.prompt;
    treeContent.appendChild(prompt);

    const answers = document.createElement("div");
    answers.className = "decision-options";

    node.answers.forEach(answer => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "primary-btn";
      button.textContent = answer.label;
      button.addEventListener("click", () => {
        pathHistory = [...pathHistory, answer.label];
        activeNodeId = answer.next;
        renderActiveTree();
      });
      answers.appendChild(button);
    });

    treeContent.appendChild(answers);
  }

  if (node.type === "resolution") {
    const titleEl = document.createElement("h3");
    titleEl.textContent = node.title;

    const list = document.createElement("ul");
    node.body.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    treeContent.append(titleEl, list);
  }
}

function syncTreeFromHash() {
  const id = window.location.hash.replace("#", "");
  const tree = treeById.get(id);

  if (!tree) {
    return;
  }

  activeTree = tree;
  activeNodeId = tree.start;
  pathHistory = [];
}

window.addEventListener("hashchange", () => {
  syncTreeFromHash();
  renderActiveTree();
});

syncTreeFromHash();
renderActiveTree();
