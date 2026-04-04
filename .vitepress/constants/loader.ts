import dayjs from "dayjs";
import type { ContentData, ContentOptions } from "vitepress";
import type { Article } from "../data/articles.data";

function getArticleLang(url: ContentData["url"]): string {
  const [_, splat] = url.split("/");
  return splat === "articles" ? "ru" : splat;
}
export const ARTICLES_LOADER_OPTIONS: ContentOptions<Article[]> = {
  transform: (raw) => raw
    .filter((data) => data.frontmatter.publish !== false)
    .sort((a, b) => dayjs(b.frontmatter.date).diff(a.frontmatter.date))
    .map((page) => ({
      url: page.url,
      lang: getArticleLang(page.url),
      title: page.frontmatter.title,
      description: page.frontmatter.description,
      date: page.frontmatter.date,
      tags: page.frontmatter.tags
    }))
};

export const RSS_LOADER_OPTIONS: ContentOptions<ContentData[]> = {
  render: true,
  transform: (raw) => raw
    .filter((data) => data.frontmatter.publish !== false)
    .sort((a, b) => dayjs(b.frontmatter.date).diff(a.frontmatter.date))
};
