# Informationsarchitektur

## Geltungsbereich:

Gilt für **Organisation, Benennung, Navigation** von Inhalten in digitalen Produkten/Websites—Seitenstruktur, Navigation, Taxonomie, Suche, URLs. Kein Visual Design, kein Texten. Kombiniere mit [`gute-interfaces-designen.md`](gute-interfaces-designen.md), [`wireframes-und-prototyping.md`](wireframes-und-prototyping.md), [`content-design-und-microcopy.md`](content-design-und-microcopy.md) und [`barrierefreiheit-im-code.md`](../coding/barrierefreiheit-im-code.md).

## Exzerpt

- **Nutzende > Struktur > Labels**: erst Zielgruppen/Aufgaben, dann Gruppen, dann Namen.
- **Flach schlägt tief**: wenige Ebenen, klare Seiten, gute Suche.
- **Eins an einem Ort**—doppelte Menüpunkte verwirren.
- **Labels in Nutzersprache**, nicht in Hausjargon.
- **URLs sind dauerhaft**—wie APIs designen.
- Methoden und Anti-Muster unten.

## Vor der IA

### Konkret

- Wer sind die **Zielgruppen**, welche **Aufgaben** bringen sie mit?
- Welche **Inhalte** gibt es (Inventar), welche sollten existieren?
- Was zeigen **Analytics und Suche**?
- Welche **Pflichtseiten** müssen da und auffindbar sein (Impressum, Datenschutz, Barrierefreiheit)?

### Meta

- IA ist oft die **günstigste, wirksamste** UX-Arbeit—und die politisch heikelste.
- Gute IA ist **langweilig**: klare Kategorien, kurze Wege, ehrliche Labels.

---

## Zweck

Nutzende finden und tun Dinge beim ersten Mal; Teams fügen Content ein, ohne die Karte zu zerstören.

---

## 1. Von Aufgaben starten, nicht vom Orgchart

- **Top 10 Aufgaben** listen ("spenden", "Angebot finden", "Jahresbericht lesen", "Kontakt").
- Nach **Häufigkeit × Wichtigkeit**.
- Jede Top-Aufgabe **1–2 Klicks** von der Startseite.

Schlecht: Menü spiegelt Orgchart ("Programme", "Operations", "Forschung").
Gut: Menü spiegelt Nutzeraufgabe ("Für Familien", "Für Partner", "Über uns", "Spenden").

## 2. Inventar und Audit

- Alle Seiten exportieren.
- Pro Seite: URL, Titel, Stand, Owner, Traffic, noch gebraucht?
- Markieren: **Duplikate**, **Orphans**, **Low Value**, **Veraltet**.
- Entscheidung pro Seite: **behalten/mergen/löschen/neu schreiben**.

## 3. Gruppieren und Labeln (Card Sort)

- **Offen** mit Nutzenden: 30–50 Karten gruppieren und benennen.
- **Geschlossen**, wenn Kategorien vorhanden.
- **Konvergenz** suchen—gleichartige Gruppen bei 5/5.
- Labels aus **Nutzer-Worten**.

## 4. Navigations-Patterns

- **Primär**: 4–7 Top-Level-Items.
- **Utility**: Login, Sprache, Suche, Warenkorb.
- **Sekundär**: im Bereich, nicht überall.
- **Breadcrumbs** für tiefe Sites.
- **Footer**: Recht, Kontakt, Wiederholung wichtiger Aufgaben.

Ein klarer Weg schlägt viele clevere Shortcuts.

## 5. Suche

- Bei großen Sites **ist** Suche Navigation.
- Suchbegriffe messen, nicht nur Klicks.
- **Zero-Results**: zeigen Label-Lücken.
- **Synonyme/Redirects** für Klassiker.
- **Facetten** bei reichen Inhalten.

## 6. URLs sind dauerhaft

- Kurz, **lowercase**, kebab-case.
- **Beschreibend**, nicht numerisch.
- **Locale** in der URL.
- **Redirect** bei Umzug—keine 404.

### Schlecht: urls sind dauerhaft

```
https://example.org/index.php?id=412&ref=nav
```

### Gut: urls sind dauerhaft

```
https://example.org/de/spenden/bildung-2025
```

## 7. A11y und i18n

- **Skip-Links**, **Landmarks**, **Heading-Reihenfolge**.
- `<html lang="de">`; Sprachwechsel pro Seite.
- **Icons mit Labels**.
- Siehe [`barrierefreiheit-im-code.md`](../coding/barrierefreiheit-im-code.md).

## 8. Governance

- Klarer IA-**Owner**.
- Neue Seiten in Struktur einordnen—nicht Menüpunkt anbauen.
- **Regelmäßige Audits** (quartalsweise).
- **Deprecation**: ankündigen, redirecten, entfernen.

## 9. IA testen/messen

- **Tree-Testing** (Menübaum ohne Visuals).
- **First-Click-Tests** auf Kernseiten.
- **Analytics**: Drop-Off, Zero-Results, Pogo-Sticking.
- **Labels** reparieren, bevor man Layouts neu baut.

## 10. Was nicht tun

- **Mega-Menüs** pro Abteilung.
- **Gleicher Link** in drei Menüs.
- **Jargon-Labels**.
- **Kaputte Redirects** nach Umbau.
- IA ohne **Owner**.

---

## Kerngedanke

IA ist die **Karte hinter der UI**. Flach, ehrlich, in Nutzersprache schlägt tief und hübsch. Wenn Nutzende den nächsten Klick nicht erraten können, hilft kein Visual Design mehr.

## Weiterführend

- [NN/g — IA & navigation](https://www.nngroup.com/topic/information-architecture/)
- [Information Architecture for the Web and Beyond](https://www.oreilly.com/library/view/information-architecture-4th/9781491911518/)
- [GOV.UK — Navigation patterns](https://design-system.service.gov.uk/patterns/navigation/)
- [Optimal Workshop](https://www.optimalworkshop.com/treejack/)

---

Englische Version: [`information-architecture.md`](../../en/design/information-architecture.md)
