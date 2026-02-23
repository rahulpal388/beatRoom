import { IAlbum } from "@/types/albumType";
import api from "../baseUrlAxios";



export async function saveALbum(album: IAlbum): Promise<boolean> {

    try {
        await api.post(`/album/save`, album);
        return true;

    } catch (error) {
        return false;
    }
}