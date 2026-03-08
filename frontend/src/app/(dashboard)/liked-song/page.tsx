import { getSaveAlbum } from "@/api/album/getSaveAlbum";
import { getSavePlaylist } from "@/api/playlist/getSavePlaylist";
import { getSaveSong } from "@/api/song/getSaveSong";
import { LikePageComponent } from "@/components/dashboard/likedPageComponent";

export default async function LikePage() {
  const [album, song, playlist] = await Promise.all([
    getSaveAlbum(),
    getSaveSong(),
    getSavePlaylist(),
  ]);

  return <LikePageComponent song={song} albums={album} playlist={playlist} />;
}
