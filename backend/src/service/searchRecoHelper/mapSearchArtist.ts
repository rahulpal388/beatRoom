import { ApiSearchArtist } from "types/searchType.js";



export function mapSearchArtist(artists: ApiSearchArtist[]): ApiSearchArtist[] {
    return artists.map(artist => ({
        id: artist.id,
        title: artist.title,
        image: artist.image,
        type: artist.type,
        url: artist.url
    }))
}