import { vendorGuides, vendorOrder } from "./guideData.js";
import { applicationCatalog } from "./applicationCatalog.js";
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
const backLink = document.querySelector(".back-link");
const faqList = document.getElementById("faqList");
const licenseSteps = document.getElementById("licenseSteps");
const installSteps = document.getElementById("installSteps");
const uninstallSteps = document.getElementById("uninstallSteps");
const installIssues = document.getElementById("installIssues");
const usageIssues = document.getElementById("usageIssues");
const supportLinks = document.getElementById("supportLinks");
const guideGrid = document.querySelector(".guide-grid");

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

function renderApplications(items) {
  if (!guideGrid || !items.length) {
    return;
  }

  const supportCard = supportLinks?.closest(".guide-card");
  const section = document.createElement("section");
  section.className = "guide-card full";
  section.id = "application-catalog";

  const title = document.createElement("h2");
  title.textContent = "Application Coverage";

  const grid = document.createElement("div");
  grid.className = "application-grid";

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "application-card";

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const focus = document.createElement("p");
    focus.className = "application-focus";
    focus.textContent = item.focus;

    const licensing = document.createElement("p");
    licensing.innerHTML = `<strong>Licensing:</strong> ${item.licensing}`;

    const install = document.createElement("p");
    install.innerHTML = `<strong>Install:</strong> ${item.install}`;

    const uninstall = document.createElement("p");
    uninstall.innerHTML = `<strong>Uninstall / reclaim:</strong> ${item.uninstall}`;

    card.append(heading, focus, licensing, install, uninstall);
    grid.appendChild(card);
  });

  section.append(title, grid);

  if (supportCard) {
    guideGrid.insertBefore(section, supportCard);
    return;
  }

  guideGrid.appendChild(section);
}

function applySectionAnchors() {
  vendorProducts?.closest(".guide-card")?.setAttribute("id", "in-scope");
  licenseSteps?.closest(".guide-card")?.setAttribute("id", "licensing");
  installSteps?.closest(".guide-card")?.setAttribute("id", "installation");
  uninstallSteps?.closest(".guide-card")?.setAttribute("id", "uninstallation");
  faqList?.closest(".guide-card")?.setAttribute("id", "faq");
  installIssues?.closest(".guide-card")?.setAttribute("id", "install-issues");
  usageIssues?.closest(".guide-issue-card")?.setAttribute("id", "common-fixes");
  supportLinks?.closest(".guide-card")?.setAttribute("id", "official-links");
}

function scrollToHash() {
  if (!window.location.hash) {
    return;
  }

  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView();
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
  if (backLink) {
    backLink.textContent = "Back to home";
  }

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
  renderApplications(applicationCatalog[vendorKey] ?? []);
  applySectionAnchors();
  scrollToHash();
}

renderNav();
