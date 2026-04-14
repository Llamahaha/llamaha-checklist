import { getVendorApplications } from "./guides/applicationCatalog.js";
import { vendorGuides, vendorOrder } from "./guides/guideData.js";
import { matrixResource } from "./supportData.js";
import { appendBlock, createLinks, createPageCard } from "./resourceCommon.js";

const licensingGrid = document.getElementById("licensingGrid");
const matrixCard = document.getElementById("matrixCard");

const customerLicensingHelp = {
  microsoft: {
    summary: "Microsoft access usually depends on the work account you sign in with, the Microsoft 365 plan assigned to you, and whether the same account works in the browser.",
    checks: [
      "Make sure you are signing in with your work account instead of a personal Microsoft account.",
      "Check whether the same action works in Outlook on the web, Teams on the web, or the Microsoft 365 portal.",
      "Take note of the exact app and feature that appears missing, such as desktop Outlook, Teams meetings, or OneDrive sync."
    ]
  },
  autodesk: {
    summary: "Autodesk access is usually tied to the Autodesk account email that was assigned the product, plus the exact product year your team uses.",
    checks: [
      "Use the Autodesk account that matches the seat assignment for your company.",
      "Confirm the exact product and year you need, such as AutoCAD 2025 or Revit 2024.",
      "Capture any trial, subscription, or sign-in message shown at launch."
    ]
  },
  bentley: {
    summary: "Bentley products often depend on both your Bentley account and the project or datasource your team uses, especially for ProjectWise and CONNECT Edition apps.",
    checks: [
      "Confirm which Bentley product you need and whether ProjectWise or CONNECTION Client is part of the workflow.",
      "Check whether you can sign in with the expected Bentley account.",
      "If the issue is project-specific, note the datasource or project name before contacting support."
    ]
  },
  esri: {
    summary: "Esri access usually depends on the ArcGIS organization you belong to, the role assigned to your account, and whether the right extensions are included.",
    checks: [
      "Confirm you are signing in to the correct ArcGIS organization or portal.",
      "Check whether the missing feature is part of ArcGIS Pro, ArcGIS Online, or an extension.",
      "Take a screenshot if the app shows the wrong license level or missing extensions."
    ]
  },
  ptc: {
    summary: "Mathcad access may depend on a subscription, a floating license source, or another company-managed licensing method.",
    checks: [
      "Confirm which Mathcad version you are expected to use.",
      "If your company uses a license server, note whether the problem affects only your device or multiple people.",
      "Capture the exact license or activation message shown in the app."
    ]
  },
  trimble: {
    summary: "Trimble-managed apps usually depend on the right account, subscription, and product edition, especially for SketchUp and Trimble Business Center.",
    checks: [
      "Confirm the product name, edition, and version your team expects you to use.",
      "Make sure you are signing in with the correct Trimble-managed account.",
      "Note whether the issue is missing access, missing modules, or missing shared files or extensions."
    ]
  },
  adobe: {
    summary: "Adobe access usually depends on the correct managed Adobe profile being assigned to your work account, especially for Acrobat Pro and Creative Cloud apps.",
    checks: [
      "Choose the work or company Adobe profile if you see more than one sign-in option.",
      "Confirm the product you need is Acrobat Pro or another named Adobe app, not just Reader.",
      "Take a screenshot if the app opens but still says trial, sign in, or subscription required."
    ]
  },
  bluebeam: {
    summary: "Bluebeam access is tied to the Bluebeam ID used for sign-in and the subscription level assigned to that account.",
    checks: [
      "Confirm you are signing in with the Bluebeam ID that should have the subscription.",
      "Check whether the issue is with Revu itself, Studio access, or shared profiles and tool sets.",
      "Note the exact message shown if activation or sign-in fails."
    ]
  },
  foxit: {
    summary: "Foxit access varies by product edition and activation method, so it helps to know whether you are using Reader, Editor, or another licensed edition.",
    checks: [
      "Confirm the exact Foxit product you are supposed to use.",
      "Check whether the issue is activation, editing features missing, or the wrong default PDF app opening files.",
      "Capture the edition and activation message if the product appears locked."
    ]
  },
  quickbooks: {
    summary: "QuickBooks access often depends on the exact product year, the company file or company membership, and whether you use Desktop or Online.",
    checks: [
      "Confirm whether you use QuickBooks Desktop or QuickBooks Online.",
      "If you use Desktop, note the product year and where the company file is hosted.",
      "If you use Online, confirm which company you are trying to open and what role you should have."
    ]
  },
  egnyte: {
    summary: "Egnyte access usually depends on your user type, sign-in method, and the folders your account is allowed to open in the web or desktop app.",
    checks: [
      "Confirm whether the problem happens in the Egnyte web app, the desktop app, or both.",
      "Check that you are signing in to the correct company domain.",
      "Note whether the issue is missing folders, sign-in trouble, or drive-mapping behavior."
    ]
  }
};

if (matrixCard) {
  const matrix = createPageCard("hub-note-card");
  matrix.append(
    Object.assign(document.createElement("p"), { className: "section-kicker", textContent: "Microsoft 365 Plans" }),
    Object.assign(document.createElement("h3"), { textContent: matrixResource.title }),
    Object.assign(document.createElement("p"), { textContent: "Use this live comparison when you need to check whether a Microsoft 365 plan includes desktop apps, mailbox access, identity features, or other Microsoft services." }),
    createLinks([{ label: "Open M365 Maps Matrix", url: matrixResource.url, external: true }])
  );
  matrixCard.appendChild(matrix);
}

if (licensingGrid) {
  vendorOrder.forEach(key => {
    const guide = vendorGuides[key];
    const apps = getVendorApplications(key);
    const help = customerLicensingHelp[key];
    const card = createPageCard("vendor-card");
    card.id = `${key}-licensing`;

    const title = document.createElement("h3");
    title.textContent = guide.title;

    const summary = document.createElement("p");
    summary.textContent = help?.summary ?? guide.summary;

    const stack = document.createElement("div");
    stack.className = "card-stack";
    appendBlock(stack, "Common Products", apps.slice(0, 6).map(item => item.name));
    appendBlock(stack, "Check This First", help?.checks ?? [
      "Confirm the exact account you are signing in with.",
      "Check the product name and version or year if the app shows one.",
      "Capture the exact message before contacting support."
    ]);

    const links = createLinks([
      { label: "Open vendor guide", url: `guides/${key}.html` },
      { label: "Browse help by app or topic", url: "vendor-guides.html" },
      ...apps.slice(0, 3).map(app => ({ label: app.name, url: `guides/${key}/${app.slug}.html` })),
      ...(guide.supportLinks?.[0]
        ? [{ label: guide.supportLinks[0].label, url: guide.supportLinks[0].url, external: true }]
        : []),
      { label: "Still need help?", url: "contact.html" }
    ]);

    card.append(title, summary, stack, links);
    licensingGrid.appendChild(card);
  });
}
