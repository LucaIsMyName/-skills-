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

Set `VITE_GITHUB_TOKEN` if you hit API rate limits (unauthenticated requests are capped per hour).

## Build

```bash
npm run docs:build
```

Output is in `app/dist/`.
