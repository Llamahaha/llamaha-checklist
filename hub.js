const optionalSections = [
  document.getElementById("mostUsedSection"),
  document.getElementById("recentSection")
].filter(Boolean);

optionalSections.forEach(section => {
  const content = section.querySelector(".hub-quick-grid, .vendor-directory, .issue-grid");
  if (!content || !content.children.length) {
    section.hidden = true;
  }
});
