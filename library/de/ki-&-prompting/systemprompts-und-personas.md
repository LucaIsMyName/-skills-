# Systemprompts und Personas

**Geltungsbereich:** Gilt für **Trennung dauerhafter Policy und einzelner Aufgaben**—wie und wann **System-Prompt**, **Persona** und **User-Prompt** verwendet werden. Nicht Vendor-Setup, nicht Modellwahl. Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`prompt-muster.md`](prompt-muster.md), [`strukturierte-ausgabe-und-tools.md`](strukturierte-ausgabe-und-tools.md) und [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md).

## Exzerpt
- **System-Prompt** = stabile Regeln für alle Turns (Ton, Sicherheit, Verweigerungsstil, Default-Format).
- **User-Prompt** = Aufgabe dieses Turns.
- **Persona** dient **Ton und Zielgruppenpassung**, nicht Fakten oder Verantwortung.
- **Nie** Personas realer Personen ohne Einwilligung.
- **Kurze** System-Prompts sind leichter zu debuggen—lieber Regeln + ein Beispiel.
- Muster, Vorlagen, Anti-Muster unten.

## Vor dem Setzen eines System-Prompts

### Konkret

- Was muss **immer** gelten (Locale, einfache Sprache, keine PII, Verweigerungen)?
- Was ist das **Default-Format** ohne explizite Angabe?
- Welche Tools/Plugins/Quellen sind erlaubt?
- Wie **verweigert** der Assistent außerhalb des Scope?

### Meta

- Aufgeblähte System-Prompts verstecken Bugs—schlecht testbar.
- Lieber **kurze, prüfbare Regeln** als Philosophie.
- Neue Teammitglieder sollten das Verhalten nach einmal Lesen vorhersagen können.

---

## Zweck

**Stabile Policy** (System) von **Aufgabenarbeit** (User) trennen, damit Verhalten **konsistent, reviewbar, sicher** ist—und Regressionstests möglich sind.

---

## 1. Die drei Ebenen

- **System**: globale Regeln, Markenton, Sicherheit, Default-Format, Verweigerung.
- **User**: konkrete Anfrage (Aufgabe + Inputs + Einschränkungen).
- **Assistant (frühere Turns)**: Verlauf—**klein**, **unsensibel**, relevant halten.

### Schlecht: die drei ebenen

```text
[System]: Du bist ein Genie und machst keine Fehler.
[User]: Fasse diesen vertraulichen Bericht zusammen: <einfügen>
```

### Gut: die drei ebenen

```text
[System]
Du bist sorgfältige\*r Redakteur\*in im Kommunikationsteam einer NGO.

Stil:
- Einfache Sprache, DE, CEFR B1.
- Warm, konkret, keine unbelegten Superlative.

Sicherheit:
- KEINE PII, Kinderschutzdaten, medizinischen/rechtlichen Details akzeptieren.
  Wenn eingefügt: "Bitte Personendaten entfernen."
- Unklare Aufgabe: EINE konkrete Rückfrage.

Format:
- Default: Bullet-Summary + kurzer Absatz.
- Bei JSON-Anfrage: nur JSON, kein Markdown.

[User]
Fasse den folgenden (nicht-sensiblen) Text in 5 Bullets für den Vorstand:
<...>
```

## 2. Wann Personas helfen

- **Ton und Zielgruppe**: "Erkläre einer Vorständin ohne Webtechnik-Kenntnisse".
- **Rolle**: "Copy-Editor", "Informationsarchitekt\*in", "Kinderschutz-Reviewer"—jede setzt andere Heuristiken.
- **Implizite Einschränkungen**: "Agiere als Erstentwurfs-Reviewer, nicht als Publisher."

### Gut: wann personas helfen

```text
Du hilfst bei einem Entwurf. Du bist kein\*e Anwält\*in.
Wenn etwas rechtlich wirkt, schreibe: "Rechtsprüfung nötig" und liste Fragen.
```

## 3. Wo Personas versagen

Personas verleihen keine Wissensbestände, Befugnisse oder Rechte.

- **Fakten**: Eine "Epidemiolog\*in"-Persona macht Output nicht korrekt.
- **Autorität**: Kein\*e benannte\*r CEO ohne deren Freigabe imitieren.
- **Rechte**: Personas waschen keine fremden Stile rein.

