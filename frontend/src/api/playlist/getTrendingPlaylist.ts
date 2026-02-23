import { IPlaylist } from "@/types/playlistType";
import api from "../baseUrlAxios";




export async function getTrendingPlaylist(limit: number, page: number, language: string): Promise<IPlaylist[]> {

    return (await api.get(`/playlist/trendingPlaylist?limit=${limit}&page=${page}&language=${language}`)).data

}

