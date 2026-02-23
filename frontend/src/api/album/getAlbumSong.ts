import { IAlbumSong } from "@/types/albumType";
import api from "../baseUrlAxios";




export async function getAlbumSong(albumToken: string, songToken: string): Promise<IAlbumSong> {
    return (await api.get(`/album/?albumToken=${albumToken}&songToken=${songToken}`)).data
}