import { getAlbumSong } from "@/api/album/getAlbumSong";
import serverApiFunction from "@/api/baseServerUrlAxios";
import { getSongBySameArtist } from "@/api/song/getSongBySameArtist";
import { getSongDetails } from "@/api/song/getSongDetail";
import { getTrendingSong } from "@/api/song/trendingSong";
import { Song } from "@/components/dashboard/song";
import { notFound } from "next/navigation";

export default async function Songs({
  params,
}: {
  params: Promise<{ songToken: string; albumToken: string }>;
}) {
  const serverAPI = await serverApiFunction();
  const { songToken, albumToken } = await params;
  const songDetail = await getSongDetails(serverAPI, songToken);

  if (!songDetail) {
    notFound();
  }

  const [albums, trendingSongs, songBySameArtist] = await Promise.all([
    getAlbumSong(serverAPI, albumToken),
    getTrendingSong(serverAPI, 10, 1, songDetail.language),
    getSongBySameArtist(
      serverAPI,
      songDetail.more_info.artistMap.artists.map((x) => x.id).join(","),
    ),
  ]);

  return (
    <Song
      songDetail={songDetail}
      trendingSongs={trendingSongs}
      albums={albums}
      songBySameArtist={songBySameArtist}
    />
  );
}
