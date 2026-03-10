import { IAlbum } from "@/types/albumType";
import axios from "axios";
import clientAPI from "../baseUrlAxios";



export async function saveALbum(album: IAlbum): Promise<{ success: boolean; message: string }> {

    try {
        await clientAPI.post(`/album/save`, album);
        return {
            success: true,
            message: "Album saved"
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 401) {
                return {
                    success: false,
                    message: "Login first to save album"
                }
            }
        }
        return {
            success: false,
            message: "Error saving album"
        }
    }
}