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
    ├── en/                    # Skills in English
    │   ├── coding/
    │   │   ├── coding-best-practices.md
    │   │   ├── react-best-practices.md
    │   │   └── scaffolding-a-react-app.md
    │   ├── design/
    │   │   ├── design-basics.md
    │   │   └── designing-good-interfaces.md
    │   └── language-and-communication/
    │       ├── press-statement-basics.md
    │       └── respectful-language.md
    └── de/                    # Skills in German
        └── kommunikation-und-sprache/
            ├── pressemitteilungen-schreiben.md
            └── respektvolle-sprache.md
```

### `agents.md`

Top-level coding conventions file. Covers folder structure, React scaffolding, TypeScript rules, UI design principles, testing strategy, git hygiene, and more. Used by Cursor automatically; also useful for any coding assistant.

### `skills/`

Topic-specific instruction files. Each one explains how you want a particular type of task handled. Organized by language and domain so you can quickly find and attach what's relevant.

| File | What it covers |
|---|---|
| `coding-best-practices.md` | General coding standards and patterns |
| `react-best-practices.md` | React-specific conventions |
| `scaffolding-a-react-app.md` | Step-by-step setup for new React projects |
| `design-basics.md` | Core design principles |
| `designing-good-interfaces.md` | UI/UX guidelines for interfaces |
| `press-statement-basics.md` | How to write press statements |
| `respectful-language.md` | Language and tone guidelines |

---

## Adding a new skill

1. Create a Markdown file under `skills/<language>/<topic>/your-skill.md`.
2. Write it as a direct instruction set — as if briefing someone before they start a task.
3. Keep it focused on one topic. Shorter files are easier to attach and parse.

---

## Why Markdown

- Every AI tool can read plain text.
- No proprietary format, no lock-in.
- Easy to version, diff, and update in git.
- Works as an upload, a paste, a copy-paste into a system prompt, or a file reference.
