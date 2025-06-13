import dayjs from "dayjs";
import type { Article } from "../theme/articles.data";

export function formatArticleEntry(article: Article): Article {
  return {
    url: article.url,
    title: article.title,
    date: dayjs(article.date).format("DD.MM.YYYY"),
    tags: article.tags
  };
}
