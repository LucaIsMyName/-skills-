# Open-Source-Lizenzen

**Scope:** Gilt für **Nutzung, Beitrag, Veröffentlichung** von Open-Source-Code—Lizenz wählen, fremde respektieren, Attribution, Copyleft, Dual-Licensing, Contributor-Agreements. Kein Patent-/Markenrecht, kein Compliance-Programm. Kombiniere mit [`git-und-commits.md`](../coding/git-und-commits.md), [`ki-training-und-scraping.md`](ki-training-und-scraping.md), [`llms-im-code-nutzen.md`](../coding/llms-im-code-nutzen.md) und [`dsgvo-grundlagen.md`](dsgvo-grundlagen.md).

## Excerpt

- **Jede Dependency hat eine Lizenz**—wissen, welche.
- **Permissiv (MIT/BSD/Apache)** vs **Copyleft (GPL/AGPL/MPL)**—Pflichten verstehen.
- **Attribution** fast immer nötig; `NOTICE`/`THIRD_PARTY_LICENSES` mitliefern.
- **Eigener Release**: Standard-Lizenz wählen; keine Eigenbauten.
- **AI-gemischter Code** erbt Risiko; Quellen dokumentieren.
- Checkliste und häufige Lizenzen unten.

## Vor der Dependency-Adoption

### Konkret

- Welche **Lizenz** hat jede direkte/transitive Abhängigkeit?
- Erlaubt sie euren Einsatz (Closed-Source, SaaS, Redistribution)?
- Was **verpflichtet** sie (Attribution, Source-Pflicht, Patent-Klausel)?
- Gibt es **Ausnahmen** (LGPL-Linking, Classpath)?

### Meta

- Lizenzen sind **Verträge**; "machen doch alle" ist keine Verteidigung.
- Die hartnäckigsten Bugs sind Lizenzen, nicht Code.

---

## Zweck

Arbeit anderer respektieren, eigene Release-Optionen offen halten, Compliance-Überraschungen vermeiden.

---

## 1. Lizenz-Landkarte

**Permissiv**: MIT, BSD-2/3, Apache 2.0 (mit Patent-Grant), ISC.
**Schwaches Copyleft**: LGPL (typ. Libraries), MPL 2.0 (file-level), EPL 2.0.
**Starkes Copyleft**: GPL-2.0/3.0 (Distribution triggert), AGPL-3.0 (Netz-Nutzung = Distribution).
**Nicht-OSI / Source-Available**: BUSL, SSPL, Elastic License, Commons Clause—genau lesen.

Creative Commons (Content, nicht Code): CC0, CC-BY, CC-BY-SA, CC-BY-NC. **Keine CC auf Software.**

## 2. Permissiv vs Copyleft — bewusst wählen

- **Permissiv**: "nutze frei, nenn mich". Gut für breite Adoption.
- **Copyleft**: "nutze, aber teile zurück". Gut für Community-Beiträge.
- **AGPL** zielt auf SaaS: modifizierte Version als Netzdienst → Source offenlegen.

## 3. Bei Nutzung

- **Inventar** automatisieren (`license-checker`, `pip-licenses`, `cargo-about`, `licensee`).
- Lizenzen auf **Lockfile-Ebene** erfassen.
- **Allowlist** in CI; Rest blocken.
- **NOTICE**/`THIRD_PARTY_LICENSES` mitliefern.

## 4. Eigene Veröffentlichung

- Bewährte Lizenz: **MIT**, **Apache-2.0**, **GPL-3.0**.
- `LICENSE` im Repo-Root.
- Header in Source-Files (kurz).
- README: "Licensed under MIT".
- Lizenz-Wechsel später ist **schwer**.

## 5. Contributions: DCO vs CLA

- **DCO**: `Signed-off-by:`; leicht.
- **CLA**: volle Rechteübertragung; schwerer, für Projekte mit Relizenzierungsoption.
- Meist: **DCO**.

## 6. Attribution/Notice/State of Changes

- Urheber/Copyright-Notices **nicht strippen**.
- Apache 2.0: `NOTICE` bei Redistribution mitliefern.
- Copyleft-Änderungen **dokumentieren** (`CHANGES`, Commit-Log).
- Content/Medien: CC-Attribution-Format beachten.

## 7. Kombinieren — sicher und unsicher

- **GPL in Proprietär linken** = alles unter GPL redistributieren.
- **LGPL**-Libs dynamisch linken i. d. R. ok; statisch mit Einschränkungen.
- **Apache 2.0 + GPL-2.0** kann inkompatibel sein; Apache 2.0 + GPL-3.0 ok.
- **Copyleft durch APIs?** GPL eng, AGPL weit (Netz-Nutzung).

Im Zweifel: Projektmentoren / Anwaltschaft.

## 8. AI-generierter Code

- Behandelt wie **unklare Herkunft**—kann lizenzierte Fragmente reproduzieren.
- Assistenten mit Attribution/Audit bevorzugen.
- Änderungen klein genug halten zum **Review**.
- Offenlegung per [`ki-offenlegung-und-richtlinien.md`](ki-offenlegung-und-richtlinien.md).
- Bewegliche Rechtsfläche—bei **Copyleft**-Snippets vorsichtig.

## 9. Marken/Endorsement

- Lizenz deckt Code, **nicht** Marken.
- Keine Endorsement suggerieren.
- "Built with X" meist ok; Logo ohne Erlaubnis nicht.

## 10. Was nicht tun

- **Lizenz-Header** "zum Aufräumen" entfernen.
- GPL in Proprietär mischen, "merkt schon keiner".
- Ohne `LICENSE` shippen—Ambiguität ist Risiko.
- CC als Software-Lizenz nutzen.
- Snippets aus SO/AI blind in Core-Code.

---

## Core idea

Open Source ist ein **Geschenk mit Regeln**. Inventar halten, Attribution respektieren, Standard-Lizenz beim eigenen Release, gemischte Herkunft (AI) so sorgfältig wie Sicherheit behandeln.

## Further reading

- [choosealicense.com](https://choosealicense.com/)
- [OSI — Approved licences](https://opensource.org/licenses)
- [SFC — GPL compliance](https://sfconservancy.org/copyleft-compliance/)
- [FOSSA — Licence compliance guide](https://fossa.com/blog/open-source-licensing-guide/)

---

Englische Version: [`open-source-licenses.md`](../../en/ethics-&-legal/open-source-licenses.md)
