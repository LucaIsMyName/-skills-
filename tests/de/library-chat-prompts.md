# Library-Chat-Promptvorlagen (DE)

Nutze diese Prompts, um zu testen, ob der Assistent Anweisungen zu genau einer Markdown-Datei in `library/` korrekt ausfuehrt.

Vor dem Senden diese Platzhalter ersetzen:

- `<LANG>`
- `<CHAPTER_SLUG>`
- `<FILE_SLUG>.md`
- `<TASK_INSTRUCTION>`

---

## 1) Smoke-Test-Prompt

Kopieren/einfuegen:

```text
Nutze nur diese Datei als Quelle: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Aufgaben:
1) Bestaetige den exakten Dateipfad.
2) Fasse die Datei in genau 5 Bulletpoints zusammen.
3) Extrahiere die 3 wichtigsten praktischen Erkenntnisse.
4) Nenne 2 naechste Schritte, die ein Teammitglied heute umsetzen kann.

Regeln:
- Falls die Datei nicht gefunden wird, stoppe und melde das klar.
- Nutze keine anderen Dateien.
```

Akzeptanz-Checkliste:

- Pfad wird exakt wiedergegeben.
- Ausgabe hat 5 Zusammenfassungs-Bullets.
- Enthaelt 3 Erkenntnisse und 2 naechste Schritte.
- Kein Inhalt aus anderen Dateien.

---

## 2) Prompt fuer Instruction-Following

Kopieren/einfuegen:

```text
Arbeite nur mit: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Fuehre diese Anweisung exakt aus:
<TASK_INSTRUCTION>

Gib zurueck:
- "Input path:" mit dem exakten Pfad.
- "Result:" mit dem geforderten Ergebnis.
- "Limitations:" mit fehlenden oder mehrdeutigen Stellen in der Datei.

Regeln:
- Erfinde keine Details, die nicht in der Datei stehen.
- Bleibe vollstaendig auf diese Datei bezogen.
```

Akzeptanz-Checkliste:

- Exakte Umsetzung der Anweisung.
- Pflichtausgabe mit 3 Abschnitten.
- Benennt Grenzen statt zu halluzinieren.

---

## 3) Groundedness-Prompt

Kopieren/einfuegen:

```text
Analysiere nur: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Liefere:
1) 4 zentrale Aussagen aus dem Dokument.
2) Fuer jede Aussage ein kurzes direktes Zitat als Beleg.
3) Fuer jedes Aussage-Beleg-Paar ein Confidence-Rating (High/Medium/Low).

Regeln:
- Jede Aussage braucht einen Beleg.
- Wenn Belege fehlen, sage das explizit.
- Kein externes Wissen verwenden.
```

Akzeptanz-Checkliste:

- Genau 4 Aussagen.
- Jede Aussage hat ein Zitat.
- Jedes Paar hat ein Confidence-Rating.
- Fehlende Evidenz wird offen benannt.

---

## 4) Constraint-Format-Prompt

Kopieren/einfuegen:

```text
Nutze nur: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Gib strikt gueltiges JSON in diesem Schema aus:
{
  "path": "string",
  "audience": ["string"],
  "main_points": ["string", "string", "string"],
  "risks_or_gaps": ["string"],
  "next_steps": ["string", "string"]
}

Regeln:
- Kein Markdown, keine Code-Fences, nur JSON.
- Wenn Daten fehlen, nutze leere Arrays und erklaere kurz in risks_or_gaps.
- Keine Informationen aus anderen Dateien verwenden.
```

Akzeptanz-Checkliste:

- Nur gueltiges JSON.
- Keys entsprechen exakt dem Schema.
- Richtiger Pfad enthalten.
- Fehlende Daten werden ohne Erfindungen behandelt.

---

## 5) Negativtest fuer Fehlerfaelle/Pfade

Kopieren/einfuegen:

```text
Versuche diese Datei zu nutzen: library/<LANG>/<CHAPTER_SLUG>/<FILE_SLUG>.md

Falls vorhanden:
- Gib "FOUND" aus und eine 2-Bullet-Zusammenfassung.

Falls nicht vorhanden oder mehrdeutig:
- Gib "NOT_FOUND" aus.
- Schlage genau 3 wahrscheinliche Alternativpfade nach library-Namensmustern vor.
- Stelle mir eine klaerende Rueckfrage.

Regeln:
- Tue nie so, als ob eine fehlende Datei existiert.
- Halte die Antwort knapp.
```

Akzeptanz-Checkliste:

- Korrekte Unterscheidung zwischen gefunden/nicht gefunden.
- Bei Fehler genau 3 plausible Alternativen.
- Genau eine Rueckfrage bei Fehler.
