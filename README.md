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

## Adding a new skill

1. Create a Markdown file under `library/<language>/<topic>/your-skill.md`.
2. Write it as a direct instruction set — as if briefing a colleague (or an assistant) before they start a task.
3. Keep it focused on one topic. Shorter files are easier to skim, share with teammates, attach to chats, and load into RAG or agent context.

---
