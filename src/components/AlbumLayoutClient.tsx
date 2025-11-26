"use client";

import { JSX, ReactNode, useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import LoadingScreen from "./LoadingScreen";

interface AlbumLayoutClientProps {
  children: ReactNode;
  header: ReactNode;
  about: ReactNode;
  highlight: ReactNode;
  gallery: ReactNode;
  memory: ReactNode;
}

export default function AlbumLayoutClient({
  children,
  header,
  about,
  highlight,
  gallery,
  memory,
}: AlbumLayoutClientProps): JSX.Element {
  const { albumData } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (albumData) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [albumData]);

  if (!albumData || !isReady) {
    return <LoadingScreen />;
  }

  const { sections } = albumData.detail;

  return (
    <div className="min-h-screen animate-in fade-in duration-500">
      {sections.header && header}
      {sections.memory && memory}
      {sections.about && about}
      {sections.highlight && highlight}
      {sections.gallery && gallery}
      {children}
    </div>
  );
}
