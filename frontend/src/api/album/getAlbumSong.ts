import { IAlbumSong } from "@/types/albumType";
import { AxiosInstance } from "axios";




export async function getAlbumSong(api: AxiosInstance, albumToken: string): Promise<IAlbumSong | null> {

    try {

        return (await api.get(`/album/?albumToken=${albumToken}`)).data
    } catch {
        return null;
    }
}