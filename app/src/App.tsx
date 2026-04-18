import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DocsLayout } from './layouts/DocsLayout'
import { ChapterIndexPage } from './pages/ChapterIndexPage'
import { HomePage } from './pages/HomePage'
import { MarkdownPage } from './pages/MarkdownPage'
import { NotFound } from './pages/NotFound'
import { DevCacheResetButton } from './components/DevCacheResetButton'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path=":lang" element={<DocsLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":chapter/:page" element={<MarkdownPage />} />
            <Route path=":chapter" element={<ChapterIndexPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <DevCacheResetButton />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
