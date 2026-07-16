import matter from "@11ty/gray-matter";

const WORD_REGEX = /[\p{Script=Latin}\p{Script=Cyrillic}]+/gu;

const SCRIPT_BLOCK_REGEX = /<script\b[^>]+setup[^>]*>[\s\S]*?<\/script>/gi;
const STYLE_BLOCK_REGEX = /<style\b[^>]+scoped[^>]*>[\s\S]*?<\/style>/gi;
const COMPONENT_TAG_REGEX = /<([A-Z][\w-]*)\b[^>]*>/g; ;
const MD_LINK_REGEX = /\[([^\]]+)\]\([^)]+\)/g;

function cleanMarkdown(md: string): string {
  return md
    .replace(SCRIPT_BLOCK_REGEX, " ") // remove page script
    .replace(STYLE_BLOCK_REGEX, " ") // remove page style
    .replace(COMPONENT_TAG_REGEX, " ") // remove tags
    .replace(MD_LINK_REGEX, "$1") // extract link text
    .replace(/\s+/g, " ")
    .trim();
}

/** Returns reading time in minutes */
export function calculateReadingTime(source: string | undefined, wordsPerMinute = 160): number {
  if (!source) return 0;

  const { content } = matter(source);
  const cleanContent = cleanMarkdown(content);
  const wordsCount = (cleanContent.match(WORD_REGEX) ?? []).length ?? 0;
  const duration = Math.max(1, Math.ceil(wordsCount / wordsPerMinute));
  return duration;
}
