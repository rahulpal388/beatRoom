import { IPlaylistSong } from "@/types/playlistType";
import api from "../baseUrlAxios";



export async function getUserSavedPlaylistInfo(id: string): Promise<IPlaylistSong> {
    return (await api.get(`/playlist/userPlaylist/${id}`)).data;
}