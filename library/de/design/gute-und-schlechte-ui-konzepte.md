# Gute und schlechte UI-Konzepte (ASCII-Muster)

**Geltungsbereich:** Schnelle **visuelle und räumliche Muster**, die unterstützende UI von verwirrender UI unterscheiden—hilfreich für Übergaben, Reviews und für Werkzeuge, die **literale Skizzen** von Design-Intention brauchen. Ergänzt [`gute-interfaces-designen.md`](gute-interfaces-designen.md), [`design-basics.md`](design-basics.md) und [`formulare-und-eingaben-ux.md`](formulare-und-eingaben-ux.md).

## Exzerpt

- **Eine primäre Aktion pro Bildschirm.** Happy Path offensichtlich machen; destruktive Alternativen zurückstufen oder ausblenden.
- **Hierarchie schlägt Dekoration.** Titel → Kurzfassung → Detail; nicht drei konkurrierende „Hero“-Blöcke.
- **Weißraum ist Struktur.** Abstand gruppiert Zusammengehöriges; Gedrängtheit suggeriert Beziehungen, die es nicht gibt.
- **Labels bleiben sichtbar.** Platzhalter als Label versagen, sobald das Feld Fokus oder einen Wert hat.
- **Fehler gehören zur Ursache.** Nur ein Banner oben erzwingt Memory-Spiel; inline schlägt vage.
- Die ASCII-Blöcke unten kodieren **Intention** für Menschen und für Modelle, die Layout als Text lesen.

## Zweck

**Vorher/Nachher**-Skizzen liefern, die Reviewer:innen (und KI) scannen können, um **was „gut“ heißt** in Layout, Abstand und Betonung zu sehen—ohne Design-Tool.

---

## 1. Visuelle Hierarchie (Titel vs. Fließtext)

**Gut — klare Ebenen**

```
┌──────────────────────────────────────────┐
│                                          │
│   Kasse                                  │  ← ein dominanter Titel
│                                          │
│   Bestellung prüfen, dann bezahlen.      │  ← kurze Unterzeile
│                                          │
│   ───────────────────────────────────    │
│   Positionen                     $42,00  │  ← scannbare Zeilen
│   Versand                         $5,00  │
│                                          │
│             [ Weiter zur Zahlung ]       │  ← eine primäre CTA
│                                          │
└──────────────────────────────────────────┘
```

**Schlecht — alles schreit**

```
┌──────────────────────────────────────────┐
│ KASSE jetzt zahl *** KAUF *** Schritt 3/7│
│ Kleingedrucktes AGB Ads Cookie OK??      │  ← kein klarer Fokus
│ $42 $5 Summe Steuer vielleicht ????      │
│  [ Zurück ]  [ Vielleicht ]  [ LOS! ] [X]│  ← konkurrierende Aktionen
└──────────────────────────────────────────┘
```

**Intention:** Ein visueller Anker, dann Stütze; eine primäre Aktion.

---

## 2. Weißraum und Gruppierung

**Gut — Zusammengehöriges bündelt sich**

```
┌──────────────────────────────────────────┐
│  Profil                                  │
│                                          │
│    Name        ┌──────────────────┐      │
│                │ Ada Lovelace     │      │
│                └──────────────────┘      │
│                                          │
│    E-Mail      ┌──────────────────┐      │
│                │ ada@beispiel.de  │      │
│                └──────────────────┘      │
│                                          │
│              [ Änderungen speichern ]    │
│                                          │
└──────────────────────────────────────────┘
```

**Schlecht — gedrängt und mehrdeutig**

```
┌──────────────────────────────────────────┐
│Profil Name┌────────────┐Mail┌──────────┐ │
│          │Ada          │   │ada@...   │  │
│          └────────────┘   └──────────┘   │
│ [Speichern][Abbr][??][Export][Hilfe]     │
└──────────────────────────────────────────┘
```

**Intention:** Vertikaler Rhythmus trennt Felder; horizontaler Raum vermeidet falsche Lesereihenfolge.

---

## 3. Klick-/Touchflächen (mobil)

**Gut — großzügiges Ziel**

```
        ┌─────────────────────┐
        │                     │
        │       Senden        │   ← hoch genug für zuverlässigen Tap
        │                     │
        └─────────────────────┘
```

**Schlecht — Finger unfreundlich**

