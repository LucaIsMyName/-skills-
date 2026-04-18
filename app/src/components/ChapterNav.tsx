import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { LangIndex } from '../lib/github'
import { useMarkdownH1ByPath } from '../hooks/useMarkdownH1Labels'
import { formatChapterTitle, humanizeSlug } from '../lib/strings'

function activeChapterId(pathname: string): string | null {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length < 2) return null
  return parts[1] ?? null
}

type Props = {
  lang: string
  index: LangIndex | undefined
  onPick?: () => void
}

export function ChapterNav({ lang, index, onPick }: Props) {
  const location = useLocation()
  const activeChapter = activeChapterId(location.pathname)
  const pagesInActiveChapter = useMemo(() => {
    if (!activeChapter || !index) return []
    return index.byChapter[activeChapter] ?? []
  }, [activeChapter, index])
  const h1ByPath = useMarkdownH1ByPath(pagesInActiveChapter)

  if (!index?.chapters.length) {
    return (
      <p className="px-3 py-2 text-sm text-zinc-500">No chapters yet.</p>
    )
  }

  return (
    <nav className="flex flex-col gap-1" aria-label="Chapters">
      {index.chapters.map((ch) => {
        const pages = index.byChapter[ch] ?? []
        const prefix = `/${lang}/${ch}`
        const inChapter =
          location.pathname === prefix ||
          location.pathname.startsWith(`${prefix}/`)
        const showExplainers = inChapter && pages.length > 0

        return (
          <div key={ch} className="flex flex-col gap-0.5">
            <NavLink
              to={prefix}
              onClick={onPick}
              className={() =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  inChapter
                    ? 'bg-zinc-200/80 text-zinc-900'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
                ].join(' ')
              }
            >
              {formatChapterTitle(ch)}
            </NavLink>
            {showExplainers && (
              <ul
                className="mb-1 ml-2 space-y-0.5 border-l border-zinc-200 pl-2"
                role="list"
              >
                {pages.map((p) => (
                  <li key={p.slug}>
                    <NavLink
                      to={`/${lang}/${ch}/${p.slug}`}
                      onClick={onPick}
                      className={({ isActive }) =>
                        [
                          'block rounded-md px-2 py-1.5 text-xs font-medium leading-snug transition-colors',
                          isActive
                            ? 'bg-zinc-200/90 text-zinc-900'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
                        ].join(' ')
                      }
                    >
                      {h1ByPath.get(p.path) ?? humanizeSlug(p.slug)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
