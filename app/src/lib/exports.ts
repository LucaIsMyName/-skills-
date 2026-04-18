import { Packer } from 'docx'
import { jsPDF } from 'jspdf'
import { buildDocxFromMdast } from './mdastToDocx'
import { buildStructuredPdf } from './mdastToPdf'
import { parseMarkdown } from './parseMarkdown'

export function downloadMarkdownFile(filename: string, body: string): void {
  const blob = new Blob([body], { type: 'text/markdown;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`
  a.rel = 'noopener'
  a.click()
  URL.revokeObjectURL(a.href)
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/** Native .docx from mdast: headings, lists, tables, links, emphasis, code, blockquotes. */
export async function downloadDocx(
  filename: string,
  markdown: string,
  title?: string,
): Promise<void> {
  const tree = parseMarkdown(markdown)
  const doc = buildDocxFromMdast(tree, title)
  const blob = await Packer.toBlob(doc)
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename.endsWith('.docx') ? filename : `${filename}.docx`
  a.rel = 'noopener'
  a.click()
  URL.revokeObjectURL(a.href)
}

/**
 * Native PDF from mdast (jsPDF + embedded Geist / JetBrains Mono TTFs):
 * structured text layout, not a screenshot of rendered HTML.
 */
export async function downloadPdfFromMarkdown(
  markdown: string,
  title: string,
  filename: string,
): Promise<void> {
  const safeName = filename.endsWith('.pdf') ? filename : `${filename}.pdf`
  const tree = parseMarkdown(markdown)
  const pdf = await buildStructuredPdf(tree, title)
  triggerBlobDownload(pdf.output('blob'), safeName)
}

/**
 * @deprecated Prefer `downloadPdfFromMarkdown`. Minimal plain export using only jsPDF built-ins.
 */
export async function downloadPdfPlainTextFallback(
  title: string,
  markdownBody: string,
  filename: string,
): Promise<void> {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const body = markdownBody
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(15)
  const titleLines = pdf.splitTextToSize(title, 170)
  let y = 18
  for (const line of titleLines) {
    pdf.text(line, 20, y)
    y += 7
  }
  y += 4
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  const lines = pdf.splitTextToSize(body, 170)
  for (const line of lines) {
    if (y > 285) {
      pdf.addPage()
      y = 18
    }
    pdf.text(line, 20, y)
    y += 5
  }
  triggerBlobDownload(pdf.output('blob'), filename)
}
