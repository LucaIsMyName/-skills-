import { Link, useLocation } from "react-router-dom";
import type { LangIndex } from "../lib/github";
import { tForLang } from "../lib/uiI18n";

type Props = {
  langs: string[];
  indexes: Map<string, LangIndex>;
  currentLang: string;
};

export function LangSwitch({ langs, indexes, currentLang }: Props) {
  const t = tForLang(currentLang);
  const { pathname } = useLocation();

  function targetFor(targetLang: string): string {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 1) return `/${targetLang}`;
    const [, chapter, page] = segments;
    if (!chapter) return `/${targetLang}`;

    const other = indexes.get(targetLang);
    if (!other?.chapters.includes(chapter)) return `/${targetLang}`;

    if (page) {
      const pages = other.byChapter[chapter];
      const has = pages?.some((p) => p.slug === page);
      if (has) return `/${targetLang}/${chapter}/${page}`;
    }

    return `/${targetLang}/${chapter}`;
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-sm border border-zinc-200 bg-zinc-100/80 dark:bg-zinc-800/50 dark:border-zinc-700 p-0.5 shadow-[theme(shadow.sm),inset_1px_1px_3px,rgba(0,0,0,0.1)] "
      role="group"
      aria-label={t.langSwitchAria}
    >
      {langs.map((l) => (
        <Link
          key={l}
          to={targetFor(l)}
          className={[
            "min-w-[3.25rem] md:min-w-[2.25rem] rounded-sm px-1 md:px-2 py-1 md:py-0 text-center text-[11px] md:text-[13px] font-semibold uppercase tracking-wide transition-colors",
            l === currentLang
              ? "bg-white text-zinc-900 dark:text-zinc-100 dark:bg-zinc-800  dark:border-zinc-700 shadow-sm border-zinc-300 border "
              : "text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:hover:text-zinc-200 dark:hover:border-zinc-700 border-transparent border",
          ].join(" ")}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
