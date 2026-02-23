import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";



export async function getTrendingSong(limit: number, page: number, language: string): Promise<ISong[]> {

    return (await api.get(
        `/song/trendingSong?limit=${limit}&page=${page}&language=${language}`
    )).data;

}