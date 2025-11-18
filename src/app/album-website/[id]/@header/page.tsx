"use client";

import { useTheme } from "@/hooks/useTheme";
import { JSX } from "react";
import HeaderLayout1 from "./HeaderLayout1";
import HeaderLayout2 from "./HeaderLayout2";
import HeaderLayout3 from "./HeaderLayout3";
import { HeaderLayout } from "@/types/common";
import { HEADER_LAYOUT } from "@/constans/common";

export default function HeaderSection(): JSX.Element | null {
  const { albumData, language } = useTheme();

  if (!albumData) {
    return null;
  }

  const { hero } = albumData.detail.content;
  const { layout } = albumData.detail;

  // Render appropriate layout based on layout.header setting
  switch (layout.header as HeaderLayout) {
    case HEADER_LAYOUT.LAYOUT_1:
      return <HeaderLayout1 hero={hero} language={language} />;
    case HEADER_LAYOUT.LAYOUT_2:
      return <HeaderLayout2 hero={hero} language={language} />;
    case HEADER_LAYOUT.LAYOUT_3:
      return <HeaderLayout3 hero={hero} language={language} />;
    default:
      // Default to layout-3 if no match
      return <HeaderLayout3 hero={hero} language={language} />;
  }
}
