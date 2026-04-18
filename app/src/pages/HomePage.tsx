import { Link, Navigate, useParams } from 'react-router-dom'
import { useLibraryIndex } from '../hooks/useLibraryIndex'
import { formatChapterTitle } from '../lib/strings'

export function HomePage() {
  const { lang } = useParams<{ lang: string }>()
  const { data, isLoading, isError, error } = useLibraryIndex()

  if (!lang) return null

  if (isLoading) {
    return (
      <p className="text-sm text-zinc-500" role="status">
        Loading chapters…
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
  if (!index || !data?.langs.includes(lang)) {
    const fallback = data?.langs[0]
    if (fallback) return <Navigate to={`/${fallback}`} replace />
    return (
      <p className="text-sm text-zinc-600">No languages found in the library.</p>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Chapters
      </h1>
      <p className="mt-1 text-sm text-zinc-600">
        Pick a topic to browse explainers.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {index.chapters.map((ch) => (
          <li key={ch}>
            <Link
              to={`/${lang}/${ch}`}
              className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <span className="text-base font-semibold text-zinc-900">
                {formatChapterTitle(ch)}
              </span>
              <span className="mt-2 line-clamp-2 text-sm text-zinc-500">
                {index.byChapter[ch]?.length ?? 0} explainers
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
