#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const libraryRoot = path.join(repoRoot, "library");
const issues = [];

const chapterMap = {
  en: new Set([
    "coding",
    "design",
    "language-&-communication",
    "ethics-&-legal",
    "ai-&-prompting",
    "media-&-production",
    "project-&-operations",
    "research-&-analysis",
  ]),
  de: new Set([
    "coding",
    "design",
    "sprache-&-kommunikation",
    "ethik-&-recht",
    "ki-&-prompting",
    "medien-&-produktion",
    "projekt-&-operationen",
    "recherche-&-analyse",
  ]),
};

const footerPattern =
  /^(German version|English version|Englische Version):\s*\[[^\]]+\]\(([^)]+\.md)\)\s*$/gm;
const emojiPattern = /[\p{Extended_Pictographic}\uFE0F]/gu;
const linkPattern = /\[[^\]]+\]\(([^)]+\.md)\)/g;
const genericHeadingPattern = /^(#{3,4})\s*(Good|Bad|Gut|Schlecht)\s*$/m;

function walk(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".md")) {
      result.push(fullPath);
    }
  }
  return result;
}

function repoRelative(fullPath) {
  return path.relative(repoRoot, fullPath).replaceAll("\\", "/");
}

function fileLocaleAndChapter(filePath) {
  const rel = repoRelative(filePath);
  const parts = rel.split("/");
  return {
    locale: parts[1],
    chapter: parts[2],
  };
}

function report(file, message) {
  issues.push(`${repoRelative(file)}: ${message}`);
}

const files = [
  ...walk(path.join(libraryRoot, "en")),
  ...walk(path.join(libraryRoot, "de")),
];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const { locale, chapter } = fileLocaleAndChapter(file);
  if (!chapterMap[locale]?.has(chapter)) {
    report(file, `unknown chapter folder for locale '${locale}': '${chapter}'`);
  }

  if (emojiPattern.test(text)) {
    report(file, "contains emoji characters");
  }
  emojiPattern.lastIndex = 0;

  const footers = [...text.matchAll(footerPattern)];
  if (footers.length === 0) {
    report(file, "missing counterpart footer");
  } else if (footers.length > 1) {
    report(file, "multiple counterpart footers found");
  }

  for (const footer of footers) {
    const target = path.resolve(path.dirname(file), footer[2]);
    if (!fs.existsSync(target)) {
      report(file, `counterpart footer points to missing file: ${footer[2]}`);
    }
  }

  for (const match of text.matchAll(linkPattern)) {
    const target = path.resolve(path.dirname(file), match[1]);
    if (!fs.existsSync(target)) {
      report(file, `broken relative .md link: ${match[1]}`);
    }
  }

  if (genericHeadingPattern.test(text)) {
    report(file, "contains generic Good/Bad heading without context");
  }

  if (locale === "en") {
    if (!/^## Core idea\s*$/m.test(text)) {
      report(file, "missing '## Core idea'");
    }
    if (!/^## Further reading\s*$/m.test(text)) {
      report(file, "missing '## Further reading'");
    }
  } else if (locale === "de") {
    if (!/^## Kerngedanke\s*$/m.test(text)) {
      report(file, "missing '## Kerngedanke'");
    }
    if (!/^## Weiterführend\s*$/m.test(text)) {
      report(file, "missing '## Weiterführend'");
    }
  }
}

if (issues.length > 0) {
  console.error("Library docs check failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Library docs check passed for ${files.length} files.`);
