# Prompt-Muster

**Scope:** Gilt für **wiederverwendbare Muster** in Prompt-Interaktionen mit Sprachmodellen—Few-Shot, Dekomposition, Kritik-und-Überarbeitung, strukturierte Ausgabe, eingeschränkte Kreativität, Tool-Handoffs. Kein Ersatz für Fachwissen, kein Ersatz für Faktenprüfung. Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`strukturierte-ausgabe-und-tools.md`](strukturierte-ausgabe-und-tools.md), [`modelloutput-bewerten.md`](modelloutput-bewerten.md) und [`kontextfenster-und-chunks.md`](kontextfenster-und-chunks.md).

## Excerpt

- **Few-Shot**, wenn Format/Ton schwer beschreibbar ist—1–3 Beispiele der *genauen* Form.
- **Dekomposition** langer Aufgaben: Gliederung → Ausbau → Edit; an jedem Schritt prüfen.
- **Kritik-dann-Überarbeitung**, wenn ein Entwurf fast passt—erst Liste, dann Fix.
- **Strukturierte Ausgabe** (JSON/Schema), wenn Maschine oder Reviewer parsen.
- **Eingeschränkte Kreativität**, wenn Varianten ohne Chaos nötig sind.
- Skelette, Schlecht/Gut und Grenzen unten.

## Vor der Musterwahl

### Konkret

- Was ist **fragil** (Ton, Struktur, Fakten, Sicherheit)? Zuerst schützen.
- Wird der Output **geparst** oder **gelesen**?
- Ist die Aufgabe **ein** Schritt oder mehrere (Gliederung → Entwurf → Edit)?
- Was kostet ein Fehler—Tippfehler oder Fehlinfo?

### Meta

- Muster senken **Varianz**, nicht **Verantwortung**.
- Das falsche Muster ist schlimmer als keines—nicht fünf Techniken "zur Sicherheit" stapeln.

---

## Zweck

**Vorhersagbare Muster** wählen, damit das Modell fokussiert bleibt, du **schneller reviewst** und Modelle austauschbar werden.

---

## 1. Few-Shot (zeigen statt nur sagen)

Gut, wenn **Format** oder **Stimme** schwer in Regeln passt.

### Gut

```text
Aufgabe: Jede Zeile als "dringend" oder "routine" klassifizieren.

Beispiele:
- "Wir brauchen bis 17 Uhr ein Zitat für die Presse." → dringend
- "FYI Newsletter-Entwurf anbei." → routine
- "Vorstand verschoben auf Freitag." → routine
- "Kinderschutzhinweis von Freiwilligen, heute zu prüfen." → dringend

Zeilen:
1. <...>
```

- 1–3 Beispiele für Format; mehr bei feinem Ton.
- **Positiv + negativ** mischen.
- **Repräsentativ** bleiben.

## 2. Chain-of-Thought (vorsichtig)

Für **explizite Überlegungen** zum Debuggen—aber **prüfen**. Nie als Autorität nehmen.

### Schlecht

```text
Denk Schritt für Schritt und nenne mir die rechtlich korrekte Antwort.
```

### Gut

```text
Aufgabe: Liste die SCHRITTE, um die Aussage zu prüfen.
KEINE Rechtsberatung.

Output:
1) Zu prüfende Punkte
2) Notwendige Belege
3) Was ein Mensch mit Rechtsrat klären muss
```

### Meta

- Nie als **Rechts-, Medizin-, Finanz-, Kinderschutz**-Rat zitieren.
- Brauchst du nur die Antwort: CoT weglassen.

## 3. Dekomposition (Gliederung → Ausbau → Edit)

Lange Texte brechen an **strukturellen** Nähten.

### Gut

```text
Schritt 1: Gliederung mit 5–7 Bullets für 800-Wort-Artikel zu X.
Nur Gliederung, noch keine Absätze.

Schritt 2: Bullet <n> auf 120–160 Wörter in einfacher Sprache erweitern.
Nur die Gliederung nutzen.

Schritt 3: 2-Satz-Zusammenfassung oben; jede Zahl gegen Quelle prüfen.
```

Warum es funktioniert:

