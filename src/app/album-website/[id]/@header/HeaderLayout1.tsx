"use client";

import { HeroSection } from "@/types/album";
import Image from "next/image";
import { JSX } from "react";
import { Button } from "@/components/ui/Button";
import { getTranslation } from "@/utils/translation";
import { useTheme } from "@/hooks/useTheme";
import { INTERFACE_MODE } from "@/constans/common";

interface HeaderLayout1Props {
  hero: HeroSection;
  language?: string;
}

export default function HeaderLayout1({
  hero,
  language,
}: HeaderLayout1Props): JSX.Element {
  const { interfaceMode, themeColors } = useTheme();
  const heroImage = hero.image?.[0];
  const t = getTranslation(language);

  const isDark = interfaceMode === INTERFACE_MODE.DARK;

  return (
    <section
      className="relative flex items-center h-[800px] overflow-hidden"
      style={{
        backgroundColor: isDark ? themeColors.primary1 : "white",
      }}
    >
      {/* Background Pattern - Only visible in light mode */}
      {!isDark && (
        <div
          className="absolute inset-0 w-full h-full opacity-30 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-header.svg')",
            backgroundSize: "100% 100%",
          }}
        />
      )}

      {/* Container */}
      <div className="relative z-10 px-20 py-16 pb-24 w-full">
        <div className="flex w-full flex-col justify-between lg:flex-row items-center gap-8 lg:gap-8">
          {/* Left Side - Content */}
          <div className="w-full lg:w-[624px] flex flex-col gap-12">
            {/* Heading and Supporting Text */}
            <div className="flex flex-col gap-6">
              <h1
                className="text-4xl md:text-5xl lg:text-[64px] leading-tight lg:leading-[72px] font-bold"
                style={{
                  color: isDark ? "white" : themeColors.primary1,
                }}
              >
                {hero.title}
              </h1>
              <p
                className={`text-lg lg:text-[20px] leading-relaxed lg:leading-[30px] font-normal opacity-80 ${
                  isDark ? "text-white" : ""
                }`}
              >
                {hero.description}
              </p>
            </div>

            {/* Actions - Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="md">
                {t.hero.ourStory}
              </Button>

              <Button variant="filled" size="md">
                {t.hero.viewFullAlbum}
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          {heroImage && (
            <div className="w-full lg:w-[560px] h-[400px] lg:h-[640px] relative rounded-tl-none rounded-tr-[64px] rounded-br-none rounded-bl-[64px] overflow-hidden">
              <Image
                src={heroImage.url}
                alt={hero.title || "Hero image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
