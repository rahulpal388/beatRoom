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