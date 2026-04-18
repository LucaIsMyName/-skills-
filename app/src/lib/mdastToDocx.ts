import type { Content, PhrasingContent, Root } from 'mdast'
import {
  Document,
  ExternalHyperlink,
  HeadingLevel,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
} from 'docx'
import type { ParagraphChild } from 'docx'

const FONT_SANS = 'Geist Sans'
const FONT_MONO = 'JetBrains Mono'

type RunCtx = { bold?: boolean; italic?: boolean; strike?: boolean; mono?: boolean }

function phrasingToChildren(
  nodes: PhrasingContent[],
  ctx: RunCtx = {},
): ParagraphChild[] {
  const out: ParagraphChild[] = []
  for (const n of nodes) {
    out.push(...phrasingOne(n, ctx))
  }
  return out
}

function phrasingOne(n: PhrasingContent, ctx: RunCtx): ParagraphChild[] {
  switch (n.type) {
    case 'text':
      return [
        new TextRun({
          text: n.value,
          bold: ctx.bold,
          italics: ctx.italic,
          strike: ctx.strike,
          font: ctx.mono ? FONT_MONO : FONT_SANS,
          size: ctx.mono ? 20 : undefined,
        }),
      ]
    case 'strong':
      return n.children.flatMap((c) =>
        phrasingOne(c as PhrasingContent, { ...ctx, bold: true }),
      )
    case 'emphasis':
      return n.children.flatMap((c) =>
        phrasingOne(c as PhrasingContent, { ...ctx, italic: true }),
      )
    case 'delete':
      return n.children.flatMap((c) =>
        phrasingOne(c as PhrasingContent, { ...ctx, strike: true }),
      )
    case 'inlineCode':
      return [
        new TextRun({
          text: n.value,
          font: FONT_MONO,
          size: 20,
        }),
      ]
    case 'link':
      return [
        new ExternalHyperlink({
          link: n.url,
          children: phrasingToChildren(n.children as PhrasingContent[], ctx),
        }),
      ]
    case 'break':
      return [new TextRun({ break: 1 })]
    case 'image':
      return [
        new TextRun({
          text: `[image: ${n.alt || 'image'}]`,
          italics: true,
          font: FONT_SANS,
        }),
      ]
    case 'html':
      return [new TextRun({ text: n.value, font: FONT_MONO, size: 18 })]
    default:
      return [new TextRun({ text: '' })]
  }
}

function headingLevel(depth: number): (typeof HeadingLevel)[keyof typeof HeadingLevel] {
  const d = Math.min(6, Math.max(1, depth)) as 1 | 2 | 3 | 4 | 5 | 6
  const m = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4,
    5: HeadingLevel.HEADING_5,
    6: HeadingLevel.HEADING_6,
  } as const
  return m[d]
}

