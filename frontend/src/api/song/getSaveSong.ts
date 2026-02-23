import { ISong } from "@/types/songType";
import api from "../baseUrlAxios";
import axios from "axios";


export async function getSaveSong(): Promise<{
    success: boolean;
    message: string;
    song: ISong[]
}> {

    try {
        const response = await api.get("/save/song");
        return {
            success: true,
            message: "successfully",
            song: response.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 401) {
                return {
                    success: false,
                    message: "Log in to get the saved song",
                    song: []
                }
            }
        }
        return {
            success: false,
            message: "Error finding the saved song",
            song: []
        }
    }




}