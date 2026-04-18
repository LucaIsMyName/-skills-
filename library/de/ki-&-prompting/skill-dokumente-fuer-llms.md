# Skill-Dokumente für LLMs

**Scope:** Gilt für **diese Bibliothek und ähnliche Doc-Sets** für Menschen **und** LLMs—Struktur, Überschriften, Querverweise, Beispiele, Stil. Keine allgemeine Technik-Schreib-Theorie. Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`kontextfenster-und-chunks.md`](kontextfenster-und-chunks.md), [`markdown-und-mdx.md`](../coding/markdown-und-mdx.md) und [`AGENTS.md`](../../../AGENTS.md).

## Excerpt

- **Vorhersagbare Form** hilft Menschen beim Skimmen und Modellen beim Retrieval: H1, Scope, Excerpt, Before, Purpose, nummerierte Sektionen, Core idea, Further reading.
- **Kurze, deklarative** Sätze. Kurze Absätze. Viele **Schlecht/Gut**-Paare.
- **Verknüpfen** zu Geschwisterseiten in Scope; erneut in Sektionen, wo sinnvoll.
- **Eine Idee pro Seite.** Aufteilen, wenn >300 Zeilen.
- **EN/DE-Parität**—gleiche Struktur, gleiche Reihenfolge, lokalisierte Slugs.
- Checkliste und Anti-Muster unten.

## Vor dem Schreiben

### Konkret

- Welches **eine Thema** besitzt die Seite?
- Welche **Geschwister** im Scope verlinken?
- Welche **Schlecht/Gut**-Beispiele zeigst du?
- Welche externen Links **bringen** wirklich etwas?

### Meta

- Wenn die Seite in einem Satz beschreibbar ist, liest sie sich gut.
- Wenn nicht, aufteilen.

---

## Zweck

Dokumente produzieren, die **Menschen und LLMs** sicher nutzen können—skimmbar, verlinkbar, abrufbar, konsistent.

---

## 1. Erforderliche Form

Reihenfolge:

1. `# Titel` (lesbar, nicht Dateiname).
2. `**Scope:**` Satz + 2–4 Geschwisterlinks.
3. `## Excerpt` — 4–6 Bullets; TL;DR.
4. `## Before <verb>` — mit `### Konkret` (Inputs) und `### Meta` (Urteil).
5. `---`
6. `## Zweck` — kurzer Absatz.
7. Nummerierte `## 1. …` Sektionen mit `### Schlecht` / `### Gut`.
8. `## Core idea` — ein Satz, den Lesende behalten.
9. `## Further reading` — 2–4 externe Links + 1 Zeile.
10. `---` dann Footer-Link zur Gegensprache.

Form ist bewusst stabil—erleichtert Chunking, Retrieval, Zusammenfassung.

## 2. Titel, Scope, Dateiname

- **Dateiname**: kebab-case, kurz, lokalisiert.
- **H1**: lesbar ("Prompten-Grundlagen", nicht `# prompten-grundlagen.md`).
- **Scope**: was drin, was nicht, 2–4 Geschwisterlinks.

### Schlecht

```md
# prompten-grundlagen.md

Es geht um Prompts.
```

### Gut

```md
# Prompten-Grundlagen

**Scope:** Gilt für **wirksame Anweisungen** an LLMs—Rollen, Einschränkungen,
Beispiele, Iteration, Prüfung. Nicht Modelltraining, nicht Policy. Kombiniere
mit [`prompt-muster.md`](prompt-muster.md) und [`llm-output-bewerten.md`](llm-output-bewerten.md).
```

## 3. Excerpt: dicht und freundlich

- 4–6 Bullets, je **eine** Idee.
- Wichtige Wörter **fett** machen.
- Bullet statt Satz, wo möglich.

## 4. Before / Konkret / Meta

- **Konkret** = Inputs, die Lesende sammeln müssen.
- **Meta** = Urteile, die Lesende fällen müssen.
- 3–5 Bullets pro Teil.

LLMs zitieren diesen Teil oft—als Stand-alone schreiben.

## 5. Nummerierte Sektionen

- H2 nummeriert, damit Chunk-IDs stabil bleiben (`## 1. …`).
- **Eine** Idee pro Sektion.
- **Schlecht/Gut** großzügig mischen.
- Code-Blöcke kurz; lange Programme verlinken.

## 6. Stimme und Register

- **Deklarativ** ("Commit-Messages im Imperativ"), nicht gehedged.
- **Du/Sie** nach Seiten-Locale, nicht mischen.
- **Einfache Sprache** (≈ CEFR B2); Jargon bei Erstnennung definieren.

## 7. Querverweise

- **Scope**: 2–4 verwandte Seiten.
- In Sektionen: verlinken, wenn das Thema wirklich woanders wohnt—nicht als Deko.
- **Relative Pfade**; Auflösung prüfen.
- **EN↔DE**-Gegenstück unten.

## 8. Anti-Muster

- **Essays.** Wenn es wie Blog klingt, refaktorieren.
- **Versteckte Voraussetzungen.** Explizit verlinken.
- **Veraltete Links.** Regelmäßig prüfen.
- **Redaktioneller Humor**, der nicht altert.
- **Lange Bullets**—aufteilen oder zur Sektion machen.

## 9. Checkliste vor Commit

- [ ] H1 lesbar, nicht Dateiname.
- [ ] Scope-Zeile: Satz + 2–4 Geschwisterlinks.
- [ ] Excerpt: 4–6 Bullets, je eine Idee.
- [ ] Before mit Konkret/Meta.
- [ ] Nummerierte Sektionen, je eine Idee.
- [ ] Mindestens ein Schlecht/Gut-Paar.
- [ ] Core idea.
- [ ] 2–4 Further reading.
- [ ] EN↔DE-Link im Footer.
- [ ] Keine kaputten Links; Pfade relativ.
- [ ] Ton: deklarativ, einfach, freundlich.

## 10. Was nicht tun

- Diese Struktur als allgemeinen Markdown-Stil ausgeben.
- Seite veröffentlichen, die du morgen nicht lesen willst.
- EN 1:1 in DE kopieren ohne Slugs/Idiome anzupassen.
- Lange Prosa statt Sektionen und Beispielen.

---

## Core idea

Ein Doc hier ist ein **Vertrag** mit zwei Lesenden—Mensch im Skim und abrufendes Modell. Gib beiden dasselbe: **vorhersagbare Form, konkrete Beispiele, kurze Sätze, ehrliche Unsicherheit, nützliche Querverweise**.

## Further reading

- [Diátaxis — Documentation framework](https://diataxis.fr/)
- [Google developer documentation style guide](https://developers.google.com/style)
- [Write the Docs — Documentation guide](https://www.writethedocs.org/guide/)
- [Plain English Campaign](https://www.plainenglish.co.uk/)

---

Englische Version: [`writing-skill-docs-for-llms.md`](../../en/ai-&-prompting/writing-skill-docs-for-llms.md)
