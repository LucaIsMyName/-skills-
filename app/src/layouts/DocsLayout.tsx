import { Outlet, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useLibraryIndex } from '../hooks/useLibraryIndex'
import { useUiStrings } from '../hooks/useUiStrings'
import { AppLogo } from '../components/AppLogo'
import { ChapterNav } from '../components/ChapterNav'
import { LangSwitch } from '../components/LangSwitch'
import { DarkModeToggle } from '../components/DarkModeToggle'

export function DocsLayout() {
  const { lang } = useParams<{
    lang: string
  }>()
  const { data, isLoading, error, isError } = useLibraryIndex()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const t = useUiStrings()

  useEffect(() => {
    if (lang) document.documentElement.lang = lang
  }, [lang])

  const closeDrawer = () => setDrawerOpen(false)

  if (!lang) {
    return null
  }

  const byLang = data?.byLang
  const langs = data?.langs ?? []
  const index = byLang?.get(lang)

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <div className="flex min-h-screen flex-col bg-background lg:flex-row">
        {/* Mobile header */}
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/80 lg:hidden">
          <div className="flex min-w-0 flex-1 items-center gap-8">
            <AppLogo lang={lang} />
            {langs.length > 0 && (
              <LangSwitch
                langs={langs}
                indexes={byLang ?? new Map()}
                currentLang={lang}
              />
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <DarkModeToggle />
            <SheetTrigger
              render={
                <Button variant="outline" size="sm" className="shadow-sm" />
              }
            >
              {t.docsMenu}
            </SheetTrigger>
          </div>
        </header>

        <SheetContent
          side="left"
          className="h-dvh w-[min(100%,20rem)] max-w-[min(100%,20rem)] gap-0 border-r border-border bg-background p-0 sm:max-w-[min(100%,20rem)] lg:hidden"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{t.chapterNavAria}</SheetTitle>
          </SheetHeader>
          <div className="border-b border-border bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <AppLogo lang={lang} onNavigate={closeDrawer} />
              <div className="flex items-center gap-2">
                {langs.length > 0 && (
                  <LangSwitch
                    langs={langs}
                    indexes={byLang ?? new Map()}
                    currentLang={lang}
                  />
                )}
                <DarkModeToggle />
              </div>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-3">
            {isLoading && (
              <p className="text-sm text-muted-foreground">{t.docsLoadingNav}</p>
            )}
            {isError && (
              <p className="text-sm text-destructive">{String(error?.message)}</p>
            )}
            {index && (
              <ChapterNav
                lang={lang}
                index={index}
                onPick={closeDrawer}
                ui={t}
              />
            )}
          </div>
        </SheetContent>

        {/* Desktop sidebar: full viewport height, sticks while main content scrolls; nav scrolls inside */}
        <aside className="hidden w-[min(100%,18rem)] shrink-0 flex-col overflow-hidden border-r border-border bg-muted/40 lg:flex lg:h-dvh lg:max-h-dvh lg:sticky lg:top-0 lg:self-start">
          <div className="shrink-0 border-b border-border bg-muted/40 p-4">
            <div className="flex items-center justify-between gap-2">
              <AppLogo lang={lang} />
              <div className="flex items-center gap-2">
                {langs.length > 0 && byLang && (
                  <LangSwitch langs={langs} indexes={byLang} currentLang={lang} />
                )}
                <DarkModeToggle />
              </div>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-3">
            {isLoading && (
              <p className="text-sm text-muted-foreground">{t.docsLoadingNav}</p>
            )}
            {isError && (
              <p className="text-sm text-destructive">{String(error?.message)}</p>
            )}
            {index && <ChapterNav lang={lang} index={index} ui={t} />}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-3xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </Sheet>
  )
}
