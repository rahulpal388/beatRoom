import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";




export async function addSongToPlaylist(id: string, songs: ISong): Promise<boolean> {
    return (await api.post(`/playlist/addSongToPlaylist`, {
        id,
        songs
    }))

}