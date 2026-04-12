export const ref = (vendor, app) => ({ vendor, app });

export const issue = (title, symptom, likelyFix, collect, escalateWhen) => ({
  title,
  symptom,
  likelyFix,
  collect,
  escalateWhen
});

export const guide = config => ({
  updatedAt: "2026-04-12",
  priority: false,
  overview: [],
  highlights: [],
  askFirst: [],
  licensing: [],
  install: [],
  uninstall: [],
  supportCheckpoints: [],
  commonIssues: [],
  escalationNotes: [],
  relatedApps: [],
  relatedSnippets: [],
  relatedTemplates: [],
  relatedLinks: [],
  keywords: "",
  usefulInfo: {
    paths: [],
    logs: [],
    services: [],
    processes: []
  },
  ...config,
  usefulInfo: {
    paths: [],
    logs: [],
    services: [],
    processes: [],
    ...(config.usefulInfo ?? {})
  }
});
