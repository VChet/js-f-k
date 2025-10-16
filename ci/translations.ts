import { readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const SOURCE_DIR = join(projectRoot, "articles");
const TRANSLATED_DIR = join(projectRoot, "en", "articles");
const BADGE_DIR = join(projectRoot, "ci", "badge.json");

function getMarkdownFiles(dirPath: string): string[] {
  try {
    return readdirSync(dirPath)
      .filter((file) => file.endsWith(".md"))
      .map((file) => basename(file));
  } catch {
    console.error(`Failed to read ${dirPath}`);
    process.exit(1);
  }
}

const sourceFiles = getMarkdownFiles(SOURCE_DIR);
const translatedFiles = getMarkdownFiles(TRANSLATED_DIR);
const missingTranslations = sourceFiles.filter((file) => !translatedFiles.includes(file));
const count = missingTranslations.length;

if (process.argv.includes("--json")) {
  const badge = {
    schemaVersion: 1,
    label: "translations",
    message: count ? `${count} missing` : "OK",
    color: count === 0 ? "brightgreen" : count <= 5 ? "yellow" : "red",
    style: "flat-square"
  };
  const badgeJson = JSON.stringify(badge, null, 2);

  writeFileSync(BADGE_DIR, `${badgeJson}\n`);
  console.info(badgeJson);
  process.exit(0);
}

if (count) {
  console.info(`${count} articles are missing EN translations:`);
  missingTranslations.forEach((file) => console.info(" -", file));
} else {
  console.info("All articles are translated.");
}
