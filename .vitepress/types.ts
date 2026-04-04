import type { ContentData as VPContentData, PageData as VPPageData } from "vitepress";
import type { Frontmatter } from "./types/frontmatter";

declare module "vitepress" {
  interface PageData extends Omit<VPPageData, "frontmatter"> {
    frontmatter: Frontmatter
  }
  interface ContentData extends Omit<VPContentData, "frontmatter"> {
    frontmatter: Frontmatter
  }
}
