import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { IPlaylist } from "@/types/playlistType";

export const savePlaylist = async (data: IPlaylist) => {
  const response = await axios.post(
    `${BASE_URL}/playlist/save`,
    { ...data, isLiked: true },
    { withCredentials: true }
  );

  return response;
};
