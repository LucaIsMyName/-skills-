# Wireframes und Prototyping

**Geltungsbereich:** Gilt für **Skizzen, Wireframes und klickbare Prototypen** digitaler Produkte—welche Auflösung wann, wie testen, wie übergeben. Keine vollständige UX-Forschung, kein Frontend-Engineering. Kombiniere mit [`gute-interfaces-designen.md`](gute-interfaces-designen.md), [`informationsarchitektur.md`](informationsarchitektur.md), [`leere-und-fehlerzustaende.md`](leere-und-fehlerzustaende.md) und [`content-design-und-microcopy.md`](content-design-und-microcopy.md).

## Exzerpt
- **Niedrigste Auflösung, die die Frage beantwortet**—Papier für Flows, Wireframes für Layout, Prototypen für Flow-Validierung, Mockups für Feinschliff.
- **Struktur vor Farbe.** Hierarchie, Inhalt, Navigation prüfen, bevor visuell entworfen wird.
- **Content zuerst**: echte Worte und echte Daten früh einsetzen; Lorem ipsum lügt.
- **Prototypen sind wegwerfbar**—nach dem Test neu bauen.
- **Übergabe annotieren**: Verhalten, States, Constraints, A11y.
- Fidelity-Leiter, Fallen und Handoff-Checkliste unten.

## Vor dem Wireframen

### Konkret

- Welche **Entscheidung** soll das Artefakt freischalten (Navigation, Layout, Flow, Copy, Visual)?
- Zielgruppe (Team, Testpersonen, Stakeholder)?
- Welche **Inhalte** sind real (Headlines, Labels, Fehler, Zahlen)?
- **Constraints** (Marke, A11y, Gerät, Performance)?

### Meta

- Auflösung signalisiert **Sicherheit**. Zu früh hübsch → Reviewer streiten über Kosmetik.
- Wireframe, der erklärt werden muss, ist nicht fertig—die Erklärung gehört ins Wireframe.

---

## Zweck

Design **billig ändern** früh, **präzise übergeben** spät.

---

## 1. Fidelity-Leiter

- **Skizzen** (Papier/Whiteboard): Flows, Konzepte, Varianten.
- **Wireframes** (graue Boxen, echte Copy): Layout, Hierarchie, Navigation.
- **Prototypen** (klickbar): Flow-Validierung, Micro-Interaktion, Formulare.
- **Mockups**: Marke, Typografie, Bilder, States.
- **Redlines/Specs**: Handoff mit Maßen, Tokens, Interaktionen.

**Niedrigste passende Auflösung**—eine Stufe höher, wenn die nächste Frage ansteht.

## 2. Skizzen — Flows und Entscheidungen

Vor dem Tool:

- **Nutzerpfad** als ein Blatt zeichnen.
- Einstiege, Entscheidungen, Erfolgs-/Fehlerzweige.
- **Kritischer Screen**, an dem alles hängt.

### Gut: skizzen — flows und entscheidungen

```
[Home] → [Suche] → [Trefferliste] → [Detail] → [Buchen]
                                     ↑
                                (leer / Fehler)
```

Jetzt entscheiden, nicht später: Suche Page oder Overlay? 1-Zeilen- oder Grid-Treffer? Wo lebt "keine Treffer"?

## 3. Wireframes — Layout/Hierarchie

- **Echte Inhalte**, kein Lorem ipsum, v. a. Headlines/CTAs.
- **Einheitliches Grid**; Spacing-Tokens, falls vorhanden.
- **Nur Graustufen**—Farbe lenkt Review ab.
- Ein Screen pro Frame; Flow-Schritt labeln.
- States markieren: leer, Loading, Fehler, einer-von-vielen, viele (siehe [`leere-und-fehlerzustaende.md`](leere-und-fehlerzustaende.md)).

## 4. Prototypen — Flow-Validierung

- Klickprototyp in Figma/Framer/Code.
- **Sad Paths** einbauen: Fehler, leer, offline, nicht gespeichert, Timeout.
- **5 Personen** testen, nicht 50—3–5 zeigen die meisten Probleme.
- **Aufgaben** stellen, keine Leitfragen ("Rechnung bezahlen" statt "Wie würden Sie den Zahlungsscreen nutzen?").
- Hindernisse notieren; Top 3 fixen vor der nächsten Runde.

## 5. Mockups — Visual

- **Design-Tokens** nutzen.
- **Schwierigster** Screen zuerst (dichte Daten, lange Copy, Worst Case).
- **Alle States**: focus, hover, active, disabled, loading, error, empty.
- **Kontrast** und **Schriftgrößen** prüfen.

## 6. Content-first

Echter Content verändert das Design.

- Längste plausible Copy pro Slot (DE +30% zu EN).
- Echte Zahlen mit echten Trennern.
- Echte Nutzernamen, keine "Max Mustermann"-Leichen.
- Fehlermeldungen (siehe [`leere-und-fehlerzustaende.md`](leere-und-fehlerzustaende.md)).
- Datumsformat + Zeitzone der Nutzer.

## 7. Barrierefreiheit

- **Tab-Reihenfolge** und Shortcuts markieren.
- **Focus-Styles** definieren.
- **Kontrast** prüfen (WCAG 2.2 AA).
- **Screenreader-Text** für Icons/Bilder/Deko annotieren.
- Siehe [`barrierefreiheit-im-code.md`](../coding/barrierefreiheit-im-code.md).

## 8. Reviews

- **Konkrete** Fragen stellen ("Passt die Hierarchie zur Aufgabe?").
- **Stilles Review** zuerst, dann Diskussion.
- **Usability** von **Geschmack** trennen.
- **Optionen** statt einem Design bringen.

## 9. Handoff

- **Finale Screens** in realen Viewports.
- **Annotationen**: States, Verhalten, Edge Cases, A11y.
- **Assets** richtig exportiert.
- **Tokens**: Farben, Spacing, Radii.
- **Copy**: jede UI-Zeile inklusive Fehlerzustände.

## 10. Was nicht tun

- **High Fidelity** für unfertige Flows.
- **Lorem ipsum** im Review.
- **Leere/Fehler-States** weglassen.
- Nur **Happy Path** prototypen.
- Ohne Antworten auf **Mobile / keine Daten / offline / langsam** übergeben.

---

## Kerngedanke
Billig designen, wenn Ideen billig sind; präzise übergeben, wenn Bauen teuer wird. Wireframes und Prototypen sind **Entscheidungswerkzeuge**.

## Weiterführend
- [NN/g — Paper prototyping](https://www.nngroup.com/articles/paper-prototyping/)
- [Figma — Prototyping](https://help.figma.com/hc/en-us/categories/360002051613-Prototype)
- [Smashing Magazine — UX](https://www.smashingmagazine.com/category/ux/)
- [IDEO — Methods](https://www.ideo.com/methods)

---

Englische Version: [`wireframing-and-prototyping.md`](../../en/design/wireframing-and-prototyping.md)
