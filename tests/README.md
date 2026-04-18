# Chat Prompt Test Pack

This folder contains copy/paste prompts for manually testing markdown skills in `library/` through chat.

## Goal

Use reusable prompt templates to verify that the assistant:

- finds the requested markdown file in the active library context,
- follows explicit instructions from chat,
- stays grounded in the selected file, and
- handles errors clearly when a file/path is wrong.

## Files

- `en/library-chat-prompts.md`: English prompt templates
- `de/library-chat-prompts.md`: German prompt templates
- `en/language-and-communications/tests.md`: pointer file for legacy location

## Placeholder Conventions

Replace these placeholders before sending a prompt:

- `<LANG>`: `en` or `de`
- `<CHAPTER_SLUG>`: chapter folder in `library/<LANG>/`
- `<FILE_SLUG>.md`: target markdown filename
- `<TASK_INSTRUCTION>`: specific action you want the assistant to perform

Target path shape:

`library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md`

## Manual Test Flow

1. Pick one target file in `library/`.
2. Open the matching prompt file (`en` or `de`).
3. Copy one template block and replace placeholders.
4. Paste in chat with library context active.
5. Compare output against the template's acceptance checklist.
6. Repeat with more files and categories (smoke, groundedness, constraints, negative).

## Pass/Fail Signals

- Pass:
  - Uses the exact requested file/path.
  - Follows requested format and constraints.
  - Grounds claims in the file content (quotes/sections when requested).
  - States uncertainty when information is missing.
- Fail:
  - Mixes in unrelated files.
  - Ignores output format instructions.
  - Hallucinates sections, facts, or links.
  - Pretends the file exists when it does not.
