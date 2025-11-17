"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { MediaFile } from "@/types/album";
import { JSX } from "react";

export default function HighlightSection(): JSX.Element | null {
  const { albumData } = useTheme();

  if (!albumData) {
    return null;
  }

  const { gallery } = albumData.detail.content;
  const { layout } = albumData.detail;

  // Filter recommended images (is_recommended === 1)
  const highlightImages: MediaFile[] =
    gallery.images?.filter((img) => img.is_recommended === 1) || [];

  if (highlightImages.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Highlight</h2>
          <p className="text-lg md:text-xl opacity-80">
            Những khoảnh khắc đáng nhớ nhất
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={image.url}
                alt={image.file_name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">
                    {image.file_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Layout indicator */}
        <div className="text-xs opacity-30 text-center mt-8">
          Layout: {layout.highlight}
        </div>
      </div>
    </section>
  );
}
