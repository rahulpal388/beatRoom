import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";




export async function getSongBySameArtist(artistId: string): Promise<ISong[]> {
    return (await api.get(`/song/getTopSongByArtist/${artistId}`)).data;

}