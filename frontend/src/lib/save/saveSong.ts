import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../baseUrl";
import { ISong } from "@/types/songType";

export const saveSong = async (
  song: ISong
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/song/${song.isLiked ? "remove" : "save"}`,
      { ...song, isLiked: !song.isLiked },
      { withCredentials: true }
    );
    return response.status===200;
  } catch (error) {
    return false;
  }
};
