import { IPlaylistSong } from "@/types/playlistType";
import { AxiosInstance } from "axios";



export async function getUserSavedPlaylistInfo(api: AxiosInstance, id: string): Promise<IPlaylistSong> {
    return (await api.get(`/playlist/userPlaylist/${id}`)).data;
}