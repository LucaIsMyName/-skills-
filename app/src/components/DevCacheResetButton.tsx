import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { clearAllPersistedDocCache } from "../lib/persistedCache";

export function DevCacheResetButton() {
  const queryClient = useQueryClient();

  if (!import.meta.env.DEV) return null;

  const clearAll = () => {
    const removed = clearAllPersistedDocCache();
    queryClient.clear();
    toast.success(`Cache cleared (${removed} local keys removed)`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={clearAll}
        className="rounded-full px-4 text-xs font-semibold uppercase tracking-wide shadow-lg"
      >
        Clear All Cache
      </Button>
    </div>
  );
}
