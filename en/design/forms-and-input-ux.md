# Forms and input UX

**Scope:** Applies to **form layout, labels, validation, and input states** in digital products; not backend validation logic or legal text for consent (point to comms/legal).

## Excerpt (read this first)

- Use when designing **data entry**: single fields, multi-step flows, wizards.
- **One primary action** per screen when possible; **clear error** placement and recovery.
- **Ask** for field list, required rules, and error messaging source (product copy vs legal).
- Full file below: rules, Bad/Good examples, checklist. Pairs with [`designing-good-interfaces.md`](designing-good-interfaces.md).

## Purpose

This skill helps **reduce errors and abandonment** in forms through clear structure, labeling, and feedback.

## AI / prompt: completeness before drafting

### Concrete

- **Fields** (names, types, required/optional)
- **Validation rules** (format, min/max, dependencies)
- **Submit** destination and **error** API shape if known

### Meta

- **Audience** (general public, experts, stressed users)
- **Mobile** share of traffic

---

## Core rules

### 1. Visible labels

### ❌ Bad

```text
Placeholder only: “Email” with no label; placeholder disappears on focus.
```

### ✅ Good

```text
Persistent label above or beside field; placeholder optional for example format only.
```

---

### 2. Required vs optional

Mark **optional** fields or state “required” clearly—don’t rely on asterisk legend alone if users are stressed.

---

### 3. Errors: inline + summary for long forms

Show **field-level** error next to the field; for many errors, add a **summary** at the top with links to fields.

### ❌ Bad

```text
Submit fails with only a toast: “Something went wrong.”
```

### ✅ Good

```text
“Enter a date in DD.MM.YYYY format” under the field; focus moves to first error.
```

---

### 4. Disabled vs read-only

**Disabled** = cannot interact (explain why). **Read-only** = visible value, not editable—different semantics for screen readers.

---

### 5. Don’t disable submit without explanation

If submit is disabled until complete, show **what’s missing** or enable submit and validate on submit.

---

## Checklist

- [ ] Labels, hints, and errors are **programmatically associated** with inputs
- [ ] Required/optional policy is **obvious**
- [ ] Error messages are **specific** and actionable
- [ ] Long forms: progress indicator and **sensible grouping**
- [ ] Keyboard and screen-reader flow tested (tab order, focus on error)

---

## Final thought

👉 Forms are where users **commit**. Confusion here is trust lost.
