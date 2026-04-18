# Typografie

**Geltungsbereich:** Gilt für **Schriftsetzung in UI, Web, Print und Folien**—Skala, Hierarchie, Paarung, Ziffern, Lesbarkeit. Nicht komplettes Brand-Handbuch (siehe `markenrichtlinien-erstellen.md`). Ergänzt [`design-basics.md`](design-basics.md), [`design-tokens-und-theming.md`](design-tokens-und-theming.md), [`gute-interfaces-designen.md`](gute-interfaces-designen.md).

## Exzerpt
- **Lesbarkeit zuerst, Stil danach.** Wer zweimal liest, hat die Schrift schon verloren.
- **Eine Schrift reicht**, zwei sind ein System, drei sind ein Problem.
- **Skala als Verhältnis** (Modular Scale), nicht geraten. Sechs bis acht Stufen reichen für UI + Langtext.
- **Zeilenlänge** 45–75 Zeichen; **Durchschuss** 1,4–1,6 × Schriftgröße.
- **Ziffern**: Tabellenziffern in Tabellen und Beträgen, Proportionalziffern im Fließtext.
- Regeln, Beispiele, Paarungen unten.

## Vor der Schriftwahl

Vor Auswahl/Spezifikation **Medium, Publikum, Bedingungen** klären.

### Konkret

- **Medium**: Bildschirm (Web, App, TV), Print, Folien, Beschilderung.
- **Publikum**: Lesekompetenz, Sprachen, Alter, Hilfsmittel.
- **Sprachen/Schriften**: Latin erweitert, Kyrillisch, Griechisch, Arabisch, CJK?
- **Lizenz**: Web + Desktop + App, Nutzungsumfang, Seats.
- **Größenbereich** in realer Nutzung (Buttons, Captions, Body, Headlines)?

### Meta

- Eine „schöne" Schrift, die bei 14 px unlesbar ist, ist die falsche.
- Typografie ist **Barrierefreiheit**, nicht nur Ästhetik.

---

## Zweck

Schriften so wählen und setzen, dass Text **leicht lesbar, klar gegliedert und konsistent** ist.

---

## 1. Schriftwahl nach Zweck

- **Body**: humanistische Serifenlose (Inter, Source Sans, IBM Plex Sans) oder Textserif (Source Serif, Charter) je nach Ton. Muss in kleinen Größen sauber rendern.
- **Display / Headline**: mehr Persönlichkeit; sollte zur Not auch in Body-Größe funktionieren.
- **Monospace**: für Code, Tabellenziffern wo Proportional nicht reicht, Metadaten (IBM Plex Mono, JetBrains Mono).
- **Eine Familie reicht oft**—gute Superfamilien decken Display, Body, Mono ab.

## 2. Typ-Skala

**Modular Scale** mit festem Verhältnis. Üblich: 1,125, 1,2, 1,25.

Beispiel (Basis 16 px, 1,25):

```
xs   12,8
sm   14,4
md   16   ← Body
lg   20
xl   25
2xl  31
3xl  39
4xl  49
5xl  61
```

Auf sinnvolle px/rem runden; als **Tokens** ablegen (siehe [`design-tokens-und-theming.md`](design-tokens-und-theming.md)).

## 3. Hierarchie

- **Größe + Gewicht + Farbe + Raum** zusammen—nie Größe allein.
- Headline-Gewicht 600–700 in Body-Größen; 500–600 in großem Display.
- Body-Gewicht 400; 500 für Betonung, wenn Fett zu viel ist.
- Höchstens **drei** Gewichte in einem Fließtext.

## 4. Zeilenlänge und Durchschuss

- **Zeilenlänge** 45–75 Zeichen für Body; kürzer (30–50) für Captions, bis 90 für Monospace/Breitlayout.
- **Durchschuss** 1,4–1,6 für Body; 1,15–1,3 für Display; 1,0 für winzige Labels.
- **Laufweite**: Display leicht anziehen (−1 % bis −3 %), VERSALIEN öffnen (+5 % bis +10 %).
- **Absatzabstand** etwa eine Zeilenhöhe; nicht Einzug + Abstand gleichzeitig.

