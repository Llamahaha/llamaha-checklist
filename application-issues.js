import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { vendorFaqs, vendorUsageIssues } from "./guides/guideExtras.js";
import { crossAppIssuePatterns } from "./supportData.js";
import { appendBlock, createLinks, createList, createPageCard } from "./resourceCommon.js";

const patternGrid = document.getElementById("patternGrid");
const vendorIssueGrid = document.getElementById("vendorIssueGrid");

crossAppIssuePatterns.forEach(item => {
  const card = createPageCard();
  card.append(
    Object.assign(document.createElement("h3"), { textContent: item.title }),
    Object.assign(document.createElement("p"), { textContent: item.text }),
    createList(item.fixes)
  );
  patternGrid.appendChild(card);
});

vendorOrder.forEach(key => {
  const guide = vendorGuides[key];
  const card = createPageCard("vendor-card");
  const title = document.createElement("h3");
  title.textContent = guide.title;
  const summary = document.createElement("p");
  summary.textContent = guide.summary;
  const stack = document.createElement("div");
  stack.className = "card-stack";
  const usageItems = (vendorUsageIssues[key] ?? []).map(item => `${item.issue}: ${item.fix}`);
  appendBlock(stack, "Common issues", usageItems.length ? usageItems : guide.sharedNotes);
  const faqItems = (vendorFaqs[key] ?? []).map(item => `${item.q}: ${item.a}`);
  appendBlock(stack, "Frequently asked questions", faqItems.length ? faqItems : ["Open the vendor guide for product-specific help."]);
  const links = createLinks([
    { label: "Open vendor guide", url: `guides/${key}.html` },
    { label: "Vendor guide hub", url: "vendor-guides.html" }
  ]);
  card.append(title, summary, stack, links);
  vendorIssueGrid.appendChild(card);
});
