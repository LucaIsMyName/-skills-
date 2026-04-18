# Coding style and structure

**Scope:** Applies to **simplicity, readability, naming, and control-flow shape** in application code. Not exhaustive error-handling policy, not test strategy. Pair with [`coding-errors-validation-and-state.md`](coding-errors-validation-and-state.md), [`coding-testing-and-habits.md`](coding-testing-and-habits.md), and [`coding-best-practices.md`](coding-best-practices.md).

## Excerpt
- **Simple beats clever**; prefer loops readers recognise over one-liners.
- **Names carry meaning**; if you need a comment to explain identifiers, rename.
- **One job per function**; flatten nesting with early returns; extract duplication carefully.

## Before editing structure

### Concrete

- Can you **name** the function after what it returns or does?
- Is this the **first** or **third** time you need the abstraction?

### Meta

- If reviewers struggle on first read, simplify before adding features.

---

## Purpose

Keep code **legible and locally coherent** so changes do not become archaeology.

---

## Core Mindset

Good software is:

- **Simple over clever**
- **Readable over short**
- **Correct over fast (initially)**

 You are not just writing code for machines—you are writing code for humans.

---

## 1. Prefer Simplicity

### Rule

Choose the simplest solution that works.

### Bad: prefer simplicity

```ts
const result = arr.reduce((acc, x) => (x % 2 ? [...acc, x * 2] : acc), []);
```

### Good: prefer simplicity

```ts
const result = [];
for (const x of arr) {
  if (x % 2 !== 0) {
    result.push(x * 2);
  }
}
```

 Clever code is harder to debug and maintain.

---

## 2. Readability > Everything

### Rule

Code should be understandable without extra explanation.

### Bad: readability > everything

```ts
const d = new Date();
```

### Good: readability > everything

```ts
const currentDate = new Date();
```

 If you need comments to explain basic code, rename things.

---

## 3. Single Responsibility Principle

### Rule

A function/module should do **one thing well**.

### Bad: single responsibility principle

```ts
function processUser(user) {
  validate(user);
  saveToDB(user);
  sendEmail(user);
}
```

### Good: single responsibility principle

```ts
function processUser(user) {
  validateUser(user);
  saveUser(user);
  notifyUser(user);
}
```

 Small units = easier testing and reuse.

---

## 4. Avoid Deep Nesting

### Rule

Keep control flow flat.

### Bad: avoid deep nesting

```ts
if (user) {
  if (user.active) {
    if (user.role === "admin") {
      // logic
    }
  }
}
```

### Good: avoid deep nesting

```ts
if (!user || !user.active || user.role !== "admin") return;

// logic
```

 Early returns reduce complexity.

---

## 5. Don’t Repeat Yourself (DRY)

### Rule

Avoid duplicating logic.

### Bad: don’t repeat yourself (dry)

```ts
if (user.age > 18) { ... }
if (admin.age > 18) { ... }
```

### Good: don’t repeat yourself (dry)

```ts
function isAdult(person) {
  return person.age > 18;
}
```

 Duplication = bugs waiting to happen.

---

## 6. But Don’t Over-Abstract

### Rule

Don’t generalize too early.

### Bad: but don’t over-abstract

```ts
function handleEntity(entity, type, config, strategy) { ... }
```

### Good: but don’t over-abstract

```ts
function handleUser(user) { ... }
```

 Abstraction should come **after repetition**, not before.

---

## 7. Naming Matters (A Lot)

### Rule

Names should explain intent.

### Bad: naming matters (a lot)

```ts
function calc(x, y) { ... }
```

### Good: naming matters (a lot)

```ts
function calculateTotalPrice(price, tax) { ... }
```

 Good naming reduces need for comments.

---

## Core idea

This page gives practical guidance for coding style and structure in repeatable, team-friendly steps.

## Further reading

- Continue with the related pages linked in the Scope section for deeper examples and adjacent workflows.

---

German version: [`coding-stil-und-struktur.md`](../../de/coding/coding-stil-und-struktur.md)
