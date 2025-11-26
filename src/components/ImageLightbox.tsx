"use client";

import { JSX, useEffect } from "react";
import Image from "next/image";
import { MediaFile } from "@/types/album";

interface ImageLightboxProps {
    images: MediaFile[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export default function ImageLightbox({
    images,
    currentIndex,
    onClose,
    onNext,
    onPrevious,
}: ImageLightboxProps): JSX.Element {
    const currentImage = images[currentIndex];

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                onPrevious();
            } else if (e.key === "ArrowRight") {
                onNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onNext, onPrevious]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    if (!currentImage) {
        return <></>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                aria-label="Close lightbox"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {/* Previous Button */}
            {currentIndex > 0 && (
                <button
                    onClick={onPrevious}
                    className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}

            {/* Next Button */}
            {currentIndex < images.length - 1 && (
                <button
                    onClick={onNext}
                    className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Main Image Container */}
            <div
                className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
                onClick={onClose}
            >
                <div
                    className="relative max-w-7xl max-h-full w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={currentImage.url}
                        alt={currentImage.file_name}
                        fill
                        className="object-contain"
                        priority
                        quality={100}
                    />
                </div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-white text-lg font-medium mb-2">
                        {currentImage.file_name}
                    </h3>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                        {currentImage.comments_count > 0 && (
                            <span>💬 {currentImage.comments_count} comments</span>
                        )}
                        {currentImage.is_liked > 0 && <span>❤️ Liked</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

