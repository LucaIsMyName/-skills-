# "skills"

Ein persönliches Monorepo aus Markdown-Referenzdokumenten—Workflows, Standards und Checklisten für **dich und dein Team** und für **Sprachmodelle**, wenn Assistent:innen dieselben Regeln befolgen sollen, ohne dass du sie jede Sitzung neu erklärst.

---

## Was das hier ist

Dieses Repository bündelt das, was dir wichtig ist: Schreibstil, Coding-Konventionen, Designvorlieben, Kommunikationsnormen und mehr. **Menschen** können alles direkt in Git lesen—Onboarding, Übergaben, Runbooks oder eine schnelle Auffrischung. **Sprachmodelle** können dieselben Dateien nutzen, wenn du sie einfügst, an einen Chat anhängst oder in eine Projekt-Library oder einen RAG-Index lädst.

Jede Datei ist ein in sich geschlossenes Thema: für Menschen verständlich nachvollziehbar, für Modelle so strukturiert, dass sie die Vorgaben konsistent anwenden können.

---

## Wie du es nutzt

**Als Dokumentation lesen**
Öffne beliebige Dateien im Repo und nutze sie wie ein Handbuch—Checklisten vor einem Release, ein Kommunikations-Workflow oder ein Coding-Standard, auf den sich das Team einigen kann.

**Im Chat (hochladen oder einfügen)**
Wenn du mit einer KI arbeitest, lade den Inhalt der passenden Datei hoch oder füge ihn ein, damit das Modell deiner dokumentierten Vorgehensweise folgt statt zu raten oder generisch zu antworten.

**In einem Memory- oder Library-Tab**
Tools wie ChatGPT (Memory), Claude (Projects), Notion AI und andere erlauben dauerhaften Kontext. Lege die Dateien ab, auf die du dich stützt—so teilen du und das Modell dieselbe Ausgangsbasis in jeder Sitzung.

**In Cursor / Coding-Agenten**
Die Datei `agents.md` im Root-Verzeichnis funktioniert gleichzeitig als `AGENTS.md` — eine projektweite Instruktionsdatei, die Cursor und andere agentenbasierte Tools automatisch einlesen. Sie ergänzt die Dateien unter `library/`: Menschen lesen sie im Repo; Agenten können sie bei passender Konfiguration laden. Kein zusätzliches Setup nötig.

---

## Struktur

