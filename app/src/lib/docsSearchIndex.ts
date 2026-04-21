import Fuse from "fuse.js";

export type SearchIndexChapter = {
  type: "chapter";
  lang: string;
  chapter: string;
  title: string;
};

export type SearchIndexPage = {
  type: "page";
  lang: string;
  chapter: string;
  slug: string;
  repoPath: string;
  title: string;
  headings: string[];
};

export type SearchIndexItem = SearchIndexChapter | SearchIndexPage;

export type SearchIndexPayload = {
  version: number;
  generatedAt: string;
  items: SearchIndexItem[];
};

type FusePage = SearchIndexPage & { headingsText: string };
type FuseChapter = SearchIndexChapter & { headingsText: string };
type FuseItem = FusePage | FuseChapter;

function toFuseItem(item: SearchIndexItem): FuseItem {
  if (item.type === "chapter") {
    return { ...item, headingsText: "" };
  }
  return { ...item, headingsText: item.headings.join(" ") };
}

function stripFuseItem(item: FuseItem): SearchIndexItem {
  if (item.type === "chapter") {
    return {
      type: "chapter",
      lang: item.lang,
      chapter: item.chapter,
      title: item.title,
    };
  }
  return {
    type: "page",
    lang: item.lang,
    chapter: item.chapter,
    slug: item.slug,
    repoPath: item.repoPath,
    title: item.title,
    headings: item.headings,
  };
}

let loadPromise: Promise<SearchIndexPayload> | null = null;

export function loadSearchIndex(): Promise<SearchIndexPayload> {
  if (!loadPromise) {
    loadPromise = fetch(`${import.meta.env.BASE_URL}search-index.json`).then(
      (r) => {
        if (!r.ok) {
          throw new Error(`search-index: ${r.status}`);
        }
        return r.json() as Promise<SearchIndexPayload>;
      },
    );
  }
  return loadPromise;
}

const fuseByLang = new Map<string, Fuse<FuseItem>>();

function getFuseForLang(
  lang: string,
  items: SearchIndexItem[],
): Fuse<FuseItem> {
  const cached = fuseByLang.get(lang);
  if (cached) return cached;
  const list = items.filter((i) => i.lang === lang).map(toFuseItem);
  const fuse = new Fuse(list, {
    keys: [
      { name: "title", weight: 0.45 },
      { name: "chapter", weight: 0.2 },
      { name: "headingsText", weight: 0.35 },
    ],
    threshold: 0.42,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });
  fuseByLang.set(lang, fuse);
  return fuse;
}

const SEARCH_LIMIT = 50;

/**
 * Fuzzy search over the static index for one language. No GitHub requests.
 */
export async function searchDocs(
  lang: string,
  query: string,
): Promise<SearchIndexItem[]> {
  const q = query.trim();
  if (!q) return [];
  const data = await loadSearchIndex();
  const fuse = getFuseForLang(lang, data.items);
  return fuse
    .search(q, { limit: SEARCH_LIMIT })
    .map((r) => stripFuseItem(r.item));
}

export function searchItemToPath(item: SearchIndexItem): string {
  if (item.type === "chapter") {
    return `/${item.lang}/${item.chapter}`;
  }
  return `/${item.lang}/${item.chapter}/${item.slug}`;
}
