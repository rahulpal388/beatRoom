import { IPlaylist } from "@/types/playlistType";
import api from "../baseUrlAxios";



export async function getSavePlaylist(): Promise<IPlaylist[]> {
    try {

        return (await api.get(`/playlist/save`)).data;
    } catch {
        return [];
    }
}