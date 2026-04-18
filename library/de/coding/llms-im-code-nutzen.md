# LLMs im Code nutzen

**Scope:** Gilt für **Engineering-Integration mit LLMs**—SDK-Nutzung, Prompt-Versionierung, Streaming, Retries, Kosten, Caching, Tests, Observability. Kein Modelltraining, keine Agenten-Plattformen. Kombiniere mit [`strukturierte-ausgabe-und-tools.md`](../ki-&-prompting/strukturierte-ausgabe-und-tools.md), [`llm-output-bewerten.md`](../ki-&-prompting/llm-output-bewerten.md), [`fehlerbehandlung-und-logging.md`](fehlerbehandlung-und-logging.md) und [`sicherheit-fuer-webapps.md`](sicherheit-fuer-webapps.md).

## Excerpt

- **Prompts sind Code**—im Repo, im PR, in CI.
- **Modell wie flaky API** behandeln: Retries, Timeouts, Fallbacks, Kostenlimits.
- **Output nie trauen**: Schema validieren, sanitisieren, Human-in-the-Loop.
- **Observieren**: Tokens, Latenz, Kosten, Verweigerung, Parse-Rate, User-Feedback.
- **Privacy by Design**: schwärzen, Enterprise-Endpoints, Metadaten loggen (nicht Body).
- Muster und Tests unten.

## Vor der Integration

### Konkret

- Welche **Aufgabe** macht das LLM? Was bricht bei Fehler? Akzeptabler Fallback?
- Welche **Daten** gehen zum Anbieter—public, internal, PII? Welche Endpoints sind freigegeben?
- Welches **Budget** (Kosten, Latenz, Rate-Limit) pro Request?
- Wer **besitzt** den Prompt? Wie wird er geändert?

### Meta

- LLM im Stack = **Dependency**. Wie einen Payment-Provider behandeln.
- Features, die nur bei perfektem Modell funktionieren, rotten leise.

---

## Zweck

LLMs als **verlässliche, observable, datenschutzbewusste Komponenten** integrieren.

---

## 1. Projekt-Layout

```
src/
  ai/
    prompts/
      summarise-ticket.v3.md
    schemas/
      summary.schema.ts
    clients/
      openai.ts
    evals/
      summarise-ticket.fixtures.json
      summarise-ticket.test.ts
```

- Prompts als **Markdown** mit YAML-Frontmatter (`model`, `version`, `owner`).
- Schemas typisiert (Zod/Pydantic/TypeBox).
- Tests neben dem Ding.

## 2. Prompt-Versionierung

- Prompts ändern sich; Release an Version pinnen.
- **Alte Versionen** während Rollout behalten.
- Neue Prompts **A/B-testen**.

```md
---
id: summarise-ticket
version: 3
model: gpt-4o-mini
owner: platform
updated: 2025-03-15
---

Du bist ein knapper Summariser ...
```

## 3. Request-Shape

Immer senden:

- **Modell** + Anbieter explizit.
- **Temperatur** bewusst (0 deterministisch, niedrig faktisch, höher kreativ).
- **Max Tokens** für Output.
- **Stop-Sequences** bei bekanntem Endmarker.
- **Response-Format** (JSON-Schema) wenn möglich.
- **User/Session-ID** gehasht für Missbrauch-Tracking.

### Gut

```ts
const resp = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  temperature: 0,
  max_tokens: 600,
  response_format: { type: 'json_schema', json_schema: SummarySchema },
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPayload },
  ],
})
```

## 4. Reliability-Wrapper

LLM-Endpoints failen, throttlen, geben Müll zurück.

- **Timeout** auf jedem Call.
- **Retry** idempotent mit Exponential + Jitter; `Retry-After` respektieren.
- **Circuit Breaker**.
- **Fallback** auf kleineres Modell oder Canned Response.

Siehe [`fehlerbehandlung-und-logging.md`](fehlerbehandlung-und-logging.md).

## 5. Streaming

- **User-facing** (Chat): streamen.
- **Background-Jobs**: komplett + zurück.
- Cancel → Upstream-Abort.
- Max-Stream-Zeit setzen.

## 6. Kosten und Quotas

- **Kosten/Request** als Produktmetrik.
- **Cap** pro User/Mandant/Tag.
- **Cache** bei wiederholten Inputs.
- **Kleinere Modelle** für Chunking/Map; große für Reduce.

## 7. Observability

Pro Call:

- `model`, `prompt_id`, `prompt_version`, `response_format`.
- Tokens (prompt/completion), Latenz, Kosten.
- `parse_ok`/`validation_ok`/`refusal`.
- `correlation_id`.
- **Nicht** den ganzen Body bei sensiblen Daten.

Dashboards: Error-Rate, Invalid-Schema-Rate, Verweigerung, p95-Latenz, Kosten/Feature.

## 8. Tests

- **Fixture-Tests**: Input → erwartete Output-Eigenschaften (contains, matches, schema).
- **Regressionsset** bei jeder Änderung (siehe [`llm-output-bewerten.md`](../ki-&-prompting/llm-output-bewerten.md)).
- **Snapshots** vorsichtig—Prosa flaked; **Form/Schema** stabil.
- **Adversarial**: Injection, leer, andere Sprache, riesig.

## 9. Datenschutz/Compliance

- **PII schwärzen** vor Versand; sonst Enterprise/No-Training.
- **Datenresidenz** respektieren.
- **Verarbeitungsverzeichnis** pflegen.
- Siehe [`dsgvo-grundlagen.md`](../ethik-&-recht/dsgvo-grundlagen.md) und [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md).

## 10. Was nicht tun

- Modellname hart an 20 Stellen.
- JSON per Regex parsen.
- **Auth/Billing** vom LLM entscheiden lassen.
- Feature ohne **Fallback** shippen.
- **Secrets** im Prompt.

---

## Core idea

Ein LLM in Production ist eine **bezahlte, flaky, nicht-deterministische API**. Wie eine solche wrappen: versionierte Prompts, strikte Schemas, Timeouts, Retries, Observability, Privacy, Fallbacks. Magic ist für Demos.

## Further reading

- [OpenAI — Production best practices](https://platform.openai.com/docs/guides/production-best-practices)
- [Anthropic — Building with Claude](https://docs.anthropic.com/claude/docs/building-with-claude)
- [LangSmith](https://docs.smith.langchain.com/)
- [OpenTelemetry — GenAI semconv](https://opentelemetry.io/docs/specs/semconv/gen-ai/)

---

Englische Version: [`working-with-llms-in-code.md`](../../en/coding/working-with-llms-in-code.md)
