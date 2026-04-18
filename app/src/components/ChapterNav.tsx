import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { ExplainerMeta, LangIndex } from '../lib/github'
import { useMarkdownH1ByPath } from '../hooks/useMarkdownH1Labels'
import {
  downloadChapterMarkdownZip,
  downloadExplainerMarkdown,
} from '../lib/mdArchive'
import { formatChapterTitle, humanizeSlug } from '../lib/strings'
import type { UiCopy } from '../lib/uiI18n'

/** Sidebar row action: hidden until row hover / focus-within, unless this key is active. */
function rowDownloadBtnClass(
  actionKey: string,
  downloadBusy: string | null,
  positionClass: 'chapter' | 'page',
): string {
  const pos = positionClass === 'chapter' ? 'right-1.5' : 'right-1'
  const pad = positionClass === 'chapter' ? 'p-1.5' : 'p-1'
  const base = [
    'absolute',
    pos,
    'top-1/2 z-[1] -translate-y-1/2',
    pad,
    'inline-flex text-zinc-500 transition-opacity duration-150',
    'hover:bg-zinc-200/80 hover:text-zinc-900',
    'dark:text-zinc-400 dark:hover:bg-zinc-700/80 dark:hover:text-zinc-100',
    'disabled:cursor-not-allowed',
  ].join(' ')
  if (downloadBusy !== null && downloadBusy !== actionKey) {
    return `${base} opacity-0 pointer-events-none`
  }
  if (downloadBusy === actionKey) {
    return `${base} opacity-100`
  }
  return `${base} opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 focus-visible:pointer-events-auto focus-visible:!opacity-100`
}

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
  ui: UiCopy
}

export function ChapterNav({ lang, index, onPick, ui: t }: Props) {
  const location = useLocation()
  const [downloadBusy, setDownloadBusy] = useState<string | null>(null)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const activeChapter = activeChapterId(location.pathname)
  const pagesInActiveChapter = useMemo(() => {
    if (!activeChapter || !index) return []
    return index.byChapter[activeChapter] ?? []
  }, [activeChapter, index])
  const h1Query = useMarkdownH1ByPath(pagesInActiveChapter)
  const h1ByPath = h1Query.labels

  const runDownload = async (key: string, fn: () => Promise<void>) => {
    if (downloadBusy) return
    setDownloadError(null)
    setDownloadBusy(key)
    try {
      await fn()
    } catch (e) {
      console.error(e)
      setDownloadError(t.chapterNavDownloadError)
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
      <p className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">{t.chapterNavNoChapters}</p>
    )
  }

  return (
    <nav className="flex min-w-0 flex-col gap-1" aria-label={t.chapterNavAria}>
      {downloadError ? (
        <p
          className="mb-1 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
          role="alert"
        >
          {downloadError}
        </p>
      ) : null}
      {h1Query.isError ? (
        <p
          className="mb-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400"
          role="status"
        >
          {t.chapterNavLabelsError}
        </p>
      ) : null}
      {index.chapters.map((ch) => {
        const pages = index.byChapter[ch] ?? []
        const prefix = `/${lang}/${ch}`
        const inChapter =
          location.pathname === prefix ||
          location.pathname.startsWith(`${prefix}/`)
        const showExplainers = inChapter && pages.length > 0

        const zipKey = `zip:${ch}`

        return (
          <div key={ch} className="flex min-w-0 flex-col gap-0.5">
            <div className="group relative min-w-0">
              {/* No `onPick` here: on mobile, closing the drawer prevented seeing subpages. */}
              <NavLink
                to={prefix}
                className={() =>
                  [
                    'block min-w-0 truncate rounded-lg py-2 pl-3 pr-10 text-sm font-medium transition-colors',
                    inChapter
                      ? 'bg-zinc-200/80 text-zinc-900 dark:bg-zinc-700/80 dark:text-zinc-100'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-100',
                  ].join(' ')
                }
              >
                {formatChapterTitle(ch)}
              </NavLink>
              {pages.length > 0 ? (
                <button
                  type="button"
                  title={t.chapterNavZipTitle}
                  aria-label={t.chapterNavZipAria(formatChapterTitle(ch))}
                  disabled={downloadBusy !== null}
                  className={rowDownloadBtnClass(zipKey, downloadBusy, 'chapter')}
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
                className="mb-1 ml-2 min-w-0 space-y-0.5 border-l border-zinc-200 pl-2 dark:border-zinc-700"
                role="list"
              >
                {pages.map((p) => {
                  const mdKey = `md:${ch}:${p.slug}`
                  return (
                    <li key={p.slug} className="group relative min-w-0">
                      <NavLink
                        to={`/${lang}/${ch}/${p.slug}`}
                        onClick={onPick}
                        className={({ isActive }) =>
                          [
                            'block min-w-0 truncate rounded-md py-1.5 pl-2 pr-9 text-xs font-medium transition-colors',
                            isActive
                              ? 'bg-zinc-200/90 text-zinc-900 dark:bg-zinc-700/90 dark:text-zinc-100'
                              : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-100',
                          ].join(' ')
                        }
                      >
                        {h1ByPath.get(p.path) ?? humanizeSlug(p.slug)}
                      </NavLink>
                      <button
                        type="button"
                        title={t.chapterNavMdTitle}
                        aria-label={t.chapterNavMdAria(
                          h1ByPath.get(p.path) ?? humanizeSlug(p.slug),
                        )}
                        disabled={downloadBusy !== null}
                        className={rowDownloadBtnClass(
                          mdKey,
                          downloadBusy,
                          'page',
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          onPageMd(ch, p)
                        }}
                      >
                        <DownloadGlyph className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
