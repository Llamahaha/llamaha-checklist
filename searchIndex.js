import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

function entry(title, text, url, category, typeLabel, keywords = "") {
  return { title, text, url, category, typeLabel, keywords };
}

export function buildSearchIndex() {
  const entries = [
    entry("Home", "Operations hub for guides, libraries, playbooks, and checklists.", "index.html", "hub", "Hub Page", "home hub"),
    entry("Applications", "Application directory grouped by vendor with direct links into dedicated app guides.", "applications.html", "hub", "Hub Page", "applications app directory"),
    entry("Contact", "Contact paths for site suggestions, corrections, and library questions.", "contact.html", "hub", "Hub Page", "contact help support email"),
    entry("Vendor Guides", "Vendor-wide guide hub with app index pages and breadcrumbs into dedicated app guides.", "vendor-guides.html", "vendorGuide", "Vendor Guide Hub", "vendor guides applications"),
    entry("Checklist Generator", "Build onboarding and offboarding runbooks with saved local progress.", "checklist.html", "checklist", "Checklist", "onboarding offboarding checklist runbook"),
    entry("Emergency Playbooks", "First-response incident playbooks for urgent support and security events.", "emergency-playbooks.html", "playbook", "Playbook", "incident response ransomware compromise"),
    entry("Snippet Library", "Grouped MSP-ready snippets for Microsoft 365, AD, networking, Windows repair, software cleanup, and endpoint checks.", "snippets.html", "snippet", "Library Page", "powershell snippets commands"),
    entry("Template Library", "Copy-ready customer-facing and internal templates for approvals, handoffs, outage notes, maintenance notices, and ticket closure.", "templates.html", "template", "Library Page", "templates handoff communication"),
    entry("Application Licensing", "Vendor-specific licensing workflows and recovery notes.", "app-licensing.html", "hub", "Library Page", "licensing seats subscriptions"),
    entry("Install / Uninstall Guides", "Install, uninstall, cleanup, and FAQ guidance.", "install-uninstall.html", "hub", "Library Page", "install uninstall cleanup"),
    entry("Application Issues and Fixes", "Cross-app issue patterns plus vendor-specific fixes.", "application-issues.html", "issueGuide", "Issue Guide", "troubleshooting faq errors"),
    entry("Microsoft App Issues", "Microsoft 365 app troubleshooting guidance.", "microsoft-issues.html", "issueGuide", "Issue Guide", "outlook teams onedrive sharepoint mfa"),
    entry("Computer Issues", "Workstation, endpoint, printer, networking, and repair issue patterns.", "computer-issues.html", "issueGuide", "Issue Guide", "computer windows printer vpn network")
  ];

  vendorOrder.forEach(vendorSlug => {
    const vendor = vendorGuides[vendorSlug];
    entries.push(entry(vendor.title, `${vendor.summary} ${vendor.overview}`, `guides/${vendorSlug}.html`, "vendorGuide", "Vendor Guide", vendor.products.join(" ")));

    getVendorApplications(vendorSlug).forEach(app => {
      const extra = getAppGuideContent(vendorSlug, app.slug);
      entries.push(
        entry(
          app.name,
          `${app.focus} ${app.licensing} ${app.install} ${app.uninstall} ${(extra.highlights ?? []).join(" ")} ${(extra.askFirst ?? []).join(" ")} ${(extra.supportCheckpoints ?? []).join(" ")}`,
          `guides/${vendorSlug}/${app.slug}.html`,
          "appGuide",
          "App Guide",
          `${vendorSlug} ${app.name}`
        )
      );
    });
  });

  return entries;
}
