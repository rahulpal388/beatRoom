import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./baseUrl";
import { ISong } from "@/types/songType";

export const saveSong = async (
  song: ISong
): Promise<AxiosResponse<any, any> | null> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/song/save`,
      { ...song, isLiked: !song.isLiked },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return null;
  }
};
