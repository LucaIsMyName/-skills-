# Coding Stil und Struktur

**Geltungsbereich:** Gilt für **Einfachheit, Lesbarkeit, Benennung und Kontrollfluss** in Anwendungscode. Nicht vollständige Fehlerbehandlung, nicht Teststrategie. Kombiniere mit [`coding-fehler-validierung-und-state.md`](coding-fehler-validierung-und-state.md), [`coding-tests-und-gewohnheiten.md`](coding-tests-und-gewohnheiten.md) und [`coding-best-practices.md`](coding-best-practices.md).

## Exzerpt
- **Einfach schlägt clever**; lieber vertraute Schleifen als One-Liner.
- **Namen tragen Bedeutung**—lieber umbenennen als kommentieren.
- **Eine Aufgabe pro Funktion**; mit frühem Return flach halten; DRY ohne voreilige Abstraktion.

## Vor Strukturänderungen

### Konkret

- Kannst du die Funktion nach **Ergebnis oder Aufgabe** benennen?
- Ist es das **erste** oder **dritte** Mal mit diesem Muster?

### Meta

- Wenn Review erst beim zweiten Lesen klickt: vereinfachen.

---

## Zweck

Code **lesbar und lokal nachvollziehbar** halten.

---

## Grundhaltung

Gute Software ist:

- **Einfach statt clever**
- **Lesbar statt kurz**
- **Korrekt statt schnell (zunächst)**

 Du schreibst Code nicht nur für Maschinen—sondern für Menschen.

---

## 1. Einfachheit bevorzugen

### Regel

Die einfachste Lösung wählen, die funktioniert.

### Schlecht: einfachheit bevorzugen

```ts
const result = arr.reduce((acc, x) => (x % 2 ? [...acc, x * 2] : acc), []);
```

### Gut: einfachheit bevorzugen

```ts
const result = [];
for (const x of arr) {
  if (x % 2 !== 0) {
    result.push(x * 2);
  }
}
```

 Cleverer Code ist schwerer zu debuggen und zu warten.

---

## 2. Lesbarkeit > alles

### Regel

Code sollte ohne Zusatzerklärung verständlich sein.

### Schlecht: lesbarkeit > alles

```ts
const d = new Date();
```

### Gut: lesbarkeit > alles

```ts
const currentDate = new Date();
```

 Wenn du Kommentare brauchst, um Basis-Code zu erklären: umbenennen.

---

## 3. Single Responsibility Principle

### Regel

Eine Funktion/ein Modul soll **eine Sache gut** tun.

### Schlecht: single responsibility principle

```ts
function processUser(user) {
  validate(user);
  saveToDB(user);
  sendEmail(user);
}
```

### Gut: single responsibility principle

```ts
function processUser(user) {
  validateUser(user);
  saveUser(user);
  notifyUser(user);
}
```

 Kleine Einheiten = einfacher testen und wiederverwenden.

---

## 4. Tiefe Verschachtelung vermeiden

### Regel

Kontrollflach halten.

### Schlecht: tiefe verschachtelung vermeiden

```ts
if (user) {
  if (user.active) {
    if (user.role === "admin") {
      // logic
    }
  }
}
```

### Gut: tiefe verschachtelung vermeiden

```ts
if (!user || !user.active || user.role !== "admin") return;

// logic
```

 Frühe Returns reduzieren Komplexität.

---

## 5. Don’t Repeat Yourself (DRY)

### Regel

Logik nicht duplizieren.

### Schlecht: don’t repeat yourself (dry)

```ts
if (user.age > 18) { ... }
if (admin.age > 18) { ... }
```

### Gut: don’t repeat yourself (dry)

```ts
function isAdult(person) {
  return person.age > 18;
}
```

 Duplikation = wartende Bugs.

---

## 6. Aber nicht über-abstrahieren

### Regel

Nicht zu früh verallgemeinern.

### Schlecht: aber nicht über-abstrahieren

```ts
function handleEntity(entity, type, config, strategy) { ... }
```

### Gut: aber nicht über-abstrahieren

```ts
function handleUser(user) { ... }
```

 Abstraktion **nach** Wiederholung, nicht davor.

---

## 7. Namen sind wichtig

### Regel

Namen sollen Absicht erklären.

### Schlecht: namen sind wichtig

```ts
function calc(x, y) { ... }
```

### Gut: namen sind wichtig

```ts
function calculateTotalPrice(price, tax) { ... }
```

 Gute Namen ersetzen viele Kommentare.

---

## Kerngedanke

Diese Seite bietet praxisnahe Orientierung zu coding stil und struktur in klaren, wiederverwendbaren Schritten.

## Weiterführend

- Nutze die verwandten Seiten im Geltungsbereich fuer vertiefende Beispiele und angrenzende Workflows.

---

Englische Version: [`coding-style-and-structure.md`](../../en/coding/coding-style-and-structure.md)
