# Prompten-Grundlagen

**Geltungsbereich:** Gilt für **wirksame Anweisungen** an Sprachmodelle—Rollen, Einschränkungen, Beispiele, Iteration, Prüfung. Nicht für Modelltraining, Einkauf oder organisationsweite KI-Richtlinien (siehe [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md)). Kombiniere mit [`prompt-muster.md`](prompt-muster.md), [`modelloutput-bewerten.md`](modelloutput-bewerten.md) und [`skill-dokumentation-schreiben.md`](skill-dokumentation-schreiben.md).

## Exzerpt
- **Aufgabe** in einem Satz; klare **Einschränkungen** (Länge, Ton, Zielgruppe, Format, Verbote).
- **Beispiele** bei schwer beschreibbarer Form; **Gegenbeispiele** gegen wiederkehrende Fehler.
- **Iterieren**: kleinster Prompt, der plausibel reicht → Output gegen Abnahmekriterien lesen → **eine** Variable ändern.
- **Verifizieren** jede sachliche Aussage; du, nicht das Modell, verantwortest, was rausgeht.
- **Nie** PII, Kinderschutzfälle, Spender\*innendaten oder unveröffentlichte Zitate in ungeprüfte Tools pasten.
- Regeln, Fehlerarten und Vorlagen unten.

## Vor dem Prompten

Vor dem Absenden **Erfolg** und **rote Linien** festlegen. Prompts ohne Ziel sind Wünsche.

### Konkret

- **Zielgruppe** und **Kanal** (Spendenmail, internes Briefing, Social Post, Code, JSON).
- **Output-Form**: Bullets, Absätze, JSON, Tabelle, Code, Markdown.
- **Harte Grenzen**: Wortzahl, verbotene Wörter, Pflichtfakten, Zitierregeln, Lesestufe (CEFR A2/B1/B2).
- **Teilbare Inputs**: ist der Text öffentlich, intern, vertraulich oder personenbezogen?
- **Freigabe** vor Veröffentlichung.

### Meta

- Unscharfe Prompts liefern unscharfe Antworten. **Präzision** ist Freundlichkeit.
- Wenn du Erfolg nicht definieren kannst, **stopp** und sammle Inputs.
- Prompten ist **Spezifizieren**—wie ein Mini-Briefing schreiben.

---

## Zweck

Sprachmodelle als **Werkzeuge unter menschlichem Urteil** einsetzen: klare Anweisungen, enge Feedback-Schleifen, Prüfung—damit Outputs **nützlich, sicher, on-brief** sind und nicht nur gut klingen.

---

## 1. Anatomie eines starken Prompts

Ein brauchbarer Prompt nennt fünf Dinge, möglichst in dieser Reihenfolge:

- **Aufgabe**: was produziert werden soll (ein Satz).
- **Kontext**: nötiger Hintergrund (keine Secrets/PII ohne Freigabe).
- **Einschränkungen**: Ton, Länge, Struktur, Muss/Darf-nicht.
- **Format**: Layout der Antwort.
- **Beispiele** (optional, oft entscheidend): ein bis zwei Input/Output-Paare.

### Schlecht: anatomie eines starken prompts

```text
Schreib was zur Spendenaktion.
```

### Gut: anatomie eines starken prompts

```text
Aufgabe: 120-Wörter-Mail an Bestandsspender\*innen (DE, Sie), Einladung
zum Online-Briefing am 12.05.

Kontext: Letztes Briefing hatte 84 Teilnehmende und brachte 6.200 € für
die Abendangebote.

Einschränkungen:
- Warm, sachlich, kein Druck.
- Ein konkretes Ergebnis erwähnen: "drei zusätzliche Abendangebote pro Woche".
- CTA: Anmeldung über [Link].
- Keine erfundenen Zahlen, Zitate oder Namen.

Format: Betreff + kurze Absätze + eigene CTA-Zeile.
```

## 2. Rollen und System-Prompts

- Eine **Rolle** formt **Ton**, ist aber kein Ersatz für **Regeln**.
- Lieber **explizite Regeln**: "Einfache Sprache, CEFR B1, kurze Sätze" schlägt "sei einfach und freundlich".
- Siehe [`systemprompts-und-personas.md`](systemprompts-und-personas.md).

### Schlecht: rollen und system-prompts

```text
Du bist ein Weltklasse-Marketer. Mach es grandios.
```

### Gut: rollen und system-prompts

```text
Du hilfst der Kommunikationsleitung beim Editieren eines Entwurfs.

Regeln:
- Einfache Sprache (CEFR B1), kurze Sätze.
- Keine Superlative ohne Beleg.
- Alle Fakten exakt übernehmen; Unsicheres mit [PRÜFEN] markieren.
- Unklare Sätze: eine konkrete Rückfrage, kein Raten.
```

## 3. Beispiele und Gegenbeispiele (Few-Shot)

Beispiele fixieren **Form** und **Stimme** am schnellsten.

- **Ein** Beispiel: meist genug für Format.
- **Zwei–drei** Beispiele: für schwer beschreibbaren Ton.
- **Gegenbeispiel** schlägt viele Adjektive, wenn derselbe Fehler wiederkommt.

### Gut: beispiele und gegenbeispiele (few-shot)

```text
So soll der Ton klingen:
"Wir laden Sie am 12.05. zu einem kurzen Briefing ein. Wir zeigen, was sich
verändert hat—und was im Herbst geplant ist."

So nicht (zu marktschreierisch):
"Verpassen Sie nicht diese einmalige, unglaubliche Chance!!!"
```

