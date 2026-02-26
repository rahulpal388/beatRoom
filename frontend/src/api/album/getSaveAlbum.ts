import { IAlbum } from "@/types/albumType";
import api from "../baseUrlAxios";



export async function getSaveAlbum(): Promise<IAlbum[]> {
    return (await api.get(`/album/getSave`)).data;
}