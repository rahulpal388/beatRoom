import axios, { AxiosResponse } from "axios";
import { IPlaylist } from "@/types/playlistType";
import { tryLoadManifestWithRetries } from "next/dist/server/load-components";
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
  } catch (error) {
    return false;
  }
};
