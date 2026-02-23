import { IPlaylist } from "@/types/playlistType";
import api from "../baseUrlAxios";



export async function getTopPlaylist(limit: number, page: number): Promise<IPlaylist[]> {

    return (await api.get(`/playlist?limit=${limit}&page=${page}`)).data

}