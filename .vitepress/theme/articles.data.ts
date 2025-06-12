import dayjs from "dayjs";
import { createContentLoader } from "vitepress";

interface Article {
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
    .reduce((acc: Article[], page) => {
      const date = dayjs(page.frontmatter.date);
      if (date.isAfter(dayjs())) { return acc; }
      return [...acc, {
        url: page.url,
        title: page.frontmatter.title,
        date: date.format("DD.MM.YY"),
        tags: page.frontmatter.tags
      }];
    }, [])
});
