# Git und Commits

**Geltungsbereich:** Gilt für **tägliche Git-Nutzung**—Branches, Commits, PRs, Reviews. Nicht für serverseitige Git-Administration, nicht für Release Engineering. Ergänzend zu [`agents.md`](../../agents.md) für agent-spezifische Commit-Regeln und [`code-review-checklist.md`](code-review-checklist.md) für Reviews.

## Exzerpt

- **Kleine, fokussierte Commits**; je einer logische Änderung. Refactors und Verhaltensänderungen in **getrennten** Commits.
- **Conventional-Commit**-Präfixe: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `build`, `ci`.
- **Branch pro Aufgabe**: `feat/…`, `fix/…`, `chore/…`—kebab-case, kurz.
- **Nie force-pushen** auf geteilte Branches. **Nie** Secrets pushen. **Nie** generierte Artefakte committen.
- Vollständige Regeln unten: Messages, PR-Hygiene, Merge, Recovery.

## Vor dem Commit

Bevor ein Commit generiert wird, klären **was sich geändert hat und warum**. Keine erfundene Motivation, die nicht im Diff steht.

### Konkret

- Was ist der **kleinste sinnvolle Diff** für sich?
- Gehört die Änderung in **einen** Commit oder soll sie geteilt werden?
- Gibt es **unzusammenhängende** Edits (Formatierung, Config), die getrennt werden sollten?

### Meta

- Die Message ist für eine:n Leser:in in der Zukunft, die nur Diff und diese Zeile hat. Für sie schreiben.
- **Warum** vor **was**—das Diff zeigt das Was.

---

## Zweck

Historie **lesbar, revertierbar und bisectbar** halten, damit später jede Änderung ohne Nachfragen verständlich ist.

---

## 1. Branch-Namen

- `feat/<kurzes-thema>` — neue nutzerseitige Funktion.
- `fix/<kurzes-thema>` — Bugfix.
- `refactor/<kurzes-thema>` — verhaltensgleiche Aufräumarbeit.
- `chore/<kurzes-thema>` — Tooling, Deps, Config.
- `docs/<kurzes-thema>`, `test/<kurzes-thema>`, `perf/<kurzes-thema>`.

Kurz, kebab-case, keine Ticketnummer **am Anfang** (falls Pflicht: ans Ende: `feat/export-csv-ENG-1234`).

## 2. Commit-Message-Format

```
<type>(<optionaler-scope>): <imperativ, Kurzfassung, <=72 Zeichen>

<body: was, warum, Trade-offs; ~72 Zeichen umbrechen>

<footer: BREAKING CHANGE, refs, co-authors>
```

- **Imperativ**: „add“, „fix“, „remove“—nicht „added“, „fixes“.
- Betreff **unter 72 Zeichen**, kein Punkt am Ende.
- Body optional bei trivialen Änderungen; bei allem Nicht-Offensichtlichen Pflicht.

### Gut

```
feat(newsletter): add preheader field to template

The subject line alone was not enough for mobile previews.
Preheader renders only in the HTML template; plain-text
fallback is unchanged.
```

### Schlecht

```
stuff
```

```
Fixed the newsletter thingy because Anna asked me to.
```

## 3. Ein Commit, ein Grund

- **Refactor** und **Verhaltensänderung** teilen sich nie einen Commit.
- **Nur Formatierung** in eigenem Commit, damit echte Änderungen reviewbar bleiben.
- Wenn im Betreff ein „und“ auftaucht → Commit splitten.

## 4. Vor dem Push

- `git status` sauber; keine verirrten Dateien.
- `git diff --staged` von oben nach unten lesen—du bist für jede Zeile verantwortlich.
- Tests und Linter lokal laufen lassen.
- Kein `console.log`, `dbg!`, `print("here")`, kein auskommentierter Altcode.

## 5. Pull-Request-Hygiene

- **Kleine PRs** (<400 Zeilen Diff wenn möglich). Große Features als Serie kleiner PRs hinter Flag.
- PR-Beschreibung: **warum**, **was**, **wie verifizieren**.
- Screenshots / Aufnahmen bei visuellen Änderungen.
- Ticket/Issue verlinken; nicht den Ticket-Titel als Beschreibung pasten.

## 6. Review und Merge

- Vor Merge **rebase** (oder squash) für lineare Historie; Merge-Commits nur bei langen Feature-Branches mit geteilter Arbeit.
- PR per **Squash-Merge** zu einem kohärenten Commit, außer die Einzel-Commits sind wirklich nützliche Historie.
- Branch nach Merge löschen.

## 7. Was nie in Git gehört

- Secrets, API-Keys, `.env` mit echten Werten.
- Große Binaries (>1 MB) außer mit LFS.
- Generierte Dateien (Builds, wegwerfbare Cache-Lockfiles, Coverage-Reports).
- Personenbezogene Daten (PII), Kundendaten.

## 8. Recovery statt Panik

- Verlorene Commits: `git reflog`.
- Schiefe Rebase: `git rebase --abort`.
- Auf falschem Branch committed: `git reset --soft HEAD~N`, Branch wechseln, committen.
- Secret gepusht: **zuerst Secret rotieren**, dann Historie umschreiben (mit Team abstimmen).

## 9. Was nicht tun

- `git push --force` auf geteilten Branch. `--force-with-lease` auf eigenem Branch ok, nie auf `main`.
- `git add -A` ohne Diff gelesen zu haben.
- Bereits geteilte Commits amenden, außer das Team weiß Bescheid.
- „Fix review comments“ als ein Commit zusammen mit inhaltlicher Arbeit—trennen.

---

## Kernidee

Git-Historie ist ein **Brief an die Zukunft**. So schreiben, dass jemand sechs Monate später lesen, sauber bisecten und jedem Commit vertrauen kann.

## Weiterführend

- [Pro Git (online)](https://git-scm.com/book/de/v2) — ausführliche Referenz zu Abläufen und Rettungsaktionen
- [Conventional Commits](https://www.conventionalcommits.org/) — verbreitete Präfix-Konvention für Messages und Changelogs
- [GitHub Docs — geschützte Branches](https://docs.github.com/de/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Review-Pflicht vor dem Merge (English UI verfügbar)

---

Englische Version: [`git-and-commits.md`](../../en/coding/git-and-commits.md)
