import { normalize } from "node:path";
import { fileURLToPath } from "node:url";
import dayjs from "dayjs";
import { defineConfig } from "vitepress";
import { RssPlugin, type RSSOptions } from "vitepress-plugin-rss";

function composeHref(path = "") {
  return new URL(normalize(path), "https://js-f-k.netlify.app").href;
}

const RSS: RSSOptions = {
  title: "JS F/k",
  description: "HTML/TS/Vue — с примерами, по делу, без воды",
  copyright: "CC-BY-NC-SA 4.0 © 2025 JS F/k Team",
  baseUrl: composeHref(),
  language: "ru-RU"
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JS F/k",
  description: "HTML/TS/Vue — с примерами, по делу, без воды",
  lang: "ru-RU",
  head: [
    ["link", { rel: "icon", href: "/images/favicon.ico", sizes: "32x32" }],
    ["link", { rel: "apple-touch-icon", href: "/images/apple-touch-icon.png" }],
    ["meta", { name: "og:site_name", content: "JS F/k" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "twitter:card", content: "summary" }]
  ],
  transformPageData(pageData, { siteConfig }) {
    pageData.frontmatter.head ??= [];

    const { title, date, tags } = pageData.frontmatter;
    const pageTitle = title ?? siteConfig.site.title;
    const pageHref = composeHref(pageData.relativePath).replace("/index.md", "").replace(".md", "");

    pageData.frontmatter.head.push(["link", { rel: "canonical", href: pageHref }]);
    pageData.frontmatter.head.push(["meta", { name: "og:title", content: pageTitle }]);
    pageData.frontmatter.head.push(["meta", { name: "og:url", content: pageHref }]);
    pageData.frontmatter.head.push(["meta", { name: "twitter:title", content: pageTitle }]);
    // Optional
    if (tags) { pageData.frontmatter.head.push(["meta", { name: "keywords", content: tags.join(", ") }]); }
    const isFuture = dayjs(date).isAfter(dayjs());
    if (isFuture) { pageData.frontmatter.head.push(["meta", { name: "robots", content: "noindex" }]); }
  },
  sitemap: { hostname: composeHref() },
  cleanUrls: true,
  srcExclude: ["README.md", "LICENSE.md"],
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("theme/components", import.meta.url))
      }
    },
    plugins: [RssPlugin(RSS)],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  },
  markdown: {
    theme: { light: "catppuccin-latte", dark: "catppuccin-mocha" }
  },
  lastUpdated: true,
  themeConfig: {
    outline: false,
    aside: false,
    socialLinks: [
      { icon: "telegram", link: "https://t.me/js_fck", ariaLabel: "Telegram" }
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
    langMenuLabel: "Изменить язык",
    returnToTopLabel: "Вернуться к началу",
    darkModeSwitchLabel: "Оформление",
    lightModeSwitchTitle: "Переключить на светлую тему",
    darkModeSwitchTitle: "Переключить на тёмную тему",
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
