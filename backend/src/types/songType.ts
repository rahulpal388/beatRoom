import { ApiArtists, IArtists } from "./artistType.js";
import { WithLike } from "./withLike.js";


export type ApiSong = {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    perma_url: string;
    image: string;
    language: string;
    play_count: string;
    more_info: {
        album_id: string;
        album: string;
        album_url: string;
        duration: string;
        encrypted_media_url: string;
        artistMap: {
            artists: ApiArtists[];
        };
        release_date: string;
    };
};


export type ISong = WithLike<
    Omit<ApiSong, "more_info"> & {
        more_info: Omit<ApiSong["more_info"], "artistMap"> & {
            artistMap: {
                artists: IArtists[];
            };
        };
    }
>;


type ApiMoreInfo = Omit<
    ApiSong["more_info"],
    "album_id" | "album" | "album_url" | "encrypted_media_url"
> &
    Partial<
        Pick<
            ApiSong["more_info"],
            "album_id" | "album" | "album_url" | "encrypted_media_url"
        >
    >;

export type ApiNewRelease = Omit<ApiSong, "more_info"> & { more_info: ApiMoreInfo };

export type INewRelease = ApiNewRelease & { isLiked: boolean }