## 4. Wirksame Einschränkungen

- **Länge** als Zahl ("≤120 Wörter"), nicht als Stimmung ("kurz").
- **Lesestufe** als Schema ("CEFR B1") oder Zielgruppe ("Vorstand, kein Jargon").
- **Verbote** explizit: "keine Statistiken, keine Zitate, keine Personennamen".
- **Unsicherheits-Regel**: "Bei Zweifel `[PRÜFEN]` schreiben und weiter, nicht raten."
- **Output-Reinheit**: "Nur JSON zurückgeben, ohne Markdown-Fences, ohne Kommentare."

## 5. Iterationsschleife

Prompt-Engineering ist **billiges Feedback, keine Orakel-Suche**.

1. Kleinster Prompt, der plausibel reicht.
2. Output gegen **Abnahmekriterien** prüfen (siehe [`modelloutput-bewerten.md`](modelloutput-bewerten.md)).
3. **Eine** Fehlerart identifizieren (Ton? erfundene Zahl? fehlende Sektion?).
4. **Eine** Sache ändern—eine Regel oder ein Beispiel.
5. Neu laufen lassen. Stopp, wenn der Output gut genug zum Editieren ist.

### Meta

- **Nicht** zehn neue Anforderungen auf einmal stapeln—du weißt dann nicht, was half.
- Zwei gescheiterte Iterationen: meist sind nicht der Prompt, sondern **Inputs** oder **Ziel** unklar.

## 6. Grundierung: Fakten statt Stimmung

Modelle erzeugen plausiblen Text. Plausibilität ist nicht Wahrheit.

- **Fakten mitgeben**, nicht ans "Gedächtnis" des Modells appellieren.
- Bei Web-Aussagen erlauben, "nicht in den Quellen enthalten" zu sagen, statt zu erfinden.
- Forschungsarbeit mit [`ki-in-der-recherche.md`](ki-in-der-recherche.md) und [`quellenbewertung-und-faktencheck.md`](../recherche-&-analyse/quellenbewertung-und-faktencheck.md) kombinieren.

### Gut: grundierung: fakten statt stimmung

```text
Extrahiere NUR aus dem folgenden Text (Quelle X, abgerufen 2025-03-01):
- 3 Kennzahlen mit kurzem wörtlichen Zitat
- Seiten- oder Abschnittsangabe
Fehlt etwas, schreibe "nicht in Quelle".

Quelle:
[einfügen]
```

## 7. Datenschutz und Sicherheit

- **Nie** personenbezogene Daten, Kinderschutzfälle, Spender-PII, unveröffentlichte Zitate, Medizin- oder Finanzinfos in ungeprüfte Tools pasten.
- **Schwärzen** vor dem Einfügen (Namen → `[PERSON]`, Adressen → `[ADRESSE]`).
- **Enterprise / No-Training**-Endpoints nutzen, wo vorgeschrieben.
- Offenlegungspflichten: [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md).

## 8. Häufige Fehlerarten

- **Selbstsicheres Halluzinieren**: erfundene Namen/Daten/URLs. **Fix**: grundieren, auf gelieferte Quellen beschränken.
- **Ton-Drift**: startet neutral, endet atemlos. **Fix**: Tonregeln verschärfen, Gegenbeispiel.
- **Scope-Creep**: beantwortet mehr, als gefragt war. **Fix**: Aufgabe und Out-of-Scope erneut nennen.
- **Formatbruch**: mischt JSON und Prosa. **Fix**: "Nur JSON. Kein Markdown. Kein Kommentar." + Schema.
- **Überverweigerung**: verweigert harmlose Aufgaben. **Fix**: legalen, gutartigen Zweck erklären.

## 9. Wiederverwendbare Vorlage

```text
Rolle: <1 Satz — als was agiert das Modell?>

Aufgabe: <1 Satz — was soll erzeugt werden?>

Kontext (maßgeblich, nicht widersprechen):
- <Fakt/Einschränkung>

Regeln:
- Sprache: <Locale / Lesestufe>
- Länge: <konkrete Zahl>
- Muss enthalten: <...>
- Darf nicht enthalten: <...>
- Unsicherheit: [PRÜFEN] markieren

Output-Format:
<beschreiben oder Beispiel zeigen>

Beispiele:
<optional 1–3>
```

## 10. Was nicht tun

- Das Modell **Zitate, Zahlen, Belege erfinden** lassen.
- **Secrets** in Prompts pasten.
- **One-Shot**-Output bei hoher Tragweite (Presse, Kinderschutz, Recht) ungeprüft senden.
- **Roleplay** nutzen, um Policies zu umgehen—Verantwortung bleibt bei dir.
- Zehn Umschreibungen in einem Thread statt frisch neu starten.

---

## Kerngedanke
Prompten ist **Spezifikationsarbeit unter Unsicherheit**: das Modell spiegelt die Schärfe deiner Spezifikation und die Qualität deiner Prüfung. Wenn der Output falsch ist, liegt es fast nie an "zu wenig cleverem Prompt"—sondern an unklarem Ziel, schlechten Inputs oder ehrlichem "nicht genug Information".

## Weiterführend
- [OpenAI — Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic — Prompt engineering overview](https://docs.anthropic.com/claude/docs/intro-to-prompting)
- [Google — Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Simon Willison — Prompt engineering notes](https://simonwillison.net/tags/prompt-engineering/)

---

Englische Version: [`prompting-basics.md`](../../en/ai-&-prompting/prompting-basics.md)
