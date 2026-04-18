# React Best Practices

**Geltungsbereich:** Gilt für **React-Anwendungs- und Komponenten-Code**; nicht für Nicht-React-Frontends, native Apps oder rein serverseitige Backends.

## Exzerpt

- Nutzen für **vorhersagbares, wartbares React**: Hooks, State, Effects, Performance, typische Fußangeln.
- Muster bevorzugen, die Bugs und Überraschungs-Re-Renders reduzieren; bei unklarem Kontext vor großen Refactors nachfragen.
- Vollständige Datei unten: detaillierte Regeln und Schlecht/Gut-Beispiele (lange Referenz).

## Zweck

Dieses Dokument erklärt, **wie man React-Code korrekt und sicher schreibt**, mit Best Practices, typischen Fehlern (Footguns) und Alternativen.

Ziel: React-Code, der **vorhersagbar, wartbar und robust gegen Bugs** ist.

---

## Grundhaltung

React bedeutet:

* **Deklarative UI** → beschreiben, *wie* die UI aussehen soll
* **State-getriebenes Rendering** → UI aktualisiert sich bei State-Änderung

👉 Die UI nicht „manuell steuern“—das macht React.

---

## 1. State: minimal halten

### Regel

Nur speichern, **was du nicht ableiten kannst**.

### ❌ Schlecht

```ts
const [fullName, setFullName] = useState("");
```

### ✅ Gut

```ts
const fullName = `${firstName} ${lastName}`;
```

👉 Abgeleiteten State nicht speichern.

---

## 2. Die größte Fußangel: `useEffect`

### Regel

Wenn du nicht mit einem externen System synchronisierst → **`useEffect` brauchst du vermutlich nicht**

### ❌ Typischer Missbrauch

```ts
useEffect(() => {
  setFiltered(items.filter(i => i.active));
}, [items]);
```

### ✅ Besser

```ts
const filtered = items.filter(i => i.active);
```

### Wann `useEffect`?

Nur für:

* API-Calls (wenn keine Datenbibliothek)
* Subscriptions (WebSocket, Events)
* DOM-APIs (Fokus, Messungen)
* Timer

👉 Frage: „Synchronisiere ich mit etwas **außerhalb** von React?“

Wenn nein → nicht nutzen.

