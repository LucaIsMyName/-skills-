import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useLibraryIndex } from '../hooks/useLibraryIndex'
import { useMarkdownH1ByPath } from '../hooks/useMarkdownH1Labels'
import { useUiStrings } from '../hooks/useUiStrings'
import { formatChapterTitle, humanizeSlug } from '../lib/strings'

export function ChapterIndexPage() {
  const { lang, chapter } = useParams<{ lang: string; chapter: string }>()
  const { data, isLoading, isError, error } = useLibraryIndex()
  const t = useUiStrings()

  const index = data?.byLang.get(lang ?? '')
  const pages = useMemo(() => {
    if (!lang || !chapter || !index?.chapters.includes(chapter)) return []
    return index.byChapter[chapter] ?? []
  }, [lang, chapter, index])
  const h1Query = useMarkdownH1ByPath(pages)
  const h1ByPath = h1Query.labels

  if (!lang || !chapter) return null

  if (isLoading) {
    return (
      <p className="text-sm text-zinc-500" role="status">
        {t.chapterIndexLoading}
      </p>
    )
  }

  if (isError) {
    return (
      <div
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        role="alert"
      >
        {String(error?.message ?? t.chapterIndexIndexError)}
      </div>
    )
  }

  if (!index?.chapters.includes(chapter)) {
    const fallback = data?.langs[0]
    if (fallback) return <Navigate to={`/${fallback}`} replace />
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        {formatChapterTitle(chapter)}
      </h1>
      <p className="mt-1 text-sm text-zinc-600">
        {t.chapterIndexExplainersIn(pages.length)}
      </p>
      {h1Query.isError ? (
        <p
          className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
          role="status"
        >
          {t.chapterIndexLabelsError}
        </p>
      ) : null}
      <ol className="mt-8 flex flex-col gap-2">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/${lang}/${chapter}/${p.slug}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-zinc-300"
            >
              <span className="font-medium text-zinc-900">
                {h1ByPath.get(p.path) ?? humanizeSlug(p.slug)}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                {t.chapterIndexRead}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
