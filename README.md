# Llamaha Help Center

Minimal local tooling is included so future site passes can be verified instead of checked only by file inspection.

## Install

1. Install Node.js LTS
2. Open a terminal in this repo:
   `C:\Users\mberg\OneDrive\Desktop\github\llamaha`

## Commands

- `npm run check`
  Runs behavior tests, the content audit, and site/link verification. GitHub Actions runs this on pushes and pull requests, then checks that generated guides match their source.

- `npm run audit`
  Checks stale phrases, catalog coverage, metadata, navigation mapping, unfinished/repeated guide sections, news status records, and review-date consistency.

- `npm run audit -- --reviews`
  Lists the editorial review queue. Overdue and undated pages are reported separately from structural failures.

- `npm test`
  Runs the navigation, search, review-date, news filtering, visibility, and audit regression tests.

- `npm run serve`
  Starts a simple local static server at `http://127.0.0.1:4173`

- `npm run verify`
  Runs local verification for:
  - required public routes
  - vendor and app guide files generated from the current guide data
  - search-index local targets
  - local HTML links, scripts, styles, images, and anchors
  - key populated public app guides

- `npm run verify-links`
  Runs only the local link and anchor audit

## Recommended workflow

1. `npm run check`
2. `npm run serve`
3. Open [http://127.0.0.1:4173](http://127.0.0.1:4173)
4. Spot-check the public pages in a browser:
   - `/`
   - `/search.html`
  - `/computer-issues.html`
  - `/vendor-guides.html`
  - `/app-licensing.html`
  - `/tips-and-tricks.html`
  - `/contact.html`

## Notes

- This setup uses only Node built-ins, so there are no npm dependencies to install after Node is available.
- The verification script is intentionally strict about missing local routes and anchors so broken public links get caught early.

## Content reviews

`contentReviewData.js` stores one record for each indexable public page. Record the date of an actual editorial review in `reviewedOn`, plus the sources consulted. Use `YYYY-MM-DD`; keep a historical `YYYY-MM` date when only the month is documented. `null` means no review date is recorded. Do not infer dates from a build, file modification time, or the old generated April 2026 label.

Set `reviewIntervalDays` according to how quickly the information changes. Overdue reviews appear in the audit queue; their dates are never automatically advanced. A missing date does not establish whether a page is accurate. The homepage's recent-guides list is generated from current dated reviews. Add a review record when adding a new indexable page.

After changing guide data or its review record, run `npm run static-guides` and include the generated HTML changes. The CI consistency check will fail if source and generated pages diverge.

## App news

Each record in `appNewsData.js` has `status` and `lastCheckedAt`. Supported states are `investigating`, `monitoring`, `resolved`, `advisory`, `historical`, and `unconfirmed`. Record an actual source check as a UTC timestamp such as `2026-09-13T16:00:10Z`; use `null` when no check is documented. Investigating, monitoring, and resolved states require a checked timestamp. A historical record does not mean an incident was resolved or a system is patched.

Live incident labels become unconfirmed after 72 hours without a new check. Reports older than 30 days move into the archive unless an actively checked incident remains open. Archiving does not alter the recorded incident state. `customerAction` can supply specific customer instructions; technician instructions remain in `recommendedMspAction` and appear under "For your IT team." Sources and publication, edit, and check dates remain separate. Draft and internal-only items remain excluded from public rendering.
