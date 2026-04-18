# Formulare und Eingaben (UX)

**Geltungsbereich:** **Layout, Labels, Validierung und Zustände** von Formularen in digitalen Produkten; keine Backend-Logik und kein juristischer Einwilligungstext (Comms/Recht).

## Exzerpt

- Nutzen bei **Dateneingabe**: Einzelfelder, mehrstufige Flows, Assistenten.
- Wenn möglich **eine primäre Aktion** pro Bildschirm; **klare Fehler** und Wiederherstellung.
- **Nachfragen** nach Feldern, Pflichtregeln und Quelle der Fehlertexte (Produkt vs. Legal).
- Ergänzt [`gute-interfaces-designen.md`](gute-interfaces-designen.md).

## Zweck

Dieses Dokument **reduziert Fehler und Abbrüche** in Formularen durch klare Struktur, Beschriftung und Rückmeldung.

## Vollständigkeit vor dem Schreiben

### Konkret

- **Felder** (Namen, Typen, Pflicht/optional)
- **Validierungsregeln** (Format, Min/Max, Abhängigkeiten)
- **Submit** und bekannte **Fehler**-API

### Meta

- **Zielgruppe** (Öffentlichkeit, Expertinnen, stressige Situationen)
- **Mobil**-Anteil

---

## Grundregeln

### 1. Sichtbare Labels

### ❌ Schlecht

```text
Nur Platzhalter „E-Mail“; verschwindet beim Fokus, kein Label.
```

### ✅ Gut

```text
Dauerhaftes Label über oder neben dem Feld; Platzhalter nur für Beispielformat optional.
```

---

### 2. Pflicht vs. optional

**Optional** kennzeichnen oder **Pflicht** klar sagen—nicht nur auf Sternchen-Legende verlassen.

---

### 3. Fehler: inline + Zusammenfassung bei langen Formularen

**Feldnaher** Fehler; bei vielen Fehlern **Zusammenfassung** oben mit Sprung zu den Feldern.

### ❌ Schlecht

```text
Absenden scheitert nur mit Toast: „Etwas ist schiefgelaufen.“
```

### ✅ Gut

```text
„Datum im Format TT.MM.JJJJ“ unter dem Feld; Fokus auf erstes Fehlerfeld.
```

---

### 4. Deaktiviert vs. schreibgeschützt

**Deaktiviert** = keine Interaktion (Grund nennen). **Read-only** = sichtbarer Wert, nicht editierbar—unterschiedliche Semantik für Screenreader.

---

### 5. Absenden nicht ohne Erklärung sperren

Wenn Absenden bis zur Vollständigkeit deaktiviert ist: **anzeigen, was fehlt**, oder absenden erlauben und dann validieren.

---

## Checkliste

- [ ] Labels, Hilfen und Fehler sind **mit Eingaben verknüpft**
- [ ] Pflicht/optional **verständlich**
- [ ] Fehlermeldungen **konkret** und handlungsleitend
- [ ] Lange Formulare: **Fortschritt** und sinnvolle **Gruppierung**
- [ ] Tastatur und Screenreader: Tab-Reihenfolge, Fokus bei Fehler

---

## Abschließender Gedanke

👉 Formulare sind **Vertrauensmoment**. Verwirrung dort kostet Vertrauen.

## Weiterführende Links

- [GOV.UK Design System — Komponenten](https://design-system.service.gov.uk/components/) — bewährte Muster zu Labels, Fehlern und Gruppierung
- [W3C WAI — Understanding 3.3.2 Beschriftungen oder Anweisungen](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) — was „klar beschriftet“ für Hilfstechnologien heißt
- [W3C WAI — Formulare-Tutorial](https://www.w3.org/WAI/tutorials/forms/) — Zuordnung, Validierung und mehrstufige Abläufe

