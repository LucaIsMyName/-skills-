import { headingRank } from 'hast-util-heading-rank'
import type { Root as HastRoot } from 'hast'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * If the file starts with an ATX `#` heading, returns its plain text and the
 * markdown that follows (leading blank lines before `#` are skipped).
 * Setext-style titles are not split (left in body).
 */
export function splitLeadingAtxH1(markdown: string): {
  h1Text: string | null
  body: string
} {
  const lines = markdown.split('\n')
  let i = 0
  while (i < lines.length && lines[i]!.trim() === '') i++
  if (i >= lines.length) return { h1Text: null, body: markdown }

  const m = /^\s*#\s+(.+)$/.exec(lines[i]!)
  if (!m?.[1]) return { h1Text: null, body: markdown }

  const h1Text = m[1].trim()
  const rest = lines.slice(i + 1).join('\n').replace(/^\n+/, '')
  return { h1Text, body: rest }
}

/** `id` matches `rehype-slug` on `# plainTitle` (same pipeline as the page). */
export function rehypeSlugIdForAtxH1Text(plainTitle: string): string {
  const safe = plainTitle.replace(/\r\n/g, '\n').split('\n')[0] ?? ''
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)

  const src = `# ${safe}\n`
  const mdast = processor.parse(src)
  const tree = processor.runSync(mdast, src) as HastRoot
  let id = ''
  visit(tree, 'element', (node) => {
    if (id) return
    if (headingRank(node) === 1) {
      const raw = node.properties?.id
      id =
        typeof raw === 'string' ? raw : Array.isArray(raw) ? String(raw[0]) : ''
    }
  })
  return id
}
