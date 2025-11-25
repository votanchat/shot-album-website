import { JSX } from "react";
import Image from "next/image";
import { MediaFile } from "@/types/album";

interface HighlightLayout3Props {
  images: MediaFile[];
  title: string;
  description: string;
}

export default function HighlightLayout3({
  images,
  title,
  description,
}: HighlightLayout3Props): JSX.Element {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f5f4f0" }}
    >
      <div className="py-24 flex flex-col gap-24">
        {/* Title & Description */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 max-w-[768px] mx-auto">
              <h2 className="text-center font-bold text-[48px] leading-[44px] text-[#101828]">
                {title}
              </h2>
              <p className="text-center text-[22px] leading-[160%] text-[#344054]">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Layout 3 content - To be implemented */}
        <div className="text-center text-gray-500">
          Highlight Layout 3 - Coming soon
        </div>
      </div>
    </section>
  );
}

