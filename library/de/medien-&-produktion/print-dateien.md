# Print-Dateien

**Geltungsbereich:** **Export** für Druck—Beschnitt, Auflösung, PDF-Einstellungen—im NGO-Maßstab. Ergänzt [`marken-toolkit-und-asset-bibliothek.md`](marken-toolkit-und-asset-bibliothek.md), [`dateinamen-und-organisation.md`](dateinamen-und-organisation.md) und [`folien-und-praesentationen.md`](../design/folien-und-praesentationen.md).

## Exzerpt

- **Beschnitt** und **Sicherheitsabstand**.
- **Raster** ca. **300 dpi** in **Endgröße**.
- **Schriften** lizenzkonform **einbetten** oder **pfaden**.
- **Farbe**: **CMYK/PMS** nach Druckerei—**RGB** täuscht.
- **Proof** nach **PDF/X** oder Druckerei-Vorgabe.

## Vor dem Export

### Konkret

- **Endformat**, Falz, **Sonderfarben**.
- **Druckerei**-Datenblatt.

### Meta

- Saubere **Master** sparen **Nachdruck**.

---

## Zweck

**Ein** korrektes Paket an die **Druckerei**—ohne teure Überraschungen.

---

## 1. Beschnitt und Sicherheitszone

### Regel

**Hintergründe** über den Endformat hinaus (oft **3 mm Beschnitt**); **Text und Logos** in **Sicherheitsabstand**—nichts Kritisches am Schnitt.

### Bad

```text
Text 1 mm vom Rand—Toleranz der Schnittkante frisst Buchstaben.
```

### Good

```text
3 mm Beschnitt am Hintergrund; 5 mm Innenabstand für Typo; Hilfslinien im PDF geprüft.
```

## 2. Auflösung in Endgröße

### Regel

Rasterbilder **~300 dpi** in **Druckgröße**—**1080px** breites Foto auf **A3**-Plakat = Brei.

### Bad

```text
1080px breites JPG auf A3 gestreckt.
```

### Good

```text
Foto für finalen Ausschnitt auf 300 dpi neu berechnet; Logo vektorisiert wo möglich.
```

## 3. Farbe: CMYK oder PMS nach Brief

### Regel

Entwurf und Export in **CMYK** oder **Sonderfarbe** nach **Druckprofil**—**RGB** auf dem Bildschirm **weicht** auf der Presse ab.

### Bad

```text
RGB-Export für Offset ohne Absprache mit Druckerei.
```

### Good

```text
FOGRA oder ICC der Druckerei; Pantone für Markenrot; Softproof vor Versand.
```

## 4. Schriften: einbetten, pfaden oder liefern

### Regel

Nach **Druckerei-Vorgabe**: **Subset-Einbettung** oder **Pfade**; **Lizenz** für **Outline**-Lieferung prüfen.

### Bad

```text
Fehlende Schrift—Druckerei ersetzt; Layout bricht.
```

### Good

```text
PDF mit eingebetteten Fonts nach Spec; Lizenz-Hinweis in der Übergabe-Mail.
```

## 5. Ein freigegebenes PDF-Paket

### Regel

**Eine** PDF/X-Datei (z. B. **PDF/X-1a** oder Druckereivariante); **Ebenen** nur wenn gewünscht; **Preflight** ohne Fehler.

### Bad

```text
Native InDesign + lose Links—Druckerei berechnet Nacharbeit.
```

### Good

```text
PDF/X-1a; 3 mm Beschnitt; Passmarken außerhalb des Livebereichs; Proof-Abzug geprüft.
```

---

## Typische Stolpersteine

- **Rich Black** falsch aufgebaut—**schlammige** Grautöne oder Passer-Probleme.
- **RGB-Schwarz** für Text—**Vierfarb-Schwarz** auf kleiner Schrift.
- **Low-Res-Logos** hochgerechnet—**zackig** auf Plakat.
- **Letzte** Textänderung im **flattened** PDF—voller Neu-Export.

---

## Kernidee

Druck ist **Physik**—**Millimeter**, **Punkte**, **Tinte**—**Spec** lesen.

## Weiterführend

- [Adobe Hilfe — Print](https://helpx.adobe.com/) — toolbezogene Exporte
- [Ghent PDF Workgroup](https://www.gwg.org/) — PDF-Standards für Druck
- [ISO — PDF/X](https://www.iso.org/standard/38920.html) — wenn Druckerei PDF/X verlangt

---

Englische Version: [`print-ready-files.md`](../../en/media-&-production/print-ready-files.md)
