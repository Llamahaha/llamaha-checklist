import { vendorGuides, vendorOrder } from "./guideData.js";

const vendorKey = document.body.dataset.vendor;
const guide = vendorGuides[vendorKey];

const vendorTitle = document.getElementById("vendorTitle");
const vendorSummary = document.getElementById("vendorSummary");
const vendorProducts = document.getElementById("vendorProducts");
const vendorNav = document.getElementById("vendorNav");
const licenseSteps = document.getElementById("licenseSteps");
const installSteps = document.getElementById("installSteps");
const uninstallSteps = document.getElementById("uninstallSteps");
const watchFor = document.getElementById("watchFor");
const supportLinks = document.getElementById("supportLinks");

function renderList(container, items) {
  container.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderLinks(container, items) {
  container.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.label;
    link.target = "_blank";
    link.rel = "noreferrer";
    li.appendChild(link);
    container.appendChild(li);
  });
}

function renderNav() {
  vendorOrder.forEach(key => {
    const item = document.createElement("a");
    item.href = `${key}.html`;
    item.textContent = vendorGuides[key].title;
    item.className = key === vendorKey ? "is-active" : "";
    vendorNav.appendChild(item);
  });
}

if (!guide) {
  vendorTitle.textContent = "Guide not found";
  vendorSummary.textContent = "The requested vendor guide is not available.";
} else {
  document.title = `${guide.title} Guide`;
  vendorTitle.textContent = guide.title;
  vendorSummary.textContent = guide.summary;

  guide.products.forEach(product => {
    const chip = document.createElement("span");
    chip.className = "product-chip";
    chip.textContent = product;
    vendorProducts.appendChild(chip);
  });

  renderList(licenseSteps, guide.licenseSteps);
  renderList(installSteps, guide.installSteps);
  renderList(uninstallSteps, guide.uninstallSteps);
  renderList(watchFor, guide.watchFor);
  renderLinks(supportLinks, guide.supportLinks);
}

renderNav();
