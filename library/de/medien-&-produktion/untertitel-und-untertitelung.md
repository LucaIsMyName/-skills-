# Untertitel und Untertitelung

## Geltungsbereich:

**Text auf Video**—Captions (Barrierefreiheit), Untertitel (Übersetzung)—Workflows und Qualität. Ergänzt [`barrierefreiheit-kommunikation.md`](../sprache-&-kommunikation/barrierefreiheit-kommunikation.md), [`video-produktion-grundlagen.md`](video-produktion-grundlagen.md) und [`podcasting-grundlagen.md`](podcasting-grundlagen.md).

## Exzerpt

- **Captions** für viele Nutzer\*innen **pflichtnah**—wo möglich **default an**.
- **Genauigkeit** vor Geschwindigkeit—**Namen** und **Fachbegriffe** prüfen.
- **Sprecher\*innen** kennzeichnen; **Geräusche** in Klammern, wenn relevant.
- **Eingebrannt** vs. **Sidecar** (SRT/VTT)—pro Plattform.
- **Auto** nur als **Erstentwurf**—**editieren**.

## Vor Veröffentlichung

### Konkret

- **Glossar** für Namen/Begriffe.
- **Sprachvarianten** falls nötig.

### Meta

- Schlechte Untertitel **schließen aus** und **verfälschen**.

---

## Zweck

Gesprochenes **zugänglich** und **präzise** machen.

---

## 1. Captions als Standard, nicht Zusatz

### Regel

**Untertitel** mit jedem öffentlichen Video **mitliefern**; in Playern **aktivieren**, wo UX es erlaubt—**aus** als Default schließt Menschen aus.

### Gut: captions als standard, nicht zusatz

```text
„Kann man ja einschalten“—aber Default aus und keine Datei hochgeladen.
```

### Gut: captions als standard, nicht zusatz

```text
VTT angehängt; Player startet mit Untertiteln wo möglich; nur eingebrannt, wenn Plattform nichts anderes erlaubt.
```

## 2. Auto-Untertitel editieren—zweistufiges QA

### Regel

**ASR** als erste Fassung; **menschlicher** Durchgang für **Namen**, **Homophone**, **Timing**; **stumm** ansehen, ob Sinn stimmt.

### Gut: auto-untertitel editieren—zweistufiges qa

```text
Auto-Untertitel ohne Prüfung hochladen.
```

### Gut: auto-untertitel editieren—zweistufiges qa

```text
Zwei Durchgänge: Inhalt + Timing; stumm mitlesen; Glossar für Projektbegriffe.
```

## 3. Sprecher-Labels und Sound-Hinweise

### Regel

**Sprecher-IDs** bei mehreren Personen; **nicht-sprachliche** Geräusche nur in **[Klammern]**, wenn fürs Verständnis nötig.

### Gut: sprecher-labels und sound-hinweise

```text
Alles „Sprecher“ oder falsche Namen aus ASR.
```

### Gut: sprecher-labels und sound-hinweise

```text
Alex: Willkommen…
Sam: Danke…
[Tür fällt zu] (nur wenn relevant für die Handlung)
```

## 4. Sidecar statt eingebrannt

### Regel

**SRT/VTT** bevorzugen, damit Nutzer\*innen **Größe**, **Stil** und **Übersetzung** wählen—Einbrennen nur bei Plattform- oder Autoplay-Zwang.

### Gut: sidecar statt eingebrannt

```text
Harte kleine weiße Schrift auf unruhigem Bild—nicht lesbar, nicht steuerbar.
```

### Gut: sidecar statt eingebrannt

```text
VTT fürs Web; optionales Einbrennen für Instagram mit kontrastreichem, sicherem Styleguide.
```

## 5. Untertitel für Übersetzung

### Regel

**Übersetzung** ist Untertitel mit **kulturellem** Pass—**Zeilenlänge** und **Lesegeschwindigkeit**; keine wörtlich falschen Register.

### Gut: untertitel für übersetzung

```text
Maschinell alles übersetzt; falsches Sie/du.
```

### Gut: untertitel für übersetzung

```text
Übersetzer:in mit Tonalitäts-Brief; max. Zeichen/Zeile nach Spec; Review durch Muttersprachler*in.
```

## 6. Zitate nicht umschreiben ohne Regel

### Regel

Captions sollten **gesprochenen** Wortlaut treffen—**bei News** und **Zeugnissen**; **Verkürzen** nur mit Redaktionskriterium.

### Gut: zitate nicht umschreiben ohne regel

```text
Zitate in Captions „klarer“ umschreiben ohne Policy.
```

### Gut: zitate nicht umschreiben ohne regel

```text
Standard: wörtlich; bei vereinfachter Lesestufe kennzeichnen und bei sensiblen Zeilen Freigabe.
```

---

## Typische Stolpersteine

- **Timing** drift—Untertitel 2 s zu spät; für manche schlimmer als gar nicht.
- **NUR GROSSBUCHSTABEN** oder **unleserliche** Styles—Plattform-Defaults oder markenkonforme Barrierefreiheit nutzen.
- **Songtexte** fehlen, wenn sie Bedeutung tragen—**gleicher** Zugang.
- **Falsches** Sprach-Tag—falsche Schrift oder Richtung.

---

## Kerngedanke

Untertitel sind **Teil der Botschaft**—**Genauigkeit**, **Timing**, **Inklusion**.

## Weiterführend

- [W3C — Captions](https://www.w3.org/WAI/media/av/captions/) — Überblick
- [W3C — 1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) — Erfolgskriterium
- [BBC — Subtitle guidelines](https://www.bbc.co.uk/accessibility/forproducts/guides/subtitles) — Timing und Sprecher-Konventionen

---

Englische Version: [`subtitles-and-captions.md`](../../en/media-&-production/subtitles-and-captions.md)
