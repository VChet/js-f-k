import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { Feed } from "feed";
import type { ContentData } from "vitepress";
import { SITE_URL } from "../constants/common";
import en from "../locales/rss/en";
import ru from "../locales/rss/ru";

export function generateRSS(articles: ContentData[], locale: "ru" | "en") {
  const feed = new Feed(locale === "ru" ? ru : en);

  for (const article of articles) {
    feed.addItem({
      title: article.frontmatter.title,
      id: `${SITE_URL}${article.url}`,
      link: `${SITE_URL}${article.url}`,
      date: new Date(article.frontmatter.date),
      description: article.frontmatter.description,
      content: article.html
    });
  }

  const outDir = locale === "ru" ?
    resolve(cwd(), ".vitepress/dist") :
    resolve(cwd(), ".vitepress/dist", locale);
  mkdirSync(outDir, { recursive: true });

  const rawRss = feed.rss2().replace(/^<\?xml.*?\?>\s*/i, "");
  const content = [
    "<?xml version=\"1.0\" encoding=\"utf-8\"?>",
    "<?xml-stylesheet href=\"/pretty-feed-v3.xsl\" type=\"text/xsl\"?>",
    rawRss
  ].join("\n");

  const outputPath = join(outDir, "rss.xml");
  writeFileSync(outputPath, content);
  console.info(`Generated RSS for ${locale} locale`);
}
