import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { clearAllPersistedDocCache } from '../lib/persistedCache'

export function DevCacheResetButton() {
  const queryClient = useQueryClient()
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  if (!import.meta.env.DEV) return null

  const clearAll = () => {
    const removed = clearAllPersistedDocCache()
    queryClient.clear()
    setLastMessage(`Cache cleared (${removed} local keys removed)`)
    window.setTimeout(() => setLastMessage(null), 2500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {lastMessage ? (
        <p className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-700 shadow">
          {lastMessage}
        </p>
      ) : null}
      <button
        type="button"
        onClick={clearAll}
        className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-zinc-700"
      >
        Clear All Cache
      </button>
    </div>
  )
}
