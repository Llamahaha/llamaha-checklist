import { applicationCatalog } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { matrixResource } from "./supportData.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";

const licensingGrid = document.getElementById("licensingGrid");
const matrixCard = document.getElementById("matrixCard");

function renderMatrixCard() {
  if (!matrixCard) {
    return;
  }

  const card = createPageCard("hub-note-card");
  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Microsoft Licensing";

  const title = document.createElement("h3");
  title.textContent = matrixResource.title;

  const text = document.createElement("p");
  text.textContent = matrixResource.text;

  const links = createLinks([
    {
      label: "Open M365 Maps Matrix",
      url: matrixResource.url,
      external: true
    }
  ]);

  card.append(kicker, title, text, links);
  matrixCard.appendChild(card);
}

function renderLicensingCards() {
  if (!licensingGrid) {
    return;
  }

  vendorOrder.forEach(key => {
    const guide = vendorGuides[key];
    const apps = applicationCatalog[key] ?? [];
    const card = createPageCard("vendor-card");

    const title = document.createElement("h3");
    title.textContent = guide.title;

    const summary = document.createElement("p");
    summary.textContent = guide.summary;

    const stack = document.createElement("div");
    stack.className = "card-stack";

    appendBlock(
      stack,
      "In Scope",
      `Coverage: ${(apps.length ? apps.map(item => item.name) : guide.products).join(", ")}`
    );
    appendBlock(stack, "License Workflow", guide.licenseSteps);
    appendBlock(stack, "Watch For", guide.watchFor);

    const links = createLinks([
      { label: "Open full guide", url: `guides/${key}.html` },
      { label: "Jump to licensing", url: `guides/${key}.html#licensing` },
      { label: "Application coverage", url: `guides/${key}.html#application-catalog` },
      ...guide.supportLinks.map(item => ({
        label: item.label,
        url: item.url,
        external: true
      }))
    ]);

    card.append(title, summary, stack, links);
    licensingGrid.appendChild(card);
  });
}

renderMatrixCard();
renderLicensingCards();
