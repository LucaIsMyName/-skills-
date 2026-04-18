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

## Einen neuen Skill hinzufügen

1. Erstelle eine Markdown-Datei unter `library/<sprache>/<thema>/dein-skill.md`.
2. Schreibe sie als direkte Anweisung — als würdest du eine Kollegin oder einen Kollegen (oder eine Assistenz) vor Beginn einer Aufgabe briefen.
3. Halte sie auf ein Thema fokussiert. Kürzere Dateien lassen sich leichter überfliegen, im Team teilen, an Chats anhängen und in RAG- oder Agent-Kontext laden.

---
