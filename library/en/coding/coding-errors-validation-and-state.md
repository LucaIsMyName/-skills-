# Coding errors, validation, and predictable state

**Scope:** Applies to **function size, purity, errors, validation, and data flow** in application code. Not logging/observability runbooks, not API security design. Pair with [`coding-style-and-structure.md`](coding-style-and-structure.md), [`coding-testing-and-habits.md`](coding-testing-and-habits.md), and [`coding-best-practices.md`](coding-best-practices.md).

## Excerpt

- **Small functions** with testable boundaries.
- **Avoid silent mutation**; prefer explicit inputs/outputs.
- **Never swallow errors**; validate untrusted input at the edge.

## Before tightening boundaries

### Concrete

- Which inputs are **trusted** vs **external**?
- Where should validation **fail fast**?

### Meta

- Predictable data flow beats “clever” globals.

---

## Purpose

Make behaviour **honest at the edges** so failures are visible and fixable.

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

German version: [`coding-fehler-validierung-und-state.md`](../../de/coding/coding-fehler-validierung-und-state.md)
