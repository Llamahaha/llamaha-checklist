import { getContentReview, getReviewLabel, reviewStatus } from "./contentReviews.js";

export function renderPageReview() {
  if (document.body.dataset.siteArea === "internal" || location.pathname.includes("/internal/")) return;
  const record = getContentReview(location.pathname);
  const label = getReviewLabel(record);
  let review = document.querySelector("[data-review-date], .guide-review-label, .review-label");
  if (!label) { review?.remove(); return; }
  if (!review) {
    const heading = document.querySelector("h1");
    if (!heading) return;
    review = document.createElement("p");
    review.className = "review-label";
    heading.parentElement.append(review);
  }
  review.dataset.reviewDate = record.reviewedOn;
  review.textContent = label;
  if (reviewStatus(record) === "overdue") {
    const note = document.createElement("span");
    note.className = "review-due";
    note.textContent = "Review due";
    review.append(" ", note);
  }
  if (!record.sources.length || document.querySelector(".review-sources")) return;
  const main = document.querySelector("main");
  if (!main) return;
  const sources = document.createElement("section");
  sources.className = "review-sources";
  const heading = document.createElement("h2");
  heading.textContent = "Sources";
  const list = document.createElement("ul");
  for (const source of record.sources) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.textContent = source.label;
    item.append(link);
    list.append(item);
  }
  sources.append(heading, list);
  main.append(sources);
}
