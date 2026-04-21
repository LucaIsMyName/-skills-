# React: State, Hooks, Effects

## Geltungsbereich:

Gilt für **React-State, Built-in-Hooks, Memoisierung, Props vs. Context und Hook-Extraktion** in Komponenten. Kein Routing, keine Server Components (außer kurz erwähnt). Kombiniere mit [`react-komponenten-async-und-struktur.md`](react-komponenten-async-und-struktur.md) und [`react-best-practices.md`](react-best-practices.md).

## Exzerpt

- **State minimal** halten; `useEffect`-Missbrauch vermeiden.
- State **ableiten**—nicht per Effekt synchronisieren, wenn eine Berechnung reicht.
- **Context** für querschnittliche Themen, nicht für jedes geteilte Datum.

## Vor Hook-Änderungen

### Konkret

- **Vorhandene Custom Hooks** und State-Libraries im Repo.

### Meta

- Jeder neue Effekt ist **langfristige Last**—Default: keiner.

---

## Zweck

**State und Effekte** langweilig, testbar und reviewbar machen.

---

## Grundhaltung

React bedeutet:

- **Deklarative UI** → beschreiben, _wie_ die UI aussehen soll
- **State-getriebenes Rendering** → UI aktualisiert sich bei State-Änderung

Die UI nicht „manuell steuern“—das macht React.

---

## 1. State: minimal halten

### Regel

Nur speichern, **was du nicht ableiten kannst**.

### Schlecht: state: minimal halten

```ts
const [fullName, setFullName] = useState("");
```

### Gut: state: minimal halten

```ts
const fullName = `${firstName} ${lastName}`;
```

Abgeleiteten State nicht speichern.

---

## 2. Die größte Fußangel: `useEffect`

### Regel

Wenn du nicht mit einem externen System synchronisierst → **`useEffect` brauchst du vermutlich nicht**

### Typischer Missbrauch

```ts
useEffect(() => {
  setFiltered(items.filter((i) => i.active));
}, [items]);
```

### Besser

```ts
const filtered = items.filter((i) => i.active);
```

### Wann `useEffect`?

Nur für:

- API-Calls (wenn keine Datenbibliothek)
- Subscriptions (WebSocket, Events)
- DOM-APIs (Fokus, Messungen)
- Timer

Frage: „Synchronisiere ich mit etwas **außerhalb** von React?“

Wenn nein → nicht nutzen.

Ausführlich mit Beispielen: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) und [Removing Effect dependencies](https://react.dev/learn/removing-effect-dependencies).

---

## 3. Abgeleiteten State nicht in Effects

### Schlechtes Muster

```ts
useEffect(() => {
  setValue(expensiveCalculation(data));
}, [data]);
```

### Gut: abgeleiteten state nicht in effects

```ts
const value = useMemo(() => expensiveCalculation(data), [data]);
```

Effects sind **nicht** für Berechnungen.

---

## 4. `useMemo` und `useCallback`: nicht übertreiben

### Regel

Nur optimieren, wenn nötig.

### Schlecht: `usememo` und `usecallback`: nicht übertreiben

```ts
const value = useMemo(() => compute(), []);
```

### Gut: `usememo` und `usecallback`: nicht übertreiben

```ts
const value = compute();
```

### Wann nutzen

- teure Berechnungen
- unnötige Re-Renders in memoisierten Komponenten vermeiden

Vorzeitige Optimierung = Komplexität.

---

## 5. Props: einfach halten

### Regeln

- nur nötiges übergeben
- keine tief verschachtelten Objekte
- Primitiven bevorzugen

### Schlecht: props: einfach halten

```ts
<Component config={{ theme, layout, user }} />
```

### Gut: props: einfach halten

```ts
<Component theme={theme} layout={layout} />
```

Einfachere Props = einfacheres Debuggen.

---

## 6. Komponentengröße

### Regel

Eine Komponente soll **eine Sache gut** tun.

### Zu groß, wenn:

- 200+ Zeilen
- mehrere Verantwortlichkeiten
- schwer zu benennen

In kleinere Komponenten oder Hooks teilen.

---

## 7. Custom Hooks: Logik auslagern

### Wann anlegen

- Logik mehrfach nutzbar
- Komponente wird zu komplex

### Beispiel

```ts
function useUser() {
  const [user, setUser] = useState(null);
  // logic...
  return user;
}
```

Hooks = wiederverwendbare Logik, keine UI.

---

## 8. Prop Drilling vermeiden (Context nicht überall)

### Schlecht: prop drilling vermeiden (context nicht überall)

Props durch viele Ebenen durchreichen

### Überkorrektur

Überall Context

### Ausgewogen

- lokaler State zuerst
- State bei Bedarf hochziehen
- Context nur für **globale** Themen:
  - Theme
  - Auth
  - Einstellungen

Context ist kein Ersatz für globales State-Management.

---

## Kerngedanke

Diese Seite bietet praxisnahe Orientierung zu react: state, hooks, effects in klaren, wiederverwendbaren Schritten.

## Weiterführend

- Nutze die verwandten Seiten im Geltungsbereich fuer vertiefende Beispiele und angrenzende Workflows.

---

Englische Version: [`react-state-hooks-and-effects.md`](../../en/coding/react-state-hooks-and-effects.md)
