# Coding best practices

**Scope:** Applies to **general software quality** in application code (any language/framework); not security audits, infrastructure, or operations.

## Excerpt (read this first)

- Use for **maintainability, readability, correctness**—prefer simple designs over clever ones.
- This file is **long**: the sections below add patterns, examples, and anti-patterns in depth.
- Core themes: simplicity, naming, single responsibility, testing mindset, sensible abstractions.
- Full file below: numbered rules with Bad/Good code examples and extended guidance.

## Purpose

This skill explains **how to write high-quality software in any language or framework**, focusing on:

- maintainability
- correctness
- readability
- scalability

The goal: write code that is **easy to understand, safe to change, and hard to break**.

---

## Core Mindset

Good software is:

- **Simple over clever**
- **Readable over short**
- **Correct over fast (initially)**

👉 You are not just writing code for machines—you are writing code for humans.

---

## 1. Prefer Simplicity

### Rule

Choose the simplest solution that works.

### ❌ Bad

```ts
const result = arr.reduce((acc, x) => (x % 2 ? [...acc, x * 2] : acc), []);
```

### ✅ Good

```ts
const result = [];
for (const x of arr) {
  if (x % 2 !== 0) {
    result.push(x * 2);
  }
}
```

👉 Clever code is harder to debug and maintain.

---

## 2. Readability > Everything

### Rule

Code should be understandable without extra explanation.

### ❌ Bad

```ts
const d = new Date();
```

### ✅ Good

```ts
const currentDate = new Date();
```

👉 If you need comments to explain basic code, rename things.

---

## 3. Single Responsibility Principle

### Rule

A function/module should do **one thing well**.

### ❌ Bad

```ts
function processUser(user) {
  validate(user);
  saveToDB(user);
  sendEmail(user);
}
```

### ✅ Good

```ts
function processUser(user) {
  validateUser(user);
  saveUser(user);
  notifyUser(user);
}
```

👉 Small units = easier testing and reuse.

---

## 4. Avoid Deep Nesting

### Rule

Keep control flow flat.

### ❌ Bad

```ts
if (user) {
  if (user.active) {
    if (user.role === "admin") {
      // logic
    }
  }
}
```

### ✅ Good

```ts
if (!user || !user.active || user.role !== "admin") return;

// logic
```

👉 Early returns reduce complexity.

---

## 5. Don’t Repeat Yourself (DRY)

### Rule

Avoid duplicating logic.

### ❌ Bad

```ts
if (user.age > 18) { ... }
if (admin.age > 18) { ... }
```

### ✅ Good

```ts
function isAdult(person) {
  return person.age > 18;
}
```

👉 Duplication = bugs waiting to happen.

---

## 6. But Don’t Over-Abstract

### Rule

Don’t generalize too early.

### ❌ Bad

```ts
function handleEntity(entity, type, config, strategy) { ... }
```

### ✅ Good

```ts
function handleUser(user) { ... }
```

👉 Abstraction should come **after repetition**, not before.

---

## 7. Naming Matters (A Lot)

### Rule

Names should explain intent.

### ❌ Bad

```ts
function calc(x, y) { ... }
```

### ✅ Good

```ts
function calculateTotalPrice(price, tax) { ... }
```

👉 Good naming reduces need for comments.

---

## 8. Functions Should Be Small

### Rule

If a function doesn’t fit on one screen → it’s probably too big.

### Signs it's too large:

- multiple responsibilities
- hard to name
- requires scrolling

👉 Break it into smaller pieces.

---

## 9. Avoid Side Effects

### Rule

Functions should not unexpectedly change external state.

### ❌ Bad

```ts
function addItem(item) {
  cart.push(item);
}
```

### ✅ Good

```ts
function addItem(cart, item) {
  return [...cart, item];
}
```

👉 Pure functions are predictable and testable.

---

## 10. Handle Errors Explicitly

### Rule

Never ignore errors.

### ❌ Bad

```ts
try {
  doSomething();
} catch {}
```

### ✅ Good

```ts
try {
  doSomething();
} catch (error) {
  logError(error);
  throw error;
}
```

👉 Silent failures = nightmare debugging.

---

## 11. Validate Inputs

### Rule

Never trust external data.

### ❌ Bad

```ts
function createUser(user) {
  save(user.name);
}
```

### ✅ Good

```ts
function createUser(user) {
  if (!user?.name) throw new Error("Invalid user");
  save(user.name);
}
```

👉 Validate at boundaries.

---

## 12. Keep Data Flow Predictable

### Rule

Avoid hidden state and magic behavior.

👉 Prefer:

- explicit parameters
- explicit returns

👉 Avoid:

- global variables
- hidden mutations

---

## 13. Write Tests for Logic

### Rule

Test important logic, not trivial code.

### Focus on:

- business rules
- edge cases
- failure paths

👉 Tests give confidence to refactor.

---

## 14. Optimize Later

### Rule

Make it work → make it correct → then optimize.

### ❌ Bad

Premature optimization everywhere

### ✅ Good

Profile first, then optimize bottlenecks

👉 Most code doesn’t need optimization.

---

## 15. Consistency Beats Perfection

### Rule

Follow consistent patterns across the codebase.

👉 Even if something isn’t perfect, consistency:

- improves readability
- reduces cognitive load

---

## 16. Comments: Use Them Wisely

### Rule

Explain **why**, not **what**.

### ❌ Bad

```ts
// increment i
i++;
```

### ✅ Good

```ts
// workaround for API returning duplicate entries
```

👉 Code should explain itself; comments explain intent.

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

👉 Group related logic together.

---

## 18. Common Footguns Summary

### 🚨 Over-engineering

→ Keep it simple

### 🚨 Bad naming

→ Be explicit

### 🚨 Large functions

→ Split them

### 🚨 Hidden side effects

→ Use pure functions

### 🚨 Ignoring errors

→ Handle them properly

### 🚨 Premature abstraction

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

👉 If your code is hard to understand, it’s already a bug waiting to happen.
