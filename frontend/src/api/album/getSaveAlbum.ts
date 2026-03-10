import { IAlbum } from "@/types/albumType";
import { AxiosInstance } from "axios";



export async function getSaveAlbum(api: AxiosInstance): Promise<IAlbum[]> {
    try {

        return (await api.get(`/album/getSave`)).data;

    } catch {
        return []
    }
}