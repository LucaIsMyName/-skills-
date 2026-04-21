/// <reference types="vite/client" />

declare module "react-syntax-highlighter/dist/esm/languages/prism/supported-languages.js" {
  const languages: readonly string[];
  export default languages;
}

interface ImportMetaEnv {
  readonly VITE_GITHUB_OWNER: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_GITHUB_REF: string;
  readonly VITE_GITHUB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
