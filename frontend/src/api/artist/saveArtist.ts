import { IArtists } from "@/types/artistType";
import api from "../baseUrlAxios";


export async function saveArtist(artist: IArtists): Promise<boolean> {

    try {
        await api.post(`/artist/save`, artist);

        return true;
    } catch (error) {
        return false;
    }
}