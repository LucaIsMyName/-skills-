# Barrierefreiheit als Rechtspflicht

## Geltungsbereich:

Gilt für **rechtliche Pflichten digitaler Barrierefreiheit**—WCAG/EN 301 549, EAA (EU), BFSG (DE), Equality Act (UK), ADA (US), öffentliche Stellen, Erklärungen, Nachbesserung. Keine komplette WCAG-Schulung, nicht länder-erschöpfend. Kombiniere mit [`barrierefreiheit-im-code.md`](../coding/barrierefreiheit-im-code.md), [`content-design-und-microcopy.md`](../design/content-design-und-microcopy.md), [`dsgvo-grundlagen.md`](dsgvo-grundlagen.md) und [`leere-und-fehlerzustaende.md`](../design/leere-und-fehlerzustaende.md).

## Exzerpt

- **Barrierefreiheit ist Gesetz**, nicht Höflichkeit—EU/DE/UK/US und mehr.
- **WCAG 2.2 AA** ist das gängige Minimum.
- **Erklärung zur Barrierefreiheit** ist Pflicht; wahrheitsgemäß und aktuell halten.
- **Beschaffung**: ihr haftet auch für Drittkomponenten.
- **Nachbesserungsplan** ist, was Regulierer sehen wollen.
- Regime-Übersicht unten.

## Vor dem Release

### Konkret

- **Welches Recht** gilt (Land, Branche, Zielgruppe)?
- Gibt es eine **Frist** (EAA 28.06.2025, BFSG in DE)?
- Habt ihr eine **Erklärung**, und ist sie **korrekt**?
- Haben Drittkomponenten **Konformitätsberichte** (VPAT/EN 301 549)?

### Meta

- Rechtsabteilungen wollen **Prozess/Doku**; Betroffene wollen **das Produkt nutzbar**. Beides liefern.
- Barriere-Lücken sind **Reputationsrisiko**, nicht nur Bußgeld.

---

## Zweck

Produkte, die Menschen mit Behinderungen nutzen können, und **dokumentierte Rechtspflicht** einhalten.

---

## 1. Warum es Gesetz ist

- **EU — EAA**: viele privatwirtschaftliche Dienste (Banken, E-Commerce, Transport, E-Books, Telco) ab 28.06.2025.
- **EU — WAD**: öffentliche Websites/Apps.
- **DE — BFSG**: setzt EAA um.
- **UK — Equality Act**: angemessene Vorkehrungen.
- **US — ADA/Section 508**.

WCAG 2.x ist die technische Referenz.

## 2. WCAG in einem Abschnitt

**WCAG 2.2 AA** ist meistens gefordert. POUR:

- **Perceivable** — Textalternativen, Captions, Kontrast, skalierbar.
- **Operable** — Tastatur, genug Zeit, keine Krampfauslöser, klare Navigation, sichtbarer Fokus.
- **Understandable** — lesbar, vorhersagbar, Eingabehilfen, Fehlerkorrektur.
- **Robust** — sauberes HTML, ARIA korrekt, mit Hilfstech kompatibel.

Siehe [`barrierefreiheit-im-code.md`](../coding/barrierefreiheit-im-code.md).

## 3. Erklärung zur Barrierefreiheit

Inhalt:

- **Konformitätsstufe** (WCAG 2.2 AA) + Scope.
- **Nicht konform** Teile und **Gründe**, Fristen.
- **Feedback-Weg** + Antwortzeit.
- **Alternative** zur Leistung solange.
- **Stand / Prüfdatum**.
- **Durchsetzungskontakt** (nationale Stelle).

Keine Templates mit "Lorem ipsum" stehen lassen.

## 4. Scope: was fällt darunter

- **Websites** inkl. Kampagnen/Mikrosites.
- **Mobile Apps** iOS/Android.
- **Terminals/Automaten**.
- **Dokumente**: PDFs, Word, Präsentationen.
- **Drittwidgets**.
- **E-Commerce** end-to-end.

## 5. Beschaffung und Dritte

- **VPAT / EN 301 549**-Berichte verlangen.
- A11y wie Security in Vertrag, Review, Abnahme.
- Fällt eine Komponente durch, haftet ihr.
- **Auto-Overlay-Widgets** vermeiden—viele bringen wenig und waren Streitgegenstand.

## 6. Inhalte, nicht nur Code

- **PDFs** getaggt, nicht Scans.
- **Videos**: Captions, Transkripte.
- **Bilder**: Alt, kein Text-im-Bild ohne Alternative.
- **Sprache**: einfach, Locale gesetzt.
- **Formulare**: Labels, Fehler, Tab-Reihenfolge.

## 7. Testen

- **Automatische Tools** (axe, Lighthouse, Pa11y) fangen ~30–40%.
- **Tastatur-Walkthroughs**.
- **Screenreader-Tests** (NVDA/VoiceOver/TalkBack).
- **Betroffene** als Tester\*innen—bezahlen, zuhören.
- A11y-Regression in CI.

## 8. Nachbesserungspläne

- Kriterium benennen (z. B. 1.4.3 Kontrast).
- **Severity** und **Betroffene**.
- **Kritisch** schnell, **schwer** in kurzer Frist, Rest planen.
- Roadmap öffentlich verlinken, wo verlangt.

## 9. Durchsetzung/Beschwerden

- Erst **eigene** Bearbeitung in Frist.
- **Eskalation** an Stelle (DE: Bundesfachstelle/Länderstellen, UK: EHRC, US: DOJ).
- **Log** der Beschwerden und Antworten.

## 10. Was nicht tun

- Ohne Plan shippen und "v2" versprechen.
- **Overlay** als Konformität ausgeben.
- Erklärung **überstrapazieren**.
- A11y allein beim QA-Team ablegen.
- Beschwerden als PR-Problem sehen.

---

## Kerngedanke

Barrierefreiheit ist **Gesetz und anhaltende Praxis**. WCAG 2.2 AA shippen, in Beschaffung und CI verankern, ehrliche Erklärung, schnell auf Beschwerden reagieren, Hartes fixen.

## Weiterführend

- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Europäische Kommission — Accessibility](https://ec.europa.eu/social/main.jsp?catId=1202)
- [BFSG — BMAS](https://www.bmas.de/DE/Soziales/Teilhabe-und-Inklusion/Barrierefreiheit/barrierefreiheit.html)
- [W3C — Laws](https://www.w3.org/WAI/policies/)

---

Englische Version: [`accessibility-as-legal-requirement.md`](../../en/ethics-&-legal/accessibility-as-legal-requirement.md)
