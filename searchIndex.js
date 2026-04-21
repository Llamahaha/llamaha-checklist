import { getVendorApplications } from "./guides/applicationCatalog.js";
import { getAppGuideContent } from "./guides/appGuideContent.js";
import { getPublicGuideContent } from "./guides/publicGuideContent.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { publicPcHelpSections, publicTipsSections } from "./publicPageData.js";
import { microsoftIssueSections } from "./supportData.js";

function entry(title, text, url, category, typeLabel, keywords = "") {
  return { title, text, url, category, typeLabel, keywords };
}

function slugifyText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function articleText(item) {
  return [item.text, ...(item.fixes ?? []), ...(item.report ?? []), ...(item.steps ?? [])].filter(Boolean).join(" ");
}

export function buildSearchIndex() {
  const hiddenPublicSearchVendors = new Set(["quickbooks"]);
  const hiddenPublicSearchApps = new Set(["outlook-mobile", "teams-mobile"]);
  const entries = [
    entry("Home", "Help center landing page with search, PC Help, App Help, Licensing Help, Tips & Tricks, and contact options.", "index.html", "helpPage", "Help Center", "home help center app help pc help licensing help tips tricks"),
    entry("App Help", "Browse popular applications, Microsoft 365 apps, remote-access tools, engineering apps, and the full application directory when you already know the product name.", "vendor-guides.html", "helpPage", "App Help Page", "app help application directory outlook teams onedrive sharepoint citrix forticlient autocad revit civil 3d arcgis projectwise oracle p6 indesign google earth hec hcs hss"),
    entry("Popular Applications", "Open the most-used application guides directly from the App Help page.", "vendor-guides.html#popular-applications", "helpPage", "App Help Page", "popular applications outlook teams onedrive sharepoint citrix forticlient adobe acrobat bluebeam autocad revit civil 3d arcgis projectwise oracle p6"),
    entry("Collaboration, File Access, and Remote Work", "Open Microsoft 365, Citrix Workspace, VPN, and file-access guides when you need collaboration or remote-work help.", "vendor-guides.html#collaboration-file-access-and-remote-work", "helpPage", "App Help Page", "outlook teams onedrive sharepoint authenticator citrix forticlient egnyte remote work"),
    entry("Design, Engineering, Mapping, and Projects", "Browse Autodesk, Bentley, ArcGIS, Primavera, Google Earth Pro, HEC, MCTRANS, and related project apps.", "vendor-guides.html#design-engineering-mapping-and-projects", "helpPage", "App Help Page", "autocad revit civil 3d infoworks icm microstation projectwise arcgis pro google earth hec hms hec ras hcs hss primavera p6"),
    entry("Full Application Directory", "Browse every supported public application by vendor from the App Help page.", "vendor-guides.html#full-application-directory", "helpPage", "App Help Page", "application directory vendors products guides"),
    entry("Licensing Help", "Customer-facing reference for how licensed products usually work across Microsoft, Autodesk, Bentley, Adobe, Bluebeam, ArcGIS, Oracle Primavera P6, and other licensed products.", "app-licensing.html", "helpPage", "Help Page", "licensing reference subscription plan edition access account profile oracle primavera p6 autodesk bluebeam adobe arcgis"),
    entry("Tips & Tricks", "Windows keyboard shortcuts, browser cache and cookie cleanup, safe temporary-file cleanup, and disk-space basics for everyday support.", "tips-and-tricks.html", "helpPage", "Help Page", "tips tricks windows shortcuts keyboard cache cookies chrome edge firefox safari temp local app data storage sense disk space cleanup"),
    entry("Contact", "Contact options for help-center questions, missing content, guide updates, and the details to send before asking for help.", "contact.html", "helpPage", "Contact Page", "contact help support email before contacting support account app version screenshot browser another device exact file project site path"),
    entry("Application Issues and Fixes", "Public help page covering common application problems and general fixes.", "application-issues.html", "helpPage", "Help Page", "troubleshooting faq errors"),
    entry("Microsoft App Issues", "Public help page for common Microsoft 365 app problems.", "microsoft-issues.html", "helpPage", "Help Page", "outlook teams onedrive sharepoint mfa"),
    entry("PC Help", "Public help page for Windows basics, Windows 365 Cloud PCs, Citrix Workspace, browser issues, FortiClient VPN, printing, scanning, audio, updates, sign-in, and network problems.", "computer-issues.html", "helpPage", "Help Page", "pc help windows cloud pc windows 365 citrix workspace browser chrome edge firefox safari printer scanner vpn forticlient network updates audio sign in"),
    entry("Browser Support", "Open PC Help browser articles when work sites, downloads, or sign-in pages behave differently in Chrome, Edge, Firefox, or Safari.", "computer-issues.html#browser-support", "helpPage", "Help Page", "browser support chrome edge firefox safari sign in downloads cookies cache")
  ];

  publicPcHelpSections.forEach(section => {
    section.items.forEach(item => {
      entries.push(
        entry(
          item.title,
          articleText(item),
          `computer-issues.html#${slugifyText(item.title)}`,
          "pcArticle",
          "PC Help Article",
          `${section.title} ${section.description} ${(item.links ?? []).map(link => link.label).join(" ")}`
        )
      );
    });
  });

  publicTipsSections.forEach(section => {
    section.items.forEach(item => {
      entries.push(
        entry(
          item.title,
          articleText(item),
          `tips-and-tricks.html#${slugifyText(item.title)}`,
          "tipArticle",
          "Tips & Tricks Article",
          `${section.title} ${section.description} ${(item.links ?? []).map(link => link.label).join(" ")}`
        )
      );
    });
  });

  microsoftIssueSections.forEach(section => {
    section.items.forEach(item => {
      entries.push(
        entry(
          item.title,
          articleText(item),
          `microsoft-issues.html#${slugifyText(item.title)}`,
          "microsoftArticle",
          "Microsoft Help Article",
          `${section.title} ${section.description} ${(item.links ?? []).map(link => link.label).join(" ")}`
        )
      );
    });
  });

  vendorOrder.forEach(vendorSlug => {
    if (hiddenPublicSearchVendors.has(vendorSlug)) {
      return;
    }

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
      if (hiddenPublicSearchApps.has(app.slug)) {
        return;
      }

      const extra = getAppGuideContent(vendorSlug, app.slug);
      const publicGuide = getPublicGuideContent(vendorSlug, app.slug);
      entries.push(
        entry(
          app.name,
          `Help guide for ${app.name} with setup, access, common problems, and next steps.`,
          `guides/${vendorSlug}/${app.slug}.html`,
          "appGuide",
          "Application Guide",
          `${vendorSlug} ${app.name} ${app.focus} ${app.licensing} ${app.install} ${app.uninstall} ${(publicGuide.summary ?? "")} ${(publicGuide.mobileSetup ?? []).join(" ")} ${(publicGuide.overview ?? []).join(" ")} ${(extra.highlights ?? []).join(" ")} ${(extra.askFirst ?? []).join(" ")} ${(extra.supportCheckpoints ?? []).join(" ")}`
        )
      );
    });
  });

  return entries;
}
