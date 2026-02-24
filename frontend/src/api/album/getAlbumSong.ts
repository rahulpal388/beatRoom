import { IAlbumSong } from "@/types/albumType";
import api from "../baseUrlAxios";




export async function getAlbumSong(albumToken: string): Promise<IAlbumSong | null> {

    try {

        return (await api.get(`/album/?albumToken=${albumToken}`)).data
    } catch (error) {
        return null;
    }
}