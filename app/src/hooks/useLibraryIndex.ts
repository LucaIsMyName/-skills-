import { useQuery } from "@tanstack/react-query";
import { fetchLibraryIndexes, type LangIndex } from "../lib/github";
import {
  getLibraryIndexCache,
  githubSourceKey,
  setLibraryIndexCache,
  type PersistedLibraryIndex,
} from "../lib/persistedCache";
import { queryKeys } from "../queries/keys";

function toRuntimeIndex(cached: PersistedLibraryIndex): {
  byLang: Map<string, LangIndex>;
  langs: string[];
} {
  const byLang = new Map<string, LangIndex>();
  for (const [lang, idx] of Object.entries(cached.byLang)) {
    byLang.set(lang, idx);
  }
  return {
    byLang,
    langs: cached.langs,
  };
}

export function useLibraryIndex() {
  return useQuery({
    queryKey: queryKeys.libraryIndex(githubSourceKey()),
    queryFn: async ({ signal }) => {
      const fresh = getLibraryIndexCache();
      if (fresh) return toRuntimeIndex(fresh);

      try {
        const map = await fetchLibraryIndexes(signal);
        const next = {
          byLang: map,
          langs: [...map.keys()].sort(),
        };
        const persisted: PersistedLibraryIndex = {
          langs: next.langs,
          byLang: Object.fromEntries(
            next.langs.map((lang) => [lang, map.get(lang)!]),
          ),
        };
        setLibraryIndexCache(persisted);
        return next;
      } catch (error) {
        const stale = getLibraryIndexCache({ allowExpired: true });
        if (stale) return toRuntimeIndex(stale);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 0,
  });
}
