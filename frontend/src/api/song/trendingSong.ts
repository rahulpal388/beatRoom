import { ISong } from "@/types/songType";
import { AxiosInstance } from "axios";



export async function getTrendingSong(api:AxiosInstance,limit: number, page: number, language: string): Promise<ISong[]> {

    return (await api.get(
        `/song/trendingSong?limit=${limit}&page=${page}&language=${language}`
    )).data;

}