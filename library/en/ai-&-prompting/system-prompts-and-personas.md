# System prompts and personas

**Scope:** Applies to **splitting persistent policy from per-task work**—how and when to use a **system prompt**, a **persona**, and a **user prompt**. Not vendor account setup, not model selection. Pair with [`prompting-basics.md`](prompting-basics.md), [`prompt-patterns.md`](prompt-patterns.md), [`structured-output-and-tool-use.md`](structured-output-and-tool-use.md), and [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md).

## Excerpt

- **System prompt** = stable rules that apply across turns (tone, safety, refusal style, default format).
- **User prompt** = the task for this turn.
- **Persona** is a tool for **tone and audience fit**, not a substitute for facts or accountability.
- **Never** use personas to impersonate real staff, beneficiaries, or public figures without consent.
- **Short** system prompts are easier to debug than long ones—prefer rules + one example.
- Patterns, templates, and anti-patterns below.

## Before you set a system prompt

### Concrete

- What must **always** be true regardless of task (locale, plain language, no PII logging, refusal rules)?
- What is the **default output format** when the user does not specify one?
- Which tools / plugins / external data sources is the assistant allowed to use?
- What is the **refusal behaviour** for out-of-scope requests?

### Meta

- A bloated system prompt hides bugs—it is expensive context and hard to test.
- Prefer **short, testable rules** over long philosophy.
- Write it so a new teammate could read it once and predict the assistant's behaviour.

---

## Purpose

Separate **stable policy** (system) from **task-specific work** (user) so behaviour is **consistent, reviewable, and safe**—and so a regression set can prove it.

---

## 1. The three layers

- **System**: global rules, brand voice defaults, safety, default output format, refusal style.
- **User**: the concrete request for this turn (task + inputs + constraints).
- **Assistant (prior turns)**: conversation history—keep it **small**, **non-sensitive**, and relevant.

### Bad

```text
[System]: You are a genius who never makes mistakes.
[User]: Summarise this confidential report: <paste>
```

Problems: no rules, no privacy constraints, confidential data going in.

### Good

```text
[System]
You are a careful editor for an NGO comms team.

Style:
- Plain language, UK English, CEFR B1.
- Warm, specific, no superlatives we cannot prove.

Safety:
- Do NOT accept personal data, safeguarding details, or medical/legal
  specifics. If the user pastes them, respond: "Please remove personal
  details before I can help."
- If the task is unclear, ask ONE specific question.

Format:
- Default output: bullet summary + short prose paragraph.
- When asked for JSON: return JSON only, no Markdown.

[User]
Summarise the following into 5 bullets for the board:
<non-sensitive text>
```

## 2. When a persona helps

- **Tone and audience fit**: "explain to a trustee who is not a web developer".
- **Role framing**: "copy editor" vs "information architect" vs "safeguarding reviewer"—each sets different heuristics.
- **Constraints by implication**: "act as a first-draft reviewer, not a publisher" reduces overreach.

### Good

```text
You are helping a comms lead prepare a draft. You are not a lawyer.
If something looks legal in nature, say: "This needs legal review" and
list the questions a lawyer should answer.
```

## 3. When personas fail

Personas do not grant the model knowledge, authority, or rights it lacks.

- **Facts**: a "senior epidemiologist" persona does not make the model accurate on epidemiology.
- **Authority**: do not impersonate a named CEO or spokesperson without the person's approval.
- **Rights**: personas cannot launder copyrighted style or voice of real individuals.

### Bad

```text
You are our CEO, Anna Ruiz. Write the annual letter in her voice.
```

### Good

```text
Draft an annual letter in the voice described by our style guide (pasted).
Mark lines that depend on facts or opinions that must be approved by the
CEO with [APPROVE].
```

## 4. Refusal and escalation style

Bake refusal behaviour into the system prompt so it is predictable.

### Good

```text
Refusal rules:
- If asked for legal, medical, or financial advice, respond exactly:
  "I can help you prepare the question, not answer it. Please confirm
  this with a qualified professional."
- If asked to generate an image of a real, named person, respond exactly:
  "I cannot generate likenesses of identifiable real people. Suggest an
  alternative approach?"
- If asked to produce content that could facilitate harm, refuse and
  explain the policy briefly without lecturing.
```

## 5. Output contracts

Put the **default** output contract in the system prompt; override per task in the user prompt.

- Human-facing: Markdown with short paragraphs, bullets when there are ≥3 items.
- Machine-facing: JSON per schema, no Markdown fences, no commentary.
- Translations: target locale + style note (formal / informal).

## 6. Minimal system-prompt template

```text
- Purpose: <what the assistant is for, in one sentence>
- Audience: <who reads the outputs>
- Style: <tone, reading level, locale>
- Safety: <no PII, no unverified stats, refusal style, tool boundaries>
- Output: <default format; when to switch to JSON>
- Uncertainty: <what to do when info is missing — ask, mark [VERIFY], refuse>
- Escalation: <what must go to a human>
```

## 7. Versioning and regression testing

- Tag system prompts with a **version** (e.g. `v7 — 2025-03`).
- Keep a **regression set** of 5–20 canonical prompts; re-run on every change (see [`evaluating-model-output.md`](evaluating-model-output.md)).
- Log the **diff** between versions and the behaviour changes you observed.

## 8. Security considerations

- Treat system-prompt contents as **visible**—users can often extract them. Do not store secrets there.
- Be aware of **prompt injection**: a malicious user document can try to override the system prompt ("ignore previous instructions…"). Counter-measures:
  - Put untrusted user data inside clearly labelled fences.
  - Restate critical rules in the user prompt as a reminder.
  - Use tool / function allow-lists enforced in code, not in the prompt.

## 9. Organisational fit

- Align the default system prompt with **brand voice** ([`tone-of-voice-and-brand-voice.md`](../language-&-communication/tone-of-voice-and-brand-voice.md)) and **disclosure policy** ([`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md)).
- Do not ship personas that romanticise or stereotype beneficiaries.
- Document who can change the system prompt and how changes are reviewed.

## 10. What not to do

- Put **secrets** in system prompts (they are still data, and still leakable).
- Use `"Ignore previous instructions"` games—you are still responsible for the outputs.
- Promise **emotional support** personas where the actual service is unmoderated automation—especially around mental health, safeguarding, or abuse.
- Change the system prompt silently in production without a rollback path.

---

## Core idea

**System prompts** are **policy**; **user prompts** are **work**. A persona shapes **voice**, not **truth**. Ship one short, versioned system prompt you can regression-test and debug—then keep it that way.

## Further reading

- [Anthropic — System prompts](https://docs.anthropic.com/claude/docs/system-prompts) — API and behaviour
- [OpenAI — Messages and roles](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) — system/user/assistant roles
- [OWASP — LLM Top 10 (prompt injection)](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — attack patterns to design around
- [Simon Willison — Prompt injection explained](https://simonwillison.net/tags/prompt-injection/) — working notes

---

German version: [`systemprompts-und-personas.md`](../../de/ki-&-prompting/systemprompts-und-personas.md)
