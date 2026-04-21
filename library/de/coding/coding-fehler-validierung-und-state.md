# Coding Fehler, Validierung und State

## Geltungsbereich:

Gilt für **Funktionsgröße, Reinheit, Fehlerbehandlung, Validierung und Datenfluss** in Anwendungscode. Nicht Logging-Runbooks, nicht API-Security-Design. Kombiniere mit [`coding-stil-und-struktur.md`](coding-stil-und-struktur.md), [`coding-tests-und-gewohnheiten.md`](coding-tests-und-gewohnheiten.md) und [`coding-best-practices.md`](coding-best-practices.md).

## Exzerpt

- **Kleine Funktionen** mit testbaren Grenzen.
- **Keine stillen Mutationen**—lieber explizite Ein-/Ausgaben.
- **Keine verschluckten Fehler**—externe Daten an der Grenze prüfen.

## Vor Grenzen schärfen

### Konkret

- Welche Inputs sind **vertrauenswürdig** vs **extern**?
- Wo soll Validierung **schnell scheitern**?

### Meta

- Vorhersagbarer Datenflug schlägt „clevere“ Globals.

---

## Zweck

Verhalten **an den Kanten ehrlich** machen—Fehler sichtbar und behebbar.

---

## 8. Funktionen klein halten

### Regel

Passt eine Funktion nicht auf einen Bildschirm → vermutlich zu groß.

### Anzeichen:

- mehrere Verantwortlichkeiten
- schwer zu benennen
- viel Scrollen

In kleinere Teile zerlegen.

---

## 9. Seiteneffekte vermeiden

### Regel

Funktionen sollen externen Zustand nicht unerwartet ändern.

### Schlecht: seiteneffekte vermeiden

```ts
function addItem(item) {
  cart.push(item);
}
```

### Gut: seiteneffekte vermeiden

```ts
function addItem(cart, item) {
  return [...cart, item];
}
```

Reine Funktionen sind vorhersagbar und testbar.

---

## 10. Fehler explizit behandeln

### Regel

Fehler nie ignorieren.

### Schlecht: fehler explizit behandeln

```ts
try {
  doSomething();
} catch {}
```

### Gut: fehler explizit behandeln

```ts
try {
  doSomething();
} catch (error) {
  logError(error);
  throw error;
}
```

Stille Fehler = Debugging-Hölle.

---

## 11. Eingaben validieren

### Regel

Externe Daten nie blind vertrauen.

### Schlecht: eingaben validieren

```ts
function createUser(user) {
  save(user.name);
}
```

### Gut: eingaben validieren

```ts
function createUser(user) {
  if (!user?.name) throw new Error("Invalid user");
  save(user.name);
}
```

An Grenzen validieren.

---

## 12. Datenfluss vorhersagbar halten

### Regel

Versteckten Zustand und magisches Verhalten vermeiden.

Bevorzugen:

- explizite Parameter
- explizite Rückgaben

Vermeiden:

- globale Variablen
- versteckte Mutationen

---

## Kerngedanke

Diese Seite bietet praxisnahe Orientierung zu coding fehler, validierung und state in klaren, wiederverwendbaren Schritten.

## Weiterführend

- Nutze die verwandten Seiten im Geltungsbereich fuer vertiefende Beispiele und angrenzende Workflows.

---

Englische Version: [`coding-errors-validation-and-state.md`](../../en/coding/coding-errors-validation-and-state.md)
