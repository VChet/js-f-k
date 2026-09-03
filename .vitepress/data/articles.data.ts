import { createContentLoader } from "vitepress";
import { ARTICLES_LOADER_OPTIONS } from "../constants/loader.ts";
import type { Frontmatter } from "../composables/useFrontmatter.ts";

export interface Article {
  url: string
  lang: string
  duration: number
  title: Frontmatter["title"]
  description: Frontmatter["description"]
  date: Frontmatter["date"]
  tags: Frontmatter["tags"]
};
export const data: Article[] = [];

export default createContentLoader("**/articles/*.md", ARTICLES_LOADER_OPTIONS);
