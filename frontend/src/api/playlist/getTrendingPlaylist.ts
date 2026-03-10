import { IPlaylist } from "@/types/playlistType";
import { AxiosInstance } from "axios";




export async function getTrendingPlaylist(api: AxiosInstance, limit: number, page: number, language: string): Promise<IPlaylist[]> {

    return (await api.get(`/playlist/trendingPlaylist?limit=${limit}&page=${page}&language=${language}`)).data

}

