"use client";

import { useTheme } from "@/hooks/useTheme";
import { JSX } from "react";
import HeaderLayout1 from "./HeaderLayout1";
import HeaderLayout2 from "./HeaderLayout2";
import HeaderLayout3 from "./HeaderLayout3";

export default function HeaderSection(): JSX.Element | null {
  const { albumData, language } = useTheme();

  if (!albumData) {
    return null;
  }

  const { hero } = albumData.detail.content;
  const { layout } = albumData.detail;

  // Render appropriate layout based on layout.header setting
  switch (layout.header) {
    case "layout-1":
      return <HeaderLayout1 hero={hero} language={language} />;
    case "layout-2":
      return <HeaderLayout2 hero={hero} language={language} />;
    case "layout-3":
      return <HeaderLayout3 hero={hero} language={language} />;
    default:
      // Default to layout-3 if no match
      return <HeaderLayout3 hero={hero} language={language} />;
  }
}