```
/
├── agents.md                  # Globale Coding-Konventionen (funktioniert auch als AGENTS.md)
├── README.md                  # Englische Version dieser Übersicht
├── README-de.md               # Diese Datei
└── library/
    ├── en/
    │   ├── coding/
    │   │   ├── accessibility-in-code.md
    │   │   ├── coding-best-practices.md
    │   │   ├── git-and-commits.md
    │   │   ├── react-best-practices.md
    │   │   ├── scaffolding-a-react-app.md
    │   │   ├── testing-strategy.md
    │   │   └── typescript-best-practices.md
    │   ├── design/
    │   │   ├── color-and-contrast.md
    │   │   ├── data-visualization-basics.md
    │   │   ├── design-accessibility.md
    │   │   ├── design-basics.md
    │   │   ├── design-tokens-and-theming.md
    │   │   ├── designing-good-interfaces.md
    │   │   ├── forms-and-input-ux.md
    │   │   ├── motion-and-micro-interactions.md
    │   │   ├── slides-and-presentations.md
    │   │   └── typography.md
    │   ├── ethics-safeguarding-legal/
    │   │   ├── ai-disclosure-and-policy.md
    │   │   ├── copyright-and-usage-rights.md
    │   │   ├── crisis-legal-checklist.md
    │   │   ├── data-protection-for-comms.md
    │   │   ├── image-and-quote-releases.md
    │   │   └── safeguarding-in-comms.md
    │   ├── language-and-communication/
    │   │   ├── accessibility-for-comms.md
    │   │   ├── crisis-and-sensitive-topics.md
    │   │   ├── easy-read-english.md
    │   │   ├── fundraising-appeals.md
    │   │   ├── heroes-journey.md
    │   │   ├── interview-preparation.md
    │   │   ├── newsletter-and-email.md
    │   │   ├── press-statement-basics.md
    │   │   ├── respectful-language.md
    │   │   ├── social-short-form.md
    │   │   ├── speeches-and-talks.md
    │   │   ├── storytelling.md
    │   │   └── writing-a-story.md
    │   └── research-and-analysis/
    │       ├── desk-research.md
    │       ├── interviewing-people.md
    │       ├── literature-summarising.md
    │       ├── notes-and-synthesis.md
    │       ├── reading-statistics-plainly.md
    │       └── source-evaluation-and-fact-checking.md
    └── de/
        ├── coding/
        │   ├── barrierefreiheit-im-code.md
        │   ├── coding-best-practices.md
        │   ├── git-und-commits.md
        │   ├── react-best-practices.md
        │   ├── react-app-aufsetzen.md
        │   ├── teststrategie.md
        │   └── typescript-best-practices.md
        ├── design/
        │   ├── barrierefreies-design.md
        │   ├── datenvisualisierung-grundlagen.md
        │   ├── design-basics.md
        │   ├── design-tokens-und-theming.md
        │   ├── farbe-und-kontrast.md
        │   ├── folien-und-praesentationen.md
        │   ├── formulare-und-eingaben-ux.md
        │   ├── gute-interfaces-designen.md
        │   ├── motion-und-micro-interactions.md
        │   └── typografie.md
        ├── ethik-schutz-recht/
        │   ├── bild-und-zitatfreigaben.md
        │   ├── datenschutz-in-der-kommunikation.md
        │   ├── kinder-und-betroffenenschutz.md
        │   ├── ki-offenlegung-und-richtlinien.md
        │   ├── krise-rechts-checkliste.md
        │   └── urheber-und-nutzungsrechte.md
        ├── recherche-und-analyse/
        │   ├── literatur-zusammenfassen.md
        │   ├── menschen-interviewen.md
        │   ├── notizen-und-synthese.md
        │   ├── quellenbewertung-und-faktencheck.md
        │   ├── recherche-grundlagen.md
        │   └── statistik-einfach-lesen.md
        └── sprache-und-kommunikation/
            ├── barrierefreiheit-kommunikation.md
            ├── die-heldenreise.md
            ├── einfache-sprache.md
            ├── interview-vorbereitung.md
            ├── krise-und-sensible-themen.md
            ├── newsletter-und-e-mail.md
            ├── pressemitteilungen-schreiben.md
            ├── reden-und-vortraege.md
            ├── respektvolle-sprache.md
            ├── social-kurzformate.md
            ├── spendenaufrufe.md
            ├── stories-schreiben.md
            └── storytelling.md
```

### `agents.md`

Die übergeordnete Coding-Konventionsdatei. Behandelt Ordnerstruktur, React-Setup, TypeScript-Regeln, UI-Designprinzipien, Teststrategie, Git-Hygiene und mehr. Für dich als lesbares Projekt-„Gesetz“; Cursor und ähnliche Tools können sie automatisch als `AGENTS.md` übernehmen.

### `library/`

Themenbezogene Leitfäden. Jede Datei beschreibt, wie du eine bestimmte Art von Aufgabe erledigt haben möchtest—sowohl für **Menschen**, die die Arbeit machen, als für **LLMs**, die du mit demselben Text briefst. Nach Sprache und Bereich geordnet, damit du schnell findest, verlinkst oder anhängst, was passt.

