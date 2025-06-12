import { fileURLToPath } from "node:url";
import dayjs from "dayjs";
import { defineConfig, type HeadConfig } from "vitepress";
import { RssPlugin, type RSSOptions } from "vitepress-plugin-rss";

const RSS: RSSOptions = {
  title: "JS F/k",
  description: "HTML/TS/Vue — с примерами, по делу, без воды",
  copyright: "CC-BY-NC-SA 4.0 © 2025 JS F/k Team",
  baseUrl: "https://js-f-k.netlify.app",
  language: "ru-RU"
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JS F/k",
  description: "HTML/TS/Vue — с примерами, по делу, без воды",
  lang: "ru-RU",
  head: [
    ["link", { rel: "icon", href: "/images/favicon.ico", sizes: "32x32" }],
    ["link", { rel: "apple-touch-icon", href: "/images/apple-touch-icon.png" }]
  ],
  transformHead({ pageData }) {
    const head: HeadConfig[] = [];

    const { date } = pageData.frontmatter;
    const isFuture = dayjs(date).isAfter(dayjs());
    if (isFuture) { head.push(["meta", { name: "robots", content: "noindex" }]); }

    return head;
  },
  sitemap: { hostname: "https://js-f-k.netlify.app" },
  cleanUrls: true,
  srcExclude: ["README.md", "LICENSE.md"],
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("theme/components", import.meta.url))
      }
    },
    plugins: [RssPlugin(RSS)]
  },
  markdown: {
    theme: { light: "catppuccin-latte", dark: "catppuccin-mocha" }
  },
  lastUpdated: true,
  themeConfig: {
    outline: false,
    aside: false,
    socialLinks: [
      { icon: "telegram", link: "https://t.me/js_fck" }
    ],
    nav: [
      { text: "Статьи по датам", link: "/articles-by-date" },
      { text: "Статьи по тегам", link: "/articles-by-tag" }
    ],
    lastUpdated: {
      text: "Последнее обновление",
      formatOptions: {
        forceLocale: true,
        dateStyle: "long"
      }
    },
    docFooter: { prev: false, next: false },
    footer: {
      copyright: "<a href=\"https://creativecommons.org/licenses/by-nc-sa/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Открыть текст лицензии CC-BY-NC-SA 4.0\">CC-BY-NC-SA 4.0</a> © 2025 JS F/k Team"
    },
    notFound: {
      title: "СТРАНИЦА НЕ НАЙДЕНА",
      quote: "Возможно, вы перешли по неправильной ссылке. А может, мы опять что-то сломали ¯\\_(ツ)_/¯",
      linkLabel: "Вернуться на главную",
      linkText: "На главную"
    }
  }
});
