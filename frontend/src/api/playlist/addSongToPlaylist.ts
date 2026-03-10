import { ISong } from "@/types/songType";
import clientAPI from "../baseUrlAxios";




export async function addSongToPlaylist(id: string, songs: ISong): Promise<boolean> {
    return (await clientAPI.post(`/playlist/addSongToPlaylist`, {
        id,
        songs
    }))

}