// Common support vocabulary and typing errors, shared by ranking and tests.
const aliases = new Map([
  ["m365", "microsoft 365"], ["o365", "microsoft 365"], ["office 365", "microsoft 365"],
  ["2fa", "mfa"], ["multi factor authentication", "mfa"], ["multi factor sign in", "mfa"],
  ["multifactor authentication", "mfa"], ["authenicator", "authenticator"],
  ["authentictor", "authenticator"], ["autocadd", "autocad"], ["revti", "revit"],
  ["blue beam", "bluebeam"], ["blu beam", "bluebeam"], ["bluabeam", "bluebeam"],
  ["onedirve", "onedrive"], ["one drive", "onedrive"], ["share point", "sharepoint"],
  ["licence", "license"], ["licencing", "licensing"], ["c3d", "civil 3d"],
  ["rdp", "remote desktop"], ["sso", "single sign on"], ["pw", "projectwise"],
  ["log in", "sign in"], ["login", "sign in"]
]);

export function normalizeSearch(value) {
  let text = String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  for (const [alias, replacement] of aliases) {
    text = text.replace(new RegExp(`\\b${alias}\\b`, "g"), replacement);
  }
  return text;
}

export function prepareSearchIndex(items) {
  return items.map(item => ({
    ...item,
    searchTitle: normalizeSearch(item.title),
    searchText: normalizeSearch(`${item.title} ${item.text} ${item.keywords}`)
  }));
}

export function findSearchResults(index, query, category = "all") {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const terms = [...new Set(normalized.split(/\s+/))];
  return index.filter(item => category === "all" || item.category === category)
    .map(item => {
      const title = item.searchTitle;
      const text = item.searchText;
      const matchedTerms = terms.filter(term => text.includes(term));
      if (!matchedTerms.length) return { ...item, score: 0 };
      let score = (title.includes(normalized) ? 20 : 0) + (text.includes(normalized) ? 6 : 0);
      score += matchedTerms.length === terms.length ? 12 : 0;
      score += matchedTerms.reduce((sum, term) => sum + (title.includes(term) ? 4 : 1), 0);
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
