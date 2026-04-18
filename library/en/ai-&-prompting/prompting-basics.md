# Prompting basics

**Scope:** Applies to **writing effective instructions** for language models—roles, constraints, examples, iteration, verification. Not model training, not vendor procurement, not org-wide AI policy (see [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md)). Pair with [`prompt-patterns.md`](prompt-patterns.md), [`evaluating-model-output.md`](evaluating-model-output.md), and [`writing-skill-documentation.md`](writing-skill-documentation.md).

## Excerpt

- **State the job** in one sentence; add **constraints** (length, tone, audience, format, what must not happen).
- **Give examples** when format matters; **counter-examples** when a failure mode repeats.
- **Iterate**: smallest prompt that could work → read output against acceptance criteria → change **one** variable.
- **Verify** every factual claim; you, not the model, are responsible for what goes out.
- **Never paste** PII, safeguarding cases, donor records, or unpublished client quotes into uncleared tools.
- Full rules, failure modes, and templates below.

## Before prompting

Before sending a prompt, clarify **what success looks like** and **what must never happen**. Prompts without a target are just wishes.

### Concrete

- **Audience** and **channel** (donor email, internal brief, social post, code, JSON).
- **Output shape**: bullets, paragraphs, JSON, table, code, Markdown.
- **Hard limits**: word count, banned words, must-include facts, citation rules, reading level (CEFR A2 / B1 / B2).
- **Inputs you can share**: is the source text public, internal, confidential, personal data?
- **Approvals** expected before publishing.

### Meta

- Vague prompts get vague answers. **Specificity** is kindness—to the model and to the reader.
- If you cannot define success, **stop** and gather inputs before prompting.
- Prompting is **specification**—treat it like writing a mini-brief.

---

## Purpose

Use language models as **tools under human judgment**: clear instructions, tight feedback loops, and verification—so outputs are **useful, safe, and on-brief**, not eloquent-sounding guesses.

---

## 1. Anatomy of a strong prompt

A usable prompt names five things, in this order or close to it:

- **Task**: what to produce (one sentence).
- **Context**: background the model needs (not secrets or PII without clearance).
- **Constraints**: tone, length, structure, must-include / must-avoid.
- **Format**: how the answer is laid out.
- **Examples** (optional but often decisive): one or two input/output pairs.

### Bad

```text
Write something about our fundraiser.
```

### Good

```text
Task: Draft a 120-word email to existing donors (UK English) inviting them to a
virtual briefing on 12 May.

Context: We held one briefing last year with 84 attendees and raised £6,200 for
the evening youth sessions.

Constraints:
- Warm, confident, not guilt-tripping.
- Mention one concrete outcome from last year (use this verified fact:
  "three new evening sessions now running each week").
- CTA: register via [link].
- Do not invent statistics, testimonials, or names.

Format: subject line + short paragraphs + clear CTA line.
```

## 2. Roles and system prompts

- A **role** ("You are a careful editor…") shapes **tone**—it is not a substitute for **constraints**.
- Prefer **explicit rules** over vibes: "Use plain language, CEFR B1, short sentences" beats "be simple and friendly".
- See [`system-prompts-and-personas.md`](system-prompts-and-personas.md) for when to put rules in a system prompt vs a user prompt.

### Bad

```text
You are a world-class marketer. Make it amazing.
```

### Good

```text
You are helping a comms lead edit a draft.

Rules:
- Plain language (CEFR B1), short sentences.
- No superlatives we cannot prove.
- Preserve every factual claim exactly; flag anything that looks uncertain
  with [VERIFY].
- If a sentence is unclear, ask one specific question instead of guessing.
```

## 3. Examples and counter-examples (few-shot)

Examples are the fastest way to pin **shape** and **voice**.

- **One** example: usually enough for format (JSON shape, bullet length).
- **Two–three** examples: useful for tone when you cannot describe it in rules.
- A **counter-example** is worth many adjectives when the same mistake keeps appearing.

### Good

```text
Example of desired tone:
"We're hosting a short briefing on 12 May. Here's what changed last year—and
what we're planning next."

Example to avoid (too hypey):
"Don't miss this incredible, unmissable, once-in-a-lifetime opportunity!!!"
```

## 4. Constraints that actually work

