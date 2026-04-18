import { useQueries } from '@tanstack/react-query'
import { useMemo } from 'react'
import {
  fetchRawMarkdown,
  firstMarkdownTitle,
  type ExplainerMeta,
} from '../lib/github'
import { queryKeys } from '../queries/keys'

/**
 * Fetches each file’s markdown (shared cache with `useMarkdown`) and extracts
 * the first `#` line. Used for sidebar labels aligned with page content.
 */
export function useMarkdownH1ByPath(pages: ExplainerMeta[]) {
  const results = useQueries({
    queries: pages.map((p) => ({
      queryKey: queryKeys.markdown(p.path),
      queryFn: () => fetchRawMarkdown(p.path),
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
      select: (md: string) => firstMarkdownTitle(md),
    })),
  })

  return useMemo(() => {
    const m = new Map<string, string | undefined>()
    pages.forEach((p, i) => {
      const h1 = results[i]?.data
      m.set(p.path, h1?.trim() ? h1 : undefined)
    })
    return m
  }, [pages, results])
}
