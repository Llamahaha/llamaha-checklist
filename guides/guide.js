import { vendorGuides, vendorOrder } from "./guideData.js";
import {
  vendorFaqs,
  vendorInstallIssues,
  vendorUsageIssues
} from "./guideExtras.js";

const vendorKey = document.body.dataset.vendor;
const guide = vendorGuides[vendorKey];

const vendorTitle = document.getElementById("vendorTitle");
const vendorSummary = document.getElementById("vendorSummary");
const vendorProducts = document.getElementById("vendorProducts");
const vendorNav = document.getElementById("vendorNav");
const faqList = document.getElementById("faqList");
const licenseSteps = document.getElementById("licenseSteps");
const installSteps = document.getElementById("installSteps");
const uninstallSteps = document.getElementById("uninstallSteps");
const installIssues = document.getElementById("installIssues");
const usageIssues = document.getElementById("usageIssues");
const supportLinks = document.getElementById("supportLinks");

function renderList(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderLinks(container, items) {
  if (!container) {
    return;
  }

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

function renderFaqs(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  items.forEach(item => {
    const article = document.createElement("article");
    article.className = "faq-item";

    const question = document.createElement("h3");
    question.textContent = item.q;

    const answer = document.createElement("p");
    answer.textContent = item.a;

    article.append(question, answer);
    container.appendChild(article);
  });
}

function renderIssueList(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    const issue = document.createElement("strong");
    issue.textContent = `${item.issue}:`;

    const text = document.createTextNode(` ${item.fix}`);

    li.append(issue, text);
    container.appendChild(li);
  });
}

function renderNav() {
  if (!vendorNav) {
    return;
  }

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
  renderFaqs(faqList, vendorFaqs[vendorKey] ?? []);
  renderIssueList(installIssues, vendorInstallIssues[vendorKey] ?? []);
  renderIssueList(usageIssues, vendorUsageIssues[vendorKey] ?? []);
  renderLinks(supportLinks, guide.supportLinks);
}

renderNav();
