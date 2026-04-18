# Prioritisation basics

**Scope:** **Choosing** what to do next—impact/effort, RICE-style thinking, MoSCoW—without dogma. Not OKR coaching. Pair with [`project-briefs.md`](project-briefs.md), [`status-updates-and-reporting.md`](status-updates-and-reporting.md), and [`retrospectives.md`](retrospectives.md).

## Excerpt
- **Frame** the goal—priorities without a goal are **politics**.
- **Impact** and **confidence**—evidence beats seniority.
- **Cost** includes **maintenance** and **support**, not only build.
- **Small** slices—**ship** to learn.
- **Say no** in writing—**trade-offs** explicit.

## Before prioritising

### Concrete

- **Capacity** this cycle; **dependencies**.
- **Risks** if we defer an item.

### Meta

- If everything is P0, **nothing** is P0.

---

## Purpose

Spend limited attention on **highest learning or impact per cost**—**transparently**.

---

## 1. Frame the goal first

### Rule

Write the **outcome** you are optimising for this cycle—priorities without that become **who shouts loudest**.

### Bad: frame the goal first

```text
Prioritise the backlog alphabetically / by who escalated last.
```

### Good: frame the goal first

```text
Goal this quarter: reduce volunteer no-shows by 15%. Only items that plausibly move that metric get top slots.
```

## 2. Impact and confidence

### Rule

Prefer **evidence** (usage, support tickets, research) over **seniority** when scoring impact; note **confidence** explicitly.

### Bad: impact and confidence

```text
The CEO wants feature X, so it’s P0.
```

### Good: impact and confidence

```text
Impact 4/5 (500 users/month affected); confidence 3/5 (one survey). Discuss ties with data, not job title.
```

## 3. Effort and total cost of ownership

### Rule

**Cost** includes build, **maintenance**, **support**, and **coordination**—not just dev days.

### Bad: effort and total cost of ownership

```text
“Small” feature—only 3 dev days (ignores 2 years of support and docs).
```

### Good: effort and total cost of ownership

```text
Build: 3 days. TCO: ongoing moderation + training volunteers—add 0.2 FTE equivalent; score effort as high.
```

## 4. Small slices—ship to learn

### Rule

Split work so you can **release and measure**—avoid big-bang bets without learning milestones.

### Bad: small slices—ship to learn

```text
Full rebuild before any user sees anything—9 months.
```

### Good: small slices—ship to learn

```text
Slice 1: SMS reminder only to evening shift. Measure no-show delta for 4 weeks, then expand.
```

## 5. Say no in writing with trade-offs

### Rule

Record **what you are not doing** and **why**—so the backlog does not become a graveyard of implied promises.

### Bad: say no in writing with trade-offs

```text
“We’ll get to it next sprint” (repeated for 6 months).
```

### Good: say no in writing with trade-offs

```text
Deferred: multi-language site. Reason: capacity; revisit Q4. Logged in prioritisation notes 2025-04-18.
```

## 6. Map dependencies before final order

### Rule

**Dependency chains** on the wall (or doc)—hidden blockers make fake priorities.

### Bad: map dependencies before final order

```text
Priority 1: Launch campaign. Priority 2: Fix DNS. (Campaign needs DNS first.)
```

### Good: map dependencies before final order

```text
Order: (1) DNS + SSL, (2) landing page, (3) campaign assets—dependencies drawn before locking the list.
```

---

## Common Footguns

- **Everything P0**—no sequencing, so teams context-switch and ship nothing finished.
- **HiPPO** (highest paid person’s opinion) as the only signal—no room for user evidence.
- **Ignoring** maintenance—shipping features that collapse under support load next quarter.
- **Silent** deferrals—stakeholders assume “later” means “soon”.

---

## Core idea

Prioritisation is **saying no with reasons**—**shared** criteria beat hidden preferences.

## Further reading

- [Intercom — RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) — one framework among many
- [Atlassian — Prioritization frameworks](https://www.atlassian.com/agile/project-management/prioritization-frameworks) — MoSCoW and alternatives in context
- [NN/g — Prioritizing UX](https://www.nngroup.com/articles/prioritization-ux/) — impact vs user value

---

German version: [`priorisierung-grundlagen.md`](../../de/projekt-&-operationen/priorisierung-grundlagen.md)
