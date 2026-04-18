# KI in der Kommunikation

**Geltungsbereich:** Gilt für **Sprachmodelle in der Kommunikationsarbeit**—Newsletter, Spendenmails, Social Posts, Pressemitteilungen, Übersetzungen, interne Memos. Nicht Bildgenerierung (siehe [`bilder-und-fotografie.md`](../design/bilder-und-fotografie.md)), nicht Rechts-/Medizinrat, nicht KI für Kinderschutzentscheidungen. Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`tonalitaet-und-markenstimme.md`](../sprache-&-kommunikation/tonalitaet-und-markenstimme.md), [`respektvolle-sprache.md`](../sprache-&-kommunikation/respektvolle-sprache.md), [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md) und [`modelloutput-bewerten.md`](modelloutput-bewerten.md).

## Exzerpt
- **KI entwirft, Menschen entscheiden**—jeder Satz nach außen ist menschliche Verantwortung.
- **Nie** Spender-PII, Kinderschutzdetails, unveröffentlichte Zitate in ungeprüfte Tools.
- **Grundieren** mit **eigenen** Fakten; keine erfundenen Zahlen.
- **Markenstimme** mit Beispielen + Gegenbeispielen sichern—nicht "sei kreativ".
- **Offenlegen** gemäß Policy; KI-Output nicht als Werk einer benannten Person ausgeben.
- Workflows, Vorlagen, Red Flags unten.

## Vor dem KI-Einsatz

### Konkret

- Ist das Ausgangsmaterial **freigegeben** und **teilbar**?
- **Zielgruppe**—Spender\*innen, Betroffene, Partner, Presse, Team?
- **Fehlerkosten**—Tippfehler vs. üble Nachrede?
- **Freigabe** vor dem Senden?

### Meta

- KI ist schnell bei **Form**, langsam bei **Wahrheit**. Form nutzen, prüfen.
- Bei **Trauer, Kinderschutz, Krankheit, Krise** ist ein roher KI-Entwurf fast immer im Ton falsch.

---

## Zweck

KI beschleunigt den Weg vom **leeren Blatt zum fast-finalen Entwurf**—mit Schutz von Stimme, Wahrheit, Würde, Vertrauen.

---

## 1. Wofür KI in Comms taugt

- Erstentwürfe aus strukturiertem Input.
- **Varianten** (3 Betreffzeilen, 2 CTAs).
- **Verdichtung** (Memo → 5-Bullet-Summary → Social).
- **Tonwechsel** innerhalb freigegebener Stimme.
- Rohe **Übersetzungen** für Muttersprachler-Review.
- **Gliederungen** für längere Stücke.
- **Barrierefreie** Umformulierungen (lang → kurz, Jargon → einfach).

## 2. Wofür KI in Comms *nicht* taugt

- **Nennen** von Personen, die keine Person des öffentlichen Lebens sind.
- **Statistiken**, die nicht in gelieferten Quellen stehen.
- **Community-Sprache**, die sie nie gesehen hat.
- **Krise** oder **Kinderschutz**—Ton fast immer falsch.
- **In-Rolle-Schreiben** benannter Personen.
- **Rechts-, Medizin-, Finanz-**Rat.

## 3. Der Comms-Workflow

```
Briefing → KI-Entwurf → Human-Edit → Faktencheck → Review → Planen → Offenlegen
```

## 4. Beispiel: Spendermail

### Schlecht: beispiel: spendermail

```text
Schreib eine Spendermail über unseren tollen Erfolg.
```

### Gut: beispiel: spendermail

```text
Aufgabe: 120-Wörter-Spendermail (DE, Sie).

Zielgruppe: Monatsspender\*innen ~55+, kennen uns.

Freigegebene Fakten (nicht ändern):
- Event: 12.05.2025
- Teilnehmende: 84
- Eingenommen: 6.200 €
- Programm: drei neue Abendangebote/Woche seit Sep 2024

Tonregeln:
- Warm, konkret, ruhig.
- Keine Superlative ("unglaublich", "toll", "einmalig").
- Kein Druck, keine Guilt-Tropes.
- Ein Satz "was das Geld bewirkt".

Ausschluss:
- Namen Betroffener.
- Zusätzliche Zahlen.
- Emojis.

Format: Betreff, 3 kurze Absätze, CTA.
```