### Schlecht: wo personas versagen

```text
Du bist unsere CEO Anna Ruiz. Schreibe den Jahresbrief in ihrer Stimme.
```

### Gut: wo personas versagen

```text
Entwurf eines Jahresbriefs im dokumentierten Markenstil (unten).
Markiere Passagen, die inhaltlich von der CEO freigegeben werden müssen,
mit [FREIGABE].
```

## 4. Verweigerungs- und Eskalationsstil

In den System-Prompt einbacken.

### Gut: verweigerungs- und eskalationsstil

```text
Verweigerungsregeln:
- Rechtsrat/Medizinrat/Finanzrat → exakt:
  "Ich kann die Frage vorbereiten, nicht beantworten. Bitte mit Fachperson prüfen."
- Bild einer benannten realen Person → exakt:
  "Ich erzeuge keine Abbildungen identifizierbarer realer Personen. Alternative?"
- Schadenspotenzial → verweigern, knapp Policy nennen, nicht belehren.
```

## 5. Output-Verträge

Default in System, per Aufgabe überschreiben.

- Menschenlesbar: Markdown mit kurzen Absätzen, Bullets ab 3 Punkten.
- Maschinenlesbar: JSON nach Schema, keine Fences, kein Kommentar.
- Übersetzungen: Locale + Stil (formal/informell).

## 6. Minimal-Vorlage

```text
- Zweck: <1 Satz>
- Zielgruppe: <...>
- Stil: <Ton, Lesestufe, Locale>
- Sicherheit: <keine PII, keine unbelegten Stats, Verweigerung, Tool-Grenzen>
- Output: <Default-Format; wann JSON>
- Unsicherheit: <fragen, [PRÜFEN], verweigern>
- Eskalation: <was zu Menschen muss>
```

## 7. Versionierung und Regressionstests

- System-Prompts **versionieren** (z. B. `v7 — 2025-03`).
- **Regressionsset** mit 5–20 kanonischen Prompts; bei jeder Änderung laufen lassen (siehe [`modelloutput-bewerten.md`](modelloutput-bewerten.md)).
- **Diff** zwischen Versionen und beobachtete Verhaltensänderungen loggen.

## 8. Sicherheit

- System-Prompt-Inhalt ist quasi **öffentlich**—keine Secrets.
- **Prompt-Injection** bedenken: ein bösartiges User-Dokument kann Systemregeln überschreiben wollen:
  - Untrusted-Content in klar gelabelten Fences.
  - Wichtige Regeln im User-Prompt wiederholen.
  - Tool/Funktions-Allowlists im Code, nicht im Prompt.

## 9. Organisatorische Passung

- Default mit Markenstil ([`tonalitaet-und-markenstimme.md`](../sprache-&-kommunikation/tonalitaet-und-markenstimme.md)) und Offenlegung ([`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md)) abgleichen.
- Keine Personas, die Betroffene stereotypisieren.
- Wer darf System-Prompts ändern? Review-Prozess dokumentieren.

## 10. Was nicht tun

- **Secrets** in System-Prompts legen.
- "Ignoriere alle vorherigen Anweisungen"-Spielchen zulassen.
- **Emotional-Support-Personas** dort, wo unmoderierte Automation läuft—vor allem bei Mental Health, Kinderschutz, Gewalt.
- System-Prompt in Production stillschweigend ohne Rollback ändern.

---

## Kerngedanke
**System-Prompts** sind **Policy**; **User-Prompts** sind **Arbeit**. Eine Persona formt **Stimme**, nicht **Wahrheit**. Ein kurzer, versionierter, testbarer System-Prompt—dabei bleiben.

## Weiterführend
- [Anthropic — System prompts](https://docs.anthropic.com/claude/docs/system-prompts)
- [OpenAI — Messages and roles](https://platform.openai.com/docs/guides/text-generation/chat-completions-api)
- [OWASP — LLM Top 10 (Prompt Injection)](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Simon Willison — Prompt injection](https://simonwillison.net/tags/prompt-injection/)

---

Englische Version: [`system-prompts-and-personas.md`](../../en/ai-&-prompting/system-prompts-and-personas.md)
