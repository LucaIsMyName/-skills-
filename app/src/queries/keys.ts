export const queryKeys = {
  libraryIndex: ['library-index'] as const,
  markdown: (path: string) => ['markdown', path] as const,
}
