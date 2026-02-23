import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";




export async function getSongReco(id: string, language: string): Promise<ISong[]> {

    return (await api.post(`/song/reco`, {
        "id": id,
        "language": language
    })).data
}