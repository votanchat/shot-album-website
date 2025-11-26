"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import { MediaFile } from "@/types/album";
import ImageLightbox from "@/components/ImageLightbox";

interface GalleryLayout1Props {
  images: MediaFile[];
  title: string;
  description: string;
}

export default function GalleryLayout1({
  images,
  title,
  description,
}: GalleryLayout1Props): JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <section className="py-24 px-20 relative overflow-hidden">
      {/* Decorative Icons */}
      <div className="absolute -top-[80px] left-0 w-[436px] h-[356px] pointer-events-none">
        <Image
          src="/icons/gallery1.svg"
          alt="Decoration"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute -top-[80px] right-0 w-[436px] h-[356px] pointer-events-none">
        <Image
          src="/icons/gallery2.svg"
          alt="Decoration"
          fill
          className="object-contain"
        />
      </div>

      <div className="">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-lg md:text-xl opacity-80 max-w-[768px] mx-auto">
            {description}
          </p>
        </div>

        {/* Pinterest Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
          {images?.map((image, index) => {
            // Generate varied aspect ratios for Pinterest look
            const aspectRatios = ["3/4", "4/3", "1/1", "4/5", "16/9"];
            const aspectRatio = aspectRatios[index % aspectRatios.length];

            return (
              <div key={image.id} className="break-inside-avoid mb-6">
                <div
                  className="relative overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full" style={{ aspectRatio }}>
                    <Image
                      src={image.url}
                      alt={image.file_name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-5">
                      <div className="text-white">
                        <p className="text-sm font-medium line-clamp-2 mb-1">
                          {image.file_name}
                        </p>
                        {image.comments_count > 0 && (
                          <p className="text-xs opacity-90">
                            💬 {image.comments_count} comments
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}
    </section>
  );
}
