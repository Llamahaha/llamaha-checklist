export const NEWS_STATUSES = {
  investigating: "Investigating",
  monitoring: "Monitoring",
  resolved: "Resolved",
  advisory: "Advisory",
  historical: "Historical report",
  unconfirmed: "Status unconfirmed"
};

export function newsStatus(item, now = new Date()) {
  const state = item.status ?? "unconfirmed";
  if (["investigating", "monitoring"].includes(state)) {
    const checked = Date.parse(item.lastCheckedAt ?? "");
    if (!Number.isFinite(checked) || now.getTime() - checked > 72 * 3600000) return "unconfirmed";
  }
  return state;
}

export function isArchivedNews(item, now = new Date()) {
  if (item.status === "historical") return true;
  if (["investigating", "monitoring"].includes(newsStatus(item, now))) return false;
  return now.getTime() - Date.parse(`${item.publishedDate}T00:00:00Z`) > 30 * 86400000;
}

export function appFilterValue(item) {
  return `app:${JSON.stringify([item.vendor, item.appName])}`;
}

export function matchesNewsFilters(item, filters, now = new Date()) {
  if (filters.vendor && filters.vendor !== `vendor:${item.vendor}` && filters.vendor !== appFilterValue(item)) return false;
  if (filters.category && item.category !== filters.category) return false;
  if (filters.severity && item.severity !== filters.severity) return false;
  if (filters.status && newsStatus(item, now) !== filters.status) return false;
  if (filters.audience && item.audience !== filters.audience) return false;
  if (filters.dateFrom && item.publishedDate < filters.dateFrom) return false;
  if (filters.dateTo && item.publishedDate > filters.dateTo) return false;
  if (filters.view === "recent" && isArchivedNews(item, now)) return false;
  if (filters.view === "archive" && !isArchivedNews(item, now)) return false;
  return true;
}

export function customerAction(item, now = new Date()) {
  if (isArchivedNews(item, now)) return "If this problem is happening now, contact IT with the current error and this notice. Ask IT to confirm current guidance before applying an older workaround.";
  if (item.customerAction) return item.customerAction;
  if (newsStatus(item, now) === "resolved") return "Retry the affected task. If the problem continues, contact IT with the time and exact error.";
  if (item.category === "Security Vulnerability") return "Ask IT whether your devices or services are affected and need an approved update. Report suspicious activity promptly.";
  if (["Outage", "Service Impact"].includes(item.category)) return "Save your work and contact IT if you are affected. Include the app, error, and time; check the vendor's current status before changing settings.";
  return "Ask IT whether this change affects your team's apps or workflow before changing your setup.";
}

export function formatCheckedAt(value) {
  if (!value || !Number.isFinite(Date.parse(value))) return "Last checked: not recorded";
  return `Last checked: ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(value))} UTC`;
}
