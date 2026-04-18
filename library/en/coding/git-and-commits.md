# Git and commits

**Scope:** Applies to **day-to-day git usage**—branches, commits, PRs, reviews. Not for server-side git administration, not for release engineering. Pair with [`AGENTS.md`](../../../AGENTS.md) for agent-specific commit rules and [`testing-strategy.md`](testing-strategy.md) for review workflows.

## Excerpt
- **Small, focused commits**; one logical change each. Refactors and behaviour changes travel in separate commits.
- **Conventional commit** prefixes: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `build`, `ci`.
- **Branch per task**: `feat/…`, `fix/…`, `chore/…`—kebab-case, short.
- **Never force-push** shared branches. **Never** push secrets. **Never** commit generated artefacts.
- Full rules below cover messages, PR hygiene, merging, and recovery.

## Before committing

Before generating a commit, clarify **what changed and why**. Do not invent a motivation that is not in the diff.

### Concrete

- What is the **smallest diff** that makes sense on its own?
- Does the change belong in **one** commit, or should it split?
- Are there **unrelated** edits (formatting, config) that should be separated?

### Meta

- The message is for a future reader who has only the diff and this line. Write for them.
- Prefer the **why** over the **what**—the diff shows the what.

---

## Purpose

Keep history **readable, revertable, and bisectable** so a future teammate can understand any change without asking.

---

## 1. Branch naming

- `feat/<short-topic>` — new user-facing capability.
- `fix/<short-topic>` — bug fix.
- `refactor/<short-topic>` — behaviour-preserving cleanup.
- `chore/<short-topic>` — tooling, deps, config.
- `docs/<short-topic>`, `test/<short-topic>`, `perf/<short-topic>`.

Short, kebab-case, no ticket number at the **start** (put it at the end if mandatory: `feat/export-csv-ENG-1234`).

## 2. Commit message format

```
<type>(<optional scope>): <imperative summary, <=72 chars>

<body: what changed, why, trade-offs; wrap at ~72 cols>

<footer: BREAKING CHANGE, refs, co-authors>
```

- **Imperative** mood: "add", "fix", "remove"—not "added", "fixes".
- Subject **under 72 chars**, no trailing period.
- Body optional for trivial changes; required for anything non-obvious.

### Good: commit message format

```
feat(newsletter): add preheader field to template

The subject line alone was not enough for mobile previews.
Preheader renders only in the HTML template; plain-text
fallback is unchanged.
```

### Bad: commit message format

```
stuff
```

```
Fixed the newsletter thingy because Anna asked me to.
```

## 3. One commit, one reason

- **Refactor** and **behaviour change** never share a commit.
- **Formatting-only** churn lives in its own commit so real changes stay reviewable.
- If you find yourself writing "and" in the subject, split the commit.

## 4. Before you push

- `git status` clean; no stray files.
- `git diff --staged` read top-to-bottom—you own every line.
- Tests and linters run locally.
- No `console.log`, `dbg!`, `print("here")`, or commented-out code.

## 5. Pull request hygiene

- **Small PRs** (<400 lines of diff when possible). Big features ship as a series of small PRs behind a flag.
- PR description covers **why**, **what**, and **how to verify**.
- Screenshots / recordings for any visual change.
- Link the ticket/issue; don't paste the ticket title as the description.

## 6. Review and merge

- **Rebase** (or squash) before merging to keep a linear history; use merge commits only for long-lived feature branches with shared work.
- **Squash-merge** the PR into a single coherent commit unless the individual commits are genuinely useful history.
- Delete the branch after merge.

## 7. What never goes in git

- Secrets, API keys, `.env` files with real values.
- Large binaries (>1 MB) unless LFS is configured.
- Generated files (builds, lockfiles of disposable caches, coverage reports).
- Personal data (PII), customer data.

## 8. Recovery, not panic

- Lost commits: `git reflog`.
- Bad rebase: `git rebase --abort`.
- Committed on wrong branch: `git reset --soft HEAD~N`, switch branch, commit.
- Pushed a secret: **rotate the secret first**, then rewrite history (coordinate with the team).

## 9. What not to do

- `git push --force` on a shared branch. Use `--force-with-lease` on your own branch, never on `main`.
- `git add -A` without reading the diff.
- Amending commits that have already been shared, unless the whole team knows.
- "Fix review comments" as a single commit on a PR that also does real work—split them.

---

## Core idea

Git history is a **letter to the future**. Write it so someone can read six months later, bisect cleanly, and trust what each commit claims.

## Further reading

- [Pro Git book (online)](https://git-scm.com/book/en/v2) — official deep reference for workflows, internals, and recovery
- [Conventional Commits](https://www.conventionalcommits.org/) — widely used prefix convention for messages and changelogs
- [GitHub Docs — protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — how teams enforce review before merge

---

German version: [`git-und-commits.md`](../../de/coding/git-und-commits.md)
