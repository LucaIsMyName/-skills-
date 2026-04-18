export const queryKeys = {
  libraryIndex: (sourceKey: string) => ['library-index', sourceKey] as const,
  markdown: (path: string, sourceKey: string) =>
    ['markdown', sourceKey, path] as const,
  markdownH1Batch: (pathSignature: string) =>
    ['markdown-h1-batch', pathSignature] as const,
}
