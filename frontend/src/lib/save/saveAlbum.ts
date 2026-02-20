import { IAlbum } from "@/types/albumType";
import axios from "axios";
import { api } from "@/lib/checkEnv";

export const saveAlbum = async (
  album: IAlbum
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${api}/album/${album.isLiked ? "save" : "remove"}`,
      { album },
      { withCredentials: true }
    );

    return response.status === 200;
  } catch {
    return false;
  }
};
