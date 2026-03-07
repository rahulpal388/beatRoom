import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { getTopPlaylist } from "@/api/playlist/getTopPlaylist";
import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";
import BrowseComponent from "@/components/dashboard/browseComponent";

export default async function Browse() {
  const [newRelease, topPlaylist, topAlbum] = await Promise.all([
    getNewReleasedSong(8, 1),
    getTopPlaylist(8, 1),
    getTrendingAlbum(8, 1, "hindi"),
  ]);

  return (
    <BrowseComponent
      newReleased={newRelease}
      topAlbum={topAlbum}
      topPlaylist={topPlaylist}
    />
  );
}
