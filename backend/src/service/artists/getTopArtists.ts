import axios from "axios";
import { ApiTopArtist, IArtists } from "../../types/artistType.js";



export async function getTopArtists(): Promise<IArtists[]> {

    try {
        const response = await axios.get(
            `https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0`
        );

        const topArtist = response.data.top_artists as ApiTopArtist[];

        return topArtist.map(artist => (
            {
                id: artist.artistid,
                name: artist.name,
                image: artist.image.replace("150x150", "500x500"),
                perma_url: artist.perma_url,
                isLiked: false,
                role: "",
                type: "",
            }
        ))

    } catch (error) {
        return [];

    }

}