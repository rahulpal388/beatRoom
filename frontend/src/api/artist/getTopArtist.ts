import { IArtists } from "@/types/artistType";
import api from "../baseUrlAxios";




export async function getTopArtist(limit: number, page: number): Promise<IArtists[]> {
    return (await api.get(`/artist/topArtist?limit=${limit}&page=${page}`)).data;
}