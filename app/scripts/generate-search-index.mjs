/**
 * Build-time: walks repo `library/<lang>/<chapter>/<file>.md`, emits
 * `public/search-index.json` for client-side search (titles + ##/### headings).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appDir = path.resolve(__dirname, '..')
const libraryRoot = path.resolve(appDir, '../library')
const outFile = path.join(appDir, 'public', 'search-index.json')

function firstMarkdownTitle(md) {
  for (const line of md.split('\n')) {
    const m = /^\s*#\s+(.+)$/.exec(line)
    if (m?.[1]) return m[1].trim()
  }
  return undefined
}

function humanizeSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function extractH2H3(md) {
  const headings = []
  for (const line of md.split('\n')) {
    const m = /^\s*#{2,3}\s+(.+)$/.exec(line)
    if (m?.[1]) headings.push(m[1].trim())
  }
  return headings
}

async function collectMarkdownFiles(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      files.push(...(await collectMarkdownFiles(full, base)))
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.md')) {
      files.push(full)
    }
  }
  return files
}

async function main() {
  let absFiles
  try {
    absFiles = await collectMarkdownFiles(libraryRoot)
  } catch (e) {
    console.error('[generate-search-index] Cannot read library at', libraryRoot, e)
    process.exit(1)
  }

  const chapterKeys = new Set()
  const pages = []

  for (const abs of absFiles) {
    const rel = path.relative(libraryRoot, abs).split(path.sep).join('/')
    const segments = rel.split('/')
    if (segments.length !== 3) continue

    const [lang, chapter, file] = segments
    if (!lang || !chapter || !file) continue
    const slug = file.replace(/\.md$/i, '')
    if (!slug) continue

    const repoPath = `library/${rel}`
    const raw = await fs.readFile(abs, 'utf8')
    const title = firstMarkdownTitle(raw) ?? humanizeSlug(slug)
    const headings = extractH2H3(raw)

    chapterKeys.add(`${lang}\0${chapter}`)
    pages.push({
      type: 'page',
      lang,
      chapter,
      slug,
      repoPath,
      title,
      headings,
    })
  }

  const chapters = []
  for (const key of chapterKeys) {
    const [lang, chapter] = key.split('\0')
    chapters.push({
      type: 'chapter',
      lang,
      chapter,
      title: humanizeSlug(chapter),
    })
  }

  chapters.sort((a, b) => {
    const la = `${a.lang}/${a.chapter}`
    const lb = `${b.lang}/${b.chapter}`
    return la.localeCompare(lb)
  })
  pages.sort((a, b) => {
    const pa = `${a.lang}/${a.chapter}/${a.slug}`
    const pb = `${b.lang}/${b.chapter}/${b.slug}`
    return pa.localeCompare(pb)
  })

  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    items: [...chapters, ...pages],
  }

  await fs.writeFile(outFile, JSON.stringify(payload), 'utf8')
  console.log(
    `[generate-search-index] Wrote ${outFile} (${chapters.length} chapters, ${pages.length} pages)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
