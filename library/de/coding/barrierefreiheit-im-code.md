# Barrierefreiheit im Code

**Geltungsbereich:** Gilt für **Web-UI-Code** (HTML, CSS, JS/TS, React)—die technische Seite der Barrierefreiheit. Ergänzt [`barrierefreiheit-kommunikation.md`](../sprache-&-kommunikation/barrierefreiheit-kommunikation.md) (Texte, Bildbeschreibungen, Untertitel) und [`gute-interfaces-designen.md`](../design/gute-interfaces-designen.md).

## Exzerpt
- **Zuerst semantisches HTML.** Das Element wählen, das den Job schon erfüllt; ARIA nur, wenn kein natives Element passt.
- **Tastaturzugang ist Pflicht.** Jedes interaktive Element ist mit `Tab` / `Shift+Tab` / `Enter` / `Leertaste` / Pfeiltasten (wo üblich) erreichbar, bedienbar und sichtbar fokussiert.
- **Farbe ist nicht der einzige Hinweis.** Kontrast erfüllt WCAG AA; Zustandsänderungen nutzen auch Text, Icon oder Form.
- **Screenreader brauchen eine logische Seite.** Landmarks, Überschriftenreihenfolge, Linktexte, Formularlabels, Live-Regionen.
- Vollständige Regeln, Muster und Anti-Muster unten.

## Bevor UI ausgeliefert wird

Bevor UI-Code geschrieben oder generiert wird, klären **wer es nutzt und wie**. Barrierefreiheit nicht am Ende „draufkleben“.

### Konkret

- Welcher **Elementtyp** passt: Button, Link, Checkbox, Disclosure, Dialog, Listbox, Menü?
- Gibt es ein **nativ**es Element oder ein etabliertes **ARIA-Muster** (WAI-ARIA Authoring Practices)?
- Wie ist der **Tastaturpfad** vom Seitenstart bis zur erledigten Aufgabe?

### Meta

- Barrierefreiheit ist **Korrektheit**, keine Dekoration.
- Automatisierte Tools (axe, Lighthouse) fangen ~30–40 %. Der Rest braucht Tastatur- und Screenreader-Smoketests.

---

## Zweck

Schnittstellen ausliefern, die **mit Tastatur, Screenreader, bei 200 % Zoom, bei reduzierter Bewegung, mit Maus und per Touch** funktionieren—ohne eine separate „Barrierefrei-Version“.

---

## 1. Mit HTML beginnen

- Ein **Button** ist `<button>`, nicht `<div onClick>`.
- Ein **Link** führt irgendwohin (`<a href>`); ein **Button** löst eine Aktion aus.
- Formularfelder haben ein **echtes `<label>`** verknüpft per `for`/`id` oder umschließend.
- Überschriften in Reihenfolge: `<h1>` einmal pro Seite/Route, dann `<h2>`, `<h3>`—nicht überspringen nur wegen Schriftgröße.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.

### Schlecht: mit html beginnen

```html
<div class="btn" onclick="save()">Save</div>
```

### Gut: mit html beginnen

```html
<button type="button" onclick="save()">Save</button>
```

## 2. Tastaturzugang

- Alles Klickbare ist **per Tab erreichbar**.
- Fokusreihenfolge **folgt der Lesereihenfolge**—kein `tabindex` größer als 0.
- Sichtbarer Fokusring auf jedem interaktiven Element; `:focus-visible` für Zeigegerät-Nutzer, voller Ring für Tastatur.
- Standardtasten: `Enter` / `Leertaste` aktivieren Buttons; Pfeiltasten in zusammengesetzten Steuerelementen (Menüs, Tabs, Radio-Gruppen).
- **Skip-Link** oben: „Zum Hauptinhalt springen“.

## 3. ARIA: letzter Ausweg, nicht erster

- Erste ARIA-Regel: **kein ARIA**, wenn ein natives Element reicht.
- Zweite Regel: einem **etablierten Muster** folgen—nichts erfinden. WAI-ARIA Authoring Practices konsultieren.
- `role="button"` auf `<div>` ist drei Dinge, die schiefgehen können (Rolle, Tabindex, Tastatur-Handler). `<button>` nutzen.
- `aria-label` überschreibt den sichtbaren Text für Hilfstechnik—wenn du es brauchst, ist der sichtbare Text vermutlich falsch.

