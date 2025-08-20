import dayjs from "dayjs";
import { createContentLoader } from "vitepress";
import type { Frontmatter } from "../composables/useFrontmatter";

export interface Article {
  url: string
  title: Frontmatter["title"]
  date: Frontmatter["date"]
  tags: Frontmatter["tags"]
};

const data: Article[] = [];
export { data };

export default createContentLoader<Article[]>("articles/*.md", {
  transform: (raw) => raw
    .sort((a, b) => dayjs(b.frontmatter.date).diff(a.frontmatter.date))
    .map((page) => ({
      url: page.url,
      title: page.frontmatter.title,
      date: page.frontmatter.date,
      tags: page.frontmatter.tags
    }))
});
