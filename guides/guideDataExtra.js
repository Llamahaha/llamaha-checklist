export const vendorOrderExtra = ["google", "hec", "mctrans", "axiom"];

export const vendorGuidesExtra = {
  adobe: {
    products: ["InDesign"],
    sharedNotes: [
      "InDesign workflows are sensitive to fonts, linked assets, packaged jobs, and the Adobe profile the user selects at sign-in."
    ]
  },
  autodesk: {
    products: ["InfoWorks ICM"],
    sharedNotes: [
      "InfoWorks ICM workflows depend on the approved Autodesk-delivered version plus the correct model, database, and project paths."
    ]
  },
  google: {
    title: "Google",
    summary: "Use this for Google Earth Pro installs, KML or KMZ file help, map viewing, and everyday location or imagery workflows.",
    overview:
      "Google Earth Pro support is usually about the desktop app opening correctly, imports and saved places behaving as expected, and whether KML or KMZ content or imagery layers load the way the user expects.",
    products: ["Google Earth Pro"],
    sharedNotes: [
      "If the issue is limited to one KML or KMZ file, test a second known-good file before reinstalling the app.",
      "Saved places and imported project files should be preserved before workstation cleanup.",
      "If imagery or map layers look wrong, capture whether the issue is local to one device or tied to the same data set everywhere."
    ],
    adminSurfaces: [
      "Google Earth Pro desktop app",
      "Google Earth Help and support pages",
      "Project KML or KMZ storage locations and shared data paths"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Google Earth Help", url: "https://support.google.com/earth/" }
    ]
  },
  hec: {
    title: "HEC",
    summary: "Use this for HEC hydrologic, hydraulic, statistical, and DSS-file workflows across the HEC engineering toolset.",
    overview:
      "HEC support issues are usually version alignment, project data paths, GIS or terrain dependencies, and whether the right study or DSS files are opening on the affected computer.",
    products: ["HEC-HMS", "HEC-RAS", "HEC-DSSVue", "HEC-DSS", "HEC-SSP", "HEC-GeoRAS"],
    sharedNotes: [
      "Capture the exact HEC product and version first because study files and project behavior can vary by release.",
      "If the problem is tied to one model or one DSS file, test a second known-good project before assuming the whole app is broken.",
      "Preserve project folders, GIS paths, and exported results before repair or uninstall work."
    ],
    adminSurfaces: [
      "HEC software download and documentation pages",
      "Project folders, terrain data, DSS files, and GIS data paths used by the team"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "HEC Software overview", url: "https://www.hec.usace.army.mil/software/" },
      { label: "HEC software fact sheet", url: "https://www.hec.usace.army.mil/factsheets/Software/HEC_FactSheet_Software.pdf" }
    ]
  },
  mctrans: {
    title: "MCTRANS",
    summary: "Use this for MCTRANS transportation-analysis tools, especially Highway Capacity Software and Highway Safety Software.",
    overview:
      "MCTRANS tickets usually come down to version alignment, licensing or delivery details, and whether the same study file behaves correctly on another approved installation.",
    products: ["HCS", "HSS"],
    sharedNotes: [
      "Capture the exact HCS or HSS version and study file before changing the installation.",
      "If the issue is file-specific, compare it with another known-good study file first.",
      "Keep version notes because transportation study workflows often depend on the approved release."
    ],
    adminSurfaces: [
      "MCTRANS account or delivery records",
      "Version-specific manuals and reference guides"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "MCTRANS HCS reference guide", url: "https://mctrans.ce.ufl.edu/highway-capacity-software-hcs/referenceguide/" },
      { label: "MCTRANS Center", url: "https://mctrans.ce.ufl.edu/" }
    ]
  },
  axiom: {
    title: "Axiom",
    summary: "Use this for Axiom add-ins and productivity tools used alongside Bentley and Autodesk applications.",
    overview:
      "Axiom issues usually live at the host-application layer: module compatibility, add-in loading, the host product year, and whether the same tool is working on another approved workstation.",
    products: ["Axiom"],
    sharedNotes: [
      "Always capture the host application and exact year first because Axiom behavior depends on that compatibility pair.",
      "If only one Axiom tool is failing, compare it with another tool in the same suite before reinstalling the add-in.",
      "Document which Axiom modules are actually in scope for the user's workflow."
    ],
    adminSurfaces: [
      "Axiom product delivery and support resources",
      "Host-application version and add-in management"
    ],
    escalationNotes: [],
    supportLinks: [
      { label: "Axiom official site", url: "https://www.axiomint.com/" }
    ]
  }
};
