export function normalizeRoute(pathname) {
  const path = pathname.split(/[?#]/)[0].replace(/\\/g, "/");
  return path.replace(/^\/+|\/+$/g, "").replace(/\.html$/i, "").replace(/(?:^|\/)index$/i, "").replace(/\/$/, "");
}

export function getSiteSection(pathname, area = "public") {
  const route = normalizeRoute(pathname);
  if (area === "internal") {
    if (route === "internal") return "internal-home";
    if (route === "internal/search") return "internal-search";
    return "internal-support";
  }
  if (!route) return "home";
  if (route === "search") return "search";
  if (route === "app-news") return "news";
  if (["contact", "ticket"].includes(route)) return "contact";
  return "support";
}
