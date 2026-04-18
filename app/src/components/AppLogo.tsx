import { Link } from 'react-router-dom'
import { tForLang } from '../lib/uiI18n'

type Props = { lang: string; onNavigate?: () => void }

export function AppLogo({ lang, onNavigate }: Props) {
  const t = tForLang(lang)
  return (
    <Link
      to={`/${lang}`}
      onClick={onNavigate}
      className="flex rotate-45 h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-400/70 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-orange-500 text-sm font-medium tracking-tight text-zinc-100 shadow-lg transition hover:border-orange-500 "
      aria-label={t.appLogoHomeAria}
    >
      <div className="uppercase -rotate-45 font-mono text-center">sk</div>
    </Link>
  )
}