Ausführlich mit Beispielen: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) und [Removing Effect dependencies](https://react.dev/learn/removing-effect-dependencies).

---

## 3. Abgeleiteten State nicht in Effects

### ❌ Schlechtes Muster

```ts
useEffect(() => {
  setValue(expensiveCalculation(data));
}, [data]);
```

### ✅ Gut

```ts
const value = useMemo(() => expensiveCalculation(data), [data]);
```

👉 Effects sind **nicht** für Berechnungen.

---

## 4. `useMemo` und `useCallback`: nicht übertreiben

### Regel

Nur optimieren, wenn nötig.

### ❌ Schlecht

```ts
const value = useMemo(() => compute(), []);
```

### ✅ Gut

```ts
const value = compute();
```

### Wann nutzen

* teure Berechnungen
* unnötige Re-Renders in memoisierten Komponenten vermeiden

👉 Vorzeitige Optimierung = Komplexität.

---

## 5. Props: einfach halten

### Regeln

* nur nötiges übergeben
* keine tief verschachtelten Objekte
* Primitiven bevorzugen

### ❌ Schlecht

```ts
<Component config={{ theme, layout, user }} />
```

### ✅ Gut

```ts
<Component theme={theme} layout={layout} />
```

👉 Einfachere Props = einfacheres Debuggen.

---

## 6. Komponentengröße

### Regel

Eine Komponente soll **eine Sache gut** tun.

### Zu groß, wenn:

* 200+ Zeilen
* mehrere Verantwortlichkeiten
* schwer zu benennen

👉 In kleinere Komponenten oder Hooks teilen.

---

## 7. Custom Hooks: Logik auslagern

### Wann anlegen

* Logik mehrfach nutzbar
* Komponente wird zu komplex

### Beispiel

```ts
function useUser() {
  const [user, setUser] = useState(null);
  // logic...
  return user;
}
```

👉 Hooks = wiederverwendbare Logik, keine UI.

---

## 8. Prop Drilling vermeiden (Context nicht überall)

### ❌ Schlecht

Props durch viele Ebenen durchreichen

### ⚠️ Überkorrektur

Überall Context

### ✅ Ausgewogen

* lokaler State zuerst
* State bei Bedarf hochziehen
* Context nur für **globale** Themen:

  * Theme
  * Auth
  * Einstellungen

👉 Context ist kein Ersatz für globales State-Management.

---

## 9. Keys in Listen

### Regel

Keys müssen **stabil und eindeutig** sein.

### ❌ Schlecht

```ts
items.map((item, index) => <Item key={index} />)
```

### ✅ Gut

```ts
items.map(item => <Item key={item.id} />)
```

👉 Falsche Keys = seltsame Bugs. Siehe [Rendering lists — keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys).

---

## 10. Formulare: kontrolliert vs. unkontrolliert

### Kontrolliert (Standard)

```ts
<input value={value} onChange={e => setValue(e.target.value)} />
```

### Unkontrolliert, wenn:

* Performance (große Formulare)
* Formular-Bibliotheken

👉 Kontrolliert = vorhersagbar, kann aber teuer sein.

---

## 11. Event-Handler

### ❌ Schlecht

```ts
<button onClick={handleClick()} />
```

### ✅ Gut

```ts
<button onClick={handleClick} />
```

👉 Funktion übergeben ≠ Funktion aufrufen.

---

## 12. Async-Logik

### ❌ Schlecht

```ts
useEffect(() => {
  fetch("/api").then(setData);
}, []);
```

### Bessere Optionen

* Datenbibliothek (empfohlen)
* Loading- und Fehlerzustände explizit

👉 Async ohne Struktur = schnell Bugs.

---

## 13. State mutieren (nein)

### ❌ Schlecht

```ts
items.push(newItem);
setItems(items);
```

### ✅ Gut

```ts
setItems(prev => [...prev, newItem]);
```

👉 State immer als unveränderlich behandeln.

---

## 14. Bedingtes Rendern

### ❌ Unübersichtlich

```tsx
return (
  <div>
    {loading ? (
      <Loading />
    ) : error ? (
      <Error />
    ) : data ? (
      <Content data={data} />
    ) : (
      <Empty />
    )}
  </div>
);
```

### ✅ Klar

```ts
if (loading) return <Loading />;
if (error) return <Error />;
if (!data) return <Empty />;
return <Content data={data} />;
```

👉 Frühe Returns statt verschachtelter Ternäre—lesbarer und erweiterbarer.

---

## 15. Datei- und Ordnerstruktur

### Empfohlen

```
src/
  app/
  modules/
  components/
  hooks/
  lib/
```

👉 Bei Skalierung nach Feature gruppieren, nicht nur nach Typ.

---

## 16. Häufige Fußangeln

### 🚨 `useEffect` überall

→ nur für Side Effects

### 🚨 Abgeleiteten State speichern

→ ableiten

### 🚨 Index als Key

→ stabile IDs

### 🚨 State mutieren

→ immer kopieren

### 🚨 `useMemo` überoptimieren

→ nur bei Bedarf

### 🚨 Riesige Komponenten

→ früh teilen

---

## Weiterführend

**React-Dokumentation**

- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Removing Effect dependencies](https://react.dev/learn/removing-effect-dependencies)
- [useMemo](https://react.dev/reference/react/useMemo)
- [Passing data deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Rendering lists (keys)](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys)

**Daten laden**

- [TanStack Query (React)](https://tanstack.com/query/latest/docs/framework/react/overview)

---

## Abschluss

Guter React-Code wirkt:

* einfach
* vorhersagbar
* leicht änderbar

Schlechter React-Code wirkt:

* „magisch“
* fragil
* schwer zu debuggen

👉 Wenn etwas kompliziert wirkt, ist es das meist auch—vereinfachen.

---

Englische Version: [`react-best-practices.md`](../../en/coding/react-best-practices.md)
