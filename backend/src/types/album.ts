import { ApiSong } from "./songType.js";
import { WithLike } from "./withLike.js";

export type ApiSongAlbum = {
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
        artistMap: {
            primary_artists: {
                id: string;
                name: string;
                image: string;
                type: string;
                perma_url: string;
            }[];
        };
    };
};


export type ISongAlbum = WithLike<Omit<ApiSongAlbum, "list"> & {
    list: WithLike<ApiSong>[]
}>



export type ApiAlbum = {
    id: string;
    title: string;
    type: string;
    perma_url: string;
    image: string;
};

export type IAlbum = WithLike<ApiAlbum>;