import { IPlaylist } from "@/types/playlistType";
import api from "../baseUrlAxios";



export async function savePlaylist(playlist: IPlaylist): Promise<boolean> {

    try {
        await api.post(`/playlist/save`, playlist);
        return true;
    } catch {
        return false;

    }

}