import { IPlaylist } from "./playlistType";
import { ISong } from "./songType";

export type IArtists = {
  id: string;
  name: string;
  image: string;
  perma_url: string;
  role: string;
  type: string;
};

export type IArtistAlbum = {
  id: string;
  title: string;
  subtitle: string;
  type: "album";
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
  dedicated_artist_playlist: IPlaylist[];
  featured_artist_playlist: IPlaylist[];
  latest_release: IArtistAlbum[];
};
