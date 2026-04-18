# DSGVO-Grundlagen

**Geltungsbereich:** Gilt für **alltägliche DSGVO/BDSG-Praxis** in Teams, die personenbezogene Daten verarbeiten—Rechtsgrundlagen, Einwilligung, Datensparsamkeit, Betroffenenrechte, Datenpannen, Auftragsverarbeitung. Keine Rechtsberatung, kein vollständiges DSFA-/DSB-Werk. Kombiniere mit [`ki-training-und-scraping.md`](ki-training-und-scraping.md), [`bild-und-zitatfreigaben.md`](bild-und-zitatfreigaben.md), [`ki-offenlegung-und-richtlinien.md`](ki-offenlegung-und-richtlinien.md) und [`sicherheit-fuer-webapps.md`](../coding/sicherheit-fuer-webapps.md).

## Exzerpt
- **DSGVO gilt**, sobald personenbezogene Daten verarbeitet werden.
- **Rechtsgrundlage festlegen**, bevor erhoben wird; dokumentieren; zum Zweck passend.
- **Datensparsamkeit**: so wenig wie möglich erheben, kurz speichern, routinemäßig löschen.
- **Betroffenenrechte** (Auskunft, Berichtigung, Löschung, Portabilität, Widerspruch, Einschränkung)—Prozess dafür haben.
- **Meldepflicht**: 72 Stunden bei meldepflichtigen Pannen.
- Checkliste und Beispiele unten.

## Vor der Datenerhebung

### Konkret

- **Welche** personenbezogenen Daten (Name, Mail, Tel, Standort, Gesundheit, besondere Kategorien)?
- **Warum**—in einfacher Sprache.
- **Rechtsgrundlage**: Einwilligung, Vertrag, gesetzliche Pflicht, lebenswichtige Interessen, öffentliche Aufgabe, berechtigtes Interesse.
- **Speicherdauer**?
- **Wer sieht sie** (intern, extern, Dienstleister)?

### Meta

- DSGVO ist **Governance**, nicht nur Recht. Policies müssen im Alltag funktionieren.
- Ist der Zweck nicht beschreibbar: **löschen**.

---

## Zweck

Personenbezogene Daten **rechtmäßig, minimal, respektvoll** handhaben.

---

## 1. Was sind personenbezogene Daten

Alle Informationen zu einer **identifizierten oder identifizierbaren** lebenden Person.

- Offensichtlich: Name, Mail, Tel, Adresse, Foto, Ausweisnummer, Gesundheit, Bank.
- Weniger offensichtlich: IP, Device-ID, Cookie-ID, pseudonyme Analytics, Stimme, Verhalten, Standort, "User 1234" bei Re-Identifikation möglich.
- **Besondere Kategorien** (Gesundheit, "Rasse"/Ethnie, Religion, Sexualleben, Gewerkschaft, biometrisch/genetisch, politisch): **zusätzliche Bedingungen**.

## 2. Rechtsgrundlagen

Pro Zweck schriftlich festlegen:

- **Einwilligung** — frei, bestimmt, informiert, unmissverständlich, widerruflich; keine Vor-Ankreuzerei; Nachweis aufbewahren.
- **Vertrag** — erforderlich für Vertragserfüllung.
- **Gesetzliche Pflicht** — (z. B. Steuerakten).
- **Lebenswichtige Interessen** — selten, akut.
- **Öffentliche Aufgabe** — Behörden (Vereine: vorsichtig).
- **Berechtigte Interessen** — abgewogen gegen Rechte; Interessenabwägung schriftlich.

Unterschiedliche Zwecke → unterschiedliche Grundlagen. "Marketing-Mails" und "Login-Codes" nicht vermischen.

## 3. Transparenz (Datenschutzerklärung)

Nennen:

- **Wer** (Verantwortlicher, Kontakt, DSB falls zutreffend).
- **Was** (Datenarten).
- **Warum** (Zwecke) + **Rechtsgrundlage**.
- **Wie lange**.
- **Weitergabe** (Auftragsverarbeiter, Dritte, Drittlandtransfers).
- **Rechte** und Ausübung.
- **Beschwerdestelle** (Aufsichtsbehörde).

