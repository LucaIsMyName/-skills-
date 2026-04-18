#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const libraryRoot = path.join(repoRoot, "library");

const chapterMap = {
  en: {
    coding: "coding",
    design: "design",
    "language-&-communication": "sprache-&-kommunikation",
    "ethics-&-legal": "ethik-&-recht",
    "ai-&-prompting": "ki-&-prompting",
    "media-&-production": "medien-&-produktion",
    "project-&-operations": "projekt-&-operationen",
    "research-&-analysis": "recherche-&-analyse",
  },
  de: {
    coding: "coding",
    design: "design",
    "sprache-&-kommunikation": "language-&-communication",
    "ethik-&-recht": "ethics-&-legal",
    "ki-&-prompting": "ai-&-prompting",
    "medien-&-produktion": "media-&-production",
    "projekt-&-operationen": "project-&-operations",
    "recherche-&-analyse": "research-&-analysis",
  },
};

const explicitPairs = new Map([
  [
    "de/coding/tailwind-guide.md",
    "en/coding/tailwind-guide.md",
  ],
  [
    "de/design/datenvisualisierung-grundlagen.md",
    "en/design/data-visualization-basics.md",
  ],
  [
    "de/design/design-tokens-und-theming.md",
    "en/design/design-tokens-and-theming.md",
  ],
  [
    "de/design/folien-und-praesentationen.md",
    "en/design/slides-and-presentations.md",
  ],
  [
    "de/design/formulare-und-eingaben-ux.md",
    "en/design/forms-and-input-ux.md",
  ],
  [
    "de/design/gute-interfaces-designen.md",
    "en/design/designing-good-interfaces.md",
  ],
  [
    "de/design/gute-und-schlechte-ui-konzepte.md",
    "en/design/good-and-bad-ui-concepts.md",
  ],
  [
    "de/design/motion-und-micro-interactions.md",
    "en/design/motion-and-micro-interactions.md",
  ],
  [
    "de/sprache-&-kommunikation/barrierefreiheit-kommunikation.md",
    "en/language-&-communication/accessibility-for-comms.md",
  ],
  [
    "de/sprache-&-kommunikation/einfache-sprache.md",
    "en/language-&-communication/easy-read-english.md",
  ],
  [
    "de/sprache-&-kommunikation/krise-und-sensible-themen.md",
    "en/language-&-communication/crisis-and-sensitive-topics.md",
  ],
  [
    "de/sprache-&-kommunikation/newsletter-und-e-mail.md",
    "en/language-&-communication/newsletter-and-email.md",
  ],
  [
    "de/sprache-&-kommunikation/pressemitteilungen-schreiben.md",
    "en/language-&-communication/press-statement-basics.md",
  ],
  [
    "de/sprache-&-kommunikation/social-kurzformate.md",
    "en/language-&-communication/social-short-form.md",
  ],
  [
    "de/sprache-&-kommunikation/storytelling-handwerk-sprache-wirkung.md",
    "en/language-&-communication/storytelling-craft-language-and-impact.md",
  ],
  [
    "de/coding/react-komponenten-async-und-struktur.md",
    "en/coding/react-components-async-and-structure.md",
  ],
  [
    "de/recherche-&-analyse/theorie-des-wandels.md",
    "en/research-&-analysis/theory-of-change.md",
  ],
]);

for (const [left, right] of [...explicitPairs.entries()]) {
  explicitPairs.set(right, left);
}

const emojiPattern = /[\p{Extended_Pictographic}\uFE0F]/gu;
const footnotePattern =
  /^(German version|English version|Englische Version):\s*\[[^\]]+\]\(([^)]+\.md)\)\s*$/gm;
const footnoteLinePattern =
  /^(German version|English version|Englische Version):\s*\[[^\]]+\]\(([^)]+\.md)\)\s*$/;
const titleCache = new Map();

function walkMarkdownFiles(dir) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkMarkdownFiles(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".md")) {
      result.push(fullPath);
    }
  }
  return result;
}

function toRepoRelative(fullPath) {
  return path.relative(repoRoot, fullPath).replaceAll("\\", "/");
}

function toLibraryRelative(fullPath) {
  return path.relative(libraryRoot, fullPath).replaceAll("\\", "/");
}

function resolveLinkedFile(fromFile, linkPath) {
  const abs = path.resolve(path.dirname(fromFile), linkPath);
  if (!abs.startsWith(libraryRoot)) {
    return null;
  }
  return fs.existsSync(abs) ? abs : null;
}

function getLocaleAndChapter(libraryRelativePath) {
  const segments = libraryRelativePath.split("/");
  return {
    locale: segments[0],
    chapter: segments[1],
    slug: segments.slice(2).join("/"),
  };
}

function getTitleForFile(fullPath) {
  if (titleCache.has(fullPath)) {
    return titleCache.get(fullPath);
  }
  const text = fs.readFileSync(fullPath, "utf8");
  const firstHeading = text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
  titleCache.set(fullPath, firstHeading);
  return firstHeading;
}

