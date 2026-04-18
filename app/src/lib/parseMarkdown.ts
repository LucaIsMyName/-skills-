import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import type { Root } from 'mdast'

/** Parse Markdown (incl. GFM: tables, strikethrough, task lists) to mdast. */
export function parseMarkdown(markdown: string): Root {
  const file = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  return file as Root
}
