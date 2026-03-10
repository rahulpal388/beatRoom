import { IArtists } from "@/types/artistType";
import { AxiosInstance } from "axios";



export async function getSaveArtist(api: AxiosInstance): Promise<IArtists[]> {
    try {
        return (await api.get(`/artist/getSave`)).data

    } catch {
        return []
    }
}