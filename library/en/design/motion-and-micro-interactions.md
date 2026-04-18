# Motion and micro-interactions

**Scope:** Applies to **UI motion**: transitions, feedback animations, loading states; not video production, game animation, or brand TV spots.

## Excerpt 

- Use motion to **clarify cause and effect**, not to decorate.
- Respect **`prefers-reduced-motion`**: provide a non-animated equivalent.
- Keep durations **short** (often ~150–300ms for UI); avoid large parallax on task flows.
- Full file below: rules and checklist. See also [`designing-good-interfaces.md`](designing-good-interfaces.md) for feedback patterns.

## Purpose

This document guides **when and how** to use motion in interfaces so it improves usability and does not distract or exclude users.

## AI / prompt: completeness before drafting

### Concrete

- **Platform** (web, native) and **tech constraints** (CSS only, Lottie, etc.)
- **User settings** for reduced motion (assume supported)

### Meta

- **Tone** (calm product vs playful marketing UI)

---

## Core rules

### 1. Purpose first

### ❌ Bad

```text
Everything animates on every hover because it looks “alive.”
```

### ✅ Good

```text
Button press scales slightly to confirm; panel slides in because it opened from a specific control.
```

---

### 2. Prefer opacity and transform

These properties are typically **GPU-friendly** and less jarring than animating layout (`width`, `height`, `top`).

---

### 3. Easing: avoid linear for spatial UI

**Ease-out** for elements entering; **ease-in** for leaving; **ease-in-out** for subtle state changes—tune to taste, but linear motion often feels mechanical.

---

### 4. Reduced motion

Provide **instant state change** or **opacity-only** crossfade when reduced motion is requested.

---

### 5. Loading states

Use **determinate** progress when possible; **skeleton** for content structure; avoid infinite spinners for long tasks without feedback.

---

## Checklist

- [ ] Every animation has a **reason** (feedback, orientation, delight within limits)
- [ ] Durations and easing are **subtle** for frequent actions
- [ ] **Reduced-motion** path defined
- [ ] No essential information **only** conveyed by animation
- [ ] Performance: avoid animating expensive properties on large areas

---

## Final thought

👉 Motion should **answer “what happened?”**—if it only says “look at me,” cut it.

## Further reading

- [MDN — `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — respect user settings for vestibular disorders
- [W3C WAI — Understanding 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) — optional motion thresholds for WCAG
- [MDN — Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) — timing and synchronisation when implementing motion in code
