# Good and bad UI concepts (ASCII patterns)

**Scope:** Quick **visual and spatial patterns** that separate supportive UI from confusing UI—useful for handoffs, reviews, and for tools that need a **literal sketch** of design intent. Pair with [`designing-good-interfaces.md`](designing-good-interfaces.md), [`design-basics.md`](design-basics.md), and [`forms-and-input-ux.md`](forms-and-input-ux.md).

## Excerpt
- **One primary action per screen.** Make the happy path obvious; demote or hide destructive alternatives.
- **Hierarchy beats decoration.** Title → summary → detail; not three competing “hero” blocks.
- **Whitespace is structure.** Padding groups related things; crowding implies relationship where there is none.
- **Labels stay visible.** Placeholder-as-label fails as soon as the field has focus or a value.
- **Errors belong next to thecause.** A banner alone forces a memory game; inline beats vague.
- The ASCII blocks below encode **intent** for humans and for models that read layout as text.

## Purpose

Give **scannable before/after** diagrams so reviewers (and AI) can see **what “good” means** in layout, spacing, and emphasis—without opening a design tool.

---

## 1. Visual hierarchy (title vs body)

**Good — clear levels**

```
┌──────────────────────────────────────────┐
│                                          │
│   Checkout                               │  ← one dominant title
│                                          │
│   Review your order before paying.       │  ← short supporting line
│                                          │
│   ───────────────────────────────────    │
│   Items                          $42.00  │  ← scan-friendly rows
│   Shipping                        $5.00  │
│                                          │
│             [ Continue to payment ]      │  ← single primary CTA
│                                          │
└──────────────────────────────────────────┘
```

**Bad — everything shouts**

```
┌──────────────────────────────────────────┐
│ CHECKOUT pay now *** BUY *** step 3 of 7 │
│ Fine print Terms Privacy Ads Cookie OK?? │  ← no clear focal point
│ $42 $5 TOTAL maybe tax????               │
│  [ Back ]  [ Maybe ]  [ GO!!! ]  [ X ]   │  ← competing actions
└──────────────────────────────────────────┘
```

**Intent:** One visual “anchor,” then supporting lines; one primary action.

---

## 2. Whitespace and grouping

**Good — related things cluster**

```
┌──────────────────────────────────────────┐
│  Profile                                 │
│                                          │
│    Name        ┌──────────────────┐      │
│                │ Ada Lovelace     │      │
│                └──────────────────┘      │
│                                          │
│    Email       ┌──────────────────┐      │
│                │ ada@example.com  │      │
│                └──────────────────┘      │
│                                          │
│              [ Save changes ]            │
│                                          │
└──────────────────────────────────────────┘
```

**Bad — cramped ambiguity**

```
┌──────────────────────────────────────────┐
│Profile Name┌────────────┐Email┌────────┐ │
│            │Ada         │    │ada@...  │ │
│            └────────────┘    └─────────┘ │
│       [Save][Cancel][??][Export][Help]   │
└──────────────────────────────────────────┘
```

**Intent:** Vertical rhythm separates fields; horizontal breathing room avoids accidental reading order mistakes.

---

## 3. Touch targets and hit areas (mobile)

**Good — generous target**

```
        ┌─────────────────────┐
        │                     │
        │       Submit        │   ← tall enough to tap reliably
        │                     │
        └─────────────────────┘
```

**Bad — fingertip-unfriendly**

```
        ┌────┐
        │ OK │   ← tiny; easy to miss / mis-tap neighbours
        └────┘
```

**Intent:** Interactive affordances match real thumb reach and error tolerance (also aligns with WCAG target-size guidance).

---

## 4. Form labels (visible vs placeholder-only)

**Good — label persists**

```
  Work email

  ┌────────────────────────────────────┐
  │ you@company.org                    │
  └────────────────────────────────────┘
```

**Bad — label disappears**

```
  ┌────────────────────────────────────┐
  │ Work email                         │  ← looks like a label…
  └────────────────────────────────────┘     …until typed; then context vanishes
```

**Intent:** Always show **what** the field is for, even when filled or focused.

---

## 5. Inline validation and errors

**Good — error next to field**

```
  Password

  ┌────────────────────────────────────┐
  │ short                              │
  └────────────────────────────────────┘
  ! Use at least 12 characters.
```

**Bad — only a global toast**

```
  ┌────────────────────────────────────┐
  │ short                              │
  └────────────────────────────────────┘

         (Toast: "Something went wrong")   ← user hunts for which field
```

**Intent:** Connect **cause** and **fix** in one glance.

---

## 6. Primary vs secondary actions

**Good — hierarchy of buttons**

```
                    ┌───────────────────┐
                    │    Place order    │  ← filled / primary
                    └───────────────────┘

                         Keep shopping      ← text / secondary link
```

**Bad — symmetrical competition**

```
     ┌───────────────┐    ┌──────────────┐
     │  Place order  │    │  Cancel      │  ← same weight; wrong path easy to hit
     └───────────────┘    └──────────────┘
```

**Intent:** Reduce catastrophic mis-taps and decision fatigue.

---

## 7. Navigation affordance

**Good — “you are here”**

```
  Library

    Design   ○ current section
    Coding
    Research
```

**Bad — flat list, no state**

```
  Library Design Coding Research    ← which page am I on?
```

**Intent:** Orientation beats discovery-only chrome.

---

## 8. Information density (dashboard tiles)

**Good — scannable cards**

```
 ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
 │ Revenue     │  │ Errors      │  │ Latency p95 │
 │             │  │             │  │             │
 │   $120k     │  │   3 open    │  │   240 ms    │
 │   ▲ 4%      │  │   stable    │  │   within SLO│
 └─────────────┘  └─────────────┘  └─────────────┘
```

**Bad — wallpaper of numbers**

```
 $120,402.38 ERR03 240ms 4% 99.2% ??? FT @queue #7 !!
```

**Intent:** Chunk metrics; one metric role per tile; trend vs raw noise.

---

## How to use this doc in reviews

- **Paste** the relevant ASCII pair into tickets, PRs, or prompts when you want **layout intent** without pixels.
- **Extend** with your product’s patterns (tables, wizards, sidebars)—keep the **good: structure / bad: noise** split.
- **Accessibility:** ASCII is not a substitute for contrast checks or focus order—pair with [`design-accessibility.md`](design-accessibility.md).

---

## Completeness before shipping patterns

Apply the same discipline as other explainers: patterns here are **defaults**, not exceptions—validate in context, user test, and measure.

---

## Meta

- If “bad” looks tempting (busy banners, loud gradients), users will feel the same fatigue—simplify.
- Models that read this file benefit from **explicit labels** (“Good”, “Bad”) and **fixed-width boxes**—keep diagrams monospaced in editors.

---

## Core idea

This page gives practical guidance for good and bad ui concepts (ascii patterns) in repeatable, team-friendly steps.

## Further reading

- Continue with the related pages linked in the Scope section for deeper examples and adjacent workflows.

---

German version: [`gute-und-schlechte-ui-konzepte.md`](../../de/design/gute-und-schlechte-ui-konzepte.md)
