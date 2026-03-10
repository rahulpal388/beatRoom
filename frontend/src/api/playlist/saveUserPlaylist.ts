import { ISong } from "@/types/songType";
import clientAPI from "../baseUrlAxios";
import axios from "axios";



export async function saveUserPlaylist(title: string, subtitle: string, songs: ISong[]): Promise<{
    success: boolean
    message: string
}> {




    try {
        await clientAPI.post(`/playlist/saveUserPlaylist`, {
            title,
            subtitle,
            songs
        })
        return {
            success: true,
            message: "Album saved"
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 401) {
                return {
                    success: false,
                    message: "Login first"
                }
            }
        }
        return {
            success: false,
            message: "Error saving"
        }
    }
}