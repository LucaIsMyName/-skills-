# Performance and web vitals

**Scope:** Applies to **perceived and measured performance** of web apps—page load, interactivity, responsiveness, rendering. Not backend throughput tuning beyond the front door, not mobile native. Pair with [`accessibility-in-code.md`](accessibility-in-code.md), [`api-design-and-rest.md`](api-design-and-rest.md), [`error-handling-and-logging.md`](error-handling-and-logging.md), and [`empty-and-error-states.md`](../design/empty-and-error-states.md).

## Excerpt
- **Measure first**: Real-User Monitoring (RUM) beats lab tests; both beat guessing.
- **Core Web Vitals**: **LCP** (loading), **INP** (interactivity), **CLS** (stability). Set budgets.
- **Ship less**: images, JS, and third-party scripts are where most pages go wrong.
- **Cache aggressively**; invalidate carefully.
- **Perceived speed** matters—skeletons, optimistic UI, progressive rendering.
- Techniques, budgets, and anti-patterns below.

## Before optimising

### Concrete

- What is the **90th-percentile** LCP / INP / CLS **on real user devices and networks**?
- Which pages matter most (volume × business impact)?
- What is the **baseline bundle size** and the **largest image**?
- Which **third-party** scripts load on every page?

### Meta

- **Premature optimisation** is real—so is **deferred optimisation**. Set budgets; catch regressions in CI.
- Benchmark on **representative** devices. A MacBook on fibre tells you nothing about a mid-range phone on 4G.

---

## Purpose

Build a product that **feels fast** to users on their devices and networks—and stays fast as the team adds features, with visible guardrails.

---

## 1. The three Core Web Vitals

- **LCP (Largest Contentful Paint)** — when does the main content appear? Goal: **< 2.5s** at p75.
- **INP (Interaction to Next Paint)** — how fast does the UI respond to clicks/typing? Goal: **< 200ms** at p75.
- **CLS (Cumulative Layout Shift)** — does content jump around during load? Goal: **< 0.1** at p75.

Collect Core Web Vitals with:

- **Google Search Console** and CrUX dataset (real-world, aggregated).
- Your own RUM (e.g. `web-vitals` JS library → analytics).
- Lab runs in Lighthouse for regression catches.

## 2. LCP — load the main thing fast

Usual culprits:

- **Large hero images** served uncompressed, unsized, in the wrong format.
- **Render-blocking CSS/JS** in `<head>`.
- **Slow TTFB** from cold server, missing CDN, heavy SSR.

Fixes:

- Use **modern image formats** (`.webp`, `.avif`), serve **responsive srcsets**, compress with tools like `sharp` or `mozjpeg`.
- **Preload** the LCP image; mark it `fetchpriority="high"`.
- **Inline** critical CSS, defer the rest.
- **CDN** in front of static assets; cache at the edge.
- **SSR** only what the LCP needs; stream the rest.

## 3. INP — keep the UI responsive

INP is the worst single interaction over the session. One slow click poisons it.

- Avoid **long tasks** (>50ms) on the main thread.
- **Debounce** heavy handlers (search, filter).
- **Virtualise** long lists (`react-window`, native CSS `content-visibility`).
- Move CPU-heavy work (parsing, compression, crypto) to **Web Workers**.
- Avoid layout thrash: read → write → read in loops.

## 4. CLS — do not move content under users

- **Set dimensions** on images, videos, embeds (`width`, `height` / `aspect-ratio`).
- **Reserve space** for ads, banners, cookie prompts.
- Load **web fonts** with `font-display: swap` and `size-adjust` to match fallback metrics.
- Avoid injecting content **above** existing content after render.

## 5. Ship less JavaScript

- **Bundle budget** per page (e.g. 150 KB gzip) enforced in CI.
- **Code-split** by route; lazy-load heavy components (`dynamic import`).
- **Tree-shake**; prefer **smaller libraries**—a date-fns subset over Moment.
- Audit third parties: analytics, chat, tag managers—each is a tax on every page.
- Do not import entire icon libraries; import what you use.

## 6. Images and media

- Every `<img>` has `width`, `height`, `alt`, `loading` (`lazy` below the fold, `eager` for LCP).
- **Responsive** images with `srcset` and `sizes`.
- Use **video posters**; lazy-load embedded video.
- Pair with [`images-and-photography.md`](../design/images-and-photography.md).

## 7. Caching

- **Immutable** static assets via content hashes (`main.8b4c.js`) with far-future `Cache-Control`.
- HTML is **short-cache** or **revalidating** (`stale-while-revalidate`).
- API responses: cache read-heavy endpoints at the CDN; include `ETag`/`Last-Modified`.
- Service workers cautiously—great for offline, easy to break updates.

## 8. Perceived performance

- **Skeletons** beat spinners for content-heavy pages.
- **Optimistic UI** for known-safe mutations (likes, toggles).
- **Progressive rendering**: show the fastest pieces first; defer the expensive.
- **Prefetch** likely next pages on hover; don't prefetch everything.

## 9. Monitoring and budgets

- Budgets in CI (Lighthouse CI, Calibre, SpeedCurve, custom).
- **Alert** when LCP / INP / CLS p75 crosses thresholds for >24h.
- **Track regressions** by PR—correlate with bundle size and third-party additions.
- Review quarterly; performance silently rots as teams ship.

## 10. What not to do

- Optimise your **dev machine** and miss real-user metrics.
- Add **more JS** to "make it feel faster" (spinners, parallax, preloaders).
- **Micro-optimise** CSS while loading 2 MB of JS.
- Add the same **cookie banner** on every page without measuring its CLS hit.
- Trust a single Lighthouse run on staging as a release gate.

---

## Core idea

Performance is **ship less, cache more, measure real users, and set budgets you enforce**. Perceived speed is as real as measured speed—design the experience along with the bytes.

## Further reading

- [web.dev — Core Web Vitals](https://web.dev/vitals/) — definitions and thresholds
- [web.dev — Optimise LCP/INP/CLS](https://web.dev/articles/optimize-lcp) — hands-on guides
- [Smashing Magazine — Front-end performance checklist](https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/) — detailed annual checklist
- [CrUX dashboard](https://developer.chrome.com/docs/crux/dashboard/) — aggregated real-user data by origin

---

German version: [`performance-und-web-vitals.md`](../../de/coding/performance-und-web-vitals.md)
