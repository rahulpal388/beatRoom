import { getAlbumReco } from "@/api/album/getAlbumReco";
import { getAlbumSong } from "@/api/album/getAlbumSong";
import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";
import serverApiFunction from "@/api/baseServerUrlAxios";
import { AlbumComponent } from "@/components/dashboard/album";
import { notFound } from "next/navigation";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ albumToken: string }>;
}) {
  const { albumToken } = await params;
  const serverAPI = await serverApiFunction();
  const album = await getAlbumSong(serverAPI, albumToken as string);
  console.log(album);
  if (!album) {
    notFound();
  }
  const [albumReco, trendingAlbum] = await Promise.all([
    await getAlbumReco(serverAPI, album.id),
    getTrendingAlbum(serverAPI, 10, 1, album.language),
  ]);

  return (
    <AlbumComponent
      album={album}
      albumReco={albumReco}
      trendingAlbum={trendingAlbum}
    />
  );
}
