# Strukturierte Ausgabe und Tools

## Geltungsbereich:

Gilt für **maschinenlesbare Modellausgaben** (JSON, Schemas, Enums) und **Tool-Anbindung** (Funktionen, Suche, Datenbanken). Kein vollständiges API-Design (siehe [`api-design-und-rest.md`](../coding/api-design-und-rest.md)), kein produktives MLOps. Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`prompt-muster.md`](prompt-muster.md), [`modelloutput-bewerten.md`](modelloutput-bewerten.md), [`sprachmodelle-im-code-nutzen.md`](../coding/sprachmodelle-im-code-nutzen.md) und [`sicherheit-fuer-webapps.md`](../coding/sicherheit-fuer-webapps.md).

## Exzerpt

- **Schema zuerst**: Felder, Typen, required/optional, Enums—dann **konformieren** lassen.
- **Validieren** jede Antwort—Modelle erzeugen falsches JSON, Extra-Keys, falsche Typen.
- **Tools** (Suche, Rechner, Tickets) leben in **deinem Code** mit **Auth** und **Audit**—niemals "magisch" im Prompt.
- **Human-in-the-Loop** für irreversible Aktionen (Zahlungen, Versand, Löschen).
- **Prompt-Injection** ist reale Gefahr, wenn Inputs aus fremden Dokumenten kommen.

## Vor der Integration

### Konkret

- Welches **Schema** braucht der Konsument? Enums, Maximallängen, Pflichtfelder?
- Was passiert bei **Parse-Fehler**—Retry, Repair-Prompt, Abbruch?
- Welche **Tools** darf das Modell aufrufen? Welche **Scopes**?
- Wer **genehmigt** irreversible Aktionen?

### Meta

- Struktur senkt **Mehrdeutigkeit**, nicht **Wahrheit**.
- Tool-Nutzung macht aus Chat einen **Agenten**—designen wie für den schlimmsten Fehler.

---

## Zweck

Modell-Output in **verlässliche Programminputs** verwandeln: valide, validiert, **sicher zum Ausführen**—mit Menschen in der Schleife, wo Fehler weh tun.

---

## 1. JSON-Prompts, die wirklich funktionieren

JSON anfordern—zweimal sagen.

### Schlecht: json-prompts, die wirklich funktionieren

```text
Gib mir die Antwort als JSON.
```

### Gut: json-prompts, die wirklich funktionieren

```text
Gib NUR ein JSON-Objekt zurück, das diesem Schema entspricht.
Keine Markdown-Fences, kein Kommentar, kein Trailing-Text.

{
  "title": string,           // ≤60 Zeichen
  "bullets": string[],       // max 5, je ≤120 Zeichen
  "confidence": "low" | "medium" | "high",
  "unknowns": string[]       // im Input unprüfbare Fakten
}

Regeln:
- Unbekannt: "" oder []. Keine erfundenen Belege.
- "confidence" bezieht sich auf den INPUT, nicht dein Weltwissen.
```

## 2. Validierungspipeline

Dem ersten Parse nie trauen.

1. **Strikt** parsen.
2. Gegen **Schema** validieren (JSON Schema, Zod, Pydantic).
3. Fehler: **Repair-Prompt** ("Korrigiere NUR die Validierungsfehler, ändere nichts Inhaltliches").
4. Wiederholtes Scheitern: **Abbruch** + Log.

```ts
const parsed = JSON.parse(raw);
const result = Schema.safeParse(parsed);
if (!result.success) {
  logger.warn("schema_invalid", { issues: result.error.issues });
}
```

Validierungsfehler loggen—Frühwarnsignal für Drift.

## 3. Strukturierte-Output-APIs

Moderne Anbieter: **response_format** / **JSON-Mode** / **Tool-Schemas**. Bevorzugt nutzen:

- **OpenAI**: `response_format: { type: "json_schema", json_schema: {...} }`.
- **Anthropic**: Tool-Use mit Input-Schema.
- **Google (Gemini)**: `responseMimeType: "application/json"` mit Schema.

