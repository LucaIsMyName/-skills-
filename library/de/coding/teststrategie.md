# Teststrategie

**Geltungsbereich:** Gilt für **Anwendungstests** auf Unit-, Integrations- und E2E-Ebene; nicht Last- oder Security-Tests, nicht QA-Prozessdesign. Ergänzend zu [`coding-best-practices.md`](coding-best-practices.md) und [`react-best-practices.md`](react-best-practices.md).

## Exzerpt (zuerst lesen)

- Tests existieren, damit du **Code ohne Angst ändern** kannst—Sicherheitsnetz, nicht Abzeichen.
- Pyramiden-artig: **viele Unit, weniger Integration, wenige E2E**. Das richtige Verhältnis hängt davon ab, was in Produktion wirklich bricht.
- **Verhalten testen, nicht Implementierung.** Bricht der Test bei Refactor ohne Nutzer-Regression, war der Test falsch.
- **Coverage ist ein Signal, kein Ziel.** 90 % Trivialcode und 0 % Risikopfad ist schlechter als 60 % sinnvoll verteilt.
- Vollständige Regeln, Muster und Anti-Muster unten.

## KI / Prompt: bevor Tests geschrieben werden

Vor neuen Tests klären **wofür der Code da ist** und **wie er scheitern kann**. Keine Tests ausliefern, die nur die Implementierung wiederholen.

### Konkret

- Welches **Verhalten** wird getestet—in Klartext?
- Welche **Eingaben** zählen: Happy Path, Grenze, Fehler, Rand, Concurrent?
- Gibt es **echte Abhängigkeit** (DB, Uhr, Netzwerk), die wir faken, stubben oder echt lassen?

### Meta

- Ein guter Test **scheitert aus einem Grund**. Ist die Fehlermeldung zu vage, ist der Test zu breit.
- Tests sind auch Code—**Lesbarkeit** wichtiger als DRY.

---

## Zweck

Eine Testsuite, die **Regressionen findet**, **Verhalten dokumentiert** und **schnell genug** für jeden Lauf auf der Änderung ist.

---

## 1. Die drei Ebenen

### Unit-Tests

* ein Modul, kein I/O, keine echte Uhrzeit
* **viele**, **schnell** (Millisekunden), bei jedem Speichern
* gut für reine Logik, Formatierung, Parsing, Reducer, Preisregeln

### Integrations-Tests

* zwei oder mehr Module zusammen—oft mit echter DB, Router, Dateisystem in temporärem Ordner
* **weniger**, **langsamer** (Sekunden)
* gut für API-Handler, Datenzugriff, Queue-Consumer

### End-to-End (E2E)

* echter oder nahezu echter Stack, über die öffentliche Oberfläche (HTTP, Browser)
* **wenige**, **am langsamsten** (Sekunden bis Minuten)
* gut für kritische User-Journeys (Registrierung, Checkout, Veröffentlichen)

## 2. Was mocken, was echt lassen

* **Echt lassen:** reine Funktionen, eigene Datenstrukturen im Speicher, eigener Code
* **Sparsam mocken:** Netzwerk, Drittanbieter-SDKs, Uhrzeit, Zufall
* **Nie mocken**, was du testest. Importiert der Test das SUT und stubbt meist davon — Test umschreiben
* **Fakes** (In-Memory-Implementierungen) **Mocks** (Aufrufmuster-Assertions) vorziehen

## 3. Verhalten testen, nicht Implementierung

### Schlecht

```ts
expect(service._buildInternalQuery).toHaveBeenCalledWith(...);
```

### Gut

```ts
const result = service.search("tax relief");
expect(result.map((x) => x.id)).toEqual(["a1", "b2"]);
```

Beim Refactor von `_buildInternalQuery` besteht der zweite Test noch; der erste bricht.

## 4. Namen beschreiben Verhalten

* `it("returns an empty list when no items match")` — gut.
* `it("works")`, `it("handles edge case")` — bei Fehler nutzlos.
* Testtitel + Fehlermeldung sollen **sagen, was kaputt ist**, ohne Datei öffnen zu müssen.

## 5. Arrange–Act–Assert

```ts
// Arrange
const cart = newCart([{ sku: "A", qty: 2 }]);

// Act
const total = cart.total();

// Assert
expect(total).toBe(1998);
```

Drei Blöcke, Leerzeile dazwischen. Kein verstecktes Setup in Helfern, das Arrange verschleiert.

## 6. Flaky Tests sind kaputte Tests

* Fällt ein Test intermittierend → **fixen oder löschen**—nicht „3× retry“.
* Ursachen: echte Uhren, Zufall, Netz, geteilter State zwischen Tests, Reihenfolge-Annahmen.
* Jeder Test **seedet eigene Daten** und **räumt auf**.

## 7. Coverage als Signal

* Coverage nutzen, um **Lücken zu finden**, nicht um eine Zahl zu treffen.
* Ungetestete Zweige in riskantem Code (Zahlungen, Auth, Rechte) sind rot, egal welche Gesamtquote.
* 100 % Coverage beweist keine Korrektheit; eine **falsche Assertion** besteht trotzdem.

## 8. Tests als Dokumentation

* Neue:r Entwickler:in soll aus der Testdatei lesen können, **was das Modul tut**.
* Nach Verhalten gruppieren, nicht nach Methodennamen. `describe("login")` mit Fällen darunter schlägt einen Test pro Methode.

## 9. E2E-Regeln

* **User-Journeys** testen, nicht Komponenten. Komponenten gehören in Unit/Integration.
* **Stabile Selektoren** (`data-testid`, accessible roles), keine CSS-Klassen oder wechselnder Text.
* Eine Journey pro Test; keine Ketten „dann ausloggen und wieder einloggen“.
* Volle E2E-Suite in CI auf dem PR; lokal kleineres Smoke-Subset.

## 10. Was nicht testen

* Typen (macht der Compiler).
* Drittanbieter-Bibliotheken (vertrauen oder ersetzen).
* Framework-Defaults (React Re-Render, Router-Matching).
* Triviale Getter/Setter ohne Verhalten.

---

## Kernidee

Eine gute Testsuite lässt dich **Ja zu Änderungen** sagen. Wenn Tests Refactors erschrecken, bewachen sie die **Implementierung** statt das **Verhalten**—umschreiben.

## Weiterführend

- [Martin Fowler — TestPyramid](https://martinfowler.com/bliki/TestPyramid.html) — Balance aus Unit-, Integrations- und UI-Tests
- [Google Testing Blog — flaky tests](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-what-we-do.html) — Betrieb mit unzuverlässigen Tests in großen Repos
- [Playwright — Dokumentation](https://playwright.dev/docs/intro) — beispielhaftes E2E-Tooling (bei anderem Stack entsprechend substituieren)

---

Englische Version: [`testing-strategy.md`](../../en/coding/testing-strategy.md)
