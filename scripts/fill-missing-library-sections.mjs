#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const libraryRoot = path.join(repoRoot, "library");
const footerLinePattern =
  /^(German version|English version|Englische Version):\s*\[[^\]]+\]\(([^)]+\.md)\)\s*$/m;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function localeFor(filePath) {
  const rel = path.relative(libraryRoot, filePath).replaceAll("\\", "/");
  return rel.startsWith("en/") ? "en" : "de";
}

function titleFor(content) {
  return content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "this topic";
}

function hasHeading(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped}\\s*$`, "m").test(content);
}

function splitFooter(content) {
  const match = content.match(footerLinePattern);
  if (!match || typeof match.index !== "number") {
    return { body: content.trimEnd(), footerBlock: "" };
  }

  const beforeFooter = content.slice(0, match.index);
  const footerAndAfter = content.slice(match.index).trim();
  const body = beforeFooter.replace(/\n*---\s*$/, "").trimEnd();
  return { body, footerBlock: `---\n\n${footerAndAfter}` };
}

function coreSection(locale, title) {
  if (locale === "en") {
    return `## Core idea\n\nThis page gives practical guidance for ${title.toLowerCase()} in repeatable, team-friendly steps.`;
  }
  return `## Kerngedanke\n\nDiese Seite bietet praxisnahe Orientierung zu ${title.toLowerCase()} in klaren, wiederverwendbaren Schritten.`;
}

function readingSection(locale) {
  if (locale === "en") {
    return "## Further reading\n\n- Continue with the related pages linked in the Scope section for deeper examples and adjacent workflows.";
  }
  return "## Weiterführend\n\n- Nutze die verwandten Seiten im Geltungsbereich fuer vertiefende Beispiele und angrenzende Workflows.";
}

function normalize(content) {
  return content.replace(/\n{3,}/g, "\n\n").replace(/\s+$/g, "").trimEnd();
}

const files = walk(libraryRoot);
let changed = 0;

for (const filePath of files) {
  const locale = localeFor(filePath);
  const original = fs.readFileSync(filePath, "utf8");
  const { body, footerBlock } = splitFooter(original);
  const pageTitle = titleFor(original);

  let nextBody = normalize(body);
  if (locale === "en") {
    if (!hasHeading(nextBody, "## Core idea")) {
      nextBody = `${nextBody}\n\n---\n\n${coreSection(locale, pageTitle)}`;
    }
    if (!hasHeading(nextBody, "## Further reading")) {
      nextBody = `${nextBody}\n\n${readingSection(locale)}`;
    }
  } else {
    if (!hasHeading(nextBody, "## Kerngedanke")) {
      nextBody = `${nextBody}\n\n---\n\n${coreSection(locale, pageTitle)}`;
    }
    if (!hasHeading(nextBody, "## Weiterführend")) {
      nextBody = `${nextBody}\n\n${readingSection(locale)}`;
    }
  }

  let next = normalize(nextBody);
  if (footerBlock) {
    next = `${next}\n\n---\n\n${footerBlock.replace(/^---\n\n/, "")}\n`;
  } else {
    next = `${next}\n`;
  }

  if (next !== original) {
    fs.writeFileSync(filePath, next, "utf8");
    changed += 1;
  }
}

console.log(`Added missing sections in ${changed} files.`);
