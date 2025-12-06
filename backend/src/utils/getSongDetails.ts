import { ISong } from "../controllers/song/getTendingSong.js";
import axios from "axios";
import { retriveSong } from "./retriveSong.js";
import { getLikedSong } from "./getlikedSong.js";

export async function getSongDetails(
  token: string,
  userId: string
): Promise<ISong[] | null> {
  try {
    const [response, likedSong] = await Promise.all([
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${token}&type=song`
      ),
      userId.length !== 0 ? getLikedSong(userId) : new Set([]),
    ]);
    console.log(response.data);
    const song = response.data.songs as ISong[];

    return retriveSong([song[0]], likedSong);
  } catch (error) {
    console.log(error);
    return [];
  }
}
