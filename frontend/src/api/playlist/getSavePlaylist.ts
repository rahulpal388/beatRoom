import { IPlaylist } from "@/types/playlistType";
import { AxiosInstance } from "axios";



export async function getSavePlaylist(api: AxiosInstance): Promise<IPlaylist[]> {
    try {

        return (await api.get(`/playlist/save`)).data;
    } catch {
        return [];
    }
}