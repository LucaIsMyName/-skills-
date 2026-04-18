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

## 1. ADR skeleton

```text
# ADR 0007: Use Postgres for primary datastore

Status: Accepted (2025-04-01)

Context: We need relational integrity and reporting.

Decision: Use managed Postgres.

Consequences:
+ Strong consistency, mature tooling
- Ops cost; need backups/migrations discipline

Alternatives: SQLite (too limited), Document DB (reporting harder)
```

## 2. What not to do

- **Hide** political reasons—**label** them as constraints honestly.

---

## Core idea

Decisions are **assets**—**store** them where **future teammates** will look.

## Further reading

- [ADR GitHub organization](https://adr.github.io/) — templates

---

German version: [`entscheidungslog-und-adrs.md`](../../de/projekt-&-operationen/entscheidungslog-und-adrs.md)
