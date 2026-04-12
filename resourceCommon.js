export function createList(items, ordered = false, className = "") {
  const list = document.createElement(ordered ? "ol" : "ul");

  if (className) {
    list.className = className;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  return list;
}

export function createLinks(links, className = "vendor-links") {
  const nav = document.createElement("nav");
  nav.className = className;

  links.forEach(item => {
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.label;

    if (item.external) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    nav.appendChild(link);
  });

  return nav;
}

export function appendBlock(parent, title, body) {
  const block = document.createElement("div");
  block.className = "card-block";

  const heading = document.createElement("h4");
  heading.textContent = title;
  block.appendChild(heading);

  if (Array.isArray(body)) {
    block.appendChild(createList(body));
  } else if (body instanceof HTMLElement) {
    block.appendChild(body);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = body;
    block.appendChild(paragraph);
  }

  parent.appendChild(block);
}

export function createPageCard(className = "issue-card") {
  const card = document.createElement("article");
  card.className = className;
  return card;
}
