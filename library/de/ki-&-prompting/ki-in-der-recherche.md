# KI in der Recherche

**Scope:** Gilt für **LLMs in Recherche**—Literaturscans, Interview-Zusammenfassungen, qualitative Kodierung, Umfrageentwürfe, Hypothesenbildung. Nicht Statistik (echte Tools), nicht peer-reviewed Methodik. Kombiniere mit [`prompten-grundlagen.md`](prompten-grundlagen.md), [`rag-grundlagen.md`](rag-grundlagen.md), [`desk-research.md`](../recherche-&-analyse/desk-research.md), [`quellenpruefung-und-faktencheck.md`](../recherche-&-analyse/quellenpruefung-und-faktencheck.md), [`qualitative-codierung.md`](../recherche-&-analyse/qualitative-codierung.md) und [`llm-output-bewerten.md`](llm-output-bewerten.md).

## Excerpt

- **KI hilft beim Denken; sie weiß nichts**. Output = **Hypothese**, nicht Befund.
- **Grundieren** mit deinen Quellen—nie aus dem Gedächtnis.
- **Zitieren** jede Aussage aus einer von dir gelesenen Quelle.
- **Datenschutz**: keine rohen Transkripte, PII, unveröffentlichten Daten in ungeprüfte Tools.
- **Reproduzierbarkeit**: Prompts, Modell, Datum loggen.
- Workflows und Fehlerarten unten.

## Vor dem Einsatz

### Konkret

- Welche **Frage**, für wen?
- Welche **Quellen** erlaubt, teilbar?
- **Evidenzniveau**—journalistisch, wissenschaftlich, intern?
- Was würde dich **umstimmen**?

### Meta

- LLMs sind **schön plausibel**. Plausibel ≠ wahr.
- Eloquent falsch ist schlimmer als keine Antwort.

---

## Zweck

Rechercheaufgaben **beschleunigen**—mit Quellen, prüfbar, reproduzierbar.

---

## 1. Wofür KI in Recherche taugt

- Dokumente in vorgegebener Form zusammenfassen.
- **Qualitatives Kodieren** gegen deinen Codebook.
- **Extraktion** strukturierter Felder aus Text.
- **Entwürfe** für Interviewguides, Umfragen, Hypothesen.
- **Kritik** an Entwürfen (Lücken, Unschärfen).
- **Übersetzungen** roher Notizen (Muttersprachler-Review).

## 2. Wofür *nicht*

- **Zitate** aus dem Gedächtnis—oft selbstsicher erfunden.
- **Statistiken** jenseits des Zählens gelieferter Inputs.
- **Neue Fakten**—nicht im Input = kein Beleg.
- **Fachurteil** in Spezialgebieten.
- **Meta-Analyse**.

## 3. Alles grundieren

**Closed-Book**-Prompts bevorzugt—siehe [`rag-grundlagen.md`](rag-grundlagen.md).

### Schlecht

```text
Was sagt die Forschung zu Jugend-Mental-Health in Deutschland?
```

### Gut

```text
Extrahiere NUR aus den folgenden Quellen alle Aussagen zu Jugend-MH in DE.

Pro Aussage:
- wörtliches Zitat,
- Quellenlabel,
- Seite/Abschnitt.

Widersprüche markieren. Unklares: "unklar", nicht umschreiben.

Quellen:
[A, RKI, abgerufen 2025-03-01]
<einfügen>

[B, BARMER-Report, abgerufen 2025-03-01]
<einfügen>
```

## 4. Desk-Research-Loop

Siehe [`desk-research.md`](../recherche-&-analyse/desk-research.md).

1. **Frage** definieren (Mensch).
2. **Quellen finden** (Mensch; KI kann Suchbegriffe vorschlagen).
3. **Lesen/Notieren** (Mensch; KI kann zusammenfassen).
4. **Synthetisieren** (KI-Map-Reduce mit Belegen).
5. **Prüfen** (Mensch).
6. **Aufschreiben** (Mensch).

## 5. Qualitative Kodierung mit KI

- **Codebook** selbst schreiben (Definitionen, Ein-/Ausschluss, Beispiele).
- KI wendet pro Einheit an.
- Auf einem von Menschen kodierten Subset **validieren** (siehe [`qualitative-codierung.md`](../recherche-&-analyse/qualitative-codierung.md)).
- **Disagreement-Log**—dort wohnt der Erkenntnisgewinn.

### Gut

```text
Wende folgendes CODEBOOK auf jedes ZITAT an.
JSON: { "quote_id": string, "codes": string[], "notes": string }

CODEBOOK (wörtlich):
- C1 "Zugangsbarriere" — Zeit, Kosten, Ort, Wartezeit.
- C2 "Vertrauen" — explizit zu Personal/Dienst/Info.
- C3 "Stigma" — explizit Scham/Urteil/Verheimlichung.

Regeln:
- Nur klar belegte Codes. Keine neuen.
- Nichts passt → codes: [].
```

## 6. Literaturscans

- KI entwirft **Suchstrategie** (Begriffe, Booleans)—du verfeinerst.
- KI-Listen mit Zitaten **nicht** blind übernehmen: in echten Indizes nachprüfen (PubMed, Scopus, Google Scholar, DNB).
- Pro behaltene Quelle: Zitation, Abstract, Link, Zugriffsdatum.

## 7. Map-Reduce-Synthese

```text
Map:
Pro Quelle: Frage(n), Methode, Sample, Befunde, Limitationen. JSON.

Reduce:
JSON-Liste → Narrativ mit Übereinstimmungen, Widersprüchen, Lücken.
Quellen per ID zitieren.
```

Map-Outputs aufbewahren—das ist der **Prüfpfad**.

## 8. Datenschutz und Ethik

- **Nie** Transkripte, Kinderschutznotizen, PII in ungeprüfte Tools.
- **Enterprise/No-Training** für Internes.
- Transkripte **lokal**; nur **geschwärzte** Auszüge teilen.
- [`dsgvo-grundlagen.md`](../ethik-&-recht/dsgvo-grundlagen.md) und Ethik-Prozess.

## 9. Reproduzierbarkeit

- Modell, Version, Datum, Prompt, Seed (falls unterstützt), Temperatur loggen.
- Inputs + Outputs im Notebook.
- **Drift** erwarten—selber Prompt, andere Antwort.

## 10. Was nicht tun

- "Literaturreviews" mit erfundenen Zitaten.
- KI-Output als **Primärquelle**.
- KI-Kodierung skalieren **ohne** Validierungssubset.
- **Unanonymisierte** Daten online pasten.

---

## Core idea

KI ist ein **schnelles, wortgewandtes Praktikum in der Bibliothek**: sie summiert, was du ihr zeigst, und schlägt Muster vor. Sie weiß nichts. Jede Aussage braucht eine geprüfte Quelle.

## Further reading

- [Elicit](https://elicit.com/)
- [Cochrane Handbook](https://training.cochrane.org/handbook)
- [UK Statistics Authority — Code of Practice](https://code.statisticsauthority.gov.uk/)
- [ICO — AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/)

---

Englische Version: [`using-ai-for-research.md`](../../en/ai-&-prompting/using-ai-for-research.md)
