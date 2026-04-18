/** Turn a URL slug into a short readable label (fallback when no H1). */
export function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Humanize folder slug for chapter cards */
export function formatChapterTitle(chapterId: string): string {
  return humanizeSlug(chapterId)
}
