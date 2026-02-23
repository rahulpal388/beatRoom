import { IAlbum } from "@/types/albumType";
import api from "../baseUrlAxios";



export async function getTrendingAlbum(limit: number, page: number, language: string): Promise<IAlbum[]> {
    return (await api.get(`/album/trendingAlbum?limit=${limit}&page=${page}&language=${language}`)).data;
}