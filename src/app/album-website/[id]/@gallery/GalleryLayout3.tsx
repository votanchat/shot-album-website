"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import { MediaFile } from "@/types/album";
import ImageLightbox from "@/components/ImageLightbox";

interface GalleryLayout3Props {
    images: MediaFile[];
    title: string;
    description: string;
}

export default function GalleryLayout3({
    images,
    title,
    description,
}: GalleryLayout3Props): JSX.Element {
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

    const featuredImage = images?.[0];
    const gridImages = images?.slice(1);

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl opacity-80">
                        {description}
                    </p>
                </div>

                {/* Featured + Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Featured Image - Left Side */}
                    {featuredImage && (
                        <div
                            className="md:col-span-7 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-300"
                            onClick={() => openLightbox(0)}
                        >
                            <Image
                                src={featuredImage.url}
                                alt={featuredImage.file_name}
                                fill
                                className="object-cover transition-all duration-500 group-hover:scale-105"
                            />

                            {/* Featured Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-8">
                                <div className="text-white">
                                    <p className="text-lg font-semibold mb-2">
                                        Featured
                                    </p>
                                    <p className="text-sm font-medium line-clamp-2 mb-1">
                                        {featuredImage.file_name}
                                    </p>
                                    {featuredImage.comments_count > 0 && (
                                        <p className="text-xs opacity-80">
                                            💬 {featuredImage.comments_count}{" "}
                                            comments
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Grid Images - Right Side */}
                    <div className="md:col-span-5 grid grid-cols-2 gap-6">
                        {gridImages?.map((image, idx) => (
                            <div
                                key={image.id}
                                className="relative aspect-square overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                onClick={() => openLightbox(idx + 1)}
                            >
                                <Image
                                    src={image.url}
                                    alt={image.file_name}
                                    fill
                                    className="object-cover transition-all duration-500 group-hover:scale-110"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                                    <div className="text-white">
                                        <p className="text-xs font-medium line-clamp-2 mb-1">
                                            {image.file_name}
                                        </p>
                                        {image.comments_count > 0 && (
                                            <p className="text-xs opacity-80">
                                                💬 {image.comments_count}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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

