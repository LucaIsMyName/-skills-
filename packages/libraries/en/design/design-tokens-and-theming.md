# Design tokens and theming

## Scope:

Applies to **naming and scaling design tokens** (color, space, radius, typography) and **light/dark themes** in digital products; not a full design system governance process or code implementation details (see coding skills for implementation).

## Excerpt

- Use when defining **semantic tokens** (`color.action.primary`) instead of only raw values (`#3366cc`).
- Keep **one source of truth** for spacing and radius scales; document dark-mode mappings alongside light.
- **Ask** for existing token set or design tool export before inventing names.
- Full file below: rules, Bad/Good naming examples, checklist. Cross-reference: [`design-basics.md`](design-basics.md), [`designing-good-interfaces.md`](designing-good-interfaces.md).

## Purpose

This document explains how to structure **tokens and themes** so UI stays **consistent, themeable, and handoff-friendly** between design and engineering.

## completeness before drafting

### Concrete

- **Platform** (web, iOS, Android, multi)
- **Existing token file or Figma variables** (paste or describe)
- **Brand constraints** (fixed palette, contrast requirements)

### Meta

- **Dark mode** required? default theme?
- **Density** (compact vs comfortable) if relevant

---

## Core rules

### 1. Prefer semantic names over raw values

### Bad: core rules

```text
background: #F5F5F5
padding: 13px
```

### Good: core rules

```text
background: color.surface.default
space: space.3   /* e.g. 12px on a 4px grid */
```

---

### 2. Separate “role” from “palette”

Define **semantic roles** (text.primary, border.subtle) mapped to palette entries so themes can swap without renaming components.

---

### 3. Use a constrained scale

Spacing and radius should come from a **small set of steps** (e.g. 4, 8, 12, 16, 24, 32) rather than arbitrary numbers.

### Bad: core rules

```text
margin: 17px; padding: 11px;
```

### Good: core rules

```text
margin: space.4; padding: space.3
```

---

### 4. Dark mode: remap semantics, not only colors

Adjust **elevation, borders, and focus rings** for dark backgrounds—not only background hex codes.

---

### 5. Document the token table

A one-page table: **token name → value → usage** prevents drift between design and code.

---

## Checklist

- [ ] Semantic naming for colors, space, radius, typography roles
- [ ] Light and dark (if applicable) both defined for surface/text/border/focus
- [ ] Spacing and radius on a documented scale
- [ ] No duplicate “almost same” values without a token
- [ ] Linked to component usage notes where helpful

---

## Core idea

Tokens are **contracts**. If the name does not describe **role**, theme switches become painful.

## Further reading

- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) — shared format work and interoperability notes
- [Design Tokens Format (draft)](https://www.designtokens.org/tr/drafts/format/) — emerging file format conventions for tools and code
- [W3C — CSS custom properties](https://www.w3.org/TR/css-variables-1/) — the usual web runtime mapping layer beneath many token pipelines

---

German version: [`design-tokens-und-theming.md`](../../de/design/design-tokens-und-theming.md)
