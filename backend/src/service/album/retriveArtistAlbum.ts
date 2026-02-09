import { ApiArtistAlbum } from "../../types/artistType.js";
import { WithLike } from "../../types/withLike.js";

export function retriveArtistAlbum(
    albums: ApiArtistAlbum[],
    likedAlbum: Set<String>
): WithLike<ApiArtistAlbum>[] {

    return albums.map((album) => (
        {
            id: album.id,
            title: album.title,
            subtitle: album.subtitle,
            type: album.type,
            perma_url: album.perma_url,
            image: album.image.replace("150x150", "500x500"),
            language: album.language,
            isLiked: likedAlbum.has(album.id),
            more_info: {
                artistMap: {
                    artists: album.more_info.artistMap.artists.map((artist) => {
                        return {
                            id: artist.id,
                            name: artist.name,
                            role: artist.role,
                            image: artist.image.replace("150x150", "500x500"),
                            type: artist.type,
                            perma_url: artist.perma_url,
                        };
                    }),
                },
            },
        }
    ));
};
