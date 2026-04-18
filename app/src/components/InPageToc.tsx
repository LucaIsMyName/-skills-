import { useUiStrings } from '../hooks/useUiStrings'
import type { TocItem } from '../lib/markdownToc'

type Props = {
  items: TocItem[]
}

/** Compact “on this page” nav — sits below the page chrome, above the prose. */
export function InPageToc({ items }: Props) {
  const t = useUiStrings()
  if (items.length === 0) return null

  return (
    <nav
      aria-label={t.tocOnThisPage}
      className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50/90 px-4 py-3 shadow-sm"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
        {t.tocOnThisPage}
      </p>
      <ol className="mt-2 list-none space-y-1.5 p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="text-sm leading-snug"
            style={{ paddingLeft: `${(item.depth - 2) * 0.75}rem` }}
          >
            <a
              href={`#${item.id}`}
              className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-2 transition hover:text-zinc-900 hover:decoration-zinc-500"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
