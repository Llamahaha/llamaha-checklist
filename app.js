import {
  categoryMeta,
  licenseGuidance,
  systemMeta,
  taskLibrary
} from "./data/taskLibrary.js";

const form = document.getElementById("generatorForm");
const output = document.getElementById("output");
const emptyState = document.getElementById("emptyState");
const emptyStateText = emptyState.querySelector("p");
const resultsTitle = document.getElementById("resultsTitle");
const overviewGrid = document.getElementById("overviewGrid");
const insightsPanel = document.getElementById("insightsPanel");
const copyBtn = document.getElementById("copyBtn");
const printBtn = document.getElementById("printBtn");
const resetProgressBtn = document.getElementById("resetProgressBtn");
const progressStatus = document.getElementById("progressStatus");

let lastGeneratedChecklist = [];
let lastGeneratedOptions = null;
let lastInsights = [];
let lastLicenseItems = [];
let currentProgressKey = "";
let currentProgressState = {
  taskCompletion: {},
  stepCompletion: {}
};

const storageKeys = {
  form: "llamaha-checklist-form",
  progressPrefix: "llamaha-checklist-progress"
};

const labelMap = {
  onboarding: "Onboarding",
  offboarding: "Offboarding",
  cloud: "Cloud",
  hybrid: "Hybrid",
  onprem: "On-Prem",
  standard: "Standard",
  privileged: "Privileged"
};

const workstationLabelMap = {
  standard: "Standard Productivity",
  shared: "Shared / Kiosk",
  cad: "CAD / Engineering"
};

const impactMeta = {
  critical: { label: "Critical" },
  high: { label: "High" },
  normal: { label: "Standard" }
};

const tagMeta = {
  "security-critical": "Security-critical",
  security: "Security review",
  license: "License touchpoint",
  documentation: "Documentation",
  internal: "Internal MSP",
  verification: "Validation",
  handoff: "Handoff",
  asset: "Asset handling",
  privileged: "Privileged access",
  specialty: "Specialty app"
};

function titleCase(value) {
  return labelMap[value] ?? (value.charAt(0).toUpperCase() + value.slice(1));
}

function getSystemLabel(system) {
  return systemMeta[system]?.label ?? titleCase(system);
}

function getWorkstationLabel(profile) {
  return workstationLabelMap[profile] ?? titleCase(profile);
}

function getFormOptions() {
  const formData = new FormData(form);

  return {
    type: formData.get("type"),
    environment: formData.get("environment"),
    accessProfile: formData.get("accessProfile"),
    workstationProfile: formData.get("workstationProfile"),
    includeManagerTasks: formData.get("includeManagerTasks") === "on",
    includeAssetTasks: formData.get("includeAssetTasks") === "on",
    includeLicenseTasks: formData.get("includeLicenseTasks") === "on",
    includeDocumentationTasks: formData.get("includeDocumentationTasks") === "on",
    includeSecurityReview: formData.get("includeSecurityReview") === "on",
    systems: formData.getAll("systems")
  };
}

