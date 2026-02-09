import axios from "axios";
import { ApiSong, ISong } from "../../types/songType.js";
import { getLikedSong } from "./getLikedSong.js";
import { retriveSong } from "./retriveSong.js";

export async function getSongDetails(
    token: string,
    userId: string | null
): Promise<ISong[]> {
    try {
        const [response, likedSong] = await Promise.all([
            axios.get(
                `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${token}&type=song`
            ),
            userId ? getLikedSong(userId) : new Set([]),
        ]);
        const song = response.data.songs as ApiSong[];

        return retriveSong([song[0]], likedSong);
    } catch (error) {
        console.log(error);
        return [];
    }
}