## 4. Formulare

- **Jedes Eingabefeld labeln.** Platzhalter ist kein Label.
- **Gruppieren** mit `<fieldset>` + `<legend>` (Radio-Gruppen, Adressblöcke).
- **Fehlermeldungen** per `aria-describedby` verknüpfen; bei asynchronem Erscheinen in einer **Live-Region** ankündigen.
- Validierung bei Blur oder Submit, nicht bei jedem Tastendruck—sonst überfluten Screenreader.
- `autocomplete`-Attribute (`autocomplete="email"`, `"name"`, `"postal-code"`) helfen Nutzer:innen und Passwort-Managern.

## 5. Bilder, Icons, Medien

- Informatives Bild: echtes `alt`, das den Inhalt beschreibt.
- Dekoratives Bild: `alt=""` (leer, nicht fehlend) und bei SVG ggf. `role="presentation"`.
- Nur-Icon-Buttons: erreichbaren Namen setzen (`aria-label` oder visuell versteckter Text).
- Video: Untertitel für Audio, Transkript bei langen Videos, Audiodeskription bei rein visueller Information.

## 6. Farbe und Kontrast

- WCAG **AA**: 4,5:1 für Fließtext, 3:1 für großen Text und UI-Komponenten.
- Zustand **nie nur über Farbe** vermitteln—Icon, Text oder Form dazu.
- Bei 200 % Browser-Zoom testen; kein horizontaler Scroll, kein abgeschnittener Text.
- `prefers-color-scheme` unterstützen und manuelles Theme-Override anbieten.

## 7. Bewegung, Zeit und Layout

- `prefers-reduced-motion` respektieren: keine autoplay-Animationen, kein Parallax, keine langen unnötigen Übergänge.
- **Kein Inhalt, der sich bewegt, blinkt oder öfter als alle 5 Sekunden aktualisiert**, ohne Nutzerkontrolle.
- **Reflow**: Inhalt bei 320 px Breite nutzbar ohne horizontalen Scroll.
- **Zielgröße**: interaktive Elemente mindestens 24×24 CSS-Pixel (WCAG 2.2 AA), idealerweise 44×44.

## 8. Dynamische UI, screenreader-freundlich

- Live-Regionen: `aria-live="polite"` für nicht dringende Statusmeldungen, `"assertive"` nur bei Fehlern.
- Toasts und Ladezustände **einmal** in eine Live-Region, nicht bei jedem Tastendruck.
- Routenwechsel in SPAs: Fokus auf neue `<h1>` oder Landmark; neuen Seitentitel ankündigen.
- Dialoge: Fokus einsperren, beim Schließen Fokus zurück zum Auslöser, `aria-modal="true"`, Titel zuordnen.

## 9. Testen, nicht hoffen

- **Nur Tastatur**: Maus weg, kompletten Flow mit Tastatur bedienen.
- **Screenreader**: VoiceOver (macOS/iOS), NVDA (Windows), TalkBack (Android)—mindestens einer pro Release.
- **Automatisiert**: axe-core in Unit-Tests, Lighthouse in CI.
- **Zoom**: 200 % und 400 % Reflow.
- **Reduzierte Bewegung**: OS-Einstellung umschalten und prüfen.

## 10. Was nicht tun

- Fake-Buttons aus `<div>` oder `<span>`.
- Fokus-Rahmen verstecken ohne Ersatz.
- `title` als einzigen erreichbaren Namen setzen.
- Sinnvollen Text in `background-image` legen.
- Eine „Mobile-Version“ und eine separate „Barrierefrei-Version“ ausliefern.

---

## Kerngedanke
Eine barrierefreie UI ist kein separater Modus—sie ist der **einzige Modus**, von der ersten Komponente an geplant und gebaut. Wenn Tastatur- oder Screenreader-Nutzer:innen eine Aufgabe nicht erledigen können, ist das ein **Bug**, kein Feature-Request.

## Weiterführend

- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) — Muster für Widgets, Tastaturführung und Rollen
- [MDN — Barrierefreiheit](https://developer.mozilla.org/de/docs/Web/Accessibility) — HTML, CSS und ARIA im Browser zusammendenken
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) — statische Prüfungen für typische JSX-/React-Fallen

---

Englische Version: [`accessibility-in-code.md`](../../en/coding/accessibility-in-code.md)
