import axios from "axios";
import { ISong } from "@/types/songType";
import { api } from "@/lib/checkEnv";


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
    const playlistSong = (
      await axios.get(`${api}/playlist/${song_token}`, {
        withCredentials: true,
      })
    ).data.list as ISong[];
    const songIdx = playlistSong.findIndex((x) => x.id === songId);
    return [...playlistSong.slice(songIdx), ...playlistSong.slice(0, songIdx)];
  } else {
    const albumSong = (
      await axios.get(
        `${api}/album/?songToken=${song_token}&albumToken=${album_token?.length === 0 ? song_token : album_token
        }`,
        { withCredentials: true }
      )
    ).data.list as ISong[];
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
