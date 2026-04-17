# Color and contrast

**Scope:** Applies to **choosing and using colour** in UI, web, print, and data graphics—including accessible contrast, semantic colour roles, and theming. Pair with [`design-tokens-and-theming.md`](design-tokens-and-theming.md), [`design-accessibility.md`](design-accessibility.md), and [`data-visualization-basics.md`](data-visualization-basics.md).

## Excerpt (read this first)

- **Semantic roles over hex values.** Name colours by **what they do** (`surface`, `text`, `accent`, `danger`), not by their hue (`blue-500`).
- **Contrast first.** WCAG AA: 4.5:1 for body text, 3:1 for large text and UI components. Check before you fall in love with a palette.
- **Colour is never the only signal.** Pair with icon, text, or shape—colour-blind users and grayscale printers exist.
- **Small palette, wide usage.** Fewer colours used consistently beats a full spectrum used randomly.
- Full rules, palettes, and tooling below.

## AI / prompt: before specifying colour

Before choosing hex values, clarify **roles, environments, and users**.

### Concrete

- **Roles** you need: surface(s), text, muted text, border, accent, info, success, warning, danger.
- **Environments**: light, dark, high-contrast, print, reduced-colour OS.
- **States** on interactive elements: default, hover, focus, active, disabled.
- **Contrast constraints** you must hit (AA baseline, AAA where relevant).
- **Cultural and sector conventions** the audience expects (red/green for finance, warning colours, civic palettes).

### Meta

- If a palette looks great but fails contrast, the design fails—rework.
- Dark mode is not "invert all colours"; it is its own design pass.

---

## Purpose

Build a colour system that is **accessible, consistent, and meaningful**—one that works across themes, print, charts, and screens of varying quality.

---

## 1. Semantic roles

Start with roles, not hues:

| Role | Example use |
|---|---|
| `surface` | page background |
| `surface-muted` | cards, panels |
| `border` | dividers, card edges |
| `text` | primary body text |
| `text-muted` | secondary text, labels |
| `text-inverse` | on dark surfaces |
| `accent` | brand colour / primary action |
| `info` | neutral informational |
| `success` | positive, confirm |
| `warning` | caution, needs attention |
| `danger` | errors, destructive actions |
| `focus` | focus ring |

Store as tokens; see [`design-tokens-and-theming.md`](design-tokens-and-theming.md).

## 2. Build a palette by scale, not by vibe

- Pick a primary hue and generate **9–12 steps** (e.g. 50, 100, 200 … 900).
- Repeat for neutrals (grays) and each semantic colour.
- Keep **even perceptual steps**—use OKLCH or LCH scales rather than naive HSL.

## 3. Contrast

- **AA body text**: 4.5:1 against its background.
- **AA large text** (≥18px bold or 24px regular): 3:1.
- **AA UI components and graphical objects**: 3:1 (input borders, icons, focus indicators).
- **AAA** (7:1 / 4.5:1) for long-form, government, healthcare, complex forms where possible.

Test tools: browser devtools, Stark, Figma plug-ins, `@adobe/leonardo` for programmatic generation, WebAIM contrast checker.

## 4. Never colour alone

- Form error: red border **and** error icon **and** text.
- Chart series: colour **and** pattern/symbol **and** direct label where possible.
- Required field: asterisk **and** "required" label in a tooltip or helper text.

Test your UI in grayscale and with a colour-blindness simulator (deuter-, prot-, trit-anopia).

## 5. Light and dark modes

- **Separate token pairs** per mode: `--surface-light: #fff; --surface-dark: #0b0d10;` referenced by the same role.
- **Contrast recalibrated** for dark mode—pure white on near-black is painful; use off-white (e.g. `#e8e9eb`).
- **Accents** often need to shift: a brand blue readable on white may glow on black—desaturate or lighten.
- **Shadows** are near-invisible in dark mode; use subtle lighter surfaces ("elevation by lightness") instead.

## 6. Brand colour vs. UI colour

- Your brand colour is **one use case**, not the whole UI palette.
- Brand may be too saturated for long-form UI surfaces—use it for accents, buttons, highlights.
- Keep neutrals neutral; resist brand-tinted grays unless the brand demands it.

## 7. Charts and data colour

- Qualitative (categories): up to 8 distinguishable colours; more = repeat patterns or group.
- Sequential (low → high): single hue in a perceptual ramp (Viridis, Cividis, Mako).
- Diverging (below/above baseline): two hues meeting at a neutral midpoint.
- **Colour-blind safe** by default (avoid red/green pairs without backup cue).
- See [`data-visualization-basics.md`](data-visualization-basics.md).

## 8. Print and physical

- **CMYK** gamut is smaller than RGB—many vivid screen colours lose life in print.
- Paper matters: uncoated absorbs ink; colours look darker and softer.
- **Proof** before full print run; check on the actual paper.
- Reserve one or two **spot colours** for brand consistency across runs.

## 9. Tooling and tokens

- Tokens (light/dark/high-contrast) in a single source, generate CSS variables and Tailwind config from them.
- Name tokens **semantically** (`--color-text-muted`), not by hue (`--color-gray-600`).
- Audit: grep the codebase for raw hex values quarterly—they should be rare.

## 10. Common mistakes

- Two blues that are almost the same colour.
- "Accent" colour that is also the "danger" colour.
- Dark mode as `filter: invert()` with no re-tuning.
- Charts using default library palette that is not colour-blind safe.
- Text on a photograph with no scrim or overlay (unreadable at most crops).

---

## Core idea

A good colour system is a **short list of well-defined roles**, each with accessible contrast in every mode, used the same way every time. Beauty follows discipline here, not the other way around.

---

German version: [`farbe-und-kontrast.md`](../../de/design/farbe-und-kontrast.md)
