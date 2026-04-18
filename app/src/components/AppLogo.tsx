import { Link } from 'react-router-dom'
import { tForLang } from '../lib/uiI18n'

type Props = { lang: string; onNavigate?: () => void }

export function AppLogo({ lang, onNavigate }: Props) {
  const t = tForLang(lang)
  return (
    <Link
      to={`/${lang}`}
      onClick={onNavigate}
      className="flex rotate-45 h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-400/70 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-orange-500 text-sm font-bold tracking-tight text-zinc-100 shadow-lg transition hover:border-zinc-300 hover:bg-zinc-50"
      aria-label={t.appLogoHomeAria}
    >
      <div className="uppercase -rotate-45">sk</div>
    </Link>
  )
}
