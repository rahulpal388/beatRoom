import axios from "axios";
import clientAPI from "./baseUrlAxios"

type Itype = "song" | "playlist" | "album" | "artist" | "userPlaylist"
export async function removeEntity(id: string, type: Itype): Promise<{
    success: boolean;
    message: string
}> {

    try {
        await clientAPI.post(`/entity/remove`, {
            id,
            type
        })
        return {
            success: true,
            message: "Removed"
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 401) {

                return {
                    success: false,
                    message: "Login first"
                };
            }
        }

        return {
            success: false,
            message: "Error"
        };
    }

}