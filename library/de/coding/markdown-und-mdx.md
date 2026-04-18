# Markdown und MDX

**Geltungsbereich:** Gilt für **Markdown- und MDX-Autoring** in Docs und Produkt-Content—Überschriften, Links, Code-Blöcke, Tabellen, Frontmatter, MDX-Komponenten, Barrierefreiheit, Versionierung. Kein LaTeX, kein Static-Site-Tuning. Kombiniere mit [`skill-dokumentation-schreiben.md`](../ki-&-prompting/skill-dokumentation-schreiben.md), [`barrierefreiheit-im-code.md`](barrierefreiheit-im-code.md), [`content-design-und-microcopy.md`](../design/content-design-und-microcopy.md) und [`dateinamen-und-organisation.md`](../medien-&-produktion/dateinamen-und-organisation.md).

## Exzerpt
- **Plain Markdown** zuerst—MDX nur, wenn Komponenten klar etwas bringen.
- Ein **H1** pro Dokument; dann H2, H3, in Reihenfolge, ohne Sprünge.
- **Links beschreiben** ihr Ziel—kein "hier klicken".
- **Code-Blöcke** mit Sprache; **Bilder** mit Alt-Text.
- **Frontmatter** = YAML, validiert, versioniert.
- Regeln und Beispiele unten.

## Vor dem Schreiben

### Konkret

- **Plain Markdown** (überall portabel) oder **MDX** (an React gebunden)?
- Gibt es einen **Styleguide**?
- Welche **Frontmatter-Felder** sind Pflicht?
- Wo leben Medien—Repo, LFS, CDN?

### Meta

- Markdown ist **haltbar**. MDX koppelt Content an Code—nur wenn es sich lohnt.
- Gute Docs überleben Migrationen, weil sie **langweilig** sind.

---

## Zweck

Content, der **lesbar, barrierefrei, durchsuchbar** ist—in Git, Review, IDE und Docs-Site.

---

## 1. Struktur

- Ein `# H1` pro Dokument.
- `##`, `###`, `####` in Reihenfolge, keine Sprünge.
- **Kurze Sätze, kurze Absätze.**
- **Leerzeilen** um Headings, Listen, Code.
- **Listen** für Parallelen; **Tabellen** nur bei echten Zeilen/Spalten.

## 2. Links

- **Zielbeschreibend**.
- **Relative Pfade** im Repo.
- Externe Docs per **kanonischer URL**.

### Schlecht: links

```md
Mehr [hier](https://example.com/guide).
```

### Gut: links

```md
Siehe den [Mozilla — HTTP Accept-Encoding Guide](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/Accept-Encoding).
```

## 3. Code-Blöcke

- Immer **Sprache** angeben.
- Shell: `bash`/`sh`; Config: `yaml`/`toml`/`json`.
- Kurz (<30 Zeilen); lange Programme verlinken.

### Gut: code-blöcke

````md
```ts
const user = await db.user.findUniqueOrThrow({ where: { id } })
```
````

## 4. Bilder/Medien

- Sinnvoller **Alt-Text**; leerer Alt nur bei dekorativ.
- **Width/Height** in MDX-Komponenten gegen CLS.
- Bevorzugt `.webp`/`.avif`; Diagramme `.svg`.
- Große Medien in CDN/LFS, nicht als Binary in `main`.

### Gut: bilder/medien

```md
![Funnel mit 40% Konvertierung in Schritt 1, 18% in Schritt 2](./funnel-q1.webp)
```

## 5. Tabellen

- **Schmal** genug fürs Lesen.
- Header-Zeile; Zahlen rechts, Strings links.
- Mehr als ein Screen? Liste oder Dataset verlinken.

```md
| Metrik | Q1   | Q2   |
|--------|-----:|-----:|
| LCP    | 2,8s | 2,3s |
| INP    | 210ms| 180ms|
```

## 6. Frontmatter

- **YAML** zwischen `---`.
- **Pflicht**: `title`, `description`, `updated`.
- Optional: `tags`, `authors`, `canonical`, `hidden`.
- In CI validieren.

```yaml
---
title: Prompten-Grundlagen
description: Klare Anweisungen für Assistentinnen und Redaktion schreiben.
updated: 2025-04-01
tags: [ai, prompting, documentation]
---
```

## 7. MDX-Komponenten

- Sparsam—jede ist Kopplung.
- Sinnvoll: Callouts (`<Hinweis>`), Tabs, interaktive Demos, Diagramme.
- **Barrierefrei** halten (Tastatur, Fokus, ARIA). Siehe [`barrierefreiheit-im-code.md`](barrierefreiheit-im-code.md).
- **Einfach Props**—Autor\*innen ohne Entwicklerkenntnisse sollen sie bedienen können.

### Gut: mdx-komponenten

```mdx
<Hinweis>
  API-Tokens haben 30 Tage Laufzeit. Monatlich rotieren.
</Hinweis>
```

## 8. Callouts

- **Hinweis**, **Tipp**, **Warnung**, **Deprecated**.
- Konsistenter Ton—keine "WARNUNG" für Kosmetik.

## 9. Versionierung/Changelog

- `CHANGELOG.md` für user-facing Änderungen, datiert.
- Strukturelle Änderungen eigener PR.
- API-Docs an **Version** der API binden.

## 10. Was nicht tun

- **HTML-Suppe** in Markdown.
- Mehrere H1, H3 vor H2.
- **Smart Quotes**, die im Terminal brechen.
- **Externe Scripts** in MDX "für nice-to-have".
- 20 MB PNG im Repo.

---

## Kerngedanke
Markdown ist das **haltbarste Format** für geschriebenes Wissen: überall lesbar, diff-freundlich, durchsuchbar. Plain halten; MDX-Komponenten nur, wenn sie echten Mehrwert bringen.

## Weiterführend
- [CommonMark](https://commonmark.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [MDX](https://mdxjs.com/)
- [A11Y Project — alt text](https://www.a11yproject.com/posts/alt-text/)

---

Englische Version: [`markdown-and-mdx.md`](../../en/coding/markdown-and-mdx.md)
