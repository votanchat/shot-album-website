export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_VERSION = {
  V1: "v1",
  V2: "v2",
};

export const API_HEADERS = {
  COMMON: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  MULTIPART: {
    "Content-Type": "multipart/form-data",
  },
} as const;

export const API_PATH = {
  GET_ALBUM: (domain: string) => `/album-websites/domain/${domain}`,
  GET_GALLERY_IMAGES: (albumId: string) => `/client/albums/${albumId}/public`,
} as const;

export enum FONT_FAMILY {
  DEFAULT = "Arial",
}

export enum LANGUAGE {
  VI = "vi",
  EN = "en",
}

export enum INTERFACE_MODE {
  LIGHT = "light",
  DARK = "dark",
}

export enum HEADER_LAYOUT {
  LAYOUT_1 = "layout-1",
  LAYOUT_2 = "layout-2",
  LAYOUT_3 = "layout-3",
}

export type HeaderLayout = (typeof HEADER_LAYOUT)[keyof typeof HEADER_LAYOUT];

/**
 * Layout constants for other sections
 */
export const ABOUT_LAYOUT = {
  LAYOUT_1: "layout-1",
  LAYOUT_2: "layout-2",
} as const;

export const HIGHLIGHT_LAYOUT = {
  LAYOUT_1: "layout-1",
  LAYOUT_2: "layout-2",
  LAYOUT_3: "layout-3",
} as const;

export const GALLERY_LAYOUT = {
  LAYOUT_1: "layout-1",
  LAYOUT_2: "layout-2",
  LAYOUT_3: "layout-3",
} as const;

export const MEMORY_LAYOUT = {
  LAYOUT_1: "layout-1",
  LAYOUT_2: "layout-2",
} as const;
