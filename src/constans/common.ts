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
