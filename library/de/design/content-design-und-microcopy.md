# Content-Design und Microcopy

**Geltungsbereich:** Gilt für **Wörter im Interface**—Labels, Buttons, Formularhilfen, leere Zustände, Fehlermeldungen, Bestätigungen, Benachrichtigungen. Kein Longform-Texten, keine Markenstrategie. Kombiniere mit [`tonalitaet-und-markenstimme.md`](../sprache-&-kommunikation/tonalitaet-und-markenstimme.md), [`leere-und-fehlerzustaende.md`](leere-und-fehlerzustaende.md), [`handlungsaufrufe-und-asks.md`](../sprache-&-kommunikation/handlungsaufrufe-und-asks.md) und [`respektvolle-sprache.md`](../sprache-&-kommunikation/respektvolle-sprache.md).

## Exzerpt
- **Copy ist UI.** Wörter sind genauso Interface wie Buttons.
- **Einfache Sprache, Verben auf Buttons, konsistente Begriffe.**
- **Konkret schlägt generisch**: "Änderungen speichern" schlägt "OK".
- **Microcopy respektiert**—keine Schuld, kein Druck, keine Fallen.
- **i18n von Tag 1**—DE ist länger, AR ist RTL, JA ist dichter.
- Muster unten.

## Vor dem Schreiben

### Konkret

- **Was** tut der User als Nächstes / gerade / kann nicht?
- Welche **Info** braucht er, um zu entscheiden?
- Was ist die **eine Hauptaktion** auf dem Screen?
- Was passiert bei **Fehler**?

### Meta

- Microcopy wird **pro Screen** geschrieben, aber **quer gelesen**. Konsistenz ist ein Feature.
- Kürzeste klare Fassung gewinnt—gemessen an **Verständlichkeit**.

---

## Zweck

Wörter, die Nutzende **mit Sicherheit handeln** lassen—ehrlich, konkret, konsistent, freundlich.

---

## 1. Prinzipien

- **Klarheit** vor Cleverness.
- **Verb zuerst** auf Buttons: "Projekt erstellen", "Einladung senden".
- **Aktiv**: "Wir haben Ihnen eine Mail gesendet" statt "Eine Mail wurde gesendet".
- **Konsistente Begriffe**.
- **Satzschreibweise** für UI-Labels; Titel nur auf Page-Titles.

## 2. Labels

Feld-Label beschreibt **was reinkommt**, nicht wie.

### Schlecht: labels

```
Bitte geben Sie unten Ihre E-Mail-Adresse ein:
```

### Gut: labels

```
E-Mail-Adresse
```

- Label **über** dem Feld.
- **Kurz**, 2–3 Worte.
- **Pflichtmarker** konsistent.

## 3. Buttons/CTAs

- Button-Text = **die Aktion** aus Nutzer-Sicht.
- Kein "OK" auf destruktiven Bestätigungen.
- "Senden" vermeiden—lieber "Einladung senden", "Änderungen speichern".

### Schlecht: buttons/ctas

```
[ OK ]
```

### Gut: buttons/ctas

```
[ Rechnung löschen ]
```

Marketing-CTAs: siehe [`handlungsaufrufe-und-asks.md`](../sprache-&-kommunikation/handlungsaufrufe-und-asks.md).

## 4. Formularhilfen/Validierung

- **Inline-Hilfe** neben dem Feld.
- **Beispiele**: "z. B. 0176 1234567".
- **Validierung** erklärt Problem + Fix.

### Schlecht: formularhilfen/validierung

```
Ungültige Eingabe.
```

### Gut: formularhilfen/validierung

```
Nutzen Sie eine Arbeitsadresse (z. B. sie@ihrverein.de), damit wir Ihr Team verknüpfen können.
```

## 5. Leere Zustände

Siehe [`leere-und-fehlerzustaende.md`](leere-und-fehlerzustaende.md).

```
Noch keine Projekte. Legen Sie Ihr erstes an, um Fortschritt zu sehen.
[ Projekt anlegen ]
```

## 6. Fehlermeldungen

**Was**, **warum**, **was nun**.

### Schlecht: fehlermeldungen

```
Etwas ist schiefgelaufen.
```

### Gut: fehlermeldungen

```
Wir konnten Ihre Änderungen nicht speichern: die Verbindung brach ab.
Ihr Text ist noch da. Erneut versuchen oder offline weiter bearbeiten.
[ Erneut versuchen ]
```

Nie beschuldigen—"Prüfen Sie die E-Mail—das Format erkennen wir nicht."

## 7. Bestätigungen

- Sagen, was passiert; reversibel?
- **Verb** auf Confirm-Button.
- Keine Tricks ("Nö, will ich nicht" für "Abbrechen").

### Gut: bestätigungen

```
"Jahresbericht 2024" löschen?

Die Datei wandert in den Papierkorb. 30 Tage wiederherstellbar.

[ Abbrechen ]   [ Datei löschen ]
```

## 8. Benachrichtigungen/Toasts

- **Perfekt** für "erledigt" ("Einladung gesendet").
- **Präsens** für "läuft" ("Sende…").
- **Futur** für "geplant" ("Wird am 12.05. gesendet").
- **Undo**, wo sicher.

## 9. Lokalisierung

- DE **+30% Länge** einplanen; JP dichter, AR RTL.
- **Idiome** meiden ("nochmal bei Null").
- **Platzhalter** grammatikalisch in allen Sprachen.
- **Übersetzer-Notizen** bei doppeldeutigen Begriffen.
- Siehe [`respektvolle-sprache.md`](../sprache-&-kommunikation/respektvolle-sprache.md).

### Schlecht: lokalisierung

```
"Hi {{name}}, dein {{plan}} wurde gerade besser!"
```

### Gut: lokalisierung

```
"Hallo {{name}}, wir haben Ihren Plan ({{plan}}) aktualisiert."
```

## 10. Was nicht tun

- **Lorem ipsum** im Review.
- Mehrere Begriffe für denselben Begriff.
- **Schreien** (CAPS), zu viel Entschuldigen, Schuld abladen.
- **Humor**, der kulturell nicht hält.
- Wichtiges im **Tooltip** verstecken.

---

## Kerngedanke
Microcopy ist die **freundliche, kompetente Kollegin** im Produkt: sagt, was hier ist, was passieren wird, was passiert ist—in wenigen Worten, in der Sprache der Nutzenden.

## Weiterführend
- [UX Writing Hub](https://uxwritinghub.com/ux-writing-examples/)
- [Microsoft Style Guide](https://learn.microsoft.com/de-de/style-guide/welcome/)
- [Shopify Polaris — Content](https://polaris.shopify.com/content)
- [GOV.UK — Content design](https://www.gov.uk/guidance/style-guide)

---

Englische Version: [`content-design-and-microcopy.md`](../../en/design/content-design-and-microcopy.md)
