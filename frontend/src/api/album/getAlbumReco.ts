import { IAlbum } from "@/types/albumType";
import api from "../baseUrlAxios";


export async function getAlbumReco(id: string): Promise<IAlbum[]> {

    return (await api.get(`/album/reco/${id}`)).data
}