import { readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { cwd } from "node:process";

const projectRoot = cwd();
const sourceDir = join(projectRoot, "articles");
const translatedDir = join(projectRoot, "en", "articles");

function getMarkdownFiles(dirPath: string): string[] {
  try {
    return readdirSync(dirPath)
      .filter((file) => file.endsWith(".md"))
      .map((file) => basename(file));
  } catch {
    console.error(`Failed to read ${dirPath}`);
    return [];
  }
}

const sourceFiles = getMarkdownFiles(sourceDir);
const translatedFiles = getMarkdownFiles(translatedDir);
const missingTranslations = sourceFiles.filter((file) => !translatedFiles.includes(file));

if (missingTranslations.length) {
  console.info(`${missingTranslations.length} articles are missing EN translations:`);
  missingTranslations.forEach((file) => console.info(" -", file));
} else {
  console.info("All articles are translated.");
}
