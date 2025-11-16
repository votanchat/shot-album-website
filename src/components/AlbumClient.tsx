"use client";

import { JSX, useEffect, useState } from "react";
import { getAlbum } from "@/services/apis/album";
import { useTheme } from "@/hooks/useTheme";
import { InterfaceMode } from "@/types/common";

interface AlbumClientProps {
  domain: string;
}

export default function AlbumClient({ domain }: AlbumClientProps): JSX.Element {
  const { setTheme, font, language } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAlbumData = async (): Promise<void> => {
      try {
        const albumData = await getAlbum(domain);
        console.log("albumData", albumData);
        
        if (albumData?.detail) {
          const {
            interface: interfaceMode,
            theme,
            font: albumFont,
            language: albumLanguage,
          } = albumData.detail;

          // Apply theme, font, and language from API
          if (interfaceMode && theme && Array.isArray(theme)) {
            setTheme(
              interfaceMode as InterfaceMode,
              theme,
              albumFont,
              albumLanguage
            );
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading album data:", error);
        setIsLoading(false);
      }
    };

    loadAlbumData();
  }, [domain, setTheme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading album...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Album Website</h1>
        <p className="text-lg">Domain: {domain}</p>
        <p className="text-sm mt-2">Font: {font}</p>
        <p className="text-sm">Language: {language}</p>

        {/* Demo các màu theme */}
        <div className="mt-8 space-y-4">
          <div
            className="p-4 rounded"
            style={{ backgroundColor: "var(--color-primary-1)" }}
          >
            Primary Color 1 (Darkest - for dark mode)
          </div>
          <div
            className="p-4 rounded"
            style={{ backgroundColor: "var(--color-primary-2)" }}
          >
            Primary Color 2 (for light mode)
          </div>
          <div
            className="p-4 rounded"
            style={{ backgroundColor: "var(--color-primary-3)" }}
          >
            Primary Color 3
          </div>
          <div
            className="p-4 rounded"
            style={{ backgroundColor: "var(--color-primary-4)" }}
          >
            Primary Color 4 (Lightest)
          </div>
        </div>

        {/* Demo font */}
        <div className="mt-8 p-6 border rounded">
          <h2 className="text-2xl font-bold mb-4">Font Demo</h2>
          <p className="text-base mb-2">
            This text is using the font: <strong>{font}</strong>
          </p>
          <p className="text-lg font-light">Light weight text</p>
          <p className="text-lg font-normal">Normal weight text</p>
          <p className="text-lg font-medium">Medium weight text</p>
          <p className="text-lg font-semibold">Semibold weight text</p>
          <p className="text-lg font-bold">Bold weight text</p>
        </div>
      </div>
    </div>
  );
}
