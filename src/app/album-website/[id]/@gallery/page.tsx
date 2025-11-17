"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { JSX } from "react";

export default function GallerySection(): JSX.Element | null {
  const { albumData } = useTheme();

  if (!albumData) {
    return null;
  }

  const { gallery } = albumData.detail.content;
  const { layout } = albumData.detail;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {gallery.title}
          </h2>
          <p className="text-lg md:text-xl opacity-80">{gallery.description}</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.images?.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={image.url}
                alt={image.file_name}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-110"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center px-4">
                  <p className="text-sm font-medium line-clamp-2">
                    {image.file_name}
                  </p>
                  {image.comments_count > 0 && (
                    <p className="text-xs mt-2">
                      {image.comments_count} comments
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Layout indicator */}
        <div className="text-xs opacity-30 text-center mt-8">
          Layout: {layout.gallery}
        </div>
      </div>
    </section>
  );
}
