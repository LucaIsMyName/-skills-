import { useQuery } from '@tanstack/react-query'
import { fetchLibraryIndexes } from '../lib/github'
import { queryKeys } from '../queries/keys'

export function useLibraryIndex() {
  return useQuery({
    queryKey: queryKeys.libraryIndex,
    queryFn: async () => {
      const map = await fetchLibraryIndexes()
      return {
        byLang: map,
        langs: [...map.keys()].sort(),
      }
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  })
}
