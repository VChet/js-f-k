import { createContentLoader } from "vitepress";
import { ARTICLES_LOADER_OPTIONS } from "../constants/loader";
import type { Frontmatter } from "../types/frontmatter";

export interface Article {
  url: string
  lang: string
  title: Frontmatter["title"]
  description: Frontmatter["description"]
  date: Frontmatter["date"]
  tags: Frontmatter["tags"]
};
export const data: Article[] = [];

export default createContentLoader("**/articles/*.md", ARTICLES_LOADER_OPTIONS);
