# Meetings and agendas

**Scope:** **Efficient** meetings—purpose, agenda, outcomes, async alternatives. Not facilitation certification. Pair with [`decision-logs-and-adrs.md`](decision-logs-and-adrs.md), [`status-updates-and-reporting.md`](status-updates-and-reporting.md), and [`workshop-facilitation.md`](../language-&-communication/workshop-facilitation.md).

## Excerpt

- **Purpose** in one line—**decision**, **alignment**, or **review**?
- **Agenda** with **timeboxes** and **pre-reads**.
- **Outputs**: actions with **owners** and **due dates**.
- **Default async** for status—**meet** for ambiguity and decisions.
- **Notes** in a **single** shared place.

## Before scheduling

### Concrete

- Could this be an **email** or **doc comment**?
- **Who must attend** vs **optional**?

### Meta

- Meetings are **expensive**—**default** to fewer.

---

## Purpose

Spend synchronous time on **what needs human judgement**—everything else **writes down**.

---

## 1. Name the meeting type

### Rule

State whether you need a **decision**, **alignment**, or **review**—mixing all three in one slot guarantees drift.

### Bad

```text
Weekly sync — TBD
```

### Good

```text
Decision meeting (30m): approve Q3 volunteer rota proposal.
Pre-read: /docs/rota-proposal.md — comment by Tue 10:00.
```

## 2. Agenda with timeboxes and pre-reads

### Rule

Every topic gets a **minute budget** and a **link** to material people must read before the room.

### Bad

```text
Agenda: updates, blockers, other business
```

### Good

```text
0–5m  Outcomes + decisions we need today
5–20m Decision: vendor A vs B (pre-read: comparison table)
20–25m Action review from last notes
```

## 3. Invite only who must be there

### Rule

**Required** attendees are people who can **decide** or **block**; everyone else is **optional** or gets **notes**.

### Bad

```text
Invite: whole team + stakeholders “FYI”
```

### Good

```text
Required: Alex (DRI), Sam (budget). Optional: design. Notes → #proj-volunteers
```

## 4. End with written actions

### Rule

Close with **who does what by when** in one shared doc or ticket—no “we’ll follow up”.

### Bad

```text
“Let’s all think about it and sync later.”
```

### Good

```text
Actions: (1) Alex — draft rota v2 — Fri EOD. (2) Sam — confirm insurance — Mon.
Logged in /meetings/2025-04-18.md
```

## 5. Prefer async for status

### Rule

Use **email, doc comments, or dashboards** for pure status; reserve live time for **ambiguity, conflict, or commitment**.

### Bad

```text
60m standup: each person reads their board aloud.
```

### Good

```text
Status async in #proj-updates by Thu 17:00. 25m Friday: blockers + 2 decisions only.
```

## 6. Single source for notes

### Rule

Pick **one** canonical place (wiki path, doc, or ticket)—same link every time.

### Bad

```text
Notes in chat + someone’s notebook + a few photos of a whiteboard.
```

### Good

```text
Notes: /wiki/meetings/volunteer-rota — template copied from last week; link in calendar invite.
```

---

## Common Footguns

- **No agenda** sent >24h before—people cannot prepare; the meeting becomes discovery.
- **Presenting** to executives what could have been a **one-pager**—wastes attention and hides weak writing.
- **Mixing** status and decisions—status runs long; decisions never get a clean vote.
- **Forgotten** actions—no owner or date, so the same topic returns next week.

---

## Core idea

Meetings exist to **change state**—**decide**, **resolve**, **commit**—otherwise **write**.

## Further reading

- [Parabol — Meeting hygiene](https://www.parabol.co/resources/) — async-first patterns
- [GOV.UK — How to hold a meeting](https://www.gov.uk/government/publications/how-to-hold-a-meeting) — short, practical structure
- [Atlassian — Meeting agenda templates](https://www.atlassian.com/work-management/project-management/meeting-agenda) — agenda framing

---

German version: [`meetings-und-agenden.md`](../../de/projekt-&-operationen/meetings-und-agenden.md)
