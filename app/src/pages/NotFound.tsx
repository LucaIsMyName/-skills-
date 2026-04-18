import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <p className="text-sm font-medium text-zinc-500">404</p>
      <h1 className="mt-2 text-xl font-semibold text-zinc-900">Page not found</h1>
      <Link to="/en" className="mt-6 text-sm font-medium text-zinc-700 underline">
        Go to home
      </Link>
    </div>
  )
}
