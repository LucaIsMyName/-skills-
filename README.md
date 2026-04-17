# "skills"

A personal monorepo of Markdown reference docs—workflows, standards, and checklists for **you and your team**, and for **LLMs** when you want assistants to follow the same rules without re-explaining them every time.

---

## What this is

This repo is one place to keep the material you care about: writing style, coding conventions, design preferences, communication norms, and more. **Humans** can read it straight from Git—onboarding, handoffs, runbooks, or a quick refresher. **Language models** can use the same files when you paste them, attach them to a chat, or load them into a project library or RAG index.

Each file is a self-contained guide to one topic: clear enough to follow yourself, structured enough for a model to apply consistently.

---

## How to use it

**Read it as documentation**
Open any file in the repo and use it like a handbook—checklists before a release, a comms workflow, or a coding standard your whole team can agree on.

**In a chat (upload or paste)**
When you work with an AI assistant, upload or paste the relevant file so the model follows your documented approach instead of guessing or defaulting to generic advice.

**In a memory or library tab**
Tools like ChatGPT (Memory), Claude (Projects), Notion AI, and others let you store persistent context. Add the files you rely on so both you and the model can reuse the same baseline every session.

**In Cursor / coding agents**
The `agents.md` file at the root doubles as an `AGENTS.md` — a project-level instruction file that Cursor and other agentic coding tools read automatically. It complements the `library/` docs: humans read them in-repo; agents can load them when configured. No extra setup needed.

---

## Structure

