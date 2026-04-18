# RAG basics

**Scope:** Applies to **retrieval-augmented generation**—answering questions from a specific corpus (docs, policies, wikis). Not full production vector-search engineering (sharding, BM25/hybrid tuning, multi-tenant security). Pair with [`working-with-context-windows.md`](working-with-context-windows.md), [`structured-output-and-tool-use.md`](structured-output-and-tool-use.md), [`security-for-web-apps.md`](../coding/security-for-web-apps.md), and [`evaluating-model-output.md`](evaluating-model-output.md).

## Excerpt
- **Retrieve relevant chunks** from your corpus, then **ground** the model in them.
- **Chunking** at logical seams (sections, paragraphs) matters more than fancy embeddings.
- **Cite** source chunks in the answer; refuse when nothing is relevant.
- **Access control** in retrieval—never mix tenants, never show private docs to public users.
- **Evaluate** with a test set of queries + expected sources + expected answers.
- Full pipeline and pitfalls below.

## Before building RAG

### Concrete

- What **corpus**? How does it change—append-only, daily, live?
- Who queries—public users, logged-in users, staff only?
- What **access controls** must retrieval honour?
- What is the answer's **failure mode**—hallucination, stale info, missing doc?

### Meta

- RAG **ships fast** and **rots fast** without evaluation and ops.
- "Chatbot on top of PDFs" is not a product—decide what decisions the answers feed.

---

## Purpose

Answer questions **from your own documents**—grounded, citeable, access-controlled—so users trust the answers and can verify them.

---

## 1. The minimal pipeline

```
indexing (offline):
  docs → clean → chunk → embed → vector index (+ metadata)

query (online):
  user query → (embed) → retrieve top-k chunks → filter by permissions
           → build prompt with chunks → model answers → cite sources
```

## 2. Chunking

Matters more than people realise.

- Split on **headings** and **paragraphs**, not fixed token counts alone.
- Include a **title / breadcrumb** at the top of each chunk ("Policy › Fundraising › GDPR").
- Target size: ~500–1,200 tokens; small enough for precision, big enough for context.
- Overlap: 10–20% when ideas cross boundaries.
- Keep a **stable id** per chunk for citations and dedup.

## 3. Embeddings and retrieval

- Use a **modern embedding model** from your vendor; tune later.
- Store metadata per chunk: `doc_id`, `title`, `url`, `updated_at`, `access_scope`.
- Retrieve `top_k = 5–10` chunks; **re-rank** with a better (slower) model if precision matters.
- **Hybrid search** (vector + keyword/BM25) often beats vector-only, especially for exact matches (names, IDs, codes).

## 4. Filtering by permissions

Do not rely on the model to respect "don't show this to non-staff".

- **Filter in the retriever**, based on the authenticated user's scopes.
- Never pass chunks the user is not allowed to see into the prompt.
- Log which chunks were retrieved and which were filtered.

## 5. Prompt assembly

### Good: prompt assembly

```text
Answer using ONLY the CONTEXT below. If the context is insufficient,
answer exactly: "I don't know from the provided documents."

Cite sources inline as [doc_id#chunk_id].

CONTEXT:
[policy#3.2]
<chunk text>

[policy#3.3]
<chunk text>

[handbook#7.1]
<chunk text>

QUESTION:
<user query>
```

- Put the **task and safety rules** before and after the context.
- **Label** chunks so the model can cite them.
- Keep context **small**—more chunks is not better past the first few good ones.

## 6. Citations

- Every factual sentence should cite a chunk.
- Expose the citations in the UI so users can click through to the source.
- If the model cannot cite, it should **refuse**—"I don't know from the provided documents" is a good answer.

## 7. Evaluation

A RAG system without evals gets worse over time.

- Build a **golden set**: questions + expected source chunks + acceptable answers.
- Measure:
  - **Retrieval recall** — did we retrieve the right chunk?
  - **Answer accuracy** — does the answer match the source?
  - **Refusal correctness** — does it refuse when it should?
- Rerun on any change to chunker, embedder, prompt, or model.
- See [`evaluating-model-output.md`](evaluating-model-output.md).

## 8. Data freshness and ops

- **Re-index** when docs change; ideally incremental.
- Show an **"as of" date** in the UI.
- Log deletions—a doc removed from the source should disappear from retrieval quickly (GDPR right to erasure).
- Monitor **drift**: new doc types, new vocabulary, new access rules.

## 9. Failure modes

- **Relevant chunk not retrieved** — fix chunking, add hybrid search, add keyword aliases.
- **Answer contradicts retrieved chunk** — tighten the prompt, lower temperature, simpler model for summarisation.
- **Made-up citations** — require `[doc_id#chunk_id]` exactly, validate against retrieved ids.
- **Cross-tenant leak** — filter earlier, add tests per tenant.
- **Stale answers** — re-index pipeline + "as of" UI + cache invalidation.

## 10. What not to do

- Dump **entire documents** into context "just in case".
- Skip access control and hope the prompt enforces it.
- Ship RAG over a corpus containing **PII** without a redaction / access strategy.
- Treat RAG as a **replacement** for search—if keywords already work, don't add a generative layer you do not need.
- Deploy a chatbot where the correct answer is "talk to a human" (e.g. safeguarding, crisis, benefits advice).

---

## Core idea

RAG is **retrieval with a typewriter on top**. The quality of the answers is mostly the quality of **retrieval**—what you index, how you chunk, and how you filter—plus a short, strict prompt that refuses when evidence is missing.

## Further reading

- [OpenAI — Retrieval-augmented generation](https://platform.openai.com/docs/guides/retrieval) — vendor patterns
- [Anthropic — Contextual retrieval](https://www.anthropic.com/news/contextual-retrieval) — chunk enrichment
- [Pinecone — RAG learning center](https://www.pinecone.io/learn/retrieval-augmented-generation/) — broad overview
- [LangChain — RAG tutorials](https://python.langchain.com/docs/tutorials/rag/) — code-first walkthroughs

---

German version: [`rag-grundlagen.md`](../../de/ki-&-prompting/rag-grundlagen.md)
