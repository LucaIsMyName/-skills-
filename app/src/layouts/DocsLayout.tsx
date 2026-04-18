import { Outlet, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900 lg:flex-row">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50/95 px-4 py-3 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95 lg:hidden">
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
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            {t.docsMenu}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-50 lg:hidden',
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className={[
            'absolute inset-0 bg-zinc-900/40 transition-opacity',
            drawerOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={closeDrawer}
          aria-label={t.docsCloseMenu}
        />
        <aside
          id="mobile-drawer"
          className={[
            'absolute left-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-r border-zinc-200 bg-zinc-50 shadow-xl transition-transform dark:border-zinc-700 dark:bg-zinc-900',
            drawerOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <div className="border-b border-zinc-200 p-4 dark:border-zinc-700">
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
          <div className="flex-1 overflow-y-auto p-3">
            {isLoading && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.docsLoadingNav}</p>
            )}
            {isError && (
              <p className="text-sm text-red-700 dark:text-red-400">{String(error?.message)}</p>
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
        </aside>
      </div>

      {/* Desktop sidebar: full viewport height, sticks while main content scrolls; nav scrolls inside */}
      <aside className="hidden w-[min(100%,18rem)] shrink-0 flex-col overflow-hidden border-r border-zinc-200 bg-zinc-100/50 dark:border-zinc-700 dark:bg-zinc-800/50 lg:flex lg:h-dvh lg:max-h-dvh lg:sticky lg:top-0 lg:self-start">
        <div className="shrink-0 border-b border-zinc-200 bg-zinc-100/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
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
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.docsLoadingNav}</p>
          )}
          {isError && (
            <p className="text-sm text-red-700 dark:text-red-400">{String(error?.message)}</p>
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
  )
}
