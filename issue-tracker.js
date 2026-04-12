import { copyTextToClipboard, createPageCard } from "./resourceCommon.js";

const STORAGE_KEY = "llamaha-known-issues";

const issueForm = document.getElementById("issueForm");
const issueId = document.getElementById("issueId");
const issueTitle = document.getElementById("issueTitle");
const issueProduct = document.getElementById("issueProduct");
const issueStatus = document.getElementById("issueStatus");
const issueSymptom = document.getElementById("issueSymptom");
const issueFix = document.getElementById("issueFix");
const issueNote = document.getElementById("issueNote");
const issueEntries = document.getElementById("issueEntries");
const trackerStatus = document.getElementById("trackerStatus");
const clearFormBtn = document.getElementById("clearFormBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

function loadEntries() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function resetForm() {
  issueId.value = "";
  issueForm.reset();
  issueStatus.value = "Open";
  trackerStatus.textContent = "This tracker is local-only and stored in your browser on this machine.";
}

function formatTimestamp(value) {
  return new Date(value).toLocaleString();
}

function buildSummary(entry) {
  return [
    `Issue: ${entry.title}`,
    `Product / Area: ${entry.product}`,
    `Status: ${entry.status}`,
    `Symptom / Trigger: ${entry.symptom}`,
    `Workaround / Fix: ${entry.fix}`,
    `Internal Note: ${entry.note || "None"}`,
    `Last Updated: ${formatTimestamp(entry.updatedAt)}`,
    "Storage: Browser-local only"
  ].join("\n");
}

function startEdit(entry) {
  issueId.value = entry.id;
  issueTitle.value = entry.title;
  issueProduct.value = entry.product;
  issueStatus.value = entry.status;
  issueSymptom.value = entry.symptom;
  issueFix.value = entry.fix;
  issueNote.value = entry.note;
  trackerStatus.textContent = `Editing "${entry.title}"`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteEntry(id) {
  if (!window.confirm("Delete this local issue entry from this browser?")) {
    return;
  }

  const entries = loadEntries().filter(entry => entry.id !== id);
  saveEntries(entries);
  renderEntries();

  if (issueId.value === id) {
    resetForm();
  }
}

function renderEntries() {
  const entries = loadEntries()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  issueEntries.innerHTML = "";

  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No local issue notes yet. Add generic recurring issues or workaround patterns here.";
    issueEntries.appendChild(empty);
    return;
  }

  entries.forEach(entry => {
    const card = createPageCard("vendor-card");

    const title = document.createElement("h3");
    title.textContent = entry.title;

    const summary = document.createElement("p");
    summary.textContent = `${entry.product} | ${entry.status} | Updated ${formatTimestamp(entry.updatedAt)}`;

    const stack = document.createElement("div");
    stack.className = "card-stack";

    [
      ["Symptom / Trigger", entry.symptom],
      ["Workaround / Fix", entry.fix],
      ["Internal Note", entry.note || "None"]
    ].forEach(([label, text]) => {
      const block = document.createElement("div");
      block.className = "card-block";

      const heading = document.createElement("h4");
      heading.textContent = label;

      const paragraph = document.createElement("p");
      paragraph.textContent = text;

      block.append(heading, paragraph);
      stack.appendChild(block);
    });

    const actions = document.createElement("div");
    actions.className = "inline-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "secondary-btn compact-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEdit(entry));

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "secondary-btn compact-btn";
    copyBtn.textContent = "Copy Summary";
    copyBtn.addEventListener("click", async () => {
      await copyTextToClipboard(buildSummary(entry));
      copyBtn.textContent = "Copied";
      window.setTimeout(() => {
        copyBtn.textContent = "Copy Summary";
      }, 1500);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "secondary-btn compact-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteEntry(entry.id));

    actions.append(editBtn, copyBtn, deleteBtn);
    card.append(title, summary, stack, actions);
    issueEntries.appendChild(card);
  });
}

issueForm.addEventListener("submit", event => {
  event.preventDefault();

  const title = issueTitle.value.trim();
  const product = issueProduct.value.trim();
  const symptom = issueSymptom.value.trim();
  const fix = issueFix.value.trim();
  const note = issueNote.value.trim();

  if (!title || !product || !symptom || !fix) {
    trackerStatus.textContent = "Add a title, product or area, symptom, and workaround before saving.";
    return;
  }

  const entries = loadEntries();
  const now = new Date().toISOString();
  const nextEntry = {
    id: issueId.value || `${Date.now()}`,
    title,
    product,
    status: issueStatus.value,
    symptom,
    fix,
    note,
    updatedAt: now
  };

  const existingIndex = entries.findIndex(entry => entry.id === nextEntry.id);

  if (existingIndex >= 0) {
    entries[existingIndex] = nextEntry;
  } else {
    entries.push(nextEntry);
  }

  saveEntries(entries);
  renderEntries();
  resetForm();
  trackerStatus.textContent = "Entry saved locally in this browser.";
});

clearFormBtn.addEventListener("click", () => resetForm());

clearAllBtn.addEventListener("click", () => {
  if (!window.confirm("Clear all browser-local issue tracker entries on this device?")) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  renderEntries();
  resetForm();
  trackerStatus.textContent = "All local entries were cleared from this browser.";
});

renderEntries();
resetForm();
