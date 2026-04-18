# Modelloutput bewerten

**Geltungsbereich:** Gilt für **Urteil, ob eine Modell-Antwort ausreicht**—Rubriken, Human-Review, automatische Checks, Regressionssets, Red-Teaming. Kein Modellbenchmarking. Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`strukturierte-ausgabe-und-tools.md`](strukturierte-ausgabe-und-tools.md), [`quellenbewertung-und-faktencheck.md`](../recherche-&-analyse/quellenbewertung-und-faktencheck.md) und [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md).

## Exzerpt
- **Abnahmekriterien zuerst**: benennen, was "gut" heißt, bevor du liest.
- **Vier Linsen**: Richtigkeit, Angemessenheit, Vollständigkeit, Sicherheit.
- **Human-in-the-Loop** für alles, worauf die Zielgruppe sich verlässt; **automatische Checks** für Skalierung.
- **Regressionsset** kanonischer Prompts—bei Prompt/Modell/Policy-Änderung laufen lassen.
- **Red-Teaming** mit feindlichen Inputs (Jailbreaks, Prompt-Injection, Edge Cases).
- Rubriken, Metriken, Fehlerkatalog unten.

## Vor der Bewertung

### Konkret

- Welche **Entscheidung** speist der Output (senden, archivieren, verwerfen, eskalieren)?
- **Zielgruppe** und Kosten eines Fehlers?
- Welche **Kriterien** sind harte Ausschlüsse?
- Wie viele Outputs (ein Entwurf vs. 10.000 Übersetzungen)?

### Meta

- Bewertung ist **Spezifikation, zu spät**. Besser früh.
- "Wirkt gut" ist **keine** Bewertung.

---

## Zweck

**Bewusst und nachvollziehbar** entscheiden, ob ein KI-Output geht—skalierbar von einer Mail bis zur Pipeline.

---

## 1. Kriterien vor dem Lesen

Bei jedem nicht-trivialen Output Kriterien **vorher** notieren.

```text
Kriterien für Spender-Mail:
- Unter 140 Wörter.
- Keine unbelegten Statistiken.
- CTA eigene Zeile, Links korrekt.
- Warm, ohne Druck.
- Keine PII außer Vorname-Platzhalter.
- Lesestufe ≈ CEFR B1.
```

Gegen die Liste urteilen, nicht gegen Bauchgefühl.

## 2. Die vier Linsen

- **Richtigkeit** — Fakten, Zahlen, Namen, Daten, Zitate?
- **Angemessenheit** — Ton, Zielgruppe, Locale, Marke.
- **Vollständigkeit** — Briefing abgedeckt.
- **Sicherheit** — keine PII, keine Diskriminierung, keine Policy-Brüche, keine irreführende Auslassung.

Hard-Fail bei Sicherheit/Richtigkeit blockt. Angemessenheit/Vollständigkeit sind meist fixbar.

## 3. Wirksamer Human-Review

- **Zwei Durchgänge**: einmal Inhalt, einmal laut lesen für Ton.
- **Quellen** prüfen: jede Zahl, jedes Zitat.
- **Feindlich skimmen**: "Was könnte ein bösartiger Leser missverstehen?"
- **Zeit-Box**: mehr als 15 Min Fixaufwand → neu schreiben.

## 4. Automatische Checks

Billig, schnell, fangen viel:

- **Schema-Validierung**.
- **Regex/Pattern**: kein `lorem`, kein `TODO`, kein `{{placeholder}}`.
- **Längen**-Limits.
- **Verbotene Wörter**.
- **Link-Check**: 200er, Domain korrekt.
- **Sprachcheck**: Locale stimmt.
- **PII-Detektor** auf Input **und** Output.

In CI für veröffentlichte KI-Artefakte.

## 5. Zweites Modell als Judge (vorsichtig)

- Geht für **Pattern**-Checks (Format, Ton, klare Widersprüche).
- **Schwach** bei Fakten—ohne Ground Truth keine Verifikation.
- Verzerrt zu **langen**, selbstsicheren Antworten—mit Rubriken kalibrieren.
- Stichprobe gegen menschliches Urteil.

### Gut: zweites modell als judge (vorsichtig)

```text
Du bist strenger Rubrik-Grader. Bewerte den Entwurf:
- accuracy_of_claims (0–2): 2 wenn jede Aussage wörtlich in SOURCE steht
- tone_fit (0–2): 2 wenn Ton zum STYLEGUIDE passt
- completeness (0–2)

Gib JSON zurück: { "scores": {...}, "issues": [...] }
```

## 6. Regressionssets

10–50 **kanonische** Inputs mit erwarteten Eigenschaften.

- Bei jeder Änderung laufen lassen.
- **Assertions** (enthält, matcht, Schema), keine exakten Strings.
- Edge Cases: leer, mehrsprachig, doppeldeutig, feindlich.
- Im Repo, versioniert.

## 7. Red-Team

Gezielt brechen.

- **Jailbreaks**: "Ignoriere Anweisungen"—hält das System?
- **Prompt-Injection**: feindlicher User-Doc-Inhalt.
- **Voreingenommene Anfragen**: Stereotype?
- **PII-Leak**: gibt es Trainingsdaten preis?
- **Quellenhalluzination**: nicht existierende Zitate?

Angriffe und Fixes loggen; Regressionsset erweitern.

## 8. Fehlerkatalog

- **Selbstsichere Halluzination** — konkret, falsch. Fix: grundieren, "nicht im Kontext".
- **Plausible Umschreibung** — Form richtig, subtil falsch. Fix: wörtlich vergleichen.
- **Auslassung** — heikle Fakten weg. Fix: "muss enthalten".
- **Ton-Drift** — Hype-Kriecherei. Fix: Gegenbeispiel, Verbotswörter.
- **Kultureller Miss** — idiomatischer Fehlgriff. Fix: Muttersprachler-Review.
- **Rechts-Nähe** — driftet in Rechtsrat. Fix: Verweigerung.
- **Formatbruch** — JSON kaputt. Fix: Schema-Modus + Validator + Repair.

## 9. Entscheidungen dokumentieren

Für Shippbares:

- Modell + Version, Prompt-Version, Reviewer, Datum.
- Vorher/Nachher bei materieller Redaktion.
- KI-Beteiligung offenlegen ([`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md)).

## 10. Was nicht tun

- Unreviewten Output bei **Kinderschutz, Recht, Medizin, Finanzen, Politik** senden.
- "Klang richtig" als Qualität werten.
- Nur **Happy-Path** prüfen.
- Eine `prompt.txt` ohne Version und Testset pflegen.

---

## Kerngedanke
Bewertung ist **Spezifikation, angewandt**: Kriterien nennen, Richtigkeit zuerst, automatisieren, Rest red-teamen, Regressionsset pflegen. Ein beschreibbarer Prozess ist ein verbesserbarer Prozess.

## Weiterführend
- [Promptfoo](https://www.promptfoo.dev/)
- [OpenAI — Evals](https://platform.openai.com/docs/guides/evals)
- [Anthropic — Developing and evaluating prompts](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

---

Englische Version: [`evaluating-model-output.md`](../../en/ai-&-prompting/evaluating-model-output.md)
