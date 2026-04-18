# Kontextfenster und Chunks

**Scope:** Gilt für **Passen von Dokumenten, Verlauf und Tool-Outputs** ins **Kontextfenster** eines Sprachmodells—Chunking, Zusammenfassung, Priorisierung, Re-Anchoring, Kosten/Latenz. Nicht Modellarchitektur, nicht Produktions-Vektor-Infra (siehe [`rag-grundlagen.md`](rag-grundlagen.md)). Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`prompt-muster.md`](prompt-muster.md), [`skill-dokumentation-schreiben.md`](skill-dokumentation-schreiben.md) und [`sprachmodelle-im-code-nutzen.md`](../coding/sprachmodelle-im-code-nutzen.md).

## Excerpt

- **Kontext ist endlich** (Tokens) und **nicht gratis** (Kosten, Latenz). Planen, nicht "reinstopfen".
- **Chunks** an logischen Nähten; gleiche Frage pro Chunk; am Ende zusammenführen.
- **Zusammenfassungen** mit explizitem Ziel; "fasse zusammen" verbirgt wichtige Fehler.
- **Re-Anchoring** in langen Threads; das Modell driftet mit vollem Kontext.
- **Retrieval** schlägt Stopfen meistens.
- **Keine PII** reinpacken, die nicht gebraucht wird.

## Vor dem Laden von Kontext

### Konkret

- Wie viel Text ist **wirklich** nötig?
- Was ist **maßgeblich** (Vertrag, Policy) vs. **nice-to-have**?
- Geht **Retrieval** statt Einfügen?
- Wie viel **Headroom** für die Antwort?

### Meta

- **Kontext-Rot**: zu viel Irrelevantes erhöht Fehler, Halluzinationen, Kosten.
- Alte Chats häufen Fehler—manchmal ist Neustart am schnellsten.

---

## Zweck

Kontextbudget für **Signal** ausgeben, damit Outputs **geerdet, fokussiert, bezahlbar** sind.

---

## 1. Das Kontextbudget

`Budget = Kontextfenster − Antwort-Headroom`.

- **Aufgaben-Prompt**: knapp und eindeutig.
- **Quelltext**: auf Relevantes kürzen.
- **Verlauf**: zusammenfassen oder wegwerfen.
- **Few-Shot-Beispiele**: so klein wie noch wirksam.

### Schlecht

```text
[40-Seiten-PDF einfügen]
Fasse zusammen.
```

### Gut

```text
Aufgabe: Nur Abschnitt 3 (Zeilen 120–180) in 6 Bullets in einfacher Sprache.
Jeder Bullet muss wörtlich aus dem Auszug zitieren.

Auszug (Abschnitt 3 only, Namen geschwärzt):
<...>
```

## 2. Chunking-Strategien

- **Semantische Chunks**: nach **Überschriften**/**Abschnitten**, nicht nach Zeichenzahl.
- **Überlappung** 1–3 Sätze bei übergreifenden Konzepten.
- **Titel** im Chunk lassen.
- **IDs** (`chunk_3.2`) für Zitate.

### Gut

```text
Für jeden Chunk dieselbe Frage beantworten:
"Welche Risiken nennt dieser Chunk? Zitiere jedes Risiko wörtlich."

Nicht darüber hinaus generalisieren.

[chunk 3.2]
<...>
```

Merge: Finaler Lauf über die Chunk-Antworten ("dedupliziere, gruppiere thematisch, Zitate behalten").

## 3. Zusammenfassen

Summaries verdichten auch **Fehler**. Ziel explizit machen.

- **Map**: pro Chunk ein begrenztes Artefakt (5 Bullets + 1 Zitat).
- **Reduce**: strukturiertes finales Artefakt.
- **Verify**: Zitate gegen Quelle prüfen.

### Schlecht

```text
Fasse in 3 Sätzen zusammen.
```

### Gut

```text
Zusammenfassung für ein Vorstandsmitglied.

Einschränkungen:
- 8 Bullets à ≤25 Wörter.
- Daten/Zahlen/Verpflichtungen wörtlich.
- Am Ende Liste "offene Fragen".
- Keine neuen Aussagen; Unklares benennen.
```

## 4. Re-Anchoring langer Threads

Modelle vergessen, warum ihr redet. Alle paar Turns erinnern.

### Gut

```text
Reset: Wir beantworten EINE Frage:
"Können wir Kampagne X im Budget Y bis Z laufen?"

Frühere Tangenten zu Branding ignorieren, sofern nicht in dieser Quelle <ref>.
```

Alternative: **Neue Session** mit kurzem Briefing. Billig, sauber, weniger Drift.

## 5. Wann Retrieval statt Einfügen

Retrieval (RAG), wenn:

- Korpus passt nicht (auch einmalig) ins Fenster.
- Korpus **ändert** sich.
- **Quellenangaben** nötig.
- PII mit **Zugriffskontrolle**.

Siehe [`rag-grundlagen.md`](rag-grundlagen.md) und [`ki-in-der-recherche.md`](ki-in-der-recherche.md).

## 6. Prompt-Caching

Viele Anbieter cachen stabile Präfixe.

- **Stabil** nach vorn: System-Prompt, Styleguide, Schema, Beispiele.
- **Volatil** ans Ende: Aufgabe, aktueller Chunk.
- Cache senkt Kosten/Latenz deutlich.

Vendor-Semantik aktuell prüfen.

## 7. Kosten und Latenz

- **Input-Tokens** sind meist billiger als Output—lange Prompts weniger schlimm als lange Antworten.
- **Streaming** verbessert gefühlte Latenz.
- **Batching** spart Overhead (z. B. Übersetzungen).
- **Kleinere Modelle** für Map/Chunking; Top-Modell für Reduce.

## 8. Datenschutz im Scale

- **Schwärzen** vor dem Einfügen; lokale Mapping-Tabelle, falls Re-Identifikation nötig.
- **Enterprise/No-Training**-Endpoints.
- Log: **was** wurde gesendet und **warum**, nicht der Inhalt.
- Folge [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md).

## 9. Debugging von Kontextproblemen

- **Abschnitt ignoriert**: zu weit von der Frage—Frage näher setzen oder re-anchor.
- **Halluzinierte Fakten**: zu wenig Grundierung—Closed-Book.
- **Widerspricht sich**: Verlauf zu lang—zusammenfassen, neu starten.
- **Outputs zu kurz**: Input kürzen, weniger Bullets verlangen.

## 10. Was nicht tun

- **Alles** "sicherheitshalber" einfügen.
- Annehmen, das Modell liest das ganze Fenster gleichmäßig.
- Wochenlange Chat-Threads als Wissensbasis nutzen—**dokumentieren**.
- **Secrets** in den Kontext legen.

---

## Core idea

Kontext ist ein **Budget**: kleinster Prompt, minimale maßgebliche Belege, Retrieval bei großen Korpora, frische Session bei müden Threads. Der beste Kontext macht die Antwort **kurz, geerdet, leicht reviewbar**.

## Further reading

- [OpenAI — Models and token limits](https://platform.openai.com/docs/models)
- [Anthropic — Long context](https://docs.anthropic.com/claude/docs/long-context-window-tips)
- [Google — Gemini context caching](https://ai.google.dev/gemini-api/docs/caching)
- [Nelson Liu et al. — Lost in the middle](https://arxiv.org/abs/2307.03172)

---

Englische Version: [`working-with-context-windows.md`](../../en/ai-&-prompting/working-with-context-windows.md)
