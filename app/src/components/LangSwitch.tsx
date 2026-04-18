import { Link, useLocation } from 'react-router-dom'
import type { LangIndex } from '../lib/github'
import { tForLang } from '../lib/uiI18n'

type Props = {
  langs: string[]
  indexes: Map<string, LangIndex>
  currentLang: string
}

export function LangSwitch({ langs, indexes, currentLang }: Props) {
  const t = tForLang(currentLang)
  const { pathname } = useLocation()

  function targetFor(targetLang: string): string {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 1) return `/${targetLang}`
    const [, chapter, page] = segments
    if (!chapter) return `/${targetLang}`

    const other = indexes.get(targetLang)
    if (!other?.chapters.includes(chapter)) return `/${targetLang}`

    if (page) {
      const pages = other.byChapter[chapter]
      const has = pages?.some((p) => p.slug === page)
      if (has) return `/${targetLang}/${chapter}/${page}`
    }

    return `/${targetLang}/${chapter}`
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-lg border border-zinc-200 bg-zinc-100/80 p-0.5"
      role="group"
      aria-label={t.langSwitchAria}
    >
      {langs.map((l) => (
        <Link
          key={l}
          to={targetFor(l)}
          className={[
            'min-w-[2.25rem] rounded-md px-1 py-0.5 text-center text-[11px] font-semibold uppercase tracking-wide transition-colors',
            l === currentLang
              ? 'bg-white text-zinc-900 shadow-sm border-zinc-300 border '
              : 'text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 border-transparent border',
          ].join(' ')}
        >
          {l}
        </Link>
      ))}
    </div>
  )
}
