import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { ISong } from "@/types/songType";

export const getSong = async ({
  song_token,
  type,
  album_token,
  setCurrentSong,
  setQueueSongs,
  setIsPlaying,
}: {
  song_token: string | undefined;
  type: string;
  album_token: string | undefined;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
  setQueueSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(song_token);
  console.log(album_token);

  if (type === "playlist") {
    const playlistSong = (await axios.get(`${BASE_URL}/playlist/${song_token}`))
      .data;
    setQueueSongs(playlistSong.list);
    console.log(song_token);
    setCurrentSong(playlistSong.list[0]);
    console.log(playlistSong.list);
  } else {
    const albumSong = (
      await axios.get(
        `${BASE_URL}/album/?songToken=${song_token}&albumToken=${
          album_token?.length === 0 ? song_token : album_token
        }`,
        { withCredentials: true }
      )
    ).data;
    console.log(albumSong.list);
    setQueueSongs(albumSong.list);
    setCurrentSong(albumSong.list[0]);
  }
  setIsPlaying(true);
};
