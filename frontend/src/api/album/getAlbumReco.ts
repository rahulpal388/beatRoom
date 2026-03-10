import { IAlbum } from "@/types/albumType";
import api from "../baseUrlAxios";
import { AxiosInstance } from "axios";


export async function getAlbumReco(api: AxiosInstance, id: string): Promise<IAlbum[]> {

    return (await api.get(`/album/reco/${id}`)).data
}