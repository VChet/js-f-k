import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { authorsData } from "../.vitepress/data/authors";
import type { Frontmatter } from "../.vitepress/composables/useFrontmatter";

describe("frontmatter validator", () => {
  function getMarkdownFiles(dir: string): string[] {
    return readdirSync(dir)
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => join(dir, fileName));
  }
  const ARTICLES_DIRS = [
    fileURLToPath(new URL("../articles", import.meta.url)),
    fileURLToPath(new URL("../en/articles", import.meta.url))
  ];

  function isValidAuthor(value: unknown): boolean {
    const isAuthorExists = (payload: unknown): boolean => typeof payload === "string" && authorsData.has(payload);
    return Array.isArray(value) ? value.every(isAuthorExists) : isAuthorExists(value);
  }

  for (const dir of ARTICLES_DIRS) {
    for (const filePath of getMarkdownFiles(dir)) {
      const raw = readFileSync(filePath, "utf8");
      const result = matter(raw);
      const frontmatter = result.data as Frontmatter;

      it(basename(filePath), () => {
        expect(frontmatter.title).toBeTypeOf("string");
        expect(frontmatter.description).toBeTypeOf("string");
        expect(isValidAuthor(frontmatter.author)).toBeTruthy();
        expect(frontmatter.tags).toSatisfy(Array.isArray).and.not.toHaveLength(0);

        if ("hero" in frontmatter) { expect(frontmatter.hero).toMatch(/^\/hero\/.+\.(png|jpe?g|webp|svg|gif)$/); }
        if ("publish" in frontmatter) {
          expect(frontmatter.publish).toBe(false);
          expect(frontmatter.date).toBeUndefined();
        } else {
          expect(frontmatter.date).toBeInstanceOf(Date);
        }
      });
    }
  }
});
