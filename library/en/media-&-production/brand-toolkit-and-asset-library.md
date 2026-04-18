# Brand toolkit and asset library

**Scope:** **Centralising** logos, colours, templates, and **approved** imagery—**governance** for small teams. Pair with [`design-tokens-and-theming.md`](../design/design-tokens-and-theming.md), [`tone-of-voice-and-brand-voice.md`](../language-&-communication/tone-of-voice-and-brand-voice.md), and [`file-naming-and-organising.md`](file-naming-and-organising.md).

## Excerpt
- **Single source of truth** for logo **SVG/PNG** variants—**clear space** rules.
- **Colour**: **hex** for screen; **PMS/CMYK** for print—**document** both.
- **Templates** (slides, social) **versioned**—**changelog** when updated.
- **Photo library** with **rights** metadata—**no** mystery downloads.
- **Access**: who can **approve** new assets?

## Before expanding the library

### Concrete

- **Naming** convention and **folder** structure.
- **Licence** fields for stock and **commissions**.

### Meta

- A library nobody can **find** is **worse** than none—**search** and **tags**.

---

## Purpose

Make **consistent** production **easy**—**defaults** beat hero designers every time.

---

## 1. Minimum viable toolkit

### Rule

Ship **logo pack**, **colour tokens**, **2–3 typefaces max**, **slide deck**, and **social templates**—everything else is optional sprawl.

### Bad: minimum viable toolkit

```text
Logos scattered across Slack and email.
```

### Good: minimum viable toolkit

```text
`/brand` drive with README; semantic versions; owner listed; subfolders: logo, colour, type, templates, photography.
```

## 2. Logo variants and clear space

### Rule

Provide **SVG** (screen) and **print-ready** PDF/PNG where needed; **document** minimum clear space and **don’t** on every variant.

### Bad: logo variants and clear space

```text
One raster logo stretched onto a billboard—pixel soup.
```

### Good: logo variants and clear space

```text
logo_full_colour.svg, logo_mono.svg, logo_white_on_dark.png; README: 0.25× cap height clear space; no effects on wordmark.
```

## 3. Colour for screen and print

### Rule

List **hex/RGB** for UI and **PMS/CMYK** for print in the same **swatch file**—teams stop guessing.

### Bad: colour for screen and print

```text
“Use our blue” — five different blues in the wild.
```

### Good: colour for screen and print

```text
tokens.json: primary #1a4d8f; print: PMS 294 C; document black-rich vs pure black for large areas.
```

## 4. Versioned templates with changelog

### Rule

Templates live in **dated or semver** folders; **changelog** when colours or layout rules change—old campaigns stay reproducible.

### Bad: versioned templates with changelog

```text
“slides_v2_final.pptx” replaced silently; last year’s events look wrong.
```

### Good: versioned templates with changelog

```text
/templates/slides/2025-04-01/README.md — v1.2: updated cover; previous v1.1 in /archive.
```

## 5. Photo rights and metadata

### Rule

Every approved image has **licence**, **source**, **expiry**, and **usage** (e.g. web only)—no “pretty picture from Google.”

### Bad: photo rights and metadata

```text
Stock download in a folder without attribution—legal risk.
```

### Good: photo rights and metadata

```text
hero_2025.jpg: rights: Shutterstock ID 123; licence: until 2026; credit line in footer; internal use OK.
```

## 6. Access and approvals

### Rule

Name **who can add** assets and **who** signs off brand exceptions—**read** access wide, **write** access narrow.

### Bad: access and approvals

```text
Anyone uploads to `/brand`; three conflicting logos in one week.
```

### Good: access and approvals

```text
Editors: request via #brand-requests; Comms lead approves; quarterly audit of `/brand`.
```

---

## Common Footguns

- **Orphan** assets—no owner, no one dares delete or update.
- **Deleting** old versions without **archive**—campaigns reopen; files are gone.
- **Undocumented** fonts—new joiner substitutes Arial and breaks brand.
- **Rights** ignored—hero image in a campaign you cannot legally run.

---

## Core idea

Brand is **ops**: **files**, **rights**, **versions**, **owners**.

## Further reading

- [Mozilla — Open Design](https://mozilla.design/) — example public systems thinking
- [W3C — Images of text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) — when text must stay real text
- [The Open Source Design — Brand guidelines](https://opensourcedesign.net/) — community patterns for small teams

---

German version: [`marken-toolkit-und-asset-bibliothek.md`](../../de/medien-&-produktion/marken-toolkit-und-asset-bibliothek.md)
