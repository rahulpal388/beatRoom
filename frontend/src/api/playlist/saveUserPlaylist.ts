import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";



export async function saveUserPlaylist(title: string, subtitle: string, songs: ISong[]): Promise<boolean> {

    try {
        await api.post(`/playlist/saveUserPlaylist`, {
            title,
            subtitle,
            songs
        })
        return true;
    } catch {
        return false;
    }
}