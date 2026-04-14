# Llamaha Help Center

Minimal local tooling is included so future site passes can be verified instead of checked only by file inspection.

## Install

1. Install Node.js LTS
2. Open a terminal in this repo:
   `C:\Users\mberg\OneDrive\Desktop\github\llamaha`

## Commands

- `npm run serve`
  Starts a simple local static server at `http://127.0.0.1:4173`

- `npm run verify`
  Runs local verification for:
  - required public routes
  - vendor and app guide files generated from the current guide data
  - search-index local targets
  - local HTML links, scripts, styles, images, and anchors
  - key populated public app guides

- `npm run verify:links`
  Runs only the local link and anchor audit

## Recommended workflow

1. `npm run verify`
2. `npm run serve`
3. Open [http://127.0.0.1:4173](http://127.0.0.1:4173)
4. Spot-check the public pages in a browser:
   - `/`
   - `/search.html`
   - `/computer-issues.html`
   - `/vendor-guides.html`
   - `/app-licensing.html`
   - `/contact.html`

## Notes

- This setup uses only Node built-ins, so there are no npm dependencies to install after Node is available.
- The verification script is intentionally strict about missing local routes and anchors so broken public links get caught early.
