import { ISong } from "../controllers/song/getTendingSong.js";
import axios from "axios";
import { retriveSong } from "./retriveSong.js";

export async function getSongDetails(token: string): Promise<ISong[] | null> {
  try {
    const response = (
      await axios.get(
        `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${token}&type=song`
      )
    ).data.songs;
    const song = response as ISong[];
    return retriveSong([song[0]], false);
  } catch (error) {
    return null;
  }
}
