"use client";

import { useTheme } from "@/hooks/useTheme";
import { JSX } from "react";
import AboutLayout1 from "./AboutLayout1";
import AboutLayout2 from "./AboutLayout2";
import { ABOUT_LAYOUT } from "@/constans/common";

export default function AboutSection(): JSX.Element | null {
  const { albumData } = useTheme();

  if (!albumData) {
    return null;
  }

  const { about } = albumData.detail.content;
  const { layout } = albumData.detail;

  // Render appropriate layout based on layout.about setting
  switch (layout.about) {
    case ABOUT_LAYOUT.LAYOUT_1:
      return <AboutLayout1 about={about} />;
    case ABOUT_LAYOUT.LAYOUT_2:
      return <AboutLayout2 about={about} />;
    default:
      // Default to layout-1 if no match
      return <AboutLayout1 about={about} />;
  }
}