function loadStoredValue(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

function saveStoredValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeStoredValue(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function getOptionsSignature(options) {
  return JSON.stringify({
    ...options,
    systems: [...options.systems].sort()
  });
}

function getProgressStorageKey(options) {
  return `${storageKeys.progressPrefix}:${getOptionsSignature(options)}`;
}

function setProgressStatus(message) {
  if (progressStatus) {
    progressStatus.textContent = message;
  }
}

function saveFormState() {
  const saved = saveStoredValue(storageKeys.form, getFormOptions());

  if (!saved) {
    setProgressStatus("Progress could not be saved in this browser.");
  }
}

function restoreFormState() {
  const savedState = loadStoredValue(storageKeys.form, null);

  if (!savedState) {
    return;
  }

  ["type", "environment", "accessProfile", "workstationProfile"].forEach(fieldName => {
    const field = form.elements.namedItem(fieldName);

    if (field && savedState[fieldName]) {
      field.value = savedState[fieldName];
    }
  });

  [
    "includeManagerTasks",
    "includeAssetTasks",
    "includeLicenseTasks",
    "includeDocumentationTasks",
    "includeSecurityReview"
  ].forEach(fieldName => {
    const field = form.elements.namedItem(fieldName);

    if (field) {
      field.checked = Boolean(savedState[fieldName]);
    }
  });

  const selectedSystems = new Set(savedState.systems ?? []);
  form.querySelectorAll('input[name="systems"]').forEach(field => {
    field.checked = selectedSystems.has(field.value);
  });
}

function loadProgressState(options) {
  currentProgressKey = getProgressStorageKey(options);
  currentProgressState = loadStoredValue(currentProgressKey, {
    taskCompletion: {},
    stepCompletion: {}
  });
}

function persistProgressState(message = "Checklist progress auto-saved in this browser.") {
  if (!currentProgressKey) {
    return;
  }

  const saved = saveStoredValue(currentProgressKey, currentProgressState);
  setProgressStatus(saved ? message : "Progress could not be saved in this browser.");
}

function getTaskStepKey(taskId, index) {
  return `${taskId}:${index}`;
}

function getProgressMetrics(tasks) {
  const totalSteps = tasks.reduce((count, task) => count + task.steps.length, 0);
  const completedSteps = tasks.reduce((count, task) => {
    return count + task.steps.filter((step, index) => currentProgressState.stepCompletion[getTaskStepKey(task.id, index)]).length;
  }, 0);
  const completedTasks = tasks.filter(task => currentProgressState.taskCompletion[task.id]).length;

  return {
    completedTasks,
    completedSteps,
    totalSteps
  };
}

function taskMatchesFilters(task, options) {
  const { conditions = {} } = task;

  if (!options.systems.length) {
    return false;
  }

  if (task.type !== options.type) {
    return false;
  }

  if (!task.systems.some(system => options.systems.includes(system))) {
    return false;
  }

  if (conditions.environment && !conditions.environment.includes(options.environment)) {
    return false;
  }

  if (conditions.accessProfile && !conditions.accessProfile.includes(options.accessProfile)) {
    return false;
  }

  if (conditions.workstationProfile && !conditions.workstationProfile.includes(options.workstationProfile)) {
    return false;
  }

  if (conditions.includeManagerTasks && !options.includeManagerTasks) {
    return false;
  }

  if (conditions.includeAssetTasks && !options.includeAssetTasks) {
    return false;
  }

  if (conditions.includeLicenseTasks && !options.includeLicenseTasks) {
    return false;
  }

  if (conditions.includeDocumentationTasks && !options.includeDocumentationTasks) {
    return false;
  }

  if (conditions.includeSecurityReview && !options.includeSecurityReview) {
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
  const groups = tasks.reduce((accumulator, task) => {
    if (!accumulator[task.category]) {
      accumulator[task.category] = [];
    }

    accumulator[task.category].push(task);
    return accumulator;
  }, {});

  return Object.entries(groups).sort((a, b) => {
    const aOrder = categoryMeta[a[0]]?.order ?? 999;
    const bOrder = categoryMeta[b[0]]?.order ?? 999;
    return aOrder - bOrder;
  });
}

function getSelectedLicenseGuidance(options) {
  return licenseGuidance.filter(item => item.systems.some(system => options.systems.includes(system)));
}

function buildInsights(options) {
  const insights = [];
  const hasCadStack = ["autodesk", "bentley", "esri", "trimble", "sketchup", "ptc"].some(system => options.systems.includes(system));

  if (options.type === "offboarding" && options.accessProfile === "privileged") {
    insights.push({
      title: "Rotate what they knew, not just what they owned",
      text: "Privileged departures should trigger a review of shared credentials, vault entries, break-glass paths, scripts, and service ties."
    });
  }

  if (options.type === "offboarding" && options.environment === "hybrid" && options.systems.includes("m365") && options.systems.includes("ad")) {
    insights.push({
      title: "Hybrid cutoffs need coordination",
      text: "Verify the AD disable, sync behavior, and cloud sign-in block line up so the account does not reappear or linger."
    });
  }

  if (options.systems.includes("forticlient")) {
    insights.push({
      title: "VPN cleanup is more than disabling the user",
      text: "Saved FortiClient profiles, cached trust, and MFA-linked remote access paths are common leftovers after a rushed change."
    });
  }

  if (options.systems.includes("rocketcyber") || options.systems.includes("bitdefender")) {
    insights.push({
      title: "Check alert routing and exceptions",
      text: "Security tools often retain named contacts, temporary exclusions, or ownership assumptions that become confusing later."
    });
  }

  if (hasCadStack) {
    insights.push({
      title: "CAD environments hide local dependencies",
      text: "Templates, plugins, project paths, and cloud entitlements should be reviewed before wiping or reassigning an engineering workstation."
    });
  }

  if (options.systems.includes("quickbooks")) {
    insights.push({
      title: "Finance access needs ownership handoff",
      text: "QuickBooks changes should confirm who now owns company-file access, approvals, bank feeds, and audit-sensitive reporting."
    });
  }

  if (options.systems.includes("egnyte")) {
    insights.push({
      title: "Egnyte offboarding needs content ownership review",
      text: "Check shared links, private folders, offline files, and user type changes so data access does not linger or disappear unexpectedly."
    });
  }

  if (!options.includeDocumentationTasks) {
    insights.push({
      title: "Internal record updates are excluded",
      text: "Autotask and IT Glue completion items are currently turned off, so the checklist will not include closeout documentation work."
    });
  }

  if (options.type === "offboarding" && options.systems.includes("windows") && !options.includeAssetTasks) {
    insights.push({
      title: "Device recovery is excluded",
      text: "Windows asset handling is turned off, so wipe, return, and local-profile cleanup work will not appear in this runbook."
    });
  }

  return insights;
}

function renderSummary(tasks, options) {
  const metrics = getProgressMetrics(tasks);

  resultsTitle.dataset.summary = [
    `${titleCase(options.type)} flow`,
    `${titleCase(options.environment)} environment`,
    options.accessProfile === "privileged" ? "Privileged access" : "Standard access",
    `${getWorkstationLabel(options.workstationProfile)} profile`,
    `${options.systems.length} platforms`,
    `${tasks.length} tasks`,
    `${metrics.completedTasks} completed`
  ].join(" | ");
}

function renderOverview(tasks, options, licenses) {
  overviewGrid.innerHTML = "";
  const metrics = getProgressMetrics(tasks);

  const items = [
    { label: "Runbook Tasks", value: tasks.length },
    { label: "Completed Tasks", value: metrics.completedTasks },
    { label: "Completed Steps", value: `${metrics.completedSteps}/${metrics.totalSteps}` },
    { label: "Critical Items", value: tasks.filter(task => task.impact === "critical").length },
    { label: "License Touchpoints", value: licenses.length },
    { label: "Platforms Selected", value: options.systems.length }
  ];

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "overview-card";

    const value = document.createElement("strong");
    value.textContent = `${item.value}`;

    const label = document.createElement("span");
    label.textContent = item.label;

    card.append(value, label);
    overviewGrid.appendChild(card);
  });
}

function renderSupportPanels(insights, licenses, options) {
  insightsPanel.innerHTML = "";

  if (insights.length) {
    const panel = document.createElement("section");
    panel.className = "support-card";

    const title = document.createElement("h3");
    title.textContent = "Watch For";

    const list = document.createElement("ul");
    insights.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.title}:</strong> ${item.text}`;
      list.appendChild(li);
    });

    panel.append(title, list);
    insightsPanel.appendChild(panel);
  }

  if (licenses.length) {
    const panel = document.createElement("section");
    panel.className = "support-card";

    const title = document.createElement("h3");
    title.textContent = "License Touchpoints";

    const list = document.createElement("ul");
    licenses.forEach(item => {
      const li = document.createElement("li");
      const actionLines = item[options.type];
      li.innerHTML = `<strong>${item.title}:</strong> ${item.products.join(", ")}. ${actionLines.join(" ")}`;
      list.appendChild(li);
    });

    panel.append(title, list);
    insightsPanel.appendChild(panel);
  }
}

function renderChecklist(tasks, options) {
  output.innerHTML = "";
  overviewGrid.innerHTML = "";
  insightsPanel.innerHTML = "";

  const licenses = getSelectedLicenseGuidance(options);
  const insights = buildInsights(options);

  lastGeneratedChecklist = tasks;
  lastGeneratedOptions = options;
  lastLicenseItems = licenses;
  lastInsights = insights;
  loadProgressState(options);

  renderSummary(tasks, options);
  renderOverview(tasks, options, licenses);
  renderSupportPanels(insights, licenses, options);

  if (!options.systems.length) {
    emptyState.hidden = false;
    emptyStateText.textContent = "Select at least one platform to generate a runbook.";
    resultsTitle.textContent = "Choose the platforms in scope";
    return;
  }

  emptyState.hidden = tasks.length > 0;
  emptyStateText.textContent = "No matching tasks for the selected filters yet. Try enabling licensing, documentation, or additional platforms.";
  resultsTitle.textContent = tasks.length
    ? `${titleCase(options.type)} runbook for a ${titleCase(options.environment)} ${getWorkstationLabel(options.workstationProfile)} client`
    : "No matching tasks for the selected filters";

  if (!tasks.length) {
    return;
  }

  groupTasks(tasks).forEach(([category, categoryTasks]) => {
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
      article.dataset.taskId = task.id;

      const header = document.createElement("div");
      header.className = "task-card-title";

      const titleBlock = document.createElement("div");
      const taskTitle = document.createElement("h4");
      taskTitle.textContent = task.title;
      const summary = document.createElement("p");
      summary.className = "task-summary";
      summary.textContent = task.summary;
      const taskPriority = document.createElement("p");
      taskPriority.className = "task-priority";
      taskPriority.textContent = `Priority: ${impactMeta[task.impact]?.label ?? "Standard"}`;
      titleBlock.append(taskTitle, summary, taskPriority);

      const taskTools = document.createElement("div");
      taskTools.className = "task-card-tools";

      const metrics = document.createElement("span");
      metrics.className = "task-progress-label";
      metrics.textContent = `${task.steps.filter((step, index) => currentProgressState.stepCompletion[getTaskStepKey(task.id, index)]).length}/${task.steps.length} steps complete`;

      const taskToggle = document.createElement("label");
      taskToggle.className = "task-toggle";

      const taskCheckbox = document.createElement("input");
      taskCheckbox.type = "checkbox";
      taskCheckbox.className = "task-complete-toggle";
      taskCheckbox.dataset.kind = "task";
      taskCheckbox.dataset.taskId = task.id;
      taskCheckbox.checked = Boolean(currentProgressState.taskCompletion[task.id]);

      const taskToggleText = document.createElement("span");
      taskToggleText.textContent = "Done";

      taskToggle.append(taskCheckbox, taskToggleText);
      taskTools.append(metrics, taskToggle);
      header.append(titleBlock, taskTools);

      const metaRow = document.createElement("div");
      metaRow.className = "task-meta";

      const systemsLine = document.createElement("p");
      systemsLine.className = "task-meta-line";
      systemsLine.textContent = `Systems: ${task.systems.map(getSystemLabel).join(", ")}`;
      metaRow.appendChild(systemsLine);

      if ((task.tags ?? []).length) {
        const tagsLine = document.createElement("p");
        tagsLine.className = "task-meta-line";
        tagsLine.textContent = `Notes: ${(task.tags ?? []).map(tag => tagMeta[tag] ?? tag).join(", ")}`;
        metaRow.appendChild(tagsLine);
      }

      const list = document.createElement("ol");
      list.className = "task-step-list";

      task.steps.forEach(step => {
        const item = document.createElement("li");
        item.className = "task-step-item";

        const index = list.childElementCount;
        const stepCheckbox = document.createElement("input");
        stepCheckbox.type = "checkbox";
        stepCheckbox.className = "task-step-checkbox";
        stepCheckbox.dataset.kind = "step";
        stepCheckbox.dataset.taskId = task.id;
        stepCheckbox.dataset.stepIndex = `${index}`;
        stepCheckbox.checked = Boolean(currentProgressState.stepCompletion[getTaskStepKey(task.id, index)]);

        const text = document.createElement("span");
        text.textContent = step;

        const label = document.createElement("label");
        label.className = "task-step-label";
        label.append(stepCheckbox, text);

        if (stepCheckbox.checked) {
          item.classList.add("is-checked");
        }

        item.appendChild(label);
        list.appendChild(item);
      });

      article.append(header, metaRow, list);

      if (taskCheckbox.checked) {
        article.classList.add("is-complete");
      }

      if (task.completion?.length) {
        const completion = document.createElement("div");
        completion.className = "completion-box";

        const label = document.createElement("span");
        label.className = "completion-label";
        label.textContent = "Completion proof";

        const proofList = document.createElement("ul");
        task.completion.forEach(entry => {
          const item = document.createElement("li");
          item.textContent = entry;
          proofList.appendChild(item);
        });

        completion.append(label, proofList);
        article.appendChild(completion);
      }

      section.appendChild(article);
    });

    output.appendChild(section);
  });
}

function buildPlainTextChecklist(tasks, options, insights, licenses) {
  const lines = [
    `IT ${titleCase(options.type)} Runbook`,
    `Environment: ${titleCase(options.environment)}`,
    `Access Profile: ${titleCase(options.accessProfile)}`,
    `Workstation Profile: ${getWorkstationLabel(options.workstationProfile)}`,
    `Platforms: ${options.systems.map(getSystemLabel).join(", ")}`,
    ""
  ];

  if (insights.length) {
    lines.push("Watch For");
    insights.forEach(item => lines.push(`- ${item.title}: ${item.text}`));
    lines.push("");
  }

  if (licenses.length) {
    lines.push("License Touchpoints");
    licenses.forEach(item => {
      lines.push(`- ${item.title}: ${item.products.join(", ")}. ${item[options.type].join(" ")}`);
    });
    lines.push("");
  }

  groupTasks(tasks).forEach(([category, categoryTasks]) => {
    lines.push(categoryMeta[category]?.label ?? titleCase(category));

    categoryTasks.forEach(task => {
      const taskChecked = currentProgressState.taskCompletion[task.id] ? "[x]" : "[ ]";
      lines.push(`- ${taskChecked} ${task.title}`);
      if (task.summary) {
        lines.push(`  Summary: ${task.summary}`);
      }
      task.steps.forEach((step, index) => {
        const stepChecked = currentProgressState.stepCompletion[getTaskStepKey(task.id, index)] ? "[x]" : "[ ]";
        lines.push(`  * ${stepChecked} ${step}`);
      });
      (task.completion ?? []).forEach(entry => lines.push(`  Proof: ${entry}`));
    });

    lines.push("");
  });

  return lines.join("\n").trim();
}

function runGeneration() {
  const options = getFormOptions();
  const checklist = generateChecklist(options);
  saveFormState();
  renderChecklist(checklist, options);
}

function refreshTaskCard(taskId) {
  const card = output.querySelector(`.task-card[data-task-id="${taskId}"]`);
  const task = lastGeneratedChecklist.find(item => item.id === taskId);

  if (!card || !task) {
    return;
  }

  const completedSteps = task.steps.filter((step, index) => currentProgressState.stepCompletion[getTaskStepKey(task.id, index)]).length;
  const allStepsComplete = completedSteps === task.steps.length;

  currentProgressState.taskCompletion[task.id] = allStepsComplete;
  card.classList.toggle("is-complete", allStepsComplete);

  const metrics = card.querySelector(".task-progress-label");
  if (metrics) {
    metrics.textContent = `${completedSteps}/${task.steps.length} steps complete`;
  }

  const taskCheckbox = card.querySelector(".task-complete-toggle");
  if (taskCheckbox) {
    taskCheckbox.checked = allStepsComplete;
  }

  card.querySelectorAll(".task-step-item").forEach((item, index) => {
    item.classList.toggle("is-checked", Boolean(currentProgressState.stepCompletion[getTaskStepKey(task.id, index)]));
  });
}

function handleProgressChange(target) {
  const taskId = target.dataset.taskId;

  if (!taskId) {
    return;
  }

  if (target.dataset.kind === "task") {
    const task = lastGeneratedChecklist.find(item => item.id === taskId);

    if (!task) {
      return;
    }

    currentProgressState.taskCompletion[taskId] = target.checked;

    task.steps.forEach((step, index) => {
      currentProgressState.stepCompletion[getTaskStepKey(taskId, index)] = target.checked;
    });

    const card = output.querySelector(`.task-card[data-task-id="${taskId}"]`);
    if (card) {
      card.classList.toggle("is-complete", target.checked);
      card.querySelectorAll(".task-step-checkbox").forEach(checkbox => {
        checkbox.checked = target.checked;
      });
      card.querySelectorAll(".task-step-item").forEach(item => {
        item.classList.toggle("is-checked", target.checked);
      });

      const metrics = card.querySelector(".task-progress-label");
      if (metrics) {
        metrics.textContent = target.checked ? `${task.steps.length}/${task.steps.length} steps complete` : `0/${task.steps.length} steps complete`;
      }
    }
  }

  if (target.dataset.kind === "step") {
    const stepIndex = Number.parseInt(target.dataset.stepIndex, 10);
    currentProgressState.stepCompletion[getTaskStepKey(taskId, stepIndex)] = target.checked;
    refreshTaskCard(taskId);
  }

  persistProgressState();
  renderSummary(lastGeneratedChecklist, lastGeneratedOptions);
  renderOverview(lastGeneratedChecklist, lastGeneratedOptions, lastLicenseItems);
}

async function copyChecklist() {
  if (!lastGeneratedOptions) {
    return;
  }

  const plainText = buildPlainTextChecklist(
    lastGeneratedChecklist,
    lastGeneratedOptions,
    lastInsights,
    lastLicenseItems
  );

  await navigator.clipboard.writeText(plainText);
  copyBtn.textContent = "Copied";

  window.setTimeout(() => {
    copyBtn.textContent = "Copy as Text";
  }, 1800);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  runGeneration();
});

form.addEventListener("change", () => {
  runGeneration();
});

output.addEventListener("change", event => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  if (target.matches(".task-complete-toggle, .task-step-checkbox")) {
    handleProgressChange(target);
  }
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

if (resetProgressBtn) {
  resetProgressBtn.addEventListener("click", () => {
    if (!currentProgressKey) {
      return;
    }

    removeStoredValue(currentProgressKey);
    currentProgressState = {
      taskCompletion: {},
      stepCompletion: {}
    };

    if (lastGeneratedOptions) {
      renderChecklist(lastGeneratedChecklist, lastGeneratedOptions);
    }

    setProgressStatus("Saved progress cleared for this runbook.");
  });
}

restoreFormState();
runGeneration();
