export const queryKeys = {
  libraryIndex: ['library-index'] as const,
  markdown: (path: string) => ['markdown', path] as const,
  markdownH1Batch: (pathSignature: string) =>
    ['markdown-h1-batch', pathSignature] as const,
}
