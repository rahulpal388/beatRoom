import axios from "axios";
import { IPlaylist } from "@/types/playlistType";
import { api } from "@/lib/checkEnv";

export const savePlaylist = async (
  data: IPlaylist
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${api}/playlist/save`,
      { ...data, isLiked: true },
      { withCredentials: true }
    );

    return response.status === 200;
  } catch {
    return false;
  }
};
