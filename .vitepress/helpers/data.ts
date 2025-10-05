import dayjs from "dayjs";
import { useData } from "vitepress";
import type { Article } from "../data/articles.data";

export function formatArticleEntry(article: Article): Article {
  const { lang } = useData();
  return {
    url: article.url,
    lang: article.lang,
    title: article.title,
    description: article.description,
    date: dayjs(article.date).locale(lang.value).format("DD MMMM, YYYY"),
    tags: article.tags
  };
}

/** Returns `true` if article is in correct locale and is published */
export function isApplicableArticle(article: Article): boolean {
  const { lang } = useData();
  return article.lang === lang.value && dayjs(article.date).isBefore(dayjs());
}
