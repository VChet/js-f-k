import dayjs from "dayjs";
import type { Article } from "../data/articles.data";

export function formatArticleEntry(article: Article): Article {
  return {
    url: article.url,
    lang: article.lang,
    title: article.title,
    description: article.description,
    date: dayjs(article.date).format("DD MMMM, YYYY"),
    tags: article.tags
  };
}