## 5. Ausrichtung und Flattersatz

- **Linksbündiger** Flattersatz als Standard; Silbentrennung in UI meist aus.
- **Blocksatz** nur mit guter Trennung und ausreichend Breite (Print, Editorial).
- **Zentriert** sparsam—Titel, kurze Captions; nie Fließtext.
- **Schusterjungen/Hurenkinder** vermeiden (`text-wrap: balance`, weiche Trennung).

## 6. Ziffern

- **Proportional, Mediäval** im Fließtext, wo gestützt.
- **Tabellen, Versalziffern** in Tabellen, Preisen, Daten, Dashboards.
- OpenType-Features in CSS aktivieren (`font-variant-numeric: tabular-nums`).

## 7. Zwei Schriften paaren

- **Kontrast oder Familie**—nicht beides. Serif-Body + Sans-Display, oder zwei klar unterschiedliche Sans.
- **X-Höhe und optische Größe** abgleichen.
- In den realen Größen testen (Display 48 px + Body 16 px).

## 8. Mehrsprachigkeit

- Schriftdeckung für jede Sprache prüfen; Fallback-Stacks ähnlich genug, damit Layouts nicht springen.
- **Diakritika** (ä, č, ñ) mit dem echten Wortschatz testen.
- **Deutsch**: lange Komposita brauchen Trennung (`hyphens: auto` + `lang="de"`).
- **RTL** (Arabisch, Hebräisch): andere Grundlinien und Durchschuss; Latin-Werte nicht übertragen.

## 9. Barrierefreiheit

- **Body mindestens 16 px** im Web, auch mobil.
- **Blocksatz** mit schlechter Trennung vermeiden (Flüsse erschweren Dyslexie).
- **VERSALIEN** nicht für lange Passagen; Labels mit Sperrung ok.
- **Kontrast** AA (4,5:1 Body, 3:1 groß)—siehe [`farbe-und-kontrast.md`](farbe-und-kontrast.md).
- **Nutzer:innen-Schriftgröße** respektieren—`rem`.

## 10. Icons und Typografie

- Icons optisch auf Grundlinie; `currentColor` für Erbung.
- Icon-Größen aus der gleichen Skala (16, 20, 24 px).
- Textlabel, wo die Bedeutung nicht offensichtlich ist.

## 11. Print

- In Punkten, nicht Pixeln; Body 9–11 pt, Headlines ab 16 pt.
- **Durchschuss** min. 1,2× Body (enger als Bildschirm).
- **Papierkontrast**: #333 auf Papier ≠ #333 am Bildschirm—dunkler ansetzen.
- Bei **realer Distanz** prüfen.

## 12. Häufige Fehler

- Drei oder mehr Schriften in einem Dokument.
- **Enge Kursiv-Zeilen** Body über volle Breite—mühsam.
- **VERSALIEN-Absätze** für „Betonung".
- **Winzige 10 px** im Web für „dichte" UIs.
- **Ziffernmix** im Dashboard (Proportional + Tabellen).

---

## Kerngedanke

Gute Typografie ist **unsichtbar**—gelesen wird der Inhalt, nicht die Schrift. Lesbare Familie, ruhige Skala, **Rhythmus und Hierarchie** machen die Arbeit.

## Weiterführende Links

- [MDN — CSS und Textgestaltung](https://developer.mozilla.org/de/docs/Learn/CSS/Styling_text) — Grundlagen zu Schriftgrößen und Layoutwechselwirkungen
- [Microsoft Learn — OpenType-Spezifikation](https://learn.microsoft.com/en-us/typography/opentype/spec/) — Referenz für Features und Kodierung (englisch)
- [W3C WAI — Understanding 1.4.12 Textabstände](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) — Mindestabstände bei Nutzer:innen-Overrides

## Weiterführend

- Nutze die verwandten Seiten im Geltungsbereich fuer vertiefende Beispiele und angrenzende Workflows.

---

Englische Version: [`typography.md`](../../en/design/typography.md)
