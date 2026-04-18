import { getGithubConfig, getGithubHeaders } from './config'

export type ExplainerMeta = {
  lang: string
  chapter: string
  slug: string
  /** Path under repo, e.g. library/en/coding/foo.md */
  path: string
}

export type LangIndex = {
  lang: string
  /** Ordered chapter folder names */
  chapters: string[]
  /** Pages per chapter, sorted by slug */
  byChapter: Record<string, ExplainerMeta[]>
}

const LIB_PREFIX = 'library/'

/** Single tree request — filters to markdown files under library/lang/chapter/ */
export async function fetchLibraryIndexes(): Promise<Map<string, LangIndex>> {
  const { owner, repo, ref } = getGithubConfig()
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`,
    { headers: getGithubHeaders() },
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(
      `GitHub tree ${res.status}: ${text.slice(0, 200)}`,
    )
  }
  const data = (await res.json()) as {
    tree: { path: string; type: string }[]
    truncated?: boolean
  }
  if (data.truncated) {
    console.warn('GitHub tree response truncated; library list may be incomplete.')
  }

  const byLang = new Map<string, LangIndex>()

  for (const item of data.tree) {
    if (item.type !== 'blob' || !item.path.startsWith(LIB_PREFIX)) continue
    if (!item.path.endsWith('.md')) continue

    const rel = item.path.slice(LIB_PREFIX.length)
    const segments = rel.split('/')
    if (segments.length !== 3) continue

    const [lang, chapter, file] = segments
    if (!lang || !chapter || !file) continue
    const slug = file.replace(/\.md$/i, '')

    let langIndex = byLang.get(lang)
    if (!langIndex) {
      langIndex = { lang, chapters: [], byChapter: {} }
      byLang.set(lang, langIndex)
    }

    if (!langIndex.byChapter[chapter]) {
      langIndex.byChapter[chapter] = []
      langIndex.chapters.push(chapter)
    }

    langIndex.byChapter[chapter].push({
      lang,
      chapter,
      slug,
      path: item.path,
    })
  }

  for (const idx of byLang.values()) {
    idx.chapters.sort((a, b) => a.localeCompare(b))
    for (const ch of idx.chapters) {
      idx.byChapter[ch].sort((a, b) => a.slug.localeCompare(b.slug))
    }
  }

  return byLang
}

export function rawMarkdownUrl(path: string): string {
  const { owner, repo, ref } = getGithubConfig()
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`
}

export async function fetchRawMarkdown(path: string): Promise<string> {
  const res = await fetch(rawMarkdownUrl(path))
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status}`)
  }
  return res.text()
}

export function firstMarkdownTitle(md: string): string | undefined {
  for (const line of md.split('\n')) {
    const m = /^\s*#\s+(.+)$/.exec(line)
    if (m?.[1]) return m[1].trim()
  }
  return undefined
}
