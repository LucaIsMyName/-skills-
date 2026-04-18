# Performance und Web Vitals

**Scope:** Gilt für **wahrgenommene und gemessene Performance** von Webapps—Ladezeit, Interaktivität, Responsiveness, Rendering. Kein Backend-Throughput-Tuning jenseits der Haustür, kein Native. Kombiniere mit [`barrierefreiheit-im-code.md`](barrierefreiheit-im-code.md), [`api-design-und-rest.md`](api-design-und-rest.md), [`fehlerbehandlung-und-logging.md`](fehlerbehandlung-und-logging.md) und [`leere-und-fehlerzustaende.md`](../design/leere-und-fehlerzustaende.md).

## Excerpt

- **Messen zuerst**: Real-User-Monitoring (RUM) schlägt Labortests; beide schlagen Raten.
- **Core Web Vitals**: **LCP** (Laden), **INP** (Interaktivität), **CLS** (Stabilität). Budgets setzen.
- **Weniger ausliefern**: Bilder, JS, Third-Parties sind die Hauptsünder.
- **Cachen**, **invalidieren** bedacht.
- **Gefühlte Geschwindigkeit** zählt—Skeletons, optimistische UI, progressives Rendern.
- Techniken, Budgets, Anti-Muster unten.

## Vor dem Optimieren

### Konkret

- **p75-LCP/INP/CLS** auf echten Geräten/Netzen?
- Wichtigste Seiten (Traffic × Business)?
- **Baseline-Bundle** und **größtes Bild**?
- Welche **Third-Parties** auf jeder Seite?

### Meta

- **Premature Optimization** ist real—**Deferred Optimization** auch. Budgets in CI.
- Auf **repräsentativen** Geräten messen.

---

## Zweck

Produkt, das **schnell wirkt** auf echten Geräten—und bleibt, während das Team featured.

---

## 1. Die drei Core Web Vitals

- **LCP** < 2,5s (p75).
- **INP** < 200ms (p75).
- **CLS** < 0,1 (p75).

Messung:

- **Search Console** + CrUX.
- Eigenes RUM (`web-vitals`).
- **Lighthouse** fürs Labor/Regressions.

## 2. LCP — Hauptinhalt schnell laden

Üblich schuldig:

- Große Hero-Bilder, unkomprimiert.
- **Render-blocking CSS/JS** im `<head>`.
- Langsames TTFB, fehlendes CDN, schweres SSR.

Fixes:

- Moderne Formate (`.webp`, `.avif`), responsive `srcset`, `sharp`/`mozjpeg`.
- **Preload** des LCP-Bildes; `fetchpriority="high"`.
- **Critical CSS inline**, Rest defer.
- **CDN** vor Statik; Edge-Cache.
- **SSR** nur LCP-nötiges, Rest streamen.

## 3. INP — UI responsive halten

INP ist die **schlechteste** Interaktion der Session.

- Keine **Long Tasks** (>50ms) im Main Thread.
- **Debouncen** (Search, Filter).
- **Virtualisieren** (`react-window`, `content-visibility`).
- Heavy Work in **Web Worker**.
- Kein Layout-Thrash.

## 4. CLS — Inhalt nicht verschieben

- **Dimensionen** auf Bildern/Videos/Embeds setzen.
- **Platz reservieren** für Ads, Banner, Cookie-Prompts.
- Webfonts mit `font-display: swap` + `size-adjust`.
- Nichts **über** vorhandenem Content nach-injizieren.

## 5. Weniger JS

- **Bundle-Budget** pro Seite (z. B. 150 KB gzip) in CI.
- **Code-Splitting** per Route; `dynamic import`.
- **Tree-Shaking**; kleinere Libs (z. B. `date-fns`-Subset).
- Third-Parties prüfen—jede ist eine Steuer.
- Icons nicht komplett importieren.

## 6. Bilder/Medien

- Jedes `<img>` mit `width`, `height`, `alt`, `loading`.
- **Responsive** (`srcset`, `sizes`).
- **Video-Poster**; embed lazy.
- Siehe [`bilder-und-fotografie.md`](../design/bilder-und-fotografie.md).

## 7. Caching

- **Immutable** Statik via Content-Hash + Far-future `Cache-Control`.
- HTML: kurz gecacht oder `stale-while-revalidate`.
- API: Read-heavy am CDN cachen; `ETag`/`Last-Modified`.
- Service Worker vorsichtig.

## 8. Gefühlte Performance

- **Skeletons** > Spinner.
- **Optimistische UI** bei sicheren Mutations.
- **Progressives Rendern**.
- **Prefetch** wahrscheinliche nächste Seite—nicht alles.

## 9. Monitoring und Budgets

- Budgets in CI (Lighthouse CI, Calibre, SpeedCurve).
- **Alert**, wenn p75-Vitals >24h überschritten.
- Regressionen pro PR.
- Quartalsweise Review.

## 10. Was nicht tun

- **Dev-Maschine** optimieren, User-Metriken ignorieren.
- **Mehr JS** für Pseudogeschwindigkeit.
- **Micro-CSS** mit 2 MB JS.
- Cookie-Banner überall ohne CLS-Messung.
- Einmal Lighthouse Staging als Release-Gate.

---

## Core idea

Performance = **weniger shippen, mehr cachen, echte User messen, Budgets durchsetzen**. Gefühlte Geschwindigkeit ist genauso real wie gemessene.

## Further reading

- [web.dev — Core Web Vitals](https://web.dev/vitals/)
- [web.dev — Optimise LCP/INP/CLS](https://web.dev/articles/optimize-lcp)
- [Smashing Magazine — Front-end performance checklist](https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/)
- [CrUX dashboard](https://developer.chrome.com/docs/crux/dashboard/)

---

Englische Version: [`performance-and-web-vitals.md`](../../en/coding/performance-and-web-vitals.md)
