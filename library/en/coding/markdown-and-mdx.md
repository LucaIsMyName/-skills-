# Markdown and MDX

## Scope:

Applies to **Markdown and MDX authoring in docs and product content**—headings, links, code blocks, tables, frontmatter, MDX components, accessibility, versioning. Not full LaTeX, not static-site tuning. Pair with [`writing-skill-documentation.md`](../ai-&-prompting/writing-skill-documentation.md), [`accessibility-in-code.md`](accessibility-in-code.md), [`content-design-and-microcopy.md`](../design/content-design-and-microcopy.md), and [`file-naming-and-organising.md`](../media-&-production/file-naming-and-organising.md).

## Excerpt

- **Plain Markdown first**—add MDX components only when they earn their complexity.
- One **H1** per document; then H2 and H3, in order, no skips.
- **Links describe their target**—no "click here".
- **Code blocks** specify the language; **images** have alt text.
- **Frontmatter** is YAML, validated, versioned.
- Rules, examples, and anti-patterns below.

## Before writing

### Concrete

- Is this **plain Markdown** (portable anywhere) or **MDX** (bound to React)?
- Does the project have a **style guide** (this one + [`writing-skill-documentation.md`](../ai-&-prompting/writing-skill-documentation.md))?
- What are the **frontmatter** fields and which are required?
- Where do images and videos live—in the repo or in a CDN?

### Meta

- Markdown is **durable**. MDX couples content to a codebase; use when it pays off.
- Good docs survive migrations because they are **boring**.

---

## Purpose

Author docs and product content that are **readable, accessible, and searchable**—in Git, in review, in IDE previews, and in your docs site.

---

## 1. Structure

- One `# H1` per document, matching the page title.
- `##`, `###`, `####` in order, no skipping.
- **Short sentences, short paragraphs.** Reading on a screen is not reading a novel.
- Use **blank lines** around headings, lists, and code blocks.
- Prefer **lists** for parallel items; **tables** only when you truly have rows and columns.

## 2. Links

- Describe the target in the link text.
- Use **relative paths** for in-repo links.
- Reference external docs with their **canonical URL**.

### Bad: links

```md
Read more [here](https://example.com/guide).
```

### Good: links

```md
See the [Mozilla — HTTP Accept-Encoding guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding).
```

## 3. Code blocks

- Always specify the **language** for syntax highlighting.
- For shell, use `bash` or `sh`; for config, `yaml`, `toml`, `json`.
- Keep blocks focused: one idea, under ~30 lines. Long programs live in a linked file.

### Bad: code blocks

````md
```
const x = 1
```
````

### Good: code blocks

````md
```ts
const user = await db.user.findUniqueOrThrow({ where: { id } });
```
````

## 4. Images and media

- Use meaningful **alt text**; empty alt (`alt=""`) only for purely decorative images.
- Set **width/height** in MDX components to prevent layout shift.
- Prefer `.webp`/`.avif` for photos, `.svg` for diagrams.
- Store large media in a CDN or LFS, not in `main` as raw binaries.

### Good: images and media

```md
![Funnel chart showing 40% conversion on step 1, 18% on step 2](./funnel-q1.webp)
```

## 5. Tables

- Keep them **narrow enough** to read without horizontal scrolling.
- Header row required; align by content type (strings left, numbers right).
- If a table is more than a screenful, consider a list of records or a linked dataset.

```md
| Metric |    Q1 |    Q2 |
| ------ | ----: | ----: |
| LCP    |  2.8s |  2.3s |
| INP    | 210ms | 180ms |
```

## 6. Frontmatter

- **YAML**, between `---` lines at the top.
- **Required**: `title`, `description`, `updated`.
- Optional: `tags`, `authors`, `canonical`, `hidden`.
- **Validate** in CI; broken frontmatter breaks builds.

```yaml
---
title: Prompting basics
description: Writing clear instructions for assistants and editors.
updated: 2025-04-01
tags: [ai, prompting, documentation]
---
```

## 7. MDX components

- Use sparingly; each component is a **coupling** to your app.
- Common good reasons: callouts (`<Note>`), tabs (`<Tabs>`), interactive demos, diagrams.
- Keep components **accessible**—keyboard, focus, ARIA; see [`accessibility-in-code.md`](accessibility-in-code.md).
- Keep props **simple**—a component used in docs by non-engineers needs to be forgiving.

### Good: mdx components

```mdx
<Note>API tokens have a 30-day lifetime. Rotate monthly.</Note>
```

## 8. Callouts, notes, warnings

Conventions that age well:

- **Note** — useful context.
- **Tip** — optional improvement.
- **Warning** — can cause real problems (data loss, security).
- **Deprecated** — was correct, is no longer.

Consistent tone; do not cry "WARNING" for minor stylistic preferences.

## 9. Versioning and changelogs

- Keep a **CHANGELOG.md** for user-facing docs changes, dated.
- Major structure changes get their own PR; avoid mixing with content.
- For API docs, link the doc to the **version** of the API it describes.

## 10. What not to do

- **HTML soup** (`<div>` and inline styles) in Markdown—use MDX if you need it.
- **H1 stacks** (multiple H1s); **H3 before H2**.
- **Smart quotes** that break when copied to a terminal.
- Inline **external scripts** in MDX for "a nicer experience".
- Check in a 20 MB PNG because a CDN felt fancy.

---

## Core idea

Markdown is the **most durable format we have** for written knowledge: readable everywhere, diff-friendly, searchable. Keep it plain, structured, accessible; reach for MDX components only when they add real value you would be unhappy to lose.

## Further reading

- [CommonMark spec](https://commonmark.org/) — canonical Markdown
- [GitHub Flavored Markdown](https://github.github.com/gfm/) — widely used extensions
- [MDX](https://mdxjs.com/) — Markdown + JSX
- [A11Y Project — alt text](https://www.a11yproject.com/posts/alt-text/) — how to write good alt

---

German version: [`markdown-und-mdx.md`](../../de/coding/markdown-und-mdx.md)
