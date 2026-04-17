# Accessibility for communications

**Scope:** Applies to **accessible copy and media practices** for web and social (alt text, headings, links, captions); not full visual design systems—see [`design-basics.md`](../design/design-basics.md) for UI/visual principles without duplicating them here.

## Excerpt (read this first)

- Use when publishing **text, images, or video** so more people can perceive and understand content (disabilities, slow connections, noisy environments).
- **Alt text** describes meaningful images; **decorative** images marked accordingly.
- **Headings** in logical order; **link text** meaningful out of context.
- Full file below: rules, Bad/Good examples, checklist. Does **not** replace WCAG audit or legal compliance sign-off.

## Purpose

This skill helps **nonprofit communicators** produce **more accessible** newsletters, web pages, and social posts—aligned with inclusive practice, not as a substitute for professional accessibility audits.

## AI / prompt: completeness before drafting

### Concrete

- **Channel** (CMS page, email HTML, LinkedIn, Instagram…)
- **Images** available or placeholders; which carry information?
- **Video:** will captions/subtitles be provided? language?
- **Link destinations** (exact URLs if rewriting link text)

### Meta

- **Audience** constraints (screen reader users, plain-language readers)
- Relationship to **brand components** (existing accessible templates—ask user)

---

## Core rules

### 1. Alternative text for meaningful images

Describe **what matters** for understanding, not every pixel.

### ❌ Bad

```text
Alt: image1.jpg
```

### ✅ Good

```text
Alt: Volunteer handing a food parcel to a person outside a community centre entrance.
```

---

### 2. Decorative images

If an image is purely decorative, say so in the CMS or use empty alt where appropriate (`alt=""` in HTML contexts)—follow platform docs.

---

### 3. Heading hierarchy in web copy

Use **one** logical H1 per page; do not skip levels (H1 → H3) without reason.

### ❌ Bad

```text
<h1>Our work</h1>
<h4>Education programme</h4>   <!-- skipped h2/h3 -->
```

### ✅ Good

```text
<h1>Our work</h1>
<h2>Education programme</h2>
<h3>After-school mentoring</h3>
```

---

### 4. Link text: meaningful alone

Avoid “click here.”

### ❌ Bad

```text
Click here for more information.
```

### ✅ Good

```text
Read our 2025 impact report (PDF).
```

---

### 5. Captions for video

Prefer **captions** for speech; **audio description** when important visual information is not spoken (policy varies—ask user).

---

## Checklist before publish

- [ ] Meaningful images have **descriptive alt text**; decorative images handled per spec
- [ ] Headings **nested logically** on web
- [ ] Links describe **destination** or action
- [ ] Video **captioning** planned or explicitly N/A
- [ ] User notified if **legal accessibility** standard must be met (audit/sign-off)

---

## Final thought

👉 Accessibility in comms is **ongoing practice**. Pair this skill with **respectful language** and **plain language** skills for stronger, fairer content.
