import { IAlbum } from "@/types/albumType";
import { AxiosInstance } from "axios";



export async function getTrendingAlbum(api: AxiosInstance, limit: number, page: number, language: string): Promise<IAlbum[]> {
    return (await api.get(`/album/trendingAlbum?limit=${limit}&page=${page}&language=${language}`)).data;
}