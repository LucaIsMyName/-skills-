import type { Content, PhrasingContent, Root } from 'mdast'
import { jsPDF } from 'jspdf'
import { loadPdfFontVfsPayloads, registerFontsOnJsPdf } from './pdfFonts'

type PdfRun = { text: string; bold?: boolean; mono?: boolean }
type PhrasingStyle = { bold?: boolean; mono?: boolean }

function phrasingToRuns(n: PhrasingContent, ctx: PhrasingStyle = {}): PdfRun[] {
  switch (n.type) {
    case 'text':
      return [{ text: n.value, bold: ctx.bold, mono: ctx.mono }]
    case 'strong':
      return n.children.flatMap((c) =>
        phrasingToRuns(c as PhrasingContent, { ...ctx, bold: true }),
      )
    case 'emphasis':
      return n.children.flatMap((c) =>
        phrasingToRuns(c as PhrasingContent, ctx),
      )
    case 'delete':
      return n.children.flatMap((c) =>
        phrasingToRuns(c as PhrasingContent, ctx),
      )
    case 'inlineCode':
      return [{ text: n.value, mono: true }]
    case 'link': {
      const inner = n.children.flatMap((c) =>
        phrasingToRuns(c as PhrasingContent, ctx),
      )
      const url = n.url
      if (url && url !== '') {
        return [...inner, { text: ` (${url})`, mono: false, bold: false }]
      }
      return inner
    }
    case 'break':
      return [{ text: '\n' }]
    case 'image':
      return [{ text: `[image: ${n.alt || ''}]`, mono: false }]
    case 'html':
      return [{ text: n.value, mono: true }]
    default:
      return []
  }
}

function flattenPhrasing(nodes: PhrasingContent[]): PdfRun[] {
  const out: PdfRun[] = []
  for (const n of nodes) {
    out.push(...phrasingToRuns(n))
  }
  const merged: PdfRun[] = []
  for (const r of out) {
    const last = merged[merged.length - 1]
    if (
      last &&
      last.bold === r.bold &&
      last.mono === r.mono &&
      !last.text.includes('\n') &&
      !r.text.includes('\n')
    ) {
      last.text += r.text
    } else {
      merged.push({ ...r })
    }
  }
  return merged
}

function pageBottom(pdf: jsPDF): number {
  return pdf.internal.pageSize.getHeight() - 15
}

function drawRunsLine(
  pdf: jsPDF,
  runs: PdfRun[],
  _x: number,
  y: number,
  margin: number,
  maxX: number,
): number {
  const pageH = pageBottom(pdf)
  let cx = margin
  let cy = y
  const lineH = (mono: boolean) => (mono ? 4.8 : 5.2)

  for (const run of runs) {
    const mono = !!run.mono
    const name = mono ? 'JetBrainsMono' : 'GeistSans'
    const style = run.bold ? 'bold' : 'normal'
    pdf.setFont(name, style)
    pdf.setFontSize(mono ? 9 : 10)

    const chunks = run.text.split(/(\n)/)
    for (const chunk of chunks) {
      if (chunk === '\n') {
        cy += lineH(mono)
        cx = margin
        if (cy > pageH) {
          pdf.addPage()
          cy = margin
        }
        continue
      }
      if (!chunk) continue
      const words = chunk.split(/(\s+)/)
      for (const w of words) {
        if (!w) continue
        const tw = pdf.getTextWidth(w)
        if (cx + tw > maxX && cx > margin) {
          cy += lineH(mono)
          cx = margin
          if (cy > pageH) {
            pdf.addPage()
            cy = margin
          }
        }
        pdf.text(w, cx, cy)
        cx += tw
      }
    }
  }
  return cy + lineH(runs.some((r) => r.mono))
}

function drawWrappedPlain(
  pdf: jsPDF,
  text: string,
  _x: number,
  y: number,
  margin: number,
  maxW: number,
): number {
  pdf.setFont('GeistSans', 'normal')
  pdf.setFontSize(10)
  const lines = pdf.splitTextToSize(text, maxW - margin)
  const pageH = pageBottom(pdf)
  let cy = y
  for (const line of lines) {
    if (cy > pageH) {
      pdf.addPage()
      cy = margin
    }
    pdf.text(line, margin, cy)
    cy += 5.2
  }
  return cy
}

