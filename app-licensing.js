import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { matrixResource } from "./supportData.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";

const licensingGrid = document.getElementById("licensingGrid");
const matrixCard = document.getElementById("matrixCard");

const matrix = createPageCard("hub-note-card");
matrix.append(
  Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Microsoft Licensing" }),
  Object.assign(document.createElement("h3"), { textContent: matrixResource.title }),
  Object.assign(document.createElement("p"), { textContent: matrixResource.text }),
  createLinks([{ label: "Open M365 Maps Matrix", url: matrixResource.url, external: true }])
);
matrixCard.appendChild(matrix);

vendorOrder.forEach(key => {
  const guide = vendorGuides[key];
  const apps = getVendorApplications(key);
  const card = createPageCard("vendor-card");
  const title = document.createElement("h3");
  title.textContent = guide.title;
  const summary = document.createElement("p");
  summary.textContent = guide.summary;
  const stack = document.createElement("div");
  stack.className = "card-stack";
  appendBlock(stack, "In Scope", apps.map(item => item.name));
  appendBlock(stack, "Shared Notes", guide.sharedNotes);
  appendBlock(stack, "Escalate With", guide.escalationNotes);
  const links = createLinks([
    { label: "Open vendor guide", url: `guides/${key}.html` },
    { label: "Open guide hub", url: "vendor-guides.html" },
    ...apps.slice(0, 3).map(app => ({ label: app.name, url: `guides/${key}/${app.slug}.html` }))
  ]);
  card.append(title, summary, stack, links);
  licensingGrid.appendChild(card);
});
