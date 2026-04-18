import { Accordion } from '@base-ui/react/accordion'
import { useUiStrings } from '../hooks/useUiStrings'
import type { TocItem } from '../lib/markdownToc'

type Props = {
  items: TocItem[]
}

/** In-page TOC in a collapsible accordion (UI-only; not part of exported files). */
export function InPageToc({ items }: Props) {
  const t = useUiStrings()
  if (items.length === 0) return null

  return (
    <Accordion.Root
      defaultValue={[]}
      className="mb-8 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/90 shadow-sm"
    >
      <Accordion.Item value="page-toc">
        <Accordion.Header>
          <Accordion.Trigger
            className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-zinc-600 outline-none transition hover:bg-zinc-100/90 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 [&[data-panel-open]>svg]:rotate-180"
          >
            <span>{t.tocOnThisPage}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel className="border-t border-zinc-200 bg-white/50 px-4 pb-3 pt-2">
          <nav aria-label={t.tocOnThisPage}>
            <ol className="list-none space-y-1.5 p-0">
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
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}