```
/
├── agents.md                  # Global coding conventions (also works as AGENTS.md)
├── README.md                  # This file
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

Top-level coding conventions file. Covers folder structure, React scaffolding, TypeScript rules, UI design principles, testing strategy, git hygiene, and more. Read it yourself as the project’s coding contract; Cursor and similar tools can pick it up automatically as `AGENTS.md`.

### `library/`

Topic-specific guides. Each explains how you want a particular kind of task handled—useful for **people** doing the work and for **LLMs** you brief with the same text. Organized by language and domain so you can browse, link, or attach what’s relevant.

| File | What it covers |
|---|---|
| **English — coding** | |
| `accessibility-in-code.md` | Web a11y from the engineering side: semantics, keyboard, ARIA, contrast, testing |
| `coding-best-practices.md` | General coding standards and patterns |
| `git-and-commits.md` | Branch naming, conventional commits, PR hygiene, recovery |
| `react-best-practices.md` | React-specific conventions |
| `scaffolding-a-react-app.md` | Step-by-step setup for new React projects |
| `testing-strategy.md` | Unit / integration / E2E, what to mock, flaky tests, coverage as signal |
| `typescript-best-practices.md` | Strict mode, narrowing, discriminated unions, boundaries, exhaustiveness |
| **English — design** | |
| `color-and-contrast.md` | Semantic color roles, WCAG contrast, palettes, theming basics |
| `data-visualization-basics.md` | Charts and honest data graphics for dashboards and reports |
| `design-accessibility.md` | Design side of a11y: layout, targets, focus, motion, reflow |
| `design-basics.md` | Core design principles |
| `design-tokens-and-theming.md` | Semantic tokens, scales, light/dark themes |
| `designing-good-interfaces.md` | UI/UX guidelines for interfaces |
| `forms-and-input-ux.md` | Form layout, labels, validation, input states |
| `motion-and-micro-interactions.md` | UI motion, reduced motion, loading states |
| `slides-and-presentations.md` | Slide decks: legibility, structure, templates |
| `typography.md` | Type scale, measure, leading, pairings, numerals |
| **English — ethics, safeguarding & legal** | |
| `ai-disclosure-and-policy.md` | When and how to disclose AI use; prompt hygiene, synthetic media |
| `copyright-and-usage-rights.md` | Licences, attribution, AI-generated material, nonprofit traps |
| `crisis-legal-checklist.md` | Legal and rights layer for crisis communications |
| `data-protection-for-comms.md` | GDPR-shaped floor for photos, quotes, newsletters, analytics |
| `image-and-quote-releases.md` | Specific, informed, scoped, revocable releases |
| `safeguarding-in-comms.md` | Children and adults at risk in stories and photos |
| **English — language & communication** | |
| `accessibility-for-comms.md` | Inclusive comms: writing, briefings, speaking—image descriptions, link phrasing, captions planning (not dev/UI code) |
| `crisis-and-sensitive-topics.md` | Crisis comms, holding statements, escalation |
| `easy-read-english.md` | Plain / accessible English text |
| `fundraising-appeals.md` | Donor-facing appeals: one person, one need, one ask, dignity first |
| `heroes-journey.md` | The Hero’s Journey: 12-beat narrative arc (story structure) |
| `interview-preparation.md` | Media prep for spokespeople: message map, bridges, delivery |
| `newsletter-and-email.md` | Email and newsletter structure, CTAs, legal placeholders |
| `press-statement-basics.md` | Press statements |
| `respectful-language.md` | Respectful, dignity-centered language |
| `social-short-form.md` | Short social posts (LinkedIn, Meta, Threads, Bluesky) |
| `speeches-and-talks.md` | Scripting and delivering talks: one takeaway, three beats, on time |
| `storytelling.md` | Marie Lampert storytelling: structure, five elements, dramaturgy |
| `writing-a-story.md` | Human-centered nonprofit / social-sector storytelling |
| **English — research & analysis** | |
| `desk-research.md` | Planning, searching, logging, triangulating non-empirical research |
| `interviewing-people.md` | Research interviews: consent, open questions, listening, ethics |
| `literature-summarising.md` | Faithful summaries: scope, hedges, attribution, commentary split |
| `notes-and-synthesis.md` | Atomic notes, synthesis from notes to draft, provenance preserved |
| `reading-statistics-plainly.md` | Percent vs. pp, base rates, correlation, sampling, honest numbers |
| `source-evaluation-and-fact-checking.md` | CRAAP, primary vs. secondary, verification, AI fabrications |
| **German — coding** | |
| `barrierefreiheit-im-code.md` | Barrierefreiheit im Web-Code: Semantik, Tastatur, ARIA, Kontrast, Tests |
| `coding-best-practices.md` | Allgemeine Coding-Standards und -Muster |
| `git-und-commits.md` | Branch-Namen, Conventional Commits, PR-Hygiene, Recovery |
| `react-best-practices.md` | React-spezifische Konventionen |
| `react-app-aufsetzen.md` | Schritt-für-Schritt-Setup für neue React-Projekte |
| `teststrategie.md` | Unit / Integration / E2E, Mocking, Flakyness, Coverage als Signal |
| `typescript-best-practices.md` | Strict Mode, Narrowing, Discriminated Unions, Boundaries |
| **German — design** | |
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
| **German — Ethik, Schutz & Recht** | |
| `bild-und-zitatfreigaben.md` | Spezifische, informierte, eingegrenzte, widerrufbare Freigaben |
| `datenschutz-in-der-kommunikation.md` | DSGVO-Minimum für Fotos, Zitate, Newsletter, Analytics |
| `kinder-und-betroffenenschutz.md` | Kinder und schutzbedürftige Erwachsene in Stories und Fotos |
| `ki-offenlegung-und-richtlinien.md` | Wann und wie KI-Einsatz offenlegen; synthetische Medien |
| `krise-rechts-checkliste.md` | Rechtslayer in Krisenkommunikation |
| `urheber-und-nutzungsrechte.md` | Lizenzen, Nennung, KI-Material, NGO-Fallstricke |
| **German — Recherche & Analyse** | |
| `literatur-zusammenfassen.md` | Treue Zusammenfassungen: Geltungsbereich, Hedges, Zuschreibung |
| `menschen-interviewen.md` | Recherche-Interviews: Einwilligung, offene Fragen, Zuhören, Ethik |
| `notizen-und-synthese.md` | Atomare Notizen; Synthese zu Entwurf; Herkunft erhalten |
| `quellenbewertung-und-faktencheck.md` | CRAAP, primär/sekundär, Verifizieren, KI-Fabrikationen |
| `recherche-grundlagen.md` | Planen, Suchen, Protokollieren, Triangulieren |
| `statistik-einfach-lesen.md` | Prozent vs. pp, Basisraten, Korrelation, Stichproben |
| **German — Sprache & Kommunikation** | |
| `barrierefreiheit-kommunikation.md` | Barrierefreie Kommunikation (Text, Medien) |
| `die-heldenreise.md` | Die Heldenreise: 12 Stationen (Erzählstruktur) |
| `einfache-sprache.md` | Einfache Sprache (Deutsch) |
| `interview-vorbereitung.md` | Medien-Prep für Sprecher:innen: Message-Map, Brücken, Vortrag |
| `krise-und-sensible-themen.md` | Krisenkommunikation, sensible Themen |
| `newsletter-und-e-mail.md` | Newsletter und E-Mail |
| `pressemitteilungen-schreiben.md` | Pressemitteilungen für soziale Organisationen |
| `reden-und-vortraege.md` | Reden entwerfen und halten: eine Kernbotschaft, drei Beats |
| `respektvolle-sprache.md` | Respektvolle Sprache |
| `social-kurzformate.md` | Kurzformate sozialer Medien |
| `spendenaufrufe.md` | Spender:innen-Ansprache: Eine Person, ein Bedarf, ein Appell |
| `stories-schreiben.md` | Menschenzentrierte Geschichten für NGOs und soziale Organisationen |
| `storytelling.md` | Storytelling nach Marie Lampert (Struktur, Dramaturgie) |

---

## Adding a new skill

1. Create a Markdown file under `library/<language>/<topic>/your-skill.md`.
2. Write it as a direct instruction set — as if briefing a colleague (or an assistant) before they start a task.
3. Keep it focused on one topic. Shorter files are easier to skim, share with teammates, attach to chats, and load into RAG or agent context.

---
