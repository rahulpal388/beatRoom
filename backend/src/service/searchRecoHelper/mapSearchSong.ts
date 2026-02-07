import { ApiSearchSong } from "types/searchType.js";



export function mapSearchSong(songs: ApiSearchSong[]): ApiSearchSong[] {
    return songs.map(song => ({
        id: song.id,
        title: song.title,
        image: song.image,
        album: song.album,
        url: song.url,
        type: song.type,
        description: song.description,
        more_info: {
            primary_artists: song.more_info.primary_artists,
            language: song.more_info.language
        }
    }))
}