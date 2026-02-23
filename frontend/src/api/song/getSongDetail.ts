import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";



export async function getSongDetails(token: string): Promise<ISong> {
    return (await api.get(`/song/songDetail/${token}`)).data;
}