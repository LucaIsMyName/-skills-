import { useParams } from "react-router-dom";
import {
  resolveUiLocale,
  type UiCopy,
  type UiLocale,
  uiStrings,
} from "../lib/uiI18n";

/** UI strings for the current `:lang` route (defaults to English). */
export function useUiStrings(): UiCopy & { locale: UiLocale } {
  const { lang } = useParams<{ lang?: string }>();
  const locale = resolveUiLocale(lang);
  return { ...uiStrings[locale], locale };
}
