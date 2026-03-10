import { IArtists } from "@/types/artistType";
import axios from "axios";
import clientAPI from "../baseUrlAxios";


export async function saveArtist(artist: IArtists): Promise<{
    success: boolean,
    message: string
}> {



    try {
        await clientAPI.post(`/artist/save`, artist);
        return {
            success: true,
            message: "Album saved"
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 401) {
                return {
                    success: false,
                    message: "Login first to save artist"
                }
            }
        }
        return {
            success: false,
            message: "Error saving artist"
        }
    }
}