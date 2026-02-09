import axios from "axios";
import { ApiAlbum, IAlbum } from "../../types/album.js";
import { getLikedAlbum } from "./getLikedAlbum.js";
import { retriveTrendingAlbum } from "./retriveTrendingAlbum.js";



export async function albumReco(id: string, userId: string | null): Promise<IAlbum[]> {

    try {
        const [response, likedAlbum] = await Promise.all([
            axios.get(
                `https://www.jiosaavn.com/api.php?__call=reco.getAlbumReco&api_version=4&_format=json&_marker=0&ctx=web6dot0&albumid=${id}`
            ),
            getLikedAlbum(userId),
        ]);
        const album = response.data as ApiAlbum[];

        return retriveTrendingAlbum(album, likedAlbum);
    } catch (error) {
        console.log(`Error while fetching album Recommandation => ${error}`)
        return [];
    }

}