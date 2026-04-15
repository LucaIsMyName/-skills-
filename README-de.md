# "skills"

Ein persönliches Monorepo aus Markdown-Dateien, das KI-Assistenten beibringt, wie du bestimmte Dinge erledigt haben möchtest — ohne es jede Sitzung neu erklären zu müssen.

---

## Was das hier ist

Die meisten KI-Tools erlauben es, Dokumente hochzuladen, Kontext in einen Memory- oder Library-Tab einzufügen oder Dateien an einen Chat anzuhängen. Dieses Repository ist ein zentraler Ort für all das Referenzmaterial, das eine KI über dich haben soll: Schreibstil, Coding-Konventionen, Designvorlieben, Kommunikationsnormen und mehr.

Denk daran weniger als Code und mehr als eine **persönliche Wissensdatenbank für KI**. Jede Datei ist ein in sich geschlossenes Instruktionsset zu einem bestimmten Thema. Einfach die passende Datei in den Chat laden — und die KI übernimmt sofort deine Präferenzen.

---

## Wie du es nutzt

**Im Chat (hochladen oder einfügen)**
Lade den Inhalt einer Skill-Datei hoch oder füge ihn ein, bevor du eine Aufgabe zum entsprechenden Thema startest. Die KI folgt dann deiner dokumentierten Vorgehensweise, anstatt zu raten oder auf generische Ratschläge zurückzufallen.

**In einem Memory- oder Library-Tab**
Tools wie ChatGPT (Memory), Claude (Projects), Notion AI und andere erlauben es, dauerhaften Kontext zu speichern. Füge die Dateien hinzu, die du am häufigsten brauchst — so starten alle Sitzungen bereits mit deinen Präferenzen.

**In Cursor / Coding-Agenten**
Die Datei `agents.md` im Root-Verzeichnis funktioniert gleichzeitig als `AGENTS.md` — eine projektweite Instruktionsdatei, die Cursor und andere agentenbasierte Coding-Tools automatisch einlesen. Kein zusätzliches Setup nötig.

---

## Struktur

```
/
├── agents.md                  # Globale Coding-Konventionen (funktioniert auch als AGENTS.md)
├── README.md                  # Englische Version dieser Datei
├── README-de.md               # Diese Datei
└── skills/
    ├── en/                    # Skills auf Englisch
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
    └── de/                    # Skills auf Deutsch
        └── kommunikation-und-sprache/
            ├── pressemitteilungen-schreiben.md
            └── respektvolle-sprache.md
```

### `agents.md`

Die übergeordnete Coding-Konventionsdatei. Behandelt Ordnerstruktur, React-Setup, TypeScript-Regeln, UI-Designprinzipien, Teststrategie, Git-Hygiene und mehr. Wird von Cursor automatisch gelesen; nützlich auch für jeden anderen Coding-Assistenten.

### `skills/`

Themenbezogene Instruktionsdateien. Jede erklärt, wie du eine bestimmte Art von Aufgabe erledigt haben möchtest. Nach Sprache und Bereich geordnet, damit du schnell die passende Datei findest und anhängen kannst.

| Datei | Inhalt |
|---|---|
| `coding-best-practices.md` | Allgemeine Coding-Standards und -Muster |
| `react-best-practices.md` | React-spezifische Konventionen |
| `scaffolding-a-react-app.md` | Schritt-für-Schritt-Setup für neue React-Projekte |
| `design-basics.md` | Grundlegende Designprinzipien |
| `designing-good-interfaces.md` | UI/UX-Richtlinien für Interfaces |
| `press-statement-basics.md` | Wie Pressemitteilungen geschrieben werden |
| `respectful-language.md` | Sprach- und Tonrichtlinien |

---

## Einen neuen Skill hinzufügen

1. Erstelle eine Markdown-Datei unter `skills/<sprache>/<thema>/dein-skill.md`.
2. Schreibe sie als direkte Anweisung — als würdest du jemanden vor Beginn einer Aufgabe briefen.
3. Halte sie auf ein Thema fokussiert. Kürzere Dateien lassen sich einfacher anhängen und verarbeiten.

---