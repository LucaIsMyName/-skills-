# Decision logs and ADRs

**Scope:** Recording **decisions** so teams remember **why**—lightweight decision logs and **Architecture Decision Records** (ADRs) for technical choices. Pair with [`project-briefs.md`](project-briefs.md), [`git-and-commits.md`](../coding/git-and-commits.md), and [`meetings-and-agendas.md`](meetings-and-agendas.md).

## Excerpt

- **Context → Decision → Consequences**—short and durable.
- **Supersedes** links when decisions change—**history** stays traceable.
- **One decision per ADR**—do not mash ten topics.
- **Stakeholders** who must align—**named**.
- **Date** and **status** (proposed/accepted/deprecated).

## Before logging

### Concrete

- Is this **reversible**? **Cost** of reversal?
- **Alternatives** considered—**briefly**.

### Meta

- If you cannot state the trade-off, you are not ready to decide.

---

## Purpose

Stop re-litigating **settled** choices—**onboard** faster and **audit** later.

---

## 1. Context, decision, consequences

### Rule

Every record answers: **why now**, **what we chose**, and **what changes** (good and bad)—in a few short paragraphs.

### Bad

```text
We use Postgres. It’s good.
```

### Good

```text
Context: Need relational integrity and reporting for volunteer data.
Decision: Managed Postgres as primary store.
Consequences: + Strong consistency, mature tooling. − Ops cost; migrations need discipline.
```

## 2. One decision per ADR

### Rule

Split topics so each ADR has **one** decision—readers can find and supersede a single choice.

### Bad

```text
ADR 0009: Auth provider + cache + queue + naming convention (4 pages).
```

### Good

```text
ADR 0009: OAuth provider (Supabase). ADR 0010: Redis for session cache. Separate files.
```

## 3. Status, date, and supersedes

### Rule

Mark **proposed / accepted / deprecated** and **date**; when replacing an ADR, link **Supersedes** and **Superseded by**.

### Bad

```text
Old doc says SQLite; new doc says Postgres; both say “current”.
```

### Good

```text
ADR 0003 Status: Deprecated (2025-01-10). Superseded by ADR 0007. ADR 0007 Status: Accepted (2025-01-10).
```

## 4. Alternatives considered

### Rule

List **credible options you rejected** and **one line why**—shows you thought, not only advocated.

### Bad

```text
Alternatives: none worth mentioning.
```

### Good

```text
Alternatives: SQLite (too limited for multi-user reporting); Document DB (harder analytics). Chose Postgres.
```

## 5. Reversibility and cost of change

### Rule

State whether the decision is **easy to undo**—informs how much debate you need before accepting.

### Bad

```text
We’ll migrate databases later if needed (no plan).
```

### Good

```text
Reversibility: Low—data model couples to SQL. Reversal cost: 2–4 weeks + downtime risk; justify before accepting.
```

## 6. Where it lives and who cares

### Rule

Store ADRs **next to the code** or in a **known wiki path**; name **stakeholders** who had to align.

### Bad

```text
Decision in Slack thread from 2023—link broken.
```

### Good

```text
Location: /docs/adr/0007-postgres.md in repo; linked from README. Stakeholders: Tech lead, DPO (data location).
```

---

## Common Footguns

- **Meeting minutes** as ADRs—decisions buried in narrative, no status field.
- **Political** drivers hidden—real constraint was board deadline, not technical merit; future teams re-open the fight.
- **Mushroom** ADRs—ten decisions in one file, impossible to supersede cleanly.
- **No** link from code or runbooks—new hires never find the record.

---

## Core idea

Decisions are **assets**—**store** them where **future teammates** will look.

## Further reading

- [ADR GitHub organization](https://adr.github.io/) — templates
- [Michael Nygard — Documenting architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — original ADR framing
- [GOV.UK — Documenting decisions](https://www.gov.uk/service-manual/agile-technology/documenting-decisions) — lightweight decision records in public service context

---

German version: [`entscheidungslog-und-adrs.md`](../../de/projekt-&-operationen/entscheidungslog-und-adrs.md)
