"use client";

import { FONT_FAMILY, INTERFACE_MODE, LANGUAGE } from "@/constans/common";
import { InterfaceMode } from "@/types/common";
import React, { createContext, JSX, useEffect, useState } from "react";

export interface ThemeColors {
  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
}

export interface ThemeContextType {
  interfaceMode: InterfaceMode;
  themeColors: ThemeColors;
  font: string;
  language: string;
  setTheme: (
    mode: InterfaceMode,
    colors: string[],
    font?: string,
    language?: string
  ) => void;
}

const defaultThemeColors: ThemeColors = {
  primary1: "#30B78E",
  primary2: "#6BD7A6",
  primary3: "#B6EBD1",
  primary4: "#CFF2D4",
};

const defaultFont = FONT_FAMILY.DEFAULT;
const defaultLanguage = LANGUAGE.VI;

export const ThemeContext = createContext<ThemeContextType>({
  interfaceMode: INTERFACE_MODE.LIGHT,
  themeColors: defaultThemeColors,
  font: defaultFont,
  language: defaultLanguage,
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: InterfaceMode;
  initialColors?: string[];
  initialFont?: string;
  initialLanguage?: string;
}

export function ThemeProvider({
  children,
  initialMode = INTERFACE_MODE.LIGHT,
  initialColors,
  initialFont,
  initialLanguage,
}: ThemeProviderProps): JSX.Element {
  const [interfaceMode, setInterfaceMode] =
    useState<InterfaceMode>(initialMode as InterfaceMode);
  const [themeColors, setThemeColors] = useState<ThemeColors>(() => {
    if (initialColors && initialColors.length >= 4) {
      return {
        primary1: initialColors[0],
        primary2: initialColors[1],
        primary3: initialColors[2],
        primary4: initialColors[3],
      };
    }
    return defaultThemeColors;
  });
  const [font, setFont] = useState<string>(initialFont || defaultFont);
  const [language, setLanguage] = useState<string>(
    initialLanguage || defaultLanguage
  );

  const setTheme = (
    mode: InterfaceMode,
    colors: string[],
    newFont?: string,
    newLanguage?: string
  ): void => {
    setInterfaceMode(mode);
    if (colors && colors.length >= 4) {
      setThemeColors({
        primary1: colors[0],
        primary2: colors[1],
        primary3: colors[2],
        primary4: colors[3],
      });
    }
    if (newFont) {
      setFont(newFont);
    }
    if (newLanguage) {
      setLanguage(newLanguage);
    }
  };

  useEffect(() => {
    const root = document.documentElement;

    // Apply interface mode class
    root.classList.remove(INTERFACE_MODE.LIGHT, INTERFACE_MODE.DARK);
    root.classList.add(interfaceMode);

    // Apply CSS variables for theme colors
    root.style.setProperty("--color-primary-1", themeColors.primary1);
    root.style.setProperty("--color-primary-2", themeColors.primary2);
    root.style.setProperty("--color-primary-3", themeColors.primary3);
    root.style.setProperty("--color-primary-4", themeColors.primary4);

    // Set primary color based on interface mode
    // Dark mode uses the darkest color (primary1)
    const primaryColor =
      interfaceMode === INTERFACE_MODE.DARK ? themeColors.primary1 : themeColors.primary2;
    root.style.setProperty("--color-primary", primaryColor);
  }, [interfaceMode, themeColors]);

  // Load Google Font dynamically
  useEffect(() => {
    if (!font || font === "Arial") return;

    // Remove previous font link if exists
    const existingLink = document.getElementById("google-font-link");
    if (existingLink) {
      existingLink.remove();
    }

    // Create new link for Google Font
    const fontName = font.replace(/\s+/g, "+");
    const link = document.createElement("link");
    link.id = "google-font-link";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);

    // Apply font to CSS variable
    document.documentElement.style.setProperty("--font-dynamic", font);

    return () => {
      const linkToRemove = document.getElementById("google-font-link");
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [font]);

  // Set language attribute on html element
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <ThemeContext.Provider
      value={{ interfaceMode, themeColors, font, language, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

