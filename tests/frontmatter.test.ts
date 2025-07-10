import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

describe("frontmatter validator", () => {
  function getMarkdownFiles(dir: string): string[] {
    return readdirSync(dir)
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => join(dir, fileName));
  }
  const ARTICLES_DIR = fileURLToPath(new URL("../articles", import.meta.url));

  for (const filePath of getMarkdownFiles(ARTICLES_DIR)) {
    const raw = readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(raw);

    it(basename(filePath), () => {
      expect(frontmatter.title).toBeTypeOf("string");
      expect(frontmatter.description).toBeTypeOf("string");
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
});
