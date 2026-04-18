import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useLibraryIndex } from '../hooks/useLibraryIndex'
import { useUiStrings } from '../hooks/useUiStrings'
import { formatChapterTitle } from '../lib/strings'

export function HomePage() {
  const { lang } = useParams<{ lang: string }>()
  const { data, isLoading, isError, error } = useLibraryIndex()
  const t = useUiStrings()

  useEffect(() => {
    document.title = 'Skills library'
  }, [])

  if (!lang) return null

  if (isLoading) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400" role="status">
        {t.homeLoading}
      </p>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{String(error?.message ?? t.homeIndexError)}</AlertDescription>
      </Alert>
    )
  }

  const index = data?.byLang.get(lang)
  if (!index || !data?.langs.includes(lang)) {
    const fallback = data?.langs[0]
    if (fallback) return <Navigate to={`/${fallback}`} replace />
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t.homeNoLanguages}</p>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {t.homeTitle}
      </h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{t.homeSubtitle}</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {index.chapters.map((ch) => (
          <li key={ch}>
            <Link to={`/${lang}/${ch}`} className="block h-full">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{formatChapterTitle(ch)}</CardTitle>
                    <Badge variant="secondary" className="shrink-0 tabular-nums">
                      {index.byChapter[ch]?.length ?? 0}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {t.homeExplainersCount(index.byChapter[ch]?.length ?? 0)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
