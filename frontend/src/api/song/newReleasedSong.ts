import { INewReleaseSong } from "@/types/songType"
import { AxiosInstance } from "axios"



export async function getNewReleasedSong(api: AxiosInstance, limit: number, page: number): Promise<INewReleaseSong[]> {
    return (await api.get(`/song/newReleased?limit=${limit}&page=${page}`)).data
}