# Language models in code

## Scope:

Applies to **engineering integrations with hosted language models**—SDK use, prompt versioning, streaming, retries, cost, caching, testing, observability. Not model training, not agent orchestration platforms. Pair with [`structured-output-and-tool-use.md`](../ai-&-prompting/structured-output-and-tool-use.md), [`evaluating-model-output.md`](../ai-&-prompting/evaluating-model-output.md), [`error-handling-and-logging.md`](error-handling-and-logging.md), and [`security-for-web-apps.md`](security-for-web-apps.md).

## Excerpt

- **Prompts are code**—versioned in the repo, reviewed in PRs, tested in CI.
- **Treat the model as a flaky API**: retries, timeouts, fallbacks, cost ceilings.
- **Never trust output**: validate schemas, sanitise for the sink, keep a human in the loop where it matters.
- **Observe everything**: tokens, latency, cost, refusal rate, parse rate, user feedback.
- **Privacy by design**: redact, use enterprise endpoints, log the metadata not the body.
- Patterns, tests, and pitfalls below.

## Before integrating

### Concrete

- What **task** does the model perform, and what breaks if it fails? Is a degraded fallback acceptable?
- What **data** goes to the provider—public, internal, PII? Which endpoints are cleared?
- What **budget** (cost, latency, rate limit) is acceptable per request?
- Who **owns** the prompt, and how does it get changed?

### Meta

- A hosted language model in your stack is a **dependency**. Treat it with the same rigor as a payment provider.
- Features that only work when the model is perfect will silently rot as the model drifts.

---

## Purpose

Integrate language models as **reliable, observable, privacy-aware components** of your product—not as magic that sometimes works and sometimes does not.

---

## 1. Project layout

Keep prompts, schemas, and tests close.

```
src/
  ai/
    prompts/
      summarise-ticket.v3.md
      moderate-comment.v1.md
    schemas/
      summary.schema.ts
    clients/
      openai.ts
      anthropic.ts
    evals/
      summarise-ticket.fixtures.json
      summarise-ticket.test.ts
```

- Prompt files are **Markdown** with YAML frontmatter (`model`, `version`, `owner`).
- Schemas are strongly typed (Zod / Pydantic / TypeBox).
- Tests live next to the thing they test.

## 2. Prompt versioning

- Prompts change; pin the version a release uses.
- Keep **old versions** alongside new ones during rollout.
- A/B test new prompts before promoting.

```md
---
id: summarise-ticket
version: 3
model: gpt-4o-mini
owner: platform
updated: 2025-03-15
---

You are a concise summariser ...
```

## 3. Request shape

Always send:

- **Model** and **provider** explicitly (no defaults silently changing).
- **Temperature** intentional (0 for deterministic tasks, low for factual, higher for creative).
- **Max tokens** for output, to cap runaway responses.
- **Stop sequences** if your output has a known end marker.
- **Response format** (JSON Schema) when possible.
- **User / session id** hashed, for abuse tracing.

### Good: request shape

```ts
const resp = await client.chat.completions.create({
  model: "gpt-4o-mini",
  temperature: 0,
  max_tokens: 600,
  response_format: { type: "json_schema", json_schema: SummarySchema },
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPayload },
  ],
});
```

## 4. Reliability wrappers

Provider endpoints fail, throttle, and return garbage. Wrap them.

- **Timeout** on every call (e.g. 30s); **abort** cleanly on cancel.
- **Retry** idempotent calls with exponential backoff + jitter; respect `Retry-After`.
- **Circuit breaker** so one outage does not melt your UI.
- **Fallback** to a smaller/cheaper model, or a canned response, when the primary fails.

See [`error-handling-and-logging.md`](error-handling-and-logging.md).

## 5. Streaming

- Stream tokens for **user-facing** experiences (chat, long generation).
- For **background jobs**, complete-then-return is simpler.
- On cancel, **abort** the upstream request; don't orphan it.
- Budget per-stream time; cut off runaway generations.

## 6. Cost and quotas

- **Cost per request** is a product metric. Dashboard it.
- **Cap** spend per user / per tenant per day; surface the limit in the UI.
- **Cache** prompts and answers when inputs repeat (prompt-cache or response-cache).
- Prefer **smaller models** for chunking and map steps; save big models for reduce steps.

## 7. Observability

Per call log:

- `model`, `prompt_id`, `prompt_version`, `response_format`.
- Token counts (`prompt`, `completion`), latency, cost estimate.
- `parse_ok` / `validation_ok` / `refusal` booleans.
- `correlation_id` for end-to-end tracing.
- **Not** the full request or response body in plaintext when sensitive.

Build dashboards: error rate, invalid-schema rate, refusal rate, p95 latency, cost per feature.

## 8. Testing

- **Fixture tests**: input → expected properties of output (contains, matches, schema), not exact strings.
- **Regression set** rerun on every prompt/model change (see [`evaluating-model-output.md`](../ai-&-prompting/evaluating-model-output.md)).
- **Snapshot carefully**: models drift; snapshots of text will flake. Snapshot **shape** and **schema**, not prose.
- **Adversarial tests**: prompt injection, empty input, non-English input, giant input.

## 9. Privacy and compliance

- **Redact** PII before sending when possible; otherwise use an enterprise / no-training endpoint per your policy.
- Respect **data residency** if required.
- Document **what goes to which provider** in a processing record.
- See [`gdpr-basics.md`](../ethics-&-legal/gdpr-basics.md) and [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md).

## 10. What not to do

- Hard-code the model name in 20 places—put it behind one config.
- Parse JSON with regex; use a real parser + schema.
- Let **generated text** replace **auth** or **billing** rules ("The reply said this user was admin"). Enforce permissions in code.
- Ship a feature with **no fallback** when the model is down.
- Store **secrets** in the prompt; anything in the prompt is data you cannot un-see.

---

## Core idea

A language model in production is **a paid, flaky, non-deterministic API you don't fully control**. Wrap it like one: versioned prompts, strict schemas, timeouts, retries, observability, privacy, fallbacks. Magic is for demos—shipped software is boring on purpose.

## Further reading

- [OpenAI — Production best practices](https://platform.openai.com/docs/guides/production-best-practices)
- [Anthropic — Building with Claude](https://docs.anthropic.com/claude/docs/building-with-claude)
- [LangSmith](https://docs.smith.langchain.com/) — tracing and evaluation tooling
- [OpenTelemetry — GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) — standard signals for generative-AI traces

---

German version: [`sprachmodelle-im-code-nutzen.md`](../../de/coding/sprachmodelle-im-code-nutzen.md)
