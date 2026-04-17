# TypeScript best practices

**Scope:** Applies to **TypeScript in application code** (React, Node, API handlers, libraries); not build-tool configuration, not type system research. Pair with [`coding-best-practices.md`](coding-best-practices.md) for general rules and [`react-best-practices.md`](react-best-practices.md) for React specifics.

## Excerpt (read this first)

- **Strict mode on, always.** `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
- Prefer **types that describe values**, not types that fight the language. Use narrowing, discriminated unions, and literal types.
- **`unknown`** at boundaries (I/O, `JSON.parse`, network), **`never`** for exhaustiveness; **`any` is a last resort**—comment why.
- **Validate external data** at the edge (zod / valibot / hand-written guards); types inside the app assume validated shapes.
- Full rules, examples, and anti-patterns are below.

## AI / prompt: completeness before writing types

Before designing types, clarify **where the data comes from** and **who owns it**. Do not silence type errors with `as` casts or `any`.

### Concrete

- **Source** of the data: trusted internal code, user input, network, file, env?
- **Runtime shape** at the boundary—are we validating, or assuming?
- **Lifetime** of the type: one file, one package, or public API?

### Meta

- Readability for humans beats cleverness in the type system.
- Prefer **inferred** types where ergonomic; write explicit types at **public function signatures** and exports.

---

## Purpose

Write TypeScript that **catches real bugs**, stays **readable**, and **survives refactors**—without turning the file into a type puzzle.

---

## 1. tsconfig baseline

- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"exactOptionalPropertyTypes": true`
- `"noImplicitOverride": true`
- `"noFallthroughCasesInSwitch": true`
- `"isolatedModules": true`
- `"forceConsistentCasingInFileNames": true`

Turn on one flag at a time when adopting in a legacy repo; fix the fallout before enabling the next.

## 2. `type` vs. `interface`

- Use **`type`** by default—unions, intersections, mapped types all work.
- Use **`interface`** when you need **declaration merging** (rare) or are exposing an extensible public API.
- Never mix both styles in one module.

```ts
type User = { id: string; name: string };
type Admin = User & { role: "admin" };
```

## 3. Narrow, don't cast

- `as` casts are a **promise to the compiler**; prefer **runtime checks** that also narrow.

### Bad

```ts
const user = data as User;
```

### Good

```ts
if (isUser(data)) {
  // data is User here
}
```

## 4. Discriminated unions over optional chaos

### Bad

```ts
type Response = { ok?: boolean; data?: T; error?: string };
```

### Good

```ts
type Response<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

## 5. `unknown` at boundaries

- `JSON.parse`, `fetch().json()`, `process.env` values, `localStorage` reads: all are `unknown` until validated.
- Validate with a schema library (zod, valibot) or an explicit guard function.

```ts
const raw: unknown = await res.json();
const user = UserSchema.parse(raw);
```

## 6. Exhaustiveness with `never`

```ts
function label(kind: "a" | "b"): string {
  switch (kind) {
    case "a": return "A";
    case "b": return "B";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
```

Adding a new case without handling it becomes a **compile error**, not a runtime surprise.

## 7. Generics with intent

- Only introduce a generic if at least **two call sites** benefit.
- Constrain generics (`<T extends object>`) rather than leaving them fully open.
- Name generics by **role** (`TItem`, `TResponse`), not `T1`, `T2`.

## 8. Public function signatures are explicit

- Exported functions: **write return types**. Inference is fine inside a module, not across module boundaries.
- Exported React components: explicit `Props` type, no `React.FC` (loses inference on children/return).

## 9. `readonly` and immutability

- Prefer `readonly` on arrays and fields that should not mutate.
- In React state, treat reducer state as deeply readonly.

## 10. Errors are values, sometimes

- Throw for **truly exceptional** cases; return `Result`-like unions for **expected failure paths** (validation, parse, auth).

```ts
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
```

## Anti-patterns to remove on sight

- `: any` without an adjacent comment explaining why.
- `as unknown as SomeType` double-casts.
- `// @ts-ignore` without a ticket reference or one-line reason.
- Enums for simple string unions—use a union type.
- Deeply nested conditional types used once.

---

## Core idea

Types should **describe what is true** about your program. If you are fighting them, the **design** is probably wrong, not the type.

---

German version: [`typescript-best-practices.md`](../../de/coding/typescript-best-practices.md)
