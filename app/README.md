# Skills library (web)

Browse [`library/`](https://github.com/LucaIsMyName/-skills-/tree/main/library) from the browser: GitHub API for the file tree, `raw.githubusercontent.com` for Markdown bodies.

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

## Build

```bash
npm run docs:build
```

Output is in `app/dist/`. Typography: **Geist Sans** and **JetBrains Mono** via Fontsource; `public/fonts/*.ttf` supplies the same faces for jsPDF text fallback.
