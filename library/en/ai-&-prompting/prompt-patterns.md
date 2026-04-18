# Prompt patterns

**Scope:** Applies to **reusable patterns** for language-model interactions—few-shot, decomposition, critique-and-revise, structured output, constrained creativity, tool-use handoffs. Not a replacement for domain expertise, not a substitute for fact-checking. Pair with [`prompting-basics.md`](prompting-basics.md), [`structured-output-and-tool-use.md`](structured-output-and-tool-use.md), [`evaluating-model-output.md`](evaluating-model-output.md), and [`working-with-context-windows.md`](working-with-context-windows.md).

## Excerpt

- **Few-shot** when format or voice is hard to describe—show 1–3 examples of the *exact* shape.
- **Decompose** long tasks into outline → expand → edit; check at each step.
- **Critique-then-revise** when a draft is close but uneven—list issues first, fix second.
- **Structured output** (JSON / schema) whenever a machine or human reviewer must parse the result.
- **Constrained creativity** when you need options without chaos—set axes and limits.
- Full skeletons, Bad/Good, and when *not* to use each pattern below.

## Before choosing a pattern

### Concrete

- What is **fragile** (tone, structure, facts, safety)? Protect that first.
- Is the output **parsed** (machine) or **read** (human)?
- Is the task **one step** or several (outline → draft → edit)?
- What is the **cost of a miss**—embarrassing typo or shipped misinformation?

### Meta

- Patterns reduce **variance**; they do not remove **responsibility** for accuracy.
- The wrong pattern is worse than none—do not chain five techniques "just in case".

---

## Purpose

Pick **predictable patterns** so the model stays on task, your edits shrink, you can **review faster**, and you can swap models without rewriting every prompt.

---

## 1. Few-shot (show, don't only tell)

Use when **format** or **voice** is hard to describe in rules alone. Examples beat adjectives.

### Good

```text
Task: Classify each line as "urgent" or "routine".

Examples:
- "We need a quote by 17:00 for the press." → urgent
- "FYI newsletter draft attached." → routine
- "Board meeting rescheduled to Friday." → routine
- "Safeguarding concern raised by volunteer, needs review today." → urgent

Lines to classify:
1. <...>
2. <...>
```

Notes:

- 1–3 examples for format; more when tone is subtle.
- Mix **positive and negative** examples to pin the boundary.
- Keep examples **representative** of real inputs—cherry-picked examples train cherry-picked behaviour.

## 2. Chain-of-thought-style prompting (use carefully)

When you want **explicit reasoning** for debugging or teaching, ask for steps—then **verify** each one. Never treat model "reasoning" as authoritative.

### Bad

```text
Think step by step and tell me the legally correct answer.
```

### Good

```text
Task: List the steps YOU WOULD TAKE to sanity-check this claim.
DO NOT present your conclusion as legal advice.

Output:
1) Checks to run
2) Evidence that would be needed
3) What a human should confirm with legal counsel
```

### Meta

- Never cite model reasoning as **legal, medical, financial, or safeguarding** advice.
- If you only want the answer, skip the reasoning—it bloats context and slows review.

## 3. Decomposition (outline → expand → edit)

Long pieces break at the **structural** seams. Decompose them.

### Good

```text
Step 1: Produce an outline with 5–7 bullets for an 800-word article on X.
Output the outline only; do not write paragraphs yet.

Step 2: For bullet <n>, expand to 120–160 words in plain language.
Keep claims strictly to the outline.

Step 3: Write a 2-sentence summary for the top and check every numeric claim
against the provided source.
```

Why it works:

- Each step has **one job**, which is easier to evaluate.
- Edits at step 1 are cheap; edits at step 3 are expensive.
- Different steps can use different models or reviewers.

## 4. Critique-then-revise

When a first draft is close but uneven.

### Good

```text
Step 1: Review the draft below. List up to 5 issues grouped by
{clarity, tone, structure, facts}. Do NOT rewrite yet.

Step 2: Rewrite the draft addressing ONLY the issues listed in step 1.
Do not introduce new claims.

Draft:
<...>
```

### Meta

- Separating critique from revision surfaces disagreements before rewriting.
- Useful with human-in-the-loop: you decide which issues apply.

## 5. Constrained creativity (options without chaos)

When you need **variants**, not infinite sludge.

### Good

```text
Task: Propose 3 subject lines for a donor email.

Constraints:
- Max 8 words each
- No exclamation marks
- No superlatives ("best", "amazing", "urgent")
- Three different angles: curiosity / benefit / stewardship
- Must be safe for a grieving reader

Output format:
1) <angle> — <subject>
2) <angle> — <subject>
3) <angle> — <subject>
```

## 6. Structured output (JSON / schema)

When the result will be parsed, stored, or compared, use a schema—see [`structured-output-and-tool-use.md`](structured-output-and-tool-use.md).

### Good

```text
Return ONLY JSON matching:
{
  "title": string,
  "bullets": string[],         // max 5, each ≤120 chars
  "confidence": "low" | "medium" | "high",
  "unknowns": string[]
}

Rules:
- If a field is unknown, use "" or []. Do NOT invent citations.
- No Markdown, no commentary.
```

## 7. Grounding / "closed-book" (RAG without a vector store)

When you have the source text and want the model to stay inside it.

### Good

```text
Answer the question using ONLY the CONTEXT below.
If the context is insufficient, answer exactly: "Not in provided context."

CONTEXT:
<pasted chunks with a source label>

QUESTION:
<...>
```

See [`rag-basics.md`](rag-basics.md) for the fuller retrieval loop.

## 8. Refuse-by-default for sensitive tasks

For safeguarding, legal, medical, political, or crisis topics.

### Good

```text
You are drafting a holding statement. Do NOT attribute blame, speculate on
causes, or name individuals. If any input would require you to do those
things, respond exactly: "This needs human editorial and legal review."

Approved facts:
- <...>
```

## 9. Tool-use handoff (model proposes, code executes)

When the model should call out to search, a calculator, or an internal system—see [`structured-output-and-tool-use.md`](structured-output-and-tool-use.md) for the engineering side.

### Good

```text
If external facts are needed, request a tool call:
{"tool": "web_search", "query": "<single query string>"}

Never act as if you already know the answer; if no tool is called, say what
you would need to verify.
```

## 10. Anti-patterns (what not to do)

- **Ten patterns in one prompt**—split into runs; you will not know which step worked.
- **Roleplay** to bypass safety.
- **Open-ended "be creative"** with no constraints—you will get mush.
- **Chain-of-thought theatre** when you only need the answer.
- **Few-shot with private examples** that you cannot publish (they become context leakage if outputs are reused).

---

## Core idea

Patterns are **control surfaces**: few-shot for shape, decomposition for length, critique-then-revise for quality, grounding for facts, structured output for machines. Pick the smallest pattern that fits the risk, and **verify** the result—always.

## Further reading

- [OpenAI — Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic — Prompt library](https://docs.anthropic.com/claude/prompt-library) — patterned examples
- [Google — Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Lilian Weng — Prompt engineering survey](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/) — research context

---

German version: [`prompt-muster.md`](../../de/ki-&-prompting/prompt-muster.md)
