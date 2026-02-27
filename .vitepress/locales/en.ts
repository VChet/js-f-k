import { REPOSITORY_URL, SITE_NAME } from "../constants/common";
import locales from "./i18n";

const COPYRIGHT = `
  <a
    href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
    target="_blank"
    rel="noopener noreferrer"
    title="Open the text of the CC-BY-SA 4.0 license"
  >CC-BY-SA 4.0</a> © 2025 JS F/k Team
`.trim();

export default {
  label: "English",
  lang: "en",
  link: "/en",
  title: SITE_NAME,
  description: locales.en.description,
  themeConfig: {
    nav: [
      { text: "Articles", link: "/en/articles" }
    ],
    socialLinks: [
      { icon: "github", link: REPOSITORY_URL, ariaLabel: "GitHub" },
      { icon: "rss", link: "/en/rss.xml", ariaLabel: "RSS" }
    ],
    editLink: { text: "Edit this page on GitHub" }
  },
  footer: { copyright: COPYRIGHT }
};
