export function getGithubConfig() {
  return {
    owner: import.meta.env.VITE_GITHUB_OWNER ?? 'LucaIsMyName',
    repo: import.meta.env.VITE_GITHUB_REPO ?? '-skills-',
    ref: import.meta.env.VITE_GITHUB_REF ?? 'main',
    token: import.meta.env.VITE_GITHUB_TOKEN,
  } as const
}

export function getGithubHeaders(): HeadersInit {
  const { token } = getGithubConfig()
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}