Auf **Zielgruppenniveau**, nicht in Juristensprache.

## 4. Datensparsamkeit

- **Minimale** Daten für den Zweck.
- Kein Geburtsdatum "zur Sicherheit", wenn Alterskohorte reicht.
- **Anonymisieren**, wo möglich.
- **Pseudonymisieren**, wo Anonymisierung scheitert.

### Schlecht: datensparsamkeit

```
Newsletter-Anmeldung:
- Vollständiger Name, Adresse, Tel, Geburtsdatum, Geschlecht, Beruf, Einkommen.
```

### Gut: datensparsamkeit

```
Newsletter-Anmeldung:
- Vorname (optional), E-Mail, Themenpräferenz.
```

## 5. Speicherdauer und Löschung

- Pro Datensatz **Retention** definieren.
- Zweck erfüllt → **löschen** oder **anonymisieren**.
- **Automatisieren** (Jobs, Ablaufregeln).
- **Backups** mitdenken—Löschung mit Back-out-Fenster dokumentieren.

## 6. Betroffenenrechte

- **Auskunft**, **Berichtigung**, **Löschung**, **Portabilität**, **Einschränkung**, **Widerspruch**, **Widerruf**.
- **Einen Monat** zur Antwort (einmal verlängerbar).
- **Runbook** haben; Mail-Eingang schulen.

## 7. Auftragsverarbeiter/Verträge

Wer Daten für euch verarbeitet (Mail, CRM, Analytics, Cloud, KI-Anbieter):

- Ihr **Verantwortlicher**, sie **Auftragsverarbeiter**.
- **AVV** (Auftragsverarbeitungsvertrag).
- Prüfen: Sicherheit, Sub-Auftragsverarbeiter, Standort, Löschung bei Kündigung.
- **Drittlandtransfers**: SCC/IDTA oder Angemessenheitsbeschluss.

Siehe [`ki-training-und-scraping.md`](ki-training-und-scraping.md).

## 8. Datenpannen

- **Eindämmen**, Risiko einschätzen.
- **Meldung** an Aufsichtsbehörde innerhalb **72 Stunden**, wenn Risiko.
- **Benachrichtigung** Betroffener bei **hohem** Risiko.
- **Dokumentieren** auch nicht gemeldeter Pannen.
- **Incident-Playbook**: wer untersucht, kommuniziert, entscheidet.

## 9. Verzeichnis und DSFA

- **Verarbeitungsverzeichnis** (Art. 30 DSGVO): was, warum, wie lange, wer sieht.
- **DSFA** bei hohen Risiken (neue Tech, Scale, besondere Kategorien, Scoring, systematische Überwachung).
- Regelmäßig **überprüfen**.

## 10. Was nicht tun

- **Vor-angekreuzte** Consents, gebündelte Einwilligung, Koppelung mit fremden Services.
- Spender-Listen "weiterreichen".
- **Interne Listen** für harmlos halten.
- **Ex-Mitarbeiter-Zugang** stehen lassen.
- Personendaten an neue **KI-Anbieter** ohne AVV und Prüfung.

---

## Kerngedanke
DSGVO ist **Governance anderer Menschen Daten**. Weniger erheben, kürzer halten, Grund nennen, Rechte einlösen, Plan für den Ausfall—alles andere folgt.

## Weiterführend
- [BfDI — Datenschutz-Handbuch](https://www.bfdi.bund.de/)
- [EDSA — Leitlinien](https://edpb.europa.eu/edpb_de)
- [Datenschutzkonferenz — Kurzpapiere](https://www.datenschutzkonferenz-online.de/)
- [CNIL — Templates](https://www.cnil.fr/en)

---

Englische Version: [`gdpr-basics.md`](../../en/ethics-&-legal/gdpr-basics.md)
