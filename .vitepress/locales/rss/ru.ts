import type { FeedOptions } from "feed";
import { SITE_COPYRIGHT, SITE_NAME, SITE_URL } from "../../constants/common";
import locales from "../i18n";

export default {
  title: SITE_NAME,
  description: locales.ru.description,
  copyright: SITE_COPYRIGHT,
  id: SITE_URL,
  link: SITE_URL,
  language: "ru",
  favicon: `${SITE_URL}favicon.ico`,
  feedLinks: {
    rss: `${SITE_URL}feed.xml`
  }
} satisfies FeedOptions;
