# "skills"

A personal monorepo of Markdown files that teach AI assistants how you want specific things done — without having to re-explain every session.

---

## What this is

Most AI tools let you upload a document, paste context into a memory/library tab, or attach files to a chat. This repo is a single place to store all the reference material you'd want an AI to have: writing styles, coding conventions, design preferences, communication norms, and more.

Think of it less as code and more as a **personal knowledge base for AI**. Each file is a self-contained set of instructions on one topic. Drop the relevant file into a chat and the AI picks up your preferences immediately.

---

## How to use it

**In a chat (upload or paste)**
Upload or paste the contents of any skill file when starting a task related to that topic. The AI will follow your documented approach instead of guessing or defaulting to generic advice.

**In a memory or library tab**
Tools like ChatGPT (Memory), Claude (Projects), Notion AI, and others let you store persistent context. Add the files most relevant to your daily work so every session starts with your preferences already loaded.

**In Cursor / coding agents**
The `agents.md` file at the root doubles as an `AGENTS.md` — a project-level instruction file that Cursor and other agentic coding tools read automatically. No extra setup needed.

---

## Structure

```
/
├── agents.md                  # Global coding conventions (also works as AGENTS.md)
├── README.md                  # This file
└── skills/
    ├── en/
    │   ├── coding/
    │   │   ├── coding-best-practices.md
    │   │   ├── react-best-practices.md
    │   │   └── scaffolding-a-react-app.md
    │   ├── design/
    │   │   ├── data-visualization-basics.md
    │   │   ├── design-basics.md
    │   │   ├── design-tokens-and-theming.md
    │   │   ├── designing-good-interfaces.md
    │   │   ├── forms-and-input-ux.md
    │   │   ├── motion-and-micro-interactions.md
    │   │   └── slides-and-presentations.md
    │   └── language-and-communication/
    │       ├── accessibility-for-comms.md
    │       ├── crisis-and-sensitive-topics.md
    │       ├── easy-read-english.md
    │       ├── newsletter-and-email.md
    │       ├── press-statement-basics.md
    │       ├── respectful-language.md
    │       ├── social-short-form.md
    │       └── writing-a-story.md
    └── de/
        ├── design/
        │   ├── datenvisualisierung-grundlagen.md
        │   ├── design-basics.md
        │   ├── design-tokens-und-theming.md
        │   ├── folien-und-praesentationen.md
        │   ├── formulare-und-eingaben-ux.md
        │   ├── gute-interfaces-designen.md
        │   └── motion-und-micro-interactions.md
        └── sprache-und-kommunikation/
            ├── barrierefreiheit-kommunikation.md
            ├── einfache-sprache.md
            ├── krise-und-sensible-themen.md
            ├── newsletter-und-e-mail.md
            ├── pressemitteilungen-schreiben.md
            ├── respektvolle-sprache.md
            ├── social-kurzformate.md
            └── stories-schreiben.md
```

### `agents.md`

Top-level coding conventions file. Covers folder structure, React scaffolding, TypeScript rules, UI design principles, testing strategy, git hygiene, and more. Used by Cursor automatically; also useful for any coding assistant.

### `skills/`

Topic-specific instruction files. Each one explains how you want a particular type of task handled. Organized by language and domain so you can quickly find and attach what's relevant.

| File | What it covers |
|---|---|
| **English — coding** | |
| `coding-best-practices.md` | General coding standards and patterns |
| `react-best-practices.md` | React-specific conventions |
| `scaffolding-a-react-app.md` | Step-by-step setup for new React projects |
| **English — design** | |
| `data-visualization-basics.md` | Charts and honest data graphics for dashboards and reports |
| `design-basics.md` | Core design principles |
| `design-tokens-and-theming.md` | Semantic tokens, scales, light/dark themes |
| `designing-good-interfaces.md` | UI/UX guidelines for interfaces |
| `forms-and-input-ux.md` | Form layout, labels, validation, input states |
| `motion-and-micro-interactions.md` | UI motion, reduced motion, loading states |
| `slides-and-presentations.md` | Slide decks: legibility, structure, templates |
| **English — language & communication** | |
| `accessibility-for-comms.md` | Inclusive comms: writing, briefings, speaking—image descriptions, link phrasing, captions planning (not dev/UI code) |
| `crisis-and-sensitive-topics.md` | Crisis comms, holding statements, escalation |
| `easy-read-english.md` | Plain / accessible English text |
| `newsletter-and-email.md` | Email and newsletter structure, CTAs, legal placeholders |
| `press-statement-basics.md` | Press statements |
| `respectful-language.md` | Respectful, dignity-centered language |
| `social-short-form.md` | Short social posts (LinkedIn, Meta, Threads, Bluesky) |
| `writing-a-story.md` | Human-centered nonprofit storytelling (Diakonie-style) |
| **German — design** | |
| `datenvisualisierung-grundlagen.md` | Diagramme und Datengrafiken |
| `design-basics.md` | Grundlegende Designprinzipien |
| `design-tokens-und-theming.md` | Design-Tokens, Skalen, Hell/Dunkel |
| `folien-und-praesentationen.md` | Folien und Präsentationen |
| `formulare-und-eingaben-ux.md` | Formulare, Labels, Validierung |
| `gute-interfaces-designen.md` | UI/UX für Interfaces |
| `motion-und-micro-interactions.md` | Motion, reduzierte Bewegung, Ladezustände |
| **German — Sprache & Kommunikation** | |
| `barrierefreiheit-kommunikation.md` | Barrierefreie Kommunikation (Text, Medien) |
| `einfache-sprache.md` | Einfache Sprache (Deutsch) |
| `krise-und-sensible-themen.md` | Krisenkommunikation, sensible Themen |
| `newsletter-und-e-mail.md` | Newsletter und E-Mail |
| `pressemitteilungen-schreiben.md` | Pressemitteilungen für soziale Organisationen |
| `respektvolle-sprache.md` | Respektvolle Sprache |
| `social-kurzformate.md` | Kurzformate sozialer Medien |
| `stories-schreiben.md` | Geschichten im Diakonie-Stil |

---

## Adding a new skill

1. Create a Markdown file under `skills/<language>/<topic>/your-skill.md`.
2. Write it as a direct instruction set — as if briefing someone before they start a task.
3. Keep it focused on one topic. Shorter files are easier to attach and parse.

---
