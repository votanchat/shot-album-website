import { vi } from "./vi";
import { en } from "./en";

export const translations = {
  vi,
  en,
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = typeof vi;

