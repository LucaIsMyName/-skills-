# Tailwind CSS — Leitfaden

## Geltungsbereich:

**Utility-first-Styling** mit Tailwind in Anwendungen (dieses Library-Setup: **Tailwind v4**-Stil mit `@import 'tailwindcss'`, CSS-first-Konfiguration und `@theme`-Tokens). Ergänzt [`barrierefreiheit-im-code.md`](barrierefreiheit-im-code.md), [`react-best-practices.md`](react-best-practices.md) und die Design-Explainers unter **Design**.

## Exzerpt

- **Tokens statt Einzelpixel.** Wiederkehrende Werte ins Theme legen (`@theme`, Design-Tokens), damit die UI konsistent bleibt.
- **Utilities beschreiben Zustand, keine Geschichten.** `hover:`, `focus-visible:`, `disabled:` gehören zur gleichen Komponente, wenn das Verhalten lokal ist.
- **Komponenten extrahieren, wenn Wiederholung weh tut**—nicht beim ersten Duplikat; zweimal copy/paste ist oft billiger als die falsche Abstraktion.
- **`@apply` sparsam**—sinnvoll in Base-Layers und gemeinsamen Primitiven; ungeeignet, um jede Utility in CSS nachzubauen.
- **Fokus nie entfernen** ohne sichtbaren, tastaturfreundlichen Ersatz—hübsche UIs ohne Fokus sind kaputte UIs.
- Muster, v4-orientierte Setup-Hinweise und Fallen unten ausführlicher.

## Zweck

Mit diesem Skill **vorhersagbares, wartbares Tailwind** in Feature-Code liefern: wann Utilities, wann Komponenten, wie **responsive und zugängliche** Styles lesbar bleiben und wie man nicht gegen das Framework arbeitet.

---

## Denkmodell

Tailwind sind **Design-Grenzen als Klassen**:

- Du wählst aus einer **Skala** (Abstand, Typo, Farbe) statt überall `margin: 13px` zu erfinden.
- Layout und Zustand stehen **explizit im Markup**—gut für lokales Verständnis; schlecht, wenn eine Zeichenkette ohne Struktur wächst.

---

## 1. Projekt-Setup (v4-orientiert)

### Typischer CSS-Einstieg

```css
@import "tailwindcss";

@theme {
  /* Produkt-Tokens — Schriften, Radien, Markenfarben */
  --font-sans: system-ui, sans-serif;
}

@layer base {
  body {
    @apply m-0 min-h-screen antialiased;
  }
}
```

### Worauf abstimmen

- **Eine Quelle der Wahrheit** für Fonts, Spacing-Rhythmus und semantische Farben (Surface, Text, Border, Accent—gleiche Begriffe wie in [`../design/design-tokens-und-theming.md`](../design/design-tokens-und-theming.md)).
- **Content-Erkennung:** Build-Tooling muss **alle** Template-Dateien scannen (z. B. `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`), sonst fehlen Utilities in Production.

---

## 2. Utilities vs. Komponenten

### Utilities, wenn

- Layout **einfach** ist (Flex/Grid, Padding, Gap).
- Zustand **lokal** an einem Element hängt.
- Du **Tempo** brauchst und das Markup lesbar bleibt.

### Komponente (Funktion oder Partial), wenn

- **Dieselben 15+ Klassen** mehrfach **mit gleicher Bedeutung** vorkommen („Primary Button“, „Card-Hülle“).
- **Props** für Varianten nötig sind, sonst wird die String-Interpolation unleserlich.
- Tests oder Storybook einen **benannten Baustein** brauchen.

### Anti-Muster

- **Vorschnelle Wrapper** für jedes `div` „falls wir später themen“—kapseln, wenn Duplikation **semantisch** wiegt, nicht nur optisch.

---

## 3. Responsive und Container

- **Mobile-first:** unprefixed = Basis; `sm:`, `md:`, `lg:` erhöhen Komplexität nach oben.
- **Breakpoints nicht spiegeln**, wo nur das Grid sich ändert—`md:` am Grid-Container reicht.
- Für Fließtext **max-width + seitliche Abstände** (`max-w-prose`, Gutter) statt volle Breite auf großen Screens.

---

## 4. Interaktion und Fokus

