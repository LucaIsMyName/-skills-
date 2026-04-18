import { Link } from "react-router-dom";
import { tForLang } from "../lib/uiI18n";

type Props = { lang: string; onNavigate?: () => void };

export function AppLogo({ lang, onNavigate }: Props) {
  const t = tForLang(lang);
  return (
    <Link
      to={`/${lang}`}
      onClick={onNavigate}
      className="flex rotate-45 h-9 w-9 shrink-0 overflow-hidden items-center justify-center rounded-xl border border-orange-400/70 dark:border-orange-700/50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-orange-500 dark:bg-orange-800 dark:text-orange-50 text-sm font-medium tracking-tight text-orange-50 shadow-lg transition hover:border-orange-400 hover:shadow-md dark:hover:border-orange-900 hover:rotate-90"
      aria-label={t.appLogoHomeAria}
    >
      <div className=" text-shadow-[0.03em_0.03em_0px_rgba(0,0,0,0.1)] -rotate-90 font-mono font-medium text-center text-[9.5px] tracking-tight">
        skills
      </div>
    </Link>
  );
}
