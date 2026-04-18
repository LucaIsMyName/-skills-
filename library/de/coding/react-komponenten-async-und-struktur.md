# React: Komponenten, Async, Struktur

**Geltungsbereich:** Gilt für **Listen, Formulare, Handler, Async, bedingtes Rendering und Dateistruktur** in React-Apps. Keine Form-Library-Tiefen. Kombiniere mit [`react-state-hooks-und-effects.md`](react-state-hooks-und-effects.md) und [`react-best-practices.md`](react-best-practices.md).

## Exzerpt

- **Stabile Keys**; **kontrollierte** Formulare als Standard.
- **Async** mit klarem Loading/Error-UX; **niemals** State mutieren.
- **Projekt-Layout** passend zu Feature-Ownership.

## Vor großen UI-Änderungen

### Konkret

- **Designsystem** oder Komponentenbibliothek im Einsatz.

### Meta

- Lieber **ein erkennbares Muster** als drei clevere.

---

## Zweck

UI liefern, die **echte Eingaben** abfedert und **mit dem Code wächst**.

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


---

Englische Version: [`react-components-async-and-structure.md`](../../en/coding/react-components-async-and-structure.md)
