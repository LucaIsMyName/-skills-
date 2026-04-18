import { Link } from 'react-router-dom'

type Props = { lang: string; onNavigate?: () => void }

export function AppLogo({ lang, onNavigate }: Props) {
  return (
    <Link
      to={`/${lang}`}
      onClick={onNavigate}
      className="flex rotate-45 h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm font-bold tracking-tight text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
      aria-label="Home"
    >
      <div className="uppercase -rotate-45">sk</div>
    </Link>
  )
}
