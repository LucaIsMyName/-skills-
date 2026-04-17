# Barrierefreies Design

**Geltungsbereich:** Gilt für die **Design-Seite der Barrierefreiheit**—Layout, Typografie, Farbe, Motion, Affordances, Muster. Ergänzt [`accessibility-in-code.md`](../../en/coding/accessibility-in-code.md) (Engineering) und [`barrierefreiheit-kommunikation.md`](../sprache-und-kommunikation/barrierefreiheit-kommunikation.md) (Text). Pairt mit [`farbe-und-kontrast.md`](farbe-und-kontrast.md), [`typografie.md`](typografie.md), [`motion-und-micro-interactions.md`](motion-und-micro-interactions.md).

## Exzerpt (zuerst lesen)

- **Barrierefreiheit ist Design**, kein Nachklapp. Wer bei Zoom, Reduced Motion oder Tastatur scheitert, hat das Design verfehlt.
- **Trefferflächen** ≥24×24 CSS-Pixel (WCAG 2.2), möglichst ≥44×44. Klickfläche größer als Optik.
- **Kontrast** mindestens AA (4,5:1 Body, 3:1 groß/UI). Siehe [`farbe-und-kontrast.md`](farbe-und-kontrast.md).
- **Kein Signal allein**—jede Farbe/Bewegung/Klang-Information hat Text/Form/Icon-Backup.
- **Reflow, Zoom, reduzierte Bewegung, High Contrast**—für jeden Modus designen, nicht nur Fallback behandeln.
- Regeln, Muster, Warnsignale unten.

## KI / Prompt: vor dem Screen-Mock

Vor UI-Entwurf **Wer und Umstände** klären.

### Konkret

- **Aufgaben**: Was muss die Person erledigen; kritischer Pfad?
- **Hilfsmittel** wahrscheinlich: Screenreader, Sprachsteuerung, Switch, Lupe?
- **Geräte**: Handy, Tablet, Desktop, TV, Kiosk?
- **Umstände**: Sonne, Lärm, einhändig, Stress?
- **Sprachen** und Lesekompetenz der Zielgruppe?

### Meta

- Barrierefreies Design wirkt **für alle besser**. „Einfacher, klarer, größer" ist keine Nische.
- Ein konsequentes Muster schlägt zehn Sonderlösungen.

---

## Zweck

Interfaces so entwerfen, dass sie **von Anfang an für eine breite Bandbreite an Menschen** funktionieren—keine nachgereichte „barrierefreie Version".

---

## 1. Layout und Struktur

- Klare **visuelle Hierarchie**: eine primäre Aktion pro Screen; Größe + Gewicht + Farbe zeigen Bedeutung.
- **Großzügige Abstände** zwischen interaktiven Elementen (mind. 8 px).
- **Lesereihenfolge** entspricht visueller Reihenfolge—links-rechts, oben-unten in LTR.
- **Landmarks** (Header, Nav, Main, Footer) sichtbar unterscheidbar, nicht nur im Code.
- **Konsistenz**: gleiche Aktion sieht überall gleich aus.

## 2. Trefferflächen und Abstände

- Touch-Ziele: **≥44×44 px** empfohlen, **≥24×24 px** Minimum.
- Klick-/Tap-**Padding** oft größer als die Optik—Hit-Area erweitern.
- **Zerstörend** und **harmlos** nicht eng nebeneinander (Löschen neben Speichern).

## 3. Farbe und Kontrast

- Siehe [`farbe-und-kontrast.md`](farbe-und-kontrast.md). WCAG AA mindestens; AAA wo möglich.
- **Dark Mode** ist kein invertiertes Light; neu kalibrieren.
- **High-Contrast-Modus**: OS-Einstellung respektieren.
- Farbe nie als **einziges** Signal.

## 4. Typografie

