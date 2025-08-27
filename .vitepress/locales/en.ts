import { SITE_NAME } from "../constants/common";
import locales from "./i18n";

const COPYRIGHT = `
  <a
    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
    target="_blank"
    rel="noopener noreferrer"
    title="Open the text of the CC-BY-NC-SA 4.0 license"
  >CC-BY-NC-SA 4.0</a> © 2025 JS F/k Team
`.trim();

export default {
  label: "English",
  lang: "en",
  link: "/en",
  title: SITE_NAME,
  description: locales.en.description,
  themeConfig: {
    nav: [
      { text: "Articles by date", link: "/en/articles-by-date" },
      { text: "Articles by tag", link: "/en/articles-by-tag" }
    ],
    socialLinks: [
      { icon: "rss", link: "/en/rss.xml", ariaLabel: "RSS" }
    ]
  },
  footer: { copyright: COPYRIGHT }
};
