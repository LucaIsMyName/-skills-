# React-App aufsetzen

**Geltungsbereich:** Gilt für **neue React-Projekte** und initiales Repo-Layout; nicht für Migration alter Codebasen oder die Wahl nicht-React-Stacks.

## Exzerpt
- Nutzen beim **Neuanlegen einer React-App** von Grund auf: Tooling-Reihenfolge, Ordnererwartungen, Konsistenz mit Projektkonventionen.
- Die **Scaffold-Sequenz** in dieser Datei befolgen; Toolchain (Package Manager, Vite/CRA etc.) mit Nutzer:in klären, falls unbekannt.
- Vollständige Datei unten: Schritt-für-Schritt-Scaffolding und Setup.

## Zweck

Dieses Dokument beschreibt, wie man eine **saubere, moderne und produktionsreife React-App** nach Best Practices aufsetzt.
Es sichert von Anfang an Konsistenz, Skalierbarkeit und Wartbarkeit.

---

## React-App-Scaffolding

In dieser Reihenfolge scaffolden. Alle Tools sind Pflicht, außer als optional markiert.

---

### Setup

```bash
npm create vite@latest my-app -- --template react-ts
npm install -D tailwindcss @tailwindcss/vite
npm install clsx tailwind-merge
npm install react-router
npx shadcn@latest init
```

---

## Vite + TypeScript

- `@/` als Pfad-Alias auf `src/` in `vite.config.ts` und `tsconfig.json` mappen.
- `tsconfig.json` muss enthalten:
  - `"strict": true`
  - `"noUnusedLocals": true`
  - `"noUnusedParameters": true`

### Regeln

- Nie `any` nutzen
  - `unknown` und explizit eingrenzen

- Non-null-Assertions (`!`) vermeiden
  - Optional Chaining (`?.`) oder Guards bevorzugen

 Typsicherheit ist keine Option — sie verhindert Bugs früh.

---

## Tailwind

- Import über:
  - `@tailwindcss/vite`-Plugin
  - `@import "tailwindcss"` in `src/index.css`

### Regeln

- Klassen immer mit `cn()` aus `@/lib/utils` zusammensetzen
  - (kombiniert `clsx` + `tailwind-merge`)

- Keine Inline-Styles (`style={{}}`) für Dinge, die Tailwind kann—nur für dynamische Werte bei Bedarf
- **Mobile-first**
  - Basis = Mobile
  - `sm:`, `md:`, `lg:` für größere Viewports

 Einheitliches Styling = schnellere Entwicklung + klarere UI.

---

## ShadCN + Base-UI

- `components.json` liegt im **Projektroot**
- Komponenten hinzufügen mit:

  ```bash
  npx shadcn@latest add <name>
  ```

- Generierte Komponenten landen in:

  ```
  src/components/ui/
  ```

### Regeln

- Keine Komponenten neu bauen, die ShadCN schon hat
- Base-UI nur für **unstyled primitives**, die ShadCN nicht abdeckt:

  ```bash
  npm install @base-ui-components/react
  ```

 Komposition vor Neuerfindung.

---

## React Router

- Alle Routen definieren in:

  ```
  src/app/router.tsx
  ```

  mit `createBrowserRouter`

### Regeln

- Layout-Routen mit `<Outlet />`
- `<Route>`-Definitionen **nicht** über die App verstreuen
- URL-/Suchparameter für:
  - Filter
  - Pagination

- Schwere Seiten lazy laden:

  ```ts
  React.lazy(() => import("@/modules/..."));
  ```

 Routing zentral und vorhersagbar.

---

## TanStack Query (optional — Serverdaten)

```bash
npm install @tanstack/react-query
```

### Setup

- App in `<QueryClientProvider>` in `src/main.tsx` wrappen

### Regeln

- `queryKey` ist immer ein **Array**
- Daten nie mit `useEffect` + `useState` fetchen
  - stattdessen `useQuery`

- Schreibvorgänge mit `useMutation`
  - Queries in `onSuccess` invalidieren

 Server-State ≠ UI-State. Getrennt behandeln.

---

## TanStack Virtual (optional — große Listen)

```bash
npm install @tanstack/react-virtual
```

### Regeln

