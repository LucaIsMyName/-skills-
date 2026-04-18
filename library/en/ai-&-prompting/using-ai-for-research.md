# Using AI for research

**Scope:** Applies to **language models in research tasks**—literature scans, interview summarisation, coding qualitative data, drafting survey questions, hypothesis generation. Not statistics (use proper tooling) and not peer-reviewed research methodology. Pair with [`prompting-basics.md`](prompting-basics.md), [`rag-basics.md`](rag-basics.md), [`desk-research.md`](../research-&-analysis/desk-research.md), [`source-evaluation-and-fact-checking.md`](../research-&-analysis/source-evaluation-and-fact-checking.md), [`qualitative-coding.md`](../research-&-analysis/qualitative-coding.md), and [`evaluating-model-output.md`](evaluating-model-output.md).

## Excerpt

- **AI helps you think; it does not know**. Treat outputs as **hypotheses**, not findings.
- **Ground** the model in your sources—never ask it to recite facts from memory.
- **Cite** every claim back to a source you have read; no citation = not a claim.
- **Privacy**: never paste raw interview transcripts, PII, or unpublished data into uncleared tools.
- **Reproducibility**: log prompts, model, and date; the same prompt can yield different outputs later.
- Full workflows and failure modes below.

## Before using AI for research

### Concrete

- What **question** are you answering, and who will read the answer?
- What **sources** are allowed—and are they **shareable** with the tool?
- What is your **evidence bar**—journalistic, academic, internal briefing?
- What would **change your mind** if the model contradicts it?

### Meta

- Generated drafts are **beautiful at plausibility**; plausibility is not truth.
- A fluent wrong answer is worse than no answer.

---

## Purpose

Use AI to **accelerate** research tasks—literature scans, coding, pattern-finding—while keeping every claim **sourced**, **checkable**, and **reproducible**.

---

## 1. What AI is good for, in research

- Summarising a document you provide, into a shape you specify.
- **Coding** qualitative data against a codebook (you write the codebook).
- **Extracting** structured fields from unstructured text (names, dates, themes).
- **Generating** interview guides, survey drafts, hypotheses.
- **Critiquing** a draft for gaps, unclear wording, or unsupported claims.
- **Translating** rough notes (reviewed by a native speaker).

## 2. What AI is *not* good for, in research

- **Citing** sources from memory—outputs are often confident fabrications.
- **Statistics** beyond counting what you provide.
- **Novel facts**—if it wasn't in your inputs, it isn't evidence.
- **Expert judgment** in specialised domains (medicine, law, policy).
- **Meta-analysis**—no, really.

## 3. Ground everything

Prefer **closed-book** prompts: the model answers only from text you paste or retrieve (see [`rag-basics.md`](rag-basics.md)).

### Bad

```text
What does the research say about youth mental health in the UK?
```

### Good

```text
Using ONLY the sources below, list the claims about UK youth mental health.

For each claim, output:
- the quote (verbatim),
- the source label,
- the page / section reference.

If the sources disagree, note the disagreement. If a source is not clear,
say "unclear" rather than paraphrasing.

Sources:
[Source A, Office for National Statistics, accessed 2025-03-01]
<paste>

[Source B, Mind.org.uk, accessed 2025-03-01]
<paste>
```

## 4. Desk research loop

See [`desk-research.md`](../research-&-analysis/desk-research.md) for the full process. AI fits here:

1. **Define** the question (human).
2. **Find** sources yourself or with search tools (human; AI can suggest queries).
3. **Read** and note the sources (human; AI can summarise per your brief).
4. **Synthesise** findings (AI-assisted map-reduce, with citations).
5. **Check** each citation against the source (human).
6. **Write up** with attribution (human).

## 5. Qualitative coding with AI

- Write the **codebook** yourself (definitions, inclusion/exclusion rules, examples).
- Ask the model to apply it to one unit at a time.
- **Validate** on a held-out subset coded by humans; measure agreement (see [`qualitative-coding.md`](../research-&-analysis/qualitative-coding.md)).
- Keep a **disagreements** log—that's where real insight lives.

### Good

```text
Apply the following CODEBOOK to each QUOTE.
Return JSON: { "quote_id": string, "codes": string[], "notes": string }

CODEBOOK (verbatim):
- C1 "access barrier" — mentions time, cost, location, or waiting lists.
- C2 "trust" — explicit reference to trusting staff, services, or info.
- C3 "stigma" — explicit reference to shame, judgement, or concealment.

Rules:
- Apply only codes that are clearly supported by the quote.
- If no codes apply, return codes: [].
- Do NOT invent new codes.
```

## 6. Literature scans

- Use AI to **draft** a search strategy (terms, boolean combinations)—then refine.
- Do **not** accept lists of papers with citations generated purely from the model: cross-check in a real index (PubMed, Scopus, Google Scholar, national libraries).
- For each paper kept, save: citation, abstract, link, date you accessed it.

## 7. Synthesis with map-reduce

```text
Map step:
For each source, extract: question(s) addressed, method, sample, findings,
limitations. Output JSON per source.

Reduce step:
Combine the JSON list into a narrative synthesis that highlights
agreements, disagreements, and gaps. Cite sources by id.
```

Keep the **map** outputs—they are the trail that makes your synthesis auditable.

## 8. Privacy and ethics

- **Never** paste interview transcripts, safeguarding notes, or PII into uncleared tools.
- Prefer **enterprise / no-training** endpoints for anything internal.
- Store transcripts locally, share only **redacted** excerpts for AI help.
- Follow [`gdpr-basics.md`](../ethics-&-legal/gdpr-basics.md) and your IRB / ethics process.

## 9. Reproducibility

- Record: model name, version, date, prompt, seed (if supported), temperature.
- Save **inputs** and **outputs** to the research notebook.
- Expect **drift**—the same prompt may return different results next month.

## 10. What not to do

- Let AI generate a "literature review" that reads well but cites papers that do not exist.
- Use AI output as the **primary source** in a report.
- Scale AI coding to a dataset **without** a human-validated subset.
- Paste **unanonymised** personal data into any online tool.

---

## Core idea

In research, the AI is a **fast, fluent intern who never leaves the library**: it can summarise what you show it, propose patterns, and draft structures. It does not know anything. Every claim needs a human-checked source.

## Further reading

- [Elicit](https://elicit.com/) — research-assistant pattern with citations
- [Cochrane — handbook](https://training.cochrane.org/handbook) — systematic review discipline
- [UK Statistics Authority — Code of Practice](https://code.statisticsauthority.gov.uk/) — quality principles for public statistics
- [ICO — AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/) — privacy considerations

---

German version: [`ki-in-der-recherche.md`](../../de/ki-&-prompting/ki-in-der-recherche.md)
