# Marken-Toolkit und Asset-Bibliothek

**Geltungsbereich:** **Zentral** Logos, Farben, Vorlagen, **freigegebene** Bilder—Governance für kleine Teams. Ergänzt [`design-tokens-und-theming.md`](../design/design-tokens-und-theming.md), [`tonalitaet-und-markenstimme.md`](../sprache-&-kommunikation/tonalitaet-und-markenstimme.md) und [`dateinamen-und-organisation.md`](dateinamen-und-organisation.md).

## Exzerpt

- **Single source of truth** für Logo-Varianten und **Schutzraum**.
- **Farben**: Screen **Hex**; Druck **PMS/CMYK**.
- **Vorlagen** **versionieren**—**Changelog**.
- **Bildarchiv** mit **Rechte**-Metadaten.
- **Zugang**: wer **freigibt**?

## Bevor die Bibliothek wächst

### Konkret

- **Namenskonvention** und **Ordner**.
- **Lizenzen** bei Stock und Aufträgen.

### Meta

- Unauffindbare Bibliothek **frustriert**—**Tags** und **README**.

---

## Zweck

**Einheitliche** Produktion **einfach** machen—**Defaults** schlagen Einzelkämpfer.

---

## 1. Minimum viable Toolkit

### Regel

**Logo-Paket**, **Farbtokens**, **max. 2–3 Schriften**, **Folienmaster**, **Social-Vorlagen**—alles andere ist optionaler Ballast.

### Bad

```text
Logos verstreut in Slack und E-Mail.
```

### Good

```text
Laufwerk `/brand` mit README; semantische Versionen; Owner; Unterordner: logo, colour, type, templates, photography.
```

## 2. Logo-Varianten und Schutzraum

### Regel

**SVG** für Screen und **druckfertige** PDF/PNG wo nötig; **minimalen** Schutzraum und **Don’ts** pro Variante dokumentieren.

### Bad

```text
Ein Raster-Logo auf Plakat — Pixelbrei.
```

### Good

```text
logo_full_colour.svg, logo_mono.svg, logo_white_on_dark.png; README: 0,25× Kap-Höhe Schutzraum; keine Effekte auf Wortmarke.
```

## 3. Farben für Screen und Druck

### Regel

**Hex/RGB** für UI und **PMS/CMYK** für Druck in **derselben** Swatch-Datei—Teams raten nicht mehr.

### Bad

```text
„Unser Blau nutzen“ — fünf verschiedene Blautöne draußen.
```

### Good

```text
tokens.json: primary #1a4d8f; Druck: PMS 294 C; Schwarz für Flächen: rich black vs reines Schwarz dokumentiert.
```

## 4. Versionierte Vorlagen mit Changelog

### Regel

Vorlagen in **datierten oder Semver**-Ordnern; **Changelog** bei Farb- oder Layout-Regeln—alte Kampagnen bleiben reproduzierbar.

### Bad

```text
slides_v2_final.pptx still ersetzt; Events von letztem Jahr sehen falsch aus.
```

### Good

```text
/templates/slides/2025-04-01/README.md — v1.2: neues Deckblatt; v1.1 in /archive.
```

## 5. Bildrechte und Metadaten

### Regel

Jedes freigegebene Bild: **Lizenz**, **Quelle**, **Ablauf**, **Nutzung** (z. B. nur Web)—kein „hübsches Bild von Google“.

### Bad

```text
Stock-Download im Ordner ohne Attribution — rechtliches Risiko.
```

### Good

```text
hero_2025.jpg: Rechte: Shutterstock ID 123; Lizenz bis 2026; Credit-Zeile im Footer; intern OK.
```

## 6. Zugang und Freigaben

### Regel

**Wer** Assets **hinzufügen** darf und **wer** Marken-Ausnahmen **freigibt**—**Lesen** breit, **Schreiben** eng.

### Bad

```text
Alle dürfen nach `/brand` — drei widersprüchliche Logos in einer Woche.
```

### Good

```text
Änderungen: Anfrage in #brand-requests; Comms-Lead genehmigt; Quartals-Review von `/brand`.
```

---

## Typische Stolpersteine

- **Waisen-Assets**—kein Owner, niemand löscht oder aktualisiert.
- **Alte Versionen** gelöscht ohne **Archiv**—Kampagne wird wieder geöffnet, Dateien fehlen.
- **Un dokumentierte** Schriften—Neue*r setzt Arial, Marke bricht.
- **Rechte** ignoriert—Hero-Bild für eine Kampagne, die rechtlich nicht laufen darf.

---

## Kernidee

Marke ist **Ops**: **Dateien**, **Rechte**, **Versionen**, **Owner**.

## Weiterführend

- [Mozilla — Open Design](https://mozilla.design/) — öffentliches Systemdenken
- [W3C — Images of text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html) — wann Text echter Text bleiben muss
- [Open Source Design](https://opensourcedesign.net/) — Muster für kleine Teams

---

Englische Version: [`brand-toolkit-and-asset-library.md`](../../en/media-&-production/brand-toolkit-and-asset-library.md)
