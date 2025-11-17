"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { JSX } from "react";

export default function HeaderSection(): JSX.Element | null {
  const { albumData } = useTheme();

  if (!albumData) {
    return null;
  }

  const { hero } = albumData.detail.content;
  const { layout } = albumData.detail;
  const heroImage = hero.image?.[0];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage.url}
            alt={hero.title || "Hero image"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{hero.title}</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          {hero.description}
        </p>
      </div>

      {/* Layout indicator (for debugging) */}
      <div className="absolute bottom-4 right-4 z-10 text-xs text-white/50">
        Layout: {layout.header}
      </div>
    </section>
  );
}
