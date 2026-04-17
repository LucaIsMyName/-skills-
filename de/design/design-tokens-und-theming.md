# Design-Tokens und Theming

**Geltungsbereich:** **Benennung und Skalierung von Design-Tokens** (Farbe, Abstand, Radius, Typografie) sowie **Hell-/Dunkel-Themes** in digitalen Produkten; kein vollständiges Design-System-Governance und keine Code-Implementierungsdetails (siehe Coding-Skills).

## Exzerpt (zuerst lesen)

- Nutzen für **semantische Tokens** (`color.action.primary`) statt nur Rohwerte (`#3366cc`).
- **Eine Quelle der Wahrheit** für Abstands- und Radius-Skalen; Dark-Mode-Zuordnung neben Light dokumentieren.
- **Nachfragen** nach vorhandenem Token-Set oder Export aus dem Design-Tool, bevor Namen erfunden werden.
- Ausführliche Regeln und Checkliste unten. Verweise: [`design-basics.md`](design-basics.md), [`gute-interfaces-designen.md`](gute-interfaces-designen.md).

## Zweck

Dieser Skill beschreibt, wie **Tokens und Themes** strukturiert werden, damit UI **konsistent, themebar und handoff-fähig** bleibt.

## KI / Prompt: Vollständigkeit vor dem Schreiben

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

### ❌ Schlecht

```text
Hintergrund: #F5F5F5
Abstand: 13px
```

### ✅ Gut

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

### ❌ Schlecht

```text
margin: 17px; padding: 11px;
```

### ✅ Gut

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

👉 Tokens sind **Verträge**. Beschreibt der Name keine **Rolle**, leidet jedes Theme-Update.
