# File naming and organising

## Scope:

**Naming** and **folder** conventions for media projects—**human and machine** readable. Not DAM enterprise rollout. Pair with [`brand-toolkit-and-asset-library.md`](brand-toolkit-and-asset-library.md), [`git-and-commits.md`](../coding/git-and-commits.md), and [`video-production-basics.md`](video-production-basics.md).

## Excerpt

- **Pattern**: `YYYY-MM-DD_project_component_v02.ext`—**date first** sorts chronologically.
- **Slug** short tokens—**no** spaces (use `-` or `_` **consistently**).
- **Version** suffixes—**avoid** “final_final”.
- **Separate** **masters** from **exports**—never overwrite **source**.
- **README** in top folder—**what** belongs here, **who** owns it.

## Before starting a project folder

### Concrete

- **Codec** and **container** defaults; **colour space** notes.
- **Archive** policy after campaign ends.

### Meta

- Future-you is **not psychic**—**label** for them.

---

## Purpose

Find files in **seconds**, not **hours**—**onboarding** and **handover** depend on it.

---

## 1. Predictable pattern: date, slug, version

### Rule

Use **`YYYY-MM-DD_short-slug_element_v02.ext`** so lists sort by time and names stay unique across exports.

### Bad: predictable pattern: date, slug, version

```text
edit3 (1).mov
final_final_v4_REALFINAL.psd
```

### Good: predictable pattern: date, slug, version

```text
2025-04-18_riverside-interview_camA_v03.wav
2025-04-18_riverside-interview_master_v01.prproj
```

## 2. Slugs: no spaces, one separator style

### Rule

Pick **hyphens or underscores** for the whole project—**never** spaces or mixed special characters in machine paths.

### Bad: slugs: no spaces, one separator style

```text
Summer Campaign / Hero Image / new (use this).png
```

### Good: slugs: no spaces, one separator style

```text
2025-06-01_summer-campaign_hero_16x9_v02.png
```

## 3. Masters separate from exports

### Rule

Keep **lossless or project sources** in `/masters` (or equivalent) and **compressed deliverables** in `/export`—**never** overwrite the only source.

### Bad: masters separate from exports

```text
Export JPEG over the layered PSD to “save space.”
```

### Good: masters separate from exports

```text
/masters/2025-04-18_interview_roughcut.prproj
/export/2025-04-18_interview_h264_web.mp4
```

## 4. README and ownership at the top

### Rule

One **README** in the project root: folder purpose, **naming rules**, **codec defaults**, and **who owns** updates.

### Bad: readme and ownership at the top

```text
Drive folder with 400 files; new hire asks “what is canonical?” in Slack for a week.
```

### Good: readme and ownership at the top

```text
README.md: “Audio: 48kHz WAV masters; exports AAC 256k; owner: Alex; archive after campaign to /archive/2025-q2.”
```

## 5. Archive and handover after the campaign

### Rule

Define **where** finished projects go and **how long** you keep working files—so disks do not become a graveyard.

### Bad: archive and handover after the campaign

```text
Everything stays in “Active” forever; three years of “final” folders.
```

### Good: archive and handover after the campaign

```text
Post-campaign: move to /archive/2025-summer-campaign; README notes retention; masters kept 2y, exports 5y.
```

---

## Common Footguns

- **“Final” in the filename**—version chaos; use `v01`, `v02` always.
- **Personal folders** as the only structure—`janes_stuff`—projects outlive people.
- **One shared “Misc”**—where assets go to die.
- **Overwriting** source because export was “quick”.

---

## Core idea

Naming is **cheap metadata**—**pay** upfront, **save** endlessly.

## Further reading

- [Stanford — Data management](https://library.stanford.edu/research/data-management-services) — general naming discipline
- [Google — File naming conventions](https://developers.google.com/style/filenames) — machine-friendly patterns
- [GOV.UK — Organising files](https://www.gov.uk/government/publications/open-standards-for-government/describing-documents-and-files) — consistency for shared drives

---

German version: [`dateinamen-und-organisation.md`](../../de/medien-&-produktion/dateinamen-und-organisation.md)
