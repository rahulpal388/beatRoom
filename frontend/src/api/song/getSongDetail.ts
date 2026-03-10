import { ISong } from "@/types/songType";
import { AxiosInstance } from "axios";



export async function getSongDetails(api: AxiosInstance, token: string): Promise<ISong | null> {
    try {

        return (await api.get(`/song/songDetail/${token}`)).data;
    } catch {
        return null;
    }
}