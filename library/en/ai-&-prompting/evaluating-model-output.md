# Evaluating model output

**Scope:** Applies to **judging whether a model-generated answer is good enough to use**—rubrics, human review, automatic checks, regression sets, red-teaming. Not model benchmarking. Pair with [`prompting-basics.md`](prompting-basics.md), [`structured-output-and-tool-use.md`](structured-output-and-tool-use.md), [`source-evaluation-and-fact-checking.md`](../research-&-analysis/source-evaluation-and-fact-checking.md), and [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md).

## Excerpt
- **Acceptance criteria first**: name what "good" means before you read the output.
- **Four lenses**: accuracy, appropriateness, completeness, safety.
- **Human-in-the-loop** for anything the audience relies on; **automatic checks** for scale.
- **Regression set** of canonical prompts—rerun on every prompt, model, or policy change.
- **Red-team** with adversarial inputs (jailbreaks, prompt injection, edge cases).
- Full rubrics, metrics, and failure-mode catalogue below.

## Before you evaluate

### Concrete

- What **decision** does this output feed (publish, send, archive, reject, escalate)?
- Who is the **audience**, and what is the cost of a mistake to them?
- What **criteria** make an output acceptable? Which are hard-fails?
- How many outputs do you need to judge (one draft vs 10,000 translations)?

### Meta

- Evaluation is **writing the spec**, **late**. Better to spec early and evaluate cheaply.
- "Looks good" is **not** an evaluation.

---

## Purpose

Decide—**deliberately and auditably**—whether an AI output is safe and accurate enough to ship, with a process that scales from one email to a production pipeline.

---

## 1. Write acceptance criteria before reading

For every non-trivial output, list criteria **before** seeing the draft.

```text
Criteria for donor email draft:
- Under 140 words.
- No unverified statistics.
- CTA on its own line, links correct.
- Warm but not guilt-tripping.
- No PII beyond first name placeholder.
- Reading level ≈ CEFR B1.
```

Judge against the list, not against vibes.

## 2. The four lenses

- **Accuracy** — are factual claims, numbers, names, dates, quotes right?
- **Appropriateness** — tone, audience, locale, brand, cultural fit.
- **Completeness** — covers the brief; no missing required sections.
- **Safety** — no PII, no discriminatory content, no policy breach, no misleading omission.

Any **hard-fail** on safety or accuracy blocks the output. Completeness and appropriateness are usually fixable.

## 3. Human review that actually works

- **Two-pass**: a first read for content, a second read out loud for tone and cadence.
- **Check sources**: for every statistic, quote, and claim, open the source.
- **Adversarial skim**: "what could a hostile reader misread?"
- **Time-box**: if a draft needs more than ~15 minutes of fixing, rewrite from scratch.

## 4. Automatic checks

Cheap, fast, and catch a lot:

- **Schema validation** for structured output.
- **Regex / pattern** checks: no `lorem`, no `TODO`, no `$example.com`, no raw `{{placeholders}}`.
- **Length** limits (subject lines, tweets, push notifications).
- **Banned words** list (brand, safeguarding, platform).
- **Link check**: every URL returns 200, goes to the right domain.
- **Language check**: output language matches target locale.
- **PII detector** on inputs *and* outputs.

Run these in CI for any AI-generated artefact that ships.

## 5. Using a second model as judge (with caution)

Using one model to grade another's output:

- Works for **pattern** checks (format, tone, obvious contradictions).
- Is **weak** on facts—a judge that doesn't know the ground truth cannot verify claims.
- Is biased towards **longer**, more confident answers—calibrate with rubrics and paired comparisons.
- Always **spot-check** judge scores against human judgment.

### Good: using a second model as judge (with caution)

```text
You are a strict rubric grader. Score the draft on:
- accuracy_of_claims (0–2): 2 if every claim appears verbatim in SOURCE
- tone_fit (0–2): 2 if tone matches the STYLE GUIDE
- completeness (0–2)

Return JSON only: { "scores": {...}, "issues": [...] }
```

## 6. Regression sets

Keep 10–50 **canonical** inputs with expected properties.

- Rerun on every change to prompt, model version, or policy.
- Expectations as **assertions** (contains, matches, schema) rather than exact strings.
- Include **edge cases**: empty input, multilingual input, ambiguous input, hostile input.
- Store the set in the repo; version it alongside the prompt.

## 7. Red-team and adversarial inputs

Deliberately try to break the system.

- **Jailbreaks**: "ignore previous instructions"—does the system hold?
- **Prompt injection**: hostile content inside a user document. Does the assistant exfiltrate secrets or take disallowed actions?
- **Biased queries**: does the output stereotype a group?
- **PII leakage**: does the assistant reveal data from training or cache?
- **Hallucinated authority**: does it cite sources that do not exist?

Log attacks and fixes; update the regression set.

## 8. Failure-mode catalogue

Name the failure so you can spot it faster.

- **Confident hallucination** — specific, false. Fix: grounding, schema, "not in provided context".
- **Plausible paraphrase** — right shape, subtly wrong. Fix: compare verbatim to source.
- **Omission** — leaves out uncomfortable facts. Fix: explicit "must include" constraints.
- **Tone drift** — hype creep. Fix: counter-example, banned words.
- **Cultural miss** — idioms that do not translate. Fix: native reviewer, locale test set.
- **Legal adjacent** — drifts into legal advice. Fix: refusal rule.
- **Format breakage** — JSON invalid. Fix: schema mode + validator + repair pass.

## 9. Documenting decisions

For anything shippable:

- Record the **model + version**, prompt version, reviewer, date.
- Keep **before / after** of the AI draft when it is materially edited.
- Disclose AI involvement per policy ([`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md)).

## 10. What not to do

- Ship unreviewed output on **safeguarding, legal, medical, financial, or political** topics.
- Rely on "it sounded right" as a quality signal.
- Evaluate only on **happy-path** inputs.
- Keep a single "prompt.txt" with no version history or test set.

---

## Core idea

Evaluation is **spec work, applied**: name the criteria, check accuracy first, automate what you can, red-team the rest, and keep a regression set that grows with your mistakes. A process you can describe is a process you can improve.

## Further reading

- [Promptfoo](https://www.promptfoo.dev/) — open-source prompt testing and evaluation
- [OpenAI — Evals](https://platform.openai.com/docs/guides/evals) — dataset-driven eval patterns
- [Anthropic — Developing and evaluating prompts](https://docs.anthropic.com/claude/docs/prompt-engineering) — guidance and tools
- [NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — governance perspective

---

German version: [`modelloutput-bewerten.md`](../../de/ki-&-prompting/modelloutput-bewerten.md)
