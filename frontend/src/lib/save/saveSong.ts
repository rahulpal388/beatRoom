import axios, { AxiosResponse } from "axios";
import { ISong } from "@/types/songType";
import { api } from "@/lib/checkEnv";

export const saveSong = async (
  song: ISong
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${api}/song/${song.isLiked ? "remove" : "save"}`,
      { ...song, isLiked: !song.isLiked },
      { withCredentials: true }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
