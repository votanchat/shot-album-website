import { getAlbum } from "@/services/apis/album";

export default async function AlbumWebsitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = await getAlbum(id);
  console.log(album);
  return <div>AlbumWebsitesPage</div>;
}
