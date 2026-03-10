import { IPlaylist } from "@/types/playlistType";
import { AxiosInstance } from "axios";



export async function getPlaylistReco(api: AxiosInstance, limit: number, page: number, id: string): Promise<IPlaylist[]> {

    return (await api.get(`/playlist/reco?limit=${limit}&page=${page}&listid=${id}`)).data;
}