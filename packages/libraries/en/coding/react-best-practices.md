# React best practices

## Scope:

Applies to **React application and component code**; not non-React front ends, native apps, or server-only backends. This page is the **overview**; details are split across two files. Pair with [`typescript-best-practices.md`](typescript-best-practices.md) and [`coding-best-practices.md`](coding-best-practices.md).

## Excerpt

- **State and hooks** (`useState`, `useEffect`, memoisation, props, context, hooks extraction)—[`react-state-hooks-and-effects.md`](react-state-hooks-and-effects.md).
- **Components, events, async, lists, forms, structure**—[`react-components-async-and-structure.md`](react-components-async-and-structure.md).

## Before opening the long guides

### Concrete

- **React version** and **strict mode** setting in the repo.

### Meta

- Prefer **boring patterns** that everyone on the team recognises.

---

## Purpose

Keep React guidance **discoverable** without loading ~430 lines in one file.

---

## Parts

1. [**React: state, hooks, and effects**](react-state-hooks-and-effects.md) — mindset, minimal state, `useEffect`, derived state, memo hooks, props, component size, custom hooks, context.
2. [**React: components, async, and structure**](react-components-async-and-structure.md) — list keys, forms, handlers, async, mutation, conditional UI, folders, footguns, further reading.

---

## Core idea

**Declare UI from state**; isolate effects and side effects; let structure follow **team ownership**.

## Further reading

- Continue with the related pages linked in the Scope section for deeper examples and adjacent workflows.

---

German version: [`react-best-practices.md`](../../de/coding/react-best-practices.md)
