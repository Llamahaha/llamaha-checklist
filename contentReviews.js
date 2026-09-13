import { contentReviewData } from "./contentReviewData.js";
import { normalizeRoute } from "./siteNavigation.js";

export { contentReviewData };

export function reviewDateBounds(value) {
  if (!/^\d{4}-\d{2}(?:-\d{2})?$/.test(value ?? "")) return null;
  const start = new Date(`${value.length === 7 ? `${value}-01` : value}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || start.toISOString().slice(0, value.length) !== value) return null;
  const end = value.length === 7 ? new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)) : start;
  return { start, end };
}

export function getContentReview(pathname) {
  return contentReviewData[normalizeRoute(pathname)];
}

export function reviewStatus(record, now = new Date()) {
  const dates = reviewDateBounds(record?.reviewedOn);
  if (!dates) return "undated";
  if (dates.start > now) return "future";
  return now.getTime() - dates.end.getTime() > (record.reviewIntervalDays ?? 180) * 86400000 ? "overdue" : "current";
}

export function getReviewLabel(record) {
  const date = reviewDateBounds(record?.reviewedOn);
  if (!date) return "";
  const options = { year: "numeric", month: "long", timeZone: "UTC" };
  if (record.reviewedOn.length === 10) options.day = "numeric";
  return `Reviewed ${new Intl.DateTimeFormat("en-US", options).format(date.start)}`;
}

export function getRecentReviews(limit = 6) {
  return Object.entries(contentReviewData)
    .filter(([route, record]) => /^(articles|guides)\//.test(route) && reviewStatus(record) === "current")
    .sort((a, b) => b[1].reviewedOn.localeCompare(a[1].reviewedOn) || a[1].title.localeCompare(b[1].title))
    .slice(0, limit)
    .map(([route, record]) => ({ ...record, route }));
}
