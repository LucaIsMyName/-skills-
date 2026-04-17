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
├── README.md                  # Englische Version dieser Übersicht
├── README-de.md               # Diese Datei
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

Die übergeordnete Coding-Konventionsdatei. Behandelt Ordnerstruktur, React-Setup, TypeScript-Regeln, UI-Designprinzipien, Teststrategie, Git-Hygiene und mehr. Wird von Cursor automatisch gelesen; nützlich auch für jeden anderen Coding-Assistenten.

### `skills/`

Themenbezogene Instruktionsdateien. Jede erklärt, wie du eine bestimmte Art von Aufgabe erledigt haben möchtest. Nach Sprache und Bereich geordnet, damit du schnell die passende Datei findest und anhängen kannst.

| Datei | Inhalt |
|---|---|
| **Englisch — Coding** | |
| `coding-best-practices.md` | Allgemeine Coding-Standards und -Muster |
| `react-best-practices.md` | React-spezifische Konventionen |
| `scaffolding-a-react-app.md` | Schritt-für-Schritt-Setup für neue React-Projekte |
| **Englisch — Design** | |
| `data-visualization-basics.md` | Diagramme und Datengrafiken für Dashboards und Berichte |
| `design-basics.md` | Grundlegende Designprinzipien |
| `design-tokens-and-theming.md` | Semantische Tokens, Skalen, Hell/Dunkel-Themes |
| `designing-good-interfaces.md` | UI/UX-Richtlinien für Interfaces |
| `forms-and-input-ux.md` | Formulare, Labels, Validierung, Eingabezustände |
| `motion-and-micro-interactions.md` | UI-Motion, reduzierte Bewegung, Ladezustände |
| `slides-and-presentations.md` | Folien: Lesbarkeit, Struktur, Vorlagen |
| **Englisch — Sprache & Kommunikation** | |
| `accessibility-for-comms.md` | Barriereärmere Texte: Alt-Texte, Überschriften, Links, Untertitel |
| `crisis-and-sensitive-topics.md` | Krisenkommunikation, Holding Statements, Eskalation |
| `easy-read-english.md` | Klares, zugängliches Englisch |
| `newsletter-and-email.md` | Newsletter und E-Mail, CTAs, rechtliche Platzhalter |
| `press-statement-basics.md` | Pressemitteilungen |
| `respectful-language.md` | Respektvolle, würdezentrierte Sprache |
| `social-short-form.md` | Kurze Social-Posts (LinkedIn, Meta, Threads, Bluesky) |
| `writing-a-story.md` | Menschenzentrierte Geschichten (Diakonie-Stil) |
| **Deutsch — Design** | |
| `datenvisualisierung-grundlagen.md` | Diagramme und Datengrafiken |
| `design-basics.md` | Grundlegende Designprinzipien |
| `design-tokens-und-theming.md` | Design-Tokens, Skalen, Hell/Dunkel |
| `folien-und-praesentationen.md` | Folien und Präsentationen |
| `formulare-und-eingaben-ux.md` | Formulare, Labels, Validierung |
| `gute-interfaces-designen.md` | UI/UX für Interfaces |
| `motion-und-micro-interactions.md` | Motion, reduzierte Bewegung, Ladezustände |
| **Deutsch — Sprache & Kommunikation** | |
| `barrierefreiheit-kommunikation.md` | Barrierefreiheit in der Kommunikation |
| `einfache-sprache.md` | Einfache Sprache |
| `krise-und-sensible-themen.md` | Krise und sensible Themen |
| `newsletter-und-e-mail.md` | Newsletter und E-Mail |
| `pressemitteilungen-schreiben.md` | Pressemitteilungen für soziale Organisationen |
| `respektvolle-sprache.md` | Respektvolle Sprache |
| `social-kurzformate.md` | Kurzformate sozialer Medien |
| `stories-schreiben.md` | Geschichten im Diakonie-Stil |

---

## Einen neuen Skill hinzufügen

1. Erstelle eine Markdown-Datei unter `skills/<sprache>/<thema>/dein-skill.md`.
2. Schreibe sie als direkte Anweisung — als würdest du jemanden vor Beginn einer Aufgabe briefen.
3. Halte sie auf ein Thema fokussiert. Kürzere Dateien lassen sich einfacher anhängen und verarbeiten.

---
