import type { FeedOptions } from "feed";
import { SITE_COPYRIGHT, SITE_NAME, SITE_URL } from "../../constants/common";
import locales from "../i18n";

const siteUrl = `${SITE_URL}/en`;

export default {
  title: SITE_NAME,
  description: locales.en.description,
  copyright: SITE_COPYRIGHT,
  id: siteUrl,
  link: siteUrl,
  language: "en",
  favicon: `${SITE_URL}favicon.ico`,
  feedLinks: {
    rss: `${siteUrl}feed.xml`
  }
} satisfies FeedOptions;
