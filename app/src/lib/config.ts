/**
 * GitHub settings for this SPA. Any `VITE_*` variable is inlined into the
 * client bundle at build time — it is **not secret**. Do not put a PAT here
 * expecting privacy; use unauthenticated public API access only, or a
 * server-side proxy if you need a hidden token.
 */
export function getGithubConfig() {
  return {
    owner: import.meta.env.VITE_GITHUB_OWNER ?? "LucaIsMyName",
    repo: import.meta.env.VITE_GITHUB_REPO ?? "-skills-",
    ref: import.meta.env.VITE_GITHUB_REF ?? "main",
    token: import.meta.env.VITE_GITHUB_TOKEN,
  } as const;
}

export function getGithubHeaders(): HeadersInit {
  const { token } = getGithubConfig();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
