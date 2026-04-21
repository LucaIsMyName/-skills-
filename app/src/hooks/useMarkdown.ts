import { useQuery } from "@tanstack/react-query";
import { fetchRawMarkdown } from "../lib/github";
import {
  getMarkdownCache,
  githubSourceKey,
  setMarkdownCache,
} from "../lib/persistedCache";
import { queryKeys } from "../queries/keys";

export function useMarkdown(path: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: path
      ? queryKeys.markdown(path, githubSourceKey())
      : ["markdown", "none"],
    queryFn: async ({ signal }) => {
      const markdownPath = path!;
      const fresh = getMarkdownCache(markdownPath);
      if (fresh !== undefined) return fresh;
      try {
        const md = await fetchRawMarkdown(markdownPath, signal);
        setMarkdownCache(markdownPath, md);
        return md;
      } catch (error) {
        const stale = getMarkdownCache(markdownPath, { allowExpired: true });
        if (stale !== undefined) return stale;
        throw error;
      }
    },
    enabled: Boolean(path && enabled),
    staleTime: 1000 * 60 * 30,
    retry: 0,
  });
}
