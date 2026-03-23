import { IArtists } from "@/types/artistType";
import cleintAPI from "../baseUrlAxios";




export async function getTopArtist(limit: number, page: number): Promise<IArtists[]> {
    try {
        return (await cleintAPI.get(`/artist/topArtist?limit=${limit}&page=${page}`)).data;

    } catch {
        return []
    }
}