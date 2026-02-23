import { IPlaylist } from "@/types/playlistType";
import api from "../baseUrlAxios";



export async function getPlaylistReco(limit: number, page: number, id: string): Promise<IPlaylist[]> {

    return (await api.get(`/playlist/reco?limit=${limit}&page=${page}&listid=${id}`)).data;
}