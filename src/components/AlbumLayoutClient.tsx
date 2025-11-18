"use client";

import { JSX, ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

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

  if (!albumData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading album...</p>
      </div>
    );
  }

  const { sections } = albumData.detail;

  return (
    <div className="min-h-screen">
      {sections.header && header}
      {sections.memory && memory}
      {sections.about && about}
      {sections.highlight && highlight}
      {sections.gallery && gallery}
      {children}
    </div>
  );
}
