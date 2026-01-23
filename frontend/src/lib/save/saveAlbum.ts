import { IAlbum } from "@/types/albumType";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../baseUrl";

export const saveAlbum = async (
  album: IAlbum
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/album/${album.isLiked ? "save" : "remove"}`,
      { album },
      { withCredentials: true }
    );

    return response.status===200;
  } catch (error) {
    return false;
  }
};
