# AI training and scraping

**Scope:** Applies to **how your content, code, and data relate to AI training and web scraping**—opt-outs, `robots.txt`, copyright, datasets, terms of service, defensive practice. Not a full IP or litigation guide. Pair with [`open-source-licenses.md`](open-source-licenses.md), [`gdpr-basics.md`](gdpr-basics.md), [`ai-disclosure-and-policy.md`](ai-disclosure-and-policy.md), and [`using-ai-for-research.md`](../ai-&-prompting/using-ai-for-research.md).

## Excerpt
- **You own what you publish**, and can **signal** whether you allow training and scraping.
- **`robots.txt` + `ai.txt` + HTTP headers + platform settings** are the practical tools today.
- **Personal data** in training sets is a **GDPR** issue, even if it was public.
- **Your use of AI tools** carries obligations too—do not feed confidential or licensed material into them.
- **Attribution and provenance** matter more as audiences get more sceptical.
- Patterns, headers, and red flags below.

## Before publishing or integrating

### Concrete

- Do you **allow** commercial scraping? Do you allow **AI training**? Do you allow **retrieval via AI search engines**?
- Do your **terms of service** reflect that?
- Are there **personal data** or **third-party content** on your site that cannot be redistributed even if you personally consent?
- When you **use** AI tools at work, what are the data-in/data-out rules?

### Meta

- Law is moving. **Document your choices** so you can defend them and change them.
- Scraping and training are technically different—scraping gathers; training transforms. Your permissions should address both.

---

## Purpose

Keep control of your **content, data, and reputation** in a world of large-scale scraping and AI training—while using AI responsibly yourself.

---

## 1. What "training" actually means

- **Pre-training** — huge, largely indiscriminate datasets feed base models.
- **Fine-tuning / instruction-tuning** — smaller, curated datasets adjust behaviour.
- **RAG / retrieval** — models are *not* "trained" on retrieved docs; they cite them at query time.
- **Evaluations** — datasets used to test models.

Your permissions may differ for each. "No training" is common; "no retrieval" is different.

## 2. Signals you can send from a website

- **`robots.txt`** — instructs well-behaved crawlers. Examples:
  ```
  User-agent: GPTBot
  Disallow: /

  User-agent: ClaudeBot
  Disallow: /

  User-agent: Google-Extended
  Disallow: /
  ```
- **AI-specific files** — emerging conventions: `ai.txt`, `/.well-known/ai.txt`; not universally respected yet.
- **HTTP headers / meta tags** — `X-Robots-Tag`, `<meta name="robots" content="noai, noimageai">`; support varies.
- **Terms of service** — explicit clause covering scraping and training.

None of these are bullet-proof; combine them and expect imperfect compliance.

## 3. Signals your app/platform should respect

If your product crawls or aggregates:

- Read **`robots.txt`** and respect it.
- Identify your bot with a clear **User-Agent** and **contact page**.
- Rate-limit politely; avoid disrupting small sites.
- Handle **opt-out** promptly on request.
- Distinguish **indexing** from **training** in your documentation and code paths.

## 4. Copyright and fair use

- Scraping text does not transfer copyright; you still need rights to use the content.
- "Fair use" / "fair dealing" varies by jurisdiction and is frequently litigated around AI.
- **Derivative output** may infringe if it reproduces protected expression.
- Take extra care with **music, lyrics, code, news articles, books, photos**—all heavily contested.

Consult counsel before shipping a product that relies on mass reproduction.

## 5. Personal data and GDPR

- Public does not mean **free to process**.
- If a training set contains **personal data**, GDPR applies: lawful basis, purpose limitation, rights.
- **Inference** about people (predicting attributes) is processing too.
- Individuals have rights against AI vendors who processed their data—see regulator guidance.
- Pair with [`gdpr-basics.md`](gdpr-basics.md).

## 6. Your use of AI tools at work

Don't trade confidentiality for convenience.

- **Do not paste** into uncleared tools: client data, safeguarding cases, HR info, unpublished research, licensed content, security incidents.
- Prefer **enterprise / no-training** endpoints where your policy requires.
- Understand each vendor's **retention** and **training** defaults—some keep prompts to "improve service".
- Record **what data classes** are approved for which tools; review quarterly.

## 7. Licensed content you use

- **Stock photos**, **fonts**, **datasets**, **code**—each has terms.
- Some licences now **prohibit** AI training on the licensed asset.
- If you bring licensed material into an AI workflow, check the licence; do not assume.
- Keep a **register** of licensed assets and their permissions.

## 8. Attribution and provenance

- For **content**: credit creators, keep licence notes, include dates.
- For **AI-assisted work**: note human responsibility and any source the AI was grounded in (see [`ai-disclosure-and-policy.md`](ai-disclosure-and-policy.md)).
- Consider emerging provenance standards (**C2PA**) for media credentials.
- Treat attribution as part of trust, not just compliance.

## 9. Technical practice: `robots.txt` and peers

- Place `robots.txt` at the root.
- Be **specific** about AI bots (they are named in their own docs).
- Update after vendor name changes (e.g., new training bot flavours).
- Add `X-Robots-Tag: noai, noimageai` on sensitive pages.
- Test with your CDN cache—headers can be stripped.

## 10. What not to do

- Assume `robots.txt` **enforces** your terms—it signals.
- Paste **client data** into a shiny new AI tool "to see how it does".
- Scrape competitors' sites aggressively "because they did it".
- Claim "AI doesn't learn from individual pages"—for pre-training, many have.
- Ship an AI product without a **data source inventory** and a **takedown process**.

---

## Core idea

In an age of industrial-scale scraping and training, **express your choices clearly** (robots, headers, TOS, policies), **respect others' choices** when you crawl, and **handle personal and licensed content carefully** both as a publisher and as an AI user. The legal picture is moving; your documentation is your anchor.

## Further reading

- [ICO — AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/) — UK privacy regulator
- [EDPB — AI guidelines](https://edpb.europa.eu/) — EU data protection board
- [Google — Google-Extended robots](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers) — vendor-specific crawler docs
- [C2PA — Content credentials](https://c2pa.org/) — provenance standard

---

German version: [`ki-training-und-scraping.md`](../../de/ethik-&-recht/ki-training-und-scraping.md)
