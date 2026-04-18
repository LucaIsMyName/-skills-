import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
    <Accordion
      defaultValue={[]}
      className="mb-8 overflow-hidden rounded border border-border bg-muted/40 shadow-sm"
    >
      <AccordionItem value="page-toc">
        <AccordionTrigger className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t.tocOnThisPage}
        </AccordionTrigger>
        <AccordionContent className="border-t border-border bg-card/60 px-4 pb-3 pt-2">
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
                    className="font-medium text-foreground underline decoration-border underline-offset-2 transition hover:decoration-muted-foreground"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
