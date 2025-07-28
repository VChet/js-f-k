import { formatDate } from "./date";
import type { Article } from "../data/articles.data";

export function formatArticleEntry(article: Article): Article {
  return {
    url: article.url,
    title: article.title,
    date: formatDate(article.date, "DD.MM.YYYY"),
    tags: article.tags
  };
}