```
        ┌────┐
        │ OK │   ← winzig; Nachbarn treffen, verfehlen
        └────┘
```

**Intention:** Interaktion passt zu echtem Daumen-Radius und Toleranz (deckt sich mit WCAG-Hinweisen zur Zielgröße).

---

## 4. Formular-Labels (sichtbar vs. nur Platzhalter)

**Gut — Label bleibt**

```
  Dienstliche E-Mail
 
  ┌────────────────────────────────────┐
  │ du@firma.de                        │
  └────────────────────────────────────┘
```

**Schlecht — „Label“ verschwindet**

```
  ┌────────────────────────────────────┐
  │ Dienstliche E-Mail                 │  ← wirkt wie Label…
  └────────────────────────────────────┘     …bis getippt; Kontext weg
```

**Intention:** Immer zeigen, **worum** es im Feld geht—auch bei ausgefülltem oder fokussiertem Feld.

---

## 5. Inline-Validierung und Fehler

**Gut — Fehler am Feld**

```
  Passwort
 
  ┌────────────────────────────────────┐
  │ kurz                               │
  └────────────────────────────────────┘
  ! Mindestens 12 Zeichen verwenden.
```

**Schlecht — nur globaler Toast**

```
  ┌────────────────────────────────────┐
  │ kurz                               │
  └────────────────────────────────────┘

    (Toast: „Etwas ist schiefgelaufen“)    ← Rätsel: welches Feld?
```

**Intention:** Ursache und Fix in einem Blick verbinden.

---

## 6. Primär vs. Sekundär

**Gut — Button-Hierarchie**

```
                    ┌──────────────────┐
                    │    Bestellung    │  ← gefüllt / primär
                    └──────────────────┘

                      Weiter einkaufen    ← Text / sekundär
```

**Schlecht — symmetrischer Wettkampf**

```
     ┌──────────────┐    ┌──────────────┐
     │  Bestellung  │    │   Abbrechen  │  ← gleiches Gewicht; Fehlklick riskant
     └──────────────┘    └──────────────┘
```

**Intention:** Katastrophale Fehlklicks und Entscheidungsmüdigkeit reduzieren.

---

## 7. Navigation — Orientierung

**Gut — „Du bist hier“**

```
  Bibliothek
    
    Design   ○ aktueller Bereich
    Coding
    Recherche
```

**Schlecht — flache Liste ohne Zustand**

```
  Bibliothek Design Coding Recherche      ← wo bin ich?
```

**Intention:** Orientierung schlägt reine Entdeckbarkeit ohne Status.

---

## 8. Informationsdichte (Dashboard-Kacheln)

**Gut — scanbare Karten**

```
 ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
 │ Umsatz      │  │ Fehler      │  │ Latenz p95  │
 │             │  │             │  │             │
 │   120 k€    │  │   3 offen   │  │   240 ms    │
 │   ▲ 4 %     │  │   stabil    │  │   im SLO    │
 └─────────────┘  └─────────────┘  └─────────────┘
```

**Schlecht — Zahlenwand**

```
 120.402,38 € ERR03 240 ms 4 % 99,2 % ??? FT @queue #7 !! 
```

**Intention:** Metriken chunken; pro Kachel eine Rolle; Trend statt Rauschen.

---

## Nutzung in Reviews

- **ASCII-Paar** in Tickets, PRs oder Prompts einfügen, wenn **Layout-Intention** ohne Pixel gefragt ist.
- **Erweitern** um eigene Muster (Tabellen, Wizard, Seitenleiste)—**gut: Struktur / schlecht: Lärm** beibehalten.
- **Barrierefreiheit:** ASCII ersetzt keine Kontrast- oder Fokusreihenfolge-Prüfung—mit [`barrierefreies-design.md`](barrierefreies-design.md) kombinieren.

---

## Vollständigkeit vor dem Veröffentlichen von Mustern

Wie bei anderen Explainern: Muster hier sind **Defaults**, keine Ausnahmen—im Kontext validieren, testen, messen.

---

## Meta

- Wenn „schlecht“ verführerisch wirkt (busige Banner, laute Verläufe), empfinden Nutzer:innen dieselbe Ermüdung—vereinfachen.
- Modelle profitieren von **expliziten Labels** („Gut“, „Schlecht“) und **Festbreiten-Boxen**—Diagramme im Editor monospaced halten.
