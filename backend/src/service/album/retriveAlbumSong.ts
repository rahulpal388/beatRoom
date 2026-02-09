import { retriveSong } from "../songs/retriveSong.js";
import { ApiSongAlbum, ISongAlbum } from "../../types/album.js";



export function retriveAlbumSong(album: ApiSongAlbum, likedAlbum: Set<string>, likedSong: Set<string>): ISongAlbum {
    return {
        id: album.id,
        title: album.title,
        subtitle: album.subtitle,
        type: album.type,
        perma_url: album.perma_url,
        image: album.image.replace("150x150", "500x500"),
        language: album.language,
        list_count: album.list_count,
        isLiked: likedAlbum.has(album.id),
        list: retriveSong(album.list, likedSong),
        more_info: {
            artistMap: {
                primary_artists: album.more_info.artistMap.primary_artists.map(
                    (x) => {
                        return {
                            id: x.id,
                            name: x.name,
                            type: x.type,
                            perma_url: x.perma_url,
                            image: x.image.replace("150x150", "500x500"),
                        };
                    }
                ),
            },
        },
    }
}