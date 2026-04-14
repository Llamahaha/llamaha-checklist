import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

function entry(title, text, url, category, typeLabel, keywords = "") {
  return { title, text, url, category, typeLabel, keywords };
}

export function buildSearchIndex() {
  const entries = [
    entry("Home", "Help center landing page with search, guides, applications, and contact options.", "index.html", "helpPage", "Help Center", "home help center"),
    entry("Applications", "Browse popular application guides and the full application directory.", "applications.html", "helpPage", "Help Page", "applications app directory"),
    entry("Licensing Help", "Customer-facing help page for licensing, activation, subscriptions, and access questions by vendor.", "app-licensing.html", "helpPage", "Help Page", "licensing activation subscription access entitlement"),
    entry("Contact", "Contact options for help-center questions, missing content, and guide updates.", "contact.html", "helpPage", "Contact Page", "contact help support email"),
    entry("Vendor Guides", "Browse vendor help and open the application guide that matches the product you use.", "vendor-guides.html", "vendorGuide", "Guide Hub", "vendor guides applications"),
    entry("Application Issues and Fixes", "Public help page covering common application problems and general fixes.", "application-issues.html", "helpPage", "Help Page", "troubleshooting faq errors"),
    entry("Microsoft App Issues", "Public help page for common Microsoft 365 app problems.", "microsoft-issues.html", "helpPage", "Help Page", "outlook teams onedrive sharepoint mfa"),
    entry("Computer Issues", "Public help page for common workstation, printer, and network problems.", "computer-issues.html", "helpPage", "Help Page", "computer windows printer vpn network")
  ];

  vendorOrder.forEach(vendorSlug => {
    const vendor = vendorGuides[vendorSlug];
    entries.push(
      entry(
        vendor.title,
        `${vendor.title} help page with links into product guides for ${vendor.products.slice(0, 4).join(", ")}.`,
        `guides/${vendorSlug}.html`,
        "vendorGuide",
        "Vendor Guide",
        `${vendor.summary} ${vendor.overview} ${vendor.products.join(" ")}`
      )
    );

    getVendorApplications(vendorSlug).forEach(app => {
      const extra = getAppGuideContent(vendorSlug, app.slug);
      entries.push(
        entry(
          app.name,
          `Help guide for ${app.name} with setup, access, common problems, and next steps.`,
          `guides/${vendorSlug}/${app.slug}.html`,
          "appGuide",
          "Application Guide",
          `${vendorSlug} ${app.name} ${app.focus} ${app.licensing} ${app.install} ${app.uninstall} ${(extra.highlights ?? []).join(" ")} ${(extra.askFirst ?? []).join(" ")} ${(extra.supportCheckpoints ?? []).join(" ")}`
        )
      );
    });
  });

  return entries;
}
