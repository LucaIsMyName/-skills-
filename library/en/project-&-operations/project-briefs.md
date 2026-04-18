# Project briefs

**Scope:** A **one-page** alignment doc for a project—goals, scope, constraints, owners. Not a full business case. Pair with [`creative-briefs.md`](creative-briefs.md), [`prioritisation-basics.md`](prioritisation-basics.md), and [`status-updates-and-reporting.md`](status-updates-and-reporting.md).

## Excerpt
- **Problem** and **success** in plain language—**measurable** where possible.
- **In scope / out of scope**—prevents late creep.
- **Owner** (DRI), **sponsor**, **stakeholders**.
- **Timeline** with **milestones**, not fantasy Gantt.
- **Risks** and **dependencies** named early.

## Before writing the brief

### Concrete

- **Deadline** and **non-negotiables** (brand, legal, accessibility).
- **Resources** (people, budget).

### Meta

- If the brief is vague, the project will be **politics** in a trench coat.

---

## Purpose

Create **shared reality** before work spreads—**fewer** surprises, **clearer** decisions.

---

## 1. Problem and success in plain language

### Rule

State **what is wrong today** and **what would count as success**—numbers or observable outcomes beat adjectives.

### Bad: problem and success in plain language

```text
Make the website better ASAP.
```

### Good: problem and success in plain language

```text
Problem: Volunteer signup abandon rate ~40% on mobile.
Success: Completed signups +20% in Q3 vs Q2 baseline; form errors <5%.
```

## 2. In scope and out of scope

### Rule

List **deliverables you will do** and **explicit exclusions** so scope creep has to be a conscious change.

### Bad: in scope and out of scope

```text
Improve volunteer journey end-to-end.
```

### Good: in scope and out of scope

```text
In scope: signup flow, confirmation email, help text.
Out of scope: CRM migration, rebrand, new CMS.
```

## 3. Owners, sponsor, stakeholders

### Rule

Name a **DRI** for delivery, a **sponsor** with authority, and **stakeholders** who must align—not “the team”.

### Bad: owners, sponsor, stakeholders

```text
Owner: everyone. Sponsor: TBD.
```

### Good: owners, sponsor, stakeholders

```text
DRI: Alex (delivery). Sponsor: Sam (budget/sign-off).
Stakeholders: Legal (disclaimers), Comms (tone).
```

## 4. Timeline with milestones, not fantasy

### Rule

Use **few milestones** tied to **reviewable outputs**—avoid detailed Gantt fiction early.

### Bad: timeline with milestones, not fantasy

```text
Gantt with 47 tasks all green until week 8.
```

### Good: timeline with milestones, not fantasy

```text
M1 (May 15): Flow prototype in staging. M2 (Jun 1): UAT with 5 volunteers. M3 (Jun 20): Launch.
```

## 5. Risks and dependencies early

### Rule

Call out **what could block you** and **what you depend on** from other teams or systems.

### Bad: risks and dependencies early

```text
Risks: none. Dependencies: we’ll figure it out.
```

### Good: risks and dependencies early

```text
Risk: API rate limits during campaign. Dependency: IT enables SSO test env by Apr 30.
```

## 6. Non-negotiables and resources

### Rule

Surface **brand, legal, accessibility, and budget** constraints up front—hiding them does not make them go away.

### Bad: non-negotiables and resources

```text
We’ll stay on brand. Budget flexible.
```

### Good: non-negotiables and resources

```text
Non-negotiables: WCAG 2.2 AA; charity commission wording on donate page.
Resources: 0.5 FTE dev 12 weeks; £2k user testing.
```

---

## Common Footguns

- **Success** defined only as “launch”—no metric, so nobody knows if the project worked.
- **Scope** grows via Slack—every “small ask” without updating the brief.
- **Hidden** political constraints (e.g. board promise) surfaced only at go-live.
- **No decision rights**—multiple bosses can veto without a named tie-breaker.

---

## Core idea

A brief is a **contract for clarity**—**intent**, **limits**, and **who decides**.

## Further reading

- [Atlassian — Project charter](https://www.atlassian.com/work-management/project-management/project-charter) — framing
- [GOV.UK — Writing a project brief](https://www.gov.uk/guidance/writing-a-project-brief) — plain structure
- [NN/g — Prioritizing UX](https://www.nngroup.com/articles/prioritization-ux/) — why clarity before build matters

---

German version: [`projektbriefs.md`](../../de/projekt-&-operationen/projektbriefs.md)
