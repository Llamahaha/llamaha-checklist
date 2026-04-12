import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { vendorFaqs, vendorUsageIssues } from "./guides/guideExtras.js";
import { crossAppIssuePatterns } from "./supportData.js";
import { appendBlock, createLinks, createList, createPageCard } from "./resourceCommon.js";

const patternGrid = document.getElementById("patternGrid");
const vendorIssueGrid = document.getElementById("vendorIssueGrid");

function renderPatternCards() {
  if (!patternGrid) {
    return;
  }

  crossAppIssuePatterns.forEach(item => {
    const card = createPageCard();
    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    const fixes = createList(item.fixes);
    card.append(title, text, fixes);
    patternGrid.appendChild(card);
  });
}

function renderVendorIssueCards() {
  if (!vendorIssueGrid) {
    return;
  }

  vendorOrder.forEach(key => {
    const guide = vendorGuides[key];
    const issues = vendorUsageIssues[key] ?? [];
    const faq = vendorFaqs[key] ?? [];
    const card = createPageCard("vendor-card");

    const title = document.createElement("h3");
    title.textContent = guide.title;

    const summary = document.createElement("p");
    summary.textContent = guide.summary;

    const stack = document.createElement("div");
    stack.className = "card-stack";

    appendBlock(
      stack,
      "Common Issues",
      issues.map(item => `${item.issue}: ${item.fix}`)
    );
    appendBlock(
      stack,
      "FAQ",
      faq.map(item => `${item.q}: ${item.a}`)
    );

    const quickNotes = document.createElement("div");
    quickNotes.className = "card-block";

    const heading = document.createElement("h4");
    heading.textContent = "Support Route";

    const paragraph = document.createElement("p");
    paragraph.textContent = "Use the vendor guide when you need the fuller workflow, install guidance, or official support links for escalation.";

    quickNotes.append(heading, paragraph);
    stack.appendChild(quickNotes);

    const links = createLinks([
      { label: "Common fixes", url: `guides/${key}.html#common-fixes` },
      { label: "FAQ", url: `guides/${key}.html#faq` },
      { label: "Open full guide", url: `guides/${key}.html` }
    ]);

    card.append(title, summary, stack, links);
    vendorIssueGrid.appendChild(card);
  });
}

renderPatternCards();
renderVendorIssueCards();
