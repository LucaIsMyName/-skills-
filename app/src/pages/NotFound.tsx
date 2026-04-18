import { Link, useLocation } from 'react-router-dom'
import { resolveUiLocale, tForLang } from '../lib/uiI18n'

export function NotFound() {
  const { pathname } = useLocation()
  const lang = pathname.split('/').filter(Boolean)[0]
  const t = tForLang(lang)
  const homePath = `/${resolveUiLocale(lang)}`

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <p className="text-sm font-medium text-zinc-500">404</p>
      <h1 className="mt-2 text-xl font-semibold text-zinc-900">{t.notFoundTitle}</h1>
      <Link to={homePath} className="mt-6 text-sm font-medium text-zinc-700 underline">
        {t.notFoundHome}
      </Link>
    </div>
  )
}
