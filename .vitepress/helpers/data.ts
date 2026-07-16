import dayjs from "dayjs";
import type { VitePressData } from "vitepress";
import type { Article } from "../data/articles.data";

export function isArticlePublished(publishDate: Article["date"]): boolean {
  return !!publishDate && dayjs().isAfter(dayjs(publishDate));
}

/** Returns `true` if article is in correct locale and is published */
export function isApplicableArticle(article: Article, lang: VitePressData["lang"]): boolean {
  return article.lang === lang.value && isArticlePublished(article.date);
}

export function formatDate(date: string | number | undefined, lang: string): string {
  if (!date) return "";

  return new Intl.DateTimeFormat(lang, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(dayjs(date).toDate());
};
