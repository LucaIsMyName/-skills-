import { Link, Navigate, useParams } from 'react-router-dom'
import { useLibraryIndex } from '../hooks/useLibraryIndex'
import { formatChapterTitle, humanizeSlug } from '../lib/strings'

export function ChapterIndexPage() {
  const { lang, chapter } = useParams<{ lang: string; chapter: string }>()
  const { data, isLoading, isError, error } = useLibraryIndex()

  if (!lang || !chapter) return null

  if (isLoading) {
    return (
      <p className="text-sm text-zinc-500" role="status">
        Loading explainers…
      </p>
    )
  }

  if (isError) {
    return (
      <div
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        role="alert"
      >
        {String(error?.message ?? 'Failed to load library index.')}
      </div>
    )
  }

  const index = data?.byLang.get(lang)
  if (!index?.chapters.includes(chapter)) {
    const fallback = data?.langs[0]
    if (fallback) return <Navigate to={`/${fallback}`} replace />
    return <Navigate to="/" replace />
  }

  const pages = index.byChapter[chapter] ?? []

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        {formatChapterTitle(chapter)}
      </h1>
      <p className="mt-1 text-sm text-zinc-600">
        Explainers in this chapter ({pages.length})
      </p>
      <ol className="mt-8 flex flex-col gap-2">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/${lang}/${chapter}/${p.slug}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-zinc-300"
            >
              <span className="font-medium text-zinc-900">
                {humanizeSlug(p.slug)}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Read
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
