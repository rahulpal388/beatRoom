import { getPlaylistReco } from "@/api/playlist/getPlaylistReco";
import { getPlaylistSong } from "@/api/playlist/getPlaylistSong";
import { getTrendingPlaylist } from "@/api/playlist/getTrendingPlaylist";
import { getUserSavedPlaylistInfo } from "@/api/playlist/getUserSavedPlaylist";
import Playlist from "@/components/dashboard/playlist";
import { notFound } from "next/navigation";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ playlistToken: string }>;
}) {
  const { playlistToken } = await params;

  const isNumeric = /^\d+$/.test(playlistToken as string);
  const playlist = isNumeric
    ? await getUserSavedPlaylistInfo(playlistToken as string)
    : await getPlaylistSong(playlistToken as string);

  if (!playlist) {
    notFound();
  }
  const [playlistReco, trendingPlaylist] = await Promise.all([
    getPlaylistReco(10, 1, playlist.id),
    getTrendingPlaylist(10, 1, playlist.language),
  ]);

  return (
    <Playlist
      playlist={playlist}
      playlistReco={playlistReco}
      trendingPlaylist={trendingPlaylist}
    />
  );
}
