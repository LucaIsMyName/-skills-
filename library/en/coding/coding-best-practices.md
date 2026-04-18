# Coding best practices

**Scope:** Applies to **general software quality** in application code (any language or framework); not security audits, infrastructure, or operations. This page is the **overview**—deeper numbered rules live in the linked parts. Pair with [`coding-style-and-structure.md`](coding-style-and-structure.md), [`coding-errors-validation-and-state.md`](coding-errors-validation-and-state.md), and [`coding-testing-and-habits.md`](coding-testing-and-habits.md).

## Excerpt
- **Three parts**: style and structure → errors, validation, predictable state → tests, consistency, comments, scaling habits.
- Start with **simplicity and names** before optimising or abstracting.
- **Cross-links** between parts; read them in order or jump to what you need.
- Same guidance as before—just split so each file stays easy to navigate.

## Before refactoring code

### Concrete

- Which **part** matches your current problem (readability vs boundaries vs tests)?
- Are you changing **shared** behaviour—if so, read part 2 and 3?

### Meta

- Boring, obvious code is usually **good** code.

---

## Purpose

Give maintainers a **short map** into detailed coding habits—without loading ~500 lines in one scroll.

---

## Parts

1. [**Coding style and structure**](coding-style-and-structure.md) — mindset, simplicity, readability, SRP, nesting, DRY, abstraction, naming.
2. [**Coding errors, validation, and predictable state**](coding-errors-validation-and-state.md) — small functions, side effects, explicit errors, input validation, predictable data flow.
3. [**Coding tests, consistency, and habits**](coding-testing-and-habits.md) — what to test, when to optimise, consistency, comments, feature structure, footguns, further reading.

---

## Core idea

Good code is **simple, readable, and explicit**—pick the part where you need depth, then apply it in your codebase.

## Further reading

- Continue with the related pages linked in the Scope section for deeper examples and adjacent workflows.

---

German version: [`coding-best-practices.md`](../../de/coding/coding-best-practices.md)
