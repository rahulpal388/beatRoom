import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";



export async function getSongDetails(token: string): Promise<ISong | null> {
    try {

        return (await api.get(`/song/songDetail/${token}`)).data;
    } catch (error) {
        return null;
    }
}