export const applicationCatalogExtra = {
  adobe: [
    {
      name: "InDesign",
      slug: "indesign",
      focus: "Adobe layout and publishing app used for page design, document packaging, fonts, linked assets, and print-ready output.",
      licensing: "Usually covered by the user's assigned Adobe product profile or Creative Cloud entitlement and the correct work Adobe profile at sign-in.",
      install: "Install the company-approved InDesign version, confirm enterprise Adobe sign-in, and test fonts, linked assets, and one real document before handoff.",
      uninstall: "Preserve templates, packaged jobs, fonts, and linked-asset expectations before removing the local app."
    }
  ],
  autodesk: [
    {
      name: "InfoWorks ICM",
      slug: "infoworks-icm",
      focus: "Hydraulic and hydrologic modeling platform used for drainage, flood, network, and scenario modeling with project databases and model dependencies.",
      licensing: "Typically depends on the Autodesk account assigned to the user plus the exact InfoWorks ICM product access and version approved by the organization.",
      install: "Use the approved Autodesk delivery path, match the expected year or version, and test sign-in plus one known-good model or database connection after setup.",
      uninstall: "Preserve model databases, simulation outputs, templates, and custom libraries before removing the application or changing the workstation."
    }
  ],
  google: [
    {
      name: "Google Earth Pro",
      slug: "google-earth-pro",
      focus: "Desktop mapping and visualization tool used to view imagery, import KML or KMZ content, inspect locations, and present project context.",
      licensing: "Google Earth Pro is generally available without a separate paid end-user seat, so access usually depends on the installed app version and any KML, KMZ, or imported data you need to open.",
      install: "Install the current supported Google Earth Pro build, confirm the app launches cleanly, and test one saved place or KML or KMZ file if your workflow depends on it.",
      uninstall: "Export any saved places or locally stored KML or KMZ content you still need before removing the app."
    }
  ],
  hec: [
    {
      name: "HEC-HMS",
      slug: "hec-hms",
      focus: "Hydrologic modeling software used to build basin models, meteorologic models, control specs, and runoff simulations.",
      licensing: "HEC-HMS is generally used without a paid commercial end-user seat, so support usually depends on the approved version, project files, and the data paths the model relies on.",
      install: "Use the approved HEC-HMS version for the team, confirm the project opens cleanly, and verify one known model run before handoff.",
      uninstall: "Preserve project folders, basin models, meteorologic models, and exported results before removing the local app."
    },
    {
      name: "HEC-RAS",
      slug: "hec-ras",
      focus: "Hydraulic modeling software used for river analysis, floodplain workflows, terrain-backed geometry, and simulation results.",
      licensing: "HEC-RAS is generally used without a paid commercial end-user seat, so support usually depends on the correct version, project data, terrain paths, and related GIS content.",
      install: "Install the approved HEC-RAS version, confirm geometry and plan files open, and test one known project or sample run after setup.",
      uninstall: "Preserve project folders, terrain references, RAS Mapper content, and exported results before uninstalling."
    },
    {
      name: "HEC-DSSVue",
      slug: "hec-dssvue",
      focus: "Viewer and utility tool for HEC-DSS time-series data, plotting, importing, and checking DSS file contents.",
      licensing: "HEC-DSSVue is generally used without a separate paid end-user seat, so access usually depends on the correct version and the DSS data files you need to open.",
      install: "Use the team-approved DSSVue version and confirm one known DSS file opens, plots, and saves as expected.",
      uninstall: "Preserve DSS files and any local plotting or import settings that still matter before cleanup."
    },
    {
      name: "HEC-DSS",
      slug: "hec-dss",
      focus: "Hydrologic Engineering Center data-storage format and tooling used by several HEC workflows to store time-series and paired data.",
      licensing: "HEC-DSS workflows generally do not depend on a paid end-user seat, but they do depend on the correct DSS files, compatible tooling, and project data paths.",
      install: "Confirm the approved HEC toolset version and test one known DSS file with the intended workflow after setup.",
      uninstall: "Preserve DSS data files and any linked project references before removing related local tooling."
    },
    {
      name: "HEC-SSP",
      slug: "hec-ssp",
      focus: "Statistical software used for flood-frequency and related hydrologic statistical workflows tied to project datasets and exports.",
      licensing: "HEC-SSP is generally used without a paid end-user seat, so support depends more on the approved version and the project data files than on account licensing.",
      install: "Install the approved HEC-SSP version and test opening one known study or data set after setup.",
      uninstall: "Preserve studies, imported datasets, and exported outputs before uninstalling."
    },
    {
      name: "HEC-GeoRAS",
      slug: "hec-georas",
      focus: "GIS extension workflow used to prepare river geometry and related GIS data for HEC-RAS projects.",
      licensing: "HEC-GeoRAS itself is generally not a separate paid end-user seat, but it depends on the correct GIS host environment and compatible HEC-RAS workflow.",
      install: "Match the approved GIS host environment, confirm HEC-GeoRAS tools load, and test one known preprocessing workflow before handoff.",
      uninstall: "Preserve GIS project data, extensions, and HEC-RAS-linked content before cleanup."
    }
  ],
  mctrans: [
    {
      name: "HCS",
      slug: "hcs",
      focus: "Highway Capacity Software used for transportation-capacity analysis and scenario review with methods tied to the supported release in use.",
      licensing: "Access usually depends on the exact HCS version or edition your organization purchased or standardized on and the workstation or user it was assigned to.",
      install: "Use the approved HCS version, confirm the license or delivery method expected by the organization, and test one known analysis file after setup.",
      uninstall: "Preserve project files, custom settings, and version notes before removing the app."
    },
    {
      name: "HSS",
      slug: "hss",
      focus: "Highway Safety Software used for roadway-safety analysis and related transportation study workflows.",
      licensing: "Access usually depends on the exact HSS version or edition your organization purchased or standardized on and the workstation or user it was assigned to.",
      install: "Use the approved HSS version, confirm the expected delivery or licensing path, and test one known study file after setup.",
      uninstall: "Preserve project files, templates, and version notes before removing the app."
    }
  ],
  axiom: [
    {
      name: "Axiom",
      slug: "axiom",
      focus: "Axiom add-ins and productivity tools used alongside Bentley and Autodesk products to speed up modeling, drafting, and standards-driven workflows.",
      licensing: "Axiom access usually depends on the modules your organization purchased plus compatibility with the host product and year in use.",
      install: "Match the approved host application year, install the required Axiom modules, and test one real tool or ribbon action inside the host app after setup.",
      uninstall: "Preserve any custom Axiom settings, module notes, and host-app compatibility details before removing the add-in."
    }
  ]
};
