import { IPlaylistSong } from "@/types/playlistType";
import api from "../baseUrlAxios";


export async function getPlaylistSong(token: string): Promise<IPlaylistSong> {

    return (await api.get(`/playlist/${token}`)).data

}