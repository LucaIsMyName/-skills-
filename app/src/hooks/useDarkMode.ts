import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "theme";

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch {
    /* localStorage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyDark(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState(() => {
    const dark = getInitialDark();
    applyDark(dark);
    return dark;
  });

  useEffect(() => {
    applyDark(isDark);
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      /* localStorage unavailable */
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((d) => !d), []);

  return [isDark, toggle];
}
