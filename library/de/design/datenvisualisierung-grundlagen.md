# Datenvisualisierung (Grundlagen)

**Geltungsbereich:** **Diagramme und Datengrafiken** in Dashboards und Berichten (Web oder statisch); keine vollständige Statistik oder BI-Konfiguration.

## Exzerpt

- Nutzen für **Diagrammwahl**, Achsenbeschriftung und **Farbe** ohne verzerrte Bedeutung.
- **Klare Titel** in Alltagssprache; **Unsicherheit** anzeigen, wenn relevant.
- **Barrierefreiheit:** Kategorien nicht nur über Farbe unterscheiden; wo möglich Tabelle oder Beschriftung.
- NGO-Kontext: **Wirkungskennzahlen** ohne Sensationsjournalismus.

## Zweck

Dieses Dokument unterstützt **ehrliche, lesbare** Datenvisualisierungen für **Wirkungsdashboards, Jahresberichte und interne Steuerung**.

## Vollständigkeit vor dem Schreiben

### Konkret

- **Datentyp** (Trend, Vergleich, Anteil, Verteilung)
- **Zielgruppe** (Öffentlichkeit, Vorstand, Team)
- **Zahlenformat** und **Einheiten**

### Meta

- **Risiko** der Fehlinterpretation (kumuliert vs. pro Periode)

---

## Grundregeln

### 1. Diagrammtyp zur Frage passen

| Frage | Oft sinnvoll |
|--------|----------------|
| Entwicklung über Zeit | Linie oder Säulen |
| Kategorien vergleichen | Balken (horizontal bei langen Labels) |
| Anteil am Ganzen (100 %) | Gestapelte Balken oder Kreis nur bei wenigen Segmenten |
| Zusammenhang | Streudiagramm |

### ❌ Schlecht

```text
Kreisdiagramm mit 12 ähnlichen Segmenten; 3D-Effekt für „Wirkung“.
```

### ✅ Gut

```text
Sortiertes Balkendiagramm „Top 5 Programme nach Teilnehmenden“; klarer Titel.
```

---

### 2. Achsen und Einheiten

- Bei **Zähl-Säulen** oft bei **null** starten—außer begründet gekappt.
- **Einheiten** in Achsenbeschriftung oder Untertitel (z. B. „Tsd. EUR“).

---

### 3. Farbe für Kategorien, nicht für „grün = gut“

Vermeiden, **moralische** Qualität nur über Grün–Rot zu suggerieren, außer die Metrik ist eindeutig gut/schlecht.

---

### 4. Beschriftung und Ballast

- **Direkte Beschriftungen** an Marken, wenn lesbar.
- Raster reduzieren; kein dekorativer „Chart-Schmuck“.

---

### 5. Barrierefreiheit

- **Legende** oder Text, nicht nur Farbe.
- **Kurzfassung** der Aussage für Screenreader oder **Alt-Text** mit Kernerkenntnis.

---

## Checkliste

- [ ] Diagrammtyp passt zur **Frage** und Datenform
- [ ] Achsen, Einheiten und Zeitraum **explizit**
- [ ] Keine irreführende Kürzung oder **Doppelachsen** ohne klare Erklärung
- [ ] Farbe in Graustufen und bei häufigen **Farbsicht**-Einschränkungen lesbar
- [ ] **Quelle und Stand** der Daten bei externer Veröffentlichung

---

## Abschließender Gedanke

👉 Ein Diagramm ist ein **Argument**. Die Behauptung muss **zum Datenstand passen**.

## Weiterführende Links

- [From Data to Viz](https://www.data-to-viz.com/) — Diagrammwahl nach Datenform
- [Our World in Data — FAQs](https://ourworldindata.org/faqs) — transparente Bezugnahme auf Quellen (für NGO-Berichte adaptierbar)
- [W3C WAI — Tutorial zu komplexen Bildern](https://www.w3.org/WAI/tutorials/images/complex/) — Alternativtexte und Ausweichbeschreibungen für Datengrafiken

