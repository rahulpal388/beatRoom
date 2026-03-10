import { ISong } from "@/types/songType";
import { AxiosInstance } from "axios";




export async function getSongBySameArtist(api: AxiosInstance, artistId: string): Promise<ISong[]> {
    return (await api.get(`/song/getTopSongByArtist/${artistId}`)).data;

}