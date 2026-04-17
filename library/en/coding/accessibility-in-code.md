# Accessibility in code

**Scope:** Applies to **web UI code** (HTML, CSS, JS/TS, React)—the engineering side of accessibility. Companion to [`accessibility-for-comms.md`](../language-and-communication/accessibility-for-comms.md) (copy, image descriptions, captions) and [`designing-good-interfaces.md`](../design/designing-good-interfaces.md).

## Excerpt (read this first)

- **Semantic HTML first.** Use the element that already does the job; reach for ARIA only when no native element fits.
- **Keyboard access is non-negotiable.** Every interactive element is reachable, operable, and visibly focused with `Tab` / `Shift+Tab` / `Enter` / `Space` / arrow keys where expected.
- **Colour is not the only cue.** Contrast meets WCAG AA; state changes also use text, icon, or shape.
- **Screen-reader users need a logical page.** Landmarks, heading order, link text, form labels, live regions.
- Full rules, patterns, and anti-patterns below.

## AI / prompt: before shipping UI

Before writing or generating UI code, clarify **who will use it and how**. Do not bolt on accessibility at the end.

### Concrete

- Which **element type** fits: button, link, checkbox, disclosure, dialog, listbox, menu?
- Is there a **native** element or an established **ARIA pattern** (WAI-ARIA Authoring Practices)?
- What is the **keyboard path** from page load to task completion?

### Meta

- Accessibility is **correctness**, not decoration.
- Automated tools (axe, Lighthouse) catch ~30–40%. The rest needs keyboard + screen-reader smoke tests.

---

## Purpose

Ship interfaces that **work with a keyboard, a screen reader, at 200% zoom, in reduced motion, with a mouse, and on touch**—without a separate "accessible version".

---

## 1. Start with HTML

- A **button** is `<button>`, not `<div onClick>`.
- A **link** goes somewhere (`<a href>`); a **button** does something.
- Form fields have a **real `<label>`** associated by `for`/`id` or by wrapping.
- Headings in order: `<h1>` once per page/route, then `<h2>`, `<h3>`—no skipping for visual size.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.

### Bad

```html
<div class="btn" onclick="save()">Save</div>
```

### Good

```html
<button type="button" onclick="save()">Save</button>
```

## 2. Keyboard access

- Everything clickable is **tab-reachable**.
- Focus order **follows reading order**—no `tabindex` greater than 0.
- Visible focus ring on every interactive element; `:focus-visible` for pointer users, full ring for keyboard.
- Standard keys work: `Enter` / `Space` activate buttons; arrow keys navigate within composites (menus, tabs, radio groups).
- **Skip link** at the top of the page: "Skip to main content".

## 3. ARIA: last resort, not first

- First rule of ARIA: **don't use ARIA** if a native element would do.
- Second rule: follow an **established pattern**—don't invent. Consult WAI-ARIA Authoring Practices.
- `role="button"` on a `<div>` is three things waiting to go wrong (role, tabindex, key handlers). Use `<button>`.
- `aria-label` overrides the visible text for assistive tech—if you need it, the visible text is probably wrong too.

## 4. Forms

- **Label every input.** Placeholder is not a label.
- **Group** related inputs with `<fieldset>` + `<legend>` (radio groups, address blocks).
- **Error messages** are linked via `aria-describedby`; announce them in a **live region** if they appear asynchronously.
- Validate on blur or submit, not on every keystroke—screen-reader users get flooded otherwise.
- Autocomplete attributes (`autocomplete="email"`, `"name"`, `"postal-code"`) help users and password managers.

## 5. Images, icons, media

- Informational image: real `alt` text describing the content.
- Decorative image: `alt=""` (empty, not missing) and `role="presentation"` when in SVG.
- Icon-only buttons: add an accessible name (`aria-label` or visually hidden text).
- Video: captions for audio content, transcript for long videos, audio description for visual-only information.

## 6. Colour and contrast

- WCAG **AA**: 4.5:1 for body text, 3:1 for large text and UI components.
- Never use colour **alone** to convey state—pair with icon, text, or shape.
- Test at 200% browser zoom; no horizontal scroll, no clipped text.
- Support `prefers-color-scheme` and provide a manual theme override.

## 7. Motion, timing, and layout

- Respect `prefers-reduced-motion`: no auto-playing animations, no parallax, no long non-essential transitions.
- **No content that moves, blinks, or updates** more often than every 5 seconds without a user control.
- **Reflow**: content is usable at 320px width without horizontal scroll.
- **Target size**: interactive controls are at least 24×24 CSS pixels (WCAG 2.2 AA), ideally 44×44.

## 8. Screen-reader friendly dynamic UI

- Live regions: `aria-live="polite"` for non-urgent status, `"assertive"` only for errors.
- Toast messages and loading states go into a live region **once**, not on every keystroke.
- Route changes in SPAs: move focus to the new `<h1>` or a landmark; announce the new page title.
- Dialogs: trap focus inside, return focus to the opener on close, `aria-modal="true"`, labelled by the title.

## 9. Testing, not hoping

- **Keyboard only**: unplug the mouse, drive the whole flow with keys.
- **Screen reader**: VoiceOver (macOS/iOS), NVDA (Windows), TalkBack (Android)—at least one per release.
- **Automated**: axe-core in unit tests, Lighthouse in CI.
- **Zoom**: 200% and 400% reflow.
- **Reduced motion**: toggle OS setting and re-verify.

## 10. What not to do

- Fake buttons out of `<div>` or `<span>`.
- Hide focus outlines without replacing them.
- Use `title` as the only accessible name.
- Put meaningful text inside `background-image`.
- Ship a "mobile version" and a separate "accessible version".

---

## Core idea

An accessible UI is not a separate mode—it is the **only mode**, designed and built from the first component. If a keyboard user or a screen-reader user cannot complete a task, it is a **bug**, not a feature request.

---

German version: [`barrierefreiheit-im-code.md`](../../de/coding/barrierefreiheit-im-code.md)
