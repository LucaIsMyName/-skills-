# Coding tests, consistency, and habits

**Scope:** Applies to **testing focus, performance discipline, consistency, comments, and project layout** as code grows. Not CI/CD setup, not QA process. Pair with [`coding-style-and-structure.md`](coding-style-and-structure.md), [`coding-errors-validation-and-state.md`](coding-errors-validation-and-state.md), and [`coding-best-practices.md`](coding-best-practices.md).

## Excerpt
- **Test business rules and edge cases**—not getters and setters.
- **Profile before optimising**; keep style consistent across files.
- **Comments explain why**; structure by feature when the codebase grows.

## Before changing team habits

### Concrete

- Which **risks** deserve a regression test this sprint?
- Does the **folder layout** still match how teams own code?

### Meta

- Consistency is a kindness to the next reader.

---

## Purpose

Ship code that stays **maintainable as the team and product grow**.

---

## 13. Write Tests for Logic

### Rule

Test important logic, not trivial code.

### Focus on:

- business rules
- edge cases
- failure paths

 Tests give confidence to refactor.

---

## 14. Optimize Later

### Rule

Make it work → make it correct → then optimize.

### Bad: optimize later

Premature optimization everywhere

### Good: optimize later

Profile first, then optimize bottlenecks

 Most code doesn’t need optimization.

---

## 15. Consistency Beats Perfection

### Rule

Follow consistent patterns across the codebase.

 Even if something isn’t perfect, consistency:

- improves readability
- reduces cognitive load

---

## 16. Comments: Use Them Wisely

### Rule

Explain **why**, not **what**.

### Bad: comments: use them wisely

```ts
// increment i
i++;
```

### Good: comments: use them wisely

```ts
// workaround for API returning duplicate entries
```

 Code should explain itself; comments explain intent.

---

## 17. Structure by Feature (When Scaling)

### Recommended

```
src/
  modules/
    user/
    auth/
    billing/
  shared/
  utils/
```

 Group related logic together.

---

## 18. Common Footguns Summary

###  Over-engineering

→ Keep it simple

###  Bad naming

→ Be explicit

###  Large functions

→ Split them

###  Hidden side effects

→ Use pure functions

###  Ignoring errors

→ Handle them properly

###  Premature abstraction

→ Wait until needed

---

## Further reading

**Foundations**

- [TechnicalDebt](https://martinfowler.com/bliki/TechnicalDebt.html) — trade-offs and why “quick hacks” compound
- [The practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) — what to test at which layer

**Safety at boundaries**

- [OWASP — Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) — validate and normalize untrusted input

**Immutability (JS/TS)**

- [MDN — Mutable](https://developer.mozilla.org/en-US/docs/Glossary/Mutable) / [Immutable](https://developer.mozilla.org/en-US/docs/Glossary/Immutable) — vocabulary that matches “don’t mutate shared state”

---

## Final Thought

Good code feels:

- obvious
- boring
- easy to change

Bad code feels:

- clever
- confusing
- fragile

 If your code is hard to understand, it’s already a bug waiting to happen.

---

## Core idea

This page gives practical guidance for coding tests, consistency, and habits in repeatable, team-friendly steps.

---

German version: [`coding-tests-und-gewohnheiten.md`](../../de/coding/coding-tests-und-gewohnheiten.md)
