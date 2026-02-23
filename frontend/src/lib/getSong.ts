import axios from "axios";
import { ISong } from "@/types/songType";
import { getPlaylistSong } from "@/api/playlist/getPlaylistSong";
import { getAlbumSong } from "@/api/album/getAlbumSong";


export const getSong = async ({
  song_token,
  type,
  album_token,
  songId,
}: {
  song_token: string | undefined;
  type: string;
  songId: string;
  album_token: string | undefined;
}): Promise<ISong[]> => {
  if (type === "playlist") {
    const playlistSong = (await getPlaylistSong(song_token || "")).list;
    const songIdx = playlistSong.findIndex((x) => x.id === songId);
    return [...playlistSong.slice(songIdx), ...playlistSong.slice(0, songIdx)];
  } else {
    const albumSong = (await getAlbumSong(album_token || "", song_token || "")).list;
    const songIdx =
      type === "song" ? albumSong.findIndex((x) => x.id === songId) : 0;
    const songs =
      type === "album"
        ? albumSong
        : [...albumSong.slice(songIdx), ...albumSong.slice(0, songIdx)];
    return songs;
  }

  return [];
};
