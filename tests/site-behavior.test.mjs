import test from "node:test";
import assert from "node:assert/strict";
import { getSiteSection, normalizeRoute } from "../siteNavigation.js";
import { buildSearchIndex } from "../searchIndex.js";
import { normalizeSearch, prepareSearchIndex, findSearchResults } from "../searchMatching.js";
import { reviewDateBounds, reviewStatus, getReviewLabel } from "../contentReviews.js";
import { appFilterValue, matchesNewsFilters, newsStatus, isArchivedNews, customerAction } from "../newsLifecycle.js";
import { isItemVisible } from "../appNewsData.js";
import { findContentProblems } from "../scripts/audit-rules.mjs";

const index = prepareSearchIndex(buildSearchIndex());
const now = new Date("2026-09-13T16:00:10Z");

test("section navigation works with HTML, friendly URLs, and directory indexes", () => {
  for (const [route, section] of [["", "home"], ["search", "search"], ["app-news", "news"], ["contact", "contact"], ["ticket", "contact"], ["articles", "support"], ["articles/license-or-signin-error", "support"], ["guides/citrix", "support"]]) {
    for (const variant of [`/${route}`, `/${route}/`, route ? `/${route}.html` : "/index.html", `/${route}/index.html`]) {
      assert.equal(getSiteSection(variant), section, variant);
    }
  }
  assert.equal(getSiteSection("/internal/index.html", "internal"), "internal-home");
  assert.equal(getSiteSection("/internal/search", "internal"), "internal-search");
  assert.equal(getSiteSection("/internal/reference/mailbox-decommission.html", "internal"), "internal-support");
  assert.equal(normalizeRoute("/articles/license-or-signin-error.html?q=test#details"), "articles/license-or-signin-error");
});

test("search handles support abbreviations and common typos", () => {
  for (const [typed, expected] of [["revti licence", "revit license"], ["c3d", "civil 3d"], ["m365", "microsoft 365"], ["2FA", "mfa"], ["onedirve", "onedrive"], ["blue beam", "bluebeam"]]) {
    assert.equal(normalizeSearch(typed), expected);
    assert.deepEqual(findSearchResults(index, typed).map(item => item.url), findSearchResults(index, expected).map(item => item.url));
  }
  assert.ok(findSearchResults(index, "revit")[0].title.toLowerCase().includes("revit"));
  assert.ok(findSearchResults(index, "app").length > 40, "pagination needs to expose more than the former cap");
  assert.ok(findSearchResults(index, "revit", "appGuide").every(item => item.category === "appGuide"));
  assert.equal(findSearchResults(index, "zzzznotaproduct").length, 0);
  assert.equal(findSearchResults(index, "").length, 0);
});

test("review dates preserve precision and never become current from regeneration", () => {
  assert.equal(reviewDateBounds("2026-02-30"), null);
  assert.equal(reviewDateBounds("2026-13"), null);
  assert.equal(reviewStatus({ reviewedOn: null }, now), "undated");
  assert.equal(getReviewLabel({ reviewedOn: null }), "");
  assert.equal(getReviewLabel({ reviewedOn: "2026-05" }), "Reviewed May 2026");
  assert.equal(reviewStatus({ reviewedOn: "2026-05", reviewIntervalDays: 30 }, now), "overdue");
  assert.equal(reviewStatus({ reviewedOn: "2026-10-01" }, now), "future");
  assert.equal(reviewStatus({ reviewedOn: "2026-09-13", reviewIntervalDays: 90 }, now), "current");
});

const incident = {
  id: "incident", vendor: "Microsoft", appName: "Teams", category: "Outage", severity: "High",
  publishedDate: "2026-09-12", status: "investigating", lastCheckedAt: "2026-09-13T12:00:00Z",
  audience: "public", isPublished: true, isPlaceholder: false
};

test("news distinguishes product filters, archive, status, and date ranges", () => {
  assert.ok(matchesNewsFilters(incident, { vendor: "vendor:Microsoft", view: "recent" }, now));
  assert.ok(matchesNewsFilters(incident, { vendor: appFilterValue(incident), status: "investigating" }, now));
  assert.equal(matchesNewsFilters(incident, { vendor: appFilterValue({ ...incident, appName: "Outlook" }) }, now), false);
  assert.equal(matchesNewsFilters(incident, { dateFrom: "2026-09-13" }, now), false);
  assert.equal(matchesNewsFilters(incident, { dateTo: "2026-09-11" }, now), false);
  assert.equal(matchesNewsFilters(incident, { view: "archive" }, now), false);
  assert.ok(isArchivedNews({ ...incident, status: "historical" }, now));
});

test("unchecked or stale incidents are not represented as live or resolved", () => {
  assert.equal(newsStatus({ ...incident, lastCheckedAt: null }, now), "unconfirmed");
  assert.equal(newsStatus({ ...incident, lastCheckedAt: "2026-09-01T12:00:00Z" }, now), "unconfirmed");
  const archived = { ...incident, status: "historical", publishedDate: "2026-05-01" };
  assert.equal(newsStatus(archived, now), "historical");
  assert.match(customerAction(archived, now), /current guidance/);
});

test("public news does not render drafts, placeholders, or internal entries", () => {
  assert.ok(isItemVisible(incident));
  assert.equal(isItemVisible({ ...incident, isPublished: false }), false);
  assert.equal(isItemVisible({ ...incident, isPlaceholder: true }), false);
  assert.equal(isItemVisible({ ...incident, audience: "internal" }), false);
});

test("content audit catches unfinished sections and duplicate guidance", () => {
  assert.equal(findContentProblems("No vendor-specific FAQ is captured yet.").length, 1);
  const list = `<ul class="guide-list"><li>${"Repeated support advice. ".repeat(8)}</li></ul>`;
  assert.deepEqual(findContentProblems(list + list), ["Repeated guide advice list"]);
  assert.deepEqual(findContentProblems(list), []);
});