| Datei | Inhalt |
|---|---|
| **Englisch — Coding** | |
| `accessibility-in-code.md` | Barrierefreiheit im Code: Semantik, Tastatur, ARIA, Kontrast, Tests |
| `coding-best-practices.md` | Allgemeine Coding-Standards und -Muster |
| `git-and-commits.md` | Branch-Namen, Conventional Commits, PR-Hygiene, Recovery |
| `react-best-practices.md` | React-spezifische Konventionen |
| `scaffolding-a-react-app.md` | Schritt-für-Schritt-Setup für neue React-Projekte |
| `testing-strategy.md` | Unit / Integration / E2E, Mocking, Flakyness, Coverage als Signal |
| `typescript-best-practices.md` | Strict Mode, Narrowing, Discriminated Unions, Boundaries |
| **Englisch — Design** | |
| `color-and-contrast.md` | Semantische Farbrollen, WCAG-Kontrast, Paletten, Theming |
| `data-visualization-basics.md` | Diagramme und Datengrafiken für Dashboards und Berichte |
| `design-accessibility.md` | Design-Seite der Barrierefreiheit: Layout, Ziele, Fokus, Motion |
| `design-basics.md` | Grundlegende Designprinzipien |
| `design-tokens-and-theming.md` | Semantische Tokens, Skalen, Hell/Dunkel-Themes |
| `designing-good-interfaces.md` | UI/UX-Richtlinien für Interfaces |
| `forms-and-input-ux.md` | Formulare, Labels, Validierung, Eingabezustände |
| `motion-and-micro-interactions.md` | UI-Motion, reduzierte Bewegung, Ladezustände |
| `slides-and-presentations.md` | Folien: Lesbarkeit, Struktur, Vorlagen |
| `typography.md` | Typ-Skala, Zeilenlänge, Durchschuss, Paarung, Ziffern |
| **Englisch — Ethik, Schutz & Recht** | |
| `ai-disclosure-and-policy.md` | Wann und wie KI-Einsatz offenlegen; synthetische Medien |
| `copyright-and-usage-rights.md` | Lizenzen, Namensnennung, KI-Material, NGO-Fallstricke |
| `crisis-legal-checklist.md` | Rechtslayer in der Krisenkommunikation |
| `data-protection-for-comms.md` | DSGVO-Minimum für Fotos, Zitate, Newsletter, Analytics |
| `image-and-quote-releases.md` | Spezifische, informierte, eingegrenzte, widerrufbare Freigaben |
| `safeguarding-in-comms.md` | Kinder und schutzbedürftige Erwachsene in Stories und Fotos |
| **Englisch — Sprache & Kommunikation** | |
| `accessibility-for-comms.md` | Inklusive Kommunikation (EN): Texte, Briefings, Sprechen—kein Dev/UI-Code |
| `crisis-and-sensitive-topics.md` | Krisenkommunikation, Holding Statements, Eskalation |
| `easy-read-english.md` | Klares, zugängliches Englisch |
| `fundraising-appeals.md` | Spender:innen-Ansprache: Eine Person, ein Bedarf, ein Appell |
| `heroes-journey.md` | The Hero’s Journey (EN): 12-beat narrative arc |
| `interview-preparation.md` | Medien-Prep für Sprecher:innen: Message-Map, Brücken, Vortrag |
| `newsletter-and-email.md` | Newsletter und E-Mail, CTAs, rechtliche Platzhalter |
| `press-statement-basics.md` | Pressemitteilungen |
| `respectful-language.md` | Respektvolle, würdezentrierte Sprache |
| `social-short-form.md` | Kurze Social-Posts (LinkedIn, Meta, Threads, Bluesky) |
| `speeches-and-talks.md` | Reden entwerfen und halten: eine Kernbotschaft, drei Beats |
| `storytelling.md` | Marie Lampert: Struktur, fünf Elemente, Dramaturgie |
| `writing-a-story.md` | Menschenzentrierte Geschichten für NGOs und soziale Organisationen |
| **Englisch — Recherche & Analyse** | |
| `desk-research.md` | Planen, Suchen, Protokollieren, Triangulieren |
| `interviewing-people.md` | Recherche-Interviews: Einwilligung, offene Fragen, Ethik |
| `literature-summarising.md` | Treue Zusammenfassungen: Geltungsbereich, Hedges, Zuschreibung |
| `notes-and-synthesis.md` | Atomare Notizen; Synthese zu Entwurf; Herkunft erhalten |
| `reading-statistics-plainly.md` | Prozent vs. Prozentpunkte, Basisraten, Korrelation, Stichproben |
| `source-evaluation-and-fact-checking.md` | CRAAP, primär/sekundär, Verifizieren, KI-Fabrikationen |
| **Deutsch — Coding** | |
| `barrierefreiheit-im-code.md` | Barrierefreiheit im Web-Code: Semantik, Tastatur, ARIA, Kontrast, Tests |
| `coding-best-practices.md` | Allgemeine Coding-Standards und -Muster |
| `git-und-commits.md` | Branch-Namen, Conventional Commits, PR-Hygiene, Recovery |
| `react-best-practices.md` | React-spezifische Konventionen |
| `react-app-aufsetzen.md` | Schritt-für-Schritt-Setup für neue React-Projekte |
| `teststrategie.md` | Unit / Integration / E2E, Mocking, Flakyness, Coverage als Signal |
| `typescript-best-practices.md` | Strict Mode, Narrowing, Discriminated Unions, Boundaries |
| **Deutsch — Design** | |
| `barrierefreies-design.md` | Design-Seite der Barrierefreiheit: Layout, Ziele, Fokus, Reflow |
| `datenvisualisierung-grundlagen.md` | Diagramme und Datengrafiken |
| `design-basics.md` | Grundlegende Designprinzipien |
| `design-tokens-und-theming.md` | Design-Tokens, Skalen, Hell/Dunkel |
| `farbe-und-kontrast.md` | Semantische Farbrollen, WCAG-Kontrast, Paletten |
| `folien-und-praesentationen.md` | Folien und Präsentationen |
| `formulare-und-eingaben-ux.md` | Formulare, Labels, Validierung |
| `gute-interfaces-designen.md` | UI/UX für Interfaces |
| `motion-und-micro-interactions.md` | Motion, reduzierte Bewegung, Ladezustände |
| `typografie.md` | Typ-Skala, Zeilenlänge, Durchschuss, Paarung, Ziffern |
| **Deutsch — Ethik, Schutz & Recht** | |
| `bild-und-zitatfreigaben.md` | Spezifische, informierte, eingegrenzte, widerrufbare Freigaben |
| `datenschutz-in-der-kommunikation.md` | DSGVO-Minimum für Fotos, Zitate, Newsletter, Analytics |
| `kinder-und-betroffenenschutz.md` | Kinder und schutzbedürftige Erwachsene in Stories und Fotos |
| `ki-offenlegung-und-richtlinien.md` | Wann und wie KI-Einsatz offenlegen; synthetische Medien |
| `krise-rechts-checkliste.md` | Rechtslayer in der Krisenkommunikation |
| `urheber-und-nutzungsrechte.md` | Lizenzen, Namensnennung, KI-Material, NGO-Fallstricke |
| **Deutsch — Recherche & Analyse** | |
| `literatur-zusammenfassen.md` | Treue Zusammenfassungen: Geltungsbereich, Hedges, Zuschreibung |
| `menschen-interviewen.md` | Recherche-Interviews: Einwilligung, offene Fragen, Ethik |
| `notizen-und-synthese.md` | Atomare Notizen; Synthese zu Entwurf; Herkunft erhalten |
| `quellenbewertung-und-faktencheck.md` | CRAAP, primär/sekundär, Verifizieren, KI-Fabrikationen |
| `recherche-grundlagen.md` | Planen, Suchen, Protokollieren, Triangulieren |
| `statistik-einfach-lesen.md` | Prozent vs. Prozentpunkte, Basisraten, Korrelation, Stichproben |
| **Deutsch — Sprache & Kommunikation** | |
| `barrierefreiheit-kommunikation.md` | Inklusive Kommunikation: Texte, Briefings, Sprechen—Bildbeschreibungen, Links, Untertitel-Planung (kein Dev/UI-Code) |
| `die-heldenreise.md` | Die Heldenreise: 12 Stationen (Erzählstruktur) |
| `einfache-sprache.md` | Einfache Sprache |
| `interview-vorbereitung.md` | Medien-Prep für Sprecher:innen: Message-Map, Brücken, Vortrag |
| `krise-und-sensible-themen.md` | Krise und sensible Themen |
| `newsletter-und-e-mail.md` | Newsletter und E-Mail |
| `pressemitteilungen-schreiben.md` | Pressemitteilungen für soziale Organisationen |
| `reden-und-vortraege.md` | Reden entwerfen und halten: eine Kernbotschaft, drei Beats |
| `respektvolle-sprache.md` | Respektvolle Sprache |
| `social-kurzformate.md` | Kurzformate sozialer Medien |
| `spendenaufrufe.md` | Spender:innen-Ansprache: Eine Person, ein Bedarf, ein Appell |
| `stories-schreiben.md` | Menschenzentrierte Geschichten für NGOs und soziale Organisationen |
| `storytelling.md` | Storytelling nach Marie Lampert (Struktur, Dramaturgie) |

---

## Einen neuen Skill hinzufügen

1. Erstelle eine Markdown-Datei unter `library/<sprache>/<thema>/dein-skill.md`.
2. Schreibe sie als direkte Anweisung — als würdest du eine Kollegin oder einen Kollegen (oder eine Assistenz) vor Beginn einer Aufgabe briefen.
3. Halte sie auf ein Thema fokussiert. Kürzere Dateien lassen sich leichter überfliegen, im Team teilen, an Chats anhängen und in RAG- oder Agent-Kontext laden.

---
