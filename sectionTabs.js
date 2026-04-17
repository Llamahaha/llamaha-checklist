// Shared "one section at a time" helper for pages that use an in-page
// table-of-contents plus multiple sibling sections.
//
// Usage:
//   import { activatePageTabs } from "./sectionTabs.js";
//   activatePageTabs();
//
// On JS-rendered pages, call AFTER the TOC and sections have been written
// into the DOM. Returns a handle with { setActive, setSearchOverride } so
// search/filter code can temporarily bypass the single-section rule.

const NAV_ACTIVE_CLASS = "is-active";

export function activatePageTabs(options = {}) {
  const {
    navSelector = ".help-toc-nav, .toc-links",
    preferredDefault = null,
    scrollOnInitial = false
  } = options;

  const navContainer = document.querySelector(navSelector);
  if (!navContainer) {
    return null;
  }

  const links = Array.from(navContainer.querySelectorAll('a[href^="#"]'));
  if (!links.length) {
    return null;
  }

  const tabs = [];
  links.forEach(link => {
    const href = link.getAttribute("href") ?? "";
    const id = decodeURIComponent(href.slice(1));
    if (!id) {
      return;
    }
    const section = document.getElementById(id);
    if (!section) {
      return;
    }
    tabs.push({ id, link, section });
  });

  if (!tabs.length) {
    return null;
  }

  const ownedSections = new Set(tabs.map(tab => tab.section));
  let activeId = null;
  let searchOverride = false;

  // Prevent users from collapsing the currently-visible <details> tab. The
  // accordion summary still shows the section title, but clicking it must
  // not hide the only section on screen.
  tabs.forEach(tab => {
    if (tab.section instanceof HTMLDetailsElement) {
      tab.section.addEventListener("toggle", () => {
        if (!searchOverride && tab.id === activeId && !tab.section.open) {
          tab.section.open = true;
        }
      });
    }
  });

  function applyVisibility() {
    tabs.forEach(tab => {
      const isActive = tab.id === activeId;
      if (!searchOverride) {
        tab.section.hidden = !isActive;
        if (tab.section instanceof HTMLDetailsElement) {
          tab.section.open = isActive;
        }
        tab.section.classList.toggle("is-active-tab", isActive);
      }
      tab.link.classList.toggle(NAV_ACTIVE_CLASS, isActive);
      if (isActive) {
        tab.link.setAttribute("aria-current", "page");
      } else {
        tab.link.removeAttribute("aria-current");
      }
    });
  }

  function findTabForHash(hashId) {
    if (!hashId) {
      return null;
    }
    const direct = tabs.find(tab => tab.id === hashId);
    if (direct) {
      return { tab: direct, target: direct.section };
    }
    const target = document.getElementById(hashId);
    if (!target) {
      return null;
    }
    const ownerTab = tabs.find(tab => tab.section === target || tab.section.contains(target));
    if (!ownerTab) {
      return null;
    }
    return { tab: ownerTab, target };
  }

  function setActive(id, opts = {}) {
    const { updateHash = true, scroll = true, scrollTarget = null } = opts;
    const match = tabs.find(tab => tab.id === id) || tabs[0];
    activeId = match.id;
    applyVisibility();
    if (updateHash) {
      try {
        window.history.replaceState({}, "", `#${match.id}`);
      } catch (err) {
        // Some environments (file://) throw on replaceState; ignore.
      }
    }
    if (scroll) {
      const scrollNode = scrollTarget ?? match.section;
      window.requestAnimationFrame(() => {
        scrollNode.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    return match;
  }

  links.forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href") ?? "";
      const id = decodeURIComponent(href.slice(1));
      if (!tabs.find(tab => tab.id === id)) {
        return;
      }
      event.preventDefault();
      setActive(id);
    });
  });

  window.addEventListener("hashchange", () => {
    const hashId = decodeURIComponent(window.location.hash.slice(1));
    const resolved = findTabForHash(hashId);
    if (resolved) {
      setActive(resolved.tab.id, {
        updateHash: false,
        scrollTarget: resolved.target !== resolved.tab.section ? resolved.target : null
      });
    }
  });

  // Initial activation: honor the hash, then preferredDefault, then first tab.
  const initialHashId = decodeURIComponent(window.location.hash.slice(1));
  const initialResolved = findTabForHash(initialHashId);
  if (initialResolved) {
    setActive(initialResolved.tab.id, {
      updateHash: false,
      scroll: scrollOnInitial,
      scrollTarget: initialResolved.target !== initialResolved.tab.section ? initialResolved.target : null
    });
  } else if (preferredDefault && tabs.find(tab => tab.id === preferredDefault)) {
    setActive(preferredDefault, { updateHash: false, scroll: scrollOnInitial });
  } else {
    setActive(tabs[0].id, { updateHash: false, scroll: scrollOnInitial });
  }

  function setSearchOverride(active) {
    searchOverride = !!active;
    if (!searchOverride) {
      applyVisibility();
    }
  }

  return {
    setActive,
    setSearchOverride,
    ownsSection(section) {
      return ownedSections.has(section);
    },
    tabs
  };
}
