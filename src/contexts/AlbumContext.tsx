"use client";

import { FONT_FAMILY, INTERFACE_MODE, LANGUAGE } from "@/constans/common";
import { InterfaceMode } from "@/types/common";
import { AlbumDomainData } from "@/types/album";
import React, {
  createContext,
  JSX,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface ThemeColors {
  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
}

export interface AlbumContextType {
  // Album data
  albumData: AlbumDomainData | null;

  // Theme states
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

export const AlbumContext = createContext<AlbumContextType | undefined>(
  undefined
);

interface AlbumProviderProps {
  children: ReactNode;
  albumData: AlbumDomainData | null;
}

export function AlbumProvider({
  children,
  albumData,
}: AlbumProviderProps): JSX.Element {
  // Initialize states from albumData
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>(() => {
    return (
      (albumData?.detail?.interface as InterfaceMode) || INTERFACE_MODE.LIGHT
    );
  });

  const [themeColors, setThemeColors] = useState<ThemeColors>(() => {
    const theme = albumData?.detail?.theme;
    if (theme && Array.isArray(theme) && theme.length >= 4) {
      return {
        primary1: theme[0],
        primary2: theme[1],
        primary3: theme[2],
        primary4: theme[3],
      };
    }
    return defaultThemeColors;
  });

  const [font, setFont] = useState<string>(() => {
    return albumData?.detail?.font || defaultFont;
  });

  const [language, setLanguage] = useState<string>(() => {
    return albumData?.detail?.language || defaultLanguage;
  });

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

  // Apply interface mode and CSS variables
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

    // Set primary color - always use primary2 for buttons
    root.style.setProperty("--color-primary", themeColors.primary2);
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
    <AlbumContext.Provider
      value={{
        albumData,
        interfaceMode,
        themeColors,
        font,
        language,
        setTheme,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}