- Jeder Schritt hat **eine** Aufgabe.
- Edits in Schritt 1 sind billig, in Schritt 3 teuer.
- Schritte können unterschiedliche Modelle/Reviewer nutzen.

## 4. Kritik-dann-Überarbeitung

Wenn ein Entwurf fast passt.

### Gut

```text
Schritt 1: Entwurf prüfen. Bis zu 5 Punkte gruppiert nach
{Klarheit, Ton, Struktur, Fakten}. NOCH NICHT umschreiben.

Schritt 2: Nur die in Schritt 1 genannten Punkte korrigieren.
Keine neuen Aussagen.

Entwurf:
<...>
```

### Meta

- Trennung macht Streitpunkte sichtbar vor dem Rewrite.
- Gut mit Human-in-the-Loop.

## 5. Eingeschränkte Kreativität

Wenn **Varianten** statt endlosem Brei.

### Gut

```text
Aufgabe: 3 Betreffzeilen für Spenden-Mail.

Regeln:
- Max. 8 Wörter
- Keine Ausrufezeichen
- Keine Superlative ("beste", "großartig", "dringend")
- Drei Winkel: Neugier / Nutzen / Dankbarkeit
- Für trauernde Leser\*innen zumutbar

Format:
1) <Winkel> — <Betreff>
2) <Winkel> — <Betreff>
3) <Winkel> — <Betreff>
```

## 6. Strukturierte Ausgabe (JSON/Schema)

Wenn das Ergebnis geparst wird—siehe [`strukturierte-ausgabe-und-tools.md`](strukturierte-ausgabe-und-tools.md).

### Gut

```text
Gib NUR JSON zurück, das diesem Schema entspricht:
{
  "title": string,
  "bullets": string[],         // max 5, je ≤120 Zeichen
  "confidence": "low" | "medium" | "high",
  "unknowns": string[]
}

Regeln:
- Unbekannt → "" oder []. Keine erfundenen Belege.
- Kein Markdown, kein Kommentar.
```

## 7. Grundierung / "Closed-Book"

Wenn du Quellen hast und im Rahmen bleiben willst.

### Gut

```text
Antworte NUR mit dem KONTEXT unten.
Reicht der Kontext nicht, antworte exakt: "Nicht im Kontext enthalten."

KONTEXT:
<Chunks mit Quellenlabel>

FRAGE:
<...>
```

Siehe [`rag-grundlagen.md`](rag-grundlagen.md).

## 8. Vorsicht bei sensiblen Themen

Kinderschutz, Recht, Medizin, Politik, Krise.

### Gut

```text
Entwurf einer Hinhalte-Mitteilung. Keine Schuldzuweisung, keine Ursachenspekulation,
keine Namen. Wenn ein Input das erfordert, antworte exakt:
"Braucht redaktionelle und rechtliche Prüfung."

Freigegebene Fakten:
- <...>
```

## 9. Tool-Handoff

Modell schlägt Aktion vor, Code führt aus—siehe [`strukturierte-ausgabe-und-tools.md`](strukturierte-ausgabe-und-tools.md).

### Gut

```text
Braucht es externe Fakten, fordere einen Tool-Call an:
{"tool": "web_search", "query": "<Query>"}

Nicht so tun, als wüsstest du es schon.
```

## 10. Anti-Muster

- **Zehn Muster in einem Prompt**—trennen.
- **Roleplay** zur Policy-Umgehung.
- **"Sei kreativ"** ohne Regeln—gibt Brei.
- **CoT-Theater**, wenn nur die Antwort nötig ist.
- **Few-Shot mit privaten Beispielen**, die du nicht veröffentlichen dürftest.

---

## Core idea

Muster sind **Steuerflächen**: Few-Shot für Form, Dekomposition für Länge, Kritik-Revision für Qualität, Grundierung für Fakten, strukturierte Ausgabe für Maschinen. Kleinstes passendes Muster nehmen—und **prüfen**.

## Further reading

- [OpenAI — Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic — Prompt library](https://docs.anthropic.com/claude/prompt-library)
- [Google — Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Lilian Weng — Prompt engineering survey](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)

---

Englische Version: [`prompt-patterns.md`](../../en/ai-&-prompting/prompt-patterns.md)
