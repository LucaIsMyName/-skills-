# Testing strategy

**Scope:** Applies to **application-level testing** across unit, integration, and end-to-end layers; not load or security testing, not QA process design. Pair with [`coding-best-practices.md`](coding-best-practices.md) and [`react-best-practices.md`](react-best-practices.md).

## Excerpt
- Tests exist to let you **change code without fear**—they are a safety net, not a badge.
- Pyramid-ish: **many unit, fewer integration, few E2E**. The right ratio depends on what actually breaks in production.
- **Test behaviour, not implementation.** If a refactor breaks the test without breaking the user, the test was wrong.
- **Coverage is a signal, not a target.** 90% of trivial code and 0% of the risky path is worse than 60% evenly spread.
- Full rules, patterns, and anti-patterns are below.

## Before writing tests

Before adding tests, clarify **what the code is for** and **how it can fail**. Do not ship tests that only re-state the implementation.

### Concrete

- What is the **behaviour** under test—described in plain language?
- Which **inputs** matter: happy path, edge, error, boundary, concurrency?
- Is there a **real dependency** (DB, clock, network) we should fake, stub, or leave real?

### Meta

- A good test **fails for one reason**. If a failure message is ambiguous, the test is too broad.
- Tests are code too—**readability matters** more than DRY.

---

## Purpose

Build a test suite that **catches regressions**, **documents behaviour**, and stays **fast enough to run on every change**.

---

## 1. The three layers

### Unit tests

- A single module, no I/O, no wall-clock.
- **Many**, **fast** (milliseconds), run on every save.
- Great for pure logic, formatting, parsing, reducers, pricing rules.

### Integration tests

- Two or more modules wired together—often with a real DB, real router, real file system in a temp dir.
- **Fewer**, **slower** (seconds).
- Great for API handlers, data-access, queue consumers.

### End-to-end (E2E) tests

- Real or near-real stack, driven through the public surface (HTTP, browser).
- **Few**, **slowest** (tens of seconds to minutes).
- Great for critical user journeys (sign-up, checkout, publish).

## 2. What to mock, what to keep real

- **Keep real:** pure functions, in-memory data structures, your own code.
- **Mock sparingly:** network calls, third-party SDKs, wall-clock time, randomness.
- **Never mock** the thing you are testing. If the test file imports the SUT and then stubs most of it, rewrite the test.
- Prefer **fakes** (in-memory implementations) over **mocks** (call-pattern assertions).

## 3. Test behaviour, not implementation

### Bad: test behaviour, not implementation

```ts
expect(service._buildInternalQuery).toHaveBeenCalledWith(...);
```

### Good: test behaviour, not implementation

```ts
const result = service.search("tax relief");
expect(result.map((x) => x.id)).toEqual(["a1", "b2"]);
```

When you refactor `_buildInternalQuery`, the second test still passes; the first one breaks.

## 4. Names describe behaviour

- `it("returns an empty list when no items match")` — good.
- `it("works")`, `it("handles edge case")` — useless on failure.
- A test title + failure message should tell you **what broke** without opening the file.

## 5. Arrange–Act–Assert

```ts
// Arrange
const cart = newCart([{ sku: "A", qty: 2 }]);

// Act
const total = cart.total();

// Assert
expect(total).toBe(1998);
```

Three blocks, separated by a blank line. No hidden setup in helpers that obscure the arrange step.

## 6. Flaky tests are broken tests

- If a test fails intermittently, **fix it or delete it**—don't "retry 3 times".
- Root causes: real clocks, real randomness, real network, shared state between tests, ordering assumptions.
- Each test seeds **its own** data and **cleans up** after itself.

## 7. Coverage as a signal

- Use coverage to **find gaps**, not to hit a number.
- Untested branches in risky code (payments, auth, permissions) are a red flag regardless of total percentage.
- 100% coverage does not prove correctness; a **wrong assertion** still passes.

## 8. Tests as documentation

- A newcomer should read the test file and understand **what the module does**.
- Group by behaviour, not by function name. A `describe("login")` block with cases under it beats one test per method.

## 9. E2E rules

- **Test user journeys**, not components. Components belong in unit/integration tests.
- Use **stable selectors** (`data-testid`, accessible roles), not CSS classes or text that changes.
- One journey per test; no chained "and then log out and log back in".
- Run the full E2E suite in CI on the PR, plus a smaller smoke subset locally.

## 10. What not to test

- Types (the compiler already does).
- Third-party libraries (trust them or replace them).
- Framework defaults (React re-rendering, router matching).
- Trivial getters/setters with no behaviour.

---

## Core idea

A good test suite lets you **say yes to change**. If tests make refactors scary, they are guarding the **implementation** instead of the **behaviour**—rewrite them.

## Further reading

- [Martin Fowler — TestPyramid](https://martinfowler.com/bliki/TestPyramid.html) — balance of unit, service, and UI tests
- [Google Testing Blog — flaky tests](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-what-we-do.html) — operations discipline around unreliable tests in large repos
- [Playwright documentation](https://playwright.dev/docs/intro) — representative modern E2E tooling (substitute your stack if needed)

---

German version: [`teststrategie.md`](../../de/coding/teststrategie.md)
