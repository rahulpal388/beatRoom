import { ApiSearchPlaylist } from "types/searchType.js";


export function mapSearchPlaylist(playlists: ApiSearchPlaylist[]): ApiSearchPlaylist[] {
    return playlists.map(playlist => ({
        id: playlist.id,
        title: playlist.title,
        image: playlist.image,
        url: playlist.url,
        language: playlist.language,
        type: playlist.type
    }))
}