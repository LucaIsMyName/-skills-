# Barrierefreiheit in der Kommunikation

**Geltungsbereich:** **Barriereärmere Texte und Medien** für Web und Social (Alternativtexte, Überschriften, Links, Untertitel);

## Exzerpt (zuerst lesen)

- Nutzen, wenn **Texte, Bilder oder Videos** so aufbereitet werden sollen, dass mehr Menschen sie wahrnehmen und verstehen können.
- **Alternativtext** beschreibt sinnstiftende Bilder; **Ziergrafiken** entsprechend kennzeichnen.
- **Überschriften** logisch verschachteln; **Linktexte** auch ohne Kontext verständlich.
- Ausführliche Regeln und Checkliste unten; **kein** Ersatz für WCAG-Audit oder behördliche Konformität.

## Zweck

Dieser Skill unterstützt **Kommunikationsteams** bei **inklusiverer** Gestaltung von Newslettern, Webtexten und Social-Media-Inhalten—als Praxisorientierung, nicht als Rechtsberatung.

## KI / Prompt: Vollständigkeit vor dem Schreiben

### Konkret

- **Kanal** (CMS-Seite, E-Mail-HTML, LinkedIn, Instagram …)
- **Bilder:** vorhanden oder Platzhalter; welche transportieren Information?
- **Video:** Untertitel geplant? welche Sprache?
- **Ziel-URLs** für Linktext-Umschreibungen

### Meta

- **Zielgruppen** (z. B. Screenreader, einfache Sprache)
- **Vorlagen** der Organisation (barriereärmere Templates—Nutzer fragen)

---

## Grundregeln

### 1. Alternativtext für sinnstiftende Bilder

### ❌ Schlecht

```text
Alt: bild1.jpg
```

### ✅ Gut

```text
Alt: Freiwillige übergibt vor dem Gemeindezentrum ein Lebensmittelpaket an eine Person.
```

---

### 2. Ziergrafiken

Rein dekorative Grafiken im CMS bzw. HTML nach Vorgabe kennzeichnen (z. B. `alt=""` wo sachgerecht)—Plattformdokumentation beachten.

---

### 3. Überschriften-Hierarchie auf Webseiten

Pro Seite **eine** logische H1; Ebenen nicht sinnlos überspringen.

### ❌ Schlecht

```text
<h1>Unsere Arbeit</h1>
<h4>Bildungsprogramm</h4>   <!-- h2/h3 ausgelassen -->
```

### ✅ Gut

```text
<h1>Unsere Arbeit</h1>
<h2>Bildungsprogramm</h2>
<h3>Nachmittags-Mentoring</h3>
```

---

### 4. Linktext: im Kontext verständlich

### ❌ Schlecht

```text
Hier klicken für mehr Infos.
```

### ✅ Gut

```text
Jahresbericht 2025 lesen (PDF).
```

---

### 5. Untertitel bei Video

Sprache **untertiteln**; bei wichtigen rein visuellen Informationen ggf. **Audiodeskription**—Organisationsrichtlinien und Aufwand klären.

---

## Checkliste vor Veröffentlichung

- [ ] Informative Bilder mit **aussagekräftigem Alternativtext**; Dekoration nach Vorgabe
- [ ] **Logische Überschriften** auf Webseiten
- [ ] Links benennen **Ziel oder Aktion**
- [ ] **Untertitel** für Video geplant oder bewusst ausgeschlossen
- [ ] Nutzerin darauf hingewiesen, wenn **gesetzliche Barrierefreiheitsanforderungen** Prüfung brauchen

---

## Abschließender Gedanke

👉 Barrierefreie Kommunikation ist **Daueraufgabe**. Sinnvoll kombinieren mit **respektvoller Sprache** und **Einfache Sprache** in diesem Repo.
