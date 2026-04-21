# Tailwind CSS guide

## Scope:

**Utility-first styling** with Tailwind in apps (this library assumes **Tailwind v4**-style setup: `@import 'tailwindcss'`, CSS-first config, and `@theme` tokens). Not a substitute for component-library docs or a11y audits—pair with [`accessibility-in-code.md`](accessibility-in-code.md), [`react-best-practices.md`](react-best-practices.md), and design explainers under **Design**.

## Excerpt

- **Prefer tokens over one-off pixels.** Map recurring values to your theme (`@theme`, design tokens) so UI stays consistent.
- **Utilities describe state, not stories.** `hover:`, `focus-visible:`, `disabled:` belong in the same component string when behavior is local.
- **Extract components when repetition hurts**, not on the first duplicate—copy/paste twice can be cheaper than the wrong abstraction.
- **`@apply` sparingly**—great for base layers and shared primitives; poor for mimicking every utility in CSS blocks.
- **Never strip focus** without a visible, keyboard-friendly replacement—pretty UIs that hide focus are broken UIs.
- Full patterns, v4-oriented setup notes, and pitfalls below.

## Purpose

Use this skill to ship **predictable, maintainable Tailwind** in feature code: when to lean on utilities, when to split components, how to keep **responsive and accessible** styles readable, and how to avoid fighting the framework.

---

## Mental model

Tailwind is **design constraints expressed as classes**:

- You pick from a **curated scale** (spacing, type, colour) instead of inventing `margin: 13px` everywhere.
- Layout and state are **explicit in markup**—good for local reasoning; bad if one string grows without structure.

---

## 1. Project setup (v4-oriented)

### Typical entry CSS

```css
@import "tailwindcss";

@theme {
  /* Map your product tokens here — fonts, radii, brand colours */
  --font-sans: system-ui, sans-serif;
}

@layer base {
  body {
    @apply m-0 min-h-screen antialiased;
  }
}
```

### What to align on

- **One source of truth** for fonts, spacing rhythm, and semantic colours (surface, text, border, accent—same language as [`../design/design-tokens-and-theming.md`](../design/design-tokens-and-theming.md)).
- **Content detection**: ensure build tooling scans **all** template files (e.g. `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`) so utilities are not dropped in production.

---

## 2. Utilities vs components

### Prefer utilities when

- Layout is **simple** (flex/grid, padding, gap).
- State is **local** to one element.
- You need **speed** and the markup stays scannable.

### Reach for a component (function or partial) when

- The **same 15+ classes** appear in multiple places _with the same meaning_ (“primary button”, “card shell”).
- You need **props** for variants that would otherwise be string interpolation soup.
- Tests or Storybook need a **named building block**.

### Anti-pattern

- **Premature wrappers** for every div “in case we theme it later.” Wrap when duplication carries **semantic** weight, not cosmetic noise.

---

## 3. Responsive and containers

- **Mobile-first:** unprefixed classes = base layout; `sm:`, `md:`, `lg:` add complexity upward.
- **Don’t mirror breakpoints everywhere**—if only the grid changes, scope `md:` to the grid container.
- Prefer **max-width + horizontal padding** on readable text (`max-w-prose`, page gutters) over full-bleed paragraphs on large screens.

---

## 4. Interactive and focus states

- **Hover is not mobile.** Pair `hover:` with touch-safe targets; don’t rely on hover alone to reveal actions (see Design explainers on touch targets).
- **Use `focus-visible:`** for keyboard focus rings—not `focus:` on everything if it flashes on mouse click in the browser.
- **Disabled:** combine `disabled:` styles with actually disabling the control—`pointer-events-none` without `disabled` is a trap.

---

## 5. Colour and contrast

- Use **semantic combos** from your palette—`text-zinc-600` on `bg-zinc-50` is a relationship, not two independent choices.
- Avoid **only colour** for meaning (pair with icon/text); aligns with [`../design/color-and-contrast.md`](../design/color-and-contrast.md).
- Test **dark mode** if you ship it: `:dark` or `dark:` variants should be planned, not inverted on a whim.

---

## 6. Arbitrary values and one-offs

- **`w-[472px]`** and **`bg-[#1a1a1a]`** are escape hatches—fine for prototypes or true one-offs.
- If a value appears **twice**, promote it to **`@theme`** or a named class—arbitrary spam makes refactors painful.
- **Arbitrary variants** (`[&_svg]:`, `group-data-[…]:`) are powerful; add a **comment** above the JSX when the selector is non-obvious.

---

## 7. `@apply`: where it helps, where it hurts

### Good fits

- **Base layer** defaults (`body`, `a` under `@layer base`).
- **Small primitives** reused identically (`btn-reset`, focus outline shared across custom controls).

### Poor fits

- Rebuilding **half of Tailwind** in a `.css` file with long `@apply` chains—harder to read than utilities in the component.
- **Component-specific** styling that never leaves one file—keep it inline.

---

## 8. Readability in JSX / templates

- **Sort classes** consistently (use the official Prettier plugin or team convention: layout → box → typography → visuals → states).
- **Break long class strings** with small helpers or `clsx`/`cn` **only when** conditional logic is real—don’t import utilities for static strings.
- **Name the intent** in the component or a `data-testid` when behaviour matters; class names alone rarely explain _why_.

---

## 9. Accessibility checklist (Tailwind-specific)

- Visible **focus** for keyboard users (`outline`, `ring`, `ring-offset`).
- **Motion:** respect `prefers-reduced-motion` for large transitions (`motion-safe:` / `motion-reduce:` or plain CSS under `@layer`).
- **Semantics first:** utilities don’t fix wrong HTML—buttons stay `<button>`, landmarks stay landmarks.

---

## 10. Common mistakes

| Mistake                       | Why it hurts                                                     |
| ----------------------------- | ---------------------------------------------------------------- |
| Giant unmaintainable strings  | Hard to review; easy to miss a breakpoint.                       |
| Fighting the scale            | Random pixels break rhythm and design-system alignment.          |
| Hiding focus “for aesthetics” | Illegal usability failure for keyboard and assistive tech users. |
| Duplicating “card” five ways  | Drifts visually; consolidate or use a shared primitive.          |
| Ignoring build content paths  | Missing classes in production = broken layout.                   |

---

## Completeness before shipping UI

Validate in **real content**, multiple breakpoints, and keyboard—Tailwind makes iterating fast; that speed should not skip **contrast and focus** checks.

---

## Meta

- Tailwind versions evolve: prefer **official docs** for API details; this skill encodes **team judgement**—when to abstract, when to stay utility-first, and how to stay aligned with accessibility and design tokens.

---

## Core idea

This page gives practical guidance for tailwind css guide in repeatable, team-friendly steps.

## Further reading

- Continue with the related pages linked in the Scope section for deeper examples and adjacent workflows.

---

German version: [`tailwind-guide.md`](../../de/coding/tailwind-guide.md)