- `useVirtualizer` nutzen
- Scroll-Container braucht:
  - feste Höhe
  - `overflow: auto`

- Nur bei Bedarf (100+ Einträge)

 Nur optimieren, wenn nötig.

---

## TanStack Table (optional — komplexe Tabellen)

```bash
npm install @tanstack/react-table
```

### Regeln

- `columns` **außerhalb** der Komponente definieren
- Nur Row-Models einbinden, die du wirklich nutzt:
  - `getSortedRowModel`
  - `getPaginationRowModel`
  - usw.

 Unnötige Berechnung und Re-Renders vermeiden.

---

## React Helmet Async (optional — SEO)

```bash
npm install react-helmet-async
```

### Setup

- App in `<HelmetProvider>` (über dem Router) wrappen

### Regeln

- Jede öffentliche Seite braucht:
  - `<title>`
  - `<meta name="description">`

- Weglassen für:
  - Dashboards
  - interne Tools
  - nicht indexierte Apps

 SEO nur, wenn Inhalt öffentlich ist.

---

## Provider-Reihenfolge (`src/main.tsx`)

```
StrictMode > HelmetProvider > QueryClientProvider > RouterProvider
```

---

## Basis-Ordnerstruktur

```
/
├── src/                    # Anwendungsquellcode
│   ├── app/                # Bootstrap / Verdrahtung (Routing, Provider, Entry)
│   ├── modules/            # Feature-Module nach Fachdomäne
│   │   └── <feature>/      # Feature-lokale Komponenten, Logik, Tests
│   ├── components/         # Wiederverwendbare UI-Komponenten
│   ├── services/           # externe Integrationen (APIs, Storage, Drittanbieter)
│   ├── lib/                # geteilte Hilfsfunktionen (pure, wiederverwendbar)
│   ├── config/             # Runtime-Config, Env-Mapping, Konstanten
│   ├── styles/             # globale Styles / Design-Tokens
│   ├── assets/             # statische Assets, die der Code importiert
│   └── types/              # geteilte Typ-/Domain-Definitionen bei Bedarf
│
├── tests/                  # Integration/E2E/hochrangige Tests (falls außerhalb src)
├── scripts/                # Build-/Release-/Wartungsskripte
├── public/                 # statische öffentliche Dateien
├── docs/                   # Architektur, ADRs, Runbooks
├── .env.example            # benötigte Umgebungsvariablen (keine Secrets)
├── README.md               # Setup, Befehle, Architektur, Konventionen
└── agents.md               # Projektkonventionen (auch AGENTS.md)
```

---

## Abschließende Prinzipien

- Einfach starten, bewusst skalieren
- Konventionen vor individuellem Setup
- Keine vorzeitige Optimierung
- Alles vorhersagbar und zentral halten
- `purple`, `indigo` oder `violet` nicht als Brand/Primary/Accent beim Setup von Tailwind/CSS—lieber `blue`, `sky`, `teal`, `red`, `orange`—oder die Nutzer:in beim Markenfarbe-Wählen am Anfang fragen

---

## Weiterführend

**Tooling (offizielle Docs)**

- [Vite — Getting started](https://vite.dev/guide/)
- [Tailwind CSS — Install with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [shadcn/ui — Vite](https://ui.shadcn.com/docs/installation/vite)
- [React Router — Home](https://reactrouter.com/home) (aktuelle Docs zu `createBrowserRouter` / Routing)
- [TanStack Query — React](https://tanstack.com/query/latest/docs/framework/react/installation)
- [TanStack Virtual](https://tanstack.com/virtual/latest/docs/introduction)
- [TanStack Table](https://tanstack.com/table/latest/docs/introduction)
- [react-helmet-async (GitHub)](https://github.com/staylor/react-helmet-async)

**TypeScript**

- [TypeScript — tsconfig reference](https://www.typescriptlang.org/tsconfig/) — mit `strict` und Unused-Checks wie in diesem Scaffold

---

## Kerngedanke

Diese Seite bietet praxisnahe Orientierung zu react-app aufsetzen in klaren, wiederverwendbaren Schritten.

---

Englische Version: [`scaffolding-a-react-app.md`](../../en/coding/scaffolding-a-react-app.md)
