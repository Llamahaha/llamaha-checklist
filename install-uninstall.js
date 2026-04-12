import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { vendorFaqs, vendorInstallIssues } from "./guides/guideExtras.js";
import { installUninstallPatterns } from "./supportData.js";
import { appendBlock, createLinks, createList, createPageCard } from "./resourceCommon.js";

const lifecycleGrid = document.getElementById("lifecycleGrid");
const vendorLifecycleGrid = document.getElementById("vendorLifecycleGrid");

installUninstallPatterns.forEach(item => {
  const card = createPageCard();
  card.append(
    Object.assign(document.createElement("h3"), { textContent: item.title }),
    Object.assign(document.createElement("p"), { textContent: item.text }),
    createList(item.fixes)
  );
  lifecycleGrid.appendChild(card);
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
  appendBlock(stack, "Shared Notes", guide.sharedNotes);
  const installItems = (vendorInstallIssues[key] ?? []).map(item => `${item.issue}: ${item.fix}`);
  appendBlock(stack, "Install / Cleanup Issues", installItems.length ? installItems : guide.sharedNotes);
  const faqItems = (vendorFaqs[key] ?? []).map(item => `${item.q}: ${item.a}`);
  appendBlock(stack, "FAQ", faqItems.length ? faqItems : guide.escalationNotes);
  const links = createLinks([
    { label: "Open vendor guide", url: `guides/${key}.html` },
    { label: "Guide hub", url: "vendor-guides.html" }
  ]);
  card.append(title, summary, stack, links);
  vendorLifecycleGrid.appendChild(card);
});

