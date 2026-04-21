# Working with context windows

## Scope:

Applies to **fitting documents, history, and tool outputs** into a **language model's context window**—chunking, summarisation, prioritisation, re-anchoring, cost and latency trade-offs. Not model architecture, not production vector-store engineering (see [`rag-basics.md`](rag-basics.md) for that). Pair with [`prompting-basics.md`](prompting-basics.md), [`prompt-patterns.md`](prompt-patterns.md), [`writing-skill-documentation.md`](writing-skill-documentation.md), and [`language-models-in-code.md`](../coding/language-models-in-code.md).

## Excerpt

- **Context is finite** (tokens) and **not free** (cost, latency). Plan what goes in; cut what does not help.
- **Chunk** long sources at logical seams; process chunks with the **same** question; merge at the end.
- **Summarise** with explicit goals, not "summarise this"—bad summaries hide the errors that matter.
- **Re-anchor** the task each turn on long threads; the model drifts as context fills.
- **Retrieval** usually beats stuffing—see [`rag-basics.md`](rag-basics.md).
- **Never** fill context with PII you do not need.

## Before loading context

### Concrete

- What is the **minimum** text needed to complete the task?
- What is **authoritative** (contract, policy, dataset) vs **nice-to-have** (blog posts, notes)?
- Can you use **retrieval** instead of pasting everything?
- How much **headroom** do you need for the model's answer?

### Meta

- **Context rot**: too much irrelevant text increases confusion, hallucination, and cost.
- Long chat threads accumulate mistakes; sometimes starting fresh is the fastest fix.

---

## Purpose

Spend your context budget on **signal** so the model stays **grounded**, **focused**, and **affordable**—and so outputs can be **reviewed** without unpacking a novel.

---

## 1. The context budget

Think of every call as having a budget: `budget = model_context − answer_headroom`.

- **Task prompt** (goal + constraints): short and explicit.
- **Source material**: trimmed to relevant sections.
- **Chat history**: summarised or dropped when stale.
- **Few-shot examples**: as small as still-effective.

### Bad: the context budget

```text
[Paste entire 40-page PDF]
Now summarise it.
```

Problems: token cost, latency, the model may focus on the wrong section, any personal data in the PDF is now in the prompt.

### Good: the context budget

```text
Task: Summarise section 3 only (lines 120–180) into 6 bullets in plain
language. Each bullet must quote verbatim evidence from the excerpt.

Excerpt (section 3 only, redacted names):
<...>
```

## 2. Chunking strategies

When a source is too large for one call:

- **Semantic chunks**: split by **headings** or **logical sections**, not arbitrary character counts.
- **Overlap**: small overlap (1–3 sentences) helps when a concept crosses a boundary.
- **Titles**: keep the section title inside the chunk so the model has orientation.
- **IDs**: label chunks (`chunk_3.2`) so the model can cite them in output.

### Good: chunking strategies

```text
For each chunk below, answer the SAME question:
"What risks does this chunk mention? Quote each risk verbatim."

Do not generalise beyond the chunk.

[chunk 3.2]
<...>
```

Merge strategy: run a final pass on the list of per-chunk answers ("deduplicate, group by theme, keep verbatim quotes").

## 3. Summarisation passes

Summaries compress **information** but also compress **errors**. Make the goal explicit.

- **Map**: for each chunk, produce a bounded artefact (5 bullets + 1 quote).
- **Reduce**: combine the map outputs into a structured final artefact.
- **Verify**: spot-check quotes against the source (see [`evaluating-model-output.md`](evaluating-model-output.md)).

### Bad: summarisation passes

```text
Summarise this in 3 sentences.
```

### Good: summarisation passes

```text
Summarise the document for a trustee board member who has not read it.

Constraints:
- 8 bullets, each ≤25 words.
- Include any dates, numbers, and named obligations verbatim.
- End with a list of "unresolved questions" for the reader.
- Do not introduce new claims; if something is unclear, say so.
```

## 4. Re-anchoring long threads

Models forget why you started talking. Every several turns, re-anchor.

### Good: re-anchoring long threads

```text
Reset task: We are still answering ONE question:
"Can we run the campaign under budget X by date Y?"

Ignore earlier tangents about branding unless they cite this source:
<short source reference>.
```

Alternative: start a **new session** with a short briefing. Cheaper, cleaner, less drift.

## 5. When to retrieve, not paste

Use retrieval (RAG) when any of these is true:

- The corpus does not fit in context (even once).
- The corpus changes (adding a page should change future answers).
- You need **citations** back to documents.
- The corpus contains PII that must be access-controlled—retrieval lets you gate at query time.

See [`rag-basics.md`](rag-basics.md) and [`using-ai-for-research.md`](using-ai-for-research.md).

## 6. Prompt caching and prefix reuse

Many providers let you **cache** a stable prefix (system prompt + large fixed context).

- Put **stable** content up front (system prompt, style guide, schema, frequent examples).
- Put **volatile** content at the end (the user's task, the current chunk).
- Cache dramatically reduces cost and latency when the prefix repeats across calls.

Check your vendor's current caching semantics before relying on this.

## 7. Cost and latency considerations

- **Tokens in** are usually cheaper than tokens out; long prompts are less painful than long answers.
- **Streaming** output improves perceived latency even when total latency is similar.
- **Batching** similar calls amortises overhead for offline jobs (e.g. translations).
- **Shorter models / cheaper tiers** often suffice for chunking and map-reduce passes; save the top-tier model for the reduce step.

## 8. Privacy at scale

- **Redact** personal data before pasting—names → `[PERSON_1]`, emails → `[EMAIL]`—and keep a local mapping if you need to restore them.
- Prefer **enterprise / no-training** endpoints per your policy.
- Keep a log of **what** was sent and **why**, not the content itself, for audit.
- Follow [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md).

## 9. Debugging context problems

Symptoms and fixes:

- **Answer ignores a section**: section is too far from the question; move the question after the section, or re-anchor.
- **Hallucinated facts**: not enough grounding; switch to closed-book prompting ("Not in provided context").
- **Contradicts itself across turns**: history is too long; summarise and restart.
- **Runs out of output space**: cap input tokens; ask for fewer bullets.

## 10. What not to do

- Paste **everything** "in case the model needs it".
- Assume the model reads **the whole** window uniformly—it pays more attention to the start and end.
- Keep a chat thread alive for weeks as a knowledge base; **write it down** in docs instead.
- Put **secrets** in the context so the model can "use them if needed".

---

## Core idea

Treat context like a **budget**: smallest prompt, minimum authoritative evidence, retrieval when the corpus is large, and a fresh session when the thread is tired. The best context is the one that makes the answer **short, grounded, and easy to review**.

## Further reading

- [OpenAI — Models and token limits](https://platform.openai.com/docs/models) — current windows and pricing
- [Anthropic — Long context](https://docs.anthropic.com/claude/docs/long-context-window-tips) — practical tips
- [Google — Gemini context caching](https://ai.google.dev/gemini-api/docs/caching) — prefix reuse
- [Nelson Liu et al. — Lost in the middle](https://arxiv.org/abs/2307.03172) — attention across long contexts

---

German version: [`kontextfenster-und-chunks.md`](../../de/ki-&-prompting/kontextfenster-und-chunks.md)
