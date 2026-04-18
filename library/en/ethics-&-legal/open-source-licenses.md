# Open source licences

**Scope:** Applies to **using, contributing, and releasing open-source code**—choosing a licence, respecting others', attribution, copyleft, dual-licensing, contributor agreements. Not patent law, not trademark, not full compliance programs. Pair with [`git-and-commits.md`](../coding/git-and-commits.md), [`ai-training-and-scraping.md`](ai-training-and-scraping.md), [`language-models-in-code.md`](../coding/language-models-in-code.md), and [`gdpr-basics.md`](gdpr-basics.md).

## Excerpt
- **Every dependency has a licence**—know which.
- **Permissive (MIT/BSD/Apache)** vs **copyleft (GPL/AGPL/MPL)**—understand what each obliges you to do.
- **Attribution** almost always required; ship `NOTICE`/`THIRD_PARTY_LICENSES`.
- **Releasing** your own code: pick a standard licence; do not invent one.
- **Mixed code from AI tools** inherits risk; document sources.
- Checklist, common licences, pitfalls below.

## Before adopting a dependency

### Concrete

- What is the **licence** of each direct and transitive dependency?
- Does the licence **allow** your use (closed-source product, SaaS, redistribution)?
- What does the licence **require** (attribution, source disclosure, patent grants, state changes)?
- Is there an **exception** (LGPL linking clause, Classpath exception, etc.)?

### Meta

- Licences are **contracts**; "everyone uses it" is not a defence.
- The hardest bugs to fix are the ones that turn out to be licences, not code.

---

## Purpose

Respect other people's work, keep your own release options open, and avoid compliance surprises that block a shipment or an acquisition.

---

## 1. A map of common licences

**Permissive** (few requirements, mostly attribution):

- **MIT** — short, widely used.
- **BSD-2-Clause / 3-Clause** — similar, with or without endorsement clause.
- **Apache 2.0** — MIT-like + patent grant + notice file requirement.
- **ISC** — simpler MIT-equivalent.

**Weak copyleft** (changes to library must be shared, but combining with proprietary is OK):

- **LGPL** — typical library use.
- **MPL 2.0** — file-level copyleft.
- **EPL 2.0** — Eclipse ecosystem.

**Strong copyleft** (derivative works must be released under the same licence):

- **GPL-2.0 / GPL-3.0** — classic copyleft; distribution triggers obligations.
- **AGPL-3.0** — adds a "network use = distribution" clause; SaaS offering must share source.

**Non-OSI / source-available** (often not open source despite appearances):

- **BUSL (Business Source Licence)**, **SSPL**, **Elastic Licence**, **Commons Clause** — read before relying.

Creative Commons (for content, not code): **CC0**, **CC-BY**, **CC-BY-SA**, **CC-BY-NC**. **Do not** use CC on software—use an OSI licence.

## 2. Permissive vs copyleft: choose with intent

- **Permissive** = "use freely, credit me". Good for libraries you want widely adopted.
- **Copyleft** = "you may use, but share improvements back". Good when community contribution is the goal.
- **AGPL** specifically targets SaaS: if you run a modified version as a network service, you must offer the source.

## 3. When you use dependencies

- Keep an automatic **inventory** (`npm list`, `pip-licenses`, `license-checker`, `cargo-about`, `licensee`).
- Track licence at the **package-lock** level—transitive dependencies matter.
- **Allowlist** licences acceptable for your product; block the rest in CI.
- Ship required **NOTICE**/`THIRD_PARTY_LICENSES` file for Apache-2.0 and others.

## 4. When you release your own code

- Choose a well-known licence—**MIT**, **Apache-2.0**, or **GPL-3.0** for most cases.
- Add:
  - A `LICENSE` file at the repo root.
  - A header in each source file (short).
  - A line in `README.md`: "Licensed under MIT".
- Pick deliberately; **changing** a licence after contributors exist is difficult.

## 5. Contributions: DCO vs CLA

- **DCO (Developer Certificate of Origin)** — contributors sign off commits (`Signed-off-by:`); simple and widely accepted.
- **CLA (Contributor Licence Agreement)** — contributors grant explicit rights; heavier, usually for projects that may relicense.
- For most projects: **DCO**; only add a CLA with a clear reason.

## 6. Attribution, notice, state of changes

- Keep authorship and copyright notices in source files; don't strip them.
- Apache 2.0 requires a `NOTICE` file retained in redistributions.
- When modifying copyleft code, record **what you changed**, as required by the licence (`CHANGES`, commit log).
- For content/media, follow the CC attribution format recommended by the creator.

## 7. Combining code — safe and unsafe

- **Linking** GPL into a proprietary product = redistributing the whole under GPL.
- **LGPL** libraries can usually be linked into proprietary code **dynamically**; static linking has more caveats.
- **Apache 2.0 + GPL-2.0** — technically incompatible in some combinations; Apache 2.0 + GPL-3.0 is fine.
- **Copyleft through APIs?** GPL generally treats "derivative work" narrowly; AGPL widens it for network use.

When in doubt, consult the project's guidance or a licence lawyer.

## 8. AI-generated code

- Treat AI-generated code as code **with unknown provenance**—it may reproduce licensed fragments.
- Prefer assistants that provide attribution or are audited.
- Keep changes small enough to **review** for obvious copying.
- Disclose and document per [`ai-disclosure-and-policy.md`](ai-disclosure-and-policy.md).
- This is a fast-changing area of law—err on the side of caution, especially for **copyleft** snippets.

## 9. Trademarks and endorsement

- A licence may cover code but **not** trademarks.
- Do not imply endorsement by a project you use.
- "Built with X" is usually OK; using X's logo without permission usually isn't.

## 10. What not to do

- **Strip** licence headers to "clean up" a file.
- Mix GPL code into a proprietary product because "no one will notice".
- Ship without a `LICENSE` file—ambiguity is risk.
- Treat Creative Commons as a software licence.
- Copy snippets from Stack Overflow (or an AI tool) into core code without **knowing** the source and rights.

---

## Core idea

Open source is a **gift with rules**. Know which rules apply to each dep, keep a live inventory, honour attribution, pick a standard licence when you release, and treat mixed-provenance code (including AI output) with the same care you give security.

## Further reading

- [Choose a licence](https://choosealicense.com/) — friendly picker with summaries
- [OSI — Approved licences](https://opensource.org/licenses) — canonical list
- [Software Freedom Conservancy — GPL compliance](https://sfconservancy.org/copyleft-compliance/) — practical guidance
- [FOSSA — Licence compliance guide](https://fossa.com/blog/open-source-licensing-guide/) — enterprise-oriented overview

---

German version: [`open-source-lizenzen.md`](../../de/ethik-&-recht/open-source-lizenzen.md)
