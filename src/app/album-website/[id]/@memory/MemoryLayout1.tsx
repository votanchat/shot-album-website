import { JSX } from "react";
import Image from "next/image";
import { MemoryTitle } from "@/components/MemoryTitle";
import { formatDateWithDashes } from "@/utils/common";
import { MediaFile } from "@/types/album";

interface MemoryEvent {
  date: string;
  location: string;
  description?: string;
  image?: MediaFile[];
}

interface MemoryLayout1Props {
  event?: MemoryEvent;
  language?: string;
}

export default function MemoryLayout1({
  event,
  language,
}: MemoryLayout1Props): JSX.Element {
  const backgroundImage = event?.image?.[0];

  return (
    <section className="relative w-full h-[898px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.file_name || "Memory background"}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content Container */}
      {event && (
        <div className="relative z-10 flex flex-col items-center justify-center w-[489px] h-[435px]">
          {/* Memory Title */}
          <div className="w-full flex justify-center mb-8">
            <MemoryTitle language={language} color="#ffffff" />
          </div>

          {/* Description Text */}
          {event.description && (
            <p className="text-center text-2xl uppercase text-white/80 mb-8">
              {event.description}
            </p>
          )}

          {/* Date Display with Blur Background */}
          <div className="relative">
            <div className="backdrop-blur-md bg-black/30 rounded-2xl px-12 py-6 w-[489px] h-32 flex items-center justify-center gap-16 relative">
              <p className="text-6xl leading-[80px] tracking-[2px] text-white/90 text-center  self-start absolute top-6 flex font-bold">
                {formatDateWithDashes(event.date)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
