import { normalize } from "node:path";
import { fileURLToPath } from "node:url";
import dayjs from "dayjs";
import namedPort from "named-port";
import { defineConfig } from "vitepress";
import pkg from "../package.json";
import { REPOSITORY_URL, SITE_NAME, SITE_URL } from "./constants/common";
import { isArticlePublished } from "./helpers/data";
import locales from "./locales";
import searchLocales from "./locales/search";
import { generateRSS } from "./rss";
import type { Frontmatter } from "./composables/useFrontmatter";

function composeHref(path = "") {
  return new URL(normalize(path), SITE_URL).href;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales,
  head: [
    ["link", { rel: "icon", href: "/images/favicon.ico", sizes: "32x32" }],
    ["link", { rel: "apple-touch-icon", href: "/images/apple-touch-icon.png" }],
    ["meta", { name: "og:site_name", content: SITE_NAME }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:logo", content: "/images/icon-512x512.png" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["link", { rel: "alternate", type: "application/rss+xml", href: "/en/rss.xml", title: "RSS (EN)" }],
    ["link", { rel: "alternate", type: "application/rss+xml", href: "/rss.xml", title: "RSS (RU)" }]
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
    pageData.frontmatter.head.push(["meta", { name: "article:published_time", content: dayjs(date).toISOString() }]);
    // Optional
    if (typeof hero === "string") {
      pageData.frontmatter.head.push(["meta", { name: "og:image", content: composeHref(hero) }]);
      pageData.frontmatter.head.push(["meta", { name: "twitter:image", content: composeHref(hero) }]);
    }
    if (author) {
      const authors = Array.isArray(author) ? author : [author];
      pageData.frontmatter.head.push(["meta", { name: "author", content: authors.join(", ") }]);
    }
    if (!isArticlePublished(date)) { pageData.frontmatter.head.push(["meta", { name: "robots", content: "noindex" }]); }
  },
  sitemap: { hostname: composeHref() },
  cleanUrls: true,
  srcExclude: ["README.md", "LICENSE.md", "LICENSE.CONTENT.md"],
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("theme/components", import.meta.url))
      }
    },
    server: { port: namedPort(pkg.name, { min: 7000, max: 10000 }) }
  },
  markdown: { theme: { light: "github-light", dark: "github-dark" } },
  lastUpdated: true,
  themeConfig: {
    outline: false,
    aside: false,
    search: {
      provider: "local",
      options: {
        disableQueryPersistence: true,
        locales: searchLocales
      }
    },
    editLink: { pattern: `${REPOSITORY_URL}/edit/master/:path` },
    docFooter: { prev: false, next: false }
  },
  buildEnd: generateRSS
});
