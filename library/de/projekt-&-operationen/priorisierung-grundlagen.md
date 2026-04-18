# Priorisierung — Grundlagen

**Geltungsbereich:** **Auswahl**, was als Nächstes kommt—Impact/Aufwand, RICE/MoSCoW ohne Dogma. Ergänzt [`projektbriefs.md`](projektbriefs.md), [`statusberichte-und-reporting.md`](statusberichte-und-reporting.md) und [`retrospektiven.md`](retrospektiven.md).

## Exzerpt

- **Ziel** rahmen—Prioritäten ohne Ziel sind **Macht**.
- **Impact** und **Vertrauen** in Evidenz.
- **Kosten** inkl. **Betrieb** und Support.
- **Kleine** Scheiben—**liefern** zum Lernen.
- **Nein** schriftlich—**Trade-offs** sichtbar.

## Bevor priorisiert wird

### Konkret

- **Kapazität**; **Abhängigkeiten**.
- **Risiken**, wenn wir etwas verschieben.

### Meta

- Wenn alles P0 ist, ist **nichts** P0.

---

## Zweck

Aufmerksamkeit auf **höchsten** Lern- oder Wertbeitrag pro Kosten legen.

---

## 1. Zuerst das Ziel rahmen

### Regel

**Ergebnis** für diesen Zyklus schreiben—ohne das werden Prioritäten zu **wer am lautesten schreit**.

### Bad

```text
Backlog alphabetisch / nach letzter Eskalation sortieren.
```

### Good

```text
Ziel dieses Quartals: No-Shows bei Freiwilligen um 15 % senken. Nur Themen mit plausiblen Hebel dafür ganz oben.
```

## 2. Impact und Vertrauen

### Regel

**Evidenz** (Nutzung, Tickets, Research) vor **Hierarchie** beim Impact; **Vertrauen** in die Schätzung benennen.

### Bad

```text
CEO will Feature X, also P0.
```

### Good

```text
Impact 4/5 (500 Nutzer*innen/Monat); Vertrauen 3/5 (eine Umfrage). Bei Gleichstand Daten, nicht Titel.
```

## 3. Aufwand und Total Cost of Ownership

### Regel

**Kosten** = Build + **Betrieb** + **Support** + **Koordination**—nicht nur Dev-Tage.

### Bad

```text
„Kleines“ Feature—nur 3 Dev-Tage (Support und Doku ignoriert).
```

### Good

```text
Build: 3 Tage. TCO: laufende Moderation + Schulung Freiwillige—ca. 0,2 FTE-Äquivalent; Aufwand hoch einstufen.
```

## 4. Kleine Scheiben—liefern zum Lernen

### Regel

Arbeit so teilen, dass du **ausliefern und messen** kannst—keine Big-Bang-Wetten ohne Lern-Meilensteine.

### Bad

```text
Komplett-Rebuild, bevor Nutzer*innen etwas sehen—9 Monate.
```

### Good

```text
Scheibe 1: nur SMS-Erinnerung Abendschicht. No-Show-Delta 4 Wochen messen, dann ausweiten.
```

## 5. Nein schriftlich mit Trade-offs

### Regel

**Was ihr nicht tut** und **warum** festhalten—sonst wird das Backlog ein Friedhof stiller Versprechen.

### Bad

```text
„Nächster Sprint“ (6 Monate lang).
```

### Good

```text
Zurückgestellt: mehrsprachige Website. Grund: Kapazität; Review Q4. Protokoll Priorisierung 2025-04-18.
```

## 6. Abhängigkeiten vor finaler Reihenfolge

### Regel

**Abhängigkeitsketten** sichtbar machen—versteckte Blocker erzeugen falsche Prioritäten.

### Bad

```text
Prio 1: Kampagne starten. Prio 2: DNS fixen. (Kampagne braucht DNS zuerst.)
```

### Good

```text
Reihenfolge: (1) DNS + SSL, (2) Landing, (3) Kampagnen-Assets—Ketten vor Fixierung der Liste zeichnen.
```

---

## Typische Stolpersteine

- **Alles P0**—keine Reihenfolge, Kontextwechsel, nichts wird fertig.
- **HiPPO** als einziges Signal—kein Raum für Nutzer*innenevidenz.
- **Wartung ignorieren**—Features, die nächstes Quartal im Support kollabieren.
- **Stilles Zurückstellen**—Stakeholder hören „später“ als „bald“.

---

## Kernidee

Priorisierung ist **Nein mit Gründen**—**gemeinsame** Kriterien.

## Weiterführend

- [Intercom — RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) — ein Rahmen unter vielen
- [Atlassian — Prioritization frameworks](https://www.atlassian.com/agile/project-management/prioritization-frameworks) — MoSCoW und Alternativen im Kontext
- [NN/g — Prioritizing UX](https://www.nngroup.com/articles/prioritization-ux/) — Impact vs Nutzerwert

---

Englische Version: [`prioritisation-basics.md`](../../en/project-&-operations/prioritisation-basics.md)
