import { getAlbumSong } from "@/api/album/getAlbumSong";
import { getSongBySameArtist } from "@/api/song/getSongBySameArtist";
import { getSongDetails } from "@/api/song/getSongDetail";
import { getTrendingSong } from "@/api/song/trendingSong";
import { ShowSongDetails } from "@/components/dashboard/music/showSongDetail";
import { SongCards, SongsSection } from "@/components/dashboard/music/songCard";
import { SongHorizontalCard } from "@/components/dashboard/music/songHorizontalCard";
import { SongHorizontalContainer } from "@/components/dashboard/music/songHorizontalContainer";
import { notFound } from "next/navigation";

export default async function Songs({
  params,
}: {
  params: Promise<{ songToken: string; albumToken: string }>;
}) {
  const { songToken, albumToken } = await params;
  const songDetail = await getSongDetails(songToken);
  console.log(songDetail);
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
    <div className=" lg:pb-18 pb-32 md:px-4 ">
      <ShowSongDetails items={songDetail} />
      <div className=" mt-8 flex flex-col gap-4  ">
        {albums && (
          <SongHorizontalContainer title={albums.title}>
            {albums?.list.map((item, index) => (
              <SongHorizontalCard
                key={index}
                serialNumber={index + 1}
                songs={item}
              />
            ))}
          </SongHorizontalContainer>
        )}

        <SongsSection heading="Trending Songs">
          {trendingSongs.map((item, index) => (
            <SongCards key={index} songs={item} />
          ))}
        </SongsSection>
        <SongsSection heading="Song By Same Artist">
          {songBySameArtist.map((item, index) => (
            <SongCards key={index} songs={item} />
          ))}
        </SongsSection>
      </div>
    </div>
  );
}
