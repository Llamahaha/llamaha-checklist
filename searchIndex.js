import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

function entry(title, text, url, category, typeLabel, keywords = "") {
  return { title, text, url, category, typeLabel, keywords };
}

export function buildSearchIndex() {
  const entries = [
    entry("Home", "Help center landing page with search, guides, licensing help, and contact options.", "index.html", "helpPage", "Help Center", "home help center"),
    entry("Guides by App or Topic", "Browse guides by common problems first or jump straight to the application list in one combined page.", "vendor-guides.html", "helpPage", "Guides Page", "guides topics sign-in access install update licensing activation printing pdf sync shared files performance email collaboration getting started app list"),
    entry("Application List", "Jump straight to the application list inside Guides when you already know the product name.", "vendor-guides.html#browse-by-app", "helpPage", "Guides Page", "applications products app directory outlook teams onedrive autocad revit arcgis projectwise"),
    entry("Licensing Help", "Customer-facing help page for licensing, activation, subscriptions, and access questions by vendor.", "app-licensing.html", "helpPage", "Help Page", "licensing activation subscription access entitlement"),
    entry("Contact", "Contact options for help-center questions, missing content, and guide updates.", "contact.html", "helpPage", "Contact Page", "contact help support email"),
    entry("Application Issues and Fixes", "Public help page covering common application problems and general fixes.", "application-issues.html", "helpPage", "Help Page", "troubleshooting faq errors"),
    entry("Microsoft App Issues", "Public help page for common Microsoft 365 app problems.", "microsoft-issues.html", "helpPage", "Help Page", "outlook teams onedrive sharepoint mfa"),
    entry("Computer Issues", "Public help page for common workstation, printer, and network problems.", "computer-issues.html", "helpPage", "Help Page", "computer windows printer vpn network")
  ];

  vendorOrder.forEach(vendorSlug => {
    const vendor = vendorGuides[vendorSlug];
    entries.push(
      entry(
        vendor.title,
        `${vendor.title} guide page with links into product guides for ${vendor.products.slice(0, 4).join(", ")}.`,
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
