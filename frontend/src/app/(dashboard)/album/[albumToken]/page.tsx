import { getAlbumReco } from "@/api/album/getAlbumReco";
import { getAlbumSong } from "@/api/album/getAlbumSong";
import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";
import { AlbumComponent } from "@/components/dashboard/album";
import { notFound } from "next/navigation";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ albumToken: string }>;
}) {
  const { albumToken } = await params;
  const album = await getAlbumSong(albumToken as string);
  if (!album) {
    notFound();
  }
  const [albumReco, trendingAlbum] = await Promise.all([
    await getAlbumReco(album.id),
    getTrendingAlbum(10, 1, album.language),
  ]);

  return (
    <AlbumComponent
      album={album}
      albumReco={albumReco}
      trendingAlbum={trendingAlbum}
    />
  );
}
