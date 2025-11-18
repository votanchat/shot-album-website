import { HeroSection } from "@/types/album";
import Image from "next/image";
import { JSX } from "react";
import { Button } from "@/components/ui/Button";
import { getTranslation } from "@/utils/translation";

interface HeaderLayout3Props {
  hero: HeroSection;
  language?: string;
}

export default function HeaderLayout3({
  hero,
  language,
}: HeaderLayout3Props): JSX.Element {
  const heroImage = hero.image?.[0];
  const t = getTranslation(language);

  return (
    <section className="bg-white relative">
      {/* Decorative Elements - Star (Top Left) */}
      <div className="absolute top-20 left-20 w-16 h-16 opacity-80 z-10">
        <Image
          src="/icons/star.svg"
          alt="Star decoration"
          width={64}
          height={64}
          className="animate-pulse"
        />
      </div>

      {/* Decorative Elements - Star (Top Right) */}
      <div className="absolute top-32 right-16 w-12 h-12 opacity-80 z-10">
        <Image
          src="/icons/star.svg"
          alt="Star decoration"
          width={48}
          height={48}
          className="animate-pulse delay-200"
        />
      </div>

      {/* Decorative Elements - Balloons (Left Bottom) */}
      <div className="absolute bottom-32 left-8 w-24 h-24 opacity-80 z-10">
        <Image
          src="/icons/balloon.svg"
          alt="Balloon decoration"
          width={96}
          height={96}
          className="animate-bounce"
        />
      </div>

      {/* Decorative Elements - Star with Balloons (Right) */}
      <div className="absolute top-1/3 right-8 w-28 h-28 opacity-80 z-10">
        <Image
          src="/icons/star-balloon.svg"
          alt="Star balloon decoration"
          width={112}
          height={112}
          className="animate-pulse delay-300"
        />
      </div>

      {/* Container - All White Background */}
      <div className="px-20">
        <div className="flex flex-col items-center">
          {/* Title */}
          <div className="flex flex-col items-center gap-6 py-24">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
              style={{
                color: "#040707",
              }}
            >
              {hero.title}
            </h1>
            <p
              className="text-base md:text-lg text-center max-w-2xl"
              style={{
                color: "#344054",
              }}
            >
              {hero.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button variant="outline" size="md">
                {t.hero.ourStory}
              </Button>
              <Button variant="filled" size="md">
                {t.hero.viewFullAlbum}
              </Button>
            </div>
          </div>

          {/* Image - No Rounded Corners */}
          {heroImage && (
            <div className="w-full flex justify-center mb-24">
              <div className="relative h-[516px] w-[916px]">
                <Image
                  src={heroImage.url}
                  alt={hero.title || "Hero image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
