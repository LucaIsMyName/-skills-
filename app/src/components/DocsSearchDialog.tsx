import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from 'cmdk'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  searchDocs,
  searchItemToPath,
  type SearchIndexItem,
} from '@/lib/docsSearchIndex'
import { useUiStrings } from '@/hooks/useUiStrings'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function partitionResults(items: SearchIndexItem[]) {
  const chapters: SearchIndexItem[] = []
  const pages: SearchIndexItem[] = []
  for (const item of items) {
    if (item.type === 'chapter') chapters.push(item)
    else pages.push(item)
  }
  return { chapters, pages }
}

export function DocsSearchDialog({ open, onOpenChange }: Props) {
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const t = useUiStrings()
  const [input, setInput] = useState('')
  const [debounced, setDebounced] = useState('')
  const [results, setResults] = useState<SearchIndexItem[]>([])
  const [indexError, setIndexError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setInput('')
      setDebounced('')
      setResults([])
      setIndexError(null)
      setBusy(false)
    }
    onOpenChange(next)
  }

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(input), 200)
    return () => window.clearTimeout(id)
  }, [input])

  useEffect(() => {
    if (!open || !lang || !debounced.trim()) return

    let cancelled = false

    void (async () => {
      setBusy(true)
      setIndexError(null)
      try {
        const r = await searchDocs(lang, debounced)
        if (!cancelled) setResults(r)
      } catch (e: unknown) {
        if (!cancelled) {
          setIndexError(e instanceof Error ? e.message : String(e))
          setResults([])
        }
      } finally {
        if (!cancelled) setBusy(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [open, lang, debounced])

  const queryActive = debounced.trim().length > 0
  const hasTyped = input.trim().length > 0
  const { chapters, pages } = useMemo(() => {
    const items = queryActive ? results : []
    return partitionResults(items)
  }, [queryActive, results])

  const showBusy = queryActive && busy
  const showEmpty =
    queryActive && !busy && !indexError && results.length === 0

  const onPick = (item: SearchIndexItem) => {
    navigate(searchItemToPath(item))
    handleOpenChange(false)
  }

  if (!lang) return null

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      shouldFilter={false}
      label={t.searchOpenAria}
      contentClassName={cn(
        'overflow-hidden p-0 shadow-lg',
        'border border-border bg-popover text-popover-foreground',
        'max-w-[min(100vw-2rem,32rem)] sm:max-w-lg',
      )}
      overlayClassName="fixed inset-0 z-50 bg-black/40"
    >
      <div className="flex items-center border-b border-border px-3">
        <SearchIcon
          className="mr-2 size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
        <CommandInput
          value={input}
          onValueChange={setInput}
          placeholder={t.searchPlaceholder}
          className={cn(
            'flex h-12 w-full rounded-md bg-transparent py-3 text-sm',
            'outline-none placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
      </div>
      <CommandList className="max-h-[min(60vh,24rem)] overflow-y-auto p-2">
        {indexError ? (
          <div className="px-3 py-6 text-center text-sm text-destructive">
            {t.searchError}
          </div>
        ) : null}
        {showBusy ? (
          <CommandLoading className="py-6 text-center text-sm text-muted-foreground">
            {t.searchLoading}
          </CommandLoading>
        ) : null}
        {!hasTyped && !indexError ? (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">
            {t.searchTypePrompt}
          </div>
        ) : null}
        {showEmpty ? (
          <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
            {t.searchNoResults}
          </CommandEmpty>
        ) : null}
        {!indexError && !showBusy && chapters.length > 0 ? (
          <CommandGroup heading={t.searchGroupChapters}>
            {chapters.map((item) => (
              <CommandItem
                key={`ch:${item.lang}:${item.chapter}`}
                value={`ch:${item.lang}:${item.chapter}`}
                onSelect={() => onPick(item)}
                className="cursor-pointer rounded-md"
              >
                <span className="truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {!indexError && !showBusy && pages.length > 0 ? (
          <CommandGroup heading={t.searchGroupPages}>
            {pages.map((item) =>
              item.type === 'page' ? (
                <CommandItem
                  key={item.repoPath}
                  value={item.repoPath}
                  onSelect={() => onPick(item)}
                  className="cursor-pointer flex-col items-start gap-0.5 rounded-md py-2"
                >
                  <span className="truncate font-medium">{item.title}</span>
                  {item.headings.length > 0 ? (
                    <span className="line-clamp-2 text-xs text-muted-foreground">
                      {item.headings.slice(0, 4).join(' · ')}
                    </span>
                  ) : null}
                </CommandItem>
              ) : null,
            )}
          </CommandGroup>
        ) : null}
      </CommandList>
    </CommandDialog>
  )
}

type TriggerProps = {
  className?: string
}

export function DocsSearchTriggerButton({
  className,
  onOpen,
}: TriggerProps & { onOpen: () => void }) {
  const t = useUiStrings()
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-muted-foreground shadow-sm transition-colors',
        'hover:bg-muted/60 hover:text-foreground',
        className,
      )}
      aria-label={t.searchOpenAria}
    >
      <SearchIcon className="size-4 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{t.searchPlaceholder}</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
        {t.searchShortcutHint}
      </kbd>
    </button>
  )
}
