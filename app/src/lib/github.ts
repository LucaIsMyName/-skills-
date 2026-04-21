import { getGithubConfig, getGithubHeaders } from "./config";

export type ExplainerMeta = {
  lang: string;
  chapter: string;
  slug: string;
  /** Path under repo, e.g. packages/libraries/en/coding/foo.md */
  path: string;
};

export type LangIndex = {
  lang: string;
  /** Ordered chapter folder names */
  chapters: string[];
  /** Pages per chapter, sorted by slug */
  byChapter: Record<string, ExplainerMeta[]>;
};

const LIB_PREFIX = "packages/libraries/";
const DEFAULT_RETRY_ATTEMPTS = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function parseRetryAfterMs(headers: Headers): number | null {
  const retryAfter = headers.get("retry-after");
  if (!retryAfter) return null;
  const asSeconds = Number.parseInt(retryAfter, 10);
  if (Number.isFinite(asSeconds) && asSeconds >= 0) {
    return asSeconds * 1000;
  }
  const asDate = Date.parse(retryAfter);
  if (Number.isNaN(asDate)) return null;
  return Math.max(0, asDate - Date.now());
}

function rateLimitResetDelayMs(headers: Headers): number | null {
  const remaining = Number.parseInt(
    headers.get("x-ratelimit-remaining") ?? "",
    10,
  );
  const reset = Number.parseInt(headers.get("x-ratelimit-reset") ?? "", 10);
  if (!Number.isFinite(remaining) || !Number.isFinite(reset) || remaining > 0) {
    return null;
  }
  const resetAtMs = reset * 1000;
  return Math.max(0, resetAtMs - Date.now());
}

function retryDelayMs(headers: Headers, attempt: number): number {
  const retryAfterMs = parseRetryAfterMs(headers);
  if (retryAfterMs !== null) return retryAfterMs;
  const rateResetMs = rateLimitResetDelayMs(headers);
  if (rateResetMs !== null) return rateResetMs;
  const base = 500;
  const cap = 4000;
  const exp = Math.min(cap, base * 2 ** (attempt - 1));
  const jitter = Math.floor(Math.random() * 200);
  return exp + jitter;
}

function isRetryable(status: number): boolean {
  return (
    status === 403 ||
    status === 429 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

function userFacingGithubError(
  status: number,
  target: "index" | "markdown",
): string {
  if (status === 401 || status === 403 || status === 429) {
    return target === "index"
      ? "GitHub rate limit reached while loading the library index. Please retry in a bit."
      : "GitHub rate limit reached while loading this document. Please retry in a bit.";
  }
  if (status === 404) {
    return target === "index"
      ? "Library index was not found in the configured repository."
      : "Document was not found in the configured repository.";
  }
  if (status >= 500) {
    return "GitHub is temporarily unavailable. Please retry shortly.";
  }
  return target === "index"
    ? `Failed to load library index from GitHub (${status}).`
    : `Failed to load markdown from GitHub (${status}).`;
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  target: "index" | "markdown",
  signal?: AbortSignal,
): Promise<Response> {
  let lastRes: Response | null = null;
  for (let attempt = 1; attempt <= DEFAULT_RETRY_ATTEMPTS; attempt += 1) {
    const res = await fetch(url, { ...init, signal });
    if (res.ok) return res;
    lastRes = res;
    if (!isRetryable(res.status) || attempt >= DEFAULT_RETRY_ATTEMPTS) {
      break;
    }
    await sleep(retryDelayMs(res.headers, attempt));
  }
  const status = lastRes?.status ?? 0;
  throw new Error(userFacingGithubError(status, target));
}

/** Single tree request — filters to markdown files under packages/libraries/lang/chapter/ */
export async function fetchLibraryIndexes(
  signal?: AbortSignal,
): Promise<Map<string, LangIndex>> {
  const { owner, repo, ref } = getGithubConfig();
  const res = await fetchWithRetry(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`,
    { headers: getGithubHeaders() },
    "index",
    signal,
  );
  const data = (await res.json()) as {
    tree: { path: string; type: string }[];
    truncated?: boolean;
  };
  if (data.truncated) {
    throw new Error(
      "Library index is truncated by GitHub API. Narrow the repository tree or use a backend cache.",
    );
  }

  const byLang = new Map<string, LangIndex>();

  for (const item of data.tree) {
    if (item.type !== "blob" || !item.path.startsWith(LIB_PREFIX)) continue;
    if (!item.path.endsWith(".md")) continue;

    const rel = item.path.slice(LIB_PREFIX.length);
    const segments = rel.split("/");
    if (segments.length !== 3) continue;

    const [lang, chapter, file] = segments;
    if (!lang || !chapter || !file) continue;
    const slug = file.replace(/\.md$/i, "");

    let langIndex = byLang.get(lang);
    if (!langIndex) {
      langIndex = { lang, chapters: [], byChapter: {} };
      byLang.set(lang, langIndex);
    }

    if (!langIndex.byChapter[chapter]) {
      langIndex.byChapter[chapter] = [];
      langIndex.chapters.push(chapter);
    }

    langIndex.byChapter[chapter].push({
      lang,
      chapter,
      slug,
      path: item.path,
    });
  }

  for (const idx of byLang.values()) {
    idx.chapters.sort((a, b) => a.localeCompare(b));
    for (const ch of idx.chapters) {
      idx.byChapter[ch].sort((a, b) => a.slug.localeCompare(b.slug));
    }
  }

  return byLang;
}

export function rawMarkdownUrl(path: string): string {
  const { owner, repo, ref } = getGithubConfig();
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`;
}

export async function fetchRawMarkdown(
  path: string,
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetchWithRetry(
    rawMarkdownUrl(path),
    {},
    "markdown",
    signal,
  );
  return res.text();
}

export function firstMarkdownTitle(md: string): string | undefined {
  for (const line of md.split("\n")) {
    const m = /^\s*#\s+(.+)$/.exec(line);
    if (m?.[1]) return m[1].trim();
  }
  return undefined;
}
