import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { authorsData } from "../.vitepress/constants/authors";
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
    const isNonRoot: boolean = dir !== ARTICLES_DIRS[0];
    for (const filePath of getMarkdownFiles(dir)) {
      const raw = readFileSync(filePath, "utf8");
      const result = matter(raw);
      const frontmatter = result.data as Frontmatter;

      const testName = relative(process.cwd(), filePath);
      it(testName, () => {
        expect(frontmatter.title, "Title should be a string").toBeTypeOf("string");
        expect(frontmatter.description, "Description should be a string").toBeTypeOf("string");
        expect(isValidAuthor(frontmatter.author), "Invalid author").toBeTruthy();
        expect(frontmatter.tags, "Tags should be an array").toSatisfy(Array.isArray).and.not.toHaveLength(0);

        if (isNonRoot) { expect(frontmatter.discussionId, "Extra discussionId").toBeUndefined(); }
        if ("hero" in frontmatter) { expect(frontmatter.hero, "Invalid hero image").toMatch(/^\/hero\/.+\.(png|jpe?g|webp|svg|gif)$/); }
        if ("discussionId" in frontmatter) { expect(frontmatter.discussionId, "Invalid discussionId").toBeTypeOf("number"); }
        if ("publish" in frontmatter) {
          expect(frontmatter.publish, "Only false publish flag is allowed").toBe(false);
          expect(frontmatter.date, "Date should be empty for drafts").toBeUndefined();
        } else {
          expect(frontmatter.date, "Invalid date").toBeInstanceOf(Date);
        }
      });
    }
  }
});
