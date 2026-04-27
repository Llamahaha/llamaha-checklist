export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }
  if (options.textContent !== undefined) {
    element.textContent = options.textContent;
  }
  if (options.id) {
    element.id = options.id;
  }

  return element;
}

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalize(value) {
  return (value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function tokenize(query) {
  return normalize(query).split(" ").filter(Boolean);
}

function matchesTokens(text, tokens) {
  if (!tokens.length) return true;
  const haystack = normalize(text);
  return tokens.every(token => haystack.includes(token));
}

function appendContent(parent, content) {
  toArray(content).forEach(item => {
    if (!item) return;
    if (item instanceof Node) {
      parent.appendChild(item);
      return;
    }
    const paragraph = createElement("p", { textContent: String(item) });
    parent.appendChild(paragraph);
  });
}

function resolveTopicForHash(topics, hashId) {
  if (!hashId) return null;
  const direct = topics.find(topic => topic.id === hashId);
  if (direct) return direct;

  const target = document.getElementById(hashId);
  if (!target) return null;
  return topics.find(topic => topic.panel === target || topic.panel.contains(target)) ?? null;
}

export function renderSingleTopicPage(options) {
  const {
    tocContainer,
    contentContainer,
    title,
    description,
    searchPlaceholder,
    searchLabel,
    emptyText = "No matching topics found.",
    topics,
    preferredTopicId = null
  } = options;

  if (!tocContainer || !contentContainer || !topics?.length) {
    return null;
  }

  tocContainer.innerHTML = "";
  contentContainer.innerHTML = "";

  const header = createElement("div", { className: "help-toc-header" });
  header.append(
    createElement("p", { className: "section-kicker", textContent: "On This Page" }),
    createElement("h2", { textContent: title }),
    createElement("p", { textContent: description })
  );

  const searchRow = createElement("div", { className: "help-toc-search" });
  const searchInput = createElement("input", { className: "search-input page-search-input" });
  searchInput.type = "search";
  searchInput.placeholder = searchPlaceholder;
  searchInput.setAttribute("aria-label", searchLabel ?? searchPlaceholder);
  searchRow.appendChild(searchInput);

  const nav = createElement("nav", { className: "help-toc-nav single-topic-toc" });
  nav.setAttribute("aria-label", title);

  const emptyMessage = createElement("p", {
    className: "help-toc-empty search-empty-message",
    textContent: emptyText
  });

  const enrichedTopics = topics.map((topic, index) => {
    const link = document.createElement("a");
    link.href = `#${topic.id}`;
    link.className = "single-topic-link";

    const label = createElement("span", { className: "single-topic-label", textContent: topic.title });
    link.appendChild(label);

    if (topic.meta) {
      link.appendChild(createElement("span", {
        className: "single-topic-meta",
        textContent: topic.meta
      }));
    }

    const panel = createElement("section", {
      id: topic.id,
      className: "results-card hub-section single-topic-panel"
    });
    panel.setAttribute("role", "tabpanel");

    const headerBlock = createElement("div", { className: "results-header" });
    const headerCopy = createElement("div");
    headerCopy.append(
      createElement("p", {
        className: "section-kicker",
        textContent: topic.kicker ?? topic.meta ?? "Help Topic"
      }),
      createElement("h2", { textContent: topic.title })
    );
    headerBlock.appendChild(headerCopy);
    panel.appendChild(headerBlock);

    if (topic.summary) {
      panel.appendChild(createElement("p", {
        className: "hub-section-copy",
        textContent: topic.summary
      }));
    }

    appendContent(panel, typeof topic.renderContent === "function" ? topic.renderContent(topic) : topic.content);

    nav.appendChild(link);
    contentContainer.appendChild(panel);

    return {
      ...topic,
      index,
      link,
      panel,
      searchText: [
        topic.title,
        topic.meta,
        topic.kicker,
        topic.summary,
        topic.searchText
      ].filter(Boolean).join(" ")
    };
  });

  let activeTopic = null;

  function setActive(topicOrId, options = {}) {
    const { updateHash = true, scroll = true } = options;
    const topic = typeof topicOrId === "string"
      ? enrichedTopics.find(item => item.id === topicOrId) ?? enrichedTopics[0]
      : topicOrId ?? enrichedTopics[0];

    activeTopic = topic;

    enrichedTopics.forEach(item => {
      const active = item === topic;
      item.panel.hidden = !active;
      item.panel.setAttribute("aria-hidden", String(!active));
      item.link.classList.toggle("is-active", active);
      if (active) {
        item.link.setAttribute("aria-current", "page");
      } else {
        item.link.removeAttribute("aria-current");
      }
    });

    if (updateHash) {
      try {
        window.history.replaceState({}, "", `#${topic.id}`);
      } catch {
        // Ignore environments that do not allow history updates.
      }
    }

    if (scroll) {
      requestAnimationFrame(() => {
        topic.panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function applySearch() {
    const tokens = tokenize(searchInput.value);
    let firstMatch = null;
    let visibleCount = 0;

    enrichedTopics.forEach(topic => {
      const matches = matchesTokens(topic.searchText, tokens);
      topic.link.hidden = !matches;
      topic.link.setAttribute("aria-hidden", String(!matches));
      if (matches) {
        firstMatch ??= topic;
        visibleCount += 1;
      }
    });

    if (!visibleCount) {
      if (!emptyMessage.isConnected) {
        nav.after(emptyMessage);
      }
      enrichedTopics.forEach(topic => {
        topic.panel.hidden = true;
        topic.panel.setAttribute("aria-hidden", "true");
        topic.link.classList.remove("is-active");
        topic.link.removeAttribute("aria-current");
      });
      return;
    }

    emptyMessage.remove();

    if (!activeTopic || activeTopic.link.hidden) {
      setActive(firstMatch, { updateHash: false, scroll: false });
    }
  }

  enrichedTopics.forEach(topic => {
    topic.link.addEventListener("click", event => {
      event.preventDefault();
      setActive(topic);
    });
  });

  searchInput.addEventListener("input", applySearch);

  tocContainer.append(header, searchRow, nav);

  window.addEventListener("hashchange", () => {
    const topic = resolveTopicForHash(enrichedTopics, decodeURIComponent(window.location.hash.slice(1)));
    if (topic) {
      setActive(topic, { updateHash: false });
    }
  });

  const hashTopic = resolveTopicForHash(enrichedTopics, decodeURIComponent(window.location.hash.slice(1)));
  const preferredTopic = preferredTopicId
    ? enrichedTopics.find(topic => topic.id === preferredTopicId)
    : null;

  setActive(hashTopic ?? preferredTopic ?? enrichedTopics[0], {
    updateHash: false,
    scroll: false
  });

  return {
    topics: enrichedTopics,
    setActive,
    applySearch
  };
}
