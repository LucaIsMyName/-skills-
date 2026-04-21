import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import type { Root as HastRoot } from "hast";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export type TocItem = {
  id: string;
  text: string;
  /** 2–4 — matches h2–h4; h1 is usually the doc title inside the body */
  depth: number;
};

const MIN_RANK = 2;
const MAX_RANK = 4;

/**
 * Headings IDs match what `rehype-slug` adds during render because we run the
 * same remark → rehype → rehype-slug pipeline as `react-markdown`.
 */
export function extractMarkdownToc(markdown: string): TocItem[] {
  if (!markdown.trim()) return [];

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug);

  const mdast = processor.parse(markdown);
  const tree = processor.runSync(mdast, markdown) as HastRoot;
  const items: TocItem[] = [];

  visit(tree, "element", (node) => {
    const rank = headingRank(node);
    if (!rank || rank < MIN_RANK || rank > MAX_RANK) return;
    const raw = node.properties?.id;
    const id =
      typeof raw === "string" ? raw : Array.isArray(raw) ? String(raw[0]) : "";
    if (!id) return;
    const text = toString(node).trim();
    if (!text) return;
    items.push({ id, text, depth: rank });
  });

  return items;
}
