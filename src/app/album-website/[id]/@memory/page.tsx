"use client";

import { useTheme } from "@/hooks/useTheme";
import { JSX } from "react";
import MemoryLayout1 from "./MemoryLayout1";
import MemoryLayout2 from "./MemoryLayout2";
import { MEMORY_LAYOUT } from "@/constans/common";

export default function MemorySection(): JSX.Element | null {
  const { albumData, language } = useTheme();

  if (!albumData) {
    return null;
  }

  const { layout, event } = albumData.detail;

  // Render appropriate layout based on layout.memory setting
  switch (layout.memory) {
    case MEMORY_LAYOUT.LAYOUT_1:
      return <MemoryLayout1 event={event} language={language} />;
    case MEMORY_LAYOUT.LAYOUT_2:
      return <MemoryLayout2 event={event} language={language} />;
    default:
      // Default to layout-1 if no match
      return <MemoryLayout1 event={event} language={language} />;
  }
}
