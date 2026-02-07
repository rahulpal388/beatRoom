import { ApiArtists, IArtists } from "./artistType.js";
import { ApiSong, ISong } from "./songType.js";
import { WithLike } from "./withLike.js";

export type ApiPlaylist = {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    perma_url: string;
    image: string;
};

export type IPlaylist = WithLike<ApiPlaylist>;


export type APiSongsPlaylist = {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    perma_url: string;
    image: string;
    language: string;
    list_count: string;
    list: ApiSong[];
    more_info: {
        artists: ApiArtists[];
    };
};

export type ISongsPlaylist = WithLike<Omit<APiSongsPlaylist, "list"> & { list: ISong[] }>
