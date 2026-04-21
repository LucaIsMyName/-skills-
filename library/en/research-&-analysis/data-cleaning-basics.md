# Data cleaning basics

## Scope:

**Practical** cleaning before analysis—types, missing data, duplicates, simple validation. Not a full data-engineering course. Pair with [`reading-statistics-plainly.md`](reading-statistics-plainly.md), [`survey-design.md`](survey-design.md), and [`notes-and-synthesis.md`](notes-and-synthesis.md).

## Excerpt

- **Profile** data first: ranges, distinct counts, missingness.
- **Standardise** formats (dates, currencies, booleans).
- **De-duplicate** with a clear rule (keep latest, keep complete).
- **Missing data**: document **why**; choose **strategy** (exclude, impute with care)—**don’t** silently drop.
- **Never** clean without **keeping** a raw copy.

## Before cleaning

### Concrete

- **Source** systems and **export** timestamps.
- **Keys** that uniquely identify rows.

### Meta

- Cleaning choices are **analysis choices**—**document** them.

---

## Purpose

Make datasets **trustworthy enough** to summarise—without **hidden** transformations.

---

## 1. Validation

### Good: validation

```text
Assert: donation_amount >= 0
Flag rows where email invalid but phone present for manual review
```

## 2. Missingness

- **MCAR/MAR/MNAR** concepts matter for serious inference—**flag** and **consult** a statistician when high-stakes.

## 3. What not to do

- **Overwrite** raw exports—**work on copies**.

---

## Core idea

Cleaning is **making uncertainty explicit**: **what changed**, **why**, and **what remains unknown**.

## Further reading

- [Hadley Wickham — Tidy data (concept)](https://vita.had.co.nz/papers/tidy-data.pdf) — principles

---

German version: [`datenbereinigung-grundlagen.md`](../../de/recherche-&-analyse/datenbereinigung-grundlagen.md)
