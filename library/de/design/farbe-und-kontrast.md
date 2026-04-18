# Farbe und Kontrast

**Geltungsbereich:** Gilt für **Farbwahl und -einsatz** in UI, Web, Print und Datengrafiken—inklusive Kontraste, semantische Rollen, Theming. Ergänzt [`design-tokens-und-theming.md`](design-tokens-und-theming.md), [`barrierefreies-design.md`](barrierefreies-design.md), [`datenvisualisierung-grundlagen.md`](datenvisualisierung-grundlagen.md).

## Exzerpt (zuerst lesen)

- **Semantische Rollen statt Hex-Werten.** Farben nach **Funktion** benennen (`surface`, `text`, `accent`, `danger`), nicht nach Hue (`blue-500`).
- **Kontrast zuerst.** WCAG AA: 4,5:1 für Body, 3:1 für große Schrift und UI. Vor Palettenliebe prüfen.
- **Farbe nie allein.** Mit Icon, Text oder Form koppeln—farbenblinde Nutzer:innen und Graustufendrucke existieren.
- **Kleine Palette, klarer Einsatz.** Weniger Farben konsequent schlägt Spektrum zufällig.
- Regeln, Paletten, Werkzeuge unten.

## Vor der Farbfestlegung

Vor Hex-Werten **Rollen, Umgebungen, Nutzer:innen** klären.

### Konkret

- **Rollen**: Surface(s), Text, Muted, Border, Accent, Info, Success, Warning, Danger.
- **Umgebungen**: Hell, Dunkel, High-Contrast, Print, reduzierte Farben.
- **Zustände** interaktiver Elemente: Default, Hover, Focus, Active, Disabled.
- **Kontrastanforderung** (AA Standard, AAA wo nötig).
- **Kulturelle/Branchenkonventionen** (Rot/Grün in Finanz, Warnfarben, kommunale Paletten).

### Meta

- Schöne Palette + Kontrast-Fail = Design-Fail—überarbeiten.
- Dark Mode ist kein Invertieren, sondern ein eigener Designdurchgang.

---

## Zweck

Ein Farbsystem bauen, das **barrierefrei, konsistent und bedeutungsvoll** ist—über Themes, Print, Charts und unterschiedliche Bildschirme.

---

## 1. Semantische Rollen

Rollen vor Hues:

| Rolle | Beispielnutzung |
|---|---|
| `surface` | Seitenhintergrund |
| `surface-muted` | Cards, Panels |
| `border` | Trennlinien, Kanten |
| `text` | primärer Text |
| `text-muted` | Sekundärtext, Labels |
| `text-inverse` | auf dunklen Flächen |
| `accent` | Markenfarbe / primäre Aktion |
| `info` | neutral informativ |
| `success` | bestätigend |
| `warning` | Vorsicht, prüfen |
| `danger` | Fehler, zerstörerisch |
| `focus` | Fokus-Ring |

Als Tokens ablegen; siehe [`design-tokens-und-theming.md`](design-tokens-und-theming.md).

## 2. Palette als Skala

- Primär-Hue wählen, **9–12 Stufen** generieren (50, 100, 200 … 900).
- Gleiches Vorgehen für Neutralen (Grau) und jede semantische Farbe.
- **Wahrnehmungsgleiche Schritte**—OKLCH oder LCH statt naiver HSL.

## 3. Kontrast

- **AA Body**: 4,5:1 gegen Hintergrund.
- **AA große Schrift** (≥18 px fett oder 24 px regulär): 3:1.
- **AA UI/grafische Objekte**: 3:1 (Rahmen, Icons, Fokus).
- **AAA** (7:1 / 4,5:1) für Langtext, Behörde, Gesundheit, komplexe Formulare wo möglich.

Werkzeuge: Browser-DevTools, Stark, Figma-Plugins, `@adobe/leonardo`, WebAIM Contrast Checker.

## 4. Nie Farbe allein

- Formularfehler: roter Rahmen **+** Fehler-Icon **+** Text.
- Chart-Serien: Farbe **+** Muster/Symbol **+** direkte Beschriftung.
- Pflichtfeld: Stern **+** „Pflicht"-Label im Tooltip oder Helfer-Text.

UI in Graustufen und mit Farbblindsimulatoren testen (Deuter-, Prot-, Tritanopie).

## 5. Hell- und Dunkelmodus

- **Token-Paare** je Modus: `--surface-light: #fff; --surface-dark: #0b0d10;` über die Rolle angesprochen.
- **Kontrast neu kalibrieren**—Reines Weiß auf fast Schwarz ist anstrengend; Off-White (z. B. `#e8e9eb`).
- **Akzente** oft anders: Brand-Blau, das auf Weiß gut ist, „glüht" auf Schwarz—entsättigen/aufhellen.
- **Schatten** schwach im Dunkeln; stattdessen hellere Surfaces („Elevation durch Helligkeit").

## 6. Brand- vs. UI-Farbe

- Brand-Farbe ist **ein Anwendungsfall**, nicht die ganze UI.
- Brand oft zu gesättigt für große Flächen—für Akzente, Buttons, Hervorhebungen.
- Neutrale neutral halten; Brand-gefärbte Graus nur, wenn die Marke es verlangt.

## 7. Charts und Daten

- Qualitativ (Kategorien): bis 8 unterscheidbare Farben; mehr = Muster oder gruppieren.
- Sequentiell (niedrig → hoch): einzelne Farbe in perzeptueller Rampe (Viridis, Cividis, Mako).
- Divergierend (unter/über): zwei Hues mit neutralem Mittelpunkt.
- **Farbblind-sicher** per Default (Rot/Grün-Paare ohne Backup vermeiden).
- Siehe [`datenvisualisierung-grundlagen.md`](datenvisualisierung-grundlagen.md).

## 8. Print und Physisches

- **CMYK** kleiner als RGB—viele grelle Bildschirm-Farben werden stumpf.
- Papier: unbeschichtet saugt, Farben wirken dunkler, weicher.
- **Proof** vor großer Auflage; auf echtem Papier prüfen.
- Ein bis zwei **Sonderfarben** für konsistentes Brand-Gefühl.

## 9. Tooling und Tokens

- Tokens (hell/dunkel/High-Contrast) aus einer Quelle, CSS-Variablen und Tailwind-Config ableiten.
- **Semantisch** benennen (`--color-text-muted`), nicht nach Hue.
- Audit: quartalsweise Roh-Hex im Code suchen—sollte selten sein.

## 10. Häufige Fehler

- Zwei fast gleiche Blautöne.
- „Accent" = „Danger" in einem Screen.
- Dark Mode als `filter: invert()` ohne Nachjustierung.
- Default-Chart-Farben ohne Farbblind-Prüfung.
- Text auf Foto ohne Scrim/Overlay (bei vielen Crops unlesbar).

---

## Kerngedanke

Ein gutes Farbsystem ist **eine kurze Liste klar definierter Rollen**, mit zugänglichem Kontrast in jedem Modus, immer gleich verwendet. Schönheit folgt hier der Disziplin—nicht umgekehrt.

## Weiterführende Links

- [W3C WAI — Understanding 1.4.3 Kontrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — Messlogik für Fließ- und großen Text
- [W3C WAI — Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) — UI-Teile, Diagramme und Bedienelemente
- [W3C — CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) — moderne Farbräume (z. B. OKLCH) in aktuellen Tools

---

English version: [`color-and-contrast.md`](../../en/design/color-and-contrast.md)
