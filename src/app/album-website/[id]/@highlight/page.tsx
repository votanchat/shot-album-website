"use client";

import { useTheme } from "@/hooks/useTheme";
import { MediaFile } from "@/types/album";
import { JSX } from "react";
import HighlightLayout1 from "./HighlightLayout1";
import HighlightLayout2 from "./HighlightLayout2";
import HighlightLayout3 from "./HighlightLayout3";
import { HIGHLIGHT_LAYOUT } from "@/constans/common";

export default function HighlightSection(): JSX.Element | null {
  const { albumData } = useTheme();

  if (!albumData) {
    return null;
  }

  const { highlight } = albumData.detail.content;
  const { layout } = albumData.detail;

  // Get highlight images from content
  const highlightImages: MediaFile[] = highlight.images || [];

  if (highlightImages.length === 0) {
    return null;
  }

  // Render appropriate layout based on layout.highlight setting
  switch (layout.highlight) {
    case HIGHLIGHT_LAYOUT.LAYOUT_1:
      return (
        <HighlightLayout1
          images={highlightImages}
          title={highlight.title}
          description={highlight.description}
        />
      );
    case HIGHLIGHT_LAYOUT.LAYOUT_2:
      return (
        <HighlightLayout2
          images={highlightImages}
          title={highlight.title}
          description={highlight.description}
        />
      );
    case HIGHLIGHT_LAYOUT.LAYOUT_3:
      return (
        <HighlightLayout3
          images={highlightImages}
          title={highlight.title}
          description={highlight.description}
        />
      );
    default:
      // Default to layout-1 if no match
      return (
        <HighlightLayout1
          images={highlightImages}
          title={highlight.title}
          description={highlight.description}
        />
      );
  }
}
