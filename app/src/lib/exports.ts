import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export function downloadMarkdownFile(filename: string, body: string): void {
  const blob = new Blob([body], { type: 'text/markdown;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`
  a.rel = 'noopener'
  a.click()
  URL.revokeObjectURL(a.href)
}

function markdownToDocxParagraphs(markdown: string): Paragraph[] {
  const lines = markdown.split(/\r?\n/)
  const out: Paragraph[] = []
  for (const line of lines) {
    if (!line.trim()) {
      out.push(new Paragraph({ text: '' }))
      continue
    }
    const rule = [
      [/^(######)\s+(.*)$/, HeadingLevel.HEADING_6],
      [/^(#####)\s+(.*)$/, HeadingLevel.HEADING_5],
      [/^(####)\s+(.*)$/, HeadingLevel.HEADING_4],
      [/^(###)\s+(.*)$/, HeadingLevel.HEADING_3],
      [/^(##)\s+(.*)$/, HeadingLevel.HEADING_2],
      [/^(#)\s+(.*)$/, HeadingLevel.HEADING_1],
    ] as const
    let matched = false
    for (const [re, level] of rule) {
      const m = re.exec(line)
      if (m) {
        out.push(
          new Paragraph({
            heading: level,
            children: [new TextRun(m[2])],
          }),
        )
        matched = true
        break
      }
    }
    if (matched) continue

    const bullet = /^(\s*[-*+])\s+(.+)$/.exec(line)
    if (bullet) {
      out.push(
        new Paragraph({
          children: [new TextRun(`• ${bullet[2]}`)],
        }),
      )
      continue
    }
    out.push(new Paragraph({ children: [new TextRun(line)] }))
  }
  return out
}

export async function downloadDocx(
  filename: string,
  markdown: string,
  title?: string,
): Promise<void> {
  const children = markdownToDocxParagraphs(markdown)
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...(title
            ? [
                new Paragraph({
                  heading: HeadingLevel.TITLE,
                  children: [new TextRun(title)],
                }),
              ]
            : []),
          ...children,
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename.endsWith('.docx') ? filename : `${filename}.docx`
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

/** Plain-text PDF fallback if canvas capture fails (CORS/taint, layout, etc.) */
function downloadPdfPlainText(
  title: string,
  markdownBody: string,
  filename: string,
): void {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const body = stripMinimalMd(markdownBody)

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
  const lineHeight = 5
  const pageMax = 285
  for (const line of lines) {
    if (y > pageMax) {
      pdf.addPage()
      y = 18
    }
    pdf.text(line, 20, y)
    y += lineHeight
  }

  triggerBlobDownload(pdf.output('blob'), filename)
}

function stripMinimalMd(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[-*+]\s+/gm, '• ')
    .trim()
}

/**
 * Renders the prose block to a PDF. Uses an in-viewport (invisible) clone so
 * html2canvas gets real layout — positioning at −10000px often yields a blank canvas.
 */
export async function downloadPdfFromMarkdownElement(
  sourceElement: HTMLElement,
  filename: string,
  title: string,
  markdownFallback: string,
): Promise<void> {
  const safeName = filename.endsWith('.pdf') ? filename : `${filename}.pdf`

  const wrapper = document.createElement('div')
  wrapper.setAttribute('data-pdf-export', 'true')
  wrapper.style.boxSizing = 'border-box'
  wrapper.style.width = '794px'
  wrapper.style.padding = '48px 56px'
  wrapper.style.backgroundColor = '#fafafa'
  wrapper.style.color = '#18181b'
  wrapper.style.fontFamily =
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
  wrapper.style.fontSize = '15px'
  wrapper.style.lineHeight = '1.65'

  const head = document.createElement('div')
  head.style.borderBottom = '1px solid #d4d4d8'
  head.style.paddingBottom = '16px'
  head.style.marginBottom = '24px'
  const h = document.createElement('h1')
  h.textContent = title
  h.style.margin = '0'
  h.style.fontSize = '26px'
  h.style.fontWeight = '600'
  h.style.color = '#27272a'
  head.appendChild(h)

  const body = document.createElement('div')
  body.className =
    'prose prose-zinc max-w-none prose-headings:text-zinc-800 prose-a:text-zinc-700'
  body.innerHTML = sourceElement.innerHTML

  wrapper.appendChild(head)
  wrapper.appendChild(body)

  // Off-screen but opacity 1 — html2canvas often skips opacity:0; −10000px can break layout
  Object.assign(wrapper.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '794px',
    zIndex: '2147483646',
    opacity: '1',
    pointerEvents: 'none',
    overflow: 'visible',
    maxHeight: 'none',
    transform: 'translateX(-120vw)',
  })

  document.body.appendChild(wrapper)

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })
  void wrapper.offsetHeight

  try {
    const canvas = await html2canvas(wrapper, {
      scale: 1.5,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#fafafa',
      scrollX: 0,
      scrollY: 0,
      width: wrapper.scrollWidth,
      height: wrapper.scrollHeight,
      windowWidth: wrapper.scrollWidth,
      windowHeight: wrapper.scrollHeight,
      onclone: (_document, element) => {
        element.querySelectorAll('img, svg').forEach((n) => n.remove())
      },
    })

    if (canvas.width < 2 || canvas.height < 2) {
      throw new Error(`Invalid canvas size ${canvas.width}x${canvas.height}`)
    }

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 10
    const pdfInnerW = pageWidth - margin * 2
    const pdfInnerH = pageHeight - margin * 2

    // Slice the tall canvas into page-height chunks in pixel space, then to JPEG
    const sliceHeightPx = Math.ceil((pdfInnerH / pdfInnerW) * canvas.width)

    let yPx = 0
    let first = true
    while (yPx < canvas.height) {
      const hPx = Math.min(sliceHeightPx, canvas.height - yPx)
      const slice = document.createElement('canvas')
      slice.width = canvas.width
      slice.height = hPx
      const ctx = slice.getContext('2d')
      if (!ctx) throw new Error('Canvas 2D unsupported')
      ctx.drawImage(
        canvas,
        0,
        yPx,
        canvas.width,
        hPx,
        0,
        0,
        canvas.width,
        hPx,
      )
      const jpeg = slice.toDataURL('image/jpeg', 0.92)
      const sliceH_mm = (hPx * pdfInnerW) / canvas.width

      if (!first) pdf.addPage()
      first = false
      pdf.addImage(jpeg, 'JPEG', margin, margin, pdfInnerW, sliceH_mm)
      yPx += hPx
    }

    triggerBlobDownload(pdf.output('blob'), safeName)
  } catch (err) {
    console.error('PDF canvas export failed, using text fallback:', err)
    downloadPdfPlainText(title, markdownFallback, safeName)
  } finally {
    wrapper.remove()
  }
}
