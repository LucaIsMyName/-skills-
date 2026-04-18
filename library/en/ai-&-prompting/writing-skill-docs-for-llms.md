# Writing skill docs for LLMs

**Scope:** Applies to **this library and similar doc sets** used by humans **and** LLMs—structure, headings, cross-links, examples, style. Not general technical writing theory. Pair with [`prompting-basics.md`](prompting-basics.md), [`working-with-context-windows.md`](working-with-context-windows.md), [`markdown-and-mdx.md`](../coding/markdown-and-mdx.md), and the repository [`AGENTS.md`](../../../AGENTS.md).

## Excerpt

- **Predictable shape** helps both humans skimming and models retrieving: H1, Scope, Excerpt, Before, Purpose, numbered sections, Core idea, Further reading.
- **Short, declarative** sentences. Short paragraphs. Lots of **Bad / Good** pairs.
- **Cross-link** to sibling pages in Scope; again in sections when relevant.
- **Keep one idea per page.** Split when a page outgrows ~300 lines.
- **EN/DE parity** for this library—same structure, same section order, localised slugs.
- Full checklist and anti-patterns below.

## Before writing

### Concrete

- What **single topic** does this page own?
- Which **siblings** does it relate to (link in Scope)?
- What are the **Bad / Good** examples you will show?
- What external links actually **add value**?

### Meta

- If you can describe the page in one sentence, the page will read well.
- If you cannot, split the page.

---

## Purpose

Produce docs that **both humans and LLMs** can use with confidence—skimmable, linkable, retrievable, and consistent across the library.

---

## 1. The required shape

Every page has this order:

1. `# Title` (human-readable, not the filename).
2. `**Scope:**` one sentence of scope + 2–4 sibling links.
3. `## Excerpt` — 4–6 bullets; TL;DR.
4. `## Before <verb>` — with `### Concrete` (inputs) and `### Meta` (judgment).
5. `---`
6. `## Purpose` — one short paragraph.
7. Numbered `## 1. …` sections with `### Bad` / `### Good` examples where useful.
8. `## Core idea` — one paragraph that a reader can remember.
9. `## Further reading` — 2–4 external links with one-line descriptions.
10. `---` then a footer linking the counterpart-language page.

This structure is stable on purpose: it makes chunking, retrieval, and summarisation reliable.

## 2. Titles, scopes, and filenames

- **Filename**: kebab-case, short, localised on DE pages.
- **H1**: human-readable ("Prompting basics", not `# prompting-basics.md`).
- **Scope**: one sentence of what this page covers, one sentence of what it does **not**, and 2–4 sibling links.

### Bad

```md
# prompting-basics.md

This is about prompts.
```

### Good

```md
# Prompting basics

**Scope:** Applies to **writing effective instructions** for LLMs—roles,
constraints, examples, iteration, verification. Not model training, not
org-wide AI policy. Pair with [`prompt-patterns.md`](prompt-patterns.md)
and [`evaluating-llm-output.md`](evaluating-llm-output.md).
```

## 3. Excerpt: dense but kind

- 4–6 bullets, each a **single idea**.
- Bold the **verb or noun** a skimming reader will look for.
- No full sentences where a bullet works.

## 4. Before / Concrete / Meta

- **Concrete** = inputs the reader must gather.
- **Meta** = judgment calls the reader must make.
- Keep each to 3–5 bullets.

This section is often what an LLM will quote when summarising—make it useful standalone.

## 5. Numbered sections

- Use numbered H2s so chunks map to stable ids (`## 1. …`, `## 2. …`).
- One **main idea** per section.
- Mix **Bad / Good** examples freely; nothing beats a counter-example.
- Keep code blocks short; long programs belong in a linked example.

## 6. Voice and register

- **Declarative** ("Commit messages use the imperative mood"), not hedged ("You might want to…").
- **Second person** for instructions when it helps; **third person** for policy.
- **UK/EN or DE** per the page locale—do not mix.
- **Plain language** at roughly CEFR B2; define jargon on first use.

## 7. Cross-linking

- In **Scope**: link 2–4 related pages.
- Inside sections: link when the topic genuinely lives elsewhere ("see `evaluating-llm-output.md`"), not as decoration.
- Use **relative paths**; check they resolve.
- Link the **EN↔DE** counterpart at the bottom.

## 8. Anti-patterns (what not to do)

- **Essays.** If it reads like a blog post, refactor.
- **Hidden prerequisites.** If the page needs three other pages to make sense, link them explicitly.
- **Out-of-date links.** Scheduled link-check or remove.
- **Editorial humour** that will not age.
- **Long bullets** that are actually paragraphs—break up or promote to sections.

## 9. Checklist before committing

- [ ] H1 is human-readable, not the filename.
- [ ] Scope line: one sentence + 2–4 sibling links.
- [ ] Excerpt: 4–6 bullets, each a single idea.
- [ ] Before section with Concrete / Meta.
- [ ] Numbered `## 1…` sections, each one idea.
- [ ] At least one Bad / Good pair where useful.
- [ ] Core idea paragraph.
- [ ] 2–4 Further reading links.
- [ ] EN↔DE counterpart link at the foot.
- [ ] No broken internal links; paths relative.
- [ ] Tone: declarative, plain, kind.

## 10. What not to do

- Treat this document as style advice for all Markdown—this structure is **specific** to this library.
- Ship a page you would not want to read tomorrow.
- Copy the EN page into DE without translating cross-link filenames and idioms.
- Add long prose sections that a reader will skim past. Use numbered sections and examples.

---

## Core idea

A doc here is a **contract** with two readers—a skimming human and a retrieving model. Give them the same thing: **predictable shape, concrete examples, short sentences, honest uncertainty, and cross-links that point to the next most useful page.**

## Further reading

- [Diátaxis — Documentation framework](https://diataxis.fr/) — tutorial/how-to/reference/explanation split; useful contrast
- [Google developer documentation style guide](https://developers.google.com/style) — broadly applicable writing rules
- [Write the Docs — Documentation guide](https://www.writethedocs.org/guide/) — community wisdom
- [Plain English Campaign](https://www.plainenglish.co.uk/) — language clarity

---

German version: [`skill-dokumente-fuer-llms.md`](../../de/ki-&-prompting/skill-dokumente-fuer-llms.md)
