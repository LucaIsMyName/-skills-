# Subtitles and captions

**Scope:** **Text on video**—captions for accessibility, subtitles for translation—workflows and quality. Pair with [`accessibility-for-comms.md`](../language-&-communication/accessibility-for-comms.md), [`video-production-basics.md`](video-production-basics.md), and [`podcasting-basics.md`](podcasting-basics.md).

## Excerpt
- **Captions** are **not** optional for many users—**default** them on social where possible.
- **Accuracy** beats speed—**names** and **terms** verified.
- **Speaker IDs** when multiple speakers; **sound cues** in brackets if relevant.
- **Burned-in** vs **sidecar** (SRT/VTT)—pick per platform.
- **Auto captions** are a **first draft**—**edit** for accuracy.

## Before publishing video

### Concrete

- **Glossary** of names and technical terms.
- **Language** variants (EN-GB vs EN-US) if needed.

### Meta

- Bad captions **exclude** and **misinform**.

---

## Purpose

Make spoken content **reachable** and **precise**—for Deaf/hard-of-hearing audiences and noisy environments.

---

## 1. Captions as default, not bolt-on

### Rule

**Upload** captions with every public video; **enable** on players where the platform allows—**off** by default excludes people.

### Bad: captions as default, not bolt-on

```text
“People can turn them on if they want”—but default off and no file uploaded.
```

### Good: captions as default, not bolt-on

```text
VTT attached; player defaults captions on for social (where UX allows); burned-in only when platform forces it.
```

## 2. Edit auto-captions—two-pass QA

### Rule

**ASR** first draft; **human** pass for **names**, **homophones**, and **timing**; watch **on mute** to verify sense.

### Bad: edit auto-captions—two-pass qa

```text
Upload auto-captions without review.
```

### Good: edit auto-captions—two-pass qa

```text
Two-pass edit: meaning + timing; read-along on mute; glossary for project terms.
```

## 3. Speaker labels and sound cues

### Rule

Use **speaker IDs** when multiple people talk; **[bracketed]** non-speech sounds only when they matter to understanding.

### Bad: speaker labels and sound cues

```text
All lines attributed to “Speaker” or wrong names from ASR.
```

### Good: speaker labels and sound cues

```text
Alex: Welcome…
Sam: Thanks…
[door closes] (only if plot-relevant)
```

## 4. Sidecar vs burned-in

### Rule

Prefer **SRT/VTT** so users can **resize**, **restyle**, and **translate**—burn-in only when platform requires or for universal social autoplay.

### Bad: sidecar vs burned-in

```text
Hard-coded tiny white text on busy footage—illegible and not user-controllable.
```

### Good: sidecar vs burned-in

```text
VTT for web; optional burn-in for Instagram with high-contrast safe style guide.
```

## 5. Subtitles for translation

### Rule

**Translation** is **subtitling** with cultural fit—**line length** and **reading speed** limits; **avoid** literal jokes that fail.

### Bad: subtitles for translation

```text
Machine-translate entire file; wrong register (tu vs vous).
```

### Good: subtitles for translation

```text
Translator briefed on tone; max chars/line per spec; reviewer fluent in target language.
```

## 6. Do not paraphrase quotes without policy

### Rule

Captions should **match** spoken words for **news** and **testimonial** content—**summaries** need an editorial rule.

### Bad: do not paraphrase quotes without policy

```text
Paraphrase quotes in captions for “clarity” without editorial policy.
```

### Good: do not paraphrase quotes without policy

```text
Verbatim default; if simplify for reading level, label as “simplified captions” and get sign-off for sensitive lines.
```

---

## Common Footguns

- **Timing** drift—captions 2s late; worse than none for some users.
- **ALL CAPS** or **garish** styles—hard to read; use platform defaults or brand-accessible styles.
- **Missing** music lyrics when they carry meaning—**equal** access.
- **Wrong** language tag—player picks wrong font or direction.

---

## Core idea

Captions are **part of the message**—**accuracy**, **timing**, **inclusion**.

## Further reading

- [W3C — Captions](https://www.w3.org/WAI/media/av/captions/) — overview
- [W3C — Understanding 1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) — success criterion context
- [BBC — Subtitle guidelines](https://www.bbc.co.uk/accessibility/forproducts/guides/subtitles) — timing and speaker conventions

---

German version: [`untertitel-und-untertitelung.md`](../../de/medien-&-produktion/untertitel-und-untertitelung.md)
