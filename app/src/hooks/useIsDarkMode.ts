import { useSyncExternalStore } from "react";

/** Tracks `class="dark"` on `<html>` (same source as `useDarkMode`), for components that must not duplicate theme state. */
function subscribe(callback: () => void) {
  const el = document.documentElement;
  const mo = new MutationObserver(() => callback());
  mo.observe(el, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function useIsDarkMode(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
