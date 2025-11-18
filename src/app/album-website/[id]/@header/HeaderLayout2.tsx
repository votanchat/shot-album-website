import { HeroSection } from "@/types/album";
import Image from "next/image";
import { JSX } from "react";
import { Button } from "@/components/ui/Button";
import { getTranslation } from "@/utils/translation";

interface HeaderLayout2Props {
  hero: HeroSection;
  language?: string;
}

export default function HeaderLayout2({
  hero,
  language,
}: HeaderLayout2Props): JSX.Element {
  const heroImage = hero.image?.[0];
  const t = getTranslation(language);

  return (
    <section className="relative h-[760px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Full Screen */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage.url}
            alt={hero.title || "Hero image"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Overlay - covers entire background */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(74, 85, 104, 0.7) 0%, rgba(74, 85, 104, 0.6) 50%, rgba(74, 85, 104, 0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-[760px] pt-16 pb-24 flex items-center justify-center">
        {/* Container */}
        <div className="w-full px-20">
          {/* Content */}
          <div className="flex flex-col items-center gap-12">
            {/* Heading and Supporting Text */}
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-white text-center text-[64px] leading-[72px] font-bold max-w-[696px]">
                {hero.title}
              </h1>
              <p className="text-white text-center text-[20px] leading-[30px] max-w-[480px]">
                {hero.description}
              </p>
            </div>

            {/* Actions - Buttons */}
            <div className="flex flex-row gap-3 mt-6">
              <Button variant="outline" size="md">
                {t.hero.ourStory}
              </Button>
              <Button variant="filled" size="md">
                {t.hero.viewFullAlbum}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
