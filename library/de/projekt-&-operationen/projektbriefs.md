# Projektbriefs

**Geltungsbereich:** **Ein-Pager** zur Ausrichtung—Ziele, Scope, Constraints, Owner. Kein Business-Case. Ergänzt [`kreativbriefs.md`](kreativbriefs.md), [`priorisierung-grundlagen.md`](priorisierung-grundlagen.md) und [`statusberichte-und-reporting.md`](statusberichte-und-reporting.md).

## Exzerpt

- **Problem** und **Erfolg** klar—**messbar** wo möglich.
- **In/Out of Scope**—gegen Scope-Creep.
- **DRI**, Sponsor, Stakeholder.
- **Timeline** mit **Meilensteinen**.
- **Risiken** und **Abhängigkeiten** früh benennen.

## Bevor du den Brief schreibst

### Konkret

- **Deadline**; **Non-negotiables** (Marke, Recht, Barrierefreiheit).
- **Ressourcen**.

### Meta

- Vage Briefe erzeugen **Politik** statt Fortschritt.

---

## Zweck

**Geteiltes Bild**, bevor Arbeit verteilt wird—**weniger** Überraschungen.

---

## 1. Problem und Erfolg in klarer Sprache

### Regel

**Was heute schief läuft** und **was als Erfolg gilt**—Zahlen oder beobachtbare Ergebnisse schlagen Adjektive.

### Bad

```text
Website besser machen, ASAP.
```

### Good

```text
Problem: Abbruchquote bei Freiwilligen-Anmeldung mobil ~40%.
Erfolg: Abgeschlossene Anmeldungen +20% in Q3 vs Q2; Formularfehler <5%.
```

## 2. In Scope und Out of Scope

### Regel

**Liefergegenstände** und **explizite Ausschlüsse**—damit Scope-Creep ein bewusster Wechsel ist.

### Bad

```text
Freiwilligen-Journey End-to-End verbessern.
```

### Good

```text
In Scope: Anmeldeflow, Bestätigungsmail, Hilfetexte.
Out of Scope: CRM-Migration, Rebrand, neues CMS.
```

## 3. Owner, Sponsor, Stakeholder

### Regel

**DRI** für Delivery, **Sponsor** mit Entscheidungsmacht, **Stakeholder** zum Abgleich—nicht „das Team“.

### Bad

```text
Owner: alle. Sponsor: TBD.
```

### Good

```text
DRI: Alex (Delivery). Sponsor: Sam (Budget/Freigabe).
Stakeholder: Legal (Disclaimer), Kommunikation (Tonalität).
```

## 4. Timeline mit Meilensteinen, keine Fantasie

### Regel

**Wenige Meilensteine** mit **überprüfbaren Outputs**—kein detailliertes Gantt-Märchen am Anfang.

### Bad

```text
Gantt mit 47 Tasks, alles grün bis Woche 8.
```

### Good

```text
M1 (15. Mai): Flow-Prototyp in Staging. M2 (1. Jun.): UAT mit 5 Freiwilligen. M3 (20. Jun.): Go-live.
```

## 5. Risiken und Abhängigkeiten früh

### Regel

**Blocker** und **Abhängigkeiten** von anderen Teams oder Systemen benennen.

### Bad

```text
Risiken: keine. Abhängigkeiten: klären wir noch.
```

### Good

```text
Risiko: API-Rate-Limits während Kampagne. Abhängigkeit: IT stellt SSO-Testumgebung bis 30. Apr.
```

## 6. Non-negotiables und Ressourcen

### Regel

**Marke, Recht, Barrierefreiheit, Budget** von Anfang an—verschweigen hilft nicht.

### Bad

```text
Bleiben on brand. Budget flexibel.
```

### Good

```text
Non-negotiables: WCAG 2.2 AA; Wortlaut Spendenkommission auf Spendenseite.
Ressourcen: 0,5 FTE Dev 12 Wochen; £2k Usability-Tests.
```

---

## Typische Stolpersteine

- **Erfolg** nur als „Launch“—keine Metrik, niemand weiß, ob das Projekt wirklich wirkt.
- **Scope** wächst per Slack—jeder „kleine Wunsch“ ohne Brief-Update.
- **Politische** Vorgaben (z. B. Board-Versprechen) erst beim Go-live.
- **Keine Entscheidungsrechte**—mehrere Chefs können vetoen ohne benannten Tie-Breaker.

---

## Kernidee

Ein Brief ist **Klarheitsvertrag**: **Absicht**, **Grenzen**, **Wer entscheidet**.

## Weiterführend

- [Atlassian — Project charter](https://www.atlassian.com/work-management/project-management/project-charter) — Rahmen
- [GOV.UK — Writing a project brief](https://www.gov.uk/guidance/writing-a-project-brief) — klare Struktur
- [NN/g — Prioritizing UX](https://www.nngroup.com/articles/prioritization-ux/) — warum Klarheit vor Build zählt

---

Englische Version: [`project-briefs.md`](../../en/project-&-operations/project-briefs.md)
