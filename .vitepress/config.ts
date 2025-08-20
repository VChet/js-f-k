import { normalize } from "node:path";
import { fileURLToPath } from "node:url";
import dayjs from "dayjs";
import { defineConfig } from "vitepress";
import { RssPlugin, type RSSOptions } from "vitepress-plugin-rss";
import type { Frontmatter } from "./composables/useFrontmatter";

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
const TELEGRAM_CHANNEL = "js_fck";
const COPYRIGHT = `
  <a
    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
    target="_blank"
    rel="noopener noreferrer"
    title="Открыть текст лицензии CC-BY-NC-SA 4.0"
  >CC-BY-NC-SA 4.0</a> © 2025 JS F/k Team
`.trim();

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
    ["meta", { name: "og:logo", content: "/images/icon-512x512.png" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }]
  ],
  transformPageData(pageData, { siteConfig }) {
    pageData.frontmatter.head ??= [];

    const { title, description, hero, author, date } = pageData.frontmatter as Frontmatter;
    const pageTitle = title ?? siteConfig.site.title;
    const pageDescription = description ?? siteConfig.site.description;
    const pageHref = composeHref(pageData.relativePath).replace("/index.md", "").replace(".md", "");

    pageData.frontmatter.head.push(["link", { rel: "canonical", href: pageHref }]);
    pageData.frontmatter.head.push(["meta", { name: "description", content: pageDescription }]);
    pageData.frontmatter.head.push(["meta", { name: "og:title", content: pageTitle }]);
    pageData.frontmatter.head.push(["meta", { name: "og:description", content: pageDescription }]);
    pageData.frontmatter.head.push(["meta", { name: "og:url", content: pageHref }]);
    pageData.frontmatter.head.push(["meta", { name: "twitter:title", content: pageTitle }]);
    pageData.frontmatter.head.push(["meta", { name: "twitter:description", content: pageDescription }]);
    pageData.frontmatter.head.push(["meta", { name: "twitter:url", content: pageHref }]);
    // Optional
    if (hero) {
      pageData.frontmatter.head.push(["meta", { name: "og:image", content: composeHref(hero) }]);
      pageData.frontmatter.head.push(["meta", { name: "twitter:image", content: composeHref(hero) }]);
    }
    if (author) {
      const authors = Array.isArray(author) ? author : [author];
      pageData.frontmatter.head.push(["meta", { name: "author", content: authors.join(", ") }]);
    }
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
  markdown: { theme: { light: "github-light", dark: "github-dark" } },
  themeConfig: {
    outline: false,
    aside: false,
    search: {
      provider: "local",
      options: {
        disableQueryPersistence: true,
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Поиск",
                buttonAriaLabel: "Поиск"
              },
              modal: {
                displayDetails: "Отображение подробного списка",
                resetButtonTitle: "Очистить поле поиска",
                backButtonTitle: "Закрыть поиск",
                noResultsText: "Нет результатов для",
                footer: {
                  selectText: "выбор",
                  navigateText: "перемещение",
                  navigateUpKeyAriaLabel: "стрелка вверх",
                  navigateDownKeyAriaLabel: "стрелка вниз",
                  closeText: "закрыть"
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: "telegram", link: `https://t.me/${TELEGRAM_CHANNEL}`, ariaLabel: "Telegram" }
    ],
    nav: [
      { text: "Статьи по датам", link: "/articles-by-date" },
      { text: "Статьи по тегам", link: "/articles-by-tag" }
    ],
    langMenuLabel: "Изменить язык",
    returnToTopLabel: "Вернуться к началу",
    darkModeSwitchLabel: "Оформление",
    lightModeSwitchTitle: "Переключить на светлую тему",
    darkModeSwitchTitle: "Переключить на тёмную тему",
    docFooter: { prev: false, next: false },
    footer: { copyright: COPYRIGHT },
    notFound: {
      title: "СТРАНИЦА НЕ НАЙДЕНА",
      quote: "Возможно, вы перешли по неправильной ссылке. А может, мы опять что-то сломали ¯\\_(ツ)_/¯",
      linkLabel: "Вернуться на главную",
      linkText: "На главную"
    }
  }
});
