import { ISong } from "./songType";

export type ITopArtist = {
  artistid: string;
  name: string;
  image: string;
  perma_url: string;
};

export type IArtists = {
  id: string;
  name: string;
  role: string;
  image: string;
  type: string;
  perma_url: string;
};



export type IArtistPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  perma_url: string;
  more_info: {
    entity_type: string;
    song_count: string;
    language: string;
  };
};

export type IArtistAlbum = {
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

export type IArtistInfo = {
  artistId: string;
  name: string;
  subtitle: string;
  image: string;
  follower_count: string;
  type: string;
  topSongs: ISong[];
  topAlbums: IArtistAlbum[];
  dedicated_artist_playlist: IArtistPlaylist[];
  featured_artist_playlist: IArtistPlaylist[];
  latest_release: IArtistAlbum[];
};
