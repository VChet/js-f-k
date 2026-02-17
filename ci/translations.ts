import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const SOURCE_DIR = join(projectRoot, "articles");
const BADGES_DIR = join(projectRoot, "ci", "badges");
const LANGUAGES = ["en"] as const;

function getMarkdownFiles(dirPath: string): string[] {
  try {
    return readdirSync(dirPath)
      .filter((file) => file.endsWith(".md"))
      .map((file) => basename(file));
  } catch {
    return [];
  }
}

function getColor(percent: number): string {
  if (percent === 100) return "brightgreen";
  if (percent >= 80) return "green";
  if (percent >= 60) return "yellow";
  if (percent >= 40) return "orange";
  return "red";
}

const sourceFiles = getMarkdownFiles(SOURCE_DIR);
const total = sourceFiles.length;

if (!total) {
  console.error("No source articles found");
  process.exit(1);
}

mkdirSync(BADGES_DIR, { recursive: true });

for (const lang of LANGUAGES) {
  const translatedDir = join(projectRoot, lang, "articles");
  const translatedFiles = getMarkdownFiles(translatedDir);
  const translatedSet = new Set(translatedFiles);
  const translatedCount = sourceFiles.filter((file) => translatedSet.has(file)).length;

  const percent = Math.round((translatedCount / total) * 100);
  const badge = {
    schemaVersion: 1,
    label: lang,
    message: `${percent}%`,
    color: getColor(percent),
    style: "flat-square"
  };

  const badgePath = join(BADGES_DIR, `${lang}.json`);
  const badgeJson = JSON.stringify(badge, null, 2);
  if (process.argv.includes("--json")) {
    writeFileSync(badgePath, `${badgeJson}\n`);
    console.info(badgeJson);
  } else {
    console.info(`${lang}: ${percent}%`);
  }
}
