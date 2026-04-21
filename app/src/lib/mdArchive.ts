import { fetchRawMarkdown, type ExplainerMeta } from "./github";
import { downloadMarkdownFile } from "./downloadMarkdownFile";
import { getMarkdownCache, setMarkdownCache } from "./persistedCache";
import { exportFileStem } from "./strings";

const ZIP_FETCH_CONCURRENCY = 4;

async function loadMarkdownForArchive(path: string): Promise<string> {
  const fresh = getMarkdownCache(path);
  if (fresh !== undefined) return fresh;
  const body = await fetchRawMarkdown(path);
  setMarkdownCache(path, body);
  return body;
}

/** Chapter archive: `chapter-slug.zip` with one `chapter-slug-page-slug.md` per page. */
export async function downloadChapterMarkdownZip(
  chapterId: string,
  pages: ExplainerMeta[],
): Promise<void> {
  if (pages.length === 0) return;
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  for (let i = 0; i < pages.length; i += ZIP_FETCH_CONCURRENCY) {
    const chunk = pages.slice(i, i + ZIP_FETCH_CONCURRENCY);
    await Promise.all(
      chunk.map(async (p) => {
        const body = await loadMarkdownForArchive(p.path);
        zip.file(`${exportFileStem(chapterId, p.slug)}.md`, body);
      }),
    );
  }
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${chapterId}.zip`;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Single raw `.md` using the same kebab stem as ZIP entries and markdown export buttons. */
export async function downloadExplainerMarkdown(
  chapterId: string,
  page: ExplainerMeta,
): Promise<void> {
  const body = await loadMarkdownForArchive(page.path);
  downloadMarkdownFile(`${exportFileStem(chapterId, page.slug)}.md`, body);
}