- **Hover ist kein Mobil-Signal.** `hover:` mit Touch-tauglichen Zielen kombinieren; Aktionen nicht nur per Hover enthüllen (Touch-Themen bei **Design**).
- **`focus-visible:`** für Tastaturfokus—nicht überall blind `focus:`, sonst flackert es bei Mausklicks.
- **Disabled:** `disabled:`-Styles mit wirklich deaktivierten Controls—`pointer-events-none` ohne `disabled` ist eine Falle.

---

## 5. Farbe und Kontrast

- **Semantische Paare** aus der Palette—`text-zinc-600` auf `bg-zinc-50` ist eine Beziehung, keine Zufallskombination.
- **Nie nur Farbe** zur Bedeutung (mit Icon/Text ergänzen); passt zu [`../design/farbe-und-kontrast.md`](../design/farbe-und-kontrast.md).
- **Dark Mode** planen, nicht improvisiert invertieren (`:dark` / `dark:`-Varianten).

---

## 6. Arbitrary Values und Einmalwerte

- **`w-[472px]`**, **`bg-[#1a1a1a]`** sind Notausgänge—für Prototypen oder echte Ausnahmen ok.
- Steht der Wert **zweimal** drin, ins **`@theme`** oder benannte Klasse heben—Arbitrary-Spam erschwert Refactors.
- **Arbitrary Variants** (`[&_svg]:`, `group-data-[…]:`) sind mächtig; bei unklaren Selektoren einen **Kommentar** über dem JSX setzen.

---

## 7. `@apply`: wo es hilft, wo nicht

### Sinnvoll

- **Base-Layer** (`body`, `a` unter `@layer base`).
- **Kleine Primitiven**, identisch wiederverwendet (Reset-Button, gemeinsamer Focus-Ring).

### Ungeeignet

- **Halbes Tailwind** in `.css` mit langen `@apply`-Ketten nachbauen—schwerer lesbar als Utilities in der Komponente.
- **Einmalige** Styles, die nirgends sonst leben—dort inline lassen.

---

## 8. Lesbarkeit in JSX / Templates

- **Klassen sortieren** (offizielles Prettier-Plugin oder Team-Konvention: Layout → Box → Typo → Optik → States).
- **Lange Strings** mit `clsx`/`cn` **nur bei** echter Bedingungslogik—notwendig; für statische Strings kein Over-Engineering.
- **Absicht im Namen** der Komponente oder `data-testid`, wenn Verhalten zählt—Klassennamen allein sagen selten das _Warum_.

---

## 9. Barrierefreiheit (Tailwind-spezifisch)

- **Sichtbarer Fokus** für Tastatur (`outline`, `ring`, `ring-offset`).
- **Motion:** `prefers-reduced-motion` für große Übergänge respektieren (`motion-safe:` / `motion-reduce:` oder CSS unter `@layer`).
- **Semantik zuerst:** Utilities ersetzen kein falsches HTML—`<button>` bleibt Button, Landmarks bleiben Landmarks.

---

## 10. Typische Fehler

| Fehler                               | Warum problematisch                                  |
| ------------------------------------ | ---------------------------------------------------- |
| Unwartbare Riesenstrings             | Schwer reviewbar; Breakpoints übersehbar.            |
| Skala ignorieren                     | Beliebige Pixel zerlegen Rhythmus und Design-System. |
| Fokus „aus ästhetischen Gründen“ weg | Tastatur- und AT-Nutzung kollabiert.                 |
| „Card“ fünfmal anders                | Visuell driftend; Primitive konsolidieren.           |
| Content-Pfade ignorieren             | Fehlende Klassen in Production = Layout kaputt.      |

---

## Vollständigkeit vor Release der UI

Mit **realen Inhalten**, mehreren Breakpoints und **Tastatur** validieren—Tailwind macht Iteration schnell; diese Geschwindigkeit darf **Kontrast und Fokus** nicht überspringen.

---

## Meta

- Tailwind-Versionen ändern sich—für API-Details **offizielle Doku**; dieser Skill hält **Teamsicht** fest: wann abstrahieren, wann utility-first bleiben, und wie Anbindung an Barrierefreiheit und Design-Tokens gelingt.

---

## Kerngedanke

Diese Seite bietet praxisnahe Orientierung zu tailwind css — leitfaden in klaren, wiederverwendbaren Schritten.

## Weiterführend

- Nutze die verwandten Seiten im Geltungsbereich fuer vertiefende Beispiele und angrenzende Workflows.

---

Englische Version: [`tailwind-guide.md`](../../en/coding/tailwind-guide.md)
