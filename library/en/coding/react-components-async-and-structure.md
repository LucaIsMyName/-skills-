# React: components, async, and structure

**Scope:** Applies to **lists, forms, handlers, async flows, conditional rendering, and file layout** in React apps. Not form-library deep dives. Pair with [`react-state-hooks-and-effects.md`](react-state-hooks-and-effects.md) and [`react-best-practices.md`](react-best-practices.md).

## Excerpt

- **Stable keys**; **controlled** forms by default.
- **Async** with clear loading/error UX; **never mutate** state in place.
- **Project layout** that matches how teams own features.

## Before large UI changes

### Concrete

- **Design system** or component library already in use.

### Meta

- Prefer **one obvious pattern** over three clever ones.

---

## Purpose

Ship UI that **handles real inputs** and **scales with the codebase**.

---

## 9. Keys in Lists

### Rule

Keys must be **stable and unique**

### ❌ Bad

```ts
items.map((item, index) => <Item key={index} />)
```

### ✅ Good

```ts
items.map(item => <Item key={item.id} />)
```

👉 Wrong keys = weird bugs and broken UI updates. See [Rendering lists — keeping list items in order with `key`](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys).

---

## 10. Forms: Controlled vs Uncontrolled

### Controlled (default)

```ts
<input value={value} onChange={e => setValue(e.target.value)} />
```

### Use uncontrolled when:

* Performance matters (large forms)
* You use form libraries

👉 Controlled = predictable, but can be heavy.

---

## 11. Event Handlers

### ❌ Bad

```ts
<button onClick={handleClick()} />
```

### ✅ Good

```ts
<button onClick={handleClick} />
```

👉 Passing a function ≠ calling a function.

---

## 12. Async Logic

### ❌ Bad

```ts
useEffect(() => {
  fetch("/api").then(setData);
}, []);
```

### Better Options

* Use a data library (recommended)
* Handle loading + error states explicitly

👉 Async without structure leads to bugs fast.

---

## 13. Mutating State (Big No)

### ❌ Bad

```ts
items.push(newItem);
setItems(items);
```

### ✅ Good

```ts
setItems(prev => [...prev, newItem]);
```

👉 Always treat state as immutable.

---

## 14. Conditional Rendering

### ❌ Messy

```tsx
return (
  <div>
    {loading ? (
      <Loading />
    ) : error ? (
      <Error />
    ) : data ? (
      <Content data={data} />
    ) : (
      <Empty />
    )}
  </div>
);
```

### ✅ Clear

```ts
if (loading) return <Loading />;
if (error) return <Error />;
if (!data) return <Empty />;
return <Content data={data} />;
```

👉 Prefer early returns over nested ternaries—easier to read and extend.

---

## 15. File & Folder Structure

### Recommended

```
src/
  app/
  modules/
  components/
  hooks/
  lib/
```

👉 Group by feature, not by type (when scaling).

---

## 16. Common Footguns Summary

### 🚨 Overusing `useEffect`

→ Use it only for side effects

### 🚨 Storing derived state

→ Compute it instead

### 🚨 Using index as key

→ Use stable IDs

### 🚨 Mutating state

→ Always copy

### 🚨 Over-optimizing with `useMemo`

→ Only when needed

### 🚨 Huge components

→ Split early

---

## Further reading

**React docs**

- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — when `useEffect` is (and isn’t) the right tool
- [Removing Effect dependencies](https://react.dev/learn/removing-effect-dependencies) — fixing unnecessary or fragile Effects
- [useMemo](https://react.dev/reference/react/useMemo) — reference for legitimate memoization
- [Passing data deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) — Context without overusing it
- [Rendering lists (keys)](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys) — stable `key` values

**Data fetching**

- [TanStack Query (React)](https://tanstack.com/query/latest/docs/framework/react/overview) — preferred alternative to hand-rolled `useEffect` + `fetch` for server state

---

## Final Thought

Good React code feels:

* Simple
* Predictable
* Easy to change

Bad React code feels:

* “magical”
* fragile
* hard to debug

👉 If something feels complicated, it probably is — simplify it.

---

German version: [`react-best-practices.md`](../../de/coding/react-best-practices.md)


---

German version: [`react-komponenten-async-und-struktur.md`](../../de/coding/react-komponenten-async-und-struktur.md)
