import type { jsPDF } from 'jspdf'

/** Matches Fontsource `@fontsource/geist-sans` and `@fontsource/jetbrains-mono` (see main.tsx imports). */
export const FONT_FAMILY_SANS = 'Geist Sans'
export const FONT_FAMILY_MONO = 'JetBrains Mono'

/** Inline stacks when assigning `fontFamily` in JS (no relying on CSS variables in detached nodes). */
export const FONT_STACK_SANS = `'${FONT_FAMILY_SANS}', ui-sans-serif, system-ui, sans-serif`
export const FONT_STACK_MONO = `'${FONT_FAMILY_MONO}', ui-monospace, monospace`

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return btoa(binary)
}

/** Cached VFS payloads so repeated PDF exports do not refetch. */
let vfsPayloads: {
  geistRegular: string
  geistSemiBold: string
  jetbrainsRegular: string
} | null = null

export async function loadPdfFontVfsPayloads(): Promise<{
  geistRegular: string
  geistSemiBold: string
  jetbrainsRegular: string
}> {
  if (vfsPayloads) return vfsPayloads

  const [rReg, rSb, rMono] = await Promise.all([
    fetch(`${import.meta.env.BASE_URL}fonts/GeistSans-Regular.ttf`),
    fetch(`${import.meta.env.BASE_URL}fonts/GeistSans-SemiBold.ttf`),
    fetch(`${import.meta.env.BASE_URL}fonts/JetBrainsMono-Regular.ttf`),
  ])
  if (!rReg.ok) throw new Error(`Geist Regular: ${rReg.status}`)
  if (!rSb.ok) throw new Error(`Geist SemiBold: ${rSb.status}`)
  if (!rMono.ok) throw new Error(`JetBrains Mono: ${rMono.status}`)

  vfsPayloads = {
    geistRegular: arrayBufferToBase64(await rReg.arrayBuffer()),
    geistSemiBold: arrayBufferToBase64(await rSb.arrayBuffer()),
    jetbrainsRegular: arrayBufferToBase64(await rMono.arrayBuffer()),
  }
  return vfsPayloads
}

/** Register Geist + JetBrains Mono on a jsPDF instance (call once per document). */
export function registerFontsOnJsPdf(
  pdf: jsPDF,
  payloads: Awaited<ReturnType<typeof loadPdfFontVfsPayloads>>,
): void {
  pdf.addFileToVFS('GeistSans-Regular.ttf', payloads.geistRegular)
  pdf.addFileToVFS('GeistSans-SemiBold.ttf', payloads.geistSemiBold)
  pdf.addFileToVFS('JetBrainsMono-Regular.ttf', payloads.jetbrainsRegular)

  pdf.addFont('GeistSans-Regular.ttf', 'GeistSans', 'normal')
  pdf.addFont('GeistSans-SemiBold.ttf', 'GeistSans', 'bold')
  pdf.addFont('JetBrainsMono-Regular.ttf', 'JetBrainsMono', 'normal')
}

/** Wait for hosted fonts before measuring or rasterizing DOM that uses them. */
export async function ensureWebFontsReadyForPdf(): Promise<void> {
  await document.fonts.ready
  await Promise.all([
    document.fonts.load(`400 16px '${FONT_FAMILY_SANS}'`),
    document.fonts.load(`600 26px '${FONT_FAMILY_SANS}'`),
    document.fonts.load(`400 14px '${FONT_FAMILY_MONO}'`),
  ])
}
