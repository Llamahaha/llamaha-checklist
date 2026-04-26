import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { getPublicGuideContent } from "./guides/publicGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { internalLicensingReference, internalOnlyGuideGroups, internalTipsAndTricksSections } from "./internalContent.js";
import { internalTipsAndTricksExtraSections } from "./internalContentExtra.js";
import { decisionTrees, emergencyPlaybooks, servicePlaybooks } from "./operationsData.js";
import { snippetLibrary } from "./resourceLibrary.js";
import { buildSearchIndex } from "./searchIndex.js";

const hiddenInternalReferenceVendors = new Set(["quickbooks"]);

function entry(title, text, url, category, typeLabel, keywords = "", scope = "internal") {
  return { title, text, url, category, typeLabel, keywords, scope };
}

function slugifyText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function asText(value) {
  if (!value) return "";
  if (Array.isArray(value)) return value.map(asText).join(" ");
  if (typeof value === "object") return Object.values(value).map(asText).join(" ");
  return String(value);
}

function summarizeIssue(issue) {
  if (!issue) return "";
  return asText([issue.title ?? issue.issue, issue.symptom, issue.likelyFix ?? issue.fix, issue.collect]);
}

function publicUrlForInternal(url) {
  if (/^(https?:|mailto:|tel:|#)/i.test(url)) {
    return url;
  }
  return url.startsWith("../") ? url : `../${url}`;
}

function buildPublicEntries() {
  return buildSearchIndex().map(item => ({
    ...item,
    url: publicUrlForInternal(item.url),
    typeLabel: `Public: ${item.typeLabel}`,
    scope: "public"
  }));
}

function buildInternalReferenceEntries() {
  const entries = [
    entry(
      "Reference Guides",
      "Technician-facing app notes, licensing context, support checkpoints, and common issue patterns across Microsoft, engineering, PDF, VPN, and internal tools.",
      "reference-guides.html",
      "internalReference",
      "Internal Reference Page",
      "apps guides vendors licensing support checkpoints"
    )
  ];

  internalLicensingReference
    .filter(item => !hiddenInternalReferenceVendors.has(item.slug))
    .forEach(item => {
      entries.push(entry(
        `${item.title} licensing notes`,
        asText([item.summary, item.inScope, item.adminSurfaces, item.recoveryNotes, item.seatRecovery, item.collect, item.captureBeforeChanges]),
        `reference-guides.html#${item.slug}-licensing`,
        "internalReference",
        "Internal Licensing Note",
        item.title
      ));
    });

  internalOnlyGuideGroups.forEach(group => {
    entries.push(entry(
      group.title,
      asText([group.summary, group.apps.map(app => app.name)]),
      `reference-guides.html#vendor-${group.slug}`,
      "internalReference",
      "Internal Tool Family",
      group.slug
    ));

    group.apps.forEach(app => {
      entries.push(entry(
        app.name,
        asText([app.summary, app.highlights, app.askFirst, app.supportCheckpoints, app.commonIssues?.map(summarizeIssue), app.usefulInfo]),
        `reference-guides.html#guide-${group.slug}-${app.slug}`,
        "internalReference",
        "Internal App Guide",
        `${group.title} ${app.slug}`
      ));
    });
  });

  vendorOrder.forEach(vendorSlug => {
    if (hiddenInternalReferenceVendors.has(vendorSlug)) {
      return;
    }

    const vendor = vendorGuides[vendorSlug];
    entries.push(entry(
      vendor.title,
      asText([vendor.summary, vendor.overview, vendor.products]),
      `reference-guides.html#vendor-${vendorSlug}`,
      "internalReference",
      "Internal Vendor Reference",
      vendorSlug
    ));

    getVendorApplications(vendorSlug).forEach(app => {
      const extra = getAppGuideContent(vendorSlug, app.slug);
      const publicGuide = getPublicGuideContent(vendorSlug, app.slug);
      entries.push(entry(
        app.name,
        asText([
          app.focus,
          app.install,
          app.licensing,
          publicGuide.summary,
          publicGuide.mobileSetup,
          publicGuide.overview,
          extra.summary,
          extra.highlights,
          extra.askFirst,
          extra.supportCheckpoints,
          extra.commonIssues?.map(summarizeIssue),
          extra.usefulInfo
        ]),
        `reference-guides.html#guide-${vendorSlug}-${app.slug}`,
        "internalReference",
        "Internal App Guide",
        `${vendor.title} ${vendorSlug} ${app.slug}`
      ));
    });
  });

  return entries;
}

function buildPlaybookEntries() {
  const entries = [
    entry(
      "Playbooks",
      "Emergency response guidance, guided triage notes, and everyday service procedures for repeatable technician work.",
      "playbooks.html",
      "internalPlaybook",
      "Internal Playbook Page",
      "emergency procedures triage service"
    )
  ];

  emergencyPlaybooks.forEach(playbook => {
    entries.push(entry(
      playbook.title,
      asText([playbook.severity, playbook.triggers, playbook.first15, playbook.containment, playbook.communication, playbook.verify]),
      `playbooks.html#${playbook.id}`,
      "internalPlaybook",
      "Emergency Playbook",
      "emergency incident response"
    ));
  });

  decisionTrees.forEach(tree => {
    entries.push(entry(
      tree.title,
      asText([tree.summary, Object.values(tree.nodes)]),
      `playbooks.html#triage-${tree.id}`,
      "internalPlaybook",
      "Guided Triage Note",
      "decision tree guided triage first pass"
    ));
  });

  servicePlaybooks.forEach(playbook => {
    entries.push(entry(
      playbook.title,
      asText([playbook.summary, playbook.whenToUse, playbook.assess, playbook.steps, playbook.collect, playbook.verify]),
      `playbooks.html#${playbook.id}`,
      "internalPlaybook",
      "Service Playbook",
      "service procedure workflow"
    ));
  });

  return entries;
}

function buildTipEntries() {
  const entries = [
    entry(
      "Tips & Tricks",
      "Internal support habits for evidence capture, safer resets, cleanup, mobile cutovers, and first-pass app triage.",
      "tips-and-tricks.html",
      "internalTip",
      "Internal Tips Page",
      "tips tricks internal support habits"
    )
  ];

  [...internalTipsAndTricksSections, ...internalTipsAndTricksExtraSections].forEach(section => {
    entries.push(entry(
      section.title,
      asText([section.description, section.items]),
      `tips-and-tricks.html#${slugifyText(section.title)}`,
      "internalTip",
      "Internal Tips Section",
      section.title
    ));

    section.items.forEach(item => {
      entries.push(entry(
        item.title,
        asText([item.text, item.fixes]),
        `tips-and-tricks.html#${slugifyText(section.title)}`,
        "internalTip",
        "Internal Tip",
        section.title
      ));
    });
  });

  return entries;
}

function buildSnippetEntries() {
  const entries = [
    entry(
      "Snippets",
      "Technician commands and script references for recurring support work.",
      "snippets.html",
      "internalSnippet",
      "Internal Snippets Page",
      "commands powershell scripts snippets"
    )
  ];

  snippetLibrary.forEach(group => {
    entries.push(entry(
      group.category,
      asText(group.snippets),
      `snippets.html#${slugifyText(group.category)}`,
      "internalSnippet",
      "Snippet Category",
      group.category
    ));

    group.snippets.forEach(snippet => {
      entries.push(entry(
        snippet.title,
        asText([snippet.purpose, snippet.whenToUse, snippet.prerequisites, snippet.command, snippet.expectedResult, snippet.caution]),
        `snippets.html#${snippet.id}`,
        "internalSnippet",
        "Snippet",
        group.category
      ));
    });
  });

  return entries;
}

function buildChecklistEntries() {
  return [
    entry(
      "Checklists",
      "Generate onboarding and offboarding runbooks with saved progress for standard and engineering-heavy client environments.",
      "checklist.html",
      "internalChecklist",
      "Internal Checklist Page",
      "onboarding offboarding checklist runbook"
    )
  ];
}

function buildCheatsheetEntries() {
  return [
    entry(
      "Warranty lookup cheatsheet",
      "Where to paste a serial / service tag for each major OEM (Dell, Lenovo, HP, Apple, Microsoft Surface), what those identifiers look like, how to find them on the device, and bulk lookup notes.",
      "reference/warranty-lookup.html",
      "internalReference",
      "Cheatsheet",
      "warranty serial service tag dell lenovo hp apple surface oem hardware lookup"
    )
  ];
}

export function buildInternalSearchIndex() {
  return [
    ...buildPublicEntries(),
    entry(
      "Internal Home",
      "Internal landing page with search, Support Pages, and public-home access.",
      "index.html",
      "internalPage",
      "Internal Page",
      "home internal library"
    ),
    entry(
      "Support Pages",
      "Internal support hub for reference guides, tips and tricks, playbooks, snippets, checklists, templates, mailbox decommission, warranty lookup, and live-ticket paths.",
      "support.html",
      "internalPage",
      "Internal Support Page",
      "support pages reference guides tips tricks tools playbooks snippets checklists templates mailbox warranty"
    ),
    ...buildInternalReferenceEntries(),
    ...buildPlaybookEntries(),
    ...buildTipEntries(),
    ...buildSnippetEntries(),
    ...buildChecklistEntries(),
    ...buildCheatsheetEntries()
  ];
}
