# Dateinamen und Organisation

**Geltungsbereich:** **Konventionen** für Medienprojekte—lesbar für Mensch und Maschine. Ergänzt [`marken-toolkit-und-asset-bibliothek.md`](marken-toolkit-und-asset-bibliothek.md), [`git-und-commits.md`](../coding/git-und-commits.md) und [`video-produktion-grundlagen.md`](video-produktion-grundlagen.md).

## Exzerpt
- Muster: `YYYY-MM-DD_projekt_teil_v02.ext`
- **Keine** Leerzeichen; `-` oder `_` **konsistent**.
- **Versionen** statt „final_final“.
- **Master** getrennt von **Exporten**.
- **README** im Ordner—**Inhalt**, **Owner**.

## Vor dem Projektordner

### Konkret

- **Codec**/Container-Defaults; **Farbraum**-Notiz.
- **Archiv** nach Kampagne.

### Meta

- **Zukunfts-Ich** liest mit—**beschriften**.

---

## Zweck

Dateien in **Sekunden** finden—**Onboarding** lebt davon.

---

## 1. Vorhersagbares Muster: Datum, Slug, Version

### Regel

**`YYYY-MM-DD_kurz-slug_element_v02.ext`** so sortieren Listen zeitlich und Namen bleiben bei Exporten eindeutig.

### Gut: vorhersagbares muster: datum, slug, version

```text
edit3 (1).mov
final_final_v4_REALFINAL.psd
```

### Gut: vorhersagbares muster: datum, slug, version

```text
2025-04-18_riverside-interview_camA_v03.wav
2025-04-18_riverside-interview_master_v01.prproj
```

## 2. Slugs: keine Leerzeichen, ein Trenner-Stil

### Regel

**Bindestrich oder Unterstrich** konsistent im Projekt—**keine** Leerzeichen und kein Mix aus Sonderzeichen in Maschinenpfaden.

### Gut: slugs: keine leerzeichen, ein trenner-stil

```text
Sommerkampagne / Hero-Bild / neu (bitte dieses).png
```

### Gut: slugs: keine leerzeichen, ein trenner-stil

```text
2025-06-01_summer-campaign_hero_16x9_v02.png
```

## 3. Master getrennt von Exporten

### Regel

**Verlustfreie oder Projektquellen** unter `/masters` (o. Ä.), **komprimierte Deliverables** unter `/export`—**niemals** die einzige Quelle überschreiben.

### Gut: master getrennt von exporten

```text
JPEG-Export über geschichtetes PSD gelegt, um „Platz zu sparen“.
```

### Gut: master getrennt von exporten

```text
/masters/2025-04-18_interview_roughcut.prproj
/export/2025-04-18_interview_h264_web.mp4
```

## 4. README und Ownership oben

### Regel

**Eine README** im Projektroot: Zweck, **Namensregeln**, **Codec-Defaults**, **wer** pflegt.

### Gut: readme und ownership oben

```text
Ordner mit 400 Dateien; Neue*r fragt eine Woche „was ist kanonisch?“ in Slack.
```

### Gut: readme und ownership oben

```text
README.md: „Audio: 48 kHz WAV-Master; Export AAC 256k; Owner: Alex; nach Kampagne nach /archive/2025-q2.“
```

## 5. Archiv und Übergabe nach der Kampagne

### Regel

Festlegen, **wohin** abgeschlossene Projekte und **wie lange** Arbeitsdateien—sonst wird die Platte zum Friedhof.

### Gut: archiv und übergabe nach der kampagne

```text
Alles bleibt ewig „Aktiv“; drei Jahre „final“-Ordner.
```

### Gut: archiv und übergabe nach der kampagne

```text
Nach Kampagne: nach /archive/2025-summer-campaign; README mit Aufbewahrung; Master 2 Jahre, Exporte 5 Jahre.
```

---

## Typische Stolpersteine

- **„Final“ im Dateinamen**—Versionschaos; immer `v01`, `v02`.
- **Persönliche Ordner** als einzige Struktur—`janes_stuff`—Projekte überdauern Personen.
- **Ein gemeinsames „Misc“**—dort verschwinden Assets.
- **Quelle überschrieben**, weil Export „schnell“ war.

---

## Kerngedanke
Namen sind **günstige Metadaten**—**sofort** investieren.

## Weiterführend

- [Stanford — Data management](https://library.stanford.edu/research/data-management-services) — Disziplin bei Namen
- [Google — File naming conventions](https://developers.google.com/style/filenames) — maschinenfreundliche Muster
- [GOV.UK — Organising files](https://www.gov.uk/government/publications/open-standards-for-government/describing-documents-and-files) — Konsistenz für gemeinsame Laufwerke

---

Englische Version: [`file-naming-and-organising.md`](../../en/media-&-production/file-naming-and-organising.md)
