import AlbumClient from "@/components/AlbumClient";

export default async function AlbumWebsitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <AlbumClient domain={id} />;
}

