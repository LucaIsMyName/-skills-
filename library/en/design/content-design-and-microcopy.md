# Content design and microcopy

**Scope:** Applies to **words in the interface**—labels, buttons, form help, empty states, error messages, confirmations, notifications. Not long-form copywriting, not brand strategy. Pair with [`tone-of-voice-and-brand-voice.md`](../language-&-communication/tone-of-voice-and-brand-voice.md), [`empty-and-error-states.md`](empty-and-error-states.md), [`calls-to-action-and-asks.md`](../language-&-communication/calls-to-action-and-asks.md), and [`respectful-language.md`](../language-&-communication/respectful-language.md).

## Excerpt
- **Copy is UI.** The words users read are as much interface as the buttons they click.
- **Plain language, verbs on buttons, consistency in terms.**
- **Specific beats generic**: "Save changes" beats "OK".
- **Microcopy respects the user**—no blame, no guilt, no gotchas.
- **Localise in mind from day one**—German is longer, Arabic is RTL, Japanese is denser.
- Patterns for labels, buttons, forms, errors, notifications below.

## Before writing microcopy

### Concrete

- **What** is the user about to do, just did, or cannot do?
- **What information** do they need to decide?
- **What is the single primary action** on this screen?
- **What happens** if they get it wrong?

### Meta

- Microcopy is written **per screen** but read **across a product**. Consistency is a feature.
- The shortest clear version usually wins—measure in **understanding**, not word count.

---

## Purpose

Write words that **help users act with confidence**—honest, specific, consistent, and kind.

---

## 1. Principles

- **Clarity** over cleverness. A joke in microcopy ages badly.
- **Verb-first** on buttons: "Create project", "Send invitation".
- **Active voice**: "We sent you an email" beats "An email was sent".
- **Consistent terms**: if it is a "workspace" in one place, do not call it "team" elsewhere.
- **Sentence case** for UI labels and buttons (matches how people read); reserve title case for page titles if you must.

## 2. Labels

Field labels describe **what is inside the field**, not how to fill it.

### Bad: labels

```
Please enter your email address below:
```

### Good: labels

```
Email address
```

Rules:

- Labels **above** the field for most forms; avoid placeholder-only labels (they disappear).
- **Short**; two or three words.
- **Required** marker consistent across the product (* or "required"; pick one).

## 3. Buttons and CTAs

- Button text = **the action**, from the user's side.
- No "OK" on destructive confirms; use the **verb**.
- Avoid "Submit" on anything meaningful—prefer "Send invitation", "Save changes", "Publish draft".

### Bad: buttons and ctas

```
[ OK ]
```

### Good: buttons and ctas

```
[ Delete invoice ]
```

See [`calls-to-action-and-asks.md`](../language-&-communication/calls-to-action-and-asks.md) for marketing CTAs.

## 4. Form help and validation

- **Inline help** close to the field, short.
- **Examples** in help text: "e.g. 07700 900123".
- **Validation messages** explain the problem and the fix.

### Bad: form help and validation

```
Invalid input.
```

### Good: form help and validation

```
Use a work email (e.g. you@yourcharity.org) so we can link your team.
```

## 5. Empty states

Every empty list is a small teaching moment—see [`empty-and-error-states.md`](empty-and-error-states.md).

### Good: empty states

```
No projects yet. Create your first to start tracking progress.
[ Create a project ]
```

## 6. Error messages

Three jobs: **what**, **why**, **what to do**.

### Bad: error messages

```
Something went wrong.
```

### Good: error messages

```
We couldn't save your changes because the connection dropped.
Your text is still here. Try again, or keep editing offline.
[ Try again ]
```

Never blame the user ("Invalid email"). Prefer "Check the email address—we don't recognise this format."

## 7. Confirmations and destructive actions

- Say what will happen and whether it is reversible.
- Use the **verb** on the confirm button.
- Avoid trickery ("Nah, I don't want this" for "Cancel").

### Good: confirmations and destructive actions

```
Delete "Annual Report 2024"?

This file will be moved to Trash. You can restore it for 30 days.

[ Cancel ]   [ Delete file ]
```

## 8. Notifications and toasts

- **Past tense** for "done" ("Invitation sent").
- **Present tense** for "in progress" ("Sending…").
- **Future intention** for "scheduled" ("Will send on 12 May").
- Include **undo** where safe.

### Good: notifications and toasts

```
Invitation sent to anna@example.org. [ Undo ]
```

## 9. Localisation

- Pre-size for **+30% length** in German; plan for Chinese/Japanese being denser and Arabic/Hebrew being RTL.
- Avoid **idioms** that don't translate ("back to square one").
- Keep **placeholders** grammatical in every locale; use full sentences with variables, not fragment-joining.
- Write translator **notes** for ambiguous terms.
- Pair with [`respectful-language.md`](../language-&-communication/respectful-language.md).

### Bad: localisation

```
"Hi {{name}}, your {{plan}} just got better!"
```

This may not inflect correctly in all languages.

### Good: localisation

```
"Hi {{name}}, we've upgraded your plan ({{plan}})."
```

## 10. What not to do

- **Lorem ipsum** in review—you are reviewing the font, not the product.
- Multiple terms for the same concept across the UI.
- Copy that **yells** (ALL CAPS), **apologises too much**, or **blames the user**.
- **Humour** that ages badly or misses in other cultures.
- Hide important info in a **tooltip** the user cannot keyboard-reach.

---

## Core idea

Microcopy is the **friendly, competent colleague** inside your product: tells you what this is, what it will do, and what just happened—in a few words, in your language, without drama. Design it; review it; test it.

## Further reading

- [UX Writing Hub — Fundamentals](https://uxwritinghub.com/ux-writing-examples/) — pattern library
- [Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) — voice, tone, terminology
- [Shopify Polaris — Content](https://polaris.shopify.com/content) — product-writing guidance
- [UK GOV.UK — Content design style guide](https://www.gov.uk/guidance/style-guide) — plain-language exemplar

---

German version: [`content-design-und-microcopy.md`](../../de/design/content-design-und-microcopy.md)
