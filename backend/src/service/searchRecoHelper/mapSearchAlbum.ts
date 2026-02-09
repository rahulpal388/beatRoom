import { ApiSearchAlbum } from "../../types/searchType.js";


export function mapSearchAlbum(album: ApiSearchAlbum[]): ApiSearchAlbum[] {
    return album.map(album => (
        {
            id: album.id,
            title: album.title,
            image: album.image,
            url: album.url,
            type: album.type,
            description: album.description,
            more_info: {
                language: album.more_info.language,
                song_pids: album.more_info.song_pids
            }
        }
    ))
}