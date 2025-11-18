import { JSX } from "react";
import Image from "next/image";
import { MemoryTitle } from "@/components/MemoryTitle";
import { formatDateWithDashes } from "@/utils/common";
import { getTranslation } from "@/utils/translation";

interface MemoryEvent {
  date: string;
  location: string;
  image?: {
    url: string;
  };
}

interface MemoryLayout2Props {
  event?: MemoryEvent;
  language?: string;
}

export default function MemoryLayout2({
  event,
  language,
}: MemoryLayout2Props): JSX.Element {
  const t = getTranslation(language);
  return (
    <section className="relative w-full h-[898px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/test.png"
        alt="Memory background"
        fill
        className="object-cover"
        priority
      />

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
          <p className="text-center text-2xl uppercase text-white/80 mb-8">
            {t.memory.description}
          </p>

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
