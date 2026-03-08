import { IArtists } from "@/types/artistType";
import api from "../baseUrlAxios";



export async function getSaveArtist(): Promise<IArtists[]> {
    try {
        return (await api.get(`/artist/getSave`)).data

    } catch {
        return []
    }
}