import { useQuery } from '@tanstack/react-query'
import { fetchRawMarkdown } from '../lib/github'
import { queryKeys } from '../queries/keys'

export function useMarkdown(path: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: path ? queryKeys.markdown(path) : ['markdown', 'none'],
    queryFn: () => fetchRawMarkdown(path!),
    enabled: Boolean(path && enabled),
    staleTime: 1000 * 60 * 30,
  })
}
