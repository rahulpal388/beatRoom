import { getSaveAlbum } from "@/api/album/getSaveAlbum";
import serverApiFunction from "@/api/baseServerUrlAxios";
import { getSavePlaylist } from "@/api/playlist/getSavePlaylist";
import { getSaveSong } from "@/api/song/getSaveSong";
import { LikePageComponent } from "@/components/dashboard/likedPageComponent";

export default async function LikePage() {
  const serverAPI = await serverApiFunction();
  const [album, song, playlist] = await Promise.all([
    getSaveAlbum(serverAPI),
    getSaveSong(serverAPI),
    getSavePlaylist(serverAPI),
  ]);

  return <LikePageComponent song={song} albums={album} playlist={playlist} />;
}
