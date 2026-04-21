/** Tiny .md download helper — no docx/jspdf/jszip. Safe to import from the main bundle. */
export function downloadMarkdownFile(filename: string, body: string): void {
  const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith(".md") ? filename : `${filename}.md`;
  a.rel = "noopener";
  a.click();
  URL.revokeObjectURL(a.href);
}
