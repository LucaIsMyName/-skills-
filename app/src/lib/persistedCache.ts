import type { ExplainerMeta } from './github'
import { getGithubConfig } from './config'

const CACHE_PREFIX = 'skills-doc-cache:v1'
const SEVEN_DAYS_MS = 1000 * 60 * 60 * 24 * 7

type CacheEnvelope<T> = {
  cachedAt: number
  expiresAt: number
  source: string
  value: T
}

type ReadCacheOptions = {
  allowExpired?: boolean
}

export type PersistedLibraryIndex = {
  langs: string[]
  byLang: Record<
    string,
    {
      lang: string
      chapters: string[]
      byChapter: Record<string, ExplainerMeta[]>
    }
  >
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function githubSourceKey(): string {
  const { owner, repo, ref } = getGithubConfig()
  return `${owner}/${repo}@${ref}`
}

function keyFor(kind: 'markdown' | 'library-index', id: string): string {
  return `${CACHE_PREFIX}:${githubSourceKey()}:${kind}:${id}`
}

function readEnvelope<T>(
  key: string,
  options?: ReadCacheOptions,
): T | undefined {
  const storage = getStorage()
  if (!storage) return undefined
  const raw = storage.getItem(key)
  if (!raw) return undefined

  try {
    const parsed = JSON.parse(raw) as CacheEnvelope<T>
    if (!parsed || typeof parsed !== 'object') return undefined
    if (parsed.source !== githubSourceKey()) return undefined
    if (!options?.allowExpired && Date.now() > parsed.expiresAt) return undefined
    return parsed.value
  } catch {
    return undefined
  }
}

function writeEnvelope<T>(key: string, value: T, ttlMs = SEVEN_DAYS_MS): void {
  const storage = getStorage()
  if (!storage) return
  const now = Date.now()
  const payload: CacheEnvelope<T> = {
    cachedAt: now,
    expiresAt: now + ttlMs,
    source: githubSourceKey(),
    value,
  }
  try {
    storage.setItem(key, JSON.stringify(payload))
  } catch {
    // Ignore quota/privacy mode failures and continue with network behavior.
  }
}

export function getMarkdownCache(
  path: string,
  options?: ReadCacheOptions,
): string | undefined {
  return readEnvelope<string>(keyFor('markdown', encodeURIComponent(path)), options)
}

export function setMarkdownCache(path: string, markdown: string): void {
  writeEnvelope<string>(keyFor('markdown', encodeURIComponent(path)), markdown)
}

export function getLibraryIndexCache(
  options?: ReadCacheOptions,
): PersistedLibraryIndex | undefined {
  return readEnvelope<PersistedLibraryIndex>(keyFor('library-index', 'root'), options)
}

export function setLibraryIndexCache(index: PersistedLibraryIndex): void {
  writeEnvelope<PersistedLibraryIndex>(keyFor('library-index', 'root'), index)
}

export function clearAllPersistedDocCache(): number {
  const storage = getStorage()
  if (!storage) return 0
  let removed = 0
  const keys = Object.keys(storage)
  for (const key of keys) {
    if (!key.startsWith(CACHE_PREFIX)) continue
    storage.removeItem(key)
    removed += 1
  }
  return removed
}
