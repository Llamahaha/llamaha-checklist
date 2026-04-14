import { matrixResource } from "./supportData.js";
import { internalLicensingReference } from "./internalContent.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";

const licensingGrid = document.getElementById("licensingGrid");
const matrixCard = document.getElementById("matrixCard");

if (matrixCard) {
  const matrix = createPageCard("hub-note-card");
  matrix.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Microsoft 365 Plans" }),
    Object.assign(document.createElement("h3"), { textContent: matrixResource.title }),
    Object.assign(document.createElement("p"), { textContent: "Use this matrix when you need a fast plan-to-feature comparison while validating Microsoft 365 seat scope or service-plan expectations." }),
    createLinks([{ label: "Open M365 Maps Matrix", url: matrixResource.url, external: true }])
  );
  matrixCard.appendChild(matrix);
}

if (licensingGrid) {
  internalLicensingReference.forEach(entry => {
    const card = createPageCard("vendor-card");
    card.id = `${entry.slug}-licensing`;

    const title = document.createElement("h3");
    title.textContent = entry.title;

    const summary = document.createElement("p");
    summary.textContent = entry.summary;

    const stack = document.createElement("div");
    stack.className = "card-stack";
    appendBlock(stack, "In Scope", entry.inScope);
    appendBlock(stack, "Admin Surfaces", entry.adminSurfaces);
    appendBlock(stack, "Seat Recovery Notes", entry.recoveryNotes);
    appendBlock(stack, "Capture Before Changes", entry.collect);

    const links = createLinks(
      entry.links.map(item => ({
        ...item,
        external: item.external ?? /^https?:/i.test(item.url)
      }))
    );

    card.append(title, summary, stack, links);
    licensingGrid.appendChild(card);
  });
}