- **Length** as a number ("≤120 words"), not a mood ("short").
- **Reading level** as a scheme ("CEFR B1") or audience ("volunteer trustee, no jargon").
- **Forbidden content**: list explicitly ("no statistics, no testimonials, no names of individuals").
- **Uncertainty rule**: "If unsure, write `[VERIFY]` and continue—do not guess."
- **Output purity**: "Return JSON only, no Markdown fences, no commentary."

## 5. Iteration loop

Prompt engineering is **cheap feedback, not oracle-hunting**.

1. Run the smallest prompt that could plausibly work.
2. Compare output against **acceptance criteria** (see [`evaluating-model-output.md`](evaluating-model-output.md)).
3. Identify **one** failure mode (wrong tone? hallucinated number? missing section?).
4. Change **one** thing—usually add one constraint or one example.
5. Re-run. Stop when the output is good enough to edit; finish by hand.

### Meta

- **Do not** stack ten new requirements in one turn—you will not know which one helped.
- If two iterations fail, the **prompt** probably isn't the problem—your **inputs** or your **goal** are unclear.

## 6. Grounding: facts, not vibes

Models generate plausible text. Plausibility is not truth.

- **Provide** the facts the model should use—do not ask it to "remember".
- For web claims, require the model to say "not in provided sources" rather than invent a citation.
- Pair research work with [`using-ai-for-research.md`](using-ai-for-research.md) and [`source-evaluation-and-fact-checking.md`](../research-&-analysis/source-evaluation-and-fact-checking.md).

### Bad

```text
Summarise the key statistics on child poverty in the UK in 2024 with citations.
```

### Good

```text
Using ONLY the text below (pasted from source X, accessed 2025-03-01), extract:
- 3 statistics, each with a short verbatim quote
- page / section reference for each
If a claim is not supported by the text, write "not in source".

Source:
[paste]
```

## 7. Privacy and safety

- **Never** paste personal data, safeguarding cases, donor PII, unpublished client quotes, medical or financial details into a tool you have not cleared.
- **Redact** before pasting when clearance is partial (names → `[PERSON]`, addresses → `[ADDRESS]`).
- Use **enterprise / no-training** endpoints where your org policy requires it.
- Follow [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md) for what must be disclosed to readers.

## 8. Common failure modes

- **Confident hallucination**: specific name/date/URL that does not exist. **Fix**: force grounding; ask the model to cite the provided text only.
- **Tone drift**: starts neutral, ends breathless. **Fix**: tighten tone rules, add a counter-example.
- **Scope creep**: answers a bigger question than you asked. **Fix**: restate the task and the out-of-scope list.
- **Format breakage**: mixes JSON and prose. **Fix**: "Return only JSON. No Markdown. No commentary." plus a schema.
- **Over-refusal**: refuses a safe task. **Fix**: explain the lawful, benign purpose.

## 9. A reusable template

```text
Role: <1 sentence — who is the assistant acting as>

Task: <1 sentence — what to produce>

Context (authoritative, do not contradict):
- <fact or constraint>
- <fact or constraint>

Rules:
- Language: <locale / reading level>
- Length: <concrete number>
- Must include: <...>
- Must not include: <...>
- Uncertainty: if unsure, mark [VERIFY]

Output format:
<describe or show with example>

Example:
<optional 1–3 examples>
```

## 10. What not to do

- Ask the model to **invent** citations, quotes, or statistics.
- Paste **secrets** or **credentials** into a prompt "to speed things up".
- Treat **one-shot** output as shippable for high-stakes comms (press, safeguarding, legal).
- Use **roleplay** to bypass safety policy—you remain responsible.
- Chain ten rewrites in one thread when starting fresh would be faster.

---

## Core idea

Prompting is **specification work under uncertainty**: the model mirrors the clarity of your spec, and the quality of your verification. If the output is wrong, the fix is almost never "a cleverer prompt"—it is a sharper goal, better inputs, or an honest "not enough information".

## Further reading

- [OpenAI — Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering) — vendor patterns; adapt to your policy
- [Anthropic — Prompt engineering overview](https://docs.anthropic.com/claude/docs/intro-to-prompting) — structured examples and constraints
- [Google — Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) — Gemini-flavoured but broadly applicable
- [Simon Willison — Prompt engineering notes](https://simonwillison.net/tags/prompt-engineering/) — working-practitioner posts

---

German version: [`prompten-grundlagen.md`](../../de/ki-&-prompting/prompten-grundlagen.md)
