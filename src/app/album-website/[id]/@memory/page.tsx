"use client";

import { useTheme } from "@/hooks/useTheme";
import { JSX } from "react";

export default function MemorySection(): JSX.Element | null {
  const { albumData } = useTheme();

  if (!albumData) {
    return null;
  }

  const { layout, event } = albumData.detail;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Memory</h2>
          <p className="text-lg md:text-xl opacity-80">
            Những kỷ niệm đáng nhớ
          </p>
        </div>

        {/* Event Information */}
        {event && Array.isArray(event) && event.length > 0 && (
          <div className="space-y-8">
            {event.map((evt, index) => (
              <div
                key={index}
                className="p-8 rounded-lg"
                style={{
                  backgroundColor: "var(--color-primary-4)",
                }}
              >
                <h3 className="text-2xl font-bold mb-4">Event {index + 1}</h3>
                {/* Event content will be structured based on actual data */}
                <pre className="text-sm opacity-70">
                  {JSON.stringify(evt, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder for empty memory section */}
        {(!event || (Array.isArray(event) && event.length === 0)) && (
          <div className="text-center py-12 opacity-50">
            <p className="text-lg">Chưa có kỷ niệm nào được thêm vào</p>
          </div>
        )}

        {/* Layout indicator */}
        <div className="text-xs opacity-30 text-center mt-8">
          Layout: {layout.memory}
        </div>
      </div>
    </section>
  );
}
