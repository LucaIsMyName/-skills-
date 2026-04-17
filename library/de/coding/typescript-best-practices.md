# TypeScript Best Practices

**Geltungsbereich:** Gilt für **TypeScript in Anwendungscode** (React, Node, API-Handler, Bibliotheken); nicht Build-Tool-Konfiguration, nicht Typsystem-Forschung. Ergänzend zu [`coding-best-practices.md`](coding-best-practices.md) und [`react-best-practices.md`](react-best-practices.md) für React-Details.

## Exzerpt (zuerst lesen)

- **Strict Mode immer an.** `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
- **Typen, die Werte beschreiben**, nicht die Sprache bekämpfen. Narrowing, discriminated unions, Literal Types.
- **`unknown`** an Grenzen (I/O, `JSON.parse`, Netzwerk), **`never`** für Exhaustiveness; **`any` nur letzter Ausweg**—mit Kommentar warum.
- **Externe Daten validieren** an der Grenze (zod / valibot / handgeschriebene Guards); innen angenommen valide Shapes.
- Vollständige Regeln, Beispiele und Anti-Muster unten.

## KI / Prompt: Vollständigkeit vor dem Schreiben von Typen

Vor dem Entwerfen von Typen klären **woher die Daten kommen** und **wer sie besitzt**. Typfehler nicht mit `as`-Casts oder `any` wegstumfen.

### Konkret

- **Quelle** der Daten: vertrauenswürdiger interner Code, Nutzereingabe, Netzwerk, Datei, Env?
- **Laufzeit-Shape** an der Grenze—validieren wir oder nehmen wir an?
- **Lebensdauer** des Typs: eine Datei, ein Paket, öffentliche API?

### Meta

- Lesbarkeit für Menschen schlägt Cleverness im Typsystem.
- **Inferierte** Typen wo ergonomisch; **explizite** Typen an **öffentlichen** Funktionssignaturen und Exports.

---

## Zweck

TypeScript schreiben, das **echte Bugs findet**, **lesbar** bleibt und **Refactors überlebt**—ohne die Datei in ein Typ-Rätsel zu verwandeln.

---

## 1. tsconfig-Baseline

- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"exactOptionalPropertyTypes": true`
- `"noImplicitOverride": true`
- `"noFallthroughCasesInSwitch": true`
- `"isolatedModules": true`
- `"forceConsistentCasingInFileNames": true`

In Legacy-Repos Flag für Flag einschalten; Folgearbeit abarbeiten, bevor das nächste kommt.

## 2. `type` vs. `interface`

* Standard: **`type`**—Unions, Intersections, Mapped Types funktionieren.
* **`interface`** wenn **Declaration Merging** nötig (selten) oder erweiterbare öffentliche API.
* Beide Stile nicht in einem Modul mischen.

```ts
type User = { id: string; name: string };
type Admin = User & { role: "admin" };
```

## 3. Narrowen, nicht casten

* `as`-Casts sind ein **Versprechen an den Compiler**; **Laufzeit-Checks** bevorzugen, die auch narrowen.

### Schlecht

```ts
const user = data as User;
```

### Gut

```ts
if (isUser(data)) {
  // data is User here
}
```

## 4. Discriminated unions statt optionalem Chaos

### Schlecht

```ts
type Response = { ok?: boolean; data?: T; error?: string };
```

### Gut

```ts
type Response<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

## 5. `unknown` an Grenzen

* `JSON.parse`, `fetch().json()`, `process.env`-Werte, `localStorage`-Reads: alles `unknown` bis validiert.
* Validierung mit Schema-Bibliothek (zod, valibot) oder expliziter Guard-Funktion.

```ts
const raw: unknown = await res.json();
const user = UserSchema.parse(raw);
```

## 6. Exhaustiveness mit `never`

```ts
function label(kind: "a" | "b"): string {
  switch (kind) {
    case "a": return "A";
    case "b": return "B";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
```

Neuer Fall ohne Behandlung wird **Compile-Fehler**, keine Runtime-Überraschung.

## 7. Generics mit Absicht

* Generics nur, wenn mindestens **zwei Call Sites** profitieren.
* Generics einschränken (`<T extends object>`) statt komplett offen.
* Generics nach **Rolle** benennen (`TItem`, `TResponse`), nicht `T1`, `T2`.

## 8. Öffentliche Signaturen explizit

* Exportierte Funktionen: **Rückgabetypen schreiben**. Inferenz innerhalb des Moduls ok, nicht über Modulgrenzen.
* Exportierte React-Komponenten: expliziter `Props`-Typ, kein `React.FC` (verliert Inference bei children/return).

## 9. `readonly` und Immutability

* `readonly` Arrays und Felder bevorzugen, die nicht mutieren sollen.
* In React-State Reducer-State als tief readonly behandeln.

## 10. Fehler sind manchmal Werte

* **Wirklich außergewöhnliche** Fälle: throw; **erwartete** Fehlerpfade (Validierung, Parse, Auth): `Result`-artige Unions zurückgeben.

```ts
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
```

## Anti-Muster: sofort entfernen

* `: any` ohne Kommentar daneben warum.
* `as unknown as SomeType` Doppel-Casts.
* `// @ts-ignore` ohne Ticket-Referenz oder einzeiligen Grund.
* Enums für einfache String-Unions—Union-Typ nutzen.
* Tief verschachtelte Conditional Types, die nur einmal vorkommen.

---

## Kernidee

Typen sollen beschreiben, **was in deinem Programm wahr ist**. Wenn du gegen sie kämpfst, ist vermutlich das **Design** falsch, nicht der Typ.

---

Englische Version: [`typescript-best-practices.md`](../../en/coding/typescript-best-practices.md)
