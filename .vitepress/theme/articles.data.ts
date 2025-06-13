import dayjs from "dayjs";
import { createContentLoader } from "vitepress";

export interface Article {
  url: string
  title: string
  date: string
  tags: string[]
}

const data = [] as Article[];
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
