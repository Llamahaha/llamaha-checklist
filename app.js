import {
  categoryMeta,
  licenseGuidance,
  presetLibrary,
  systemMeta,
  taskLibrary
} from "./data/taskLibrary.js";

const form = document.getElementById("generatorForm");
const output = document.getElementById("output");
const emptyState = document.getElementById("emptyState");
const emptyStateText = emptyState.querySelector("p");
const resultsTitle = document.getElementById("resultsTitle");
const summaryChips = document.getElementById("summaryChips");
const overviewGrid = document.getElementById("overviewGrid");
const insightsPanel = document.getElementById("insightsPanel");
const copyBtn = document.getElementById("copyBtn");
const printBtn = document.getElementById("printBtn");
const presetButtons = Array.from(document.querySelectorAll(".preset-btn"));

let lastGeneratedChecklist = [];
let lastGeneratedOptions = null;
let lastInsights = [];
let lastLicenseItems = [];

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
  critical: { label: "Critical", className: "impact-critical" },
  high: { label: "High", className: "impact-high" },
  normal: { label: "Standard", className: "impact-normal" }
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

function applyPreset(presetKey) {
  const preset = presetLibrary[presetKey];

  if (!preset) {
    return;
  }

  form.elements.environment.value = preset.environment;
  form.elements.accessProfile.value = preset.accessProfile;
  form.elements.workstationProfile.value = preset.workstationProfile;

  const checkboxes = form.querySelectorAll('input[name="systems"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = preset.systems.includes(checkbox.value);
  });

  presetButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.preset === presetKey);
  });
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
  const hasCadStack = ["autodesk", "bentley", "esri"].some(system => options.systems.includes(system));

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
  summaryChips.innerHTML = "";

  const chips = [
    `${titleCase(options.type)} flow`,
    `${titleCase(options.environment)} environment`,
    options.accessProfile === "privileged" ? "Privileged access" : "Standard access",
    `${getWorkstationLabel(options.workstationProfile)} profile`,
    `${options.systems.length} platforms`,
    `${tasks.length} tasks`
  ];

  chips.forEach(label => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = label;
    summaryChips.appendChild(chip);
  });
}

function renderOverview(tasks, options, licenses) {
  overviewGrid.innerHTML = "";

  const items = [
    { label: "Runbook Tasks", value: tasks.length },
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

function appendChip(container, label, className) {
  const chip = document.createElement("span");
  chip.className = className;
  chip.textContent = label;
  container.appendChild(chip);
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

      const header = document.createElement("div");
      header.className = "task-card-title";

      const titleBlock = document.createElement("div");
      const taskTitle = document.createElement("h4");
      taskTitle.textContent = task.title;
      const summary = document.createElement("p");
      summary.className = "task-summary";
      summary.textContent = task.summary;
      titleBlock.append(taskTitle, summary);

      const impact = document.createElement("span");
      impact.className = `impact-pill ${impactMeta[task.impact]?.className ?? "impact-normal"}`;
      impact.textContent = impactMeta[task.impact]?.label ?? "Standard";

      header.append(titleBlock, impact);

      const metaRow = document.createElement("div");
      metaRow.className = "task-meta";

      task.systems.forEach(system => {
        appendChip(metaRow, getSystemLabel(system), "meta-chip system-chip");
      });

      (task.tags ?? []).forEach(tag => {
        appendChip(metaRow, tagMeta[tag] ?? tag, "meta-chip tag-chip");
      });

      const list = document.createElement("ol");
      task.steps.forEach(step => {
        const item = document.createElement("li");
        item.textContent = step;
        list.appendChild(item);
      });

      article.append(header, metaRow, list);

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
    `MSP ${titleCase(options.type)} Runbook`,
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
      lines.push(`- ${task.title}`);
      if (task.summary) {
        lines.push(`  Summary: ${task.summary}`);
      }
      task.steps.forEach(step => lines.push(`  * ${step}`));
      (task.completion ?? []).forEach(entry => lines.push(`  Proof: ${entry}`));
    });

    lines.push("");
  });

  return lines.join("\n").trim();
}

function runGeneration() {
  const options = getFormOptions();
  const checklist = generateChecklist(options);
  renderChecklist(checklist, options);
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
  presetButtons.forEach(button => button.classList.remove("is-active"));
  runGeneration();
});

presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyPreset(button.dataset.preset);
    runGeneration();
  });
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

applyPreset("core");
runGeneration();
