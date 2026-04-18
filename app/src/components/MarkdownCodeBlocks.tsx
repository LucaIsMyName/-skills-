import { Check, Copy } from 'lucide-react'
import {
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type JSX,
} from 'react'
import { useUiStrings } from '../hooks/useUiStrings'

type PreProps = ComponentPropsWithoutRef<'pre'>

/** Fenced ``` blocks: `pre` → copy full text of inner `code`. */
export function MarkdownPreWithCopy({ children, className, ...rest }: PreProps): JSX.Element {
  const t = useUiStrings()
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const pre = preRef.current
    const codeEl = pre?.querySelector('code')
    const text = codeEl?.textContent ?? pre?.textContent ?? ''
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard API unavailable or blocked */
    }
  }, [])

  return (
    <div className="relative my-4">
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="absolute right-2 top-2 z-10 rounded-md border border-zinc-200 bg-white p-1.5 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        aria-label={copied ? t.copyCodeCopied : t.copyCode}
      >
        {copied ? (
          <Check className="size-4" strokeWidth={2} aria-hidden />
        ) : (
          <Copy className="size-4" strokeWidth={2} aria-hidden />
        )}
      </button>
      <pre ref={preRef} className={className} {...rest}>
        {children}
      </pre>
    </div>
  )
}

type CodeProps = ComponentPropsWithoutRef<'code'> & { inline?: boolean }
type InlineCodeProps = Omit<CodeProps, 'inline'>

/** Backtick `inline` spans: small copy control next to the code. */
export function MarkdownInlineCode({
  children,
  className,
  ...rest
}: InlineCodeProps): JSX.Element {
  const t = useUiStrings()
  const wrapRef = useRef<HTMLSpanElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const text = wrapRef.current?.querySelector('code')?.textContent ?? ''
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard API unavailable or blocked */
    }
  }, [])

  return (
    <span ref={wrapRef} className="inline-flex max-w-full items-baseline gap-1">
      <code className={className} {...rest}>
        {children}
      </code>
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="-mb-px inline-flex shrink-0 rounded p-0.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        aria-label={copied ? t.copyCodeCopied : t.copyCode}
      >
        {copied ? (
          <Check className="size-3" strokeWidth={2.5} aria-hidden />
        ) : (
          <Copy className="size-3" strokeWidth={2} aria-hidden />
        )}
      </button>
    </span>
  )
}
