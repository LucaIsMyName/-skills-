import { Link, useParams } from 'react-router-dom'
import { useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import type { Components } from 'react-markdown'
import { useLibraryIndex } from '../hooks/useLibraryIndex'
import { useMarkdown } from '../hooks/useMarkdown'
import { mdLinkToAppPath } from '../lib/mdLinks'
import { firstMarkdownTitle } from '../lib/github'
import {
  downloadDocx,
  downloadMarkdownFile,
  downloadPdfFromMarkdownElement,
} from '../lib/exports'

export function MarkdownPage() {
  const { lang, chapter, page } = useParams<{
    lang: string
    chapter: string
    page: string
  }>()
  const { data: lib } = useLibraryIndex()
  const bodyRef = useRef<HTMLDivElement>(null)

  const path = useMemo(() => {
    if (!lang || !chapter || !page || !lib) return undefined
    const idx = lib.byLang.get(lang)
    const ex = idx?.byChapter[chapter]?.find((x) => x.slug === page)
    return ex?.path
  }, [lang, chapter, page, lib])

  const q = useMarkdown(path, Boolean(path))
  const md = q.data ?? ''
  const title = useMemo(() => firstMarkdownTitle(md), [md])

  const components = useMemo<Components>(() => {
    if (!lang || !chapter) return {}
    return {
      a: ({ href, children, className }) => {
        const to = href ? mdLinkToAppPath(href, lang, chapter) : null
        if (to) {
          return (
            <Link to={to} className={className}>
              {children}
            </Link>
          )
        }
        return (
          <a
            href={href}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        )
      },
    }
  }, [lang, chapter])

  if (!lang || !chapter || !page) return null

  if (lib && !path) {
    return (
      <p className="text-sm text-zinc-600">
        This page is not in the library index.{' '}
        <Link to={`/${lang}/${chapter}`} className="text-zinc-900 underline">
          Back to chapter
        </Link>
      </p>
    )
  }

  if (q.isLoading) {
    return (
      <p className="text-sm text-zinc-500" role="status">
        Loading…
      </p>
    )
  }

  if (q.isError) {
    return (
      <div
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        role="alert"
      >
        {String(q.error?.message ?? 'Failed to load document.')} GitHub rate
        limits may apply — try again later or configure a token.
      </div>
    )
  }

  const displayTitle = title ?? page
  const baseName = `${chapter}-${page}`

  return (
    <article>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to={`/${lang}/${chapter}`}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
          >
            ← {chapter.replace(/-/g, ' ')}
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
            {displayTitle}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 shadow-sm hover:bg-zinc-50"
            onClick={() => downloadMarkdownFile(`${baseName}.md`, md)}
          >
            Markdown
          </button>
          <button
            type="button"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 shadow-sm hover:bg-zinc-50"
            onClick={() => void downloadDocx(`${baseName}.docx`, md, displayTitle)}
          >
            Word
          </button>
          <button
            type="button"
            className="rounded-lg border border-zinc-200 bg-zinc-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-zinc-900"
            onClick={() => {
              if (bodyRef.current) {
                void downloadPdfFromMarkdownElement(
                  bodyRef.current,
                  `${baseName}.pdf`,
                  displayTitle,
                  md,
                )
              }
            }}
          >
            PDF
          </button>
        </div>
      </div>

      <div
        ref={bodyRef}
        className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-a:text-zinc-800"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={components}
        >
          {md}
        </ReactMarkdown>
      </div>
    </article>
  )
}
