import { Page } from "lume/core.ts";
import { Element } from "lume/deps/dom.ts";
import { createSlugifier } from "lume/plugins/slugify_urls.ts";

const slugify = createSlugifier();

export default function (page: Page) {
  const { document } = page;

  if (!document) {
    return;
  }

  const article = document.querySelector("article");
  article?.classList.add("book");

  if (!article) {
    return;
  }

  const header = article.querySelector("header")!;
  const nav = document.createElement("nav");
  header.after(nav);
  nav.appendChild(getToc(article));
}

function getToc(root: Element): Element {
  const document = root.ownerDocument!;
  const ul = document.createElement("ul");

  for (const item of root.children) {
    if (item.hasAttribute("aria-label")) {
      const label = item.getAttribute("aria-label")!;
      const id = item.getAttribute("id") || slugify(label);

      item.setAttribute("id", id);

      const a = document.createElement("a");
      a.innerText = label;
      a.setAttribute("href", `#${id}`);

      const li = document.createElement("li");
      ul.appendChild(li);
      li.appendChild(a);

      if (["ARTICLE", "SECTION"].includes(item.tagName)) {
        const subUl = getToc(item);

        if (subUl.children.length > 0) {
          li.appendChild(getToc(item));
        }
      }
    }
  }

  return ul;
}
