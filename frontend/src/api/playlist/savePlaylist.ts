import { IPlaylist } from "@/types/playlistType";
import api from "../baseUrlAxios";
import axios from "axios";



export async function savePlaylist(playlist: IPlaylist): Promise<boolean> {

    try {
        await api.post(`/playlist/save`, playlist);
        return true;
    } catch (error) {
        return false;

    }

}