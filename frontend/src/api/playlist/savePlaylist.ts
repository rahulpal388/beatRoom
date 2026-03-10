import { IPlaylist } from "@/types/playlistType";
import clientAPI from "../baseUrlAxios";
import axios from "axios";



export async function savePlaylist(playlist: IPlaylist): Promise<{
    success: boolean;
    message: string
}> {

    try {
        await clientAPI.post(`/playlist/save`, playlist);
        return {
            success: true,
            message: "playlist saved"
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 401) {
                return {
                    success: false,
                    message: "Login first to save playlist"
                }
            }
        }
        return {
            success: false,
            message: 'Error saving playlist'
        };

    }

}