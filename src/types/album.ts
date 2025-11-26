export type AlbumDomainData = {
  id: number;
  album_id: string;
  domain: string;
  detail: AlbumDetail;
  created_at: string;
  updated_at: string;
  album: AlbumInfo;
};

export type AlbumInfo = {
  id: string;
  name: string;
  customer_name: string;
  thumbnail_url: string;
};

export type AlbumDetail = {
  font: string;
  event?: {
    date: string;
    location: string;
    image?: MediaFile;
  };
  theme: string[];
  title: string;
  layout: {
    about: string;
    header: string;
    memory: string;
    gallery: string;
    highlight: string;
  };
  content: AlbumContent;
  language: string;
  sections: {
    about: boolean;
    header: boolean;
    memory: boolean;
    gallery: boolean;
    highlight: boolean;
  };
  interface: string;
};

export type AlbumContent = {
  hero: HeroSection;
  about: AboutSection;
  contact: ContactSection;
  gallery: GallerySection;
  highlight: HighlightSection;
};

export type HeroSection = {
  image: MediaFile[];
  title: string;
  description: string;
};

export type AboutSubContent = {
  image: MediaFile[];
  title: string;
  content: string;
};

export type AboutSection = {
  title: string;
  images: MediaFile[];
  subContent: AboutSubContent[];
  description: string;
};

export type ContactSection = {
  title: string;
  description: string;
};

export type GallerySection = {
  title: string;
  images: MediaFile[];
  description: string;
};

export type HighlightSection = {
  title: string;
  images: MediaFile[];
  description: string;
};

export type MediaFile = {
  id: string;
  url: string;
  tags: string[];
  comments: unknown[];
  is_liked: number;
  file_name: string;
  folder_id: number;
  created_at: string;
  gg_file_id: string;
  updated_at: string;
  folder_name: string;
  comments_count: number;
  is_recommended: number;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type GalleryImagesResponse = {
  id: string;
  name: string;
  files: {
    data: MediaFile[];
    meta: PaginationMeta;
    links: PaginationLinks;
  };
};
