import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

export function DarkModeToggle() {
  const [isDark, toggle] = useDarkMode()

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center justify-center rounded border border-zinc-300 bg-white p-1.5 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 dark:hover:border-zinc-600"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="size-3" strokeWidth={2} aria-hidden />
      ) : (
        <Moon className="size-3" strokeWidth={2} aria-hidden />
      )}
    </button>
  )
}
