import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";
import axios from "axios";





export async function saveSong(song: ISong): Promise<{
    success: boolean;
    message: string
}> {
    try {
        await api.post("/song/save", song);
        return {
            success: true,
            message: "Song saved"
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status == 401)
                return {
                    success: false,
                    message: "Login first to save song"
                }
        }
        return {
            success: false,
            message: "Error saving song"
        }
    }
}