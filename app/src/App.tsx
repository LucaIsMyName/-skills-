import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Component, lazy, Suspense } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { DocsLayout } from './layouts/DocsLayout'
import { ChapterIndexPage } from './pages/ChapterIndexPage'
import { HomePage } from './pages/HomePage'
import { MarkdownPage } from './pages/MarkdownPage'
import { NotFound } from './pages/NotFound'
import { getLibraryIndexCache } from './lib/persistedCache'

type ErrorBoundaryState = { hasError: boolean; message: string }

class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-lg font-semibold text-zinc-900">Something went wrong</p>
          <p className="max-w-sm text-sm text-zinc-500">{this.state.message}</p>
          <a href="/" className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50">
            Go home
          </a>
        </div>
      )
    }
    return this.props.children
  }
}

const DevCacheResetButton = import.meta.env.DEV
  ? lazy(() =>
      import('./components/DevCacheResetButton').then((m) => ({
        default: m.DevCacheResetButton,
      })),
    )
  : null

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

function DefaultLangRedirect() {
  const cached = getLibraryIndexCache({ allowExpired: true })
  const firstLang = cached?.langs[0] ?? 'en'
  return <Navigate to={`/${firstLang}`} replace />
}

export default function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLangRedirect />} />
            <Route path=":lang" element={<DocsLayout />}>
              <Route index element={<HomePage />} />
              <Route path=":chapter/:page" element={<MarkdownPage />} />
              <Route path=":chapter" element={<ChapterIndexPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          {DevCacheResetButton && (
            <Suspense>
              <DevCacheResetButton />
            </Suspense>
          )}
        </BrowserRouter>
      </QueryClientProvider>
    </AppErrorBoundary>
  )
}
