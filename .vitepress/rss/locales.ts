import type { FeedOptions } from "feed";
import { SITE_COPYRIGHT, SITE_NAME, SITE_URL } from "../constants/common";
import i18n from "../locales/i18n";

export interface RSSLocaleConfig {
  code: string
  pattern: string
  root: boolean
  feed: FeedOptions
}

function locale(code: string, pattern: string, description: string): RSSLocaleConfig {
  const root = !pattern.startsWith(code);
  const base = new URL(`${SITE_URL}/`);
  const siteUrl = root ? base : new URL(`${code}/`, base);

  return {
    code,
    pattern,
    root,
    feed: {
      title: SITE_NAME,
      description,
      copyright: SITE_COPYRIGHT,
      id: siteUrl.href,
      link: siteUrl.href,
      language: code,
      favicon: new URL("favicon.ico", base).href,
      feedLinks: {
        rss: new URL("rss.xml", siteUrl).href
      }
    }
  };
}

export const RSS_LOCALES = [
  locale("ru", "articles/*.md", i18n.ru.description),
  locale("en", "en/articles/*.md", i18n.en.description)
];
