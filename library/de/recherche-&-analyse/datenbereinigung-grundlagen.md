# Datenbereinigung — Grundlagen

**Geltungsbereich:** **Praktische** Bereinigung vor Analysen—Typen, fehlende Werte, Duplikate, einfache Validierung. Ergänzt [`statistik-einfach-lesen.md`](statistik-einfach-lesen.md), [`umfragedesign.md`](umfragedesign.md) und [`notizen-und-synthese.md`](notizen-und-synthese.md).

## Exzerpt

- Zuerst **profilieren**: Werteberichte, fehlende Felder, Distincts.
- **Formate** vereinheitlichen (Datum, Währung, Booleans).
- **Deduplizieren** mit klarer Regel.
- **Fehlende Werte**: Ursachen dokumentieren; Strategie wählen—**nicht** still löschen.
- **Rohdaten** nie überschreiben—**Arbeitskopien**.

## Bevor ihr bereinigt

### Konkret

- **Quellen** und Exportzeitpunkte.
- **Schlüssel** für eindeutige Zeilen.

### Meta

- Bereinigung ist **Analyseentscheidung**—**dokumentieren**.

---

## Zweck

Datensätze **verlässlich genug** zusammenfassen—ohne **versteckte** Transformationen.

---

## 1. Validierung

Plausibilitätsregeln; Ausreißer **flaggen**, nicht heimlich tilgen.

## 2. Fehlende Werte

Je nach Fragestellung Statistik einbeziehen—bei **hohem** Eins Expert*in.

## 3. Was nicht tun

- **Rohexport** zerstören.

---

## Kernidee

Bereinigung macht **Unsicherheit sichtbar**: **was** geändert wurde und **warum**.

## Weiterführend

- [Tidy data — Konzept](https://vita.had.co.nz/papers/tidy-data.pdf)

---

Englische Version: [`data-cleaning-basics.md`](../../en/research-&-analysis/data-cleaning-basics.md)
