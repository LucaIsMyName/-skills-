# Entscheidungslog und ADRs

**Geltungsbereich:** **Entscheidungen** festhalten—leichte Logs und **Architecture Decision Records** für Technik. Ergänzt [`projektbriefs.md`](projektbriefs.md), [`git-und-commits.md`](../coding/git-und-commits.md) und [`meetings-und-agenden.md`](meetings-und-agenden.md).

## Exzerpt
- **Kontext → Entscheidung → Konsequenzen**.
- **Ersetzt**-Links bei Änderungen.
- **Eine** Entscheidung pro ADR.
- **Stakeholder** benennen.
- **Datum** und **Status**.

## Vor dem Loggen

### Konkret

- **Reversibel**? Kosten der Umkehr?
- **Alternativen** kurz.

### Meta

- Ohne Trade-off keine reife Entscheidung.

---

## Zweck

**Wiederholte** Debatten vermeiden—**Onboarding** und **Audit** erleichtern.

---

## 1. Kontext, Entscheidung, Konsequenzen

### Regel

Jeder Eintrag beantwortet: **warum jetzt**, **was gewählt**, **was sich ändert** (positiv und negativ)—kurz.

### Gut: kontext, entscheidung, konsequenzen

```text
Wir nutzen Postgres. Ist gut.
```

### Gut: kontext, entscheidung, konsequenzen

```text
Kontext: Relationale Integrität und Reporting für Freiwilligendaten nötig.
Entscheidung: Managed Postgres als Primärspeicher.
Konsequenzen: + starke Konsistenz, ausgereifte Tools. − Ops-Kosten; Migrationen brauchen Disziplin.
```

## 2. Eine Entscheidung pro ADR

### Regel

Themen trennen, sodass jedes ADR **eine** Entscheidung hat—Leser*innen finden und ersetzen gezielt.

### Gut: eine entscheidung pro adr

```text
ADR 0009: Auth-Provider + Cache + Queue + Namenskonvention (4 Seiten).
```

### Gut: eine entscheidung pro adr

```text
ADR 0009: OAuth-Provider (Supabase). ADR 0010: Redis für Session-Cache. Getrennte Dateien.
```

## 3. Status, Datum, ersetzt durch

### Regel

**Vorgeschlagen / akzeptiert / verworfen** und **Datum**; bei Ersatz **Supersedes** / **Superseded by** verlinken.

### Gut: status, datum, ersetzt durch

```text
Altes Doc sagt SQLite; neues sagt Postgres; beide „aktuell“.
```

### Gut: status, datum, ersetzt durch

```text
ADR 0003 Status: Deprecated (10.01.2025). Ersetzt durch ADR 0007. ADR 0007 Status: Accepted (10.01.2025).
```

## 4. In Betracht gezogene Alternativen

### Regel

**Glaubwürdige Optionen**, die ihr verworfen habt, und **eine Zeile warum**—zeigt Nachdenken, nicht nur Advocacy.

### Gut: in betracht gezogene alternativen

```text
Alternativen: keine erwähnenswert.
```

### Gut: in betracht gezogene alternativen

```text
Alternativen: SQLite (zu eng für Multi-User-Reporting); Document-DB (Analytics schwieriger). Gewählt: Postgres.
```

## 5. Reversibilität und Kosten der Änderung

### Regel

Ist die Entscheidung **leicht rückgängig**—bestimmt, wie viel Debatte vor Annahme nötig ist.

### Gut: reversibilität und kosten der änderung

```text
Datenbank später migrieren (ohne Plan).
```

### Gut: reversibilität und kosten der änderung

```text
Reversibilität: niedrig—Datenmodell an SQL gekoppelt. Umkehr: 2–4 Wochen + Ausfallrisiko; vor Annahme bewusst machen.
```

## 6. Wo es liegt und wen es betrifft

### Regel

ADRs **neben dem Code** oder unter **bekanntem Wiki-Pfad**; **Stakeholder** nennen, die einbinden mussten.

### Gut: wo es liegt und wen es betrifft

```text
Entscheidung in Slack-Thread von 2023—Link tot.
```

### Gut: wo es liegt und wen es betrifft

```text
Ort: /docs/adr/0007-postgres.md im Repo; verlinkt in README. Stakeholder: Tech Lead, DPO (Datenstandort).
```

---

## Typische Stolpersteine

- **Protokoll** statt ADR—Entscheidungen in Fließtext, kein Status-Feld.
- **Politische** Treiber versteckt—echte Vorgabe war Board-Termin, nicht Technik; Konflikt bricht wieder auf.
- **Pilz-ADRs**—zehn Entscheidungen in einer Datei, sauberes Ersetzen unmöglich.
- **Kein** Link aus Code oder Runbooks—Neue finden den Eintrag nie.

---

## Kerngedanke
Entscheidungen sind **Assets**—**dokumentieren**, wo **Nachfolger*innen** hinschauen.

## Weiterführend

- [ADR GitHub organization](https://adr.github.io/) — Vorlagen
- [Michael Nygard — Documenting architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — ursprüngliches ADR-Framing
- [GOV.UK — Documenting decisions](https://www.gov.uk/service-manual/agile-technology/documenting-decisions) — leichte Decision Records im öffentlichen Dienst

---

Englische Version: [`decision-logs-and-adrs.md`](../../en/project-&-operations/decision-logs-and-adrs.md)
