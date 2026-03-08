import { IAlbum } from "@/types/albumType";
import api from "../baseUrlAxios";



export async function getSaveAlbum(): Promise<IAlbum[]> {
    try {

        return (await api.get(`/album/getSave`)).data;

    } catch {
        return []
    }
}