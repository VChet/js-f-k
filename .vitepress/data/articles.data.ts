import dayjs from "dayjs";
import { createContentLoader, type ContentData } from "vitepress";
import type { Frontmatter } from "../composables/useFrontmatter";

export interface Article {
  url: string
  lang: string
  title: Frontmatter["title"]
  description: Frontmatter["description"]
  date: Frontmatter["date"]
  tags: Frontmatter["tags"]
};

const data: Article[] = [];
export { data };

function getArticleLang(url: ContentData["url"]): string {
  const [_, splat] = url.split("/");
  return splat === "articles" ? "ru" : splat;
}

export default createContentLoader<Article[]>("**/articles/*.md", {
  transform: (raw) => raw
    .sort((a, b) => dayjs(b.frontmatter.date).diff(a.frontmatter.date))
    .map((page) => ({
      url: page.url,
      lang: getArticleLang(page.url),
      title: page.frontmatter.title,
      description: page.frontmatter.description,
      date: page.frontmatter.date,
      tags: page.frontmatter.tags
    }))
});
