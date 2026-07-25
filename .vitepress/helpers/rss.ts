import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { styleText } from "node:util";
import { Feed } from "feed";
import type { ContentData } from "vitepress";
import { SITE_URL } from "../constants/common";
import en from "../locales/rss/en";
import ru from "../locales/rss/ru";

const CHANNEL_INDENT_REGEX = /^(\s*)<channel>/m;
const PREVIEW_SCRIPT = `<script xmlns="http://www.w3.org/1999/xhtml" src="/pretty-feed-v3.js" defer="" />`;
export function injectScript(xml: string): string {
  return xml.replace(CHANNEL_INDENT_REGEX, (_, indent) =>
    `${indent}<channel>\n${indent.repeat(2)}${PREVIEW_SCRIPT}`
  );
}

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

  const outputPath = join(outDir, "rss.xml");
  const content = injectScript(feed.rss2());

  writeFileSync(outputPath, content);
  console.info(`${styleText("green", "✓")} generated RSS for ${locale} locale`);
}
