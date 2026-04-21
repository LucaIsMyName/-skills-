# Coding Tests und Gewohnheiten

## Geltungsbereich:

Gilt für **Testfokus, Performance-Disziplin, Konsistenz, Kommentare und Layout** bei wachsendem Code. Nicht CI/CD-Setup, nicht QA-Prozess. Kombiniere mit [`coding-stil-und-struktur.md`](coding-stil-und-struktur.md), [`coding-fehler-validierung-und-state.md`](coding-fehler-validierung-und-state.md) und [`coding-best-practices.md`](coding-best-practices.md).

## Exzerpt

- **Geschäftsregeln und Grenzfälle testen**—nicht jeden Getter.
- **Erst messen, dann optimieren**; Stil im Repo einheitlich.
- **Kommentare erklären warum**; bei Wachstum nach Feature strukturieren.

## Vor Teamgewohnheiten

### Konkret

- Welche **Risiken** verdienen diesen Sprint einen Regressionstest?
- Passt die **Ordnerstruktur** noch zu Team-Verantwortung?

### Meta

- Konsistenz ist Freundlichkeit für die nächste Leserin.

---

## Zweck

Code **wartbar** halten, wenn Team und Produkt wachsen.

---

## 13. Tests für Logik schreiben

### Regel

Wichtige Logik testen, nicht Trivialitäten.

### Fokus:

- Geschäftsregeln
- Grenzfälle
- Fehlerpfade

Tests geben Refactoring-Vertrauen.

---

## 14. Später optimieren

### Regel

Zuerst zum Laufen bringen → korrekt machen → dann optimieren.

### Schlecht: später optimieren

Überall vorzeitig optimieren

### Gut: später optimieren

Erst messen, dann Engpässe optimieren

Die meiste Codebasis braucht keine Mikro-Optimierung.

---

## 15. Konsistenz schlägt Perfektion

### Regel

Im gesamten Codebase konsistente Muster.

Auch wenn etwas nicht ideal ist, bringt Konsistenz:

- bessere Lesbarkeit
- weniger kognitive Last

---

## 16. Kommentare: gezielt einsetzen

### Regel

**Warum** erklären, nicht **was**.

### Schlecht: kommentare: gezielt einsetzen

```ts
// increment i
i++;
```

### Gut: kommentare: gezielt einsetzen

```ts
// Workaround: API liefert doppelte Einträge
```

Code erklärt das Was; Kommentare die Absicht.

---

## 17. Nach Feature strukturieren (bei Wachstum)

### Empfohlen

```
src/
  modules/
    user/
    auth/
    billing/
  shared/
  utils/
```

Zusammengehörige Logik gruppieren.

---

## 18. Häufige Fußangeln

### Over-Engineering

→ Einfach halten

### Schlechte Namen

→ Explizit sein

### Große Funktionen

→ Aufteilen

### Versteckte Seiteneffekte

→ Reine Funktionen nutzen

### Fehler ignorieren

→ Richtig behandeln

### Vorzeitige Abstraktion

→ Warten bis nötig

---

## Weiterführend

** Grundlagen**

- [TechnicalDebt](https://martinfowler.com/bliki/TechnicalDebt.html) — Trade-offs und warum „Quick Hacks“ sich aufsummieren
- [The practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) — was auf welcher Ebene testen

**Sicherheit an Grenzen**

- [OWASP — Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) — unvertrauenswürdige Eingaben validieren und normalisieren

**Immutability (JS/TS)**

- [MDN — Mutable](https://developer.mozilla.org/en-US/docs/Glossary/Mutable) / [Immutable](https://developer.mozilla.org/en-US/docs/Glossary/Immutable)

---

## Abschluss

Guter Code wirkt:

- offensichtlich
- langweilig
- leicht änderbar

Schlechter Code wirkt:

- clever
- verwirrend
- fragil

Wenn Code schwer zu verstehen ist, ist das schon ein wartender Bug.

---

## Kerngedanke

Diese Seite bietet praxisnahe Orientierung zu coding tests und gewohnheiten in klaren, wiederverwendbaren Schritten.

---

Englische Version: [`coding-testing-and-habits.md`](../../en/coding/coding-testing-and-habits.md)