- **Body 16 px oder größer** im Web; `rem` für Skalierbarkeit.
- **Zeilenlänge** 45–75 Zeichen im Body.
- **Blocksatz** bei schlechter Trennung vermeiden.
- **Minimum-Gewicht** 400 auf hellen Flächen; Hairlines scheitern an Größe und Distanz.
- Siehe [`typografie.md`](typografie.md).

## 5. Fokus und Tastatur

- **Sichtbarer Fokus-Ring** auf jedem interaktiven Element—nie `outline: none` ohne Ersatz.
- Fokus-Ring hat **3:1 Kontrast** gegen Element und Hintergrund.
- **Logische Tab-Reihenfolge** folgt Lesereihenfolge.
- Designs enthalten **Fokuszustände** in Figma/Specs, nicht nur Hover.

## 6. Icons und Bildsprache

- Icon-only-Buttons haben einen **zugänglichen Namen** (Tooltip auf Hover/Fokus + programmatisches Label).
- Icon + Text für primäre Aktionen.
- Dekorative Bilder als solche markiert; informative brauchen echten Alt-Text.
- Dichte Infografiken mit Text-Äquivalent anbieten; siehe [`barrierefreiheit-kommunikation.md`](../sprache-und-kommunikation/barrierefreiheit-kommunikation.md).

## 7. Motion und Animation

- `prefers-reduced-motion` respektieren—Fade oder statischer Zustand, kein Abschalten, das UI zerstört.
- Kein Autoplay-Video mit Ton; nichts blinkendes.
- **Notwendige Bewegung** (Feedback, State-Transitions) statt Parallax oder lange Deko-Motion.
- Siehe [`motion-und-micro-interactions.md`](motion-und-micro-interactions.md).

## 8. Formulare

- **Labels immer sichtbar**, nicht nur als Placeholder.
- **Fehler** inline am Feld, mit Icon und klarer Sprache.
- **Pflicht** ausdrücklich markiert (Wort oder Stern + Legende).
- **Gruppierung** mit Fieldset/Legend im Mock, damit Eng es nachbauen kann.
- Siehe [`formulare-und-eingaben-ux.md`](formulare-und-eingaben-ux.md).

## 9. Content-Muster

- **Einfache Sprache** im Mock—Platzhaltertext zählt (siehe [`einfache-sprache.md`](../sprache-und-kommunikation/einfache-sprache.md)).
- **Leerzustände** mit Aktion und Orientierung, nicht nur Illustration.
- **Ladezustände** mit Fortschritt; Skelette statt Spinnern für bekannte Formen.
- **Fehlerzustände** benennen Ursache und Weg.

## 10. Zoom, Reflow, kleine Screens

- Inhalt funktioniert bei **320 px Breite** ohne Horizontal-Scroll.
- **200 % Zoom** ohne Abschneiden; **400 % Reflow** für WCAG 1.4.10.
- Fixe Header auf Scroll verkleinern/verbergen—nicht den Screen fressen.
- Nicht auf Hover verlassen—Touch, Tastatur, Hilfsmittel haben keinen Hover.

## 11. Sprache und Lokalisierung

- Text wird 20–40 % länger auf Deutsch vs. Englisch; Platz lassen.
- **RTL** spiegelt Layout, nicht nur Text.
- **ICU-Message** Platzhalter im Mock, keine hart kodierten Pluralformen.
- Datums-/Zahlenformate lokalisiert.

## 12. Warnsignale im Design-Review

- Dünner grauer Text auf Weiß als „Minimalismus".
- Primäre Aktion nicht unterscheidbar von sekundärer.
- Tooltip-only-Labels für Icons.
- Fokuszustand fehlt vollständig in der Datei.
- Tabelle mit reiner Farb-Kodierung der Kategorie.
- Modal ohne sichtbaren Close-Button für Tastatur.

---

## Kerngedanke

Barrierefreies Design ist **erster Durchgang, nicht letzter**. „Funktioniert für mehr Menschen" schlägt „für die meisten plus Workaround"—und nebenbei wird das Produkt für alle besser.

---

English version: [`design-accessibility.md`](../../en/design/design-accessibility.md)
