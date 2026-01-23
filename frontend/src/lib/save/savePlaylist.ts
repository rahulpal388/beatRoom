import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../baseUrl";
import { IPlaylist } from "@/types/playlistType";
import { tryLoadManifestWithRetries } from "next/dist/server/load-components";

export const savePlaylist = async (
  data: IPlaylist
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/playlist/save`,
      { ...data, isLiked: true },
      { withCredentials: true }
    );

    return response.status===200;
  } catch (error) {
    return false;
  }
};
