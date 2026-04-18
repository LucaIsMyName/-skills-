# RAG-Grundlagen

**Scope:** Gilt für **Retrieval-Augmented Generation**—Antworten aus einem konkreten Korpus (Docs, Policies, Wikis). Keine produktive Vektor-Suche mit Sharding, BM25/Hybrid-Tuning, Multi-Tenant. Kombiniere mit [`kontextfenster-und-chunks.md`](kontextfenster-und-chunks.md), [`strukturierte-ausgabe-und-tools.md`](strukturierte-ausgabe-und-tools.md), [`sicherheit-fuer-webapps.md`](../coding/sicherheit-fuer-webapps.md) und [`modelloutput-bewerten.md`](modelloutput-bewerten.md).

## Excerpt

- **Relevante Chunks** aus deinem Korpus holen, Modell darauf grundieren.
- **Chunking** an logischen Nähten ist wichtiger als fancy Embeddings.
- **Zitieren** im Antworttext; **verweigern**, wenn nichts relevant ist.
- **Zugriffskontrolle** im Retrieval—keine Mandantenvermischung.
- **Bewerten** mit Testset (Queries + erwartete Quellen + Antworten).
- Pipeline und Fallen unten.

## Vor dem RAG-Bau

### Konkret

- Welches **Korpus**? Wie ändert es sich?
- Wer fragt—public, angemeldet, Staff?
- Welche **Zugriffsrechte** muss Retrieval respektieren?
- Was ist der **Fehlermodus**—Halluzination, veraltet, Dokument fehlt?

### Meta

- RAG **startet schnell** und **rottet schnell** ohne Evaluation/Ops.
- "Chatbot auf PDFs" ist kein Produkt—entscheide, welche Antworten welche Entscheidungen speisen.

---

## Zweck

Fragen aus **eigenen Dokumenten** geerdet, zitierbar, zugriffskontrolliert beantworten.

---

## 1. Minimal-Pipeline

```
Indexing (offline):
  Docs → bereinigen → chunken → embedden → Vektorindex (+ Metadaten)

Query (online):
  User-Query → (embedden) → Top-k-Chunks → nach Rechten filtern
           → Prompt mit Chunks → Modell antwortet → Quellen zeigen
```

## 2. Chunking

Wichtiger als man denkt.

- An **Überschriften/Absätzen** trennen, nicht nach Tokens allein.
- **Titel/Breadcrumb** im Chunk ("Policy › Fundraising › DSGVO").
- Größe ~500–1.200 Tokens.
- Überlappung 10–20%.
- **Stabile ID** pro Chunk.

## 3. Embeddings und Retrieval

- Modernes Embedding des Anbieters; später tunen.
- Metadaten: `doc_id`, `title`, `url`, `updated_at`, `access_scope`.
- `top_k = 5–10`; **Re-Ranker** bei hoher Präzision.
- **Hybrid-Suche** (Vektor + BM25) schlägt oft reine Vektor-Suche, v. a. bei exakten Matches.

## 4. Filtern nach Rechten

Das Modell soll nichts entscheiden.

- **Im Retriever** filtern, basierend auf Session/Scope.
- Chunks ohne Berechtigung **nie** in den Prompt.
- Retrieval + Filter loggen.

## 5. Prompt-Aufbau

### Gut

```text
Antworte NUR mit dem KONTEXT unten. Reicht der Kontext nicht,
antworte exakt: "Ich weiß es nicht aus den vorhandenen Dokumenten."

Zitiere Quellen inline als [doc_id#chunk_id].

KONTEXT:
[policy#3.2]
<Chunk>

[policy#3.3]
<Chunk>

FRAGE:
<User-Query>
```

## 6. Quellenangaben

- Jede Tatsachenaussage zitiert einen Chunk.
- UI zeigt Zitate mit Link zur Quelle.
- Ohne Zitat: **verweigern**.

## 7. Evaluation

Ohne Evals wird RAG leise schlechter.

- **Golden Set**: Fragen + erwartete Chunks + akzeptable Antworten.
- Messen:
  - **Retrieval-Recall**.
  - **Antwort-Genauigkeit**.
  - **Verweigerung** richtig?
- Bei jeder Änderung laufen lassen. Siehe [`modelloutput-bewerten.md`](modelloutput-bewerten.md).

## 8. Daten-Aktualität und Ops

- Bei Doc-Änderung **re-indexieren**, idealerweise inkrementell.
- **"Stand vom"** in der UI.
- Löschungen schnell propagieren (DSGVO-Recht auf Löschung).
- **Drift** beobachten.

## 9. Fehlermodi

- **Richtiger Chunk nicht gefunden** — Chunking, Hybrid, Synonyme.
- **Antwort widerspricht Chunk** — Prompt straffen, simpleres Modell für Summaries.
- **Erfundene Zitate** — `[doc_id#chunk_id]` gegen geholte IDs validieren.
- **Mandanten-Leak** — Filter früh, Tests pro Mandant.
- **Veraltete Antworten** — Re-Index + "Stand" + Cache-Invalidation.

## 10. Was nicht tun

- **Ganze Dokumente** "vorsichtshalber" stopfen.
- Zugriffskontrolle im Prompt.
- RAG über **PII**-Korpus ohne Schwärzungs-/Zugriffsstrategie.
- RAG als **Such**-Ersatz, wo Stichwortsuche reicht.
- Chatbot, wo eigentlich **Mensch** gebraucht wird (Kinderschutz, Krise, Sozialleistung).

---

## Core idea

RAG ist **Retrieval mit Schreibmaschine**. Die Qualität liegt fast ganz in **Retrieval**—Indizierung, Chunking, Filterung—plus ein strenger Prompt, der bei fehlenden Belegen verweigert.

## Further reading

- [OpenAI — Retrieval-augmented generation](https://platform.openai.com/docs/guides/retrieval)
- [Anthropic — Contextual retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [Pinecone — RAG learning center](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [LangChain — RAG tutorials](https://python.langchain.com/docs/tutorials/rag/)

---

Englische Version: [`rag-basics.md`](../../en/ai-&-prompting/rag-basics.md)
