import { ISong } from "@/types/songType";
import { AxiosInstance } from "axios";




export async function getSongReco(api: AxiosInstance, id: string, language: string): Promise<ISong[]> {

    return (await api.post(`/song/reco`, {
        id: id,
        language: language
    })).data
}