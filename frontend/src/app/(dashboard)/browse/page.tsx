import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { getTopPlaylist } from "@/api/playlist/getTopPlaylist";
import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";
import BrowseComponent from "@/components/dashboard/browseComponent";
import serverApiFunction from "@/api/baseServerUrlAxios";

export default async function Browse() {
  const serverAPI = await serverApiFunction();
  const [newRelease, topPlaylist, topAlbum] = await Promise.all([
    getNewReleasedSong(serverAPI, 8, 1),
    getTopPlaylist(serverAPI, 8, 1),
    getTrendingAlbum(serverAPI, 8, 1, "hindi"),
  ]);

  return (
    <BrowseComponent
      newReleased={newRelease}
      topAlbum={topAlbum}
      topPlaylist={topPlaylist}
    />
  );
}
