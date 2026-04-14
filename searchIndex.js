import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";

function entry(title, text, url, category, typeLabel, keywords = "") {
  return { title, text, url, category, typeLabel, keywords };
}

export function buildSearchIndex() {
  const entries = [
    entry("Home", "Help center landing page with search, PC Help, App Help, licensing help, Tips & Tricks, and contact options.", "index.html", "helpPage", "Help Center", "home help center tips tricks"),
    entry("App Help", "Browse popular applications, mobile phone setup guides, browser support, VPN help, vendor overviews, and the full application directory.", "vendor-guides.html", "helpPage", "App Help Page", "app help application directory outlook teams onedrive chrome edge firefox safari autocad revit arcgis projectwise forticlient oracle p6"),
    entry("Popular Applications", "Open the most-used application guides directly from the App Help page.", "vendor-guides.html#browse-by-app", "helpPage", "App Help Page", "popular applications outlook teams onedrive autocad revit arcgis projectwise adobe bluebeam forticlient oracle p6"),
    entry("Mobile Phone Help", "Guides for Outlook Mobile, Teams Mobile, and Microsoft Authenticator setup on iPhone and Android devices.", "vendor-guides.html#mobile-help", "helpPage", "App Help Page", "mobile phone setup outlook mobile teams mobile microsoft authenticator iphone android"),
    entry("Browser Support", "Guides for Chrome, Edge, Firefox, and Safari when work sites, downloads, or sign-in pages behave differently in a browser.", "vendor-guides.html#browser-help", "helpPage", "App Help Page", "browser support chrome edge firefox safari downloads popups work sites"),
    entry("Application List", "Jump straight to the full application directory inside App Help when you already know the product name.", "vendor-guides.html#application-directory", "helpPage", "App Help Page", "applications products app directory outlook teams onedrive autocad revit arcgis projectwise forticlient oracle p6 authenticator chrome edge firefox safari"),
    entry("Licensing Help", "Customer-facing reference for how licensing works across Microsoft, Autodesk, Bentley, Adobe, Bluebeam, ArcGIS, FortiClient, Oracle Primavera P6, browsers, and other supported products.", "app-licensing.html", "helpPage", "Help Page", "licensing reference subscription plan edition access account profile portal forticlient oracle primavera p6"),
    entry("Tips & Tricks", "Windows keyboard shortcuts, browser cache and cookie cleanup, safe temporary-file cleanup, and disk-space basics for everyday support.", "tips-and-tricks.html", "helpPage", "Help Page", "tips tricks windows shortcuts keyboard cache cookies chrome edge firefox safari temp local app data storage sense disk space cleanup"),
    entry("Contact", "Contact options for help-center questions, missing content, and guide updates.", "contact.html", "helpPage", "Contact Page", "contact help support email"),
    entry("Application Issues and Fixes", "Public help page covering common application problems and general fixes.", "application-issues.html", "helpPage", "Help Page", "troubleshooting faq errors"),
    entry("Microsoft App Issues", "Public help page for common Microsoft 365 app problems.", "microsoft-issues.html", "helpPage", "Help Page", "outlook teams onedrive sharepoint mfa"),
    entry("PC Help", "Public help page for Windows basics, Windows 365 Cloud PCs, FortiClient VPN, printing, audio, updates, sign-in, and network problems.", "computer-issues.html", "helpPage", "Help Page", "pc help windows cloud pc windows 365 printer vpn forticlient network updates audio sign in")
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
