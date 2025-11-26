"use client";

import { useTheme } from "@/hooks/useTheme";
import { JSX, useEffect, useState, useRef, useCallback } from "react";
import { GALLERY_LAYOUT } from "@/constans/common";
import { getGalleryImages } from "@/services/apis/album";
import { MediaFile } from "@/types/album";
import GalleryLayout1 from "./GalleryLayout1";
import GalleryLayout2 from "./GalleryLayout2";
import GalleryLayout3 from "./GalleryLayout3";

export default function GallerySection(): JSX.Element | null {
  const { albumData } = useTheme();
  const [images, setImages] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial gallery images
  useEffect(() => {
    const fetchGalleryImages = async () => {
      if (!albumData?.album_id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await getGalleryImages(albumData.album_id, 10, 1);
        setImages(result.images);
        setCurrentPage(result.meta?.current_page || 1);
        setHasMore(
          result.meta ? result.meta.current_page < result.meta.last_page : false
        );
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
        setError("Unable to load gallery images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, [albumData?.album_id]);

  // Load more images
  const loadMoreImages = useCallback(async () => {
    if (!albumData?.album_id || isLoadingMore || !hasMore || isLoading) {
      return;
    }

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const result = await getGalleryImages(albumData.album_id, 10, nextPage);

      if (result.images.length === 0) {
        setHasMore(false);
      } else {
        setImages((prev) => [...prev, ...result.images]);
        setCurrentPage(result.meta?.current_page || nextPage);
        setHasMore(
          result.meta ? result.meta.current_page < result.meta.last_page : false
        );
      }
    } catch (err) {
      console.error("Failed to load more images:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [albumData?.album_id, currentPage, hasMore, isLoadingMore, isLoading]);

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    if (isLoading || !hasMore) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef);
      }
    };
  }, [isLoading, hasMore, loadMoreImages]);

  if (!albumData) {
    return null;
  }

  const { gallery } = albumData.detail.content;
  const { layout } = albumData.detail;

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {gallery.title}
            </h2>
            <p className="text-lg md:text-xl opacity-80">
              {gallery.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {gallery.title}
            </h2>
            <p className="text-lg md:text-xl opacity-80">
              {gallery.description}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-lg opacity-60">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!images || images.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {gallery.title}
            </h2>
            <p className="text-lg md:text-xl opacity-80">
              {gallery.description}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-lg opacity-60">No images available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map old "grid" layout to new layouts
  const normalizedLayout =
    layout.gallery === "grid" ? GALLERY_LAYOUT.LAYOUT_1 : layout.gallery;

  // Render appropriate layout based on configuration
  const renderGalleryLayout = () => {
    const layoutProps = {
      images,
      title: gallery.title,
      description: gallery.description,
    };

    let layoutComponent;
    switch (normalizedLayout) {
      case GALLERY_LAYOUT.LAYOUT_1:
        layoutComponent = <GalleryLayout1 {...layoutProps} />;
        break;
      case GALLERY_LAYOUT.LAYOUT_2:
        layoutComponent = <GalleryLayout2 {...layoutProps} />;
        break;
      case GALLERY_LAYOUT.LAYOUT_3:
        layoutComponent = <GalleryLayout3 {...layoutProps} />;
        break;
      default:
        layoutComponent = <GalleryLayout1 {...layoutProps} />;
    }

    return (
      <>
        {layoutComponent}

        {/* Intersection Observer Target & Load More Indicator */}
        <div ref={loadMoreRef} className="py-8 text-center">
          {isLoadingMore && (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              <p className="text-sm opacity-60">Loading more images...</p>
            </div>
          )}

          {!hasMore && images.length > 0 && (
            <p className="text-sm opacity-40">No more images to load</p>
          )}
        </div>
      </>
    );
  };

  return renderGalleryLayout();
}
