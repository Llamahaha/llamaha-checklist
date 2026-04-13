import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

function entry(title, text, url, category, typeLabel, keywords = "") {
  return { title, text, url, category, typeLabel, keywords };
}

export function buildSearchIndex() {
  const entries = [
    entry("Home", "Client-facing help center with search, vendor guides, applications, and support contact options.", "index.html", "page", "Page", "home help center"),
    entry("Search", "Search vendor guides, app guides, help topics, and support pages.", "search.html", "page", "Page", "search help"),
    entry("Vendor Guides", "Browse help by vendor and then open the application guide you need.", "vendor-guides.html", "vendorGuide", "Vendor Guide Hub", "vendor guides browse"),
    entry("Applications", "Browse every supported application in one directory.", "applications.html", "applicationDirectory", "Applications Page", "applications app directory"),
    entry("Contact Support", "Contact options and what to include when you still need help.", "contact.html", "page", "Support Page", "contact support help"),
    entry("Microsoft help topics", "Common help for Outlook, Teams, OneDrive, SharePoint, MFA, and Office activation.", "microsoft-issues.html", "helpTopic", "Help Topic", "microsoft outlook teams onedrive sharepoint mfa"),
    entry("Software issues", "Common troubleshooting patterns across software and application families.", "application-issues.html", "helpTopic", "Help Topic", "software app issues troubleshooting"),
    entry("Computer issues", "Help with printers, VPN, mapped drives, low storage, performance, and sign-in issues.", "computer-issues.html", "helpTopic", "Help Topic", "computer printer vpn mapped drive performance"),
    entry("Internal sign in", "Protected internal library for team-only tools and references.", "internal/index.html", "page", "Page", "internal sign in")
  ];

  vendorOrder.forEach(vendorSlug => {
    const vendor = vendorGuides[vendorSlug];
    entries.push(entry(
      vendor.title,
      `Help for ${vendor.title} applications, setup, sign-in, file access, and common issues.`,
      `guides/${vendorSlug}.html`,
      "vendorGuide",
      "Vendor Guide",
      `${vendor.products.join(" ")} ${vendor.summary} ${vendor.overview}`
    ));

    getVendorApplications(vendorSlug).forEach(app => {
      const extra = getAppGuideContent(vendorSlug, app.slug);
      entries.push(entry(
        app.name,
        `Help with ${app.name} setup, access, common problems, and next steps.`,
        `guides/${vendorSlug}/${app.slug}.html`,
        "appGuide",
        "App Guide",
        `${vendorSlug} ${app.name} ${app.focus} ${(extra.highlights ?? []).join(" ")} ${(extra.askFirst ?? []).join(" ")} ${(extra.commonIssues ?? []).map(item => item.title ?? item.issue ?? "").join(" ")}`
      ));
    });
  });

  return entries;
}
