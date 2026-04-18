# Live-Events und Streaming

**Geltungsbereich:** **Live**-Veranstaltungen und **Streams**—Ablauf, Redundanz, Barrierefreiheit, Sicherheit. Ergänzt [`video-produktion-grundlagen.md`](video-produktion-grundlagen.md), [`untertitel-und-untertitelung.md`](untertitel-und-untertitelung.md) und [`krise-und-sensible-themen.md`](../sprache-&-kommunikation/krise-und-sensible-themen.md).

## Exzerpt

- **Ablauf** mit **Ownern** und **Zeiten**.
- **Redundanz**: Backup-**Internet**, **Audio**, **Folien**.
- **Moderation** von Chat/Q&A—**Spam** und **Schutz**.
- **Barrierefreiheit**: **Live-Transkript**/Captions wo möglich.
- **Aufzeichnung**—**Einwilligung** der Sprecher*innen.

## Vor Live

### Konkret

- **Probe** mit gleicher Technik; **Latenz** testen.
- **Eskalation** bei Technik und **Schutz**fällen.

### Meta

- Live **verstärkt** Fehler—**Prozess** reduziert Panik.

---

## Zweck

**Stabile**, **inklusive** Live-Erlebnisse—**planbar** für Hosts, **sicher** fürs Publikum.

---

## 1. Ablauf mit Ownern und Timecodes

### Regel

**Wer wann** spricht, **Folien**-Wechsel und **Übergänge** dokumentieren—**inkl.** Plan B, wenn jemand ausfällt.

### Bad

```text
„Lösen wir live.“
```

### Good

```text
Ablauf: 00:00 Host-Intro (Alex); 00:05 Folien (Sam); 05:00 Q&A (Moderation); Backup-Host: Jordan bei Alex-Ausfall.
```

## 2. Redundanz: Internet, Audio, Folien

### Regel

**Kabel**-Uplink oder gebündeltes LTE; **paralleler** Audio-Recorder; **offline**-PDF der Folien bei Moderation.

### Bad

```text
Ein WLAN-Hop ohne Backup.
```

### Good

```text
Ethernet zum Router; LTE-Failover; Backup-Recorder auf dem Tisch; Folien als PDF + lokale Kopie beim Vortragenden.
```

## 3. Probe mit gleicher Technik

### Regel

**Generalprobe** mit denselben Mikros, **OBS**- oder Encoder-Einstellungen und **gemessener** Plattform-Latenz.

### Bad

```text
Probe mit Laptop-Mikro; Live-Tag anderes Interface—Feedback und Pegel unbekannt.
```

### Good

```text
Trockenlauf Dienstag mit gleichem Rack; Round-Trip-Delay notiert; Monitor-Mix für Host angepasst.
```

## 4. Moderation: Chat, Q&A, Schutz

### Regel

**Moderator:in** weiß, **was** laut vorgelesen wird, **Spam**-Regeln und **Eskalation** bei Belästigung oder Schutzfällen.

### Bad

```text
Host liest jeden Chat live—mit beleidigendem oder identifizierendem Inhalt.
```

### Good

```text
Moderation filtert; nur geprüfte Fragen an die Bühne; Schutz-Lead bei Gelb/Rot erreichbar.
```

## 5. Barrierefreiheit: Captions und Transkript

### Regel

**Plattform-Captions** oder **Live-Transkript** (Mensch/ASR) wo Qualität reicht; **Transkript** nachreichen, wenn nicht live.

### Bad

```text
Kein Untertitel-Pfad—öffentliches Webinar ohne Zugang für gehörlose Nutzer*innen.
```

### Good

```text
Live-Captions via Anbieter oder Plattform; nach Event VTT hochladen; Aufzeichnungsseite verlinkt Transkript.
```

## 6. Aufzeichnung und Einwilligung der Sprecher*innen

### Regel

**Einwilligung** zu **Aufzeichnung**, **Verbreitung** und **Kurzclips**—**besonders** bei Fundraising-Nutzung.

### Bad

```text
Aufzeichnung auf YouTube ohne Wissen der Redner*innen.
```

### Good

```text
Einwilligung: Live OK; VOD 90 Tage; keine Kurzclips für Ads ohne Nachzeichnung—im Ablaufprotokoll.
```

---

## Typische Stolpersteine

- **Stream-Key** geleakt—Keys nach öffentlichen Tests rotieren.
- **Keine** Stumm-Disziplin—heiße Mikros fangen private Gespräche.
- **Folien** 4:3 im 16:9-Stream—Text und Logos beschnitten.
- **Plattform-Verzögerung** ignoriert—Host redet Gast aus der Ferne rein.

---

## Kernidee

Live = **Logistik + Empathie**—**proben**, **backupen**, **moderieren**, **untertiteln**.

## Weiterführend

- [OBS Project](https://obsproject.com/) — gängige Streaming-Doku
- [W3C — Live captions](https://www.w3.org/WAI/media/av/captions/) — Barrierefreiheits-Kontext
- [Internet Society](https://www.internetsociety.org/) — Resilienz-Ideen; an eigenen Stack anpassen

---

Englische Version: [`live-events-and-streaming.md`](../../en/media-&-production/live-events-and-streaming.md)
