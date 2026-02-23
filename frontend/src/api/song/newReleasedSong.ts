import { INewReleaseSong } from "@/types/songType"
import api from "../baseUrlAxios"



export async function getNewReleasedSong(limit: number, page: number): Promise<INewReleaseSong[]> {
    return (await api.get(`/song/newReleased?limit=${limit}&page=${page}`)).data
}