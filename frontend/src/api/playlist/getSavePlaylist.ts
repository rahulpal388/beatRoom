import { IPlaylist } from "@/types/playlistType";
import api from "../baseUrlAxios";



export async function getSavePlaylist(): Promise<IPlaylist[]> {
    return (await api.get(`/playlist/save`)).data;
}