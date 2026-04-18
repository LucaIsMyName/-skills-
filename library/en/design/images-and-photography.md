# Images and photography

**Scope:** Applies to **choosing, editing, and using photographs and images** in NGO/charity and product contexts—ethics, consent, cropping, captions, accessibility, file handling. Not studio photography technique, not brand illustration strategy. Pair with [`image-ethics-and-framing.md`](../media-&-production/image-ethics-and-framing.md), [`image-and-quote-releases.md`](../ethics-&-legal/image-and-quote-releases.md), [`photography-for-ngos.md`](../media-&-production/photography-for-ngos.md), and [`performance-and-web-vitals.md`](../coding/performance-and-web-vitals.md).

## Excerpt
- **Consent first.** No image of an identifiable person without an up-to-date release.
- **Dignity first.** No suffering-for-suffering's-sake; show people as protagonists, not props.
- **Context matters**: caption, alt text, source, date—an uncaptioned image is a rumour.
- **Technical discipline**: sized, compressed, formatted for the web; EXIF reviewed for privacy.
- **Stock** is fine when honest; do not pass stock as your own beneficiaries.
- Checklist, patterns, and pitfalls below.

## Before using an image

### Concrete

- Do we have **release** on file for identifiable people? Still valid?
- Is the **caption** truthful and specific (names where appropriate, context, date, place)?
- Is the **alt text** meaningful for non-sighted users?
- Is the **file** compressed and the right size for the channel?

### Meta

- Photographs are **power**. Who is looking at whom, and on whose terms?
- An unclear image in a rush becomes tomorrow's complaint; a careful image builds trust.

---

## Purpose

Use photographs and images to **tell the truth with dignity**—for the people in them, for the audience, and for the organisation's long-term trust.

---

## 1. Consent and releases

- **Written release** for identifiable individuals, especially children and vulnerable adults.
- Releases describe **where** the image may be used (website, reports, social, press) and **for how long**.
- **Withdrawal**: people can revoke consent; remove the image promptly (and from caches/CDNs).
- Safeguarding cases, medical contexts, migration/asylum: extra care, extra anonymisation, often **no image**.
- See [`image-and-quote-releases.md`](../ethics-&-legal/image-and-quote-releases.md).

## 2. Ethics and framing

- **Protagonists, not objects**. Show agency—people doing something, making decisions, being themselves.
- **Avoid "suffering porn"**. Pain is real; it does not require a close-up on tears to be respected.
- **No trope shopping**: child-in-poverty silhouette, "hopeful looking into sun" cliché.
- **Local photographers** when possible; involve communities in choosing their own representation.
- See [`image-ethics-and-framing.md`](../media-&-production/image-ethics-and-framing.md).

## 3. Captions

A caption answers: **who, what, where, when**, and (if useful) **why this image**.

### Bad: captions

```
Happy child.
```

### Good: captions

```
Aisha, 9, at the after-school homework club, Nairobi, March 2025.
Photo: Kwame Mensah.
```

Rules:

- **Real names** where consent allows; "Name changed" if needed.
- **Date and place** for news/journalism contexts.
- **Credit** the photographer.
- Do not **invent** emotion or motivation ("Anna is overjoyed"—only if she is, and said so).

## 4. Alt text

Alt text is for people who cannot see the image. It is not the caption; often it overlaps but is shaped differently.

- **Describe** what the image shows in one sentence.
- **Purpose matters**: alt depends on why the image is there.
- **Decorative** images get empty alt (`alt=""`).
- **Text in images**: repeat the text in alt.

### Good: alt text

```html
<img src="funnel-q1.webp"
     alt="Line chart: conversion rate rising from 12% in Jan to 18% in Mar 2025."
     width="800" height="400">
```

See [`accessibility-in-code.md`](../coding/accessibility-in-code.md).

## 5. Cropping and retouching

- **Crop** to focus on the subject's action or face; avoid cutting identifying features.
- **Do not retouch** in ways that misrepresent (add tears, remove context).
- **Exposure and colour** corrections are fine; **compositing** that changes meaning is not.
- **Keep originals**; edits are non-destructive.

## 6. Technical standards

- **Formats**: `.webp` / `.avif` for web photos, `.svg` for vector, `.png` for UI with transparency.
- **Size**: multiple resolutions for responsive (`srcset`); never ship a 4000px photo as a thumbnail.
- **Compression**: `sharp`, `mozjpeg`, `squoosh`—target visually lossless.
- **Colour profile**: sRGB for web.
- **File names**: kebab-case, descriptive (`after-school-nairobi-2025-03.webp`). See [`file-naming-and-organising.md`](../media-&-production/file-naming-and-organising.md).

## 7. EXIF and metadata

- **Strip GPS** from published images—location data can endanger people.
- **Keep** photographer credit, copyright, and caption metadata where supported.
- Use **IPTC** fields for editorial contexts.
- Audit your CMS: does it strip or preserve metadata? Pick deliberately.

## 8. Stock imagery

- **Allowed** when honestly used—clearly illustrative, not passed off as your own programme.
- **Avoid** tropes (hands stacked, smiling office workers, "African village" stock).
- **Check licence** carefully; do not assume every platform allows NGO or commercial use.
- **Diversity** and **authenticity**—don't accidentally exclude whole groups with your choices.

## 9. Galleries, hero images, and performance

- Hero images are often the **LCP**—size and preload carefully.
- Lazy-load below-the-fold images.
- **Aspect ratios** preserved to avoid CLS.
- **Light/dark mode**: different variants if contrast is critical.
- See [`performance-and-web-vitals.md`](../coding/performance-and-web-vitals.md).

## 10. What not to do

- Publish identifiable children without verified, specific release.
- Use **decontextualised** photos from other campaigns ("archive" images with current captions) without labelling.
- Strip a photographer's **credit** because it "looks cleaner".
- Use **face-only** close-ups of people in vulnerable moments for fundraising banners.
- Keep images on the site after a person **withdraws consent**.

---

## Core idea

Images do more than decorate—they **say who these people are and how you see them**. Use them with consent, context, craft, and compression. The trust you build with one careful image compounds across campaigns.

## Further reading

- [Save the Children — Image guidelines](https://www.savethechildren.net/) — sector-standard ethical guidance (see communications resources)
- [IFRC — Ethical photography](https://www.ifrc.org/) — humanitarian sector principles
- [WCAG — Images](https://www.w3.org/WAI/tutorials/images/) — accessibility patterns for images
- [web.dev — Responsive images](https://web.dev/learn/design/responsive-images/) — technical patterns

---

German version: [`bilder-und-fotografie.md`](../../de/design/bilder-und-fotografie.md)
