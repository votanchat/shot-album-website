"use client";

import { useTheme } from "@/hooks/useTheme";
import { JSX } from "react";

export default function AboutSection(): JSX.Element | null {
  const { albumData } = useTheme();

  if (!albumData) {
    return null;
  }

  const { about } = albumData.detail.content;
  const { layout } = albumData.detail;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{about.title}</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80">
            {about.description}
          </p>
        </div>

        {/* Sub Content */}
        {about.subContent && about.subContent.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {about.subContent.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: "var(--color-primary-4)",
                }}
              >
                <div className="text-center">
                  {/* Placeholder for sub content */}
                  <p>Sub content {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Layout indicator */}
        <div className="text-xs opacity-30 text-center mt-8">
          Layout: {layout.about}
        </div>
      </div>
    </section>
  );
}
