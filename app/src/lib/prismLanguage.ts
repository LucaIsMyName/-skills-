import supportedLanguages from "react-syntax-highlighter/dist/esm/languages/prism/supported-languages.js";

const SUPPORTED = new Set<string>(supportedLanguages);

/** Map markdown `language-*` class tokens to Prism / refractor language ids. */
const LANG_ALIASES: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  txt: "markup",
  text: "markup",
  jsx: "jsx",
  tsx: "tsx",
  py: "python",
  rb: "ruby",
  rs: "rust",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  yml: "yaml",
  md: "markdown",
  vue: "markup",
  html: "markup",
  svg: "markup",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  hpp: "cpp",
};

/**
 * Parses `className` from a fenced ``` block (e.g. `language-typescript`).
 */
export function prismLanguageFromClassName(className?: string): string {
  const m = /language-([^\s]+)/.exec(className ?? "");
  if (!m) return "markup";
  const raw = m[1].toLowerCase();
  return LANG_ALIASES[raw] ?? raw;
}

/** Ensures the language is registered in the bundled Prism build; safe fallback for typos. */
export function normalizePrismLanguage(id: string): string {
  if (SUPPORTED.has(id)) return id;
  return "markup";
}
