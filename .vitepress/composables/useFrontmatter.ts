import type { Ref } from "vue";
import { useData } from "vitepress";

export interface Frontmatter {
  title: string
  description: string
  author: string | string[]
  tags: string[]
  date?: string
  publish?: false
  hero?: string
}

export function useFrontmatter(): Ref<Frontmatter> {
  return useData().frontmatter as Ref<Frontmatter>;
}
