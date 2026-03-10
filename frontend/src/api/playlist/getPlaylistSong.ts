import { IPlaylistSong } from "@/types/playlistType";
import { AxiosInstance } from "axios";


export async function getPlaylistSong(api: AxiosInstance, token: string): Promise<IPlaylistSong | null> {
    try {

        return (await api.get(`/playlist/${token}`)).data
    } catch {
        return null;
    }

}