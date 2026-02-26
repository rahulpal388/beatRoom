import { IPlaylist } from "./playlistType";
import { ISong } from "./songType";



export type IArtists = {
  id: string;
  name: string;
  role: string;
  image: string;
  type: string;
  perma_url: string;
  isLiked: string;
};

export type IArtistAlbum = {
  id: string;
  title: string;
  subtitle: string;
  type: "album";
  perma_url: string;
  image: string;
  language: string
  isLiked: boolean
  more_info: {
    artistMap: {
      artists: [
        {
          id: string;
          name: string;
          role: string;
          image: string;
          type: string
          perma_url: string
        }
      ]
    }
  }
}


export type IArtistPlaylist = IPlaylist & {
  more_info: {
    entity_type: string;
    song_count: string;
    language: string
  }
}
export type IArtistInfo = {
  artistId: string;
  name: string;
  subtitle: string;
  image: string;
  follower_count: string;
  type: "artist";
  isLiked: boolean;
  topSongs: ISong[];
  topAlbums: IArtistAlbum[];
  dedicated_artist_playlist: IArtistPlaylist[];
  featured_artist_playlist: IArtistPlaylist[];
  latest_release: IArtistAlbum[];
};
