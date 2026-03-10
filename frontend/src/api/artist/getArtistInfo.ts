import { IArtistInfo } from "@/types/artistType";
import { AxiosInstance } from "axios";



export async function getArtistInfo(api: AxiosInstance, artistToken: string): Promise<IArtistInfo> {
    return (await api.get(`/artist/?artistToken=${artistToken}`)).data
}