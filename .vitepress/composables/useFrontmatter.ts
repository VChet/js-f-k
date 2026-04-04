import type { Ref } from "vue";
import { useData } from "vitepress";
import type { Frontmatter } from "../types/frontmatter";

export function useFrontmatter(): Ref<Frontmatter> {
  return useData().frontmatter as Ref<Frontmatter>;
}
