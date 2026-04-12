import { taskLibrary } from "./data/taskLibrary.js";
import { applicationCatalog } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { vendorFaqs, vendorInstallIssues, vendorUsageIssues } from "./guides/guideExtras.js";
import {
  computerIssueSections,
  crossAppIssuePatterns,
  installUninstallPatterns,
  matrixResource,
  microsoftIssueSections
} from "./supportData.js";
import {
  emergencyPlaybooks,
  handoffTemplates,
  snippetLibrary
} from "./operationsData.js";

function entry(title, text, url, category, keywords = "") {
  return { title, text, url, category, keywords };
}

export function buildSearchIndex() {
  const entries = [
    entry("Checklist Generator", "Build onboarding and offboarding runbooks with saved local progress.", "checklist.html", "library", "onboarding offboarding checklist runbook"),
    entry("Application Licensing", "Vendor-specific licensing workflows and recovery notes.", "app-licensing.html", "library", "licensing seats subscriptions"),
    entry("Install / Uninstall Guides", "Install, uninstall, cleanup, and FAQ guidance.", "install-uninstall.html", "library", "install uninstall cleanup"),
    entry("Application Issues and Fixes", "Cross-app issue patterns plus vendor-specific fixes.", "application-issues.html", "library", "troubleshooting faq common errors"),
    entry("Microsoft App Issues", "Microsoft 365 app troubleshooting guidance.", "microsoft-issues.html", "microsoft", "word excel outlook teams onedrive sharepoint mfa"),
    entry("Computer Issues", "Common endpoint troubleshooting guidance.", "computer-issues.html", "computer", "printers vpn network disk space windows"),
    entry("Emergency Playbooks", "First-response incident playbooks for urgent support and security events.", "emergency-playbooks.html", "playbook", "incident response"),
    entry("Customer Handoff Templates", "Copy-ready customer completion and update templates.", "handoff-templates.html", "template", "closure notes handoff"),
    entry("Script and Snippet Library", "Safe, reusable commands for common troubleshooting workflows.", "snippets.html", "snippet", "commands powershell snippets"),
    entry(matrixResource.title, matrixResource.text, matrixResource.url, "external", "microsoft 365 matrix licensing")
  ];

  taskLibrary.forEach(task => {
    entries.push(
      entry(
        task.title,
        `${task.summary} ${task.steps.join(" ")}`,
        "checklist.html",
        "checklist",
        `${task.type} ${task.category} ${(task.systems ?? []).join(" ")}`
      )
    );
  });

  vendorOrder.forEach(key => {
    const guide = vendorGuides[key];
    entries.push(entry(guide.title, guide.summary, `guides/${key}.html`, "vendor", guide.products.join(" ")));

    (applicationCatalog[key] ?? []).forEach(app => {
      entries.push(
        entry(
          `${guide.title}: ${app.name}`,
          `${app.focus} ${app.licensing} ${app.install} ${app.uninstall}`,
          `guides/${key}.html#application-catalog`,
          "application",
          key
        )
      );
    });

    (vendorFaqs[key] ?? []).forEach(item => {
      entries.push(entry(`${guide.title} FAQ`, `${item.q} ${item.a}`, `guides/${key}.html#faq`, "vendor", key));
    });

    (vendorInstallIssues[key] ?? []).forEach(item => {
      entries.push(entry(`${guide.title} install issue`, `${item.issue} ${item.fix}`, `guides/${key}.html#install-issues`, "vendor", key));
    });

    (vendorUsageIssues[key] ?? []).forEach(item => {
      entries.push(entry(`${guide.title} common fix`, `${item.issue} ${item.fix}`, `guides/${key}.html#common-fixes`, "vendor", key));
    });
  });

  microsoftIssueSections.forEach(section => {
    section.items.forEach(item => {
      entries.push(entry(item.title, `${section.title} ${item.text} ${item.fixes.join(" ")}`, "microsoft-issues.html", "microsoft", "m365 office teams onedrive sharepoint"));
    });
  });

  computerIssueSections.forEach(section => {
    section.items.forEach(item => {
      entries.push(entry(item.title, `${section.title} ${item.text} ${item.fixes.join(" ")}`, "computer-issues.html", "computer", "windows endpoint network printer vpn"));
    });
  });

  crossAppIssuePatterns.forEach(item => {
    entries.push(entry(item.title, `${item.text} ${item.fixes.join(" ")}`, "application-issues.html", "application", "cross app issues"));
  });

  installUninstallPatterns.forEach(item => {
    entries.push(entry(item.title, `${item.text} ${item.fixes.join(" ")}`, "install-uninstall.html", "library", "install uninstall cleanup"));
  });

  emergencyPlaybooks.forEach(playbook => {
    entries.push(
      entry(
        playbook.title,
        `${playbook.triggers.join(" ")} ${playbook.first15.join(" ")} ${playbook.containment.join(" ")}`,
        `emergency-playbooks.html#${playbook.id}`,
        "playbook",
        "incident emergency response"
      )
    );
  });

  handoffTemplates.forEach(template => {
    entries.push(entry(template.title, `${template.useCase} ${template.template}`, `handoff-templates.html#${template.id}`, "template", "closure handoff customer email"));
  });

  snippetLibrary.forEach(group => {
    group.snippets.forEach(snippet => {
      entries.push(
        entry(
          snippet.title,
          `${group.category} ${snippet.notes} ${snippet.caution} ${snippet.command}`,
          "snippets.html",
          "snippet",
          `${group.category} ${snippet.shell}`
        )
      );
    });
  });

  return entries;
}
