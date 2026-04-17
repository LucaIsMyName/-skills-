# Motion und Micro-Interactions

**Geltungsbereich:** **Bewegung in der UI**: Übergänge, Feedback-Animationen, Ladezustände; keine Videoproduktion, Spielanimation oder TV-Spots.

## Exzerpt (zuerst lesen)

- Motion nutzen, um **Ursache und Wirkung** zu verdeutlichen, nicht zur Dekoration.
- **`prefers-reduced-motion`** respektieren: nicht-animierte Alternative anbieten.
- Dauern oft **kurz** (ca. 150–300 ms für UI); kein großes Parallax in Aufgabenflows.
- Regeln und Checkliste unten. Siehe auch [`gute-interfaces-designen.md`](gute-interfaces-designen.md).

## Zweck

Dieser Skill leitet ein, **wann und wie** Bewegung in Oberflächen sinnvoll ist—ohne Ablenkung und ohne Ausschluss von Nutzerinnen.

## Vollständigkeit vor dem Schreiben

### Konkret

- **Plattform** (Web, nativ) und **technische Grenzen** (nur CSS, Lottie, …)
- **Reduced-Motion**-Einstellung (unterstützt annehmen)

### Meta

- **Ton** (ruhiges Produkt vs. verspieltes Marketing-UI)

---

## Grundregeln

### 1. Zweck zuerst

### ❌ Schlecht

```text
Alles animiert beim Hover, weil es „lebendig“ wirkt.
```

### ✅ Gut

```text
Button drückt sich leicht ein zur Bestätigung; Panel fährt ein, weil es von einem klaren Control kommt.
```

---

### 2. Opacity und Transform bevorzugen

Typisch **GPU-freundlich** und weniger holprig als Layout-Animation (Breite, Höhe, top).

---

### 3. Easing: linear oft unpassend

**Ease-out** beim Einblenden, **ease-in** beim Ausblenden; **ease-in-out** für kleine Zustandswechsel.

---

### 4. Reduzierte Bewegung

Bei Wunsch nach weniger Bewegung: **sofortiger Zustandswechsel** oder **nur Opacity**-Crossfade.

---

### 5. Ladezustände

Wo möglich **fortschrittsbasiert**; **Skeleton** für Struktur; keine Endlosspinner bei langen Tasks ohne Rückmeldung.

---

## Checkliste

- [ ] Jede Animation hat einen **Grund** (Feedback, Orientierung, zurückhaltende Freude)
- [ ] Dauer und Easing bei **häufigen** Aktionen dezent
- [ ] Pfad für **reduzierte Bewegung** definiert
- [ ] Keine **wesentliche** Information nur in der Animation
- [ ] Performance: teure Properties auf großen Flächen vermeiden

---

## Abschließender Gedanke

👉 Motion soll **„Was ist passiert?“** beantworten—wenn es nur **„Schau mich an“** sagt, streichen.
