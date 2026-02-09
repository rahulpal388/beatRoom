import { ApiSong, ISong } from "./songType.js";
import { WithLike } from "./withLike.js";

export type ApiArtists = {
    id: string;
    name: string;
    role: string;
    image: string;
    type: string;
    perma_url: string;
};

export type ApiTopArtist = {
    artistid: string;
    name: string;
    image: string;
    perma_url: string;
};

export type IArtists = WithLike<ApiArtists>


export type ApiArtistAlbum = {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    perma_url: string;
    image: string;
    language: string;
    more_info: {
        artistMap: {
            artists: {
                id: string;
                name: string;
                role: string;
                image: string;
                type: string;
                perma_url: string;
            }[];
        };
    };
};

export type ApiArtistPlaylist = {
    id: string,
    title: string,
    subtitle: string,
    type: string,
    image: string,
    perma_url: string,
    more_info: {
        entity_type: string,
        song_count: string,
        language: string
    }
}

export type ApiArtistInfo = {
    artistId: string;
    name: string;
    subtitle: string;
    image: string;
    follower_count: string;
    type: string;
    topSongs: ApiSong[];
    topAlbums: ApiArtistAlbum[];
    dedicated_artist_playlist: ApiArtistPlaylist[];
    featured_artist_playlist: ApiArtistPlaylist[];
    latest_release: ApiArtistAlbum[];
};


export type IArtistInfo = WithLike<Omit<ApiArtistInfo, "topSongs" | "topAlbums" | "dedicated_artist_playlist" | "featured_artist_playlist" | "latest_release"> & {
    topSongs: ISong[];
    topAlbums: WithLike<ApiArtistAlbum>[];
    dedicated_artist_playlist: WithLike<ApiArtistPlaylist>[];
    featured_artist_playlist: WithLike<ApiArtistPlaylist>[];
    latest_release: WithLike<ApiArtistAlbum>[];
}>

