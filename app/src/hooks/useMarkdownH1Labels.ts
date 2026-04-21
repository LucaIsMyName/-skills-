import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  fetchRawMarkdown,
  firstMarkdownTitle,
  type ExplainerMeta,
} from "../lib/github";
import {
  getMarkdownCache,
  githubSourceKey,
  setMarkdownCache,
} from "../lib/persistedCache";
import { queryKeys } from "../queries/keys";

/** Max parallel raw fetches per chapter when resolving sidebar H1 labels. */
const H1_FETCH_CONCURRENCY = 4;

function pathsSignature(pages: ExplainerMeta[]): string {
  return pages
    .map((p) => p.path)
    .slice()
    .sort()
    .join("\0");
}

/**
 * Loads each file’s markdown with bounded concurrency, extracts the first `#` line
 * for sidebar labels, and writes into the shared `markdown` query cache so navigation
 * to a page reuses the same data as `useMarkdown`.
 */
export function useMarkdownH1ByPath(pages: ExplainerMeta[]) {
  const queryClient = useQueryClient();
  const sig = useMemo(() => pathsSignature(pages), [pages]);
  const sourceKey = githubSourceKey();

  const query = useQuery({
    queryKey: queryKeys.markdownH1Batch(`${sourceKey}:${sig}`),
    queryFn: async () => {
      const map = new Map<string, string | undefined>();
      for (let i = 0; i < pages.length; i += H1_FETCH_CONCURRENCY) {
        const chunk = pages.slice(i, i + H1_FETCH_CONCURRENCY);
        await Promise.all(
          chunk.map(async (p) => {
            let md = getMarkdownCache(p.path);
            if (md === undefined) {
              try {
                md = await fetchRawMarkdown(p.path);
                setMarkdownCache(p.path, md);
              } catch (error) {
                md = getMarkdownCache(p.path, { allowExpired: true });
                if (md === undefined) throw error;
              }
            }
            queryClient.setQueryData(queryKeys.markdown(p.path, sourceKey), md);
            const h1 = firstMarkdownTitle(md);
            map.set(p.path, h1?.trim() ? h1 : undefined);
          }),
        );
      }
      return map;
    },
    enabled: pages.length > 0,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const labels = useMemo(
    () => query.data ?? new Map<string, string | undefined>(),
    [query.data],
  );

  return {
    labels,
    isError: query.isError,
    error: query.error,
  };
}
