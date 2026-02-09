import { ApiSearchAlbum, ApiSearchArtist, ApiSearchPlaylist, ApiSearchSong } from "../../types/searchType.js";
import { mapSearchAlbum } from "./mapSearchAlbum.js";
import { mapSearchSong } from "./mapSearchSong.js";
import { mapSearchPlaylist } from "./mapSearchPlaylist.js";
import { mapSearchArtist } from "./mapSearchArtist.js";



export function mapSearchTopQuery(topQuery: ApiSearchAlbum[] | ApiSearchSong[] | ApiSearchArtist[] | ApiSearchPlaylist[]) {

    if (topQuery.length === 0) {
        return [];
    }

    const entityType = topQuery[0].type;

    switch (entityType) {
        case "album":
            return mapSearchAlbum(topQuery as ApiSearchAlbum[]);
        case "song":
            return mapSearchSong(topQuery as ApiSearchSong[]);
        case "playlist":
            return mapSearchPlaylist(topQuery as ApiSearchPlaylist[]);
        case "artist":
            return mapSearchArtist(topQuery as ApiSearchArtist[]);
        default:
            return []
    }

}