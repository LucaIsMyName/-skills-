# Design accessibility

**Scope:** Applies to the **design side of accessibility**—layout, typography, colour, motion, affordances, and patterns. Companion to [`accessibility-in-code.md`](../coding/accessibility-in-code.md) (engineering) and [`accessibility-for-comms.md`](../language-and-communication/accessibility-for-comms.md) (copy). Pair with [`color-and-contrast.md`](color-and-contrast.md), [`typography.md`](typography.md), [`motion-and-micro-interactions.md`](motion-and-micro-interactions.md).

## Excerpt 

- **Accessibility is design**, not a later pass. If the design fails at zoom, in reduced motion, or with a keyboard, the design is wrong.
- **Target sizes** ≥24×24 CSS px (WCAG 2.2), ideally ≥44×44. Hit zones larger than visuals.
- **Contrast** meets at least AA (4.5:1 body, 3:1 large/UI). See [`color-and-contrast.md`](color-and-contrast.md).
- **Don't rely on colour, motion, or sound alone**—every signal has a text/shape/icon backup.
- **Reflow, zoom, reduced motion, high contrast**—design for each mode, don't just handle fallback.
- Full rules, patterns, and red flags below.

## AI / prompt: before mocking a screen

Before designing a UI, clarify **who needs to use it** and **under what conditions**.

### Concrete

- **Tasks**: what does the user need to complete; what is the critical path?
- **Assistive tech** likely: screen reader, voice control, switch device, screen magnifier?
- **Device range**: phone, tablet, desktop, TV, kiosk?
- **Conditions**: bright sunlight, noisy environment, one-handed, cognitive load?
- **Languages** and reading level of the target audience?

### Meta

- Accessible design **often looks and feels better** for everyone. "Simpler, clearer, larger" is not niche.
- A single pattern used consistently beats ten bespoke solutions.

---

## Purpose

Design interfaces that **work for the widest range of people from the start**—not an "accessible version" bolted on at the end.

---

## 1. Layout and structure

- Clear **visual hierarchy**: one primary action per screen; size, weight, colour together show importance.
- **Generous spacing** between interactive elements (8 px minimum gap).
- **Reading order** matches visual order—left to right, top to bottom in LTR scripts.
- **Landmarks** (header, nav, main, footer) are visually distinct, not just coded.
- **Consistency**: the same action looks the same across the product.

## 2. Target size and spacing

- Touch targets: **≥44×44 px** recommended (iOS HIG and Material guidance), **≥24×24 px** minimum per WCAG 2.2.
- Click/tap **padding** is often bigger than the visual—extend hit areas.
- Avoid **closely packed** destructive + benign actions (delete next to save).

## 3. Colour and contrast

- See [`color-and-contrast.md`](color-and-contrast.md). Meet WCAG AA minimum; aim AAA where practical.
- **Dark mode** is not inverted light mode; re-tune.
- **High-contrast mode**: respect OS setting; do not override.
- Never use colour as the **only** signal.

## 4. Typography

- **Body 16 px or larger** on the web; `rem` for scalability.
- **Measure** 45–75 characters per line for body.
- **Avoid justified text** where hyphenation is poor.
- **Minimum font weight** 400 on light backgrounds; hairlines fail at size and distance.
- See [`typography.md`](typography.md).

## 5. Focus and keyboard

- **Visible focus ring** on every interactive element—never `outline: none` without a replacement.
- Focus ring has **3:1 contrast** against both the element and the background.
- **Logical tab order** follows reading order.
- Designs include **focus states** in the Figma/specs, not just hover.

## 6. Icons and imagery

- Icon-only buttons have an **accessible name** (tooltip visible on hover/focus, plus programmatic label).
- Pair icon with text for primary actions.
- Decorative images marked as such; informational images need real alternative text.
- Avoid dense infographics with no text equivalent; see [`accessibility-for-comms.md`](../language-and-communication/accessibility-for-comms.md).

## 7. Motion and animation

- Respect `prefers-reduced-motion`—replace with a fade or static state, not removal-that-breaks.
- No auto-playing video with sound; no blinking content.
- **Essential motion** only (feedback, state transitions); no parallax or long decorative motion on content pages.
- See [`motion-and-micro-interactions.md`](motion-and-micro-interactions.md).

## 8. Forms

- **Labels always visible**, not only as placeholder.
- **Errors** shown inline near the field, with icon and clear language.
- **Required** marked explicitly (word or asterisk + legend).
- **Grouping** with fieldset/legend in mocks so engineering can mirror it.
- See [`forms-and-input-ux.md`](forms-and-input-ux.md).

## 9. Content patterns

- **Plain language** in mocks—placeholder copy matters (see [`easy-read-english.md`](../language-and-communication/easy-read-english.md)).
- **Empty states** include action and orientation, not just an illustration.
- **Loading states** communicate progress; skeletons over spinners for known shapes.
- **Error states** name what happened and a way forward.

## 10. Zoom, reflow, and small screens

- Content works at **320 px width** without horizontal scroll.
- **200% zoom** without clipping; **400% reflow** for WCAG 1.4.10.
- Fixed headers should shrink or hide on scroll—not eat the screen.
- Avoid relying on hover—touch, keyboard, and assistive tech users have no hover.

## 11. Language and localisation in design

- Text expands 20–40% in German vs. English; leave room.
- **RTL** designs mirror layout, not just flip text.
- Use **ICU message** placeholders in mocks, not hard-coded plurals.
- Date/number formats localised.

## 12. Red flags in design review

- Thin gray text on white for "minimalism".
- Primary action button indistinguishable from secondary.
- Tooltip-only labels for icons.
- Focus state missing entirely in the design file.
- Tables with colour-only category encoding.
- A modal with no close button visible to keyboard users.

---

## Core idea

Accessible design is **the first pass, not the last**. Aim for "works for more people", not "works for most and has a workaround"—and your product will be easier to use for everyone.

## Further reading

- [W3C WAI — WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) — shared definitions for perceivable, operable, understandable, robust
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/) — people-first heuristics that pair well with WCAG checks
- [W3C WAI — Tutorials](https://www.w3.org/WAI/tutorials/) — page regions, images, tables, forms, and more at a practical level

---

German version: [`barrierefreies-design.md`](../../de/design/barrierefreies-design.md)
