# Structured output and tool use

## Scope:

Applies to **getting machine-parseable outputs from language models** (JSON, schemas, enums) and **wiring models to tools** (functions, search, databases) safely. Not full API design (see [`api-design-and-rest.md`](../coding/api-design-and-rest.md)) and not production MLOps. Pair with [`prompting-basics.md`](prompting-basics.md), [`prompt-patterns.md`](prompt-patterns.md), [`evaluating-model-output.md`](evaluating-model-output.md), [`language-models-in-code.md`](../coding/language-models-in-code.md), and [`security-for-web-apps.md`](../coding/security-for-web-apps.md).

## Excerpt

- **Schema first**: define fields, types, required/optional, enums—then ask the model to **conform**.
- **Validate** every response—models can emit invalid JSON, extra keys, or the wrong types.
- **Tools** (search, calculators, ticket systems) belong in **your code**, with **auth** and **auditing**—never "magic" hidden in the prompt.
- **Human-in-the-loop** for irreversible actions (payments, sends, deletions).
- **Prompt injection** is a real threat when inputs come from untrusted documents.

## Before integrating structured output or tools

### Concrete

- What **schema** does the downstream consumer require? Any enum values, max lengths, required fields?
- What happens on **parse failure**—retry, repair prompt, abort?
- Which **tools** should the model be allowed to call? What are their **scopes**?
- Who **approves** irreversible tool calls?

### Meta

- Structure reduces **ambiguity**; it does not guarantee **truth**.
- Tool use turns a chat into an **agent**—design for the blast radius of its worst mistake.

---

## Purpose

Turn model outputs into **reliable inputs for programs**: valid, validated, and **safe to act on**—and keep humans in the loop where mistakes matter.

---

## 1. JSON prompts that actually work

Ask for JSON, and say it twice.

### Bad: json prompts that actually work

```text
Give me JSON with the answer.
```

### Good: json prompts that actually work

```text
Return ONLY a JSON object matching this schema. No Markdown fences,
no commentary, no trailing text.

{
  "title": string,           // ≤60 chars
  "bullets": string[],       // max 5 items, each ≤120 chars
  "confidence": "low" | "medium" | "high",
  "unknowns": string[]       // facts you could not verify from the input
}

Rules:
- If a field is unknown, use "" or []. Do NOT invent citations.
- "confidence" reflects the support in the INPUT, not your general knowledge.
```

Why this works:

- **Explicit** schema with types, limits, enums.
- **Output purity** rule ("only JSON").
- **Uncertainty** fallback that does not require inventing.

## 2. Validation pipeline

Never trust the first parse.

1. **Strictly parse** JSON.
2. **Validate** against a schema (JSON Schema, Zod, Pydantic).
3. On failure: run a **repair prompt** ("Fix ONLY the JSON validation errors; do not change content").
4. On repeated failure: **abort** and log.

```ts
const parsed = JSON.parse(raw);
const result = Schema.safeParse(parsed);
if (!result.success) {
  logger.warn("schema_invalid", { issues: result.error.issues });
  // optional single-shot repair, then give up
}
```

Log **validation failures**—they are the earliest signal of prompt/schema drift.

## 3. Structured output APIs

Modern providers support **response format** / **JSON mode** / **tool schemas**. Prefer these over free-form JSON prompts when available:

- **OpenAI**: `response_format: { type: "json_schema", json_schema: {...} }`.
- **Anthropic**: tool use with an input schema.
- **Google (Gemini)**: `responseMimeType: "application/json"` with a schema.

These narrow the output distribution and cut the invalid-JSON rate dramatically, but **still validate** on your side.

## 4. Enums and constrained fields

Enums are the cheapest sanity check.

### Good: enums and constrained fields

```text
"status": "draft" | "review" | "published" | "archived"
"severity": "info" | "warn" | "error"
"language": "en" | "de" | "fr"
```

- If the model returns something outside the enum, reject and repair.
- Document enum changes like you document API changes.

## 5. Tool use: the basic loop

```
user → model proposes tool call → your code executes → model gets observation → model answers
```

Rules:

- Tools are **functions in your code**, not prompts.
- Each tool has a **schema** for its inputs and outputs.
- Each tool runs with **the user's** permissions (least privilege).
- Every call is **logged** with caller, arguments, result, duration.

### Bad: tool use: the basic loop

```text
Tool: shell_exec  (runs any shell command)
```

### Good: tool use: the basic loop

```text
Tool: search_knowledge_base
Input: { "query": string, "max_results": integer <=10 }
Output: { "hits": [{ "id": string, "title": string, "snippet": string }] }
```

## 6. Human-in-the-loop for risky actions

Never let the model unilaterally:

- Send money or change billing.
- Send emails to external recipients.
- Delete data, accounts, or records.
- Publish content to public channels.
- Change user permissions.

Pattern: the model **proposes** the action; your UI **confirms** with the user; your code **executes**.

## 7. Prompt injection defences

When tools consume untrusted inputs (web pages, user documents, emails):

- **Separate** untrusted content in clearly labelled fences.
- **Restate** the task and safety rules **after** the untrusted content.
- **Allow-list** tools; do not let the model invent new ones.
- **Authenticate and scope** tool permissions in code—never trust prompt-level "user role".
- **Review logs** for odd tool calls after ingesting new sources.

See [`security-for-web-apps.md`](../coding/security-for-web-apps.md).

## 8. Observability

Structured output + tool use only pay off if you can see what happened.

Log per call:

- Model + version.
- Tokens in / out, latency, cost.
- Tool calls, arguments (redacted if sensitive), results.
- Validation outcome (ok / repaired / rejected).
- Correlation ID for the whole request.

Aggregate dashboards: invalid-JSON rate, tool-error rate, refusal rate, top failing schemas.

## 9. Testing and regression

- Maintain a **fixture set** of inputs with expected structured outputs (or properties of outputs).
- Re-run on every model / prompt / schema change (see [`evaluating-model-output.md`](evaluating-model-output.md)).
- Property tests: "output always has ≤5 bullets", "enum fields are in set", "URLs resolve".

## 10. What not to do

- Let the model **choose authentication** or **elevate privileges**.
- Pass **secrets** through the model (they leak into logs, caches, training boundaries).
- Use tool descriptions to encode **business logic** that belongs in code.
- Treat **agent** demos as production: handle budgets, rate limits, retries, and cancellation.

---

## Core idea

**Schema + validation + permissioned tools + human-in-the-loop** is how assistants stop being chat toys and become **systems you can ship**. The model is a renderer of structure—your code owns truth, safety, and side effects.

## Further reading

- [JSON Schema](https://json-schema.org/) — validation vocabulary
- [OpenAI — Structured outputs](https://platform.openai.com/docs/guides/structured-outputs) — response_format with schemas
- [Anthropic — Tool use](https://docs.anthropic.com/claude/docs/tool-use) — function-call patterns
- [OWASP — LLM Top 10 (Insecure plugins, prompt injection)](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — systemic risks

---

German version: [`strukturierte-ausgabe-und-tools.md`](../../de/ki-&-prompting/strukturierte-ausgabe-und-tools.md)
