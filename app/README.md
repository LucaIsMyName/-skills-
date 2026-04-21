# Skills library (web)

Browse [`packages/libraries/`](https://github.com/LucaIsMyName/-skills-/tree/main/packages/libraries) from the browser: GitHub API for the file tree, `raw.githubusercontent.com` for Markdown bodies.

The app is designed to stay in a free-tier operating mode: public GitHub endpoints, client-side caching, and bounded request concurrency.

## Setup

From repo root:

```bash
npm install
npm run docs:dev
```

Or from `app/`: `npm install` then `npm run dev`.

## Environment (optional)

Copy `.env.example` to `.env`. Defaults target the public `-skills-` repo on `main`.

If you hit GitHub API rate limits on the file-tree request, you can set `VITE_GITHUB_TOKEN` — but **anything prefixed with `VITE_` is shipped to the browser**, so it is not a secret. Prefer living within public rate limits, or add a small server-side proxy if you need a non-exposed token.

## Caching behavior

- Markdown pages and the language/chapter index are persisted in `localStorage` for 7 days.
- Fresh cache entries are used before network requests.
- If a network request fails, an expired cache entry is used as a fallback when available.
- Chapter ZIP downloads use bounded fetch concurrency to reduce rate-limit bursts.

## Dev cache reset

In development (`npm run dev`), a fixed bottom-right button labeled `Clear All Cache` is shown. It clears:

- all persisted doc cache keys in `localStorage`
- all in-memory React Query cache entries

## Build

```bash
npm run docs:build
```

Output is in `app/dist/`. Typography: **Geist Sans** and **JetBrains Mono** via Fontsource; `public/fonts/*.ttf` supplies the same faces for jsPDF text fallback.
