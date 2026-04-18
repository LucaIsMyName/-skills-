import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import type { ComponentPropsWithoutRef } from 'react'
import type { Components } from 'react-markdown'

/** `remark` adds `inline` for `code`; widen beyond intrinsic `code` props. */
type MarkdownCodeRenderProps = ComponentPropsWithoutRef<'code'> & {
  inline?: boolean
  node?: unknown
}
import { useLibraryIndex } from '../hooks/useLibraryIndex'
import { useMarkdown } from '../hooks/useMarkdown'
import { useUiStrings } from '../hooks/useUiStrings'
import { mdLinkToAppPath } from '../lib/mdLinks'
import { firstMarkdownTitle } from '../lib/github'
import { MarkdownInlineCode, MarkdownPreWithCopy } from '../components/MarkdownCodeBlocks'
import { InPageToc } from '../components/InPageToc'
import { downloadMarkdownFile } from '../lib/downloadMarkdownFile'
import { extractMarkdownToc } from '../lib/markdownToc'
import {
  rehypeSlugIdForAtxH1Text,
  splitLeadingAtxH1,
} from '../lib/splitLeadingH1'
import { repositoryMarkdownForExport } from '../lib/repositoryMarkdown'
import { exportFileStem } from '../lib/strings'

export function MarkdownPage() {
  const location = useLocation()
  const { lang, chapter, page } = useParams<{
    lang: string
    chapter: string
    page: string
  }>()
  const { data: lib } = useLibraryIndex()
  const t = useUiStrings()
  const path = useMemo(() => {
    if (!lang || !chapter || !page || !lib) return undefined
    const idx = lib.byLang.get(lang)
    const ex = idx?.byChapter[chapter]?.find((x) => x.slug === page)
    return ex?.path
  }, [lang, chapter, page, lib])

  const q = useMarkdown(path, Boolean(path))
  const md = q.data ?? ''
  const title = useMemo(() => firstMarkdownTitle(md), [md])
  const tocItems = useMemo(() => extractMarkdownToc(md), [md])

  const split = useMemo(() => splitLeadingAtxH1(md), [md])
  const leadH1Text = split.h1Text
  const markdownBody = leadH1Text ? split.body : md
  const leadH1Id = leadH1Text ? rehypeSlugIdForAtxH1Text(leadH1Text) : null

  useEffect(() => {
    const pageTitle = title ?? page ?? ''
    document.title = pageTitle ? `${pageTitle} — Skills` : 'Skills library'
  }, [title, page])

  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id) return
    const run = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    requestAnimationFrame(() => requestAnimationFrame(run))
  }, [location.hash, md])

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
      pre: MarkdownPreWithCopy,
      code: ({ node, inline, children, className, ...rest }: MarkdownCodeRenderProps) => {
        void node
        if (!inline) {
          return (
            <code className={className} {...rest}>
              {children}
            </code>
          )
        }
        return (
          <MarkdownInlineCode className={className} {...rest}>
            {children}
          </MarkdownInlineCode>
        )
      },
    }
  }, [lang, chapter])

  if (!lang || !chapter || !page) return null

  if (lib && !path) {
    return (
      <p className="text-sm text-zinc-600">
        {t.markdownNotInIndex}{' '}
        <Link to={`/${lang}/${chapter}`} className="text-zinc-900 underline">
          {t.markdownBackToChapter}
        </Link>
      </p>
    )
  }

  if (q.isLoading) {
    return (
      <p className="text-sm text-zinc-500" role="status">
        {t.markdownLoading}
      </p>
    )
  }

  if (q.isError) {
    return (
      <div
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        role="alert"
      >
        {String(q.error?.message ?? t.markdownLoadError)} {t.markdownRateLimitHint}
      </div>
    )
  }

  const displayTitle = title ?? page
  const baseName = exportFileStem(chapter, page)
  const exportMd = repositoryMarkdownForExport(md)
  /** Avoid duplicate h1 when the MD body already opens with `# …` (typical case). */
  const showFallbackTitle = title === undefined

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
          {showFallbackTitle && !leadH1Text ? (
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
              {displayTitle}
            </h1>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 shadow-sm hover:bg-zinc-50"
            onClick={() => downloadMarkdownFile(`${baseName}.md`, exportMd)}
          >
            {t.exportMarkdown}
          </button>
          <button
            type="button"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 shadow-sm hover:bg-zinc-50"
            onClick={() =>
              void import('../lib/exports').then(({ downloadDocx }) =>
                downloadDocx(`${baseName}.docx`, exportMd, displayTitle),
              )
            }
          >
            {t.exportWord}
          </button>
          <button
            type="button"
            className="rounded-lg border border-zinc-200 bg-zinc-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-zinc-900"
            onClick={() =>
              void import('../lib/exports').then(({ downloadPdfFromMarkdown }) =>
                downloadPdfFromMarkdown(exportMd, displayTitle, `${baseName}.pdf`),
              )
            }
          >
            {t.exportPdf}
          </button>
        </div>
      </div>

      {leadH1Text ? (
        <h1
          id={leadH1Id || undefined}
          className="mb-4 scroll-mt-24 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl"
        >
          {leadH1Text}
        </h1>
      ) : null}

      <InPageToc items={tocItems} />

      <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-a:text-zinc-800 prose-code:font-mono prose-pre:font-mono">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={components}
        >
          {markdownBody}
        </ReactMarkdown>
      </div>
    </article>
  )
}
