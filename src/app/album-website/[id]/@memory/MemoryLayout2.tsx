"use client";

import { JSX } from "react";
import Image from "next/image";
import { MemoryTitle } from "@/components/MemoryTitle";
import { formatDate, getDayName } from "@/utils/common";
import { useTheme } from "@/hooks/useTheme";
import { INTERFACE_MODE } from "@/constans/common";
import { MediaFile } from "@/types/album";

interface MemoryEvent {
  date: string;
  location: string;
  description?: string;
  image?: MediaFile[];
}

interface MemoryLayout2Props {
  event?: MemoryEvent;
  language?: string;
}

export default function MemoryLayout2({
  event,
  language,
}: MemoryLayout2Props): JSX.Element {
  const { interfaceMode, themeColors } = useTheme();
  const isDark = interfaceMode === INTERFACE_MODE.DARK;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundColor:
          interfaceMode === INTERFACE_MODE.DARK
            ? themeColors.primary1
            : "white",
      }}
    >
      {/* Left Top Icon - memory1 */}
      <div
        className="absolute left-20 top-24 z-10 transition-transform hover:scale-110 duration-500"
        style={{
          animation: "float 4s ease-in-out infinite",
        }}
      >
        <Image
          src="/icons/memory1.svg"
          alt="Memory decoration left"
          width={100}
          height={216}
        />
      </div>

      {/* Right Bottom Icon - memory2 */}
      <div
        className="absolute right-20 bottom-24 z-10 transition-transform hover:scale-110 duration-500"
        style={{
          animation: "float-delayed 5s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      >
        <Image
          src="/icons/memory2.svg"
          alt="Memory decoration right"
          width={100}
          height={216}
        />
      </div>

      {/* Container */}
      <div className="relative z-10 w-full px-20">
        <div className="flex flex-col items-center gap-5">
          {/* Section Header - SVG and Description */}
          <div className="flex flex-col items-center gap-5">
            {/* SVG Title */}
            <div className="w-full flex justify-center">
              <MemoryTitle language={language} color="var(--color-primary-2)" />
            </div>

            {/* Description Text */}
            {event?.description && (
              <p
                className="text-center text-2xl uppercase"
                style={{
                  color: isDark ? "white" : "#667085",
                }}
              >
                {event.description}
              </p>
            )}
          </div>

          {/* Event Content - Date Badge */}
          {event && (
            <div className="w-full flex justify-center">
              <div
                className="h-12 rounded-full px-6 py-3 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-primary-1)",
                }}
              >
                <p className="text-2xl font-semibold text-white text-center whitespace-nowrap">
                  {getDayName(event.date, language)} - {formatDate(event.date)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
