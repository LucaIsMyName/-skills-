# Library Chat Prompt Templates (EN)

Use these prompts to test whether the assistant can follow instructions on one specific markdown file in `library/`.

Before sending, replace:

- `<LANG>`
- `<CHAPTER_SLUG>`
- `<FILE_SLUG>.md`
- `<TASK_INSTRUCTION>`

---

## 1) Smoke Test Prompt

Copy/paste:

```text
Use only this file as source: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Tasks:
1) Confirm the exact file path you used.
2) Summarize the file in exactly 5 bullet points.
3) Extract the top 3 practical takeaways.
4) List 2 follow-up actions a teammate could do today.

Rules:
- If the file cannot be found, stop and report that clearly.
- Do not use other files.
```

Acceptance checklist:

- Path echoed exactly.
- Output has 5 summary bullets.
- Includes 3 takeaways and 2 actions.
- No unrelated-file content.

---

## 2) Instruction-Following Prompt

Copy/paste:

```text
Work only with: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Execute this instruction exactly:
<TASK_INSTRUCTION>

Return:
- "Input path:" with the exact path.
- "Result:" with the requested output.
- "Limitations:" with anything missing or ambiguous in the file.

Rules:
- Do not invent details not present in the file.
- Keep your answer fully grounded in this file.
```

Acceptance checklist:

- Follows the exact user instruction.
- Uses required 3-section output.
- Notes limitations instead of hallucinating.

---

## 3) Groundedness Prompt

Copy/paste:

```text
Analyze only: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Deliver:
1) 4 key claims from the document.
2) For each claim, provide one short direct quote from the file as evidence.
3) A confidence rating (High/Medium/Low) for each claim-evidence pair.

Rules:
- Every claim must be tied to a quote.
- If you cannot find enough evidence, say so explicitly.
- No external knowledge.
```

Acceptance checklist:

- Exactly 4 claims.
- Each claim has a quote.
- Confidence provided for each pair.
- Admits missing evidence when needed.

---

## 4) Constraint Format Prompt

Copy/paste:

```text
Use only: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Output strictly valid JSON with this schema:
{
  "path": "string",
  "audience": ["string"],
  "main_points": ["string"],
  "risks_or_gaps": ["string"],
  "next_steps": ["string"]
}

Rules:
- No markdown, no code fences, JSON only.
- `main_points`: include up to 3 items.
- `next_steps`: include up to 2 items.
- If data is missing, use empty arrays.
- If there are known gaps, add a short note as an item in `risks_or_gaps`.
- Do not include information from any other file.
```

Acceptance checklist:

- Valid JSON only.
- Keys match schema exactly.
- Uses correct path.
- Handles missing data without fabrication or rule conflicts.

---

## 5) Negative Path/Error-Handling Prompt

Copy/paste:

```text
Try to use this file: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

If it exists:
- Return "FOUND" and a 2-bullet summary.

If it does not exist or is ambiguous:
- Return "NOT_FOUND".
- Suggest exactly 3 likely alternative paths based on library naming patterns.
- Ask me one clarifying question.

Rules:
- Never pretend a missing file exists.
- Keep the response concise.
```

Acceptance checklist:

- Correctly distinguishes found vs not found.
- Proposes 3 realistic alternatives when missing.
- Asks exactly one clarifying question on failure.
