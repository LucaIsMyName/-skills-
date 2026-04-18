import { Check, Copy } from 'lucide-react'
import {
  Children,
  isValidElement,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactElement,
  type ReactNode,
} from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'
import { useIsDarkMode } from '../hooks/useIsDarkMode'
import { useUiStrings } from '../hooks/useUiStrings'
import { normalizePrismLanguage, prismLanguageFromClassName } from '../lib/prismLanguage'

function codeTextFromNode(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(codeTextFromNode).join('')
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    if (props.children != null) return codeTextFromNode(props.children)
  }
  return ''
}

function findCodeChild(nodes: ReactNode): ReactElement<{
  className?: string
  children?: ReactNode
}> | null {
  const arr = Children.toArray(nodes)
  for (const c of arr) {
    if (isValidElement(c) && c.type === 'code') {
      return c as ReactElement<{ className?: string; children?: ReactNode }>
    }
  }
  return null
}

type PreProps = ComponentPropsWithoutRef<'pre'>

/** Fenced ``` blocks: Prism highlighting + copy (plain `pre` if structure is unexpected). */
export function MarkdownPreWithCopy({ children, className, ...rest }: PreProps): JSX.Element {
  const isDark = useIsDarkMode()
  const t = useUiStrings()
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const codeChild = findCodeChild(children)
  const codeString = codeChild ? codeTextFromNode(codeChild.props.children).replace(/\n$/, '') : ''

  async function handleCopy() {
    const text =
      codeString ||
      (preRef.current?.querySelector('code')?.textContent ??
        preRef.current?.textContent ??
        '')
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard API unavailable or blocked */
    }
  }

  if (codeChild) {
    const language = normalizePrismLanguage(prismLanguageFromClassName(codeChild.props.className))
    const theme = isDark ? oneDark : oneLight
    return (
      <div className="not-prose relative my-4">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => void handleCopy()}
          className="absolute right-2 top-2 z-10 shadow-sm"
          aria-label={copied ? t.copyCodeCopied : t.copyCode}
        >
          {copied ? (
            <Check className="size-4" strokeWidth={2} aria-hidden />
          ) : (
            <Copy className="size-4" strokeWidth={2} aria-hidden />
          )}
        </Button>
        <SyntaxHighlighter
          language={language}
          style={theme}
          PreTag="div"
          showLineNumbers={false}
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: '1rem 3rem 1rem 1rem',
            borderRadius: 'var(--radius)',
            fontSize: '0.8125rem',
            lineHeight: 1.65,
            border: '1px solid var(--border)',
          }}
          codeTagProps={{
            className: 'font-mono',
            style: { fontFamily: 'var(--font-mono)' },
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    )
  }

  return (
    <div className="relative my-4">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => void handleCopy()}
        className="absolute right-2 top-2 z-10 shadow-sm"
        aria-label={copied ? t.copyCodeCopied : t.copyCode}
      >
        {copied ? (
          <Check className="size-4" strokeWidth={2} aria-hidden />
        ) : (
          <Copy className="size-4" strokeWidth={2} aria-hidden />
        )}
      </Button>
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

  async function handleCopy() {
    const text = wrapRef.current?.querySelector('code')?.textContent ?? ''
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard API unavailable or blocked */
    }
  }

  return (
    <span ref={wrapRef} className="inline-flex max-w-full items-baseline gap-1">
      <code className={className} {...rest}>
        {children}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => void handleCopy()}
        className="-mb-px h-6 min-w-6 shrink-0 px-0 text-muted-foreground"
        aria-label={copied ? t.copyCodeCopied : t.copyCode}
      >
        {copied ? (
          <Check className="size-3" strokeWidth={2.5} aria-hidden />
        ) : (
          <Copy className="size-3" strokeWidth={2} aria-hidden />
        )}
      </Button>
    </span>
  )
}
