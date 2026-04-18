/**
 * UI chrome for the docs app (not library markdown content). Aligned with route
 * `:lang` — only `en` and `de` are fully translated; other codes fall back to English.
 */
export type UiLocale = 'en' | 'de'

export function resolveUiLocale(lang: string | undefined): UiLocale {
  return lang === 'de' ? 'de' : 'en'
}

export type UiCopy = {
  appLogoHomeAria: string
  docsMenu: string
  docsCloseMenu: string
  docsLoadingNav: string
  langSwitchAria: string
  chapterNavAria: string
  chapterNavNoChapters: string
  chapterNavZipTitle: string
  chapterNavZipAria: (chapterTitle: string) => string
  chapterNavMdTitle: string
  chapterNavMdAria: (pageTitle: string) => string
  homeTitle: string
  homeSubtitle: string
  homeLoading: string
  homeIndexError: string
  homeNoLanguages: string
  homeExplainersCount: (n: number) => string
  chapterIndexExplainersIn: (n: number) => string
  chapterIndexLoading: string
  chapterIndexIndexError: string
  chapterIndexRead: string
  markdownNotInIndex: string
  markdownBackToChapter: string
  markdownLoading: string
  markdownLoadError: string
  markdownRateLimitHint: string
  exportMarkdown: string
  exportWord: string
  exportPdf: string
  tocOnThisPage: string
  notFoundTitle: string
  notFoundHome: string
}

const en: UiCopy = {
  appLogoHomeAria: 'Home',
  docsMenu: 'Menu',
  docsCloseMenu: 'Close menu',
  docsLoadingNav: 'Loading navigation…',
  langSwitchAria: 'Language',
  chapterNavAria: 'Chapters',
  chapterNavNoChapters: 'No chapters yet.',
  chapterNavZipTitle: 'Download chapter (.zip of all .md files)',
  chapterNavZipAria: (chapterTitle) => `Download ${chapterTitle} as ZIP`,
  chapterNavMdTitle: 'Download this page as .md',
  chapterNavMdAria: (pageTitle) => `Download ${pageTitle} as Markdown`,
  homeTitle: 'Chapters',
  homeSubtitle: 'Pick a topic to browse explainers.',
  homeLoading: 'Loading chapters…',
  homeIndexError: 'Failed to load library index.',
  homeNoLanguages: 'No languages found in the library.',
  homeExplainersCount: (n) => `${n} explainers`,
  chapterIndexExplainersIn: (n) => `Explainers in this chapter (${n})`,
  chapterIndexLoading: 'Loading explainers…',
  chapterIndexIndexError: 'Failed to load library index.',
  chapterIndexRead: 'Read',
  markdownNotInIndex: 'This page is not in the library index.',
  markdownBackToChapter: 'Back to chapter',
  markdownLoading: 'Loading…',
  markdownLoadError: 'Failed to load document.',
  markdownRateLimitHint:
    'GitHub rate limits may apply — try again later or configure a token.',
  exportMarkdown: 'Markdown',
  exportWord: 'Word',
  exportPdf: 'PDF',
  tocOnThisPage: 'On this page',
  notFoundTitle: 'Page not found',
  notFoundHome: 'Go to home',
}

const de: UiCopy = {
  appLogoHomeAria: 'Startseite',
  docsMenu: 'Menü',
  docsCloseMenu: 'Menü schließen',
  docsLoadingNav: 'Navigation wird geladen…',
  langSwitchAria: 'Sprache',
  chapterNavAria: 'Kapitel',
  chapterNavNoChapters: 'Noch keine Kapitel.',
  chapterNavZipTitle:
    'Kapitel herunterladen (.zip mit allen .md-Dateien)',
  chapterNavZipAria: (chapterTitle) => `${chapterTitle} als ZIP herunterladen`,
  chapterNavMdTitle: 'Diese Seite als .md herunterladen',
  chapterNavMdAria: (pageTitle) => `${pageTitle} als Markdown herunterladen`,
  homeTitle: 'Kapitel',
  homeSubtitle: 'Wähle ein Thema, um die Erklärungen zu durchsuchen.',
  homeLoading: 'Kapitel werden geladen…',
  homeIndexError: 'Bibliotheksindex konnte nicht geladen werden.',
  homeNoLanguages: 'Keine Sprachen in der Bibliothek gefunden.',
  homeExplainersCount: (n) =>
    `${n} ${n === 1 ? 'Erklärung' : 'Erklärungen'}`,
  chapterIndexExplainersIn: (n) => `Erklärungen in diesem Kapitel (${n})`,
  chapterIndexLoading: 'Erklärungen werden geladen…',
  chapterIndexIndexError: 'Bibliotheksindex konnte nicht geladen werden.',
  chapterIndexRead: 'Lesen',
  markdownNotInIndex: 'Diese Seite ist nicht im Bibliotheksindex.',
  markdownBackToChapter: 'Zurück zum Kapitel',
  markdownLoading: 'Wird geladen…',
  markdownLoadError: 'Dokument konnte nicht geladen werden.',
  markdownRateLimitHint:
    'GitHub-Ratenlimits können gelten — später erneut versuchen oder Token eintragen.',
  exportMarkdown: 'Markdown',
  exportWord: 'Word',
  exportPdf: 'PDF',
  tocOnThisPage: 'Auf dieser Seite',
  notFoundTitle: 'Seite nicht gefunden',
  notFoundHome: 'Zur Startseite',
}

export const uiStrings: Record<UiLocale, UiCopy> = { en, de }

export function tForLang(lang: string | undefined): UiCopy {
  return uiStrings[resolveUiLocale(lang)]
}
