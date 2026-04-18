# Leere und Fehlerzustände

**Scope:** Gilt für **Non-Happy-Path-Screens**—leere Listen, keine Treffer, Loading, Fehler, fehlende Rechte, offline, Limits erreicht. Kein Code-Exception-Handling jenseits UX-Wirkung. Kombiniere mit [`designing-good-interfaces.md`](designing-good-interfaces.md), [`content-design-und-microcopy.md`](content-design-und-microcopy.md), [`fehlerbehandlung-und-logging.md`](../coding/fehlerbehandlung-und-logging.md) und [`barrierefreiheit-im-code.md`](../coding/barrierefreiheit-im-code.md).

## Excerpt

- **Leer ist ein Feature**, keine Lücke—sagen, wo man ist und was als Nächstes.
- **Fehler sind Content**: brauchen Design, Copy, einen Weg weiter.
- **Loading** schnell, vorhersagbar, informativ—Skeletons statt Spinner, wo möglich.
- **Rechte fehlen ≠ nicht gefunden**: ehrlich unterscheiden, ohne Daten zu leaken.
- **Offline** ist ein Zustand, kein Bug—unterstützen, wo es zählt.
- Inventar und Templates unten.

## Vor dem Design der States

### Konkret

- Pro Liste/Formular/Page: realistische States (null, wenige, viele, voll, loading, error, offline, denied, rate-limited)?
- Welche **Aktion** kann der User pro State?
- Welche Fehler sind **technisch** (Retry) vs **semantisch** (Input ändern) vs **Rechte** (anmelden, upgraden, fragen)?
- Welche States brauchen **eigene Copy**?

### Meta

- Happy Paths beeindrucken; Sad Paths sind **nützlich**.
- User treffen Sad Paths häufiger als man denkt.

---

## Zweck

Jeden Zustand des Produkts **verständlich und handlungsfähig** machen.

---

## 1. Inventar: States benennen

- **Leer (Erstnutzung)**, **Leer (nach Löschen/Filtern)**.
- **Loading** (Initial, langsam, Retry).
- **Partial** — teils geladen, teils Fehler.
- **Viele** — Pagination, Virtualisierung.
- **Voll / Limit** — Plangrenzen, Quotas.
- **Fehler** — 4xx, 5xx, Netzwerk.
- **Rechte fehlen** — nicht angemeldet, falsche Rolle, Planlimit.
- **Offline** — Cache/Queue.

## 2. Leer (Erstnutzung) — einladen, nicht beschuldigen

- **Einzeiler**: was ist das hier?
- **Erste Aktion** (primäre CTA).
- Optional: freundliche Illustration, Hilfe-Link.

### Schlecht

```
Keine Einträge.
```

### Gut

```
Ihr Dashboard ist leer. Legen Sie Ihr erstes Projekt an, um Fortschritte zu sehen.

[ Projekt anlegen ]
```

## 3. Leer (nach Aktion) — Grund benennen

```
Keine Treffer für "Spender 2025".

Entfernen Sie einen Filter oder suchen Sie über alle Jahre.
[ Filter leeren ]  [ Über alle Jahre suchen ]
```

## 4. Loading — Skeletons statt Spinner

- **Skeletons** (graue Platzhalter) wirken schneller, vermeiden CLS.
- **Spinner** bei kurzen, unbekannten Operationen (<1s).
- **Progress-Bars** bei bekannter Länge (Uploads).
- **Microcopy** bei langen Wartezeiten.
- **Timeout** in hilfreichen Fehler, nicht Endlos-Spinner.

## 5. Fehler-States — drei Zutaten

1. **Was** geschah in einfacher Sprache.
2. **Warum**, kurz, wenn bekannt.
3. **Nächster Schritt**.

### Schlecht

```
Fehler 500. Bitte erneut versuchen.
```

### Gut

```
Wir konnten Ihre Änderungen nicht speichern: Die Verbindung ist abgebrochen.

Ihr Text ist noch da. Erneut versuchen—bleibt es? Kontakt mit Referenz req_01J8Q...
[ Erneut versuchen ]  [ Support ]
```

## 6. Rechte fehlen vs. nicht gefunden

- **Nicht angemeldet**: "Melden Sie sich an, um dieses Projekt zu sehen."
- **Falsche Rolle**: "Kein Zugriff. Bitten Sie die Eigentümerin um Freigabe."
- **Planlimit**: "Reports sind im Pro-Plan—14 Tage gratis testen."

Existenz privater Ressourcen nicht leaken—bei sehr sensibler Sichtbarkeit generische 404.

## 7. Offline

- **Read-heavy** Screens cachen.
- **Writes** queuen, klar "pending" zeigen.
- Offline-unfähige Aktionen disablen, mit Erklärung.
- Nie User-Eingaben still verlieren.

## 8. Rate-Limits/Quotas

- **Was** das Limit ist.
- **Wann** es zurückgesetzt wird ("in 3 Min").
- **Was jetzt** (warten, löschen, upgraden).

## 9. Barrierefreiheit

- Fehler über **Live-Regions** (`aria-live="polite"`/`assertive`).
- Loading **angekündigt**, Focus zurückgegeben.
- Leere States per Screenreader nutzbar; Icons/Illustrationen ggf. dekorativ.

## 10. Was nicht tun

- **Gleicher generischer Fehler** überall.
- **Endlos-Spinner**.
- Leere States verstecken.
- **Rechte-fehlen** und **nicht gefunden** so mischen, dass User verloren gehen.
- **Nutzer beschuldigen** ("Ungültige Eingabe").

---

## Core idea

Leere und Fehler sind **Orte des Vertrauens**. Jeder Zustand ist ein **Gespräch**: was ist los, warum, was nun. Design sie so sorgfältig wie den Happy Path.

## Further reading

- [NN/g — Empty states](https://www.nngroup.com/articles/empty-state-interface-design/)
- [GOV.UK — Error messages](https://design-system.service.gov.uk/components/error-message/)
- [Shopify Polaris — Empty/Error](https://polaris.shopify.com/patterns)
- [Material Design](https://m3.material.io/)

---

Englische Version: [`empty-and-error-states.md`](../../en/design/empty-and-error-states.md)
