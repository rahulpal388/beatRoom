import { IPlaylist } from "@/types/playlistType";
import { AxiosInstance } from "axios";



export async function getTopPlaylist(api: AxiosInstance, limit: number, page: number): Promise<IPlaylist[]> {

    return (await api.get(`/playlist?limit=${limit}&page=${page}`)).data

}