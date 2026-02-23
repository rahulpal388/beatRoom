import { IArtistInfo } from "@/types/artistType";
import api from "../baseUrlAxios";



export async function getArtistInfo(artistToken: string): Promise<IArtistInfo> {
    return (await api.get(`/artist/?artistToken=${artistToken}`)).data
}