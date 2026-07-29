import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { styleText } from "node:util";
import { Feed } from "feed";
import { createContentLoader, type ContentData } from "vitepress";
import { RSS_LOADER_OPTIONS } from "../constants/loader";
import { RSS_LOCALES, type RSSLocaleConfig } from "./locales";

function injectScript(xml: string): string {
  const CHANNEL_INDENT_REGEX = /^(\s*)<channel>/m;
  const PREVIEW_SCRIPT = `<script xmlns="http://www.w3.org/1999/xhtml" src="/pretty-feed-v3.js" defer="" />`;
  return xml.replace(CHANNEL_INDENT_REGEX, (_, indent) =>
    `${indent}<channel>\n${indent.repeat(2)}${PREVIEW_SCRIPT}`
  );
}

function generateFeed(articles: ContentData[], config: RSSLocaleConfig): Feed {
  const feed = new Feed(config.feed);
  for (const article of articles) {
    const articleUrl = new URL(article.url, config.feed.link).href;
    feed.addItem({
      title: article.frontmatter.title,
      id: articleUrl,
      link: articleUrl,
      date: new Date(article.frontmatter.date),
      description: article.frontmatter.description,
      content: article.html
    });
  }
  return feed;
}

function composeRSSFile(articles: ContentData[], config: RSSLocaleConfig): void {
  const outDir = resolve(cwd(), ".vitepress/dist", config.root ? "" : config.code);
  mkdirSync(outDir, { recursive: true });
  const outputPath = join(outDir, "rss.xml");

  const feed = generateFeed(articles, config);
  const content = injectScript(feed.rss2());

  writeFileSync(outputPath, content);
  console.info(`${styleText("green", "✓")} generated RSS for ${styleText("cyan", config.code)} locale`);
}

export async function generateRSS(): Promise<void> {
  const composers = RSS_LOCALES.map(async (config) => {
    const pages = await createContentLoader(config.pattern, RSS_LOADER_OPTIONS).load();
    composeRSSFile(pages, config);
  });
  await Promise.all(composers);
}
