import type { Frontmatter } from "./types/frontmatter";

declare module "vitepress" {
  interface PageData {
    frontmatter: Frontmatter
  }
  interface ContentData {
    frontmatter: Frontmatter
  }
}
