import { API_PATH } from "@/constans/common";
import { http } from "../http";
import {
  AlbumDomainData,
  GalleryImagesResponse,
  MediaFile,
  PaginationMeta,
} from "@/types/album";

export const getAlbum = async (domain: string) => {
  const response = await http.get<AlbumDomainData>(API_PATH.GET_ALBUM(domain));
  return response.data;
};

export interface GalleryImagesResult {
  images: MediaFile[];
  meta: PaginationMeta | null;
}

export const getGalleryImages = async (
  albumId: string,
  perPage: number = 10,
  page: number = 1
): Promise<GalleryImagesResult> => {
  try {
    const response = await http.get<GalleryImagesResponse>(
      API_PATH.GET_GALLERY_IMAGES(albumId),
      { per_page: perPage, page }
    );
    return {
      images: response.data?.files?.data || [],
      meta: response.data?.files?.meta || null,
    };
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return {
      images: [],
      meta: null,
    };
  }
};
