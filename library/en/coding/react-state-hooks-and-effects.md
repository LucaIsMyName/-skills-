# React: state, hooks, and effects

**Scope:** Applies to **React state, built-in hooks, memoisation, props drilling vs context, and hook extraction** in components. Not routing, not server components unless noted. Pair with [`react-components-async-and-structure.md`](react-components-async-and-structure.md) and [`react-best-practices.md`](react-best-practices.md).

## Excerpt

- Keep **state minimal**; avoid accidental `useEffect` abuse.
- **Derive** state; do not sync it in effects when a calculation suffices.
- **Context** for cross-cutting concerns, not every piece of shared data.

## Before changing hooks

### Concrete

- **Existing custom hooks** and shared state libraries in the repo.

### Meta

- Every new effect is a **long-term liability**—default to none.

---

## Purpose

Make **state and effects** boring, testable, and easy to review.

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



---

German version: [`react-state-hooks-und-effects.md`](../../de/coding/react-state-hooks-und-effects.md)
