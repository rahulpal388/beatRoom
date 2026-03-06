import { getAlbumSong } from "@/api/album/getAlbumSong";
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
  const { songToken, albumToken } = await params;
  const songDetail = await getSongDetails(songToken);

  if (!songDetail) {
    notFound();
  }

  const [albums, trendingSongs, songBySameArtist] = await Promise.all([
    getAlbumSong(albumToken),
    getTrendingSong(10, 1, songDetail.language),
    getSongBySameArtist(
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
