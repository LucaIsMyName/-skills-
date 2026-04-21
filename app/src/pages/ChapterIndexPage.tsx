import { useMemo, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLibraryIndex } from "../hooks/useLibraryIndex";
import { useMarkdownH1ByPath } from "../hooks/useMarkdownH1Labels";
import { useUiStrings } from "../hooks/useUiStrings";
import { formatChapterTitle, humanizeSlug } from "../lib/strings";

export function ChapterIndexPage() {
  const { lang, chapter } = useParams<{ lang: string; chapter: string }>();
  const { data, isLoading, isError, error } = useLibraryIndex();
  const t = useUiStrings();

  const index = data?.byLang.get(lang ?? "");
  const pages = useMemo(() => {
    if (!lang || !chapter || !index?.chapters.includes(chapter)) return [];
    return index.byChapter[chapter] ?? [];
  }, [lang, chapter, index]);
  const h1Query = useMarkdownH1ByPath(pages);
  const h1ByPath = h1Query.labels;

  useEffect(() => {
    if (chapter) {
      document.title = `${formatChapterTitle(chapter)} — Skills`;
    }
  }, [chapter]);

  if (!lang || !chapter) return null;

  if (isLoading) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400" role="status">
        {t.chapterIndexLoading}
      </p>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {String(error?.message ?? t.chapterIndexIndexError)}
        </AlertDescription>
      </Alert>
    );
  }

  if (!index?.chapters.includes(chapter)) {
    const fallback = data?.langs[0];
    if (fallback) return <Navigate to={`/${fallback}`} replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {formatChapterTitle(chapter)}
      </h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {t.chapterIndexExplainersIn(pages.length)}
      </p>
      {h1Query.isError ? (
        <Alert variant="warning" className="mt-3 py-2 text-xs">
          <AlertDescription>{t.chapterIndexLabelsError}</AlertDescription>
        </Alert>
      ) : null}
      <ol className="mt-8 flex flex-col gap-2">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/${lang}/${chapter}/${p.slug}`}
              className="flex items-center justify-between gap-4 rounded border border-zinc-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {h1ByPath.get(p.path) ?? humanizeSlug(p.slug)}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                {t.chapterIndexRead}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
