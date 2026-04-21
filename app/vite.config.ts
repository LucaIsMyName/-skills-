import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const appDir = path.dirname(fileURLToPath(import.meta.url));

function guardPublicToken(): {
  name: string;
  configResolved: (cfg: { env: Record<string, string> }) => void;
} {
  return {
    name: "guard-public-token",
    configResolved(cfg) {
      if (cfg.env["VITE_GITHUB_TOKEN"]) {
        throw new Error(
          "[guard-public-token] VITE_GITHUB_TOKEN is set but will be embedded in the client bundle in plain text.\n" +
            "Remove it from your .env file. Use unauthenticated API access or a server-side proxy instead.",
        );
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), guardPublicToken()],
  resolve: {
    alias: {
      "@": path.resolve(appDir, "src"),
    },
  },
});
