# Coding Best Practices

**Geltungsbereich:** Gilt für **allgemeine Softwarequalität** in Anwendungscode (jede Sprache/jedes Framework); nicht für Security-Audits, Infrastruktur oder Operations.

## Exzerpt

- Nutzen für **Wartbarkeit, Lesbarkeit, Korrektheit**—einfache Designs statt cleverer Tricks.
- Diese Datei ist **lang**: die Abschnitte unten vertiefen Muster, Beispiele und Anti-Muster.
- Kernthemen: Einfachheit, Benennung, Single Responsibility, Test-Mindset, sinnvolle Abstraktionen.
- Vollständige Datei unten: nummerierte Regeln mit Schlecht/Gut-Codebeispielen.

## Zweck

Dieses Dokument erklärt, **wie man in jeder Sprache oder jedem Framework qualitativ hochwertige Software schreibt**, mit Fokus auf:

- Wartbarkeit
- Korrektheit
- Lesbarkeit
- Skalierbarkeit

Ziel: Code, der **leicht zu verstehen, sicher zu ändern und schwer kaputtzumachen** ist.

---

## Grundhaltung

Gute Software ist:

- **Einfach statt clever**
- **Lesbar statt kurz**
- **Korrekt statt schnell (zunächst)**

👉 Du schreibst Code nicht nur für Maschinen—sondern für Menschen.

---

## 1. Einfachheit bevorzugen

### Regel

Die einfachste Lösung wählen, die funktioniert.

### ❌ Schlecht

```ts
const result = arr.reduce((acc, x) => (x % 2 ? [...acc, x * 2] : acc), []);
```

### ✅ Gut

```ts
const result = [];
for (const x of arr) {
  if (x % 2 !== 0) {
    result.push(x * 2);
  }
}
```

👉 Cleverer Code ist schwerer zu debuggen und zu warten.

---

## 2. Lesbarkeit > alles

### Regel

Code sollte ohne Zusatzerklärung verständlich sein.

### ❌ Schlecht

```ts
const d = new Date();
```

### ✅ Gut

```ts
const currentDate = new Date();
```

👉 Wenn du Kommentare brauchst, um Basis-Code zu erklären: umbenennen.

---

## 3. Single Responsibility Principle

### Regel

Eine Funktion/ein Modul soll **eine Sache gut** tun.

### ❌ Schlecht

```ts
function processUser(user) {
  validate(user);
  saveToDB(user);
  sendEmail(user);
}
```

### ✅ Gut

```ts
function processUser(user) {
  validateUser(user);
  saveUser(user);
  notifyUser(user);
}
```

👉 Kleine Einheiten = einfacher testen und wiederverwenden.

---

## 4. Tiefe Verschachtelung vermeiden

### Regel

Kontrollflach halten.

### ❌ Schlecht

```ts
if (user) {
  if (user.active) {
    if (user.role === "admin") {
      // logic
    }
  }
}
```

### ✅ Gut

```ts
if (!user || !user.active || user.role !== "admin") return;

// logic
```

👉 Frühe Returns reduzieren Komplexität.

---

## 5. Don’t Repeat Yourself (DRY)

### Regel

Logik nicht duplizieren.

### ❌ Schlecht

```ts
if (user.age > 18) { ... }
if (admin.age > 18) { ... }
```

### ✅ Gut

```ts
function isAdult(person) {
  return person.age > 18;
}
```

👉 Duplikation = wartende Bugs.

---

## 6. Aber nicht über-abstrahieren

### Regel

Nicht zu früh verallgemeinern.

### ❌ Schlecht

```ts
function handleEntity(entity, type, config, strategy) { ... }
```

### ✅ Gut

```ts
function handleUser(user) { ... }
```

👉 Abstraktion **nach** Wiederholung, nicht davor.

---

## 7. Namen sind wichtig

### Regel

Namen sollen Absicht erklären.

### ❌ Schlecht

```ts
function calc(x, y) { ... }
```

### ✅ Gut

```ts
function calculateTotalPrice(price, tax) { ... }
```

👉 Gute Namen ersetzen viele Kommentare.

---

## 8. Funktionen klein halten

### Regel

Passt eine Funktion nicht auf einen Bildschirm → vermutlich zu groß.

### Anzeichen:

- mehrere Verantwortlichkeiten
- schwer zu benennen
- viel Scrollen

👉 In kleinere Teile zerlegen.

---

## 9. Seiteneffekte vermeiden

### Regel

Funktionen sollen externen Zustand nicht unerwartet ändern.

### ❌ Schlecht

```ts
function addItem(item) {
  cart.push(item);
}
```

### ✅ Gut

```ts
function addItem(cart, item) {
  return [...cart, item];
}
```

👉 Reine Funktionen sind vorhersagbar und testbar.

---

## 10. Fehler explizit behandeln

### Regel

Fehler nie ignorieren.

### ❌ Schlecht

```ts
try {
  doSomething();
} catch {}
```

### ✅ Gut

```ts
try {
  doSomething();
} catch (error) {
  logError(error);
  throw error;
}
```

👉 Stille Fehler = Debugging-Hölle.

---

## 11. Eingaben validieren

### Regel

Externe Daten nie blind vertrauen.

### ❌ Schlecht

```ts
function createUser(user) {
  save(user.name);
}
```

### ✅ Gut

```ts
function createUser(user) {
  if (!user?.name) throw new Error("Invalid user");
  save(user.name);
}
```

👉 An Grenzen validieren.

---

## 12. Datenfluss vorhersagbar halten

### Regel

Versteckten Zustand und magisches Verhalten vermeiden.

👉 Bevorzugen:

- explizite Parameter
- explizite Rückgaben

👉 Vermeiden:

- globale Variablen
- versteckte Mutationen

---

## 13. Tests für Logik schreiben

### Regel

Wichtige Logik testen, nicht Trivialitäten.

### Fokus:

- Geschäftsregeln
- Grenzfälle
- Fehlerpfade

👉 Tests geben Refactoring-Vertrauen.

---

## 14. Später optimieren

### Regel

Zuerst zum Laufen bringen → korrekt machen → dann optimieren.

### ❌ Schlecht

Überall vorzeitig optimieren

### ✅ Gut

Erst messen, dann Engpässe optimieren

👉 Die meiste Codebasis braucht keine Mikro-Optimierung.

---

## 15. Konsistenz schlägt Perfektion

### Regel

Im gesamten Codebase konsistente Muster.

👉 Auch wenn etwas nicht ideal ist, bringt Konsistenz:

- bessere Lesbarkeit
- weniger kognitive Last

---

## 16. Kommentare: gezielt einsetzen

### Regel

**Warum** erklären, nicht **was**.

### ❌ Schlecht

```ts
// increment i
i++;
```

### ✅ Gut

```ts
// Workaround: API liefert doppelte Einträge
```

👉 Code erklärt das Was; Kommentare die Absicht.

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

👉 Zusammengehörige Logik gruppieren.

---

## 18. Häufige Fußangeln

### 🚨 Over-Engineering

→ Einfach halten

### 🚨 Schlechte Namen

→ Explizit sein

### 🚨 Große Funktionen

→ Aufteilen

### 🚨 Versteckte Seiteneffekte

→ Reine Funktionen nutzen

### 🚨 Fehler ignorieren

→ Richtig behandeln

### 🚨 Vorzeitige Abstraktion

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

👉 Wenn Code schwer zu verstehen ist, ist das schon ein wartender Bug.

---

Englische Version: [`coding-best-practices.md`](../../en/coding/coding-best-practices.md)
