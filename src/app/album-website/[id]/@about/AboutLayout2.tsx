"use client";

import { JSX } from "react";
import Image from "next/image";
import { AboutSection } from "@/types/album";
import { useTheme } from "@/hooks/useTheme";
import { INTERFACE_MODE } from "@/constans/common";

interface AboutLayout2Props {
  about: AboutSection;
}

export default function AboutLayout2({
  about,
}: AboutLayout2Props): JSX.Element {
  const { interfaceMode, themeColors } = useTheme();
  const isDark = interfaceMode === INTERFACE_MODE.DARK;
  const mainImage = about.images?.[0];

  return (
    <section
      className="relative overflow-hidden -mt-px"
      style={{
        backgroundColor: isDark ? themeColors.primary1 : themeColors.primary4,
        border: "none",
        borderTop: "none",
        boxShadow: "none",
        outline: "none",
      }}
    >
      <div className="py-24 flex flex-col gap-16 relative">
        {/* Decorative Icons */}
        <div
          className="absolute right-0 -top-16 z-50"
          style={{ transform: "rotate(180deg)" }}
        >
          <Image
            src="/icons/about1.svg"
            alt="About decoration top right"
            width={250}
            height={450}
          />
        </div>

        <div className="absolute left-0 -bottom-16 z-50">
          <Image
            src="/icons/about1.svg"
            alt="About decoration bottom left"
            width={250}
            height={450}
          />
        </div>

        {/* Container - Title & Description */}
        <div className="relative z-20 w-full mx-auto px-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 max-w-[768px] mx-auto">
              <h2
                className="text-center font-bold text-[48px] leading-[44px]"
                style={{
                  color: isDark ? "white" : "#101828",
                }}
              >
                {about.title}
              </h2>
              <p
                className="text-center text-[22px] leading-[160%]"
                style={{
                  color: isDark ? "white" : "#344054",
                }}
              >
                {about.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Image */}
        {mainImage && (
          <div className="relative z-20 w-full flex justify-center px-20">
            <div className="relative w-full max-w-[1280px] h-[560px]">
              <Image
                src={mainImage.url}
                alt={mainImage.file_name}
                fill
                className="object-contain"
                sizes="916px"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
