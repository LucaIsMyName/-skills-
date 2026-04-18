# Coding Best Practices

**Geltungsbereich:** Gilt für **allgemeine Softwarequalität** in Anwendungscode (jede Sprache/jedes Framework); nicht für Security-Audits, Infrastruktur oder Operations. Diese Seite ist die **Übersicht**—die nummerierten Regeln stehen in den verlinkten Teilen. Kombiniere mit [`coding-stil-und-struktur.md`](coding-stil-und-struktur.md), [`coding-fehler-validierung-und-state.md`](coding-fehler-validierung-und-state.md) und [`coding-tests-und-gewohnheiten.md`](coding-tests-und-gewohnheiten.md).

## Exzerpt

- **Drei Teile**: Stil und Struktur → Fehler, Validierung, vorhersehbarer Datenfluss → Tests, Konsistenz, Kommentare, Skalierung.
- **Einfachheit und Benennung** vor Optimierung oder Abstraktion.
- **Querverweise** zwischen den Teilen; der Reihe nach oder gezielt springen.
- Gleiche Inhalte wie zuvor—aufgeteilt für bessere Navigation.

## Vor dem Refactoring

### Konkret

- Welcher **Teil** passt zum aktuellen Problem (Lesbarkeit vs Grenzen vs Tests)?
- Ändert ihr **geteiltes** Verhalten—dann Teil 2 und 3 berücksichtigen.

### Meta

- Langweiliger, offensichtlicher Code ist oft **guter** Code.

---

## Zweck

Wartenden einen **kurzen Einstieg** in vertiefte Gewohnheiten geben—ohne ~500 Zeilen auf einer Seite.

---

## Teile

1. [**Coding Stil und Struktur**](coding-stil-und-struktur.md) — Haltung, Einfachheit, Lesbarkeit, SRP, Verschachtelung, DRY, Abstraktion, Benennung.
2. [**Coding Fehler, Validierung und State**](coding-fehler-validierung-und-state.md) — kleine Funktionen, Seiteneffekte, Fehler, Validierung, Datenfluss.
3. [**Coding Tests und Gewohnheiten**](coding-tests-und-gewohnheiten.md) — was testen, wann optimieren, Konsistenz, Kommentare, Feature-Struktur, Fußangeln, weiterführende Links.

---

## Core idea

Guter Code ist **einfach, lesbar und explizit**—wähle den Teil mit Tiefe, den du brauchst, und setze ihn um.

---

Englische Version: [`coding-best-practices.md`](../../en/coding/coding-best-practices.md)
