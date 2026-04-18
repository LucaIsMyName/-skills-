# Design-Tokens und Theming

**Geltungsbereich:** **Benennung und Skalierung von Design-Tokens** (Farbe, Abstand, Radius, Typografie) sowie **Hell-/Dunkel-Themes** in digitalen Produkten; kein vollständiges Design-System-Governance und keine Code-Implementierungsdetails (siehe Coding-Skills).

## Exzerpt
- Nutzen für **semantische Tokens** (`color.action.primary`) statt nur Rohwerte (`#3366cc`).
- **Eine Quelle der Wahrheit** für Abstands- und Radius-Skalen; Dark-Mode-Zuordnung neben Light dokumentieren.
- **Nachfragen** nach vorhandenem Token-Set oder Export aus dem Design-Tool, bevor Namen erfunden werden.
- Ausführliche Regeln und Checkliste unten. Verweise: [`design-basics.md`](design-basics.md), [`gute-interfaces-designen.md`](gute-interfaces-designen.md).

## Zweck

Dieses Dokument beschreibt, wie **Tokens und Themes** strukturiert werden, damit UI **konsistent, themebar und handoff-fähig** bleibt.

## Vollständigkeit vor dem Schreiben

### Konkret

- **Plattform** (Web, iOS, Android, Multi)
- **Vorhandene Token-Datei oder Figma-Variablen** (einfügen oder beschreiben)
- **Markenvorgaben** (feste Palette, Kontrastanforderungen)

### Meta

- **Dark Mode** nötig? Standard-Theme?
- **Dichte** (kompakt vs. komfortabel) falls relevant

---

## Grundregeln

### 1. Semantische Namen statt Rohwerte

### Schlecht: grundregeln

```text
Hintergrund: #F5F5F5
Abstand: 13px
```

### Gut: grundregeln

```text
Hintergrund: color.surface.default
Abstand: space.3   /* z. B. 12px bei 4px-Raster */
```

---

### 2. „Rolle“ von „Palette“ trennen

**Semantische Rollen** (text.primary, border.subtle) auf Paletteneinträge abbilden, damit Themes tauschbar bleiben.

---

### 3. Gebundene Skala nutzen

Abstand und Radius aus einem **kleinen Satz Stufen** (z. B. 4, 8, 12, 16, 24, 32), nicht beliebige Zahlen.

### Schlecht: grundregeln

```text
margin: 17px; padding: 11px;
```

### Gut: grundregeln

```text
margin: space.4; padding: space.3
```

---

### 4. Dark Mode: Semantik neu mappen

Nicht nur Hex tauschen—**Elevation, Ränder, Fokus** für dunkle Flächen anpassen.

---

### 5. Token-Tabelle dokumentieren

Eine Übersicht: **Tokenname → Wert → Verwendung** verhindert Drift zwischen Design und Code.

---

## Checkliste

- [ ] Semantische Namen für Farben, Abstand, Radius, Typografie-Rollen
- [ ] Hell und Dunkel (falls nötig) für Fläche/Text/Rand/Fokus definiert
- [ ] Abstand und Radius auf dokumentierter Skala
- [ ] Keine doppelten „fast gleichen“ Werte ohne Token
- [ ] Bei Bedarf Verknüpfung mit Komponentenbeschreibung

---

## Abschließender Gedanke

 Tokens sind **Verträge**. Beschreibt der Name keine **Rolle**, leidet jedes Theme-Update.

## Weiterführende Links

- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) — Austauschformate und Interoperabilität
- [Design Tokens Format (Entwurf)](https://www.designtokens.org/tr/drafts/format/) — Konventionen für Tools und Code
- [W3C — CSS Custom Properties](https://www.w3.org/TR/css-variables-1/) — typische Web-Laufzeitschiene unter Token-Pipelines

---

## Kerngedanke

Diese Seite bietet praxisnahe Orientierung zu design-tokens und theming in klaren, wiederverwendbaren Schritten.

## Weiterführend

- Nutze die verwandten Seiten im Geltungsbereich fuer vertiefende Beispiele und angrenzende Workflows.

---

Englische Version: [`design-tokens-and-theming.md`](../../en/design/design-tokens-and-theming.md)
