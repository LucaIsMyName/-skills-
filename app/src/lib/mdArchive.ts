import JSZip from 'jszip'
import { fetchRawMarkdown, type ExplainerMeta } from './github'
import { downloadMarkdownFile } from './exports'
import { exportFileStem } from './strings'

/** Chapter archive: `chapter-slug.zip` with one `chapter-slug-page-slug.md` per page. */
export async function downloadChapterMarkdownZip(
  chapterId: string,
  pages: ExplainerMeta[],
): Promise<void> {
  if (pages.length === 0) return
  const zip = new JSZip()
  await Promise.all(
    pages.map(async (p) => {
      const body = await fetchRawMarkdown(p.path)
      zip.file(`${exportFileStem(chapterId, p.slug)}.md`, body)
    }),
  )
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${chapterId}.zip`
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/** Single raw `.md` using the same kebab stem as ZIP entries and markdown export buttons. */
export async function downloadExplainerMarkdown(
  chapterId: string,
  page: ExplainerMeta,
): Promise<void> {
  const body = await fetchRawMarkdown(page.path)
  downloadMarkdownFile(`${exportFileStem(chapterId, page.slug)}.md`, body)
}
