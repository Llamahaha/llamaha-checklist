import { taskLibrary } from "./data/taskLibrary.js";
import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { vendorFaqs, vendorInstallIssues, vendorUsageIssues } from "./guides/guideExtras.js";
import {
  computerIssueSections,
  crossAppIssuePatterns,
  installUninstallPatterns,
  microsoftIssueSections
} from "./supportData.js";
import { emergencyPlaybooks } from "./operationsData.js";
import { handoffTemplates, snippetLibrary } from "./resourceLibrary.js";

function entry(title, text, url, category, typeLabel, keywords = "") {
  return { title, text, url, category, typeLabel, keywords };
}

export function buildSearchIndex() {
  const entries = [
    entry("Home", "Operations hub for guides, snippets, templates, playbooks, and checklists.", "index.html", "hub", "Hub Page", "home hub"),
    entry("Vendor Guides", "Vendor-wide guide hub with app index pages and breadcrumbs into dedicated app guides.", "vendor-guides.html", "vendorGuide", "Vendor Guide Hub", "vendor guides applications"),
    entry("Checklist Generator", "Build onboarding and offboarding runbooks with saved local progress.", "checklist.html", "checklist", "Checklist", "onboarding offboarding checklist runbook"),
    entry("Emergency Playbooks", "First-response incident playbooks for urgent support and security events.", "emergency-playbooks.html", "playbook", "Playbook", "incident response ransomware compromise"),
    entry("Snippet Library", "Grouped MSP-ready snippets for Microsoft 365, AD, networking, Windows repair, software cleanup, and endpoint checks.", "snippets.html", "snippet", "Snippet Library", "powershell snippets commands"),
    entry("Template Library", "Customer-facing and internal MSP templates by use case.", "handoff-templates.html", "template", "Template Library", "handoff closure outage onboarding"),
    entry("Application Licensing", "Vendor-specific licensing workflows and recovery notes.", "app-licensing.html", "hub", "Library Page", "licensing seats subscriptions"),
    entry("Install / Uninstall Guides", "Install, uninstall, cleanup, and FAQ guidance.", "install-uninstall.html", "hub", "Library Page", "install uninstall cleanup"),
    entry("Application Issues and Fixes", "Cross-app issue patterns plus vendor-specific fixes.", "application-issues.html", "issueGuide", "Issue Guide", "troubleshooting faq errors"),
    entry("Microsoft App Issues", "Microsoft 365 app troubleshooting guidance.", "microsoft-issues.html", "issueGuide", "Issue Guide", "outlook teams onedrive sharepoint mfa")
  ];

  taskLibrary.forEach(task => {
    entries.push(entry(task.title, `${task.summary} ${task.steps.join(" ")}`, "checklist.html", "checklist", "Checklist Task", `${task.type} ${task.category} ${(task.systems ?? []).join(" ")}`));
  });

  vendorOrder.forEach(vendorSlug => {
    const vendor = vendorGuides[vendorSlug];
    entries.push(entry(vendor.title, `${vendor.summary} ${vendor.overview}`, `guides/${vendorSlug}.html`, "vendorGuide", "Vendor Guide", vendor.products.join(" ")));

    getVendorApplications(vendorSlug).forEach(app => {
      const extra = getAppGuideContent(vendorSlug, app.slug);
      entries.push(
        entry(
          app.name,
          `${app.focus} ${app.licensing} ${app.install} ${app.uninstall} ${(extra.highlights ?? []).join(" ")} ${(extra.askFirst ?? []).join(" ")} ${(extra.supportCheckpoints ?? []).join(" ")} ${(extra.escalationNotes ?? []).join(" ")}`,
          `guides/${vendorSlug}/${app.slug}.html`,
          "appGuide",
          "App Guide",
          `${vendorSlug} ${app.name}`
        )
      );
    });

    (vendorFaqs[vendorSlug] ?? []).forEach(item => {
      entries.push(entry(`${vendor.title} FAQ`, `${item.q} ${item.a}`, `guides/${vendorSlug}.html#shared-notes`, "vendorGuide", "Vendor Guide", vendorSlug));
    });

    (vendorInstallIssues[vendorSlug] ?? []).forEach(item => {
      entries.push(entry(`${vendor.title} install issue`, `${item.issue} ${item.fix}`, `guides/${vendorSlug}.html#common-patterns`, "issueGuide", "Issue Guide", vendorSlug));
    });

    (vendorUsageIssues[vendorSlug] ?? []).forEach(item => {
      entries.push(entry(`${vendor.title} common fix`, `${item.issue} ${item.fix}`, `guides/${vendorSlug}.html#common-patterns`, "issueGuide", "Issue Guide", vendorSlug));
    });
  });

  microsoftIssueSections.forEach(section => {
    section.items.forEach(item => {
      entries.push(entry(item.title, `${section.title} ${item.text} ${item.fixes.join(" ")}`, "microsoft-issues.html", "issueGuide", "Issue Guide", "m365 office microsoft"));
    });
  });

  computerIssueSections.forEach(section => {
    section.items.forEach(item => {
      entries.push(entry(item.title, `${section.title} ${item.text} ${item.fixes.join(" ")}`, "computer-issues.html", "issueGuide", "Issue Guide", "windows endpoint network printer vpn"));
    });
  });

  crossAppIssuePatterns.forEach(item => {
    entries.push(entry(item.title, `${item.text} ${item.fixes.join(" ")}`, "application-issues.html", "issueGuide", "Issue Guide", "cross app issues"));
  });

  installUninstallPatterns.forEach(item => {
    entries.push(entry(item.title, `${item.text} ${item.fixes.join(" ")}`, "install-uninstall.html", "issueGuide", "Issue Guide", "install uninstall cleanup"));
  });

  emergencyPlaybooks.forEach(playbook => {
    entries.push(entry(playbook.title, `${playbook.triggers.join(" ")} ${playbook.first15.join(" ")}`, `emergency-playbooks.html#${playbook.id}`, "playbook", "Playbook", "incident emergency response"));
  });

  handoffTemplates.forEach(template => {
    entries.push(entry(template.title, `${template.useCase} ${template.template}`, `handoff-templates.html#${template.id}`, "template", "Template", template.category));
  });

  snippetLibrary.forEach(group => {
    group.snippets.forEach(snippet => {
      entries.push(entry(snippet.title, `${group.category} ${snippet.purpose} ${snippet.whenToUse} ${snippet.command}`, `snippets.html#${snippet.id}`, "snippet", "Snippet", group.category));
    });
  });

  return entries;
}
