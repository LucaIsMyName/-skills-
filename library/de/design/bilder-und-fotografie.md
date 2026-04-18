# Bilder und Fotografie

**Scope:** Gilt für **Auswahl, Bearbeitung, Einsatz** von Fotos und Bildern in NGO/Produkt-Kontexten—Ethik, Einwilligung, Beschnitt, Bildunterschriften, A11y, Dateihandling. Keine Studio-Technik, keine Brand-Illustration. Kombiniere mit [`bildethik-und-bildsprache.md`](../medien-&-produktion/bildethik-und-bildsprache.md), [`bild-und-zitatfreigaben.md`](../ethik-&-recht/bild-und-zitatfreigaben.md), [`fotografie-fuer-ngos.md`](../medien-&-produktion/fotografie-fuer-ngos.md) und [`performance-und-web-vitals.md`](../coding/performance-und-web-vitals.md).

## Excerpt

- **Einwilligung zuerst.** Kein Bild identifizierbarer Personen ohne aktuelle Freigabe.
- **Würde zuerst.** Kein Leid-als-Selbstzweck; Menschen als Protagonist\*innen, nicht Requisiten.
- **Kontext zählt**: Caption, Alt, Quelle, Datum.
- **Technische Disziplin**: richtig groß, komprimiert, web-formatiert; EXIF datenschutzprüfen.
- **Stock** ok, wenn ehrlich; nicht als eigene Betroffene ausgeben.

## Vor dem Einsatz

### Konkret

- **Freigabe** für Identifizierbare vorhanden? Noch gültig?
- **Caption** wahr und konkret?
- **Alt-Text** sinnvoll?
- Datei **komprimiert**, richtige Größe?

### Meta

- Fotos sind **Macht**. Wer schaut wen wie an?
- Unklares Bild wird morgige Beschwerde; sorgfältiges Bild baut Vertrauen.

---

## Zweck

Bilder nutzen, um **mit Würde die Wahrheit zu zeigen**.

---

## 1. Einwilligung und Freigaben

- **Schriftliche Freigabe** für identifizierbare Personen, v. a. Kinder/Schutzbedürftige.
- Freigabe nennt **wo** (Website, Reports, Social, Presse) und **wie lange**.
- **Widerruf**: zügig entfernen (Cache/CDN).
- Kinderschutz, Medizin, Asyl: extra Vorsicht, oft **kein Bild**.
- Siehe [`bild-und-zitatfreigaben.md`](../ethik-&-recht/bild-und-zitatfreigaben.md).

## 2. Ethik und Bildsprache

- **Protagonist\*innen**, keine Objekte.
- **Kein "Elendsporno"**.
- **Keine Klischees**—Schattenriss-Kind, "Hoffnungsblick in die Sonne".
- **Lokale Fotograf\*innen** nach Möglichkeit.
- Siehe [`bildethik-und-bildsprache.md`](../medien-&-produktion/bildethik-und-bildsprache.md).

## 3. Bildunterschriften

Caption beantwortet: **wer, was, wo, wann**, ggf. **warum**.

### Schlecht

```
Glückliches Kind.
```

### Gut

```
Aisha, 9, im Nachmittagsangebot, Nairobi, März 2025.
Foto: Kwame Mensah.
```

- **Echte Namen** bei Freigabe; "Name geändert" sonst.
- **Datum, Ort** für Journalistik.
- **Fotograf*innen** nennen.
- Emotion **nicht erfinden**.

## 4. Alt-Text

- **Beschreibt**, was zu sehen ist (ein Satz).
- **Zweckabhängig**.
- **Dekorativ** → `alt=""`.
- **Bild-Text** → im Alt wiederholen.

### Gut

```html
<img src="funnel-q1.webp"
     alt="Liniendiagramm: Konvertierung steigt von 12% im Januar auf 18% im März 2025."
     width="800" height="400">
```

## 5. Beschnitt/Retusche

- **Crop** auf Subjekt/Handlung; keine identifizierenden Teile wegschneiden.
- Keine **verfälschende Retusche** (Tränen hinzufügen, Kontext entfernen).
- Belichtung/Farbe korrigieren ist ok; **Compositing** nicht.
- **Originale** behalten; non-destruktiv.

## 6. Technik

- **Formate**: `.webp`/`.avif` für Foto, `.svg` Vektor, `.png` UI mit Transparenz.
- **Größen**: mehrere Auflösungen via `srcset`; nie 4000px als Thumb.
- **Kompression**: `sharp`, `mozjpeg`, `squoosh`—visuell verlustfrei.
- **Farbraum**: sRGB fürs Web.
- **Dateinamen**: kebab-case, beschreibend. Siehe [`dateinamen-und-organisation.md`](../medien-&-produktion/dateinamen-und-organisation.md).

## 7. EXIF/Metadaten

- **GPS strippen** vor Publikation—schützt Personen.
- Fotograf*innen-Credit, Copyright, Caption-Metadaten behalten (IPTC).
- CMS prüfen: strippt oder behält es?

## 8. Stock

- **Ehrlich** nutzen, klar illustrativ.
- **Klischees** meiden.
- **Lizenz** prüfen—NGO/kommerziell?
- **Diversität** beachten.

## 9. Galerien/Hero/Performance

- Hero ist oft **LCP**—preloaden.
- Below-the-fold lazy-loaden.
- **Aspect-Ratio** halten gegen CLS.
- **Light/Dark** Varianten bei Kontrast-Problemen.
- Siehe [`performance-und-web-vitals.md`](../coding/performance-und-web-vitals.md).

## 10. Was nicht tun

- Identifizierbare Kinder ohne konkrete Freigabe.
- **Archivbilder** mit aktueller Caption.
- **Credit** entfernen, weil "cleaner".
- **Close-ups** von verletzlichen Momenten für Spendenbanner.
- Bilder nach **Widerruf** stehen lassen.

---

## Core idea

Bilder sagen, **wer diese Menschen sind und wie ihr sie seht**. Mit Einwilligung, Kontext, Handwerk und Kompression. Das Vertrauen aus einem sorgfältigen Bild wirkt über Kampagnen hinaus.

## Further reading

- [Save the Children — Image guidelines](https://www.savethechildren.net/)
- [IFRC — Ethical photography](https://www.ifrc.org/)
- [WCAG — Images](https://www.w3.org/WAI/tutorials/images/)
- [web.dev — Responsive images](https://web.dev/learn/design/responsive-images/)

---

Englische Version: [`images-and-photography.md`](../../en/design/images-and-photography.md)
