# React best practices

**Scope:** Applies to **React application and component code**; not non-React front ends, native apps, or server-only backends.

## Excerpt (read this first)

- Use for **predictable, maintainable React**: hooks, state, effects, performance, and common footguns.
- Prefer patterns that reduce bugs and surprise re-renders; ask before large refactors if context is unclear.
- Full file below: detailed rules and Bad/Good examples (long reference).

## Purpose

This document explains **how to write React code correctly and safely**, focusing on best practices, common mistakes (footguns), and what to do instead.

The goal: write React code that is **predictable, maintainable, and bug-resistant**.

---

## Core Mindset

React is about:

* **Declarative UI** → describe *what* the UI should look like
* **State-driven rendering** → UI updates automatically when state changes

👉 You should NOT “control” the UI manually — React does that for you.

---

## 1. State: Keep It Minimal

### Rule

Only store **what you cannot derive**.

### ❌ Bad

```ts
const [fullName, setFullName] = useState("");
```

### ✅ Good

```ts
const fullName = `${firstName} ${lastName}`;
```

👉 Derived state should NOT be stored.

---

## 2. The Biggest Footgun: `useEffect`

### Rule

If you’re not syncing with an external system → **you probably don’t need `useEffect`**

### ❌ Common Misuse

```ts
useEffect(() => {
  setFiltered(items.filter(i => i.active));
}, [items]);
```

### ✅ Better

```ts
const filtered = items.filter(i => i.active);
```

### When to Use `useEffect`

Only for:

* API calls (if not using a data library)
* Subscriptions (WebSocket, events)
* DOM APIs (focus, measurements)
* Timers

👉 Think: “Am I syncing with something outside React?”

If not → don’t use it.

For a full walkthrough with examples, see the official React guide [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) and [Removing Effect dependencies](https://react.dev/learn/removing-effect-dependencies).

---

## 3. Avoid Derived State in Effects

### ❌ Bad Pattern

```ts
useEffect(() => {
  setValue(expensiveCalculation(data));
}, [data]);
```

### ✅ Good

```ts
const value = useMemo(() => expensiveCalculation(data), [data]);
```

👉 Effects are NOT for calculations.

---

## 4. `useMemo` and `useCallback`: Don’t Overuse

### Rule

Only optimize when necessary.

### ❌ Bad

```ts
const value = useMemo(() => compute(), []);
```

### ✅ Good

```ts
const value = compute();
```

### When to Use

* Expensive computations
* Prevent unnecessary re-renders in memoized components

👉 Premature optimization = complexity.

---

## 5. Props: Keep Them Simple

### Rules

* Pass only what is needed
* Avoid deeply nested objects
* Prefer primitives when possible

### ❌ Bad

```ts
<Component config={{ theme, layout, user }} />
```

### ✅ Good

```ts
<Component theme={theme} layout={layout} />
```

👉 Simpler props = easier debugging.

---

## 6. Component Size

### Rule

A component should do **one thing well**.

### Signs it's too big:

* 200+ lines
* Multiple responsibilities
* Hard to name

👉 Split into smaller components or hooks.

---

## 7. Custom Hooks: Extract Logic

### When to Create One

* Logic reused in multiple places
* Component becomes too complex

### Example

```ts
function useUser() {
  const [user, setUser] = useState(null);
  // logic...
  return user;
}
```

👉 Hooks = reusable logic, not UI.

---

## 8. Avoid Prop Drilling (But Don’t Overuse Context)

### ❌ Bad

Passing props through many layers

### ⚠️ Overcorrection

Using Context everywhere

### ✅ Balanced Approach

* Local state first
* Lift state up if needed
* Use Context for **global concerns only**:

  * theme
  * auth
  * settings

👉 Context is not a global state replacement.

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

```ts
if (loading) return <Loading />;
if (error) return <Error />;
```

### ✅ Clear

```ts
if (loading) return <Loading />;
if (error) return <Error />;
return <Content />;
```

👉 Be explicit and readable.

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
