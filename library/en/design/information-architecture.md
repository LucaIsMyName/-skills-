# Information architecture

**Scope:** Applies to **how content is organised, labelled, and navigated** in digital products and websites—site structure, navigation, taxonomy, search, URLs. Not visual design, not copywriting. Pair with [`designing-good-interfaces.md`](designing-good-interfaces.md), [`wireframing-and-prototyping.md`](wireframing-and-prototyping.md), [`content-design-and-microcopy.md`](content-design-and-microcopy.md), and [`accessibility-in-code.md`](../coding/accessibility-in-code.md).

## Excerpt

- **Users > structure > labels**: know who needs what, then group, then name.
- **Shallow wins**: fewer levels, clearer pages, better search.
- **One thing in one place**—duplicate nav items and duplicate content both confuse.
- **Labels use user language**, not internal jargon.
- **URLs are permanent**—design them like APIs.
- Methods, anti-patterns, and a small audit kit below.

## Before you architect

### Concrete

- **Who** are the main user groups and what **tasks** do they come to complete?
- What **content** actually exists (inventory), and what should exist?
- What does **analytics and search** tell you about demand?
- What are the **legal / policy** pages that must exist and be findable (privacy, accessibility statement, impressum)?

### Meta

- IA is usually the cheapest, highest-impact UX work—and the most politically awkward ("whose team owns this menu item?").
- Good IA is **boring**: clear categories, short paths, honest labels.

---

## Purpose

Make it **easy for users to find and do things** the first time, and for teams to add new content without breaking the map.

---

## 1. Start from tasks, not org charts

- List the **top 10 tasks** users come to do ("donate", "find a service near me", "download the annual report", "contact us", "apply for a grant").
- Rank by **frequency × importance**.
- Each top task must be reachable in **one or two** clicks from the home page.

Bad IA clone: the menu mirrors the org chart ("Programmes", "Operations", "Research"—useful only to staff).

Good IA: the menu mirrors the user's job ("For families", "For partners", "About us", "Donate").

## 2. Inventory and audit

Before changing IA, know the ground truth.

- Export all pages (crawler, CMS export, sitemap).
- For each page: URL, title, last updated, owner, traffic, is it still needed?
- Flag: **duplicates**, **orphans** (no incoming link), **low-value** pages, **outdated** pages.
- Outcome: a concrete "keep / merge / delete / rewrite" decision per page.

## 3. Group and label (card sorting)

- **Open card sort** with real users: give them 30–50 cards (page titles) and ask them to group and name.
- **Closed card sort** when you already have candidate categories.
- Look for **agreement**—labels that 5/5 users grouped the same way are probably right.
- Labels come from users' **own words**. "My account" beats "User profile"; "Find help" beats "Resources".

## 4. Navigation patterns

- **Primary nav**: 4–7 top-level items.
- **Utility nav**: sign-in, language, search, cart.
- **Secondary nav** (in-section): reveal when you enter a section, not on every page.
- **Breadcrumbs** for deep sites.
- **Footer** for legal, contact, repeat of key tasks.

Prefer **one clear path** over multiple clever shortcuts that all do the same thing.

## 5. Search

- Search **is** navigation for large sites—treat it with the same care.
- Measure what people search for, not just what they click.
- **Zero-results** queries are gold: they show labelling gaps.
- Provide **synonyms** and **redirects** for common misses.
- Show **faceted filters** for rich content (date, type, region, language).

## 6. URLs are permanent

- Short, **lowercase**, kebab-case.
- **Descriptive**, not numeric (`/grants/education-2025` beats `/node/8241`).
- Include **locale** where needed (`/de/spenden`, `/en/donate`).
- **Redirect** when you restructure; never let a URL 404 just because you moved it.

### Bad

```
https://example.org/index.php?id=412&ref=nav
```

### Good

```
https://example.org/en/grants/education-2025
```

## 7. Accessibility and internationalisation

- **Skip links**, **landmarks** (`<main>`, `<nav>`, `<aside>`), **headings in order** (H1→H2→H3).
- **Language attribute** (`<html lang="de">`); switch language per page, not per interaction.
- **Avoid** icons without labels; users on screen readers and cognitively loaded users both lose.
- Follow [`accessibility-in-code.md`](../coding/accessibility-in-code.md).

## 8. Governance

IA drift kills usability.

- One person or small group **owns** the IA.
- New pages must slot into the structure; if they don't, rework the structure, don't bolt on a menu item.
- **Periodic audits** (quarterly or per release)—delete or merge.
- **Deprecate gracefully**: notice, redirect, remove.

## 9. Testing and measuring IA

- **Tree testing**: show users the menu tree (no visuals) and ask them to find things. Tools: Treejack, Optimal Workshop.
- **First-click testing** on key pages.
- **Analytics**: drop-off in navigation, zero-results search, pogo-sticking (click back, click another).
- Rework **labels** before redesigning layouts; labels are almost always the cheaper fix.

## 10. What not to do

- **Mega menus** of everything, sorted by department.
- **Duplicate** the same link under three menus "to make it findable".
- **Jargon labels** ("Knowledge portal", "Resources hub", "Stakeholder engagement").
- **Broken redirects** after a restructure.
- IA owned by **no one**—it will rot faster than you can imagine.

---

## Core idea

IA is the **map behind the UI**. A shallow, honest, user-language map beats a deep, beautiful one every time. If users cannot predict where to click next, nothing else in the design matters.

## Further reading

- [Nielsen Norman Group — IA & navigation](https://www.nngroup.com/topic/information-architecture/) — deep library of articles
- [Information Architecture for the Web and Beyond (Rosenfeld, Morville)](https://www.oreilly.com/library/view/information-architecture-4th/9781491911518/) — the canonical book
- [UK Government Digital Service — Navigation](https://design-system.service.gov.uk/patterns/navigation/) — pragmatic patterns
- [Optimal Workshop — Tree testing](https://www.optimalworkshop.com/treejack/) — tooling & methodology

---

German version: [`informationsarchitektur.md`](../../de/design/informationsarchitektur.md)
