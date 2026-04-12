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
const guideSidebar = document.querySelector(".guide-sidebar");

function renderList(container, items = []) {
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

function renderLinks(container, items = []) {
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

function renderFaqs(container, items = [], headingTag = "h3") {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  items.forEach(item => {
    const article = document.createElement("article");
    article.className = "faq-item";

    const question = document.createElement(headingTag);
    question.textContent = item.q;

    const answer = document.createElement("p");
    answer.textContent = item.a;

    article.append(question, answer);
    container.appendChild(article);
  });
}

function renderIssueList(container, items = []) {
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

function renderRichContent(container, content) {
  if (!container || !content) {
    return;
  }

  if (Array.isArray(content)) {
    const list = document.createElement("ul");
    renderList(list, content);
    container.appendChild(list);
    return;
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = content;
  container.appendChild(paragraph);
}

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isBrowserHeavyApp(item) {
  const combined = [item.focus, item.install, item.name]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return /browser|web ui|online|portal|no local install|hosted/.test(combined);
}

function buildSupportChecks(item) {
  if (item.supportChecks?.length) {
    return item.supportChecks;
  }

  if (isBrowserHeavyApp(item)) {
    return [
      `Confirm ${item.name} is tied to the right tenant, role, and SSO or MFA path before deeper troubleshooting starts.`,
      `Validate browser access, saved bookmarks, downloads, and any companion tools or launchers the workflow depends on.`,
      `Capture the granted groups, folders, company access, or project scope in the ticket so handoff and offboarding stay clean later.`
    ];
  }

  return [
    `Confirm ${item.name} opens with the correct managed identity, entitlement, or license source for this client.`,
    `Verify the approved version, plug-ins, templates, file associations, and companion tools are present before handoff.`,
    `Capture the exact build, add-ins, and any project or profile settings in the ticket so future support starts from the right baseline.`
  ];
}

function buildCommonIssues(item) {
  if (item.commonIssues?.length) {
    return item.commonIssues;
  }

  if (isBrowserHeavyApp(item)) {
    return [
      {
        issue: "The user can sign in but cannot reach the right data or workspace",
        fix: `Recheck the ${item.name} role, group, folder, or organization assignment before changing the workstation itself.`
      },
      {
        issue: "The browser workflow behaves differently after rollout or user turnover",
        fix: `Compare the browser, SSO path, saved profile, and supported add-ons against the client standard and reset them if they drifted.`
      }
    ];
  }

  return [
    {
      issue: "Access looks correct but the app still prompts for sign-in, activation, or trial mode",
      fix: `Recheck the assigned ${item.name} entitlement, cached identity, and the exact account the user is expected to use.`
    },
    {
      issue: "The app launches but role-specific templates, plug-ins, or project content are missing",
      fix: `Compare the workstation against the client-standard ${item.name} build and restore the supporting files called out in the setup notes.`
    }
  ];
}

function createApplicationCard(title, content, className = "") {
  const card = document.createElement("section");
  card.className = `application-detail-card ${className}`.trim();

  const heading = document.createElement("h4");
  heading.textContent = title;

  card.appendChild(heading);
  renderRichContent(card, content);
  return card;
}

function renderApplicationLinks(items) {
  if (!guideSidebar || !items.length) {
    return;
  }

  const appCard = document.createElement("section");
  appCard.className = "guide-nav-card guide-app-card";
  appCard.id = "application-links";

  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = "Applications";

  const heading = document.createElement("h3");
  heading.textContent = "Jump to app guides";

  const copy = document.createElement("p");
  copy.className = "guide-side-copy";
  copy.textContent = `${items.length} product-specific sections are available in this vendor guide.`;

  const links = document.createElement("div");
  links.className = "guide-app-links";

  items.forEach(item => {
    const link = document.createElement("a");
    link.className = "guide-app-link";
    link.href = `#app-${toSlug(item.name)}`;
    link.textContent = item.name;
    links.appendChild(link);
  });

  appCard.append(kicker, heading, copy, links);

  const issueCard = guideSidebar.querySelector(".guide-issue-card");
  guideSidebar.insertBefore(appCard, issueCard ?? null);
}

function renderApplicationGuides(items) {
  if (!guideGrid || !items.length) {
    return;
  }

  const supportCard = supportLinks?.closest(".guide-card");
  const section = document.createElement("section");
  section.className = "guide-card full application-stack";
  section.id = "application-guides";

  const title = document.createElement("h2");
  title.textContent = "Application Guides";

  const intro = document.createElement("p");
  intro.className = "application-intro";
  intro.textContent = "Each application below has its own admin, install, and reclaim notes so techs can stay in one guide instead of bouncing between pages.";

  const list = document.createElement("div");
  list.className = "application-list";

  items.forEach(item => {
    const article = document.createElement("article");
    article.className = "application-detail";
    article.id = `app-${toSlug(item.name)}`;

    const header = document.createElement("div");
    header.className = "application-header";

    const kicker = document.createElement("p");
    kicker.className = "section-kicker";
    kicker.textContent = "Application Guide";

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const summary = document.createElement("p");
    summary.className = "application-summary";
    summary.textContent = item.summary ?? item.focus;

    header.append(kicker, heading, summary);

    const detailGrid = document.createElement("div");
    detailGrid.className = "application-detail-grid";
    detailGrid.append(
      createApplicationCard("License / access", item.licenseSteps ?? item.licensing),
      createApplicationCard("Install / setup", item.installSteps ?? item.install),
      createApplicationCard("Uninstall / reclaim", item.uninstallSteps ?? item.uninstall)
    );

    const supportGrid = document.createElement("div");
    supportGrid.className = "application-support-grid";

    const checksCard = createApplicationCard("Support checkpoints", buildSupportChecks(item));

    const issuesCard = document.createElement("section");
    issuesCard.className = "application-detail-card";
    const issuesHeading = document.createElement("h4");
    issuesHeading.textContent = "Common app issues";
    const issuesList = document.createElement("ul");
    issuesList.className = "issue-list";
    renderIssueList(issuesList, buildCommonIssues(item));
    issuesCard.append(issuesHeading, issuesList);

    supportGrid.append(checksCard, issuesCard);

    if (item.faq?.length) {
      const faqCard = document.createElement("section");
      faqCard.className = "application-detail-card";
      const faqHeading = document.createElement("h4");
      faqHeading.textContent = "Application FAQ";
      const appFaqList = document.createElement("div");
      appFaqList.className = "faq-list";
      renderFaqs(appFaqList, item.faq, "h4");
      faqCard.append(faqHeading, appFaqList);
      supportGrid.appendChild(faqCard);
    }

    if (item.supportLinks?.length) {
      const linksCard = document.createElement("section");
      linksCard.className = "application-detail-card";
      const linksHeading = document.createElement("h4");
      linksHeading.textContent = "Application links";
      const linkList = document.createElement("ul");
      renderLinks(linkList, item.supportLinks);
      linksCard.append(linksHeading, linkList);
      supportGrid.appendChild(linksCard);
    }

    article.append(header, detailGrid, supportGrid);
    list.appendChild(article);
  });

  section.append(title, intro, list);

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
  target?.scrollIntoView({ block: "start" });
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
  renderList(vendorProducts, guide.products);

  renderList(licenseSteps, guide.licenseSteps);
  renderList(installSteps, guide.installSteps);
  renderList(uninstallSteps, guide.uninstallSteps);
  renderFaqs(faqList, vendorFaqs[vendorKey] ?? []);
  renderIssueList(installIssues, vendorInstallIssues[vendorKey] ?? []);
  renderIssueList(usageIssues, vendorUsageIssues[vendorKey] ?? []);
  renderLinks(supportLinks, guide.supportLinks);
  renderApplicationLinks(applicationCatalog[vendorKey] ?? []);
  renderApplicationGuides(applicationCatalog[vendorKey] ?? []);
  applySectionAnchors();
  scrollToHash();
}

renderNav();
