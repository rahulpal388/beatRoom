import { IAlbum } from "@/types/albumType";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./baseUrl";

export const saveAlbum = async (
  album: IAlbum
): Promise<AxiosResponse<any, any> | null> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/album/${album.isLiked ? "save" : "remove"}`,
      { album },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return null;
  }
};
