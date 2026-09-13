export function findContentProblems(html) {
  const problems = [];
  if (/No vendor-specific FAQ is captured yet|No .{0,50} content (?:is )?(?:captured|available) yet/i.test(html)) problems.push("Unfinished placeholder content");
  const lists = new Set();
  for (const match of html.matchAll(/<ul class="guide-list">([\s\S]*?)<\/ul>/g)) {
    const text = match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length < 100) continue;
    if (lists.has(text)) problems.push("Repeated guide advice list");
    lists.add(text);
  }
  return [...new Set(problems)];
}
