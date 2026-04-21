import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Component, lazy, Suspense } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DocsLayout } from "./layouts/DocsLayout";
import { ChapterIndexPage } from "./pages/ChapterIndexPage";
import { HomePage } from "./pages/HomePage";
import { MarkdownPage } from "./pages/MarkdownPage";
import { NotFound } from "./pages/NotFound";
import { getLibraryIndexCache } from "./lib/persistedCache";

type ErrorBoundaryState = { hasError: boolean; message: string };

class AppErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("[AppErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-center">
          <Alert variant="destructive" className="max-w-md text-left">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{this.state.message}</AlertDescription>
          </Alert>
          <Button variant="outline" render={<a href="/" />}>
            Go home
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

const DevCacheResetButton = import.meta.env.DEV
  ? lazy(() =>
      import("./components/DevCacheResetButton").then((m) => ({
        default: m.DevCacheResetButton,
      })),
    )
  : null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function DefaultLangRedirect() {
  const cached = getLibraryIndexCache({ allowExpired: true });
  const firstLang = cached?.langs[0] ?? "en";
  return <Navigate to={`/${firstLang}`} replace />;
}

export default function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DefaultLangRedirect />} />
              <Route path=":lang" element={<DocsLayout />}>
                <Route index element={<HomePage />} />
                <Route path=":chapter/:page" element={<MarkdownPage />} />
                <Route path=":chapter" element={<ChapterIndexPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            {DevCacheResetButton && (
              <Suspense>
                <DevCacheResetButton />
              </Suspense>
            )}
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}
