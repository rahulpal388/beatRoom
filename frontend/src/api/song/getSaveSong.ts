import { ISong } from "@/types/songType";
import { AxiosInstance } from "axios";


export async function getSaveSong(api: AxiosInstance): Promise<ISong[]> {

    try {
        return (await api.get("/song/save")).data

    } catch (error) {
        return []
    }




}