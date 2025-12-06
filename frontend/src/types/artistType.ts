import { IAlbum } from "./albumType";
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

export type IArtistInfo = {
  artistId: string;
  name: string;
  subtitle: string;
  image: string;
  follower_count: string;
  type: string;
  isLiked: boolean;
  topSongs: ISong[];
  topAlbums: IAlbum[];
  dedicated_artist_playlist: IPlaylist[];
  featured_artist_playlist: IPlaylist[];
  latest_release: IAlbum[];
};