function renderBlocks(
  pdf: jsPDF,
  nodes: Content[],
  y: number,
  margin: number,
  maxX: number,
  listDepth: number,
): number {
  let cy = y
  const pageH = pageBottom(pdf)

  for (const node of nodes) {
    if (cy > pageH) {
      pdf.addPage()
      cy = margin
    }

    switch (node.type) {
      case 'heading': {
        pdf.setFont('GeistSans', 'bold')
        const size = Math.max(11, 18 - node.depth * 1.5)
        pdf.setFontSize(size)
        const runs = flattenPhrasing(node.children as PhrasingContent[])
        cy = drawRunsLine(pdf, runs, margin, cy, margin, maxX) + 4
        pdf.setFontSize(10)
        break
      }
      case 'paragraph': {
        cy = drawRunsLine(
          pdf,
          flattenPhrasing(node.children as PhrasingContent[]),
          margin,
          cy,
          margin,
          maxX,
        )
        cy += 3
        break
      }
      case 'code': {
        pdf.setFont('JetBrainsMono', 'normal')
        pdf.setFontSize(9)
        const block = node.value.replace(/\r\n/g, '\n')
        const lines = block.split('\n')
        for (const line of lines) {
          if (cy > pageH) {
            pdf.addPage()
            cy = margin
          }
          const wrapped = pdf.splitTextToSize(line, maxX - margin - 10)
          for (const wl of wrapped) {
            if (cy > pageH) {
              pdf.addPage()
              cy = margin
            }
            pdf.text(wl, margin + 5, cy)
            cy += 4.8
          }
        }
        cy += 3
        break
      }
      case 'blockquote': {
        const nest = margin + 8
        cy = renderBlocks(
          pdf,
          node.children as Content[],
          cy,
          nest,
          maxX,
          listDepth,
        )
        cy += 4
        break
      }
      case 'list': {
        let n = 1
        for (const item of node.children) {
          if (item.type !== 'listItem') continue
          const pre =
            typeof item.checked === 'boolean'
              ? item.checked
                ? '☑ '
                : '☐ '
              : node.ordered
                ? `${n++}. `
                : '• '
          let first = true
          for (const ch of item.children) {
            if (ch.type === 'paragraph') {
              const indent = margin + listDepth * 6
              pdf.setFont('GeistSans', 'normal')
              pdf.setFontSize(10)
              const runs = flattenPhrasing(ch.children as PhrasingContent[])
              const prefixRun: PdfRun[] = first
                ? [{ text: pre }]
                : [{ text: ' '.repeat(pre.length) }]
              first = false
              cy = drawRunsLine(
                pdf,
                [...prefixRun, ...runs],
                indent,
                cy,
                indent,
                maxX,
              )
            } else if (ch.type === 'list') {
              cy = renderBlocks(
                pdf,
                [ch as Content],
                cy,
                margin,
                maxX,
                listDepth + 1,
              )
            } else {
              cy = renderBlocks(pdf, [ch as Content], cy, margin, maxX, listDepth)
            }
          }
        }
        cy += 3
        break
      }
      case 'thematicBreak': {
        cy += 6
        if (cy > pageH) {
          pdf.addPage()
          cy = margin
        }
        pdf.setDrawColor(200)
        pdf.line(margin, cy, maxX, cy)
        cy += 8
        break
      }
      case 'table': {
        for (const row of node.children) {
          if (row.type !== 'tableRow') continue
          const cells = row.children.map((cell) =>
            flattenPhrasing(cell.children as PhrasingContent[])
              .map((r) => r.text)
              .join('') || ' ',
          )
          const line = cells.join('  |  ')
          cy = drawWrappedPlain(pdf, line, margin, cy, margin, maxX)
        }
        cy += 4
        break
      }
      default:
        cy += 4
    }
  }
  return cy
}

/** Structured PDF from markdown AST (native fonts, no canvas raster). */
export async function buildStructuredPdf(
  tree: Root,
  title: string,
): Promise<jsPDF> {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const payloads = await loadPdfFontVfsPayloads()
  registerFontsOnJsPdf(pdf, payloads)

  const margin = 20
  const maxX = pdf.internal.pageSize.getWidth() - margin
  let y = margin

  pdf.setFont('GeistSans', 'bold')
  pdf.setFontSize(15)
  const titleLines = pdf.splitTextToSize(title, maxX - margin)
  for (const tl of titleLines) {
    pdf.text(tl, margin, y)
    y += 8
  }
  y += 6

  y = renderBlocks(pdf, tree.children as Content[], y, margin, maxX, 0)

  return pdf
}
