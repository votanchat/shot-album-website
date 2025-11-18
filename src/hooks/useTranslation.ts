import { useTheme } from "./useTheme";
import { getTranslation } from "@/utils/translation";
import { type TranslationKeys } from "@/locales";

/**
 * Client-side translation hook
 * Use this in Client Components with "use client"
 */
export function useTranslation(): TranslationKeys {
  const { language } = useTheme();
  return getTranslation(language);
}
