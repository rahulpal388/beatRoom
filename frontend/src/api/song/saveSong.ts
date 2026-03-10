import { ISong } from "@/types/songType";
import axios from "axios";
import clientAPI from "../baseUrlAxios";





export async function saveSong(song: ISong): Promise<{
    success: boolean;
    message: string
}> {
    try {
        await clientAPI.post("/song/save", song);
        return {
            success: true,
            message: "Song saved"
        };
    } catch (error) {


        console.log(error)
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