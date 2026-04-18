/**
 * Markdown used for downloads (`.md`, Word, PDF). Always the raw file from the
 * repo — never augmented with the in-page TOC or other client-only UI.
 */
export function repositoryMarkdownForExport(md: string): string {
  return md
}
