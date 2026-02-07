import { ApiSong, ISong } from "../../types/songType.js";

export const retriveSong = (songs: ApiSong[], likeSong: Set<string>): ISong[] => {
    return songs.map((item) => (
        {
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            type: item.type,
            perma_url: item.perma_url,
            image: item.image.replace("150x150", "500x500"),
            language: item.language,
            play_count: item.play_count,
            isLiked: likeSong.has(item.id),
            more_info: {
                album_id: item.more_info.album_id,
                album: item.more_info.album,
                album_url: item.more_info.album_url,
                duration: item.more_info.duration,
                encrypted_media_url: item.more_info.encrypted_media_url,
                artistMap: {
                    artists: item.more_info.artistMap.artists.map((x) => {
                        return {
                            id: x.id,
                            name: x.name,
                            image: x.image,
                            perma_url: x.perma_url,
                            role: x.role,
                            type: x.type,
                            isLiked: false
                        };
                    }),
                },
                release_date: item.more_info.release_date,
            },
        }
    ));
};
