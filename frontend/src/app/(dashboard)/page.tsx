import { getTopArtist } from "@/api/artist/getTopArtist";
import serverApiFunction from "@/api/baseServerUrlAxios";
import { getTopPlaylist } from "@/api/playlist/getTopPlaylist";
import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { getTrendingSong } from "@/api/song/trendingSong";
import { Music } from "@/components/dashboard/music/music";

export default async function MainPage() {
  const serverAPI = await serverApiFunction();
  const [newReleased, trendingSong, topPlaylist, topArtist] = await Promise.all(
    [
      getNewReleasedSong(serverAPI, 14, 1),
      getTrendingSong(serverAPI, 10, 1, "hindi"),
      getTopPlaylist(serverAPI, 10, 1),
      getTopArtist(10, 0),
    ],
  );

  return (
    <>
      <div className=" md:px-4 px-1  w-full    ">
        <Music
          newReleased={newReleased}
          trendingSong={trendingSong}
          topPlaylist={topPlaylist}
          topArtist={topArtist}
        />
      </div>
    </>
  );
}
