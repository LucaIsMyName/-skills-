# Library Documentation Maintenance Guide

This guide defines contribution rules for all pages in `library/`.

## Structure Contract

Every page must include:

1. `# Title`
2. Scope line (`**Scope:**` for `en`, `**Geltungsbereich:**` for `de`)
3. Excerpt section (`## Excerpt` / `## Exzerpt`)
4. Purpose section (`## Purpose` / `## Zweck`)
5. Core takeaway section (`## Core idea` / `## Kerngedanke`)
6. Reading section (`## Further reading` / `## Weiterführend`)
7. Exactly one counterpart footer line at the end

## Naming and Taxonomy Rules

- Keep files in `library/{locale}/{chapter}/{slug}.md`.
- Allowed locale roots: `en`, `de`.
- English chapter names:
  - `coding`
  - `design`
  - `language-&-communication`
  - `ethics-&-legal`
  - `ai-&-prompting`
  - `media-&-production`
  - `project-&-operations`
  - `research-&-analysis`
- German chapter names:
  - `coding`
  - `design`
  - `sprache-&-kommunikation`
  - `ethik-&-recht`
  - `ki-&-prompting`
  - `medien-&-produktion`
  - `projekt-&-operationen`
  - `recherche-&-analyse`
- Slugs should be localized for the locale. Keep technical loan words only when industry-standard naming is clearer.
- The former outlier `de/recherche-&-analyse/theory-of-change.md` is standardized as `de/recherche-&-analyse/theorie-des-wandels.md`.

## Style Rules

- No emoji characters in content or headings.
- Replace generic headings (`### Good`, `### Bad`, `### Gut`, `### Schlecht`) with contextual labels.
  - Example: `### Good: Specific wording`
  - Example: `### Schlecht: Unklare Formulierung`
- Keep heading language consistent with locale.
- Use relative links for internal `.md` references and keep them valid.

## Parity Rules

- Every English page has one German counterpart and vice versa.
- Counterpart links must point to existing files.
- EN/DE pages do not need literal translation, but both should cover equivalent practical value and include the same structural sections.

## Review Checklist

- [ ] Footer exists once and points to valid counterpart file.
- [ ] No broken internal `.md` links.
- [ ] No emojis in file.
- [ ] No generic Good/Bad headings without context.
- [ ] Core section exists (`Core idea`/`Kerngedanke`).
- [ ] Reading section exists (`Further reading`/`Weiterführend`).

## Automation Commands

- Normalize docs in bulk:
  - `node scripts/normalize-library-docs.mjs`
- Fill missing core/read sections:
  - `node scripts/fill-missing-library-sections.mjs`
- Validate policy and structure:
  - `node scripts/check-library-docs.mjs`

## Audit Cadence

- Run full docs check before merges touching `library/`.
- Run a full parity + link audit at least once per month.
- After adding any new chapter or slug pattern, update this guide and the check script in the same change.
