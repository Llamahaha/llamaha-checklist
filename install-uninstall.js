import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { vendorFaqs, vendorInstallIssues } from "./guides/guideExtras.js";
import { installUninstallPatterns } from "./supportData.js";
import { appendBlock, createLinks, createList, createPageCard } from "./resourceCommon.js";

const lifecycleGrid = document.getElementById("lifecycleGrid");
const vendorLifecycleGrid = document.getElementById("vendorLifecycleGrid");

function renderLifecyclePatterns() {
  if (!lifecycleGrid) {
    return;
  }

  installUninstallPatterns.forEach(item => {
    const card = createPageCard();
    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    const fixes = createList(item.fixes);
    card.append(title, text, fixes);
    lifecycleGrid.appendChild(card);
  });
}

function renderVendorLifecycleCards() {
  if (!vendorLifecycleGrid) {
    return;
  }

  vendorOrder.forEach(key => {
    const guide = vendorGuides[key];
    const issues = vendorInstallIssues[key] ?? [];
    const faq = vendorFaqs[key] ?? [];
    const card = createPageCard("vendor-card");

    const title = document.createElement("h3");
    title.textContent = guide.title;

    const summary = document.createElement("p");
    summary.textContent = guide.summary;

    const stack = document.createElement("div");
    stack.className = "card-stack";

    appendBlock(stack, "Install Steps", guide.installSteps);
    appendBlock(stack, "Uninstall Steps", guide.uninstallSteps);
    appendBlock(
      stack,
      "Common Install / Cleanup Issues",
      issues.map(item => `${item.issue}: ${item.fix}`)
    );
    appendBlock(
      stack,
      "FAQ",
      faq.map(item => `${item.q}: ${item.a}`)
    );

    const links = createLinks([
      { label: "Installation section", url: `guides/${key}.html#installation` },
      { label: "Uninstallation section", url: `guides/${key}.html#uninstallation` },
      { label: "FAQ section", url: `guides/${key}.html#faq` },
      { label: "Install issues", url: `guides/${key}.html#install-issues` },
      { label: "Open full guide", url: `guides/${key}.html` }
    ]);

    card.append(title, summary, stack, links);
    vendorLifecycleGrid.appendChild(card);
  });
}

renderLifecyclePatterns();
renderVendorLifecycleCards();