/** One mdast block → native docx blocks */
export function blockToDocx(node: Content): (Paragraph | Table)[] {
  switch (node.type) {
    case 'heading':
      return [
        new Paragraph({
          heading: headingLevel(node.depth),
          children: phrasingToChildren(node.children as PhrasingContent[]),
          spacing: { before: 160, after: 100 },
        }),
      ]
    case 'paragraph':
      return [
        new Paragraph({
          children:
            phrasingToChildren(node.children as PhrasingContent[]).length > 0
              ? phrasingToChildren(node.children as PhrasingContent[])
              : [new TextRun({ text: '\u00a0' })],
        }),
      ]
    case 'blockquote': {
      const parts: Paragraph[] = []
      for (const child of node.children) {
        if (child.type === 'paragraph') {
          parts.push(
            new Paragraph({
              border: {
                left: {
                  color: 'd4d4d8',
                  space: 8,
                  size: 12,
                  style: 'single',
                },
              },
              indent: { left: 400 },
              spacing: { before: 60, after: 60 },
              children: phrasingToChildren(child.children as PhrasingContent[]),
            }),
          )
        } else {
          for (const p of blockToDocx(child)) {
            if (!(p instanceof Table)) parts.push(p)
          }
        }
      }
      return parts.length ? parts : [new Paragraph({ children: [new TextRun('')] })]
    }
    case 'code':
      return [
        new Paragraph({
          shading: { fill: 'FAFAFA', type: ShadingType.CLEAR },
          spacing: { before: 120, after: 120 },
          children: [
            new TextRun({
              text: node.value.replace(/\r\n/g, '\n'),
              font: FONT_MONO,
              size: 20,
            }),
          ],
        }),
      ]
    case 'list':
      return listItemsToParagraphs(
        node.children.filter((c) => c.type === 'listItem'),
        node.ordered ?? false,
        0,
      )
    case 'thematicBreak':
      return [
        new Paragraph({
          border: {
            bottom: { color: 'd4d4d8', space: 1, style: 'single', size: 6 },
          },
          spacing: { before: 160, after: 160 },
          children: [new TextRun('')],
        }),
      ]
    case 'table': {
      const rows = node.children.filter(
        (r): r is import('mdast').TableRow => r.type === 'tableRow',
      )
      const tableRows = rows.map(
        (row) =>
          new TableRow({
            children: row.children.map((cell) => {
              const cellRuns = phrasingToChildren(
                cell.children as PhrasingContent[],
              )
              return new TableCell({
                children: [
                  new Paragraph({
                    children: cellRuns.length
                      ? cellRuns
                      : [new TextRun({ text: '\u00a0' })],
                  }),
                ],
              })
            }),
          }),
      )
      return [
        new Table({
          layout: TableLayoutType.FIXED,
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: tableRows,
        }),
      ]
    }
    case 'footnoteDefinition':
    case 'html':
    case 'yaml':
      return [new Paragraph({ children: [new TextRun('')] })]
    default:
      return [
        new Paragraph({
          children: [new TextRun({ text: `[${(node as Content).type}]` })],
        }),
      ]
  }
}

function listItemsToParagraphs(
  items: import('mdast').ListItem[],
  ordered: boolean,
  depth: number,
): Paragraph[] {
  const out: Paragraph[] = []
  let idx = 1
  for (const item of items) {
    const prefixFirst = (): string =>
      typeof item.checked === 'boolean'
        ? item.checked
          ? '☑ '
          : '☐ '
        : ordered
          ? `${idx++}. `
          : '• '

    let isFirstPara = true
    for (const child of item.children) {
      if (child.type === 'paragraph') {
        const pre = isFirstPara ? prefixFirst() : ''
        isFirstPara = false
        const bodyRuns = phrasingToChildren(
          child.children as PhrasingContent[],
        )
        const children: ParagraphChild[] = pre
          ? [new TextRun({ text: pre }), ...bodyRuns]
          : bodyRuns
        out.push(
          new Paragraph({
            indent: { left: 360 + depth * 280 },
            spacing: { before: 40, after: 40 },
            children,
          }),
        )
      } else if (child.type === 'list') {
        out.push(
          ...listItemsToParagraphs(
            child.children.filter((c) => c.type === 'listItem'),
            child.ordered ?? false,
            depth + 1,
          ),
        )
      } else {
        for (const p of blockToDocx(child as Content)) {
          if (!(p instanceof Table)) out.push(p)
        }
      }
    }
  }
  return out
}

export function buildDocxFromMdast(tree: Root, documentTitle?: string): Document {
  const sectionChildren: (Paragraph | Table)[] = []
  if (documentTitle) {
    sectionChildren.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun({ text: documentTitle, font: FONT_SANS })],
        spacing: { after: 240 },
      }),
    )
  }

  for (const node of tree.children) {
    sectionChildren.push(...blockToDocx(node as Content))
  }

  return new Document({
    sections: [
      {
        properties: {},
        children: sectionChildren,
      },
    ],
  })
}
