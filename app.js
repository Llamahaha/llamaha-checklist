import { categoryMeta, taskLibrary } from "./data/taskLibrary.js";

const form = document.getElementById("generatorForm");
const output = document.getElementById("output");
const emptyState = document.getElementById("emptyState");
const resultsTitle = document.getElementById("resultsTitle");
const summaryChips = document.getElementById("summaryChips");
const copyBtn = document.getElementById("copyBtn");
const printBtn = document.getElementById("printBtn");

let lastGeneratedChecklist = [];
let lastGeneratedOptions = null;

const labelMap = {
  onboarding: "Onboarding",
  offboarding: "Offboarding",
  cloud: "Cloud",
  hybrid: "Hybrid",
  onprem: "On-Prem",
  standard: "Standard",
  privileged: "Privileged"
};

function getFormOptions() {
  const formData = new FormData(form);
  const selectedSystems = formData.getAll("systems");

  return {
    type: formData.get("type"),
    environment: formData.get("environment"),
    accessProfile: formData.get("accessProfile"),
    includeManagerTasks: formData.get("includeManagerTasks") === "on",
    includeAssetTasks: formData.get("includeAssetTasks") === "on",
    systems: selectedSystems
  };
}

function taskMatchesFilters(task, options) {
  const { conditions = {} } = task;
  const systemMatch = task.systems.some(system => options.systems.includes(system));

  if (!systemMatch) {
    return false;
  }

  if (task.type !== options.type) {
    return false;
  }

  if (conditions.environment && !conditions.environment.includes(options.environment)) {
    return false;
  }

  if (conditions.accessProfile && !conditions.accessProfile.includes(options.accessProfile)) {
    return false;
  }

  if (conditions.includeManagerTasks && !options.includeManagerTasks) {
    return false;
  }

  if (conditions.includeAssetTasks && !options.includeAssetTasks) {
    return false;
  }

  return true;
}

function generateChecklist(options) {
  return taskLibrary
    .filter(task => taskMatchesFilters(task, options))
    .sort((a, b) => a.priority - b.priority);
}

function groupTasks(tasks) {
  return tasks.reduce((groups, task) => {
    if (!groups[task.category]) {
      groups[task.category] = [];
    }

    groups[task.category].push(task);
    return groups;
  }, {});
}

function titleCase(value) {
  return labelMap[value] ?? (value.charAt(0).toUpperCase() + value.slice(1));
}

function renderSummary(tasks, options) {
  summaryChips.innerHTML = "";

  const chips = [
    `${titleCase(options.type)} flow`,
    `${titleCase(options.environment)} environment`,
    options.accessProfile === "privileged" ? "Privileged access" : "Standard access",
    `${tasks.length} tasks`
  ];

  chips.forEach(label => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = label;
    summaryChips.appendChild(chip);
  });
}

function renderChecklist(tasks, options) {
  output.innerHTML = "";
  emptyState.hidden = tasks.length > 0;

  resultsTitle.textContent = tasks.length
    ? `${titleCase(options.type)} checklist for a ${options.environment} client`
    : "No matching tasks for the selected filters";

  renderSummary(tasks, options);

  if (!tasks.length) {
    return;
  }

  const groupedTasks = groupTasks(tasks);

  Object.entries(groupedTasks).forEach(([category, categoryTasks]) => {
    const section = document.createElement("section");
    section.className = "task-group";

    const heading = document.createElement("div");
    heading.className = "task-group-heading";

    const title = document.createElement("h3");
    title.textContent = categoryMeta[category]?.label ?? titleCase(category);

    const description = document.createElement("p");
    description.textContent = categoryMeta[category]?.description ?? "Checklist tasks";

    heading.append(title, description);
    section.appendChild(heading);

    categoryTasks.forEach(task => {
      const article = document.createElement("article");
      article.className = "task-card";

      const taskTitle = document.createElement("div");
      taskTitle.className = "task-card-title";

      const titleText = document.createElement("span");
      titleText.textContent = task.title;

      const order = document.createElement("span");
      order.className = "task-order";
      order.textContent = `P${task.priority}`;

      taskTitle.append(titleText, order);

      const systemRow = document.createElement("p");
      systemRow.className = "task-systems";
      systemRow.textContent = `Systems: ${task.systems.join(", ")}`;

      const list = document.createElement("ol");
      task.steps.forEach(step => {
        const item = document.createElement("li");
        item.textContent = step;
        list.appendChild(item);
      });

      article.append(taskTitle, systemRow, list);
      section.appendChild(article);
    });

    output.appendChild(section);
  });
}

function buildPlainTextChecklist(tasks, options) {
  const groupedTasks = groupTasks(tasks);
  const lines = [
    `MSP ${titleCase(options.type)} Checklist`,
    `Environment: ${titleCase(options.environment)}`,
    `Access Profile: ${titleCase(options.accessProfile)}`,
    ""
  ];

  Object.entries(groupedTasks).forEach(([category, categoryTasks]) => {
    lines.push(`${categoryMeta[category]?.label ?? titleCase(category)}`);

    categoryTasks.forEach(task => {
      lines.push(`- ${task.title}`);
      task.steps.forEach(step => lines.push(`  * ${step}`));
    });

    lines.push("");
  });

  return lines.join("\n").trim();
}

async function copyChecklist() {
  if (!lastGeneratedChecklist.length || !lastGeneratedOptions) {
    return;
  }

  const plainText = buildPlainTextChecklist(lastGeneratedChecklist, lastGeneratedOptions);
  await navigator.clipboard.writeText(plainText);
  copyBtn.textContent = "Copied";

  window.setTimeout(() => {
    copyBtn.textContent = "Copy as Text";
  }, 1800);
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const options = getFormOptions();
  const checklist = generateChecklist(options);

  lastGeneratedChecklist = checklist;
  lastGeneratedOptions = options;

  renderChecklist(checklist, options);
});

copyBtn.addEventListener("click", () => {
  copyChecklist().catch(() => {
    copyBtn.textContent = "Copy failed";

    window.setTimeout(() => {
      copyBtn.textContent = "Copy as Text";
    }, 1800);
  });
});

printBtn.addEventListener("click", () => {
  window.print();
});

const initialOptions = getFormOptions();
const initialChecklist = generateChecklist(initialOptions);
lastGeneratedChecklist = initialChecklist;
lastGeneratedOptions = initialOptions;
renderChecklist(initialChecklist, initialOptions);
