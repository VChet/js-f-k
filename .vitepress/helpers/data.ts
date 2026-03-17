import dayjs from "dayjs";
import { useData, type VitePressData } from "vitepress";
import type { Article } from "../data/articles.data";

export function formatArticleEntry(article: Article): Article {
  return {
    url: article.url,
    lang: article.lang,
    title: article.title,
    description: article.description,
    date: article.date,
    tags: article.tags
  };
}

/** Returns `true` if article is in correct locale and is published */
export function isApplicableArticle(article: Article, lang: VitePressData["lang"]): boolean {
  return article.lang === lang.value && dayjs(article.date).isBefore(dayjs());
}
