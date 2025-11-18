import { JSX } from "react";
import Image from "next/image";
import { getTranslation } from "@/utils/translation";
import { MemoryTitle } from "@/components/MemoryTitle";
import { formatDate, getDayName } from "@/utils/common";

interface MemoryEvent {
  date: string;
  location: string;
}

interface MemoryLayout1Props {
  event?: MemoryEvent;
  language?: string;
}

export default function MemoryLayout1({
  event,
  language,
}: MemoryLayout1Props): JSX.Element {
  const t = getTranslation(language);

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/test.png"
          alt="Memory background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Left Top Icon - memory1 */}
      <div className="absolute left-20 top-24 z-10">
        <Image
          src="/icons/memory1.svg"
          alt="Memory decoration left"
          width={100}
          height={216}
        />
      </div>

      {/* Right Bottom Icon - memory2 */}
      <div className="absolute right-20 bottom-24 z-10">
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
            <p
              className="text-center text-2xl uppercase"
              style={{
                color: "#667085",
              }}
            >
              {t.memory.description}
            </p>
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
