"use client";

import { JSX } from "react";
import Image from "next/image";
import { MediaFile } from "@/types/album";
import { useTheme } from "@/hooks/useTheme";
import { INTERFACE_MODE } from "@/constans/common";

interface HighlightLayout3Props {
  images: MediaFile[];
  title: string;
  description: string;
}

export default function HighlightLayout3({
  images,
  title,
  description,
}: HighlightLayout3Props): JSX.Element {
  const { interfaceMode, themeColors } = useTheme();
  const isDark = interfaceMode === INTERFACE_MODE.DARK;

  return (
    <section
      className="relative overflow-hidden -mt-px"
      style={{
        backgroundColor:
          interfaceMode === INTERFACE_MODE.DARK
            ? themeColors.primary1
            : "#f5f4f0",
      }}
    >
      <div className="py-24 flex flex-col gap-24">
        {/* Title & Description */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 max-w-3xl mx-auto">
              <h2
                className="text-center font-bold text-5xl leading-tight"
                style={{ color: isDark ? "white" : "#101828" }}
              >
                {title}
              </h2>
              <p
                className="text-center text-xl leading-relaxed"
                style={{ color: isDark ? "white" : "#344054" }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Layout 3 content - To be implemented */}
        <div
          className="text-center text-sm"
          style={{ color: isDark ? "white" : "#6B7280" }}
        >
          Highlight Layout 3 - Coming soon
        </div>
      </div>
    </section>
  );
}

