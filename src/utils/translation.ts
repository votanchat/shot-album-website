import { translations, type Locale, type TranslationKeys } from "@/locales";

/**
 * Server-side translation function
 * Use this in Server Components
 */
export function getTranslation(language?: string): TranslationKeys {
  // Normalize language code (handle 'vi-VN' → 'vi', 'en-US' → 'en')
  const normalizedLang = language?.split("-")[0].toLowerCase() as Locale;

  // Return appropriate translations, fallback to Vietnamese
  return translations[normalizedLang] || translations.vi;
}

