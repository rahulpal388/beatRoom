import axios from "axios";
import { getLikedSong } from "../songs/getLikedSong.js";
import { getLikedAlbum } from "./getLikedAlbum.js";
import { ApiSongAlbum, ISongAlbum } from "../../types/album.js";
import { retriveAlbumSong } from "./retriveAlbumSong.js";


export async function albumSong(albumToken: string, userId: string | null): Promise<ISongAlbum | null> {
    try {
        const [response, likedSong, likedAlbum] = await Promise.all([
            axios.get(
                `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${albumToken}}&type=album`
            ),
            getLikedSong(userId),
            getLikedAlbum(userId),
        ]);

        const album = response.data as ApiSongAlbum;
        return retriveAlbumSong(album, likedAlbum, likedSong);
    } catch {
        return null;
    }
}