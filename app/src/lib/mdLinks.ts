/**
 * Map relative `.md` links to in-app routes. Returns `null` if the href should stay a normal link.
 */
export function mdLinkToAppPath(
  href: string,
  lang: string,
  chapter: string,
): string | null {
  if (!href || href.startsWith("http://") || href.startsWith("https://"))
    return null;
  if (!href.toLowerCase().endsWith(".md")) return null;

  const pathPart = href.split("#")[0] ?? href;
  const withoutMd = pathPart.replace(/\.md$/i, "").trim();

  if (withoutMd.startsWith("/")) {
    return withoutMd;
  }

  if (withoutMd.startsWith("../")) {
    const rest = withoutMd.slice(3);
    const segs = rest.split("/").filter(Boolean);
    if (segs.length >= 2) {
      const [ch, slug] = [segs[0]!, segs[1]!];
      return `/${lang}/${ch}/${slug}`;
    }
    if (segs.length === 1) {
      return `/${lang}/${chapter}/${segs[0]}`;
    }
    return null;
  }

  const noDot = withoutMd.replace(/^\.\//, "");
  if (!noDot.includes("/")) {
    return `/${lang}/${chapter}/${noDot}`;
  }

  const segs = noDot.split("/").filter(Boolean);
  if (segs.length === 2) {
    return `/${lang}/${segs[0]}/${segs[1]}`;
  }
  if (segs.length === 1) {
    return `/${lang}/${chapter}/${segs[0]}`;
  }

  return null;
}
