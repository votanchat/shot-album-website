import { JSX, ReactNode } from "react";
import { getAlbum } from "@/services/apis/album";
import { AlbumProvider } from "@/contexts/AlbumContext";
import AlbumLayoutClient from "@/components/AlbumLayoutClient";
import { AlbumDomainData } from "@/types/album";

interface AlbumLayoutProps {
  children: ReactNode;
  header: ReactNode;
  about: ReactNode;
  highlight: ReactNode;
  gallery: ReactNode;
  memory: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function AlbumLayout({
  children,
  header,
  about,
  highlight,
  gallery,
  memory,
  params,
}: AlbumLayoutProps): Promise<JSX.Element> {
  const { id } = await params;

  let albumData: AlbumDomainData | null = null;
  try {
    const result = await getAlbum(id);
    albumData = result ?? null;
  } catch (error) {
    console.error("Error loading album data:", error);
  }

  return (
    <AlbumProvider albumData={albumData}>
      <AlbumLayoutClient
        header={header}
        about={about}
        highlight={highlight}
        gallery={gallery}
        memory={memory}
      >
        {children}
      </AlbumLayoutClient>
    </AlbumProvider>
  );
}
