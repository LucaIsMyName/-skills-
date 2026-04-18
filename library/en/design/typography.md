# Typography

**Scope:** Applies to **type choices in UI, web, print, and slides**—scale, hierarchy, pairing, numerals, readability. Not full brand authoring (see `brand-guidelines-authoring.md` when added). Pair with [`design-basics.md`](design-basics.md), [`design-tokens-and-theming.md`](design-tokens-and-theming.md), and [`designing-good-interfaces.md`](designing-good-interfaces.md).

## Excerpt 

- **Readability first, style second.** If people have to squint or re-read, the type has already lost.
- **One typeface is plenty**, two is a system, three is a problem.
- **Scale by ratio** (modular scale), not by guess. Six to eight steps usually cover UI + long-form.
- **Measure** (line length) 45–75 characters for body text; **leading** 1.4–1.6 × font size.
- **Numerals matter**: tabular for tables and amounts, proportional for running text.
- Full rules, examples, and pairings below.

## AI / prompt: before choosing type

Before picking or specifying fonts, clarify **where it runs, who reads it, and in what conditions**.

### Concrete

- **Medium**: screen (web, app, TV), print, slides, signage.
- **Audience**: reading level, language(s), age range, assistive tech likely.
- **Languages and scripts**: Latin extended, Cyrillic, Greek, Arabic, CJK?
- **Licence**: web + desktop + app rights, usage scope, seat count.
- **Size range** in actual use (buttons, captions, body, headlines)?

### Meta

- A "beautiful" typeface unreadable at 14px is the wrong typeface.
- Type is an **accessibility** decision, not just an aesthetic one.

---

## Purpose

Choose and configure type so text is **easy to read, clearly structured, and consistent** across channels.

---

## 1. Pick typefaces for the job

- **Body**: humanist sans (Inter, Source Sans, IBM Plex Sans) or a text serif (Source Serif, Charter) depending on tone. Needs excellent small-size rendering.
- **Display / headline**: a typeface with more personality; must also work at body size for consistency fallbacks.
- **Monospace**: for code, tabular figures where proportional won't do, and sometimes metadata (IBM Plex Mono, JetBrains Mono).
- **One family is often enough**—a good superfamily covers display, body, and mono.

## 2. Type scale

Use a **modular scale** with a fixed ratio. Common choices: 1.125 (minor second), 1.2 (minor third), 1.25 (major third).

Example (base 16 px, ratio 1.25):

```
xs   12.8
sm   14.4
md   16   ← body
lg   20
xl   25
2xl  31
3xl  39
4xl  49
5xl  61
```

Round to sensible px/rem values; store as **tokens** (see [`design-tokens-and-theming.md`](design-tokens-and-theming.md)).

## 3. Hierarchy

- **Size + weight + colour + space** together create hierarchy—never just size.
- Heading weights: 600–700 for body sizes; 500–600 for large display (otherwise too heavy).
- Keep body weight 400 (regular); 500 for emphasis when bold is too much.
- No more than **three** weights in a running document.

## 4. Measure and leading

- **Measure** (line length): 45–75 characters for body; shorter (30–50) for captions, longer up to 90 for monospaced or wide layouts.
- **Leading** (line-height): 1.4–1.6 for body; 1.15–1.3 for display; 1.0 for tiny labels.
- **Tracking** (letter-spacing): tighten slightly on large display (−1% to −3%), open up on ALL-CAPS labels (+5% to +10%).
- **Paragraph spacing**: about one leading unit; avoid first-line indent + spaced paragraphs together.

## 5. Alignment and rag

- **Left-aligned** ragged-right is the default for screen; hyphenation off for UI copy.
- **Justified** only where hyphenation is good and measure is wide enough (print, editorial web).
- **Centered** sparingly—titles, short captions; never long body.
- **Avoid orphans and widows** on headlines via `text-wrap: balance` or soft hyphens.

## 6. Numerals

- **Proportional, old-style** for running text where supported (more literary).
- **Tabular, lining** for tables, prices, data, dashboards.
- Enable OpenType features explicitly in CSS (`font-feature-settings: "tnum"`) or `font-variant-numeric: tabular-nums`.

## 7. Pairing two typefaces

- **Contrast or blend**—not both. Pair a serif body with a sans display; or use two sans families with distinct personalities.
- Match **x-height** and **optical size** across the pair.
- Test at the actual sizes you will use (display 48px + body 16px).

## 8. Multilingual and scripts

- Confirm the typeface covers every language you ship; fallback stacks must be similar enough to not shift layout.
- **Diacritics** (ä, č, ñ): test your exact vocabulary; some webfonts drop combining marks.
- **German**: long compounds need reasonable hyphenation (`hyphens: auto` + `lang="de"`).
- **RTL** (Arabic, Hebrew): different baseline heights and leading; do not scale Latin-tuned leading directly.

## 9. Accessibility

- Minimum body size: **16 px** on the web by default (mobile too).
- Avoid **justified text** where hyphenation is poor (rivers hurt dyslexic readers).
- Avoid **all-caps** for long passages; fine for short labels with tracking.
- Ensure **contrast** meets WCAG AA (4.5:1 body, 3:1 large text)—see [`color-and-contrast.md`](color-and-contrast.md).
- Respect user **font-size settings**—use `rem` for scalable text.

## 10. Icons and typography

- Icons share optical alignment with text baselines; use `currentColor` so they inherit text colour.
- Icon sizes in the same scale as text (16, 20, 24 px).
- Add a text label when the meaning is not obvious; never rely on icon alone.

## 11. Print specifics

- Work in points, not pixels; body 9–11pt, headline 16pt+.
- **Minimum leading** 1.2× body in print (tighter than screen).
- **Paper contrast** matters: #333 on paper ≠ #333 on screen—push darker.
- Check at the final **viewing distance**.

## 12. Common mistakes

- **Three or more typefaces** in one document.
- **Tight lines of italic** body text across a full measure—slow to read.
- **All-caps paragraphs** for "emphasis".
- **Tiny 10 px** print on the web for "dense" UIs.
- **Mixed numerals** across a dashboard (proportional + tabular fighting).

---

## Core idea

Great typography is **invisible**—the reader notices the content, not the letters. Pick a readable family, set a calm scale, and let **rhythm and hierarchy** do the work.

## Further reading

- [MDN — CSS styling basics](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text) — readable primers on font properties and layout interactions
- [Microsoft Learn — OpenType specification](https://learn.microsoft.com/en-us/typography/opentype/spec/) — authoritative feature and encoding detail for type engineers
- [W3C WAI — Understanding 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) — minimums that keep body text readable when users override spacing

---

German version: [`typografie.md`](../../de/design/typografie.md)
