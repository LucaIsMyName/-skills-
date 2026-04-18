# Empty and error states

**Scope:** Applies to **designing non-happy-path screens**—empty lists, no results, loading, errors, permission denials, offline, limits reached. Not exception handling in code beyond UX implications. Pair with [`designing-good-interfaces.md`](designing-good-interfaces.md), [`content-design-and-microcopy.md`](content-design-and-microcopy.md), [`error-handling-and-logging.md`](../coding/error-handling-and-logging.md), and [`accessibility-in-code.md`](../coding/accessibility-in-code.md).

## Excerpt

- **Empty is a feature**, not a missing page—tell users where they are and what to do next.
- **Errors are content**: they need design, copy, and a path forward.
- **Loading** should be **fast, predictable, and informative**—skeletons, not spinners, where possible.
- **Permission denied ≠ not found**: distinguish honestly to help users, carefully to avoid leaking data.
- **Offline** is a state, not a bug—support it where it matters (notes, reading, queued actions).
- Inventory and templates below.

## Before designing states

### Concrete

- For each list/form/page, what are the **realistic states**: zero, few, many, full, loading, error, offline, permission denied, rate-limited?
- What **action** can the user take in each state?
- Which errors are **technical** (retry) vs **semantic** (change input) vs **permission** (sign in, upgrade, ask)?
- Which states need **dedicated copy**?

### Meta

- Happy paths are designed to be impressive; sad paths are designed to be **useful**.
- Users meet sad paths more often than you think—they are your real UX.

---

## Purpose

Make every state of the product **understandable and actionable**—so users are never stuck staring at a blank screen or a generic "something went wrong".

---

## 1. Inventory: name the states

For any screen that fetches or creates data, enumerate states up front.

- **Empty (first use)** — user has never added anything.
- **Empty (cleared)** — user has deleted/filtered everything.
- **Loading** — initial, slow network, retry.
- **Partial** — some data loaded, some errored.
- **Many** — pagination, virtualisation.
- **Full / limit reached** — plan limits, quotas.
- **Error** — 4xx (client), 5xx (server), network.
- **Permission denied** — not signed in, missing scope, plan-restricted.
- **Offline** — cached/queued state.

Design each state. Even "it doesn't happen here" is a decision you make deliberately.

## 2. Empty (first use) — onboard, don't blame

This is where you welcome a new user into a feature.

Components:

- **One-sentence description** of what this area is.
- **A first action** (primary CTA).
- Optional: **illustration or icon**—kind, not cartoonish.
- Optional: **link to help**, kept small.

### Bad

```
No items.
```

### Good

```
Your dashboard is empty. Add your first project to see progress here.

[ Create a project ]
```

## 3. Empty (cleared) — acknowledge the state

Different from first use—user filtered or cleared.

```
No results match "donors 2025".

Try removing a filter or search across all years.
[ Clear filters ]  [ Search all years ]
```

Never say "empty" and stop; say **why** and **what to do**.

## 4. Loading — skeletons over spinners

- **Skeleton screens** (grey placeholders shaped like the real content) feel faster and prevent layout shift.
- Spinners are OK for **short, unknown-duration** operations (<1s).
- **Progress bars** for long, known-duration work (uploads).
- **Micro-copy** for long waits: "Generating report…" beats a silent spinner at 10s.
- **Timeout** to a helpful error, not to an infinite spinner.

See [`performance-and-web-vitals.md`](../coding/performance-and-web-vitals.md) for CLS avoidance.

## 5. Error states — three ingredients

Every error state should include:

1. **What happened** in plain language.
2. **Why**, briefly, if known and useful.
3. **What the user can do** now.

### Bad

```
Error 500. Please try again.
```

### Good

```
We couldn't save your changes because the connection dropped.

Your text is still here. Try again—if this keeps happening,
contact support with reference req_01J8Q...
[ Try again ]  [ Contact support ]
```

For technical errors the user cannot fix: apologise briefly, give a reference id, offer a retry. Do not show stack traces to end users.

## 6. Permission denied vs not found

Distinguish honestly when security allows:

- **Not signed in**: "Sign in to see this project."
- **Signed in but wrong role**: "You don't have access to this project. Ask the owner to share it with you."
- **Plan-restricted**: "Advanced reports are on the Pro plan. Try it free for 14 days."

Never leak the **existence** of private resources. For highly sensitive cases, show a **generic 404** when the user is not allowed.

## 7. Offline

- Cache **read-heavy** screens for offline viewing.
- Queue **writes** and sync when online; show a clear "pending" indicator.
- Disable actions that cannot work offline; explain why in a tooltip or inline note.
- Never silently discard user input when the connection dies.

## 8. Rate limits and quotas

- Tell the user:
  - **What** the limit is.
  - **When** it resets (or "in 3 min").
  - **What to do** now (wait, delete, upgrade).
- Do not return a 429 with "Too many requests" and nothing else.

## 9. Accessibility for states

- Errors announced via **live regions** (`aria-live="polite"` or `assertive` for critical).
- Loading states **announced** ("Loading results") and focus returned appropriately.
- Empty states readable by screen readers—icons/illustrations marked decorative unless meaningful.
- See [`accessibility-in-code.md`](../coding/accessibility-in-code.md).

## 10. What not to do

- Use **the same generic error** for every failure.
- Show a **loading spinner forever** with no timeout.
- Hide empty states because "most users see some data".
- Confuse **permission denied** and **not found** in ways that mislead legitimate users.
- Write copy that **blames the user** ("Invalid input") without saying what is wrong.

---

## Core idea

Empty and error states are **where trust is won or lost**. Every state is a **small conversation**: what is happening, why, and what to do next. Design them as carefully as the happy path—because users meet them more often.

## Further reading

- [Nielsen Norman Group — Empty states](https://www.nngroup.com/articles/empty-state-interface-design/) — patterns and examples
- [UK GOV.UK Design System — Error messages](https://design-system.service.gov.uk/components/error-message/) — pragmatic tested patterns
- [Shopify Polaris — Empty and error states](https://polaris.shopify.com/patterns) — component-level guidance
- [Material Design — Empty states](https://m3.material.io/) — cross-platform norms

---

German version: [`leere-und-fehlerzustaende.md`](../../de/design/leere-und-fehlerzustaende.md)