function bestCounterpart(candidates, sourcePath) {
  if (candidates.length === 1) {
    return candidates[0];
  }

  const sourceTitle = getTitleForFile(sourcePath).toLowerCase();
  let best = candidates[0];
  let bestScore = -1;

  for (const candidate of candidates) {
    const title = getTitleForFile(candidate).toLowerCase();
    let score = 0;
    for (const token of sourceTitle.split(/\W+/)) {
      if (token.length >= 4 && title.includes(token)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return best;
}

function inferCounterpart(filePath, crossLinks, allFilesByKey) {
  const libraryRelative = toLibraryRelative(filePath);
  const override = explicitPairs.get(libraryRelative);
  if (override) {
    const overrideAbs = path.join(libraryRoot, override);
    if (fs.existsSync(overrideAbs)) {
      return overrideAbs;
    }
  }

  const linked = crossLinks.get(filePath);
  if (linked?.size) {
    return bestCounterpart([...linked], filePath);
  }

  const reverseLinked = [];
  for (const [source, targets] of crossLinks.entries()) {
    if (targets.has(filePath)) {
      reverseLinked.push(source);
    }
  }
  if (reverseLinked.length) {
    return bestCounterpart(reverseLinked, filePath);
  }

  const { locale, chapter, slug } = getLocaleAndChapter(libraryRelative);
  const targetLocale = locale === "en" ? "de" : "en";
  const mappedChapter = chapterMap[locale][chapter];
  if (!mappedChapter) {
    return null;
  }

  const directKey = `${targetLocale}/${mappedChapter}/${slug}`;
  if (allFilesByKey.has(directKey)) {
    return allFilesByKey.get(directKey);
  }

  return null;
}

function renderFooter(filePath, counterpartPath) {
  const { locale } = getLocaleAndChapter(toLibraryRelative(filePath));
  const label = locale === "en" ? "German version" : "Englische Version";
  const counterpartTitle = getTitleForFile(counterpartPath);
  const relative = path
    .relative(path.dirname(filePath), counterpartPath)
    .replaceAll("\\", "/");
  return `${label}: [\`${path.basename(counterpartPath)}\`](${relative})`;
}

function cleanupFrontSection(content, locale) {
  let next = content;
  if (locale === "de") {
    next = next.replace(/^\*\*Scope:\*\*/m, "**Geltungsbereich:**");
    next = next.replace(/^## Excerpt\s*$/m, "## Exzerpt");
    next = next.replace(/^## Purpose\s*$/m, "## Zweck");
    next = next.replace(/^## Core idea\s*$/m, "## Kerngedanke");
    next = next.replace(/^## Further reading\s*$/m, "## Weiterführend");
    next = next.replace(/^## Kernidee\s*$/m, "## Kerngedanke");
  } else {
    next = next.replace(/^\*\*Geltungsbereich:\*\*/m, "**Scope:**");
    next = next.replace(/^## Exzerpt\s*$/m, "## Excerpt");
    next = next.replace(/^## Zweck\s*$/m, "## Purpose");
    next = next.replace(/^## Kerngedanke\s*$/m, "## Core idea");
    next = next.replace(/^## Weiterf(ü|ue)hrend\s*$/m, "## Further reading");
    next = next.replace(/^## Final thought\s*$/m, "## Core idea");
  }
  next = next.replace(/^## Excerpt\s+$/gm, "## Excerpt");
  next = next.replace(/^## Exzerpt\s+$/gm, "## Exzerpt");
  return next;
}

function simplifySeparators(content) {
  let next = content.replace(/\n-{3,}\n(?:\s*\n-{3,}\n)+/g, "\n---\n");
  next = next.replace(/\n{3,}/g, "\n\n");
  return next;
}

function contextualizeGoodBad(content, locale) {
  const lines = content.split("\n");
  const contextStack = [];
  const skipContext = new Set([
    "excerpt",
    "exzerpt",
    "purpose",
    "zweck",
    "core idea",
    "kerngedanke",
    "further reading",
    "weiterfuehrend",
    "before writing",
    "vor dem schreiben",
    "before",
  ]);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{2,4})\s+(.+?)\s*$/);
    if (!headingMatch) {
      continue;
    }

    const level = headingMatch[1].length;
    const rawText = headingMatch[2].trim();
    const cleaned = rawText
      .replace(/^(\d+[\).\s-]+)/, "")
      .replace(/\s+/g, " ")
      .trim();
    const lowered = cleaned.toLowerCase();

    while (contextStack.length && contextStack[contextStack.length - 1].level >= level) {
      contextStack.pop();
    }

    const generic = lowered.match(/^(good|bad|gut|schlecht)\s*:?(\s*.+)?$/);
    if (generic && (!generic[2] || !generic[2].trim())) {
      const fallbackContext =
        [...contextStack].reverse().find((ctx) => !skipContext.has(ctx.lowered))?.text ??
        (locale === "en" ? "Example" : "Beispiel");
      const label = locale === "en"
        ? lowered.startsWith("bad")
          ? "Bad"
          : "Good"
        : lowered.startsWith("schlecht")
          ? "Schlecht"
          : "Gut";
      lines[i] = `${"#".repeat(level)} ${label}: ${fallbackContext}`;
      continue;
    }

    const prefixed = lowered.match(/^(good|bad|gut|schlecht):\s*(.+)$/);
    if (prefixed) {
      const label = locale === "en"
        ? prefixed[1] === "bad"
          ? "Bad"
          : "Good"
        : prefixed[1] === "schlecht"
          ? "Schlecht"
          : "Gut";
      const context = prefixed[2].trim();
      lines[i] = `${"#".repeat(level)} ${label}: ${context}`;
    }

    contextStack.push({
      level,
      text: cleaned,
      lowered,
    });
  }

  return lines.join("\n");
}

function ensureRequiredSections(content, locale) {
  let next = content;
  const coreHeading = locale === "en" ? "## Core idea" : "## Kerngedanke";
  const readingHeading = locale === "en" ? "## Further reading" : "## Weiterführend";
  next = next.replace(
    /\n## Kerngedanke\n\nFuege hier einen kurzen Kerngedanken fuer diese Seite ein\.\n?/g,
    "\n",
  );
  next = next.replace(
    /\n## Core idea\n\nAdd one short takeaway sentence for this page\.\n?/g,
    "\n",
  );
  next = next.replace(
    /\n## Weiterführend\n\n- \[Relevante Quelle ergaenzen\]\(https:\/\/example\.com\/\) - Kurz begruenden, warum sie nuetzt\.\n?/g,
    "\n",
  );
  next = next.replace(
    /\n## Further reading\n\n- \[Add a relevant source\]\(https:\/\/example\.com\/\) - Short reason why it is useful\.\n?/g,
    "\n",
  );
  if (!new RegExp(`^${coreHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m").test(next)) {
    console.warn(`Missing core idea heading in ${toLibraryRelative(filePathForWarnings)}`);
  }
  if (!new RegExp(`^${readingHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m").test(next)) {
    console.warn(`Missing further reading heading in ${toLibraryRelative(filePathForWarnings)}`);
  }
  return next;
}

let filePathForWarnings = "";

function rewriteFileContent(content, filePath, counterpartPath) {
  const locale = toLibraryRelative(filePath).startsWith("en/") ? "en" : "de";
  filePathForWarnings = filePath;
  let next = content.replace(emojiPattern, "");
  next = next.replace(/[ \t]+$/gm, "");

  const strippedLines = next
    .split("\n")
      .filter((line) => !footnoteLinePattern.test(line))
    .join("\n");
  footnotePattern.lastIndex = 0;
  next = strippedLines;

  next = cleanupFrontSection(next, locale);
  next = contextualizeGoodBad(next, locale);
  next = ensureRequiredSections(next, locale);
  next = simplifySeparators(next);

  const footer = renderFooter(filePath, counterpartPath);
  next = next
    .replace(/\n*$/, "")
    .replace(/\n---\s*$/, "")
    .replace(/\n---\s*$/, "");
  next = `${next}\n\n---\n\n${footer}\n`;
  return next;
}

function collectCrossLinks(files) {
  const crossLinks = new Map();
  for (const filePath of files) {
    const text = fs.readFileSync(filePath, "utf8");
    const matches = [...text.matchAll(footnotePattern)];
    if (!matches.length) {
      continue;
    }
    const targets = new Set();
    for (const match of matches) {
      const resolved = resolveLinkedFile(filePath, match[2]);
      if (resolved) {
        targets.add(resolved);
      }
    }
    if (targets.size) {
      crossLinks.set(filePath, targets);
    }
  }
  return crossLinks;
}

function main() {
  const files = walkMarkdownFiles(libraryRoot);
  const fileByKey = new Map();
  for (const file of files) {
    fileByKey.set(toLibraryRelative(file), file);
  }

  const crossLinks = collectCrossLinks(files);
  const unresolved = [];
  let changed = 0;

  for (const filePath of files) {
    const counterpart = inferCounterpart(filePath, crossLinks, fileByKey);
    if (!counterpart) {
      unresolved.push(toRepoRelative(filePath));
      continue;
    }
    const before = fs.readFileSync(filePath, "utf8");
    const after = rewriteFileContent(before, filePath, counterpart);
    if (after !== before) {
      fs.writeFileSync(filePath, after, "utf8");
      changed += 1;
    }
  }

  if (unresolved.length > 0) {
    console.error("Could not infer counterpart for:");
    for (const file of unresolved) {
      console.error(`- ${file}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Updated ${changed} markdown files.`);
}

main();
