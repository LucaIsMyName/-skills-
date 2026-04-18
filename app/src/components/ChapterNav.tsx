import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { ExplainerMeta, LangIndex } from '../lib/github'
import { useMarkdownH1ByPath } from '../hooks/useMarkdownH1Labels'
import {
  downloadChapterMarkdownZip,
  downloadExplainerMarkdown,
} from '../lib/mdArchive'
import { formatChapterTitle, humanizeSlug } from '../lib/strings'

function DownloadGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 3a.75.75 0 0 1 .75.75v6.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V3.75A.75.75 0 0 1 10 3Z"
        clipRule="evenodd"
      />
      <path d="M3.75 15a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" />
    </svg>
  )
}

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
  const [downloadBusy, setDownloadBusy] = useState<string | null>(null)
  const activeChapter = activeChapterId(location.pathname)
  const pagesInActiveChapter = useMemo(() => {
    if (!activeChapter || !index) return []
    return index.byChapter[activeChapter] ?? []
  }, [activeChapter, index])
  const h1ByPath = useMarkdownH1ByPath(pagesInActiveChapter)

  const runDownload = async (key: string, fn: () => Promise<void>) => {
    if (downloadBusy) return
    setDownloadBusy(key)
    try {
      await fn()
    } catch (e) {
      console.error(e)
    } finally {
      setDownloadBusy(null)
    }
  }

  const onChapterZip = (ch: string, pages: ExplainerMeta[]) => {
    void runDownload(`zip:${ch}`, () =>
      downloadChapterMarkdownZip(ch, pages),
    )
  }

  const onPageMd = (ch: string, p: ExplainerMeta) => {
    void runDownload(`md:${ch}:${p.slug}`, () =>
      downloadExplainerMarkdown(ch, p),
    )
  }

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
            <div className="flex items-center gap-0.5 pr-1">
              <NavLink
                to={prefix}
                onClick={onPick}
                className={() =>
                  [
                    'min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    inChapter
                      ? 'bg-zinc-200/80 text-zinc-900'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
                  ].join(' ')
                }
              >
                {formatChapterTitle(ch)}
              </NavLink>
              {pages.length > 0 ? (
                <button
                  type="button"
                  title="Download chapter (.zip of all .md files)"
                  aria-label={`Download ${formatChapterTitle(ch)} as ZIP`}
                  disabled={downloadBusy !== null}
                  className="inline-flex shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-800 disabled:opacity-40"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onChapterZip(ch, pages)
                  }}
                >
                  <DownloadGlyph className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            {showExplainers && (
              <ul
                className="mb-1 ml-2 space-y-0.5 border-l border-zinc-200 pl-2"
                role="list"
              >
                {pages.map((p) => (
                  <li key={p.slug} className="flex items-center gap-0.5 pr-0.5">
                    <NavLink
                      to={`/${lang}/${ch}/${p.slug}`}
                      onClick={onPick}
                      className={({ isActive }) =>
                        [
                          'min-w-0 flex-1 rounded-md px-2 py-1.5 text-xs font-medium leading-snug transition-colors',
                          isActive
                            ? 'bg-zinc-200/90 text-zinc-900'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
                        ].join(' ')
                      }
                    >
                      <span className="line-clamp-2">
                        {h1ByPath.get(p.path) ?? humanizeSlug(p.slug)}
                      </span>
                    </NavLink>
                    <button
                      type="button"
                      title="Download this page as .md"
                      aria-label={`Download ${h1ByPath.get(p.path) ?? humanizeSlug(p.slug)} as Markdown`}
                      disabled={downloadBusy !== null}
                      className="inline-flex shrink-0 self-start rounded p-1 text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-800 disabled:opacity-40"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onPageMd(ch, p)
                      }}
                    >
                      <DownloadGlyph className="h-3.5 w-3.5" />
                    </button>
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
