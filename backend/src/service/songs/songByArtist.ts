import axios from "axios";
import { ApiSong, ISong } from "types/songType.js";
import { getLikedSong } from "./getLikedSong.js";
import { retriveSong } from "./retriveSong.js";



export async function songByArtist(userId: string | null, artistId: string): Promise<ISong[]> {

    try {
        const [response, likedSong] = await Promise.all([
            axios.get(`https://www.jiosaavn.com/api.php?__call=search.artistOtherTopSongs&api_version=4&_format=json&_marker=0&ctx=web6dot0&artist_ids=${artistId}&song_id=IhKbmgyP&language=hindi`),
            getLikedSong(userId)
        ])

        const songs = response.data as ApiSong[];

        return retriveSong(songs, likedSong)
    } catch (error) {
        return []
    }

}