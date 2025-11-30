"use client";

import { JSX } from "react";
import Image from "next/image";
import { MediaFile } from "@/types/album";
import { useTheme } from "@/hooks/useTheme";
import { INTERFACE_MODE } from "@/constans/common";

interface HighlightLayout1Props {
  images: MediaFile[];
  title: string;
  description: string;
}

export default function HighlightLayout1({
  images,
  title,
  description,
}: HighlightLayout1Props): JSX.Element | null {
  const { interfaceMode, themeColors } = useTheme();
  const isDark = interfaceMode === INTERFACE_MODE.DARK;

  // Create image groups for loop
  const createImageGroups = (): MediaFile[][] => {
    const groups: MediaFile[][] = [];
    const totalImages = images.length;

    if (totalImages < 5) return [];

    // Calculate how many full groups we can make
    const fullGroups = Math.floor(totalImages / 5);
    const remainder = totalImages % 5;

    // Create full groups
    for (let i = 0; i < fullGroups; i++) {
      const group: MediaFile[] = [];
      for (let j = 0; j < 5; j++) {
        group.push(images[i * 5 + j]);
      }
      groups.push(group);
    }

    // If there's remainder, create one more group by cycling from the beginning
    if (remainder > 0) {
      const group: MediaFile[] = [];
      for (let j = 0; j < 5; j++) {
        const imageIndex = (fullGroups * 5 + j) % totalImages;
        group.push(images[imageIndex]);
      }
      groups.push(group);
    }

    return groups;
  };

  const imageGroups = createImageGroups();

  if (imageGroups.length === 0) {
    return null;
  }

  // Render a single grid
  const renderGrid = (gridImages: MediaFile[]) => (
    <div className="shrink-0" style={{ width: "900px" }}>
      <div className="flex gap-3" style={{ height: "563px" }}>
        {/* Image 1 - Large Left */}
        <div className="relative" style={{ width: "420px", height: "563px" }}>
          <Image
            src={gridImages[0].url}
            alt={gridImages[0].file_name}
            fill
            className="object-cover"
          />
        </div>

        {/* Middle Left Column */}
        <div className="flex flex-col gap-3" style={{ width: "230px" }}>
          {/* Image 2 - Top */}
          <div className="relative" style={{ height: "280px" }}>
            <Image
              src={gridImages[1].url}
              alt={gridImages[1].file_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Image 3 - Bottom */}
          <div className="relative" style={{ height: "280px" }}>
            <Image
              src={gridImages[2].url}
              alt={gridImages[2].file_name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Middle Right Column */}
        <div className="flex flex-col gap-3" style={{ width: "230px" }}>
          {/* Image 4 - Top */}
          <div className="relative" style={{ height: "280px" }}>
            <Image
              src={gridImages[3].url}
              alt={gridImages[3].file_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Image 5 - Bottom */}
          <div className="relative" style={{ height: "280px" }}>
            <Image
              src={gridImages[4].url}
              alt={gridImages[4].file_name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );

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
      <div className="py-24 flex flex-col gap-16">
        {/* Title & Description */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8">
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

        {/* Hero Section with Manual Scroll */}
        <div className="relative w-full">
          <div
            className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-3">
              {/* Render multiple times for infinite scroll effect */}
              {[...Array(5)].map((_, loopIndex) =>
                imageGroups.map((gridImages, index) => (
                  <div key={`${loopIndex}-${index}`}>
                    {renderGrid(gridImages)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
