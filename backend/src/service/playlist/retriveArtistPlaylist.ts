import { ApiArtistPlaylist } from "../../types/artistType.js";
import { WithLike } from "../../types/withLike.js";

export const retriveArtistPlaylist = (
    playlists: ApiArtistPlaylist[],
    likedPlaylist: Set<string>
): WithLike<ApiArtistPlaylist>[] => {
    return playlists.map((playlist) => {
        return {
            id: playlist.id,
            title: playlist.title,
            subtitle: playlist.subtitle,
            type: playlist.type,
            image: playlist.image.replace("150x150", "500x500"),
            perma_url: playlist.perma_url,
            isLiked: likedPlaylist.has(playlist.id),
            more_info: {
                entity_type: playlist.more_info.entity_type,
                song_count: playlist.more_info.song_count,
                language: playlist.more_info.language,
            },
        };
    });
};
