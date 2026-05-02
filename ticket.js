const destinationEmail = "admin@llamaha.com";
const form = document.querySelector("#ticketForm");
const statusEl = document.querySelector("#ticketStatus");
const copyButton = document.querySelector("#copyTicket");

const fieldIds = [
  "requestType",
  "impact",
  "name",
  "replyEmail",
  "team",
  "workAccount",
  "appOrPage",
  "appVersion",
  "guideUrl",
  "exactItem",
  "tryingToDo",
  "whatHappened",
  "recentChange",
  "screenshotDetails",
  "browserCheck",
  "otherDeviceCheck",
  "stepsTried",
  "extraNotes"
];

const labels = {
  requestType: "Request type",
  impact: "Impact",
  name: "Name",
  replyEmail: "Reply email",
  team: "Company or team",
  workAccount: "Work account used",
  appOrPage: "App, page, or product involved",
  appVersion: "App version, release, or edition",
  guideUrl: "Guide URL and section",
  exactItem: "Exact item involved",
  tryingToDo: "What were you trying to do",
  whatHappened: "What happened instead",
  recentChange: "What changed recently",
  screenshotDetails: "Screenshot or exact text",
  browserCheck: "Browser version check",
  otherDeviceCheck: "Other device or remote session check",
  stepsTried: "Steps already tried",
  extraNotes: "Additional notes"
};

function fieldValue(id) {
  const field = document.getElementById(id);
  return field?.value.trim() || "Not provided";
}

function setStatus(message) {
  if (statusEl) {
    statusEl.textContent = message;
  }
}

function buildTicketSummary() {
  const lines = [
    "Llamaha ticket",
    `Prepared: ${new Date().toLocaleString()}`,
    ""
  ];

  fieldIds.forEach(id => {
    lines.push(`${labels[id]}:`);
    lines.push(fieldValue(id));
    lines.push("");
  });

  lines.push("Details confirmed:");
  lines.push(document.getElementById("confirmDetails")?.checked ? "Yes" : "No");

  return lines.join("\n");
}

function buildSubject() {
  const requestType = fieldValue("requestType");
  const appOrPage = fieldValue("appOrPage");
  return `Llamaha Ticket - ${requestType} - ${appOrPage}`.slice(0, 120);
}

async function copySummary() {
  const summary = buildTicketSummary();

  if (!navigator.clipboard) {
    setStatus("Copy is not available in this browser. You can still send the ticket.");
    return;
  }

  try {
    await navigator.clipboard.writeText(summary);
    setStatus("Ticket summary copied.");
  } catch {
    setStatus("Copy did not complete. You can still send the ticket.");
  }
}

form?.addEventListener("submit", event => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const subject = encodeURIComponent(buildSubject());
  const body = encodeURIComponent(buildTicketSummary());
  window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
  setStatus("Opening your email app with the ticket details.");
});

copyButton?.addEventListener("click", copySummary);
