import { ApiAlbum, IAlbum } from "../../types/album.js";


export function retriveTrendingAlbum(album: ApiAlbum[], likedAlbum: Set<string>): IAlbum[] {
    return album.map(album => (
        {
            id: album.id,
            title: album.title,
            type: album.type,
            perma_url: album.perma_url,
            image: album.image.replace("150x150", "500x500"),
            isLiked: likedAlbum.has(album.id),
        }
    ))
}