Senkt Invalid-JSON-Rate deutlich—**trotzdem validieren**.

## 4. Enums und Constraints

Enums sind billige Sanity-Checks.

### Gut: enums und constraints

```text
"status": "draft" | "review" | "published" | "archived"
"severity": "info" | "warn" | "error"
"language": "en" | "de" | "fr"
```

- Off-Enum → ablehnen und reparieren.
- Enum-Änderungen wie API-Changes dokumentieren.

## 5. Tool-Nutzung: Grundmuster

```
user → Modell schlägt Tool vor → dein Code führt aus → Modell bekommt Beobachtung → Antwort
```

Regeln:

- Tools sind **Code-Funktionen**, keine Prompts.
- Jedes Tool: Input-/Output-Schema.
- Jeder Aufruf mit **Rechten des Users** (Least Privilege).
- Jeder Aufruf **geloggt**: Caller, Argumente, Ergebnis, Dauer.

### Schlecht: tool-nutzung: grundmuster

```text
Tool: shell_exec  (führt beliebige Shell-Kommandos aus)
```

### Gut: tool-nutzung: grundmuster

```text
Tool: search_knowledge_base
Input: { "query": string, "max_results": integer <=10 }
Output: { "hits": [{ "id": string, "title": string, "snippet": string }] }
```

## 6. Human-in-the-Loop bei Risiko

Das Modell **nicht** einseitig:

- Geld senden / Abrechnung ändern.
- Mails an Externe senden.
- Daten löschen.
- Öffentlich publizieren.
- Rechte vergeben.

Muster: Modell **schlägt vor**, UI **bestätigt**, Code **führt aus**.

## 7. Prompt-Injection-Abwehr

Bei Untrusted-Inputs (Webseiten, User-Docs, Mails):

- **Trennen** in klar gelabelten Fences.
- **Aufgabe und Sicherheitsregeln** nach dem Untrusted-Content wiederholen.
- **Allowlist** für Tools.
- **Auth und Scopes** im Code, nicht im Prompt.
- Nach neuen Quellen Logs prüfen.

Siehe [`sicherheit-fuer-webapps.md`](../coding/sicherheit-fuer-webapps.md).

## 8. Observability

Pro Call loggen:

- Modell + Version.
- Tokens in/out, Latenz, Kosten.
- Tool-Calls, Argumente (ggf. geschwärzt), Ergebnisse.
- Validierung (ok/repaired/rejected).
- Correlation-ID.

Dashboards: Invalid-JSON-Rate, Tool-Error-Rate, Verweigerungsrate, Top-Fehler-Schemas.

## 9. Tests und Regression

- **Fixture-Set** mit Inputs und erwarteten Outputs (oder Eigenschaften).
- Bei jeder Änderung laufen lassen (siehe [`modelloutput-bewerten.md`](modelloutput-bewerten.md)).
- Property-Tests: "≤5 Bullets", "Enum im Set", "URLs lösen auf".

## 10. Was nicht tun

- Modell **Auth wählen** oder Rechte erhöhen lassen.
- **Secrets** durchs Modell leiten.
- **Business-Logik** in Tool-Beschreibungen codieren.
- **Agent**-Demos für Production halten: Budgets, Rate-Limits, Retries, Cancellation fehlen.

---

## Kerngedanke

**Schema + Validierung + berechtigte Tools + Human-in-the-Loop**—so werden Assistenten aus Spielzeug zu **lieferbaren Systemen**. Das Modell rendert Struktur; dein Code besitzt Wahrheit, Sicherheit, Seiteneffekte.

## Weiterführend

- [JSON Schema](https://json-schema.org/)
- [OpenAI — Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [Anthropic — Tool use](https://docs.anthropic.com/claude/docs/tool-use)
- [OWASP — LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

---

Englische Version: [`structured-output-and-tool-use.md`](../../en/ai-&-prompting/structured-output-and-tool-use.md)