## 5. Social Posts und Varianten

- **3 Varianten** mit **verschiedenen Winkeln** (Neugier/Nutzen/Dankbarkeit).
- Längen **plattformgemäß**.
- Trap-Words verbieten.

### Gut: social posts und varianten

```text
3 LinkedIn-Varianten zum Mai-Event.

Je:
- ≤ 60 Wörter
- Winkel: {Daten, Geschichte, Einladung}
- Hashtags nur #<freigegeben>
- Freigegebene Fakten exakt.
```

## 6. Übersetzungen

- Mit [`respektvolle-sprache.md`](../sprache-&-kommunikation/respektvolle-sprache.md) und Muttersprachler-Review koppeln.
- **Glossar** (Markenwörter, Nicht-übersetzen-Liste).
- Modell soll **kulturelle Fallen** melden, nicht still umformulieren.

### Gut: übersetzungen

```text
Übersetze DE → EN (formal, Sie-Stil in DE entspricht "we/you" neutral):
- Glossar-Begriffe: <...>
- Melde nicht-übersetzbare Idiome mit [IDIOM].
- Zahlen/Daten wörtlich.
```

## 7. Pressemitteilungen

- Hohes Risiko: falsches Zitat, falsche Zahl, Rechtsverletzung.
- KI **strukturiert** (Headline/Lead/Boilerplate); **Worte** gehören Menschen.
- Krisen-Mitteilungen **nur** mit Leitungsfreigabe; Offenlegung nach [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md).

## 8. Markenstimme: Beispiele statt Adjektive

- "Warm" ist vage; **Gegenbeispiel** ist konkret.
- **Stimm-Block** im System-Prompt: ein Positiv-Beispiel, ein zu vermeidendes, 3–5 Regeln.

### Gut (Stimm-Block)

```text
Stimmregeln:
- Einfache Sprache, DE, Sie.
- Warm + konkret, nicht performativ.
- So: "Dank Ihrer Spende konnten wir dieses Semester drei weitere Abendangebote laufen lassen."
- Nicht so: "Wir können unsere unendliche Dankbarkeit für Ihre großartige Unterstützung gar nicht in Worte fassen!"
```

## 9. Offenlegung und Zuschreibung

- [`ki-offenlegung-und-richtlinien.md`](../ethik-&-recht/ki-offenlegung-und-richtlinien.md) folgen.
- KI-Text nicht unter **benanntem Autor** ohne Review/Einwilligung veröffentlichen.
- Intern dokumentieren, **wann** KI materiell eingesetzt wurde.

## 10. Was nicht tun

- Unredigierte **Fallakten** oder **Spender-Listen** in ungeprüfte Tools.
- KI-generierte **Betroffenenstimmen** ohne Einwilligung.
- KI schreibt **Entschuldigungen** oder **Kondolenzen** ohne menschliche Freigabe.
- Skaliert versenden ohne **Volumen-Sanity-Check**—Templates tragen Fehler in Masse.

---

## Kerngedanke
KI verkürzt den Weg vom **Briefing zum Entwurf**. Stimme, Wahrheit, Würde gehören dir. Mit freigegebenen Fakten, Stimmbeispielen, Review und klarer Offenlegung wird die Zeitersparnis echt.

## Weiterführend
- [BBC — Editorial guidelines](https://www.bbc.co.uk/editorialguidelines/)
- [Ethical Journalism Network — AI and ethics](https://ethicaljournalismnetwork.org/)
- [ICO — AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/)
- [Plain English Campaign](https://www.plainenglish.co.uk/)

---

Englische Version: [`using-ai-for-comms.md`](../../en/ai-&-prompting/using-ai-for-comms.md)
