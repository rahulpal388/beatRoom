import axios from "axios";
import { mapSearchAlbum } from "service/searchRecoHelper/mapSearchAlbum.js";
import { mapSearchArtist } from "service/searchRecoHelper/mapSearchArtist.js";
import { mapSearchPlaylist } from "service/searchRecoHelper/mapSearchPlaylist.js";
import { mapSearchSong } from "service/searchRecoHelper/mapSearchSong.js";
import { mapSearchTopQuery } from "service/searchRecoHelper/mapSearchTopQuery.js";
import { ApiSearchReco } from "types/searchType.js";



export async function searchReco(query: String): Promise<ApiSearchReco | null> {

    try {

        const searchResponse = (
            await axios.get(
                `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=1&cc=in&includeMetaTags=2&query=${query}`
            )
        ).data as ApiSearchReco;

        const result: ApiSearchReco = {
            albums: {
                data: mapSearchAlbum(searchResponse.albums.data)
            },
            songs: {
                data: mapSearchSong(searchResponse.songs.data)
            },
            playlists: {
                data: mapSearchPlaylist(searchResponse.playlists.data)
            },
            artists: {
                data: mapSearchArtist(searchResponse.artists.data)
            },
            topquery: {
                data: mapSearchTopQuery(searchResponse.topquery.data)
            }
        }

        return result;
    } catch (error) {
        return null;

    }
}